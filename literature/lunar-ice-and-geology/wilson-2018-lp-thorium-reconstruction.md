# Wilson et al. (2018) — Image Reconstruction Techniques in Neutron and Gamma-Ray Spectroscopy: Improving Lunar Prospector Data

## Provenance
- **Source file:** `wilson-2018-lp-thorium-reconstruction.pdf` (on disk, project root; 17 pp, 14.9 MB, valid PDF verified with pdfplumber)
- **Document type:** Peer-reviewed research article (author preprint version)
- **Authors:** Jack T. Wilson, David J. Lawrence, Patrick N. Peplowski, Joshua T. S. Cahill (JHU/APL); Vincent R. Eke, Richard J. Massey (Durham); Luís F. A. Teodoro (BAER / NASA Ames)
- **Venue:** arXiv preprint arXiv:1802.09508 (submitted 26 Feb 2018); published version in *Journal of Geophysical Research: Planets*.
- **Year:** 2018
- **DOI:** `10.48550/arXiv.1802.09508` (arXiv record). Published-version DOI listed on the arXiv record as `10.1029/2018JE005589` (JGR: Planets) — transcribed from the arXiv "related DOI" field, not from the PDF body; confirm on the journal page before formal citation.
- **Publisher URL:** https://arxiv.org/abs/1802.09508 (preprint); https://doi.org/10.1029/2018JE005589 (journal version)

Licence: own-summary

The prose below is this project's own, written from the paper, and is dedicated with the rest of
this repository under the Unlicense. Until 2026-08-28 (Step 8.8) this section was headed
"transcribed from title page", which it never was: the section is this project's own condensed description, and the audit measures 11.2% overlap, which is two short technical clauses, not a reproduction. The source is an arXiv preprint that prints no reuse licence at all, which is a further reason not to reproduce it. The heading was corrected rather
than the prose rewritten -- there is nothing wrong with the prose, and rewriting it to satisfy a
heading would have destroyed real provenance. The citation, DOI and publisher URL are attribution
and stay.


## Abstract (this project's own description; not the publisher's abstract)
Presents improved-resolution maps of the Lunar Prospector Neutron Spectrometer (thermal, epithermal, fast neutron) data and Gamma-Ray Spectrometer **Th-line fluxes** via global application of **pixon image reconstruction**. Using mock datasets, the pixon method compares favorably with other reconstruction methods used in planetary neutron/gamma-ray spectroscopy. Improved thermal-neutron maps resolve compositional variation across the surface, including within Hertzsprung and Schrödinger basins; confirm Hertzsprung as one of the most anorthositic parts of the crust (near-pure anorthite over tens of km); and reveal at Orientale a surface-vs-subsurface regolith-maturity mismatch implying complex layering.

## Summary

### Background / objective
The Lunar Prospector (LP) Gamma-Ray Spectrometer (GRS) and Neutron Spectrometer (NS) mapped the global distribution of major and several minor elements. This paper's objective is methodological: improve the effective spatial resolution of those LP maps — including the **thorium (Th-line) gamma-ray map** — using pixon reconstruction, to sharpen composition estimates. Relevant here as the modern, open-access, authoritative-team (Lawrence/Peplowski) treatment of LP thorium and neutron elemental mapping.

### Methods / scope
Pixon-based image reconstruction applied globally to LP NS thermal/epithermal/fast neutron count rates and GRS Th-line flux; validated against mock (synthetic) datasets and compared with prior deconvolution methods. Neutron data are geochemically informative because **thermal neutrons are absorbed predominantly by Fe, Ti and the REE Gd and Sm** — so thermal-neutron maps double as a proxy for these neutron-absorbing (including rare-earth) elements.

### Key findings (with quantitative / qualitative values)
- Pixon reconstruction meaningfully increases the spatial resolution and dynamic range of LP Th and neutron maps versus earlier smoothed products.
- **Thermal neutron flux maps neutron-absorbing elements Fe, Ti, and REE (Gd, Sm)** — a remote-sensing handle on rare-earth distribution complementary to the Th gamma-ray map.
- Hertzsprung basin confirmed as one of the most anorthositic (near-pure anorthite) regions of the lunar crust over a region tens of km in diameter.
- Orientale epithermal-neutron improvement reveals a surface-vs-subsurface maturity mismatch (complex vertical layering).
- Builds directly on the LP Th mapping lineage (Lawrence et al. 2003 small-area Th features; Prettyman et al. 2006 elemental composition), improving the resolution at which Th and KREEP-associated features can be delineated.

### Why it matters for SPA/KREEP resources
Provides the methodology and improved maps underlying quoted lunar thorium (and, via thermal neutrons, REE-proxy) distributions — the data product from which SPA and PKT thorium abundances are read. It is the open-access, citable entry point to the LP thorium/REE mapping record (the classic Lawrence 2003 and Prettyman 2006 papers themselves are paywalled — see index "HAND TO QUINN").

## Limitations
- Primarily a methods/reconstruction paper; it improves maps rather than reporting a clean table of headline Th ppm values for SPA/PKT (for those, use Andrews-Hanna 2025 and Crawford 2015 in this collection).
- Preprint version on disk; final pagination/figures may differ from the JGR journal of record, and the journal DOI here is transcribed from the arXiv related-DOI field, not the PDF body.
- Neutron-derived REE (Gd/Sm) sensitivity is indirect (absorption proxy), not a direct REE abundance.

## Topic mapping (neutral)
- Lunar Prospector GRS/NS thorium and elemental mapping — the instrument/data basis for SPA and KREEP thorium abundances.
- REE remote sensing via thermal-neutron absorption (Gd, Sm) — complements the KREEP/REE feedstock discussion.
- Methodological provenance for resolution of small high-Th ("red spot") features relevant to prospecting.

---

## Provenance (merge)

- **Landed:** Step 2.5, 2026-08-28, by `tools/merge_identity.js --stage`.
- **Source:** `lsei/literature/lunar-ice-and-geology/wilson-2018-lp-thorium-reconstruction.md`
- **Upstream ref:** `lsei@7f97983` — local `HEAD` = `origin/main` = the ref `oracle/VERIFIED.tsv` verifies against, all three agreeing when this was stamped, 2026-08-28; push URL DISABLED. This is the ref the bytes below were merged at.
- **Merge-time digest:** `sha256:5875f3f0e5409711b90d529b49c1465e6bbd7fffc13e0ab766e3dd553fdc5302` over the bytes of the `Source:` file, taken 2026-08-28. This is the value `bootstrap_contract.md` §7.2 compares upstream against to reach `equal` or `diverged`; without it that verdict is `unknown`.
- **Byte source:** both-identical
- **Disposition:** LIFT-IDENTICAL (a landing mode, not a gate)
- **Dedup key:** L1|10.48550/arxiv.1802.09508
- **Field:** lunar · **Folder:** lunar-ice-and-geology
- **Plan row rev:** 1
