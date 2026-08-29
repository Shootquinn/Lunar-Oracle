# Speyerer, Robinson, Lawrence, Burns and Stopar 2012 - In Search of Shade in Persistently Illuminated Regions Near the Lunar Poles

## Citation

Speyerer, E. J., Robinson, M. S., Lawrence, S. J., Burns, K. N., & Stopar, J. D. (2012). In search of shade in persistently illuminated regions near the lunar poles. 43rd Lunar and Planetary Science Conference, Abstract 2633. https://www.lpi.usra.edu/meetings/lpsc2012/pdf/2633.pdf

Publisher URL: https://www.lpi.usra.edu/meetings/lpsc2012/pdf/2633.pdf

## Metadata

Study type: conference abstract, crater-illumination modeling plus image-derived mapping · Institution: Lunar Reconnaissance Orbiter Camera Science Operations Center, Arizona State University · Publication date: 2012 (43rd LPSC) · Open-access status: freely available via the Lunar and Planetary Institute abstract archive.

Source file: `in search of shade 2633.pdf`

---

## Abstract

Two-page conference abstract reporting that small permanently shadowed regions (PSRs) can exist inside persistently illuminated terrain near the lunar poles, alongside a crater-scale illumination simulation and a Lunar Reconnaissance Orbiter Narrow Angle Camera (NAC) shadow map of the Shackleton crater rim. Presents preliminary modeling and image results rather than a full study; the lead author's related Icarus manuscript is cited in this abstract as in review at the time of writing.

---

### Background and objective

Notes that the Moon's 1.54 degree axial tilt produces topographic highs (crater rims, massifs) that stay illuminated across the full 18.6-year precessional cycle, while nearby crater floors and depressions can stay shadowed across the same cycle, and that this pairing is of interest because sunlit terrain supports long-duration solar power operations while adjacent shadowed terrain may trap volatiles. The stated aim is to identify where these two environments coexist at small, localized scale, using crater-shape illumination models together with NAC images, rather than only the coarser point-illumination maps used in prior studies.

### Methods and scope

Cites prior polar-illumination simulations built from Kaguya LALT and LRO LOLA altimetry (474 m/pixel and 240 m/pixel respectively) and from LRO WAC images (100 m/pixel), including a WAC-derived finding of a 0.93 km2 region on the Shackleton crater rim illuminated 94% of the year with a maximum continuous shadow period of 62 hours. The authors build their own simple bowl-shaped crater illumination model, varying crater diameter from 5 to 400 m, depth-to-diameter ratio for young (1/6) and degraded (1/12) crater states, and latitude from 86 degrees to the pole, scanning sub-solar longitude in 2 degree increments with sub-solar latitude fixed at 1.54 degrees (simulated polar summer peak). Separately, they NAC-map projected a set of images covering the Shackleton rim, converted each to a binary illuminated/shadowed raster, and stacked them to flag pixels shadowed in every image acquired to date (a lower bound on PSR extent, not a time-fraction estimate, since NAC does not revisit the same ground on every orbit).

### Key findings

The crater-shape simulations show that, for the 5-400 m diameter range tested, the fraction of the crater floor in permanent shadow and the fraction of the largest sunlit wall are both invariant to crater diameter at fixed depth-to-diameter ratio; both fractions increase as latitude approaches the pole and decrease as the crater matures (young 1/6 versus degraded 1/12 depth-to-diameter, Figure 2). The abstract also reports that a meter-tall boulder can cast a shadow roughly 37 m long under this extreme lighting geometry. Comparing an earlier WAC-derived illumination map to elevation-model simulations, the authors note the most-illuminated pixel's illumination fraction was 82-89% in the simulations versus 71% in the higher-resolution WAC-derived product (citing ref. 7), attributed to small-scale topography the coarser elevation models miss. The NAC shadow-stacking analysis (Figure 3) identifies a population of small craters near Shackleton's rim with a majority of their interior remaining shadowed in all images acquired to date, i.e., candidate small PSRs embedded within the persistently illuminated rim terrain; over 21,000 NAC image pairs within 5 degrees of each pole had been acquired at the time of writing.

This abstract's own citation list shows its relationship to the parallel Icarus manuscript: reference [7], "Speyerer et al. (2012) Icarus, in review," shares the lead author and supplies the 0.93 km2 / 94% illuminated / 62-hour figures this abstract quotes as prior WAC-based results. What this LPSC abstract itself contributes beyond that cited figure is the crater-shape parametric model (diameter, depth-to-diameter ratio, and latitude dependence of shadow/illumination fractions) and the NAC-based binary shadow-stacking map of small PSRs on the Shackleton rim; it does not restate or supersede the WAC-derived area and duration figures, which it treats as an already-established input.

### Limitations

The crater model assumes a simple bowl shape with continuously sloping walls on a spherical Moon and explicitly ignores external and floor-level topographic variation. The NAC shadow-stacking method identifies pixels shadowed in every image acquired to date but, because NAC does not revisit identical ground on every orbit, the authors state it cannot yield a meaningful time-fraction (percent-of-year) estimate for those shadowed pixels, only their candidate-PSR status. Results are presented as preliminary; the authors describe integrating NAC and LOLA elevation models, plus thermal modeling, as future work.

### Topic mapping

The introduction and "Impact of Small Scale Topographic Elements" sections carry the resolution-dependence finding (82-89% simulated versus 71% WAC-derived peak illumination) and the boulder-shadow figure. The "Crater Illumination Model" section carries the diameter/depth-ratio/latitude parametric results (Figure 2). The "NAC Illumination Analysis" section carries the Shackleton-rim shadow-stacking map (Figure 3) and the small-PSR identification. The "Discussion" and "Future Work" sections address implications for rover-based exploration of small PSRs versus large PSRs like Shackleton crater's floor, and state planned next steps.

---

## Provenance

- **Landed:** Step 2.5, 2026-08-28, by `tools/merge_identity.js --stage`.
- **Source:** `lsei/literature/power-and-thermal/speyerer-2012-in-search-of-shade.md`
- **Upstream ref:** `lsei@7f97983` — local `HEAD` = `origin/main` = the ref `oracle/VERIFIED.tsv` verifies against, all three agreeing when this was stamped, 2026-08-28; push URL DISABLED. This is the ref the bytes below were merged at.
- **Merge-time digest:** `sha256:f20acd169d969d19986bdc3e21bbfea29712788561f9e45a38c7e92bf3176196` over the bytes of the `Source:` file, taken 2026-08-28. This is the value `bootstrap_contract.md` §7.2 compares upstream against to reach `equal` or `diverged`; without it that verdict is `unknown`.
- **Byte source:** sole-lsei
- **Body edit (2.6):** DECLARED house-format normalization, 2026-08-28, sub-step 2.6 (MERGE-6). Removed: the `## Comprehensive Technical Summary` marker line (1 line, no content under it). **This amends the byte-identity claim carried by `Byte source` above:** the landed body is no longer byte-identical to the `byte_source` copy. It equals that copy under exactly the operations named here and no others — `drop-cts-marker`.
- **Disposition:** LIFT (a landing mode, not a gate)
- **Dedup key:** L2A|lpi.usra.edu/meetings/lpsc2012/pdf/2633.pdf
- **Field:** lunar · **Folder:** power-and-thermal · **Also:** lunar-ice-and-geology
- **Plan row rev:** 1

## Contested
- LCC-09 A
