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

## From The Systems Engineer, 1.5 and 1.13

| Claim | Verdict | Evidence |
|---|---|---|
| `test -d tools/githooks` also passes on an empty directory with no hook firing | **CONFIRMED** | Probe: `core.hooksPath` set to an existing but empty directory, commit succeeds, nothing fires. So the obvious repair for BC-8 is inert too. |
| The POSIX exec bit is not the gate on git-for-Windows, and a shebang-less hook fails closed | **CONFIRMED, both** | A `pre-commit` written without setting the exec bit fired and blocked the commit. A hook with its shebang removed produced `error: cannot spawn gh/pre-commit: No such file or directory` and the commit **failed**, which is the safe direction. |
| All eight files in `tools/` are committed at `100644`, so a hook committed there is inert on a Linux clone and passes on the author's machine | **CONFIRMED** | `git ls-files -s tools/` returns `100644` for 8 of 8. `core.filemode=false` on this install. **Seventh instance of the pattern, and it inverts: the content is committed and the trigger is metadata.** |
| Two committed checks named `check` cannot fail | **CONFIRMED** | `tools/check_register_rows.js` holds exactly one `process.exit`, a guard for a missing tokenize export. No register failure produces a nonzero exit. It also hard-codes `C:/Users/Quinn Morley/...` at line 3 and cannot run on any other install. |

### Correction to this file's own 1.9 row — SUPERSEDED, and the second correction is worse

The first correction below said the `exit 0` half of the 1.9 verification was worthless. **That was
too generous.** The review at 1.5/1.13 ran the ratified lunar rows through the strict verifier and
the orchestrator re-ran it:

```
$ node tools/ecr_verify.js <extracted lunar block> lsei/literature
FAIL B6 cluster nasa-2025 partly registered:
  in=nasa-2025-fission-surface-power-directive.md
  missing=nasa-2025-moon-to-mars-architecture-add-revc.md
EXIT=1
```

**There is a live B6 failure in the ratified rows and the verification reported them as passing.**
The verification was not weakly evidenced. It was wrong.

Two mechanisms produced it and only one of them is the tool's. `check_register_rows.js` prints a B6
failure as an ordinary report line and exits 0. **The orchestrator then filtered the output** with
`grep -viE "^B[67] |UNKNOWN|probe_pos"` to extract summary lines, which removed the failure line
before reading the result. A filter applied to find the verdict deleted the finding. That is the
orchestrator's error, not the tool's, and it is the more serious of the two: the tool was silent,
the filter was active.

Routed to The Space Resources Engineer with instructions to fix the cluster, re-verify strictly, and
re-run every other assertion on the grounds that a checker which cannot fail leaves all of them
unenforced during authoring rather than only the one that fired.

### The original correction, kept because the reasoning in it is still the record


The 1.9 entry above cited `exit 0` as part of the verification. **That half was worthless** and is
withdrawn: the checker cannot exit nonzero on a register failure, so its exit status carries no
verdict. What survives is the printed output, which is real evidence — the tool parsed the block,
reported 15 A rows and 80 M rows against a header self-reporting 15 and 80, and reported 127 key
slots with 0 failing. Those figures were produced by code that read the actual rows. The conclusion
stands on weaker evidence than stated, and 1.13 has already ruled the fix: both weak checkers
consolidate into `ecr_verify.js` at 2.15.

**This is the check register catching the orchestrator on its first run**, which is the argument for
the register that no amount of specification would have made.

## 1.9 corrected — verified strictly, and the verification method is now stated

```
$ sed -n '187,283p' cr_scratch/step1_9_..._addendum.md > lunar2.tsv
$ awk -F'\t' '{print $1}' lunar2.tsv | sort | uniq -c     ->  1 H, 15 A, 81 M
$ node tools/ecr_verify.js lunar2.tsv lsei/literature > out.txt 2>&1 ; echo $?   ->  0
$ grep -icE "^ *FAIL|FAIL " out.txt                        ->  0
$ tail -1 out.txt                                          ->  ALL PASS
```

**Verification rule adopted after the failure above, and it is the correction that matters more than
the fix.** A verdict is: the strict tool's exit status, **plus a count of failure lines over the
whole unfiltered output**, plus the summary line. Never a filtered view. The B6 failure was in the
output the first time and a `grep -v` written to find the summary removed it. The rule is now that
the filter may not run before the verdict is read.

**The fix itself, and why it is better than the one that was asked for.** The instruction was to fix
a cluster. He started at the option that would have dismissed it — the two files are different NASA
offices four months apart, no shared content, and the unregistered one contains no mass, no kWe and
no specific mass at all. On LCC-10's own probe and three other fission questions it scores **0.00 and
ranks #112 to #125 of 152**, so the stated hazard, an unregistered twin surfacing on a fission
question, genuinely does not exist.

He then measured a question nobody had asked. On *"What is NASA planning for 2025 on the Moon?"* the
unregistered file ranks **#1 at 9.06 and the registered one #2 at 8.36** — 0.70 apart, near-tied, and
**only one of the two carried a register block.** Which file retrieval happened to return decided
whether the register engaged at all. Registered, with a position stating that the document baselines
a fission element and states no mass allocation, matching the precedent already on that axis where a
source is registered for printing *no* specific power.

His own words on it: he would not have added it unprompted, and a check he wrote and then defeated
found what his reading missed.

| Follow-on claim | Verdict | Note |
|---|---|---|
| Two assertions passed by authoring accident rather than enforcement | **His finding, accepted** | The banned-word list and comma spacing are implemented by the strict tool and not by his. One sentence written differently and the register ships telling users a `false_pair`'s sides contradict each other, with nothing to catch it. |
| All nine near-duplicate clusters are now fully registered or wholly unregistered; zero partial | **Reported, dated** | Two same-author pairs are wholly unregistered and therefore silent. **The moment 1.10 or 2.16 registers one member of either, B6 fires as a false positive.** The addendum carries the test to apply rather than leaving it to be re-derived. |
| He declined to propose a numeric cluster cut-off | **Accepted** | Nine samples, a nine-point gap, and one non-duplicate sitting closer to a non-duplicate than to its own duplicate. Over-inclusive is the right direction and he says so instead of fitting a threshold to nine points. |

## Wave 2, The Fact-Checker's gate

Five of seven UNVERIFIED suite claims cleared, one CONTRADICTED, one contradicted from Part 2. Three
source claims contradicted or qualified. The three that change work:

| Claim | Verdict | Evidence |
|---|---|---|
| FIX-10, the consequential suite claim, pinning register row C1 | **VERIFIED, and worse than the test claimed** | `valueModel` is not merely absent from `app_model.js`'s return tail — it lives in the `VALUE-CORE` island at `lsei/index.html` 7797 to 8448, and `app_model.js` reads only three other islands. It never opens that one. `margin_prop` is not among `model()`'s 26 output keys. She ran the router: the question returns `LITERATURE`/`ANSWERED` from a summary with a resolving trace. **C1 is live, and the fixture marked green fails its own stated invariant.** |
| The helium-3 total, ~8,500 litres per year | **UNSUPPORTED. The orchestrator relayed it.** | Grep of the whole corpus returns three occurrences of `8,500`: two are "28,500 dollars per kg" in a launch-cost table, one is "8,500 kg of platinum". **No source states it as a helium-3 volume.** It is 7,000 + 1,000 + 500 summed by the agent, and the 7,000 is the handheld-and-backpack detector category rather than government demand. It also implies a balanced market where the source says demand exceeds supply. The six component figures verify; the total does not exist. The `two_sided` reclassification survives regardless, so the axis is unaffected and only the number is wrong. |
| ECR-01's verdict, in the ratified economics rows | **CONTRADICTED** | The B7 correction underneath it verifies and is stronger than claimed — Wade records that no comparable Japanese study exists. But the verdict drops the word "Japanese," and Wade reports Lane 2017 finding Korean HCI-targeted industries grew faster in output and productivity. **That affirmative finding has no row anywhere.** And of the six members, two report no effect, two report positive labour-productivity effects, and two measure nothing about targeting. Routed back for re-scoping. |

**A verified negative worth keeping.** `verify_report.js` was checked by *running* it: `node --check`
clean, loads the real app, exits 0 on a clean document, fires two independent defect classes
separately, and self-proves by planting seven decoys and catching the applicable ones. It is a real
verifier, not a fragment. The author's ruling to drop the dependency stands on accurate grounds.

**A methodological finding against the suite's own advice.** The ledger told a verifier that if they
opened one file it should be `app_model.js`. One of the five claims concerns that file, and following
the advice would have missed the only contradiction in the set. Guidance about where to look is not
neutral.

### Orchestrator relay error 4

The helium-3 figure above was reported to the author as coming from the corpus. It does not. This is
the fourth relay of an agent's figure without counting it: "ten of nineteen" FA files (14), the lunar
register "all assertions pass" (a live FAIL), E10's "two pushes" (three), and now this. All four are
the same act — repeating a number produced by someone else without running the operation that would
produce it. The counting rule's `derived-from` field is the mechanism that separates a computed total
from a quoted one, and it landed this step.

## 1.10 corrected — verified, and the verification rule needed its own counting rule

```
$ sed -n '183,254p' cr_scratch/step1_10_..._addendum.md | tr -d '\r' > ecr2.tsv
$ awk -F'\t' '{print $1}' ecr2.tsv | sort | uniq -c     ->  1 H, 18 A, 53 M
$ node tools/ecr_verify.js ecr2.tsv _intake/japanese-miracle/lit > o2.txt ; echo $?   ->  0
$ grep -cE '^ *FAIL ' o2.txt                             ->  0
$ tail -1 o2.txt                                         ->  ALL PASS
```

**Two failures of method by the orchestrator inside this one verification, both caught before the
verdict was recorded.** First, the block was extracted with the *last* END marker in the file rather
than the one paired with its BEGIN, which swept 70 lines of prose into the TSV and produced `EXIT=1`
with seven fabricated `unknown type` failures. A wrong verdict from a correct tool. Second, the
failure-line count was taken with `grep -ci fail`, which matched `K1 failures 0` and
`(does not fail)` and reported 2 where the true count is 0.

**The rule is amended.** The failure-line count is `grep -cE '^ *FAIL '`, matching the tool's own
failure prefix, not a case-insensitive substring. A verdict rule whose own count has no counting rule
is the defect the counting-rule contract exists to prevent, committed inside the verification of a
register. This is the second time this step that a filter written to read a verdict has produced the
wrong verdict, and the first time it went the safe direction — it manufactured failures rather than
hiding one.

### The correction itself: the gate found two defects, the author found a third

| Item | Verdict |
|---|---|
| Wade is silent on Japanese targeting | **Verified and understated.** Wade lines 150-157 report Lane 2017 finding Korean HCI-targeted industries grew faster in output *and* productivity, persisting after the policy ended in 1979. Line 230 records that comparable studies for Japan and Taiwan **have not been conducted**. That is stronger than silence: he records that the study which would settle it does not exist. **The affirmative position is not absent from the corpus, it is absent from Japan.** |
| Six of six members report no effect | **Contradicted in the literature's own words.** `kiyota-2013` lines 45-48: Japanese industrial policy "contributed to labor-productivity growth but not to growth in total factor productivity." |
| **A third defect, found by the author running the warning over his own rows** | ECR-06 side B read "about 0.9 points, obtained as a residual after four named factors." `may-1977` line 29 says 0.95 points, reported as an explicit named category in the book's own accounting **and not as a residual**. The 0.9 is 8.77 minus 7.86, a subtraction performed in an FA deliverable. He imported the subtraction and its residual framing into a position presenting it as what the source relays, and his own earlier draft had 0.95 — **he degraded a correct figure while transcribing it.** |

**The fix is measured rather than asserted.** ECR-01 is re-scoped rather than split, on the argument
that splitting by instrument makes axes no question separates while country is a boundary questions
actually cross. Lane 2017 gets its own axis, one member, recorded as reported speech inside Wade with
Lane not on disk — the Johnson 1982 shape pointing the other way. Then the part that has to work: a
country-less question, *"Did industrial policy targeting raise productivity?"*, puts **identical mass
of 4.05 on both axes**, so whatever threshold retrieval is tuned to, they fire or fail together.
**The Japan answer can no longer come back alone.**

He also declined to supply Lane's full citation, because Wade's summary carries no reference list and
naming a citation he cannot see would be the 0.9 residual one level up.

**And a tool defect he owns:** `ecr_verify.js` exited 2 on his own deliverable, because the file is
CRLF on all 767 lines and the marker regex required `-->\n`. Both tools are now CRLF-tolerant. Exit 2
was the tool refusing rather than passing empty, which is the one thing it did right.

## The Manager's close: a defect in the orchestrator's own Step 1 table

He ran 1.1's `git check-ignore` fixture list — its own stated acceptance criterion, which nobody had
run since the file was written — and it failed, exit 1. Row 14 asserted `.derived/verify_report.js`
is ignored. The `/.derived/` rule was correctly deleted at 1.4 when the author dropped C4, and **the
fixture was never swept with it.** Verified: that path returns exit 1, not ignored.

The gameplan's Step 1 table, written by the orchestrator after the counting-rule contract landed and
after Wave 2 flagged this exact class, recorded 1.1 as "18 probes pass". **Both halves are wrong.**
The acceptance criterion is a 24-row list, not the 18 ad-hoc probes the orchestrator ran, and it did
not pass. Row 14 now asserts the post-ruling state and is kept rather than deleted, so a future rule
that re-ignores that path fails here.

Re-run of the amended list, all 24 rows, with the vocabulary mapped correctly:

```
row 10  literature/NAMING.MD  want=ignored got=allowed
rows checked: 24, mismatches: 1
```

**That single mismatch is the divergence 1.1 declared for itself**: exactly one row differs between
`core.ignorecase` true and false, and the author's own note is that the fixture must be *run* on a
case-sensitive filesystem to be a real assertion rather than approximated with a config flag. On this
install the row behaves as the platform requires. It is not a defect; it is the reason the acceptance
test is not fully assertable here, and that should be stated wherever the test is cited.

**A third orchestrator harness error inside this verification, caught before it reached a verdict.**
The first comparison run reported nine mismatches. Eight were a vocabulary bug in the comparison
harness — the fixture writes "not ignored" and the harness compared against "allowed". Only row 10
was real. Three harness errors in one step, all in the machinery for reading verdicts rather than in
the tools being read: a `grep -v` that deleted a failure line, a block extracted with the wrong END
marker, and now a vocabulary mismatch. Two of the three manufactured failures; one hid a real one.

## From The Engineer, 1.14 — promotion and the two registers

| Claim | Verdict | Evidence |
|---|---|---|
| The brief's CRLF premise is false | **CONFIRMED, and the premise was the orchestrator's** | Measured: 35 of 41 `cr_scratch/*.md` are pure LF, 6 contain CR. The specific file an agent called "CRLF on all 767 lines" has **0 CRLF pairs and 767 bare LF**. That agent's CRLF diagnosis of its own tool failure was wrong, the orchestrator repeated it into a brief without checking, and The Engineer's own first probe reproduced it before he identified it as an instrument fault. **Orchestrator relay error 6.** The CRLF-tolerance fix applied to both tools is harmless but addressed a non-problem; the real cause of that exit 2 is unidentified and should not be recorded as solved. |
| `oracle/REGISTER.tsv` cannot exist as one file | **CONFIRMED** | Both promoted halves carry exactly one `H` row each. Concatenated: 2 `H` rows against a schema admitting one, exit 1, **143 failure lines.** Promoted as `REGISTER.lunar.tsv` and `REGISTER.econ.tsv`. He declined the merge as a schema ruling he does not own, which is correct. Routed to The Systems Engineer and The Software Engineer. |
| `grep -c '^FAIL'` returns 0 against a real count of 143 | **CONFIRMED, and it validates the amended verdict rule** | `ecr_verify.js` indents its failure lines two spaces. On the concatenation: `^ *FAIL ` returns 143, `^FAIL` returns 0. **A naive anchored count would have reported a clean run against 143 failures.** This is the fourth error in the verdict-reading machinery this step and the first the amended rule caught rather than committed. |
| Promotion is real and verified | **CONFIRMED by listing** | `oracle/` holds 11 files including `answer_contract.md`, `bootstrap_contract.md`, `check_register.md`, `currency_policy.md`, `install_state.md`, `register_schema.md`, `MANIFEST.tsv`, `AMENDMENTS.tsv`, `VERIFIED.tsv`, both register halves and `tests/`. `literature/` holds `NAMING.md`. Both directories existed nowhere an hour ago. |

**The instrument validating itself is the strongest result of the step.** `tools/quantities.js`, an
independent implementation, reproduces The Designer's hand measurement of 16 hard counting-rule
failures **exactly, clause by clause**, with the delta to 23 fully attributed to two events after his
run. A hand measurement and an independent implementation agreeing to the clause is the only evidence
available that either is right.

**And the lift-is-a-copy prediction measured:** promotion takes 23 failures to 33, and **the eight new
duplicates are exactly the eight blocks two personas independently predicted.**

### Orchestrator relay errors: six confirmed

1. "Ten of nineteen" FA files, relayed into an author ruling. True figure 14.
2. Lunar register rows reported passing; strict re-run returns FAIL, exit 1.
3. E10's "two pushes" left unswept when the orchestrator made the third.
4. A helium-3 total that exists in no source, being three category figures summed.
5. "Thirteen amendments" written into a review brief; the true figure is seven, 13 being the highest row label.
6. "Every file in `cr_scratch/` is CRLF", written into a brief from an agent's wrong self-diagnosis. 35 of 41 are pure LF.

All six are arm 2 of The Manager's common-cause ruling: a number crossing a boundary between seats
without the relaying seat running the operation that produces it. Arm 1 now has a checker. Arm 2 has
a standing rule and no mechanism, and it is where every one of these lives.

## Orchestration error: R-2, R-3 and R-4 were spawned in parallel onto shared files

The Manager's wave structure kept reviews sequential. The revision pass did not, and R-2 reports the
consequence from inside it: `COUNTING_RULE.md` §8 moved three times while he worked, its block census
reading 60, then 62, then 56, then 60; and R-3 landed a change in `ecr_verify.js` minutes after he
had ruled on that file. His own words are the right characterisation — his failure count "is a
reading of a moving file, not a score."

**This is the orchestrator's error, not his.** Three agents amending the same promoted specifications
and the same shared tools concurrently is the write-conflict shape the file-handoff convention exists
to avoid. Two mitigations he applied unprompted, both correct: every amended `cr_scratch` source now
carries a `DIVERGED AT R-2 — DO NOT RE-LIFT` note above its BEGIN marker, and he states that the
index must be regenerated by whoever closes last.

**Consequence for the close:** no failure count taken during the revision pass is a verdict. The
counts must be re-taken once all three items have landed and nothing else is writing. That
re-measurement is a precondition of the re-close, not an optional confirmation.

**A measurement that got stronger while it was being used.** R-2 reports `grep -c '^FAIL'` against
`ecr_verify.js` returned 0 against 143 before R-3, and 145 against 144 after, because R-3's fix added
a `FAILURES <n>` summary line that the anchored pattern matches. The amended rule, `^ *FAIL ` with the
trailing space, agrees with the tool in both states. A pattern that was right for one version of a
tool and wrong for the next is the same class as everything else in this section.

## Clean re-measurement, taken with nothing writing

The precondition R-2 named. All three revision items landed first; no agent was running.

```
node tools/quantities.js --check      exit 1   FAIL lines 11   (^ *FAIL )
node tools/check_registers.js         exit 0   FAIL lines 0
node tools/ecr_verify.js REGISTER.lunar.tsv lsei/literature            exit 0   FAIL lines 0
node tools/ecr_verify.js REGISTER.econ.tsv  _intake/japanese-miracle   exit 0   FAIL lines 0
```

**Attribution of the eleven, checked rather than accepted.** Eight are `M2` duplicate ids and two are
`M3` value collisions, all in the 1.9 and 1.10 addenda, which re-mint quantity blocks instead of
editing in place — the shape The Designer named as W2-11. One is `M11` on a register-schema block.
**Every one carries at least one row in `oracle/AMENDMENTS.tsv`**, verified by id.

**Zero of the eleven touch a promoted authority.** `grep` over the failure lines for `oracle/`,
`literature/` or `COUNTING_RULE.md` returns 0; all eleven are `cr_scratch/` paths. The files that are
now the authority are clean, and the failures are in the review record behind them, held by rows.

**A counting trap R-4 found that had already broken a sweep of mine.** `grep -c` exits 1 on zero
matches, so `check-A && grep -c FAIL && check-B` stops silently after the first clean check. The sweep
above runs each check into its own file and counts separately for that reason. That is the fourth
distinct failure mode in the verdict-reading machinery this step: a filter that deleted a failure, a
wrong END marker, a case-insensitive substring, and now a zero-match exit code.

## Correction: "zero of the eleven touch a promoted authority" was wrong

**Orchestrator relay error 7, and it is the same mechanism as the first.** The sentence was produced
by filtering the failure lines for `oracle/|literature/|COUNTING_RULE` — **three paths typed from
memory.** `oracle/MANIFEST.tsv` holds 47 targets. Two `M3` failures name `QUANTITIES.md:21`, `:24`,
`:25` and `:42`, and `QUANTITIES.md` is one of them.

Verified: `grep -c QUANTITIES.md oracle/MANIFEST.tsv` returns 1.

The substance is mild — `QUANTITIES.md` is generated, so it self-corrects on the next index run — but
the sentence was a verdict and it was false. **The rule this project already wrote covers it and was
not followed: a filter over a file set reads the manifest, not a remembered list.** Every wrong
verdict this step has come from the same act: writing the instrument that reads the result instead of
reading the result.

Four now, all mine, all in the verdict-reading machinery rather than in any tool:
1. `grep -v` to extract a summary, which deleted the only real failure line.
2. A block extracted with the last END marker in the file rather than the one paired with its BEGIN.
3. A case-insensitive substring count that matched `K1 failures 0` and `does not fail`.
4. A path filter typed from memory against a manifest of 47.

## Gate item C-2, applied

The index of record had no fifteenth sub-step: `grep -c "1\.14" lunar-oracle-gameplan.md` returned 0
while `oracle/` held twelve promoted files. Three defects, all in the artifact a cold session reads
first, all echoes of corrections that had landed elsewhere:

- The table held 14 rows. 1.14 now has one.
- The table's own preamble read "Fourteen sub-steps, 1.0 through 1.13" **one line above a table that
  now holds fifteen**, and its next paragraph read "Nothing in this step has been promoted to its
  target path... `oracle/` does not exist." Both corrected, and the paragraph now names
  `oracle/MANIFEST.tsv` as the authority on the path-to-file join rather than the table column,
  with the 47-target figure stated so the next filter is written against it.
- The progress entry still said "fourteen sub-steps" and repeated the exact "18 passing probes" claim
  that revision item R-1 was raised to correct, having been fixed in the table cell and left standing
  here. Both corrected, with the counting rule attached.

`grep -c` for all four stale phrases now returns 0.

## Gate item C-1, discharged — and the count went up

All six blocking rows applied to the promoted text, plus four that were the same edits, each marked
`applied` only after read-back. One row stays `owed` and its cell says why rather than being closed
to tidy the register.

**`quantities --check` reads 12, not 11, and the twelfth is its author's own.** Landing the mode
correction makes `Q-DEGRADED-MODES` fail `M3`, because three sites still carry the old value — all
recitations of the old block text inside code spans in two **frozen** review documents, written by
two other personas while arguing that the old value was wrong. He checked both escape routes rather
than assuming: the contract's `pending:` form does not suppress `M3`, and it could not be used here
anyway because a check requires an amendment target to be a manifest row. He minted a row against the
counting rule and **declined to edit another persona's argument to make a number go down.** Two of the
eleven pre-existing failures have the same shape, so it is the rule's gap rather than his edit's.

```
node tools/quantities.js --check      exit 1   FAIL lines 12
node tools/check_registers.js         exit 0   FAIL lines 0
```

**Three of the twelve touch a manifest target**, matched by reading `oracle/MANIFEST.tsv`: two name
`QUANTITIES.md`, generated and self-correcting, and one names `oracle/bootstrap_contract.md` and is
the row above. The other nine are in the two register addenda. All twelve carry an amendment row.
Register: 133 rows, 62 owed, from 131 and 70.

### Orchestrator relay error 8 — the rule was written and then broken one measurement later

Error 7 was a path filter typed from memory. The correction wrote the rule into this file: *a filter
over a file set reads the manifest, not a remembered list.*

**The very next measurement broke it.** Extracting manifest targets, the column was guessed rather
than read: `awk -F'\t' 'NR>1{print $1}'` returned the row-type letters `H` and `D`, so a
substring match against "D" hit almost everything and reported seven spurious authority touches. It
was caught only because the output was visibly absurd — single letters printed as file paths — and
not by any check. Reading the manifest's actual columns gives 18 `D`-row targets and the true figure
of three of twelve.

**This is the fifth wrong verdict from the same act, and the first committed after writing the rule
against it.** The record now reads: a `grep -v` that deleted a failure line; a block extracted with
the wrong END marker; a case-insensitive count matching the word "failures"; a path filter from
memory; and a column index from memory. Every one is the instrument that reads the result, not the
tool being read. **A rule a person must remember to apply is not a process fix**, which is this
project's own Deming reading, and the eighth error is the evidence for it — the rule was one screen
above the command that broke it.
