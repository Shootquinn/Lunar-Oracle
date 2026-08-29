
# The answering-loop test suite

**Written against answer contract version 5.** Levels 1, 2 and the two Step 4 amendments.
**Register fixtures landed at 4.1 (LOOP-7) as section 15, and the three-named-facts assertion landed
at 4.7 (LUNAR-6) as section 16.**

**The version-2 pin was reconciled at sub-step 8.8 and the pin above is the result.** The reconciliation
§9 demands is a read of what each version changed against what this file asserts, not a one-character
edit, so here is the read. **Version 3** (8.4) moved §6, added §6a, §6b and §10 — the deliverable
shape, the haiku form and the evidence pass. **Version 4** (8.7) appended §11. **No row in this file
asserts against any of those sections**: every `§6` below names The Space Resources Engineer's ISRU
specification, not this contract, and nothing here reads §6a, §6b, §10 or §11. **Version 5** (8.8)
added the seventh refusal reason code to §5, and this file does have a row on §5 — REF-1 — which reads
the table at run time rather than carrying a copy of it, and which was red *because* the code had no
row. Re-pinned to 5, with REF-1 green on the contract rather than on the pin.

**91 tests**, of which 35 are generated (RFX 35) and 56 are hand-authored. Counting rule, unchanged
from version 1 except that the id pattern now admits a four-letter prefix: rows in the ten tables
below whose first cell matches `^[A-Z]{2,4}-[0-9]+$`. Per group: VER 3, GRD 8, VRD 2, REF 1, FIL 3,
CLM 6, LOG 11, INV 7, RFX 35, ISR 15. The figures were counted by running the counting rule over this
file, not by adding up a delta.

**THE SUITE WAS 266 ROWS AND 175 OF THEM ASSERTED NOTHING. Triage at Wave 5, sub-step 8.5, on the
author's ruling.** Every row below is now executed by `oracle/tests/run_suite.js`. Sections 2 (ORG),
3 (RG), 4 (RV), 6 (TRC), 7 (LIM) and 14 (FIX) are gone entirely and their numbers are **not reused**.
The record of what went and why is `cr_scratch/step8_w5-4_suite_triage.md`.

**RG and RV said "Generated." and there was no generator.** Forty-nine rows across two sections
declared themselves emitted by `oracle/tests/gen_matrix.js` from the contract's own Rule G and Rule V
tables. **That file has never existed in this repository.** The forty-nine cells were transcribed by
hand out of `oracle/answer_contract.md` §3 and then labelled as machine output — which is the exact
failure RV-37 was written to catch, committed by the section RV-37 lived in. A hand copy of a
contract's table is not a test of anything: the contract already says what it says, and the copy can
only drift from it. Rule V's real enforcement is `oracle/router/classify.js`'s `assertVerdict()`
against a closed `VERDICTS` set, exercised over 124 questions by `oracle/router/acceptance.js`, and
that runs. VRD-1 below now asserts the closed set directly, from the router, in one row.

**RFX stays and is the only generated section left.** It is emitted from the two register files, one
row per axis, and a register edit changes it. That was always true of RFX and was never true of RG
or RV.

**Version 2 reconciliation, landed at the Step 1 close as revision item R-3.** The version field did
what it was built to do: it caught this suite disagreeing with its contract before any code existed,
twice — once when 1.8 amended the contract in the group this suite was written in, and once when the
contract landed at version 2 while this file still pinned 1. Both are fixed here in one pass. What
moved: the RV matrix's shape and three cells; the `CONTESTED` persona arity; `one_sided`; the
`misclassified` condition; `excluded`'s precedence; the app-ref clause and the run log's ninth field;
two fixtures that were carried green and were failing their own stated invariants; and every close
condition in the file, re-aimed at an observation.

**The lesson the deleted FIX section paid for, kept because the section is gone.** FIX-9 and FIX-10
were carried `green` against a prototype that failed them; when they were finally run at the Wave 2
gate both came back wrong — one `CONTRADICTED` on its source, one `VERIFIED` and worse than its
author wrote it. **Status is an assertion, not a hope**, and a status assigned before the run is the
same defect as a check that cannot fail. Section 14 held nineteen such fixtures and none of them was
ever run by anything; the whole section is the FIX-9 defect at scale, which is why it went rather
than being re-statused. The questions themselves survive as executable work in
`oracle/router/acceptance.js`, which puts 124 questions through the loop and returns one verdict each
from the closed six.

## 0. How to read this suite

**It tests the loop, not the answer.** The answer text is nondeterministic. The classification, the
resolved address, the recomputed scalar, the retrieved file set, the outcome, and the origin and
grade of every trace are deterministic functions of the question and the corpus. Every test asserts
one of the second set. **No test asserts wording**, except two fixed texts the contract states
verbatim — the LIM group's two limit lines and the GRD group's six blacklisted words — and both are
compared byte-for-byte against text **read out of `oracle/answer_contract.md` at test time**, never
against a copy held in this file.

**Decoys are mutations of real produced output.** Where a test carries a decoy, the decoy is built by
changing bytes in an answer the loop actually produced and wrote to disk, never by constructing a
counterexample string. A decoy that fails to apply is a failure, not a skip (INV-11).

**Status column.** `green` = expected to pass once the mechanism exists. `RED` = expected to fail
today, for a named reason, with a named owner and a named close condition. A RED test is a defect
report with a close condition; it is never quietly relaxed. `H` = a human gate, not a script; it is
listed here because it is part of the contract, and it is marked so that nobody counts it as
mechanized.

## 1. VER — the contract version

Three tests, one per consumer named in contract §9. If any consumer is dropped, its test is deleted
and the field is deleted with it.

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| VER-1 | The contract states a version and it is a bare monotone integer | `oracle/answer_contract.md` §9 yields a string matching `^[0-9]+$`. `1.0`, `v1`, `1.2.3` fail. Semantic versioning implies compatibility semantics nobody will maintain. | green |
| VER-2 | The suite's pinned version equals the contract's | This file declares `CONTRACT_VERSION_UNDER_TEST = 2` and it equals VER-1's value. It read 1 against a contract reading 2 for the whole of Wave 2, which is the field working rather than the field failing — the red was the report | green |
| VER-3 | DECOY: the version tripwire fires | Increment the integer in the contract without touching this file; VER-2 must go red. A green VER-2 after the mutation means the field is decoration and VER-1..3 are deleted along with it | green |

## 5. GRD — trace grades

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| GRD-3 | `verified` as a grade fails | Blacklist, read from contract §2 at test time | green |
| GRD-4 | `confirmed` as a grade fails | as above | green |
| GRD-5 | `validated` as a grade fails | as above | green |
| GRD-6 | `proven` as a grade fails | as above | green |
| GRD-7 | `established` as a grade fails | as above | green |
| GRD-8 | `supported` as a grade fails | as above | green |
| GRD-9 | Arity: exactly one grade | Two grade tokens in one trace line fails, even if both are legal | green |
| GRD-10 | **False-positive gate** | `recompute-verified` contains `verified` as a substring and must not trip GRD-3. Word-boundary matching on the grade slot only, never a substring scan of the line. A blacklist that trips on its own legal token is switched off within a week, and a check that gets switched off is worse than no check because the plan still lists it | green |

## 8. VRD — verdicts and the wave selector

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| VRD-1 | The verdict set is exactly six | A seventh value fails. Closed set, not a default | green |
| VRD-11 | `APP_UNBUILDABLE` is not a verdict | The verdict enum has no such member. The condition produces `REFUSE` with reason `unbuildable`. Nothing selects a different wave or a different deliverable form on it, which is why it was cut at 1.3 | green |

## 9. REF — refusals

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| REF-1 | The reason-code set is exactly six | A seventh value fails | green |

## 10. FIL — the deliverable is a file

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| FIL-10 | The haiku carries no claim | No numeral, no unit token, no coefficient name, no named source. Consumes `claim_bearing.js`; see CLM | green |
| FIL-11 | The haiku is 5-7-5 and holds zero newline characters | Both, on the same bytes | green |
| FIL-12 | An unknown word is a refusal to certify | English syllable counting is not decidable by algorithm. Feed a nonce word; assert no certification is issued. A missing input is a refusal, not a fallback, and that rule binds the checker as much as it binds the router | green |

## 11. CLM — claim-bearing, and the `verify_report.js` replacement post-condition

The author's ruling drops `verify_report.js`. Contract §7 states the definition in the contract's own
words, so these fourteen tests are the post-condition the replacement is built against. **They are
written before the replacement exists.**

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| CLM-3 | A coefficient name makes a unit claim-bearing | A unit naming a coefficient from the app's coefficient list is selected | green |
| CLM-4 | A named source makes a unit claim-bearing | A unit naming a source from the app's reference list is selected | green |
| CLM-5 | The three lists are read out of the app, not typed into the checker | DECOY: add a coefficient to the app; the checker's list grows with no edit to the checker. A typed list is a copy, and a copy drifts | green |
| CLM-7 | The backward half: every claim-bearing unit carries ≥1 trace | DECOY: delete one trace line from a real answer; CLM-7 red | green |
| CLM-9 | The all-exempt failure case | A deliverable in which every unit is exempted **fails**, rather than passing with nothing checked. This is the test that catches a control disabled by its own escape hatch | green |
| CLM-14 | `verify_report.js` is absent from the tree | Nothing imports, requires, extracts or reads it. DECOY: add a `require`; CLM-14 red. The author's ruling, given a test — a ruling with no test is a preference | green |

## 12. LOG — the run log

Two columns carry outcome, and neither is written by the other's author.

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| LOG-1 | `outcome` enum is exactly five | `ERROR`, `MISCLASSIFIED`, `REGISTER_FAIL`, `REFUSED`, `ANSWERED` | green |
| LOG-2 | `review` enum is exactly three | `unreviewed`, `confirmed`, `FILLED` | green |
| LOG-3 | `outcome` is single-valued | A row carrying two outcome values fails | green |
| LOG-7 | Precedence: `REFUSED` over `ANSWERED` | as above | green |
| LOG-9 | `FILLED` never appears in the `outcome` column | Over the whole log. DECOY: write `FILLED` into `outcome`; LOG-9 red | green |
| LOG-11 | `FILLED` is not machine-assignable | Static: the log-writer module contains no code path emitting the literal. A column no machine writes to makes structural what the prototype declared in a comment | green |
| LOG-12 | The row schema is closed | **AMENDED at version 2.** Exactly the **nine** named fields. A tenth fails. Extending is a version bump, and this field is the extension that made version 2 carry a bump it would have carried anyway | green |
| LOG-18 | Field: reason code present **iff** verdict is `REFUSE` | Present on a non-refusal fails; absent on a refusal fails | green |
| LOG-19 | Field: `deliverable_path` present | A path string; resolution is LOG-21 | green |
| LOG-22 | The three sampling denominators are computable from these two columns alone | `FILLED` count, reviewed count, run count. Each a division over the log with no external input. "Three FILLED" is theater; "three FILLED out of forty sampled, of two hundred ten run" is a measurement | green |
| LOG-23 | An unrecognized outcome string is a finding, not a silent skip | Inherited from `verify_answers.js` and correct | green |

## 13. INV — Level 2 invariants

Properties the loop holds on every run. No golden answer needed. Register invariants (I5) are absent
and attach at 4.1.

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| INV-6 | **I4a.** Empty literature directory | The empty-population throw, never a confident `REFUSE` | green |
| INV-7 | **I4b.** Missing `lsei/index.html`, **or present and wrong** | **STRENGTHENED under the marker rule.** A refusal naming the missing clone, never a literature-only answer to a question that needed the app. An `index.html` that parses as HTML and holds no model satisfies a `test -f`, so fault injection runs both cases and the marker asserted inside the file is `KNOB_DATA`, per bootstrap assertion BC-14 | green |
| INV-8 | **I4c.** A register file that does not parse | Startup refusal, not a run with the invariant silently disabled. **This is the one people forget and it matters most:** a register that silently parses to zero rows disables the entire contested-claims invariant while every other test in the suite still passes green. The file-does-not-parse half is testable now against an empty schema-conformant file; the content half is **[4.1]** | green |
| INV-9 | **I4d.** A register axis whose member path does not exist | Refusal for that axis, never a fall-through to search **[4.1]** | green |
| INV-11 | **Meta: every decoy applies** | For each decoy in this suite, assert the mutation actually changed the bytes it claims to change before asserting the test went red. **A decoy that fails to apply is a failure, not a skip.** This is the lesson `verify_figure.js` paid for: a `--prove` run against a hand-built stand-in returns a false green, and only a mutation of the real artifact discriminates | green |
| INV-12 | **Meta: no test passes on an empty population** | Every test declares its population; a population of zero is reported as empty, never as a pass | green |
| INV-13 | The corpus's machine-readable inputs survive a fresh clone | `git check-ignore` reports *not ignored* for `literature/FIELDS.tsv`, `literature/INDEX.tsv`, `oracle/REGISTER.lunar.tsv` and `oracle/REGISTER.econ.tsv` against the committed `.gitignore`. `literature/` is deny-by-default and re-admits by extension, which excludes every machine-readable file the corpus needs unless each is named. Container-versus-content again | green |

## 15. RFX — register fixtures. **One per axis, generated from the register.**

**Sub-step 4.1 (LOOP-7). This section is the amendment that took the suite through A.10 step 5's
revision gate, and the gate is the most important thing in it.**

**These rows are generated, not transcribed.** The axis id, class, side letters, member leaves and
question text of every row below were read out of `oracle/REGISTER.lunar.tsv` and
`oracle/REGISTER.econ.tsv` by a generator; the expected verdict is derived from the class by the
rule in `oracle/register_schema.md` §7. A hand-typed fixture set beside a register is a second
authority and a second authority drifts — the defect this project has already found four times.
The question text is each axis's own `probe_pos` field, which is what that field exists for
(`register_schema.md` §4.2: "`probe_pos` and `probe_neg` are the test that replaces the checker").

**No fixture asserts a number.** Section 14's rule carries over unchanged: literature fixtures
assert *retrieval, verdict and grade*, never values. What is asserted per row is the verdict, the
persona arity, the trace-per-side requirement, and the retrieved member set.

### 15.0 What these rows assert after sub-step 8.1, and the one thing they no longer can

**The verdict named in every `Expected` cell below is DECLINED as an assertion.** `classifyQuestion()`
is retired: the router returns an evidence report and a composing session under
`oracle/answer_contract.md` rules the verdict. Nothing in this suite may pick one and then check it,
because a fixture that chooses the answer it checks is measuring the fixture. The `Expected` cells are
left standing as the record of what the register implies, and the binding asserts the rest of them.

**Each row now asserts three facts about one axis, and each is a lookup or a set membership rather
than a score.** They are read out of `oracle/REGISTER.*.tsv` and `literature/INDEX.tsv` at run time.

1. **Shape.** The class's own side arity — `one_sided` exactly one, per contract §1 rule L5;
   `two_sided` and `false_pair` at least two — and every member the register declares resolving to a
   path in `literature/INDEX.tsv`. `resolveSides()` is a lookup and survived 8.1 unchanged.
2. **Reachability.** The axis appears in the register channel's findings for its own `probe_pos`:
   at least one declared `match_key` survives tokenization of the question the axis's own author
   wrote to trigger it. **Nothing about mass, margin or rank is asserted**; the mass is printed as
   context. This is the closest honest successor to the retired verdict assertion, and it is weaker
   in the way the architecture is now weaker on purpose. It catches the defect worth one row per
   axis: a key that can never match, leaving the register row inert while every test stays green.
3. **Arity, as a conditional.** `selectWave()` takes the verdict as an argument since 8.1, so the row
   states what the register can still carry: *if* a session rules `CONTESTED` on this axis, the wave
   spends one persona per declared side, never the literal two — and on a `one_sided` axis that call
   must **throw**, because contract §1 makes `CONTESTED` unsatisfiable there and `wave.assertDerived()`
   is where that is now enforced. That throw is what survives of "never `CONTESTED`". **Naming
   `CONTESTED` is the antecedent of an implication; the suite rules nothing.**

**Not asserted, and not newly missing:** the `axis_statement` shipped verbatim, the §3.2 banned-word
list on `false_pair` rows, and the retrieved member count. No binding ever asserted those; they are
`Expected`-cell prose and they stay prose.

### 15.1 The A.10 step 2 source-verification gate, and what it found

A.10 step 5 requires that any new test citing a source document pass step 2's gate before the
revised suite replaces the old contract. Every row below cites one or more member summaries. **All
121 member rows of the 33 axes were read against their summaries in full** — 83 distinct files,
1.81 MB — and each side claim was checked element by element against the file it names.

| Result | Count | What it means |
|---|---|---|
| `SUPPORTED` | 105 | every element of the side claim traceable to text in the named file |
| `PARTIAL` | 13 | the core claim is in the file; one element (usually a cross-file editorial note) is not |
| `CONTRADICTED` | **3** | the named file says otherwise |
| `NOT-FOUND` | 0 | — |
| `## Contested` block present and correctly keyed | 121 of 121 | — |

**Three side claims are CONTRADICTED and seven `axis_statement`s are OVERSTATED or UNDERSTATED. The
ten fixtures that depend on them are RED, and that is the gate working rather than the gate
failing.** The `axis_statement` matters as much as the side claim because `register_schema.md` §7
ships it **verbatim** into a `CONTESTED` answer: an overstated statement is not a review note, it is
a sentence the Oracle will say. Every RED row below names the defect, the owner, and a close
condition that is an observation rather than a date. **Four more went RED when the fixtures were first RUN, and they are a different defect from the ten.** The ten above failed the SOURCE gate: a side claim or an axis statement that the summary does not support. RFX-04, RFX-07, RFX-09 and RFX-13 pass the source gate and fail the MECHANISM: the axis does not fire on its own `probe_pos` at K = 2.431, so a question written by the axis's own author to trigger it returns `LITERATURE` instead. Fourteen RED, twenty-one green. **The four MECHANISM reds closed at sub-step 8.1 and the ten SOURCE reds did not: ten RED, twenty-five green.** K filters nothing since 8.1, so all four axes are reported with their masses and their signed margins and the reading session weighs them; each row records its own measured mass. The `match_keys` observation stands and the register is unedited, which is why this is a closure of the red and not a repair of the axis. **None of the fourteen is repaired here.** The
registers are not this seat's to edit, and a suite author who repairs the artifact his own tests
just failed has destroyed the only evidence that the test worked.

### 15.1a Every side, never both — and the measurement that forces it

**The expected verdict in every row below names the axis's own side count, read out of the register,
never the literal two.** That is not a stylistic choice. Counting distinct `M.side` values per axis
across both register files:

| class | axes | sides |
|---|---|---|
| `two_sided` | 18 | 11 axes at 2 sides; **7 axes at 3 or 4** — `LCC-01` 3, `LCC-03` 3, `LCC-04` 3, `LCC-07` **4**, `LCC-09` 3, `LCC-12` 3, `ECR-13` 3 |
| `false_pair` | 8 | 2 to 4, correct by definition: the class returns all members |
| `one_sided` | 7 | exactly 1, in all seven cases — **exactly one, not at least one** |

Command: `awk -F'	' '$1=="A"{cls[$2]=$3} $1=="M"{k=$2"|"$3; if(!(k in seen)){seen[k]=1; n[$2]++}} END{...}'`
over `oracle/REGISTER.lunar.tsv` and `oracle/REGISTER.econ.tsv` at `HEAD = 99d3601`.

**The class name `two_sided` is historical and the invariant is not.** A test written to the plan's
own wording — *"`two_sided` returns both sides or refuses"* — **passes while an answer about Cabeus
water ice drops one of three measurement methods**, and the router has then chosen which measurement
the reader hears, which is precisely the one-sidedness the register exists to prevent. Contract §3
already states the correct rule (*"one `literature` trace per side, not two traces"*) and W4-2's
`selectWave` already implements it (`sides.length`, minimum 2, no cap). The rows below are written to
that reading, which is correct under either resolution of the class-name question, and **RFX-35 is
the decoy that makes the difference between the two readings observable rather than argued.**

### 15.2 The fixtures

| ID | Axis | Question (the axis's own `probe_pos`) | Expected | Primary source | Status |
|---|---|---|---|---|---|
| RFX-01 | `LCC-01` two_sided | "What is the water ice concentration in the regolith at Cabeus crater?" | `CONTESTED`, 3 personas (A/B/C), one `literature` trace per side over 3 sides, the `axis_statement` verbatim, no adjudication. 3 member file(s) retrieved. | `colaprete-2010-lcross-ejecta-water-detection`, `litvak-2024-lend-cabeus-water-ice`, `luchsinger-2021-lcross-water-modeling` | green |
| RFX-02 | `LCC-02` two_sided | "Is water ice exposed at the surface inside the lunar permanently shadowed regions?" | `CONTESTED`, 2 personas (A/B), one `literature` trace per side over 2 sides, the `axis_statement` verbatim, no adjudication. 2 member file(s) retrieved. | `li-2018-surface-exposed-water-ice`, `li-2026-shadowcam-psr-water-ice` | green |
| RFX-03 | `LCC-03` two_sided | "Is polar water ice widespread and shallow, or buried in patches at mining scale?" | `CONTESTED`, 3 personas (A/B/C), one `literature` trace per side over 3 sides, the `axis_statement` verbatim, no adjudication. 3 member file(s) retrieved. | `hayne-2020-micro-cold-traps`, `cannon-2020-lunar-ice-geologic-model`, `schorghofer-2026-current-theories-lunar-ice` | green |
| RFX-04 | `LCC-04` two_sided | "How much energy does it take to extract a kilogram of water from lunar regolith?" | `CONTESTED`, 3 personas (A/B/C), one `literature` trace per side over 3 sides, the `axis_statement` verbatim, no adjudication. 4 member file(s) retrieved. **RED, and it is the fixture doing its job.** Measured at `HEAD = 99d3601`, K = 2.431 (`PROVISIONAL`, plateau midpoint): `classifyQuestion` returns `LITERATURE` on this axis's OWN `probe_pos`, `axes_fired: []`. keys `extraction,energy,kwh,specific,sublimation,thermal,mining,microwave,luwex,water`; the probe carries `energy` and `water`, both corpus-ubiquitous, so the IDF-weighted mass is 0.0000 against K = 2.431. **`register_schema.md` §4.2 already rules where the fix goes: "the fix is an edit to `match_keys`, not an edit to the router."** §4.2 also names this exact failure -- "a key can tokenize cleanly, occur in the corpus, and still never appear in a question anybody asks... `probe_pos` and `probe_neg` are the test that replaces the checker" -- so this row is that test, firing as designed the first time it was run. LCC-09 is the sharpest of the four: the axis did not fire and retrieval then returned a member OF THAT AXIS as a one-sided `LITERATURE` answer, which is `misclassified`'s condition met and the code not emitted. Owner: The Space Resources Engineer for `match_keys`, the router seat for K at 3.6. Close, and it is an observation not a date: `classifyQuestion` on this axis's own `probe_pos` returns `CONTESTED` with a persona count equal to the axis's side count. **THE MECHANISM RED CLOSED AT SUB-STEP 8.1, AND THE CLOSURE IS THE ARCHITECTURE RATHER THAN A REPAIR TO THIS AXIS.** The red above is one of the four that went RED when the fixtures were first RUN: the axis did not reach K = 2.431 on its own `probe_pos`, so `classifyQuestion` returned `LITERATURE`. `classifyQuestion` is RETIRED and K filters nothing, so LCC-04 is now REPORTED with its mass and its signed margin and the reading session weighs it. Measured at read-digest `2e521de8d6df9626`: mass **1.174** on `energy` + `water`, margin **-1.257** against the retired mark 2.431, present in the register findings for its own `probe_pos`. **The old close condition is superseded and cannot be met**, because no tool returns `CONTESTED` any more; the row now asserts the three things §15.0 names. **The `match_keys` observation stands and is NOT repaired here** — `register_schema.md` §4.2 still puts the fix in `match_keys` and the register is not this seat's file — but it is no longer a red, because nothing is filtered by the number. Owner of the `match_keys` edit: The Space Resources Engineer. Close, an observation not a date: the axis reaches the top of its own `probe_pos` findings rather than sitting below a mark that no longer gates. | `sowers-2019-psr-ice-mining`, `sowers-2019-thermal-mining-niac-report`, `kiewiet-2026-luwex-water-extraction`, `wang-2025-microwave-water-production` | green |
| RFX-05 | `LCC-05` one_sided | "What water capture efficiency has actually been demonstrated in a test?" | `LITERATURE` or `BOTH`, **never `CONTESTED`** (contract §1). The documented side A, plus the one-side disclosure of `register_schema.md` §7 read from that file at test time. 3 member file(s) retrieved. | `kiewiet-2026-luwex-water-extraction`, `sanders-2025-nasa-isru-progress-review`, `linne-2020-lunar-water-pilot-plant` | green |
| RFX-06 | `LCC-06` two_sided | "Does mechanical beneficiation of lunar ice grains need less surface power than thermal sublimation?" | `CONTESTED`, 2 personas (A/B), one `literature` trace per side over 2 sides, the `axis_statement` verbatim, no adjudication. 4 member file(s) retrieved. | `sowers-2019-psr-ice-mining`, `sowers-2019-thermal-mining-niac-report`, `metzger-2020-aqua-factorem`, `metzger-2021-aqua-factorem` | green |
| RFX-07 | `LCC-07` two_sided | "How many kilowatt hours does it take to produce a kilogram of oxygen from lunar regolith?" | `CONTESTED`, 4 personas (A/B/C/D), one `literature` trace per side over 4 sides, the `axis_statement` verbatim, no adjudication. 5 member file(s) retrieved. **RED, and it is the fixture doing its job.** Measured at `HEAD = 99d3601`, K = 2.431 (`PROVISIONAL`, plateau midpoint): `classifyQuestion` returns `LITERATURE` on this axis's OWN `probe_pos`, `axes_fired: []`. keys `oxygen,o2,lox,carbothermal,ilmenite,reduction,kwh,energy,yield,electrolysis`; the probe carries `oxygen`, `kilowatt` and `energy`, and mass is 0.0000 against K = 2.431. **`register_schema.md` §4.2 already rules where the fix goes: "the fix is an edit to `match_keys`, not an edit to the router."** §4.2 also names this exact failure -- "a key can tokenize cleanly, occur in the corpus, and still never appear in a question anybody asks... `probe_pos` and `probe_neg` are the test that replaces the checker" -- so this row is that test, firing as designed the first time it was run. LCC-09 is the sharpest of the four: the axis did not fire and retrieval then returned a member OF THAT AXIS as a one-sided `LITERATURE` answer, which is `misclassified`'s condition met and the code not emitted. Owner: The Space Resources Engineer for `match_keys`, the router seat for K at 3.6. Close, and it is an observation not a date: `classifyQuestion` on this axis's own `probe_pos` returns `CONTESTED` with a persona count equal to the axis's side count. **THE MECHANISM RED CLOSED AT SUB-STEP 8.1, AND THE CLOSURE IS THE ARCHITECTURE RATHER THAN A REPAIR TO THIS AXIS.** The red above is one of the four that went RED when the fixtures were first RUN: the axis did not reach K = 2.431 on its own `probe_pos`, so `classifyQuestion` returned `LITERATURE`. `classifyQuestion` is RETIRED and K filters nothing, so LCC-07 is now REPORTED with its mass and its signed margin and the reading session weighs it. Measured at read-digest `2e521de8d6df9626`: mass **0.968** on `oxygen`, margin **-1.463** against the retired mark 2.431, present in the register findings for its own `probe_pos`. **The old close condition is superseded and cannot be met**, because no tool returns `CONTESTED` any more; the row now asserts the three things §15.0 names. **The `match_keys` observation stands and is NOT repaired here** — `register_schema.md` §4.2 still puts the fix in `match_keys` and the register is not this seat's file — but it is no longer a red, because nothing is filtered by the number. Owner of the `match_keys` edit: The Space Resources Engineer. Close, an observation not a date: the axis reaches the top of its own `probe_pos` findings rather than sitting below a mark that no longer gates. | `leger-2025-energy-oxygen-moon`, `colozza-2010-solar-lunar-oxygen`, `nasa-2023-card-carbothermal-reduction`, `azami-2024-lunar-manufacturing-review`, `sanders-2025-nasa-isru-progress-review` | green |
| RFX-08 | `LCC-08` false_pair | "Does the ilmenite reduction energy figure apply at a south polar landing site?" | `CONTESTED`, 4 personas (A/B/C/D), one `literature` trace per side over 4 sides, the `axis_statement` verbatim, no adjudication — **and the §3.2 banned-word list applies to the whole answer**, because the members are not in dispute. 7 member file(s) retrieved. **A.10 step 2 GATE FAILURE on the `axis_statement`, which §7 ships VERBATIM into the answer:** OVERSTATED — the statement says every landing site in the corpus's architecture studies is polar highland; `leger-2025` favours High-Ti mare and `sanders-2025` classes mare hydrogen/CO reduction at TRL 5. Owner: The Space Resources Engineer. Close, and it is an observation not a date: the statement is narrowed to what the members support, and this fixture re-runs green. | `sargeant-2020-hydrogen-reduction-ilmenite-static`, `leger-2025-energy-oxygen-moon`, `schreiner-2016-mre-sizing-model`, `sibille-2012-joule-heated-mre`, `nasa-2023-card-carbothermal-reduction`, `colozza-2010-solar-lunar-oxygen`, `sanders-2025-nasa-isru-progress-review` | RED |
| RFX-09 | `LCC-09` two_sided | "How much solar power is available at the lunar south pole?" | `CONTESTED`, 3 personas (A/B/C), one `literature` trace per side over 3 sides, the `axis_statement` verbatim, no adjudication. 4 member file(s) retrieved. **RED, and it is the fixture doing its job.** Measured at `HEAD = 99d3601`, K = 2.431 (`PROVISIONAL`, plateau midpoint): `classifyQuestion` returns `LITERATURE` on this axis's OWN `probe_pos`, `axes_fired: []`. keys `illumination,illuminated,sunlight,shackleton,solar,power,shadow,polar`; the probe carries `solar`, `power` and `polar` and still masses 0.0000 -- retrieval then answered `LITERATURE` off `ross-2023-lunar-south-pole-solar-power.md`, which is a member of this very axis. **`register_schema.md` §4.2 already rules where the fix goes: "the fix is an edit to `match_keys`, not an edit to the router."** §4.2 also names this exact failure -- "a key can tokenize cleanly, occur in the corpus, and still never appear in a question anybody asks... `probe_pos` and `probe_neg` are the test that replaces the checker" -- so this row is that test, firing as designed the first time it was run. LCC-09 is the sharpest of the four: the axis did not fire and retrieval then returned a member OF THAT AXIS as a one-sided `LITERATURE` answer, which is `misclassified`'s condition met and the code not emitted. Owner: The Space Resources Engineer for `match_keys`, the router seat for K at 3.6. Close, and it is an observation not a date: `classifyQuestion` on this axis's own `probe_pos` returns `CONTESTED` with a persona count equal to the axis's side count. **THE MECHANISM RED CLOSED AT SUB-STEP 8.1, AND THE CLOSURE IS THE ARCHITECTURE RATHER THAN A REPAIR TO THIS AXIS.** The red above is one of the four that went RED when the fixtures were first RUN: the axis did not reach K = 2.431 on its own `probe_pos`, so `classifyQuestion` returned `LITERATURE`. `classifyQuestion` is RETIRED and K filters nothing, so LCC-09 is now REPORTED with its mass and its signed margin and the reading session weighs it. Measured at read-digest `2e521de8d6df9626`: mass **0.919** on `solar` + `power`, margin **-1.512** against the retired mark 2.431, present in the register findings for its own `probe_pos`. **The old close condition is superseded and cannot be met**, because no tool returns `CONTESTED` any more; the row now asserts the three things §15.0 names. **The `match_keys` observation stands and is NOT repaired here** — `register_schema.md` §4.2 still puts the fix in `match_keys` and the register is not this seat's file — but it is no longer a red, because nothing is filtered by the number. Owner of the `match_keys` edit: The Space Resources Engineer. Close, an observation not a date: the axis reaches the top of its own `probe_pos` findings rather than sitting below a mark that no longer gates. | `speyerer-2013-persistently-illuminated-regions`, `speyerer-2012-in-search-of-shade`, `glaser-2014-south-pole-illumination`, `ross-2023-lunar-south-pole-solar-power` | green |
| RFX-10 | `LCC-10` two_sided | "Is fission or solar with storage lighter per kilowatt at the lunar south pole?" | `CONTESTED`, 2 personas (A/B), one `literature` trace per side over 2 sides, the `axis_statement` verbatim, no adjudication. 9 member file(s) retrieved. **A.10 step 2 GATE FAILURE:** side A `nasa-moon-to-mars-doc.md` — the kWe target and the KRUSTY citation sit in Appendix D's technology-gap catalog, not the data-gaps catalog the side claim names. Owner: The Space Resources Engineer. Close, and it is an observation not a date: the side claim is repaired against the summary, or the member is moved to the file that carries the figure, and this fixture re-runs green. | `poston-2020-krusty-reactor-design`, `oleson-2022-deployable-fsp`, `nasa-2025-fission-surface-power-directive`, `nasa-moon-to-mars-doc`, `ross-2023-lunar-south-pole-solar-power`, `csank-2022-powering-the-moon`, `colozza-2020-lunar-base-power-comparison`, `pappa-2021-relocatable-solar-array`, `belbin-2024-vsat-grd-demonstrator` | RED |
| RFX-11 | `LCC-11` false_pair | "What does it cost to land a kilogram on the lunar surface?" | `CONTESTED`, 2 personas (A/B), one `literature` trace per side over 2 sides, the `axis_statement` verbatim, no adjudication — **and the §3.2 banned-word list applies to the whole answer**, because the members are not in dispute. 7 member file(s) retrieved. | `payload-research-starship-cost`, `jones-superheavylift-final20260614`, `adilov-2022-launch-cost-reductions`, `nasa-2023-card-carbothermal-reduction`, `metzger-autry-2023-lunar-landing-pads`, `nasa-clps-delivery-timeline`, `nasa-clps-procurement-vignette` | green |
| RFX-12 | `LCC-12` two_sided | "Does the lunar propellant business case close?" | `CONTESTED`, 3 personas (A/B/C), one `literature` trace per side over 3 sides, the `axis_statement` verbatim, no adjudication. 7 member file(s) retrieved. | `kornuta-2019-commercial-lunar-propellant-architecture`, `sowers-2019-psr-ice-mining`, `sowers-2019-thermal-mining-niac-report`, `jones-2019-cislunar-isru-breakeven`, `jones-2020-lunar-propellant-breakeven`, `shishko-2019-lunar-thermal-mining-business-case`, `mckeown-2024-space-resource-hurdle-rate` | green |
| RFX-13 | `LCC-13` two_sided | "Who would buy lunar helium-3?" | `CONTESTED`, 2 personas (A/B), one `literature` trace per side over 2 sides, the `axis_statement` verbatim, no adjudication. 3 member file(s) retrieved. **RED, and it is the fixture doing its job.** Measured at `HEAD = 99d3601`, K = 2.431 (`PROVISIONAL`, plateau midpoint): `classifyQuestion` returns `LITERATURE` on this axis's OWN `probe_pos`, `axes_fired: []`. keys `helium,fusion,deuterium,tritium,detectors,implanted,regolith`; the probe is "Who would buy lunar helium-3?" and `helium-3` does not tokenize to `helium`, so no key is present at all. **`register_schema.md` §4.2 already rules where the fix goes: "the fix is an edit to `match_keys`, not an edit to the router."** §4.2 also names this exact failure -- "a key can tokenize cleanly, occur in the corpus, and still never appear in a question anybody asks... `probe_pos` and `probe_neg` are the test that replaces the checker" -- so this row is that test, firing as designed the first time it was run. LCC-09 is the sharpest of the four: the axis did not fire and retrieval then returned a member OF THAT AXIS as a one-sided `LITERATURE` answer, which is `misclassified`'s condition met and the code not emitted. Owner: The Space Resources Engineer for `match_keys`, the router seat for K at 3.6. Close, and it is an observation not a date: `classifyQuestion` on this axis's own `probe_pos` returns `CONTESTED` with a persona count equal to the axis's side count. **THE MECHANISM RED CLOSED AT SUB-STEP 8.1, AND THE CLOSURE IS THE ARCHITECTURE RATHER THAN A REPAIR TO THIS AXIS.** The red above is one of the four that went RED when the fixtures were first RUN: the axis did not reach K = 2.431 on its own `probe_pos`, so `classifyQuestion` returned `LITERATURE`. `classifyQuestion` is RETIRED and K filters nothing, so LCC-13 is now REPORTED with its mass and its signed margin and the reading session weighs it. Measured at read-digest `2e521de8d6df9626`: mass **2.087** on `helium`, margin **-0.344** against the retired mark 2.431, present in the register findings for its own `probe_pos`. **The old close condition is superseded and cannot be met**, because no tool returns `CONTESTED` any more; the row now asserts the three things §15.0 names. **The `match_keys` observation stands and is NOT repaired here** — `register_schema.md` §4.2 still puts the fix in `match_keys` and the register is not this seat's file — but it is no longer a red, because nothing is filtered by the number. Owner of the `match_keys` edit: The Space Resources Engineer. Close, an observation not a date: the axis reaches the top of its own `probe_pos` findings rather than sitting below a mark that no longer gates. | `olson-2021-lunar-helium3-mining`, `wittenberg-1992-he3-resources-review`, `gao-2011-neutron-detectors-helium3` | green |
| RFX-14 | `LCC-14` one_sided | "How much energy does it take to sinter a kilogram of lunar regolith?" | `LITERATURE` or `BOTH`, **never `CONTESTED`** (contract §1). The documented side A, plus the one-side disclosure of `register_schema.md` §7 read from that file at test time. 3 member file(s) retrieved. | `liu-2025-microwave-sintering-lunar-regolith-simulants`, `azami-2024-lunar-manufacturing-review`, `metzger-autry-2023-lunar-landing-pads` | green |
| RFX-15 | `LCC-15` two_sided | "How much regolith can a lunar excavator move in a year?" | `CONTESTED`, 2 personas (A/B), one `literature` trace per side over 2 sides, the `axis_statement` verbatim, no adjudication. 4 member file(s) retrieved. | `sanders-2025-nasa-isru-progress-review`, `just-2020-regolith-excavation-review`, `rostami2018`, `kokkinis-2024-automated-drilling-mining-review` | green |
| RFX-16 | `ECR-01` false_pair | "Did MITI's industrial targeting raise productivity in Japan?" | `CONTESTED`, 3 personas (A/B/C), one `literature` trace per side over 3 sides, the `axis_statement` verbatim, no adjudication — **and the §3.2 banned-word list applies to the whole answer**, because the members are not in dispute. 6 member file(s) retrieved. **A.10 step 2 GATE FAILURE on the `axis_statement`, which §7 ships VERBATIM into the answer:** UNDERSTATED — the three-bucket trichotomy accounts for 4 of the axis's 6 member claims; `beason-1996` and `esteban-pretel-2009` fit none of the three. Owner: The Manager (economics prompt). Close, and it is an observation not a date: the statement is narrowed to what the members support, and this fixture re-runs green. | `beason-1996-targeting-japan`, `esteban-pretel-2009-postwar-japan-policy`, `kiyota-2005-foreign-technology-acquisition`, `kiyota-2013-import-quota-removal`, `henderson-2008-myth-of-miti`, `aoki-2009-government-tfp-growth` | RED |
| RFX-17 | `ECR-02` two_sided | "Do keiretsu bank affiliation and liquidity explain Japanese firms' investment?" | `CONTESTED`, 2 personas (A/B), one `literature` trace per side over 2 sides, the `axis_statement` verbatim, no adjudication. 2 member file(s) retrieved. | `hoshi-1991-corporate-structure-liquidity-investment`, `miwa-2002-fable-of-the-keiretsu` | green |
| RFX-18 | `ECR-03` two_sided | "Was Japan's postwar savings rate driven by reconstruction of destroyed capital or by subsistence consumption?" | `CONTESTED`, 2 personas (A/B), one `literature` trace per side over 2 sides, the `axis_statement` verbatim, no adjudication. 2 member file(s) retrieved. | `christiano-1989-japan-saving-rate`, `otsu-2007-neoclassical-postwar-japan` | green |
| RFX-19 | `ECR-04` one_sided | "Did the Korean War procurement boom start the Japanese miracle?" | `LITERATURE` or `BOTH`, **never `CONTESTED`** (contract §1). The documented side A, plus the one-side disclosure of `register_schema.md` §7 read from that file at test time. 2 member file(s) retrieved. | `dingman-1993-dagger-and-gift-korean-war`, `beckley-2018-americas-role-japan-miracle` | green |
| RFX-20 | `ECR-05` false_pair | "Did Japan's postwar land reform cause agricultural growth?" | `CONTESTED`, 3 personas (A/B/C), one `literature` trace per side over 3 sides, the `axis_statement` verbatim, no adjudication — **and the §3.2 banned-word list applies to the whole answer**, because the members are not in dispute. 3 member file(s) retrieved. **A.10 step 2 GATE FAILURE:** side B `nakamura-1989-postwar-japanese-economy.md` — the file says tenanted land fell to 10 percent, not 9; and the 31-to-70 percent owner-cultivator figures are `kawagoe-1999`'s, not this file's. Owner: The Manager (economics prompt). Close, and it is an observation not a date: the side claim is repaired against the summary, or the member is moved to the file that carries the figure, and this fixture re-runs green. | `kawagoe-1999-japan-land-reform`, `nakamura-1989-postwar-japanese-economy`, `wade-2018-developmental-state-dead-or-alive` | RED |
| RFX-21 | `ECR-06` false_pair | "How much did labour reallocation out of agriculture contribute to Japanese growth?" | `CONTESTED`, 3 personas (A/B/C), one `literature` trace per side over 3 sides, the `axis_statement` verbatim, no adjudication — **and the §3.2 banned-word list applies to the whole answer**, because the members are not in dispute. 3 member file(s) retrieved. | `aoki-2009-government-tfp-growth`, `may-1977-how-japans-economy-grew-so-fast-review`, `henderson-2008-myth-of-miti` | green |
| RFX-22 | `ECR-07` false_pair | "What was the TFP residual in the standard decomposition of Japanese growth?" | `CONTESTED`, 4 personas (A/B/C/D), one `literature` trace per side over 4 sides, the `axis_statement` verbatim, no adjudication — **and the §3.2 banned-word list applies to the whole answer**, because the members are not in dispute. 5 member file(s) retrieved. **A.10 step 2 GATE FAILURE:** side D `may-1977-how-japans-economy-grew-so-fast-review.md` — the side claim says the knowledge term is not an aggregate residual; the file's own reviewer assessment says it *is* a residual absorbing unmeasured effects. Owner: The Manager (economics prompt). Close, and it is an observation not a date: the side claim is repaired against the summary, or the member is moved to the file that carries the figure, and this fixture re-runs green. | `jorgenson-2005-industry-origins-japan`, `aoki-2009-government-tfp-growth`, `otsu-2007-neoclassical-postwar-japan`, `may-1977-how-japans-economy-grew-so-fast-review`, `simonis-1979-denison-boltho-review` | RED |
| RFX-23 | `ECR-08` one_sided | "What did Denison and Chung find about Japanese growth?" | `LITERATURE` or `BOTH`, **never `CONTESTED`** (contract §1). The documented side A, plus the one-side disclosure of `register_schema.md` §7 read from that file at test time. 3 member file(s) retrieved. | `may-1977-how-japans-economy-grew-so-fast-review`, `simonis-1979-denison-boltho-review`, `henderson-2008-myth-of-miti` | green |
| RFX-24 | `ECR-09` false_pair | "Did foreign technology licensing and acquisition raise Japanese TFP?" | `CONTESTED`, 2 personas (A/B), one `literature` trace per side over 2 sides, the `axis_statement` verbatim, no adjudication — **and the §3.2 banned-word list applies to the whole answer**, because the members are not in dispute. 3 member file(s) retrieved. **A.10 step 2 GATE FAILURE on the `axis_statement`, which §7 ships VERBATIM into the answer:** OVERSTATED — `kiyota-2013` measures no TFP at all (its own limitations say the capital-stock data are unavailable), yet the statement folds it into "aggregate measurements report no confirmed TFP effect". Owner: The Manager (economics prompt). Close, and it is an observation not a date: the statement is narrowed to what the members support, and this fixture re-runs green. | `kiyota-2005-foreign-technology-acquisition`, `kiyota-2013-import-quota-removal`, `aoki-2009-government-tfp-growth` | RED |
| RFX-25 | `ECR-10` one_sided | "Do Beason and Kiyota independently confirm that industrial targeting failed?" | `LITERATURE` or `BOTH`, **never `CONTESTED`** (contract §1). The documented side A, plus the one-side disclosure of `register_schema.md` §7 read from that file at test time. 3 member file(s) retrieved. | `beason-1996-targeting-japan`, `kiyota-2005-foreign-technology-acquisition`, `kiyota-2013-import-quota-removal` | green |
| RFX-26 | `ECR-11` two_sided | "Does the Toyota Production System transfer as a written procedure or as tacit knowledge?" | `CONTESTED`, 2 personas (A/B), one `literature` trace per side over 2 sides, the `axis_statement` verbatim, no adjudication. 2 member file(s) retrieved. | `spear-1999-decoding-tps-dna`, `deming-1967-japan-quality-control` | green |
| RFX-27 | `ECR-12` two_sided | "Did Japan's income-doubling plan cause the growth it forecast?" | `CONTESTED`, 2 personas (A/B), one `literature` trace per side over 2 sides, the `axis_statement` verbatim, no adjudication. 2 member file(s) retrieved. **A.10 step 2 GATE FAILURE on the `axis_statement`, which §7 ships VERBATIM into the answer:** OVERSTATED — two different datasets read as one fact: Henderson's six multi-year National Economic Plans (1955-1973) and ESRI's six annual outlooks (FY1955-FY1960). The stated date range fits only the second. Owner: The Manager (economics prompt). Close, and it is an observation not a date: the statement is narrowed to what the members support, and this fixture re-runs green. | `henderson-2008-myth-of-miti`, `esri-2016-japan-high-growth-economic-plans` | RED |
| RFX-28 | `ECR-13` two_sided | "Did FILP and directed credit drive Japanese industrial investment?" | `CONTESTED`, 3 personas (A/B/C), one `literature` trace per side over 3 sides, the `axis_statement` verbatim, no adjudication. 3 member file(s) retrieved. **A.10 step 2 GATE FAILURE on the `axis_statement`, which §7 ships VERBATIM into the answer:** OVERSTATED — `hoshi-1991` tests private keiretsu main-bank ties and never mentions FILP or directed credit; folding it in as the firm-level test of directed credit conflates two financing mechanisms. Owner: The Manager (economics prompt). Close, and it is an observation not a date: the statement is narrowed to what the members support, and this fixture re-runs green. | `esteban-pretel-2009-postwar-japan-policy`, `hoshi-1991-corporate-structure-liquidity-investment`, `wade-2018-developmental-state-dead-or-alive` | RED |
| RFX-29 | `ECR-14` false_pair | "Was Japan's patient relationship banking an advantage, or the source of its zombie lending?" | `CONTESTED`, 2 personas (A/B), one `literature` trace per side over 2 sides, the `axis_statement` verbatim, no adjudication — **and the §3.2 banned-word list applies to the whole answer**, because the members are not in dispute. 3 member file(s) retrieved. | `hoshi-1991-corporate-structure-liquidity-investment`, `wade-2018-developmental-state-dead-or-alive`, `caballero-2008-zombie-lending-japan` | green |
| RFX-30 | `ECR-15` two_sided | "Should a lunar programme be judged against megaproject overruns or against growth accelerations?" | `CONTESTED`, 2 personas (A/B), one `literature` trace per side over 2 sides, the `axis_statement` verbatim, no adjudication. 3 member file(s) retrieved. | `pritchett-2000-hills-among-plateaus`, `hausmann-2005-growth-accelerations`, `flyvbjerg-2014-what-you-should-know-megaprojects` | green |
| RFX-31 | `ECR-16` two_sided | "Can robots substitute for the workforce the Moon does not have?" | `CONTESTED`, 2 personas (A/B), one `literature` trace per side over 2 sides, the `axis_statement` verbatim, no adjudication. 5 member file(s) retrieved. **A.10 step 2 GATE FAILURE on the `axis_statement`, which §7 ships VERBATIM into the answer:** OVERSTATED — "four theoretical accounts hold" that a self-replicating capital stock is the surplus factor; `lewis-1954`'s own file says Lewis does not support the substitution, and `lee-2008` states the constraint rather than the claim. Owner: The Manager (economics prompt). Close, and it is an observation not a date: the statement is narrowed to what the members support, and this fixture re-runs green. | `lewis-1954-unlimited-supplies-labour`, `chirikjian-2002-self-replicating-robots-lunar`, `freitas-1980-advanced-automation-space-missions`, `lee-2008-robotic-self-replication-complexity`, `acemoglu-2020-robots-and-jobs` | RED |
| RFX-32 | `ECR-17` one_sided | "Is a growth acceleration usually sustained?" | `LITERATURE` or `BOTH`, **never `CONTESTED`** (contract §1). The documented side A, plus the one-side disclosure of `register_schema.md` §7 read from that file at test time. 2 member file(s) retrieved. **A.10 step 2 GATE FAILURE on the `axis_statement`, which §7 ships VERBATIM into the answer:** OVERSTATED — "usually does not" persist, against Hausmann's own 37 of 69 sustained, which the paper calls close to a coin flip. Owner: The Manager (economics prompt). Close, and it is an observation not a date: the statement is narrowed to what the members support, and this fixture re-runs green. | `hausmann-2005-growth-accelerations`, `pritchett-2000-hills-among-plateaus` | RED |
| RFX-33 | `ECR-18` one_sided | "Did Korea's heavy and chemical industry targeting raise productivity?" | `LITERATURE` or `BOTH`, **never `CONTESTED`** (contract §1). The documented side A, plus the one-side disclosure of `register_schema.md` §7 read from that file at test time. 1 member file(s) retrieved. | `wade-2018-developmental-state-dead-or-alive` | green |
| RFX-34 | **THE DELETION DECOY.** Any `two_sided` or `false_pair` axis, one member file removed from the corpus | `REFUSE`/`axis-incomplete`, naming the axis and the unresolved member — **never a one-sided answer, and never a fall-through to search** (contract §5). Built by **deleting a real member from a staged copy of the real corpus** and re-running, never by constructing a one-sided answer: a constructed one-sided answer proves only that the constructor can count. Without this row RFX-01..33 pass trivially, because both files happen to be present and an ordinary search would probably have found them anyway. **This row is the only evidence that the register invariant is doing work rather than agreeing with a search that would have succeeded without it.** The mutation must be observed to have changed the tree before the red is asserted (INV-11) | the deleted member's own summary | green |

| RFX-35 | **THE DROPPED-SIDE DECOY, and it is the one that separates two readings of the invariant.** A real `CONTESTED` answer on a **three- or four-sided** axis, one side's trace deleted | Must FAIL. **Measured over the register: 18 axes are class `two_sided`, and seven of them carry more than two sides** — `LCC-01` (3), `LCC-03` (3), `LCC-04` (3), `LCC-07` (**4**), `LCC-09` (3), `LCC-12` (3), `ECR-13` (3). Delete one side from a three-sided answer and two sides remain: **a checker written to "returns both sides or refuses" passes that, and the router has just chosen which of three measurement methods the reader hears.** The assertion is therefore *every side*, never *both*. `LCC-01` is the natural subject — its own `axis_statement` says out loud that three measurement methods span about an order of magnitude — and `LCC-07` at four sides is the harder case. **FIX-19 cannot discriminate here and this row is why it is not a duplicate of it:** FIX-19 names no axis, so on a two-sided axis it leaves one side and any side count catches it. Built by deleting a side's trace from real produced output; the deletion is observed to have changed the bytes before the red is asserted (INV-11) | `LCC-01`'s three member summaries; `LCC-07`'s four | green |

**Why the count is 35 and not 33.** I5 names two things: one fixture per axis, and the deletion
decoy that gives the set teeth. RFX-34 and RFX-35 are not axes; they are the two mutations that
discriminate, and they are listed as rows rather than as prose because a decoy described in a
paragraph is a decoy nobody runs. **They discriminate different things.** RFX-34 removes a member
*file* and asks whether the run refuses instead of answering one-sidedly. RFX-35 removes a *side's
trace* from an answer on a >2-sided axis and asks whether the side count is `sides.length` or the
number two. Only the second can tell "every side" from "both sides", and "both sides" is the wording
the plan carries.


## 16. ISR — the three named facts

**Sub-step 4.7 (LUNAR-6).** The Space Resources Engineer's §6 R5, verbatim: *"For any answer
carrying a quantitative ISRU figure, three facts must be named: **the system boundary, the scale,
and the maturity.** Extraction only or integrated. Bench kilograms or tonnes per year. Measured,
modelled, or assumed."* His own next sentence is why this section exists rather than a preference:
*"That is a machine-checkable assertion and it is the whole of the discipline."* A rule that is
machine checkable and is not machine checked is a preference wearing a rule's clothes.

**The checker is `oracle/tests/isru_three_facts.js`.** It runs standalone over any answer file, and
`--prove` runs eighteen proofs against real produced output.

**Scope is the figure-bearing sentence plus one lookahead, never the answer, and that is the design
decision this section turns on.** An answer-wide scope is the weaker reading of R5: an answer
carrying an extraction-only modelled figure and an integrated measured one satisfies an answer-wide
check with a single facts block, and the reader cannot tell which figure it belongs to. That is
exactly LCC-04, which §6 names as where R5 binds hardest — four figures whose difference *is* the
boundary and the maturity. ISR-8 is the decoy that proves the scope is not answer-wide.

**Under `lit_review: yes`, each row names the primary it validates against.** Where the primary is
`§6` itself the row is validating a *rule* rather than a *fact*, and says so.

| ID | What is tested | Pass criterion | Primary source | Status |
|---|---|---|---|---|
| ISR-1 | The ISRU-figure trigger is decidable | A numeral within 24 characters before a unit token from the closed list fires; nothing else does. `22.88 to 66.33 g/kWh` fires, `the g/kWh column` does not. The list is stated in the checker, not in this file, so the suite carries no second copy of it | §6 R5, the rule | green |
| ISR-2 | The unit list is not aspirational | Every token in the closed list occurs in at least one file under `literature/`. A closed list nothing can trip is decoration. **This row fired on its author's first draft** — two of seventeen tokens (`wh/g`, `kwh/kg of oxygen`) occurred nowhere in the corpus and were removed, which is the row earning its keep before the section shipped | `literature/`, 169 files | green |
| ISR-3 | The system boundary is named | A token from the boundary list appears in the figure's scope. Extraction only, or integrated, or a named chain | `sowers-2019-psr-ice-mining` (extraction only, concept level) and `kiewiet-2026-luwex-water-extraction` (integrated, through liquefaction) | green |
| ISR-4 | The scale is named | A token from the scale list appears in the figure's scope. Bench kilograms, or per run, or tonnes per year | `kiewiet-2026-luwex-water-extraction` (13 kg per run); `sowers-2019-psr-ice-mining` (1,600 t/yr) | green |
| ISR-5 | The maturity is named | A token from the maturity list appears in the figure's scope. Measured, modelled, or assumed | `kiewiet-2026-luwex-water-extraction` (measured, TRL 4 targeted); `wang-2025-microwave-water-production` (bench, positive pressure) | green |
| ISR-6 | The three lists are closed sets and are asserted, not asserted-about | `boundary`, `scale` and `maturity` are three named arrays in the checker; a token outside them is not a fact named. The suite does not restate them, per LIM-7's rule against a second authority for a fixed list | §6 R5, the rule | green |
| ISR-7 | **DECOY, one per fact.** Delete the fact's every token from a real produced answer | Three separate mutations of the same real answer, one per fact; each must produce a finding naming that fact and no other. **Each mutation is asserted to have changed the bytes before its red is asserted** (INV-11), and byte positions are reported rather than the length delta, because a same-length substitution (`measured` → `reported`) has a delta of zero and is a real mutation | `kiewiet-2026-luwex-water-extraction`, whose own sentence is the spliced text | green |
| ISR-8 | **DECOY: the borrowed facts.** Two figures in one answer, facts on the first only | The second figure is flagged even though the answer as a whole names all three facts. **An answer-wide checker passes this and is wrong.** This is LCC-04's shape and it is why the scope is the sentence | `wang-2025-microwave-water-production` beside `kiewiet-2026-luwex-water-extraction` | green |
| ISR-9 | **The false-positive defence.** A real `APP` answer carrying a scalar draws no findings | `model:artemis\|2040\|water = 13.358` carries a numeral and no ISRU unit token, so it is not an ISRU figure and the three facts are not demanded of it. **A check that taxed every quantitative answer would be switched off inside a month**, and a check that gets switched off is worse than no check because the plan still lists it | `lsei/index.html` `model()`, recomputed at test time | green |
| ISR-10 | **R4.** A TRL number is sourced or absent | A TRL numeral anywhere in an answer requires at least one locator in that answer that **resolves on disk** to a file which itself contains the string `TRL`. **A proximity check on the word `Trace` passes the failure R4 names** — every literature answer the router emits carries a trace, so proximity is satisfied by construction and asserts nothing. The locator has to be opened | `sanders-2025-nasa-isru-progress-review` (the corpus's one cross-process maturity survey, dated 2025-05-19) and any primary stating its own maturity | green |
| ISR-11 | **R4's date clause.** An answer quoting a TRL names the date | The supporting locator's leaf carries a four-digit year. Free, because `NAMING.md` already puts the year in the leaf: "names the date" costs the answer nothing beyond citing the right file. **A TRL from 2025 quoted in 2028 without its date is a claim about the past presented as a claim about the present** | `oracle/NAMING.md` §2, the leaf grammar | green |
| ISR-12 | **DECOY: R4 against a resolving trace that carries no TRL** | The same TRL sentence spliced into two real produced answers that differ only in which file the router's own locator resolves to. The one citing `kiewiet-2026` (which contains `TRL`) passes; the one citing `take-or-make-in-space` (which contains no `TRL` at all) fails. **The pair is the point:** both carry a trace line, and no proximity rule can separate them | `kiewiet-2026-luwex-water-extraction` against `take-or-make-in-space` | green |
| ISR-13 | **R2 is a human gate and is marked as one** | *Where a demonstrated figure exists it is the answer and the modelled figure is context.* Which of two figures is demonstrated is a judgement about the sources, not a token in a sentence, and a checker that guessed at it would be answering §6's question by inventing an answer. Listed here so that nobody counts it as mechanized | §6 R2, the rule | H |
| ISR-14 | **R5's own failure case:** an answer that names three facts and names three wrong ones | The checker cannot see this and says so in its own `LIMIT` block. `1.3 kWh/kg, integrated, tonnes per year, measured` names three facts about a figure that is extraction-only, concept-level and modelled. A green ISR-3..5 does not mean the boundary is the right boundary | `sowers-2019-psr-ice-mining`, whose figure this misdescribes | H |
| ISR-15 | **No pass on an empty population** | An answer carrying no ISRU figure is reported `EMPTY`, never `PASS`. An answer that names no figure has not satisfied the discipline; it has not engaged it. INV-12 one section over, and the first thing a naive implementation gets wrong | the standing rule, `run_suite.js` header | green |

**What a green ISR result does not mean.** It means three facts are named beside every quantitative
ISRU figure. It does not mean they are the right three, and it does not mean the demonstrated figure
was preferred to the modelled one. ISR-13 and ISR-14 are the two that stay human, and they are
listed as `H` rather than omitted so that the section's mechanized fraction is countable: **thirteen
of fifteen.**
