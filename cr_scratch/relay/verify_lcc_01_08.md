# A.10 step 2 source verification gate — axes LCC-01 through LCC-08

## Method / commands run

- Register located and axis rows extracted with:
  `grep -n "LCC-0[1-8]" oracle/REGISTER.lunar.tsv | cat`
  (register lines 2-9 = A rows, lines 17-47 = M rows; 31 M-rows total, confirmed against line count 17-47 inclusive)
- Each `leaf.md` located with `find literature -name "<leaf.md>"` (all 22 distinct leaf files resolved on the first attempt, one directory each: `literature/lunar-ice-and-geology/` or `literature/isru-processing/`, one in `literature/programme-primaries/`).
- Each file read IN FULL via the Read tool (whole file, no offset/limit truncation) before verdict was assigned.
- No file was written or edited during the check itself (read-only, per instruction) — this relay file is the only write, done afterward per the coordinator's delivery instruction.
- Read-digests below taken with: `sha256sum <path>` per file, run once, after all reads completed, over the same file set walked. Registry digest included so a future re-run can confirm the register itself hasn't moved.

## Read-digests (sha256, file set as walked)

```
cbf37cc784eb940115efeffc7acf4ab01966dbb14d28a5209d3de20d25e5b011  literature/lunar-ice-and-geology/colaprete-2010-lcross-ejecta-water-detection.md
07b6233f7da5a2ee1c99e59edb69505050636dfed313cd0127ad9268f375f689  literature/lunar-ice-and-geology/litvak-2024-lend-cabeus-water-ice.md
7d7efe9e96243baa717d4ef60f0d334b2f789d4a0302a08ef3d23e3bc74206b2  literature/lunar-ice-and-geology/luchsinger-2021-lcross-water-modeling.md
6cc4ac8dada688685caf6a929f6d2991aa1c2a0f40edbdd74e8ad035892a0c21  literature/lunar-ice-and-geology/li-2018-surface-exposed-water-ice.md
99b406a1d37a54ab88d3e2f0646429e44db121c1b56fd9d14365579766971f9b  literature/lunar-ice-and-geology/li-2026-shadowcam-psr-water-ice.md
0998bcad64d9c5bbf6ebe47cf752f9b3614d7478173cecb5df322e464573aa4e  literature/lunar-ice-and-geology/hayne-2020-micro-cold-traps.md
7193bd12a38bcc8a0ce7ee1f9321177819ebed2678ef5094810716d9d92ceeb4  literature/lunar-ice-and-geology/cannon-2020-lunar-ice-geologic-model.md
7e0c4e88180956fa13b45ab14e6d92015ea90ba2540e1ca341e3d6549fe1c227  literature/lunar-ice-and-geology/schorghofer-2026-current-theories-lunar-ice.md
4bb7c0363462f62c4c85ebc58c9a5fb67a36395bbb57f5b1a55cbc157946722e  literature/isru-processing/sowers-2019-psr-ice-mining.md
3e605d6d39e838e1dcd91f9f0156cfc29c5ba90be6556865a7d6094bc4ec42f1  literature/isru-processing/sowers-2019-thermal-mining-niac-report.md
338e6e2eb1fd33dfc1b864d0e2ee3c28a9bf4d3539e1e4b31914e0ef710da3cd  literature/isru-processing/kiewiet-2026-luwex-water-extraction.md
acdba0c00e094d93e2dfe3f5c8e0431498a6f3a8a2f83a2cf09e0d4ffbf1d112  literature/isru-processing/wang-2025-microwave-water-production.md
f5b9e9e184db963d8ba061e4bfb336141dc950def579e52be04b0d6fdae9daae  literature/programme-primaries/sanders-2025-nasa-isru-progress-review.md
c274e9e313e5d66af3bee5e295c1fc97f6fbbe0c3107783dad0695f19a4b705f  literature/isru-processing/linne-2020-lunar-water-pilot-plant.md
d37e5fdd7ea9c613e9bdd25a0e85f43fed1725c9fc96141b8eead6f6582682e0  literature/isru-processing/metzger-2020-aqua-factorem.md
8fbd86a6ef977e3c6044a42c5c2c7b227b702dd02541fa51dfd3cfe9821c9dc8  literature/isru-processing/metzger-2021-aqua-factorem.md
f3f60fdeb0eefd441dac746aea4960f97e82a98907ff8ca7e052d15e95ef58c8  literature/isru-processing/leger-2025-energy-oxygen-moon.md
b236106d54dfbdd4ca0870093a256304e3f5128b61125154a4085243fa43f530  literature/isru-processing/colozza-2010-solar-lunar-oxygen.md
dcbc3106e81b63f9b9e6de6945bc507990857c578ee311418a4f222bb9e8b701  literature/isru-processing/nasa-2023-card-carbothermal-reduction.md
a684d898d9a6c31e45ede3323bfa11ff73f81f94197f7fcaaccc8c2b66887ef5  literature/isru-processing/azami-2024-lunar-manufacturing-review.md
e74515af7199d9b2219e4077da9a74291a6a14dc0939324f1349ad82e6372825  literature/isru-processing/sargeant-2020-hydrogen-reduction-ilmenite-static.md
69162348568db5fc4d49a306fd956427b5b26d7d966950bc51edbcf6529087bc  literature/isru-processing/schreiner-2016-mre-sizing-model.md
94b19133449dbfcc36c6a4f8b788d65c65e700e8b12be190eb835cf1894f005e  literature/isru-processing/sibille-2012-joule-heated-mre.md
5e011c454ac29f66e5a10eb8d413060c4810f4b1564241d920d0deb8d293dc44  oracle/REGISTER.lunar.tsv
```

These digests were taken AFTER the read pass, in one batch, over exactly the file set named above — no other file set exists for this run and no reconciliation against a second digest set was needed. If a future check produces different digests for these paths, the two runs are checking different bytes and are not comparable; say so, don't average or pick one.

---

## M-row findings

Format: `ROW — leaf @ line(s)` then claim (as register states), verdict, and for anything not SUPPORTED, the exact text found.

### LCC-01

**LCC-01 A** — `literature/lunar-ice-and-geology/colaprete-2010-lcross-ejecta-water-detection.md` L84, L117
Claim (register L17): "Mean water concentration 5.6 plus or minus 2.9 percent by mass across three post-impact averaging periods, derived as a water-to-dust mass ratio inside the spectrometer field of view; the paper states no excavation depth or sampled volume anywhere. The denominator is a radiative-transfer dust mass of about 2175 kg, not a weighed regolith sample."
Verdict: SUPPORTED
Contested block: L174 `- LCC-01 A` — present.

**LCC-01 B** — `literature/lunar-ice-and-geology/litvak-2024-lend-cabeus-water-ice.md` L17, L34-36
Claim (register L18): "Subsurface water-ice content averaged over Cabeus-1 is 0.49 plus or minus 0.05 percent by mass, maximum about 0.7 percent at the crater bottom where the LCROSS impact site sits; collimated neutron, 2009 to 2023, model-derived from neutron suppression."
Verdict: SUPPORTED
Contested block: L65 `- LCC-01 B` — present.

**LCC-01 C** — `literature/lunar-ice-and-geology/luchsinger-2021-lcross-water-modeling.md` L17, L35
Claim (register L19): "Re-modelling the same LCROSS plume gives 8.2 wt% at an assumed regolith density of 1.5 g/cm3 or 4.3 wt% at 3.0 g/cm3, so the derived concentration moves by a factor of two on an assumption the observation does not constrain."
Verdict: SUPPORTED
Contested block: L65 `- LCC-01 C` — present.

### LCC-02

**LCC-02 A** — `literature/lunar-ice-and-geology/li-2018-surface-exposed-water-ice.md` L27, L79
Claim (register L20): "Reports direct evidence of surface-exposed water ice in the polar regions from Moon Mineralogy Mapper reflectance, at low abundance and in patches."
Verdict: SUPPORTED
Contested block: L139 `- LCC-02 A` — present.

**LCC-02 B** — `literature/lunar-ice-and-geology/li-2026-shadowcam-psr-water-ice.md` L17, L36-38
Claim (register L21): "ShadowCam finds no evidence of widespread surface water ice above a detection limit of 20 to 30 wt%, identifies a few small locations possibly above 10 wt%, does not rule out widespread ice at lower content, and states that a detection limit below 1 wt% is what would settle it."
Verdict: SUPPORTED
Contested block: L66 `- LCC-02 B` — present.

### LCC-03

**LCC-03 A** — `literature/lunar-ice-and-geology/hayne-2020-micro-cold-traps.md` L17
Claim (register L22): "Micro cold traps hold roughly 10 to 20 percent of the Moon permanent water cold-trap area, bringing the total to about 40,000 km2, which implies polar water is more accessible than large-crater estimates alone suggest."
Verdict: SUPPORTED
Contested block: L65 `- LCC-03 A` — present.

**LCC-03 B** — `literature/lunar-ice-and-geology/cannon-2020-lunar-ice-geologic-model.md` L61, L77, L79
Claim (register L23): "A geologic model at mining scales in which ice is buried beneath dry overburden, patchy in lateral extent, and repeatedly shuffled by impact gardening."
Verdict: SUPPORTED
Contested block: L170 `- LCC-03 B` — present.

**LCC-03 C** — `literature/lunar-ice-and-geology/schorghofer-2026-current-theories-lunar-ice.md` L17
Claim (register L24): "The standard cold-trap model is consistent with the major observational constraints, with a few less-established observational claims unaccounted for; names the key measurements still needed."
Verdict: SUPPORTED
Contested block: L66 `- LCC-03 C` — present.

### LCC-04

**LCC-04 A (1/2)** — `literature/isru-processing/sowers-2019-psr-ice-mining.md` L143-145, L161-177, L205
Claim (register L25): "Solar thermal sublimation under a capture tent; the article states no specific-energy figure, and roughly 1.3 to 2.7 kWh/kg is derivable from its own power-versus-concentration figures at 4 wt% and 1,600 t/yr, extraction only, concept level."
Verdict: SUPPORTED — no kWh/kg figure appears anywhere in the article; 500 kW / 1600 t ice per yr / 4 wt% figures reproduce the claimed derivable range (500 kW x 8760 h / 1.6e6 kg = 2.74 kWh/kg; text's own 350 kW point gives 1.92; digitized-figure 255 kW point gives 1.40 — all inside "roughly 1.3 to 2.7").
Contested block: L224-226 lists `LCC-04 A`, `LCC-06 A`, `LCC-12 A` — present.

**LCC-04 A (2/2)** — `literature/isru-processing/sowers-2019-thermal-mining-niac-report.md` L21-33, L99-115
Claim (register L26): "Same author and year cluster, named for the same reason."
Verdict: SUPPORTED — file states it is the NIAC Phase I final report "behind the condensed journal article," same author (Sowers), same year (2019).
Contested block: L285-287 lists `LCC-04 A`, `LCC-06 A`, `LCC-12 A` — present.

**LCC-04 B** — `literature/isru-processing/kiewiet-2026-luwex-water-extraction.md` L101-122, L29
Claim (register L27): "Measured recovery energy efficiency 22.88 to 66.33 g/kWh, equivalently about 15 to 44 kWh/kg, for an integrated extraction, capture and liquefaction chain at up to 13 kg of simulant per run at 5 wt% ice, targeting TRL 4 in hardware the source says approached TRL 5 conditions."
Verdict: SUPPORTED — Table 7 gives exactly 22.88/32.80/44.51/66.33 g/kWh across the four experiments; 1000/22.88=43.7, 1000/66.33=15.1 kWh/kg, matching "about 15 to 44"; text states testing "approaching TRL 5 conditions" against a formal TRL 4 target.
Contested block: L207-209 lists `LCC-04 B`, `LCC-05 A` — present.

**LCC-04 C** — `literature/isru-processing/wang-2025-microwave-water-production.md` L17, L81
Claim (register L28): "Microwave heating of a 70 mm by 70 mm cryogenic simulant cylinder gives an energy cost of 1.9 to 10.0 W.h/g at 800 W, extraction only; collection ratio is 24 to 48 percent against an extraction ratio of 76 to 96 percent, and the bench runs at positive pressure rather than vacuum."
Verdict: SUPPORTED
Contested block: L102 `- LCC-04 C` — present.

### LCC-05

**LCC-05 A (1/3)** — `literature/isru-processing/kiewiet-2026-luwex-water-extraction.md` L82, L101-122, L132
Claim (register L29): "Water recovery of 50 to 73 percent and capture percentages up to 89 percent across four runs; recovery percentage is recovered mass over initial ice mass while capture percentage is recovered over extracted, and the two are 73 and 89 percent in the same best run."
Verdict: SUPPORTED — Experiment 4 row of Table 7: recovery 73%, capture 89%, same run.
Contested block: L207-209 — present.

**LCC-05 A (2/3)** — `literature/programme-primaries/sanders-2025-nasa-isru-progress-review.md` L101-117
Claim (register L30): "PVEx reached TRL 5/6 with 43 to 56 percent water extraction at 4 to 6 wt% for a 5 cm inner-diameter, 0.5 m core; LADI targeted 75 percent extraction efficiency and was cancelled before TRL 5; capture and cleanup by cold trap and freeze distillation stand at TRL 3/4 with data to 0.1 kg/hr vapor flow."
Verdict: SUPPORTED
Contested block: L243-247 lists `LCC-05 A`, `LCC-07 D`, `LCC-08 D`, `LCC-15 A` — present.

**LCC-05 A (3/3)** — `literature/isru-processing/linne-2020-lunar-water-pilot-plant.md` L51, L134
Claim (register L31): "A COMPASS conceptual design that assumes 75 percent water extraction and capture efficiency for an auger-dryer reactor; the figure is a design assumption in a point design, not a measurement."
Verdict: SUPPORTED
Contested block: L164 `- LCC-05 A` — present.

### LCC-06

**LCC-06 A (1/2)** — `literature/isru-processing/sowers-2019-psr-ice-mining.md` L143-145, L161-177, L185, L205, L38
Claim (register L32): "Solar thermal sublimation under a capture tent at 500 kW for 1,600 t/yr of water at 4 wt%, NIAC and Colorado School of Mines concept level, with no dependence on the physical form the ice takes."
Verdict: PARTIAL — 500 kW / 1600 t/yr / 4 wt% and the "any ice type" claim all check out, but the "NIAC" attribution is not this file's own designation. Text found (L205, Topic mapping): "This work stands in a defined relation to the NIAC Phase I final report summarized in this folder as sowers-2019-thermal-mining-niac.md, which shares a first author and year but is a separate document." — NIAC is named only as the companion document, never as describing this article itself; the article's own funding line (L38) instead credits "the United Launch Alliance." The "Colorado School of Mines" and "concept level" elements are independently confirmed (L26, "Colorado School of Mines, Golden, Colorado"; abstract, "The paper reports analytical and design results only").
Contested block: L224-226 — present.

**LCC-06 A (2/2)** — `literature/isru-processing/sowers-2019-thermal-mining-niac-report.md` L21-33
Claim (register L33): "Same author and year cluster, named for the same reason."
Verdict: SUPPORTED
Contested block: L285-287 — present.

**LCC-06 B (1/2)** — `literature/isru-processing/metzger-2020-aqua-factorem.md` L25, L41, L69, L77
Claim (register L34): "States a 98.3 percent surface-segment power reduction, being 50 kW against the 2.8 MW of the Kornuta baseline, at an annual output of 27,900 kg of water which the report itself gives as about 1 percent of that baseline; and a separate 97.5 percent reduction against an 800 kW thermal comparison. Ground plastic sandblasting media stood in for ice in every magnetic, pneumatic and size-sorting test, the analogue electrostatic properties are stated as undetermined, and the basalt entry in the triboelectric series was set by analogy with no quantitative data."
Verdict: SUPPORTED — all figures and the real-ice-only-in-electrostatic-test scoping match (real ice used only in the separate Section 2.9.1 electrostatic test, per L41; plastic used for every magnetic/pneumatic/vibrational test).
Contested block: L100 `- LCC-06 B` — present.

**LCC-06 B (2/2)** — `literature/isru-processing/metzger-2021-aqua-factorem.md` L39-41, L69-70
Claim (register L35): "The companion report carrying the same 98.3 and 97.5 percent figures and the grain-size premise of roughly 70 micrometres from M3 or 8 micrometres from LCROSS; the third member of this cluster, metzger-2021-aqua-factorem-2.md, is a superseded duplicate held outside the corpus and is named here so its absence is recorded rather than silent."
Verdict: PARTIAL — the 98.3%/97.5% figures and the 70 micron (M3) / 8 micron (LCROSS) grain-size premise are both confirmed verbatim in this file (L39-41: "Reports ... 98.3 percent surface power reduction against a published thermal-extraction baseline"; L69-70: "approximately 70 micron from Moon Mineralogy Mapper (M3) near-infrared reflectance ... approximately 8 micron mean from the LCROSS impact ejecta"). The "third member ... metzger-2021-aqua-factorem-2.md ... superseded duplicate held outside the corpus" element is not stated anywhere in this file's body — a full-file read finds no reference to any second/duplicate report; this is bibliographic bookkeeping the register itself carries, not content traceable to this leaf.
Contested block: L375 `- LCC-06 B` — present.

### LCC-07

**LCC-07 A** — `literature/isru-processing/leger-2025-energy-oxygen-moon.md` L16, L24, L31
Claim (register L36): "24.3 plus or minus 5.8 kWh per kg of liquid oxygen by hydrogen reduction of ilmenite at 10 wt% ilmenite, end-to-end from excavation through liquefaction and zero-boil-off storage, with all process heat billed as electricity."
Verdict: SUPPORTED
Contested block: L56-57 lists `LCC-07 A`, `LCC-08 A` — present.

**LCC-07 B** — `literature/isru-processing/colozza-2010-solar-lunar-oxygen.md` L15, L27, L33
Claim (register L37): "About 39 kWh per kg O2 derivable from the paper own power and rate figures at a 1,000 kg/yr carbothermal demonstration scale, of which over 82 percent is thermal and the remainder electrical; the paper states no specific-energy figure as such."
Verdict: SUPPORTED
Contested block: L52-54 lists `LCC-07 B`, `LCC-08 C` — present.

**LCC-07 C (1/2)** — `literature/isru-processing/nasa-2023-card-carbothermal-reduction.md` L35, L51
Claim (register L38): "Brassboard yields of 13.42, 11.53, 15.79 and 10.77 g O2 per kWh thermal across four runs, equivalently about 63 to 93 kWh per kg thermal, with no stated measurement uncertainty or replicate count and no formal TRL stated for the unit."
Verdict: SUPPORTED — figures match exactly; 1000/15.79=63.3, 1000/10.77=92.9 kWh/kg brackets "about 63 to 93."
Contested block: L80-83 lists `LCC-07 C`, `LCC-08 C`, `LCC-11 B` — present.

**LCC-07 C (2/2)** — `literature/isru-processing/azami-2024-lunar-manufacturing-review.md` L51
Claim (register L39): "Restates the same four CaRD yields and assigns the project TRL 6, a number the CaRD deck itself does not state."
Verdict: SUPPORTED
Contested block: L161-163 lists `LCC-07 C`, `LCC-14 A` — present.

**LCC-07 D** — `literature/programme-primaries/sanders-2025-nasa-isru-progress-review.md` L56-63
Claim (register L40): "Carbothermal reduction at TRL 5, greater than 20 g O2 per kW-hr thermal, equivalently under 50 kWh per kg thermal, with single melts equivalent to 140 kg O2/yr and greater than 99.7 percent carbon recovery."
Verdict: SUPPORTED
Contested block: L243-247 — present.

### LCC-08

**LCC-08 A (1/2)** — `literature/isru-processing/sargeant-2020-hydrogen-reduction-ilmenite-static.md` L5, L17
Claim (register L41): "Hydrogen reduction of ilmenite in a static bed; the route needs ilmenite-rich feedstock, which is a mare mineralogy."
Verdict: PARTIAL — static-system hydrogen reduction of ilmenite is confirmed throughout (title, abstract, methods all use pure ilmenite samples). A full-file search for "mare" returns zero hits — the "which is a mare mineralogy" element is not stated anywhere in this file; it is an external petrological fact this leaf never asserts about itself.
Contested block: L68 `- LCC-08 A` — present.

**LCC-08 A (2/2)** — `literature/isru-processing/leger-2025-energy-oxygen-moon.md` L16, L24, L31
Claim (register L42): "The 24.3 kWh/kg figure is computed for 10 wt% ilmenite feedstock with a beneficiation enrichment factor, and the paper own site map favours High-Ti mare regions."
Verdict: SUPPORTED
Contested block: L56-57 — present.

**LCC-08 B (1/2)** — `literature/isru-processing/schreiner-2016-mre-sizing-model.md` L24, L36
Claim (register L43): "Molten regolith electrolysis takes any regolith with no added reagents, so feedstock mineralogy sets efficiency rather than admissibility; the source calls MRE reasonably feedstock insensitive and prices the highland-against-mare difference at 33 percent mass and 60 percent power."
Verdict: SUPPORTED — exact phrase "reasonably feedstock insensitive" found at L36, alongside "33% less massive and require 60% less power."
Contested block: L66 `- LCC-08 B` — present.

**LCC-08 B (2/2)** — `literature/isru-processing/sibille-2012-joule-heated-mre.md` L16, L28
Claim (register L44): "Joule-heated molten regolith electrolysis, same feedstock-agnostic premise."
Verdict: SUPPORTED
Contested block: L54 `- LCC-08 B` — present.

**LCC-08 C (1/2)** — `literature/isru-processing/nasa-2023-card-carbothermal-reduction.md` L42
Claim (register L45): "Carbothermal reduction takes any silicate and needs carbon recycling rather than a particular mineral."
Verdict: PARTIAL — the file states the reaction generically as "SiO2 + 2C -> Si + 2CO" (L42), which loosely supports "not a particular mineral" (no ilmenite requirement is stated for this route, unlike the hydrogen-reduction route elsewhere in the corpus). But a full-text search for "recycl" and "silicate" in this file returns zero matches — confirmed by `grep -n "recycl|any silicate|silicate" literature/isru-processing/nasa-2023-card-carbothermal-reduction.md` = no output. The "needs carbon recycling" element and the literal phrase "any silicate" are not present anywhere in this file.
Contested block: L80-83 — present.

**LCC-08 C (2/2)** — `literature/isru-processing/colozza-2010-solar-lunar-oxygen.md` L23, L26
Claim (register L46): "Carbothermal at 1900 C on any silicate, with an assumed O2 yield of 15 to 20 wt% independent of ilmenite content."
Verdict: SUPPORTED — "reactor heated to 1900 C" and "assumed O2 yield 15-20 wt%" both confirmed at L23/L26; the carbothermal section makes no reference to ilmenite content anywhere (ilmenite appears only in this file's separate hydrogen-reduction section), consistent with "independent of ilmenite content."
Contested block: L52-54 — present.

**LCC-08 D** — `literature/programme-primaries/sanders-2025-nasa-isru-progress-review.md` L73-75
Claim (register L47): "Assigns maturity by terrain: MRE and carbothermal at TRL 5/6 for polar highland regolith, hydrogen and CO reduction at TRL 5 for mare."
Verdict: SUPPORTED
Contested block: L243-247 — present.

---

## A-row (axis_statement) findings

**LCC-01** — FAIR. Central values 5.6% / 0.49% / 4.3-8.2% span roughly an order of magnitude; the disagreement genuinely tracks footprint/sampled-depth (FOV dust-ratio vs. neutron column vs. modeled layer to 6 m), matching the stated axis of disagreement.

**LCC-02** — FAIR. "Opposite headline results" is defensible framing (2018 positive surface detection vs. 2026 null above a 20-30 wt% threshold); the stated axis (detection limit / areal extent) correctly captures that the two are reconcilable rather than flatly contradictory.

**LCC-03** — FAIR. Hayne (widespread/shallow via micro traps) vs. Cannon (buried/patchy/mining-scale gardening) vs. Schorghofer (reconciling review) matches the stated spatial-scale axis.

**LCC-04** — FAIR. Energy figures (~1.3-2.7, ~15-44, ~1.9-10 kWh/kg) span well over an order of magnitude at different process boundaries (extraction-only vs. integrated chain); "four orders of magnitude" scale claim is a true floor — actual spread (0.5 kg bench sample to 1.6 Mkg/yr concept) is closer to 6.5 orders — so the statement understates rather than overstates, and is not misleading.

**LCC-05** — FAIR. The recovery-vs-capture denominator ambiguity (kiewiet) and differing "extraction efficiency" figures (PVEx, LADI, auger-dryer) match the one-sided axis of disagreement as stated.

**LCC-06** — FAIR. Thermal (Sowers: 500 kW / 1600 t.yr-1) vs. mechanical/electrostatic (Metzger: 50 kW / 27,900 kg.yr-1) differ sharply in throughput scale, ice-morphology premise, and use of a plastic ice-analogue, matching the stated axis exactly.

**LCC-07** — FAIR. Specific energies range from 24.3 (Leger) to ~93 kWh/kg thermal (NASA CaRD 2023); CaRD (2023, 63-93 kWh/kg thermal) vs. Sanders (2025, <50 kWh/kg thermal) are two NASA sources on the same carbothermal programme, two years apart, genuinely incompatible.

**LCC-08** — OVERSTATED. Text found directly contradicting the axis statement: Leger's file (register row 42, confirmed SUPPORTED above) states "the paper's own site map favours High-Ti mare regions" — not polar highland. Sanders' file (row 47, confirmed SUPPORTED above) separately classifies "Hydrogen/CO reduction of mare regolith — advanced to TRL 5", treating mare as a live landing-site case alongside polar highland. The axis statement's claim that "every landing site in this corpus architecture studies is polar highland terrain" is directly contradicted by these two rows within the same axis's own member set.

---

## Tally

- 31 M-rows checked
- 27 SUPPORTED
- 4 PARTIAL (LCC-06 A / sowers-2019-psr-ice-mining.md; LCC-06 B / metzger-2021-aqua-factorem.md; LCC-08 A / sargeant-2020-hydrogen-reduction-ilmenite-static.md; LCC-08 C / nasa-2023-card-carbothermal-reduction.md)
- 0 CONTRADICTED
- 0 NOT-FOUND
- 31/31 Contested blocks present and correct
- 8 axis_statement verdicts: 7 FAIR, 1 OVERSTATED (LCC-08)
