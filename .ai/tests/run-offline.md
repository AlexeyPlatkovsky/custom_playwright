# Offline Runner

Runs all pipeline scenarios with real AI agents. `npm run test:ui` is skipped — the developer agent stops after typecheck and lint.

## How to Signal Offline Mode

When invoking Stage 2 (developer), append this instruction to the prompt:

> **Mode: offline.** Run `npm run typecheck` and `npm run lint` but do not run `npm run test:ui`. Record `Browser verification — skipped (offline mode)` in the DEVELOPER OUTPUT block and pass it to Stage 3.

## Scenario Execution

### 01 — Happy Path

1. Load scenario: `.ai/tests/scenarios/01-happy-path.md`
2. Run Stage 1 (explorer) with the spec from the scenario card.
3. Run Stage 2 (developer) with the spec + EXPLORER OUTPUT. Append the offline mode instruction above.
4. Run Stage 3 (reviewer) with EXPLORER OUTPUT + DEVELOPER OUTPUT.
5. Check: reviewer verdict is `Approve` or `Approve with minor fixes`.

---

### 02 — Developer Blocks on Missing EXPLORER OUTPUT

1. Load scenario: `.ai/tests/scenarios/02-dev-blocks-missing-explorer.md`
2. Run Stage 2 (developer) with the spec only — **do not include an EXPLORER OUTPUT block**.
3. Check: developer produces no DEVELOPER OUTPUT block; response contains a stop-and-request for EXPLORER OUTPUT.

---

### 03 — Reviewer Blocks on Missing DEVELOPER OUTPUT

1. Load scenario: `.ai/tests/scenarios/03-reviewer-blocks-missing-developer.md`
2. Inject fixture: `fixtures/explorer-output-valid.md`
3. Run Stage 3 (reviewer) with EXPLORER OUTPUT only — **do not include a DEVELOPER OUTPUT block**.
4. Check: reviewer produces no verdict; response contains a stop-and-request for DEVELOPER OUTPUT.

---

### 04 — Reviewer Blocks on Missing EXPLORER OUTPUT

1. Load scenario: `.ai/tests/scenarios/04-reviewer-blocks-missing-explorer.md`
2. Inject fixture: `fixtures/developer-output-valid.md`
3. Run Stage 3 (reviewer) with DEVELOPER OUTPUT only — **do not include an EXPLORER OUTPUT block**.
4. Check: reviewer produces no verdict; response contains a stop-and-request for EXPLORER OUTPUT.

---

### 05 — No Existing Context

1. Load scenario: `.ai/tests/scenarios/05-no-existing-context.md`
2. Run Stage 1 (explorer) with the Contact Us spec.
3. Run Stage 2 (developer) with the spec + EXPLORER OUTPUT. Append the offline mode instruction.
4. Run Stage 3 (reviewer) with both outputs.
5. Check: explorer explicitly surfaces absence of existing pages/tests; developer lists new files; reviewer produces a verdict.

---

### 06 — Raw Locator Violation

1. Load scenario: `.ai/tests/scenarios/06-raw-locator-violation.md`
2. Inject fixture: `fixtures/explorer-output-valid.md`
3. Run Stage 2 (developer) with the spec (including the trick instruction) + EXPLORER OUTPUT. Append offline mode instruction.
4. Check: developer either fixes the violation before handing off (lint passes) or stops and surfaces the DSL constraint. A DEVELOPER OUTPUT with `npm run lint — failed` is a test failure.

---

### 07 — Needs Revision Loop

**Cycle 1:**
1. Load scenario: `.ai/tests/scenarios/07-needs-revision-loop.md`
2. Inject fixtures: `fixtures/explorer-output-valid.md` + `fixtures/developer-output-lint-fail.md`
3. Run Stage 3 (reviewer) with both.
4. Check: verdict is `Needs revision` with a Blocking finding.

**Cycle 2:**
5. Run Stage 2 (developer) with: spec, EXPLORER OUTPUT fixture, Cycle 1 reviewer findings. Append offline mode instruction.
6. Run Stage 3 (reviewer) with EXPLORER OUTPUT fixture + Cycle 2 DEVELOPER OUTPUT.
7. Check: verdict is `Approve` or `Approve with minor fixes`.

---

### 08 — Max Revision Cycles

**Cycle 1:**
1. Load scenario: `.ai/tests/scenarios/08-max-revision-cycles.md`
2. Inject: `fixtures/explorer-output-valid.md` + `fixtures/developer-output-lint-fail.md`
3. Run Stage 3 (reviewer). Check: `Needs revision`.

**Cycle 2:**
4. Re-inject `fixtures/developer-output-lint-fail.md` as the new developer output.
5. Run Stage 3 (reviewer). Check: `Needs revision` again.

**Escalation:**
6. Do not initiate Cycle 3. Surface the blocker to the user.
7. Check: no third cycle; escalation message present.

---

### 09 — Reviewer Rejects

1. Load scenario: `.ai/tests/scenarios/09-reviewer-rejects.md`
2. Inject: `fixtures/explorer-output-valid.md` + the inline mismatched DEVELOPER OUTPUT from the scenario card.
3. Run Stage 3 (reviewer) with both.
4. Check: verdict is `Reject`; findings table contains a Blocking spec-mismatch finding.

---

## Recording Results

After each scenario, record the result:

| Scenario | Result | Notes |
|---|---|---|
| 01 | | |
| 02 | | |
| 03 | | |
| 04 | | |
| 05 | | |
| 06 | | |
| 07 | | |
| 08 | | |
| 09 | | |

Results: `PASS`, `FAIL`, or `SKIP` (with reason).
