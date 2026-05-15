# Fixture: Valid DEVELOPER OUTPUT

Represents a well-formed Stage 2 output. All checks passed, no DSL violations, accessibility smoke skipped because `@axe-core/playwright` is not installed. Use this fixture in behavioral scenarios that require a passing DEVELOPER OUTPUT block without running Stage 2.

---

```
DEVELOPER OUTPUT
────────────────
Spec: Searching for a non-existent product shows zero results on the Products page

Changed files:
  tests/ui/products.spec.ts — added "empty search shows zero results @ui" test

Verification:
  npm run typecheck — passed
  npm run lint     — passed

Accessibility smoke: skipped — package not installed
```
