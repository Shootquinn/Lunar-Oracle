# Step 1: orchestrator verification of agent claims

Every load-bearing empirical claim an agent returned this step, re-run by the orchestrator
before it was allowed to reach the author or a downstream prompt. Written because this project
has already spent four corrections on claims repeated without checking.

Counting rule for this file: one row per claim, verdict from a command re-run here, not from
reading the agent's file.

## From The Manager's open

| Claim | Verdict | Evidence |
|---|---|---|
| `verify_report.js` source is embedded in `lsei/report-generator-prompt.md` lines 357-686 | **CONFIRMED** | One fenced ```javascript block, opens 357, closes 686. Preceded at 353 by "Write this out as `verify_report.js` and run it." |
| Upstream states the register property "rests on a vendored copy read at generation time and a human eye, and if that step is skipped nothing downstream will notice" | **CONFIRMED** | `lsei/report-generator-prompt.md` lines 348-350 |
| Step 3 carries a spurious "Objective 5" tag | **CONFIRMED, FIXED** | Objective 5 is the first-run experience, which is Step 6's. Removed from gameplan line 129 and integration draft line 116. |

## From The Systems Engineer, 1.1

| Claim | Verdict | Evidence |
|---|---|---|
| `accumulator.md` has no `deps/` reference left to correct | **CONFIRMED** | `grep -c deps accumulator.md` returns 0. The task was stale, carried from his own 0.2 text through integration into the open. |
| `git check-ignore -v` exit status cannot distinguish an admitted file from an ignored one | **CONFIRMED** | `-v` on `literature/x.md` (re-admitted by `!/literature/**/*.md`) exits 0 with output; `-v` on `literature/x.pdf` (ignored) exits 0 with output. Identical signals. Under `-q` the same two probes exit 1 and 0 correctly. **The fixture harness must read `-q` exit status.** |
| The enforcement layer is blind to unknown content inside an admitted type | **CONFIRMED as architecture** | A path rule matches paths. `!/literature/**/*.md` admits any `.md` whatever it contains. |
| The three treaty `.txt` files have `.md` summaries beside them and the merge is about to move them | **CONFIRMED as pairing, NOT as contamination** | All three pairs exist. Verbatim 10-gram overlap of the `.md` against its `.txt`: 1967 treaty 7.4%, 1972 liability convention 7.6%, 1979 moon agreement 8.0%. All three sit below the 10% bar this project set at Step 0, and all three read as original summaries carrying quoted phrases. **The hazard is prospective. There is no live instance.** Do not restate this finding as though a treaty text is currently pasted into a summary. |

## From The Software Engineer, 1.3

| Claim | Verdict | Evidence |
|---|---|---|
| F4: the prototype emits two different trace-line orderings, one grade-first, unparseable across both | **CONFIRMED** | `lsei/oracle/answer_question.js` lines 392, 395, 400, 414 emit `Trace (<kind>, <grade>)`; line 421 emits `Trace (resolution-only, app-stored prose)`, grade first. A parser keyed on position 1 breaks on 421. |

## Corrections this file makes to an agent's own summary

The Systems Engineer's return implies the treaty pairing is a live contamination instance. It is
not, on the measurement above. His architectural finding stands unchanged and is the reason the
row is kept: the layer fails closed on unknown file *types* and is blind to unknown *content
inside an admitted type*, and no pattern fixes that. The fix is a content check in `tools/`
wired through `core.hooksPath`, which is 1.13's.

## From The Engineer, 1.7

| Claim | Verdict | Evidence |
|---|---|---|
| E14's diagnosis is wrong: the long filename is not what broke the clone | **CONFIRMED, and register row E14 must be rewritten** | The file the register cites is on disk in this working copy now: `lsei/literature/power-and-thermal/ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update.md`, 160 absolute characters, `git -C lsei config core.longpaths` unset. It checked out without incident. The Step 0 clone that failed was made into the session scratchpad, whose root is ~147 characters; 147 + 104 relative = 251 and the failure was a root-length budget problem. **The observation was recorded without the conditions under which it was observed.** `core.longpaths` in the bootstrap is not sufficient and may not be necessary; the fix is a path budget split between root and repo-relative. |

## From The Designer, 1.0

| Claim | Verdict | Evidence |
|---|---|---|
| C4 states "lines 357 to 686" and "328-line source" in one sentence with no rule distinguishing them | **CONFIRMED, mine** | 357 and 686 are the fence lines. Source between fences = 328. Inclusive span = 330. Both numbers correct, neither ruled. |
| "Twelve lines above the block" is wrong | **CONFIRMED, mine** | The sentence is at 349, the heading `## The verifier` at 352, the fence at 357. Seven above the fence, three above the heading. |
| Every stated LSEI ref in the artifact is now false | **CONFIRMED, mine** | A8's push moved LSEI `f788ea2` -> `7f97983`. Four stated instances went stale in one commit and none was swept. |
| Row A8's Finding cell contradicts its own Status cell | **CONFIRMED, mine** | Finding still reads "neither is fixed anywhere yet"; Status reads CLOSED and pushed. |
| `origin/main` of Lunar-Oracle holds one file | **CONFIRMED** | `git ls-remote` returns `42c9403` for HEAD and refs/heads/main. Nothing has been pushed, per the author's instruction. Reader (b) tests were therefore run against the working tree. |

**Sequencing consequence.** Five of the nine known instances of E16 were produced this session and
three of them are the orchestrator's own corrections. Sub-step 1.12 was pulled forward ahead of the
group The Manager scheduled it in, on The Designer's argument from 1.0: a correction pass applied
before the counting-rule contract exists will produce the tenth instance. Corrections to the
gameplan are held until 1.12 lands.

## From The Systems Engineer, 1.4

| Claim | Verdict | Evidence |
|---|---|---|
| `/.derived/` in `.gitignore` has no writer and its comment is false | **CONFIRMED, FIXED** | The rule's own eight-line comment states it is "contingent on the 1.6 ruling on loose end C4" and exists to hold an extracted `verify_report.js`. The author ruled the dependency is dropped, so nothing writes there. Rule and comment deleted. `.derived/x` is now tracked, which is the correct posture: if something does appear there it should be visible rather than silently ignored. |
| The two shelves enforce opposite postures: `literature/` is deny-by-default, `findings/` is not in `.gitignore` at all | **CONFIRMED, FIXED** | `grep -c findings .gitignore` returned 0. Applied the same three rules as `literature/`. Verified: `findings/fa1-x.md` and `findings/sub/y.md` ship, `findings/x.pdf` and `findings/x.docx` do not. This implements the author's two-shelf ruling rather than making a new map decision; flagged to the author as applied. |
| `Q-ROOT-ALLOWANCE` names `Q-PATH-CEILING-259` under `derived-from` and no such block exists | **CONFIRMED, OPEN** | A dangling reference in a quantity block, which is a hard failure under the counting-rule contract's own §5 check. The Engineer flagged the gap himself in his 1.7 addendum. **Owed against 1.7**, to be closed when the quantity checker is built. One block, not a redesign. |

**A consequence worth stating before it surprises someone.** The Systems Engineer's three new
quantity blocks make the existing bare "seven phases" and "six degraded modes" in the gameplan and in
`step1_manager_open.md` into lint findings on the first run of the counting-rule check. That is the
Tier 2 touch rule working as designed, not a defect introduced at 1.4.

## From The Software Engineer, 1.11

| Claim | Verdict | Evidence |
|---|---|---|
| The Designer's spelled-number lint regex needs `\b` on the group; `one` matches inside `someone` | **CONFIRMED** | Probe `"someone stated twelve lines above, and everyone agreed on seven."` Without boundaries the regex returns `one, twelve, one, seven` — two false positives from `someone` and `everyone`. With `\b` on both sides it returns `twelve, seven`. A correction to a correction, and it went the right way. |
| TRC-5: the four kind-first trace lines are also wrong, not just line 421's ordering | **CONFIRMED, and this is the larger half of F4** | The prototype emits exactly two trace shapes: `Trace (citation, resolution-only)` and `Trace (scalar, recompute-verified)`. Both are two-slot. The answer contract frozen at 1.3 requires three: `Trace (kind, grade, origin)`. So every trace line in the prototype is non-conforming — line 421 is additionally out of order, which is what made F4 visible, but the ordering defect was the smaller finding. **Nothing in the prototype emits a conforming trace.** |

## From The Software Engineer, 1.8

| Claim | Verdict | Evidence |
|---|---|---|
| Instance 6: `literature/REGISTER.tsv`, `FIELDS.tsv` and `INDEX.tsv` are ignored by the frozen 1.1 `.gitignore` and would be absent on every fresh clone | **CONFIRMED. Open, and only one third of it is fixed.** `git check-ignore -q` returns ignored for all three. `literature/` is deny-by-default admitting `*.md` only — a rule written for a shelf of summaries, which silently excludes every machine-readable file the corpus needs. The register escapes by moving to `oracle/REGISTER.tsv`, verified tracked. **`FIELDS.tsv` and `INDEX.tsv` are The Engineer's and still land under `literature/`.** Owed against 1.7 and the enforcement layer. |
| The retrieval probe: a rich in-file register block is a fabrication vector | **ACCEPTED, harness committed and re-runnable** | `tools/probe_register_encoding.js`, 13.5 KB, built against a copy of `lsei/literature/` and run through the real retrieval layer. The claim is that the register writes the question's own words into member bodies, which is the shape `confirmInText()` exists to refuse. This is a measurement nobody had made and the encoding choice was being argued as a preference. Not independently re-run by the orchestrator; the harness is committed so it can be. |

**Live inconsistency, being reconciled.** 1.8 amended the answer contract from version 1 to version 2
while 1.11 was writing a suite that asserts version 1. Both are The Software Engineer's and both
landed this session. He flagged it himself in his 1.8 return. The 1.11 agent has been resumed with
the four amendments and writes the delta to `step1_11_software_engineer_loop_suite_v2.md`. **The
version field caught this before any code existed, which is what it was added for.**

## From The Software Engineer, 1.4 review

| Claim | Verdict | Evidence |
|---|---|---|
| BC-8 passes against a `tools/githooks` directory that does not exist | **CONFIRMED, and this is the worst finding of the step** | Probe: `git init`, then `git config core.hooksPath tools/githooks` with no `tools/` directory present. The config write exits 0. `git config --get` returns the string. A commit then succeeds, exit 0, with no hook firing. **So asserting that `core.hooksPath` is set proves nothing about whether any hook will ever run.** Register row E1 says a pre-commit hook is not a mechanism because hooks are not cloned, and that the fix is a committed script the bootstrap wires via `core.hooksPath`. That fix is silently inert unless the assertion also proves the target directory exists and holds an executable hook. E1's remedy had the same defect as E1. |
| The Systems Engineer's live-run claim for BC-12 through BC-16 holds | **CONFIRMED by re-run** | Five for five pass. He did not overstate. The extraction check also re-verifies: 495 lines, 7 phase headings, 19 distinct BC ids. |
| The bootstrap does not detect a fresh clone missing `FIELDS.tsv` / `INDEX.tsv` | **CONFIRMED** | Both ignored, `oracle/REGISTER.tsv` allowed. The failure path is the dangerous one: the `.md` count assertion passes, origin `literature` reports available, the outcome is `CLEAN`, and retrieval then runs field-scoped IDF with no field map. Silent degradation on a clean bootstrap. |

**Note on the tension.** The A.9 pair ran as designed. The Systems Engineer's two contested judgement
calls both survived review — the root-budget split and the uninhabitable-root-as-terminal-outcome —
and the reviewer supplied a better argument for the first than its author had used. The marker rule
survives as a rule with its application incomplete at 14 of 19. The reviewer also declined a fight
the author staged over BC-7, which is the tension working rather than failing: neither persona is
required to take every offered disagreement.

## From The Manager (economics prompt), 1.10

| Claim | Verdict | Evidence |
|---|---|---|
| 17 axes, 176 `match_keys`, 0 K1 failures, 0 K2 failures, all assertions pass | **CONFIRMED by re-run, not by report** | `node tools/ecr_verify.js cr_scratch/step1_10_manager_economics_register.md _intake/japanese-miracle/lit` returns `ALL PASS`. Classes 5 `one_sided` / 7 `two_sided` / 5 `false_pair` = 17. Four axes carry more than two sides (ECR-05, 06, 13 at three; ECR-07 at four). The twelve axes that can produce `CONTESTED` sum to 29 sides, matching his persona-count figure exactly. **He built the two key checks before authoring rather than after**, which is why 51 of 340 candidates were rejected at authoring time instead of shipping dead. |
| A probe scored 0.00 on its own axis: `relationships` against a key of `relationship` | **ACCEPTED, and it is the significant one** | This is the third `match_keys` failure mode — a key nobody would actually say — which The Software Engineer established at 1.8 is unreachable by any build check. It was caught only because probes are measured rather than authored. It would otherwise have shipped as a 1.11 fixture and failed there, one step later and further from its cause. |

**Structural item for the merge of the two row sets.** The `H` header row carries one `basis_root`
field and there are two pre-merge roots: the lunar rows are authored against `lsei/literature`, the
economics rows against `_intake/japanese-miracle/lit`. Nothing breaks at answer time because the join
key is the leaf, but **the two headers cannot be spliced together unchanged.** Cheapest repair named
by the author: that one field holds both, space-separated. Owed at the point the two sets combine.

**A.9 is intact.** ECR-15 and ECR-16 state both positions and mark neither correct. The shared axis
LCC-12 was written once under the lunar prefix and not duplicated, with one requirement left on it
for The Space Resources Engineer.

## From The Space Resources Engineer, 1.9

| Claim | Verdict | Evidence |
|---|---|---|
| 15 axes, 80 members, 127 key slots (107 distinct), 0 failing, all assertions pass | **CONFIRMED by re-run** | `node tools/check_register_rows.js <extracted block> lsei/literature`: `parsed A rows 15 M rows 80 | H says 15 80`, `keys total 127 distinct 107 failing 0`, exit 0. The header's self-reported counts match the parsed counts, which is the check catching a splice error rather than the author's arithmetic. |
| He wrote the checker before the rows and it caught four keys that pass K1 and fail K2 | **ACCEPTED** | Three of the four are the same error, and he names it: he reached for the *app's* word for a quantity rather than the corpus's. The sharpest instance is that the three Cabeus sources never use the word "grade", which was the title of his own Step 0 entry. Same discipline The Manager applied at 1.10, same result: checks before rows catches what checks after rows cannot. |

**One usability note on the checker, not a defect in the rows.** `check_register_rows.js` reads its
input file raw, so pointing it at the `.md` deliverable emits `UNKNOWN ROW TYPE` for every prose
line. `ecr_verify.js` lifts the BEGIN/END block when handed an `.md`. Two checkers, two behaviours,
one register. Worth a note at 1.13, which is the sub-step that enumerates them.

**Two open items handed on.**
- **The `app_surface` tier defect.** Six modeled app sections carry a tier of `-`, and naming one
  turns every `APP`/`BOTH` verdict on it into an automatic `axis-incomplete` refusal. All 38
  addresses in the shipped rows were checked by hand and carry a status string, tier string or
  exclusion sentence, so nothing shipped broken. **But The Engineer must rule before 2.15 that an
  excluded node's app string is its exclusion sentence**, or four axes refuse on every question
  touching the excluded nodes — which is exactly where the corpus is supposed to do the work.
- **Six Step 0 figures were wrong or under-described** and are corrected in the rows. Notably a
  water-to-dust ratio with no stated excavation depth anywhere in the source, a deck that states no
  TRL, and a source that prints no specific power at all. All six were quoted in Step 0 prose.
