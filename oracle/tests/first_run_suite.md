# The first-run sequence content suite — sub-step 6.7

**Written against the contracts, not against the draft, and that ordering was broken and then
restored deliberately.** Sub-step 6.7 is stage 1 of a four-stage TDD sequence and it belongs before
6.8, 6.9 and 6.10. It was assigned to this seat mid-wave, by which time `oracle/first_run_content.md`
had already landed. **This suite was written without opening that file.** Its authorities are
`cr_scratch/step0_writer_register_spec.md` §§1.2–1.4, 1.6, 1.7, 3.1–3.6 and 4.1–4.2, the gate at
`oracle/first_run.md`, and `oracle/bootstrap_contract.md` §3 Phase 7 and §5.

The reason is the reason the Editor gave for putting its 6.5 question in writing before the draft
existed: **a suite written against a draft asserts that the draft is what it is.** That is not a
test, it is a transcript. The measured deviation is recorded here rather than smoothed: *the content
existed before its stage-1 suite, and the suite was written blind to it.*

**28 tests.** Counting rule: rows in the five tables of §§1–5 whose first cell matches
`^[A-Z]{3}-[0-9]+[a-z]?$`, counted over this file. One group: FRC 28. FRC-28 was added mid-authoring when `tools/verify_haiku.js` was found on disk.

```
awk '/^\| *[A-Z]{3}-[0-9]+[a-z]? *\|/{c++} END{print c}' oracle/tests/first_run_suite.md
```

---

## 0. How to read this suite

**`$SEQ` is the file holding the sequence content, `$NOTICE` the degraded-bootstrap notice.** The
sub-step that names those paths is 6.9's, not this suite's; every command below is written against
the two variables so that the suite does not fix a filename it does not own.

**Status.** `green` = expected to pass once the content exists and the check is bound; it is a claim
by this suite's author about what will happen and **it is not a result**. `RED` = the mechanism the
row names does not exist, with an owner and a close condition. `H` = a human gate, listed because it
is part of the contract and marked so nobody counts it as mechanized. `oracle/tests/run_suite.js`
reports every unbound row `UNRUN`, and **`UNRUN IS NOT PASS`**.

**The rows that are already measured say so in their own cell.** Two kinds: FRC-8 through FRC-12
index measurements taken in `oracle/tests/bootstrap_suite.md` §7 during sub-step 6.1, and FRC-1
through FRC-7 and FRC-28 were run against **`tools/verify_haiku.js`**, which exists.

**A premise in this suite's first draft, refuted while writing it.** The draft stated that
`verify_haiku.js` was "named at 5.1, not built" and that no row asserts 5/7/5 because an automatic
syllable counter is a worse instrument than a person. **Both were wrong and neither survives.** The
tool is 398 lines at `tools/verify_haiku.js`; it counts newlines, certifies 5/7/5 against a
dictionary plus a heuristic with an explicit unknown bucket, implements §1.3's prohibition list
including spelled cardinals, implements §1.4's verdict-to-image-family binding as data, and carries
`--prove` decoys. It was found by listing `tools/`, which is what a premise check is for. Measured
against the published draft haiku:

```
$ node tools/verify_haiku.js "a cold room, a lamp, the papers already stacked; ask, and I will read"
  newlines               0
  syllables              17  5/7/5 at a-cold-room-a-lamp | the-papers-already-stacked | ask-and-I-will-read
  §4.4 flat-Oracle       ok
  §1.4 family            not checked: no verdict supplied; §1.4 not checked
RESULT  PASS
```

That last line is FRC-5's finding arriving in the tool's own output, and it is better than the silent
bypass FRC-5 predicted: the tool declines to check rather than passing quietly. **The gap it names is
still open** — the specification has no row for a haiku emitted before any verdict, so the one haiku
every user reads first is the one haiku §1.4 does not govern.

**Two figures the register specification carries that are wrong, corrected here before use.**
§3.6 of that document refers to "his **six** degraded modes"; there are **five**
(`Q-DEGRADED-MODES`), of which **three** block (`Q-BLOCKING-MODES`). The same conflation appears at
`lunar-oracle-gameplan.md` L674. Every row below that names the gate names the enumerated blocking
set and never a count.

**One thing the register specification got right that this suite adopts wholesale.** §3.6's
recommendation — *the sequence plays when every load-bearing path verified and no mode is in force
that makes an answer refuse* — is the reading that was ruled at 1.4 and it is what `oracle/first_run.md`
implements. The author of the content wrote to a rule that had not been ruled yet and wrote to the
right one.

---

## 1. FRC-1 to FRC-7 — the haiku channel

Seven tests. The sequence contains **exactly one** haiku and it is the first beat, so every §1.3
prohibition applies to it, and the linebreak rule applies to it in the one place it is easiest to
violate: a haiku set as the opening line of a prose block wants to be three lines.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| FRC-1 | The sequence contains exactly one haiku, rendered **without linebreaks** | Bound to `node tools/verify_haiku.js "<the haiku>"`, whose first reported field is `newlines`. §3.1: *"Exactly one haiku, rendered without linebreaks like every other haiku in the system."* Measured against the published draft haiku: `newlines 0`, `RESULT PASS`. The suite additionally asserts that `$SEQ` contains exactly one such line and no 5/7/5 block split across three consecutive short lines, which the tool cannot see because it is handed one string | Set the haiku as three lines; the tool reports `newlines 2` and every downstream assertion that assumes one line addresses a third of it | green |
| FRC-2 | The haiku carries no cardinal quantity in any orthography | No digit, and no token from the closed English cardinal / ordinal / multiplicative list. §1.3 rule 1 and §1.8 mechanism 1: `fifteen`, `a dozen` and `twice` pass a digit test and violate the rule. The bright line is worth its cost — a rule that permits safe counts requires the checker to know which counts are safe, and it does not | Add `three beats` or `two registers` to the haiku; a digit-only check passes it | green |
| FRC-3 | The haiku carries no unit token, no comparative implying measurement, no named source, no grade word, no hedge, and no offer of further help | §1.3 rules 2 through 7, as six separate token classes over one line. The grade words are the dangerous class — `proven`, `verified`, `confirmed`, `established`, `certain` — *"the easiest to write by accident, because reassurance is what an answering system wants to offer"* | Insert `and I will tell you what is established`; rule 5 fires and no digit check sees it | green |
| FRC-4 | The haiku's disposition is legible from the haiku alone | §1.4's stated test: hand the haiku to somebody who has seen neither the question nor the deliverable and ask whether the Oracle answered. The opening haiku is the borderline case for this rule, because there is no question yet and therefore no disposition to be legible — which is why FRC-5 exists and why this row is a human gate rather than a word-list test | Not applicable — a human gate has no mutation | H |
| FRC-5 | The opening haiku is governed by the verdict-to-image-family binding, or is exempted in writing | **Neither.** §1.4 binds the governing noun to the family the **verdict** selected, and the opening sequence runs *before any question*, so no verdict has selected a family. §1.4's table has six rows and none is "no verdict yet"; §1.8 mechanism 3 specifies the membership test as data with no null case. Measured: `tools/verify_haiku.js` has a `FAMILIES` table keyed on eight verdict names and, run without `--verdict`, reports `§1.4 family — not checked: no verdict supplied` and returns `PASS`. **The tool is honest about the hole and the hole is still a hole**: the one haiku every user reads first is the one haiku §1.4 does not govern, and it is also the one most likely to drift toward welcome, which is §1.6's row-3 failure | Owner: **The Writer**, at the 0.4 specification. Close condition: §1.4 carries a seventh row for the opening channel, `FAMILIES` gains the corresponding key, and this row asserts the governing noun against it | RED |
| FRC-6 | No rendered line of the sequence wraps into what looks like a linebreak | §1.8 mechanism 2 names *a rendered character-length cap*. **No cap is specified anywhere and none is implemented.** Measured: the only length constant in `tools/verify_haiku.js` is `r.text.slice(0, 100)` in its own display line, which truncates the echo and asserts nothing. The haiku is one line by rule and a terminal is not, so a haiku longer than the reader's width becomes two lines on screen and FRC-1 passes over a file that violates FRC-1's purpose. **This is the family in miniature**: the property is enforced in the file and not in the thing that renders the file | Owner: **The Software Engineer**, at `tools/verify_haiku.js`. Close condition: a character cap is a number in the 0.4 specification, the tool asserts the haiku against it, and this row binds to that assertion | RED |
| FRC-7 | The haiku is not one of §1.6's rejected forms, nor a paraphrase of one | Seven rejected haiku are published with the rule each breaks, and `tools/verify_haiku.js --prove` carries decoys built from them. Two are worth the row on their own: `all is well, the thing you asked for rests below, go and read it now` passes §1.3 **entirely** and fails §1.4, and `the search is complete, the answer is in the file, please read it below` describes the mechanism, which is §4.4 and which the tool's `MACHINERY` list does catch. Both are the shapes an opening haiku is most likely to drift toward, because both are welcoming — **and the first of the two is exactly what FRC-5's open hole would let through** | Replace the haiku with a welcome that says the system is ready; it passes every token test, it is §1.6 row 3, and with no verdict supplied §1.4 is not checked | green |
| FRC-28 | The haiku's syllable count is **certified**, not assumed, and an uncountable word refuses to certify rather than passing | `tools/verify_haiku.js` returns three outcomes, not two: `PASS`, `FAIL`, and **`UNCERTIFIED`** when a word is outside its dictionary and its heuristic. Measured on the published draft haiku: `syllables 17  5/7/5 at a-cold-room-a-lamp \| the-papers-already-stacked \| ask-and-I-will-read`, `RESULT PASS`. The tool prints its own limit in the same breath — *English syllable counting is not decidable by algorithm ... an unknown word is a REFUSAL TO CERTIFY, never a pass* — which is `UNRUN IS NOT PASS` implemented inside an instrument rather than around it | Collapse `UNCERTIFIED` into `PASS`; a haiku built from words the dictionary does not hold then certifies as 5/7/5 without anything having counted it | green |

---

## 2. FRC-8 to FRC-12 — plays once, and only after a bootstrap that is not degraded

Five tests. **These five are already measured**, in `oracle/tests/bootstrap_suite.md` §7, because they
are assertions about the gate and the gate exists. They are restated here rather than cross-referenced
alone, because 6.7's brief names them and a suite that points at another suite for its headline
assertion has not made it.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| FRC-8 | The sequence plays when the flag is unset and no blocking mode is in force | Measured at `BFR-1`: flag `{attempted_at: null, completed: false}`, mode set empty, `phase7 = {flag_unset: true, mode_set_permits: true, plays: true, blocked_by: []}` | Gate on the flag alone; a first install with a missing model then gets the introduction | green |
| FRC-9 | The sequence plays **once** | Measured at `BFR-2`: with `first_run.completed: true` and everything else identical, `plays: false`, while the outcome stayed `CLEAN` and the whole bootstrap still ran. Once means once per install, and §4 of `oracle/first_run.md` records why every other location for the flag makes *once* mean something the user does not mean | Set the flag anywhere that pushes; the introduction is then suppressed for everyone who clones after the author's first run | green |
| FRC-10 | The sequence does **not** play after a degraded bootstrap, on every blocking mode | Measured at `BFR-3` across six independent blocking conditions — `offline`, `partially-acquired`, and four separate routes to `present-but-wrong`. Every one reported `plays: false`. The mode set is tested by **intersection** with `{offline, present-but-wrong, partially-acquired}`, never by equality and never by a judgement about success | Test the set for equality with a blocking mode; a set holding both `dirty-or-diverged` and `offline` then passes | green |
| FRC-11 | A degraded bootstrap **leaves the flag unset**, so the introduction is still owed | Measured at `BFR-3`: all six blocking runs reported `flag_unset: true` beside `plays: false` and wrote nothing. §3.5: *"the user has not spent their first impression on a broken system"* | Set the flag when the gate closes; the introduction is spent on a session that never played it, and deleting the state file becomes the only remedy | green |
| FRC-12 | A dirty or stale working copy does **not** suppress the sequence | Measured at `BFR-1` via `BMD-6` and `BMD-7`: `moved-on` and `dirty-or-diverged` both produced `plays: true`. This is the boundary §3.6 said it could not rule and flagged to this seat: read strictly, "after a bootstrap that fully succeeded" means the author — who edits `lsei/` in another window most days — never sees the introduction. The strict reading was rejected at 1.4 (`AM-02`, `AM-17`) and `usable` was closed to make the rejection testable | Define `usable` as "in no mode"; the author blocks his own first-run sequence on the normal case | green |

---

## 3. FRC-13 to FRC-18 — no team-register prose leaks into it

Six tests. §4.1: *everything the user reads is either a haiku the orchestrator composed, or bytes the
team wrote to a file, and no byte crosses from one class to the other.* The opening sequence is the
one place the Oracle speaks in **prose**, which makes it the one place the two registers can be
confused without anybody noticing.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| FRC-13 | The sequence asserts only about itself | Every sentence's subject is the system, the user, or the exchange between them. §3.2: nothing about the Moon, nothing about economics, nothing about what the corpus contains. The warrant is that these are the only claims a user can check in the next thirty seconds, which is the only warrant available before any question has been asked | Add one sentence about lunar ice or about what the corpus covers; the sequence then makes a claim with no trace in the one channel that runs before tracing exists | green |
| FRC-14 | The sequence states **no count** | No numeral and no spelled cardinal anywhere in `$SEQ`, not only in the haiku. §3.2 is explicit and gives the reason from evidence: loose end B5 established that the obvious candidate is wrong — `182 sources` is a filename count and the true distinct count is somewhere near 162 to 173. The shelf holds **169** `.md` files today, at `99d3601`, and that figure will move again. *A number in the opening is a number nobody re-verifies, in the one place every user reads* | Write `169 summaries`; it is true today, it is a filename count tomorrow, and it is in the one paragraph nobody revisits | green |
| FRC-15 | The sequence carries no deliverable-register construction | None of §2.4's forbidden shapes: no metadiscourse about retrieval (`Based on the corpus`, `According to the retrieved sources`, `The literature suggests`); no sentence whose subject is the answer (`This analysis shows`, `It is worth noting`, `Importantly`); no grade word outside the closed three; no offer of further help; no section headers; **no emoji, in any Oracle turn**. The deliverable register is flat prose written by people who do not rhyme, and the opening is not it | Insert `It is worth noting that refusals are common`; §2.4 clause 3 fires and it is `signs_of_ai_writing.md` Category 8 | green |
| FRC-16 | The sequence promises nothing it cannot keep | §3.3, five clauses: not that it knows anything in particular; not breadth it does not have — `Ask me anything about the Moon` is disqualified by ten thin patches and a declared exclusion list; not speed, certainty or completeness; **not that refusals are rare**; and not the team's capabilities in the Oracle's voice. It may say it will hand the question to people who write flat; it may not characterise how good they are | Write `Ask me anything about lunar industrialisation`; the first refusal then arrives as a bill for a promise the opening made | green |
| FRC-17 | Beat two exists and states refusal as a capability | The sequence has three beats and the second is the hard one: what it will refuse, stated as something it does rather than something that goes wrong. §3.3: a sequence that implies refusals are rare *"sets up the first refusal to read as a malfunction"*. The published draft's `That happens often. It is not a malfunction.` is the sentence the whole sequence exists for | Cut beat two for length; the sequence then introduces an answering system and the first refusal reads as a break | green |
| FRC-18 | No team context recipe carries this specification or the haiku contract | §4.2 clause 2, direction: the orchestrator reads team files; the team never reads the haiku. **A persona that knows the orchestrator rhymes will start rhyming.** Checked over the context recipes for `LITERATURE`, `CONTESTED` and cross-field spawns: none names a register document. *The cheapest leak in the system to close and the easiest to open by accident when somebody assembles a context recipe generously* | Add `cr_scratch/step0_writer_register_spec.md` to a persona recipe "for tone"; the leak is one line and is invisible in the output until a deliverable arrives in seventeen syllables | green |

---

## 4. FRC-19 to FRC-23 — the degraded-bootstrap notice

Five tests. §3.5 and §1.7. **This is a separate artifact from the sequence and the suite treats it as
one**, because the failure this pair exists to prevent is a shortened, apologetic sequence standing in
for the real one.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| FRC-19 | The notice contains **no haiku and no first-person Oracle voice** | §1.7: the Oracle speaks in haiku for the disposition of a question and nowhere else; operational reporting is plain, terse, and signed by the system. `$NOTICE` contains no 5/7/5 line and no first-person singular attributable to the Oracle. *A character who appears first in a failure state is a character the user distrusts afterwards*, and there is a second reason worth naming: an error message's job is to be actionable, and seventeen syllables cannot hold a path | Open the notice with the haiku "for continuity"; the user meets the Oracle in a broken state and the joke is at the expense of somebody whose tooling just broke | green |
| FRC-20 | The notice states the **consequence for answering**, not only the fact of the failure | §3.5 rule 2: `lsei/ not on disk` is a fact about a directory; the sentence after it is what the user needs. The notice names which verdicts are refused. This is `oracle/bootstrap_contract.md` §6's refusal rule surfacing in prose, and it is measurable: `BSH-6` observed `refused_verdicts=["APP","FIGURE","BOTH"]` with `LITERATURE` still available | Print the mode set and stop; the user learns a vocabulary instead of a consequence | green |
| FRC-21 | The notice is **not a shortened form of the sequence** | No sentence of `$NOTICE` appears in `$SEQ`, and the notice does not introduce the Oracle. `oracle/first_run.md` §3 states the structural reason: the flag stays unset and the sequence will play in full later, so a user shown half of it and then all of it has been shown a broken system twice | Reuse beat one of the sequence as the notice's opening; the introduction is then half spent and the flag says it was not spent at all | green |
| FRC-22 | The notice names which copy is in which state, per copy | The published draft's shape — `cr-agents/ cloned at f0c976b`, `lsei/ not on disk; network unreachable` — carries the two facts §5 of the contract makes per-copy. `BMD-2` measured the asymmetric case this exists for: the method absent and the model present, origin `app` still available and `refused_verdicts` empty. **A notice that says "the bootstrap failed" cannot express that** | Report one aggregate status; `partially-acquired` then reads the same as both copies offline, which `BMD-3` shows is a different install | green |
| FRC-23 | The notice fires whether or not the introduction has been seen before | The notice is about **this session**; the introduction is about **this install**. `oracle/first_run.md` §5 rules that the opt-out suppresses the introduction and does not suppress the notice. A session on a fifth run with a broken clone gets the notice and no introduction | Gate the notice on the first-run flag; the author, whose flag has been set for weeks, then loses every degraded-bootstrap report he would ever see | green |

---

## 5. FRC-24 to FRC-27 — replay safety

Four tests. §3.6. **The sequence must be safe to replay**, and the flag's `completed` field exists
precisely so that a half-played sequence replays whole.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| FRC-24 | The sequence references no prior state | No `welcome back`, no `again`, no `as before`, no second person past tense. §3.6. The interrupted state is real and ordinary — `BFR-5` observed all three flag states, and `install_state.md` §3's second published fixture *is* the interrupted case — so a sequence that assumes it is being read for the first time will be wrong on the ordinary replay | Add `Good to see you again`; on the interrupted replay the user is greeted as a returning visitor by a system introducing itself | green |
| FRC-25 | **One turn, one emission** | The sequence is not split into pieces that only make sense in order across turns. §3.6. This is the property that makes an interrupted sequence recoverable by replaying it rather than by resuming it, and resuming is what the two-write flag design deliberately does not support: the fields distinguish *interrupted* from *unplayed* so that the interrupted one **replays**, not so that it continues | Split the three beats across three turns; an interruption after beat two leaves no state that can express where it stopped, and the flag design has to grow a fourth state to carry it | green |
| FRC-26 | A second clone on a second machine plays it again, and nothing in the content changes | §3.6 and §4 of `oracle/first_run.md`. The sequence introduces an install. The content contains no per-machine, per-user or per-clone element, so the same bytes are correct on the second machine as on the first | Add the repository path or a machine name; the sequence stops being content and becomes a report | green |
| FRC-27 | The opt-out does not change the content | `oracle/first_run.md` §5 adds `.oracle-no-intro` as a third gate condition, deliberately not as a fourth state of `first_run`, so that a human choice stays distinguishable from a played sequence. **The content has no opt-out branch**: nothing in `$SEQ` mentions it, and the opt-out's visibility obligation is discharged on the status line, which is never folded into the sequence. Note the gate row for this is itself owed — `oracle/first_run.md` §7 `FR-7` has no assertion in `oracle/tests/bootstrap_suite.md`, and this row asserts the content half only | Have the sequence mention how to turn itself off; the introduction then spends part of its ninety-odd words teaching the user to dismiss it | green |

---

## 6. What this suite does not cover

1. **Word count.** §3.1 caps the sequence at 120 words and the published draft is 94. That is a
   one-command check and it belongs in whatever binds this suite; it is not given a row because a
   word count is not a property this suite could be wrong about.
2. **The content itself.** This suite was written blind to `oracle/first_run_content.md`. Running it
   against that file is 6.8's validation step and it has not been done here. **Every `green` above is
   a claim about a file this suite's author has not opened.**
3. **The §1.4 human test.** *Hand the haiku to somebody who has seen neither the question nor the
   deliverable and ask whether the Oracle answered.* FRC-4 carries it as `H`, and
   `tools/verify_haiku.js` says in its own output that word-list membership is *the bindable half of
   that, not the whole*.
4. **Two of §1.8's four named mechanisms.** Mechanism 1 (spelled cardinals) and mechanism 3
   (image-family binding) are implemented. Mechanism 2 (the character cap) is not, and is FRC-6.
   Mechanism 4 (reusing `verify_register.js`'s grade-word blacklist rather than keeping a second
   copy) was not checked here and is not claimed either way.

---

## Not mine

| Finding | Sub-step | Owner |
|---|---|---|
| §1.4's verdict-to-image-family binding has no row for a haiku emitted before any verdict, which is exactly what the opening haiku is. A checker built to §1.8 mechanism 3 either fails it or is given a silent bypass. FRC-5. | 0.4 specification | The Writer |
| §1.8 mechanism 2 names a rendered character-length cap and no document supplies a number. Without it FRC-1 passes over a haiku that wraps to two lines on screen. FRC-6. | 5.1 `verify_haiku.js` | The Software Engineer |
| `cr_scratch/step0_writer_register_spec.md` §3.6 reads "his six degraded modes". There are five, of which three block. Same conflation as `lunar-oracle-gameplan.md` L674. | 0.4 artifact | The Writer |
| This suite is not in `run_suite.js`'s `SUITES` array and no row carries an executable binding. Every `green` here is a claim. | 6.7 / 2.19 | The Software Engineer |

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +28/-0
```

**TDD spend, not freeze spend.** 6.7 is stage 1 of a four-stage TDD sequence and the suite is its
deliverable.
