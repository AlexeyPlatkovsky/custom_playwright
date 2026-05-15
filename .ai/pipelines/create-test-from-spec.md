# create-test-from-spec

Staged pipeline for generating a test from a specification in playforge.

## When To Use

Use this pipeline when the task is:

- writing a new test from a user story, acceptance criterion, or feature specification
- adding test coverage for an existing page or component from a described scenario

Do not use this pipeline for:

- refactoring existing tests (use `code-refactoring`)
- pure page object or component work without a test spec (use `feature-implementation`)
- one-line obvious test additions classified as trivial (proceed directly)

## Execution Sequence

Stages execute sequentially. Each stage must complete its output contract before the next stage starts.

---

### Stage 1 — Explorer Agent

**Agent:** `.ai/agents/explorer/AGENT.md`

**Input:**
- The test specification or user story
- The target page, component, or flow name

**Responsibilities:**
- Inspect relevant pages, components, tests, assertions, fixtures, and selectors
- Identify existing reusable patterns and implementation risks
- Identify flaky interaction areas and architecture constraints
- Produce a compact structured output (see explorer output contract)

**Output (handoff artifact):**
```
EXPLORER OUTPUT block — required before Stage 2 starts
```

Explorer must not implement anything. If the spec is ambiguous after inspection, stop and surface the ambiguity before proceeding.

---

### Stage 2 — Developer Stage

**Skill:** `.ai/skills/implement-feature/SKILL.md`

**Input:**
- The test specification
- The explorer output block from Stage 1

**Responsibilities:**
- Consume the explorer output as the implementation context
- Implement the requested test using DSL-first patterns
- Reuse pages, components, fixtures, and helpers identified by the explorer
- Preserve all framework conventions (DSL boundaries, assertion helpers, tagging)
- Minimize duplication; do not reinvent patterns the explorer found
- Prefer deterministic Playwright patterns; avoid timing-sensitive constructs
- Avoid unnecessary abstractions beyond what the test requires

**Accessibility smoke (optional):**
If the target page is a public-facing page and axe integration is available, add an optional axe smoke check after the main assertions. The smoke check must be in report-only mode — it records violations without failing the test. See "Accessibility Smoke" section below.

**Output (handoff artifact):**
```
List of changed files with a one-line description of each change
```

The developer stage must not proceed to review itself. Hand off the changed-file list to Stage 3.

---

### Stage 3 — Test Reviewer Agent

**Agent:** `.ai/agents/test-reviewer/AGENT.md`

**Input:**
- The explorer output block from Stage 1
- The changed-file list from Stage 2

**Responsibilities:**
- Validate architecture consistency and DSL boundary compliance
- Validate Playwright best practices and selector strategy
- Validate framework conventions (tagging, placement, assertion helper usage)
- Identify flaky or risky implementation areas
- Validate test maintainability; flag overengineering or context bloat
- Identify reuse gaps vs. explorer recommendations
- Validate accessibility smoke configuration if applicable

**Output (handoff artifact):**
```
Verdict + Findings table (see test-reviewer output contract)
```

If verdict is **Approve** or **Approve with minor fixes**: proceed to Stage 4.
If verdict is **Needs revision**: return to Stage 2 with the findings. Repeat at most two revision cycles. If blocking issues remain after two cycles, stop and surface to the user.
If verdict is **Reject**: return to Stage 1 (re-run explorer for the revised scope).

---

### Stage 4 — task-complete

**Skill:** `.ai/skills/task-complete/SKILL.md`

**Input:**
- All stage outputs and the executed step list

**Responsibilities:**
- Produce the closure record for this pipeline run
- Record each executed stage, the agent or skill used, and any deviation from the planned sequence

---

## Validation Gate

The pipeline is eligible for closure only when:

- Explorer output was produced and consumed by the developer stage
- Implementation passes `npm run typecheck` and `npm run lint`
- Reviewer verdict is **Approve** or **Approve with minor fixes** (minor fixes resolved)
- All stage handoff artifacts are explicit — no implicit context passing

## Accessibility Smoke

Lightweight optional integration. Default behavior: report-only.

**When to apply:** add a smoke check when the test targets a public-facing page or a form flow where accessibility is likely tested.

**Implementation pattern:**

```typescript
// After main assertions, inside the same test block
import AxeBuilder from '@axe-core/playwright';

const results = await new AxeBuilder({ page }).analyze();
// Report-only: log violations without failing the test
if (results.violations.length > 0) {
  console.warn('Axe violations:', JSON.stringify(results.violations, null, 2));
}
```

**Rules:**
- Do not install `@axe-core/playwright` without user confirmation if it is not already in `package.json`.
- If the package is not present, note in the handoff that axe smoke was skipped.
- Never configure the axe smoke check to fail the test by default; report-only is the required initial mode.
- Axe smoke does not replace targeted accessibility assertions when those are part of the specification.
