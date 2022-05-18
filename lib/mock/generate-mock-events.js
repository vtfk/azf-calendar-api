const event = {
  '@odata.etag': 'W/"htrw3CXHkEmMjjj3SJzW-QACyhcskW=="',
  id: 'AAMkAGQzNmVmNerthaeggweHJWRTHAEGDBCERHARDQzNWUwNgFRAAgI2gepFG6AAEYAAAAAu9_xSYNztEujFIIju8KWlAcAVGES3CXHkEmMtky6SJzW_QAAAAABDQAAVGES3CXHkEmMtky6SJzW_QACfY_eDwAAEA==',
  createdDateTime: '2021-11-09T09:06:46.1167124Z',
  lastModifiedDateTime: '2022-03-08T16:19:57.1554001Z',
  changeKey: 'VGES3CXHerehggaerrwtyW+QACyhcsKw==',
  categories: [],
  transactionId: '9c298e24-c329-0000-0000-906a8cf44ddf',
  originalStartTimeZone: 'UTC',
  originalEndTimeZone: 'UTC',
  iCalUId: '040000008200E00074C5B7101A82E0056765456782376527386TR882387968782383872382828872357283587253',
  reminderMinutesBeforeStart: 420,
  isReminderOn: false,
  hasAttachments: false,
  subject: 'Subject',
  bodyPreview: '',
  importance: 'normal',
  sensitivity: 'normal',
  isAllDay: false,
  isCancelled: false,
  isOrganizer: true,
  responseRequested: true,
  seriesMasterId: 'AAMkAGQzNmVmNTdmLsljnbglerglabgilweugiiuvhFGSRYKU37FJg3O0S6MUgiO7wpaUBwBUYRLcJceQSYy2TLpInNb5AAAAAAENAABUYRLcJceQSYy2TLpInNb5AAJ9j54PAAA=',
  showAs: 'free',
  type: 'occurrence',
  webLink: 'https://outlook.office365.com/owa/?itemid=AAMkAGQzNmVmNTdmLsljnbglerglabgilweugiiuvhFGSRYKU37FJg3O0S6MUgiO7wpaUBwBUYRLcJceQSYy2TLpInNb5AAAAAAENAABUYRLcJceQSYy2TLpInNb5AAJ9j54PAAA=&exvsurl=1&path=/calendar/item',
  onlineMeetingUrl: null,
  isOnlineMeeting: false,
  onlineMeetingProvider: 'unknown',
  allowNewTimeProposals: true,
  isDraft: false,
  hideAttendees: false,
  recurrence: null,
  onlineMeeting: null,
  responseStatus: {
    response: 'organizer',
    time: '0001-01-01T00:00:00Z'
  },
  body: {
    contentType: 'html',
    content: ''
  },
  start: {
    dateTime: '2022-03-17T00:00:00.0000000',
    timeZone: 'UTC'
  },
  end: {
    dateTime: '2022-03-18T00:00:00.0000000',
    timeZone: 'UTC'
  },
  location: {
    displayName: '',
    locationType: 'default',
    uniqueIdType: 'unknown',
    address: {},
    coordinates: {}
  },
  locations: [],
  attendees: [],
  organizer: {
    emailAddress: {
      name: 'Bjarne Betjent',
      address: 'bjarne.betjent@vtfk.no'
    }
  }
}

const getRandomNumber = (min = 0, max = 10) => {
  const num = Math.round(Math.random() * max)
  if (num < min) return min
  else if (num > max) return max
  return num
}

const subjects = [
  'Strømmingsteknologi',
  'Infrastrukturbasert kompabilitet',
  'Prosessorientert effektivisering',
  'Konfigurasjonsoppsett',
  'Optimal kvalitetssikring',
  'Kravoptimalisert infrastruktur',
  'Kravoptimalisert offshore',
  'Kostnadseffektiv virtualisering',
  'Driftsoptimalisert overvåkning',
  'Teknologisk tidshorisont'
]

const getStartDate = num => {
  const d = new Date()
  return new Date(d.setDate(d.getDate() + num)).toISOString()
}

const getEndDate = (date, num) => {
  const d = new Date(date)
  return new Date(d.setHours(d.getHours() + num)).toISOString()
}

module.exports = () => {
  const events = []

  for (let i = 0; i < getRandomNumber(1, 10); i++) {
    const subject = subjects[getRandomNumber(0, 9)]
    const startDate = getStartDate(getRandomNumber(1, 10))
    const endDate = getEndDate(startDate, getRandomNumber(1, 48))
    const newEvent = JSON.parse(JSON.stringify(event))
    newEvent.subject = subject
    newEvent.start.dateTime = startDate
    newEvent.end.dateTime = endDate
    newEvent.isOnlineMeeting = !!getRandomNumber(0, 1)
    events.push(newEvent)
  }

  return events
}
