# feature-implementation

Ordered pipeline for adding a new feature in playforge: page object, component, assertion helper, fixture extension, ESLint rule, or any combination thereof.

`manager` selects this pipeline and appends `report-completion` as the final step.

## When To Use

Use this pipeline for non-trivial additive work where new behavior is being introduced. Use `code-refactoring` if existing behavior is being reshaped without functional change. Use `code-review` if no code is being authored.

## Steps

1. **Frame the change.** State the user-facing intent, the touched abstractions (page, component, assertion helper, fixture, lint rule, framework core), and the expected blast radius. If intent or scope is ambiguous, stop and load `brainstorm` before continuing.

2. **Read authoritative sources.** Before editing, read:
   - `.ai/docs/project_specification.md` for recurring rules and rejected assumptions
   - `docs/architecture/overview.md` for layer placement and locked constraints
   - `docs/guides/authoring-with-the-dsl.md` for DSL usage
   - `docs/conventions/page-objects.md` and `docs/conventions/components.md` for naming and boundaries
   - existing reference flows (`pages/HomePage.ts`, `pages/ProductsPage.ts`, `pages/ProductDetailsPage.ts`, `tests/ui/products.spec.ts`) when adding new pages or components
   - `framework/core/` and `framework/fixtures/` when touching framework primitives

3. **Implement under DSL boundaries.** Follow `.ai/conventions/code.md`. Page objects extend `xPage`. Components extend `xComponent` and do not hold raw `Page`. Tests use page and component APIs and assertion helpers. If a needed framework primitive is missing, stop and surface — adding to the framework is a separate task, not a license to bypass the DSL in tests.

4. **Add or adjust tests.** Follow `.ai/conventions/code.md` for test placement and tagging. Tag browser specs `@ui`. Tag unit and framework specs `@unit`. Use `framework/fixtures/app.fixture` where applicable. Prefer `assertions/` helpers over raw `expect`.

5. **Run verification.** Per `.ai/conventions/verification.md`:
   - run targeted tests for the touched behavior
   - run `npm run typecheck`
   - run `npm run lint`
   - run `npm run test` when shared framework behavior changes

   If a verification step fails, stop, fix the underlying cause, and re-run the full required set.

6. **Hand off.** Pipeline ends here. `manager` appends `report-completion`.

## Validation Gate

This pipeline must complete step 5 with all required checks passing. If a check is intentionally skipped (e.g., the change is documentation-only with no executable impact), state which one and why so it surfaces in `report-completion`.
