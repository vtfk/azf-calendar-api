const axios = require('axios').default
const qs = require('qs')
const { graph: { auth } } = require('../../config')

const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 3000 })

module.exports = async (context) => {
  if (cache.get('graphToken')) {
    context.log(['events', 'get-graph-token', 'return cached token'])
    return cache.get('graphToken')
  }

  const authOptions = {
    client_id: auth.clientId,
    scope: auth.scope,
    client_secret: auth.secret,
    grant_type: auth.grantType
  }

  try {
    const { data } = await axios({
      url: auth.url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(authOptions)
    })

    const token = `${data.token_type} ${data.access_token}`.trim()
    cache.set('graphToken', token, data.expires_in)

    return token
  } catch (err) {
    context.log.error(['events', 'get-graph-token', 'err', err])
    throw err
  }
}
