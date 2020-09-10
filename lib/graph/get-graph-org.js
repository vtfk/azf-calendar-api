const axios = require('axios').default
const getGraphToken = require('./get-graph-token')
const { graph: { org } } = require('../../config')

module.exports = async (context, token) => {
  if (!token) {
    // If no token is provided - gather token
    context.log(['events', 'get-graph-org', 'get-graph-token'])
    token = await getGraphToken(context)
    context.log(['events', 'get-graph-org', 'get-graph-token', 'length', token.length])
  }

  try {
    const { data } = await axios({
      url: org.url,
      method: 'GET',
      headers: {
        Authorization: token
      },
      params: {
        $select: org.properties
      }
    })

    return data
  } catch (err) {
    context.log.error(['events', 'get-graph-org', 'err', err])
    throw err
  }
}
