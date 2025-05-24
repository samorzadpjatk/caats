# GraphQL -> REST API
Scraper seems to work as a client mostly, so the job will be replacing the calls to the API with REST calls instead of GQL calls. Scraper from what I understand uses web sockets too so we need to keep that in mind while reimplementing it.
The proposed structure for the API part:
More info about the port: https://docs.google.com/document/d/1g-o7MTq2NJNDfQHIFCOtPgmOs2UZYlDbnUBj-TlUQmo/edit?usp=sharing
## Authentication Endpoints
1. **G OAuth**: `/api/auth/google`
    - Method: POST
    - Body:
    ```json
    {
        "code": "string" // oauth code from google
    }
    ```
    - Response:
    ```json
    {
        "accessToken": "string",
        "sessionId": "string",
        "user": {
            // user stuff ... whole object or just id, not sure yet
        }
    }
    ```
    - src: `auth.resolver.ts`

2. **Logout**: `/api/auth/logout`
    - Method: POST
    - Headers: `Authorization: Bearer <token>`
    - Response: `{ "success": bool }
    - src: `auth.resolver.ts`

## User Endpoints
1. **Get Current User**: `/api/users/me`
    - Method: GET
    - Headers: `Authorization: Bearer <token>`
    - Response: 
    ```json
    {
        "id": "string",
        "email": "string",
        "name": "string",
        "picture": "string",
        "groups": ["string"],
        "isSuperuser": "boolean"
    }
    ```
    - src: `users.resolver.ts`, `schema.prisma`

2. **Update User Groups**: `/api/users/me/groups`
    - Method: PUT
    - Headers: `Authorization: Bearer <token>`
    - Body: 
    ```json
    {
        "groups": ["string"]
    }
    ```
    - Response: `{ "success": true }`
    - src: `users.resolver.ts`

3. **Get User Events**: `/api/users/me/events`
    - Method: GET
    - Headers: `Authorization: Bearer <token>`
    - Query parameters: 
        - `since` (optional): ISO datetime
        - `until` (optional): ISO datetime
        - `skip` (optional): int
        - `take` (optional): int
    - Response: array of `ScheduleEvent` objects
    - src: `gql.ts:184-189`, `gql.ts:159`

4. **Get User's Current Event**: `/api/users/me/current-event`
    - Method: GET
    - Headers: `Authorization: Bearer <token>`
    - Response: `ScheduleEvent` object or null
    - src: `gql.ts` based on `GqlUser.currentEvent`

4. **Get User's Next Event**: `/api/users/me/next-event`
    - Method: GET
    - Headers: `Authorization: Bearer <token>`
    - Response: `ScheduleEvent` object or null
    - src: `gql.ts` based on `GqlUser.nextEvent`

## Event endpoints

1. Get all events `/api/events`
    - method: GET
    - Query parameters:
        - `groups` (optional): group ids
        - `hosts` (optional): host ids
        - `since` (optional): ISO datetime
        - `until` (optional): ISO datetime
        - `skip` (optional): int
        - `take` (optional): int
    - Response: array of `ScheduleEvent` objects
    - src: `gql.ts:159`

2. Specific event `/api/events/:id`
    - method: GEt
    - Respons: `ScheduleEvent` object
    - src: `gql.ts:159`

## Groups

1. Get all groups `/api/groups`
    - method: GET
    - Query parameters:
        `filter` (optional): some filters?
    - Response: Array of strings (group IDs)

## Calendar subscription endpoints
1. Create sub `/api/subscriptions/
    - method: POST 
    - body:
    ```json
    {
        "groups": ["string"],
        "hosts": ["string"],
        "user": bool,
    }
    ```
    - response:
    ```json
    {
        "full": "string",
        "short": "string",
    }
    ```
    - src: `gql.ts:240`, `gql.ts:234`

## Tasks

1. Get all tasks `/api/tasks`
    - Method: GET
    - Headers: `Authorization: Bearer <token>` (Superuser required)
    - Response: Array of `StoredTask` objects
    - src: Based on `GqlQuery.tasks` in `gql.ts`

2. Create tasks in bulk `/api/tasks/bulk`
    - Method: POST
    - Headers: `Authorization: Bearer <token>` (Superuser required)
    - Body:
    ```json
    {
        "count": 5,
        "offset": 0
    }
    ```
    - Response: `{ "success": true }`
    - src: `supervisor.resolver.ts:59-63`

3. Update task state `/api/tasks/:id/state`
    - Method: PUT
    - Headers: Scraper authentication
    - Path Parameters: `id` - Task ID
    - Body:
    ```json
    {
        "state": "PENDING|RUNNING|SUCCESS|FAILED|CANCELLED|SKIPPED|OUTDATED"
    }
    ```
    - Response: `{ "success": bool }`
    - src: `supervisor.resolver.ts:38-44`

4. Finish task `/api/tasks/:id/finish`
    - Method: POST
    - Headers: Scraper authentication
    - Path Parameters: `id` - Task ID
    - Body:
    ```json
    {
        "hash": "string",
        "result": ["string"],
        "scaraperId": "string", // optional
    }
    ```
    - Response: `{ "success": true }`
    - src: `supervisor.resolver.ts:48-55`

## Scraper endpoints

1. Create scraper `/api/scrapers`
    - Method: POST
    - Headers: `Authorization: Bearer <token>` (Superuser required)
    - Body:
    ```json
    {
        "name": "string"
    }
    ```
    - Response: `{ "token": "string" }`
    - src: `supervisor.resolver.ts:85-97`, user is gathered from context?

2. Get ongoing scrapers `/api/scrapers/ongoing`
    - Method: GET
    - Response: Array of `WorkingScraper` objects
    - src: `supervisor.resolver.ts:94-96`

3. Get all scrapers `/api/scrapers`
    - Method: GET
    - Response: Array of `Scraper` objects
    - src: Based on `GqlQuery.scrapers` in `gql.ts`

## Event Sources endpoints

1. Get all event sources `/api/sources`
    - Method: GET
    - Response: Array of `EventSource` objects
    - src: Based on `GqlQuery.sources` in `gql.ts`

## Events search endpoint

1. Search events by description `/api/events/search`
    - Method: GET
    - Query Parameters:
        - `query`: Search string
    - Response: Array of `ScheduleEvent` objects
    - src: Based on `GqlQuery.findByDescription` in `gql.ts`

## Application Info endpoint

1. Get app info `/api/app`
    - Method: GET
    - Response:
    ```json
    {
        "version": "string",
        "node": "string",
        "platform": "string"
    }
    ```
    - src: `app.resolver.ts`
