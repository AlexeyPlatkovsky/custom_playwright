---
name: task-complete
description: Closure report for non-trivial routed work in playforge.
---

# task-complete

`task-complete` produces a closure record for non-trivial work.

## When To Use

Use `task-complete` when:

- a task is non-trivial
- work ran through a routed multi-step path
- the user needs an explicit closure record

Do not use it for:

- trivial tasks
- isolated single-step low-risk work
- purely cosmetic changes

## Mandatory Behavior

### 1. Closure, Not Re-Planning

`task-complete` reports what happened. It does not invent new steps or reopen orchestration. If the executed path diverged from the planned path, say so in the table; do not redesign the pipeline after the fact.

### 2. Exact Report Format

Output a markdown table with exactly these columns:

| Step | Skill / Agent | Comment |
|------|---------------|---------|

Do not rename columns. Do not add columns.

### 3. Every Executed Step Appears

Every step that actually ran has a row. If a planned step was skipped, include the row and explain why in `Comment`.

### 4. Comment Rules

Leave `Comment` blank unless:

- a step was skipped
- execution deviated from the plan
- the user should notice something incomplete or unusual (e.g., a verification check intentionally not run)

Skipped steps must always include a comment.

## Example

| Step | Skill / Agent | Comment |
|------|---------------|---------|
| Classify task | manager | non-trivial, medium risk |
| Implement page object | implement-feature | |
| Add component | implement-feature | |
| Targeted UI tests | implement-feature | |
| `npm run typecheck` | implement-feature | |
| `npm run lint` | implement-feature | |
| `npm run test` | implement-feature | skipped — change does not touch shared framework behavior |
| Closure | task-complete | |

## Output Contract

Produce the closure table with Step / Skill / Agent / Comment columns before declaring completion.
