# Carbothermal Reduction Demonstration (CaRD) Gas Analysis Subsystem Development

## Provenance

- Source file (on disk): `gott-2024-card-gas-analysis-subsystem.pdf` (10 pages; official formatted conference-paper PDF, retrieved from the Texas Tech University institutional repository, which archives ICES conference papers)
- Document type: Peer-presented conference paper (International Conference on Environmental Systems, ICES)
- Authors: Ryan P. Gott (NASA, Kennedy Space Center); Joel A. Olson (Bennett Aerospace, KSC); Nilab Azim (NASA, KSC); Roberto Aguilar Ayala (NASA, KSC); Janine E. Captain (NASA, KSC); Nathan P. Haggerty, Kevin Rogers, Thomas Davis, Brant C. White (all Sierra Space, Madison WI) -- all transcribed from the title page and author-affiliation footnotes
- Venue: 53rd International Conference on Environmental Systems, paper no. ICES-2024-61, Louisville, Kentucky, 21-25 July 2024 -- transcribed from the running header on every page
- Year: 2024
- DOI: not printed
- Publisher URL: not printed on the document itself; downloaded from the Texas Tech University repository record `https://ttu-ir.tdl.org/items/e6cd0feb-d439-4f45-a072-9ad8dbdd9cb8` (bitstream `https://ttu-ir.tdl.org/bitstreams/ad8e0ca1-71cc-4d9c-986d-b62665758753/download`); the same paper is also indexed at NASA NTRS, record ID 20240002126 (submitted as `ICES_61_CaRD Gas Analysis Final.docx`), and a companion conference-presentation slide deck of the same title is at NTRS record ID 20240009348 -- neither NTRS record lists a DOI

## Abstract

CaRD is building a subscale carbothermal-reduction demonstration and needs a way to measure how much molar-equivalent oxygen the CO and CO2 byproducts represent. Gas chromatography, the conventional choice for this kind of gas quantification, needs a carrier-gas supply that makes it a poor fit for flight hardware, which motivates looking at mass spectrometry instead, since it reads gas-phase species without any carrier gas. Residual gas analyzers are a compact, rugged mass-spectrometer variant normally used only for monitoring rather than quantification, but the authors argue that careful calibration turns one into a flight-capable quantitative instrument. KSC's assignment within the JSC-led CaRD effort is to build that gas-analyzer subsystem around MSolo, a space-qualified, quadrupole-based RGA already at TRL 6 and flying on PRIME-1 and VIPER. This paper documents adapting MSolo hardware into a CO/CO2 gas-analysis system, extending the instrument work described in the team's 2023 ICES paper (no. 313).

## Summary

### Background and objective
CaRD is a JSC-led project (hardware built by Sierra Space) to raise the TRL of an integrated solar-concentrator + carbothermal-reactor system toward a lunar surface flight demonstration. This particular paper's own contribution is the KSC-led gas-analysis subsystem (a flight-forward residual-gas-analyzer instrument, MSolo, used to quantify CO/CO2 production in place of a gas chromatograph). The paper reports results from two test campaigns: (1) a 2023 "brassboard" vacuum test of a manual carbothermal reactor, and (2) prototype testing of Sierra Space's automated Carbothermal Oxygen Production Reactor (COPR).

### Methods and scope
Brassboard test: a manual carbothermal reactor built by Sierra Space, instrumented with the gas-analysis subsystem, operated in a vacuum environment (calibration/testing conducted at JSC's Energy Systems Test Area). The carbothermal reaction was initiated by a **2 kW laser used to simulate concentrated solar energy**, run for a total of **6 minutes**, with the reactor fluid loop recirculating argon (Ar) plus reaction product gases. Gas composition (CO, CO2) was measured with both a gas chromatograph (GC) and the RGA/MSolo instrument for cross-validation; O2 production was calculated from the measured CO (and CO2, when present) via stoichiometry ("molar equivalent oxygen"). Prototype-phase testing (with COPR and H2 as the working/balance gas) is also described but is aimed at instrument accuracy validation, not a new energy figure.

### Key findings (emphasis: specific-energy values, basis, temperature)
- **"The brassboard test demonstrated up to 15.79 g/kWh utilizing thermal energy."** (p.2, as printed) -- basis is explicitly THERMAL energy (the 2 kW laser's delivered energy standing in for concentrated solar-thermal input), not electrical/wall-plug power to the laser.
  - Inverted to the paper's own units: **15.79 g O2/kWh(thermal) is equivalent to ~63.3 kWh(thermal)/kg O2** (arithmetic performed here from the paper's stated ratio; not itself printed as kWh/kg).
- **"This O2 production was an order of magnitude higher than the key performance parameter (KPP) target of 1.25 g/kWh."** (p.2, as printed) -- the KPP design target of 1.25 g/kWh corresponds to **~800 kWh(thermal)/kg O2** (again, inverted here from the paper's own stated ratio). The brassboard result therefore substantially exceeded (i.e., was far more energy-efficient than) the project's own pre-test performance requirement.
- O2 quantity was derived from measured CO alone: **"Negligible quantities of CO2 were observed across all tests, therefore, only the CO quantity was used to determine the O2 production"** (p.2) -- i.e., under these test conditions the carbothermal product gas was essentially pure CO, not CO2.
- MSolo (RGA) CO quantification tracked the reference GC within 8.71% +/- 6.86% relative variance in the brassboard test, and 7.9% +/- 4.3% in the later COPR prototype test with H2 as the working gas -- reported as an instrument-validation result, not an energy figure.
- **Operating/melt temperature: NOT STATED in this document.** The paper describes the reactor as heated by a 2 kW laser "to simulate concentrated solar energy" but prints no melt or reactor-zone temperature figure; do not infer one from this source. (For reference, the companion NASA Glenn modeling paper -- Balasubramaniam, Hegde & Gokoglu, NASA/TM-2009-215622, also in `lit/` -- states molten lunar-regolith carbothermal-reduction temperatures "will exceed 1650 degC," but that is a separate document's figure, not this one's.)
- Reactor/system scale: this is explicitly a subscale ("brassboard") laboratory demonstration -- a single 6-minute batch reaction with a 2 kW heat source -- not a sized production-plant design; no annual O2 production rate or full-system (balance-of-plant) power budget is given in this paper.

### Limitations
This is a subsystem/instrumentation-development paper (its stated purpose is validating the MSolo gas-analysis instrument against a GC), not a reactor energy-optimization study; the 15.79 g/kWh and 1.25 g/kWh figures appear only as summary context in the introduction, without a detailed energy-balance breakdown (e.g., no split of laser electrical input vs. delivered thermal energy vs. losses; no accounting of balance-of-plant power for gas cleanup, electrolysis, or liquefaction). The result is from a single brassboard batch test of a manually operated reactor, not a statistically characterized or steady-state production rate. No regolith throughput, yield percentage, or temperature is printed. The paper explicitly frames the 1.25 g/kWh figure as a pre-test design KPP/target, not an independently sourced literature or design-study value -- readers should not treat 1.25 g/kWh as a citation-quality "design" number without further sourcing.

## Topic mapping (neutral)
NASA CaRD (Carbothermal Reduction Demonstration) project; carbothermal reduction of lunar regolith simulant using a laser-simulated concentrated-solar heat source; oxygen yield reported as g O2/kWh(thermal), both an observed brassboard-test result (15.79 g/kWh, ~63 kWh/kg O2) and a pre-test key-performance-parameter target (1.25 g/kWh, ~800 kWh/kg O2); gas-analysis instrumentation (RGA/MSolo vs. GC) for CO/CO2 quantification. First-party primary demonstration data underlying the g/kWh figures that reviews such as azami-2024 cite secondhand.

---

## Provenance (merge)

- **Landed:** Step 2.5, 2026-08-28, by `tools/merge_identity.js --stage`.
- **Source:** `_intake/japanese-miracle/lit/gott-2024-card-gas-analysis-subsystem.md`
- **Upstream ref:** `none` — the `Source:` path is under `_intake/`, which is not a git working copy, so no ref exists. Stated rather than omitted: an omitted field is invisible and a stated `none` is falsifiable.
- **Merge-time digest:** `sha256:c260b7671373e464855f8ded5dff969faa1762a2d8ecd152d76cea814352692c` over the bytes of the `Source:` file, taken 2026-08-28. This is the value `bootstrap_contract.md` §7.2 compares upstream against to reach `equal` or `diverged`; without it that verdict is `unknown`.
- **Byte source:** sole-intake
- **Disposition:** LIFT (a landing mode, not a gate)
- **Dedup key:** L2A|ttu-ir.tdl.org/items/e6cd0feb-d439-4f45-a072-9ad8dbdd9cb8
- **Field:** lunar · **Folder:** isru-processing
- **Plan row rev:** 1
