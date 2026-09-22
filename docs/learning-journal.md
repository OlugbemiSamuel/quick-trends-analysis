# Engineering Learning Journal

This journal records engineering lessons learned during the project.

---

# Entry 001

## Today I Built

The initial project foundation.

* Repository structure
* Frontend application
* Backend initialization
* Documentation structure

---

## Engineering Lessons

* Every module should have a single responsibility.
* Services coordinate; they should not analyze.
* Repositories retrieve data; they should not contain business rules.
* Adapters protect the application from external provider changes.
* Business logic belongs inside the Trend Engine.
* Internal models should never mirror external APIs directly.
* Dependencies should be added only when they solve a current problem.
* Good architecture begins by assigning ownership.

28th july 2026 
Today I learned:

Good engineering decisions aren't about choosing the most powerful technology. They're about choosing the technology that best fits the project's current goals, constraints, and stage of development.

2nd August 2026 
Today I learnt to ask have a mental chceklist before coding to help prevent freezing when i get a task 
Feature:
Input:
Output:
Steps:
Edge cases:

example:

Feature:
Calculate team over trend

Input:
Game[], teamId, line

Output:
hits, misses, averageScore, hitRate

Steps:
1. Find games containing team
2. Extract team scores
3. Compare scores to line
4. Count hits/misses
5. Calculate average

Edge cases:
- postponed games
- no games
- missing scores

## Backend Foundation

### Built

- Initialized backend project
- Configured TypeScript
- Configured Express
- Created first route
- Created first backend folder structure

### Engineering concepts

- app.listen() starts the server.
- app.get() defines behavior for a specific request.
- app.use() connects middleware and routers.
- Routes own HTTP behavior.
- server.ts assembles the application.
- Understanding responsibilities is more important than memorizing syntax.

### Biggest lesson

I don't need to memorize Express syntax yet.

I need to understand:
- why each file exists
- why each line exists
- which layer owns each responsibility

Syntax will come from repetition.

---

## Decisions I Can Defend

I separated the frontend and backend into independent applications because they own different responsibilities and dependencies.

I chose to normalize external API responses through adapters so the application's business logic remains independent of external providers.

I chose to build Version 1 around a small, focused scope instead of designing for every possible future feature.

---

## Topics Learned

* Layered Architecture
* Single Responsibility Principle
* Separation of Concerns
* YAGNI
* Dependency Ownership
* Internal vs External Models
* Business Logic Isolation

---

## Reflection

The biggest mindset shift has been moving from thinking about code files to thinking about responsibilities.

The goal is no longer simply to make the application work, but to understand why each part of the system exists and which problems it owns.
