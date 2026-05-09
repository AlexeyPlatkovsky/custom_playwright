# feature-implementation

Ordered pipeline for adding new behavior in playforge.

## When To Use

Use this pipeline for non-trivial additive work where new behavior is being introduced.

## Sequence

1. Run `.ai/skills/bead-work/SKILL.md`.
2. Run `.ai/skills/branch-setup/SKILL.md`.
3. Confirm that requirements and Definition of Done are clear enough to implement and verify.
4. If the task has multiple meaningful solution paths, stop and clarify the selected approach with the user before coding.
5. Run `.ai/skills/implement-feature/SKILL.md`.
6. Run the full test suite with `npm run test` after code is written.
7. Run `.ai/skills/review-code/SKILL.md`.
8. If review finds any non-minimal issue, fix it, rerun `npm run test`, and run `.ai/skills/review-code/SKILL.md` again.
9. Repeat the fix, full-test, and review loop at most three total review cycles.

## Validation Gate

The pipeline is eligible for completion only when requirements and Definition of Done were clear, implementation finished, `npm run test` passed after the latest change, and review found no non-minimal issues. If the third review cycle still finds non-minimal issues, stop and surface the remaining findings instead of continuing the loop.
