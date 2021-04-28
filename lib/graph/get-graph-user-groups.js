const axios = require('axios').default
const getGraphToken = require('./get-graph-token')
const { graph: { user } } = require('../../config')

module.exports = async (context, token, { userPrincipalName, id }) => {
  if (!token) {
    // If no token is provided - gather application graph token
    context.log(['events', 'get-graph-user-groups', userPrincipalName, 'get-graph-token'])
    token = await getGraphToken(context)
    context.log(['events', 'get-graph-user-groups', userPrincipalName, 'get-graph-token', 'length', token.length])
  }

  const graphUrl = `${userPrincipalName ? `${user.userUrl}/${userPrincipalName}` : user.meUrl}/transitiveMemberOf?$top=300`

  try {
    context.log(['events', 'get-graph-user-groups', userPrincipalName, 'get-groups', 'url', graphUrl])
    const { data } = await axios({
      url: graphUrl,
      method: 'GET',
      headers: {
        Authorization: token
      },
      params: {
        $select: 'displayName,id,mail'
      }
    })

    context.log(['events', 'get-graph-user-groups', userPrincipalName, 'get-groups', 'length', data.value.length || 0])
    return data.value
  } catch (err) {
    context.log.error(['events', 'get-graph-user-groups', 'err', err])
    throw err
  }
}
