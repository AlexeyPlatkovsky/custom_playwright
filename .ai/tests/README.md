# Pipeline Test System

Verification suite for the `create-test-from-spec` pipeline. All scenarios run with real AI agents. The only difference between modes is whether `npm run test:ui` executes in Stage 2.

## Modes

| Mode | AI agents | typecheck + lint | npm run test:ui |
|---|---|---|---|
| **Offline** | ✓ | ✓ | ✗ |
| **Online** | ✓ | ✓ | ✓ |

See `run-offline.md` and `run-online.md` for invocation instructions.

## Coverage

| # | Scenario | Category | Offline | Online |
|---|---|---|---|---|
| 01 | Happy path — full pipeline, reviewer approves | Happy path | ✓ | ✓ |
| 02 | Developer blocks on missing EXPLORER OUTPUT | Negative | ✓ | — |
| 03 | Reviewer blocks on missing DEVELOPER OUTPUT | Negative | ✓ | — |
| 04 | Reviewer blocks on missing EXPLORER OUTPUT | Negative | ✓ | — |
| 05 | Explorer finds no existing context | Edge case | ✓ | ✓ |
| 06 | Raw locator violation caught by ESLint | Edge case | ✓ | — |
| 07 | Reviewer returns Needs revision, developer fixes | Edge case | ✓ | — |
| 08 | Two failed revision cycles — pipeline escalates | Edge case | ✓ | — |
| 09 | Reviewer rejects — back to Stage 1 | Negative | ✓ | — |

## Fixtures

Pre-baked input blocks for behavioral scenarios (02–04, 06–09). Inject these instead of running the upstream stage.

| File | Contents |
|---|---|
| `fixtures/explorer-output-valid.md` | Well-formed EXPLORER OUTPUT for a products search spec |
| `fixtures/explorer-output-no-context.md` | EXPLORER OUTPUT with no relevant files found |
| `fixtures/developer-output-valid.md` | Well-formed DEVELOPER OUTPUT, all checks passed |
| `fixtures/developer-output-lint-fail.md` | DEVELOPER OUTPUT with lint: failed |

## Pass / Fail

A scenario passes when the **Pass criterion** in the scenario card is met. A scenario fails when the agent produces output that contradicts the expected outcome.

Record results as: `PASS`, `FAIL`, or `SKIP` (with reason).
