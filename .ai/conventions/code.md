# Code Convention

Mandatory shared standard for code authoring in playforge. Referenced by `feature-implementation`, `code-refactoring`, and `code-review`.

This file states the rules. Detailed authoring patterns live in the project docs and are referenced below; this file does not restate those patterns.

## Authoritative Detail

For full rules and examples, read:

- `docs/conventions/page-objects.md` — page object naming, structure, navigation
- `docs/conventions/components.md` — component scoping and composition
- `docs/guides/authoring-with-the-dsl.md` — assertion helpers, fixtures, tagging
- `docs/architecture/overview.md` — layer responsibilities and locked constraints

## Rules

### TypeScript

- TypeScript strict; do not introduce `any` for convenience
- target Node ≥22; do not use APIs missing in that runtime

### DSL Boundaries

- Page objects live under `pages/` and extend `xPage`
- Components live under `pages/components/` and extend `xComponent`
- `xLocator` is the only locator type used by pages, components, assertions, and logging
- Tests do not call `page.goto`, `page.locator`, or `page.getByRole`
- Components do not hold raw `Page` references and do not call `page.locator`
- Parameterized locators are methods returning `xLocator`, not stored properties

If a needed framework primitive is missing, stop and surface — adding to the framework is a separate task, not a license to bypass the DSL in tests.

### Assertion Helpers

- Use helpers under `assertions/` (visibility, text, state, count, attribute, URL, `softGroup`) when a helper fits
- Use raw `expect` only when no helper fits; if the same raw assertion appears in multiple specs, prefer adding a helper

### Test Placement And Tagging

- Browser-facing application specs: `tests/ui/`, tagged `@ui`
- Framework browser-facing coverage: `tests/framework/`, tagged `@ui`
- Framework and unit coverage: `tests/unit/`, tagged `@unit`
- Use `framework/fixtures/app.fixture` for browser specs that need the shared browser fixture

### Reporting

- Reporting stays on Playwright HTML + Allure
- Do not introduce custom reporter code without explicit user approval

### ESLint Guardrails

- Repo-local ESLint rules under `eslint-plugin-xframework/` enforce DSL boundaries
- Adding, modifying, or relaxing a rule is a risky change and requires user approval per `AGENTS.md`

## Reusing Existing Reference Flows

When adding new pages or components, mirror the patterns in `pages/HomePage.ts`, `pages/ProductsPage.ts`, `pages/ProductDetailsPage.ts`, and `tests/ui/products.spec.ts` rather than inventing parallel patterns.
