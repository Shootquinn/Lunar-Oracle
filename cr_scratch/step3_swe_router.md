# Step 3, W4-2: the router. Sub-steps 3.2, 3.4, 3.10, 3.8, 3.9, and the 3.5 wiring

The Software Engineer, 2026-08-28.

**Read-digest for every figure in this file.** `lsei` at `7f97983`, app `lsei/index.html` at md5
`16caa330ebae773684285c301a8e0a98`. Corpus `literature/INDEX.tsv`, 169 summaries. Registers
`oracle/REGISTER.lunar.tsv` (15 axes, 68 members) and `oracle/REGISTER.econ.tsv` (18 axes, 53
members), 33 axes total. `oracle/question_classes.json` schema 1. Acceptance
`oracle/acceptance/lunar_questions.md` (14) and `labelled_questions.tsv` (44 question rows).

**Run everything in this file with five commands.**

```
node oracle/router/build.js --check        the excluded-node artifact still matches the app
node oracle/router/calibrate_k.js          the axis firing threshold, measured
node oracle/router/acceptance.js           every question set on disk, one verdict each
node oracle/router/calibrate_thin.js       the thin-patch tiers, re-measured
node oracle/router/tests/router_suite.js   14 tests, 14 pass
```

---

## 0. Premise checks, before anything was built

Four claims in the brief were measured first. Three held, one was understated, and one claim of my
own was refuted by the orchestrator and is corrected here.

| Claim | Verdict |
|---|---|
| `valueModel` lives in an island `app_model.js` never opens (C1) | **HELD.** `VALUE-CORE` spans lines 7797–8448 of `lsei/index.html`; `lsei/oracle/lib/app_model.js` opens `DATA-ISLAND`, `MODEL-CORE` and `DERIVATION-CORE` and no other |
| `OUTPUT_LEXICON` names 8 of the 26 keys `model()` returns (C2) | **HELD, and understates the defect.** See below |
| The third adjacency pair is `grade-independent-demand`/`offtake-record` | **HELD.** All three pairs validate against the app's own slug tree |
| `tools/checks.js` runs CL-1, so a new `.js` under a scan root fails it | **REFUTED. `tools/checks.js` does not exist.** `CHK-09` reads `specified`, and CL-1 has never executed. Routed |

**C2 is larger than the row says, and the row's own numbers are what hid it.** `OUTPUT_LEXICON` has
eight rows, all eight naming `model()` keys. The app's addressable output surface is not 26 keys but
**45**: `model()` returns 26, `valueModel()` returns 27, they share 8. So the prototype leaves **18
of 26 model outputs and all 19 value-only outputs unaddressable — 37 of 45.** Stating the defect as
"eight of twenty-six" omits the value layer, which is the half the Oracle was answering from the
literature shelf.

**My own refuted figure, recorded because the correction is the interesting part.** My first relay
said `valueModel()` returns 29 and stated no overlap. It returns 27, and the overlap is 8. The
arithmetic was the tell: 26 + 29 − 45 requires an overlap of 10, and by not stating the overlap I
gave nobody the figure to check the union against. The fix is not the corrected number, it is that
`app_surface.js` now asserts **four** components rather than one — `model 26 + value 27 − overlap 8
= union 45` — because two component errors of equal size in opposite directions produce a correct
union and a single-number assertion cannot see it. RT-01 is that assertion.

---

## 1. Sub-step 3.2 — the two reachability gaps

**Files:** `oracle/router/app_surface.js`, `tools/address.js`.

### C1, `valueModel()`

`app_surface.js` opens `VALUE-CORE` **in the same `Function` scope as `MODEL-CORE`**, because
`valueModel()` closes over `model()` and `ENVELOPE`; a second scope either throws on those free
names or re-declares them, and a re-declared `model()` is a second app. A surface that loads without
a callable `valueModel()` is a **refusal**, not a degraded load, and the thrown message names C1 —
because the degraded mode is precisely the bug: it answers the app's economic half from the shelf.

### C2, the closed output namespace

The namespace is derived by **calling both functions and reading `Object.keys()` off what they
return**. Two consequences, and the second is the fix.

1. Every key is addressable by its **own identifier as a whole token**, with no lexicon entry. That
   route cannot go stale.
2. The phrase lexicon becomes an **alias layer** whose every target is checked against the derived
   namespace at load, and `lexiconCoverage()` **reports** the keys reachable by identifier only.
   Measured now: **45 keys, 16 by phrase alias, 29 by identifier only.** C2 was not that eighteen
   keys lacked a regex; it was that nothing could say so.

### What `landed_cost` forced, and what this file refused to do

`valueModel()` reads a landed cost `D`. The prototype's `resolveKnob` refuses `landed_cost` outright
as "a DETENTS rail that `model()` does not accept as an input" — true of `model()`, false of
`valueModel()`. So `landed_cost` is now a legal knob **for value outputs only**, and RT-04 asserts
both directions.

**A value output with no landed cost named is `FIGURE`, and this was the one place a default was
tempting.** `tools/address.js` throws `E_LANDED_COST_UNBOUND` and will not pick a `D`. The
classifier turns that code into a sweep over the app's own `DETENTS.landed_cost` rail — which is
answer contract §1's `FIGURE` condition in its own words, "an app address resolved with one
dimension unbound, so more than one call into the model." A defaulted `D` would put a number in an
answer that no part of the question asked for. RT-05.

The slug grammar carries the function name as its prefix (`model:` / `value:`) and any number of
overrides, so a verifier reading a slug alone knows which function produced the number. The
prototype's grammar hard-coded `model:` and allowed at most one override, and could not express a
value address at all.

---

## 2. Sub-step 3.4 — three outcomes

**File:** `tools/exclusions_match.js`.

The prototype has one outcome and its own header calls an EXCLUSIONS hit "the strongest form of
refusal available." That is right about the app-authority question and wrong about the user's: the
app's prose says what **the app** does not do, not that the question is unanswerable.

| Outcome | Verdict | Code | Why that code |
|---|---|---|---|
| `EXCLUDED-THEN-CORPUS` | `LITERATURE` | — | Not a refusal at all. The corpus holds a named primary; the boundary sentence prints beside the answer, never as an app output |
| `EXCLUDED-THEN-THIN` | `REFUSE` | `not-found` | A thin corpus is a corpus gap and an acquisition decision, which is the owner `not-found` routes to |
| `EXCLUDED-BUT-ADJACENT` | `REFUSE` | `excluded` | The only outcome where **nobody** owns a fix, which is what §5 says the code means |

**`EXCLUDED-THEN-THIN` writes `not-found`, not `excluded`, and that is the whole force of §5's
precedence rule.** `excluded` routes to nobody; writing it over a repairable corpus gap files the gap
under a code that names no one to repair it. `SRQ-14`'s own failure column says the same thing
independently, which is the check on this reading rather than my argument for it.

**Precedence, ruled here: `EXCLUDED-BUT-ADJACENT` dominates.** The hazard governs the *shape* of the
answer and the corpus governs only its *content* — an adjacent app number can sit beside a rich
corpus answer and still be read as the answer.

**`CORPUS` versus `THIN` is derived, not declared.** A node's primaries are the member leaves of the
register axes it declares, resolved against `literature/INDEX.tsv`. At this digest the derivation
returns **5 CORPUS, 2 THIN, 3 ADJACENT**, and agrees with all ten of
`question_classes.json`'s independently authored assignments. That agreement is a known-answer test
on the derivation; a disagreement is a build finding, not a silent resolution.

**The three pairs are validated against the app, not transcribed.** Both slugs must exist, the
excluded one must carry `state:'excluded'`, the counterpart `state:'modeled'`, and the two must be
siblings under one parent or a child and its own parent claim. RT-07 also asserts that a fabricated
pair across two parents **fails**, so the check proves something.

---

## 3. Sub-step 3.10 — ten excluded nodes as retrieval objects

**Files:** `oracle/router/excluded_nodes.js`, `oracle/router/build.js`, generated
`oracle/router/excluded_nodes.json` (10 nodes, 35 KB).

Every field is read out of the app's `DATA-ISLAND` on the call that builds it: `does` and `reason`
from `EXCLUSIONS`, `title`/`parent`/`state` from `SLUGS`, `status`/`ruled` from `SECTIONS`.

**`lsei/lunar-scenario-explorer-map.md` carries the same ten rows in a markdown table and is not
used.** That table is what a transcription would copy, and the map is a generated file this project
has already measured as stale against the app — `question_classes.json` records it disagreeing on
md5, byte count, pin and the References total, and rules that the artifact wins. **A refusal quoting
the map would be the Oracle telling a user what the app used to say.**

`node oracle/router/build.js --check` regenerates in memory and diffs against the committed file. It
is the reason this is a generated artifact rather than a transcription with an extra step: the app
is a floating working copy, and without `--check` the file was true the day it was written and
unfalsifiable every day after.

**Each node carries a refusal record whose three fields are answer contract §5's three nouns** —
absent object, region searched, nearest present object. They are *fields*, not a sentence, so the
prose seat renders them and the router does not own wording it cannot check. RT-08 asserts the prose
is byte-identical to the app's.

**The population is the app's, not the assignment table's.** The builder cross-checks
`EXCLUSIONS` against sections carrying `state:'excluded'` (both 10), reports any node the app
excludes that `question_classes.json` omits, and any assignment for a slug the app does not exclude.
Neither file gets to define the population by being the one that was read. Zero findings today.

---

## 4. Sub-step 3.8 — the classifier

**File:** `oracle/router/classify.js`.

Three retrieval modes and one app mode, decided **before** any retrieval, in this precedence:

1. **`CONTESTED`** — a register axis fires. First, because the register is a statement that the
   sources *disagree*, and a disagreement is not repaired by finding one of them (D2, taken at 1.8,
   upheld at 0.5).
2. **`APP`** — an app address resolves → `APP`, `FIGURE`, or `BOTH` for a coefficient. Second,
   because of the authority rule the app paid for three times.
3. **`REFUSE`** — the app's EXCLUSIONS declare it → `REFUSE`, or `LITERATURE` under
   `EXCLUDED-THEN-CORPUS`. Third and not first, because an exclusion is a claim about the app's
   *boundary* and a resolved address is a claim about its *content*.
4. **`LITERATURE`** — the shelf is searched here and nowhere earlier.

**Never two modes; never zero — asserted, not arranged.** `assertOneMode()` runs on every sub-claim
of every question and throws on a mode or verdict outside the closed sets, on a missing one, on a
`REFUSE` with no code, and on a non-`REFUSE` carrying one. `acceptance.js` re-asserts the same
conditions from outside, because an assertion that lives only inside the thing it checks is the
thing checking itself.

**`CONTESTED` sides are resolved by path against `literature/INDEX.tsv`, never through retrieval**,
and the resolved side count is asserted equal to the declared side count. Two measured findings
compound here: retrieval cannot reach every register member at any threshold (6 of 37 targets, ~16%;
on fixture X-01 `henderson-2008-myth-of-miti.md` is absent from a 38-candidate pool while the other
side of the same pair is present), and **12 of the 26 non-`one_sided` axes carry three or more
sides** (7 `two_sided`, 5 `false_pair`; widest is 4). Sourced from retrieval, a `CONTESTED` answer
drops sides for two unrelated reasons at once and the reader sees a dispute with a side missing and
nothing saying one is missing. A member that does not resolve is `axis-incomplete` — a hard error
with an owner — never a quietly shorter dispute. Persona briefs carry paths, not leaves.

**A `one_sided` axis never produces `CONTESTED`** and routes to `LITERATURE` with the one-side
disclosure, per §1: it has one side, Rule V wants one `literature` trace per side over at least two,
so such a run is *unsatisfiable* rather than wrong.

**`K` is not set in this file.** `register_schema.md` §4.3 assigns it to 3.6 and refuses to state a
number inside the document correcting that practice. 3.6 landed the labelled question set and the
retrieval confirmation threshold; it did not land `K`. So the classifier **reads** `K` from
`oracle/router/axis_threshold.json` and refuses `input-missing` **before classification**, zero
personas spent, when it is absent. `calibrate_k.js` measures a value against the register's own 66
`probe_pos`/`probe_neg` questions — a labelled set whose authors are the two domain seats, not this
router's author — and writes it marked `PROVISIONAL` with 3.6 as owner. **K = 2.431**, plateau
[2.320, 2.542], **55 of 66**. A classifier that defaulted `K` would make `CONTESTED` fire or not fire
on a number nobody chose, which is C2 again: a routing decision nobody can see.

**Four routing fixes found by running the acceptance set, each with the fixture that found it.**

| Fix | Found by | What it was |
|---|---|---|
| A coefficient route (`CONFIG`/`VALUE` by key or unit) → `BOTH` | SRQ-4 | A question about the app's own transmission coefficient named no scenario and no `model()` output, so the address grammar returned nothing and the prototype answered a question about the app from a summary. This route is what makes `BOTH` reachable at all |
| `SWEEP_LANGUAGE` catches `detent rail`, `change across/over/with`, `as a function of` | SRQ-3 | An unrecognised sweep is answered as a scalar at one detent: one number to a question that asked for a curve, returned as `APP`, so nothing downstream can tell |
| Knobs resolve by their own `DETENTS` identifier, not aliases only | SRQ-3 | "across the ice **detent rail**" names the knob by its own name and returned `unbuildable` on an address that resolves perfectly. C2 wearing a different hat |
| "the model" / "the app" is an anaphoric continuation, not a new sub-claim | SRQ-2 | Splitting sent a scenario-less clause to the shelf, turning a two-grade `APP` answer — computed label plus the app's own stored prose — into `BOTH` whose second half came from a summary |

---

## 5. Sub-step 3.9 — the wave selector

**File:** `oracle/router/wave.js`.

One table, `ARITY`, keyed by verdict. **There is no numeral in this file's control flow.**

| Verdict | Personas | Source |
|---|---|---|
| `APP`, `FIGURE` | 0 | §1 |
| `REFUSE` | 0, unconditional, every reason code | §5 |
| `LITERATURE`, `BOTH` | 1, by field label from `literature/FIELDS.tsv` | §1 |
| `CONTESTED` | `sides.length`, minimum 2, **no cap** | §1 |

**`assertDerived()` re-derives the count from the wave it just built** and throws if the two
disagree, which is what stops a later edit from adding a cap by accident. RT-11 proves the count is
derived by *mutating the contract table and requiring the wave to follow it* — a hard-coded count
would not move.

**No cap, and the reason is in the contract rather than in taste.** "A register axis may carry any
number of sides, and truncating to two makes the router the thing that chooses which sides the user
hears — the one-sidedness the register exists to prevent." The cost control is authoring: a persona
who writes a six-sided axis buys six personas on every question touching it, and will not do it
twice. RT-12 checks all 12 multi-sided axes; the widest buys 4.

**Two axes firing on one question is two disagreements** and buys both waves. Collapsing them would
be the same truncation at the axis level instead of the side level.

**The anti-synthesis rule ships as a data structure.** Each persona's `brief_scope` carries one
side's member paths and no other side's, and `assertDisjointBriefs()` checks that pairwise over
every brief. The rule was always about isolation rather than about the number two, which is why
removing the cap did not touch it.

**A field the corpus does not declare has no seat to brief**, and the wave returns zero personas
with an `input-missing` defect rather than guessing a specialist.

---

## 6. Close conditions

| Condition | Status |
|---|---|
| The classifier runs | **MET.** 124 questions over three sets |
| Exactly one verdict from the closed six, every question | **MET.** 0 violations. `acceptance.js` exit 0 |
| Zero sub-claims emitting two modes; zero emitting none — **asserted** | **MET.** `assertOneMode()` inside, `acceptance.js` outside, RT-09 and RT-10 |
| Persona count derived from the verdict, not hard-coded | **MET.** RT-11 mutates the table and the wave follows |
| The fourteen-question acceptance set | **RAN.** It landed mid-sitting. 124 questions include all 14 |

**Distribution over 124 questions:** `APP` 2, `FIGURE` 1, `BOTH` 2, `CONTESTED` 44, `LITERATURE` 59,
`REFUSE` 16 (`not-found` 15, `excluded` 1). 173 personas total, maximum 4 on one question.

### The fourteen, against The Space Resources Engineer's own expected column: 9 agree, 5 disagree

The acceptance set carries an expected verdict per row. **I did not treat a disagreement as a test
failure and I did not silence one.** My close condition is one-verdict-never-two-never-zero; the
expected column was authored against the app and the corpus rather than against this
implementation, so a disagreement is a finding with two named parties. Four of the five have owners
outside this chain, each with the measurement attached.

| Row | Expected | Router | Cause, measured | Owner |
|---|---|---|---|---|
| SRQ-8 | `CONTESTED` | `LITERATURE` | LCC-09 mass **0.919** against K **2.431** | 3.6 (`K`) or the axis's `match_keys` |
| SRQ-12 | `CONTESTED` | `LITERATURE` | LCC-07 mass **0.968** against K **2.431**. The `EXCLUDED-THEN-CORPUS` mechanism worked — the row's named failure mode is `REFUSE`/`excluded` and the router did not do that | same |
| SRQ-10 | `BOTH` | `LITERATURE` | Class **L10 `two_field_join`** is defined in `question_classes.json` and no sub-step in this chain builds it. The question names `L`, `decayRate` and `decayLife` only in prose | unowned; names 3.3's class L10 |
| SRQ-13 | `REFUSE`/`not-found` | `LITERATURE` | Retrieval **confirms 5 of 9** candidates at threshold 0.28 on a thin patch. `just-2020-regolith-excavation-review.md` is the file the row itself names as "nearest real evidence"; finding it is right, calling it an answer is not | 3.7 (confirmation threshold) |
| SRQ-14 | `REFUSE`/`not-found` | `LITERATURE` | `cadence-cryogenic-break` scores **overlap 0**. Measured below | The Space Resources Engineer |

**SRQ-14 is the sharpest finding in this sitting and it is not a bug in my code.** The exclusions
matcher scores a question against the app's own boundary prose. That prose is written in the *app's*
vocabulary about what the app does not model; a user's question is written in the *user's*
vocabulary about the world. "How often must lunar propellant be transferred to keep boil-off within
limits?" is exactly the `cadence-cryogenic-break` question and shares **zero tokens** with "This app
does not model programme milestones." So the node falls through to a shelf search that confirms an
off-topic file on shared domain vocabulary, and answers.

That is `register_schema.md` §4's own argument arriving at a second object: `match_keys` "cannot be
derived from the summaries: it requires knowing how a user phrases a question," which is why it is a
domain deliverable. **An excluded node needs the same field for the same reason.** The mechanism
ships now — `matchExclusions` takes node `match_keys` and the builder carries them from
`question_classes.json` — so the fix is a data edit and touches no code. Routed with the exact text.

---

## 6b. A seventh reason code, ruled here on W4-4's escalation

W4-4 closed the transfer gate and found that no existing code describes a transfer refusal. The
orchestrator routed the call to me as the seat that owns `REASON_CODES`. Two options were offered:
widen `not-found`, or add a seventh.

**Ruled: a seventh code, `transfer-unevaluable`.** §5 gives the codes a closed set of six and says in
its own words why they are not one code — "Each routes to a different owner." `not-found`'s owner is
"a corpus gap, and an acquisition decision." A transfer refusal is the opposite situation: the object
**is** present in the corpus and the transfer between two fields is what cannot be evaluated. No
acquisition fixes it. Widening `not-found` would put two owners behind one code, which is precisely
what §5 spends its longest clause preventing for `excluded` — a code must not tell the reader the
corpus is empty when it is not, and must not route a repair to somebody who cannot make it.

`classify.js` implements seven and **still throws on any code outside the set**, which is the
property that matters and which a widening would have preserved equally. `answer_contract.md` is not
in my write set, so the §5 table row, the §9 bump 2 → 3, and the `question_classes.json`
`refusal_codes` edit are routed with their text written out.

**Until they land, the two directions of drift are checked differently and only one throws.** A code
the contract carries that the router does not implement is an unknown code arriving — a fork, and it
throws. A code the router implements that the contract has not yet written down is an owed row; it
is named on `ctx.owed_contract_codes` and reported. Throwing there would block the transfer gate on a
document edit in another seat's write set, which is the barrier the wave structure exists to remove.
Today: `ctx.owed_contract_codes = ["transfer-unevaluable"]`.

**One figure of mine corrected by W4-4 and the orchestrator.** I reported 12 multi-sided axes; that
is 12 of the 26 non-`one_sided` axes with three or more sides, which is 7 `two_sided` plus 5
`false_pair`. The `two_sided` population is **18**, not 22, and `ECR-07` declares four sides but is
`false_pair`, so it is not part of the over-two `two_sided` defect. The seven are LCC-01, LCC-03,
LCC-04, LCC-07, LCC-09, LCC-12, ECR-13. My mechanism is unaffected — it asserts against each axis's
own declared side count and never against a class-derived expectation of two.

## 6c. The thin-patch register, wired — and a re-measurement that caught itself

**Files:** `oracle/router/thin_patches.js`, `oracle/router/calibrate_thin.js`, generated
`oracle/router/thin_threshold.json`. `oracle/thin_patches.json` was correct, calibrated, and **read
by nothing**; 3.3 specifies the router consumes it before retrieval and that wiring did not exist.

**Two tiers, and the separation is the mechanism.** `FIRE` (mass ≥ 1.7) attaches the patch's
`substitution` as **content** and does not move the verdict. `GOVERN` (mass ≥ 6.175) makes the
patch's `refusal_code` the **verdict**. The match is computed *before any mode resolves*, so a fire
attaches to a `CONTESTED` or a `BOTH` as readily as to a refusal — computing it inside the refusal
branch would attach it only to the verdict that needs it least.

**Placement: after the app, the register and the exclusions; before the shelf.** A patch says a
specific *measurement* is absent. It does not say the app cannot compute something, and it does not
settle a disagreement the register already records. I did **not** re-derive the "govern only where no
competing route answered" precondition — SRQ-13 refutes it, returning `LITERATURE` confirmed 9 of 9
at frac 0.85, so that rule would block T1 on the one row it must govern. **Retrieval being confident
is the symptom, not the licence.**

### The re-measurement, and the finding is about my own objective

I was told to use the seat's figures and to re-measure before committing. I did both, with a
different objective over a wider population: **A**, the register's 20 probe rows; **B**, the 14
labelled acceptance rows scored through the full classifier; **C**, collateral — how many non-`REFUSE`
verdicts a candidate destroys across all 124 questions.

**A and B alone chose 7.038, and 7.038 is wrong.** SRQ-14 must be governed by T5 at 6.389, and at
7.038 T5 governs nothing. B could not see it **because SRQ-14 already reaches `REFUSE`/`not-found`
through the excluded-node path**, so B scored the row correct at any threshold above 6.389 where the
patch contributes nothing. B plateaued out to 8.516 and its midpoint silently dropped the
cross-check.

**That is the five-row failure again, one level up: an objective whose coverage does not contain the
row that constrains it.** The fix is the same in kind — **Objective D**, a constraint that does not
depend on any other path succeeding: where a labelled row expects `REFUSE`, the *thin path itself*
must govern it. With D, the joint interval is **[5.561, 6.372]**.

**Adopted: the register's 6.175, not my midpoint.** It lies inside my joint interval. It was measured
against 49 controls including the two that bind. And the margin argument decides it: the binding
must-not-govern row is T3 on SRQ-10 at **5.961**, a legitimate fire. My midpoint clears it by
**0.006**; the register's figure clears it by **0.214**, thirty-five times the margin, and sits at
the centre of the true band where mine sits on its edge. **My measurement's job was to check the
figure, not to replace it.** It checks out.

The superseded five-row band is recorded in the artifact with its measured damage — at midpoint 2.82
it destroys **6** verdicts including SRQ-10, LCC-14 both probes, and L-11 — so the failure is
falsifiable rather than remembered.

**Collateral at 6.175: 2, and both are correct.** SRQ-13 (`LITERATURE` → `REFUSE`, which is its
expected verdict) and N-01, a negative control whose expected `confirmedSet` is empty. **Zero correct
answers destroyed.**

**The cross-check is real and is now asserted.** SRQ-14 reaches `REFUSE`/`not-found` through the
excluded-node path *and* T5 governs it at 6.389 through the patch path. Only the first executes, so
without RT-14 the agreement could rot the day either register is edited.

**K1 token form, applied to every literal compared against tokenizer output.** The three silent
classes — hyphenated, uppercase, tokenizing to nothing — now run over `thin_patches.trigger_tokens`,
`REGISTER.match_keys` and `excluded_nodes.match_keys`: **560 literals, 0 failures.** Reported on
`ctx` rather than thrown, because these are other seats' registers and a router that refuses to start
over somebody else's hyphen is a router nobody can run. My own alias tables are regexes matched
against raw question text, never against tokenizer output, so they are not in this class.

**Acceptance moved 10/14 → 11/14.** SRQ-13 is the row that moved. The three remaining are unchanged
and unowned by me: SRQ-8 and SRQ-12 (K / `match_keys`), SRQ-10 (class L10 `two_field_join`, which
nothing builds — T3 correctly fires there and correctly does not govern).

## 7. Apparatus

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +14/-0 | reason codes +1/-0
```

**The reason code is a fifth number and it is declared rather than folded into one of the four.**
`transfer-unevaluable` is required by W4-4's 4.4 close condition and is therefore not freeze spend,
per the orchestrator's own instruction routing the decision. The contract rows it needs are **routed,
not written**: check rows by me remain +0.

The twelve tests are the allowance my brief grants for router behaviour and are the deliverable of
this chain's TDD half, not freeze spend. All twelve execute against the real app and the real
corpus; none asserts a value this file typed. **14 pass, 0 fail.** RT-13 and RT-14 are the two beyond the allowance: they cover the thin-patch wiring, which was assigned after the allowance was set and which changes verdicts rather than paperwork. Declared here rather than folded into the twelve.

**Standing state unmoved.** `node oracle/tests/run_suite.js` → 455 rows, 33 pass, 4 fail (the four
argued in `af7abec`, not mine to silence), exit 0. `node tools/check_registers.js` → 0 hard failures
@ read-digest `785b46c4b9ec09de` over 292 files. `node tools/verify_corpus.js` → 1 FAIL, 39 OK, 1
VACUOUS, 6 REPORT, unchanged.

**Two generated artifacts, both with their generator committed and a `--check` mode:**
`oracle/router/excluded_nodes.json` and `oracle/router/axis_threshold.json`.

---

## Not mine

- **`tools/checks.js` does not exist, so CL-1 has never run.** `CHK-09` reads `specified`. This is
  the same shape as the Wave 1 finding — a register row internally consistent and never executed —
  and it means my six new `.js` files under two declared scan roots are uncovered by a check that
  would have caught them on landing. Routed to The Systems Engineer with the six rows written out
  verbatim: `cr_scratch/relay/w4-2_to_systems_engineer_check_rows.md`. **Check rows +0 by me.**
- **`K` is 3.6's and it is provisional.** 2.431 at 55/66. The eleven failures are all lunar (`ECR`
  scores 36 of 36), and §4.2 rules the fix "an edit to `match_keys`, not an edit to the router."
  Routed to The Space Resources Engineer with the eleven axes, their masses and their probes.
- **Excluded nodes need `match_keys`.** SRQ-14 above. Mechanism shipped, data owed. Same relay.
- **The retrieval confirmation threshold answers questions the corpus cannot support.** SRQ-13, and
  independently "How many pineapples are on the far side of the Moon?" returns `LITERATURE` with
  `csank-2022-powering-the-moon.md` confirmed. 3.7's constant, not my mode. Routed.
- **Class L10 `two_field_join` has no implementation and no sub-step.** `question_classes.json`
  defines it; nothing in Step 3 builds it. SRQ-10 is the fixture that exposes it.
- **The map's staleness.** `lsei/` is read-only and its generator is not in this working copy.
  Reported, changed nothing.
- **The four standing suite failures.** Argued in `af7abec`; not mine to silence.
