const getMockEventTabs = require('../lib/mock/get-mock-event-tabs')

module.exports = async (context, req) => {
  const mockEventTabs = getMockEventTabs(context)
  context.log(['events', 'get-mock-event-tabs', mockEventTabs.user.userPrincipalName, 'tabs', mockEventTabs.tabs.length])

  return {
    status: 200,
    body: mockEventTabs
  }
}
