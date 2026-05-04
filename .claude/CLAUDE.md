# CLAUDE.md

This file is a thin adapter for Claude Code only. The canonical operational contract for this repository lives in `AGENTS.md` at the repository root. Read it before starting any project task and follow every applicable rule.

@AGENTS.md

## Adapter Rules

- Before any project task, read `AGENTS.md`. The `@AGENTS.md` import above loads it at session start. If the import fails or the file is unavailable, stop and ask the user instead of proceeding from memory or inference.
- `AGENTS.md` is the canonical contract. If anything in this adapter conflicts with `AGENTS.md`, follow `AGENTS.md`.
- Do not add project policy here. This file must remain a thin adapter. Project policy belongs in `AGENTS.md` or in `.ai/`.
