# W4-1 → The Software Engineer (router, 3.2/3.4) and The Engineer (retrieval)

**Two files are landed and consumable now.** Paths, schemas, and the one guard that must go in the
router. Nothing below is blocked on the rest of my sitting.

**Read-digest.** `lsei/index.html` md5 `16caa330ebae773684285c301a8e0a98`, 894,127 bytes,
data-island pin `e2989bf6`. `literature/` 169 `.md`. `oracle/REGISTER.lunar.tsv` 15 A rows.
Both files are LF, both parse.

---

## 1. `oracle/question_classes.json` — for the router, consumed before retrieval

**Top-level keys:** `schema`(1) · `authority` · `app_address_test` · `reachable` · `refusal_codes`
· `verdicts` · `classes`(10) · `exclusion_outcomes`.

**`reachable`** is the derived boundary, measured off the artifact, never typed from the map:
`scenario_labels`(3) · `preset_keys`(3) · `phases`(3) · `era_names` · `model_output_keys`(26) ·
`model_input_keys`(12) · `detent_rails`(5) · `sweepable_knobs`(4) ·
`unsweepable_detent_rails`(`landed_cost`) · `lexicon_named_outputs`(8) ·
`lexicon_unnamed_outputs`(18) · `unreachable_economics.keys`(27).

**Each of the 10 `classes`:** `id`(L1–L10) · `name` · `tier`(A/B/C) · `verdict` ·
`alt_verdict` + `alt_verdict_when` · `test{kind, form, requires, passes_when, …}` ·
`fallback{verdict, reason}` · `app_surface[]` · `register_axes[]` · `thin_patches[]` ·
`literature_folders[]`.

**`exclusion_outcomes`** carries all ten EXCLUSIONS slugs with one of
`EXCLUDED-THEN-CORPUS` / `EXCLUDED-THEN-THIN` / `EXCLUDED-BUT-ADJACENT`, plus the three
`adjacency_pairs` as data rather than prose:
`propellant-mass-leverage`→`net-value-identity`, `mars-campaign-conditional`→`avoided-cost`,
`grade-independent-demand`→`offtake-record`.

### The one guard I need in the router, and it is one line

**Seven of `model()`'s 26 return keys are echoes of its own inputs**: `ice`, `power`, `mass`,
`fission`, `phi_c`, `transDistKm`, `phi_c0`. `resolveOutput()` accepts every one of them, and a
recompute of an echo reproduces the echo. So *"how much ice is in the regolith at Cabeus"* can
return `APP`, cite a **recompute-verified** trace, and report a control setting as a measurement.

> **Where a resolved output key is also a model input key, the router must not issue `APP`.**

Encoded at `classes[L5].test.guard`. It is the single sharpest failure in my acceptance set
(`SRQ-5`).

### Three things in your prototype that are dead, not merely narrow

Your `w4-2` relay already has the eighteen unnamed outputs and the `valueModel` gap, and our
measurements agree exactly — 26 / 27 / overlap 8 / union 45. One item I do not think you have:

**Three of `KNOB_LEXICON`'s seven entries can never resolve.** `resolveKnob` requires membership
in `DETENTS` **and** in `model()`'s input keys. `fFis` and `fSol` are not `DETENTS` rails;
`landed_cost` is not a model input. Only `ice`, `power`, `mass`, `phi_c` survive. Three of seven
sweep phrases the router advertises are dead on arrival.

**And `f_op` is a declared coefficient nothing reads.** All six `VALUE` rows carry a `claims` list,
but `f_op` appears **zero times** in `MODEL-CORE` and **zero times** in `VALUE-CORE`. A router that
treats "in `VALUE`" as "on a computation path" gets this one wrong.

---

## 2. `oracle/thin_patches.json` — for retrieval, and for the refusal writer

**Top-level:** `schema`(1) · `corpus` · `rule` (R3, refuse by substitution) · `patches`(10) ·
`three_named_facts` (R5) · `retired_claims`.

**Each of the 10 `patches`:** `id`(T1–T10) · `title` · `rank` · `trigger_tokens[]` · `absent` ·
`measured[]`(each a `{command, hits}` you can re-run) · `reverify` · `nearest_evidence[]`(each a
`{path, what}`, every path checked to resolve) · **`substitution`** (the sentence the answer
delivers) · `undermines{coefficients, coefficient_status, app_surface, downstream_outputs, how}` ·
`register_axes[]` · `question_classes[]` · `refusal_code`.

**`substitution` is the field that matters.** A question landing in a thin patch does not answer
from the nearest word-overlap match and does not say the corpus is limited. It says what is missing
and what the nearest real evidence is instead.

**`refusal_code` is `not-found` on all ten, including where the app also declares the topic
excluded.** `excluded` routes to nobody and must never mask a code that routes to someone
(`answer_contract.md` §5). T5 is the live case: the app carries `cadence-cryogenic-break`, and the
fix is an acquisition decision, which has an owner.

### Four absence claims moved against the landed shelf — re-verify before you build on the old list

The source surface was written against the 158-file pre-merge tree. I re-ran every grep:

| patch | change |
|---|---|
| **T3** reliability | The claim that `rahimdel-2024` is the only reliability primary is **refuted**: `shishko-2019` also carries MTBF, in a lunar thermal-mining context. |
| **T4** water cleanup | **Materially better.** `kleinhenz-2020-polar-water-case-studies.md` states *in its own words* that cleanup hardware is not defined and is excluded from its model because contaminant criteria were unknown. A documented absence with an author and a page beats a general claim of thinness. |
| **T7** non-water routes | **Least thin of the four.** `mcleod-2017-extraterrestrial-ree.md` is a lunar REE review whose own conclusion is a **negative result** — no extraterrestrial REE ore identified — plus `levin-2025` on KREEP and `usgs-2025` on the PGM market. Iron and He-3 demand are unchanged. |
| **T10** programme currency | `programme-primaries` is **8** files, not 10. Sanders 2025 remains the only cross-programme TRL sheet; 24 files state a TRL for their own subject only. |

**And one structural claim is retired.** "Sixteen author-year clusters hold more than one summary
file" no longer describes this corpus. `sowers-2019` is two distinct papers, not four files; Aqua
Factorem is two, not three; `sanders-2025`, `csank-2022`, `poston-2020`, `azami-2024` each resolve
to one file per paper. **All 53 register member basenames resolve uniquely against the 169-file
shelf**, checked 2026-08-28. The near-duplicate retrieval hazard is not this corpus's shape any
more; do not build the disambiguator for it.

---

## 3. What else is in my write set

- `cr_scratch/step3_sre_boundary_audit.md` — 3.1. Six artifact-against-map disagreements with both
  values, plus a stale comment inside `model()` itself (`transDistKm` and `phi_c0` defaults are
  **3 and 0.10**, not the 0 and 0 the comments beside them still claim), plus the finding that
  `lsei/tools/build_map.js` **is not in this working copy**, so the map cannot be regenerated here
  and that is why four of its numbers drifted unnoticed.
- `oracle/acceptance/lunar_questions.md` — 4.8. Fourteen questions, each with a verdict from the
  closed six. **Five are marked `K`** because their outcome is a function of the axis firing
  threshold, unset until 3.6, and they are labelled fixtures for that calibration —
  `SRQ-3` (LCC-01 negative), `SRQ-7` (LCC-07/08 negative), `SRQ-13` (LCC-15 negative).
  Use them; they were written to be a labelled set.

## Not mine

- Extending `OUTPUT_LEXICON` / `KNOB_LEXICON`, and extracting `valueModel()`. Yours (3.2). My audit
  names all eighteen unnamed keys, the three dead knob phrases and the 27 `valueModel` keys so it
  needs no second read of the artifact.
- Setting **K**. 3.6.
- Regenerating the map, or anything else inside `lsei/`. Upstream's. Drift relayed, nothing changed.

---

# Addendum, same day — `match_keys` for all ten excluded nodes, delivered

Answering `w4-2_to_space_resources_engineer_match_keys.md` Finding 2. **125 keys across the ten
nodes, plus one `probe_pos` per node**, all in `oracle/question_classes.json` at
`exclusion_outcomes.assignments[].match_keys` — the field `excluded_nodes.js` already reads. No
hand edit to any generated artifact; `node oracle/router/build.js` carries them through.

## The measured result

**SRQ-14 resolves.** `node oracle/router/acceptance.js`, 124 questions:

| | before | after |
|---|---|---|
| labelled rows agree | 9 / 14 | **10 / 14** |
| SRQ-14 | `LITERATURE` | **`REFUSE` / `not-found`** |
| verdicts | `LITERATURE` 59, `REFUSE` 16 | `LITERATURE` 58, `REFUSE` 17 |
| codes | `not-found` 15 | `not-found` 16 |

**Exactly one of the 124 existing questions changed.** `CONTESTED` 44, `APP` 2, `FIGURE` 1,
`BOTH` 2 are all unmoved, so the 66 register probes and the 44 labelled rows are untouched. No
regression.

## You were right to make me do all ten, and it caught two more

Running each node's own `probe_pos` with `match_keys` empty and then with them live:

| node | outcome | before | after | |
|---|---|---|---|---|
| `cadence-cryogenic-break` | THIN | `LITERATURE` | **`REFUSE`/`not-found`** | fixed |
| `grade-independent-demand` | ADJACENT | `LITERATURE` | **`REFUSE`/`excluded`** | **fixed** |
| `mars-campaign-conditional` | ADJACENT | `LITERATURE` | **`REFUSE`/`excluded`** | **fixed** |
| `iron-production-energy` | THIN | `REFUSE`/`not-found` | unchanged | already worked |
| `propellant-mass-leverage` | ADJACENT | `REFUSE`/`excluded` | unchanged | already worked |
| `bound-oxygen-mare` | CORPUS | `CONTESTED` | unchanged | |
| `helium-procurement-energy` | CORPUS | `CONTESTED` | unchanged | |
| `oxygen-extraction-energy` | CORPUS | `CONTESTED` | unchanged | |
| `delivered-cargo-record` | CORPUS | `LITERATURE` | unchanged | |
| `habitat-water-terrain` | CORPUS | `LITERATURE` | unchanged | |

**Four of ten routed correctly before; ten of ten do now.** The two extra catches are the ones
that matter: `grade-independent-demand` and `mars-campaign-conditional` are both
`EXCLUDED-BUT-ADJACENT`, and both were answering from the shelf with **no adjacency warning at
all**. A user asking *"who would buy lunar propellant?"* was getting a corpus answer while
`offtake-record` — a record of signed agreements, not a demand model — sat unnamed. That is the
exact misread the adjacency pair exists to prevent, and it had no acceptance row pointing at it.
It was not passing by accident of shared vocabulary; it was not passing.

## One finding you need, and it is about K2

**The register's K2 does not transfer to excluded nodes, and it fails hardest where it is needed
most.** K2 tests a key against the axis's own primaries, which is sound because an axis *is* its
members. An excluded node is not its members — it is a boundary in the app — and **four of the ten
resolve zero primaries**: both `EXCLUDED-THEN-THIN` nodes by definition (a THIN node is one whose
primaries do not resolve), and two of the three `EXCLUDED-BUT-ADJACENT` ones. So K2-against-primaries
is *unsatisfiable* for `cadence-cryogenic-break` and `iron-production-energy`, the two you named as
the ones it matters most for.

What I asserted instead, and what I suggest the build check enforces:

```
K1  TOKEN FORM   tokenize(k) deep-equals [k]                        -- 125/125 pass
K2' CORPUS FLOOR k occurs as a whole token in >=1 file under literature/   -- 125/125 pass
K3  PROBE        the node's probe_pos hits >=1 of its own match_keys -- 10/10 pass
```

`K2'` is checkable for all ten and it is the honest floor: a key naming a word no summary in this
corpus contains is a key about nothing a reader could be asking this Oracle. It dropped ten of my
first-pass candidates (`ullage`, `ferrous`, `uptake`, `appetite`, `breathable`, `uplift`, `smelt`
against the present `smelting`, and so on). `K3` is the substitute for K2's real intent — it makes
the key set testable by the calibration machinery you already have rather than by inspection.
Re-run all three with `node cr_scratch/sre_w4/keycheck.js oracle/question_classes.json`.

The reasoning is written into the file at `exclusion_outcomes.match_keys_contract` so it does not
live only here.

## Two deliberate cross-node duplicates, do not repair them

`ilmenite` is a key on both `bound-oxygen-mare` and `oxygen-extraction-energy`; `titanium` on both
`bound-oxygen-mare` and `iron-production-energy`. An ilmenite question genuinely touches two
boundaries the app declares, and `topBand()` exists precisely so the router does not choose which
boundary the user hears. If a build check flags duplicate keys, it should warn rather than fail.

## On your Finding 1, which I have not acted on

Not in this round's scope, but one measurement fell out of the work and it is yours to use. My
`oxygen-extraction-energy` probe — *"How many kwh does carbothermal reduction need per kilogram of
lox?"* — returns `CONTESTED`, so **LCC-07 does fire when the question carries the specific-energy
vocabulary** (`kwh`, `per`, `kilogram`, `lox`). Your under-firing probe asks *"How many kilowatt
hours does it take to produce a kilogram of oxygen from lunar regolith?"* and writes `kilowatt
hours` where the axis keys carry `kwh`. That supports your read exactly — the keys name the
process where the axis is about the specific energy — and it says the repair is on the key side,
cheaply: add the spelled-out forms. **SRQ-12 is a `match_keys` edit on LCC-07, not a K move.** Say
the word and I will take LCC-04/07/09/13/14 in the same form as this addendum.

`SRQ-13` I agree is not mine: there is no excluded node for icy-regolith geotechnics, and no key I
could write would create one. It is the confirmation threshold, routed to retrieval.

---

# Addendum 2 — `thin_patches.json` triggers repaired, and the mass band re-measured wider

Answering W4-3 §4. Both defects confirmed independently before acting; my numbers reproduce The
Engineer's exactly (T1 on SRQ-13 **8.540**, T10 on SRQ-7 **1.858**, T1 on SRQ-7 **0.662** on
`regolith` alone, T5 on SRQ-14 **3.781** when `boil-off` is re-tokenized to `boil`+`off`).

## 1. The hyphen was not the only case — nine tokens, three defect classes

`tokenize()` emits `[a-z0-9]+`, lowercased, length ≥ 2, stopwords dropped. **Nine of 120 trigger
tokens could never match**, and the hyphen is only one of three ways to fail it:

| class | tokens | now |
|---|---|---|
| hyphen | `boil-off` (T5), `he-3` `helium-3` (T7) | `boil`; `he3`; `helium-3` dropped as a duplicate of the `helium` already present |
| **uppercase** | `MTBF` (T3), `REE` `KREEP` `PGM` (T7), `TRL` (T10) | `mtbf`, `ree`, `kreep`, `pgm`, `trl` |
| **multi-word, all stopwords** | `as of` (T10) | dropped — it tokenizes to **nothing at all**, and T10 already carries `current`, `status`, `today`, `now`, `latest` |

T5 also gained `transferred`, `transfers`, `transferring`, `refueling`, `tanker` — the same
user-vocabulary lesson as the `match_keys` round, since the corpus writes `transferred` and the
trigger wrote `transfer` and there is no stemming anywhere in this stack.

**123 trigger tokens now, K1 failures 0.** Re-run `node cr_scratch/sre_w4/fix_triggers.js`.

**One check that must NOT be applied here.** The corpus-presence floor I asserted on excluded-node
`match_keys` is *backwards* for thin patches. `shear` (T1), `tribology` and `ingress` (T2) occur in
no summary on this shelf — and that absence is evidence the patch is real, not evidence the trigger
is wrong. A thin patch exists because a measurement is missing; its trigger names the missing thing.

## 2. Your (1.86, 3.78] band is refuted, and the shape of your finding is not

Mass rule adopted; count rule refuted, exactly as you measured. But the band moves a long way once
the control set widens from 5 rows to **49** (14 acceptance + 15 register `probe_pos` + 15
`probe_neg` + 10 thin-patch probes I authored this round):

| constraint | row | patch | mass |
|---|---|---|---|
| must govern | SRQ-13 | T1 | 8.540 |
| must govern | SRQ-14 | T5 | **6.389** ← binding from above |
| must govern | 10 authored `probe_pos` | own patch | ≥ 10.238 |
| **must not govern** | **SRQ-10** | **T3** | **5.961** ← binding from below |
| must not govern | LCC-14 `probe_pos` | T6 | 5.601 |
| must not govern | 10 authored `probe_neg` | own patch | ≤ 5.550 |

**Separating band (5.961, 6.389]. Proposed 6.175, PROVISIONAL, yours to set.** Your five-row set
contained neither SRQ-10 nor the LCC-14 `probe_pos`, which are the two real constraints: **a
threshold of 2.5 or 3.0 makes T3 govern SRQ-10 and T6 govern LCC-14, flipping a `BOTH` and a
`CONTESTED` into `REFUSE`.**

**And a precondition that looks obviously right is refuted by your own SRQ-13 measurement.** I
tried "let a patch govern only where no competing route answered." SRQ-13 returns `LITERATURE`
confirmed 9 of 9 at frac 0.85, so that precondition blocks T1 on precisely the row it must govern.
A confirmed retrieval is not evidence the question was answered — which is your third-mode finding,
restated as a design constraint.

## 3. The design consequence: firing is not governing

The band is **0.428 wide, about 7 percent**, and the row constraining it from below (T3 on SRQ-10)
is a **legitimate** fire — SRQ-10's own `Must carry` cell says *"Thin patch T3 fires and the
substitution is delivered"* and SRQ-10 is `BOTH`. So the tightness is not noise; it is the
single-threshold design at its limit. Two tiers, both now in the artifact:

- **`fire_threshold` = 1.7** (band `(1.478, 1.858]`) — the patch's `substitution` attaches to the
  answer as content. Below it: T1 on SRQ-7 and SRQ-5 at 0.662 on `regolith` alone, the false fire.
  Above it: T10 on SRQ-7 at 1.858, which is a **correct** fire — SRQ-7 already has to carry T10's
  May 2025 date.
- **`govern_threshold` = 6.175** (band `(5.961, 6.389]`) — the patch's `refusal_code` becomes the
  verdict.

`T1` keeps `regolith` and `T2` keeps `bearing`. Both are correct vocabulary and both carry true-positive
signal (`regolith` is 0.662 of T1's 8.540 on SRQ-13; `bearing` is 1.411 of it). The mass rule is what
makes them safe; deleting them would cut the signal to fix what the rule already fixes.

Everything above is in `oracle/thin_patches.json` at `firing_rule`, with `probe_pos`/`probe_neg` on
every patch so the thresholds are calibratable rather than asserted. Assertions re-run with
`node cr_scratch/sre_w4/tp_assert.js` — 7 named conditions, 20 probe rows, 123 token forms, all pass.

## 4. Measured result

**T5 now governs SRQ-14 through the patch path at 6.389**, alongside the excluded-node path from
addendum 1; the two agree on `REFUSE`/`not-found`. **T1 no longer fires on SRQ-7** (0.662 < 1.7).
**T1 governs SRQ-13 at 8.540.**

**Acceptance stays 10/14, and that is expected**: `oracle/router/classify.js` does not consult
`thin_patches.json` yet. The artifact is now correct and consultable; the routing change is yours.
`SRQ-13`'s row is re-marked **`RED`** with that as its named close condition and you as its owner —
it was marked `K`, and measurement showed the `K` framing was wrong: LCC-15 scores 2.040, safely
below `K`, so the negative probe passes and the row fails for the third mode instead.

Suite went 4 → 9 hard failures this round and **none of the five new ones are mine**: four are the
new `RFX-04/07/09/13` register-fixture rows (LCC under-firing, your Finding 1) and no test in the
suite reads `thin_patches.json` or `question_classes.json`. `check_registers` 0 hard failures.
