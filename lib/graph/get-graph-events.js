const axios = require('axios').default
const getGraphToken = require('./get-graph-token')
const { graph: { user, events } } = require('../../config')

module.exports = async (context, token, userPrincipalName, graphUserUrl, daysAhead) => {
  if (!token || (graphUserUrl && graphUserUrl.includes('/users/'))) {
    // If no token is provided OR graphUserUrl is a URL for /users/... - gather application graph token
    context.log(['events', 'get-graph-events', userPrincipalName, 'get-graph-token'])
    token = await getGraphToken(context)
    context.log(['events', 'get-graph-user', userPrincipalName, 'get-graph-token', 'length', token.length])
  }

  // Use the graph Url as base url if given, otherwise we create our own..
  const graphUrl = graphUserUrl
    ? `${graphUserUrl.replace(/\/$/, '')}/${events.endpoint}`
    : `${userPrincipalName ? `${user.userUrl}/${userPrincipalName}` : user.meUrl}/${events.endpoint}`

  try {
    context.log(['events', 'get-graph-events', userPrincipalName, 'get-events', 'url', graphUrl])

    const now = new Date()
    const dateAhead = new Date()
    dateAhead.setDate(dateAhead.getDate() + (isNaN(daysAhead) ? parseInt(events.eventsDaysAhead.toString()) : parseInt(daysAhead.toString())))

    const { data } = await axios({
      url: graphUrl,
      method: 'GET',
      headers: {
        Authorization: token
      },
      params: {
        startDateTime: now.toISOString(),
        endDateTime: dateAhead.toISOString(),
        $orderby: 'start/dateTime',
        $top: events.top
      }
    })

    return data.value
  } catch (err) {
    context.log.error(['events', 'get-graph-events', 'err', err])
    return null
  }
}
