# code-refactoring

Ordered pipeline for restructuring existing code in playforge without changing user-facing behavior.

## When To Use

Use this pipeline when the goal is to reshape code while preserving behavior.

Use `framework-feature-implementation` when behavior is being added. Refactors crossing framework core, shared fixtures, or ESLint plugin internals are system-level risk.

## Sequence

1. Run `.ai/skills/bead-work/SKILL.md`.
2. Run `.ai/skills/branch-setup/SKILL.md`.
3. Run `.ai/skills/refactor-code/SKILL.md`.

## Validation Gate

`refactor-code` must complete its output contract. The defining gate is behavior preservation: baseline targeted tests must pass after the refactor without modification.
