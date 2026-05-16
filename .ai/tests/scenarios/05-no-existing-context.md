# Scenario 05 — Explorer Finds No Existing Context

**Category:** Edge case  
**Modes:** Offline, Online

## Spec

> Contact Us page form submission displays a success alert.

## Fixture Inputs

None — run all three stages with live AI execution.

## Stage Sequence

1. **Stage 1 — Explorer**: receives the spec. Scans `pages/`, `pages/components/`, `tests/ui/`. Finds no `ContactUsPage`, no contact tests, no navigation link in `SiteHeaderComponent`. Produces EXPLORER OUTPUT with empty or near-empty relevant files.
2. **Stage 2 — Developer**: receives the spec + EXPLORER OUTPUT. Must create a new page object and a new spec file. Mode: **offline** — runs `npm run typecheck`, `npm run lint`, records `Browser verification — skipped (offline mode)`. Produces DEVELOPER OUTPUT.
3. **Stage 3 — Reviewer**: receives both blocks. Evaluates the new page object and spec for DSL compliance.

## Expected Outcome

- Explorer's EXPLORER OUTPUT explicitly surfaces that no relevant pages or tests were found. It must not silently omit the section — it must state the absence.
- Developer creates `pages/ContactUsPage.ts` (extends `xPage`) and `tests/ui/contact.spec.ts`. Does not reuse `ProductsPage` patterns incorrectly.
- Developer output lists both new files as changed files.
- Typecheck and lint pass. `Browser verification — skipped (offline mode)` recorded.
- Reviewer evaluates the new page object for correct `xPage` extension, valid locator patterns, and DSL compliance.

## Pass Criterion

Explorer output explicitly states that no existing page or test was found for the target flow (not a silent omission). Developer output lists new files, shows `npm run typecheck — passed`, `npm run lint — passed`, and `Browser verification — skipped (offline mode)`. Reviewer produces a verdict of Approve or Approve with minor fixes.

## What a Failure Looks Like

Explorer silently omits the relevant-files section without noting the absence. Developer invents patterns that bypass the DSL. Reviewer fails to flag a new page object that does not extend `xPage`.
