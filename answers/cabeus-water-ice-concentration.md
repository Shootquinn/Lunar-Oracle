# How much water ice is in the regolith at Cabeus crater?

| | |
|---|---|
| **Verdict** | `CONTESTED` |
| **Axis** | `LCC-01`, three sides |
| **Scope token** | the measurement footprint and the sampled depth |
| **Personas** | 3, one per side, each briefed on one side's leaves and no other's |
| **Ruled by** | the composing session, under `oracle/answer_contract.md` |
| **Router's advice** | evidence only, weight `VERY LOW`, no verdict offered |
| **Date** | 2026-08-29 |

## Question

*How much water ice is in the regolith at Cabeus crater?*

## Verdict

`CONTESTED`, and not `LITERATURE`.

The corpus carries three sources that give a concentration for Cabeus and whose central values span roughly an order of magnitude. A single number returned here would be a choice among them, made by whoever assembled the answer. **No such choice was made and none is available below.**

**Why `CONTESTED` and not the adjacent verdict.** `LITERATURE` was the alternative and it fails on the register: `LCC-01` declares three sides with distinct member leaves, so an answer drawing on "the literature" as one voice would flatten a disagreement the register exists to preserve. `APP` was also available and was rejected on inspection — the app resolves an address for `ice`, but `ice` is one of the keys the model echoes back from its own input, so an `APP` answer here would have returned the caller's control setting with a recompute trace attached. That is the sharpest failure this question tests for, and it is a live path, not a hypothetical.

**No adjudication follows.** The three sides are set out below in their own terms. The reader picks, or declines to.

### Side A — the impact plume, spectroscopy

The LCROSS Centaur impact of 9 October 2009 gives a mean water concentration of **5.6 ± 2.9 percent by mass**.

This is not a regolith sample. It is a ratio of two masses inside a spectrometer field of view: water vapour plus water ice, over an ejecta dust mass. Two coaligned nadir spectrometers shared a one-degree field of view, roughly 10 km across at 8 s after impact and 9.6 km at 20 s. The denominator is a dust mass of about 2,175 kg on average, and **that mass is a radiative-transfer output, not a weighed quantity**.

**The paper gives no depth.** No excavation depth, depth interval, or excavated volume appears anywhere in it. Its only depth-adjacent statement is a caveat that the LCROSS sample was "possibly deeper than neutron spectroscopy can effectively sample," which it puts at deeper than about 0.7 m.

The figure moves with the assumptions that set the denominator: grain density 3,000 kg/m³, silica refractive indices standing in for real regolith, an area-weighted grain radius of 2.5 µm, and a 0.58 filling factor for field-of-view underfilling. A lighter assumed grain lowers the dust mass and raises the percentage. The paper calls its water masses lower limits, because after about 20 s some water lay outside the field of view — while early-period ratios are "likely to be overestimates" when the cloud was smaller than the field of view. **It does not net the two biases.**

### Side B — the region, collimated neutrons

Subsurface water ice averaged over Cabeus-1 is **0.49 ± 0.05 percent by mass**, with a maximum of **about 0.7 percent** at the crater floor.

These are two different quantities and are not interchangeable. The 0.49% is an area average over the collimated field of view of an orbital neutron spectrometer; the source states its estimates "represent a different support volume than a local impact or sample measurement." The 0.7% is a within-crater peak at the site of minimum average annual temperature — which coincides with the LCROSS impact location — and it carries no stated uncertainty.

The quantity is **subsurface**, not surface. The method reads hydrogen through neutron moderation, so the fraction describes buried material integrated over the depth epithermal neutrons sample, tied to "the assumed regolith and burial parameters."

**Both figures are model-derived, not counted.** No water is detected as such; an ice fraction is the output of a conversion from neutron suppression whose assumptions about regolith composition and burial depth carry into the answer. Observation period 2009 to 2023. The source frames its own contribution as a bound on generalisation: it constrains how far a high local value extends across the crater.

### Side C — the same impact, re-modelled

A re-analysis of the same 2009 impact, not a new observation, deriving **two** concentrations:

- **8.2 wt%**, assuming a water ice albedo of 0.8 and a regolith density of 1.5 g/cm³
- **4.3 wt%**, assuming a regolith density of 3.0 g/cm³

**The spread 4.3–8.2 wt% is the finding.** It arises purely from the choice of assumed regolith density. The formal errors quoted alongside each value are far smaller than that modelling spread and must not be read as the uncertainty.

The model consumes ground-based lightcurve observations of the debris plume, fitted against an assumed layered pre-impact column — a dirty-ice layer with ice concentration increasing with depth, a pure regolith layer, and a competent subsurface layer near 6 m. The footprint is the whole crater; the sampled depth is the excavated column above roughly 6 m, since the competent layer was not excavated and never entered the plume. Within that column the ice is not uniformly distributed but increases with depth.

The 5.6 ± 2.9 wt% figure appearing in this paper's introduction is **not its result** — it is attributed to Colaprete et al. (2010) and Heldmann et al. (2015) as the prior value being re-modelled.

## What was tested, and how it could have failed

| Claim | How it was tested | What would have falsified it | Result |
|---|---|---|---|
| The three sides describe different physical objects | Each persona was required to state footprint and sampled depth independently, without access to the others | Any two sides reporting the same footprint and depth — which would make the spread a genuine contradiction rather than a scope difference | Three distinct objects: a spectrometer field of view over an ejecta plume; a collimated orbital footprint over buried material; a whole-crater excavated column above 6 m |
| No persona synthesised across sides | Each was briefed on one leaf, told the others existed, and forbidden to speculate about them | Any side hedging toward a middle, or writing "however, other studies…" | None did. Side B bounded its own generalisability from its own source; side C named its borrowed figure and attributed it |
| Side C's borrowed figure is not presented as its own | Persona instructed to attribute exactly as the source attributes | Side C reporting 5.6 ± 2.9 wt% as its own result | Correctly attributed to Colaprete and Heldmann |
| The app must not answer this | Checked whether `resolveOutput("ice")` resolves | The address failing to resolve, making the trap hypothetical | **It resolves.** `ice` is an input-echo key; an `APP` verdict would have returned the caller's own setting |
| Every figure carries its assumption | Each persona required to name the assumption behind each value | A concentration stated without the density, albedo, or filling factor it depends on | Held on all three sides |

**What was not tested.** No persona's arithmetic was re-derived from the source PDFs. Every figure here traces to a summary in `literature/`, and the summaries were verified against their sources in a separate pass, not in this one.

## Sources

| Side | Leaf | Trace |
|---|---|---|
| A | `literature/lunar-ice-and-geology/colaprete-2010-lcross-ejecta-water-detection.md` | central value L84; FOV L39, L41; dust mass as denominator L84, L117; no depth L117; 0.7 m caveat L107; assumptions L121–L126, L49; bias statements L115 |
| B | `literature/lunar-ice-and-geology/litvak-2024-lend-cabeus-water-ice.md` | central value L17, L34; maximum L17, L35–36, L47; footprint L24, L41; moderation basis L29–30; model-derived L42; period L17, L29 |
| C | `literature/lunar-ice-and-geology/luchsinger-2021-lcross-water-modeling.md` | density dependence L19; borrowed figure L25, L49; model inputs L31–32; both values with assumptions L37; depth and competent layer L39; spread vs formal error L43–44 |

Register: `oracle/REGISTER.lunar.tsv`, axis `LCC-01`, class `two_sided`, sides A, B, C.

## What remains unverified

1. **Whether the three are reconcilable at all.** They measure different objects, so the order-of-magnitude spread is not prima facie a contradiction — but nothing here establishes that they are consistent either. That work was not done and is not claimed.
2. **Side A's unnetted biases.** The paper states one bias raising the figure and one lowering it, and nets neither. The direction of the residual is unknown.
3. **Whether side B's footprint contains side A's impact site in the way a reader would assume.** Side B says the coldest point coincides with the LCROSS site; whether the averaging volume overlaps the excavated column is not established by either source.
4. **The register labels `LCC-01` `two_sided` while it carries three sides.** The class name is historical and its invariant now reads "every side." The label has not been corrected.
5. **No source PDF was opened for this answer.** Everything traces to summaries.
