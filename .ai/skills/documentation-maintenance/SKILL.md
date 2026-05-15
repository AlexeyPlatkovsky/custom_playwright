---
name: documentation-maintenance
description: Update project documentation after a change that affects behavior, interfaces, commands, architecture, or domain facts. Runs after substantive changes and before task-complete.
---

# documentation-maintenance

`documentation-maintenance` keeps project documentation aligned with what was just changed. It runs after substantive implementation or refactoring and before `task-complete`.

## When To Use

Run when the completed change:

- adds or changes project behavior visible to test authors or framework users
- changes a public interface, DSL abstraction, or page/component API
- changes commands shown in `README.md` or guides
- changes architecture, layer responsibilities, or domain facts
- changes documented workflows or capability contracts (skills, agents, pipelines)
- introduces or removes a documented convention

Do not run for:

- trivial changes with no documented surface (e.g., a one-line comment fix)
- changes already covered by a previous documentation-maintenance run in the same pipeline
- purely cosmetic or internal refactors with no externally visible effect

## Mandatory Behavior

### 1. Identify The Affected Documentation

For each changed file, identify which docs reference it or describe it:

- `docs/architecture/overview.md` — layer responsibilities, locked constraints
- `docs/guides/authoring-with-the-dsl.md` — DSL authoring patterns
- `docs/conventions/page-objects.md` — page object conventions
- `docs/conventions/components.md` — component conventions
- `README.md` — commands and project overview
- `.ai/docs/project_specification.md` — capability triggers, recurring duties, quality expectations
- Skill, agent, or pipeline files in `.ai/` that describe the changed capability

Load only the docs that reference the changed surface. Do not load unrelated docs.

### 2. Update, Do Not Rewrite

Update only the sections that are now inaccurate or incomplete. Do not rewrite surrounding content. Do not add new sections unless the change introduces a genuinely new concept with no existing home.

### 3. Keep Docs Non-Executable

Documentation records facts and patterns. It does not enforce behavior. If a doc update would add a behavioral rule, that rule belongs in a skill, convention, or root contract — not in the doc.

### 4. Verify Command Accuracy

If any changed doc contains shell commands, npm scripts, or paths, confirm they still work against the current repository state.

## Output Contract

Report:

- which docs were updated and what changed (one line per file)
- which docs were inspected and found current (one line per file)
- any doc gaps identified but not filled (with reason — e.g., requires user decision)
