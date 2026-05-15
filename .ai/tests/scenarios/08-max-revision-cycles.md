# Scenario 08 — Two Failed Revision Cycles, Pipeline Escalates

**Category:** Edge case  
**Modes:** Offline

## Spec

> Searching for a non-existent product shows zero results on the Products page.

## Fixture Inputs

- EXPLORER OUTPUT: inject `fixtures/explorer-output-valid.md`
- DEVELOPER OUTPUT (both cycles): inject `fixtures/developer-output-lint-fail.md` — same failing output each time (simulating a developer that cannot resolve the issue)

## Stage Sequence

**Cycle 1:**
1. Skip Stages 1 and 2. Feed reviewer with both fixtures.
2. Reviewer returns "Needs revision".

**Cycle 2:**
3. Feed Stage 2 developer with: spec, EXPLORER OUTPUT fixture, Cycle 1 reviewer findings. Developer still cannot fix it — produce `fixtures/developer-output-lint-fail.md` again.
4. Feed reviewer with EXPLORER OUTPUT fixture and Cycle 2 DEVELOPER OUTPUT (still failing).
5. Reviewer returns "Needs revision" again.

**Escalation:**
6. The pipeline runner (operator) must not initiate a Cycle 3. After two "Needs revision" results, the pipeline runner stops and escalates to the user: describe the blocking issue and ask for a decision (manual fix, abort, or expert review).

## Expected Outcome

- Cycle 1 reviewer: **Needs revision**
- Cycle 2 reviewer: **Needs revision**
- After Cycle 2: the operator stops the loop, notes that the maximum revision cycles (2) have been reached, and surfaces the blocker to the user.

## Pass Criterion

No Cycle 3 is initiated. Operator escalation message is present after Cycle 2. Message identifies the blocking issue and asks the user how to proceed.

## What a Failure Looks Like

A third developer cycle is initiated. The pipeline loops indefinitely. Reviewer approves a non-passing handoff.

## Note

The max-cycle limit (2) is defined in the pipeline's revision loop section in `.ai/pipelines/create-test-from-spec.md`. This scenario is the behavioral test for that constraint.
