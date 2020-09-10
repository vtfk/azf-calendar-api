const { CACHE } = require('../config')
const NodeCache = require('node-cache')
const cache = CACHE ? new NodeCache({ stdTTL: 3600, checkperiod: 120 }) : false

const getSharepointList = require('./graph/sharepoint/get-sharepoint-list')
const HTTPError = require('./http-error')
const { graph: { configList } } = require('../config')
const getGraphUserGroups = require('./graph/get-graph-user-groups')
const getGraphEvents = require('./graph/get-graph-events')

module.exports = async (context, token, graphUser) => {
  const { userPrincipalName } = graphUser

  if (cache) {
    const cachedUserEventTabs = cache.get(`tabs-${userPrincipalName}`)
    if (cachedUserEventTabs) {
      return cachedUserEventTabs
    }
  }

  try {
    const tabs = await getSharepointList(context, token, configList.siteId, configList.listId)
    context.log('tabs', tabs.length)

    const userGroups = await getGraphUserGroups(context, token, graphUser)
    context.log('userGroups', userGroups.length)

    const userTabs = tabs.filter(tab => {
      const matches = userGroups.filter(group => group.id === tab.GroupID || group.mail === tab.GroupID)
      return matches.length > 0
    })

    context.log('user tabs', userTabs)

    const tabEvents = await Promise.all(userTabs.map(async tab => ({
      tabName: tab.TabName,
      sortOrder: tab.SortOrder,
      events: await getGraphEvents(context, token, userPrincipalName, tab.CalendarUrl)
    })))

    const sortedTabs = tabEvents.sort((a, b) => a.sortOrder - b.sortOrder)

    context.log(sortedTabs)

    if (cache) {
      cache.set(`tabs-${userPrincipalName}`, sortedTabs)
    }

    return sortedTabs
  } catch (err) {
    context.log.error(['events', userPrincipalName, 'err', err])
    throw new HTTPError(err.statusCode || 500, err.message)
  }
}
