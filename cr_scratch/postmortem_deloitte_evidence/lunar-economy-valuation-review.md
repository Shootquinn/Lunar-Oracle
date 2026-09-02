run:              r-2026-08-29-0001
asked:            2026-08-29T20:24:32Z
verdict:          CONTESTED
reason code:      -
contract version: 5
lsei ref:         7f97983

## Question

*"in the downloads folder there is a file named deloitte-building-the-lunar-economy-report.pdf. did
they get it right? what did they miss? thanks"*

The object under review is **Deloitte, *Building the Lunar Economy*, 60 pages, endnotes 1–193**, read
from the user's `Downloads` directory at the user's explicit direction. `CLAUDE.md` §3 prohibition 3
forbids the bootstrap and the answering loop from reaching outside this repository on their own;
material from elsewhere arrives "through a human-supervised step". The user naming the file **is**
that step, and the discipline it carries is recorded as a test in §3 below: the PDF was extracted to
the session scratchpad with `pdftotext`, **no byte of it was written into this repository**, and this
file quotes the report only as the object of measurement.

## Verdict

`CONTESTED`, on **six register axes**, twelve sides, no adjudication.

| Axis | Class | Sides | What the axis is about |
|---|---|---|---|
| `LCC-12` | `two_sided` | 3 | Whether the lunar propellant business case closes, and under whose assumed price, volume and cost of capital |
| `LCC-11` | `false_pair` | 2 | Dollar-per-kilogram figures quoted to two destinations three orders of magnitude apart, read as one quantity |
| `LCC-13` | `two_sided` | 2 | What demand a lunar helium-3 supply would serve |
| `LCC-15` | `two_sided` | 2 | How much regolith a lunar excavator moves, and at what readiness the excavation step stands |
| `ECR-15` | `two_sided` | 2 | Whether the base rate for a lunar projection comes from growth episodes or from capital-programme outcomes |
| `ECR-16` | `two_sided` | 2 | Whether reproducible machine capacity can serve as the surplus factor a missing workforce would supply |

**The scope token, which is what makes the answer legible rather than embarrassing.** `LCC-12`'s
own scope token, verbatim from `oracle/REGISTER.lunar.tsv`, is *"the assumed propellant price, the
assumed annual demand, and the discount rate."* Those are the three inputs of a discounted cash flow.
The report under review is a discounted cash flow. **The register anticipated the shape of this
document before the document existed**, and every one of the six axes above lands on an input the
report chose without naming the choice.

**What this verdict says.** On each of the six axes this corpus carries live, unsettled disagreement,
and the report takes one side of each without disclosing that a side was taken. Both sides of each
axis are set out in §3 and traced in §4.

**What this verdict does not say.** It does not say which side is right. `answer_contract.md` §1
gives `CONTESTED` as *"Every side, the axis named, no adjudication,"* and no sentence below ranks a
side, adjudicates an axis, or combines two sides' figures arithmetically. Statements about the
*report's own measurable properties* — what words it contains, what it cites, what its Limitations
section lists — are a different object, are measured in §3 with a falsifier each, and are not
adjudications of any axis.

**Why `CONTESTED` and not `LITERATURE`.** `LITERATURE` requires that no register axis fired at
classification time. Six fired. Had none fired, retrieval's top-scoring file would have answered
alone — that is `shishko-2019-lunar-thermal-mining-business-case.md` at score 2.4611, a source whose
own register row says it *"supplies a framework and a production-rate model and states that it is not
a completed cost or net present value result."* An answer built on it would have told the user that
the corpus offers a framework and no verdict, with one trace, one limit line, and nothing on its face
to say that this corpus also holds a cost model finding lunar propellant 97 percent more expensive
than Earth-launched propellant. **That failure is silent**: it is well-formed, correctly traced, and
passes every check in the contract except this one. It is also, precisely, the failure the report
under review commits — which is why the verdict and the finding are the same shape.

**Why not `APP`, `FIGURE` or `BOTH`.** No app address resolves. The Scenario Explorer models a lunar
scenario; it holds no valuation of a consultancy report, and `lsei`'s `KNOB_DATA` echoes `power` back
from its own input rather than measuring anything about this document. Separately, `answer_contract.md`
§3 Rule V **forbids** origin `app` on a `CONTESTED` verdict, so even a resolving address could not be
carried here. No `app` trace appears in §4.

**Why not `REFUSE`.** Every member path on all six axes resolves on disk; §4 names them. `not-found`
is unavailable because shelf files were confirmed, and `transfer-unevaluable` is not reached because
no condition of a carried mechanism was found unevaluable — see §5 item 4, where the one candidate is
recorded as owed rather than raised.

**Evidence pass: took `LCC-12`, `LCC-11`, `LCC-13`, `LCC-15`. Set aside `LCC-06`, `LCC-09`, `LCC-10`:
all three tie at mass 0.428 on the single shared key `power`, the tool's own documented
indistinguishability case, and the session read the report's power chapter as background to the six
axes above rather than as a claim about beneficiation, illumination or reactor-versus-solar mass.
Added, against the tool: `ECR-15`, `ECR-16`. The register channel reached neither, because their
`match_keys` read `megaproject`, `overrun`, `forecasting`, `reference`, `distribution` and
`replication`, `substitution`, `displacement`, and no reader of a twenty-five-year valuation types
those words. `answer_contract.md` §10 licenses exactly this override — "I read the question and the
axis and the tool did not" — and this is that sentence, used once, with the two axes named.**

*Placement note, disputable:* the evidence-pass line is required by §10 to sit in the Manager's open.
`oracle/deliverable_shape.md` §1 closes the heading set at five, so the line is carried here in §2,
where the classification is explained, rather than under a sixth heading. A reader who thinks that is
wrong is disagreeing with a placement, not with the line.

---

## What was tested, and how it could have failed

Seven groups. The first measures the report itself and belongs to the assembler. The other six are
per axis and per side, over that side's leaves only.

### Group 0 — measurements of the report (assembler's; no axis, no side)

Every test in this group ran against `pdftotext` output of the 60-page PDF held in the session
scratchpad. The counts are reproducible by anyone who extracts the same file.

| Claim | Test run | Falsifier — the result that would have refuted it | Observed |
|---|---|---|---|
| The report states no ore grade anywhere | `grep -ciE 'ppb\|parts per billion\|wt%\|weight percent'` over the full extracted text | Any hit. One stated grade, anywhere, and the report has priced a resource against a measured concentration | **0**. The report sizes a $114.5B "New Resources & Materials" pool and never states how much of anything is in a tonne of regolith |
| The report states no excavation rate and no mass throughput | `grep -oiE '(tons?\|tonnes\|metric tons) of regolith\|excavat[a-z]*\|mining rate\|throughput'` | Any rate, in any unit, for any machine | Two hits, both naming NASA's In-Situ Pilot Excavator with **no rate attached**. No tonnes-per-hour, per-day or per-year figure appears in the document |
| The word "discount" occurs twice and never inside `Limitations` | `grep -ni discount`, then read the `Limitations` block in full | A third occurrence, or the word appearing between the heading `Limitations` and the heading `ENDNOTES` | **2**: the Figure 1 footnote ("discounted at 7% in real terms") and one sentence in Results Overview ("a 7% discount rate, a standard approach for long-horizon infrastructure investments under uncertainty"). The `Limitations` block lists five items — US-centricity, unresolved technology pathways, end-loaded value, terrestrial proxies for unit prices and learning rates, and other-benefits uncertainty. **The discount rate is not one of them** |
| The report's own text says its value is end-loaded | Read `Limitations`, third item | The sentence absent | Present: *"much of the value identified in this analysis materializes toward the end of the modeled period."* End-loaded cash flows are where the discount rate has its largest lever, and it is the input the same section does not list |
| The `$1 / $4,000 / $36,000` price triple is lifted from one side of `LCC-12` | Resolve endnote 163; then §3-procedure steps 1–4 on that source's summary | The endnote resolving to something other than Kornuta 2019, or the three values not co-occurring in it | Endnote 163 = *Kornuta, David, et al. "Commercial Lunar Propellant Architecture," REACH vol. 13, 2019.* Step 3: `kornuta-2019-...md` lines 205–210 carry `Earth surface $1/kg`, `LEO $4,000/kg`, `Lunar surface $36,000/kg` in one table. **Step 4 fired**: that table is the summary's transcription of the source's own Table 11, not the source citing another author. Kornuta is `LCC-12` **side A** |
| Side B of `LCC-12` is cited once, and neither of its two headline figures appears | `grep` the report for `97`, `breakeven`, `break-even`, `34`, `35 years`; resolve endnote 170 | Either figure present anywhere in the report | Endnote 170 = *Jones, Christopher A., et al. "Cost Breakeven Analysis of Lunar In-Situ Propellant Production…"* — `LCC-12` side B. It carries **one** sentence: *"if launch costs continue to fall and refueling architecture scales as planned, it could undercut the case for lunar production before it ever reaches scale."* Neither the 97-percent result nor the 34-to-35-year breakeven appears. Side B is cited and not quoted |
| The report contains no closure or self-replication concept | `grep -ciE 'self-replicat\|full closure\|bootstrap'` | Any hit | **0**. Value Pool 1 is denominated end to end in Earth-launched mass; there is no variable for the fraction of lunar industrial mass that lunar industry makes itself |
| **Credit, tested the same way:** the report does flag its terrestrial learning-rate proxies | Read `Limitations`, fourth item | The item absent | Present, and explicit: *"unit prices, efficiency gains, and learning rates are informed by terrestrial proxies drawn from aerospace, power, and infrastructure research… the lunar operating environment differs materially from terrestrial precedent."* This is the report naming a real weakness in its own model. It is not the discount rate |
| **Credit:** the report does flag the ice-concentration uncertainty | Read the Lunar Propellant section | The claim absent | Present at p. 35: *"important questions remain about how concentrated it is, how deep it lies, and how difficult it may be to extract"*, with VIPER named as the instrument. The report knows the geology is unresolved. It prices the market anyway |
| **Credit:** Value Pool 3 is reported separately and is not additive | Read the Appendix framework and Figure 2 | The $541B folded into the $343–566B headline | Not folded. The framework states it explicitly, twice. The headline number is honest about its own boundary |
| No byte of the source PDF entered this repository | `git status --porcelain` over `literature/` and `answers/`; extraction target is the session scratchpad | Any extracted third-party text under the repository tree | Clean. The extraction lives outside the repo, and this file quotes the report as an object of measurement only. The `LICENSE` question the gameplan records — *"No third-party PDF, page image or extracted source text is in this repository"* — stays true of this run |

### Group 1 — `LCC-12`, three sides. Does the lunar propellant business case close?

*Scope token: the assumed propellant price, the assumed annual demand, and the discount rate.*

| Side | Claim | Test run | Falsifier | Observed |
|---|---|---|---|---|
| A | The case closes, at a stated price and demand | §3-procedure on `kornuta-2019-...md`, searching `2,450`, `1,640`, `2.8 MW`, `10 percent discount` | Any figure absent, or present only inside an attribution to another author | Line 101: a plant processing **2,450 MT of lunar water/yr into 1,640 MT of propellant/yr, drawing 2.8 MW, at ~$4B initial investment**. Line 247: *"Every scenario with more than one customer has positive NPV at a 10 percent discount rate."* Step 4: the summary's own line 288 marks these as **model output, not measured plant performance** — a discipline the source imposes on itself |
| A | The closing case is conditional on an ice grade the prospecting campaign has not met | Read the `LCC-12` A-row for `sowers-2019-psr-ice-mining.md` | The row not stating a grade condition | The register row states a **4 wt% minimum ice concentration** that the source itself calls *"a requirement the prospecting campaign must still meet."* Side A's own case is written as conditional |
| B | It does not close, at a stated price and horizon | §3-procedure on `jones-2019-cislunar-isru-breakeven.md`, searching `78,000`, `40,000`, `97 percent`, `35 years` | Any figure absent, or attributed to another author | Line 47: `2 (Commercial delivery from Earth) — 40,000`. Line 50: `5 (Lunar ISRU, Bootstrapped, single lander) — 78,000`. Line 71: **lunar ISRU propellant is 97 percent more expensive than Earth-based propellant**, restated in the source's own Conclusion. Line 65: baseline breakeven at **35 years** of 59 t/yr demand, the Architecture-5-against-Architecture-2 crossing at **about 34 years**. Step 4: all four are the paper's own results |
| B | Demand growth does not rescue it | Same file, searching `no crossover` | The sentence absent, or hedged | Line 65: varying annual demand **from 10 to 1,000 tonnes/year produces no crossover at any demand level**. The source flags this claim as carried by a single sentence of prose with no supporting figure, and that caveat is carried here rather than dropped. The authors describe their own assumption set as *"favorable towards lunar ISRU"* and the result comes out against it anyway |
| C | The cost of capital for this class of project is not 7 percent | §3-procedure on `mckeown-2024-space-resource-hurdle-rate.md`, searching `7.0%`, `25%`, `10% discount rate` | Any figure absent, or the 7% figure turning out to be the paper's recommended rate | Line 184: the paper averages mining, oil-and-gas and aerospace five-year WACC to **6.92%, "rounded up to 7.0% as the RBUM baseline"** — 7 percent is the paper's *starting point before any space-resource risk is priced*. Lines 120–126: the conclusion is a hurdle rate **"in the range of 25%"**, and a **10% discount rate proposed for reporting**, modelled on the SEC oil-and-gas PV-10 convention. The worked higher-risk project reaches **43%**. Step 4: all are the paper's own derivations |
| C | Every one of those figures is conditional on a legal regime | Same file, `Legal/regulatory risk treatment` | The conditionality absent | Present and emphatic: every headline result is stated as conditional on *"a suitable legal/regulatory regime is in place"*, and the paper describes legal risk as arguably **binary** — *"either suitable legislation/regulation is in place and the project can get financed, or it isn't"* |
| — | **The arithmetic on those two rates is derived and carries no trace** | `Math.pow(1.07,-24)` against `Math.pow(1.25,-24)` and `Math.pow(1.10,-24)`, 2026→2050 | Nothing in the corpus refutes it, and nothing in the corpus supports it either | 0.1971, 0.004722, 0.1015 — a 2050 dollar carries **≈41.7× more present value at 7% than at 25%**, and **≈1.94× more than at 10%**. `answer_contract.md` §2: *"Derived arithmetic is a deliverable, not a trace."* This has no locator that resolves and therefore **no legal grade**, it appears in no trace line in §4, and §5 item 1 records where it is owed |

### Group 2 — `LCC-11`, two sides. Dollar-per-kilogram, to where?

*Scope token: the destination the price is quoted to, and whether the figure is an analyst estimate, a modelling scenario, or a contracted price.*

| Side | Claim | Test run | Falsifier | Observed |
|---|---|---|---|---|
| A | Launch prices to low Earth orbit are falling, at a measured rate, and the underlying data are not public | §3-procedure on `adilov-2022-launch-cost-reductions.md` | The rate absent, or the data-availability caveat absent | Per-kilogram cost to LEO fell **5.5 percent per year unadjusted** over the study period, and the authors state that **detailed launch cost data are not publicly available because actual contracts are private**. The second half is the part a modeller needs and the part that gets dropped |
| B | Lunar-surface delivery prices in this corpus sit one to two orders of magnitude above the report's figure | §3-procedure on `nasa-2023-card-carbothermal-reduction.md` and `metzger-autry-2023-lunar-landing-pads.md` | Either source quoting a lunar-surface price at or below $36,000/kg | CaRD line 40: **$1.2M per kg to land on the lunar surface**, given as a first-slide motivation with no derivation. Metzger & Autry line 56: baseline **$300K/kg**, against a stated context of roughly **$1M/kg in the next five years**, falling toward **$2K/kg within twenty**. Step 4: both are the sources' own stated assumptions, and both are labelled as such |
| — | The axis's own hazard is what the report reproduces | Read the `LCC-11` axis statement | The axis statement not describing this failure | Verbatim: *"Dollar-per-kilogram figures in this corpus are quoted to two different destinations that differ by roughly three orders of magnitude, and are read as if they were the same quantity."* The report's transportation pool — **$150–206B, 72% of core infrastructure value** — is driven by "payload mass delivered to the lunar surface" against an efficiency decline sourced to **rocket reusability**, which is a low-Earth-orbit mechanism |

### Group 3 — `LCC-13`, two sides. What demand would lunar helium-3 serve?

| Side | Claim | Test run | Falsifier | Observed |
|---|---|---|---|---|
| A | The supply-side literature names a fusion market it does not quantify | §3-procedure on `olson-2021-lunar-helium3-mining.md` | A quantified fusion demand present | Line 35: **about 100 kg of helium-3 is presently available on Earth**. The register row records that the paper's *only* demand-side content is one unquantified sentence about commercial fusion companies, **with no company names, power ratings, fuel consumption rates or projected prices** |
| A | The supply-side engineering states a mining scale the report never approaches | Same file, searching `1,258`, `33 kg`, `350 kW`, `11.8 parts per billion` | Any figure absent | Line 76: Apollo 11 sample 10084 averaged **11.8 ppb helium-3 by mass**. Lines 90–96: the Mark-III miner is designed to collect **33 kg of helium-3 per year**, excavating **to 3 m depth over 1 km² per year**, moving **1,258 tonnes/hour**, heating 556 t/hr, consuming **~350 kW electrical**. **Step 4 fired**: Olson 2021 is a review, and the Mark-III design point is Wisconsin's, reported by Olson, not Olson's own result. It is reported speech inside a review and is quoted here as such |
| B | The quantified helium-3 market is small, and its demand was deliberately reduced | §3-procedure on `gao-2011-neutron-detectors-helium3.md` | The volumes or the policy response absent | Line 118: US supply **8,000 to 10,000 litres per year**. Line 137: pre-shortage price **$40 to $85 per litre**. Line 140: post-shortage **$600 to $1,000 per litre**. Line 154: the documented federal response was *"explicitly to reduce demand for helium-3, not to expand or serve any new market"* — funding boron-10 and lithium-6 substitute detectors. Step 4: all are the report's own figures |
| — | The report's price sits above side B's post-shortage spot price and its method assumes the substituted market | Read the report's helium-3 section and Appendix Table 2 | The report stating a lower price, or classifying neutron detection as anything but "Replacement" | The report cites **"around US$20 million per kilogram"** to a trade-press article (endnote 157), and Appendix Table 2 classifies *"Supply existing terrestrial helium-3 markets including neutron detection, cryogenics, and scientific instrumentation"* as **Replacement**. Side B is the record of that market's demand being engineered downward on purpose. The report does not cite it |

### Group 4 — `LCC-15`, two sides. How much does a lunar excavator move, and at what readiness?

| Side | Claim | Test run | Falsifier | Observed |
|---|---|---|---|---|
| A | The demonstrated state of the art is a stated tonnage over a stated number of days | §3-procedure on `sanders-2025-nasa-isru-progress-review.md`, searching `10 metric tons in 5 days` | The figure absent or attributed elsewhere | Line 95: the ISRU Pilot Excavator, a bucket-drum machine, **moved 10 metric tons in 5 days**, at TRL 5. The hard icy-regolith case in the same source is the Break the Ice Challenge: **15 teams over 15 days excavating 12,000 kg total, about 800 kg/day each** |
| A | NASA's own architecture document sets no numeric target for this | §3-procedure on `nasa-moon-to-mars-doc.md`, gap 0605 | A numeric target present | Line 229: gap **0605, Lunar Regolith Excavation, Manipulation, and Transportation** — state of the art is sub-10-kg demonstrated manipulation, IPEx targets 10 t over 14 days, and the target is *"qualitative scaling to ISRU-operation and site-preparation needs, **no numeric target**"* |
| B | The concept literature will not tabulate readiness because there is not enough of it | §3-procedure on `just-2020-regolith-excavation-review.md` | The review tabulating TRL, or reporting concepts above TRL 4 broadly | Line 124: *"With the stated exception of NASA's RASSOR and Cratos platforms and the pneumatic excavation system, none of the reviewed technologies are described as being at an advanced TRL."* Line 27: *"relatively little research is carried out in the area of regolith excavation and handling."* The review excludes TRL as a column because it would be a column of threes |
| — | The report prices resource extraction and states no rate on either side of the gap | Group 0, row 2 | An excavation rate anywhere in the report | Zero. The gap between side A's demonstrated 2 t/day and the mining literature's design-point tonnages is the single largest unstated quantity in the document under review, and this answer **does not compute the ratio**, because that is cross-source arithmetic and §5 item 1 says where it belongs |

### Group 5 — `ECR-15`, two sides. Which base rate governs a twenty-five-year lunar projection?

*Taken on the session's reading, against the tool. `lean` on this axis is `neither`.*

| Side | Claim | Test run | Falsifier | Observed |
|---|---|---|---|---|
| A | The country-growth class: a prior episode is a weak guide to the next | §3-procedure on `pritchett-2000-hills-among-plateaus.md` and `hausmann-2005-growth-accelerations.md` | Either figure absent, or either author reporting persistence as reliable | Pritchett line 171: **rank correlation of growth before and after a structural break is 0.24**. Hausmann lines 158–164: of 83 accelerations, 69 are classifiable, and **37 of 69 (53.6%) stayed above 2%/yr** in the following decade. `oracle/transfer_gate.md` §2.3 imposes the scope both sources impose on themselves: Pritchett's cutoffs are, in his own footnote, *"somewhat arbitrary and… rigged according to… my intuitive feel"*; Hausmann's persistence ratio is measured against a **2 percent** bar, one full point below the 3.5 percent bar that defined the acceleration |
| B | The capital-programme class: nine in ten overrun, and the overrun comes with a demand shortfall | §3-procedure on `flyvbjerg-2014-what-you-should-know-megaprojects.md` | Either figure absent, or cost overrun and demand shortfall reported as independent | Page 9 of the source: *"Nine out of ten such projects have cost overruns."* For rail, **44.7 percent mean cost overrun combines with 51.4 percent mean demand shortfall** — the pair, not two independent figures. The transfer-gate §2.3 discipline also applies: the widely circulated 47.9/8.5/0.5 cascade **is not in this paper**, was searched for across the full text, and attributing it here would be a fabrication that resolves. It is not attributed here |
| — | The report uses neither class | Read the Appendix method in full | Any reference class, any base rate, any outside-view distribution | The method is bottom-up `unit price × quantity` with judgement-based probability weights on speculative activities. **No reference class of any kind appears.** The transfer-gate §2.2 rule requires *both* classes returned and named as classes; the report returns neither, which is a different failure from returning one, and a stronger one |

### Group 6 — `ECR-16`, two sides. Can reproducible machines be the surplus factor?

*Taken on the session's reading, against the tool.*

| Side | Claim | Test run | Falsifier | Observed |
|---|---|---|---|---|
| A | Self-replication is stated as an engineering programme, with a cost | §3-procedure on `freitas-1980-advanced-automation-space-missions.md` and `lee-2008-robotic-self-replication-complexity.md` | Either source absent from the shelf, or the complexity constraint absent | Both resolve under `literature/self-replication-and-automation/`. Freitas 1980 is the NASA Ames self-replicating lunar factory study, the founding statement of machine capacity as a reproducible factor; Lee 2008 states the **complexity cost**, which the register row correctly labels *"the constraint on the same claim"* rather than a second affirmation of it |
| B | The one measurement runs the other way | §3-procedure on `acemoglu-2020-robots-and-jobs.md` | The measurement reporting positive employment and wage effects | About **0.13 percent aggregate output per robot per thousand workers, with negative employment and wage effects** — one more robot per thousand workers lowering the employment-to-population ratio by roughly 0.34 to 0.18 percentage points across specifications. This is the side that stops the self-replication story being sold as settled, and it is on the axis for that reason |
| — | The report has no variable on either side of this axis | Group 0, row 7 | Any closure, replication or bootstrapping concept in the report | Zero mentions. The report's robots-versus-humans passage is a **labour-cost** argument — *"When you put people into the mix, you dramatically increase your budgets"* — not a reproducible-capacity argument. Off-axis, and named here as such: `metzger-2013-bootstrapping-space-industry.md` sits on this shelf and on **no** register axis, and models a robotic lunar industry seeded with **12 t (reduced rate) or 41 t (maximum rate) landed over roughly 20 years**, reaching **156 t of assets with 60 humanoid robots** in the low case or **40,000 t with 100,000 robots** in the high case. That is an economic object the report's `unit price × quantity` model structurally cannot represent, because its quantity driver is Earth-launched mass |

---

## Sources

Twenty `literature` traces, covering every side of all six axes plus one off-axis leaf. No `app`
trace: Rule V forbids origin `app` on `CONTESTED`. No `findings` trace: `findings/` is absent on this
install (`CLAUDE.md` Phase 4, `BC-18`).

**`LCC-12`, side A**
Trace (citation, resolution-only, literature): literature/logistics-and-delivery/kornuta-2019-commercial-lunar-propellant-architecture.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Trace (citation, resolution-only, literature): literature/isru-processing/sowers-2019-psr-ice-mining.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

**`LCC-12`, side B**
Trace (citation, resolution-only, literature): literature/logistics-and-delivery/jones-2019-cislunar-isru-breakeven.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Trace (citation, resolution-only, literature): literature/logistics-and-delivery/jones-2020-lunar-propellant-breakeven.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

**`LCC-12`, side C**
Trace (citation, resolution-only, literature): literature/space-economy-and-markets/mckeown-2024-space-resource-hurdle-rate.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

**`LCC-11`, side A**
Trace (citation, resolution-only, literature): literature/logistics-and-delivery/adilov-2022-launch-cost-reductions.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

**`LCC-11`, side B**
Trace (citation, resolution-only, literature): literature/isru-processing/nasa-2023-card-carbothermal-reduction.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Trace (citation, resolution-only, literature): literature/logistics-and-delivery/metzger-autry-2023-lunar-landing-pads.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

**`LCC-13`, side A**
Trace (citation, resolution-only, literature): literature/isru-processing/olson-2021-lunar-helium3-mining.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

**`LCC-13`, side B**
Trace (citation, resolution-only, literature): literature/space-economy-and-markets/gao-2011-neutron-detectors-helium3.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

**`LCC-15`, side A**
Trace (citation, resolution-only, literature): literature/programme-primaries/sanders-2025-nasa-isru-progress-review.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Trace (citation, resolution-only, literature): literature/programme-primaries/nasa-moon-to-mars-doc.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

**`LCC-15`, side B**
Trace (citation, resolution-only, literature): literature/isru-processing/just-2020-regolith-excavation-review.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

**`ECR-15`, side A**
Trace (citation, resolution-only, literature): literature/growth-theory/pritchett-2000-hills-among-plateaus.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Trace (citation, resolution-only, literature): literature/growth-theory/hausmann-2005-growth-accelerations.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

**`ECR-15`, side B**
Trace (citation, resolution-only, literature): literature/organization-and-production-systems/flyvbjerg-2014-what-you-should-know-megaprojects.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

**`ECR-16`, side A**
Trace (citation, resolution-only, literature): literature/self-replication-and-automation/freitas-1980-advanced-automation-space-missions.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Trace (citation, resolution-only, literature): literature/self-replication-and-automation/lee-2008-robotic-self-replication-complexity.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

**`ECR-16`, side B**
Trace (citation, resolution-only, literature): literature/organization-and-production-systems/acemoglu-2020-robots-and-jobs.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

**Off-axis, named as such**
Trace (citation, resolution-only, literature): literature/self-replication-and-automation/metzger-2013-bootstrapping-space-industry.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

---

## What remains unverified

**Nine items unverified, over 35 claims and 35 tests examined** — one test per §3 row, several of
which ran more than one command; the denominators are row counts, not command counts.

1. **The discount-rate arithmetic has no home.** The 41.7× and 1.94× ratios in Group 1 are cross-source
   arithmetic over two stated rates and a stated horizon. Under `answer_contract.md` §2 they have no
   locator and therefore no legal grade, and they belong in a `findings/` shelf entry with an author
   and a derivation somebody can dispute. **`findings/` does not exist on this install** (`BC-18`,
   reported at bootstrap), so the entry cannot be written from here. Closing it is the corpus owner's
   act, not the answering loop's.

2. **Every trace above is `resolution-only`.** Nobody has confirmed that these twenty summaries say
   what their source PDFs say. Whether the PDFs are even on this install is per-install state, and
   `BC-19` reported them **absent** this session. A sampling read against the sources closes this;
   nothing in the answering loop can. This is the largest single item on the list and it is structural,
   not a defect of this run.

3. **The report's own primary sources were not opened.** Endnotes 1–193 were resolved as citations —
   author, title, venue, date — and not read. Where this answer says the report cites Kornuta 2019 or
   Jones 2020, that is a statement about the report's endnote list, not about whether the report read
   them correctly. Closing it means acquiring 193 documents.

4. **A transfer-gate verdict is owed and was not raised.** The report carries at least three mechanisms
   into the lunar case: a battery learning rate of 10 percent per doubling of installed capacity, the
   GPS-to-civil-economy spillover, and the Earth-observation-to-commercial-market development model.
   `oracle/transfer_gate.md` §3.2 requires each to be tested against social capability and
   technological congruence. **No source in this corpus measures either condition for a lunar
   production system**, which is the `unknown` verdict, and `unknown` composes a refusal on that
   sub-claim rather than a hedge inside this one. It is recorded here rather than answered, and the
   region searched was `literature/` across all eleven shelves and the app surface.

5. **Two axes were taken on the session's reading and not on a score.** `ECR-15` and `ECR-16` never
   reached the register channel. If the session's reading is wrong about them, four of the twelve sides
   above are decoration. The evidence-pass line in §2 names them so a reviewer can check exactly this.

6. **A source the report cites is not on this shelf.** The report's endnote 166 is Metzger, *"Economics
   of In-Space Industry and Competitiveness of Lunar-Derived Rocket Propellant"*, Acta Astronautica 207
   (2023). This corpus holds four Metzger items and not that one. It is plausibly a fourth voice on
   `LCC-12` and is a corpus gap, which is an acquisition decision.

7. **The $541B "Other Benefits" proxy is unexamined.** The report drives its global-pride-and-inspiration
   estimate from *"short-term excess stock market returns observed around events of national or cultural
   significance."* No source in this corpus measures that, on the Moon or anywhere. It is not scored
   here in either direction.

8. **The helium-3 recycling question is not in this corpus.** Side B quantifies the neutron-detector
   market. Neither side quantifies how much helium-3 a dilution refrigerator consumes as against how
   much it holds as a working charge — the difference between a consumable market and a one-time
   installed base, and the whole of whether the quantum-cooling demand the report prices is recurring.
   Region searched: `literature/space-economy-and-markets/` and `literature/isru-processing/`.

9. **The corpus fork verdict is `unknown`.** `CHK-40` is `specified` and not built, so this session
   cannot say whether this repository's 169 summaries have diverged from their `lsei/literature/`
   counterparts. Every trace above resolves against *this* tree at `lsei@7f97983`.

---

*Bootstrap, this session: `CLEAN`. Both working copies at `HEAD` = `origin/main` = `VERIFIED.tsv`
(`cr-agents@f0c976b`, `lsei@7f97983`), mode set empty, origins available `app`, `literature`, `none`;
`findings` unavailable (`BC-18`), source PDFs absent (`BC-19`), corpus fork `unknown`. Per `CLAUDE.md`
§5, **`CLAUDE.md` was corrected in this run**: its quoted answer-contract integer read 3 against a
contract reading 5, and the clause invoked is `answer_contract.md` §9. The suite pin at
`oracle/tests/answering_loop_suite.md` VER-2 still reads 2 and was deliberately not moved.*

*Run log, and a tension reported rather than resolved. `answer_contract.md` §8 requires a nine-field
row, and this run's row was written and passes `node tools/verify_answers.js` (`RESULT PASS (log
well-formed)`, 1 row, 0 malformed, `ANSWERED`, `unreviewed`). The log lives at
`tools/verify_answers.js`'s own `DEFAULT_LOG`, which is under the OS temp directory and therefore
**outside this repository**, which `CLAUDE.md` §3 prohibition 3 forbids writing to. The prohibition
and a committed tool's declared default disagree. This run followed the tool, because the alternative
was to skip a contract requirement silently, and the disagreement is recorded here so somebody can
rule on it rather than discover it.*
