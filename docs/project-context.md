# Project Context

## Project

**Quick Trends Analysis**

## Overview

Quick Trends Analysis is a basketball trend analysis application designed to help bettors research games faster using historical statistics and predefined trend rules.

The application is **not a prediction engine**. It does not attempt to predict winners or generate betting tips. Instead, it analyzes historical game data against user-selected markets and presents objective trend information.

Example analyses include:

* Team Total Over trends
* Team Total Under trends
* First Half Team Total trends
* Full Game Total trends

The first version focuses on **NBA** only. Additional leagues will be considered after the architecture has been validated.

---

# Current Goal

Build Version 1 using a clean, maintainable architecture that separates business logic from external data providers.

The project emphasizes engineering quality over development speed.

---

# Architecture Philosophy

The application follows layered architecture.

Each layer owns one responsibility.

* UI collects user input.
* Services coordinate application flow.
* Repositories retrieve and store data.
* Adapters normalize external provider data.
* Trend Engine contains business rules only.

Business logic must never depend directly on an external API.

---

# Technology Stack

Frontend

* React
* TypeScript
* Vite

Backend

* Node.js
* Express
* TypeScript

Version Control

* Git

---

# Current Status

Completed

* Repository initialized
* Frontend created
* Backend initialized
* Documentation structure created

Next

* Configure backend TypeScript
* Start Express server
* Build backend folder structure

---

# Documentation Strategy

Documentation is maintained throughout development.

Architectural decisions are recorded when they are made rather than being reconstructed later.

The documentation is intended to allow project continuity across conversations and provide onboarding material for future contributors.
