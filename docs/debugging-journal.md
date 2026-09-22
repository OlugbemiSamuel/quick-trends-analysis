# Debugging Journal

## Problem

What happened?

## Symptoms

What did I observe?

## Investigation

What assumptions did we test?

## Root Cause

What actually caused it?

## Lesson

What engineering concept did this teach?




Problem:
Backend server could not start.

Investigation:
Checked npm scripts instead of assuming Express was the issue.

Root cause:
The package.json on disk did not contain the expected dev script and module configuration.

Engineering lesson:
Always verify the actual system state before debugging higher-level problems.