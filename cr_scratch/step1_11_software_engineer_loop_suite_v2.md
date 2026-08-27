# Step 1.11 v2, The Software Engineer: reconciling the suite to answer contract version 2

**Persona:** The Software Engineer
**Sub-step:** 1.11 (origin LOOP-3), reconciliation pass
**Reconciles:** `cr_scratch/step1_11_software_engineer_loop_suite.md` (the v1 suite, 200 tests)
**Against:** `cr_scratch/step1_8_software_engineer_register_schema.md` §1.9, amendments V1–V4, read
directly rather than from the coordinator's summary
**Date:** 2026-08-26

**The v1 suite survives unedited.** This file is a delta. **Twenty-five test ids are touched:**
**twelve amended, twelve added, one retired.** Net +11, so 211. Counting rule: ids appearing in this
file's amendment tables, plus VER-2 and LOG-20, which are amended in prose in §1 and §7 and carry no
table row. The other 187 v1 tests are untouched and are not restated here.

---

## 0. The delta in one table

| Group | v1 | v2 | What moved |
|---|---|---|---|
| VER | 3 | 3 | VER-2's asserted value: 1 → 2 |
| RV | 34 | 36 | V3 flips one cell legal; two cells added; **the generator needs a third column** |
| VRD | 12 | 13 | V1 breaks the arity of VRD-7 and VRD-9; V2 adds VRD-13 |
| REF | 17 | 18 | V4 replaces REF-7 and REF-11's condition; REF-18 added, and it is the test that pins V4 |
| LIM | 9 | 11 | The one-side disclosure is a third fixed text; **LIM-3's close condition was badly written and is re-aimed** |
| TRC | 9 | 11 | Not an amendment — the Systems Engineer's 1.4 marker rule, applied to my own suite |
| INV | 12 | 14 | Not an amendment — the `.gitignore` finding, as a loop invariant |
| FIX | 18 | 19 | 1.8's named highest-value register decoy |
| FIL, LOG, ORG, RG, GRD, CLM | 86 | 86 | Four pass criteria strengthened under the marker rule; no count change |

**211 tests**, of which 49 are generated (RG 13 + RV 36) and **162 are hand-authored**. v1's figures
were 200 / 47 / 153.

**Same counting rule as v1**, applied to v1's fourteen tables plus this file's amendment tables: rows
whose first cell matches `^[A-Z]{2,3}-[0-9]+$`. Arithmetic in §7.

---

## 1. (a) The version assertion, and what the generator actually has to do

**VER-2 asserts 2.** One character. VER-1 and VER-3 are unchanged — VER-3's decoy is still "increment
the integer and watch VER-2 go red," and it has now been demonstrated in production before any code
exists, which is the first time in this project that field has caught anything.

**RG is untouched by all four amendments.** Twelve cells, five legal. Rule G grades by origin, and no
amendment touched the origin/grade relation. RG-13 unchanged.

**RV regenerates, and the generator is not free.** I built the matrix generated rather than copied for
exactly this case, so the cells cost nothing to move. But the honest answer to "confirm the generator
reads the amended tables" is that **it does not, as written.**

> The v1 generator parses Rule V's table as two columns, Required and Forbidden, and emits one cell
> per required origin, one per unmet requirement, and one per forbidden origin. **Amendment V3
> introduces a third state — permitted, and never counted as a side — which is neither column.** A
> two-column parser reads the amended table, finds `findings` absent from both columns, and emits the
> v1 cell list against the v2 contract. It does not fail. It silently returns 33 cells and a green
> run.

That is a generator agreeing with the contract in prose and disagreeing in bytes, which is the
`verify_figure.js` failure in the one place I claimed immunity from it. **Fix: Rule V's table in the
contract gains a third column, `Permitted, not counted`, and `gen_matrix.js` emits one cell per entry
in it.** One column and one loop. Cheap, but not zero, and RV-37 is what makes the omission fail
loudly instead of quietly.

**New cell counts: 35 cells, 10 legal.** Derivation, so it can be checked rather than believed:

| Verdict | Legal | Unmet | Forbidden | Permitted-not-counted | Cells |
|---|---|---|---|---|---|
| `APP` | 1 | 1 | 3 | 0 | 5 |
| `FIGURE` | 1 | 1 | 3 | 0 | 5 |
| `LITERATURE` | 3 | 1 | 2 | 0 | 6 |
| `BOTH` | 2 | 2 | 1 | 0 | 5 |
| `CONTESTED` | 2 | 3 | 2 | 1 | 8 |
| `REFUSE` | 1 | 2 | 3 | 0 | 6 |
| | **10** | **10** | **14** | **1** | **35** |

Plus RV-37, the generator's own test. **RV group: 36.**

### Amended and added RV cells

| ID | Verdict | Origin multiset | Expected | Status |
|---|---|---|---|---|
| RV-25 | `CONTESTED` | `{literature, literature, findings}` | **AMENDED — was illegal, now legal.** V3: a `findings` trace may appear and never counts as a side. The blanket ban was mine and it was too strong. It meant this project's own adjudication could never be shown beside the contest it adjudicates, which is where it is most useful and, under the `findings` limit line, where it is most clearly labelled as the project's own view rather than a source's | green |
| RV-35 | `CONTESTED` | a `findings` trace **satisfying** a side | **illegal.** V3's companion, and the cell that stops V3 becoming a hole. "Permitted, and never counted" is two claims; without this cell only the first is tested | **[4.1]** |
| RV-36 | `CONTESTED` | an N-sided axis with N−1 sides traced | **illegal.** V1's real content in Rule V: the requirement is one `literature` per side, not two traces. On a three-sided axis, two traces is one-sidedness with an extra source | **[4.1]** |
| RV-37 | The generator itself | `gen_matrix.js` parses §3's Rule V table **including its third column** and emits exactly 35 cells of which exactly 10 are legal. A parser ignoring the third column emits 33 and must fail here | green |

RV-34 (v1's generator test, "33 cells, 9 legal") is superseded by RV-37 and retired. RV-27 (same-side
detection, loose end B6's test) is unchanged and remains **[4.1]**. Net: 34 → 36.

---

## 2. (b) The persona count: what asserted two, and what asserts one-per-side now

**The anti-synthesis argument survives untouched; the arity does not.** My Step 0 §2 rule was that a
single agent handed both sides will synthesize, and synthesis is the arbitration the register exists
to prevent. That argument is about *isolation*, not about the number two, and V1 does not touch it.
What V1 kills is the constant.

**Two tests asserted the number. Both are wrong and both are fixed.**

| ID | v1 | v2 | Status |
|---|---|---|---|
| VRD-7 | `CONTESTED` buys exactly two, in parallel. **Spawn count is 2** | `CONTESTED` buys **one persona per side, minimum two, no cap.** Spawn count equals the axis's distinct `M.side` count and is ≥ 2. Truncating to two would be the router silently choosing which sides the user hears, which is the one-sidedness the register exists to prevent. **10 of 15 lunar axes carry more than two labelled sides** [Q-LCC-SIDES-GT2], so this fires on the majority of the register rather than on an edge case | **[4.1]** for the side count; the ≥2 floor is testable now |
| VRD-9 | Neither brief contains **the other side's** member path | **No brief contains any other side's** member path. Generalized from a pair to a set: over N briefs the pairwise intersection of member paths is empty. The decoy is unchanged in kind — splice one path into one brief — but it now has N(N−1)/2 places to hide rather than one, which is why the pairwise form is the one to build | green |

**One test added, for V2:**

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| VRD-13 | A `one_sided` axis cannot produce `CONTESTED` | `CONTESTED` fires only on class `two_sided` or `false_pair`. A `one_sided` axis produces `LITERATURE` or `BOTH`, carrying its side and the one-side disclosure. Rule V requires one `literature` per side and a one-sided axis has one side, so the run would be **unsatisfiable rather than wrong** — and an unsatisfiable requirement fails as a refusal with no reason code, which is the worst failure available | **[4.1]** |

**Nothing else in the suite counted personas.** VRD-3 through VRD-6 and VRD-8 assert zero or one and
are unaffected. Checked by reading every occurrence of a persona count across the VRD, RV and FIX
tables.

---

## 3. (c) LIM-3, and a close condition that could be satisfied without closing

**I did not fix limit-line arity in v2, and the reason is not a defence.** 1.8 and 1.11 ran in
parallel in the same group. F7 was found at 1.11 and 1.8 was frozen before it landed; neither self saw
the other's output. The point stands on the merits: a contract being amended anyway is the cheapest
place to correct a rule already ruled against, and I missed the window because the two halves of me
were not talking.

**I am not taking a second unilateral amendment, and the reason is real rather than squeamish.** V1
through V4 each carry a measurement — 10 of 15 axes, 53 of 152 files, 31 of 110 keys. F7 carries an
editorial argument: a forty-word paragraph repeated after every trace is skipped by the reader it
exists to protect. That argument is The Editor's to rule, and **LIM-9 already routes the `findings`
limit line to him for exactly this reason** — the prohibition's §9 is a closed list, and re-arity-ing
a fixed line is no more a persona's to do than extending the list. F7 rides that envelope. It costs
one sentence in a pass that is already happening.

**The reconciliation caught something worse than the missed window, and it is in my own test.**

> LIM-3's v1 close condition read *"contract amended to version 2."* **The contract has now been
> amended to version 2 and LIM-3 did not close.** A close condition that can be satisfied in full
> while the finding it guards goes untouched is not a close condition; it is a date. I wrote it, and
> it failed against the first amendment that came along.

| ID | v2 text | Status |
|---|---|---|
| LIM-3 | Arity: **one per origin present**, not one per trace. **RED against contract version 2.** Close condition, re-aimed: *The Editor or the author rules on limit-line arity, in the same pass that ratifies the fixed texts at LIM-9 and LIM-11.* Not a version bump — a named person's ruling. If the ruling upholds "one per trace," LIM-3 is **deleted** rather than rewritten to a rule I believe is wrong, and F7 stands in the register as a recorded disagreement | **RED** |

**Two tests added, because V2 introduces a third fixed text.** The one-side disclosure is the same
kind of object as the two limit lines and gets the same treatment, including the same gate.

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| LIM-10 | A `one_sided` axis carries the one-side disclosure, once per answer | Byte-identical to the fixed text in `oracle/register_schema.md` §7, **read from that file at test time**, never from a copy held here. It names no source and asserts nothing about the world, so it is not claim-bearing and carries no trace — LIM-10 asserts that too, because a fixed line that quietly acquires a trace has become a claim | **[4.1]** |
| LIM-11 | The one-side disclosure is ratified | Same gate as LIM-9, on the same footing: a request, not a ratification. Until The Editor or the author rules, LIM-10 is uncertified. If refused, `one_sided` still functions — the axis is named, the single side is delivered, no second side is fabricated — and the reader loses the sentence explaining why only one side appeared | **H** |

---

## 4. (d) V4: the `misclassified` condition, and the test that pins it

Not re-litigated. Taken as ruled; the pass criteria follow.

| ID | v2 pass criterion | Status |
|---|---|---|
| REF-7 | **AMENDED.** Fires when a returned file belongs to an axis whose `match_keys` this question touched at **any nonzero overlap**, while classification did not fire that axis at its stated firing rule. Not "is this file on the register." The band between the two thresholds is the classifier's admitted uncertainty, and that band is the whole content of the check | **[4.1]** |
| REF-11 | **AMENDED.** Same join, same direction. Owner unchanged and still `match_keys`, which is the point of the code existing | **[4.1]** |
| REF-18 | **ADDED, and it is the test that makes V4 a fix rather than a rewording.** `probe_neg`: a question that touches a member file and is **not** about the axis must be **answered, not refused**. Under the v1 condition, 53 of 152 files carry a block [Q-REG-BLOCK-CARRIERS] and every question retrieving one of them refuses — a third of the corpus radioactive for all of its content. This is the false-refusal defence, and 1.8 supplies the questions rather than my inventing them | **[4.1]** |

**The suite inherits 64 fixtures it does not have to invent.** 1.8's `probe_pos` and `probe_neg` are
32 positive and 32 negative, authored by the people with the phrasing knowledge, at the moment they
had it. They are register fixtures and attach at 4.1; they are **not** counted in the 211, and I name
them here so 4.1 does not re-derive a fixture set that already exists.

---

## 5. Two things from elsewhere, both of which found real gaps

### 5.1 The `.gitignore` finding is a loop invariant, and the suite carries it

Right that it belongs here rather than in the taxonomy: **a missing `FIELDS.tsv` degrades retrieval
silently rather than failing loudly**, and silent degradation is precisely what Level 2 invariants
exist to make impossible. My own register escapes by moving to `oracle/`; that escape is a claim and
gets asserted rather than assumed.

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| INV-13 | The corpus's machine-readable inputs survive a fresh clone | `git check-ignore` reports *not ignored* for `literature/FIELDS.tsv`, `literature/INDEX.tsv` and `oracle/REGISTER.tsv` against the committed `.gitignore`. `literature/` is deny-by-default admitting `*.md` only — written for a shelf of summaries, and it excludes **by extension** every machine-readable file the corpus needs. Container-versus-content, instance six | green |
| INV-14 | A missing machine-readable input is a startup refusal, never a degradation | Fault injection, one run per file: delete `FIELDS.tsv` and assert the loop refuses at startup naming the file, rather than running with field-scoped IDF silently disabled and returning confident cross-field answers. **This is the more valuable half and it is independent of the `.gitignore`** — INV-13 closes today's instance, INV-14 closes the class | green |

INV-14 is INV-8's sibling and rests on the same argument: a register that silently parses to zero rows
disables the whole invariant while every other test passes green.

### 5.2 The marker rule, run against my own suite: four strengthened, one hole

The Systems Engineer's 1.4 rule — every dependency assertion asserts a marker inside the file, never
the file's existence, because `test -f` passes against an empty file, a truncated download or an error
page. Run against v1 it finds four tests to strengthen and **one genuine hole.**

**Four strengthened in place, no count change:**

| ID | v1 | v2 |
|---|---|---|
| FIL-1 | The emitter refuses a path that **does not exist** | The emitter refuses a path that does not **hold a deliverable**: non-empty, and carrying at least one trace line or a refusal record. An empty file satisfies the v1 criterion, and the haiku-plus-path case is exactly where an empty file goes unnoticed, because nobody opens the file |
| FIL-13 | The file is **on disk** after the run returns | The bytes on disk after the turn **hash-equal the bytes delivered**. FIL-14's device applied at a later time. Persistence of a path is not persistence of a deliverable |
| LOG-21 | The deliverable path **opens** | The path opens **and holds the run's own marker** — the verdict token, or a trace line. An empty file opens, and a log row pointing at an empty file cannot be sampled either, which was the entire content of F5 |
| INV-7 | Missing `lsei/index.html` → refusal | Missing **or present-but-wrong**. An `index.html` that parses as HTML and holds no model satisfies a `test -f`. Fault injection runs both, and the marker is `KNOB_DATA`, per bootstrap assertion BC-14 |

**The hole: `resolution-only` is defined in two halves and the v1 suite tested neither.**

Contract §2 says `resolution-only` qualifies when "the path exists **and the named text is present at
it**." v1 asserts the grade *token* (GRD-1, GRD-2), the *grammar* (TRC-1..3), and the *origin*
computed from the locator (ORG-1..8). **Nothing asserted that a `resolution-only` trace resolves.**
The grade carrying every literature and findings answer in this system was tested for spelling.

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| TRC-10 | A `resolution-only` locator's path resolves | The path exists in the leaf index. Half the definition, and the weaker half | green |
| TRC-11 | **The named text is present at it** | The matched topic words are present in the file's body. **Without this, `resolution-only` means `test -f` wearing a grade word** — and the LIMIT line beside it, which promises the reader the file resolves *and* that its body contains the matched topic words, is asserting something nothing checks. A fixed text making a claim the mechanism does not support, in the one place this project has been most careful. DECOY: point a real trace at a file that resolves and does not contain the words; TRC-11 red, TRC-10 green | green |

TRC-11 is the highest-value test added in this pass, and it is not an amendment — it was missing from
v1, and another persona's rule is what surfaced it.

---

## 6. One fixture added

| ID | Question | Expected | Primary source | Status |
|---|---|---|---|---|
| FIX-19 | **1.8's named highest-value register decoy.** A real `CONTESTED` answer with one side's trace deleted | Must fail Rule V's side count. RV-36's abstract form made concrete by mutating produced output, per the house style. **If it passes, the register invariant is decorative.** Built by deletion from a real answer, never by constructing a one-sided answer — a constructed one-sided answer proves only that the constructor can count | the axis's own member summaries | **[4.1]** |

---

## 7. Count verification

```
v1 suite                                                     200
  RV    34 -> 36   (RV-34 retired; RV-35, RV-36, RV-37 added)   +2
  VRD   12 -> 13   (VRD-13)                                     +1
  REF   17 -> 18   (REF-18)                                     +1
  LIM    9 -> 11   (LIM-10, LIM-11)                             +2
  TRC    9 -> 11   (TRC-10, TRC-11)                             +2
  INV   12 -> 14   (INV-13, INV-14)                             +2
  FIX   18 -> 19   (FIX-19)                                     +1
                                                             ----
v2 suite                                                     211
  generated (RG 13 + RV 36)                                     49
  hand-authored                                                162
```

**Amended in place, no count change: twelve.** RV-25, VRD-7, VRD-9, REF-7, REF-11, LIM-3, FIL-1,
FIL-13, LOG-21, INV-7 in the tables above; plus VER-2 and LOG-20, amended in prose, whose asserted
version moves to 2. **Added: twelve. Retired: one** (RV-34, superseded by RV-37).

**[4.1] attachment points: 9 in v1, 19 in v2.** Every test V1–V4 touched needs the register to run,
which is the expected shape — the amendments are all about the register — and it means **the
reconciliation is mostly a promise 4.1 has to keep** rather than work that lands at 3.9. Named so 4.1
inherits a list rather than a search: RV-27, RV-35, RV-36, VRD-7 (side-count half), VRD-9 (axis-content
half), VRD-13, REF-6, REF-7, REF-10, REF-11, REF-18, LIM-10, LIM-11, LOG-5, INV-8 (content half),
INV-9, FIX-19, plus the 64 `probe_pos`/`probe_neg` fixtures 1.8 authored.

---

## 8. Findings from the reconciliation

**F11. A close condition that names a version bump is a date, not a condition.** LIM-3's close
condition was satisfied in full by V1–V4 while the finding it guards went untouched. Re-aimed at a
named person's ruling. Worth generalizing: this suite carries two human gates, LIM-9 and LIM-3. LIM-9
is aimed at a person and is written correctly; LIM-3 was aimed at an event and was not.

**F12. The generated matrix was not as free as I claimed.** V3 introduces a third state a two-column
parser drops silently, emitting the v1 cell list against the v2 contract and returning green. Fixed by
a third column and RV-37. **The lesson is narrower than "generation is unsafe":** a generator is safe
against changes in its table's *rows* and unsafe against changes in its table's *shape*, and only the
second kind needs a test. RV-37 is that test, and v1 did not have it in that form.

**F13. `resolution-only` was tested for spelling and not for resolution.** TRC-10 and TRC-11. Found by
running another persona's rule over my own suite rather than by reviewing my suite again myself, which
is the argument for the rule existing and for the A.9 tension that produced it.

**F14. F7 missed its window because two instances of one persona ran in parallel and neither saw the
other.** Not a process complaint — the parallelism is the method working. But 1.8 amended the contract
1.11 was writing tests against, in the same group, and **the only thing that made the collision
visible was the version field**. Recorded as evidence that the field earns its keep, and as the reason
a sub-step amending a frozen contract must name every parallel sub-step written against it. 1.8 did,
in its §5.3. That is why this reconciliation is a delta and not a rewrite.

---

*The Software Engineer, sub-step 1.11 reconciliation, Group 1.*
