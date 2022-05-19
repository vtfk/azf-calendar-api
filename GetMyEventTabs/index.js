const authGraphUser = require('../lib/auth-graph-user')
const getUserEventTabs = require('../lib/get-user-event-tabs')

module.exports = async (context, req) => {
  try {
    const token = req.headers.authorization
    const { force } = req.query
    const graphUser = await authGraphUser(context, req)
    context.log(['events', 'get-my-event-tabs', graphUser.userPrincipalName])

    const userEventTabs = await getUserEventTabs(context, token, graphUser, !!force)
    context.log(['events', 'get-my-event-tabs', graphUser.userPrincipalName, 'return', userEventTabs.length, 'tabs'])

    context.res = {
      status: 200,
      body: {
        user: graphUser,
        tabs: [
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
