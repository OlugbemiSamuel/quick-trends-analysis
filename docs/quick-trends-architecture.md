# Quick Trends Architecture

## Purpose

Quick Trends is a basketball trend analysis backend.

Version 1 does NOT predict bets.

It analyzes historical game data and reports statistical trends for a selected betting market.

Example:

- Lakers Team Total Over 110.5
- Hit Rate: 8/10
- Average Score: 117.4

The frontend or user decides whether to place a bet.

---

# Engineering Principles

We follow:

- Separation of Concerns
- Single Responsibility Principle
- Loose Coupling
- Domain-first design
- External APIs never leak into our business logic

Everything inside our application should work even if Balldontlie is replaced tomorrow.

---

# Architecture

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

External API

↓

Repository

↓

Adapter

↓

Repository returns internal models

↓

Service

↓

Trend Engine

↓

Service

↓

Controller

↓

Client

---

# Folder Responsibilities

## Routes

Responsible for URL registration only.

Example:

GET /trends

Routes never contain business logic.

---

## Controllers

Responsible for HTTP.

Receive Request.

Return Response.

Controllers never calculate trends.

Controllers never know how APIs work.

Controllers only coordinate.

---

## Services

Responsible for application use cases.

Services answer questions like:

"What steps are required to analyze a trend?"

Typical responsibilities:

- fetch games
- call trend engine
- build response

Services orchestrate work.

They do not contain mathematical calculations.

---

## Repository

Responsible for obtaining data.

Current data source:

Balldontlie API.

Future:

Database
Cache
Another API

The service should never know where data comes from.

---

## Adapter

Responsible for translating external models into internal models.

Balldontlie

↓

Game

Example:

home_team_score

↓

homeScore

Adapters isolate our code from third-party APIs.

If Balldontlie changes tomorrow,

only adapters change.

---

## Trend Engine

Responsible for business rules.

Everything that calculates statistics lives here.

Examples:

extractTeamScores()

calculateHits()

calculateAverageScore()

calculateHitRate()

Future:

calculateLast5Trend()

calculateHomeTrend()

calculateAwayTrend()

calculateOpponentTrend()

Trend Engine knows nothing about HTTP.

Trend Engine knows nothing about Balldontlie.

It only understands Game objects.

---

# Internal Domain Models

Team

- id
- name
- shortName

Game

- id
- date
- season
- status
- homeTeam
- awayTeam
- homeScore
- awayScore
- homePeriods
- awayPeriods

TrendResult (planned)

- hitRate
- hits
- misses
- averageScore

---

# Current Request Flow

User requests:

Lakers
Season 2025
Last 10 games

↓

Controller

↓

Service

↓

Repository fetches games

↓

Adapter converts Balldontlie response

↓

Repository returns Game[]

↓

Service sends Game[] into Trend Engine

↓

Trend Engine calculates

- scores
- hits
- averages
- hit rate

↓

Service builds TrendResult

↓

Controller returns JSON

---

# Current Version 1 Scope

Supported:

- Team Total Over

Output:

- Average Score
- Hits
- Misses
- Hit Rate

Not included:

- Predictions
- Confidence score
- AI
- Home/Away splits
- Opponent adjustments
- Pace
- Offensive rating

These will be added incrementally.

---

# Current Design Decisions

Adapters translate external models.

Repositories fetch data.

Services orchestrate.

Trend Engine calculates.

Controllers handle HTTP.

Every layer has one responsibility.

---

# Why Adapters Exist

To protect the application from third-party API changes.

If Balldontlie changes

home_team_score

to

homePoints

only the adapter changes.

Everything else continues working.

---

# Why Repositories Exist

To hide where data comes from.

Today:

Balldontlie

Tomorrow:

Database

Cache

Another API

No service code changes.

---

# Why Services Exist

Services coordinate application workflows.

Example:

Fetch games

↓

Calculate trend

↓

Return TrendResult

---

# Why Engines Exist

Engines contain reusable business calculations.

They should be callable from anywhere.

Today:

Team Total

Tomorrow:

Player Props

Opponent Trends

League Trends

No controller or repository changes required.

---

# Version 1 Goal

Ship a working backend capable of analyzing Team Total trends accurately before adding more betting markets.

Correct architecture first.

Features second.

Optimization later.




Current Progress

✅ Express server

✅ Routes

✅ Controller

✅ Balldontlie repository

✅ Adapter mapping

✅ Internal Game model

✅ Successfully fetching and mapping games

✅  Trend calculation helper functions (currently inside trends.service.ts)

- extractTeamScores()
- calculateHits()
- calculateAverageScore()
- calculateHitRate()

Future refactor:
Move pure calculation functions into trend.engine.ts after the feature flow is working.

Next task

Connect:

Repository
↓

Service
↓

Trend Engine
↓

TrendResult
↓

Controller


AND 
# Current Implementation State

Repository and adapter are working.

The Balldontlie API returns external game data.

The adapter transforms:

Balldontlie Game
        ↓
Internal Game model

Example transformations:

home_team → homeTeam

visitor_team → awayTeam

home_team_score → homeScore

visitor_team_score → awayScore

The endpoint has been tested successfully and returns internal Game[] objects.

Next implementation step:

Create analyzeTrendService() that:

1. Receives analysis input.
2. Gets games from repository.
3. Extracts relevant team scores.
4. Applies trend calculations.
5. Returns TrendResult.