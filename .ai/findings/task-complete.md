# Evaluation Report: `.ai/skills/task-complete/SKILL.md`

### Verdict

**Accept with minor edits**

---

### Artifact Findings

| Artifact | Severity | Area | Finding | Suggested fix |
|---|---|---|---|---|
| `task-complete/SKILL.md` | Minor | Frontmatter | The frontmatter contains only `name` and `description`. `IMPLEMENTATION.md` requires these two fields at minimum for the framework-standard skill format, so this is technically compliant, but a `version` or provenance field linking back to the `task_complete` protocol would make auditing easier and is consistent with framework protocol practice. | Consider adding a comment or optional frontmatter note that this skill derives from the `task_complete` protocol (v2.1.1). Not a blocking gap. |
| `task-complete/SKILL.md` | Minor | Self-description of enforcement rule | Lines 7–8 read: "It is appended to every non-trivial pipeline by `manager`; pipelines and execution skills must not restate this rule." This is policy text that is already stated authoritatively in `AGENTS.md` (Routing Gate section) and in `manager` (section 4). The skill thus partially duplicates root-contract and routing-layer policy inside an execution artifact, which introduces a secondary authority for the same rule. | Remove the policy sentence from the skill. The skill's job is to produce the closure report, not to enforce who calls it or prohibit restating. Enforcement lives in `AGENTS.md` and `manager`. |
| `task-complete/SKILL.md` | Minor | Context Weight / Example Completeness | The example table (lines 55–65) names `feature-implementation` in the `Skill / Agent` column, but the registry uses `implement-feature` as the skill name. The mismatch may cause confusion about which artifact name to use in live reports. | Update the example `Skill / Agent` values to match the canonical artifact names: `implement-feature` instead of `feature-implementation`. `feature-implementation` is a pipeline name; calling it in the `Skill / Agent` column blurs the pipeline/skill boundary. |
| `task-complete/SKILL.md` | Minor | Layer Purity / Output description | The skill has no explicit "Output Contract" heading, while every peer execution skill (`implement-feature`, `refactor-code`, `review-code`) ends with a named `## Output Contract` section. The `task_complete` protocol also ends with an explicit `# Output Contract` section. The absence makes the artifact slightly inconsistent with the rest of the system. | Add an `## Output Contract` section: "Produce the closure table before declaring completion." |
| `task-complete/SKILL.md` | Info | Trigger clarity | The "When To Use" negative list ("Do not use it for: trivial tasks, isolated single-step low-risk work, purely cosmetic changes") faithfully mirrors the canonical protocol. This is good. | No change needed. |
| `task-complete/SKILL.md` | Info | Protocol fidelity | All five mandatory protocol rules (`task_complete` v2.1.1) are preserved: scope to non-trivial work, exact three-column table, all steps visible, comment rules, no re-planning. | No change needed. |

---

### Cross-Artifact Findings

**1. Duplicated enforcement rule (Minor):** `task-complete` lines 7–8 state that `manager` appends it and that pipelines and skills must not restate that rule. The same rule appears in `AGENTS.md` (Routing Gate, last sentence) and in `manager` section 4. Three sources now share the same policy sentence, which is the exact pattern "One Owner Per Concern" (MANIFEST principle 4) prohibits. `AGENTS.md` is the single owner; `manager` may hold it as a derivation anchor; `task-complete` should not restate it.

**2. Example naming mismatch vs. capability registry (Minor):** The example in `task-complete` uses `feature-implementation` in the `Skill / Agent` column, but `feature-implementation` is the pipeline name in the registry (`.ai/pipelines/feature-implementation.md`) and the execution skill is `implement-feature`. The `Skill / Agent` column should reflect the artifact that ran, which in that example row would be `implement-feature`, not the pipeline name.

**3. No conflict with peer skills or pipelines:** None of the execution skills (`implement-feature`, `refactor-code`, `review-code`) nor the pipelines restate the `task-complete` rule or duplicate its output format. The boundary is clean in those artifacts.

**4. Verification convention cross-reference satisfied:** `verification.md` (line 34–37) explicitly references `task-complete` by name and describes what it should contain (verification check list). `task-complete` itself does not reference `verification.md`, but the skill's example naturally includes verification steps in the table. This is acceptable — the skill's job is format, not dictating what steps to include. No gap.

**5. `manager` remains sole enforcement authority:** `manager` section 4 correctly owns the "append `task-complete`" responsibility. No execution skill or pipeline restates it except the minor echo inside `task-complete` itself (see finding above).

---

### Layer Fit

**task-complete is correctly placed as a skill.** It has one atomic job — produce the closure table — and contains no routing logic, no cross-skill sequencing, and no convention-level standards. The artifact belongs in `.ai/skills/task-complete/SKILL.md` and should remain there.

The only layer-purity concern is minor: the self-referential enforcement sentence in the introduction is policy prose that belongs in the routing layer, not in the execution artifact. This does not disqualify the artifact from the skill layer; it is a localized cleanup.

---

### Final Recommendation

The artifact is functionally correct and protocol-faithful. Accept it with the following targeted edits:

1. Remove the policy sentence in the introduction ("It is appended to every non-trivial pipeline by `manager`; pipelines and execution skills must not restate this rule.") — enforcement lives in `AGENTS.md` and `manager`.
2. Correct the example's `Skill / Agent` column to use `implement-feature` (the execution skill name) instead of `feature-implementation` (the pipeline name) wherever that distinction matters to a reader.
3. Add a brief `## Output Contract` heading for consistency with peer skills and the source protocol.

These are all localized single-sentence changes. No split, no structural refactor, no approval gate required.
