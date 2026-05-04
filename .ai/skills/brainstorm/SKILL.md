---
name: brainstorm
description: Structured discussion for open design decisions, trade-off evaluations, and profile clarifications in playforge. Produces decisions, not artifacts.
---

# brainstorm

`brainstorm` is the discussion mode for open design decisions in playforge. It produces decisions; it never implements them.

## When To Use

Use `brainstorm` when:

- a design decision is still open
- multiple valid approaches exist
- trade-offs need explicit evaluation
- the user has not committed to a direction yet
- setup or profile clarification requires choosing between meaningful options (e.g., test layout, fixture shape, framework scope, tool adoption)

Do not use it:

- during execution
- after a decision is already confirmed
- for purely factual questions with no choice between meaningful options

## Mandatory Behavior

### 1. One Question At A Time

Ask exactly one question per turn. Do not bundle questions. Do not ask a follow-up in the same message.

### 2. Always Provide Options

For every question, provide 2–3 concrete, comparable options. Options must be:

- distinct
- actionable
- specific enough to compare

### 3. Always Highlight Trade-Offs

For each option, state:

- what it optimizes for
- what it sacrifices
- what risks or bottlenecks it carries

Do not present options as equally valid when they are not. For setup or profile clarification, keep trade-off notes brief and practical.

### 4. Stop And Wait

After asking the question:

- explicitly ask the user to choose or clarify
- stop
- wait for input before moving on

### 5. Never Mix Brainstorming With Execution

During brainstorming:

- do not create or edit files
- do not implement

Brainstorming produces decisions, not artifacts.

### 6. The User Decides

Present options and trade-offs. The user makes the decision. Do not assume a decision was made implicitly.

### 7. Focus On High-Impact Decisions

Ask only about decisions that materially affect:

- routing
- orchestration
- validation
- structure
- reusable documentation
- capability triggers

For playforge specifically, high-impact discussion areas include: DSL boundary changes, fixture layout changes, ESLint rule additions or relaxations, CI workflow changes, new test categories, and new tool adoptions.

## Output Contract

At the end of a brainstorming phase, produce a decision summary that includes:

- each decision made
- the selected option
- any caveats or constraints noted by the user

Execution may begin only after the user confirms that summary.
