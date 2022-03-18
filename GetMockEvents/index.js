const getMockEvents = require('../lib/mock/get-mock-events')

module.exports = async (context, req) => {
  const mockEvents = getMockEvents(context)
  context.log(['events', 'get-mock-events', mockEvents.user.userPrincipalName, mockEvents.events.length])

  return {
    status: 200,
    body: mockEvents
  }
}
