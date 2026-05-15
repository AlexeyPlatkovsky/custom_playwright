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

**Output (required before Stage 3):**
```
DEVELOPER OUTPUT block
```

---

### Stage 3 — Test Reviewer Agent

**Agent:** `.ai/agents/test-reviewer/AGENT.md`

**Input:** `EXPLORER OUTPUT` block from Stage 1 + `DEVELOPER OUTPUT` block from Stage 2

**Output (required before Stage 4):**
```
Verdict + Findings table
```

If verdict is **Approve** or **Approve with minor fixes**: proceed to Stage 4.
If verdict is **Needs revision**: return to Stage 2 (developer agent) with the findings table as additional input. Repeat at most two revision cycles; if blocking issues remain after two cycles, stop and surface to the user.
If verdict is **Reject**: return to Stage 1 (re-run explorer for the revised scope).

---

### Stage 4 — task-complete

**Skill:** `.ai/skills/task-complete/SKILL.md`

**Input:** all stage outputs + executed step list

---

## Validation Gate

The pipeline is eligible for closure only when:

- Explorer output was produced and consumed by the developer agent
- Developer output confirms `npm run typecheck` and `npm run lint` passed
- Reviewer verdict is **Approve** or **Approve with minor fixes** (minor fixes resolved)
- All stage handoff artifacts are explicit — no implicit context passing
