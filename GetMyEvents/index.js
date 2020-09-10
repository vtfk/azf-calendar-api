const authGraphUser = require('../lib/auth-graph-user')
const getUserEvents = require('../lib/get-user-events')

module.exports = async (context, req) => {
  try {
    const graphUser = await authGraphUser(context, req)
    context.log(['events', 'get-my-events', graphUser.userPrincipalName])

    const events = await getUserEvents(context, req.headers.authorization, graphUser)
    context.log(['events', 'get-my-events', graphUser.userPrincipalName, 'return', events.length, 'events'])

    context.res = {
      status: 200,
      body: {
        user: graphUser,
        events
      }
    }
  } catch (err) {
    context.res = {
      status: err.statusCode || 500,
      body: err.message || 'Internal server error'
    }
  }
}
