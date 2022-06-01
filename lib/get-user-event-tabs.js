const { CACHE } = require('../config')
const NodeCache = require('node-cache')
const cache = CACHE ? new NodeCache({ stdTTL: 3600, checkperiod: 120 }) : false

const getSharepointList = require('./graph/sharepoint/get-sharepoint-list')
const HTTPError = require('./http-error')
const { graph: { configList } } = require('../config')
const getGraphUserGroups = require('./graph/get-graph-user-groups')
const getGraphEvents = require('./graph/get-graph-events')

const getEventCount = tabs => {
  const calendars = []
  const totalEventCount = tabs.reduce((acc, curr) => {
    calendars.push(curr.tabName)
    return acc + curr.events.length || 0
  }, 0)

  return {
    calendars,
    totalEventCount
  }
}

module.exports = async (context, token, graphUser, force = false) => {
  const { userPrincipalName } = graphUser

  if (cache && !force) {
    const cachedUserEventTabs = cache.get(`tabs-${userPrincipalName}`)
    if (cachedUserEventTabs) {
      context.log(['tabs', 'get-user-event-tabs', userPrincipalName, 'from cache', getEventCount(cachedUserEventTabs)])
      return cachedUserEventTabs
    }
  }

  try {
    const tabs = await getSharepointList(context, token, configList.siteId, configList.listId)
    context.log('tabs', tabs.length)

    const userGroups = await getGraphUserGroups(context, token, graphUser)
    context.log('userGroups', userGroups.length)

    const userTabs = tabs.filter(tab => {
      const matches = userGroups.filter(group => group.id === tab.GroupID || `${group.mail}`.toUpperCase() === `${tab.GroupID}`.toUpperCase())
      return matches.length > 0
    })

    context.log('user tabs', userTabs)

    const tabEvents = await Promise.all(userTabs.map(async tab => {
      const events = await getGraphEvents(context, token, userPrincipalName, tab.CalendarUrl, tab.DaysAhead)
      if (!events) {
        context.log.error(['events', userPrincipalName, 'err', `No events found for: ${tab.CalendarUrl}`])
        return null // will be filtered out later
      }

      return {
        tabName: tab.TabName,
        sortOrder: tab.SortOrder,
        events
      }
    }))

    // Remove calendar tabs that wasn't found, and sort them by sortOrder.
    const sortedTabs = tabEvents.filter(events => !!events).sort((a, b) => a.sortOrder - b.sortOrder)

    context.log(['tabs', 'get-user-event-tabs', userPrincipalName, getEventCount(sortedTabs)])

    if (cache) {
      cache.set(`tabs-${userPrincipalName}`, sortedTabs)
    }

    return sortedTabs
  } catch (err) {
    context.log.error(['events', userPrincipalName, 'err', err])
    throw new HTTPError(err.statusCode || 500, err.message)
  }
}
