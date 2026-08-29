# Step 8, W5-1 — the router advises

**The Software Engineer**, seat W5-1. Sub-steps **8.1**, **8.2**, **8.6**.
Repo `HEAD = cc1b8b8` at the open. Every count below carries its command and a read-digest.

---

## 0. The premise check, run first, and it refuted my brief twice

Standing clause 1: *assume your brief is wrong until you have run something*. Two of its factual
claims are wrong and one of my own assertions had to be withdrawn.

**(a) The echo-key count is not seven, and two of the named seven are not echoes.** The brief said
*"`ice power mass fission phi_c transDistKm phi_c0`, 7 of `model()`'s 26 keys, echo the caller's own
input back."* I probed the app rather than trusting it — vary the address across all nine
(scenario, phase) points this grammar can build, watch each key:

| grade | keys | measured basis |
|---|---|---|
| `input_echo` | `fission ice mass phi_c power` | `out[k] === args[k]` at all 9 addresses, and `k` is an input key |
| `constant` | `envMassFrac envPowerFrac phi_c0 transDistKm` | one distinct value across all 9 addresses |
| `computed` | the other 17 | 2 or more distinct values |

`transDistKm` and `phi_c0` are **not echoes**: they are `a.x != null ? a.x : <const>`, and this
router's `scenarioArgs()` supplies neither, so both are fixed at 3 and 0.10 at every address it can
build. They are defaults, not echoes. The brief also **missed `envPowerFrac` and `envMassFrac`,
which are genuinely computed and nonetheless constant** across the whole addressable space.

So: **nine of twenty-six keys carry no address-dependent information, in three different ways** —
not seven in one. The substance of the brief survives and is strengthened. Three grades ship, not
two, and the grades are **probed at context load, not listed**, because a list goes stale the first
time the app changes and a stale list here reads as an answer.

**(b) "Every question yields findings" is false, and asserting it would have been harmful.** Run
against the real sets, two of the 44 rows in `oracle/acceptance/labelled_questions.tsv` return
nothing on all five channels: `N-10` (*"How do antibiotic resistance genes spread through hospital
wastewater systems?"*) and `N-12` (*"How did the Antarctic ozone hole respond to the Montreal
Protocol?"*). They are deliberate out-of-scope controls. **Asserting `findings > 0` would have
demanded that the router hallucinate evidence for a question about hospital plumbing.**

What the harness asserts instead is the property that actually protects a reader: **a zero is never
left as an absence.** Either the report carries findings, or it carries `no_findings_anywhere: true`
with a note saying all five channels ran, against how many axes, nodes and patches, and that *an
empty result and a broken install are the same shape.* An unstated zero is the failure; a stated
zero is a finding.

**(c) My own claim, withdrawn.** I asserted in a first draft that four axes miss their own
`probe_pos`. It is **five**. `LCC-14` is the fifth and it never failed RFX because it is `one_sided`
and RFX expects `LITERATURE or BOTH` for that class — so a `one_sided` axis missing its own probe
was invisible to the old row *by construction*. The relocation found it.

---

## 1. Gates, before and after, with digests

```
node oracle/tests/run_suite.js
node oracle/router/tests/router_suite.js
node oracle/router/acceptance.js
node oracle/tests/fault_inject.js
```

| gate | before (`cc1b8b8`) | after | mine? |
|---|---|---|---|
| `run_suite.js` | 455 rows, **85 pass, 13 fail, 357 unrun** | 455 rows, **59 pass, 39 fail, 357 unrun** | see §5 |
| `router_suite.js` | 14 tests, **14 pass** | **16 tests, 16 pass** | mine, +2 rows |
| `acceptance.js` | 124 questions, exit 0, 11/14 agree | 124 questions, exit 0, meaning changed — §4 | mine |
| `fault_inject.js` | 8 written, **5 applied** | 8 written, **8 applied**, 5 pass, 3 fail | mixed, §5 |
| `check_registers` / `verify_corpus` | not touched | not touched | — |

**`unrun` did not move.** 357 before, 357 after. No row became unrunnable; the module loads and every
binding executes.

### Read-digests (sha256, first 16 hex)

| file | before | after |
|---|---|---|
| `oracle/router/classify.js` | `16212e75435f7f02` | `c8aeb0674cb5be5b` |
| `oracle/router/acceptance.js` | `6c031217205a130c` | `8d638307dcb9f2a0` |
| `oracle/router/wave.js` | `b6e7425b0b8658d9` | `e7d2efddd805ca48` |
| `oracle/router/axis_threshold.json` | `41496d3e0cd0abfc` | `ff093a9e01aff4bc` |
| `oracle/router/thin_threshold.json` | `a9cc14f32e4abbd2` | `129b5f528da7570a` |
| `tools/address.js` | `313ba5069ea6b67f` | `313ba5069ea6b67f` **unchanged** |
| `tools/exclusions_match.js` | `6a4b2c279b74fe09` | `6a4b2c279b74fe09` **unchanged** |

Both `tools/` files were in my write set and neither needed a byte. The change is entirely in the
router's decision surface, which is the correct blast radius for it.

---

## 2. Sub-step 8.1 — the router stops deciding and starts advising

### 2.1 What was deleted

`classifySubClaim`, `compose`, `dominantCode`, `assertOneMode` and `classifyQuestion`'s
verdict-picking body. All four **throw a sentence naming the replacement** rather than vanishing,
because a caller that reaches for one is expecting a decision and `Cannot read property 'verdict' of
undefined` three frames down says nothing.

### 2.2 Modes became channels, and that is the whole sub-step in one line

The old file ran **four exclusive retrieval MODES in precedence order and stopped at the first hit.**
Precedence *was* the decision. A question that resolved against the app never showed its register
evidence; a question that reached the shelf never showed its near-miss axes.

Five **CHANNELS** now run on every sub-claim and all five are reported side by side. Nothing is
suppressed by something else having matched.

| channel | reports |
|---|---|
| `register` | **every** axis with ≥1 key hit — mass, mark, signed margin, margin as a fraction of the mark, which side, exact-mass ties, whether one key carries it, side resolution, confidence + why |
| `app` | scenario/phase/knob/landed-cost named, outputs named **with a grade each**, echo and constant warnings, the resolved address, points, unbound dimension, coefficients, derivation note |
| `exclusions` | candidates with token overlap, the app's own outcome and where that outcome maps in the app's closed three-entry table, the app's own sentence, nearest present object |
| `thin_patches` | every patch with any mass — mass, both marks, both signed margins, which it crosses, the substitution record, the patch's own declared code |
| `retrieval` | scored count, candidates with score and confirmation fraction, threshold, top confirmed |

**The ordering rule that made precedence worth having survives, and is asserted rather than
arranged.** The four text-only channels are computed from the sub-claim's own words *before*
retrieval runs; retrieval runs exactly once and reads none of them. Every report carries
`retrieval.runs === 1` and `ran_after_text_channels === true`, and `adviseQuestion` re-asserts both
across the whole question. Retrieval cannot talk the register into firing, and a confident search
result cannot manufacture a topic. No second retrieval repairs a first.

### 2.3 The evidence the filter destroyed, measured

The line deleted is `if (mass >= ctx.K && hits.length > 0) fired.push(...)`. Here is what it was
destroying, on the author's own two examples:

| fixture | axis | mass | mark | margin | keys matched | under the old gate |
|---|---|---|---|---|---|---|
| SRQ-12 | **LCC-07** — *the energy cost of oxygen production* | 1.540 | 2.431 | **−0.891** | `oxygen`, `energy` | **filtered out; never reported** |
| SRQ-8 | **LCC-09** | 0.428 | 2.431 | **−2.003** | `power` only | **filtered out; never reported** |

SRQ-12 *asks the energy cost of oxygen production*. The key that would have carried the rest of the
mass reads **`kwh`**; the question reads *"kilowatt hours"*, which tokenizes to `kilowatt` and
`hours` and matches neither. SRQ-8 carries **`polar`** against *"pole"*.

And underneath SRQ-8, a finding the old code could not have expressed at all: **LCC-06, LCC-09 and
LCC-10 score EXACTLY 0.428**, all three on the single shared key `power`. Three axes, one number, no
way for the score to tell them apart. A ranked list prints one of them first and looks like it chose.
The report now carries `tied_at_identical_mass_with` on every finding, and **any tied finding is
forced to `very-low` confidence regardless of its margin.**

### 2.4 What was kept, deliberately

- **`VERDICTS` and `REASON_CODES` stay closed and stay exported.** The assertion machinery stays and
  still throws — but the *checker and the decider are now different agents*, which is the only
  arrangement in which an assertion is worth anything. This project has already been bitten twice by
  a checker that agreed with itself.
- **`loadContext`**, with the bug fixed (§2.6).
- **The CONTESTED side-resolution by path against `INDEX.tsv`, with its side-count assertion.** It is
  a lookup, not a score. What changed is only the *consequence*: an unresolved member used to become
  `REFUSE/axis-incomplete`, which is a decision; it is now a reported defect with the member named.
  **The assertion that still throws** is the one that stops a side vanishing from the report — every
  declared side is accounted for as resolved or unresolved and the two counts must add up.
- **`CODE_PRECEDENCE`.** The function that *applied* it is deleted; the order is published on every
  report, because it is a statement in contract §5 about who owns a repair.

### 2.5 The one-way valve

`assertNoVerdict(report)` walks every report to every depth for a key named `verdict`,
`reason_code`, `reasonCode` or `mode`. It runs **inside `adviseQuestion` on every call** and **again
in the acceptance harness**, because an assertion that lives only inside the thing it checks is the
thing checking itself.

`closed_set` and `verdict_options` are the **menu** and are allowed. A key literally named `verdict`
is not. This is the only thing standing between this file and somebody re-adding a convenience
verdict field in six months, and it is cheap enough to run 124 times a second.

Three downstream key names were renamed to pass it honestly, and each rename is a truth-telling
improvement rather than a workaround:

- exclusion findings carry `outcome_maps_to` / `outcome_maps_to_code` with
  `outcome_mapping_is: 'a lookup in the app's own closed three-entry outcome table, not a score'`.
  It is the **app's** declaration about its own boundary, not this tool's choice.
- thin findings carry `patch_declares_code` — the register author's code, written against the patch,
  not against this question.

### 2.6 The `registerPaths` bug, fixed

`loadContext` declared `registerPaths` in W4-2's relayed signature and **ignored it in the body**;
the register pair was hard-coded relative to `root`. Three fault-injection decoys had to stage an
entire fake `root` to reach it, which is a harness working around a defect rather than testing
through an interface.

Honoured now, with the field read off the file's own basename so a caller may stage a register
anywhere. Proved directly, not inferred:

```
staged a one-axis register at a temp path, passed it as registerPaths
  -> axes loaded: 1  | ids: LCC-01  | registerPathsRead: [REGISTER.lunar.tsv]
before the fix this read the real registers and reported 33
```

**Two decoys that had been failing since W4 now pass because of it** — `I4c` and `I4d`, which is
`INV-8` and `INV-9`. `fault_inject` decoy application went **5 of 8 → 8 of 8**.

### 2.7 `selectWave` takes the verdict as an argument

```
  was   selectWave(questionVerdictObject, ctx)      // read a verdict the router chose
  now   selectWave(verdictString, { field, axes }, ctx)
```

Reading the verdict off the router's own output was the last place a decision entered the persona
wave without anybody choosing it — the file's own opening line read *"THE VERDICT THE ROUTER ALREADY
COMPUTED SELECTS THE WAVE"*, and it was true, and that was the defect.

Everything the wave selector was actually *for* is untouched: `ARITY`, the derivation, one persona
per side with **no cap**, `assertDerived`, `assertDisjointBriefs`. A session may rule any of the six;
it may not rule a persona count.

Two new throws, both asserted in `router_suite`:

- **the pre-8.1 object-shaped call is refused by name.** Silently accepting it is how a verdict
  arrives unruled.
- **a CONTESTED ruling that names no axis throws.** The router used to supply the axis by scoring.
  The report now shows every axis with a key hit and picks none, so *which disagreement was ruled* is
  the session's statement and a wave without one is a verdict with its evidence detached.

---

## 3. Sub-step 8.2 — low weight, stated inline

The author asked for this tool's result to carry **very low weight**. A caveat in a design note is a
caveat the reading session may never open, so every report carries it inline.

### 3.1 `RELIABILITY`, on every report

`weight: 'VERY LOW'` with the ruling that set it quoted; what this is; who rules; the confidence
scale; the threshold disposition; and two clauses the acceptance harness asserts by name:

> **A non-match is weak evidence of absence.** […] FM-1 and FM-2 are two measured cases where the
> right answer was present in the register and the score did not find it. […] The asymmetry is real
> and it runs one way: a match is mild evidence FOR, a non-match is barely evidence AGAINST.

> **Override on judgement.** You are expected to overrule this report. If the axis statement plainly
> answers the question and the mass is below the mark, the mass is wrong. If the address resolves and
> the key is an echo, the address is worthless. […] This tool exists to put evidence in front of you,
> not to save you from reading it.

### 3.2 `FAILURE_MODES`, five worked examples, verbatim, with the measured numbers

| id | name | the point |
|---|---|---|
| FM-1 | a register key the reader would never write | SRQ-12 / `kwh` vs "kilowatt hours", LCC-07 at 1.540, margin −0.891. *No reader misses this. Only a scorer does.* |
| FM-2 | a morphological miss, and a three-way tie underneath it | SRQ-8 / `polar` vs "pole", 0.428 with LCC-06 and LCC-10 at the same number. *Read `tied_at_identical_mass_with` before reading the order.* |
| FM-3 | a perfectly-formed address that answers nothing | the nine echo/constant keys. *`resolves: true` is not `answers: true`.* |
| FM-4 | the bar was a coin-flip and the number hid it | 2.44 and 2.42 are the same measurement on opposite sides of 2.431 |
| FM-5 | decomposition is a heuristic and never became anything else | *if the sub-claim boundaries look wrong to you, they are wrong* |

Each carries `question`, `fixture`, `what_happened` and `the_point`, and `router_suite` RT-16 asserts
all four fields are present on every one.

### 3.3 Confidence, per finding, with the reason in the finding

Scale `none / very-low / low / moderate / high`. Two rules, both stated in the artifact:

- **Every word-match score is capped at `moderate`.** Register mass, thin mass, exclusion overlap and
  retrieval score are all the same instrument, and that instrument demonstrably misses `kwh` and
  `polar`. Nothing measured that way earns `high`.
- **`high` is reachable in exactly one place**: a fully-bound app address on a **computed** key. That
  is arithmetic the app performed with a recompute trace, not a token overlap. **An address on an
  echo key earns `very-low` however well-formed it is**, and on a constant key `low` — asserted in
  RT-16.

Margin-derived confidence: within 10% of the mark → `very-low`, *"a coin-flip wearing a number"*;
under 35% → `low`; otherwise `moderate`. **Any exact tie forces `very-low`** regardless of margin.
And because a finding can be confidently *below* the mark and still be the right axis, every
below-mark reason carries the asymmetry with it rather than leaving the reader to remember it.

Distribution over the 124 questions, top axis per question:
`{"moderate":56,"low":22,"very-low":25,"(no axis)":21}`.

---

## 4. What the acceptance harness now measures — and what it cannot

`node oracle/router/acceptance.js`. **This is the paragraph to read before quoting a number from it.**

### It measured, and cannot any more

| | why it is gone |
|---|---|
| exactly one verdict per question, from the closed six, never two never zero | there is no verdict |
| never two retrieval modes on one sub-claim, never zero | there are no modes; the channels are not exclusive by construction |
| **agreement with the labelled column — the 11-of-14 this project has quoted since Step 4** | nothing to agree *with* |

All three were assertions about a decision this program no longer makes. **The 11/14 figure is
retired, not improved and not degraded, and any later document quoting it against this tree is
quoting a measurement of a deleted function.**

### It measures now, and every one executes on every run

1. **Well-formed.** Required fields on every report; all five channels on every sub-claim; **every
   finding carries a confidence from the published scale *and* a stated reason** — a finding with a
   confidence and no reason is the shape this whole sub-step exists to stop.
2. **Every question yields findings, or says in words that it did not.** See §0(b).
3. **The closed set is still closed** — **25 probes** that *call* `assertVerdict`, `assertReasonCode`
   and `assertNoVerdict` with legal and illegal values and require the outcome, plus two that require
   the retired entry points to throw. A closed set nothing tries to break is a closed set nobody has
   tested.
4. **No report contains a verdict field**, walked to every depth.
5. **Retrieval ran once, and after the text channels**; nothing suppressed by a threshold.

### It reports, without asserting

6. **Evidence reachability** on the 14 labelled rows — *not* an agreement test and **not comparable
   to 11/14**. It asks whether the evidence a reader would need to reach the label is present in the
   report. **13 of 14 reachable.** The one that is not is `SRQ-10`, routed to 8.7 (relay R-3).
7. **The relocated `af7abec` finding** — the five axes below the mark on their own `probe_pos`, with
   the masses.

### Measured output, this tree

```
questions advised: 124   sub-claims: 126   findings: 1017
channels: register 273 axis findings, app 5 resolutions, exclusions 180, thin 57, shelf 502 candidates
questions with ZERO findings: 2  (each DECLARES the empty result)
app answers on an echo/constant key: 0 of 5 resolutions
CLOSED-SET PROBES: 25 of 25 pass
EVIDENCE REACHABILITY: reachable 13, not reachable 1
AXES BELOW THE MARK ON THEIR OWN probe_pos: 5 of 33
```

`router_suite.js` gained **RT-15** and **RT-16**, which make 8.1's and 8.2's own close conditions
executable — RT-15 fails if the axis filter ever comes back, or if `kwh`/`polar` ever start matching
and the worked examples stop describing reality.

---

## 5. Which moved numbers are mine, and which I inherited

**`run_suite.js`: 85 pass / 13 fail → 59 pass / 39 fail. Δ = −26 pass, +26 fail. `unrun` unchanged at
357.** Two groups moved and they exactly account for the total; no third group shifted.

| group | before | after | Δ | mine? |
|---|---|---|---|---|
| `RFX` | 35 rows, 29 pass, 6 fail | 35 rows, 1 pass, **34 fail** | −28 pass | **mine** — interface |
| `INV` | 15 rows, 2 pass, 3 fail | 15 rows, **4 pass**, 1 fail | **+2 pass** | **mine** — the `registerPaths` fix |

**The 28 RFX rows are mine and I am not pretending otherwise.** `RFX-01..33` call `classifyQuestion`
and compare `q.verdict` against the axis class. That property no longer exists. Every one of the 28
fails with **the same self-describing sentence** naming `adviseQuestion` as the replacement — loud,
identical, and diagnosable in one read, which is the best available outcome for a file I may not
edit. `oracle/tests/run_suite.js` is not in my write set; the re-point is routed with the new call
shape written out (relay R-1).

**The `af7abec` four are not silenced.** `RFX-04/07/09/13` recorded that four axes do not reach K on
their own `probe_pos`. That measurement now prints from `acceptance.js` **with the masses and signed
margins the old rows never carried** — and the relocation found a fifth, `LCC-14`, which the old row
could not see because it is `one_sided`.

**The +2 in `INV` is mine and is a repair, not a regression.** `INV-8`/`INV-9` were failing *"the
decoy did not apply"* at the wave open, because `loadContext` ignored `registerPaths`. `INV-11` still
fails — it counts decoy failures, and three decoys now fail on the retired interface (relay R-2).

**Nothing in the underlying behaviour regressed, and I checked rather than assumed.** With the app
missing, `loadContext` still sets `ctx.refuse`, `adviseQuestion` returns
`inputs_unavailable: ["the app at …"]` with `sub_claims: []`, and a shelf-only answer to an app
question remains impossible — there are no sub-claims to carry one. That was `INV-7`'s whole point
and it holds.

**Not mine, and untouched:** `PTH` 1 fail, `MRG` 3 fail. Both were failing at the wave open and
neither is in my write set.

---

## 6. Sub-step 8.6 — the calibrated thresholds, one disposition each

The recommendation in my brief was *keep the masses, retire the thresholds as gates, keep the
calibration files as the record*. **I concur, and I refuse one word of it with a measurement:** they
are not "no longer live inputs". They are **still read**, and *only* so a margin can be computed. A
mass with no scale is unreadable — 1.540 means nothing alone; 1.540 against 2.431 is a near miss and
0.428 against 2.431 is not.

| artifact | disposition | reasoning |
|---|---|---|
| **`K` = 2.431** | **survives as a reported reference mark; retired as a gate** | The argument against the gate is inside its own calibration record: **11 of 66 probe questions disagree with the plateau midpoint** at the best-scoring value — one in six — and LCC-07 misses its own probe at 0.968 on `kwh` while LCC-09 misses at 0.919 on `polar`. **And the plateau is 9% wide**: every value in `[2.3195, 2.5416]` scores identically, so a quantity any value in a 9% interval serves equally is not a quantity the answer depends on. It was carried as `2.431`, to three decimals, for two sittings. |
| **`axis_threshold.json`** | **retained as the record; still read for the margin** | The 11 `fails` rows are kept verbatim and are now labelled as *the argument for retiring the gate, not a defect list to be worked off.* |
| **thin `fire` = 1.7** | **survives as a reported mark** | It was never a verdict gate — crossing it attached content — so retiring it costs nothing, and the margin to it tells a session how firmly a patch matched. |
| **thin `govern` = 6.175** | **retired as a gate; survives only as a reported mark and as the record** | This is the one number in the router with a **demonstrated** capacity to destroy correct answers, and the demonstration is in the file: a band measured on five control rows, `(1.86, 3.78]`, **turned six correct verdicts into refusals**. It looked well-measured. |
| **the govern band `(5.961, 6.389]`** | **goes as a gate; both endpoints kept as observations** | It is 7% wide and defined by **exactly two observations** — T3 fires-not-governs on SRQ-10 at 5.961, T5 governs SRQ-14 at 6.389. A band whose two edges are two single measurements is a pair of points with a line drawn between them, and 6.175 sits between them because it is the midpoint, not because anything was measured there. **Widening it would widen an interval nothing constrains.** |

**Nothing was widened, and that is a considered refusal.** A band is still a gate: it decides three
ways instead of two and the failure mode is unchanged — a question near an edge gets a categorical
answer the measurement does not support. **The margin *is* the band, reported continuously, and
nobody has to choose its width.**

**Absent marks no longer refuse.** `K` and both thin tiers used to fire `input-missing` before
classification. That was right *for a gate* — an unset K made CONTESTED unreachable, and a defaulted
govern threshold does not fail loudly, it silently converts correct answers into refusals. A
reference mark with no power to refuse anything has no such failure mode. So an absent mark is a
**report line**: masses are still reported, margins are not, and `ctx.reference_marks_absent` names
what is missing. Proved:

```
loadContext({thresholdPath:'C:/nope'})  ->  refuse? false   K = null   marks_absent = 1
  LCC-07 on SRQ-12 still reported: mass 1.54, margin null, confidence very-low
    ("the reference mark is absent, so there is nothing to measure this mass against.
      A bare mass is a number without a scale.")
```

**They are still never DEFAULTED.** That half of the old posture survives verbatim and is the half
that still matters: a defaulted mark puts a number nobody chose in front of a reading session, which
is the C2 shape — a routing input nobody can see — wearing an advisory hat. `thin_patches.js` was
made null-safe for the same reason: `mass >= null` coerces to `mass >= 0` and would have reported
every scoring patch as crossing a mark that is not there.

**The two calibrators are retired in place, not deleted, because deleting them loses the lesson.**

- `calibrate_k.js` — **`--write` refused, exit 2.** The sweep still *runs* and still prints, because
  the sweep is the record. Editing the mark is a data edit to the artifact by whoever owns the
  number, not a re-run of a calibration whose objective has no subject.
- `calibrate_thin.js` — **fully retired, exit 2.** Its sweep scored the govern threshold against
  *agreement with the verdict the classifier emitted*. 8.1 deleted the verdict. **The objective has
  no subject**, and a calibration re-pointed at some other objective would be a different
  measurement wearing this one's name.

---

## 7. Close-condition status

| sub-step | condition | status |
|---|---|---|
| **8.1** | `classify.js` returns findings, not a verdict | **MET** — `adviseQuestion`; `assertNoVerdict` on 124 reports at every depth, 0 hits |
| 8.1 | which axes matched, at what mass, how far from the threshold | **MET** — every axis with ≥1 hit; mass, mark, signed margin, fraction-of-mark, side, ties |
| 8.1 | which app outputs resolve, and which are input echoes | **MET, and refined** — 3 grades, probed not listed; 5 echo + 4 constant of 26 |
| 8.1 | which excluded node, which thin patch, at what mass | **MET** |
| 8.1 | retrieval candidates with scores | **MET** |
| 8.1 | six verdicts stay closed; assertion machinery kept; the picker deleted | **MET** — 25 live probes |
| 8.1 | `selectWave` takes the verdict as an argument | **MET** — old shape refused by name |
| 8.1 | keep `loadContext`; keep side-resolution + side-count assertion | **MET** |
| 8.1 | the `registerPaths` bug | **FIXED**, proved by staging, and it repaired 2 pre-existing decoy failures |
| **8.2** | each finding carries a confidence and the reason | **MET** — asserted structurally |
| 8.2 | failure modes as worked examples, verbatim, in the artifact | **MET** — 5, with `kwh` and `polar` and the measured numbers |
| 8.2 | non-match is weak evidence of absence; override on judgement | **MET** — both stated, both asserted by name |
| **8.6** | disposition per threshold, with the reasoning recorded | **MET** — §6, and written into both JSON artifacts |
| **harness** | `acceptance.js` runs; meaning re-pointed and stated | **MET** — exit 0; §4 states what it can and cannot measure |

## 8. Ledger

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +2/-0
```

`tests +2` = `router_suite` RT-15 and RT-16. Seven existing RT rows were re-pointed rather than
added or removed, and each re-point is documented row by row in that file's own header.

## Not mine

- `oracle/tests/run_suite.js` RFX-01..33 — routed, R-1.
- `oracle/tests/fault_inject.js` `runLoop()` and 3 decoys — routed, R-2.
- `oracle/acceptance/lunar_questions.md` SRQ-10 reachability — routed to 8.7, R-3.
- `oracle/answer_contract.md` §1/§5 wording — routed to W5-2, R-4.
- `PTH` 1 fail and `MRG` 3 fail in `run_suite` — failing at the wave open, not in my write set,
  untouched.
- The `transfer-unevaluable` contract row owed in `question_classes.json` — unchanged by this seat;
  `ctx.owed_contract_codes` still reports it by name rather than throwing.
