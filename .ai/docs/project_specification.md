# Project Specification

## Project Purpose

`playforge` is a strict TypeScript and Playwright foundation for a Component-DSL testing framework.

The project aims to provide deterministic, maintainable browser test authoring through framework-owned abstractions instead of raw Playwright usage in tests. The current browser target is `https://automationexercise.com` by default, configurable through `BASE_URL`.

## User Role

The primary user works as both:

- framework owner / maintainer
- test automation engineer

Instruction behavior should support both long-term framework quality and day-to-day test automation work.

## Recurring Duties

The instruction system should support broad engineering work, including:

- coding and refactoring
- Playwright framework and DSL evolution
- page object and component authoring
- UI, framework, and unit test writing
- assertion helper and fixture work
- repo-local ESLint rule maintenance
- code review
- documentation creation and editing
- bug investigation and debugging
- migration support
- CI and reporting support

## AI Tool Mode

The project should use a multi-tool / AI-agnostic instruction model.

Later instruction stages should treat `AGENTS.md` as the intended canonical root contract for shared operational rules, with tool-specific files acting as thin adapters when generated or reviewed.

## AI Tools

The AI tools in active or immediate scope are:

- Claude
- Codex

Gemini configuration exists locally, but Gemini is not required immediately for the instruction system.

Local evidence found during profiling:

- `.claude/settings.json`
- `.claude/settings.local.json`
- `.codex/` directory
- `.gemini/settings.json`

At profile time, `AGENTS.md`, `CLAUDE.md`, and `.ai/` runtime instruction files were not present on disk.

## Known Capability Triggers

Known recurring capability triggers include:

- brainstorming or clarification for open design/profile decisions
- feature implementation
- code refactoring
- code review
- test authoring and automation
- Playwright page object and component authoring
- assertion helper work
- fixture and configuration work
- ESLint guardrail changes
- bug investigation
- documentation updates
- migration from Selenium or lower-level Playwright patterns
- CI, report, and verification workflow changes
- external tool or framework adoption

## Domain Vocabulary

Use this vocabulary consistently when reasoning about the project:

- `xPage`: navigable page abstraction; owns navigation path and page-readiness checks.
- `xComponent`: reusable scoped component abstraction.
- `xLocator`: wrapped locator used by pages, components, assertions, and logging.
- Component-DSL: the project's authoring model where tests interact through pages, components, and helper APIs instead of raw Playwright primitives.
- Page object: a class under `pages/` representing a navigable page.
- Component: a class under `pages/components/` representing reusable scoped UI.
- Assertion helpers: helpers under `assertions/` such as visibility, text, state, count, attribute, URL, and `softGroup`.
- Static guardrails: repo-local ESLint rules under `eslint-plugin-xframework/`.
- Browser-facing framework specs: Playwright tests under `tests/framework/`.
- App-level UI specs: Playwright tests under `tests/ui/`.
- Framework/unit coverage: tests under `tests/unit/`.
- Reports: Playwright HTML and Allure outputs.

## Authoritative Local Sources

Treat the current implementation plus focused docs as authoritative:

- `README.md`
- `docs/architecture/overview.md`
- `docs/guides/authoring-with-the-dsl.md`
- `docs/conventions/page-objects.md`
- `docs/conventions/components.md`
- `framework/`
- `assertions/`
- `pages/`
- `tests/`
- `eslint-plugin-xframework/`
- `playwright.config.ts`
- `eslint.config.js`
- `.github/workflows/ci.yml`
- `.env.example`

Treat `docs/custom_playwright_architecture_v2.md` as background architecture intent unless current implementation or focused docs confirm the same rule.

## Quality Expectations

Use strict local verification before handoff for most code changes:

- run relevant targeted tests for the touched behavior
- run `npm run typecheck`
- run `npm run lint`
- add broader `npm run test` when shared framework behavior changes

For documentation-only or instruction-only changes, local test execution is not required unless the change affects commands, generated code, or executable configuration.

## Preferred Workflows

General workflow:

1. Inspect existing code, docs, tests, and config before proposing or editing.
2. Preserve established DSL boundaries and naming patterns.
3. Keep edits scoped to the touched responsibility.
4. Prefer project abstractions over raw Playwright primitives.
5. Add or adjust tests according to behavior risk.
6. Run strict local verification before handoff unless the change is documentation-only.

Page and component workflow:

- Page objects live in `pages/`.
- Components live in `pages/components/`.
- Pages extend `xPage`; components extend `xComponent`.
- Tests should use page/component APIs instead of `page.goto`, `page.locator`, or `page.getByRole`.
- Components should not hold raw `Page` or call `page.locator`.
- Parameterized locators should be methods returning `xLocator`.

Testing workflow:

- Use `framework/fixtures/app.fixture` for browser specs when applicable.
- Use `@ui` for browser-facing titles.
- Use `@unit` for unit/framework tests that are run through the unit script.
- Prefer assertion helpers from `assertions/` when a helper exists.
- Use raw `expect(...)` only when no helper fits the assertion.

CI and reporting workflow:

- Keep unit and UI suites separately runnable.
- Preserve Playwright HTML and Allure reporting.
- Avoid custom reporter code unless explicitly justified.

## External Best Practices

External research is allowed when local context is insufficient.

Rules for external research:

- use it only when current local sources cannot answer the question well
- treat external findings as candidate guidance, not project authority
- summarize candidate practices before incorporating them
- require user acceptance before recording external guidance as a project convention

No external best practices were accepted during the initial project profile.

## Rejected Or Irrelevant Assumptions

- Do not assume Gemini is required immediately, even though `.gemini/settings.json` exists.
- Do not assume `docs/custom_playwright_architecture_v2.md` overrides current implementation or focused docs.
- Do not assume a local demo site is started for UI tests; current browser suites target `BASE_URL`.
- Do not bypass the Component-DSL with raw Playwright calls in tests unless explicitly justified by missing framework support.
- Do not introduce a custom reporting layer by default; the project currently uses Playwright HTML and Allure.

## Open Questions

- The final `AGENTS.md` root contract and tool adapters have not been generated yet.
- The exact Claude/Codex adapter file layout remains for a later instruction composition stage.
- Gemini support may be revisited later if it becomes an immediate tool requirement.
