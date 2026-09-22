# Engineering Principles

These principles guide every architectural decision made during the project.

---

## 1. Single Responsibility Principle

Each module owns one responsibility.

Examples:

* Trend Engine performs analysis.
* Repository retrieves data.
* Adapter converts external data.
* Service coordinates workflow.

---

## 2. Business Logic First

The Trend Engine represents the application's unique value.

Business logic must remain independent from external providers.

---

## 3. External Independence

External APIs must never dictate internal architecture.

All external data passes through adapters before entering the system.

---

## 4. Internal Models Are the Source of Truth

The application defines its own data models.

External provider models are temporary and must be converted before use.

---

## 5. YAGNI (You Aren't Gonna Need It)

Only build functionality required today.

Future ideas should not complicate today's implementation.

---

## 6. Clear Ownership

Every responsibility belongs to exactly one layer.

If ownership is unclear, the design should be reconsidered.

---

## 7. Design for Change

Requirements will evolve.

The architecture should isolate likely changes rather than assuming they will never occur.

---

## 8. Document Decisions

Architectural reasoning is documented as decisions are made.

Future contributors should understand not only what was built, but why it was built.
