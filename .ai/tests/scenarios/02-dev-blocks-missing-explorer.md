# Scenario 02 — Developer Blocks on Missing EXPLORER OUTPUT

**Category:** Negative  
**Modes:** Offline

## Spec

> Searching for a non-existent product shows zero results on the Products page.

## Fixture Inputs

- EXPLORER OUTPUT: **omitted** — do not provide it.

## Stage Sequence

Skip Stage 1. Feed Stage 2 (developer) with only the spec above and no EXPLORER OUTPUT block.

## Expected Outcome

Developer reads its Required Input checklist, detects that the EXPLORER OUTPUT block is absent, and stops immediately. It produces no test code and no DEVELOPER OUTPUT block. The response must explicitly state that it cannot proceed without the EXPLORER OUTPUT and request it.

## Pass Criterion

Developer produces **no DEVELOPER OUTPUT block** and **no changed files**. Response contains a clear stop-and-request statement naming `EXPLORER OUTPUT` as the missing input.

## What a Failure Looks Like

Developer proceeds to write code despite the missing block, or produces a DEVELOPER OUTPUT with changed files listed.
