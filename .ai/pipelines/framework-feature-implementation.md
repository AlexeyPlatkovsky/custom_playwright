# framework-feature-implementation

Ordered pipeline for adding new behavior in playforge.

## When To Use

Use this pipeline for non-trivial additive work where new behavior is being introduced.

## Sequence

1. Run `.ai/skills/bead-work/SKILL.md`.
2. Run `.ai/skills/branch-setup/SKILL.md`.
3. Run `.ai/skills/implement-feature/SKILL.md`.
4. Run `npm run test`.
5. Run `.ai/skills/review-code/SKILL.md`.
6. If review finds non-minimal issues: run `.ai/skills/implement-feature/SKILL.md` to address them, re-run `npm run test`, then re-run `.ai/skills/review-code/SKILL.md`. Repeat at most three total review cycles; if non-minimal issues remain after the third cycle, stop and surface to the user.

## Validation Gate

The pipeline is eligible for completion only when `npm run test` passed after the latest change and review found no non-minimal issues.
