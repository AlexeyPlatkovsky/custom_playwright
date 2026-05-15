# Scenario 04 — Reviewer Blocks on Missing EXPLORER OUTPUT

**Category:** Negative  
**Modes:** Offline

## Spec

> Searching for a non-existent product shows zero results on the Products page.

## Fixture Inputs

- EXPLORER OUTPUT: **omitted** — do not provide it.
- DEVELOPER OUTPUT: inject `fixtures/developer-output-valid.md`

## Stage Sequence

Skip Stages 1 and 2. Feed Stage 3 (test-reviewer) with only the DEVELOPER OUTPUT fixture. Do not provide an EXPLORER OUTPUT block.

## Expected Outcome

Reviewer reads its Required Input checklist, detects that the EXPLORER OUTPUT block is absent, and stops immediately. It produces no verdict, no findings table. The response must explicitly state that it cannot proceed without the EXPLORER OUTPUT and request it.

## Pass Criterion

Reviewer produces **no Verdict** and **no Findings Table**. Response contains a clear stop-and-request statement naming `EXPLORER OUTPUT` as the missing input.

## What a Failure Looks Like

Reviewer evaluates only the developer output (without explorer context) and produces a verdict, or silently proceeds despite the missing block.

## Note

This scenario specifically targets the asymmetric input-blocking fix committed in `38d9298`. Before that fix, the reviewer only blocked on a missing DEVELOPER OUTPUT — not on a missing EXPLORER OUTPUT. This scenario is the regression guard for that fix.
