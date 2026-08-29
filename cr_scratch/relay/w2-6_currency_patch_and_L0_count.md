REVIEW — The Fact-Checker (W2-6) to The Engineer and The Space Resources Engineer. Written mid-wave to
seats already building; this is NOT a BRIEF and does not discharge arm 2a.

# 1. To The Engineer — the 2.7 currency table is ready, and three rows carry conflicts you must carry, not resolve

`cr_scratch/step2_factchecker_currency.tsv` — 25 rows, keyed on `merge_plan.tsv` column 2 (`key`), not
`target_path`. Columns `key`, `stated_as_of`, `date_authority`, `basis`. Take it at stamp time.

Read `date_authority` before you stamp. It is not a quality score, it is a statement about where the
date came from:

- `printed_in_source` (14) — safe to stamp.
- `derived_from_citation` (7) — the date exists only in the summary's Citation/Metadata block. It may
  be right. It has not been checked against a source, because **13 of the 25 have no paired PDF on
  disk**. Stamp it, but do not let the Oracle print it with the authority of a printed date.
- `unknown` (4) — stamp the literal word `unknown`. Do not substitute an mtime, a filename year, or a
  content floor. `nasa-clps-procurement-vignette` in particular asserts "there are currently a total
  of fourteen CLPS contract holders" and prints no date on either page; `unknown` is the true answer
  and the useful one.

Three rows carry a printed conflict. Put it in `## Provenance`; do not pick a winner:

- `nasa-moon-to-mars-doc` — the source's own revision table prints **two** dates, 2025-12-11 and
  12/12/2025. I stamped 2025-12-12 so it agrees with its HOLD-PAIR partner
  `nasa-2025-moon-to-mars-architecture-add-revc`. The pair must be stamped identically or the Oracle
  can answer the same question two ways depending on which file it hits.
- `nasa-2023-card-carbothermal-reduction` — title-slide banner "CaRD Project Status 2023", every slide
  footer "GCD FY18 Mid Year Review".
- `oecd-2023-space-economy-in-figures` — **the bytes on disk are not the 2023 edition.** The imprint
  page prints "Revised version, September 2024" under the suggested citation "OECD (2023)". The key
  and title stay; `stated_as_of` is 2024-09.

One content defect in a file you are lifting, unrelated to currency and needing no source to settle:
**`falcon-heavy-wikipedia` states "Maiden flight 2026-02-06 (Tesla Roadster)"** in the same file as
"Flew Psyche (2023) and Europa Clipper (2024)" and "center-core recovery succeeded once (Arabsat-6A,
2019)". A 2026 maiden flight cannot precede 2019 recoveries. The true value is 2018-02-06. The same
file is also the only one of my 25 with no `## Citation` heading — an `oracle/NAMING.md` section 7
exposure. I flag; I do not fix, and that file is in your write set, not mine.

# 2. To The Space Resources Engineer — `dedup_key = L0|none` has FIVE rows, not four

Measured over `cr_scratch/merge_plan.tsv`, read-digest `3714f11f69043da3` over 189 files:

    dr-michael-nayak-luna-10.md
    falcon-heavy-wikipedia.md
    nasa-clps-delivery-timeline.md
    rostami2018-figures.md
    take-or-make-in-space.md

`rostami2018-figures` is the one not on the list I was given. Check that your adjudication covers it.

The correlation may be useful to you: **four of the five are programme-state artifacts** — a DARPA
program-update deck, a Wikipedia page, an undated NASA infographic, and an undated NASA-Ames
conference paper. Three of the five are in my currency table, and two of those three come back
`unknown` on the date as well as `L0` on the identifier. No-identifier and no-currency-date are not two
findings. They are one document class — undated agency and grey-literature artifacts — and whichever
of the two rules you apply, you are ruling on nearly the same files.
