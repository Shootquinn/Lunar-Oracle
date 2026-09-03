run:              r-2026-09-02-deloitte-02
asked:            2026-09-02T16:58:58Z
verdict:          LITERATURE
reason code:      -
contract version: 5
lsei ref:         -

## Question

"in the downloads folder there is a file named deloitte-building-the-lunar-economy-report.pdf. did they get it right? what did they miss?"

## Verdict

`LITERATURE`.

**The short form, before the reasons.** They got the *prose* substantially right. The report is
more candid than its genre usually allows: it names the geological uncertainty, quotes a propellant
sceptic against its own thesis, warns that Starship's orbital refuelling could undercut lunar
production before it scales, states its own US-centric bias, calls its probability weights
judgement-based rather than observed, and refuses to add its largest number to its headline total.
Its *model* implements none of that candour.

**What they missed is one step, and it is the first one.** Every revenue line in the report that
depends on lunar material — helium-3, propellant, manufactured structural mass — depends on getting
regolith out of the ground. The report's economic model contains no excavation variable at all: no
tonnage, no rate, no ore grade, no reserve. The corpus this Oracle reads holds a review of thirteen
lunar excavation concepts which places essentially the whole class below TRL 4, and holds a
helium-3 mining design whose required excavation rate exceeds the best figure in that review by
roughly five hundred times. The report prices the output of that step and never sizes the step.
That is the gap, and it is not a hedge the report forgot to write — it is a variable the model does
not have.

**Why this run exists at all.** A prior run, `r-2026-08-29-deloitte-01`, answered a superset of this
question and its deliverable is at `HEAD:answers/deloitte-building-the-lunar-economy-review.md`. It
is **deleted in the working tree and that deletion is uncommitted**; nothing here restores it,
because a working-tree deletion is the author's act. That run closed with eight unverified items, of
which its own item 6 said: *"I did not test whether Deloitte's quantity profiles are internally
consistent... That check is the strongest remaining test of this report and it was not run."* **This
run is that check.** Family A below independently reproduces the prior run's grep findings rather
than inheriting them; Family C is new.

**Why `LITERATURE` and not `CONTESTED`, which is the adjacent verdict.** `CONTESTED` requires that a
sub-claim matched a register axis of class `two_sided` or `false_pair` **at classification time**.
The register channel was run by hand over both registers and **zero of 33 axes reached nonzero mass**
on the question as asked; `K` is 2.431 and nothing came near it. Under the adjacent verdict this
answer would have been composed by one persona per side of a named axis, each briefed in isolation,
with no adjudication — and there is no axis whose sides this question asks me to hold apart.

**Four axes bear on the report and none of them fired**, which is the router's own documented
failure mode FM-1 reproduced exactly: the question's surface vocabulary is *"did they get it right"*
and the axes' `match_keys` are technical nouns. `LCC-15` governs excavation rate and readiness;
`LCC-13` governs which helium-3 market a lunar supply would serve; `LCC-12` governs whether the
propellant business case closes; `ECR-15` governs which reference class a lunar growth projection
should draw its base rate from. **I set the zero aside on judgement and did not convert to
`CONTESTED`.** Naming what the report omits is a `LITERATURE` finding. *Ruling* which side of
`LCC-12` or `ECR-15` is right is a different question, and it is the natural follow-up to this one.

**Not `APP`, not `FIGURE`, not `BOTH`.** These were refused at bootstrap, not here. `lsei/` is absent
from this install and was not cloned — the user's instruction this session was to use the local
`cr-agents/` copy and not to clone from the web, and I did not clone either working copy. The origin
`app` is therefore unavailable, and `oracle/router/classify.js` `loadContext()` refuses
`input-missing` on `the app at .../lsei/index.html` before any classification runs. That refusal is
correct and it is the reason the full evidence pass could not run through its normal entry point;
only the register channel was run, by hand, and it is reported above.

**Not `REFUSE`.** Retrieval ran once, after classification, and confirmed shelf files in full text on
both sub-claims — 4 of 5 candidates on the first, 5 of 5 on the second, at threshold 0.28. The corpus
holds the standard this report is being measured against.

**One contract problem, stated up front rather than buried.** The Deloitte report **is not a corpus
source and cannot carry a trace.** `answer_contract.md` §3 closes `origin` at four values and a PDF
in a Downloads folder is none of them. Every Deloitte figure below therefore appears in §3 as an
observation with the exact command that reproduces it, never in §4 as a trace. `CLAUDE.md` §3
prohibition 3 also says the answering loop never reads outside the repository at runtime and that
outside material arrives through a human-supervised step; **the user naming the path is that step**,
and there is no vocabulary for its output. This is the same gap the prior run filed, unclosed.

**A correction landed this run, under `CLAUDE.md` §5.** That file read *"2 to 5 haiku strung
linearly, no line breaks"*; `answer_contract.md` §6b was amended 2026-09-01 to permit the
conventional three-line rendering, and `tools/verify_haiku.js` retired `--allow-breaks` as a no-op
the same day. `CLAUDE.md` was the last copy of the superseded rule and is corrected, naming the
clause. The delivered turn is checked `PASS` under `--turn`.

---

## What was tested, and how it could have failed

Three families. **Family A** runs against the artifact under examination, extracted with
`python -c "import pypdf; ..."` over
`C:\Users\Quinn Morley\Downloads\deloitte-building-the-lunar-economy-report.pdf` (60 pages, 161,263
characters, `/Title` "Building the Lunar Economy", `/CreationDate` 2026-08-25). **Family B** runs the
`deliverable_shape.md` §3 source-verification procedure, steps 1 to 4, against corpus files, and
records step 4's output. **Family C** is the closure test the prior run named and did not run.

### Family A — the report against itself

| Claim | Test run | Falsifier — the result that would have refuted it | Observed |
|---|---|---|---|
| A-1. The model has no excavation, throughput or grade variable | `grep -oic` over the extracted appendix (pp. 44–52) for `tonne`, `excavat`, `throughput`, `grade`, `reserve`, `ppb`, `kg ` | Any nonzero count. One would mean a physical production variable exists somewhere in the model | 0, 0, 0, 0, 0, 0, 0. **Seven for seven.** The appendix that prices lunar material contains no unit of lunar material |
| A-2. The value equations carry no cost term | Read all four equations in the Appendix verbatim | Any equation carrying a subtraction, a margin, or a net | Four equations, all multiplicative, all gross. VP1 `(Unit price × Unit price profile) × Quantity profile`; Replacement `(Replacement share × Addressable market volume) × Lunar unit price`; Nascent `(Theoretical market volume × Growth rate) × Lunar unit price`; Speculative the same `× Probability`. **No subtraction appears anywhere in the model** |
| A-3. No netting or capital-stock concept anywhere in the report | `grep -oic` the full 60-page text for `depreciat`, `capital stock`, `opportunity cost`, `operating cost`, `value added`, `closure`, `self-suffici`, `import substitut`, `balance of payments`, `cost curve` | Any nonzero count | 0 on all ten. The only sustainability sentence in the body is a hedge: *"long-term sustainability may require a broader set of customers and markets"* |
| A-4. The report takes no outside view | `grep -oic` the full text for `reference class`, `base rate`, `megaproject`, `overrun`, `cost overrun` | Any nonzero count. One would mean the forecast was benchmarked against the realised distribution of comparable programmes | 0 on all five. **This is `ECR-15` and `MT-16` territory and the report is not in it.** The estimate is built bottom-up from unit prices and quantity profiles, and is never checked against how projections of this shape have historically landed |
| A-5. Only the speculative bucket is probability-weighted | Compare the three Value Pool 2 equations for a probability term; read Table 2's `Calculation approach` column | A `Probability` term on the Replacement or Nascent equation | Present on Speculative only. **Helium-3 into existing terrestrial markets is classified `Replacement`; in-space propellant refuelling is classified `Nascent`.** Both enter the total at full weight, unweighted |
| A-6. One discount rate, flat, no risk premium | Read the Results Overview rate statement; `grep -n -i hurdle` | A rate above ~10%, an additive risk premium, or a hurdle-rate concept | *"net present values (NPV) in 2026 US dollars using a 7% discount rate, a standard approach for long-horizon infrastructure investments under uncertainty."* One rate, 25 years, across markets the report itself calls speculative. `hurdle` appears exactly once in 60 pages, at *"Significant engineering hurdles remain"* — engineering, not capital |
| A-7. The single largest line item is the cost of getting there | Read the conservative-scenario core-activity split (p. 49) | Transportation below half of core activity | *"transportation accounts for approximately US$150 billion, or 72% of total core lunar activity through 2050."* Value Pool 1 is defined as *"economic activity from investments"* — **the pool is the bill, and 72% of the bill is freight** |
| A-8. The 2050 quantity profile is stated and is checkable | Read the conservative 2050 state (p. 49) | The profile absent, or given only qualitatively | Stated and admirably specific: ~350 lunar-related launches/year; 600 MW of power demand serviced; 50-day crew stays; two constellations of 25 satellites; commercial missions outnumbering government 3:1; $46B/yr core and $102B/yr enabled activity. **This is the input Family C tests** |
| A-9. The report's prose does flag its own model's weaknesses | Read the Limitations section (pp. 51–52) and the Part II propellant section | No acknowledgement of geological, proxy, or probability risk | Four limitations, all real and all correctly stated: US-centric inputs; *"the underlying probabilities are themselves judgment-based estimates rather than observed outcomes"*; value concentrated at the end of the period; terrestrial proxies for learning rates. Body: *"many business cases for lunar propellant rest on geological assumptions that have not yet been proven."* **This row is why the verdict is not a dismissal. The report knows. The model does not** |
| A-10. Value Pool 3's proxy is an asset-price artefact | Read Table 3's key driver for global pride and inspiration | A willingness-to-pay survey or any welfare measure not drawn from asset prices | *"proxied by short-term excess stock market returns observed around events of national or cultural significance."* This pool is **$541 billion** — larger than the entire modelled market economy at $343–566B. Correctly held out of the headline and correctly flagged illustrative; still the largest number in the document |

### Family B — the standard the corpus supplies, four-step procedure, step 4 recorded

| Claim | Test run | Falsifier | Observed |
|---|---|---|---|
| B-1. Lunar excavation sits below TRL 4 as a class | §3 steps 1–4 on `just-2020-regolith-excavation-review.md`, searching `TRL` | The claim absent, or present only inside an attribution | **OWN**, line 27: *"relatively little research is carried out in the area of regolith excavation and handling and almost no mature design concepts are found (Technology Readiness Level (TRL) < 4)."* Line 35: TRL is excluded as a tabulated column *"because almost all reviewed concepts do not exceed TRL 3."* Line 118: RASSOR *"stated as TRL 4"* — **OWN** — named with Cratos and the pneumatic system as the only partial exceptions |
| B-2. The highest excavation rate in that review | §3 steps 1–4, reading every rate cell in Tables 3–5 | Any figure above ~2,400 kg/h | **2,400 kg/h**, bucket ladder (3rd generation, 2009), line 112. **Step 4 fired:** the figure is **ATTRIBUTED TO van Susante and Dreyer (2010)**, as is the Cratos 900 kg/h at line 92 (Caruso et al. 2008; Greer et al. 2013). The review is a review; its numbers are other people's, and the review says so |
| B-3. The M-3 helium-3 miner's required excavation rate | §3 steps 1–4 on `olson-2021-lunar-helium3-mining.md`, searching `1,258` | The figure absent or attributed | **OWN**, line 95: *"The M-3 is designed to excavate 1,258 tonnes/hour, heat 556 tonnes/hour, move at 23 m/hour, and consume about 350 kW of electrical power"* |
| B-4. What that miner yields, and what it powers | §3 steps 1–4 on the same file | The figures absent or attributed | **OWN**, lines 91–93: designed to collect **33 kg of 3He per year**, at 10 ppb and 90% of lunar daytime; *"this quantity of 3He would fuel one approximately 400 MW D-3He fusion power plant per year."* Line 139: **5 million tonnes of regolith excavated** for a full M-3-based operation, against 50 tonnes of system mass |
| B-5. What that miner's heat costs | §3 steps 1–4 on the same file, searching `12.3 MW` | The figure absent | **OWN**, lines 116–117: the collector *"must supply 12.3 MW to heat 157 kg/s of regolith at an assumed 85% energy recovery efficiency; without energy recovery, the paper states 82 MW would be required."* Delivered by a 10 m collector fed by a **110 m diameter heliostat** |
| B-6. The regolith grade | §3 steps 1–4 on the same file, searching `11.8` | Absent, or the file's own result when it is not | Line 76: Apollo 11 bulk sample 10084 averaged **11.8 ppb** 3He by mass, range 9.22 to 17.9 ppb. **Step 4 fired and the verification pass and I disagreed here.** The pass returned `OWN`; the line itself reads *"(page 2, citing Hintenberger et al. 1970)"*. It is **ATTRIBUTED**, and I have overruled the pass on the file's own words. Recorded rather than quietly repaired |
| B-7. The terrestrial helium-3 market, quantified | §3 steps 1–4 on `gao-2011-neutron-detectors-helium3.md` | The market unquantified, or quantified in mass | **OWN**, and quantified **in litres per year, never in kilograms**: US supply from tritium decay ~8,000–10,000 L/yr; handheld and backpack detectors ~7,000 L/yr projected across the whole US government; oil and gas well logging ~1,000 L/yr; moisture gauges ~500 L/yr; each radiation portal monitor ~44 L. **And the finding that matters:** *"Fusion energy is not mentioned anywhere in this document as a use, market, or driver of helium-3 demand."* This is the demand side of `LCC-13`, and Deloitte books the supply side of it at full weight |
| B-8. The required return for space resource projects | §3 steps 1–4 on `mckeown-2024-space-resource-hurdle-rate.md` | The 25% absent or attributed | **OWN**, lines 120–121: a hurdle rate *"in the range of 25%"* is *"an appropriate starting point for evaluating commercial space resource development-stage projects."* Line 24: 7% appears in that paper as the **baseline WACC input**, not as a project rate. **Deloitte's headline rate is that paper's starting input with the premium set to zero** |
| B-9. End-to-end lunar oxygen energy | §3 steps 1–4 on `leger-2025-energy-oxygen-moon.md` | Not the paper's own model output | **OWN**, line 16: *"the model predicts a total of 24.3 (+/- 5.8) kWh per kg of liquid oxygen"* at 10 wt% ilmenite, full chain from excavation through liquefaction and storage |
| B-10. Growth accelerations do not reliably persist | §3 steps 1–4 on `hausmann-2005-growth-accelerations.md` and `pritchett-2000-hills-among-plateaus.md` | Either figure attributed rather than the file's own | Hausmann line 162: **37 of 69 (53.6%) kept growing above 2%/year in years t+7 through t+17** — **OWN**, and a near coin flip measured a full point below the 3.5% bar that defined the acceleration. Pritchett: **step 4 fired.** The 0.24 pre-break/post-break rank correlation at line 171 is **ATTRIBUTED TO Easterly, Kremer, Pritchett and Summers (1993)** in the same sentence. It is pritchett-2000's own *reporting*, not its own *result*, and it is recorded here as attributed |
| B-11. The propellant case is contested, both sides in their own words | §3 steps 1–4 on both `LCC-12` files retrieval confirmed | Either file's verdict misstated, or the two adjudicated | Kornuta 2019 line 247, **OWN**: *"Every scenario with more than one customer has positive NPV at a 10 percent discount rate."* Jones 2020 line 41, **OWN**: *"a short lunar campaign followed by Mars exploration is unlikely to realize the cost savings from propellant production compared with a more ambitious lunar campaign"*; line 38, without high-performing long-lifetime autonomous ISRU *"the cislunar propellant demand for a Mars campaign favors delivery from Earth."* **No side is adjudicated here.** This is `LCC-12` and it did not fire; both sides are named because the report cites neither |

### Family C — the closure test, which the prior run named and did not run

**Read the grade warning before the rows.** Every row here combines a figure from one corpus file
with a figure from another, or with a figure from the Deloitte report. `answer_contract.md` §2 is
explicit: *"Derived arithmetic is a deliverable, not a trace."* **None of the three ratios below
carries a legal trace grade, and none is claimed as a corpus finding.** Each is a test with its
inputs named and its arithmetic shown, so a reader can re-run it and watch it fail. Turning any of
them into a claim requires a `findings/` entry with an author and a derivation somebody can dispute,
and `findings/` is absent from this install (`BC-18`).

| Claim | Test run | Falsifier | Observed |
|---|---|---|---|
| C-1. The excavation step the model omits is off by roughly five hundred times | Divide B-3's required rate by B-2's best reviewed rate: 1,258 t/h = 1,258,000 kg/h, against 2,400 kg/h | A ratio near unity, or the M-3 rate being a demonstrated rather than a design figure | **≈ 524×.** The required rate is a 2006 design point; the comparison rate is the highest figure in a review of thirteen concepts whose class the same review puts below TRL 4. **The gap is not that Deloitte got this number wrong. It is that Deloitte has no cell for this number** — see A-1, seven counts of zero |
| C-2. Deloitte's whole 2050 power budget buys a small number of these miners | Divide A-8's 600 MW by B-5's 12.3 MW and 82 MW | A quotient large enough that power is plainly not a constraint, or one below 1 | **≈ 48 miners with 85% heat recovery, ≈ 7 without** — and that is the *entire* 2050 lunar surface power budget spent on helium-3 alone, with nothing left for habitats, propellant, construction, mobility or comms. At B-4's 33 kg/yr each, the ceiling is ~1,600 kg/yr at best recovery and ~230 kg/yr at worst. **I am not claiming this refutes Deloitte's revenue line.** I am claiming it cannot be compared to it, because A-1 shows the model states no kilograms |
| C-3. The unweighted helium-3 line cannot be reconciled with the market it names | Compare Deloitte's `Replacement`-class helium-3 line, priced at *"often cited around US$20 million per kilogram"* (p. 34), against B-7's market, quantified in litres per year | Deloitte stating a volume anywhere, in any unit, which would make the comparison possible | **No volume is stated anywhere in the report.** The two quantities cannot be put on one basis from the report's own contents. Meanwhile the corpus's demand-side source for this exact market never mentions fusion, and Deloitte's fusion line is carried separately and *is* probability-weighted. **The unweighted line is the detector market, and that is the one measured in litres** |

---

## Sources

Trace (citation, resolution-only, literature): literature/isru-processing/just-2020-regolith-excavation-review.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Trace (citation, resolution-only, literature): literature/isru-processing/olson-2021-lunar-helium3-mining.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Trace (citation, resolution-only, literature): literature/space-economy-and-markets/gao-2011-neutron-detectors-helium3.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Trace (citation, resolution-only, literature): literature/space-economy-and-markets/mckeown-2024-space-resource-hurdle-rate.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Trace (citation, resolution-only, literature): literature/isru-processing/leger-2025-energy-oxygen-moon.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Trace (citation, resolution-only, literature): literature/growth-theory/hausmann-2005-growth-accelerations.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Trace (citation, resolution-only, literature): literature/growth-theory/pritchett-2000-hills-among-plateaus.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Trace (citation, resolution-only, literature): literature/logistics-and-delivery/kornuta-2019-commercial-lunar-propellant-architecture.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Trace (citation, resolution-only, literature): literature/logistics-and-delivery/jones-2020-lunar-propellant-breakeven.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

---

## What remains unverified

9 items unverified, over 24 claims and 24 tests examined.

1. **The object of this answer carries no trace, and the contract still has no origin token for it.**
   `answer_contract.md` §3 closes `origin` at four values and a user-supplied PDF is none of them.
   The prior run filed this and it is unclosed. Closing it is a contract edit and a version bump, and
   it is The Writer's act, not this run's.

2. **The full evidence pass did not run, and only one of its five channels did.** `lsei/` is absent,
   so `loadContext()` refuses `input-missing` and the app, exclusion, thin-patch and retrieval
   channels never executed through the router. I ran the **register channel by hand** and reported
   its zero. **A hand-run channel is not the instrument**, and the four channels I did not run could
   hold findings that would have changed the shape of this answer. Closing it is a clone of `lsei`,
   which is a human act and which the user's instruction this session withheld.

3. **`LCC-15`, `LCC-13`, `LCC-12` and `ECR-15` all bear on this report and none fired.** Their sides
   are named above and **not one of them is adjudicated here**, because adjudicating them is
   `CONTESTED` work and `CONTESTED` did not fire. In particular `LCC-15`'s side A —
   `sanders-2025-nasa-isru-progress-review.md`, which carries NASA's own TRL assessments and reports
   carbothermal reduction at TRL 5 and MRE at TRL 5/6 — **was not read for this run**, and it is the
   side most likely to soften C-1. A reader who wants the excavation question settled rather than
   raised should ask for it directly.

4. **C-1, C-2 and C-3 are derived arithmetic and carry no grade.** Under §2 they are `findings`
   deliverables with an author and a disputable derivation, and no such entry exists. They are
   reported here as tests, which is the only slot the contract gives them, and a reader is entitled
   to treat them as arithmetic rather than as findings until somebody signs them.

5. **The M-3 is a 2006 design point, not a floor on what is achievable.** C-1 compares a concept's
   requirement against a review's best reported figure. It does **not** establish that no excavator
   can reach 1,258 t/h, and `olson-2021` itself offers an in-situ volatile-release alternative at a
   comparable yield with *"only about 5 tonnes of regolith disturbed."* That alternative would
   collapse C-1 and it is in the same file. What survives either way is A-1: the model has no cell
   for the step under any architecture.

6. **The verification pass and I disagree on B-6, and I overruled it.** The pass returned `OWN` for
   the 11.8 ppb grade; the file's own line carries *"citing Hintenberger et al. 1970"*. I have
   recorded it as attributed on the file's words. **If I am wrong, B-6 is wrong**, and the reader can
   settle it in one `sed -n '76p'`.

7. **Deloitte's non-material revenue lines were not tested at all.** National security ($31.4B
   accelerated), lunar data and services ($31.7B) and in-space production ($105.9B) do not depend on
   excavation, and C-1 says nothing about them. **In-space production is the single largest enabled
   line and it is untested here.** The `organization-and-production-systems` and
   `self-replication-and-automation` shelves hold the material that would test it, including
   `metzger-2013-bootstrapping-space-industry.md` and the corpus's closure model, and none was read
   this run.

8. **Every trace above is `resolution-only`, and source PDFs are absent from this install
   (`BC-19`).** Nobody has confirmed that these nine summaries say what their source papers say.
   Nothing in the answering loop can close this; only a sampling read against the sources can.

9. **"Did they get it right" still has no measured answer.** No source in this corpus scores
   consulting-house market forecasts against realised outcomes. A-4 shows the report takes no outside
   view; **this answer does not supply one either**, because the corpus holds the reference-class
   *question* (`ECR-15`, `MT-16`) and not a scored base rate for forecasts of this shape. What this
   run can say is what the report omits and what the corpus measures. What it cannot say is how a
   $566 billion figure will land, and no run against this corpus can.
