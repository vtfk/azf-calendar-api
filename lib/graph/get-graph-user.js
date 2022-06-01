const axios = require('axios').default
const getGraphToken = require('./get-graph-token')
const { graph: { user } } = require('../../config')

module.exports = async (context, token, userPrincipalName) => {
  if (!token) {
    // If no token is provided - gather application graph token
    context.log(['events', 'get-graph-user', 'get-graph-token'])
    token = await getGraphToken(context)
    context.log(['events', 'get-graph-user', 'get-graph-token', 'length', token.length])
  }

  const graphUrl = userPrincipalName ? `${user.userUrl}/${userPrincipalName}` : user.meUrl

  try {
    context.log(['events', 'get-graph-user', 'get-user', 'url', graphUrl])
    const { data } = await axios({
      url: graphUrl,
      method: 'GET',
      headers: {
        Authorization: token
      },
      params: {
        $select: user.properties
      }
    })

    return data
  } catch (err) {
    context.log.error(['events', 'get-graph-user', 'err', err])
    throw err
  }
}
