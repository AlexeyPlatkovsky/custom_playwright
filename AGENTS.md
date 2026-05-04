# AGENTS.md

This is the canonical operational contract for AI work in `playforge`. All AI tools operating in this repository must follow this file.

This is a multi-tool / AI-agnostic project. Tool-specific entry files (`.claude/CLAUDE.md`) are thin adapters that point here. On any conflict, this file wins.

## Project In One Line

`playforge` is a strict TypeScript + Playwright Component-DSL testing framework. The Component-DSL — `xPage`, `xComponent`, `xLocator`, and the assertion helpers — is the project's authoring API. Tests, pages, and components must use it; raw Playwright primitives are reserved for framework internals.

## Authoritative Sources

Read on demand:

- Project profile: `.ai/docs/project_specification.md`
- Architecture overview: `docs/architecture/overview.md`
- DSL authoring guide: `docs/guides/authoring-with-the-dsl.md`
- Page object conventions: `docs/conventions/page-objects.md`
- Component conventions: `docs/conventions/components.md`
- Migration guides: `docs/migration/`
- Source layout: `framework/`, `pages/`, `assertions/`, `eslint-plugin-xframework/`, `tests/`
- CI: `.github/workflows/ci.yml`
- Environment and runtime: `.env.example`, `playwright.config.ts`, `package.json`

`docs/custom_playwright_architecture_v2.md` is background only and does not override current implementation or focused docs.

## Routing Gate

Before doing any work, classify the task:

1. **Trivial** — single-file edit, obvious intent, no behavior change beyond the touched line, no new validation gate beyond running existing checks. Proceed directly. State the classification.
2. **Non-trivial** — anything else: feature implementation, code review, refactor, multi-file change, behavior change, framework-level change, anything routed. **Stop. Load `manager` and let it produce a routing decision before any implementation begins.**
3. **Unsure** — treat as non-trivial.

If the task requires choosing between meaningful options before implementation can begin (open design, profile clarification, ambiguous user request with material trade-offs), stop and load `brainstorm` before `manager`.

For non-trivial work, `report-completion` is mandatory and is appended by `manager`. Pipelines and execution skills must not restate that rule.

## Capability Registry

Shared capabilities under `.ai/`:

| Capability | Location | Purpose |
|---|---|---|
| `manager` | `.ai/skills/manager/SKILL.md` | Centralized routing for non-trivial work |
| `report-completion` | `.ai/skills/report-completion/SKILL.md` | Closure report for non-trivial work |
| `brainstorm` | `.ai/skills/brainstorm/SKILL.md` | Structured discussion for open design or trade-off decisions |

Pipelines for repeated multi-step workflows:

| Pipeline | Location |
|---|---|
| `feature-implementation` | `.ai/pipelines/feature-implementation.md` |
| `code-review` | `.ai/pipelines/code-review.md` |
| `code-refactoring` | `.ai/pipelines/code-refactoring.md` |

Shared conventions referenced by skills and pipelines:

- Code and DSL boundaries: `.ai/conventions/code.md`
- Verification gate: `.ai/conventions/verification.md`

## Constraints

Headline rules only. Conventions and docs hold the full detail and are the source of truth.

- DSL boundaries (no `page.goto`, `page.locator`, or `page.getByRole` in tests or components; components hold no raw `Page`) — see `.ai/conventions/code.md`.
- Assertion helpers preferred over raw `expect`; use raw `expect` only when no helper fits — see `.ai/conventions/code.md`.
- Test placement and tagging (`@ui` for browser specs, `@unit` for unit and framework specs) — see `.ai/conventions/code.md`.
- Verification before handoff for code changes — see `.ai/conventions/verification.md`. Documentation-only changes skip local execution unless they affect commands or executable config.
- Reporting stays on Playwright HTML + Allure; no custom reporter — see `.ai/conventions/code.md`.
- ESLint guardrail changes under `eslint-plugin-xframework/` are risky — see "Risky Changes Require User Consent" below.

## Risky Changes Require User Consent

Stop and ask before:

- moving capabilities to a new directory
- splitting a monolithic file
- merging or deleting duplicated artifacts
- renaming or replacing existing capabilities
- bypassing the Component-DSL with raw Playwright in tests
- editing CI configuration or `package.json` scripts
- modifying or relaxing rules in `eslint-plugin-xframework/`
- touching tool-config files outside immediate scope (`.gemini/settings.json`, `.codex/`)

When asking, name the change, the reason, and the safe target state.

## Tool Adapters In Scope

- Claude Code reads this file via `.claude/CLAUDE.md` (thin adapter that imports this file).
- Codex CLI reads this file natively as `AGENTS.md`.

Other tools are not in scope today. `.gemini/settings.json` references `AGENTS.md`; if Gemini is later activated, generate a thin adapter rather than making `AGENTS.md` Gemini-specific.

## Protocol Mapping

For framework reviewers:

- `manager` ↔ canonical `manager` protocol
- `report-completion` ↔ canonical `task_complete` protocol (renamed project-locally; mandatory behavior preserved)
- `brainstorm` ↔ canonical `brainstorm` protocol
