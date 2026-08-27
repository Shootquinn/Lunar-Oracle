# Step 0.2 — The Lunar Question Surface

**Agent:** The Space Resources Engineer
**Sub-step:** 0.2, Wave 1, parallel
**Deliverable:** the lunar question surface slice of the gameplan — taxonomy, app boundary, thin
patches, excluded-node ranking, contested-claims register, TRL discipline, and the steps that build
each of them.
**Date:** 2026-08-26

---

## 0. What this is derived from

The gameplan (full). `lsei/lunar-scenario-explorer-map.md` sections: Totals, Every Claim and its
sections, Which coefficients each section governs, The live coefficient values, Where each rendered
value comes from, The nodes ruled excluded, References. A filename listing of all eight
`lsei/literature/` folders, 158 files, counts matching the gameplan's inventory. Full or partial
reads of 31 summaries. Header reads of `lsei/oracle/answer_question.js`,
`lsei/oracle/lib/literature_search.js`, `lsei/oracle/lib/exclusions_match.js`,
`lsei/oracle/lib/address.js`.

Four counts I ran rather than inherited, because they change what I propose:

| what | count | how |
|---|---|---|
| `lsei/literature/*/*.md` | 158 | `ls */*.md \| wc -l` |
| author-year clusters holding more than one summary file | 16 | filename normalization, verified by hand |
| files matching "shear strength", "bearing capacity", "cone penetr", "regolith mechanic" | 0 | recursive grep, all eight folders |
| files matching "dust mitigation" | 3 | same |

The map is generated from the app and the app is authority. Every app figure below is a pointer to
the artifact, not a quotation from an authority. Step SR-7 exists because of that distinction.

---

## 1. The question taxonomy

Ten classes in three routing tiers. The tiers are the router's branch, not a description: the
prototype classifies before it retrieves (`answer_question.js`, and it is the inherited rule), so
the taxonomy has to be a thing the classifier can test rather than a thing a reader can recognize.

The operational test for "the app answers it" is narrower than "the app models it." In
`address.js` an app address resolves only when a scenario name resolves against `PRESETS` **and**
an output name resolves against `model()`'s own return keys. Everything else in the app — 66
sections of ledger prose, 63 references, 10 exclusions — is text the app carries, not arithmetic
the app performs, and an answer sourced from it is resolution-grade at best.

### Two tooling findings that change section 2, verified against the artifact

These belong here rather than in the thin-patch list, because they are tooling gaps rather than
corpus gaps, and both narrow the app's *reachable* surface well below its *computed* surface.

**The lexicon names a fraction of what the model returns.** `model()` in `index.html` returns 26
keys. `OUTPUT_LEXICON` in `answer_question.js` names eight of them (`water`, `binding`, `ice`,
`constructionPotential`, `construction`, `feasible`, `phi_c`, `regolith`) and `KNOB_LEXICON` names
seven rails. Unnamed and therefore unreachable: `cap`, `Wpower`, `Wthr`, `mPwr`, `Rcap`, `mining`,
`regime`, `Cfull`, `eEE`, `rho`, `massEff`, and the two envelope fractions. Those are the questions
a space resources person actually asks — how much water is power-limited against throughput-limited,
what the power system weighs, how much regolith moves per year. Each currently falls through to a
literature search.

**The Oracle's only door into the app does not open onto the economics.** The app's economic half
lives in a second function, `valueModel()`, which returns `r_prop`, `r_const`, `P_prop`, `P_const`,
`margin_prop`, `margin_const`, `value_prop`, `value_const`, `Dstar_prop` and `ranking`.
`oracle/lib/app_model.js` extracts `{model, CONFIG, DETENTS, ENVELOPE, PRESETS}` and nothing else;
grepping `app_model.js` and `address.js` for `valueModel`, `margin` or `value_prop` returns zero
hits. So roughly half the app's rendered equations and five of its seven value-trace keys cannot be
reached by any APP verdict today.

Both failures are silent in the same way, and the way is what matters. The router does not refuse —
it routes an app question to the corpus and answers it from a summary. That is a direct violation of
the inherited rule (*a question the app can answer is answered from the app*) committed by the
mechanism built to enforce it, and it violates it in the one direction nobody will notice, because
the answer comes back cited and plausible. Section 2's boundary is nominal until SR-1b and SR-7
close this. It is also the sharpest thing I can hand The Growth Economist: the half of the app he
would want is the half the Oracle currently cannot ask.

### Tier A — the app computes it. Verdict APP or FIGURE. Recompute-grade.

**L1. Scenario output.** A named scenario, a named output, a number. "What is water output under
Agency Led Baseline in 2040?" "What is construction potential at phi_c = 0.5?" Reaches
`Wpower`, `Wthr`, `cap`, `water`, `Cfull`, `construction`, `r_prop`, `r_const`, `P`, `margin`,
`value`, `ranking`, `Dstar` — the 19 rendered equations and the seven value-trace keys.

**L2. Binding regime and structural why.** "What binds at low ice grade?" "Why does the model take
a minimum of two limits?" The regime notes (`BIND-POWER`, `BIND-MASS`, `BIND-POWERMASS`,
`ICE-LEAN`, `ICE-NOMINAL`, `ICE-RICH`, `FISSION-ON`/`OFF`, `PHIC-*`, `RPROP-PAYS`/`FAILS`) plus the
five `structural-choices` sections. The *label* is computed; the *prose* is stored. Those are two
different trace grades and the app already distinguishes them.

**L3. Sensitivity and sweep.** "How does water output vary across the ice rail?" The knob-sweep
address in `address.js` walks a `DETENTS` rail. Note `landed_cost` is a `DETENTS` rail that
`model()` does not accept as an input, so a landed-cost sweep is not the same object as an ice
sweep, and `address.js` says so in its own error text.

### Tier B — the app holds a position it did not compute. Verdict BOTH, in a fixed order.

**L4. Coefficient provenance and licence.** "Where does 37,000 kWh per tonne come from?" "Is a
capture efficiency of 1.0 defensible?" The app carries the value, its status field, and its
governing section; the corpus carries the primary the section cites. Both are needed and the order
is not negotiable: the app states what it uses, the corpus states what was measured, and the answer
never presents the second as if it were the first.

**L5. Resource state and prospecting evidence.** "How much ice is in Cabeus?" "How is grade
distributed?" This is the most dangerous class in the taxonomy, and it is dangerous for a reason
that looks trivial: `ice` is an app *input* with a `DETENTS` rail of [1, 2, 5, 10, 20] wt%, so a
question about ice grade will find a knob with the right name and no computation behind it. The
app has a governing
section (`ice-grade-evidence`, VERIFIED) and a break condition (`ice-grade-break`), and neither
computes a grade. The corpus is where grade evidence lives, and the corpus disagrees with itself by
an order of magnitude at one crater (LCC-01).

**L6. Delivery cost and architecture.** "What does it cost to land a kilogram?" `landed_cost` is an
input rail of 11 rungs from $1,000 to $1,000,000/kg, with the 2030 rung UNVERIFIED-pending and the
2040 and 2055 rungs PROJECTED. Four sections carry the evidence. The corpus carries the primaries
and they are not commensurable with each other (LCC-11).

### Tier C — the app computes nothing. Verdict LITERATURE or REFUSE.

**L7. Process route performance and maturity.** "How much energy per kilogram to extract water by
thermal mining?" "What TRL is molten regolith electrolysis?" "Has anyone built a carbothermal
reactor?" The app models one implicit water route through `E1` and `kP` and models no oxygen,
metal, or helium route at all. This class is where the corpus is richest and where it disagrees
most (LCC-04, LCC-06, LCC-07, LCC-08).

**L8. Site, environment and surface operations.** Illumination fraction, PSR temperature, cold-trap
area, terrain, excavation conditions, dust, night survival. Two app sections carry evidence
(`persistently-lit-terrain`, `polar-cold-trap-water`) and compute nothing. The corpus covers
illumination well (LCC-09) and covers surface operations badly (thin patches T1, T2, T3, T8).

**L9. Demand, market, programme and law.** Offtake, delivery record, programme milestones, treaty
and property regime. Three of the app's ten exclusions sit here and there is no app surface for law
at all. Ten law files, 26 economy-and-markets files. Shares a boundary with The Growth Economist.

**L10. Cross-domain transfer.** "Does the Japanese absorption mechanism apply to a lunar industrial
base?" Neither corpus answers alone; this is the class the merge exists for. My half of it is
whether the lunar side of a proposed binding is a real technical fact or a plausible-sounding one.
His half is whether the economic side transfers. Both halves have to hold.

---

## 2. Which classes the app already answers

This is the Manager F1 addendum and it is the input to Open Question 5. The table first, then the
part that matters.

| class | does the app answer it | authority | trace grade available |
|---|---|---|---|
| L1 Scenario output | **Yes, wholly.** | App, sole. | Recompute |
| L2 Binding regime, structural why | **Label yes, prose partly.** | App for the label; app's stored prose for the why. | Recompute (label), resolution (prose) |
| L3 Sensitivity and sweep | **Yes, within the rails.** | App, sole. Outside a rail: refuse. | Recompute |
| L4 Coefficient provenance | **No.** The app carries a value and a status, not a provenance. | App for value and status; corpus for evidence. | Recompute (value), resolution (evidence) |
| L5 Resource state | **No.** `ice` is an input. | Corpus, sole. The app's rail is a control, not a finding. | Resolution |
| L6 Delivery cost | **No.** `landed_cost` is an input rail. | Corpus for the primaries; app for what it assumed. | Resolution |
| L7 Process route performance and TRL | **No, and not partly.** | Corpus, sole. | Resolution |
| L8 Site, environment, operations | **No.** | Corpus, sole. | Resolution |
| L9 Demand, market, programme, law | **No, and the app says so** — 3 of 10 exclusions. | Corpus, sole. | Resolution |
| L10 Cross-domain transfer | **No.** | Merged corpus, both halves. | Resolution |

Three of ten classes reach the app. Seven do not. That ratio is the honest shape of the problem and
it is worth stating plainly before anyone builds a router that assumes otherwise.

### The restatement Open Question 5 needs

The inherited rule reads: *a question the app can answer is answered from the app, never from a
literature summary that happens to carry a number.* The rule is right and it is under-specified in
one place. "Can answer" is doing work the phrase cannot support, because the app will return a
number for any point on any rail, and returning a number is not the same as answering a question.

The failure this permits is specific. `captureEff` = 1, and the app's own status field reads
"ASSUMPTION (optimistic bound, no primary reports 100 percent)." An APP-verdict answer to "how much
water can a 100 kWe plant produce" reports a figure whose derivation includes a capture efficiency
that the app itself flags as unachieved and that every experimental primary in the corpus
contradicts: LUWEX recovered 50 to 73 percent with capture up to 89 percent, PVEx 43 to 56 percent,
LADI targeted 75 percent and was cancelled before TRL 5. The rule as written makes that answer
correct and forbids the correction.

My restatement is stronger than the original, not weaker:

> The app is the sole authority on **what the app computes**, and a coefficient's status field is
> part of what the app computes. An APP verdict must carry the status of every coefficient on the
> computation's path. Where any coefficient on that path is ASSUMPTION, PROJECTED, or CONTROL, the
> answer names it and names the primary evidence the corpus holds against it. This is not a
> literature figure arguing with an app figure — the app figure stands unchanged and remains the
> answer. It is the app reporting itself completely.

Two consequences The Systems Engineer should have when he rules at 0.5.

First, this survives the corpus growing past the app. It does not grant the corpus authority over
any computation; it grants the corpus the right to be quoted about a coefficient the app has
already declared unevidenced. The app declared those gaps itself — six coefficient rows carry no
governing section, and the app names each of them in its own Definitions prose. The corpus is
answering a question the app asked.

Second, it is mechanical. The status strings are in the artifact. `VALUE_TRACE` already names seven
rendered values and their origins. The path from an output to its coefficients is the equation
table. Nothing here requires judgment at answer time, which is the property that makes it a rule
rather than a preference.

---

## 3. Where the corpus is thin

This is a failure-mode inventory. Each entry names what is absent, what the nearest real evidence
is, and which app coefficient or claim the absence undermines. Ranked by damage, which is
ask-frequency times how confidently the corpus would answer wrongly.

**T1. Icy-regolith geotechnics. The worst gap in the corpus.**
Absent: shear strength, bearing capacity, cone penetration resistance, and specific excavation
force for ice-bearing regolith at PSR temperature. Recursive grep across all eight folders returns
zero files for "shear strength", "bearing capacity", "cone penetr", and "regolith mechanic".
Nearest evidence: Barnett 2025 on regolith consolidation caused by *thawing* of water ice — the
opposite process, and a single IAC paper. Rostami 2018 on lunar TBMs is explicitly a conceptual
paper with no original experimental or design data. Just 2020 reviews thirteen excavation concepts
and its own conclusion is a set of recommendations for experiments not yet performed.
Undermines: `kExc` = 4 t regolith/yr per t plant, status ASSUMPTION (calibrated-to-fit), which sets
the entire mass-bound regime through `Rcap` and `Wthr`. A question about how hard it is to dig
frozen regolith will find nothing, and the router as built will hand back the nearest
word-overlap match instead.

**T2. Dust, abrasion and wear.**
Absent: abrasive wear rates, bearing and seal life, tribology under vacuum with regolith ingress.
Three files match "dust mitigation"; zero match "abrasive wear" or "bearing life".
Undermines: `duty` = 0.6, status ASSUMPTION. Every annual-production figure in the app and in every
architecture study in the corpus rests on an assumed duty cycle with no wear evidence behind it.

**T3. Maintenance, reliability and spares.**
Absent: lunar-surface reliability data of any kind. Two files match "MTBF", one matches "spare
part". The only reliability primary is `rahimdel-2024-mining-truck-reliability-bayesian`, a
terrestrial mining-truck study.
Undermines: `L` = 10 yr (DESIGN), `decayRate` = 0.15/yr and `decayLife` = 11 yr (both SOURCED, and
the source is terrestrial depreciation practice via `bea-depreciation-rates`). The amortized-plant
identity is the app's whole economic engine and its plant-life terms come from Earth.

**T4. Water cleanup and downstream contamination.**
Absent: any primary on cleanup performance. What the corpus does hold is a consistent set of
statements that the step is immature — LUWEX names volatile contamination and dust mobilization as
unresolved, Sanders 2025 puts capture/cleanup at TRL 3/4 and notes alkaline electrolysis of dirty
water has unresolved corrosion issues. The chain from sublimated vapor to electrolysis-grade water
is the weakest link in every water architecture in this corpus, and the corpus documents *that* it
is weak without documenting *how* weak.
Undermines: every propellant figure downstream of extraction.

**T5. Cryogenic fluid management, boil-off, and transfer cadence. The double gap.**
Thin on both sides at the same point: seven files match "boil-off", nine "cryocool", five "storage
tank", and none is a primary on lunar-surface cryogenic transfer. The app also excludes this —
`cadence-cryogenic-break`, "This app does not model programme milestones."
This is the worst combination available: the app declares a boundary and the corpus cannot fill it,
so nothing refuses, because the exclusions matcher requires a topic overlap and a thin corpus can
still produce a word-overlap match. The exclusions matcher's own header comment already names this
exact failure as its motivating case.

**T6. Sintering and construction-product properties.**
`eSinter` = 3 MJ/kg is ASSUMPTION and `ySinter` = 0.85 is ASSUMPTION. The governing section carries
twelve references and its own tier string reads "VERIFIED (source per-area figures), ASSUMPTION
(app constant), VERIFIED-as-printed (bench figures, source internally unreconciled)." Two files
match "compressive strength"; zero match "sintering strength". The app carries an entire product
line on two assumed coefficients that the corpus cannot check.

**T7. Non-water product routes past oxygen.**
Iron: `iron-production-energy` is excluded and the corpus has essentially one source that treats
metals as an MRE byproduct. Helium-3: three files, the founding one 34 years old (Wittenberg 1992),
the modern one (Olson 2021) explicitly supply-side with a single non-quantified passage on the
fusion market. REE and PGM: two files, neither lunar-specific in the way a question would need.

**T8. Autonomy and teleoperation at the operational level.**
Eight files match "teleoperat", but the substantive one is Kokkinis 2024, a terrestrial
mining-automation review whose own conclusion is that infrastructure-less, standardized autonomy
"remains an open research target rather than a deployed reality." Any Oracle statement about
autonomous lunar mining operations rests on a terrestrial review that says the terrestrial case is
unsolved.

**T9. Plume ejecta and pad construction.**
Six files match "landing pad" and Metzger & Autry 2023 is effectively the sole source. It is also
one of the seven references licensing `sintering-specific-energy`. A single source doing double
duty is a single point of failure for two different question classes.

**T10. Programme-state currency.**
`programme-primaries` is ten files and its authority documents are dated snapshots. Sanders &
Kleinhenz 2025 is a May 2025 point-in-time briefing and it is the only TRL sheet in the corpus. In
2028 it will still be the only TRL sheet in the corpus, and the Oracle will still be answering with
it. Step SR-8 addresses this and it is cheap.

**A structural note that belongs here.** Sixteen author-year clusters hold more than one summary
file. `sowers-2019` holds four; the Aqua Factorem set holds three across two years. A retrieval that
ranks by filename token overlap and returns the top-scoring file will pick whichever member of a
cluster tokenizes best against the question, which need not be the member that contains the claim.
This is The Engineer's merge decision, but it lands on my register as a dependency: the register
names sources by path, so the register cannot be written against unstable paths. Step SR-3 exists
for that reason.

---

## 4. The ten excluded nodes, ranked

### The general rule, first

An excluded node is not a refusal. The app's exclusion prose says what *the app* does not do. It
does not say the question is unanswerable, and in six of ten cases the corpus answers it well. The
prototype's `exclusions_match.js` treats an exclusion as "the strongest form of refusal available,"
which is correct for the app-authority question and wrong for the user's question. Three outcomes
are needed, not one:

- **EXCLUDED-THEN-CORPUS.** The app declares the boundary; the corpus has a real primary; the
  answer comes from the corpus and is never dressed as an app output. Requires a named primary.
- **EXCLUDED-THEN-THIN.** The app declares the boundary and the corpus is thin. Refuse, and name
  the specific missing measurement rather than the general limitation.
- **EXCLUDED-BUT-ADJACENT.** The app models something that *looks* like the answer. The answer must
  state the distinction explicitly or the user reads the adjacent number as the answer. This is the
  outcome the prototype has no mechanism for and it is where the real damage is.

### The ranking

Ordered by how likely a user is to ask, for a practitioner audience. The public-repository shift is
noted after.

| rank | node | what the app says | what the corpus holds | outcome |
|---|---|---|---|---|
| 1 | `oxygen-extraction-energy` | does not model oxygen production | Leger 2025, Colozza 2010, CaRD 2023, Sargeant 2020, Schreiner 2016, Sanders 2025 — rich and mutually incompatible | EXCLUDED-THEN-CORPUS, register LCC-07 and LCC-08 mandatory |
| 2 | `propellant-mass-leverage` | does not model propellant displacing delivered cargo | Kornuta 2019, Metzger & Autry 2023, Kleinhenz & Paz 2017/2020 | **EXCLUDED-BUT-ADJACENT** — see below |
| 3 | `delivered-cargo-record` | does not model delivery capacity | CLPS timeline, CLPS procurement vignette, Kornuta 2019 | EXCLUDED-THEN-CORPUS, with a date |
| 4 | `grade-independent-demand` | does not model demand | Colvin 2020, Nayak 2024, Matthews 2026, Marcy 2026, Turyshev 2026 | EXCLUDED-THEN-CORPUS, and it is The Growth Economist's boundary too |
| 5 | `bound-oxygen-mare` | does not model where the non-water resources sit | Prettyman 2006, Crawford 2015, Schreiner 2016, Wittenberg 1992 | EXCLUDED-THEN-CORPUS |
| 6 | `cadence-cryogenic-break` | does not model programme milestones | thin — see T5 | **EXCLUDED-THEN-THIN**, and this is the one that will answer wrongly |
| 7 | `habitat-water-terrain` | does not model crew habitat siting | Hayne 2020, Horvath 2022, Paige 2010, Glaser 2014 | EXCLUDED-THEN-CORPUS |
| 8 | `mars-campaign-conditional` | does not model Mars campaign economics | Jones 2019/2020, NexGen 2015, Ishimatsu 2016, Kleinhenz 2017 | EXCLUDED-THEN-CORPUS, heavily conditional |
| 9 | `iron-production-energy` | does not model iron production | thin — one route, byproduct treatment only | EXCLUDED-THEN-THIN |
| 10 | `helium-procurement-energy` | does not model helium-3 procurement | Wittenberg 1992, Olson 2021, Gao 2011 | EXCLUDED-THEN-CORPUS on supply, **REFUSE on demand** — register LCC-13 |

**Rank 2 is the one to build for.** `propellant-mass-leverage` is excluded while `net-value-identity`
is modeled, and they are one conceptual step apart. A user asking "what is lunar propellant worth"
is asking the excluded question, and the app will happily resolve an address into the modeled one
and return a number. That number answers a different question — avoided delivery cost on a fixed
mass — and reads as an answer to the mass-leverage question, which is about propellant displacing
cargo and is not modeled at all. Same for `mars-campaign-conditional` against `avoided-cost`, and
for `grade-independent-demand` against `offtake-record`. Three adjacency pairs, and they need to
ship as data rather than as a paragraph someone remembers.

**The A1 shift.** Under A1 the repository is public, so the audience includes non-specialists.
That moves `helium-procurement-energy` from rank 10 to roughly rank 2 and `habitat-water-terrain`
from 7 to about 4, because those are the two lunar questions the general public asks most and the
practitioner community asks least. It does not change any outcome assignment. Under a private
repository I would rank by practitioner ask-frequency alone and leave He-3 at the bottom. The
outcome assignments are audience-independent, which is why they are the part that ships.

---

## 5. The lunar-side contested-claims register

Fifteen entries. Written to be consumed by a machine: The Software Engineer turns it into a
retrieval invariant, The Engineer encodes it at merge time.

### 5.1 Schema

```yaml
- id:            LCC-NN
  axis:          one line — what the disagreement is about
  kind:          CONTESTED | INCOMMENSURABLE | SUPERSEDED | ASYMMETRIC | UNCONSTRAINED
  trigger:       [tokens; the entry fires when a question's tokens overlap these]
  sides:
    - label:     A
      sources:   [paths under literature/]
      position:  one line
    - label:     B
      sources:   [...]
      position:  one line
  verdict:       FAVOURS_A | FAVOURS_B | OPEN | NOT_COMPARABLE
  verdict_basis: one line, or the empty string where the evidence does not decide
  app_surface:   [slugs or coefficient symbols], or none
  rule:          RETURN_ALL_SIDES | RETURN_WITH_SCOPE_NOTE | PREFER_AND_NAME | REFUSE_ONE_SIDE
```

### 5.2 The five kinds, because they are not the same failure

- **CONTESTED** — two measurements of the same quantity that disagree. Return both.
- **INCOMMENSURABLE** — two figures that look like the same quantity and are not, because the
  system boundary or the scale differs. Return with the boundary named. This is the more common
  case in ISRU literature and the one that produces the most confident wrong answers.
- **SUPERSEDED** — a later result narrows an earlier one without refuting it. Return both, later
  first.
- **ASYMMETRIC** — one side is a documented body of work and the other side is an absence. The
  absence is the finding. Return the documented side with the absence named.
- **UNCONSTRAINED** — the app or an architecture carries a number that no measurement in the corpus
  constrains. There is no second side; the register's job is to stop a single-source answer from
  sounding measured.

### 5.3 The invariant, stated for The Software Engineer

> For any answer, compute the set of register entries whose `trigger` tokens overlap the question's
> tokens, union the set of entries any retrieved file appears in under `sides[].sources`. For every
> entry in that union: if `rule` is RETURN_ALL_SIDES, the answer carries at least one source from
> every side or the answer refuses. If `rule` is RETURN_WITH_SCOPE_NOTE, the answer names the
> system boundary and the scale of every figure it quotes. If `rule` is PREFER_AND_NAME, the
> answer leads with the favoured side and names the other. If `rule` is REFUSE_ONE_SIDE, an answer
> carrying only the named side refuses.
>
> Second-order: an entry's `sources` list must name **every** member of a near-duplicate filename
> cluster, or the invariant can be satisfied by returning a file that does not contain the claim.
> Sixteen such clusters exist. A build check asserts every path resolves.

### 5.4 The entries

---

**LCC-01 — Ice grade at Cabeus.**
- axis: same crater, three methods, an order of magnitude apart.
- kind: CONTESTED (partly INCOMMENSURABLE by depth and footprint)
- trigger: `[cabeus, ice, grade, concentration, wt%, water, lcross, psr, neutron]`
- A: `colaprete-2010-lcross-water.md`, `colaprete-2010-lcross-ejecta-water-detection.md` —
  5.6 ± 2.9 wt% in the target regolith, from the impact plume, direct spacecraft measurement.
- B: `litvak-2024-lend-cabeus-water-ice.md` — 0.49 ± 0.05 wt% averaged over Cabeus-1, maximum about
  0.7 wt% at the crater bottom, which is where the LCROSS impact site sits. Collimated neutron,
  2009-2023.
- C: `luchsinger-2021-lcross-water-modeling.md` — 8.2 wt% or 4.3 wt% from the same LCROSS event
  depending on the assumed regolith density, 0.8 albedo assumed for the ice.
- verdict: OPEN.
- verdict_basis: part of the spread is scope — LEND averages a large footprint over roughly the top
  metre, LCROSS sampled one excavation to greater depth — and part is not, because Litvak's own
  local maximum at the LCROSS site is roughly eight times below Colaprete's central value there.
  The evidence does not decide it.
- app_surface: `ice`, `ice-grade-evidence`, `ice-grade-break`, `polar-cold-trap-water`
- rule: RETURN_ALL_SIDES; plus a rail-endpoint disclosure — an answer computed at `ice` = 10 or 20
  states that the grade exceeds every measurement in this corpus.

**Two findings worth carrying out of this entry, and the second is the one to act on.**

First, the app's three ice regimes — `ICE-LEAN`, `ICE-NOMINAL`, `ICE-RICH` — and the lower half of
the `ice` rail are not three scenarios. The measured range at one crater is roughly 0.5 to 8 wt%,
which covers the rail's first three detents (1, 2, 5) entirely. The app is not exploring futures on
that part of the knob, it is exploring the current state of a disagreement, and an answer that
presents a low-ice sweep as a scenario comparison is misdescribing what the sweep is.

Second, the rail's top two detents are 10 and 20 wt%, and no observation in this corpus supports
either. Li 2026's ShadowCam search had a detection limit of 20 to 30 wt% and found no widespread
surface ice above it; the highest number any primary here reports for Cabeus is Luchsinger's 8.2
wt%, and that figure is conditional on an assumed regolith density. A sweep that runs to 20 wt%
runs off the end of the evidence, and because water output scales as `E1/ice` the model rewards
that end of the rail most. An answer quoting a 10 or 20 wt% result must say that the grade is above
anything measured. This is a rail-endpoint disclosure and it is mechanical: two detent values, one
sentence.

---

**LCC-02 — Surface-exposed ice, detected or not.**
- axis: same lead author, eight years, two instruments, opposite headline.
- kind: SUPERSEDED
- trigger: `[surface, exposed, ice, psr, shadowcam, m3, detect, reflectance]`
- A: `li-2018-surface-exposed-water-ice.md` — direct evidence of surface-exposed water ice in the
  polar regions, Moon Mineralogy Mapper.
- B: `li-2026-shadowcam-psr-water-ice.md` — no evidence of widespread surface ice above a 20-30 wt%
  detection limit; a few small locations possibly above 10 wt%; explicitly does not rule out
  widespread ice at lower content; states that detection below 1 wt% is what would settle it.
- verdict: FAVOURS_B, as a narrowing rather than a refutation.
- verdict_basis: B's detection limit is high enough that it does not contradict A's low-abundance
  patchy detections. What it does refute is the reading that surface ice is abundant and
  areally extensive.
- app_surface: `polar-cold-trap-water` (cites both)
- rule: RETURN_ALL_SIDES

---

**LCC-03 — Is polar ice widespread and shallow, or concentrated and buried.**
- axis: prospecting strategy, and therefore whether any excavation coefficient means anything.
- kind: CONTESTED
- trigger: `[cold trap, distribution, buried, patchy, micro, prospect, deposit, mining scale]`
- A: `hayne-2020-micro-cold-traps.md` — micro cold traps hold 10-20 percent of total cold-trap
  area, total about 40,000 km², implying polar water is more accessible than large-crater estimates
  suggest.
- B: `cannon-2020-lunar-ice-geologic-model.md` — a geologic model at mining scales in which ice is
  buried, patchy and shuffled by cratering.
- C: `schorghofer-2026-current-theories-lunar-ice.md` — the standard model, consistent with the
  major observational constraints, a few less-established claims unaccounted for.
- verdict: OPEN.
- app_surface: `polar-cold-trap-water`, `habitat-water-terrain`
- rule: RETURN_ALL_SIDES

---

**LCC-04 — Water extraction specific energy. The most important entry here.**
- axis: four figures spanning more than an order of magnitude, at four different system boundaries
  and four scales separated by up to four orders.
- kind: INCOMMENSURABLE, with a genuine CONTESTED core
- trigger: `[energy, kwh, specific, extract, water, sublimat, thermal mining, g/kwh, efficiency]`
- A (app): `E1` = 37,000 kWh per tonne H₂O at 1 wt%, status SOURCED (derived); `kP` = 0.142, status
  SOURCED (design target, **ahead of demonstration** — the app's own words). At 5 wt% this is
  7.4 kWh/kg, equivalently about 135 g/kWh.
- B: `sowers-2019-thermal-mining-ice.md` and the three other `sowers-2019-*` files — roughly
  1.3 to 2.7 kWh/kg derived from the article's own power-versus-concentration figures at 4 wt%,
  1,600 t/yr, extraction only, solar thermal, and the article does not state a specific-energy
  figure as such.
- C: `kiewiet-2026-luwex-water-extraction.md` — measured 22.88 to 66.33 g/kWh, equivalently about
  15 to 44 kWh/kg. Integrated extraction, capture and liquefaction. Bench scale, up to 13 kg per
  run, 5 wt% ice, LN₂-cooled cold trap.
- D: `wang-2025-microwave-water-production.md` — 1.9 to 10.0 W·h/g, equivalently 1.9 to 10 kWh/kg.
  Microwave, extraction only, 70 mm × 70 mm cylinder at -80 °C.
- verdict: NOT_COMPARABLE as printed.
- verdict_basis: the only integrated demonstration is C and it is the least favourable by a wide
  margin, which is the expected direction for a bench system carrying capture and liquefaction
  losses that A, B and D exclude by scope. The genuine contested core, once boundaries are matched,
  is whether the capture-and-liquefaction penalty is a bench artifact or a real term.
- app_surface: `E1`, `kP`, `energy-per-tonne`, `energy-per-kilogram`, `bilinear-water-law`
- rule: RETURN_WITH_SCOPE_NOTE — every figure names its boundary (extraction only, or integrated)
  and its scale (bench kilograms, or tonnes per year).

---

**LCC-05 — Water capture efficiency. The app against every primary.**
- axis: the app assumes 100 percent capture; nothing in the corpus reports it.
- kind: UNCONSTRAINED, resolving toward CONTESTED
- trigger: `[capture, efficiency, recovery, cold trap, yield, derate]`
- A (app): `captureEff` = 1, status "ASSUMPTION (optimistic bound, no primary reports 100 percent)".
- B: `kiewiet-2026-luwex-water-extraction.md` — 50 to 73 percent water recovery, capture up to 89
  percent; `sanders-2025-nasa-isru-progress-review.md` and its duplicate — PVEx 43 to 56 percent at
  4 to 6 wt%, LADI targeted 75 percent and was cancelled before TRL 5, capture and cleanup at
  TRL 3/4; `linne-2020-lunar-water-pilot-plant.md` — the auger-dryer conceptual design.
- verdict: FAVOURS_B decisively on the physical question.
- verdict_basis: no primary reports full capture and four report substantially less. The app is
  honest about this in its status field, and the status field is not part of the arithmetic.
- app_surface: `captureEff`, `capture-derate`, `Wthr`, `cap`, `water`
- rule: REFUSE_ONE_SIDE — an answer quoting an app water output without the capture-efficiency
  status refuses. This is the concrete case that the Open Question 5 restatement in section 2 is
  written to handle.

---

**LCC-06 — Thermal extraction against mechanical beneficiation.**
- axis: a 98.3 percent power-reduction claim, and what it is conditional on.
- kind: CONTESTED, with a decisive TRL asymmetry
- trigger: `[aqua factorem, beneficiation, magnetic, electrostatic, separation, thermal mining,
  power reduction]`
- A: `sowers-2019-thermal-mining-*.md` (four files) — solar thermal sublimation under a capture
  tent, the CSM architecture study, concept level, NIAC Phase I.
- B: `metzger-2021-aqua-factorem.md`, `metzger-2021-aqua-factorem-2.md`,
  `metzger-2020-aqua-factorem.md` — mechanical, pneumatic, magnetic and electrostatic beneficiation
  of ice grains; 98.3 percent surface power reduction against a published thermal baseline, and
  97.5 percent against an 800 kW thermal comparison.
- verdict: OPEN on performance; FAVOURS_A on evidential standing.
- verdict_basis: B's power claim is conditional on a premise no measurement has confirmed — that
  PSR ice exists as separable granular particles at roughly 70 μm. B's own report states that ground
  plastic sandblasting media stood in for ice in every magnetic, pneumatic and size-sorting test,
  that the analogue's electrostatic properties are undetermined and may not suit, and that the
  basalt placement in the triboelectric series was made by analogy with no quantitative data. A is
  also concept level, but its physics does not depend on an unconfirmed ice morphology.
- app_surface: none directly; `energy-per-tonne` and `capture-derate` are the adjacent claims.
- rule: PREFER_AND_NAME — the power-reduction figure is never returned without the ice-morphology
  premise and the plastic-analogue disclosure in the same answer.

---

**LCC-07 — Oxygen production specific energy.**
- axis: four figures from 24 to 93 kWh per kg, including two NASA sources on the same programme two
  years apart.
- kind: CONTESTED and INCOMMENSURABLE (thermal against electrical is not consistently drawn)
- trigger: `[oxygen, o2, lox, energy, kwh, per kilogram, carbothermal, ilmenite, mre, reduction]`
- A: `leger-2025-energy-oxygen-moon.md` — 24.3 ± 5.8 kWh per kg LOX, hydrogen reduction of
  ilmenite at 10 wt% ilmenite, end-to-end including excavation, beneficiation, electrolysis,
  liquefaction and zero-boil-off storage.
- B: `colozza-2010-solar-lunar-oxygen.md` — about 39 kWh per kg O₂ derived from the paper's own
  power and rate figures, roughly 82 percent thermal and 18 percent electrical, at a 1,000 kg/yr
  demonstration scale. The paper does not state a specific-energy figure.
- C: `nasa-2023-card-carbothermal-reduction.md` — brassboard yields of 10.77 to 15.79 g O₂ per kWh
  thermal, equivalently about 63 to 93 kWh per kg thermal, across four runs.
- D: `sanders-2025-nasa-isru-progress-review.md` and duplicate — carbothermal at TRL 5, greater than
  20 g O₂ per kW·hr thermal, equivalently under 50 kWh per kg thermal.
- verdict: OPEN.
- verdict_basis: C and D describe the same NASA programme and report incompatible yields. Neither
  states its measurement uncertainty or replicate count; C's own summary flags inconsistent numeric
  precision across its slides.
- app_surface: `oxygen-extraction-energy` — **EXCLUDED**. This contested set sits entirely outside
  the app, which is exactly why it is dangerous: nothing in the app will contradict a wrong answer.
- rule: RETURN_ALL_SIDES plus RETURN_WITH_SCOPE_NOTE on thermal against electrical.

---

**LCC-08 — Does an oxygen route's headline number transfer to the pole.**
- axis: feedstock. Ilmenite routes need mare; every architecture in this corpus lands at the south
  pole.
- kind: INCOMMENSURABLE
- trigger: `[ilmenite, mare, highland, feedstock, beneficiation, polar, route, transfer]`
- A: `sargeant-2020-hydrogen-reduction-ilmenite-static.md`, `leger-2025-energy-oxygen-moon.md` —
  hydrogen reduction of ilmenite, requires ilmenite-rich mare feedstock plus beneficiation.
- B: `schreiner-2016-molten-regolith-electrolysis-sizing.md`,
  `schreiner-2016-mre-sizing-model.md`, `sibille-2012-joule-heated-mre.md` — MRE takes any regolith,
  no added reagents.
- C: `nasa-2023-card-carbothermal-reduction.md`, `colozza-2010-solar-lunar-oxygen.md` —
  carbothermal takes any silicate, needs carbon recycling.
- arbiter: `sanders-2025-nasa-isru-progress-review.md` — MRE at TRL 5/6 for polar **highland**
  regolith; H₂/CO reduction at TRL 5 for **mare**.
- verdict: FAVOURS the scoped reading.
- verdict_basis: A's numbers do not transfer to a polar highland site, and every landing site in the
  corpus's architecture studies is polar. A well-cited answer quoting Leger's 24.3 kWh/kg for a
  south-pole plant is wrong by feedstock and passes every other check in the plan.
- app_surface: `bound-oxygen-mare` (EXCLUDED), `oxygen-extraction-energy` (EXCLUDED)
- rule: RETURN_WITH_SCOPE_NOTE — the scope token is the feedstock.

---

**LCC-09 — Illumination, and the difference between lit ground and available power.**
- axis: image-derived against DEM-simulated illumination; and area against extractable power.
- kind: CONTESTED (methods) plus INCOMMENSURABLE (area against power)
- trigger: `[illumination, lit, sunlight, peak, eternal, shackleton, connecting ridge, solar,
  power available]`
- A: `speyerer-2013-persistently-illuminated-regions.md` and its duplicate — image-derived from LROC
  over one lunar year, up to nearly 94 percent illumination, longest single eclipse 43 hours, and it
  found both peaks the DEM simulations missed and shadowed pockets they had marked as lit.
- B: `glaser-2014-south-pole-illumination.md` — LOLA DTM simulation; Connecting Ridge at 92.27
  percent at 2 m and 95.65 percent at 10 m; longest darkness typically 3 to 5 days.
- C: `ross-2023-lunar-south-pole-solar-power.md` — overshadowing of illuminated ground by sunward
  panels sharply limits extractable power below what illuminated area suggests: about 55 to 63 MW at
  greater than 70 percent illumination for panels up to 20 m, falling to about 6 MW at greater than
  90 percent.
- verdict: FAVOURS_C for any power question; A and B do not answer it.
- verdict_basis: A and B measure illuminated ground. C measures power extractable from it, and the
  two are not the same quantity. A power-availability question answered from A or B overstates by a
  large factor.
- app_surface: `persistently-lit-terrain`, `solar-mass-allocation`, `storage-and-siting`
- rule: PREFER_AND_NAME for power questions; RETURN_ALL_SIDES for illumination-fraction questions,
  because A and B disagree about method.

---

**LCC-10 — Fission against solar-plus-storage at the pole.**
- axis: does storage mass for a 3-to-5-day darkness period cancel solar's mass advantage.
- kind: CONTESTED, and the app prejudges it
- trigger: `[fission, solar, power system, specific mass, kwe, storage, night, reactor, krusty]`
- A (app): `fFis` = 0.16693 t/kWe, status SOURCED (fitted, D03 ACCEPT). `fSol` = 0.05 t/kWe, status
  ASSUMPTION (payload-allocation basis).
- B: `poston-2020-krusty-reactor-design.md` and duplicate — a 1 kWe prototype tested March 2018;
  `oleson-2022-deployable-fsp.md`; `nasa-2025-fission-surface-power-directive.md`.
- C: `ross-2023-lunar-south-pole-solar-power.md`, `csank-2022-powering-the-moon.md` and duplicate,
  `colozza-2020-lunar-base-power-comparison.md`, `pappa-2021-relocatable-solar-array.md`,
  `belbin-2024-vsat-grd-demonstrator.md`.
- verdict: OPEN in the corpus.
- verdict_basis: the app's own coefficient pair makes solar three times better than fission per kWe
  while carrying the weaker evidence grade on the solar figure — fitted against assumed. That is a
  disclosed asymmetry, not a hidden one, but an answer that quotes a fission-off scenario without it
  is reporting an assumption as a result.
- app_surface: `fFis`, `fSol`, `fission-specific-power`, `solar-mass-allocation`,
  `zero-intercept-mass-law`, `storage-specific-energy`, notes `FISSION-ON` / `FISSION-OFF`
- rule: RETURN_WITH_SCOPE_NOTE, and the scope note is the status pair.

---

**LCC-11 — Landed cost, and LEO against surface.**
- axis: a dollar per kilogram to LEO is not a dollar per kilogram to the surface.
- kind: INCOMMENSURABLE
- trigger: `[landed cost, $/kg, per kilogram, launch, starship, falcon, clps, delivery price, leo]`
- A: `payload-research-starship-cost.md` — Payload's own analyst estimate, about $500/kg to LEO for
  Starship V1 expendable, Falcon 9 expendable likely above $2,000/kg. Trade press, self-labelled as
  estimates rather than SpaceX-stated or audited.
- B: `nasa-2023-card-carbothermal-reduction.md` — $1.2M per kg landed, stated as a motivation.
- C: `nasa-clps-delivery-timeline.md`, `nasa-clps-procurement-vignette.md`,
  `metzger-autry-2023-lunar-landing-pads.md`, `adilov-2022-launch-cost-reductions.md`,
  `jones-superheavylift-final20260614.md`.
- D (app): `landed_cost` rail, 11 rungs from $1,000 to $1,000,000/kg. 2030 rung UNVERIFIED-pending
  on the ispace-SpaceX and CLPS primaries; 2040 PROJECTED; 2055 PROJECTED/ASSUMPTION.
- verdict: NOT_COMPARABLE without the multiplier.
- verdict_basis: the app has a section whose entire job is to bridge these —
  `leo-to-surface-multiplier`, tier VERIFIED. An answer mixing a LEO analyst estimate with a surface
  contracted price without crossing that bridge is wrong by construction.
- app_surface: `landed_cost`, `ladder-range-and-floor`, `shared-flight-price`,
  `clps-small-lander-cost`, `leo-to-surface-multiplier`, `falling-launch-price`
- rule: RETURN_WITH_SCOPE_NOTE — the scope token is LEO against surface, and the second is estimate
  against contracted.

---

**LCC-12 — Does the propellant business case close. Shared with The Growth Economist.**
- axis: closure, and under whose assumptions.
- kind: CONTESTED
- trigger: `[business case, breakeven, break even, close, propellant, $500, npv, hurdle, viable]`
- A: `kornuta-2019-commercial-lunar-propellant.md` and
  `kornuta-2019-commercial-lunar-propellant-architecture.md` — the case closes at $500/kg for
  1,100 t/yr. `sowers-2019-thermal-mining-ice.md` reaches the same conclusion from the CSM study.
- B: `jones-2020-lunar-propellant-breakeven.md`, `jones-2019-cislunar-isru-breakeven.md` —
  breakeven is regime-dependent on demand, campaign duration, and system reliability.
- C: `shishko-2019-lunar-thermal-mining-business-case.md` — a framework and a production-rate model,
  and its own summary states it is not a completed cost or NPV result.
- D: `mckeown-2024-space-resource-hurdle-rate.md` — about 25 percent is the appropriate hurdle rate
  for development-stage space resource projects, conditional on a legal regime, with 10 percent
  proposed for reporting. This changes what "closes" means.
- verdict: FAVOURS_B, the conditional reading.
- verdict_basis: A's closure is at an assumed price and volume. The app's own `offtake-record`
  carries UNVERIFIED-pending against zero signed offtakes and a sub-1-t/yr delivered record. A price
  nobody has agreed to pay is a premise, not a market.
- app_surface: `industrial-plant-price` ($500/kg, described by the app as aspirational),
  `break-even-sales-price`, `signed-offtake-break`, `offtake-record`, `product-payback-ranking`
- rule: RETURN_ALL_SIDES
- **note:** this entry overlaps The Growth Economist's register and should not be duplicated at
  integration. I hold the technical side — production rate, plant mass, energy, capture efficiency.
  He holds the discount rate and the demand side. Where our two verdicts differ, both stand (A.9).

---

**LCC-13 — Helium-3: a documented supply chain against an absent demand.**
- axis: supply-side feasibility is not demand-side existence.
- kind: ASYMMETRIC
- trigger: `[helium-3, he-3, he3, fusion, d-3he, mark miner, regolith volatiles]`
- A: `olson-2021-lunar-helium3-mining.md` — mining concepts since the 1980s, the Mark series, spiral
  mining, and the 2015-2018 SWIM/HEAT/SCAN implantation and extraction experiments at Wisconsin
  FTI with NASA KSC Swamp Works. Oriented almost entirely at supply-side engineering, with one short
  non-quantified passage on the commercial fusion market.
  `wittenberg-1992-he3-resources-review.md` — the founding resource case, 1992.
  `gao-2011-neutron-detectors-helium3.md` — terrestrial detector demand.
- B: nothing. No source in this corpus establishes an operating D-³He reactor or a contracted
  buyer. The 100 kg presently available on Earth is stated in A itself.
- verdict: FAVOURS_B, where B is the absence.
- verdict_basis: the absence is the finding. A demand side that no source in a 182-source corpus
  documents is not a thin patch, it is a negative result, and it should be reported as one.
- app_surface: `helium-procurement-energy` — EXCLUDED.
- rule: REFUSE_ONE_SIDE — an answer describing He-3 extraction without stating that no fusion market
  is documented in this corpus refuses.

---

**LCC-14 — Sintering specific energy.**
- axis: per-area figures against a per-mass app constant, and a source internally unreconciled with
  itself.
- kind: UNCONSTRAINED
- trigger: `[sinter, sintering, specific energy, mj/kg, construction, pad, microwave sinter]`
- A (app): `eSinter` = 3 MJ/kg (833 kWh/t), status ASSUMPTION. `ySinter` = 0.85, status ASSUMPTION.
  The section's own tier string: "VERIFIED (source per-area figures), ASSUMPTION (app constant),
  VERIFIED-as-printed (bench figures, source internally unreconciled)."
- B: `liu-2025-microwave-sintering-lunar-regolith-simulants.md`,
  `azami-2024-lunar-manufacturing-review.md` and its duplicate,
  `just-2020-regolith-excavation-review.md`, `metzger-autry-2023-lunar-landing-pads.md`.
- verdict: OPEN, and the app says so in its own tier string.
- app_surface: `eSinter`, `ySinter`, `op_const`, `sintering-specific-energy`, `sintering-yield`,
  `Cfull`, `construction`
- rule: RETURN_WITH_SCOPE_NOTE — any `eSinter` answer returns the section's own tier string
  verbatim, because the app has already done this work and a paraphrase would be a copy that drifts.

---

**LCC-15 — Excavation rate against the throughput coefficient.**
- axis: a calibrated-to-fit coefficient against two terrestrial demonstrations at 1 g.
- kind: INCOMMENSURABLE
- trigger: `[excavation, excavator, dig, throughput, tonnes per year, kexc, bucket drum, regolith
  rate]`
- A (app): `kExc` = 4 t regolith/yr per t plant, status ASSUMPTION (calibrated-to-fit). The section
  title the app retired reads "An Unsourced Coefficient on an Inflated Base."
- B: `sanders-2025-nasa-isru-progress-review.md` and duplicate — IPEx bucket-drum excavator moved
  10 t in 5 days at TRL 5; Break the Ice Challenge teams excavated 12,000 kg of hard icy regolith at
  about 800 kg/day, TRL 5.
- C: `just-2020-regolith-excavation-review.md` — thirteen concepts reviewed, and the paper's own
  output is recommendations for excavation experiments not yet performed.
  `rostami2018.md` — conceptual, explicitly no original experimental or design data.
  `kokkinis-2024-automated-drilling-mining-review.md` — terrestrial, concludes autonomy is an open
  research target.
- verdict: NOT_COMPARABLE.
- verdict_basis: the demonstrations are at 1 g, on Earth, in loose or simulated icy regolith, over
  days, with no wear accumulation. The app's coefficient is an annualized plant-mass-normalized rate
  over a ten-year life. Normalizing one to the other requires exactly the geotechnical and wear data
  that T1 and T2 say the corpus does not have.
- app_surface: `kExc`, `throughput-coefficient`, `productive-plant-mass`, `Rcap`, `Wthr`
- rule: RETURN_WITH_SCOPE_NOTE

---

## 6. TRL and evidence-gate discipline in a chat window

The problem is stated correctly in my brief: a qualifier that survives peer review gets scrolled
past in chat. The answer is not a better-worded qualifier. It is to put the discipline where the
reader cannot scroll past it, which is inside the number itself.

Five rules. Each changes what the answer says.

**R1. Maturity is a property of the figure, not a caveat on the sentence.**
Not: "thermal mining could achieve roughly 1.3 to 2.7 kWh per kg, though the technology readiness
level remains low."
But: "The only integrated demonstration measured 15 to 44 kWh per kg (LUWEX, bench scale, 13 kg per
run, extraction through liquefaction). Architecture studies that model extraction alone assume 1.3
to 2.7 kWh per kg."
The second sentence is shorter, carries two numbers instead of one, and a reader who stops after the
first clause still has the demonstrated figure. No adverb does any work in it.

**R2. The gate changes which number is quoted, not the confidence attached to it.**
Where a demonstrated figure exists, it is the answer and the modelled figure is context. Where only
a modelled figure exists, the answer says the figure is modelled and names what has actually been
built instead, which is nearly always less. This is the rule that survives impatience: the reader
who reads only the first number gets the demonstrated one.

**R3. Refuse by substitution, not by apology.**
Not: "the literature in this corpus is limited on the geotechnical properties of icy regolith."
But: "No measurement of icy-regolith shear strength or cone penetration resistance at permanently
shadowed region temperature exists in this corpus. The nearest evidence is Barnett 2025 on regolith
consolidation during thaw, which is the opposite process."
Shorter than the apology, and it tells the reader what to go and find.

**R4. A TRL number is sourced or absent.**
This corpus has exactly one TRL sheet: Sanders & Kleinhenz 2025, a May 2025 briefing. Every TRL
claim the Oracle makes resolves to it or to a primary that states its own maturity, and any answer
quoting it names the date. An unsourced TRL is worse than no TRL, because it is a fabricated
measurement wearing a number, and a TRL from 2025 quoted in 2028 without its date is a claim about
the past presented as a claim about the present.

**R5. The discipline is testable, which is what stops it being decorative.**
For any answer carrying a quantitative ISRU figure, three facts must be named: **the system
boundary, the scale, and the maturity.** Extraction only or integrated. Bench kilograms or tonnes
per year. Measured, modelled, or assumed.

That is a machine-checkable assertion and it is the whole of the discipline. An answer that names
those three and hedges nothing passes. An answer that hedges in every clause and names none of them
fails. This inverts the usual incentive: rigor becomes something you demonstrate by adding three
facts rather than something you perform by adding three qualifications, which is precisely the
Category 8 boundary the design intent draws. It also gives The Software Engineer something to assert
in the acceptance suite rather than a preference to hope for.

**Where R5 binds hardest, and it is worth naming.** The three facts are what separate LCC-04's four
figures from a contradiction. Without them the corpus appears to say water extraction costs anywhere
from 1.9 to 44 kWh per kilogram and is therefore useless. With them it says something precise: bench
systems carrying capture and liquefaction measure 15 to 44, extraction-only concepts model 1.3 to
10, and the difference between those two ranges is the part of the process nobody has demonstrated
at scale. The discipline is not a hedge on the answer. It is the answer.

---

## 7. Proposed gameplan steps

Provisionally numbered SR-1 through SR-9 so they do not collide with the other four Wave 1 agents'
numbering. The orchestrator renumbers into the single ordered sequence at 0.3. Dependencies are
stated because three of these cannot run before The Engineer's merge lands.

| # | Step | Assigned To | Depends on |
|---|---|---|---|
| SR-1 | **Ship the question-class register.** Write `oracle/question_classes.json`: the ten classes of section 1, each with its routing tier, the app-address test that decides tier membership, and its fallback. The router consumes it before retrieval, per the inherited classification-before-retrieval rule. Content is section 1 of this file; the mechanism is the Software Engineer's. | The Space Resources Engineer (content), The Software Engineer (mechanism) | The answering-loop shape, from The Software Engineer at 0.2 |
| SR-1b | **Close the two reachability gaps.** (a) `OUTPUT_LEXICON` names eight of the 26 keys `model()` returns, so `cap`, `Wpower`, `Wthr`, `mPwr`, `Rcap` and `regime` fall through to a literature search instead of resolving to the app. Extend it, and add a test that fails when the app gains a return key the lexicon does not name. (b) `app_model.js` extracts `model()` and not `valueModel()`, so the app's entire economic half — `r_prop`, `r_const`, `margin_*`, `value_*`, `Dstar_prop`, `ranking` — is unreachable by any APP verdict. Extract it the same way. Without both, section 2's boundary is nominal and the inherited app-authority rule is being violated silently in the corpus's favour. | The Software Engineer, output keys confirmed by The Space Resources Engineer | SR-7 (needs the artifact read) |
| SR-2 | **Ship the contested-claims register.** Write `literature/_registers/contested_claims.yaml` to the schema in 5.1, carrying the fifteen lunar entries of 5.4 and The Growth Economist's economics entries in a second namespace. LCC-12 is shared and is written once. | The Space Resources Engineer and The Growth Economist (content), The Engineer (encoding) | The merge (Objective 1) — paths must be stable |
| SR-3 | **Rebind and check register paths.** Every `sides[].sources` path resolves under `literature/`, and every member of a near-duplicate filename cluster is named. A build check fails on a missing path. This is what keeps the register from becoming a copy that drifts. | The Engineer | SR-2 |
| SR-4 | **Extend the exclusions matcher to three outcomes.** `exclusions_match.js` returns one outcome today. Add EXCLUDED-THEN-CORPUS, EXCLUDED-THEN-THIN and EXCLUDED-BUT-ADJACENT per section 4, with the three adjacency pairs (`propellant-mass-leverage`/`net-value-identity`, `mars-campaign-conditional`/`avoided-cost`, `grade-independent-demand`/`offtake-record`) shipped as data rather than prose. | The Software Engineer, content from The Space Resources Engineer | SR-1 |
| SR-5 | **Ship the thin-patch register.** `oracle/thin_patches.json`, the ten entries of section 3, each with trigger tokens, what is absent, and the nearest real evidence. A question landing in a thin patch refuses by substitution (R3) rather than answering from an adjacent file. | The Space Resources Engineer (content), The Software Engineer (mechanism) | SR-1 |
| SR-6 | **The three-named-facts assertion.** Add to the acceptance suite: any answer carrying a quantitative ISRU figure names system boundary, scale, and maturity. Under `lit_review: yes` each such test names the primary it validates against. | The Software Engineer, reviewed by The Space Resources Engineer | The TDD front end, from The Software Engineer at 0.2 |
| SR-7 | **Audit the app boundary against the artifact.** The section 2 table is derived from the generated map, and the map is derived from the app. Before the boundary table becomes a routing contract, someone reads `index.html` and confirms the reachable outputs, the 24 coefficient rows and their status strings, and the three preset labels. | The Space Resources Engineer, verified by The Fact-Checker | The bootstrap (Objective 2) — `lsei/` must be on disk |
| SR-8 | **Stamp programme-state currency.** Every source whose content is a programme-state snapshot rather than a measurement carries a `stated_as_of` field in the merged corpus, and the Oracle prints it. Roughly a dozen files qualify: `programme-primaries/` in full, the CLPS timeline, the LSIC newsletters, the M2M architecture document. | The Engineer at merge, The Fact-Checker at review | The merge |
| SR-9 | **The lunar acceptance question set.** Fourteen questions with expected verdicts: one per class, three register traps (LCC-01 Cabeus, LCC-05 capture efficiency, LCC-07 oxygen energy), and two thin-patch traps (T1 excavation forces, T5 cryogenic cadence). Extends `lsei/oracle/fixtures/` rather than replacing it. | The Space Resources Engineer (questions and expected verdicts), The Software Engineer (harness) | SR-1, SR-2, SR-5 |

### The one problem in this list worth flagging separately

SR-2 cannot run before the merge, and the merge is the primary assignment with the largest
uncertainty attached to it (whether a summary rewrite pass is needed, per The Engineer's brief).
The register is therefore late in the sequence and it is a prerequisite for the retrieval invariant,
which is a prerequisite for any answer being trustworthy. If the merge slips, the Oracle can be made
to answer before it can be made not to answer one-sidedly. That ordering is a hazard, and the
mitigation is cheap: write SR-2's *content* now, against the current `lsei/literature/` paths, and
make SR-3 a pure rebinding step. The content in section 5.4 of this file is that draft. It is
already written; it needs paths, not thought.

---

## 8. Context recipes for the proposed steps

| Step | Agent | Files / Excerpts |
|---|---|---|
| SR-1 | The Space Resources Engineer | This file, sections 1 and 2. `lsei/oracle/answer_question.js` (header comment and `OUTPUT_LEXICON`). `lsei/oracle/lib/address.js` (full — it is small and it is the boundary's operational definition). |
| SR-1 | The Software Engineer | This file, section 1. His own answering-loop specification from 0.2. `lsei/oracle/answer_question.js` (full). |
| SR-1b | The Software Engineer | `lsei/oracle/answer_question.js`, `OUTPUT_LEXICON` and `KNOB_LEXICON`. `lsei/oracle/lib/address.js` (full). `lunar-scenario-explorer-map.md`, "Where each rendered value comes from". |
| SR-2 | The Space Resources Engineer | This file, section 5. The merged `literature/` tree listing. The 41 summaries named in 5.4, read in full where a figure is being encoded. `lunar-scenario-explorer-map.md`, "The live coefficient values" and "Which coefficients each section governs". |
| SR-2 | The Growth Economist | This file, section 5.1 and 5.2 (the schema and the five kinds) and entry LCC-12. His own register content. Not the rest of section 5. |
| SR-2 | The Engineer | This file, sections 5.1 and 5.3. The merged `literature/` tree. His own merge specification from 0.2. |
| SR-3 | The Engineer | The register file from SR-2. The merged `literature/` tree listing. The near-duplicate cluster list (16 clusters, section 3's structural note). |
| SR-4 | The Software Engineer | This file, section 4 in full. `lsei/oracle/lib/exclusions_match.js` (full). `lunar-scenario-explorer-map.md`, "The nodes ruled excluded". |
| SR-5 | The Space Resources Engineer | This file, section 3. The merged `literature/` tree listing. |
| SR-6 | The Software Engineer | This file, section 6. `cr-agents/method/tdd_method.md` (full). `cr-agents/method/operational_guide.md` A.10. |
| SR-7 | The Space Resources Engineer | `lsei/index.html` — the data island only: `CONFIG`, `VALUE`, `LANDED_COST`, `PRESETS`, `DETENTS`, and `model()`. Not the whole 894 KB file. This file, section 2. |
| SR-7 | The Fact-Checker | This file, section 2. The same data-island excerpt. `lunar-scenario-explorer-map.md`, the Totals and coefficient tables. |
| SR-8 | The Engineer | `lsei/literature/programme-primaries/` (all 10, full). `logistics-and-delivery/nasa-clps-delivery-timeline.md`. His own merge front-matter specification. |
| SR-9 | The Space Resources Engineer | This file, sections 1 through 5. `lsei/oracle/fixtures/` (listing plus one example fixture). |

---

## 9. Which assumptions I used, and what changes under the other

Per A5.

**A1 (public repository).** Used in section 4's ranking only. A public audience moves
`helium-procurement-energy` from rank 10 to about rank 2 and `habitat-water-terrain` from 7 to about
4, because those are the two lunar questions the general public asks most and practitioners ask
least. No outcome assignment changes. Under a private repository I would rank by practitioner
ask-frequency alone. The outcome assignments are audience-independent, which is why they are the
part that ships and the ranking is the part that is advisory.

**A2 (the ruling: summaries ship, the 112 PDFs do not).** This constrains R4 and I want it on the
record rather than discovered later. R4 requires a maturity claim to resolve to a primary. On a
clean clone there are no PDFs, so "resolve to the primary" means resolve to the summary of the
primary. That is resolution-grade, not recompute-grade, and the register must say so rather than
implying anyone re-read the paper. Concretely: `verdict_basis` fields state what the summary
records, not what the paper says, and the distinction is not cosmetic — LCC-07's whole finding is
that two NASA sources disagree, and that finding rests on two summaries being faithful. Under the
alternative, which A2 forecloses, the check could be stronger. The author's local disk keeps the
PDFs, so The Fact-Checker at 0.5 can do on one machine what a clone cannot.

**A3 (working copies float on main).** The section 2 boundary table and every app figure I quote can
change under me without warning. This is why SR-7 exists and why the boundary table must be derived
at build time rather than typed into a file. Under pinning, the boundary table could be a static
artifact checked once per pin bump, SR-7 would run once instead of on every bump, and I would drop
the derived-at-build-time requirement. I have drafted for floating, which is the more expensive of
the two, so nothing breaks if the author rules the other way.

**A4 (Claude Code only).** Used in section 6. R5's three-named-facts check runs as a Node assertion
inside the loop rather than as an instruction in a prompt, which is what makes it a rule rather than
a preference. Objective 4's enforcement problem, assigned to The Software Engineer, is the same
problem and has the same answer.

**A5 itself.** Applied above.

---

## 10. Where I stand against The Growth Economist

The tension is proposed and pending the author's approval. Stating my side firmly so that the
disagreement is worth having at integration, per A.9.

I hold that TRL is a necessary condition and that it binds first. An economy cannot compound on a
process nobody has built, and the corpus's own honest maturity sheet says the water chain — the
thing every architecture in this corpus depends on — is at TRL 3/4 at its weakest link, capture and
cleanup, with the single integrated demonstration recovering 50 to 73 percent of the water at 15 to
44 kWh per kilogram.

Where I expect him to push, and where he will be right: a process at TRL 6 that no economy would buy
is not progress. Helium-3 is the cleanest case in this corpus — a documented supply chain, 1980s
mining concepts, real implantation and extraction experiments at Wisconsin, and no demand side at
all (LCC-13). Construction sintering may be a second case: the app ranks construction ahead of
propellant on plant-mass payback by one to two orders, and the corpus contains no buyer for
sintered lunar pads. My TRL discipline does not catch either of those. His does.

Where I will not move. He cannot reason about compounding from a production function whose
coefficients are assumptions. Three of the app's load-bearing terms are ASSUMPTION by the app's own
declaration: `kExc` = 4 is calibrated to fit, `captureEff` = 1 is an optimistic bound the app itself
says no primary reports, and `eSinter` = 3 MJ/kg has twelve references behind a section whose own
tier string admits the constant is assumed. A growth model built on those three is arithmetic on
assumptions. The arithmetic being correct is not evidence about the Moon.

So my deliverable to him is not a veto. It is the maturity field on every number he wants to use. If
he uses them anyway — and there are good reasons to, since a model of an industry nobody has built
has to start somewhere — the register says which ones were assumed, and his conclusion inherits
that. What I will object to at integration is a compounding claim whose inputs carry no maturity
field at all, because that is the failure mode this project's Fact-Checker cannot catch: correctly
cited, internally consistent sources doing work they were never licensed to do.

One thing I owe him rather than argue with him about. The app's economic half — the amortized-plant
identity, the margin, the payback ranking, the break-even price — is the part of the artifact he
would reach for, and section 1 records that the Oracle's only door into the app does not open onto
it. `app_model.js` extracts `model()` and not `valueModel()`. Until SR-1b lands, every economics
question the app can compute will be answered from a literature summary instead, which is the
failure the inherited rule was written to prevent, occurring in his half of the surface rather than
mine. He should know that before he drafts against it.

The productive part is not that we disagree about a fact. It is that we will disagree about which
question is prior, and the honest answer is that neither is. A process must be buildable and it must
be worth building, and those are two independent gates. The Oracle should be able to fail a claim at
either one and say which.
