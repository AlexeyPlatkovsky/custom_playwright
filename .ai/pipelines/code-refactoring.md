# code-refactoring

Ordered pipeline for restructuring existing code in playforge without changing user-facing behavior: extracting a component, splitting a page, renaming an assertion helper, reshaping a fixture.

`manager` selects this pipeline and appends `report-completion` as the final step.

## When To Use

Use this pipeline when the goal is to reshape code while preserving behavior. Use `feature-implementation` when behavior is being added.

If the refactor crosses into framework core (`framework/core/`), shared fixtures (`framework/fixtures/`), or `eslint-plugin-xframework/` internals, treat it as system-level risk and follow the strongest review path per `manager`.

## Steps

1. **Frame the refactor.** State what is being reshaped, why, and what behavior must be preserved. Identify protective tests that already cover the touched behavior. If protection is thin, stop and surface that to the user before editing — the refactor cannot proceed without a behavior baseline.

2. **Read authoritative sources.** Same set as `feature-implementation` step 2. In addition, read the existing implementation thoroughly before touching it.

3. **Establish a behavior baseline.** Before making changes:
   - run targeted tests covering the touched behavior and confirm they pass
   - run `npm run typecheck` and confirm it passes
   - run `npm run lint` and confirm it passes

   If any of these fail before the refactor, stop and surface — the refactor cannot run against an unstable baseline.

4. **Refactor under DSL boundaries.** Follow `.ai/conventions/code.md`. Preserve the public API of the touched abstraction unless the user has approved a breaking rename. Do not change behavior incidentally.

5. **Run verification.** Per `.ai/conventions/verification.md`:
   - re-run the same targeted tests from step 3 — they must still pass without modification
   - run `npm run typecheck`
   - run `npm run lint`
   - run `npm run test` when shared framework behavior is touched

   If a previously passing targeted test now fails or had to be modified, stop. Either the refactor changed behavior (route as `feature-implementation` instead) or the test was wrong (route as a separate task).

6. **Hand off.** Pipeline ends here. `manager` appends `report-completion`.

## Validation Gate

This pipeline's defining gate is **behavior preservation**: the targeted tests that passed before the refactor must pass after the refactor without modification. If they don't, the refactor has either changed behavior or broken something — both require routing back through `manager`.
