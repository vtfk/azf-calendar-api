const getUserEventTabs = require('../lib/get-user-event-tabs')
const getUserEvents = require('../lib/get-user-events')
const getGraphToken = require('../lib/graph/get-graph-token')
const getGraphUser = require('../lib/graph/get-graph-user')
const HTTPError = require('../lib/http-error')

module.exports = async (context, req) => {
  try {
    const userPrincipalName = req.params.userPrincipalName
    if (!userPrincipalName) {
      throw new HTTPError(400, 'Please pass the userPrincipalName in the url')
    }

    context.log(['events', 'get-user-event-tabs', userPrincipalName, 'get-graph-token'])
    const token = await getGraphToken(context)
    context.log(['events', 'get-user-event-tabs', userPrincipalName, 'get-graph-token', 'length', token.length])

    context.log(['events', 'get-user-event-tabs', userPrincipalName, 'get-graph-user'])
    const graphUser = await getGraphUser(context, token, userPrincipalName)
    context.log(['events', 'get-user-event-tabs', userPrincipalName, 'get-graph-user', graphUser.id])

    context.log(['events', 'get-user-event-tabs', userPrincipalName, 'get-user-events'])
    const events = await getUserEvents(context, token, graphUser)
    context.log(['events', 'get-user-event-tabs', userPrincipalName, 'return', events.length, 'events'])

    const userEventTabs = await getUserEventTabs(context, token, graphUser)
    context.log(['events', 'get-user-event-tabs', graphUser.userPrincipalName, 'return', userEventTabs.length, 'tabs'])

    context.res = {
      status: 200,
      body: {
        user: graphUser,
        tabs: [
          {
            tabName: 'Min kalender',
            sortOrder: 0,
            events
          },
          ...userEventTabs
        ]
      }
    }
  } catch (err) {
    context.res = {
      status: err.statusCode || 500,
      body: err.message || 'Internal server error'
    }
  }
}
