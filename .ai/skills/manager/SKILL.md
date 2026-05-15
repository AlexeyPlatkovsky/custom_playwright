---
name: manager
description: Routes non-trivial work to skills, pipelines, and gates in playforge. Use when a task needs classification, validation, or coordination across more than one capability.
---

# manager

The manager owns routing decisions for non-trivial work in playforge. It does not execute work; it chooses what runs and in what order.

## When To Use

Load `manager` when:

- the task is non-trivial (anything beyond a single-file obvious edit)
- routing must choose between multiple skills, pipelines, or agents
- validation and completion enforcement should stay centralized

Do not load `manager` for:

- trivial single-step low-risk work
- purely factual questions with no execution path
- design discussion before a direction is chosen — use `brainstorm` first

## Mandatory Behavior

### 1. Classify Before Action

Before any non-trivial work begins, state explicitly:

- **Complexity:** trivial or non-trivial
- **Risk:** low, medium, high, or system-level
- **Cross-domain:** does the task cross domains or systems (e.g., framework + tests + ESLint plugin)?

If the task is actually trivial, say so and release it for direct execution.

### 2. Routing Only

The manager chooses and sequences capabilities. It does not implement steps itself. If you find yourself describing how to do the work, you have left the manager role.

### 3. Name The Concrete Next Capability

Produce a routing decision that identifies:

- which skill or pipeline runs next
- which validation or review gate applies
- which reference docs must be loaded

Available pipelines for non-trivial routed work:

- `.ai/pipelines/feature-implementation.md`
- `.ai/pipelines/code-review.md`
- `.ai/pipelines/code-refactoring.md`
- `.ai/pipelines/create-test-from-spec.md` — staged test generation from a specification

The manager selects a pipeline and hands off. Stage orchestration (explorer → developer → reviewer → task-complete) lives inside the pipeline, not in the manager. The manager must not reproduce or re-describe the pipeline's internal sequence.

For non-trivial work that none of those fit (e.g., bug investigation, migration, CI work, doc change with executable impact), describe an ad-hoc capability sequence and end it with `task-complete`. When the ad-hoc work is a new feature or significant change (not a trivial task or ongoing fix), include `.ai/skills/branch-setup/SKILL.md` after `bead-work` and before any implementation step begins.

### 4. Append `task-complete` To Every Non-Trivial Pipeline

`task-complete` is the mandatory closure step for every non-trivial routed task. The manager owns this responsibility; pipelines and execution skills must not restate it.

### 5. Escalate By Risk

- low or medium risk + non-trivial: pipeline plus the validation gate the pipeline defines
- high risk: pipeline plus stronger review (explicit pre-handoff user confirmation, broader test runs)
- system-level (CI workflow, ESLint plugin internals under `eslint-plugin-xframework/`, fixture infrastructure under `framework/fixtures/`, framework core under `framework/core/`): block implementation until the user confirms scope and validation plan

### 6. Stop On Missing Or Conflicting Policy

If a safe routing decision depends on missing or conflicting policy, stop and surface the ambiguity:

- design ambiguity → load `brainstorm`
- permission ambiguity (matches a "Risky Changes Require User Consent" item in `AGENTS.md`) → ask the user directly

## Output Contract

At routing time, produce a short execution plan:

- task classification (complexity, risk, cross-domain)
- selected pipeline or ad-hoc capability sequence
- validation and review requirements
- explicit final `task-complete` step
