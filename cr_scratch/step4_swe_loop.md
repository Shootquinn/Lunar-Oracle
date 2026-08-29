# W4-5, The Software Engineer: the answering loop. 4.1, 4.7, 4.6, 5.1, 5.2, 5.3, 7.4

**Read-digest for every figure in this file:** `HEAD = 99d3601`, working tree at the time of the run
recorded beside each figure. `literature/` 169 summaries. `oracle/REGISTER.lunar.tsv` 15 axes /
68 member rows, `oracle/REGISTER.econ.tsv` 18 axes / 53 member rows.

---

## 0. The headline, and the number that matters

```
node oracle/tests/run_suite.js
  wave open        405 rows,  33 pass,  4 fail, 368 unrun   ( 7 DEFERRED, 0 VACUOUS, 361 NO BINDING)
  this sitting     455 rows,  90 pass,  8 fail, 357 unrun   ( 9 DEFERRED, 0 VACUOUS, 348 NO BINDING)
  at hand-off      455 rows,  55 pass, 10 fail, 390 unrun   (42 DEFERRED, 0 VACUOUS, 348 NO BINDING)
```

**Two runs, and the difference between them is not mine.** Mid-sitting the router seat added a new
required input: `loadContext` now refuses `input-missing` naming
`oracle/router/thin_threshold.json`, which does not exist yet (`oracle/router/calibrate_thin.js`
writes it, and `oracle/router/thin_patches.js` landed while this file was being written). Every
binding that needs the assembled loop therefore **DEFERS with that blocker named and its owner
named** — 33 `RFX` rows and 4 `INV` rows — instead of reporting a pass or a spurious red. That is the
designed behaviour and it is the better demonstration of it: the machinery was exercised against a
real mid-build condition rather than a staged one. Re-run when `thin_threshold.json` lands and the
row returns to the middle line. **I did not run another seat's `--write` build step to make my own
numbers look better.**

**One figure is identical in both runs and it is the one the close condition names: 348 rows with no
binding at all, down from 361.** That number does not move with the blocker, because a binding that
defers is still a binding.

**Bound rows went from 44 to 107 in both runs. Sixty-three rows moved from "no executable binding at
all" to bound**, and that is the figure the close condition asks for rather than the pass count. Of the 63:
**fifty are new rows that landed bound** — 48 executable, 2 marked `H` and bound to a `DEFER` that
names the human owner, so that "a human gate" and "nobody bound this" stop printing identically —
and **thirteen are pre-existing rows that had sat unbound since Wave 1**: `GRD-9`, `CLM-7`, `LOG-1`,
`LOG-2`, `LOG-9`, `LOG-11`, `LOG-12`, `LOG-18`, `INV-6`, `INV-7`, `INV-8`, `INV-9`, `INV-11`.

**`run_suite.js` loses no passing row, in either run.** The corpus suite reports 33 pass and the same
four standing failures argued in `af7abec` both times; every new pass is a row that was UNRUN before.

**Hard failures went 4 → 8 with the loop loadable.** The four new ones are `RFX-04`, `RFX-07`, `RFX-09` and `RFX-13`, they
are the fixtures doing their job on their first run, and §2.3 measures them. **None of the standing
four is touched.**

**Decoys: 40 written, 40 observed to apply, across five checkers plus the fault-injection pass** —
measured with the loop loadable. At hand-off the fault-injection pass reports **8 written, 5 applied**
and exits non-zero with `MISMATCH: 3 decoy(s) did not apply. THAT IS A FAILURE AND NOT A FOOTNOTE`,
because the three register decoys cannot reach a loop that refuses at load. **That is the rule
working, out loud, on a condition nobody staged**, and it is a better result than a green run: the
three are reported as unexercised controls rather than as passes. The 32 decoys in the five standalone
checkers are unaffected — they mutate produced answers, not the router — and all 32 still apply.

---

## 1. What shipped

**The State column is measured with the assembled loop loadable** — the middle run of §0. The three
artifacts that do not touch the router (`isru_three_facts.js`, `verify_haiku.js`,
`verify_register.js`, `verify_answers.js`, `transfer_gate.js`) report identically in both runs.

| Sub-step | Artifact | State |
|---|---|---|
| 4.1 | `oracle/tests/answering_loop_suite.md` §15, 35 `RFX` rows; 14 `[4.1]` attachment points resolved | 31 pass, 4 fail |
| 4.7 | same file §16, 15 `ISR` rows; `oracle/tests/isru_three_facts.js` | 13 pass, 2 `H`; **18/18** proofs |
| 4.6 | `tools/transfer_gate.js` | **23/23** proofs |
| 5.1 | `tools/verify_haiku.js`, `tools/verify_register.js` | **37/37** and **25/25** proofs |
| 5.2 | `tools/verify_answers.js` | **13/13** proofs; six outcomes, six tests that fire |
| 5.3 | `oracle/tests/fault_inject.js` | 8 decoys, 8 applied, 7 pass, **1 red and it is a finding** |
| 7.4 | `oracle/tests/sampling_protocol_suite.md`, 53 `SMP` rows | stage 1 of four |
| directed | `tools/probe_register_encoding.js` `--selftest`; hardlink repair in `tools/manifest.js` and `tools/quantities.js` (`M16`) | both discriminate |

---

## 2. Sub-step 4.1 — the register fixtures, and the gate they went through

### 2.1 A.10, read before the suite was touched, and step 5 is why

**I read `cr-agents/method/operational_guide.md` A.10 in full before editing the suite**, because
A.10 step 5 governs exactly this case: the answering-loop suite is already the contract, so a
revision to it is not an edit, it is a contract amendment, and step 5 routes it back through step 2's
source-verification gate for every new test that cites a source document. Thirty-three of the
thirty-five new rows cite member summaries. So the gate binds on thirty-three rows.

### 2.2 The gate ran, and it found ten defects

**All 121 member rows of the 33 axes were read against their summaries in full — 83 distinct files,
1.81 MB** — and every side claim was checked element by element against the file it names.

| Result | Count |
|---|---|
| `SUPPORTED` — every element traceable to text in the named file | **105** |
| `PARTIAL` — core claim present, one element (usually a cross-file editorial note) is not | **13** |
| `CONTRADICTED` — the named file says otherwise | **3** |
| `NOT-FOUND` | **0** |
| `## Contested` block present and correctly keyed | **121 of 121** |

**The three CONTRADICTED.**

- **`LCC-10` side A, `nasa-moon-to-mars-doc.md`.** The side claim attributes a multi-kWe target and
  the 2018 KRUSTY ground test to the Appendix E *data-gaps* catalog. The summary places both in
  Appendix D's *technology-gap* catalog and describes the data-gaps catalog as covering only
  imagery, water-ice, geotechnical and volatile measurement gaps.
- **`ECR-05` side B, `nakamura-1989-postwar-japanese-economy.md`.** The claim says tenanted land fell
  to 9 percent; the file says 10. **And the "owner-cultivators from 31 to 70 percent" figures are not
  in this file at all — they are `kawagoe-1999-japan-land-reform.md`'s**, which is side A of the same
  axis. A figure attributed to the wrong member of the same axis is the failure mode that resolves.
- **`ECR-07` side D, `may-1977-how-japans-economy-grew-so-fast-review.md`.** The claim says the
  knowledge term *is not* an aggregate residual. The file's own reviewer assessment says it *is* one,
  "a residual that absorbs unmeasured effects and measurement error."

**Seven `axis_statement`s are OVERSTATED or UNDERSTATED, and that matters as much**, because
`register_schema.md` §7 ships the `axis_statement` **verbatim** into a `CONTESTED` answer. An
overstated statement is not a review note; it is a sentence the Oracle will say.

| Axis | Finding |
|---|---|
| `LCC-08` | OVERSTATED — "every landing site in this corpus's architecture studies is polar highland"; `leger-2025` favours High-Ti mare and `sanders-2025` classes mare hydrogen/CO reduction at TRL 5 |
| `ECR-01` | UNDERSTATED — the three-bucket trichotomy covers 4 of the axis's 6 member claims |
| `ECR-09` | OVERSTATED — `kiyota-2013` measures no TFP at all; its own limitations say the capital-stock data are unavailable |
| `ECR-12` | OVERSTATED — Henderson's six multi-year Plans (1955–73) and ESRI's six annual outlooks (FY1955–60) read as one fact; the stated date range fits only the second |
| `ECR-13` | OVERSTATED — `hoshi-1991` tests private keiretsu main-bank ties and never mentions FILP or directed credit |
| `ECR-16` | OVERSTATED — "four theoretical accounts hold"; `lewis-1954`'s own file says Lewis does not support the substitution, and `lee-2008` states the constraint rather than the claim |
| `ECR-17` | OVERSTATED — "usually does not" persist, against Hausmann's own 37 of 69, which the paper calls close to a coin flip |

**Ten fixtures are therefore `RED`, with the defect, the owner and an observation-shaped close
condition on each row. None of the ten is repaired here.** The registers are not this seat's files,
and a suite author who repairs the artifact his own tests just failed has destroyed the only evidence
that the test worked.

### 2.3 Four more went RED when the fixtures were first RUN, and they are a different defect

The ten above failed the SOURCE gate. These four pass it and fail the MECHANISM.

```
K = 2.431  (PROVISIONAL, plateau midpoint of the widest best-scoring interval, oracle/router/axis_threshold.json)
LCC-01  CONTESTED   mass fires        <- the control
LCC-04  LITERATURE  axes_fired: []    keys carried by the probe: energy, water    (both corpus-ubiquitous)
LCC-07  LITERATURE  axes_fired: []    keys carried: oxygen, kilowatt, energy
LCC-09  LITERATURE  axes_fired: []    keys carried: solar, power, polar
LCC-13  LITERATURE  axes_fired: []    "Who would buy lunar helium-3?" -- `helium-3` does not tokenize to `helium`, so NO key is present
```

**These four axes do not fire on their own `probe_pos`** — a question written by the axis's own author
for the purpose of triggering it. `register_schema.md` §4.2 both predicts this and rules where the
fix goes: *"a key can tokenize cleanly, occur in the corpus, and still never appear in a question
anybody asks... `probe_pos` and `probe_neg` are the test that replaces the checker"*, and *"the fix
is **an edit to `match_keys`, not an edit to the router**."* So this is §4.2's own test firing the
first time anybody ran it.

**`LCC-09` is the sharpest of the four and it is a contract-level finding, not a tuning note.** The
axis did not fire, retrieval then ran, and it returned
`power-and-thermal/ross-2023-lunar-south-pole-solar-power.md` as a one-sided `LITERATURE` answer.
That file **is a member of the axis that did not fire.** Contract §5's `misclassified` condition is
met exactly — *"a searched retrieval returned a file belonging to an axis whose `match_keys` this
question touched at any nonzero overlap, while classification did not fire that axis"* — **and no
`misclassified` code was emitted.** The detector is either absent or not reached.

### 2.4 Every side, never both — and the count that forces it

The expected verdict in every RFX row names **the axis's own side count, read out of the register at
run time**, never the literal two. Measured independently, command in §15.1a of the suite:

| class | axes | sides |
|---|---|---|
| `two_sided` | **18** | 11 at 2 sides; **7 at 3 or 4** — `LCC-01` 3, `LCC-03` 3, `LCC-04` 3, `LCC-07` **4**, `LCC-09` 3, `LCC-12` 3, `ECR-13` 3 |
| `false_pair` | 8 | 2 to 4, correct by definition |
| `one_sided` | 7 | exactly 1 in all seven — exactly one, not at least one |

**Correction to a relayed figure:** the count of `two_sided` axes is **18, not 22**. The seven
carrying more than two sides are exactly as relayed, and the seven `one_sided` axes carry exactly one
side each as relayed. The binding asserts `wave.personaCount === axis.sides.size`, not `>= 2`;
`RFX-35` is the decoy that makes the difference between the two readings observable rather than
argued, and it is not a duplicate of `FIX-19` — `FIX-19` names no axis, so on a two-sided axis it
leaves one side and any side count catches it.

### 2.5 The fourteenth `[4.1]` attachment point resolved RED

Thirteen of the fourteen resolve to `green`. **`LIM-10` does not.** `register_schema.md` §7 states
its own one-side disclosure is *"a request, not a ratification"*; `step0_editor_prohibition.md` §9 is
a **closed** list of five permitted self-statements, extending it is the author's decision and not a
persona's, and **no ratification of that line exists on disk**. So a `one_sided` axis cannot today
emit the sentence explaining why only one side appeared. The axis still functions — it is named, the
single side is delivered, no second side is fabricated — and the reader loses the explanation.
Marking it `green` before the ratification would be the `FIX-9`/`FIX-10` defect a third time.

---

## 3. Sub-step 4.7 — the three named facts

`oracle/tests/isru_three_facts.js`, 15 suite rows, **18/18 proofs, 7 mutations written and 7 observed
to apply.**

**Scope is the figure-bearing sentence plus one lookahead, never the answer, and that is the design
decision.** An answer-wide scope is the weaker reading of R5: an answer carrying an extraction-only
modelled figure and an integrated measured one satisfies an answer-wide check with one facts block,
and the reader cannot tell which figure it belongs to. That is exactly `LCC-04`, which §6 names as
where R5 binds hardest. `ISR-8` is the decoy that proves the scope is not answer-wide, and it passes.

**`ISR-2` fired on its own author's first draft.** Two of seventeen unit tokens — `wh/g` and
`kwh/kg of oxygen` — occur nowhere in `literature/`. A closed list nothing can trip is decoration,
and the row earned its keep before the section shipped. Both were removed; the list is now 15 tokens
and every one of them occurs.

**R4 is mechanized in the only form that discriminates.** A TRL numeral requires a locator in the
same answer that **resolves on disk** to a file which itself contains the string `TRL`, and whose
leaf carries a four-digit year (R4's date clause, free, because `NAMING.md` already puts the year in
the leaf). **A proximity check on the word `Trace` passes the failure R4 names** — every literature
answer this router emits carries a trace, so proximity is satisfied by construction and asserts
nothing. `ISR-12`'s decoy is the pair that proves it: the same TRL sentence spliced into two real
produced answers differing only in which file the router's own locator resolves to. One cites
`kiewiet-2026` (which contains `TRL`) and passes; one cites `take-or-make-in-space` (which contains
no `TRL` at all) and fails.

**Premise correction.** §6 R4 says *"this corpus has exactly one TRL sheet."* Measured now:
**24 files under `literature/` carry the string `TRL`**, of which `sanders-2025-nasa-isru-progress-review.md`
is the only cross-process maturity survey. R4's operative clause — *"resolves to it **or to a primary
that states its own maturity**"* — is the disjunctive form and it survives the merge; the "exactly
one" figure was measured pre-merge and no longer holds. The assertion is written to the disjunction.

**Two rows are `H` and are marked so nobody counts them as mechanized.** `ISR-13` (R2: prefer the
demonstrated figure) and `ISR-14` (three facts named and three of them wrong). Thirteen of fifteen
mechanized, and the fraction is stated rather than implied.

---

## 4. Sub-step 4.6 — the transfer gate

The Manager's specification (`oracle/transfer_gate.md`, 4.4) and his assertions
(`oracle/acceptance/transfer_assertions.md`, 4.5) both landed. **His assertions are taken as given.
None was weakened.** `tools/transfer_gate.js`: **23/23 proofs, 6 mutations written, 6 applied.**

**The one structural decision, and it is what makes F12 mechanical rather than procedural.** §0 says
the gate runs before composition and §3.8 says it composes nothing; but "runs before" is not
observable in a finished file — a line emitted first and a line appended afterwards are the same
bytes. So the gate is made the **sole producer** of transfer lines and carries its output forward as
a set; `checkAnswer(text, gateOutput)` fails on any transfer line the gate did not emit. Post-hoc
becomes set membership rather than timing, and `TG-40` becomes a decoy that can actually be run.
`DECOY-POST-HOC-LINE` demonstrates the discrimination directly: **with the gate's output, 1 finding;
grammar-only, 0 findings.**

**Measured against the table as it stands:** 24 rows parse; the basis-to-verdict map holds on 24 of
24 (`TG-08`); `absent` appears 0 times as a verdict and 10 times as a basis (`TG-09`); every row
carries all its fields (`TG-38`); and **66 leaf references, 42 distinct, 0 unresolved.**

**Correction owed to 4.5:** `TG-36` records *"58 references, 37 distinct, 0 unresolved"* and `TG-37`
records *"37 = 37 after the format fix; the pre-fix command returned 24."* The table has grown since
those were written. The current figures are **66 / 42 / 0**, and the independent raw scan that
`TG-37` demands agrees at **42**, so `TG-37`'s property holds at the new size — but its recorded
numbers are stale and a later reader comparing them will think the parser regressed.

**One assertion is unsatisfiable as written and is routed back rather than weakened.** `TG-41` reads
*"RED — no produced answers exist yet; closes when the loop produces its first answer at 4.6."* The
loop does produce answers — `lsei/oracle/answer_question.js` runs, and every decoy in this file is
built from bytes it wrote — so the stated blocker is discharged and `TG-41` should close. What it
cannot yet assert is the *deliverable* form: contract §6 requires a file and the prototype writes a
stream. §5 records the consequence.

---

## 5. Sub-steps 5.1, 5.2, 5.3 — and the two times the rule caught me

### 5.1 `verify_haiku.js` — 37/37, and the proof set is better than a mutation

`cr_scratch/step0_writer_register_spec.md` §1.5 carries **six worked haiku with the author's own
syllable segmentation stated beside each**, and §1.6 carries **seven that must not ship, each with
the rule it violates named.** That is a known-answer test set produced by a person, on disk, written
before this checker existed and without reference to it. No mutation of mine improves on it. The
haiku are read out of that file at proof time and never copied into the checker.

**The known-answer set caught my own list over-firing on the artifact it was written to protect.**
`CONTROL-6` — the author's own sixth worked haiku, *"I asked the model, it had no door for this one;
the door is below"* — failed rule 1 on the word `one`. §1.3 rule 1 prohibits "a cardinal quantity, in
any orthography"; `this one` counts nothing. `one` after a determiner is now a pronoun, and the
exception is recorded rather than quietly added.

**A5 was added because §1.6's seventh counterexample passed A1 through A4.** *"the search is
complete, the answer is in the file, please read it below"* is a status line in 5-7-5. §4.4's
positive form is a rule and not a taste — *the haiku states a disposition; it never describes the
machinery that produced either* — so it is a closed list of machinery subjects, weak on purpose, and
`MOOD-IS-THE-ONLY-FAILURE` asserts the §1.4 counterexample passes all seven §1.3 prohibitions and
fails only on mood.

**Three outcomes, not two.** `PASS`, `FAIL`, `UNCERTIFIED`. An unknown word is a refusal to certify:
into `PASS` and the check is decoration; into `FAIL` and the first unusual word gets it switched off.
`UNCERTIFIED-IS-NOT-PASS`, `UNCERTIFIED-IS-NOT-FAIL` and `DICT-REPAIR-WORKS` are three separate
proofs because the third outcome is the whole of the honest-limit claim.

### 5.1 `verify_register.js` — 25/25, and the lists are the app's

Coefficient names are `KNOB_DATA.CONFIG`'s own **13** keys; named sources are `KNOB_DATA.REFERENCES`'
own keys plus author surnames of five characters or more, **89** in total. Both read at run time, per
contract §7. `CLAIM-BEARING-READS-THE-APP` and `CLAIM-BEARING-NAMED-SOURCE` assert the join rather
than assume it.

**The controls caught a real input error and the checker was right.** Run against the prototype's
stdout, B1 fired on `SUB-CLAIMS  (1)` and on the echoed question — both carry numerals and neither
carries a trace. **The prototype prints a TRANSCRIPT; contract §6 says the deliverable is a file.**
The proof now slices the answer body out at the prototype's own rule, and the incident is recorded in
the file, because it is a property of the prototype and it is the reason 3.9's composition path must
write a file rather than a stream.

B2 is counted with its denominator and is not a gate; `B2-COUNTS-AND-DOES-NOT-GATE` asserts that it
does not change the verdict.

### 5.2 `verify_answers.js` — six outcomes, six tests that fire

Extended, not restructured, from the prototype's four. Contract v2 splits them across two columns —
`outcome` five, machine-written, in precedence order; `review` three, human-written — and **the split
is the mechanism, not a formatting choice.** `MISCLASSIFIED` and `REGISTER_FAIL` are self-reportable
because they are observations about mechanism; `FILLED` is not, because it is a judgement about
correctness.

**The close condition is that each of the six has a test that fires**, which is a different claim
from "the six are named in the report" — a name printed with a zero beside it is not evidence that
the counter works. Six `FIRES-` proofs, one per outcome, each over a log containing exactly one such
row. Plus `REFUSED-NOT-ABSORBED`, `NINE-FIELDS-REQUIRED`, `UNRECOGNISED-IS-A-FINDING`,
`PROPORTION-WITH-DENOMINATORS` (3 FILLED / 40 reviewed / 210 run) and
`DELIVERABLE-PATH-REQUIRED`.

**Stated plainly rather than glossed:** this is the one checker whose `--prove` uses constructed
fixtures. Its subject is a LOG, no loop on disk writes one yet, and a log is the one artifact where a
constructed fixture is legitimate — the rows are the data format itself, not prose about the world.
The file says so in its own header and says that `--prove` should read a real log the moment one
exists.

### 5.3 The fault-injection pass — 8 decoys, 8 applied, 7 pass, 1 red

**Against the assembled loop.** `oracle/router/classify.js` and `oracle/router/wave.js` landed this
wave, so this ran against the real thing rather than against unit stand-ins. That distinction is the
sub-step: a unit test can prove a loader throws; only the assembled loop proves the throw **reaches
the answer** instead of being caught two frames up and turned into a confident refusal.

| decoy | row | result |
|---|---|---|
| I4a empty `literature/` | INV-6 | ok — the empty-population throw reached the top |
| I4b missing `index.html` | INV-7 | ok — `REFUSE`/`input-missing`, 0 personas |
| I4b `index.html` present and wrong | INV-7 | ok — the `KNOB_DATA` marker check threw; a `test -f` is not a check |
| I4c register that parses to zero rows | INV-8 | ok — startup refusal on declared-versus-parsed size |
| I4d member path that does not resolve | INV-9 / RFX-34 | ok — `REFUSE`/`axis-incomplete`, never a fall-through to search |
| I5 dropped side on a 3-sided axis | RFX-35 / TG-28 | ok — the wave followed `sides.length` down to 2; the count is derived, not a literal |
| I6 value-layer output | ORG-11 / FIX-10 | ok — `FIGURE` across the 45-key namespace |
| I7 vacuous release gate | INV-12 | **RED, and it is a finding** — §6 |

**All eight results above are from the run with the loop loadable.** At hand-off, `I4b-missing` and
`I4b-wrong` still pass (they inject against the app, not the register), `I7` is still red for its own
reason, and the five that need a loaded context report `DECOY DID NOT REACH THE LOOP` — written 8,
applied 5, exit 1. No decoy in that state is scored as a pass.

**The rule is written into the runner and it fired twice on me.** *A decoy that fails to apply is a
failure, not a skip.* Each decoy declares `applied()` against the staged artifact **and `reached()`
against the loaded context**, and the run prints written-versus-applied and exits non-zero when they
differ.

- **First fire.** `loadContext` takes `registerPaths` in W4-2's relayed signature and **ignores it in
  the body** — the two register files are hardcoded relative to `root`. Three decoys passed a staged
  register path, the loader read the real registers, and all three came back **red against a router
  that had never seen the mutation**. Three false reds are the same defect class as a false green:
  a result reported for a control that was not exercised. Fixed in two places — inject through `root`,
  which the loader does honour, and add `reached()` so an injection the loop does not see is reported
  NOT APPLIED rather than allowed to produce any verdict at all.
- **Second fire.** `axis.sides` is a `Map`, and `JSON.stringify` of a `Map` is `{}`, so my first
  `reached()` probe was structurally blind and reported NOT REACHED for a decoy that had in fact
  reached. **The gate correctly refused to score it in either direction.** The probe was wrong and is
  fixed; the gate was right and is unchanged.

Both are in the file's comments rather than quietly repaired, because a badly aimed decoy that a
later reader re-aims at the checker instead is how a real control gets relaxed.

---

## 6. Directed work, and what it measured

### 6.1 `probe_register_encoding.js` — the answer is neither of the two offered

The question was whether the probe **skips** a missing fixture file (a `VACUOUS` row wearing a
passing status) or **throws** (something swallowing it). **It does neither: `cmdResolve` counts the
reference, fails to resolve it, and prints it by axis and leaf.** Non-resolution is the probe's
output, not an error in it, so the row asserts something and asserts it correctly.

`metzger-2021-aqua-factorem-2.md` is also not the only non-resolver: against the landed tree
**7 of 67 do not resolve**, six of them because the merge renamed them. Against the probe's own
default root, `lsei/literature`, **1 of 67** — and that one is the measurement subject of
`Q-LCC-MEMBER-UNRESOLVED = 1`, the governed figure `register_schema.md` §6 cites. **Deleting the name
would take the figure to 0 and silently invalidate a quantity the schema still cites**, which is a
worse defect than a name that resolves nowhere inside a fixture whose job is to count the names that
resolve nowhere.

So the name stays with its basis rewritten — the struck "superseded duplicate" clause is replaced by
a comment saying it resolves nowhere and why that is the point — and **`--selftest` is the
known-answer test, on the `verify_corpus.js` pattern.** It discriminates: delete the entry and it
reports `FAIL REFERENCES 67→66`, `FAIL UNRESOLVED 1→0`, `FAIL UNRESOLVED-NAMES`, exit 1.

### 6.2 The hardlink defect — repaired, with a correction to its reported scope

`Dirent.isFile()` is false for a hardlink on this platform. Repaired at both named sites with
`lstat`, and `walk()` got the same treatment for the mirror case (`isDirectory()` is false for a
hardlinked or junction-mounted directory, which would prune a subtree without a word).

**Correction: `literature/` does not read as empty at these two sites.** `walk()` never calls
`isFile()` — it asks `isDirectory()` and treats everything else as a candidate — so a hardlinked
summary is still collected. What `isFile()` gates is the **root-level `.md` scan**: `CLAUDE.md`,
`COUNTING_RULE.md`, `QUANTITIES.md`, `accumulator.md`, `lunar-oracle-gameplan.md` would silently drop
out of the declared set. Smaller blast radius than reported, still a silent wrong answer, both sites
repaired, both given a test.

**`M16` in `tools/quantities.js` is the known-answer test** and it discriminates: stub the scan to
return nothing and it reports three `FAIL M16` lines, the first of which names all five lost root
documents. Clean today: *5 root documents, 169 under `literature/`, 22 under `tools/`, 540 declared
in total (lstat, not Dirent type bits).*

**A near-miss worth recording.** My first version declared `function m13()`, and `m13` already exists
in that file. Later declaration wins, so **my check was silently disabled while the pre-existing M13
kept running and printing** — a check that cannot fail, added by the seat whose entire brief is
checks that cannot fail. `M13`, `M14` and `M15` were all taken; it is `M16`.

### 6.3 `audit_abstract_overlap.js` — the vacuous pass, now a decoy that stays red

Confirmed: `node tools/audit_abstract_overlap.js literature 10` prints `tested 0 summaries`, then
`AT OR ABOVE 10% VERBATIM: 0`, and **exits 0**. The last line and the exit code — the two things a
gate consumes — are byte-identical to a genuinely clean corpus. The denominator is printed one line
up, which is the tool being honest in prose and silent in its interface, and a gate does not read
prose. This is `VACUOUS IS NOT PASS` sitting inside the release gate.

It is `I7` in the fault-injection pass. **There is no mutation to apply: the repository already ships
the failing state**, which is why it is the best decoy available and why it is left red rather than
repaired. The file is not this seat's. The repair is one line.

### 6.4 Line endings, the sixth instance

`oracle/tests/run_suite.js` was **CRLF in the working tree and LF in the committed blob.** My 241
inserted lines were LF, which made the file mixed — worse than either. Normalized to pure LF (931
lines, 0 CRLF) and re-run identically. Every other file I wrote or touched is LF with zero bare CR
and zero NUL bytes, verified byte-level.

---

## 7. Relays

| To | What |
|---|---|
| **W4-2, the router seat** | (0) **`loadContext` refuses `input-missing` on `oracle/router/thin_threshold.json`, which is not on disk.** 33 `RFX` rows and 4 `INV` rows defer on it, by name, and three fault-injection decoys report NOT REACHED. I did not run `calibrate_thin.js --write`; it is your build step. (1) `loadContext` declares `registerPaths` in the frozen signature and ignores it in the body; three fault-injection decoys had to inject through `root` instead. (2) `RFX-04/07/09/13`: four axes do not fire on their own `probe_pos` at K = 2.431. (3) **`LCC-09` meets contract §5's `misclassified` condition exactly — retrieval returned a member of the axis that did not fire — and no code was emitted.** (4) Confirmed independently: `model()` 26 keys, `valueModel()` **27**, overlap 8, **union 45**; the relay's 29 is wrong and 45 is what I encoded. |
| **The Space Resources Engineer** | `LCC-10` side A CONTRADICTED; `LCC-08` `axis_statement` OVERSTATED; `match_keys` edits owed on `LCC-04`, `-07`, `-09`, `-13` per `register_schema.md` §4.2. Four `RFX` rows close when each axis's own `probe_pos` returns `CONTESTED`. |
| **The Manager (economics prompt)** | `ECR-05` side B and `ECR-07` side D CONTRADICTED; `ECR-01` UNDERSTATED; `ECR-09/12/13/16/17` OVERSTATED. `TG-36`/`TG-37`'s recorded 58/37 are stale — the table now carries 66 references / 42 distinct / 0 unresolved, and the independent raw scan agrees at 42. `TG-41`'s blocker is discharged: the loop does produce answers. **And `TG-10`'s stated reason is not in its own primary** — `kiyota-2005` never mentions a lunar case or a "human absorptive workforce"; the `illustration` class is right and the reason that supports it is §2.2's *"no lunar leader and no shelf of proven lunar industrial process"*. |
| **The Editor, or the author** | `LIM-10` is RED. The one-side disclosure at `register_schema.md` §7 is a request; §9's list of permitted self-statements is closed and has never ratified it. Either it joins that list or `one_sided` ships without it and `LIM-10` is deleted along with the sentence. |
| **Whoever owns the corpus gate** | `tools/audit_abstract_overlap.js` exits 0 over a tested population of zero with a summary line identical to a clean run. |
| **W4-4 (4.2's class specification)** | Written to "every side, never both", which is correct under either resolution of the class-name question and is what `selectWave` already implements. |

---

## 8. Not mine

- The four standing suite failures argued in `af7abec` (`PTH-13`, `MRG-4b`, `MRG-9`, `MRG-10`). Not
  touched, not silenced, still four.
- `oracle/REGISTER.lunar.tsv` and `oracle/REGISTER.econ.tsv`. Ten fixtures fail against them and not
  one row was edited.
- `oracle/answer_contract.md`. The transfer gate reports its own reason-code misfit — §5's
  `not-found` condition does not cover a confirmed-shelf/unmeasured-condition refusal — and carries
  it forward as a field rather than inventing a seventh code.
- `oracle/transfer_gate.md` and `oracle/acceptance/transfer_assertions.md`. Consumed as given.
- `tools/audit_abstract_overlap.js`. Diagnosed, decoyed, not repaired.
- `oracle/router/*`. Four fixture failures and one signature divergence found; nothing edited.
- `QUANTITIES.md` moved from 6 hard failures to 2 during this sitting and **I did not edit it**;
  another seat regenerated the index. Recorded so the improvement is not attributed here.

---

## 9. What a green result here does not mean

`verify_register.js` catches the structural signature of theater, not theater. `isru_three_facts.js`
checks that three facts are **named**, not that they are the right three. `transfer_gate.js` checks
that the gate emitted the verdict the table carries, not that the verdict is correct.
`verify_haiku.js` cannot count a syllable it does not know and says `UNCERTIFIED` rather than
guessing. Every one of those limits is stated inside the file that has it, in its own `LIMIT` block,
because that is the difference between a control and a claim — and 7.4's suite exists precisely to
make the residual a person's read with a stated rate and three stated denominators.

**348 rows still carry no binding at all.** That is down from 361 and it is still the honest state of
the test contract.

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +103/-0
```

**All 103 are TDD deliverables and are not freeze spend**, per the standing block's explicit
exception: 4.1's 35 `RFX` rows, 4.7's 15 `ISR` rows, and 7.4's 53 `SMP` rows. Beyond those the tests
budget spent is **0 of +6**. `M16` in `tools/quantities.js` is a tool check rather than a suite row
and is declared here: it discharges the orchestrator-directed hardlink repair, which the standing
block admits as work that discharges something owed.

**Write-set note.** Four files outside my declared write set were edited on the orchestrator's
explicit direction and nowhere else: `tools/probe_register_encoding.js`, `tools/manifest.js`,
`tools/quantities.js` (the directed repairs), and no others. `lsei/` and `cr-agents/` were read only;
nothing was pushed.
