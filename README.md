# Calendar API
Azure functions API that collects a users calendar events. Used to present the events to the user on the intranet.

## Endpoints

### GET /me
Returns a list of my calendar events. User authenticates using Microsoft Graph and the **userPrincipalName** is gathered from there.
Authentication: Bearer \<Microsoft Graph API token>

#### Result
```json
{
	"user": {
		"@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users(id,userPrincipalName,onPremisesSamAccountName,displayName)/$entity",
		"id": "2f0d6c10-478b-4eec-8e46-fb15f3059505",
		"userPrincipalName": "bjarne.betjent@vtfk.no",
		"onPremisesSamAccountName": "bja0101",
		"displayName": "Bjarne Betjent"
	},
	"events": [
		{
			"@odata.etag": "W/\"htrw3CXHkEmMjjj3SJzW-QACyhcskW==\"",
			"id": "AAMkAGQzNmVmNerthaeggweHJWRTHAEGDBCERHARDQzNWUwNgFRAAgI2gepFG6AAEYAAAAAu9_xSYNztEujFIIju8KWlAcAVGES3CXHkEmMtky6SJzW_QAAAAABDQAAVGES3CXHkEmMtky6SJzW_QACfY_eDwAAEA==",
			"createdDateTime": "2021-11-09T09:06:46.1167124Z",
			"lastModifiedDateTime": "2022-03-08T16:19:57.1554001Z",
			"changeKey": "VGES3CXHerehggaerrwtyW+QACyhcsKw==",
			"categories": [],
			"transactionId": "9c298e24-c329-0000-0000-906a8cf44ddf",
			"originalStartTimeZone": "UTC",
			"originalEndTimeZone": "UTC",
			"iCalUId": "040000008200E00074C5B7101A82E0056765456782376527386TR882387968782383872382828872357283587253",
			"reminderMinutesBeforeStart": 420,
			"isReminderOn": false,
			"hasAttachments": false,
			"subject": "Subject",
			"bodyPreview": "",
			"importance": "normal",
			"sensitivity": "normal",
			"isAllDay": true,
			"isCancelled": false,
			"isOrganizer": true,
			"responseRequested": true,
			"seriesMasterId": "AAMkAGQzNmVmNTdmLsljnbglerglabgilweugiiuvhFGSRYKU37FJg3O0S6MUgiO7wpaUBwBUYRLcJceQSYy2TLpInNb5AAAAAAENAABUYRLcJceQSYy2TLpInNb5AAJ9j54PAAA=",
			"showAs": "free",
			"type": "occurrence",
			"webLink": "https://outlook.office365.com/owa/?itemid=AAMkAGQzNmVmNTdmLsljnbglerglabgilweugiiuvhFGSRYKU37FJg3O0S6MUgiO7wpaUBwBUYRLcJceQSYy2TLpInNb5AAAAAAENAABUYRLcJceQSYy2TLpInNb5AAJ9j54PAAA=&exvsurl=1&path=/calendar/item",
			"onlineMeetingUrl": null,
			"isOnlineMeeting": false,
			"onlineMeetingProvider": "unknown",
			"allowNewTimeProposals": true,
			"isDraft": false,
			"hideAttendees": false,
			"recurrence": null,
			"onlineMeeting": null,
			"responseStatus": {
				"response": "organizer",
				"time": "0001-01-01T00:00:00Z"
			},
			"body": {
				"contentType": "html",
				"content": ""
			},
			"start": {
				"dateTime": "2022-03-17T00:00:00.0000000",
				"timeZone": "UTC"
			},
			"end": {
				"dateTime": "2022-03-18T00:00:00.0000000",
				"timeZone": "UTC"
			},
			"location": {
				"displayName": "",
				"locationType": "default",
				"uniqueIdType": "unknown",
				"address": {},
				"coordinates": {}
			},
			"locations": [],
			"attendees": [],
			"organizer": {
				"emailAddress": {
					"name": "Bjarne Betjent",
					"address": "bjarne.betjent@vtfk.no"
				}
			}
		}
  ]
}
```

### GET /me/tabs
Returns a list of my calendars with calendar events. My calendars is based on group membership and a sharepoint list. User authenticates using Microsoft Graph and the **userPrincipalName** is gathered from there.
Authentication: Bearer \<Microsoft Graph API token>

#### Result
```json
{
	"user": {
		"@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users(id,userPrincipalName,onPremisesSamAccountName,displayName)/$entity",
		"id": "2f0d6c10-478b-4eec-8e46-fb15f3059505",
		"userPrincipalName": "bjarne.betjent@vtfk.no",
		"onPremisesSamAccountName": "bja0101",
		"displayName": "Bjarne Betjent"
	},
  "tabs": [
    {
      "tabName": "Min kalender",
      "sortOrder": 0,
      "events": [
        {
          "@odata.etag": "W/\"htrw3CXHkEmMjjj3SJzW-QACyhcskW==\"",
          "id": "AAMkAGQzNmVmNerthaeggweHJWRTHAEGDBCERHARDQzNWUwNgFRAAgI2gepFG6AAEYAAAAAu9_xSYNztEujFIIju8KWlAcAVGES3CXHkEmMtky6SJzW_QAAAAABDQAAVGES3CXHkEmMtky6SJzW_QACfY_eDwAAEA==",
          "createdDateTime": "2021-11-09T09:06:46.1167124Z",
          "lastModifiedDateTime": "2022-03-08T16:19:57.1554001Z",
          "changeKey": "VGES3CXHerehggaerrwtyW+QACyhcsKw==",
          "categories": [],
          "transactionId": "9c298e24-c329-0000-0000-906a8cf44ddf",
          "originalStartTimeZone": "UTC",
          "originalEndTimeZone": "UTC",
          "iCalUId": "040000008200E00074C5B7101A82E0056765456782376527386TR882387968782383872382828872357283587253",
          "reminderMinutesBeforeStart": 420,
          "isReminderOn": false,
          "hasAttachments": false,
          "subject": "Subject",
          "bodyPreview": "",
          "importance": "normal",
          "sensitivity": "normal",
          "isAllDay": true,
          "isCancelled": false,
          "isOrganizer": true,
          "responseRequested": true,
          "seriesMasterId": "AAMkAGQzNmVmNTdmLsljnbglerglabgilweugiiuvhFGSRYKU37FJg3O0S6MUgiO7wpaUBwBUYRLcJceQSYy2TLpInNb5AAAAAAENAABUYRLcJceQSYy2TLpInNb5AAJ9j54PAAA=",
          "showAs": "free",
          "type": "occurrence",
          "webLink": "https://outlook.office365.com/owa/?itemid=AAMkAGQzNmVmNTdmLsljnbglerglabgilweugiiuvhFGSRYKU37FJg3O0S6MUgiO7wpaUBwBUYRLcJceQSYy2TLpInNb5AAAAAAENAABUYRLcJceQSYy2TLpInNb5AAJ9j54PAAA=&exvsurl=1&path=/calendar/item",
          "onlineMeetingUrl": null,
          "isOnlineMeeting": false,
          "onlineMeetingProvider": "unknown",
          "allowNewTimeProposals": true,
          "isDraft": false,
          "hideAttendees": false,
          "recurrence": null,
          "onlineMeeting": null,
          "responseStatus": {
            "response": "organizer",
            "time": "0001-01-01T00:00:00Z"
          },
          "body": {
            "contentType": "html",
            "content": ""
          },
          "start": {
            "dateTime": "2022-03-17T00:00:00.0000000",
            "timeZone": "UTC"
          },
          "end": {
            "dateTime": "2022-03-18T00:00:00.0000000",
            "timeZone": "UTC"
          },
          "location": {
            "displayName": "",
            "locationType": "default",
            "uniqueIdType": "unknown",
            "address": {},
            "coordinates": {}
          },
          "locations": [],
          "attendees": [],
          "organizer": {
            "emailAddress": {
              "name": "Bjarne Betjent",
              "address": "bjarne.betjent@vtfk.no"
            }
          }
        }
      ]
    }
  ]
}
```

## Development

- Clone the repo
- Install the dependencies: ```$ npm i```
- Add local settings file as described below
- Start the development server: ```$ func start```

### Local settings
*.local.settings.json* file:
```json
{ 
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "{AzureWebJobsStorage}",
    "cache": true,
    "FALLBACK_LOGICAPP_URL": "<access-endpoint-url-to-logic-app>",
    "GRAPH_AUTH_CLIENT_ID": "<app-registration-clientId>",
    "GRAPH_AUTH_SECRET": "<app-registration-secret>",
    "GRAPH_CONFIG_LISTID": "<sharepoint-listId>",
    "GRAPH_CONFIG_SITEID": "<sharepoint-siteId>",
    "GRAPH_EVENTS_TOP": 100,
    "GRAPH_ME_ENDPOINT": "https://graph.microsoft.com/v1.0/me",
    "GRAPH_ORG_ENDPOINT": "https://graph.microsoft.com/v1.0/organization",
    "GRAPH_TENANT_ID": "<tenantId>"
  },
  "Host": {
    "CORS": "*"
  }
}
```

## Deploy Azure functions

- Create an Azure function to deploy to.
- Deploy to Azure: ```$ func azure functionapp publish <function name>```


## License

[MIT](LICENSE)
