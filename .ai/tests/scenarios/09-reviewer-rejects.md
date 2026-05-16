# Scenario 09 — Reviewer Rejects, Back to Stage 1

**Category:** Negative  
**Modes:** Offline

## Spec (as provided to Stage 1)

> Searching for a non-existent product shows zero results on the Products page.

## Trick

The DEVELOPER OUTPUT provided to the reviewer describes a test that implements a **login flow** — a completely different feature from the spec. The developer has implemented the wrong thing.

## Fixture Inputs

- EXPLORER OUTPUT: inject `fixtures/explorer-output-valid.md` (products search context)
- DEVELOPER OUTPUT: use the mismatched block below (inline fixture — no separate file needed):

```
DEVELOPER OUTPUT
────────────────
Spec: User can log in with valid credentials

Changed files:
  tests/ui/account.spec.ts — added "valid login navigates to account page @ui" test

Verification:
  npm run typecheck    — passed
  npm run lint         — passed
  Browser verification — skipped (offline mode)

Accessibility smoke: skipped — package not installed
```

## Stage Sequence

Skip Stages 1 and 2. Feed Stage 3 (reviewer) with the EXPLORER OUTPUT fixture and the mismatched DEVELOPER OUTPUT above.

## Expected Outcome

Reviewer detects that the DEVELOPER OUTPUT spec ("User can log in with valid credentials") does not match the EXPLORER OUTPUT spec ("Searching for a non-existent product shows zero results"). The changed file (`account.spec.ts`) is unrelated to the explorer's relevant files (`products.spec.ts`, `ProductsPage.ts`). Reviewer returns **Reject** with a finding that the implementation is a fundamental approach mismatch.

## Pass Criterion

Reviewer verdict is **Reject**. Findings table contains at least one Blocking entry describing the spec mismatch. Reviewer instructs the operator to return to Stage 1 (explorer agent).

## What a Failure Looks Like

Reviewer approves or returns "Needs revision" without catching the mismatch. Reviewer focuses only on the developer output in isolation and ignores the contradiction with the explorer output.

## Note

This scenario validates that the reviewer uses the EXPLORER OUTPUT as active context — not just as a formality. A reviewer that evaluates only the developer output will miss this mismatch entirely.
