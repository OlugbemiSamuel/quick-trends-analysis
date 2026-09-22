# Decision Log

This document records major engineering decisions and the reasoning behind them.

---

## Decision 001

### Separate frontend and backend applications

Decision

The frontend and backend are maintained as separate applications with independent `package.json` files.

Reason

Each application owns different dependencies and responsibilities.

This improves clarity, ownership, and maintainability.

---

## Decision 002

### Use TypeScript for frontend and backend

Decision

Both applications use TypeScript.

Reason

The project relies on domain models such as Game, Market, Team, and TrendResult.

Type safety protects these contracts and catches mistakes earlier.

---

## Decision 003

### Normalize external provider data

Decision

All external data must pass through an Adapter before entering the application.

Reason

Business logic should never depend on an external provider's response shape.

---

## Decision 004

### Trend Engine owns business rules

Decision

Trend calculations belong only inside the Trend Engine.

Reason

Repositories retrieve data.

Services coordinate flow.

The Trend Engine performs analysis.

Responsibilities remain separated.

---

## Decision 005

### Build incrementally

Decision

The project follows YAGNI.

Reason

Dependencies, features, and complexity are introduced only when required by current requirements.


## Why the repository doesn't accept `line`

The repository is responsible for retrieving game data.

`line` belongs to trend analysis, not data retrieval.

Therefore:

Repository:
teamId + season + limit
→ Game[]

Engine:
Game[] + teamId + line
→ TrendResult
