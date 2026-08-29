
# The answering-loop test suite

**Written against answer contract version 2.** Levels 1, 2 and the two Step 4 amendments.
**Register fixtures landed at 4.1 (LOOP-7) as section 15, and the three-named-facts assertion landed
at 4.7 (LUNAR-6) as section 16.** All fourteen `[4.1]` attachment points in the tables below are
resolved: thirteen to `green`, and **LIM-10 to `RED`** — the one-side disclosure is a fixed text that
the closed list of permitted self-statements has never ratified, and a status assigned before the
ratification is the FIX-9/FIX-10 defect a third time.

**266 tests**, of which 84 are generated (RG 13 + RV 36 + RFX 35) and 182 are hand-authored.
Counting rule, unchanged from version 1 except that the id pattern now admits a four-letter prefix:
rows in the sixteen tables below whose first cell matches `^[A-Z]{2,4}-[0-9]+$`. Per group: VER 3,
ORG 11, RG 13, RV 36, GRD 10, TRC 12, LIM 11, VRD 13, REF 20, FIL 14, CLM 14, LOG 25, INV 15,
FIX 19, RFX 35, ISR 15. The figures were counted by running the counting rule over this file, not by
adding up a delta.

**RFX is generated the way RG and RV are, and from the same kind of source.** RG and RV are emitted
from the contract's own Rule G and Rule V tables; RFX is emitted from the two register files. None of
the three is transcribed, and a contract or register edit that changes them changes the suite.

**Version 2 reconciliation, landed at the Step 1 close as revision item R-3.** The version field did
what it was built to do: it caught this suite disagreeing with its contract before any code existed,
twice — once when 1.8 amended the contract in the group this suite was written in, and once when the
contract landed at version 2 while this file still pinned 1. Both are fixed here in one pass. What
moved: the RV matrix's shape and three cells; the `CONTESTED` persona arity; `one_sided`; the
`misclassified` condition; `excluded`'s precedence; the app-ref clause and the run log's ninth field;
two fixtures that were carried green and were failing their own stated invariants; and every close
condition in the file, re-aimed at an observation.

**Two fixtures moved from `green` to `RED` and that is the most important line in this file.** FIX-9
and FIX-10 were both marked green against a prototype that fails them. A fixture marked green is a
claim that the suite has looked; these two had not been run, and when The Fact-Checker ran them at
the Wave 2 gate both came back wrong — one `CONTRADICTED` on its source, one `VERIFIED` and worse
than its author wrote it. **Status is an assertion, not a hope**, and a fixture whose status was
assigned before the run is the same defect as a check that cannot fail.

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

**Thirty-five cells** from six verdict rows, produced by the same generator from the Rule V table,
plus one test of the generator. Derivation, so it can be checked rather than believed:

| Verdict | Legal | Unmet | Forbidden | Permitted, not counted | Cells |
|---|---|---|---|---|---|
| `APP` | 1 | 1 | 3 | 0 | 5 |
| `FIGURE` | 1 | 1 | 3 | 0 | 5 |
| `LITERATURE` | 3 | 1 | 2 | 0 | 6 |
| `BOTH` | 2 | 2 | 1 | 0 | 5 |
| `CONTESTED` | 2 | 3 | 2 | 1 | 8 |
| `REFUSE` | 1 | 2 | 3 | 0 | 6 |
| | **10** | **10** | **14** | **1** | **35** |

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
| RV-25 | `CONTESTED` | `{literature, literature, findings}` | **legal. AMENDED at version 2 — was illegal.** A `findings` trace may appear on a contested answer and never counts as a side. The blanket ban was the author's and was too strong: it meant this project's own adjudication could never be shown beside the contest it adjudicates, which is where it is most useful and, under the `findings` limit line, where it is most clearly labelled as the project's own view rather than a source's | green |
| RV-26 | `CONTESTED` | `{literature, literature, none}` | **illegal** | green |
| RV-27 | `CONTESTED` | two `literature` on the **same side** of the axis | **illegal** — one side twice is not two sides. Not decidable from origin alone; needs the register's side field. **[4.1]** This is loose end B6's test: Beason and Henderson are co-belligerents | green |
| RV-28 | `REFUSE` | `{none}` | legal | green |
| RV-29 | `REFUSE` | `{none, none}` | **illegal** — exactly one | green |
| RV-30 | `REFUSE` | `{none, app}` | **illegal** | green |
| RV-31 | `REFUSE` | `{none, literature}` | **illegal** | green |
| RV-32 | `REFUSE` | `{none, findings}` | **illegal** | green |
| RV-33 | `REFUSE` | `{}` — no trace at all | **illegal**; the refusal's stated reason stands *in place of* a trace, it does not remove the line | green |
| RV-35 | `CONTESTED` | a `findings` trace **satisfying** a side | **illegal.** RV-25's companion, and the cell that stops the amendment becoming a hole. "Permitted, and never counted" is two claims, and without this cell only the first is tested | green |
| RV-36 | `CONTESTED` | an N-sided axis with N−1 sides traced | **illegal.** Rule V requires one `literature` trace **per side**, not two traces. On a three-sided axis, two traces is one-sidedness with an extra source | green |
| RV-37 | The generator itself | `gen_matrix.js` parses §3's Rule V table **including its fourth column** and emits exactly 35 cells of which exactly 10 are legal. A parser ignoring the fourth column emits 33 and must fail here | green |

**RV-34 is retired**, superseded by RV-37. It asserted "33 cells, 9 legal" and it would have passed
against the version-2 contract, which is the whole reason RV-37 replaces it rather than amending it.
The version-1 generator parsed Rule V as two columns, Required and Forbidden. Version 2 introduces a
third state, permitted-and-never-counted, which is in neither column: a two-column parser reads the
amended table, finds `findings` absent from both, emits the version-1 cell list against the version-2
contract, and **returns green**. That is a checker agreeing with its contract in prose and
disagreeing in bytes. **The narrow lesson, which is the useful one:** a generator is safe against
changes in its table's *rows* and unsafe against changes in its table's *shape*, and only the second
kind needs a test.

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
| TRC-10 | A `resolution-only` locator's path resolves | The path exists in the leaf index. Half the definition, and the weaker half | green |
| TRC-11 | **The named text is present at it** | The matched topic words are present in the file's body. Without this, `resolution-only` means `test -f` wearing a grade word — and the LIMIT line beside it, which promises the reader the file resolves *and* that its body contains the matched topic words, is asserting something nothing checks. **The grade carrying every literature and findings answer in this system was tested for spelling and not for resolution.** DECOY: point a real trace at a file that resolves and does not contain the words; TRC-11 red, TRC-10 green | green |
| TRC-12 | An `app` locator names the model ref, and the origin function strips it | Contract §3 at version 2. Two halves: every `app` trace in a delivered answer carries the `lsei` ref the value was computed against, and `origin(locator)` returns `app` with the ref present and with it absent — the ref rides the locator and the arity does not change. DECOY: strip the ref from one `app` trace; TRC-12's first half red, TRC-3 green, because a fixed-arity parser cannot see it | green |

## 7. LIM — limit lines

Fixed text, verbatim, from contract §4. Read out of the contract at test time; this suite holds no
copy.

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| LIM-1 | Origin `literature` carries its limit line | Byte-identical to contract §4's `literature` block | green |
| LIM-2 | Origin `findings` carries its limit line | Byte-identical to contract §4's `findings` block | green |
| LIM-3 | Arity: **one per origin present**, not one per trace | A five-trace literature answer carries the line once. **RED against contract version 2**, which still reads "one per trace of the stated origin." Finding F7: repeating a 40-word paragraph after every trace is ceremony a reader skips, and a limit line a reader skips protects nobody. **Close condition, re-aimed:** the sentence in `oracle/answer_contract.md` §4 no longer contains the words "one per trace" — read from that file at test time. LIM-3 is its own detector: it goes green at exactly the moment the condition is true and it cannot go green any other way. Owner: The Editor or the author, on LIM-9's footing | **RED** |
| LIM-4 | Origin `app` carries neither line | A limit line beside an app trace is a claim about a shelf that was not drawn from | green |
| LIM-5 | Origin `none` carries neither line | as above | green |
| LIM-6 | DECOY: byte identity, not paraphrase tolerance | Change one word of a real emitted `literature` limit line; LIM-1 must go red | green |
| LIM-7 | **Anti-drift** | The text compared against is read from `oracle/answer_contract.md` §4 at test time. A suite carrying its own copy is a second authority, and a second authority drifts — the failure `verify_figure.js` recorded, where the checker and the thing it checked agreed in prose for a whole step and disagreed in bytes | green |
| LIM-8 | A decorative limit line fails | A limit line present with no trace of its origin fails. Otherwise the line becomes a habit rather than a consequence | green |
| LIM-9 | The `findings` limit text is ratified | The prohibition's §9 is a closed list and is not a persona's to extend (finding F3, 1.3). Until The Editor or the author ratifies, LIM-2 is uncertified. **Human gate, not a script.** Close condition, now observable: a row in `oracle/AMENDMENTS.tsv` whose target is `oracle/answer_contract.md` §4 carries state `applied` or `declined` with The Editor named in `source-substep`. One grep, over a register that exists | **H** |
| LIM-10 | A `one_sided` axis carries the one-side disclosure, once per answer | Byte-identical to the fixed text at `oracle/register_schema.md` §7, **read from that file at test time**, never from a copy held here. It names no source and asserts nothing about the world, so it is not claim-bearing and carries no trace — LIM-10 asserts that too, because a fixed line that quietly acquires a trace has become a claim  **RESOLVED AT 4.1 AND IT RESOLVED RED.** The fixed text at `register_schema.md` §7 is stated there as *"a request, not a ratification"*: `step0_editor_prohibition.md` §9 is a **closed** list of five permitted self-statements, extending it is the author's decision and not a persona's, and no ratification of this line exists on disk. So a `one_sided` axis cannot today emit the sentence that explains why only one side appeared. The axis still functions without it — the axis is named, the single side is delivered, no second side is fabricated — and the reader loses the explanation. Owner: The Editor, or the author. Close, and it is an observation not a date: the line appears in §9's closed list, or `one_sided` ships without it and this row is deleted along with the sentence. | **RED** |
| LIM-11 | The one-side disclosure is ratified | Same gate as LIM-9 and the same close condition, against a row targeting `oracle/register_schema.md` §7. If refused, `one_sided` still functions — the axis is named, the single side is delivered, no second side is fabricated — and the reader loses the sentence explaining why only one side appeared | **H** |

## 8. VRD — verdicts and the wave selector

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| VRD-1 | The verdict set is exactly six | A seventh value fails. Closed set, not a default | green |
| VRD-2 | Classification precedes retrieval, observed | Stub every retrieval module to throw; the run still writes a verdict to the log row. The static form is INV-1 | green |
| VRD-3 | `APP` buys zero personas | Spawn count is 0 | green |
| VRD-4 | `FIGURE` buys zero personas | Spawn count is 0 | green |
| VRD-5 | `LITERATURE` buys exactly one | Spawn count is 1, and the persona is selected by the file's field label | green |
| VRD-6 | `BOTH` buys exactly one | Spawn count is 1 | green |
| VRD-7 | `CONTESTED` buys **one persona per side, minimum two, no cap** | **AMENDED at version 2 — the constant was 2.** Spawn count equals the axis's distinct `M.side` count and is ≥ 2, and no persona waits on another. Truncating to two would make the router the thing that chooses which sides the user hears, which is the one-sidedness the register exists to prevent. Axes carrying more than two sides exist in both halves of the register, so this fires across the register rather than on an edge case. The counts are governed quantities and are not restated here: this file is not their birth file, and a suite carrying its own copy of a number is the same second authority LIM-7 forbids for a fixed text | green |
| VRD-8 | `REFUSE` buys zero, for all six codes | Spawn count is 0 unconditionally. Six runs, one per reason code | green |
| VRD-9 | **DECOY: the CONTESTED briefs are one-sided** | **AMENDED at version 2 — generalized from a pair to a set.** No brief contains **any** other side's member path: over N briefs the pairwise intersection of member paths is empty. Splice one path into one brief; VRD-9 goes red. Two agents that can see each other's side are one agent with a longer prompt. The decoy is unchanged in kind and now has N(N−1)/2 places to hide rather than one, which is why the pairwise form is the one to build. The anti-synthesis argument is untouched by the arity change: it was always about isolation, never about the number two **[4.1]** for the axis content; the splice mechanism is testable now against a stub axis | green |
| VRD-10 | `FIGURE` is not a variant of `APP` | A `FIGURE` run produces a manifest and a file and no chat block, under every condition in FIL-5 | green |
| VRD-11 | `APP_UNBUILDABLE` is not a verdict | The verdict enum has no such member. The condition produces `REFUSE` with reason `unbuildable`. Nothing selects a different wave or a different deliverable form on it, which is why it was cut at 1.3 | green |
| VRD-12 | The selector reads the verdict and nothing else | Static: the wave-selector module imports the verdict enum and imports no retrieval, lexicon or corpus module. A selector that re-derives is a second classifier | green |
| VRD-13 | A `one_sided` axis cannot produce `CONTESTED` | `CONTESTED` fires only on class `two_sided` or `false_pair`; a `one_sided` axis produces `LITERATURE` or `BOTH`, carrying its side and the one-side disclosure. Rule V requires one `literature` trace per side over at least two sides, and a one-sided axis has one side — so such a run is **unsatisfiable rather than wrong**, and an unsatisfiable requirement fails as a refusal carrying no reason code, which is the worst failure available here | green |

## 9. REF — refusals

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| REF-1 | The reason-code set is exactly six | A seventh value fails | green |
| REF-2 | Exactly one code per refusal | Zero fails. Two fail. A refusal with two codes has two owners and therefore none | green |
| REF-3 | `excluded` fixture | A question naming a topic in the app's EXCLUSIONS register refuses with `excluded` | green |
| REF-4 | `not-found` fixture | No address resolves and no shelf file is confirmed | green |
| REF-5 | `unbuildable` fixture | An app address named in intent that the address grammar cannot build | green |
| REF-6 | `axis-incomplete` fixture | A register axis matched and a member path does not resolve on disk **[4.1]** | green |
| REF-7 | `misclassified` fixture | **AMENDED at version 2.** Fires when a returned file belongs to an axis whose `match_keys` this question touched at **any nonzero overlap**, while classification did not fire that axis at its stated firing rule. Not "is this file on the register": a file is not a claim, and the band between the two thresholds is the classifier's admitted uncertainty, which is the whole content of the check **[4.1]** | green |
| REF-8 | `input-missing` fixture | A required input absent, empty, or unparseable | green |
| REF-9 | `unbuildable` never falls through to a shelf search | On FIX-4's run, assert the retrieval call count is zero. A fall-through here answers an app question from a summary, which is the authority rule violated in the direction nobody notices because the answer comes back cited and plausible | green |
| REF-10 | `axis-incomplete` never falls through to search | Retrieval call count zero **[4.1]** | green |
| REF-11 | `misclassified` is emitted, not swallowed | **AMENDED at version 2.** Same join, same direction, same weakest-setting threshold as REF-7. A qualifying retrieval produces the code and a log row. Owner unchanged and still `match_keys`, which is the point of the code existing **[4.1]** | green |
| REF-12 | Length: sixty words, excluding trace lines | Word count of the refusal body ≤ 60 | green |
| REF-13 | The cap relation holds between two constants, not two literals | 60 and 200 are read from contract §5 and §6 at test time; assert 60 < 200. Nothing compares two texts at run time | green |
| REF-14 | Retrieval: a refusal never issues a second retrieval | Retrieval call count ≤ 1 on every `REFUSE` run. A refusal that repairs a retrieval is a reconciliation, which classification-before-retrieval forbids | green |
| REF-15 | A refusal names three nouns | The absent object, the region searched, the nearest present object. **Checked on a structured refusal record with three named fields, from which the prose is rendered** — not on the prose. If the refusal is emitted as prose only, this test is not writable and the check is dropped rather than faked | green |
| REF-16 | **DECOY: the refusal that answers anyway** | Take a real refusal, splice in one claim-bearing sentence. The run must fail: grade `refused` forbids anything asserted anywhere in the same block. A refusal that smuggles a claim is the most expensive failure this system can produce, because it arrives with a `refused` grade attached | green |
| REF-17 | An empty corpus throws, never refuses confidently | An empty `literature/` produces the empty-population throw. A confident `not-found` over a corpus that was never read is a false negative wearing a reason code | green |
| REF-18 | **The false-refusal defence.** `probe_neg`: a question touching a member file and **not** about the axis | **Answered, not refused.** This is what makes the amended `misclassified` a fix rather than a rewording. Under the version-1 condition, every question retrieving a register-carrying summary refused — for excavation rates, for TRL levels, for anything — and a large fraction of the corpus was radioactive for all of its content. The register schema supplies the questions rather than this suite inventing them **[4.1]** | green |
| REF-19 | **`excluded` never masks another code** | Contract §5 at version 2: `excluded` is written only when no other reason code applies, because it is the one code whose owner is nobody. Two runs. (a) A question whose intent names an app address the grammar cannot build, and which also shares a token with an EXCLUSIONS entry: the code is `unbuildable` and the exclusion sentence appears as the refusal's *nearest present object*, never as the code. (b) A question no shelf and no address covers, sharing one token with an EXCLUSIONS entry: the code is `not-found`, same disposal. **This is the test FIX-9 and FIX-10 needed and did not have**, and its absence is why both were carried green | **RED** |
| REF-20 | A missing app ref refuses at the start of the run, not after the wave | Contract §3 at version 2. Fault injection: make `git -C lsei rev-parse --short HEAD` fail. Assert `REFUSE`/`input-missing`, spawn count 0, and retrieval call count 0. A refusal reached after the wave has run costs more than the answer it replaces and breaks §5's unconditional zero-persona rule, so the timing is the assertion and not the code | green |

## 10. FIL — the deliverable is a file

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| FIL-1 | The file exists before any chat text is emitted | **STRENGTHENED under the marker rule.** The emitter refuses a path that does not **hold a deliverable**: non-empty, and carrying at least one trace line or a refusal record. An empty file satisfies "exists on disk", and the haiku-plus-path case is exactly where an empty file goes unnoticed, because nobody opens the file | green |
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
| FIL-13 | The deliverable persists after the turn | **STRENGTHENED under the marker rule.** The bytes on disk after the turn **hash-equal the bytes delivered**, at the path in the log row. Persistence of a path is not persistence of a deliverable. See LOG-21 | green |
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
| LOG-5 | Precedence: `MISCLASSIFIED` over `REGISTER_FAIL` | as above **[4.1]** for the register half | green |
| LOG-6 | Precedence: `REGISTER_FAIL` over `REFUSED` | as above | green |
| LOG-7 | Precedence: `REFUSED` over `ANSWERED` | as above | green |
| LOG-8 | Precedence is a total order, spot-checked transitively | A run that is both `ERROR` and `ANSWERED` writes `ERROR`. Without this, two implementations differ on a run that is both an error and a refusal | green |
| LOG-9 | `FILLED` never appears in the `outcome` column | Over the whole log. DECOY: write `FILLED` into `outcome`; LOG-9 red | green |
| LOG-10 | `review` defaults to `unreviewed` | Every new row. The default is a claim: no person has read this row against its sources | green |
| LOG-11 | `FILLED` is not machine-assignable | Static: the log-writer module contains no code path emitting the literal. A column no machine writes to makes structural what the prototype declared in a comment | green |
| LOG-12 | The row schema is closed | **AMENDED at version 2.** Exactly the **nine** named fields. A tenth fails. Extending is a version bump, and this field is the extension that made version 2 carry a bump it would have carried anyway | green |
| LOG-13 | Field: `timestamp` present and typed | ISO 8601, parseable | green |
| LOG-14 | Field: `question` present | The question text as asked, verbatim | green |
| LOG-15 | Field: `verdict` present | Drawn from VRD-1's six | green |
| LOG-16 | Field: `outcome` present | Drawn from LOG-1's five | green |
| LOG-17 | Field: `review` present | Drawn from LOG-2's three | green |
| LOG-18 | Field: reason code present **iff** verdict is `REFUSE` | Present on a non-refusal fails; absent on a refusal fails | green |
| LOG-19 | Field: `deliverable_path` present | A path string; resolution is LOG-21 | green |
| LOG-20 | Field: `contract_version` present, equals VER-1 | The third consumer of the version field | green |
| LOG-21 | **F5: the deliverable path resolves to bytes on disk** | **STRENGTHENED under the marker rule.** Not presence of a string, and not merely that the file opens: the path opens **and holds the run's own marker** — its verdict token, or a trace line. An empty file opens, and a log row pointing at an empty file cannot be sampled either, which was the entire content of F5. DECOY: delete the file; LOG-21 red. The prototype logs four fields and no path (`lsei/oracle/answer_question.js` line 589) | green |
| LOG-25 | Field: `app_ref` present | **ADDED at version 2.** The `lsei` ref read at the start of the run, or `-` where `lsei` was absent. Present on every row including rows that emitted no `app` trace, which is the case the traces cannot supply at all. Equals the ref carried by every `app` trace in the deliverable this row names (TRC-12), and `-` never coexists with an `app` trace | green |
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
| INV-7 | **I4b.** Missing `lsei/index.html`, **or present and wrong** | **STRENGTHENED under the marker rule.** A refusal naming the missing clone, never a literature-only answer to a question that needed the app. An `index.html` that parses as HTML and holds no model satisfies a `test -f`, so fault injection runs both cases and the marker asserted inside the file is `KNOB_DATA`, per bootstrap assertion BC-14 | green |
| INV-8 | **I4c.** A register file that does not parse | Startup refusal, not a run with the invariant silently disabled. **This is the one people forget and it matters most:** a register that silently parses to zero rows disables the entire contested-claims invariant while every other test in the suite still passes green. The file-does-not-parse half is testable now against an empty schema-conformant file; the content half is **[4.1]** | green |
| INV-9 | **I4d.** A register axis whose member path does not exist | Refusal for that axis, never a fall-through to search **[4.1]** | green |
| INV-10 | **I6.** Classification misses are counted, not hidden | A `MISCLASSIFIED` row is reported with its denominator, never as a bare count. A rising count is a register defect, and the register is the thing that gets edited | green |
| INV-11 | **Meta: every decoy applies** | For each decoy in this suite, assert the mutation actually changed the bytes it claims to change before asserting the test went red. **A decoy that fails to apply is a failure, not a skip.** This is the lesson `verify_figure.js` paid for: a `--prove` run against a hand-built stand-in returns a false green, and only a mutation of the real artifact discriminates | green |
| INV-12 | **Meta: no test passes on an empty population** | Every test declares its population; a population of zero is reported as empty, never as a pass | green |
| INV-13 | The corpus's machine-readable inputs survive a fresh clone | `git check-ignore` reports *not ignored* for `literature/FIELDS.tsv`, `literature/INDEX.tsv`, `oracle/REGISTER.lunar.tsv` and `oracle/REGISTER.econ.tsv` against the committed `.gitignore`. `literature/` is deny-by-default and re-admits by extension, which excludes every machine-readable file the corpus needs unless each is named. Container-versus-content again | green |
| INV-14 | A missing machine-readable input is a startup refusal, never a degradation | Fault injection, one run per file: delete `FIELDS.tsv` and assert the loop refuses at startup naming the file, rather than running with field-scoped IDF silently disabled and returning confident cross-field answers. **This is the more valuable half and it is independent of the `.gitignore`** — INV-13 closes today's instance, INV-14 closes the class | green |
| INV-15 | The register loads as a **set**, and a half-loaded set is a refusal | Register schema §3.0 SET-1 to SET-3 at schema version 2. Three assertions: each file carries exactly one `H` row and it is first (`L0`); no axis id occurs in two files (`L1b`); and a load that read one file of the declared set and not the other refuses, naming the file, rather than reporting success over half a register. The concatenate-the-bytes form is a failure and not a variant — it produces two `H` rows, and the loader silently honoured the second one until R-3 | green |

## 14. FIX — Level 1 fixture questions

Seventeen questions drawn from the two 0.2 question surfaces, plus two decoys. Each fixture carries the
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
| FIX-9 | "Who owns lunar resources under the Outer Space Treaty?" | **AMENDED and RED.** `REFUSE`/`not-found`, naming the absent object (a source on the treaty and property regime), the region searched (both shelves and the app's EXCLUSIONS register), and the nearest present object. **Never `excluded`.** The app has ten exclusions and **no surface for law at all** — the ledger row that produced the original expectation compressed "three exclusions sit in this neighbourhood, and law has none" into "three cover demand, market, programme and law", which inverts it. The prototype does refuse, and refuses on the *geology* exclusion `bound-oxygen-mare`, matched on the single shared token "resources": right by accident, on the wrong entry, and it flips to `LITERATURE` the moment one law summary enters the corpus. **Close condition:** the run's reason code is not `excluded`. Its own detector | the app's EXCLUSIONS register — **CONTRADICTED on law** at the Wave 2 gate; ten entries VERIFIED | **RED** |
| FIX-10 | "What is the propellant margin under **The Commercial Break** in 2055?" | **AMENDED and RED.** **Never `LITERATURE`, and never `excluded`.** `REFUSE`/`unbuildable` while `valueModel()` is unreachable; `APP` once the island is read. **The invariant that holds across both is the assertion.** Three corrections. (1) The question named "Commercial Led"; the app's preset label is "The Commercial Break", and the fixture's expected outcome flipped on the scenario name — with the wrong label the run returns `LITERATURE`/`ANSWERED`, with the right one it returns `REFUSE`/`excluded`. A fixture whose verdict depends on a typo tests the typo. (2) It is **not a missing name in a return list, it is a missing island**: `valueModel()` lives in `VALUE-CORE` and `app_model.js` reads three other islands and never opens that one, so adding the name to the return tail would not work. `margin_prop` is not among `model()`'s output keys by any route. (3) The `excluded` variant is REF-19's defect, not this fixture's expectation. **Close condition:** the run's verdict is not `LITERATURE` and its reason code, when it refuses, is not `excluded`. Its own detector. This pins loose end C1 | `lsei/oracle/lib/app_model.js` and the `VALUE-CORE` island — **VERIFIED and stronger than the ledger claimed**; C1 confirmed live | **RED** |
| FIX-11 | "How much of Japan's 1960–73 growth was capital and how much was productivity?" | `LITERATURE`, Japanese branch; the field label routes the economics persona; retrieval and grade asserted, **no number asserted** | `jorgenson-2005-industry-origins-japan` summary | green |
| FIX-12 | "Did Japanese industrial policy raise productivity?" | `LITERATURE` today; retrieval and grade only. **Re-classified to `CONTESTED` at 4.1** when the register lands, and loose ends B6 and B7 both bear on the axis. Recorded here so the reclassification is a scheduled edit rather than a surprise | the named summaries | green |
| FIX-13 | "Did technology licensing raise TFP in Japan?" | `LITERATURE`; retrieval and grade only | `kiyota-2005-foreign-technology-acquisition` | green |
| FIX-14 | "How fast has a real economy ever deepened capital?" | `LITERATURE`; retrieval and grade only | the named summaries | green |
| FIX-15 | "Does the Japanese absorption mechanism apply to a lunar industrial base?" | `LITERATURE`, both fields, or `REFUSE`/`not-found` pre-merge. The cross-domain class the merge exists for; **`APP` is a failure** | both shelves | green |
| FIX-16 | "What is the energy cost of water extraction in kWh/kg?" where the corpus states the figure in g/kWh | The figure is quoted **in the source's own units, never converted**. A converted number has no locator that resolves — the file does not contain those bytes — so it is not merely ungraded, it is untraceable by the check that already exists. **DECOY: emit the converted figure; the run must fail on ORG/TRC, not merely warn.** Derived arithmetic is a deliverable, not a trace | the named summary, in its own units | green |
| FIX-17 | **The `BOTH` falsifier.** FIX-6 run with the `literature/` shelf removed | The run loses a distinct answer and says so: refuses the shelf half by name, never returns the app half as a complete answer. **A trivially-passing FIX-17 is the falsifier firing** — it means `BOTH` was `APP` plus an aside, and the term collapses into `APP` with an optional shelf trace, taking the verdict set to five and the contract to its next version | FIX-6's two sources | green |
| FIX-18 | **The app-versus-literature contest.** A question where a summary carries a number the app also carries | **`APP`, one trace, and the literature figure never appears as a second sentence.** A direct test of an inherited rule that has no other test. DECOY: splice the summary's figure in as a second `BOTH` sentence; the run must fail on RV-02 | `model()` for the app figure; the summary for the competing one | green |
| FIX-19 | **The register decoy.** A real `CONTESTED` answer with one side's trace deleted | Must fail Rule V's side count. RV-36's abstract form made concrete by mutating produced output, per the house style. **If it passes, the register invariant is decorative.** Built by deletion from a real answer, never by constructing a one-sided answer — a constructed one-sided answer proves only that the constructor can count | the axis's own member summaries | green |

**What the two RED fixtures share, and it is the finding rather than the fixtures.** FIX-9 and FIX-10 fail on **one mechanism**: a single shared token between a question and an EXCLUSIONS entry reaching the `excluded` reason code ahead of `not-found` and ahead of `unbuildable`. `excluded` is the only code whose owner is nobody, so it is the cheapest refusal to reach and the one that generates no work when it is wrong — which is why it silently absorbed the questions two other owners needed to see. Neither fixture could find it, because **both asserted the code the defect produces.** The contract's answer at version 2 is a precedence clause and no new reason code; the suite's answer is REF-19, which asserts the precedence directly instead of through a fixture that agrees with the bug.

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
condition that is an observation rather than a date. **Four more went RED when the fixtures were first RUN, and they are a different defect from the ten.** The ten above failed the SOURCE gate: a side claim or an axis statement that the summary does not support. RFX-04, RFX-07, RFX-09 and RFX-13 pass the source gate and fail the MECHANISM: the axis does not fire on its own `probe_pos` at K = 2.431, so a question written by the axis's own author to trigger it returns `LITERATURE` instead. Fourteen RED, twenty-one green. **None of the fourteen is repaired here.** The
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
| RFX-04 | `LCC-04` two_sided | "How much energy does it take to extract a kilogram of water from lunar regolith?" | `CONTESTED`, 3 personas (A/B/C), one `literature` trace per side over 3 sides, the `axis_statement` verbatim, no adjudication. 4 member file(s) retrieved. **RED, and it is the fixture doing its job.** Measured at `HEAD = 99d3601`, K = 2.431 (`PROVISIONAL`, plateau midpoint): `classifyQuestion` returns `LITERATURE` on this axis's OWN `probe_pos`, `axes_fired: []`. keys `extraction,energy,kwh,specific,sublimation,thermal,mining,microwave,luwex,water`; the probe carries `energy` and `water`, both corpus-ubiquitous, so the IDF-weighted mass is 0.0000 against K = 2.431. **`register_schema.md` §4.2 already rules where the fix goes: "the fix is an edit to `match_keys`, not an edit to the router."** §4.2 also names this exact failure -- "a key can tokenize cleanly, occur in the corpus, and still never appear in a question anybody asks... `probe_pos` and `probe_neg` are the test that replaces the checker" -- so this row is that test, firing as designed the first time it was run. LCC-09 is the sharpest of the four: the axis did not fire and retrieval then returned a member OF THAT AXIS as a one-sided `LITERATURE` answer, which is `misclassified`'s condition met and the code not emitted. Owner: The Space Resources Engineer for `match_keys`, the router seat for K at 3.6. Close, and it is an observation not a date: `classifyQuestion` on this axis's own `probe_pos` returns `CONTESTED` with a persona count equal to the axis's side count. | `sowers-2019-psr-ice-mining`, `sowers-2019-thermal-mining-niac-report`, `kiewiet-2026-luwex-water-extraction`, `wang-2025-microwave-water-production` | **RED** |
| RFX-05 | `LCC-05` one_sided | "What water capture efficiency has actually been demonstrated in a test?" | `LITERATURE` or `BOTH`, **never `CONTESTED`** (contract §1). The documented side A, plus the one-side disclosure of `register_schema.md` §7 read from that file at test time. 3 member file(s) retrieved. | `kiewiet-2026-luwex-water-extraction`, `sanders-2025-nasa-isru-progress-review`, `linne-2020-lunar-water-pilot-plant` | green |
| RFX-06 | `LCC-06` two_sided | "Does mechanical beneficiation of lunar ice grains need less surface power than thermal sublimation?" | `CONTESTED`, 2 personas (A/B), one `literature` trace per side over 2 sides, the `axis_statement` verbatim, no adjudication. 4 member file(s) retrieved. | `sowers-2019-psr-ice-mining`, `sowers-2019-thermal-mining-niac-report`, `metzger-2020-aqua-factorem`, `metzger-2021-aqua-factorem` | green |
| RFX-07 | `LCC-07` two_sided | "How many kilowatt hours does it take to produce a kilogram of oxygen from lunar regolith?" | `CONTESTED`, 4 personas (A/B/C/D), one `literature` trace per side over 4 sides, the `axis_statement` verbatim, no adjudication. 5 member file(s) retrieved. **RED, and it is the fixture doing its job.** Measured at `HEAD = 99d3601`, K = 2.431 (`PROVISIONAL`, plateau midpoint): `classifyQuestion` returns `LITERATURE` on this axis's OWN `probe_pos`, `axes_fired: []`. keys `oxygen,o2,lox,carbothermal,ilmenite,reduction,kwh,energy,yield,electrolysis`; the probe carries `oxygen`, `kilowatt` and `energy`, and mass is 0.0000 against K = 2.431. **`register_schema.md` §4.2 already rules where the fix goes: "the fix is an edit to `match_keys`, not an edit to the router."** §4.2 also names this exact failure -- "a key can tokenize cleanly, occur in the corpus, and still never appear in a question anybody asks... `probe_pos` and `probe_neg` are the test that replaces the checker" -- so this row is that test, firing as designed the first time it was run. LCC-09 is the sharpest of the four: the axis did not fire and retrieval then returned a member OF THAT AXIS as a one-sided `LITERATURE` answer, which is `misclassified`'s condition met and the code not emitted. Owner: The Space Resources Engineer for `match_keys`, the router seat for K at 3.6. Close, and it is an observation not a date: `classifyQuestion` on this axis's own `probe_pos` returns `CONTESTED` with a persona count equal to the axis's side count. | `leger-2025-energy-oxygen-moon`, `colozza-2010-solar-lunar-oxygen`, `nasa-2023-card-carbothermal-reduction`, `azami-2024-lunar-manufacturing-review`, `sanders-2025-nasa-isru-progress-review` | **RED** |
| RFX-08 | `LCC-08` false_pair | "Does the ilmenite reduction energy figure apply at a south polar landing site?" | `CONTESTED`, 4 personas (A/B/C/D), one `literature` trace per side over 4 sides, the `axis_statement` verbatim, no adjudication — **and the §3.2 banned-word list applies to the whole answer**, because the members are not in dispute. 7 member file(s) retrieved. **A.10 step 2 GATE FAILURE on the `axis_statement`, which §7 ships VERBATIM into the answer:** OVERSTATED — the statement says every landing site in the corpus's architecture studies is polar highland; `leger-2025` favours High-Ti mare and `sanders-2025` classes mare hydrogen/CO reduction at TRL 5. Owner: The Space Resources Engineer. Close, and it is an observation not a date: the statement is narrowed to what the members support, and this fixture re-runs green. | `sargeant-2020-hydrogen-reduction-ilmenite-static`, `leger-2025-energy-oxygen-moon`, `schreiner-2016-mre-sizing-model`, `sibille-2012-joule-heated-mre`, `nasa-2023-card-carbothermal-reduction`, `colozza-2010-solar-lunar-oxygen`, `sanders-2025-nasa-isru-progress-review` | RED |
| RFX-09 | `LCC-09` two_sided | "How much solar power is available at the lunar south pole?" | `CONTESTED`, 3 personas (A/B/C), one `literature` trace per side over 3 sides, the `axis_statement` verbatim, no adjudication. 4 member file(s) retrieved. **RED, and it is the fixture doing its job.** Measured at `HEAD = 99d3601`, K = 2.431 (`PROVISIONAL`, plateau midpoint): `classifyQuestion` returns `LITERATURE` on this axis's OWN `probe_pos`, `axes_fired: []`. keys `illumination,illuminated,sunlight,shackleton,solar,power,shadow,polar`; the probe carries `solar`, `power` and `polar` and still masses 0.0000 -- retrieval then answered `LITERATURE` off `ross-2023-lunar-south-pole-solar-power.md`, which is a member of this very axis. **`register_schema.md` §4.2 already rules where the fix goes: "the fix is an edit to `match_keys`, not an edit to the router."** §4.2 also names this exact failure -- "a key can tokenize cleanly, occur in the corpus, and still never appear in a question anybody asks... `probe_pos` and `probe_neg` are the test that replaces the checker" -- so this row is that test, firing as designed the first time it was run. LCC-09 is the sharpest of the four: the axis did not fire and retrieval then returned a member OF THAT AXIS as a one-sided `LITERATURE` answer, which is `misclassified`'s condition met and the code not emitted. Owner: The Space Resources Engineer for `match_keys`, the router seat for K at 3.6. Close, and it is an observation not a date: `classifyQuestion` on this axis's own `probe_pos` returns `CONTESTED` with a persona count equal to the axis's side count. | `speyerer-2013-persistently-illuminated-regions`, `speyerer-2012-in-search-of-shade`, `glaser-2014-south-pole-illumination`, `ross-2023-lunar-south-pole-solar-power` | **RED** |
| RFX-10 | `LCC-10` two_sided | "Is fission or solar with storage lighter per kilowatt at the lunar south pole?" | `CONTESTED`, 2 personas (A/B), one `literature` trace per side over 2 sides, the `axis_statement` verbatim, no adjudication. 9 member file(s) retrieved. **A.10 step 2 GATE FAILURE:** side A `nasa-moon-to-mars-doc.md` — the kWe target and the KRUSTY citation sit in Appendix D's technology-gap catalog, not the data-gaps catalog the side claim names. Owner: The Space Resources Engineer. Close, and it is an observation not a date: the side claim is repaired against the summary, or the member is moved to the file that carries the figure, and this fixture re-runs green. | `poston-2020-krusty-reactor-design`, `oleson-2022-deployable-fsp`, `nasa-2025-fission-surface-power-directive`, `nasa-moon-to-mars-doc`, `ross-2023-lunar-south-pole-solar-power`, `csank-2022-powering-the-moon`, `colozza-2020-lunar-base-power-comparison`, `pappa-2021-relocatable-solar-array`, `belbin-2024-vsat-grd-demonstrator` | RED |
| RFX-11 | `LCC-11` false_pair | "What does it cost to land a kilogram on the lunar surface?" | `CONTESTED`, 2 personas (A/B), one `literature` trace per side over 2 sides, the `axis_statement` verbatim, no adjudication — **and the §3.2 banned-word list applies to the whole answer**, because the members are not in dispute. 7 member file(s) retrieved. | `payload-research-starship-cost`, `jones-superheavylift-final20260614`, `adilov-2022-launch-cost-reductions`, `nasa-2023-card-carbothermal-reduction`, `metzger-autry-2023-lunar-landing-pads`, `nasa-clps-delivery-timeline`, `nasa-clps-procurement-vignette` | green |
| RFX-12 | `LCC-12` two_sided | "Does the lunar propellant business case close?" | `CONTESTED`, 3 personas (A/B/C), one `literature` trace per side over 3 sides, the `axis_statement` verbatim, no adjudication. 7 member file(s) retrieved. | `kornuta-2019-commercial-lunar-propellant-architecture`, `sowers-2019-psr-ice-mining`, `sowers-2019-thermal-mining-niac-report`, `jones-2019-cislunar-isru-breakeven`, `jones-2020-lunar-propellant-breakeven`, `shishko-2019-lunar-thermal-mining-business-case`, `mckeown-2024-space-resource-hurdle-rate` | green |
| RFX-13 | `LCC-13` two_sided | "Who would buy lunar helium-3?" | `CONTESTED`, 2 personas (A/B), one `literature` trace per side over 2 sides, the `axis_statement` verbatim, no adjudication. 3 member file(s) retrieved. **RED, and it is the fixture doing its job.** Measured at `HEAD = 99d3601`, K = 2.431 (`PROVISIONAL`, plateau midpoint): `classifyQuestion` returns `LITERATURE` on this axis's OWN `probe_pos`, `axes_fired: []`. keys `helium,fusion,deuterium,tritium,detectors,implanted,regolith`; the probe is "Who would buy lunar helium-3?" and `helium-3` does not tokenize to `helium`, so no key is present at all. **`register_schema.md` §4.2 already rules where the fix goes: "the fix is an edit to `match_keys`, not an edit to the router."** §4.2 also names this exact failure -- "a key can tokenize cleanly, occur in the corpus, and still never appear in a question anybody asks... `probe_pos` and `probe_neg` are the test that replaces the checker" -- so this row is that test, firing as designed the first time it was run. LCC-09 is the sharpest of the four: the axis did not fire and retrieval then returned a member OF THAT AXIS as a one-sided `LITERATURE` answer, which is `misclassified`'s condition met and the code not emitted. Owner: The Space Resources Engineer for `match_keys`, the router seat for K at 3.6. Close, and it is an observation not a date: `classifyQuestion` on this axis's own `probe_pos` returns `CONTESTED` with a persona count equal to the axis's side count. | `olson-2021-lunar-helium3-mining`, `wittenberg-1992-he3-resources-review`, `gao-2011-neutron-detectors-helium3` | **RED** |
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
