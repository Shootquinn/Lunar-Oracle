# A.10 Step 2 Source Verification Gate — LCC-09 through LCC-15

Read-only verification. No files edited. 37 M-rows and 7 A-rows checked against
`oracle/REGISTER.lunar.tsv` and the 34 unique member summary files it names.

## Commands run and file set walked

```
cd "C:\Users\Quinn Morley\onedrive\projects\cc\lunar oracle"
grep -n "LCC-09\|LCC-10\|LCC-11\|LCC-12\|LCC-13\|LCC-14\|LCC-15" oracle/REGISTER.lunar.tsv
find literature -name "<leaf.md>"   # once per distinct leaf named in the M rows
Read tool, full file, once per distinct leaf (34 files)
grep -n "<key phrase>" literature/.../<leaf>.md   # to pin the line number of each quoted claim below
sha256sum oracle/REGISTER.lunar.tsv <34 leaf files> > cr_scratch/relay/_filehashes.txt
sha256sum cr_scratch/relay/_filehashes.txt
```

Per-file SHA-256 digests are recorded in `cr_scratch/relay/_filehashes.txt` (written alongside
this file in the same pass). Combined digest over that hash list:
`691303d150e17ecff958df4afe0e5d6bbfc263e581e3fe26475de5fcfca2d713`

File count walked: 1 register + 34 distinct leaf summary files = 35 files (37 M-rows, because
`ross-2023-lunar-south-pole-solar-power.md` and `metzger-autry-2023-lunar-landing-pads.md` each
carry two M-rows against two different axes).

---

## Per-row results

Format: row id | claim as the register states it (verbatim from the TSV) | file:line checked
against | verdict | quoted text (given for every row so the check is fully re-derivable, not
only for non-confirms).

### LCC-09

**LCC-09 A `speyerer-2013-persistently-illuminated-regions.md`**
Register claim: "Image-derived from one lunar year of LROC coverage at 100 m/pixel: localized regions illuminated for nearly 94 percent of the year with a longest single eclipse of 43 hours; the image-derived values at the same nominal points are consistently lower than the coarser terrain-model values, and the study found both peaks the simulations missed and shadowed pockets they had marked as lit."
Checked against: lines 17, 41, 53.
Verdict: SUPPORTED
Quote (l.41): "We identified localized regions where the lunar surface remains illuminated for nearly 94% of the year with the longest eclipsed period lasting only 43 h"
Quote (l.53): "The image-derived, higher-resolution (100 m/pixel) values are consistently lower than the coarser-DEM simulation values at the same nominal points."

**LCC-09 A `speyerer-2012-in-search-of-shade.md`**
Register claim: "At the most-illuminated pixel the terrain-model simulations gave 82 to 89 percent against 71 percent from the higher-resolution image-derived product, and small permanently shadowed craters sit inside the persistently illuminated rim terrain."
Checked against: line 31.
Verdict: SUPPORTED
Quote (l.31): "the most-illuminated pixel's illumination fraction was 82-89% in the simulations versus 71% in the higher-resolution WAC-derived product"

**LCC-09 B `glaser-2014-south-pole-illumination.md`**
Register claim: "LOLA terrain-model simulation over the 18.6-year precessional cycle: Connecting Ridge at 92.27 percent accumulated light at 2 m above ground and 95.65 percent at 10 m, with longest continuous darkness typically 3 to 5 days."
Checked against: line 17.
Verdict: SUPPORTED
Quote (l.17): "Locations there receive sunlight for 92.27% of the time at 2 m above ground and 95.65% of the time at 10 m above ground, with longest continuous darkness periods typically 3-5 days"

**LCC-09 C `ross-2023-lunar-south-pole-solar-power.md`**
Register claim: "Overshadowing of illuminated ground by sunward panels limits extractable time-averaged power to about 55 to 63 MW at greater than 70 percent illumination for panels up to 20 m, falling to about 6 MW at greater than 90 percent; illuminated area and extractable power are not the same quantity."
Checked against: lines 17, 35.
Verdict: SUPPORTED
Quote (l.35): "Near-term vertical panels (up to 20 m): the upper limit to time-averaged power is about 55 to 63 MW at greater than 70 percent illumination, reducing to about 6 MW at greater than 90 percent illumination."

### LCC-10

**LCC-10 A `poston-2020-krusty-reactor-design.md`**
Register claim: "A 1 kWe prototype that achieved nuclear-powered operation in March 2018; the paper prints no specific-power figure in W/kg for the reactor or the system, so it constrains no mass-per-kilowatt claim."
Checked against: lines 39, 63.
Verdict: SUPPORTED
Quote (l.63): "This paper prints no specific-power (W/kg) value for the KRUSTY reactor or system...in any figure, plot, or table"

**LCC-10 A `oleson-2022-deployable-fsp.md`**
Register claim: "A 40 kWe point design whose three elements total 10,046 kg against a 6,000 kg goal the paper states it exceeded, giving 3.98 W/kg overall or 5.45 W/kg on the reactor element alone; the paper states no system-level specific power itself."
Checked against: lines 112, 114.
Verdict: SUPPORTED
Quote (l.114): "40,000 We divided by 7,334 kg is 5.45 W/kg...40,000 We divided by 10,046 kg is 3.98 W/kg"; "The source does not state an explicit system-level specific-power figure in W/kg for the completed design."

**LCC-10 A `nasa-2025-fission-surface-power-directive.md`**
Register claim: "Directs a forthcoming procurement at a minimum 100 kWe with a heavy-class lander allocation of up to 15 metric tons and launch readiness by Q1 FY30; the allocation is a requirement, not a demonstrated mass."
Checked against: lines 20, 53, 54.
Verdict: SUPPORTED
Quote (l.53-54): "Minimum 100 kWe power output"; "Assumed use of a heavy-class lander, with up to 15 metric tons of mass available" — both listed under "Required RFP features," i.e. a requirement, not a measured mass.

**LCC-10 A `nasa-moon-to-mars-doc.md`**
Register claim: "The Moon to Mars Architecture Definition Document Revision C (NASA/TP-20250010956) adds a Lunar Nuclear Fission System to the element list and states no power rating, no mass allocation and no specific mass for that element; its data-gaps catalog states only a target of scalable multi-kWe generation and cites the 2018 KRUSTY ground test as state of the art. The document says of itself, repeatedly, that it is not a budget, requirements, procurement or manifest document."
Checked against: lines 246, 274, 276.
Verdict: CONTRADICTED
Quote (l.246): "0901, Scalable Lunar Surface Power Generation...a single brief 2018 ground test of a kW-scale fission system ('KRUSTY') is also cited as SOTA; target is scalable multi-kWe generation extending crewed operation through shadowed periods." — this is gap 0901 of the technology-gap catalog (Appendix D), documented in the file's Section H under "Power Systems (09xx)."
Quote (l.276): "the data-gap catalog below is documented here for completeness but is excluded from the downstream capability-area...mapping, which draws exclusively on the Appendix D technology-gap catalog...Data gaps are a category new to Revision C and express information needs, distinct from technology needs."
The register's claim attributes the multi-kWe target / KRUSTY citation to the data-gaps catalog (Appendix E); the file places that content squarely in the technology-gap catalog (Appendix D) and explicitly separates the two catalogs. The "no power rating/mass allocation for the element itself" half of the claim is independently true and separately supported (Section E of the file), but the specific catalog attribution is contradicted by the file's own structure.

**LCC-10 B `ross-2023-lunar-south-pole-solar-power.md`**
Register claim: "Solar power near the pole is available nearly continuously only from vertically deployed panels in restricted high-illumination regions, and if solar is inadequate even in a best case, fission becomes the only option."
Checked against: line 24.
Verdict: SUPPORTED
Quote (l.24): "Solar power near the pole is available nearly continuously only from vertically deployed panels in quite restricted HIRs close to the PSRs...if solar is inadequate even in a best case, fission becomes the only option."

**LCC-10 B `csank-2022-powering-the-moon.md`**
Register claim: "Sizes an Artemis baseline of about 90 kW with islanded solar and battery sub-grids, and anchors the transition on a 40 kWe fission demonstration; cable mass dominates total microgrid mass."
Checked against: lines 72, 74, 93.
Verdict: SUPPORTED
Quote (l.72): "Total conceptual Artemis base demand...is about 90 kW."; (l.74) "A Fission Surface Power (FSP) demonstration...calling for a system generating 40 kWe end-of-life."; (l.93) "Cables are reported as 'by far the heaviest part of the microgrid.'"

**LCC-10 B `colozza-2020-lunar-base-power-comparison.md`**
Register claim: "For continuous day and night operation the reactor is lowest mass in every case and energy storage dominates every continuous photovoltaic case; every case is sited at 30 degrees north over a 708.33 hour day-night cycle, and the document contains no polar illumination model, no eclipse statistic and no permanently shadowed region."
Checked against: lines 21, 43.
Verdict: SUPPORTED
Quote (l.21): "sited at 30 degrees north latitude and both sized over one 708.33 h lunar day and night cycle...For continuous day and night operation the reactor is lowest mass in every case...Energy storage is the dominant mass term in every continuous photovoltaic case."; (l.43) "the following return ZERO occurrences across all 98 sheets: polar, eclipse, darkness, permanently shadowed...So this source contains no polar illumination model, no eclipse-duration statistic, and no treatment of a permanently shadowed region."

**LCC-10 B `pappa-2021-relocatable-solar-array.md`**
Register claim: "A relocatable vertical solar array concept for the polar high-illumination regions."
Checked against: lines 17, 23.
Verdict: SUPPORTED
Quote (l.17): "a 10 kW deployable, retractable, free-standing solar array for lunar South Pole surface power, called the Relocatable Solar Array (RSA)...a vertical telescoping mast."

**LCC-10 B `belbin-2024-vsat-grd-demonstrator.md`**
Register claim: "A vertical solar array technology ground demonstrator."
Checked against: lines 55, 103.
Verdict: SUPPORTED
Quote (l.55): "the Government Reference Design (GRD) demonstrator for NASA's Vertical Solar Array Technology (VSAT) program"; (l.103) "The demonstrator is a one-gravity, ambient, indoor mechanism testbed."

### LCC-11

**LCC-11 A `payload-research-starship-cost.md`**
Register claim: "A trade-press analyst estimate of about $500 per kilogram to low Earth orbit for an expendable Starship V1, with Falcon 9 expendable likely above $2,000 per kilogram; the piece labels its own cost figures as Payload estimates rather than stated or audited prices."
Checked against: lines 12, 90.
Verdict: SUPPORTED
Quote (l.90): "around $500...This is explicitly an internal cost...and explicitly a Payload estimate"; (l.12) "the cost figures below carry the author's own 'per Payload analysis' or 'Payload estimates' tags"

**LCC-11 A `jones-superheavylift-final20260614.md`**
Register claim: "A fully reusable Starship headline range of $67 to $900 per kilogram to low Earth orbit across three scenarios the authors describe as hypothetical and illustrative."
Checked against: lines 42, 84.
Verdict: SUPPORTED
Quote (l.42): "Starship headline range as 67 to 900 dollars per kg to LEO."; (l.84) "The cost scenarios are described by the authors as hypothetical and illustrative."

**LCC-11 A `adilov-2022-launch-cost-reductions.md`**
Register claim: "Per-kilogram launch cost to low Earth orbit fell 5.5 percent per year unadjusted over the study period, and the authors state that detailed launch cost data are not publicly available because actual contracts are private."
Checked against: lines 24, 41.
Verdict: SUPPORTED
Quote (l.24): "kilogram launch cost fell 5.5% per year unadjusted"; (l.41) "actual contracts are private, and government launch costs are difficult to establish"

**LCC-11 B `nasa-2023-card-carbothermal-reduction.md`**
Register claim: "States $1.2M per kilogram to land on the lunar surface, given as a motivation on the first slide with no derivation."
Checked against: line 38.
Verdict: SUPPORTED
Quote (l.38): "Landed-cost figure (p. 1): $1.2M per kg to land on the lunar surface, implying $12B to land 10 tonnes of LOX at that rate."

**LCC-11 B `metzger-autry-2023-lunar-landing-pads.md`**
Register claim: "Uses surface transportation cost as a swept parameter at $1M, $300K, $100K, $10K, $2K and $300 per kilogram, with a stated context of roughly $1M/kg in the next five years falling toward $2K/kg within twenty."
Checked against: lines 35, 37, 49, 50, 54.
Verdict: SUPPORTED
Quote (l.37): "(expensive $1M/kg, moderate $100K/kg, cheap $300/kg)"; (l.49-50) Table 5/6 use $1M/kg, $100K/kg, $10K/kg, $2K/kg, and $300K/kg; (l.54) "$300K/kg for a pad built in the 5-to-10-year timeframe, against a stated context of roughly $1M/kg in the next five years...$500K/kg down to $2K/kg within 20 years"

**LCC-11 B `nasa-clps-delivery-timeline.md`**
Register claim: "A manifest of eleven CLPS surface deliveries against a 2024 to 2028 axis; it prints no contract value and no per-kilogram price."
Checked against: line 29.
Verdict: SUPPORTED
Quote (l.29): "The graphic covers eleven deliveries across five vendors. It does not show payload manifests, landing sites, contract values, launch vehicles, or mission outcomes"

**LCC-11 B `nasa-clps-procurement-vignette.md`**
Register claim: "States a combined maximum contract value of $2.6 billion through November 2028 across fourteen contract holders, and states no per-kilogram delivery price anywhere."
Checked against: lines 29, 30.
Verdict: SUPPORTED
Quote (l.29): "'combined maximum contract value of $2.6 billion' running 'through November 2028.'"; (l.30) "Fourteen companies currently hold CLPS contracts"

### LCC-12

**LCC-12 A `kornuta-2019-commercial-lunar-propellant-architecture.md`**
Register claim: "A commercial architecture sizing a plant that processes 2,450 metric tons of lunar water a year into 1,640 metric tons of propellant, against an executive-summary near-term annual demand of 450 metric tons of lunar-derived propellant and executive-summary revenue of 2.4 billion dollars a year, presented as a closing case."
Checked against: lines 99, 197.
Verdict: SUPPORTED
Quote (l.99): "processes 2,450 MT of lunar water per year into 1,640 MT of propellant per year"; (l.197) "executive summary states a near-term annual demand of 450 MT...Executive-summary revenue is 2.4 billion dollars annually, which matches the all-customers scenario output."

**LCC-12 A `sowers-2019-psr-ice-mining.md`**
Register claim: "Reaches the same conclusion from the Colorado School of Mines thermal-mining study, at an adopted 4 wt% minimum ice concentration that it states is a requirement the prospecting campaign must still meet."
Checked against: line 143.
Verdict: SUPPORTED
Quote (l.143): "a lower bound on acceptable ice concentration was placed at 4wt%' and that this then becomes a requirement on the prospecting campaign"

**LCC-12 A `sowers-2019-thermal-mining-niac-report.md`**
Register claim: "Same author and year cluster, named for the same reason."
Checked against: line 177 (this file); companion file `sowers-2019-psr-ice-mining.md` line 143 for "the same reason."
Verdict: SUPPORTED
Quote (l.177, this file): "all three end the 10-year operational life 'in the black'" — same closing-business-case conclusion as the companion PSR file, same author (Sowers), same year (2019).

**LCC-12 B `jones-2019-cislunar-isru-breakeven.md`**
Register claim: "Under assumptions the authors state are favourable toward lunar ISRU, lunar propellant costs 97 percent more than Earth-launched propellant, the cheapest lunar architecture is $78,000/kg against $40,000/kg for commercial Earth delivery, and breakeven arrives at about 34 to 35 years of sustained 59 t/yr demand."
Checked against: lines 47, 50, 53, 65.
Verdict: SUPPORTED
Quote (l.53): "lunar ISRU propellant was found to be 97 percent more expensive than Earth-based propellant...'under the assumptions used in this study, which the authors see are favorable towards lunar ISRU...'"; Architecture 5 = 78,000; Architecture 2 = 40,000 (lines 47/50); (l.65) "breakeven point...at 35 years of the 59 tonne/year annual demand...at about 34 years"

**LCC-12 B `jones-2020-lunar-propellant-breakeven.md`**
Register claim: "Breakeven is driven by the magnitude and duration of the lunar campaign, and without ISRU systems lasting more than five years before replacement, cislunar demand for a Mars campaign favours delivery from Earth."
Checked against: lines 35, 36.
Verdict: SUPPORTED
Quote (l.35-36): "The magnitude and duration of the lunar campaign, more than the magnitude and duration of the Mars campaign, drives the cost breakeven...Without high-performing, long-lifetime autonomous ISRU systems (stated as greater than 5 years before replacement), the cislunar propellant demand for a Mars campaign favors delivery from Earth."

**LCC-12 C `shishko-2019-lunar-thermal-mining-business-case.md`**
Register claim: "Supplies a framework and a production-rate model and states that it is not a completed cost or net present value result."
Checked against: line 11.
Verdict: SUPPORTED
Quote (l.11): "presenting an engineering-based production-rate model and a 'lean' Business Case Analysis (BCA) spreadsheet framework, not a completed cost or NPV result"

**LCC-12 C `mckeown-2024-space-resource-hurdle-rate.md`**
Register claim: "About 25 percent is the appropriate hurdle rate for development-stage space resource projects, conditional on a legal regime, with 10 percent proposed for reporting; the choice of rate changes what closing means."
Checked against: lines 26-27, 122, 126.
Verdict: PARTIAL
Quote (l.122): "a hurdle rate 'in the range of 25%' is an appropriate starting point for evaluating commercial space resource development-stage projects, conditional on a suitable legal/regulatory regime being in place"; (l.126) "separately proposes a standardised 10% discount rate for project valuation/NPV purposes" — both figures and the conditioning are directly stated and SUPPORTED. The closing clause, "the choice of rate changes what closing means," is NOT stated anywhere in the file; a grep for "close" (word boundary), "closing", "closes" over the full file returns only one unrelated hit (line 75, "closest overall analogue"). That clause is a reasonable inference from the file's content (the very wide 8%-30%+ range of rates other cited studies use) but is not itself asserted by the source.

### LCC-13

**LCC-13 A `olson-2021-lunar-helium3-mining.md`**
Register claim: "Mining concepts since the 1980s, the Mark series miners, and the 2015 to 2018 implantation and extraction experiments at Wisconsin; the only demand-side content is one unquantified sentence that several commercial fusion companies plan reactors as early as the 2030s, with no company names, power ratings, fuel consumption rates or projected prices. States about 100 kg of helium-3 is presently available on Earth."
Checked against: lines 35, 70, 71, 177-178.
Verdict: SUPPORTED
Quote (l.35): "about 100 kg of 3He is presently available on Earth"; (l.70-71) "These companies have secured over a billion dollars to develop their technology and are planning to bring reactors to market as early as the 2030s.' No company names," continuing into "individual funding amounts, reactor power ratings, fuel consumption rates, or projected 3He prices accompany this statement"

**LCC-13 A `wittenberg-1992-he3-resources-review.md`**
Register claim: "More than a million tonnes of solar-wind helium-3 in the fine lunar regolith, argued as sufficient to contribute to Earth generating capacity for several centuries in a deuterium and helium-3 reactor that did not then and does not here exist."
Checked against: lines 35, 43.
Verdict: SUPPORTED
Quote (l.35): "the solar wind has deposited more than 1 million tonnes of 3He in the fine lunar regolith"; (l.43) "a sustained, reliable fusion reactor must still be developed and demonstrated"

**LCC-13 B `gao-2011-neutron-detectors-helium3.md`**
Register claim: "The quantified United States helium-3 market is neutron detection at a projected government demand of about 7,000 litres per year plus about 1,500 litres of other applications, against a supply of 8,000 to 10,000 litres per year; the price rose from $40 to $85 per litre before the shortage to $600 to $1,000 per litre after it, and the documented federal response was to fund substitute detector technologies."
Checked against: lines 98, 101, 103, 118, 136-140.
Verdict: SUPPORTED
Quote (l.98): "annual demand across the U.S. government of about 7,000 liters" (handheld/backpack); (l.101) "about 1,000 liters" (oil/gas); (l.103) "about 500 liters" (moisture gauges) — 1,000+500 = the register's "1,500 litres of other applications"; (l.118) "8,000 to 10,000 liters of helium-3 per year"; (l.136-140) "$40 to $85 per liter" before the shortage, "$600 to $1,000 per liter" after.

### LCC-14

**LCC-14 A `liu-2025-microwave-sintering-lunar-regolith-simulants.md`**
Register claim: "Metered whole-process energy consumption of 69 MJ/kg for the mare simulant CLRS-1 and 98 MJ/kg for the highland simulant SC-080, on 11 g charges in a 1000 W domestic microwave with a silicon-carbide susceptor kiln; the source reports no separately measured power draw and no loss breakdown."
Checked against: lines 24, 51, 92.
Verdict: SUPPORTED
Quote (l.24): "Establishes, for 11 g powder charges...that 11 minutes densifies CLRS-1 and 14 minutes densifies SC-080, with metered whole-process energy consumption of 69 and 98 MJ/kg respectively."; (l.51) "The paper reports no separately measured power draw and no loss breakdown."

**LCC-14 A `azami-2024-lunar-manufacturing-review.md`**
Register claim: "A technique-by-technique review whose energy-consumption column is qualitative; the review reports no absolute kWh per kilogram sintering-energy value anywhere in its text."
Checked against: lines 99, 122.
Verdict: SUPPORTED
Quote (l.99): "Energy Consumption in these tables is a qualitative rating...not a numeric value."; (l.122) "The review reports no absolute kWh/kg (or other per-unit-mass) sintering-energy figure anywhere in the text."

**LCC-14 A `metzger-autry-2023-lunar-landing-pads.md`**
Register claim: "Gives sintering energy per pad rather than per kilogram: 19.7 MWh with 4.7 t of Earth-supplied hardware for a 12 m inner pad and 67.8 MWh for a 27 m outer pad, from a physics-based model whose parameters are drawn from terrestrial technologies because no lunar construction technology is mature, and excludes the cost of maturation from TRL 3/4 to TRL 6."
Checked against: line 41 (energy/pad), line 50 (TRL exclusion).
Verdict: SUPPORTED
Quote (l.41): "sintering the inner pad takes 4.1 days and 19.7 MWh with 4.7 t mass from Earth...sintering the outer pad takes 14.1 days and 67.8 MWh with 4.7 t mass"; (l.50) "These estimates exclude the cost of technology maturation from current TRL-3/4 to TRL-6."

### LCC-15

**LCC-15 A `sanders-2025-nasa-isru-progress-review.md`**
Register claim: "Loose-regolith excavation at TRL 5 in a simulated mission, with the IPEx bucket-drum excavator moving 10 metric tons in 5 days; hard icy-regolith excavation at TRL 5 via the Break the Ice Challenge, 15 teams over 15 days excavating 12,000 kg total at about 800 kg/day with each delivery over a 500 m traverse."
Checked against: lines 93-95, 97-99.
Verdict: SUPPORTED
Quote (l.93-95): "Loose-regolith excavation and delivery — TRL 5 in a simulated mission...the ISRU Pilot Excavator (IPEx), a bucket-drum excavator, moved 10 metric tons in 5 days"; (l.97-99) "Hard icy-regolith excavation and delivery — TRL 5 in simulated excavation/delivery via the Break the Ice Challenge: 15 teams operated for 15 days...excavating 12,000 kg total (800 kg/day) with each delivery over a 500 m traverse"

**LCC-15 B `just-2020-regolith-excavation-review.md`**
Register claim: "Reviews thirteen excavation concepts and excludes technology readiness as a tabulated column because almost all reviewed concepts do not exceed TRL 3; reports that test data are inconsistent across studies, and its own output is a set of key performance parameters future experiments should report."
Checked against: lines 19, 35.
Verdict: SUPPORTED
Quote (l.35): "TRL is explicitly excluded as a tabulated column because almost all reviewed concepts do not exceed TRL 3"; (l.19) "Finds that reported test data are inconsistent across studies...Proposes a baseline set of key performance parameters...that future excavation experiments should report"

**LCC-15 B `rostami2018.md`**
Register claim: "A conceptual paper on adapting terrestrial tunnel boring machines, explicitly carrying no original experimental or design data and no lunar machine design."
Checked against: lines 11, 19.
Verdict: SUPPORTED
Quote (l.11): "Conference paper (conceptual/feasibility discussion, no original experimental or design data)"; (l.19) "Presents no specific LTBM design, prototype, or quantitative lunar-mission engineering analysis"

**LCC-15 B `kokkinis-2024-automated-drilling-mining-review.md`**
Register claim: "A terrestrial mining-automation review whose own conclusion is that infrastructure-less, standardized and safety-mature automation remains an open research target rather than a deployed reality."
Checked against: lines 28-29.
Verdict: SUPPORTED
Quote (l.28-29): "concludes that infrastructure-less, standardized, and safety-mature automation remains an open research target rather than a deployed reality"

---

## A-row axis_statement fairness

| Axis | Verdict | Reason |
|---|---|---|
| LCC-09 | FAIR | Image-derived-vs-DEM disagreement (A/B) and the separate illuminated-area-vs-extractable-power distinction (C) both confirmed above. |
| LCC-10 | FAIR | Fission side (A) vs solar+storage side (B) content matches; Colozza's storage-dominance finding is the crux and is directly quoted above. |
| LCC-11 | FAIR | LEO-quoted figures (tens-thousands $/kg) vs lunar-surface-quoted figures (~$1.2M/kg, or the $2K-$1M/kg sweep) differ by the stated order of magnitude. |
| LCC-12 | FAIR | A "closes" (Kornuta, Sowers) vs B "doesn't close" (Jones 2019/2020) vs C "framework/rate-dependent" (Shishko, McKeown) all independently confirmed. |
| LCC-13 | FAIR | A-side fusion-market rationale (unquantified) vs B-side quantified neutron-detector market (no fusion mention) is exactly the stated disagreement. |
| LCC-14 | FAIR | one_sided axis correctly captures the incommensurability between Liu's metered per-kg figure, Azami's qualitative-only reporting, and Metzger's per-pad (not per-kg) figure. |
| LCC-15 | FAIR | Sanders' NASA-program TRL-5 claims vs Just/Rostami/Kokkinis's much lower/absent TRL findings is a genuine, accurately stated disagreement. |

---

## Tally

- 37 M-rows checked
- 35 SUPPORTED
- 1 PARTIAL (`mckeown-2024-space-resource-hurdle-rate.md`, LCC-12 C)
- 1 CONTRADICTED (`nasa-moon-to-mars-doc.md`, LCC-10 A)
- 0 NOT-FOUND
- 37 of 37 `## Contested` blocks present with the correct `<axis_id> <side_letter>` line
