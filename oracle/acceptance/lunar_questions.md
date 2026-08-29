# The lunar acceptance question set

**Sub-step 4.8.** Written by The Space Resources Engineer, 2026-08-28.
**Written against `oracle/answer_contract.md` version 2** and against the landed contested-claims
register `oracle/REGISTER.lunar.tsv` (header `H  literature  2026-08-28  af7abec  15  68`).

**Fourteen questions.** Counting rule: rows in ý2 through ý5 whose first cell matches
`^SRQ-[0-9]+$`. Per group: one per question class (SRQ-1 & SRQ-10), of which SRQ-5 doubles as the
first register trap; two further register traps (SRQ-11, SRQ-12); two thin-patch traps (SRQ-13,
SRQ-14). 10 + 2 + 2 = 14.

**Read digest.** Every app figure quoted below was computed at `lsei/index.html` md5
`16caa330ebae773684285c301a8e0a98`, 894,127 bytes, data-island pin `e2989bf6`. Figures at a
different digest are not comparable. The audit behind these numbers is
`cr_scratch/step3_sre_boundary_audit.md`.

**What this set is for.** It is not a test of answer wording, which is nondeterministic. Every
`Expected` cell names a verdict from the closed six  `APP`, `FIGURE`, `LITERATURE`, `BOTH`,
`CONTESTED`, `REFUSE`  and every REFUSE names one of the closed six reason codes. Those are
deterministic functions of the question, the app and the register, and they are what is asserted.
The `Must carry` and `Fails if` columns are the discriminating content.

**Status column.** `green` = expected to pass once the mechanism exists. `RED` = expected to fail
today, for a named reason. `K` = the outcome depends on the axis firing threshold **K**, which is
unset until sub-step 3.6; the row is a labelled fixture for that calibration and its expected
verdict is the one the question's *content* warrants. **Re-counted 2026-08-28 against the live
router:** eleven rows are unconditioned, **two** are marked `K` (SRQ-3, SRQ-7) and say which axis
they probe and in which direction, and **one is `RED`** (SRQ-13), which was marked `K` and was
mis-marked: measurement showed its failure is not a threshold at all.

---

## 1. The three failure modes this set exists to catch

Stated first, because each question below is an instance of one of them and the reader who knows
the three can read the tables faster.

**F1  the app answers a question it did not answer.** Seven of `model()`'s 26 return keys are
echoes of its own inputs (`ice`, `power`, `mass`, `fission`, `phi_c`, `transDistKm`, `phi_c0`).
`resolveOutput()` accepts every one, and a recompute of an echo reproduces the echo. An `APP`
verdict with a recompute-grade trace can therefore report a control setting as a measurement.
SRQ-5 is the instance.

**F2  a coefficient the app itself flags as unevidenced is reported without its flag.**
`captureEff` = 1 carries the status `ASSUMPTION (optimistic bound, no primary reports 100
percent)`, and the status field is not part of the arithmetic. SRQ-1 and SRQ-11 are the instances.

**F3  a refusal routes to nobody.** `excluded` is the weakest of the six reason codes and its
owner is nobody. Where the app declares a boundary *and* another code applies, the other code is
written. SRQ-12 and SRQ-14 are the instances, in opposite directions.

---

## 2. One per question class

| ID | Class | Question | Expected | Must carry | Fails if | Status |
|---|---|---|---|---|---|---|
| SRQ-1 | L1 Scenario output | What is water output under Agency Led Baseline at Pilot? | `APP` | The value **13.3583 t/yr** at address `model:artemis\|2040\|water`, recompute-verified. Plus the status string of every ASSUMPTION/CONTROL coefficient on the path: this point is **landed-mass limited**, so `cap = Wthr` and the path runs through `kExc` (`ASSUMPTION (calibrated-to-fit)`), `captureEff` (`ASSUMPTION (optimistic bound, no primary reports 100 percent)`), `duty` (`ASSUMPTION`) and `phiC0` (`CONTROL (design ruling, not a literature figure)`). | The answer returns the number with no status disclosure (**F2**); or the figure is sourced from a literature summary rather than the app; or any trace line carries a grade word outside `recompute-verified` / `resolution-only` / `refused`. | green |
| SRQ-2 | L2 Binding regime | What binds at Agency Led Baseline at Pilot, and why does the model take a minimum of two limits? | `APP` | Two traces at **two different grades**. The label `binding = "landed mass"` at `model:artemis\|2040\|binding`, **recompute-verified**. The structural why from `DERIVATION.notes["BIND-MASS"]`, **resolution-only**, with its `[[throughput-coefficient]]`, `[[productive-plant-mass]]`, `[[min-of-two-limits]]`, `[[binding-regime-labels]]` slugs resolving against `KNOB_DATA.SLUGS`. | The stored prose is traced `recompute-verified`; or the two facts share one trace grade; or the answer paraphrases the note instead of resolving to it. | green |
| SRQ-3 | L3 Sensitivity and sweep | How does water output change across the ice detent rail for Agency Led Baseline at Pilot? | `FIGURE` | Five points  2.6717, 5.3433, 13.3583, 26.7167, 53.4333 t/yr at ice = 1, 2, 5, 10, 20 wt%  as a figure file plus manifest, never as chat prose. **Plus the rail-endpoint disclosure**: the 10 and 20 wt% detents exceed every measurement in this corpus, whose highest Cabeus figure is Luchsinger's 8.2 wt% and that one conditional on an assumed regolith density. | The answer is delivered in chat rather than as a file; or the 10 and 20 wt% points are returned without the endpoint disclosure; or the sweep is presented as a comparison of futures when its lower three detents span a live measurement disagreement. | **K**  probes **LCC-01** in the negative direction. The question carries `ice` and `water` as knob and output names, names no crater and no concentration, and must **not** fire the axis. If K is set low enough that it fires, the verdict becomes `CONTESTED` and this row is the evidence K is too low. |
| SRQ-4 | L4 Coefficient provenance | Where does the app's transmission coefficient of 10 kg/kWe/km come from? | `BOTH` | **App fact first**, never second: value 10, unit `kg/kWe/km`, status `SOURCED`, governing section `[[transmission-coefficient]]`, and the app's own statement that it is a composite reading across five sources **none of which states 10 directly**. **Then** the shelf: `literature/power-and-thermal/gordon-2001-lunar-dc-transmission.md`, `kerslake-2007-lunar-surface-power-transfer.md`, `csank-2022-powering-the-moon.md`, `oleson-2022-deployable-fsp.md`, each resolution-only. | The corpus figure is presented as if it were the app's; or the two are folded into one sentence; or the "none states 10 directly" disclosure is dropped. | green |
| SRQ-5 | L5 Resource state  **register trap, LCC-01** | How much water ice is in the regolith at Cabeus crater? | `CONTESTED` | Three sides, three personas, parallel, each briefed on one side only. A: `colaprete-2010-lcross-ejecta-water-detection.md`, 5.6 ý 2.9 wt%. B: `litvak-2024-lend-cabeus-water-ice.md`, 0.49 ý 0.05 wt% averaged, max ~0.7 wt% at the crater bottom. C: `luchsinger-2021-lcross-water-modeling.md`, 8.2 or 4.3 wt% depending on assumed density. The `axis_statement` **verbatim**. The `scope_token`  the measurement footprint and the sampled depth  named on every figure. No adjudication. | **`APP`.** `resolveOutput("ice")` succeeds because `model()` echoes `ice` back, so an address builds and recomputes cleanly against a control setting of 1, 2, 5, 10 or 20 wt%. An `APP` verdict here is **F1** and is the single sharpest failure this set tests for. Also fails if fewer than three sides are returned, or if any brief contains another side's member path. | green |
| SRQ-6 | L6 Delivery cost | What does it cost to land a kilogram on the Moon? | `CONTESTED` | LCC-11, class `false_pair`. Every side, with the `scope_token`  LEO against surface, and estimate against contracted  on every figure. `payload-research-starship-cost.md` (~$500/kg to LEO, a trade-press analyst estimate), `nasa-2023-card-carbothermal-reduction.md` ($1.2M/kg landed, stated as motivation), and the CLPS primaries. The app's `landed_cost` rail of 11 rungs and its status string, and `[[leo-to-surface-multiplier]]` as the bridge. | The words `disagree`, `contradict`, `dispute` or their inflections appear anywhere in the answer, `axis_statement` included  the `false_pair` banned list. Or a LEO estimate and a surface contracted price are compared without crossing the multiplier. Or the answer attempts a `landed_cost` sweep: it is a `DETENTS` rail `model()` does not accept as an input and no address builds. | green |
| SRQ-7 | L7 Process route maturity | What technology readiness level does this corpus record for molten regolith electrolysis, and as of when? | `LITERATURE` | The TRL **and its date**: `literature/programme-primaries/sanders-2025-nasa-isru-progress-review.md`, MRE at TRL 5/6 for polar highland regolith, a **May 2025** point-in-time briefing. Supporting: `schreiner-2016-mre-sizing-model.md`, `sibille-2012-joule-heated-mre.md`. | A TRL is stated with no source (a fabricated measurement wearing a number); or Sanders 2025 is quoted without its date; or the answer states a TRL for MRE from a file that only states its own subject's maturity. | **K**  probes **LCC-07/LCC-08** in the negative direction. The question asks about maturity, not about a kWh-per-kilogram figure; the axes are about specific energy and about feedstock transfer. If either fires, the loop should be issuing `misclassified` rather than answering, and the fix is an edit to `match_keys`, not to the router. |
| SRQ-8 | L8 Site and environment | How much electrical power is actually extractable at the lunar south pole? | `CONTESTED` | LCC-09. `ross-2023-lunar-south-pole-solar-power.md`  overshadowing by sunward panels limits extractable power to about 5563 MW above 70 % illumination and about 6 MW above 90 %. `speyerer-2013-persistently-illuminated-regions.md` and `glaser-2014-south-pole-illumination.md`  illuminated *ground*, up to ~94 % and 92.2795.65 % respectively. The `scope_token`: illuminated area is not extractable power. | An illumination fraction is returned as an answer to a power question. Speyerer and Glýser measure lit ground; Ross measures power off it, and answering from the first overstates by a large factor. | green |
| SRQ-9 | L9 Law and programme | Does the Outer Space Treaty permit private ownership of water extracted from the Moon? | `LITERATURE` | `literature/space-law-and-governance/un-1967-outer-space-treaty.md`, `un-1979-moon-agreement.md`, `us-congress-2015-commercial-space-launch-act.md`, `luxembourg-2017-space-resources-law.md`, `hague-working-group-2019-building-blocks-space-resources.md`, `nasa-2020-artemis-accords.md`. All resolution-only. **And the boundary stated**: the app has no surface for law at all, so no app fact belongs in this answer. | The answer reaches for any app address; or it reports a legal position as settled where the corpus holds an unratified instrument (the Moon Agreement) beside a national statute. | green |
| SRQ-10 | L10 Cross-domain transfer | The app amortizes plant over a ten-year life using BEA depreciation rates for terrestrial mining machinery. Does that transfer to a lunar plant? | `BOTH` | **Two distinct questions, answered separately.** What the app assumed: `L` = 10 yr `DESIGN`, `decayRate` = 0.15/yr `SOURCED`, `decayLife` = 11 yr `SOURCED`, source BEA mining and oil-field machinery, Hulten-Wykoff category C, and the app's own words that this is *a terrestrial, benign-resale-market floor and not a lunar measurement*. What the corpus can check: nothing. `literature/isru-processing/rahimdel-2024-mining-truck-reliability-bayesian.md` is a real Bayesian reliability study of terrestrial mining trucks; `shishko-2019-lunar-thermal-mining-business-case.md` carries MTBF inside a framework its own summary calls incomplete. **Thin patch T3 fires and the substitution is delivered.** | The two halves are merged into a single claim that the transfer holds; or the absence of lunar reliability data is presented as a caveat rather than as the finding; or `decayRate`'s `SOURCED` status is quoted without naming that the source is Earth. | green |

---

## 3. Two further register traps

| ID | Axis | Question | Expected | Must carry | Fails if | Status |
|---|---|---|---|---|---|---|
| SRQ-11 | **LCC-05**, capture efficiency, class `one_sided` | What water capture efficiency has actually been demonstrated? | `LITERATURE` | The documented side, and **the one-side disclosure verbatim**, once, from `oracle/register_schema.md` ý7: `LIMIT: this axis is registered with one side. The register records no source in this corpus on the other side. An absence in a corpus is a property of the corpus, not a finding about the world; only an acquisition decision closes it.` Evidence: `kiewiet-2026-luwex-water-extraction.md`  5073 % recovery, capture up to 89 %, integrated bench, d13 kg per run; `sanders-2025-nasa-isru-progress-review.md`  PVEx 4356 % at 46 wt%, LADI targeted 75 % and was cancelled before TRL 5; `linne-2020-lunar-water-pilot-plant.md`  0.75 assumed at its own operating point. **R5's three named facts on every figure**: system boundary, scale, maturity. | **`CONTESTED`.** A `one_sided` axis has one side; Rule V requires one `literature` trace per side over at least two sides, so a `CONTESTED` run here is *unsatisfiable* and fails as a refusal carrying no reason code  the worst failure the contract can produce. Also fails if the app's `captureEff` = 1 is quoted as a demonstrated figure (**F2**): the app itself says no primary reports it. | green |
| SRQ-12 | **LCC-07**, oxygen specific energy, class `two_sided` | How much energy does it take to produce a kilogram of oxygen on the Moon? | `CONTESTED` | Four sides, four personas. A `leger-2025-energy-oxygen-moon.md`, 24.3 ý 5.8 kWh/kg LOX, hydrogen reduction of ilmenite at 10 wt% ilmenite, **end-to-end**. B `colozza-2010-solar-lunar-oxygen.md`, ~39 kWh/kg derived from the paper's own power and rate figures at 1,000 kg/yr, ~82 % thermal. C `nasa-2023-card-carbothermal-reduction.md`, 10.7715.79 g Oý/kWh **thermal** H 6393 kWh/kg. D `sanders-2025-nasa-isru-progress-review.md`, carbothermal at TRL 5, >20 g Oý/kWýhr thermal H <50 kWh/kg. The `scope_token` on every figure: **thermal against electrical**, and the boundary each figure draws. C and D describe the same NASA programme and report incompatible yields; neither states its uncertainty or replicate count. | **`REFUSE` with reason `excluded`.** The app's `oxygen-extraction-energy` is an EXCLUSIONS entry, and a router that lets a boundary the app declared outrank a four-sided corpus answer commits **F3**: `excluded` routes to nobody, and here `CONTESTED` routes to four personas. The outcome is EXCLUDED-THEN-CORPUS. Also fails if fewer than four sides are returned, or if thermal and electrical figures are compared without the scope token  Leger's 24.3 and CaRD's 6393 are not the same quantity. | green |

---

## 4. Two thin-patch traps

| ID | Patch | Question | Expected | Must carry | Fails if | Status |
|---|---|---|---|---|---|---|
| SRQ-13 | **T1** icy-regolith geotechnics | What excavation force is required to dig ice-bearing regolith at permanently shadowed region temperature? | `REFUSE`, reason **`not-found`** | The substitution, not the apology: *No measurement of icy-regolith shear strength, bearing capacity, cone penetration resistance or specific excavation force at PSR temperature exists in this corpus.* Then the nearest real evidence and what it is instead: `barnett-2025-regolith-consolidation-water-ice.md`, consolidation during **thaw**, the opposite process; `just-2020-regolith-excavation-review.md`, whose own output is a list of experiments not yet performed; `rostami2018.md`, explicitly conceptual with no original data. And the consequence: `kExc` = 4 t regolith/yr per t plant, status `ASSUMPTION (calibrated-to-fit)`, sets the entire mass-bound regime and nothing in this corpus constrains it. | The answer is delivered as a general statement that the corpus is limited (violates R3). Or **LCC-15's sides are returned as if they answered**: IPEx moved 10 t in 5 days and Break the Ice teams excavated 12,000 kg at ~800 kg/day, both at 1 g on Earth over days with no wear accumulation, and neither is an excavation *force*. That is the container-shaped join the contract's ý4.4 warns about  a file on an axis is not a claim on it. | **RED**  and the `K` framing this row carried was wrong, measured 2026-08-28. LCC-15 scores **2.040**, below `K` = 2.431, so the axis stays quiet exactly as predicted and the negative probe passes. The row fails for a **third mode** neither threshold reaches: retrieval confirms **9 of 9** candidates at frac **0.85**, best `just-2020-regolith-excavation-review.md`  *every token of the question is in the corpus and the answer is not*. No scalar bar over token overlap separates that, because the instrument only measures vocabulary. **SRQ-13 is T1**, and `oracle/thin_patches.json` now carries the mechanism: T1 scores mass **8.540** here against a govern threshold of 6.175. Close condition: the router consults `thin_patches.json` under its `firing_rule` before accepting a `LITERATURE` verdict. Owner: the router seat. |
| SRQ-14 | **T5** cryogenic cadence | How often must lunar propellant be transferred to keep boil-off within limits? | `REFUSE`, reason **`not-found`** | The substitution: *No measurement of lunar-surface cryogenic transfer loss, surface boil-off rate or transfer cadence exists in this corpus*  `grep -ril 'cryogenic transfer' literature` returns zero. Nearest: `kleinhenz-2017-mars-ascent-vehicle-propellant.md`, cryogenic storage and boil-off for a **Mars** ascent vehicle; `kleinhenz-2020-polar-water-case-studies.md`, a dust-tolerant umbilical and cryocooler liquefaction sized as a design model with no demonstration behind it. And the app's own boundary named as the refusal's **nearest present object**: `[[cadence-cryogenic-break]]`, *This app does not model programme milestones.* | **`REFUSE` with reason `excluded`.** The app does declare this boundary  and `excluded` routes to nobody while `not-found` routes to a corpus gap and an acquisition decision, which is where the fix actually lives. Writing `excluded` here is **F3**. It also fails if anything is *answered*: seven files match `boil-off` and eight match `cryocool`, so the exclusions matcher's own motivating case applies  a thin corpus still produces a word-overlap match, and nothing refuses. This is the EXCLUDED-THEN-THIN outcome and it is the one that will answer wrongly. | **green**, and it now passes on **both** routes. The excluded-node path reaches it through `cadence-cryogenic-break`'s `match_keys`; the thin-patch path reaches it through T5 at mass **6.389** against a govern threshold of 6.175. T5 could not fire at all until 2026-08-28, when the trigger `boil-off` was found unmatchable against `tokenize()`. |

---

## 5. Coverage, stated so a gap in the set is visible

| dimension | covered by |
|---|---|
| All six verdicts | `APP` SRQ-1, SRQ-2 ý `FIGURE` SRQ-3 ý `LITERATURE` SRQ-7, SRQ-9, SRQ-11 ý `BOTH` SRQ-4, SRQ-10 ý `CONTESTED` SRQ-5, SRQ-6, SRQ-8, SRQ-12 ý `REFUSE` SRQ-13, SRQ-14 |
| All ten question classes | SRQ-1 & SRQ-10, one each |
| All three register classes | `two_sided` SRQ-5, SRQ-8, SRQ-12 ý `false_pair` SRQ-6 ý `one_sided` SRQ-11 |
| All three trace grades | `recompute-verified` SRQ-1, SRQ-2, SRQ-3 ý `resolution-only` SRQ-2, SRQ-4, SRQ-7, SRQ-9 ý `refused` SRQ-13, SRQ-14 |
| Refusal reason codes | `not-found` SRQ-13, SRQ-14. **Not covered: `unbuildable`, `axis-incomplete`, `misclassified`, `input-missing`**  these are loop failures rather than lunar-domain questions and belong in The Software Engineer's group, not this one. |
| The three exclusion outcomes | EXCLUDED-THEN-CORPUS SRQ-12 ý EXCLUDED-THEN-THIN SRQ-14 ý **EXCLUDED-BUT-ADJACENT not covered.** The three adjacency pairs ship as data in `oracle/question_classes.json`; a fixture for them needs the router's adjacency mechanism to exist first, and is owed at the sub-step that builds it. |
| R5, the three named facts | SRQ-11 asserts it explicitly; SRQ-12 asserts the boundary half through its scope token |

**Two things this set deliberately does not do.** It asserts no answer wording, except the one-side
disclosure at SRQ-11 and the `false_pair` banned-word list at SRQ-6, both of which the contract and
the schema state verbatim and both of which must be compared against text read out of those files
at test time rather than against the copy printed here. And it assigns no `green` on a row nobody
has run: two rows are marked `K` because their outcome is a function of a threshold that is not
set, one is `RED` with a named reason, owner and close condition, and calling any of the three green
before the mechanism exists would be assigning a status before the run  the defect
`FIX-9` and `FIX-10` already cost this project once.

---

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +14/-0
```

**The 14 tests are the deliverable of sub-step 4.8, not freeze spend.** The standing block's TDD
exception applies: where a brief says the test artifact *is* the deliverable, those tests are not
counted against the freeze.
