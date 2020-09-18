const axios = require('axios').default
const { graph } = require('../../../config')
const repackSharepointItem = require('./repack-sharepoint-item')

module.exports = async (context, token, siteId, listId) => {
  const graphUrl = `${graph.rootUrl}/sites/${siteId}/lists/${listId}/items`

  try {
    context.log(['tasks', 'get-sharepoint-list', listId, 'get-items', 'url', graphUrl])
    const { data } = await axios({
      url: graphUrl,
      method: 'GET',
      headers: {
        Authorization: token
      },
      params: {
        expand: 'fields'
      }
    })

    context.log(['tasks', 'get-sharepoint-list', listId, 'get-items', 'length', data.value.length || 0])
    if (data.value.length > 0) return data.value.map(repackSharepointItem)
  } catch (err) {
    context.log.error(['tasks', 'get-sharepoint-list', 'err', err])
  }

  try {
    if (!graph.configList.fallbackLogicAppUrl) return []

    context.log(['tasks', 'get-sharepoint-list', 'fallback', listId, 'get-items', 'got 0 items - get items from fallback logic app'])
    const { data: fallbackData } = await axios(graph.configList.fallbackLogicAppUrl)
    return fallbackData.value.map(item => repackSharepointItem({ id: item.ID, fields: item }))
  } catch (err) {
    context.log.error(['tasks', 'get-sharepoint-list', 'fallback', listId, 'err', err])
    throw err
  }
}
