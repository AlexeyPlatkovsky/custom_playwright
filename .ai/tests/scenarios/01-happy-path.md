# Scenario 01 — Happy Path

**Category:** Happy path  
**Modes:** Offline, Online

## Spec

> Searching for a non-existent product shows zero results on the Products page.

## Fixture Inputs

None — run all three stages with live AI execution.

## Stage Sequence

1. **Stage 1 — Explorer**: receives the spec above. Scans `pages/`, `pages/components/`, `tests/ui/`, `assertions/`, `framework/fixtures/`. Produces EXPLORER OUTPUT.
2. **Stage 2 — Developer**: receives the spec + EXPLORER OUTPUT. Implements the test. Runs `npm run typecheck` and `npm run lint`. In offline mode, stops here. In online mode, also runs `npm run test:ui`. Produces DEVELOPER OUTPUT.
3. **Stage 3 — Reviewer**: receives both blocks. Evaluates for DSL compliance, selector quality, flakiness, and reuse. Produces Verdict + Findings.

## Expected Outcome

- Explorer identifies `pages/ProductsPage.ts`, `ProductsCatalogComponent.ts`, `tests/ui/products.spec.ts`, and applicable assertion helpers.
- Developer adds a test to `tests/ui/products.spec.ts` (does not create a new file). Test uses `searchProducts`, `assertUrl`, `assertTextEquals`, `assertCount`. No raw locators. Typecheck and lint pass.
- Reviewer verdict: **Approve** or **Approve with minor fixes**.

## Pass Criterion

Reviewer verdict is `Approve` or `Approve with minor fixes` AND the changed file is `tests/ui/products.spec.ts` AND the DEVELOPER OUTPUT block shows `npm run typecheck — passed`, `npm run lint — passed`, and `Browser verification — skipped (offline mode)`.
