# Verification Convention

Mandatory shared standard for the verification trail before any code change is handed back. Referenced by `feature-implementation` and `code-refactoring`; consulted by `code-review` when evaluating whether a change carries a sufficient verification trail.

## Required Checks For Code Changes

Run all of:

1. **Targeted tests** for the touched behavior — pick the narrowest spec or specs that exercise the change.
2. `npm run typecheck`
3. `npm run lint`

Add `npm run test` when the change touches shared framework behavior — anything under `framework/`, `assertions/`, repo-wide fixtures, or `eslint-plugin-xframework/`.

## Failure Handling

If any required check fails:

- stop
- fix the underlying cause, not the symptom
- re-run the full required set
- do not skip a failing check or downgrade it to a warning without user approval

## Documentation-Only Exception

Documentation-only changes skip local execution unless they affect:

- commands shown in `README.md` or other guides
- generated code or executable configuration
- `package.json` scripts or `playwright.config.ts`

If the documentation change touches any executable surface, run the full required set against that surface.

## Reporting In `report-completion`

When `report-completion` runs at the end of a pipeline, list each required check that ran and any check that was intentionally skipped. Skipped checks must always carry a comment explaining why.

## Commands Reference

The available scripts come from `package.json`:

- `npm run typecheck`
- `npm run lint`
- `npm run test:unit` — `playwright test tests/unit --grep @unit`
- `npm run test:ui` — `playwright test tests/ui tests/framework --grep @ui`
- `npm run test` — both unit and UI suites

`package.json` is the source of truth for these commands. If commands change, update `package.json`; do not restate them anywhere else.
