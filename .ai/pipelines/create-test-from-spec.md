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

**Input:** test specification + target page, component, or flow name

**Output (required before Stage 2):**
```
EXPLORER OUTPUT block
```

If the spec is ambiguous after inspection, the explorer must stop and surface the ambiguity before Stage 2 begins.

---

### Stage 2 — Developer Agent

**Agent:** `.ai/agents/developer/AGENT.md`

**Input:** test specification + `EXPLORER OUTPUT` block from Stage 1

**Mode:** the operator must declare one of:

- **offline** — run `npm run typecheck` and `npm run lint`; skip `npm run test:ui`; record `Browser verification: skipped (offline mode)` in the output block. Offline approval is provisional — the test must pass in online mode before merging.
- **online** — run `npm run typecheck`, `npm run lint`, and `npm run test:ui`; record the browser result in the output block.

**Output (required before Stage 3):**
```
DEVELOPER OUTPUT block
```

---

### Stage 3 — Test Reviewer Agent

**Agent:** `.ai/agents/test-reviewer/AGENT.md`

**Input:** `EXPLORER OUTPUT` block from Stage 1 + `DEVELOPER OUTPUT` block from Stage 2

**Output (required before closure):**
```
Verdict + Findings table
```

If verdict is **Approve** or **Approve with minor fixes**: advance to Pre-Closure Verification.
If verdict is **Needs revision**: return to Stage 2 (developer agent) with the findings table as additional input. Repeat at most two revision cycles; if blocking issues remain after two cycles, stop and surface to the user.
If verdict is **Reject**: return to Stage 1 (re-run explorer for the revised scope).

---

## Pre-Closure Verification

Before the manager appends `task-complete`, run the pipeline's own test suite:

**Minimum required:** `.ai/tests/run-offline.md` — scenarios 01, 02, 03, 04.

- Scenario 01 (Happy Path) — verifies the full stage sequence produces an approved test.
- Scenario 02 (Developer Blocks on Missing EXPLORER OUTPUT) — verifies the developer agent enforces the handoff contract.
- Scenario 03 (Reviewer Blocks on Missing DEVELOPER OUTPUT) — verifies the reviewer agent enforces the handoff contract.
- Scenario 04 (Reviewer Blocks on Missing EXPLORER OUTPUT) — verifies the reviewer agent enforces the handoff contract.

**When any pipeline stage or agent contract was changed in this work:** run all nine scenarios.

If all required scenarios pass, the Validation Gate is met. If any fails, stop — do not signal closure — fix the failure and re-run.

---

## Validation Gate

The pipeline is ready for closure (manager appends `task-complete`) only when:

- Explorer output was produced and consumed by the developer agent
- Developer output confirms `npm run typecheck` and `npm run lint` passed
- Developer output includes a `Browser verification` line — `passed` (online) or `skipped (offline mode)` with a note that online verification is required before merge
- Reviewer verdict is **Approve** or **Approve with minor fixes** (minor fixes resolved)
- All stage handoff artifacts are explicit — no implicit context passing
- Pre-Closure Verification passed all required scenarios
