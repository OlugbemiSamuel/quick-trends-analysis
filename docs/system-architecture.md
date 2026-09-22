The primary goal of this architecture is separation of concerns.

Each layer has a specific responsibility and should not take over responsibilities belonging to another layer.

---

# System Flow

The complete analysis flow is:

```text
Frontend
    ↓
Backend API
    ↓
Routes
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
BallDontLie API
    ↓
Adapter
    ↓
Internal Game Model
    ↓
Service
    ↓
Trend Engine
    ↓
Trend Result
    ↓
Controller
    ↓
Frontend
```

The request moves downward through the application to retrieve and transform the required data.

The resulting domain data then moves through the analysis layer and eventually returns to the frontend as an analysis result.

---

# Backend Structure

The backend follows a layered project structure:

```text
backend/
└── src/
    ├── adapter/
    │   └── balldontlie.adapter.ts
    │
    ├── config/
    │
    ├── controllers/
    │
    ├── engine/
    │   └── trend.engine.ts
    │
    ├── errors/
    │
    ├── middleware/
    │
    ├── repository/
    │   └── balldontlie.repository.ts
    │
    ├── routes/
    │
    ├── services/
    │   └── trends.service.ts
    │
    └── types/
        ├── games.types.ts
        ├── trends.types.ts
        └── balldontlie.types.ts
```

---

# Layer Responsibilities

## Routes

Routes are responsible for registering HTTP endpoints and connecting them to controllers.

They should not contain business logic, data access, or trend calculations.

Example responsibility:

```text
POST /trends/analyze
        ↓
analyzeTrends controller
```

The route determines **which controller handles the request**, but does not determine how the analysis is performed.

---

## Controllers

Controllers handle HTTP concerns.

Their responsibilities include:

- Reading request data
- Performing basic request-level validation
- Calling the appropriate service
- Returning HTTP responses
- Passing errors to the error-handling middleware

Controllers should not:

- Calculate trends
- Fetch external API data directly
- Call repositories directly
- Contain business logic

The controller acts as the boundary between HTTP and the application's internal logic.

---

## Services

Services coordinate the application workflow.

For team trend analysis, the service:

1. Receives the analysis query
2. Validates the application-level inputs
3. Requests the required games from the repository
4. Handles the no-data case
5. Passes the retrieved domain data and analysis parameters to the trend engine
6. Returns the calculated result

The service coordinates the work but does not perform the statistical calculations itself.

This keeps application orchestration separate from domain calculations.

---

## Repository

The repository is responsible for retrieving data from the external data source.

For Quick Trends, the repository communicates with the BallDontLie API.

The repository:

- Builds the external API request
- Sends the request
- Handles external data retrieval
- Passes retrieved data through the adapter
- Returns application-friendly domain data

The repository does not know how trend calculations work.

For example, the repository does not receive or calculate the target scoring line.

Its responsibility is to answer a question such as:

```text
"Give me these team's games for this season."
```

rather than:

```text
"Tell me whether this team scored above 120."
```

This keeps data access separate from business logic.

---

# External API Integration

Quick Trends uses the BallDontLie API as its external basketball data source.

The external API has its own data structures and naming conventions.

Quick Trends therefore does not allow external API response objects to spread throughout the application's business logic.

The integration is separated into two main parts:

```text
Repository
    ↓
BallDontLie API
    ↓
External API data
    ↓
Adapter
    ↓
Internal Game model
```

---

# Adapter

The adapter is responsible for transforming BallDontLie API data into Quick Trends' internal domain model.

For example, the external API may use fields such as:

```text
home_team
visitor_team
```

while Quick Trends uses:

```text
homeTeam
awayTeam
```

The adapter performs this transformation.

Conceptually:

```text
BallDontLie Game
       ↓
   Adapter
       ↓
Quick Trends Game
```

The internal model is then used by the service and trend engine.

---

# Why Use an Adapter?

The adapter creates a boundary between Quick Trends and the external API.

Without an adapter, the application's business logic would need to understand the BallDontLie response structure directly.

That would create tighter coupling between the application's core logic and the external provider.

With the adapter:

```text
BallDontLie API
       ↓
    Adapter
       ↓
Internal Game
       ↓
Service / Trend Engine
```

This means the trend engine works with Quick Trends' own `Game` model instead of depending on the external API's response structure.

If the external API changes field names or response structure, the adapter becomes the primary boundary that needs to be updated rather than requiring those external changes to spread throughout the application.

---

# Internal Domain Model

Quick Trends uses an internal `Game` model to represent the basketball game data required by the application.

The internal model provides a stable representation for the rest of the application.

Conceptually:

```text
External API Model
        ↓
     Adapter
        ↓
Internal Game Model
        ↓
Service
        ↓
Trend Engine
```

The trend engine therefore does not need to know where the game data originally came from.

It only needs the domain data required to perform the analysis.

---

# Type Contracts

Quick Trends separates different types of data contracts.

## `balldontlie.types.ts`

Contains types representing the external BallDontLie API data structure.

These types describe the external provider's response.

```text
BallDontLie API
      ↓
BallDontLie types
```

---

## `games.types.ts`

Contains Quick Trends' internal game/domain model.

This is the model used by the application's internal layers.

```text
Internal Game
```

The purpose is to prevent external API structures from becoming the application's internal data model.

---

## `trends.types.ts`

Contains types related to trend analysis.

This includes contracts for:

- Team trend analysis requests
- Trend engine input
- Trend results

For example, the application-level query contains:

```text
season
teamName
limit
line
```

After the service retrieves the games, the trend engine receives the domain data it needs for analysis:

```text
games
teamName
line
```

These are separate contracts because they represent different stages of the application workflow.

---

# Trend Engine

The trend engine contains the business logic used to calculate historical trend statistics.

It is intentionally separated from:

- HTTP
- Express
- Controllers
- Routes
- External APIs
- Repositories

The engine receives domain data and analysis parameters and produces a trend result.

Conceptually:

```text
Game[]
  +
Team Name
  +
Target Line
  ↓
Trend Engine
  ↓
Trend Result
```

---

# Trend Calculation

The trend engine performs several calculations.

## 1. Extract Team Scores

The engine determines which score belongs to the requested team for each game.

For every game:

```text
Is the requested team the home team?
        ↓
       Yes → use home score

       No
        ↓
Is the requested team the away team?
        ↓
       Yes → use away score
```

This produces an array of team scores.

Example:

```text
Games
↓
[118, 121, 115, 123, 117]
```

---

## 2. Calculate Hits

Each team score is compared against the supplied target line.

For example, with a target line of `120`:

```text
118 → miss
121 → hit
115 → miss
123 → hit
117 → miss
```

The engine counts the number of games where:

```text
score > line
```

---

## 3. Calculate Misses

Misses are derived from the number of analyzed games and the number of hits:

```text
misses = totalGames - hits
```

---

## 4. Calculate Average Score

The engine calculates the average score across the analyzed games:

```text
averageScore =
total team score / number of games
```

The result is rounded to two decimal places.

---

## 5. Calculate Hit Percentage

The hit percentage is calculated from:

```text
hits / totalGames
```

and converted into a percentage.

For example:

```text
5 hits
10 games

5 / 10 = 0.5

0.5 × 100 = 50%
```

---

# Analysis Result

The trend engine returns a result containing the calculated statistics.

Example:

```json
{
  "hits": 5,
  "averageScore": 117.6,
  "hitPercentage": 100,
  "misses": 0,
  "totalGames": 5
}
```

The controller then returns this result to the frontend as JSON.

---

# Request and Response Flow

A complete request looks like this:

```text
1. User submits analysis form
            ↓
2. Frontend sends POST request
            ↓
3. Route receives request
            ↓
4. Controller reads request body
            ↓
5. Service receives analysis query
            ↓
6. Service requests games from repository
            ↓
7. Repository calls BallDontLie API
            ↓
8. API returns external game data
            ↓
9. Adapter converts external data
            ↓
10. Repository returns Game[]
            ↓
11. Service passes Game[] + analysis parameters
    to Trend Engine
            ↓
12. Trend Engine calculates statistics
            ↓
13. Service returns Trend Result
            ↓
14. Controller returns JSON response
            ↓
15. Frontend displays the result
```

---

# Validation and Error Handling

Quick Trends uses different error responses depending on where the failure occurs.

## `400 Bad Request`

Used when the request contains invalid input.

Examples include:

- Missing required input
- Incorrect input type
- Invalid analysis parameters

---

## `404 Not Found`

Used when the requested analysis cannot be performed because no games were returned for the requested query.

---

## `502 Bad Gateway`

Used when Quick Trends cannot successfully retrieve data from the external BallDontLie provider.

This distinguishes an external dependency failure from an error caused by the user's request.

---

## `500 Internal Server Error`

Used for unexpected errors that are not handled by the application's specific error cases.

---

# Error Handling Flow

Errors from the controller are passed to Express' error-handling middleware:

```text
Controller
    ↓
next(error)
    ↓
Error Middleware
    ↓
HTTP Error Response
    ↓
Frontend
```

The frontend can then display the returned error message to the user.

---

# Middleware

Quick Trends also uses Express middleware for cross-cutting HTTP concerns.

Examples include:

- JSON body parsing
- CORS
- Request logging
- Error handling

The general request pipeline is:

```text
Incoming Request
      ↓
express.json()
      ↓
Logger
      ↓
CORS
      ↓
Routes
      ↓
Controllers
      ↓
Services
      ↓
...
```

Middleware is kept separate from controllers so these concerns do not have to be duplicated across individual endpoints.

---

# Frontend Architecture

The frontend uses a component-based React structure.

Conceptually:

```text
App
 │
 ├── AnalysisForm
 │
 └── TrendResultCard
```

The frontend also separates API communication from UI components through a frontend service:

```text
React Component
      ↓
Frontend Service
      ↓
fetch()
      ↓
Backend API
```

This prevents the components from having to contain the details of constructing API requests.

---

# Frontend State Flow

The main analysis state is driven by the request lifecycle.

Initial state:

```text
Form
```

During the request:

```text
Form
 ↓
Loading
```

After success:

```text
Loading
 ↓
Result
```

After failure:

```text
Loading
 ↓
Error
 ↓
Try Again
```

The result view replaces the form after a successful analysis to keep the interface focused on the current result.

---

# Architectural Principles

Quick Trends follows several architectural principles.

## Separation of Concerns

Each layer has a defined responsibility.

```text
Routes       → URL registration
Controllers  → HTTP handling
Services     → Application workflow
Repository   → Data access
Adapter      → Data transformation
Engine       → Business calculations
```

---

## Single Responsibility

A component or layer should have one primary reason to change.

For example:

- A controller changes when the HTTP contract changes.
- A repository changes when data access changes.
- An adapter changes when the external API structure changes.
- The trend engine changes when the trend calculation rules change.

---

## Loose Coupling

The application avoids making the trend engine depend directly on the external BallDontLie API.

Instead:

```text
External API
     ↓
Adapter
     ↓
Internal Model
     ↓
Business Logic
```

This creates a boundary between external infrastructure and application logic.

---

## Domain-First Design

The application's internal `Game` model is used by the business logic rather than allowing the external provider's response model to become the application's domain model.

This makes the business logic independent of the external API's naming conventions and response structure.

---

# Architectural Decision: Repository vs Trend Engine

One important separation in Quick Trends is the distinction between retrieving data and analyzing data.

The repository answers:

```text
"What games do we have?"
```

The trend engine answers:

```text
"What do these games mean for this analysis?"
```

For example, the repository receives:

```text
teamName
season
limit
```

The target scoring line does not belong in the repository because the repository does not need it to retrieve games.

The service combines the retrieved domain data with the analysis parameters before passing them to the trend engine.

```text
Service
   │
   ├── Game[]
   │
   ├── teamName
   │
   └── line
         ↓
   Trend Engine
```

This keeps data retrieval independent from business calculations.

---

# Architectural Decision: Why the Trend Engine Is Separate

The trend calculations were separated from the service so that the service remains focused on coordinating the application workflow.

Instead of:

```text
Service
 ├── Fetch games
 ├── Extract scores
 ├── Calculate hits
 ├── Calculate average
 ├── Calculate percentage
 └── Return result
```

the application uses:

```text
Service
 ├── Validate input
 ├── Retrieve games
 └── Call Trend Engine
          ↓
      Calculations
          ↓
      Trend Result
```

This makes the calculation logic easier to isolate, test, and extend as Quick Trends grows.

---

# Summary

The architecture separates Quick Trends into distinct responsibilities:

```text
Frontend
    ↓
Routes
    ↓
Controllers
    ↓
Services
    ↓
Repository
    ↓
External API
    ↓
Adapter
    ↓
Internal Domain Model
    ↓
Trend Engine
    ↓
Result
    ↓
Frontend
```

The key architectural boundary is between external data and internal application logic.

BallDontLie data is transformed into Quick Trends' own internal models before reaching the business logic.

This allows the application to keep HTTP handling, application orchestration, data access, external integration, data transformation, and business calculations independently organized.
