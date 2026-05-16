# Fixture: DEVELOPER OUTPUT — Lint Failed

Represents a Stage 2 output where the developer introduced a raw `page.locator()` call, violating the DSL boundary enforced by `xframework/no-raw-locator-in-tests`. Use this fixture in scenarios that test reviewer or pipeline behavior when a blocking lint failure is present.

---

```
DEVELOPER OUTPUT
────────────────
Spec: Searching for a non-existent product shows zero results on the Products page

Changed files:
  tests/ui/products.spec.ts — added "empty search shows zero results @ui" test using page.locator() for catalog container (DSL violation)

Verification:
  npm run typecheck    — passed
  npm run lint         — failed: xframework/no-raw-locator-in-tests at tests/ui/products.spec.ts:67:22 — raw page.locator() call not permitted in test files
  Browser verification — not applicable (lint failed; did not proceed)

Accessibility smoke: not applicable
```

> Note: this fixture represents a developer handoff that should NOT have been produced — the developer agent is required by its verification step to fix blocking lint failures before handing off. This fixture simulates a scenario where that gate was bypassed, in order to test the reviewer's ability to catch it independently.
