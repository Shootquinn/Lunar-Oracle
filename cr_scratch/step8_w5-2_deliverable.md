# Step 8, seat W5-2 — The Writer

**Sub-steps 8.4, 8.3, 8.5.** Wave 5. Delivered 2026-08-28.

**Write set, as declared and as used.** `oracle/answer_contract.md` (edited),
`oracle/deliverable_shape.md` (new), `oracle/model_tier.md` (new), `CLAUDE.md` (edited),
`cr_scratch/step8_w5-2_deliverable.md` (this file). **Three files outside the declared set were
written, and all three are declared here rather than left for a reviewer to find:**

- `cr_scratch/relay/w5-2_writer_routes.md`, under the standing block's clause 4 — *route by relay to
  `cr_scratch/relay/`* — which the standing block places above the brief.
- `tools/verify_haiku.js` and `README.md`, both directed by the coordinator's relay of the author's
  2026-08-28 haiku and licence rulings, which arrived mid-task and named each file. See §8.

`oracle/router/**`, the registers and `literature/` were read and not touched.

---

## 1. Close-condition status per sub-step

| Sub-step | Close condition | Status |
|---|---|---|
| 8.4 | The deliverable has a specified shape, as a template with a worked example | **CLOSED.** `oracle/deliverable_shape.md`, five closed ordered sections, template at §6, Cabeus worked example at §7. Required by `answer_contract.md` §6. |
| 8.4 | The §6 carve-out conflict is settled, with reasoning, and the ruling is marked reversible | **CLOSED.** Both removed. Reasoning at `answer_contract.md` §6a; reversal condition named there. §3 of this file. |
| 8.3 | The evidence pass is specified as concurrent with the Manager's open, and the scepticism is required in the artifact | **CLOSED.** `answer_contract.md` §10. The set-aside line is required and `Set aside: none` is distinguished from an absent line. |
| 8.5 | `oracle/model_tier.md` exists and matches the gameplan's revised table | **CLOSED.** Table copied from `lunar-oracle-gameplan.md` lines 567-574; byte-compared, see §5. |
| 8.5 | The author's availability constraint is stated as the reason | **CLOSED.** `model_tier.md` head, quoted. |
| 8.5 | Source verification written as a procedure, not as a tier | **CLOSED.** `model_tier.md` §2, four steps, and the same four steps at `deliverable_shape.md` §3. |
| 8.5 | The Wave 4 correction stays visible | **CLOSED.** `model_tier.md` §3, carried verbatim in substance, plus what would actually settle it. |
| 8.5 | The Haiku hazard is carried | **CLOSED.** `model_tier.md` §4, converted from a warning into a close condition with two denominators. |
| 8.5 | Contracts point at the tier | **CLOSED.** `CLAUDE.md` §4. |

**One close condition is not mine and is open: 8.4's "tested by The Software Engineer."** Nothing in
this deliverable is an executable binding. `oracle/tests/answering_loop_suite.md` is not in my write
set and the FIL group's fourteen rows carry no binding today. Routed, §6 item R1.

---

## 2. What was tested, and how it could have failed

The shape this deliverable specifies, applied to this deliverable.

| Claim | Test run | Falsifier | Observed |
|---|---|---|---|
| The three constraint checks still pass | `node tools/verify_haiku.js --prove` | Fewer than 37 of 37 | **37 of 37**, 10 mutations written, 10 applied |
| The suite baseline did not move **across my four writes** | `node oracle/tests/run_suite.js`, 23:19, after my last write at 23:18:03 | Any figure differing from 455 / 85 / 13 / 357 | **455 rows, 85 pass, 13 fail, 357 unrun**, 9 DEFERRED, 0 VACUOUS, 348 unbound. Identical to the wave-open figure |
| The four `af7abec` register failures were not silenced | Same 23:19 run, RFX group | Fewer than 6 RFX failures | RFX-04, -07, -09, -13 still red on the sides-count defect; RFX-34, -35 still red on decoys. Untouched |
| The registers still load clean | `node tools/check_registers.js` | Hard failures above 0 | **0 hard failures**, before my writes @ `622cf37e33141773` over 305 files, and after @ `dfb2868410465325` over 307 files. Two digests, two sets — see the caveat below |
| The six written files are LF only | `grep -c $'\r'` on each | Any nonzero count | 0 on all six |
| §6a's "one in seven" was a measurement, not a guess | `node oracle/router/acceptance.js`, 23:19 | A `REFUSE` count that does not make the class large | `{APP:2, FIGURE:1, BOTH:2, CONTESTED:44, LITERATURE:57, REFUSE:18}` over 124. **18/124 refusals, every one under 200 words by §5's cap.** This command no longer reproduces — see §2a |
| The tier table matches the gameplan and was not reconstructed | `sed -n '567,574p' lunar-oracle-gameplan.md` then `diff` against `model_tier.md` §1 | Any differing line | 8 lines, 8 identical. See §5 |
| Every quoted line from a Cabeus summary is in that summary | `grep -n` on each of the three files for each quoted string | Any string absent, or present only under an attribution to another author | All present. **Step 4 of the procedure fired on `luchsinger-2021`** — see §4 |
| `CLAUDE.md`'s bootstrap-version claim is true as written | `grep -c BC-21` and `grep -n 'core.longpaths=true'` on both files | The claim of a lag being wrong | Lag confirmed: `BC-21` × 6 in the contract, × 0 in `CLAUDE.md`; clone-time `-c core.longpaths=true` in the contract, absent from `CLAUDE.md` Phase 3 |

**A digest caveat, stated rather than reconciled.** `622cf37e33141773` over 305 files was measured
before this file existed; `dfb2868410465325` over 307 files after. `check_registers.js`'s `READ_SET`
(line 98) is the four register files plus `cr_scratch/**/*.md`, so this deliverable and the relay file
are in it and the digest moves **by construction**. That is the digest working. Both runs returned 0
hard failures; the two numbers are two correct measurements of two sets and are not reconciled here.

## 2a. The suite moved after my last write, and the cause is not mine

**Measured.** `run_suite.js` at 23:19 returned 455 / **85 pass / 13 fail** / 357. The same command at
23:22 returned 455 / **59 pass / 39 fail** / 357.

**Cause, evidenced rather than assumed.** `ls -lt oracle/router/` shows `classify.js` written at
**23:20:56** and `wave.js` at **23:21:42** — after my last write at 23:18:03 and between the two runs.
Thirty-four of the thirty-five RFX rows now fail with one identical message: *"classifyQuestion() is
RETIRED at sub-step 8.1. The router advises; it does not decide."* That is W5-1's 8.1 landing, mid-wave
and expected. `INV-7` also flipped. **None of my four files is bound by any of those rows**, and none
of the six files I wrote is in `run_suite.js`'s input set.

**A live consequence for a downstream seat, raised not fixed.** `node oracle/router/acceptance.js` now
returns `verdicts: {}` and `CLOSE CONDITION NOT MET: 124 violation(s)` — it still calls the retired
entry point. That is 8.7's subject (*re-run the fourteen and report what moved*) and it belongs to
W5-1 or to The Space Resources Engineer, not to The Writer. **I have not touched it and I am not
reporting it as green.**

**What I did about it in my own artifact.** `answer_contract.md` §6a originally cited `18 REFUSE over
124` as a bare figure. It now carries the moment and the state it was measured at, and says plainly
that the command no longer reproduces. The ruling never rested on the number: it rests on §5's
sixty-word cap against §6's two-hundred-word threshold, which is a proof and not a measurement. The
number says how much the defect was costing, and a figure whose command has been retired must say so
rather than sit there looking current.

---

## 3. The ruling on `answer_contract.md` §6, and why

**Ruling: both carve-outs are removed. The Oracle emits a haiku and a path line, and nothing else.**
The path line gains a specified form carrying the verdict, the reason code where the verdict is
`REFUSE`, and the path — subject to the same §7 claim-bearing test the haiku is subject to.

**I was asked to measure the cost of removal before ruling, and the measurement went the other way
from what the brief anticipated: the carve-outs were not narrow.**

**Condition 1 fired on an entire verdict class, unconditionally.** §5 caps a refusal at sixty words,
so **every refusal this system can emit is under two hundred words by construction** — the condition
could never fail to fire on a refusal. `node oracle/router/acceptance.js` returns 18 `REFUSE` over 124
questions. Roughly one question in seven was getting a chat block with no judgement exercised
anywhere, and every one of those was exactly the case the author's rule addresses. A carve-out that
fires on a whole verdict class is not an exception; it is a second delivery mode with a threshold
painted on it.

**Condition 2 had no stated scope, and an unstated scope defaults to the convenient reading.** Nothing
said whether "the user asked" was per question or per session. A user says *just show me in chat*
once, a session reads it as standing, and thereafter every answer is a block. This is the erosion the
brief named, and its mechanism is a missing word rather than anybody's bad faith.

**The cost of removal, which is real and which I am not waving away: one file open, on every answer,
including the cheapest one.** The sharp case the brief asked me to price is the one-line refusal. Under
version 2 the user asked something outside the corpus and read sixty words in chat. Under version 3
they get a haiku, a verdict, a reason code and a path, and must open a file to read §5's three nouns.

**The remedy is the path line, not a carve-out**, and this is the part of the ruling that makes it
affordable. `REFUSE · not-found → runs/2026-08-28/r-0143.md` costs the reader nothing and tells them
(a) that nothing was found and (b) that the owner of the fix is an acquisition decision rather than a
rephrasing — `not-found` and `excluded` route to different people, which is why §5 has six codes
rather than one. The open then buys the three nouns, and the three nouns are the part worth a file:
they name the region searched and the nearest present object, which is what a person acts on.

**Why the path line does not reopen what it closes.** A verdict and a reason code are closed-set
tokens naming which of this contract's rules the run executed under. They assert nothing about the
Moon. That is a testable line and not a judgement about tone: the path line is put through §7's
claim-bearing predicate, the same one `verify_haiku.js` consumes, and a path line carrying a numeral,
a unit token, a coefficient name or a named source fails delivery. **If the distinction were a matter
of taste I would not have made it; it is a matter of a predicate that already exists.**

**Reversible, and I have named what reverses it.** A sampling read under
`oracle/sampling_protocol.md` finding readers routinely opening refusal files and finding in them
nothing the path line could have told them. Restoring the two numbered conditions is then a two-line
edit and a version bump. **It is not reversed by anyone finding it inconvenient**, because that is the
observation the ruling was written to survive, and a reversal condition that any irritation satisfies
is not a condition.

**A side effect worth recording: §6 got shorter.** `FIGURE has no chat form` was a special case at
version 2 and is a consequence at version 3, because nothing has a chat form now. Removing the
carve-outs removed an exception rather than adding one.

---

## 4. The finding the worked example produced

`oracle/deliverable_shape.md` §7 works the Cabeus question, and writing it ran the four-step source
verification procedure against all three sides. **Step 4 fired.**

`luchsinger-2021-lcross-water-modeling.md` — side C of `LCC-01` — carries side A's figure, `5.6 plus
or minus 2.9`, at lines 23 and 47, attributed in the same sentence to *"(Colaprete et al. 2010;
Heldmann et al. 2015)"*. A retrieval or a check matching on the number alone assigns side A's claim to
side C's file. Side C's own result is `8.2` / `4.3 wt%` at lines 17, 35 and 41.

**This is a live instance, in this corpus, on the axis the example uses, of the exact failure Wave 4
found twelve of.** It is the argument for §2 of `model_tier.md`: the discriminator is not a model tier
and not attentiveness, it is a fourth step that asks whether the matched line carries an attribution.
Written down, it runs at Haiku. Held in the head, it runs at whatever tier the reader happens to be.

**A second finding, routed rather than fixed.** Sides A and C of `LCC-01` are not independent — side C
re-models the same 2009 LCROSS observation side A reported. Whether an axis whose sides share one
observation is properly three-sided is a register question with a register owner. It is item U1 of the
worked example's `## What remains unverified`, which is the section existing precisely so this does
not have to be either resolved here or dropped.

---

## 5. The tier table was copied, not reconstructed

```
$ sed -n '567,574p' lunar-oracle-gameplan.md > /tmp/gp.txt
$ diff /tmp/gp.txt <(sed -n '/^| Seat | Floor | Why |/,/plot read for its values/p' oracle/model_tier.md)
```

8 lines, 0 differing. The `--` double hyphens in the `Why` column are the gameplan's own and are kept
rather than normalized to em dashes, because a copy that improves the punctuation is a copy nobody can
diff.

---

## 6. Routed

Relay file: `cr_scratch/relay/w5-2_writer_routes.md`. Four items, none of them in my write set.

| Id | To | Item |
|---|---|---|
| R1 | The Software Engineer | `oracle/tests/answering_loop_suite.md` FIL-5, FIL-7 and FIL-8 assert the two removed conditions and are stale at contract version 3. **Argued, not edited** — a test believed wrong is argued. They should become decoys asserting that a chat block is *never* emitted. All fourteen FIL rows carry no binding today, so nothing broke; that is the problem, not the reprieve. **Extended by the 2026-08-28 ruling:** FIL also needs rows for the turn form — 2 to 5 units, one unit fails as a turn, a prohibition in the second unit fires, and a question asked of the user is in the form. Seventeen such proofs now exist inside `tools/verify_haiku.js --prove`; the suite rows that would bind them do not. |
| R2 | The Software Engineer | The version pin reads 2 in three places against a contract reading 3: `oracle/acceptance/transfer_assertions.md` (`CONTRACT_VERSION_UNDER_TEST = 2`), `oracle/register_schema.md` ("Written against version 2"), `oracle/tests/answering_loop_suite.md` VER-2. VER has no executable binding, so **the suite is green over a version mismatch it exists to catch** — the same shape as VER-2's own recorded history. |
| R3 | The Systems Engineer | `CLAUDE.md` implements bootstrap contract **version 2** against a contract at **version 3**. Confirmed lag: `BC-21` absent (6 occurrences in the contract, 0 in `CLAUDE.md`); Phase 3's clone lacks `-c core.longpaths=true`; Phase 4 group 3 is not gated on the copy being present. I stated the lag in `CLAUDE.md` rather than bumping its integer, because bumping it turns the acceptance check green over an unlanded repair. Re-implementing the phases is bootstrap work and is not The Writer's. |
| R5 | **The author** | `oracle/release_gate.md` RG-14 is NOT MET: `git ls-files \| grep -cE '^(LICENSE\|LICENCE)'` measures **0**. The Unlicense is now ruled and its reason recorded in `README.md`, so the wording is settled and only the file is missing. **Writing it executes the dedication**, which the gameplan and the README both treat as the author's act. Not taken. |
| R4 | The Engineer / register owner | Two `oracle/MANIFEST.tsv` rows are owed for `oracle/deliverable_shape.md` and `oracle/model_tier.md`, both promoted from this deliverable at 8.4/8.5; and `oracle/AMENDMENTS.tsv` rows are owed for the version-3 edit. Both files are registers and outside my write set. |

---

## 7. Ledger

**Files written: 8.** Two new contracts, two edited contracts, one edited checker, one edited README, this deliverable, and one relay file.

| Path | Δ | What |
|---|---|---|
| `oracle/answer_contract.md` | edited, 307 -> 421 lines (+114) | Version 2 → **3**. §6 rewritten: shape required, both chat-block conditions removed, path line specified and bound to §7. §6a added: the ruling, its measurement, its reversal condition. §9 records version 3 and rules that this contract grows at the end or at a lettered suffix, never by insertion. §10 added: the evidence pass. |
| `oracle/deliverable_shape.md` | **new**, 268 lines | The TDD-method report. Five closed sections; the header block; §3's four-column falsifier table and the four-step verification procedure; §4's empty-section denominators; §5's rule for who writes which section on a `CONTESTED` run; §6 template; §7 Cabeus worked example; §8 what the shape does not do. |
| `oracle/model_tier.md` | **new**, 104 lines | The gameplan table copied verbatim; the escalation rule; §2 the write-the-procedure-down corollary with source verification as four steps; §3 the Wave 4 correction plus what would settle it; §4 the Haiku hazard as a close condition with two denominators; §5 what it does not rule. |
| `CLAUDE.md` | edited, 328 -> 364 lines (+36) | §4 gains the deliverable shape, the haiku-and-path rule, the model tier and the evidence pass. Head gains the bootstrap-lag statement (R3). |
| `cr_scratch/step8_w5-2_deliverable.md` | **new** | This file. |
| `tools/verify_haiku.js` | edited, 399 -> 597 lines (+198) | `haikuSequence()` generalizes 5-7-5 to 5-7-5 x N by dividing N out of the syllable total and testing prefix-sum membership; `fiveSevenFive()` kept as a delegating export. `unit`/`turn` modes, mode required at the CLI with no default. **A6** unit count 2 to 5, **A7** the run-on tell. Seventeen new proofs. **54 of 54 pass, 37 originals preserved.** |
| `README.md` | edited, +8 lines | The author's reason for the Unlicense over CC0: GitHub's picker surfaces it. Carve-out unchanged. |
| `cr_scratch/relay/w5-2_writer_routes.md` | **new** | Five routed items, R1 to R5, each with its measurement and its owner. |

**Apparatus.** No new instrument was built. The seventeen additions are proofs inside an instrument
that already existed, added because the author's ruling changed what it must assert; extending a
checker's known-answer set is not the same act as minting a checker, and the freeze is on the latter.

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +17/-0
```

**Contract rules changed: 5** — the deliverable shape becomes mandatory, the chat block is abolished, the
form extends to every user-facing turn including questions, the form is fixed at 2 to 5 haiku strung
linearly, and the evidence pass is specified. **Version integer bumped: once**, per §9's per-edit
rule, and §9 now carries the test that decided against a second bump.

---


---

## 8. Author ruling, 2026-08-28: the haiku form. Landed.

The §6 ruling of §3 above was **upheld by the author**, who reached the same conclusion independently.
He then ruled on the *character* of the haiku, and that ruling is landed here.

**Write set, extended.** The coordinator's relay directed the extension of `tools/verify_haiku.js` and
named `README.md`. Both are outside the write set declared at the top of this file, and both were
written. Declared rather than left to be found. `oracle/tests/**` was still not touched.

### 8.1 What the ruling changed

| Ruling | Where it landed |
|---|---|
| Every user-facing turn is haiku form, **including questions** | `answer_contract.md` §6, with the note that an asking exception would be the third carve-out arriving by the route §6a just closed |
| **2 to 5 haiku strung linearly**, no line breaks | `answer_contract.md` §6b; `tools/verify_haiku.js` A6 and `haikuSequence()` |
| The purpose is **whimsy, and it is a control** | `answer_contract.md` §6b, author's words quoted in full, with the two-part argument written out so a later session must argue against it rather than assume it is decoration |
| **Laconic is the standard, not the word count** | `answer_contract.md` §6b: *"Do not write a word-count test and call this section satisfied."* The 200 figure is named a backstop |
| The Unlicense, because GitHub's picker surfaces it | `README.md` §Licence, with the author's reason recorded |

**No version 4 was minted.** §9 of the contract now carries the test that decided it: version 3 had
zero consumers when §6b was added — no log row, the suite still pinned 2, the file uncommitted — so
one state was published and one integer was spent. The test is written down so the next author does
not re-derive it: *has any of §9's three consumers observed the integer yet?*

### 8.2 `verify_haiku.js` extended cleanly, and the extension is proved

**54 of 54 proofs pass. All 37 originals preserved; 17 added. 14 mutations written, 14 applied.**

The generalization is smaller than it looks and the reason is arithmetic. A valid string of N haiku is
exactly 17N syllables, so **N is divided out rather than searched for** — `total % 17` decides it, a
34-syllable text can only be two units and a 35-syllable text can be none. The old O(n²) double loop
became a membership test on the prefix sums: syllable counts are positive, so prefix sums strictly
increase, every boundary occurs at most once, and a boundary that is present is present *at a word
boundary* with non-empty groups for free.

`fiveSevenFive()` is kept as a named export delegating to `haikuSequence(text, {maxUnits: 1})`, so
every caller written before the ruling is untouched.

**The mode is required at the command line and has no default there.** `check()` defaults to `unit`
for existing callers; the CLI refuses without `--turn` or `--unit` and exits 2. The asymmetry is
deliberate and is stated in the file: the risk of a silent default is at the command line, where a
real delivered turn is checked, and a default that cannot be reached by the thing it would excuse is
not an escape hatch.

**The seventeen new proofs, and what each would catch:**

| Proof | The failure it exists to catch |
|---|---|
| `SEQ-TWO-UNITS`, `SEQ-FIVE-UNITS` | Two and five real author-written haiku strung linearly certify, units read 2 and 5 |
| `SEQ-SIX-UNITS-FAILS` | The cap is a cap. Six fails |
| `SEQ-ONE-UNIT-FAILS-AS-A-TURN` | A6. A single haiku is a valid unit and is not a valid turn |
| `SEQ-UNIT-MODE-REJECTS-TWO` | **The discriminator between the modes.** Without it, `unit` could be `turn` with a loose cap and all six CONTROL rows would still be green |
| `SEQ-NOT-A-MULTIPLE-OF-17` | One syllable added to a valid turn and nothing partitions at any N |
| `SEQ-BOUNDARY-MUST-BE-AT-A-WORD` | The assertion a prefix-sum check can lose. `yours others` (1 + 2) becomes `another` (3): total stays 34, both units still look like 17, and the boundary now falls **inside a word**. Must not certify |
| `SEQ-A3-FIRES-IN-THE-SECOND-UNIT` | **The cheapest wrong implementation** — check unit one, call it a turn. It passes every other row here |
| `DECOY-A7-EM-DASH` | The tell the author named |
| `A7-SPARES-THE-SEMICOLON` | See 9.3 |
| `CLI-MODE-IS-REQUIRED` / `-UNIT-` / `-TURN-WORKS` | Exit 2 with no mode; exit 0 with each |
| 4 `MUTATION-APPLIED` rows | INV-11. A decoy that fails to apply is a failure, not a skip |

### 8.3 The known-answer set refuted my first draft of A7, and the refutation is in the file

My first `RUNON_TELL` list read **em dash, semicolon, colon splice**, on the reasoning that all three
are the punctuation of the run-on paragraph the author named. Running `--prove` turned **three of the
six author-written worked haiku red**: #4, #5 and #6 each use a semicolon as the caesura —
`the map has an edge, and your question is over it; I will not guess`.

**The semicolon is not the AI tell in this form. It is the pivot the form is built on.** Em dashes:
**zero across all six.** A7 now holds one entry, which is what the author actually named.

This is the second time on this file that a prohibition list over-fired on the artifact it was written
to protect — the first is recorded in its own §1.3 rule-1 note about `this one` — and both times the
known-answer set caught it before anything shipped. **The refutation is recorded in the checker rather
than quietly repaired**, because a list that was wrong once and says so is more trustworthy than a
list that has always been right.

### 8.4 A worked turn, run

```
$ node tools/verify_haiku.js "the corpus argues with itself, and I will not take a side for you others have stood here, their words are set down below, read them and not me" --turn --verdict CONTESTED
  mode       turn  (2 to 5 units required)
  newlines   0
  units      2
  syllables  34  the-corpus-argues | with-itself-and-I-will-not | take-a-side-for-you
                 //  others-have-stood-here | their-words-are-set-down-below | read-them-and-not-me
  A7         ok
  §1.4       ok, on argues, side
  RESULT     PASS   exit 0
```

It names no source, carries no figure, and does not say which side is right. The spread, the three
sides and the scope token are in the file, each carrying a trace. Carried into `answer_contract.md`
§6b as its worked example.

### 8.5 The Unlicense

**The wording was already right and the reason was not.** `README.md` already read *"following the
Unlicense, as the Lunar Scenario Explorer does"*, with the carve-out intact: the dedication covers
this project's own summaries, contracts, checks and handoffs, and **cannot cover the published works
those summaries describe** — four sources under CC BY-NC-ND 4.0, and four stated as a floor rather
than a census. That carve-out is unchanged and is the part that matters.

What was missing was **why the Unlicense**. The recorded reason was precedent. The author's reason is
better and is now in the file: *"You can't use CC0 on GitHub, you have to use the Unlicense — I mean,
you can, but this way we can just pick a default."* GitHub's licence picker surfaces the Unlicense and
does not surface CC0, so it is the option the host will recognise and display. The two say
substantially the same thing about this project's own writing; one of them is on the menu.

**I did not create the `LICENSE` file, deliberately.** `oracle/release_gate.md` RG-14 is **NOT MET**:
`git ls-files | grep -cE '^(LICENSE|LICENCE)'` measures **0**, and README's own last line says that
until it lands the paragraphs are a stated position rather than an executed dedication. **Writing that
file executes the dedication**, and both the gameplan (8.8) and the README treat release as the
author's act. Routed as R5 rather than taken.

### 8.6 A measurement defect I produced and caught

My LF check ran as `grep -c $'\r' $f` inside a `for` loop within command substitution. The ANSI-C
quoting degraded and grep searched for the literal letter `r`, returning **186, 373, 514, 276, 104,
597** — plausible-looking counts that I could have read as a catastrophic CRLF conversion, or, had the
numbers come back small, as a clean result. Re-run as a byte count in Python: **all eight files
LF-only, zero `\r` bytes.**

Recording it because it is this project's own recurring pattern in miniature: **a check whose pattern
silently became a different pattern, and whose output was plausible enough to act on.** The earlier
run of the same check, with all filenames passed to one `grep` invocation, was correct — so the check
was right, then wrong, with no edit to the check.

## 9. Not mine

- **The FIL, VER and TRC test rows.** Argued in §6 R1 and R2. Not edited.
- **`oracle/router/**`.** W5-1's. Read `classify.js` output via `acceptance.js` only, as a measurement.
- **The registers.** `REGISTER.lunar.tsv` rows 2 and 17-19 were read for the worked example. Not
  written. The `LCC-01` three-sides-sharing-one-observation question is raised and not decided.
- **The bootstrap phases.** R3. The lag is stated in `CLAUDE.md`; the repair is The Systems Engineer's.
- **The four `af7abec` RFX failures.** Untouched and still red.
- **Whether `Set aside: none` is ever honest.** §10 makes it a legal value and says a reviewer checks
  it first. Whether any Manager's open should be allowed to write it is The Manager's to find out at
  8.3's execution, and I have specified the line rather than ruled on its contents.
