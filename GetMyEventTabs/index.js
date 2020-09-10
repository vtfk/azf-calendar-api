const authGraphUser = require('../lib/auth-graph-user')
const getUserEventTabs = require('../lib/get-user-event-tabs')
const getUserEvents = require('../lib/get-user-events')

module.exports = async (context, req) => {
  try {
    const token = req.headers.authorization
    const graphUser = await authGraphUser(context, req)
    context.log(['events', 'get-my-event-tabs', graphUser.userPrincipalName])

    const userEvents = await getUserEvents(context, token, graphUser)
    context.log(['events', 'get-my-event-tabs', graphUser.userPrincipalName, 'return', userEvents.length, 'events'])

    const userEventTabs = await getUserEventTabs(context, token, graphUser)
    context.log(['events', 'get-my-event-tabs', graphUser.userPrincipalName, 'return', userEventTabs.length, 'tabs'])

    context.res = {
      status: 200,
      body: {
        user: graphUser,
        tabs: [
          {
            tabName: 'Min kalender',
            sortOrder: 0,
            events: userEvents
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
