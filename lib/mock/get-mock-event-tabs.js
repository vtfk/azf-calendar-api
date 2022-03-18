const getMockEvents = require('./get-mock-events')

module.exports = context => {
  const { events: myEvents, user } = getMockEvents()
  context.log(['events', 'get-mock-event-tabs', user.userPrincipalName, 'me', myEvents.length])
  const { events: politicalEvents } = getMockEvents()
  context.log(['events', 'get-mock-event-tabs', user.userPrincipalName, 'political', politicalEvents.length])

  return {
    user,
    tabs: [
      {
        tabName: 'Min kalender',
        sortOrder: 0,
        events: myEvents
      },
      {
        tabName: 'Politiske møter',
        sortOrder: 100,
        events: politicalEvents
      }
    ]
  }
}
