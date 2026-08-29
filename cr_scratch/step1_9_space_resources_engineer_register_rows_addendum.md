# Step 1.9 addendum: the B6 cluster failure on LCC-10, and a strict re-verification

**Persona:** The Space Resources Engineer
**Corrects:** `cr_scratch/step1_9_space_resources_engineer_register_rows.md`, which stands unedited
**Date:** 2026-08-27

The ratified rows carried one live B6 failure. It is fixed by adding one `M` row and incrementing one
count. The original is not edited; §2 below carries the corrected liftable block and is the one to
lift.

**On the two errors that let it through, briefly, because neither is mine to litigate.** My checker
printed its findings and exited 0, so a failure read as a report line. The orchestrator filtered the
output to summary lines and the B6 line was in what was filtered away. Both are recorded elsewhere.
What is mine is the part that matters here: **I wrote a checker that could not fail and then authored
against it**, which means every assertion it implements was unenforced during authoring, not just B6.
§3 is the answer to that.

---

## 1. The ruling: it belongs on LCC-10, and the cluster heuristic found the right pair for the wrong reason

Three answers were open. I am taking the first — `nasa-2025-moon-to-mars-architecture-add-revc.md`
belongs on LCC-10 — and the route to it matters more than the answer, because my first instinct was
the third answer and the measurement overturned it.

### 1.1 What the two documents are

They are not two summaries of one source, which is what B6's name suggests it is catching.

| | `nasa-2025-fission-surface-power-directive.md` | `nasa-2025-moon-to-mars-architecture-add-revc.md` |
|---|---|---|
| Type | Internal policy directive memorandum, 3 pages | NASA Technical Publication, TP-20250010956 / ESDMD-001 Rev C |
| Author | Office of the Administrator | ESDMD Strategy and Architecture Office |
| Date | 4 August 2025 | 12 December 2025 |
| Content | 100 kWe minimum, up to 15 t lander allocation, Q1 FY30 readiness, closed Brayton | Objective-to-function decomposition; element list; technology and data gap catalogs |
| Power figures | four | **none** |

Different offices, different document classes, four months apart, no shared content. They share the
institutional author token `nasa` and the year. **My first conclusion was therefore answer three: the
cluster is spurious and the regex `^([a-z0-9-]+?-\d{4})-` is treating an institutional author as if it
were a personal author.** That conclusion is half right and it is not sufficient, and the reason is
that B6's warrant is a retrieval warrant, not a bibliographic one. So I measured retrieval instead of
arguing from the filenames.

### 1.2 The measurement, which overturned my first conclusion

Scored with `literature_search.js`'s own `scoreFile` against all 152 files, IDF-weighted, unmodified.

| Question | rank of the directive | rank of the ADD |
|---|---|---|
| LCC-10 `probe_pos`: *Is fission or solar with storage lighter per kilowatt at the lunar south pole?* | **#3**, 1.99 | **#125**, 0.00 |
| *What is the Lunar Nuclear Fission System?* | **#1**, 1.99 | **#125**, 0.00 |
| *What power does a lunar surface fission reactor provide?* | **#1**, 3.07 | **#125**, 0.00 |
| LCC-10's ten `match_keys` as a bare query | **#2**, 2.59 | **#112**, 0.00 |
| *What does the NASA fission surface power directive require?* | **#1**, 10.48 | **#6**, 3.66 |
| *What is NASA planning for 2025 on the Moon?* | **#2**, 8.36 | **#1**, 9.06 |

**Read the first four rows and then the last one.** On LCC-10's own axis the two files are not
interchangeable and nothing like it: the ADD scores exactly zero and sits in the bottom quartile of
the corpus. On the coordinator's stated vector — retrieval surfacing the unregistered twin *on a
fission question* — the hazard does not exist, and I could have said so and stopped.

**The last row is where the hazard actually lives, and it is real.** On a programme-state question the
two files are separated by 0.70 points at ranks #1 and #2. Before this fix, the directive carried a
register block and the ADD did not, so **which of two near-tied files the search happened to return
decided whether the register engaged at all.** A reader asking what NASA is doing on the Moon in 2025
would get the ADD, would get its Lunar Nuclear Fission System element, and would get no contested-claim
context — while the file 0.70 points behind it would have fired the LCC-10 detector on `fission`,
`reactor` and `power`. That is precisely the one-sided answer that looks clean, arriving through a
door I had not checked.

So B6 flagged the right pair. Its stated reason — near-duplicate filenames — is not why the pair is
dangerous. A crude assertion caught a real defect for a reason that does not survive inspection, which
is worth more than an elegant assertion that catches nothing.

### 1.3 Why the ADD is an honest member of LCC-10 side A and not an absence wearing a side letter

I held myself to the rule I set in §5.1 of the original: *a side whose content is an absence is not a
side.* This does not breach it, on three grounds.

**It is a member, not a side.** It joins the existing side A alongside Poston, Oleson and the
directive. Side count is unchanged at two. Nothing is fabricated to reach a class.

**Its position is a statement, not a gap.** LCC-10 asks whether fission or solar-plus-storage is
lighter per kilowatt at the pole. The ADD's answer is that NASA's programme of record has adopted a
Lunar Nuclear Fission System as a baselined element, in Revision C, **and states no mass allocation
for it**. Combined with the other three members, that completes a specific finding: the only mass
number on the programme side of this axis is the directive's 15 t requirement, which is 0.150 t/kWe as
a *requirement* against Oleson's 0.251 t/kWe as an *achieved* point design.

**The precedent is already in the rows and it is Poston.** `poston-2020-krusty-reactor-design.md` is on
LCC-10 with a position saying the paper prints no specific-power figure anywhere. I kept it because
that absence is load-bearing: the corpus's flagship fission primary constrains no mass-per-kilowatt
claim. The ADD is the same shape one level up.

**What I will not claim.** I would not have added this row unprompted. A check I wrote, and then
defeated by exiting 0, found something my own reading missed. That is the whole argument for
assertions that fail loudly, and it is more persuasive made against myself than in the abstract.

### 1.4 The cluster definition: I am reporting a limit, not proposing a threshold

The prefix heuristic conflates *same author-year* with *near-duplicate*. Filename-token Jaccard across
all nine multi-member prefix clusters in `lsei/literature`:

| cluster | n | min pairwise Jaccard | genuinely near-duplicate? |
|---|---|---|---|
| `sanders-2025` | 2 | 0.86 | yes, two summaries of one deck |
| `kornuta-2019` | 2 | 0.83 | yes |
| `colaprete-2010` | 2 | 0.67 | yes |
| `paige-2010` | 2 | 0.50 | yes |
| `schreiner-2016` | 2 | 0.43 | yes |
| `sowers-2019` | 4 | 0.38 | yes |
| `ehricke-1981` | 2 | 0.29 | **no** — two different papers |
| `barnett-2025` | 2 | 0.22 | **no** — two different papers |
| `nasa-2025` | 2 | 0.18 | **no** — different offices, four months apart |

**I am not proposing a Jaccard cut-off, and the table is why.** The separation between the three
non-duplicates and the six duplicates is 0.29 against 0.38 — a nine-point gap on nine samples, with
`sowers-2019` sitting closer to `ehricke-1981` than to `schreiner-2016`. Writing a constant into an
assertion on that evidence would be the error the 1.8 spec refuses when it declines to set K, repeated
in a smaller field. The heuristic is crude and over-inclusive, and over-inclusive is the correct
direction for an assertion whose false positives cost a paragraph of reading and whose false negatives
cost a one-sided answer.

**What I am reporting is a dated, latent failure.** `ehricke-1981` and `barnett-2025` are same-author,
different-paper pairs, both wholly unregistered today and therefore silent. **The moment 1.10 or 2.16
registers one member of either pair, B6 fires and it will be a false positive.** Whoever meets it
should apply the test I applied here rather than re-deriving it:

> Not "are these the same source" but: **would a question that retrieves one plausibly retrieve the
> other, and does only one of them carry a register block?** Score both with `scoreFile` against a
> handful of questions the axis would fire on, and a handful the pair's shared tokens would fire on.
> If they are near-tied anywhere and only one is registered, register the other. If they are never
> close, name the omission in `position` under B6's own escape clause.

### 1.5 The correction, in full

One row added to LCC-10 side A, inserted after the directive so the side stays contiguous, and
`member_count` on the `H` row moved from 80 to 81. Nothing else in the block changes; the diff is two
lines.

```
1c1
< H  lsei/literature  2026-08-27  7f97983  15  80
---
> H  lsei/literature  2026-08-27  7f97983  15  81
63a64
> M  LCC-10  A  nasa-2025-moon-to-mars-architecture-add-revc.md  The Moon to Mars Architecture ...
```

Both `nasa-2025` files now carry exactly one register row each, so on the programme-state question
where they sit 0.70 points apart, **whichever one search returns, the detector has a block to read.**
That is the defect closed rather than the assertion silenced.

---

## 2. THE CORRECTED LIFTABLE BLOCK

**This block supersedes the block in the original deliverable for lifting purposes.** The original's
markers are left in place so the ratified rows survive as the record; lift this one. Markers are named
distinctly so a `sed` cannot pick up both.

```
sed -n '/^<!-- BEGIN oracle\/REGISTER.tsv (lunar rows, corrected) -->$/,/^<!-- END oracle\/REGISTER.tsv (lunar rows, corrected) -->$/p' \
  cr_scratch/step1_9_space_resources_engineer_register_rows_addendum.md | sed '1d;$d' | sed 's/\r$//' > lunar.tsv
awk -F'\t' '{print $1, NF}' lunar.tsv | sort | uniq -c
node tools/ecr_verify.js lunar.tsv lsei/literature; echo "EXIT=$?"
```

Expected: `1 H 6`, `15 A 9`, `81 M 5`, then `ALL PASS` and `EXIT=0`. Run in this session, output as
stated in §3.

**Extract to a `.tsv`; do not hand `ecr_verify.js` the markdown.** I characterised the limitation
more precisely than it was handed to me, because the precise version is reassuring and the vague one
is not. Measured: on a CRLF `.md` it prints `no BEGIN/END oracle/REGISTER.tsv block` and **exits 2**.
It fails closed and loudly; it does not silently verify nothing. On an LF `.md` the same path works.
The root cause is one regex in `loadRows`, which requires `-->` to be followed immediately by `\n`
and so cannot match a marker line ending `-->\r\n`. And the `sed 's/\r$//'` above is belt-and-braces
rather than required: `loadRows` splits a `.tsv` on `/\r?\n/`, so carriage returns inside an
extracted `.tsv` are already harmless — verified by running the same rows both ways to the same exit
status.

<!-- BEGIN oracle/REGISTER.tsv (lunar rows, corrected) -->
H	lsei/literature	2026-08-27	7f97983	15	81
A	LCC-01	two_sided	cabeus,ice,content,concentration,water,lcross,lend,wt	the measurement footprint and the sampled depth	Three measurement methods report the water-ice concentration at Cabeus crater and their central values span about an order of magnitude.	ice-grade-evidence,ice-grade-break,polar-cold-trap-water	What is the water ice concentration in the regolith at Cabeus crater?	How does LEND neutron albedo vary with relief height and average annual temperature?
A	LCC-02	two_sided	surface,exposed,ice,shadowcam,reflectance,detection,frost	the instrument detection limit and the areal extent the claim covers	Two studies by the same lead author, eight years and two instruments apart, report opposite headline results on whether water ice is exposed at the surface inside permanently shadowed regions.	polar-cold-trap-water	Is water ice exposed at the surface inside the lunar permanently shadowed regions?	What surface temperature is measured inside a lunar permanently shadowed region?
A	LCC-03	two_sided	cold,trap,traps,micro,distribution,buried,deposits,gardening,prospecting	the spatial scale the model resolves, from centimetre micro cold traps to a mining-scale deposit	Whether polar water ice is widespread, shallow and areally accessible, or buried, patchy and shuffled by cratering at the scale a mine would work.	polar-cold-trap-water,habitat-water-terrain	Is polar water ice widespread and shallow, or buried in patches at mining scale?	At what temperature is water ice stable in a lunar cold trap?
A	LCC-04	two_sided	extraction,energy,kwh,specific,sublimation,thermal,mining,microwave,luwex,water	the process boundary (extraction only, or extraction through capture and liquefaction) and the scale (bench kilograms per run, or tonnes per year)	Published specific energies for extracting water from icy lunar regolith span more than an order of magnitude and are drawn at different process boundaries and at scales separated by four orders of magnitude.	E1,kP,duty,energy-per-tonne,energy-per-kilogram,bilinear-water-law	How much energy does it take to extract a kilogram of water from lunar regolith?	What simulant did the LUWEX campaign use to stand in for icy regolith?
A	LCC-05	one_sided	capture,capturing,recovery,efficiency,yield,trap	the denominator: recovery measured against initial ice mass, or capture measured against extracted mass	What fraction of the water released from icy regolith is actually recovered, and against which denominator the fraction is reported.	captureEff,capture-derate,bilinear-water-law	What water capture efficiency has actually been demonstrated in a test?	What contaminant inhibited the cold trap during the LUWEX experiments?
A	LCC-06	two_sided	beneficiation,aqua,factorem,magnetic,electrostatic,pneumatic,separation,sublimation,power	the unconfirmed ice-morphology premise, the ground-plastic analogue that stood in for ice, and the throughput of each architecture being compared	Whether mechanical and electrostatic beneficiation of ice grains needs far less surface power than thermal sublimation, and what the power-reduction figure is conditional on.	energy-per-tonne,capture-derate	Does mechanical beneficiation of lunar ice grains need less surface power than thermal sublimation?	What magnetic susceptibility does olivine have at permanently shadowed region temperature?
A	LCC-07	two_sided	oxygen,o2,lox,carbothermal,ilmenite,reduction,kwh,energy,yield,electrolysis	thermal energy against electrical energy, and the boundary (reactor only, or end-to-end through liquefaction and storage)	Published specific energies for lunar oxygen production run from about 24 to about 93 kWh per kilogram, and two NASA sources on the same carbothermal programme two years apart report incompatible yields.	oxygen-extraction-energy	How many kilowatt hours does it take to produce a kilogram of oxygen from lunar regolith?	What temperature does carbothermal reduction of lunar regolith run at?
A	LCC-08	false_pair	ilmenite,mare,highland,feedstock,beneficiation,mre,electrolysis,polar,regolith	the feedstock the route requires: ilmenite-rich mare regolith, any regolith, or any silicate	Oxygen production routes state their energy per kilogram against different feedstocks, and every landing site in this corpus architecture studies is polar highland terrain.	bound-oxygen-mare,oxygen-extraction-energy	Does the ilmenite reduction energy figure apply at a south polar landing site?	At what temperature does molten regolith electrolysis operate?
A	LCC-09	two_sided	illumination,illuminated,sunlight,shackleton,solar,power,shadow,polar	illuminated ground area against extractable electrical power, and the observer height above local topography	How much sunlight the lunar south pole receives is answered by image-derived and by terrain-model methods that disagree at the same points, and how much electrical power that sunlight yields is a different quantity again.	persistently-lit-terrain,solar-mass-allocation,storage-specific-energy	How much solar power is available at the lunar south pole?	How long a shadow does a one metre boulder cast near the lunar pole?
A	LCC-10	two_sided	fission,reactor,solar,kwe,storage,night,battery,krusty,kilopower,power	the site latitude and the darkness duration the storage is sized for	Whether the energy storage needed to carry a lunar night cancels the mass advantage that solar arrays hold over a fission reactor per kilowatt electric.	fFis,fSol,fission-specific-power,solar-mass-allocation,zero-intercept-mass-law,storage-specific-energy	Is fission or solar with storage lighter per kilowatt at the lunar south pole?	What fuel enrichment does the KRUSTY reactor use?
A	LCC-11	false_pair	landed,cost,launch,starship,clps,delivery,price,leo,transportation,kilogram	the destination the price is quoted to, low Earth orbit or the lunar surface, and whether the figure is an analyst estimate, a modelling scenario, or a contracted price	Dollar-per-kilogram figures in this corpus are quoted to two different destinations that differ by roughly three orders of magnitude, and are read as if they were the same quantity.	ladder-range-and-floor,shared-flight-price,clps-small-lander-cost,leo-to-surface-multiplier	What does it cost to land a kilogram on the lunar surface?	How many CLPS task orders have flown and which vendors carried them?
A	LCC-12	two_sided	breakeven,propellant,price,commercial,business,hurdle,revenue,demand	the assumed propellant price, the assumed annual demand, and the discount rate	Whether the lunar propellant business case closes, and under whose assumed price, volume and cost of capital.	industrial-plant-price,break-even-sales-price,offtake-record,product-payback-ranking	Does the lunar propellant business case close?	What annual propellant demand did the Evolvable Mars Campaign assume?
A	LCC-13	two_sided	helium,fusion,deuterium,tritium,detectors,implanted,regolith	the market named, deuterium and helium-3 fusion power or terrestrial neutron detection, and the annual volume that market consumes	What demand a lunar helium-3 supply would serve: the deuterium and helium-3 fusion power market these mining studies name, or the terrestrial neutron-detector market this corpus quantifies.	helium-procurement-energy	Who would buy lunar helium-3?	What isotopic separation technique recovers helium-3 from evolved lunar gases?
A	LCC-14	one_sided	sintering,sintered,microwave,construction,strength,energy,regolith	whether the figure is metered whole-process electrical energy at bench scale, or a modelled sintering energy flux inside a system boundary the source draws	What energy it takes to sinter a kilogram of lunar regolith into a construction product.	eSinter,ySinter,op_const,sintering-specific-energy,sintering-yield	How much energy does it take to sinter a kilogram of lunar regolith?	What compressive strength does a laser-melted regolith paving tile reach?
A	LCC-15	two_sided	excavation,excavator,excavators,excavating,bucket,drum,regolith,tons,rate	the gravity, duration and wear accumulation of the demonstration, against an annualised rate normalised to plant mass	How much regolith a lunar excavator moves, and at what technology readiness the excavation step actually stands.	kExc,throughput-coefficient,productive-plant-mass	How much regolith can a lunar excavator move in a year?	How deep can a low-mass excavator cut in lunar gravity?
M	LCC-01	A	colaprete-2010-lcross-water.md	Mean water concentration 5.6 plus or minus 2.9 percent by mass across three post-impact averaging periods, derived as a water-to-dust mass ratio inside the spectrometer field of view; the paper states no excavation depth or sampled volume anywhere.
M	LCC-01	A	colaprete-2010-lcross-ejecta-water-detection.md	A second summary of the same Colaprete 2010 paper; both leaves are named so that the invariant cannot be satisfied by whichever member tokenizes better. Records that the denominator is a radiative-transfer dust mass of about 2175 kg, not a weighed regolith sample.
M	LCC-01	B	litvak-2024-lend-cabeus-water-ice.md	Subsurface water-ice content averaged over Cabeus-1 is 0.49 plus or minus 0.05 percent by mass, maximum about 0.7 percent at the crater bottom where the LCROSS impact site sits; collimated neutron, 2009 to 2023, model-derived from neutron suppression.
M	LCC-01	C	luchsinger-2021-lcross-water-modeling.md	Re-modelling the same LCROSS plume gives 8.2 wt% at an assumed regolith density of 1.5 g/cm3 or 4.3 wt% at 3.0 g/cm3, so the derived concentration moves by a factor of two on an assumption the observation does not constrain.
M	LCC-02	A	li-2018-surface-exposed-water-ice.md	Reports direct evidence of surface-exposed water ice in the polar regions from Moon Mineralogy Mapper reflectance, at low abundance and in patches.
M	LCC-02	B	li-2026-shadowcam-psr-water-ice.md	ShadowCam finds no evidence of widespread surface water ice above a detection limit of 20 to 30 wt%, identifies a few small locations possibly above 10 wt%, does not rule out widespread ice at lower content, and states that a detection limit below 1 wt% is what would settle it.
M	LCC-03	A	hayne-2020-micro-cold-traps.md	Micro cold traps hold roughly 10 to 20 percent of the Moon permanent water cold-trap area, bringing the total to about 40,000 km2, which implies polar water is more accessible than large-crater estimates alone suggest.
M	LCC-03	B	cannon-2020-lunar-ice-geologic-model.md	A geologic model at mining scales in which ice is buried beneath dry overburden, patchy in lateral extent, and repeatedly shuffled by impact gardening.
M	LCC-03	C	schorghofer-2026-current-theories-lunar-ice.md	The standard cold-trap model is consistent with the major observational constraints, with a few less-established observational claims unaccounted for; names the key measurements still needed.
M	LCC-04	A	sowers-2019-thermal-mining-ice.md	Solar thermal sublimation under a capture tent; the article states no specific-energy figure, and roughly 1.3 to 2.7 kWh/kg is derivable from its own power-versus-concentration figures at 4 wt% and 1,600 t/yr, extraction only, concept level.
M	LCC-04	A	sowers-2019-psr-ice-mining.md	Same author and year cluster, named so the invariant cannot be satisfied by the member that tokenizes best rather than the one carrying the claim.
M	LCC-04	A	sowers-2019-thermal-mining-niac.md	Same author and year cluster, named for the same reason.
M	LCC-04	A	sowers-2019-thermal-mining-niac-report.md	Same author and year cluster, named for the same reason.
M	LCC-04	B	kiewiet-2026-luwex-water-extraction.md	Measured recovery energy efficiency 22.88 to 66.33 g/kWh, equivalently about 15 to 44 kWh/kg, for an integrated extraction, capture and liquefaction chain at up to 13 kg of simulant per run at 5 wt% ice, targeting TRL 4 in hardware the source says approached TRL 5 conditions.
M	LCC-04	C	wang-2025-microwave-water-production.md	Microwave heating of a 70 mm by 70 mm cryogenic simulant cylinder gives an energy cost of 1.9 to 10.0 W.h/g at 800 W, extraction only; collection ratio is 24 to 48 percent against an extraction ratio of 76 to 96 percent, and the bench runs at positive pressure rather than vacuum.
M	LCC-05	A	kiewiet-2026-luwex-water-extraction.md	Water recovery of 50 to 73 percent and capture percentages up to 89 percent across four runs; recovery percentage is recovered mass over initial ice mass while capture percentage is recovered over extracted, and the two are 73 and 89 percent in the same best run.
M	LCC-05	A	sanders-2025-nasa-isru-progress-review.md	PVEx reached TRL 5/6 with 43 to 56 percent water extraction at 4 to 6 wt% for a 5 cm inner-diameter, 0.5 m core; LADI targeted 75 percent extraction efficiency and was cancelled before TRL 5; capture and cleanup by cold trap and freeze distillation stand at TRL 3/4 with data to 0.1 kg/hr vapor flow.
M	LCC-05	A	sanders-2025-nasa-lunar-isru-progress-review.md	A second summary of the same Sanders and Kleinhenz 2025 deck, named so the invariant cannot be satisfied by the wrong member of the pair.
M	LCC-05	A	linne-2020-lunar-water-pilot-plant.md	A COMPASS conceptual design that assumes 75 percent water extraction and capture efficiency for an auger-dryer reactor; the figure is a design assumption in a point design, not a measurement.
M	LCC-06	A	sowers-2019-thermal-mining-ice.md	Solar thermal sublimation under a capture tent at 500 kW for 1,600 t/yr of water at 4 wt%, NIAC and Colorado School of Mines concept level, with no dependence on the physical form the ice takes.
M	LCC-06	A	sowers-2019-psr-ice-mining.md	Same author and year cluster, named so the axis cannot be satisfied by whichever member tokenizes best.
M	LCC-06	A	sowers-2019-thermal-mining-niac.md	Same author and year cluster, named for the same reason.
M	LCC-06	A	sowers-2019-thermal-mining-niac-report.md	Same author and year cluster, named for the same reason.
M	LCC-06	B	metzger-2020-aqua-factorem.md	States a 98.3 percent surface-segment power reduction, being 50 kW against the 2.8 MW of the Kornuta baseline, at an annual output of 27,900 kg of water which the report itself gives as about 1 percent of that baseline; and a separate 97.5 percent reduction against an 800 kW thermal comparison. Ground plastic sandblasting media stood in for ice in every magnetic, pneumatic and size-sorting test, the analogue electrostatic properties are stated as undetermined, and the basalt entry in the triboelectric series was set by analogy with no quantitative data.
M	LCC-06	B	metzger-2021-aqua-factorem.md	The companion report carrying the same 98.3 and 97.5 percent figures and the grain-size premise of roughly 70 micrometres from M3 or 8 micrometres from LCROSS; the third member of this cluster, metzger-2021-aqua-factorem-2.md, is a superseded duplicate held outside the corpus and is named here so its absence is recorded rather than silent.
M	LCC-07	A	leger-2025-energy-oxygen-moon.md	24.3 plus or minus 5.8 kWh per kg of liquid oxygen by hydrogen reduction of ilmenite at 10 wt% ilmenite, end-to-end from excavation through liquefaction and zero-boil-off storage, with all process heat billed as electricity.
M	LCC-07	B	colozza-2010-solar-lunar-oxygen.md	About 39 kWh per kg O2 derivable from the paper own power and rate figures at a 1,000 kg/yr carbothermal demonstration scale, of which over 82 percent is thermal and the remainder electrical; the paper states no specific-energy figure as such.
M	LCC-07	C	nasa-2023-card-carbothermal-reduction.md	Brassboard yields of 13.42, 11.53, 15.79 and 10.77 g O2 per kWh thermal across four runs, equivalently about 63 to 93 kWh per kg thermal, with no stated measurement uncertainty or replicate count and no formal TRL stated for the unit.
M	LCC-07	C	azami-2024-lunar-manufacturing-review.md	Restates the same four CaRD yields and assigns the project TRL 6, a number the CaRD deck itself does not state.
M	LCC-07	D	sanders-2025-nasa-isru-progress-review.md	Carbothermal reduction at TRL 5, greater than 20 g O2 per kW-hr thermal, equivalently under 50 kWh per kg thermal, with single melts equivalent to 140 kg O2/yr and greater than 99.7 percent carbon recovery.
M	LCC-07	D	sanders-2025-nasa-lunar-isru-progress-review.md	A second summary of the same 2025 deck, named so the invariant cannot be satisfied by the wrong member of the pair.
M	LCC-08	A	sargeant-2020-hydrogen-reduction-ilmenite-static.md	Hydrogen reduction of ilmenite in a static bed; the route needs ilmenite-rich feedstock, which is a mare mineralogy.
M	LCC-08	A	leger-2025-energy-oxygen-moon.md	The 24.3 kWh/kg figure is computed for 10 wt% ilmenite feedstock with a beneficiation enrichment factor, and the paper own site map favours High-Ti mare regions.
M	LCC-08	B	schreiner-2016-molten-regolith-electrolysis-sizing.md	Molten regolith electrolysis takes any regolith with no added reagents, so feedstock mineralogy sets efficiency rather than admissibility.
M	LCC-08	B	schreiner-2016-mre-sizing-model.md	A second summary of the same Schreiner sizing work, named so the invariant cannot be satisfied by the wrong member of the pair.
M	LCC-08	B	sibille-2012-joule-heated-mre.md	Joule-heated molten regolith electrolysis, same feedstock-agnostic premise.
M	LCC-08	C	nasa-2023-card-carbothermal-reduction.md	Carbothermal reduction takes any silicate and needs carbon recycling rather than a particular mineral.
M	LCC-08	C	colozza-2010-solar-lunar-oxygen.md	Carbothermal at 1900 C on any silicate, with an assumed O2 yield of 15 to 20 wt% independent of ilmenite content.
M	LCC-08	D	sanders-2025-nasa-isru-progress-review.md	Assigns maturity by terrain: MRE and carbothermal at TRL 5/6 for polar highland regolith, hydrogen and CO reduction at TRL 5 for mare.
M	LCC-08	D	sanders-2025-nasa-lunar-isru-progress-review.md	A second summary of the same deck, named so the invariant cannot be satisfied by the wrong member of the pair.
M	LCC-09	A	speyerer-2013-persistently-illuminated-regions.md	Image-derived from one lunar year of LROC coverage at 100 m/pixel: localized regions illuminated for nearly 94 percent of the year with a longest single eclipse of 43 hours; the image-derived values at the same nominal points are consistently lower than the coarser terrain-model values, and the study found both peaks the simulations missed and shadowed pockets they had marked as lit.
M	LCC-09	A	speyerer-2012-in-search-of-shade.md	At the most-illuminated pixel the terrain-model simulations gave 82 to 89 percent against 71 percent from the higher-resolution image-derived product, and small permanently shadowed craters sit inside the persistently illuminated rim terrain.
M	LCC-09	B	glaser-2014-south-pole-illumination.md	LOLA terrain-model simulation over the 18.6-year precessional cycle: Connecting Ridge at 92.27 percent accumulated light at 2 m above ground and 95.65 percent at 10 m, with longest continuous darkness typically 3 to 5 days.
M	LCC-09	C	ross-2023-lunar-south-pole-solar-power.md	Overshadowing of illuminated ground by sunward panels limits extractable time-averaged power to about 55 to 63 MW at greater than 70 percent illumination for panels up to 20 m, falling to about 6 MW at greater than 90 percent; illuminated area and extractable power are not the same quantity.
M	LCC-10	A	poston-2020-krusty-reactor-design.md	A 1 kWe prototype that achieved nuclear-powered operation in March 2018; the paper prints no specific-power figure in W/kg for the reactor or the system, so it constrains no mass-per-kilowatt claim.
M	LCC-10	A	oleson-2022-deployable-fsp.md	A 40 kWe point design whose three elements total 10,046 kg against a 6,000 kg goal the paper states it exceeded, giving 3.98 W/kg overall or 5.45 W/kg on the reactor element alone; the paper states no system-level specific power itself.
M	LCC-10	A	nasa-2025-fission-surface-power-directive.md	Directs a forthcoming procurement at a minimum 100 kWe with a heavy-class lander allocation of up to 15 metric tons and launch readiness by Q1 FY30; the allocation is a requirement, not a demonstrated mass.
M	LCC-10	A	nasa-2025-moon-to-mars-architecture-add-revc.md	The Moon to Mars Architecture Definition Document Revision C, dated 12 December 2025, adds a Lunar Nuclear Fission System to the programme-of-record element list and states no power rating, no mass allocation and no specific mass for it anywhere; it is a framework document that commits no budget or schedule.
M	LCC-10	B	ross-2023-lunar-south-pole-solar-power.md	Solar power near the pole is available nearly continuously only from vertically deployed panels in restricted high-illumination regions, and if solar is inadequate even in a best case, fission becomes the only option.
M	LCC-10	B	csank-2022-powering-the-moon.md	Sizes an Artemis baseline of about 90 kW with islanded solar and battery sub-grids, and anchors the transition on a 40 kWe fission demonstration; cable mass dominates total microgrid mass.
M	LCC-10	B	colozza-2020-lunar-base-power-comparison.md	For continuous day and night operation the reactor is lowest mass in every case and energy storage dominates every continuous photovoltaic case; every case is sited at 30 degrees north over a 708.33 hour day-night cycle, and the document contains no polar illumination model, no eclipse statistic and no permanently shadowed region.
M	LCC-10	B	pappa-2021-relocatable-solar-array.md	A relocatable vertical solar array concept for the polar high-illumination regions.
M	LCC-10	B	belbin-2024-vsat-grd-demonstrator.md	A vertical solar array technology ground demonstrator.
M	LCC-11	A	payload-research-starship-cost.md	A trade-press analyst estimate of about $500 per kilogram to low Earth orbit for an expendable Starship V1, with Falcon 9 expendable likely above $2,000 per kilogram; the piece labels its own cost figures as Payload estimates rather than stated or audited prices.
M	LCC-11	A	jones-superheavylift-final20260614.md	A fully reusable Starship headline range of $67 to $900 per kilogram to low Earth orbit across three scenarios the authors describe as hypothetical and illustrative.
M	LCC-11	A	adilov-2022-launch-cost-reductions.md	Per-kilogram launch cost to low Earth orbit fell 5.5 percent per year unadjusted over the study period, and the authors state that detailed launch cost data are not publicly available because actual contracts are private.
M	LCC-11	B	nasa-2023-card-carbothermal-reduction.md	States $1.2M per kilogram to land on the lunar surface, given as a motivation on the first slide with no derivation.
M	LCC-11	B	metzger-autry-2023-lunar-landing-pads.md	Uses surface transportation cost as a swept parameter at $1M, $300K, $100K, $10K, $2K and $300 per kilogram, with a stated context of roughly $1M/kg in the next five years falling toward $2K/kg within twenty.
M	LCC-11	B	nasa-clps-delivery-timeline.md	A manifest of eleven CLPS surface deliveries against a 2024 to 2028 axis; it prints no contract value and no per-kilogram price.
M	LCC-11	B	nasa-clps-procurement-vignette.md	States a combined maximum contract value of $2.6 billion through November 2028 across fourteen contract holders, and states no per-kilogram delivery price anywhere.
M	LCC-12	A	kornuta-2019-commercial-lunar-propellant.md	A commercial architecture producing 450 metric tons of propellant from 2,450 metric tons of processed lunar water, generating $2.4 billion of revenue, presented as a closing case.
M	LCC-12	A	kornuta-2019-commercial-lunar-propellant-architecture.md	A second summary of the same collaborative study, named so the invariant cannot be satisfied by the wrong member of the pair.
M	LCC-12	A	sowers-2019-thermal-mining-ice.md	Reaches the same conclusion from the Colorado School of Mines thermal-mining study, at an adopted 4 wt% minimum ice concentration that it states is a requirement the prospecting campaign must still meet.
M	LCC-12	A	sowers-2019-psr-ice-mining.md	Same author and year cluster, named so the axis cannot be satisfied by whichever member tokenizes best.
M	LCC-12	A	sowers-2019-thermal-mining-niac.md	Same author and year cluster, named for the same reason.
M	LCC-12	A	sowers-2019-thermal-mining-niac-report.md	Same author and year cluster, named for the same reason.
M	LCC-12	B	jones-2019-cislunar-isru-breakeven.md	Under assumptions the authors state are favourable toward lunar ISRU, lunar propellant costs 97 percent more than Earth-launched propellant, the cheapest lunar architecture is $78,000/kg against $40,000/kg for commercial Earth delivery, and breakeven arrives at about 34 to 35 years of sustained 59 t/yr demand.
M	LCC-12	B	jones-2020-lunar-propellant-breakeven.md	Breakeven is driven by the magnitude and duration of the lunar campaign, and without ISRU systems lasting more than five years before replacement, cislunar demand for a Mars campaign favours delivery from Earth.
M	LCC-12	C	shishko-2019-lunar-thermal-mining-business-case.md	Supplies a framework and a production-rate model and states that it is not a completed cost or net present value result.
M	LCC-12	C	mckeown-2024-space-resource-hurdle-rate.md	About 25 percent is the appropriate hurdle rate for development-stage space resource projects, conditional on a legal regime, with 10 percent proposed for reporting; the choice of rate changes what closing means.
M	LCC-13	A	olson-2021-lunar-helium3-mining.md	Mining concepts since the 1980s, the Mark series miners, and the 2015 to 2018 implantation and extraction experiments at Wisconsin; the only demand-side content is one unquantified sentence that several commercial fusion companies plan reactors as early as the 2030s, with no company names, power ratings, fuel consumption rates or projected prices. States about 100 kg of helium-3 is presently available on Earth.
M	LCC-13	A	wittenberg-1992-he3-resources-review.md	More than a million tonnes of solar-wind helium-3 in the fine lunar regolith, argued as sufficient to contribute to Earth generating capacity for several centuries in a deuterium and helium-3 reactor that did not then and does not here exist.
M	LCC-13	B	gao-2011-neutron-detectors-helium3.md	The quantified United States helium-3 market is neutron detection at a projected government demand of about 7,000 litres per year plus about 1,500 litres of other applications, against a supply of 8,000 to 10,000 litres per year; the price rose from $40 to $85 per litre before the shortage to $600 to $1,000 per litre after it, and the documented federal response was to fund substitute detector technologies.
M	LCC-14	A	liu-2025-microwave-sintering-lunar-regolith-simulants.md	Metered whole-process energy consumption of 69 MJ/kg for the mare simulant CLRS-1 and 98 MJ/kg for the highland simulant SC-080, on 11 g charges in a 1000 W domestic microwave with a silicon-carbide susceptor kiln; the source reports no separately measured power draw and no loss breakdown.
M	LCC-14	A	azami-2024-lunar-manufacturing-review.md	A technique-by-technique review whose energy-consumption column is qualitative; the review reports no absolute kWh per kilogram sintering-energy value anywhere in its text.
M	LCC-14	A	metzger-autry-2023-lunar-landing-pads.md	Gives sintering energy per pad rather than per kilogram: 19.7 MWh with 4.7 t of Earth-supplied hardware for a 12 m inner pad and 67.8 MWh for a 27 m outer pad, from a physics-based model whose parameters are drawn from terrestrial technologies because no lunar construction technology is mature, and excludes the cost of maturation from TRL 3/4 to TRL 6.
M	LCC-15	A	sanders-2025-nasa-isru-progress-review.md	Loose-regolith excavation at TRL 5 in a simulated mission, with the IPEx bucket-drum excavator moving 10 metric tons in 5 days; hard icy-regolith excavation at TRL 5 via the Break the Ice Challenge, 15 teams over 15 days excavating 12,000 kg total at about 800 kg/day with each delivery over a 500 m traverse.
M	LCC-15	A	sanders-2025-nasa-lunar-isru-progress-review.md	A second summary of the same 2025 deck, named so the invariant cannot be satisfied by the wrong member of the pair.
M	LCC-15	B	just-2020-regolith-excavation-review.md	Reviews thirteen excavation concepts and excludes technology readiness as a tabulated column because almost all reviewed concepts do not exceed TRL 3; reports that test data are inconsistent across studies, and its own output is a set of key performance parameters future experiments should report.
M	LCC-15	B	rostami2018.md	A conceptual paper on adapting terrestrial tunnel boring machines, explicitly carrying no original experimental or design data and no lunar machine design.
M	LCC-15	B	kokkinis-2024-automated-drilling-mining-review.md	A terrestrial mining-automation review whose own conclusion is that infrastructure-less, standardized and safety-mature automation remains an open research target rather than a deployed reality.
<!-- END oracle/REGISTER.tsv (lunar rows, corrected) -->

---

## 3. (c) Re-running every assertion strictly, and proving the zero

The question was the right one: if the rows were authored against a checker that cannot fail, then
every assertion it implements was unenforced during authoring, not just B6. So the answer cannot be
"I re-ran it and it was fine." It has to be a measured zero with a live control behind it.

### 3.1 The strict run

```
$ node tools/ecr_verify.js lunar.tsv lsei/literature
axes 15  members 80  distinct leaves 58
match_keys total 127  K1 failures 0  K2 failures 0
classes {"two_sided":11,"one_sided":2,"false_pair":2}
--- ASSERTIONS ---
  FAIL B6 cluster nasa-2025 partly registered: in=nasa-2025-fission-surface-power-directive.md missing=nasa-2025-moon-to-mars-architecture-add-revc.md
EXIT=1
```

**B6 was the only failure.** Nothing else fired: L2 self-declared size, L3 arity and embedded
separators, L4 leaf resolution, L5 side arity by class, B1 id form and orphan members, B2 closed sets,
B3 K1 and K2 and comma spacing, B5 mandatory fields, and the `false_pair` banned-word list.

### 3.2 The two assertions my checker never implemented, and why passing them is not reassuring

`ecr_verify.js` enforces two things `tools/check_register_rows.js` does not implement at all:

- **the `false_pair` banned-word list** — `disagree`, `contradict`, `dispute` and inflections, on every
  field of a `false_pair` `A` row *and* in every member `position` on such an axis;
- **B3 comma spacing** in `match_keys`.

Both pass on my rows. **That is luck, not enforcement.** I wrote LCC-08 and LCC-11 to avoid framing
their sides as a disagreement because §1.5 of the original argues at length that they are not one — so
the prose discipline happened to produce the mechanical result. Had I written one sentence differently
the register would have shipped with a `false_pair` axis telling the user its sides contradict each
other, and nothing in my authoring loop could have told me.

### 3.3 Five live controls, because a zero from an untested instrument is not a zero

This project's own discipline is that a measured absence needs controls fired on the same instrument
in the same run. Each control injects one deliberate violation into the ratified rows and confirms
`ecr_verify.js` catches it. All five fired.

| # | Injected violation | Caught as |
|---|---|---|
| 1 | `contradict` appended to LCC-11's `axis_statement` (a `false_pair` axis) | `FAIL false_pair banned word on LCC-11` |
| 2 | `disputes` appended to a member `position` on LCC-08 | `FAIL false_pair banned word in position on LCC-08 sargeant-...` |
| 3 | a space after a comma in LCC-01's `match_keys` | `FAIL B3 spaces around commas` **and** `FAIL B3/K1 key " ice"` |
| 4 | `probe_neg` emptied on LCC-03 | `FAIL B5 empty probe_neg on LCC-03` |
| 5 | `H` `member_count` changed 80 → 79 | `FAIL L2 member_count 79 != parsed 80` |

Every control also still reported the B6 failure alongside it, which is the second thing worth
knowing: **`ecr_verify.js` accumulates failures rather than stopping at the first.** My own checker's
defect was not only that it exited 0; a checker that halts at the first failure would have hidden the
other four in every one of these runs.

### 3.4 After the fix

```
$ node tools/ecr_verify.js lunar.tsv lsei/literature
axes 15  members 81  distinct leaves 59
match_keys total 127  K1 failures 0  K2 failures 0
classes {"two_sided":11,"one_sided":2,"false_pair":2}
sides per axis: LCC-01=3 LCC-02=2 LCC-03=3 LCC-04=3 LCC-05=1 LCC-06=2 LCC-07=4 LCC-08=4 LCC-09=3 LCC-10=2 LCC-11=2 LCC-12=3 LCC-13=2 LCC-14=1 LCC-15=2
--- ASSERTIONS ---
  ALL PASS
EXIT=0
```

**`EXIT=0`.** Adding one member row did not change the side count on any axis, the class of any axis,
or any `match_key` result.

### 3.5 The cluster census, so "no other partials" is a measurement rather than a hope

B6 fires only on a *partly* registered cluster, so a cluster that is wholly unregistered is silent
today and can fire tomorrow. Enumerating all nine multi-member prefix clusters against the corrected
rows:

- **six fully registered** — `sowers-2019` (4), `colaprete-2010`, `kornuta-2019`, `sanders-2025`,
  `schreiner-2016`, `nasa-2025` (2 each);
- **three wholly unregistered** — `paige-2010`, `ehricke-1981`, `barnett-2025`;
- **zero partial.**

Two of the three unregistered ones are the latent false positives of §1.4.

---

## 4. Corrected quantities, quoted from the surviving blocks

Per the counting rule §4, a correction edits `value` in the block's own file and moves the old value
into `superseded`. **This addendum originally re-declared three ids here, and that was the error.**
A re-declaration does not correct a block, it forks it. `Q-LCC15-MEMBER-ROWS`,
`Q-LCC15-DISTINCT-LEAVES` and `Q-LCC15-LEAVES-READ` each stood as two blocks under one id — three
M2 duplicate-id failures — and `Q-LCC15-DISTINCT-LEAVES` was the only one of the three quoted with a
readable numeral in both files, so it alone also fired M3 as a two-valued quotation. The three
re-declared blocks are deleted at Step 2 Wave 2. The single surviving block of each id is the
corrected one in `cr_scratch/step1_9_space_resources_engineer_register_rows.md`, and the paragraphs
below quote it.

**An addendum that supersedes must quote, never re-declare.** `class: superseded` on the original
would not have helped: it clears neither the duplicate id nor the quotation sites, and it stales the
index on top. The structural cause of the value fork is recorded at `Q-LCC15-MEMBER-ROWS` — the `H`
row of `REGISTER.lunar.tsv` pins the axis and member-row counts and has no distinct-leaves field, so
the member-row value could not drift while the distinct-leaves value had nothing holding it.

The corrected values, quoted:

- The fifteen lunar axes carry 81 [Q-LCC15-MEMBER-ROWS] member rows. The draft rows omitted
  `nasa-2025-moon-to-mars-architecture-add-revc.md` from LCC-10, a B6 cluster-completeness failure
  that `tools/check_register_rows.js` reported and then exited 0 on; the corrected liftable block is
  in section 2 of this document and is the block promoted to `oracle/REGISTER.lunar.tsv`.
- Those rows name 59 [Q-LCC15-DISTINCT-LEAVES] distinct corpus files, one more than the draft, and
  every one of the 59 resolves on disk under `lsei/literature`.
- Of those, 44 [Q-LCC15-LEAVES-READ] were opened at the encoded passage. The fifteen that were not
  are unchanged and are listed by name in section 5.5 of the parent document.

**`Q-LCC15-SIDES` is reported STALE and re-confirmed unchanged at 37.** Its `derived-from` names
`Q-LCC15-MEMBER-ROWS`, which was corrected after that block's own `at`, so the checker will flag it.
The new member joins an existing side, so the value does not move: re-run gives 37. Recording the
re-confirmation rather than letting a stale flag sit unanswered, since stale is a report and only the
owner can clear it. `Q-LCC15-SIDES-GT2`, `Q-LCC15-CLASS-MIX`, `Q-LCC15-KEYS`, `Q-LCC15-KEYS-DEAD-K2`,
`Q-LCC15-APP-ADDRESSES` and `Q-LCC15-TIERLESS-SECTIONS` are unaffected and unchanged; the four derived
source figures are untouched.

```quantity
id:            Q-LCC15-STRICT-FAILURES
class:         fixed
value:         1
unit:          assertion failures reported by tools/ecr_verify.js over the ratified lunar rows,
               before the correction in this addendum
population:    the assertions ecr_verify.js implements -- L2, L3, L4, L5, B1, B2, B3 (K1, K2 and
               comma spacing), B5, and the false_pair banned-word list -- evaluated over the 15 A
               rows and 80 M rows of the parent document's liftable block
operation:     cmd: node tools/ecr_verify.js lunar.tsv lsei/literature ; echo "EXIT=$?"
conditions:    cwd: repository root, 55 characters. Node 26.4.0. lunar.tsv is the parent document's
               block extracted to a .tsv by the sed in its section 3. The instrument was verified
               live in the same session by five injected controls, one per assertion family, listed
               in section 3.3; all five fired. After the correction the same command reports ALL PASS
               and EXIT=0.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     exactly one assertion failed over the ratified lunar rows, the B6 cluster-completeness
               failure on nasa-2025. Every other assertion passed, including the two that
               tools/check_register_rows.js does not implement at all; those two passed by authoring
               accident rather than by enforcement, which is a property of the rows and not evidence
               about the checker.
derived-from:  none
sampled:       n/a -- every implemented assertion was evaluated over every row; this is an
               exhaustive run, not a sample, and the five controls establish the instrument is live
superseded:    none
```

```quantity
id:            Q-LCC10-ADD-RETRIEVAL-RANK
class:         fixed
value:         zero on the axis, first on a programme-state question 0.70 ahead of its registered twin
unit:          a governed observation; no single numeral
population:    nasa-2025-moon-to-mars-architecture-add-revc.md and
               nasa-2025-fission-surface-power-directive.md, scored against all 152 files of
               lsei/literature over six questions listed in section 1.2
operation:     script: (session) a driver calling literature_search.js's own scoreFile(questionTokens,
               filename, literatureDir) over listCorpusFiles(), ranked by score descending
conditions:    cwd: repository root, 55 characters. Node 26.4.0. Scoring is the shipped filename
               match with IDF weighting and the lead-author and year bonuses, unmodified; the
               full-text confirmInText stage is not applied, so these are candidate ranks rather than
               confirmed returns.
at:            2026-08-27; lsei 7f97983
predicate:     on LCC-10's probe_pos and three other fission-axis questions the Moon to Mars
               Architecture Definition Document scores 0.00 and ranks #112 to #125 of 152, so it is
               not interchangeable with the directive on the axis it was flagged against. On the
               programme-state question "What is NASA planning for 2025 on the Moon?" it ranks #1 at
               9.06 against the directive at #2 with 8.36, a gap of 0.70. Before the correction only
               one of those two near-tied files carried a register block, so which one search
               returned decided whether the misclassification detector had anything to read.
derived-from:  none
sampled:       n/a -- six named probes, each reported in full rather than sampled
superseded:    none
```

---

## 5. What this changes for other sub-steps

**Nothing about the axes themselves.** No class, no side count, no `scope_token`, no `match_key`, no
`app_surface` entry, no `probe_pos` and no `probe_neg` changed. The fixture set 3.6 was promised is
unchanged, including the three filename-token collision cases and the low-IDF pair case.

**For 1.10, one warning that is cheap to act on now and expensive later.** The economics rows are
authored against `_intake/japanese-miracle/lit/`, and the same prefix heuristic will run over that
tree. Enumerate its multi-member author-year prefixes *before* authoring and decide each one
deliberately, because a partial cluster is invisible until something fails loudly, and the thing that
failed loudly here was not mine.

**For 1.13, three things measured rather than asserted.**

1. `tools/check_register_rows.js` holds one `process.exit`, a guard for a missing tokenize export, and
   exits 0 on any assertion failure. It also hard-codes an absolute path to this author's install at
   line 3. The consolidation ruling is correct and I am not repairing it; I am confirming the
   diagnosis from the inside, and noting that it authored fifteen register rows before anyone noticed.
2. `ecr_verify.js` accumulates failures rather than halting at the first — verified, because all five
   injected controls reported alongside the standing B6 failure. That property is worth keeping in the
   consolidated checker and is easy to lose in a rewrite.
3. Its `.md` input path cannot lift a marked block from a CRLF file: it prints `no BEGIN/END
   oracle/REGISTER.tsv block` and exits 2. It fails closed, which is the right direction, but every
   markdown file in `cr_scratch/` on this install is CRLF, so **the `.md` path is dead here and the
   `.tsv` path is the only working one.** One regex in `loadRows` requires `-->` to be followed
   immediately by `\n`. Whoever consolidates should either fix that or delete the `.md` path rather
   than leave a route that never works on the author's own machine.

**For 2.16.** The corrected block in §2 is the one to lift; the parent document's block is the
ratified record and is superseded for lifting. Both `nasa-2025` files now carry exactly one register
row each. `member_count` on the `H` row is 81 and will move again when the merge collapses the
near-duplicate clusters, per §5.4 of the parent document.

**Unchanged and not revisited:** the `PREFER_AND_NAME` refusal, which I accepted; and the
`app_surface` tier finding, which is logged and is The Engineer's to rule on before 2.15.

---

*The Space Resources Engineer, sub-step 1.9 addendum.*
