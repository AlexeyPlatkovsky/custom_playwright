# Online Runner

Runs pipeline scenarios with real AI agents and a live browser. `npm run test:ui` executes in Stage 2 — the generated test must pass against the live automationexercise.com site.

## Prerequisites

- Playwright browser binaries installed (`npx playwright install`)
- Live site reachable (automationexercise.com)
- `npm run test:ui` passes locally before running scenarios

## How to Signal Online Mode

When invoking Stage 2 (developer), append this instruction to the prompt:

> **Mode: online.** Run `npm run typecheck`, `npm run lint`, and `npm run test:ui`. Record all results in the DEVELOPER OUTPUT block.

Add a `Browser verification:` line to the DEVELOPER OUTPUT block:

```
Browser verification: npm run test:ui — passed / failed
```

## Scenarios Suited for Online Mode

Scenarios 01 and 05 are the primary online targets — they require a full browser run to confirm the generated test is functionally correct. Behavioral scenarios (02–04, 07–09) do not benefit from a browser run because they test pipeline behavior, not test correctness.

| Scenario | Online value |
|---|---|
| 01 — Happy path | High — confirms generated test is green |
| 05 — No existing context | High — confirms new page object and spec are functional |
| 06 — Raw locator violation | Low — ESLint fires before browser; result is the same as offline |
| 07 — Needs revision loop | Low — behavioral, not test correctness |
| 08 — Max revision cycles | Low — behavioral |
| 02, 03, 04, 09 | None — blocking behavior does not depend on browser |

## Scenario Execution

### 01 — Happy Path (Online)

1. Load scenario: `.ai/tests/scenarios/01-happy-path.md`
2. Run Stage 1 (explorer) with the spec.
3. Run Stage 2 (developer) with the spec + EXPLORER OUTPUT. Append the online mode instruction above.
4. Run Stage 3 (reviewer) with EXPLORER OUTPUT + DEVELOPER OUTPUT.
5. Check: `npm run test:ui — passed` appears in DEVELOPER OUTPUT. Reviewer verdict is `Approve` or `Approve with minor fixes`.

---

### 05 — No Existing Context (Online)

1. Load scenario: `.ai/tests/scenarios/05-no-existing-context.md`
2. Run Stage 1 (explorer) with the Contact Us spec.
3. Run Stage 2 (developer) with the spec + EXPLORER OUTPUT. Append the online mode instruction.
4. Run Stage 3 (reviewer) with both outputs.
5. Check: `npm run test:ui — passed` appears in DEVELOPER OUTPUT. New files listed. Reviewer produces a verdict.

---

## Recording Results

| Scenario | Result | Browser result | Notes |
|---|---|---|---|
| 01 | | | |
| 05 | | | |

Results: `PASS`, `FAIL`, or `SKIP` (with reason). Browser result: `passed`, `failed`, or `skipped`.
