# code-review

Ordered pipeline for reviewing changes in playforge — pull requests, branches, or proposed diffs. Read-only by default.

`manager` selects this pipeline and appends `report-completion` as the final step.

## When To Use

Use this pipeline for non-trivial review work where the goal is to evaluate changes against project rules without implementing edits.

For trivial review (one-line obvious correctness check), proceed directly without a pipeline.

If review surfaces required changes that the user wants implemented, classify that as a separate task and route through `feature-implementation` or `code-refactoring`.

## Steps

1. **Frame the review scope.** State which files, branch, or PR is in scope. State the review depth requested (correctness, conventions, performance, security, or full).

2. **Load review references.**
   - `.ai/docs/project_specification.md` for recurring rules and rejected assumptions
   - `docs/architecture/overview.md` for locked constraints
   - `docs/conventions/page-objects.md` and `docs/conventions/components.md`
   - `.ai/conventions/code.md` for DSL boundaries
   - `.ai/conventions/verification.md` for the expected verification trail

3. **Inspect the diff.** Read changes in dependency order: framework → assertions → pages → tests. For each touched file, check:
   - DSL boundaries (no raw `page.locator`, `page.goto`, or `page.getByRole` in tests or components; components hold no raw `Page`)
   - naming and placement (pages under `pages/`, components under `pages/components/`, assertion helpers under `assertions/`)
   - `@ui` and `@unit` tagging
   - assertion helper usage over raw `expect` where a helper fits
   - reporting boundary (no custom reporter code unless explicitly justified)
   - ESLint plugin changes (if any) follow project conventions

4. **Check the verification trail.** Confirm the change includes the verification expected by `.ai/conventions/verification.md`. If verification is missing or insufficient, flag it as a required follow-up.

5. **Produce review findings.** Group as:
   - **Blocking** — must change before merge (rule violation, broken behavior, missing verification on a code change)
   - **Non-blocking** — recommended improvements
   - **Questions** — items needing author clarification

   Empty sections are allowed; the headings must still be present so the user can confirm the review covered each category.

6. **Hand off.** Pipeline ends here. `manager` appends `report-completion`.

## Validation Gate

This pipeline must complete step 5 with explicit Blocking / Non-blocking / Questions sections. The review is read-only: no files in the repository are modified by this pipeline.
