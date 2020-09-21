const axios = require('axios').default
const getGraphToken = require('./get-graph-token')
const { graph: { user, events } } = require('../../config')

module.exports = async (context, token, userPrincipalName, graphUserUrl, daysAhead = 7) => {
  if (!token) {
    // If no token is provided - gather application graph token
    context.log(['events', 'get-graph-events', userPrincipalName, 'get-graph-token'])
    token = await getGraphToken(context)
    context.log(['events', 'get-graph-user', userPrincipalName, 'get-graph-token', 'length', token.length])
  }

  // Use the graph Url as base url if given, otherwise we create our own..
  const graphUrl = graphUserUrl ? `${graphUserUrl.replace(/\/$/, '')}/${events.endpoint}`
    : `${userPrincipalName ? `${user.userUrl}/${userPrincipalName}` : user.meUrl}/${events.endpoint}`

  try {
    context.log(['events', 'get-graph-events', userPrincipalName, 'get-events', 'url', graphUrl])

    const now = new Date()
    const oneWeek = new Date()
    oneWeek.setDate(oneWeek.getDate() + (isNaN(daysAhead) ? 7 : parseInt(daysAhead.toString())))

    const { data } = await axios({
      url: graphUrl,
      method: 'GET',
      headers: {
        Authorization: token
      },
      params: {
        startDateTime: now.toISOString(),
        endDateTime: oneWeek.toISOString()
      }
    })

    return data.value
  } catch (err) {
    context.log.error(['events', 'get-graph-events', 'err', err])
    return null
  }
}
