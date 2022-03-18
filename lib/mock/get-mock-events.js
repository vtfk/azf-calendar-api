const generateMockEvents = require('./generate-mock-events')

module.exports = () => {
  return {
    user: {
      '@odata.context': 'https://graph.microsoft.com/v1.0/$metadata#users(id,userPrincipalName,onPremisesSamAccountName,displayName)/$entity',
      id: '2f0d6c10-478b-4eec-8e46-fb15f3059505',
      userPrincipalName: 'bjarne.betjent@vtfk.no',
      onPremisesSamAccountName: 'bja0101',
      displayName: 'Bjarne Betjent'
    },
    events: generateMockEvents()
  }
}
