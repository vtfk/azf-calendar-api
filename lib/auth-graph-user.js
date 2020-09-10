const { graph: { org: { tenantId } } } = require('../config')
const getGraphUser = require('./graph/get-graph-user')
const getGraphOrg = require('./graph/get-graph-org')
const HTTPError = require('../lib/http-error')

module.exports = async (context, req) => {
  const token = req.headers.authorization || null
  if (!token) {
    throw new HTTPError(401, 'Unauthorized. Missing authorization header.')
  }

  let samAccountName, graphUser, graphOrg

  try {
    graphUser = await getGraphUser(context, token)
    samAccountName = graphUser.onPremisesSamAccountName
    if (!graphUser || !samAccountName) {
      throw new HTTPError(404, 'No user found')
    }
  } catch (err) {
    context.log.error(['events', 'graph-user', 'err', err])
    throw new HTTPError(500, 'Unable to get user.')
  }

  try {
    graphOrg = await getGraphOrg(context, token)
    const userTenantId = graphOrg.value[0].id
    if (userTenantId !== tenantId) {
      context.log.error(['events', samAccountName, `Tenant ID not matching ${tenantId}`, userTenantId])
      throw new HTTPError(401, 'Invalid tenant ID')
    }
  } catch (err) {
    context.log.error(['events', samAccountName, 'graph-org', 'err', err])
    throw new HTTPError(500, 'Unable to get organization')
  }

  return graphUser
}
