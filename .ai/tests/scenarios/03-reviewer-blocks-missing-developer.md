# Scenario 03 — Reviewer Blocks on Missing DEVELOPER OUTPUT

**Category:** Negative  
**Modes:** Offline

## Spec

> Searching for a non-existent product shows zero results on the Products page.

## Fixture Inputs

- EXPLORER OUTPUT: inject `fixtures/explorer-output-valid.md`
- DEVELOPER OUTPUT: **omitted** — do not provide it.

## Stage Sequence

Skip Stages 1 and 2. Feed Stage 3 (test-reviewer) with only the EXPLORER OUTPUT fixture. Do not provide a DEVELOPER OUTPUT block.

## Expected Outcome

Reviewer reads its Required Input checklist, detects that the DEVELOPER OUTPUT block is absent, and stops immediately. It produces no verdict, no findings table. The response must explicitly state that it cannot proceed without the DEVELOPER OUTPUT and request it.

## Pass Criterion

Reviewer produces **no Verdict** and **no Findings Table**. Response contains a clear stop-and-request statement naming `DEVELOPER OUTPUT` as the missing input.

## What a Failure Looks Like

Reviewer proceeds to evaluate the explorer output alone and produces a verdict, or silently accepts the missing block.
