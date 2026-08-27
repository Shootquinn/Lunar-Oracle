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
