module.exports = {
  CACHE: process.env.CACHE === 'true',
  graph: {
    rootUrl: 'https://graph.microsoft.com/v1.0',
    auth: {
      url: process.env.GRAPH_AUTH_ENDPOINT || 'https://login.microsoftonline.com/vtfk.onmicrosoft.com/oauth2/v2.0/token',
      clientId: process.env.GRAPH_AUTH_CLIENT_ID || '123456-1234-1234-123456',
      secret: process.env.GRAPH_AUTH_SECRET || 'wnksdnsjblnsfjb',
      scope: process.env.GRAPH_AUTH_SCOPE || 'https://graph.microsoft.com/.default',
      grantType: process.env.GRAPH_AUTH_GRANT_TYPE || 'client_credentials'
    },
    user: {
      meUrl: process.env.GRAPH_ME_ENDPOINT || 'https://graph.microsoft.com/v1.0/me',
      userUrl: process.env.GRAPH_USERS_ENDPOINT || 'https://graph.microsoft.com/v1.0/users',
      properties: 'id,userPrincipalName,onPremisesSamAccountName,displayName'
    },
    org: {
      url: process.env.GRAPH_ORG_ENDPOINT || 'https://graph.microsoft.com/v1.0/organization',
      properties: 'id',
      tenantId: process.env.GRAPH_TENANT_ID || '08f3813c-9f29-482f-9aec-16ef7cbf477a'
    },
    events: {
      endpoint: process.env.GRAPH_EVENTS_ENDPOINT || 'calendarview',
      eventsDaysAhead: process.env.GRAPH_EVENTS_DAYS_AHEAD || 14,
      top: process.env.GRAPH_EVENTS_TOP || 20
    },
    configList: {
      sitesUrl: process.env.GRAPH_SITE_ENDPOINT || 'https://graph.microsoft.com/v1.0/sites',
      siteId: process.env.GRAPH_CONFIG_SITEID || '123456-1234-1234-123456',
      listId: process.env.GRAPH_CONFIG_LISTID || '123456-1234-1234-123456',
      fallbackLogicAppUrl: process.env.FALLBACK_LOGICAPP_URL || null
    }
  },
  papertrail: {
    hostname: process.env.PAPERTRAIL_HOSTNAME || 'azf-calendar-api',
    host: process.env.PAPERTRAIL_HOST || 'logs.papertrailapp.com',
    port: process.env.PAPERTRAIL_PORT || 12345
  }
}
