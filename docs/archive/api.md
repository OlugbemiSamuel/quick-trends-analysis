# Quick Trends API

This document describes the HTTP API exposed by the Quick Trends backend.

## Base URL

### Development

```text
http://localhost:3000
```

---

# Endpoints

| Method | Endpoint          | Description                                |
| ------ | ----------------- | ------------------------------------------ |
| GET    | `/teams`          | Returns teams available for selection      |
| POST   | `/trends/analyze` | Analyzes a team's historical scoring trend |

---

# GET `/teams`

Returns the teams available for selection in the frontend.

The frontend uses this endpoint to populate the team search and selection interface.

## Request

```http
GET /teams
```

No request body is required.

## Example Response

```json
[
  {
    "id": 14,
    "name": "Los Angeles Lakers",
    "shortName": "LAL"
  }
]
```

## Response Fields

| Field       | Type   | Description       |
| ----------- | ------ | ----------------- |
| `id`        | number | Team identifier   |
| `name`      | string | Full team name    |
| `shortName` | string | Team abbreviation |

## Example

```bash
curl http://localhost:3000/teams
```

---

# POST `/trends/analyze`

Analyzes the selected team's historical scoring performance.

The endpoint retrieves the team's games for the requested season and sample size, then passes the games to the trend engine for statistical analysis.

## Request

```http
POST /trends/analyze
Content-Type: application/json
```

## Request Body

```json
{
  "teamId": 14,
  "season": 2025,
  "limit": 10,
  "line": 120
}
```

## Request Fields

| Field    | Type   | Required | Description                |
| -------- | ------ | -------- | -------------------------- |
| `teamId` | number | Yes      | ID of the selected team    |
| `season` | number | Yes      | Season to analyze          |
| `limit`  | number | Yes      | Number of games to request |
| `line`   | number | Yes      | Target scoring line        |

### `teamId`

The ID of the team selected by the user.

The frontend obtains this ID from the `/teams` endpoint rather than requiring the user to enter it manually.

### `season`

The season to analyze.

### `limit`

The number of recent games requested for the analysis.

The number of games actually analyzed may be lower if fewer games are returned by the external data provider.

### `line`

The target scoring line used by the trend engine.

A game is counted as a hit when the selected team scores **above** the specified line.

---

# Successful Response

## Status

```http
200 OK
```

## Example

```json
{
  "hits": 5,
  "averageScore": 117.6,
  "hitPercentage": 100,
  "misses": 0,
  "totalGames": 5
}
```

## Response Fields

| Field           | Type   | Description                                                              |
| --------------- | ------ | ------------------------------------------------------------------------ |
| `hits`          | number | Number of games where the team scored above the target line              |
| `averageScore`  | number | Average points scored across analyzed games                              |
| `hitPercentage` | number | Percentage of analyzed games where the team scored above the target line |
| `misses`        | number | Number of games where the team did not score above the target line       |
| `totalGames`    | number | Number of games actually analyzed                                        |

---

# Analysis Calculation

## Hits

A game is counted as a hit when:

```text
team score > target line
```

A score equal to the line is not counted as a hit because the comparison is strictly greater than the target line.

## Misses

Misses are calculated as:

```text
misses = totalGames - hits
```

## Average Score

The average score is calculated from the selected team's scores across the analyzed games.

```text
average score =
total team points / number of analyzed games
```

The result is rounded to two decimal places.

## Hit Percentage

The hit rate is calculated as:

```text
hits / totalGames
```

The resulting value is converted to a percentage.

For example:

```text
5 hits / 5 games = 1

1 × 100 = 100%
```

---

# Error Responses

Quick Trends uses centralized error handling for application errors.

## 400 Bad Request

Returned when required request inputs are missing or have invalid types.

### Missing Input

Example:

```json
{
  "teamId": 14,
  "season": 2025,
  "limit": 10
}
```

Response:

```http
400 Bad Request
```

```json
{
  "message": "One or more request inputs are missing"
}
```

### Invalid Input Type

Example:

```json
{
  "teamId": "14",
  "season": 2025,
  "limit": 10,
  "line": 120
}
```

Response:

```http
400 Bad Request
```

```json
{
  "message": "Request input must be numbers"
}
```

---

# 404 Not Found

Returned when no games are available for the requested team and season/query.

Response:

```http
404 Not Found
```

```json
{
  "message": "No games were returned for this team requested season/query"
}
```

---

# 502 Bad Gateway

Returned when the external BALLDONTLIE API request fails.

Example:

```http
502 Bad Gateway
```

```json
{
  "message": "Failed to fetch games for team 14 in season 2025"
}
```

---

# 500 Internal Server Error

Returned when an unexpected server-side error occurs.

The application uses centralized error-handling middleware to process unexpected errors.

---

# Request Flow

The `/trends/analyze` request follows the application's layered architecture:

```text
Client
  ↓
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
BALLDONTLIE API
  ↓
Adapter
  ↓
Internal Game[]
  ↓
Trend Engine
  ↓
Trend Result
  ↓
Service
  ↓
Controller
  ↓
Client
```

---

# Data Transformation

The external BALLDONTLIE response is not passed directly into the trend engine.

Instead, the repository retrieves the external data and the adapter converts it into Quick Trends' internal `Game` model.

Conceptually:

```text
BALLDONTLIE API Game
        ↓
mapApiToGame()
        ↓
Quick Trends Game
        ↓
Trend Engine
```

This keeps external API-specific data structures isolated from the application's business logic.

---

# Example Full Request

```bash
curl -X POST http://localhost:3000/trends/analyze   -H "Content-Type: application/json"   -d '{
    "teamId": 14,
    "season": 2025,
    "limit": 10,
    "line": 120
  }'
```

## Example Response

```json
{
  "hits": 5,
  "averageScore": 117.6,
  "hitPercentage": 100,
  "misses": 0,
  "totalGames": 5
}
```

---

# Frontend Integration

The frontend uses the API in two stages.

## 1. Fetch Teams

```text
GET /teams
```

The response populates the team search and selection interface.

The selected team's ID is stored by the frontend.

## 2. Analyze Selected Team

The frontend sends the selected team's ID together with the analysis parameters:

```text
POST /trends/analyze
```

Example:

```json
{
  "teamId": 14,
  "season": 2025,
  "limit": 10,
  "line": 120
}
```

The returned trend result is then displayed in the result card.

---

# API Design Notes

## Controllers

Controllers are responsible for HTTP concerns only.

They:

- Read request data
- Validate request-level input
- Call services
- Return HTTP responses
- Forward errors to middleware

## Services

Services coordinate the application workflow.

The trend analysis service:

1. Validates the analysis parameters
2. Retrieves the requested games through the repository
3. Handles an empty game result
4. Passes games and analysis parameters to the trend engine
5. Returns the calculated result

## Repository

The repository handles external data retrieval.

It does not contain trend calculations and does not know about the target scoring line.

## Trend Engine

The trend engine contains the statistical business logic.

It receives:

```ts
{
  (games, teamId, line);
}
```

and returns:

```ts
{
  (hits, averageScore, hitPercentage, misses, totalGames);
}
```

This keeps the statistical calculations independent of Express, HTTP, and the external API.

---

# API Version

Current API version:

```text
V1
```

The API is currently intended for the Quick Trends V1 application and may evolve as additional analysis capabilities are introduced.
