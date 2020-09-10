const { CACHE } = require('../config')
const NodeCache = require('node-cache')
const cache = CACHE ? new NodeCache({ stdTTL: 3600, checkperiod: 120 }) : false

const getGraphEvents = require('./graph/get-graph-events')
const HTTPError = require('../lib/http-error')

module.exports = async (context, token, graphUser) => {
  const { userPrincipalName } = graphUser

  if (cache) {
    const cachedUserEvents = cache.get(userPrincipalName)
    if (cachedUserEvents) {
      return cachedUserEvents
    }
  }

  try {
    const events = await getGraphEvents(context, token, userPrincipalName)
    context.log(['events', 'get-user-events', userPrincipalName, 'events', events.length])

    if (cache) {
      cache.set(userPrincipalName, events)
    }

    return events
  } catch (err) {
    context.log.error(['events', userPrincipalName, 'err', err])
    throw new HTTPError(err.statusCode || 500, err.message)
  }
}
