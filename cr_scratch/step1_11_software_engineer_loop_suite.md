# Step 1.11, The Software Engineer: the answering-loop test suite

**Persona:** The Software Engineer
**Sub-step:** 1.11 (origin LOOP-3), Group 1, depends on 1.3 (LOOP-1)
**Deliverable:** the block in §3, liftable verbatim to `oracle/tests/answering_loop_suite.md`
**Reasoning:** §1 (sizing, and what a suite over a loop can be). §2 (the five rulings the charge
demands, including the two The Designer handed me at 1.12). §4 (source verification ledger, for The
Fact-Checker in Wave 2). §5 (findings, and requirements this places elsewhere).
**Date:** 2026-08-26

---

## 1. Sizing, and the one structural thing a suite over a loop has to get right

### 1.1 The count: 200, of which 153 are hand-authored

**200 tests.** Counting rule: rows in the fourteen test tables between the `<!-- BEGIN -->` and
`<!-- END -->` markers of §3 whose first cell matches `^[A-Z]{2,3}-[0-9]+$`; measured 2026-08-26 by

```
sed -n '/<!-- BEGIN /,/<!-- END /p' cr_scratch/step1_11_software_engineer_loop_suite.md \
  | grep -cE '^\| [A-Z]{2,3}-[0-9]+ \|'
```

A.10 step 7 sets ~150 as the starting point, scaled by complexity. The scaling argument is not "this
is complicated, so more." It is arithmetic over the closed sets 1.3 froze, and it lands almost
exactly on A.10's number once you separate what is authored from what is generated.

**47 of the 200 are generated, not written.** Rule G is 4 origins × 3 grades = 12 cells plus one test
on the generator. Rule V is six verdict rows expanded against a four-value origin field = 33 cells
plus one test on the generator. Those two tables cost one generator apiece and no maintenance: amend
Rule G in the contract and the matrix changes without anyone editing a test. **Strip them and the
hand-authored count is 153**, which is A.10 step 7's starting point, arrived at independently.

That is the honest sizing statement, and the reason I am not defending 200 as such: the number that
should be checked against my coverage is 153. The other 47 are a consequence of the contract's own
shape and would be 47 whether I wanted them or not.

Where the 153 goes, and why each group is the size it is:

| Group | n | Why that many |
|---|---|---|
| VER | 3 | The version field ships with three named consumers (contract §9). One test each. If a consumer is dropped the field is dropped, and the test count says so. |
| ORG | 11 | Four origins, each computed from a locator, plus totality, disjointness, agreement, and three decoys. The field is the load-bearing mechanism in the contract and it gets the most tests per closed value of anything here. |
| GRD | 10 | Three legal grades, six blacklisted words, one arity test — and one false-positive test, because `verified` is a substring of `recompute-verified` and a blacklist that trips on its own legal token gets switched off in a week. |
| TRC | 9 | Fixed grammar, fixed arity, fixed slot order. F4 lives here. |
| LIM | 9 | Two fixed texts, byte-identical, plus the two origins that must carry neither, plus the anti-drift device. |
| VRD | 12 | Six verdicts, six wave costs, plus the CONTESTED isolation decoy and the `APP_UNBUILDABLE` non-verdict. |
| REF | 17 | Six reason codes with one fixture each, three cost dimensions, and the fall-through decoys. Refusals are where this system fails silently, so they are over-weighted deliberately. |
| FIL | 14 | The deliverable-is-a-file rule is four conditions in a truth table plus a byte-identity check plus the haiku's three assertions. |
| CLM | 14 | This is the `verify_report.js` replacement post-condition. See §2.3. |
| LOG | 24 | Two columns, five values, three values, five-way precedence, eight required fields. F5 lives here. Mostly arithmetic on the schema. |
| INV | 12 | Level 2, minus the register invariants. I1 through I6 with I5 held for 4.1, plus the two meta-tests. |
| FIX | 18 | Sixteen fixture questions drawn from the two question surfaces, plus two decoys. |

**Not padded, and not truncated.** Two places I cut rather than filled. I did not write a test per
refusal-code *owner* — the six owners named in contract §5 are a design argument for why the codes
are six, not a property a machine can observe, and a test asserting "this code routes to the address
grammar" would be asserting a table I wrote. And I did not write a "self-referential subject" test
group: my own 0.2 §4.3 B2 keeps that check deliberately weak, a counted number a human reads rather
than a gate, and a suite that turns it into eleven assertions would be exactly the tuning-into-
uselessness I warned against in the paragraph that proposed it.

### 1.2 The thing a suite over a loop has to get right, restated because it governs every group below

The deliverable under test is generated fresh from a question that did not exist when the suite was
written. **The suite does not test answers. It tests the loop.** The answer *text* is
nondeterministic; the classification, the resolved address, the recomputed scalar, the retrieved file
set, the outcome, the origin of each trace and the grade attached to it are deterministic functions
of the question and the corpus. Every test below asserts one of the second set. **No test in this
suite asserts wording**, with exactly two exceptions, both of them fixed texts the contract states
verbatim: the two LIMIT lines (LIM group), and the six blacklisted grade words (GRD group). Both are
byte-identity checks against text read out of the contract at test time, not text copied into the
suite. A suite carrying its own copy of a fixed text is a second authority, and a second authority
drifts — that is the failure `verify_figure.js` recorded and paid for, and it is not repeated here.

---

## 2. The five rulings the charge demands

### 2.1 (a) The matrices are generated, and every illegal cell is a decoy

Done, in the RG and RV groups. Two things worth saying about the generation rather than the cells.

**The generator reads the contract, not a copy of it.** `oracle/tests/gen_matrix.js` parses Rule G's
table and Rule V's table out of `oracle/answer_contract.md` §3 and emits the cell list. RG-13 and
RV-34 assert the generator's own output shape — 12 cells with 5 legal, 33 cells with 9 legal — so a
contract edit that changes a rule changes the matrix and trips exactly one test, which is the tripwire
you want rather than 47 mysteriously-green cells.

**RG-04 is the two-token check I promised at 1.3 §3.1, and it is the highest-value single test in the
suite.** A `LITERATURE` verdict carrying a `recompute-verified` trace means either a summary's number
is being presented as an app recompute or the router answered from a summary a question the app could
have answered. Both are the inherited authority rule being violated. Until now that rule had no test
that was not a hand-written fixture; it is now two tokens on a trace line, checkable over any produced
answer, in a cell the generator emits whether or not anybody remembers to write it.

**The decoys are mutations of real produced output, not constructed strings.** ORG-9 is the one to
build first: take a real `LITERATURE` answer off disk, change one `literature` token to `app`, assert
ORG-8 goes red. If it goes green, the entire origin mechanism is decoration and everything downstream
of it is too.

### 2.2 (b) The BOTH falsifier, written as a test that can fire

At 1.3 I kept `BOTH` on a negative warrant — its positive work is thin, its real work is naming the
thing the authority rule forbids — and I recorded the falsifier: *if 1.11's fixture set cannot produce
a natural question that is genuinely BOTH rather than APP plus an aside, BOTH is the first term to
reconsider.*

I can produce one. It is FIX-6, and it comes out of the lunar surface's L4 class unmodified: **"Where
does 37,000 kWh per tonne come from?"** The app carries the value, its status field and its governing
section; the corpus carries the primary that section cites. Those are two distinct questions — what
the model uses, and what was measured — and neither answer is an aside to the other.

Producing one is not the same as proving the term earns its keep, so the falsifier gets a test rather
than my say-so. **FIX-17, the deletion decoy.** Run FIX-6 with the `literature/` shelf removed. If
`BOTH` is real, the run loses a distinct answer and must say so — refuse the shelf half by name,
never silently return the app half as a complete answer. If `BOTH` is APP-plus-aside, removing the
shelf loses nothing observable and FIX-17 passes trivially, and **a trivially-passing FIX-17 is the
falsifier firing.** The test is written so that its own green is the finding. It is the I5 device from
0.2 §5.2 applied one term over, and it is the only form of this test I would trust, because the
alternative — a human judging whether a question "feels like two questions" — is exactly the
judgement a suite cannot make.

Recorded consequence: if FIX-17 passes trivially at 3.9, `BOTH` collapses into `APP` with an optional
shelf trace, the verdict set goes to five, and the contract takes a version bump. That is cheaper to
say now than after nine mechanisms are written against it, which is why I said it at 1.3.

### 2.3 (c) `verify_report.js`: the post-condition folds in, the implementation needs one row

**Ruling, in two halves, because the question has two halves.**

**The post-condition folds into this suite.** It is the CLM group, fourteen tests, and it is written
here rather than deferred for the reason the whole method exists: the post-condition is what the
replacement is built against, and writing it after the replacement means writing it to match whatever
got built. §7 of the contract already restates the claim-bearing definition in the contract's own
words, so there is a specification to test against and no dependency on the dropped file. CLM-14
tests the author's ruling directly: nothing in the tree imports, requires, extracts or reads
`verify_report.js`, and a decoy adding a `require` turns it red. A ruling with no test is a
preference.

**The implementation needs one row, and it is not 5.1.** My §8.4 named three consumers: `verify_haiku.js`'s
claim-bearing token definition, `verify_register.js`'s B1 backward half, and invariant I2 over every
generated answer. Sub-step 5.1 (LOOP-8) builds the first two. **Nothing builds the third, and nothing
owns the shared predicate all three consume.** If 5.1 builds it inline, I2's consumer — which lives
in the loop, delivered at 3.8 and 3.9, two steps earlier — gets a second implementation of one
definition. Two implementations of one definition is the defect The Designer's own 1.12 contract
exists to remove, reproduced in code instead of in prose.

**The row I recommend, for The Manager to place or decline:**

> **Build `oracle/lib/claim_bearing.js`.** The single implementation of answer contract §7. Four
> detector lists — numeral, unit token, coefficient name, named source — with the last three read out
> of the app at run time rather than typed into the module. Plus the backward check (every
> claim-bearing unit carries at least one trace, including the all-exempt failure case) and a
> `--prove` decoy built by deleting one trace line from a real produced answer. Three named consumers:
> `verify_haiku.js` (5.1), `verify_register.js` (5.1), and the loop's I2 post-condition (3.9). A
> fourth consumer, or a second implementation, is a failure. **Owner: The Software Engineer.
> Placement: Step 3, before 3.9 (LOOP-6), because I2 is the loop's own post-condition and a loop
> delivered without it runs unchecked across two steps and through SE-11's sampling window.**
> Depends on 1.3 (LOOP-1) §7 and on the merged app being loadable. Post-condition: the CLM group of
> this suite goes green.

Cost: one module, roughly the 328 lines the dropped file held, minus its report-specific half. The
alternative — widen 5.1's scope by a sentence — costs nothing to write and buys a two-step window
where the loop's central control does not exist. I recommend the row. **The Manager decides; this is
the input he asked for.**

### 2.4 (d) F4 and F5: both are tests, and both are tests *because* they are defects

Neither passes silently and neither is filed as a report and forgotten. Both are defects in the
artifact this suite is written against, and the artifact is being rewritten by sub-steps this suite is
the contract for — so the strongest available form of each defect report is a test that is red until
the rewrite lands. That is not a dodge; it is the only form that has an owner and a close condition.

**F4, two trace-line orderings.** Verified in this session rather than taken on report:
`lsei/oracle/answer_question.js` line 421 emits `Trace (resolution-only, app-stored prose):` —
grade first — while lines 392, 395, 400 and 414 emit `Trace (citation, resolution-only):` and
`Trace (scalar, recompute-verified):` — kind first. No single fixed-arity parser reads both.
Contract §3 froze kind first, three slots, always. **Test: TRC-4**, and the decoy is the byte string
at line 421 harvested from real output rather than a hand-written counterexample, which is the house
style Integration established at 0.5 and the strictly better artifact here because the failing bytes
already exist. **TRC-5** is its companion and is the one people would forget: the four kind-first
lines are *also* wrong now, because they carry two slots where the contract requires three. Porting
them unchanged is the quiet half of the same defect.

**F5, the run log has no deliverable path.** Verified: `appendRunLog` at
`lsei/oracle/answer_question.js` line 589 writes `{timestamp, question, verdict, outcome}` and
nothing else. Contract §8 adds the path and seven other fields. **Test: LOG-21**, and it asserts more
than presence — the path must resolve to bytes on disk, with a decoy that deletes the file. A row
carrying a path to a file that no longer exists cannot be sampled, and presence-of-a-string is the
check that would have passed while the sampling protocol still could not run.

**The half of F5 that is not a test, said so it does not get lost.** LOG-21 makes the sampling
protocol *possible*. It does not make it *specified*: the rate, the draw procedure and the annotation
procedure are SE-11 (7.4–7.7) and are a document with a reader, not a suite. F5 blocked at 1.3 on
the log schema and is discharged there; what remains is scheduled and owned.

### 2.5 (e) The two things The Designer handed me at 1.12

Both answered here rather than in a separate note, because a note beside a file is a file nobody
opens.

**Question 1: are M1–M12 the right twelve, and is the single-script three-mode shape right?**

**The shape is right and I take it.** Three modes because there are exactly three consequences a
caller has to branch on — `--check` exits 1 and blocks, `--lint` exits 0 and reports, `--index`
writes — and a mode boundary drawn on consequence is the only one a caller can act on. One script
rather than two, against this project's existing two-script convention in `tools/`, for a specific
reason: **M6 asserts the committed index equals a regenerated one, so the checker and the indexer
must share one generator.** Split them and you have two generators for one index, which is instance 1
reproduced in code. The convention loses to the mechanism.

**Eleven of the twelve stand as written. Two changes.**

- **M5 does not run commands under `--check`, and never under a hook.** As specified, M5 executes
  shell strings harvested out of markdown documents. Once 2.14 wires the checker through
  `core.hooksPath`, that is arbitrary code from a document running on every commit, and it will run
  under whatever a future agent wrote into an `operation:` field. **Ruling: M5 moves behind an
  explicit `--live` flag, invoked by a person, never by `--check` and never by the hook.** The value
  is preserved entirely — drift on a `live` quantity was never a blocking failure anyway, it is a
  report, and a report a person asks for is a report a person reads. This is my one substantive
  objection to the twelve and it is a security property, not a taste.
- **M1 asserts sequence equality, not set equality.** §2 of the contract says the twelve keys appear
  "in this order." Set equality does not check that. Either the order is enforced or the words come
  out of the contract, and a stated rule with no check is the class of defect this whole contract
  exists to close. Sequence equality costs one comparison operator, so it is enforced.

**Nothing is cut.** His triage — "if the review has to cut, cut from the lints" — is the correct
priority and I did not need to exercise it. M3, M4 and M6 are the three that carry the contract; M8,
M9 and M12 are one regex each and are free; M7 is his own device, already proven on the loose-ends
register. **One thing I deliberately did not add:** nothing asserts the converse of M2 — a block
nobody quotes. That is legal by §1's not-governed list, and a test for it would fail on every
correctly-authored single-site quantity.

**Question 2: the lint regex. He is right that I must take the spelled-number form, and it still has
a defect.** Verified in this session:

```
$ echo "someone lines above the fold" | grep -onoiE '(one|two|...|twelve|[0-9]+) lines? (above|below|before|after)'
1:one lines above
```

The alternation is unanchored, so `one` matches inside `someone`. On first run over a prose-heavy
repository that is a wall of false positives, and a lint that opens with a wall of false positives is
switched off on its second run — the exact failure mode he warns about for `lsei/` and `cr-agents/`.
**Ruling: take the spelled-number form with a word boundary on the group.**

```
grep -rnoiE '\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|[0-9]+) lines? (above|below|before|after)'
```

Verified: the false positive is gone (exit 1 on the string above) and the live instances still fire —
run over the project's own `.md` files excluding `lsei/` and `cr-agents/`, it returns `Twelve lines
above` at `step1_12_designer_counting_rule.md:322` and nine more, including three in his own §6 and
four in `step1_0_designer_coldread.md`. The digits-only form finds one of them. He is right, and the
corrected form is what M8 ships with.

---

## 3. THE DELIVERABLE

Everything between the markers lifts to `oracle/tests/answering_loop_suite.md` unedited.

<!-- BEGIN oracle/tests/answering_loop_suite.md -->

# The answering-loop test suite

**Written against answer contract version 1.** Levels 1 and 2. Register fixtures are absent by
design and attach at 4.1 (LOOP-7); every attachment point is marked **[4.1]** in the tables below.

**200 tests.** Counting rule: rows in the fourteen tables below whose first cell matches
`^[A-Z]{2,3}-[0-9]+$`.

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
| VER-2 | The suite's pinned version equals the contract's | This file declares `CONTRACT_VERSION_UNDER_TEST` and it equals VER-1's value | green |
| VER-3 | DECOY: the version tripwire fires | Increment the integer in the contract without touching this file; VER-2 must go red. A green VER-2 after the mutation means the field is decoration and VER-1..3 are deleted along with it | green |

## 2. ORG — the origin field

`origin` is a closed set of four and is a **function of the locator**, not a judgement. The mapping,
frozen by 1.7's two namespaces: an app slug or app-internal reference → `app`; a path under
`literature/<folder>/` whose leaf matches `R_S` → `literature`; a path under `findings/` whose leaf
matches `R_F` → `findings`; no locator → `none`.

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| ORG-1 | An app scalar slug computes `app` | `model:<scenario>\|<phase>\|<output>` and its knob-bearing form → `app` | green |
| ORG-2 | An app prose locator computes `app` | `KNOB_DATA.SLUGS[...]`, `SECTION_REFS[...] -> REFERENCES[...]` → `app` | green |
| ORG-3 | A summary path computes `literature` | `literature/<folder>/<leaf>` with `R_S`-matching leaf → `literature` | green |
| ORG-4 | A findings path computes `findings` | `findings/<leaf>` with `R_F`-matching leaf → `findings` | green |
| ORG-5 | An absent locator computes `none` | Empty or absent locator → `none`, and `none` co-occurs only with grade `refused` | green |
| ORG-6 | Totality | Over every locator emitted across the whole fixture set, the count of locators computing to no origin is zero | green |
| ORG-7 | Disjointness | No locator computes two origins. Asserted from `R_S ∩ R_F = ∅` (1.7 §2) plus directory disjointness, over the whole corpus listing | green |
| ORG-8 | Written origin equals computed origin | On every trace line of every produced answer, the third slot equals the origin computed from the locator | green |
| ORG-9 | **DECOY, highest value in the suite** | Take a real `LITERATURE` answer off disk, change one `literature` token to `app`, assert ORG-8 goes red. A green here voids the origin mechanism and everything built on it | green |
| ORG-10 | A findings file cannot sit on the summary shelf | A `findings/` file copied into `literature/` would compute `literature` from its path while matching `R_F` on its leaf. Assert the merge rejects it (1.7 §11) so the case cannot arise. If that merge check is absent, ORG-10 is red | green |
| ORG-11 | An unclassifiable locator is a hard failure | A path in neither namespace (`_intake/...`, an absolute path, a URL) fails the run. It never falls through to `literature`. A hole in a closed set is where the next exception gets parked | green |

## 3. RG — Rule G, grade by origin. **Generated.**

Twelve cells, five legal, produced by `oracle/tests/gen_matrix.js` from the Rule G table in
`oracle/answer_contract.md` §3. Not enumerated by hand and not copied out of the contract. Every
illegal cell is a decoy built by mutating a real answer of the corresponding origin.

| ID | Cell | Expected | Status |
|---|---|---|---|
| RG-01 | `app` + `recompute-verified` | legal — accepted | green |
| RG-02 | `app` + `resolution-only` | legal — app-stored prose, slugs resolving against the app's own slug table | green |
| RG-03 | `app` + `refused` | **illegal** — a refusal asserting an app locator | green |
| RG-04 | `literature` + `recompute-verified` | **illegal, and the highest-value cell.** Either a summary's number is presented as an app recompute, or the router answered from a summary a question the app could have answered. Both violate the inherited authority rule. Two-token check over any produced answer | green |
| RG-05 | `literature` + `resolution-only` | legal | green |
| RG-06 | `literature` + `refused` | **illegal** | green |
| RG-07 | `findings` + `recompute-verified` | **illegal** — an FA deliverable's arithmetic is the project's own and is not an app recompute | green |
| RG-08 | `findings` + `resolution-only` | legal | green |
| RG-09 | `findings` + `refused` | **illegal** | green |
| RG-10 | `none` + `recompute-verified` | **illegal** | green |
| RG-11 | `none` + `resolution-only` | **illegal** — a resolution-only grade with nothing to resolve | green |
| RG-12 | `none` + `refused` | legal | green |
| RG-13 | The generator itself | `gen_matrix.js` parses §3's Rule G table and emits exactly 12 cells of which exactly 5 are legal. A contract edit that changes Rule G changes the matrix and trips this one test | green |

## 4. RV — Rule V, verdict by the multiset of origins present. **Generated.**

Thirty-three cells from six verdict rows, produced by the same generator from the Rule V table.

| ID | Verdict | Origin multiset | Expected | Status |
|---|---|---|---|---|
| RV-01 | `APP` | `{app}` | legal | green |
| RV-02 | `APP` | `{app, literature}` | **illegal** | green |
| RV-03 | `APP` | `{app, findings}` | **illegal** | green |
| RV-04 | `APP` | `{app, none}` | **illegal** | green |
| RV-05 | `APP` | `{}` — no app trace | **illegal**, requirement unmet | green |
| RV-06 | `FIGURE` | `{app}` | legal | green |
| RV-07 | `FIGURE` | `{app, literature}` | **illegal** | green |
| RV-08 | `FIGURE` | `{app, findings}` | **illegal** | green |
| RV-09 | `FIGURE` | `{app, none}` | **illegal** | green |
| RV-10 | `FIGURE` | `{}` — no app trace | **illegal** | green |
| RV-11 | `LITERATURE` | `{literature}` | legal | green |
| RV-12 | `LITERATURE` | `{findings}` | legal | green |
| RV-13 | `LITERATURE` | `{literature, findings}` | legal | green |
| RV-14 | `LITERATURE` | `{literature, app}` | **illegal** — the authority-rule boundary, companion to RG-04 | green |
| RV-15 | `LITERATURE` | `{literature, none}` | **illegal** | green |
| RV-16 | `LITERATURE` | `{}` — neither shelf | **illegal** | green |
| RV-17 | `BOTH` | `{app, literature}` | legal | green |
| RV-18 | `BOTH` | `{app, findings}` | legal | green |
| RV-19 | `BOTH` | `{app}` | **illegal** — that is `APP` | green |
| RV-20 | `BOTH` | `{literature}` | **illegal** — that is `LITERATURE` | green |
| RV-21 | `BOTH` | `{app, literature, none}` | **illegal** | green |
| RV-22 | `CONTESTED` | `{literature, literature}`, one per side | legal | green |
| RV-23 | `CONTESTED` | `{literature}` — one only | **illegal** | green |
| RV-24 | `CONTESTED` | `{literature, literature, app}` | **illegal** | green |
| RV-25 | `CONTESTED` | `{literature, literature, findings}` | **illegal** — a prior adjudication entered as a party to the disagreement it adjudicates is the Oracle arguing with itself under two names | green |
| RV-26 | `CONTESTED` | `{literature, literature, none}` | **illegal** | green |
| RV-27 | `CONTESTED` | two `literature` on the **same side** of the axis | **illegal** — one side twice is not two sides. Not decidable from origin alone; needs the register's side field. **[4.1]** This is loose end B6's test: Beason and Henderson are co-belligerents | **[4.1]** |
| RV-28 | `REFUSE` | `{none}` | legal | green |
| RV-29 | `REFUSE` | `{none, none}` | **illegal** — exactly one | green |
| RV-30 | `REFUSE` | `{none, app}` | **illegal** | green |
| RV-31 | `REFUSE` | `{none, literature}` | **illegal** | green |
| RV-32 | `REFUSE` | `{none, findings}` | **illegal** | green |
| RV-33 | `REFUSE` | `{}` — no trace at all | **illegal**; the refusal's stated reason stands *in place of* a trace, it does not remove the line | green |
| RV-34 | The generator itself | `gen_matrix.js` parses §3's Rule V table and emits exactly 33 cells of which exactly 9 are legal | green |

## 5. GRD — trace grades

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| GRD-1 | Every trace line carries a grade | Zero grade tokens on a trace line fails | green |
| GRD-2 | The grade is drawn from the closed three | `recompute-verified`, `resolution-only`, `refused`. Anything else fails | green |
| GRD-3 | `verified` as a grade fails | Blacklist, read from contract §2 at test time | green |
| GRD-4 | `confirmed` as a grade fails | as above | green |
| GRD-5 | `validated` as a grade fails | as above | green |
| GRD-6 | `proven` as a grade fails | as above | green |
| GRD-7 | `established` as a grade fails | as above | green |
| GRD-8 | `supported` as a grade fails | as above | green |
| GRD-9 | Arity: exactly one grade | Two grade tokens in one trace line fails, even if both are legal | green |
| GRD-10 | **False-positive gate** | `recompute-verified` contains `verified` as a substring and must not trip GRD-3. Word-boundary matching on the grade slot only, never a substring scan of the line. A blacklist that trips on its own legal token is switched off within a week, and a check that gets switched off is worse than no check because the plan still lists it | green |

## 6. TRC — the trace line

Grammar, from contract §3: `Trace (<kind>, <grade>, <origin>): <locator>`. Fixed arity, fixed slot
order, in every deliverable.

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| TRC-1 | The grammar | One regex over the whole deliverable; every line beginning `Trace (` matches it | green |
| TRC-2 | Arity is exactly three | Two comma-separated slots fails. Four fails | green |
| TRC-3 | Slot order is kind, grade, origin | Slot 1 against the kind vocabulary, slot 2 against GRD-2's three, slot 3 against ORG's four | green |
| TRC-4 | **F4 DECOY, harvested from real output** | The byte string `Trace (resolution-only, app-stored prose):`, emitted at `lsei/oracle/answer_question.js` line 421, must be rejected by TRC-1 and TRC-3. Grade first, and no fixed-arity parser reads it alongside the kind-first lines | green |
| TRC-5 | **F4, the quiet half** | The four kind-first prototype lines (`answer_question.js` 392, 395, 400, 414) carry two slots where the contract requires three. Asserting they parse unchanged is itself a failure: they must gain the origin slot in the port. A test that passes on the un-ported lines is the defect surviving the rewrite | green |
| TRC-6 | A grade word in the kind slot fails | `Trace (resolution-only, ...)` — slot 1 is not a member of GRD-2's set | green |
| TRC-7 | The locator is non-empty | Except where grade is `refused`, in which case the locator slot is absent and ORG-5 governs | green |
| TRC-8 | One trace per physical line | Two `Trace (` occurrences on one line fails. A line-oriented parser that silently reads the first is a parser that loses traces | green |
| TRC-9 | Every claim-bearing unit carries ≥1 trace | The backward direction. Full statement and decoy at CLM-7 | green |

## 7. LIM — limit lines

Fixed text, verbatim, from contract §4. Read out of the contract at test time; this suite holds no
copy.

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| LIM-1 | Origin `literature` carries its limit line | Byte-identical to contract §4's `literature` block | green |
| LIM-2 | Origin `findings` carries its limit line | Byte-identical to contract §4's `findings` block | green |
| LIM-3 | Arity: **one per origin present**, not one per trace | A five-trace literature answer carries the line once. **RED against contract version 1**, which reads "one per trace of the stated origin." See finding F7: repeating a 40-word paragraph after every trace is ceremony a reader skips, and a limit line a reader skips protects nobody. Close condition: contract amended to version 2. Owner: The Software Engineer | **RED** |
| LIM-4 | Origin `app` carries neither line | A limit line beside an app trace is a claim about a shelf that was not drawn from | green |
| LIM-5 | Origin `none` carries neither line | as above | green |
| LIM-6 | DECOY: byte identity, not paraphrase tolerance | Change one word of a real emitted `literature` limit line; LIM-1 must go red | green |
| LIM-7 | **Anti-drift** | The text compared against is read from `oracle/answer_contract.md` §4 at test time. A suite carrying its own copy is a second authority, and a second authority drifts — the failure `verify_figure.js` recorded, where the checker and the thing it checked agreed in prose for a whole step and disagreed in bytes | green |
| LIM-8 | A decorative limit line fails | A limit line present with no trace of its origin fails. Otherwise the line becomes a habit rather than a consequence | green |
| LIM-9 | The `findings` limit text is ratified | The prohibition's §9 is a closed list and is not a persona's to extend (finding F3, 1.3). Until The Editor or the author ratifies, LIM-2 is uncertified. **Human gate, not a script** | **H** |

## 8. VRD — verdicts and the wave selector

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| VRD-1 | The verdict set is exactly six | A seventh value fails. Closed set, not a default | green |
| VRD-2 | Classification precedes retrieval, observed | Stub every retrieval module to throw; the run still writes a verdict to the log row. The static form is INV-1 | green |
| VRD-3 | `APP` buys zero personas | Spawn count is 0 | green |
| VRD-4 | `FIGURE` buys zero personas | Spawn count is 0 | green |
| VRD-5 | `LITERATURE` buys exactly one | Spawn count is 1, and the persona is selected by the file's field label | green |
| VRD-6 | `BOTH` buys exactly one | Spawn count is 1 | green |
| VRD-7 | `CONTESTED` buys exactly two, in parallel | Spawn count is 2, and neither waits on the other | green |
| VRD-8 | `REFUSE` buys zero, for all six codes | Spawn count is 0 unconditionally. Six runs, one per reason code | green |
| VRD-9 | **DECOY: the two CONTESTED briefs are one-sided** | Neither brief contains the other side's member path. Splice the second path into brief one; VRD-9 goes red. Two agents that can see each other's side are one agent with a longer prompt **[4.1]** for the axis content; the splice mechanism is testable now against a stub axis | green |
| VRD-10 | `FIGURE` is not a variant of `APP` | A `FIGURE` run produces a manifest and a file and no chat block, under every condition in FIL-5 | green |
| VRD-11 | `APP_UNBUILDABLE` is not a verdict | The verdict enum has no such member. The condition produces `REFUSE` with reason `unbuildable`. Nothing selects a different wave or a different deliverable form on it, which is why it was cut at 1.3 | green |
| VRD-12 | The selector reads the verdict and nothing else | Static: the wave-selector module imports the verdict enum and imports no retrieval, lexicon or corpus module. A selector that re-derives is a second classifier | green |

## 9. REF — refusals

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| REF-1 | The reason-code set is exactly six | A seventh value fails | green |
| REF-2 | Exactly one code per refusal | Zero fails. Two fail. A refusal with two codes has two owners and therefore none | green |
| REF-3 | `excluded` fixture | A question naming a topic in the app's EXCLUSIONS register refuses with `excluded` | green |
| REF-4 | `not-found` fixture | No address resolves and no shelf file is confirmed | green |
| REF-5 | `unbuildable` fixture | An app address named in intent that the address grammar cannot build | green |
| REF-6 | `axis-incomplete` fixture | A register axis matched and a member path does not resolve on disk **[4.1]** | **[4.1]** |
| REF-7 | `misclassified` fixture | A searched retrieval returned a file that appears on the register **[4.1]** | **[4.1]** |
| REF-8 | `input-missing` fixture | A required input absent, empty, or unparseable | green |
| REF-9 | `unbuildable` never falls through to a shelf search | On FIX-4's run, assert the retrieval call count is zero. A fall-through here answers an app question from a summary, which is the authority rule violated in the direction nobody notices because the answer comes back cited and plausible | green |
| REF-10 | `axis-incomplete` never falls through to search | Retrieval call count zero **[4.1]** | **[4.1]** |
| REF-11 | `misclassified` is emitted, not swallowed | A register member surfacing from a searched retrieval produces the code and a log row **[4.1]** | **[4.1]** |
| REF-12 | Length: sixty words, excluding trace lines | Word count of the refusal body ≤ 60 | green |
| REF-13 | The cap relation holds between two constants, not two literals | 60 and 200 are read from contract §5 and §6 at test time; assert 60 < 200. Nothing compares two texts at run time | green |
| REF-14 | Retrieval: a refusal never issues a second retrieval | Retrieval call count ≤ 1 on every `REFUSE` run. A refusal that repairs a retrieval is a reconciliation, which classification-before-retrieval forbids | green |
| REF-15 | A refusal names three nouns | The absent object, the region searched, the nearest present object. **Checked on a structured refusal record with three named fields, from which the prose is rendered** — not on the prose. If the refusal is emitted as prose only, this test is not writable and the check is dropped rather than faked | green |
| REF-16 | **DECOY: the refusal that answers anyway** | Take a real refusal, splice in one claim-bearing sentence. The run must fail: grade `refused` forbids anything asserted anywhere in the same block. A refusal that smuggles a claim is the most expensive failure this system can produce, because it arrives with a `refused` grade attached | green |
| REF-17 | An empty corpus throws, never refuses confidently | An empty `literature/` produces the empty-population throw. A confident `not-found` over a corpus that was never read is a false negative wearing a reason code | green |

## 10. FIL — the deliverable is a file

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| FIL-1 | The file exists before any chat text is emitted | The emitter refuses a path that does not exist on disk. There is no path by which team prose reaches the user except through a file | green |
| FIL-2 | The chat block is a contiguous byte-identical substring | `file.includes(block)` is true | green |
| FIL-3 | A paraphrased block fails | DECOY: paraphrase one sentence of a real block; FIL-2 red | green |
| FIL-4 | A reflowed block fails | DECOY: rewrap one line of a real block; FIL-2 red. Reflowing is the edit an orchestrator makes without noticing it made one | green |
| FIL-5 | Block appears when the deliverable is under 200 words and unasked | Chat block present | green |
| FIL-6 | Haiku plus path when over 200 words and unasked | No chat block; a haiku and the file path | green |
| FIL-7 | Block appears when over 200 words and the user asked | Chat block present | green |
| FIL-8 | Block appears when under 200 words and the user asked | Chat block present | green |
| FIL-9 | A `FIGURE` deliverable has no chat form | No chat block under any of FIL-5..8's four conditions | green |
| FIL-10 | The haiku carries no claim | No numeral, no unit token, no coefficient name, no named source. Consumes `claim_bearing.js`; see CLM | green |
| FIL-11 | The haiku is 5-7-5 and holds zero newline characters | Both, on the same bytes | green |
| FIL-12 | An unknown word is a refusal to certify | English syllable counting is not decidable by algorithm. Feed a nonce word; assert no certification is issued. A missing input is a refusal, not a fallback, and that rule binds the checker as much as it binds the router | green |
| FIL-13 | The deliverable persists after the turn | The file is on disk after the run returns, at the path in the log row. See LOG-21 | green |
| FIL-14 | The orchestrator never edits the deliverable | Hash the file before emission and after; equal. An orchestrator that quietly rewrites a persona's prose to pass a register check has merged the two registers in the worst way — the team's words now come out of the Oracle's mouth and nobody can tell which sentences are whose | green |

## 11. CLM — claim-bearing, and the `verify_report.js` replacement post-condition

The author's ruling drops `verify_report.js`. Contract §7 states the definition in the contract's own
words, so these fourteen tests are the post-condition the replacement is built against. **They are
written before the replacement exists.**

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| CLM-1 | A numeral makes a unit claim-bearing | A unit holding a numeral is selected | green |
| CLM-2 | A unit token makes a unit claim-bearing | A unit holding a token from the app's unit list is selected | green |
| CLM-3 | A coefficient name makes a unit claim-bearing | A unit naming a coefficient from the app's coefficient list is selected | green |
| CLM-4 | A named source makes a unit claim-bearing | A unit naming a source from the app's reference list is selected | green |
| CLM-5 | The three lists are read out of the app, not typed into the checker | DECOY: add a coefficient to the app; the checker's list grows with no edit to the checker. A typed list is a copy, and a copy drifts | green |
| CLM-6 | Over-selection is preserved | A numeral that is a locator is still claim-bearing. A checker that gets clever and exempts line numbers fails. A unit wrongly called claim-bearing costs one trace; a unit wrongly excused costs the whole control | green |
| CLM-7 | The backward half: every claim-bearing unit carries ≥1 trace | DECOY: delete one trace line from a real answer; CLM-7 red | green |
| CLM-8 | The check is backward, not forward | A fabricated sentence arrives with no reference at all, and a forward-only check passes it. Run a no-reference decoy that a forward check would pass; CLM-8 must catch it | green |
| CLM-9 | The all-exempt failure case | A deliverable in which every unit is exempted **fails**, rather than passing with nothing checked. This is the test that catches a control disabled by its own escape hatch | green |
| CLM-10 | The exemption marker is a single closed form | An unrecognized exemption marker is a failure, not a silent exemption | green |
| CLM-11 | Exactly one implementation of §7 in the tree | Static: two definitions of the predicate fail. Two implementations of one definition is the defect the 1.12 counting-rule contract exists to remove, reproduced in code | green |
| CLM-12 | All three consumers import it | `verify_haiku.js`, `verify_register.js`, and the loop's I2 post-condition. A consumer carrying its own copy fails | green |
| CLM-13 | The checker's definition equals the contract's | Read from `oracle/answer_contract.md` §7 at test time. Same anti-drift device as LIM-7 | green |
| CLM-14 | `verify_report.js` is absent from the tree | Nothing imports, requires, extracts or reads it. DECOY: add a `require`; CLM-14 red. The author's ruling, given a test — a ruling with no test is a preference | green |

## 12. LOG — the run log

Two columns carry outcome, and neither is written by the other's author.

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| LOG-1 | `outcome` enum is exactly five | `ERROR`, `MISCLASSIFIED`, `REGISTER_FAIL`, `REFUSED`, `ANSWERED` | green |
| LOG-2 | `review` enum is exactly three | `unreviewed`, `confirmed`, `FILLED` | green |
| LOG-3 | `outcome` is single-valued | A row carrying two outcome values fails | green |
| LOG-4 | Precedence: `ERROR` over `MISCLASSIFIED` | A run that is genuinely both writes `ERROR` | green |
| LOG-5 | Precedence: `MISCLASSIFIED` over `REGISTER_FAIL` | as above **[4.1]** for the register half | **[4.1]** |
| LOG-6 | Precedence: `REGISTER_FAIL` over `REFUSED` | as above | green |
| LOG-7 | Precedence: `REFUSED` over `ANSWERED` | as above | green |
| LOG-8 | Precedence is a total order, spot-checked transitively | A run that is both `ERROR` and `ANSWERED` writes `ERROR`. Without this, two implementations differ on a run that is both an error and a refusal | green |
| LOG-9 | `FILLED` never appears in the `outcome` column | Over the whole log. DECOY: write `FILLED` into `outcome`; LOG-9 red | green |
| LOG-10 | `review` defaults to `unreviewed` | Every new row. The default is a claim: no person has read this row against its sources | green |
| LOG-11 | `FILLED` is not machine-assignable | Static: the log-writer module contains no code path emitting the literal. A column no machine writes to makes structural what the prototype declared in a comment | green |
| LOG-12 | The row schema is closed | Exactly the eight named fields. A ninth fails. Extending is a version bump | green |
| LOG-13 | Field: `timestamp` present and typed | ISO 8601, parseable | green |
| LOG-14 | Field: `question` present | The question text as asked, verbatim | green |
| LOG-15 | Field: `verdict` present | Drawn from VRD-1's six | green |
| LOG-16 | Field: `outcome` present | Drawn from LOG-1's five | green |
| LOG-17 | Field: `review` present | Drawn from LOG-2's three | green |
| LOG-18 | Field: reason code present **iff** verdict is `REFUSE` | Present on a non-refusal fails; absent on a refusal fails | green |
| LOG-19 | Field: `deliverable_path` present | A path string; resolution is LOG-21 | green |
| LOG-20 | Field: `contract_version` present, equals VER-1 | The third consumer of the version field | green |
| LOG-21 | **F5: the deliverable path resolves to bytes on disk** | Not presence of a string — the file opens. DECOY: delete the file; LOG-21 red. A row that cannot retrieve the bytes that were delivered cannot be sampled, and presence-of-a-string is the check that passes while the sampling protocol still cannot run. The prototype logs four fields and no path (`lsei/oracle/answer_question.js` line 589) | green |
| LOG-22 | The three sampling denominators are computable from these two columns alone | `FILLED` count, reviewed count, run count. Each a division over the log with no external input. "Three FILLED" is theater; "three FILLED out of forty sampled, of two hundred ten run" is a measurement | green |
| LOG-23 | An unrecognized outcome string is a finding, not a silent skip | Inherited from `verify_answers.js` and correct | green |
| LOG-24 | An empty log is reported as empty, never as a pass | The standing rule. A check that cannot fail is not a check | green |

## 13. INV — Level 2 invariants

Properties the loop holds on every run. No golden answer needed. Register invariants (I5) are absent
and attach at 4.1.

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| INV-1 | **I1. Classification precedes retrieval, statically** | The classifier module imports no retrieval module. A call-graph assertion over the source tree. Cheap, exact, and it upgrades the inherited rule from a convention somebody remembers into an architectural fact a build step enforces. **The one test I would keep if I could keep only one** | green |
| INV-2 | I1, transitively | No path of any depth in the import graph from the classifier to a retrieval module. A one-hop check is defeated by one intermediate module | green |
| INV-3 | I1 DECOY | Add the import; INV-1 and INV-2 both go red | green |
| INV-4 | **I2.** Every claim-bearing sentence carries a trace, over the live loop | CLM-7 applied to the whole generated population rather than to a fixture. Distinct test: a fixture proves the checker works, a population proves the loop obeys it | green |
| INV-5 | **I3.** Every trace carries exactly one legal grade, over the live loop | GRD-1, GRD-2 and GRD-9 applied to the whole generated population | green |
| INV-6 | **I4a.** Empty literature directory | The empty-population throw, never a confident `REFUSE` | green |
| INV-7 | **I4b.** Missing `lsei/index.html` | A refusal naming the missing clone, never a literature-only answer to a question that needed the app | green |
| INV-8 | **I4c.** A register file that does not parse | Startup refusal, not a run with the invariant silently disabled. **This is the one people forget and it matters most:** a register that silently parses to zero rows disables the entire contested-claims invariant while every other test in the suite still passes green. The file-does-not-parse half is testable now against an empty schema-conformant file; the content half is **[4.1]** | green |
| INV-9 | **I4d.** A register axis whose member path does not exist | Refusal for that axis, never a fall-through to search **[4.1]** | **[4.1]** |
| INV-10 | **I6.** Classification misses are counted, not hidden | A `MISCLASSIFIED` row is reported with its denominator, never as a bare count. A rising count is a register defect, and the register is the thing that gets edited | green |
| INV-11 | **Meta: every decoy applies** | For each decoy in this suite, assert the mutation actually changed the bytes it claims to change before asserting the test went red. **A decoy that fails to apply is a failure, not a skip.** This is the lesson `verify_figure.js` paid for: a `--prove` run against a hand-built stand-in returns a false green, and only a mutation of the real artifact discriminates | green |
| INV-12 | **Meta: no test passes on an empty population** | Every test declares its population; a population of zero is reported as empty, never as a pass | green |

## 14. FIX — Level 1 fixture questions

Sixteen questions drawn from the two 0.2 question surfaces, plus two decoys. Each fixture carries the
question text and its expected **verdict, resolved address, retrieved file set, outcome and trace
grades**. **No fixture carries expected prose.**

**There are no quantitative `LITERATURE` fixtures.** A fixture asserting a number lifted from a
summary rather than recomputed from the app is precisely the shape the inherited authority rule
forbids. Literature fixtures assert *retrieval and grade*, never values. This is what makes the
`lit_review: yes` gate tractable here: the only fixtures asserting quantities are APP fixtures, whose
primary source is the app's own `model()` and whose validation is a fresh recompute — the strongest
grade the system has.

| ID | Question | Expected | Primary source | Status |
|---|---|---|---|---|
| FIX-1 | "What is water output under Agency Led Baseline in 2040?" | `APP`; one `recompute-verified`/`app` trace; `ANSWERED` | `lsei/index.html` `model()`, recomputed at test time | green |
| FIX-2 | "What is construction potential at phi_c = 0.5?" | `APP`; one `recompute-verified`/`app` trace | `model()`, recomputed | green |
| FIX-3 | "How does water output vary across the ice rail?" | `FIGURE`; manifest verifies forward and recompute; a file, no chat block | `model()` over the `DETENTS` ice rail | green |
| FIX-4 | "How does water output vary across the landed-cost rail?" | `REFUSE`/`unbuildable`. **Never `LITERATURE`.** `landed_cost` is a `DETENTS` rail that `model()` does not accept as an input, so the sweep is not the same object as an ice sweep | `lsei/oracle/lib/address.js` error text — **UNVERIFIED** | green |
| FIX-5 | "What binds at low ice grade?" | `APP`; two traces — `recompute-verified`/`app` for the regime label, `resolution-only`/`app` for the stored prose. The label is computed and the prose is stored, and they are two grades | `model()` regime keys; app section text | green |
| FIX-6 | "Where does 37,000 kWh per tonne come from?" | **`BOTH`**; app fact first; one `app` trace for the value and status, one `literature` trace for the primary the governing section cites. Two distinct questions: what the model uses, and what was measured | `lsei/index.html` coefficient and status field — **UNVERIFIED**; the cited summary | green |
| FIX-7 | "How much ice is in Cabeus?" | `LITERATURE`; `resolution-only`/`literature`. **The trap:** `ice` is an app *input* with a `DETENTS` rail, so a grade question finds a knob with the right name and no computation behind it. An `APP` verdict here is a failure | the named summaries; the app's `ice-grade-evidence` section is *not* authority | green |
| FIX-8 | "What TRL is molten regolith electrolysis?" | `LITERATURE`; `resolution-only`/`literature`; the app computes nothing here | the named summaries | green |
| FIX-9 | "Who owns lunar resources under the Outer Space Treaty?" | `REFUSE`/`excluded`; names the EXCLUSIONS register entry | the app's EXCLUSIONS register — **UNVERIFIED** | green |
| FIX-10 | "What is the propellant margin under Commercial Led in 2055?" | **Never `LITERATURE`.** `REFUSE`/`unbuildable` while `valueModel()` is unreachable; `APP` once it is extracted. **The invariant that holds across both is the assertion.** This fixture pins loose end C1, the most serious defect found in the prototype: `app_model.js` extracts `model()` but not `valueModel()`, so the app's whole economic half is unreachable and the router does not refuse — it answers an app question from a summary | `lsei/oracle/lib/app_model.js` — **UNVERIFIED** | green |
| FIX-11 | "How much of Japan's 1960–73 growth was capital and how much was productivity?" | `LITERATURE`, Japanese branch; the field label routes the economics persona; retrieval and grade asserted, **no number asserted** | `jorgenson-2005-industry-origins-japan` summary | green |
| FIX-12 | "Did Japanese industrial policy raise productivity?" | `LITERATURE` today; retrieval and grade only. **Re-classified to `CONTESTED` at 4.1** when the register lands, and loose ends B6 and B7 both bear on the axis. Recorded here so the reclassification is a scheduled edit rather than a surprise | the named summaries | green |
| FIX-13 | "Did technology licensing raise TFP in Japan?" | `LITERATURE`; retrieval and grade only | `kiyota-2005-foreign-technology-acquisition` | green |
| FIX-14 | "How fast has a real economy ever deepened capital?" | `LITERATURE`; retrieval and grade only | the named summaries | green |
| FIX-15 | "Does the Japanese absorption mechanism apply to a lunar industrial base?" | `LITERATURE`, both fields, or `REFUSE`/`not-found` pre-merge. The cross-domain class the merge exists for; **`APP` is a failure** | both shelves | green |
| FIX-16 | "What is the energy cost of water extraction in kWh/kg?" where the corpus states the figure in g/kWh | The figure is quoted **in the source's own units, never converted**. A converted number has no locator that resolves — the file does not contain those bytes — so it is not merely ungraded, it is untraceable by the check that already exists. **DECOY: emit the converted figure; the run must fail on ORG/TRC, not merely warn.** Derived arithmetic is a deliverable, not a trace | the named summary, in its own units | green |
| FIX-17 | **The `BOTH` falsifier.** FIX-6 run with the `literature/` shelf removed | The run loses a distinct answer and says so: refuses the shelf half by name, never returns the app half as a complete answer. **A trivially-passing FIX-17 is the falsifier firing** — it means `BOTH` was `APP` plus an aside, and the term collapses into `APP` with an optional shelf trace, taking the verdict set to five and the contract to version 2 | FIX-6's two sources | green |
| FIX-18 | **The app-versus-literature contest.** A question where a summary carries a number the app also carries | **`APP`, one trace, and the literature figure never appears as a second sentence.** A direct test of an inherited rule that has no other test. DECOY: splice the summary's figure in as a second `BOTH` sentence; the run must fail on RV-02 | `model()` for the app figure; the summary for the competing one | green |

<!-- END oracle/tests/answering_loop_suite.md -->

---

## 4. Source verification ledger, for The Fact-Checker in Wave 2

`lit_review: yes` is set, so A.10 step 2 binds. I cannot run the gate on my own tests — the gate
exists because the author of a test is the wrong person to verify it — so every test asserting a
quantitative or technical fact is listed here with the source it claims and its status. **The
Fact-Checker runs the gate.**

**Verified by me in this session, with the command, because I ran it rather than inheriting it:**

| Test | Claim | How verified |
|---|---|---|
| TRC-4, TRC-5 | `lsei/oracle/answer_question.js` emits grade-first at line 421 and kind-first at 392, 395, 400, 414 | Read the file at those lines. Line 421 is `'\nTrace (resolution-only, app-stored prose): '`; the others are `Trace (citation, resolution-only)` and `Trace (scalar, recompute-verified)`. F4 confirmed as reported |
| LOG-21 | The prototype run log carries four fields and no deliverable path | `appendRunLog` is called at line 589 with `{timestamp, question, verdict, outcome}` and at 592 with the error variant. F5 confirmed |
| §2.5, M8 | The digits-only lint regex misses the live instance; the spelled-number form without `\b` produces a false positive on `someone` | Both run. Without `\b`: `echo "someone lines above the fold"` returns `1:one lines above`. With `\b`: exit 1. With `\b` over the project's `.md` files excluding `lsei/` and `cr-agents/`: ten hits including `Twelve lines above` at `step1_12_designer_counting_rule.md:322` |

**UNVERIFIED. Every one of these is a technical fact I took from another persona's report and did not
open the file to confirm. Each is flagged, and none of them is load-bearing for a test that asserts a
number — they are all shape claims about the prototype.**

| Test | Claim | Named primary source | Whose report |
|---|---|---|---|
| FIX-4 | `landed_cost` is a `DETENTS` rail that `model()` does not accept as an input, and `address.js` says so in its own error text | `lsei/oracle/lib/address.js`, `lsei/index.html` `DETENTS` | The Space Resources Engineer, 0.2 §1 L3 — **UNVERIFIED** |
| FIX-6 | The app carries a 37,000 kWh/tonne coefficient with a status field and a governing section | `lsei/index.html` | The Space Resources Engineer, 0.2 §1 L4 — **UNVERIFIED** |
| FIX-7 | `ice` is an app input with a `DETENTS` rail of [1, 2, 5, 10, 20] wt% and no computation behind it | `lsei/index.html` | The Space Resources Engineer, 0.2 §1 L5 — **UNVERIFIED** |
| FIX-9 | Three of the app's ten exclusions cover demand, market, programme and law | the app's EXCLUSIONS register | The Space Resources Engineer, 0.2 §1 L9 — **UNVERIFIED** |
| FIX-10 | `app_model.js` extracts `{model, CONFIG, DETENTS, ENVELOPE, PRESETS}` and not `valueModel`, and grepping for `valueModel`, `margin` or `value_prop` returns zero hits | `lsei/oracle/lib/app_model.js`, `lsei/oracle/lib/address.js` | The Space Resources Engineer, 0.2, loose end C1 — **UNVERIFIED**. This is the single most consequential unverified claim in the suite: FIX-10 is the fixture that pins C1, and if the extraction is actually present the fixture's expected verdict is wrong from the start |
| FIX-11, FIX-13 | The named summaries exist under the stated slugs and say what the fixture claims about *topic*, not about value | `jorgenson-2005-industry-origins-japan`, `kiyota-2005-foreign-technology-acquisition` in `_intake/japanese-miracle/lit/` | The Growth Economist, 0.2 §1.1 and §1.3 — **UNVERIFIED**. Per A.10 step 2 the fixture author must have opened the summary; these files move at the merge, so verification is cheapest **after** 2.16 rebinds the paths, and I recommend the gate runs then rather than against `_intake/` paths that will not survive |
| FIX-12 | The industrial-policy axis is a live disagreement in the corpus | loose ends B6 and B7 | The Fact-Checker at 0.5 ruled the exemplar pair *not* contested and the corpus one-sided. **The fixture is written to `LITERATURE` today precisely because of that ruling**, so B6/B7 are load-bearing and were verified by her, not by me |

**One structural note for the gate.** Twelve of the eighteen FIX rows assert nothing quantitative at
all — they assert a verdict, a trace count and a grade. Those are properties of the loop, not facts
about the world, and A.10 step 2 does not reach them. The gate's real surface here is six rows, and
five of the six are shape claims about one file, `lsei/oracle/lib/app_model.js`. If The Fact-Checker
opens one file, that is the file.

---

## 5. Findings, and requirements this places on other sub-steps

### 5.1 Findings

**F7. Contract §4's limit-line arity is wrong, and it is my own text.** "One per trace of the stated
origin" means a five-trace literature answer repeats a forty-word paragraph five times. A reader
skips the second one and every one after it, and a limit line a reader skips protects nobody — which
is the entire warrant for the line existing, as The Editor argued when he demonstrated rather than
asserted that the prototype's LIMIT line survives the prohibition. **Ruled: one per origin present in
the deliverable.** LIM-3 is written to the corrected rule and is **RED until the contract is amended
to version 2**. I am leaving it red rather than writing it to the frozen rule, because a test that is
red on purpose with a named owner and a named close condition is a stronger finding than a paragraph,
and because writing it to the rule I believe is wrong would bake the defect into the contract every
mechanism is built against. My simplicity gate fired on my own frozen text; that is what it is for.

**F8. `verify_report.js`'s replacement has a post-condition but no builder, and the gap is two steps
wide.** Detailed at §2.3. Recommendation: one row, `oracle/lib/claim_bearing.js`, placed in Step 3
before 3.9. The Manager decides at the Step 1 close.

**F9. M5 of the 1.12 counting-rule spec executes shell strings harvested from markdown, and 2.14
would wire it to a git hook.** Detailed at §2.5. Ruled: `--live` flag, never `--check`, never the
hook. This is a change to another persona's frozen deliverable and I am recording it as a finding
rather than editing his file.

**F10. F4 and F5 are both discharged as tests here, and neither is repairable at source.** The
defects live in `lsei/`, a read-only working copy this project borrows and must never push to. They
close when 3.8 and 3.9 rebuild the router against this contract, and TRC-4, TRC-5 and LOG-21 are what
make the rebuild not reproduce them. Recorded so that nobody later reads "F4 is a test" as "F4 was
fixed."

### 5.2 Requirements placed on other sub-steps

**On 1.13 (the check register), five rows.** Every mechanism this suite is the contract for needs an
entry: `gen_matrix.js` (what it generates, that the contract is its input, that a contract edit trips
RG-13/RV-34), `claim_bearing.js` (pending F8's row), `verify_haiku.js`, `verify_register.js`, and the
suite runner itself. E8's complaint — a check nothing wires up is not a mechanism — applies to this
suite as much as to `tools/`. **A 200-test suite nothing invokes is a 200-line document.**

**On 4.1 (LOOP-7, the register amendment), the attachment points, named so they are not re-derived.**
Eight tests are marked **[4.1]**: RV-27 (same-side detection, needs the register's side field, and it
is loose end B6's test), REF-6, REF-7, REF-10, REF-11, LOG-5, INV-9, and the content half of INV-8
and VRD-9. Plus I5 wholesale — one fixture per axis and the deletion decoy — which is 4.1's own
charge and is not counted in the 200. **4.1 goes through A.10 step 5's revision gate and step 2's
source-verification gate**, because it modifies a suite that is already the contract and because each
register fixture cites a summary.

**On 3.7 (LOOP-4, retrieval), a dependency on this file that runs the other way.** The confirmation
threshold is set from this suite's fixture set rather than by hand, and 3.6 (LOOP-4t) builds the
labelled question set that tunes it. The eighteen FIX rows are the seed for 3.6, not a substitute for
it: eighteen fixtures do not tune a threshold, and 3.6 exists because they do not.

**On 3.9 (LOOP-6, the wave selector), one post-condition.** VRD-12 is static and belongs to that step
rather than to a later audit: the selector imports the verdict enum and no retrieval, lexicon or
corpus module. A selector that re-derives the verdict is a second classifier, and the second one will
not be the one the log records.

**On The Manager at the Step 1 close, two decisions.** F8's row, placed or declined. F7's contract
amendment to version 2, ratified or refused — and if refused, LIM-3 is deleted rather than rewritten
to the rule I believe is wrong, and this finding stands in the register instead.

---

*The Software Engineer, sub-step 1.11, Group 1.*
