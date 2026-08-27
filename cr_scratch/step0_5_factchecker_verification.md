# Step 0.5 — The Fact-Checker, verification of `lunar-oracle-gameplan.md`

**Date:** 2026-08-26. **Method:** every claim traced to the tree on disk, to a git object, or to a
tool re-run in this session. No claim was accepted because another document repeats it.

**Tally: 29 SUPPORTED, 6 UNSUPPORTED, 11 CONTRADICTED.**

---

## CONTRADICTED

### C1. The LSEI commit hash is wrong. Two locations.

- **Location:** Design notes, *Verified inventory*: "Lunar Scenario Explorer … main at `c8274e6`."
  Also Progress log, `Setup` row: "CR-Agents (f0c976b) and LSEI (c8274e6) cloned as working copies."
- **Claimed:** `c8274e6`. **True:** `f788ea2`. `c8274e6` is two commits back.
- **Shows it:** `git -C lsei rev-parse --short HEAD` → `f788ea2`; `git -C lsei log --oneline -3` →
  `f788ea2` (dedup), `d7889e1` (abstract rewrites), `c8274e6`. Both later commits were made *this
  session*, by this project, against the working copy the gameplan is describing.
- CR-Agents at `f0c976b` is correct: `git -C cr-agents rev-parse --short HEAD` → `f0c976b`.

### C2. `lsei/literature/` is 152 summaries, not 158, in two unmarked locations.

- **Location:** header, *Other reference files*: "`lsei/literature/` (158 summaries, 8 topic
  folders)". Objectives §1: "`lsei/literature/` (158 summaries in 8 topic folders)".
- **Claimed:** 158. **True:** 152. Eight topic folders is correct.
- **Shows it:** `find lsei/literature -name '*.md' | wc -l` → 152. Per folder:
  growth-and-industrial-theory 26, isru-processing 30, logistics-and-delivery 13,
  lunar-ice-and-geology 20, power-and-thermal 17, programme-primaries 10,
  space-economy-and-markets 26, space-law-and-governance 10.
- The Design notes *do* carry the PROVISIONAL caveat. The header and Objective 1 do not, and they
  are the two places an agent reads first.

### C3. "A person who clones Lunar Oracle gets 119 summaries."

- **Location:** Directory map, closing note *The PDFs stay and the PDFs never ship*.
- **Claimed:** 119. **True:** 176. The map's own `literature/` row defines that directory as "the
  merged corpus," and the merged corpus is the union of both, not the Japanese Miracle half.
- **Shows it:** measured union below (C6 method) → 176.

### C4. `lsei/oracle/` holds 13 Node files, not 12. Two locations.

- **Location:** header, *Other reference files*: "`lsei/oracle/` (the prototype Oracle tooling, 12
  Node files)". Design notes, *Verified inventory*: "`oracle/` (12 Node files, about 3,000 lines)".
- **Claimed:** 12. **True:** 13 `.js` files, plus one JSON fixture. "About 3,000 lines" is correct
  at 3,002.
- **Shows it:** `find lsei/oracle -name '*.js' | wc -l` → 13. They are `answer_question.js`,
  `render_figure.js`, `verify_answers.js`, `verify_figure.js`, and `lib/{address, app_model,
  bitmap_font, exclusions_match, literature_search, manifest, png_encode, raster_figure, svg}.js`.

### C5. The dedup size band is stated as 3x to 5x and one of the four is 1.67x.

- **Location:** Progress log, `Dedup` row: "Four decided on a size gap of 3x to 5x; the two closest
  (1.08x, 1.37x) adjudicated."
- **Claimed:** the four size decisions span 3x to 5x. **True:** 4.6x, 5.1x, 3.0x and **1.67x**.
  Speyerer 2013 (26,400 against 15,836) was decided on size at a ratio the same sentence's own rule
  — "a gap under about 1.5x is not evidence," per `cr_scratch/step0_dedup_decisions.md` — puts only
  0.17 above the adjudication line.
- **Shows it:** `stat -c '%s'` over `lsei/literature/**` and `_intake/superseded-duplicates/`. All
  twelve byte sizes in the decisions table reproduce exactly on disk. The 1.08x/1.37x pair is
  correct.

### C6. "89 of 95 byte-identical" is 87 of 95.

- **Location:** Loose ends D5: "**The Engineer's has now fired negative** (overlap is cosmetic, 89
  of 95 byte-identical)."
- **Claimed:** 89 identical, 6 differing. **True:** 87 identical, 8 differing.
- **Shows it:** pair the two corpora on the retrieval tokenizer's key (`tools/check_corpus_collisions.js`
  `tokens()`), then `Buffer.equals` each pair. Differing: `barro-2004-economic-growth-textbook`,
  `bea-depreciation-rates`, `azami-2024-lunar-manufacturing-review`, `falcon-heavy-wikipedia`,
  `473486main-iss-atcs-overview`, `csank-2022-powering-the-moon`,
  `ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update`,
  `poston-2020-krusty-reactor-design`.
- Three of the eight (azami, csank, poston) differ *because of* the dedup this session. Even
  crediting that, the pre-dedup figure reconstructs to 90, not 89, and the pre-dedup pairing was
  ambiguous on the LSEI side because both members of each removed pair carried the same token key.
  The trigger this number closes should be re-run against a stated basis.

### C7. `verify_report.js` does not exist in either working copy.

- **Location:** Loose ends C4: "`verify_report.js` … lives in a floating working copy. A check this
  project's law depends on can change upstream silently. Vendor it with a recorded sha, or pin that
  one file."
- **Claimed:** the file is in a floating working copy. **True:** it is in neither. `lsei/` has no
  `tools/` directory at all, tracked or untracked.
- **Shows it:** `find lsei cr-agents -name 'verify_report*'` → nothing. `ls lsei` →
  `index.html LICENSE literature lunar-scenario-explorer-map.md NOTICE.md oracle README.md
  report-generator-prompt.md writing-guides`. `git -C lsei ls-files | grep -i tools` → nothing.
  Three files in `lsei/oracle/` reference `verify_report.js` in comments as though it were present.
- The finding is real and worse than written: "pin that one file" is not available as an option,
  because the file is not in the repository the pin would apply to.

### C8. "Roughly 20 of the 73 sub-steps" in a plan the same document rules is 72.

- **Location:** Design notes, *Numbering convention*, final paragraph.
- **Claimed:** 73. **True:** 72, by the document's own `0.3 renumber` progress-log entry, by the
  Steps table (11+18+10+8+3+15+7 = 72), and by measurement.
- **Shows it:** distinct `N.M` rows carrying an Origin ID in
  `cr_scratch/step0_integration_draft.md` → 72, distributed 11/18/10/8/3/15/7.

### C9. "63 Scenario-Explorer-unique summaries" is 57.

- **Location:** Loose ends A6.
- **Claimed:** 63. **True:** 57. The finding itself — that none of them has a local PDF — holds:
  `lsei/literature/` contains 152 files and every one is `.md`.
- **Shows it:** union measurement below; 152 − 95 overlap = 57.

### C10. The generated map does not describe the app on disk, and its generator is not present.

- **Location:** Design notes, *Verified inventory*: "`lunar-scenario-explorer-map.md` (generated,
  and a hand edit to it fails)."
- **Claimed:** the map is a self-verifying derivation of `index.html`. **True:** the map's own
  provenance table records an artifact this repository does not hold, and the check that would say
  so cannot be run.

  | stamp | map records | `lsei/index.html` on disk |
  |---|---|---|
  | bytes | 895,544 | **894,127** |
  | md5 | `a1acb7c4701b0989be2d739a7790cc79` | **`16caa330ebae773684285c301a8e0a98`** |
  | data-island pin | `ca689ef3` | **`e2989bf6`** |

- **Shows it:** `stat -c '%s' lsei/index.html`, `md5sum lsei/index.html`, and the island's own
  `__pin` literal at `lsei/index.html`. The map names `tools/build_map.js` as its generator and
  `--check` as its proof; `lsei/tools/` does not exist, so neither can be run.
- `index.html` has been byte-identical at 894,127 since `c8274e6`
  (`git -C lsei cat-file -s $(git -C lsei rev-parse c8274e6:index.html)` → 894127), so the drift is
  the map's, and it was committed already drifted.
- **The five app totals the gameplan quotes are nonetheless correct.** I did not take them from the
  map. I evaluated the data island out of `index.html` directly: `SLUGS` 86, `CLAIMS` 20,
  `SECTIONS` 66, `EXCLUSIONS` 10, slugs by kind `{claim: 20, section: 66}`, modeled = 86 − 10 = 76.
  Every figure in "894,127 bytes, holding 20 Claims across 66 sections, 86 slugs, 76 modeled nodes
  and 10 excluded ones" verifies against the artifact. The map is what should not be cited for them.

### C11. The document states both "thirteen" and "four" as the corrected abstract-contamination count.

- **Location:** Open Question 8 header text: "**What is true:** thirteen summaries carry verbatim
  text from their source's printed abstract." Against Loose ends A4: "Four summaries reproduced
  their source's printed abstract … **Not thirteen.**" And Progress log `Abstracts`: "four files,
  not thirteen."
- Both are presented as the *corrected* finding, not as the retained original. The retained original
  is separately marked further down the same entry and says thirteen as well.
- **Measured today:** `node tools/audit_abstract_overlap.js _intake/japanese-miracle/lit 10` → 103
  tested, median 0.0%, **0 at or above 10%**. At a 5% threshold three files appear
  (ehricke-1984 8.7%, azami-2024 6.3%, IEEE-2022 5.9%), none of them among the four named.
- The pre-rewrite state is gone, so I cannot rule which number described it. One of the two
  sentences is false and they sit 130 lines apart in the same document.

---

## UNSUPPORTED

### U1. A3's resolution-order claim.

"`csank-2022` resolved to the 7,637-byte summary every time and the 23,190-byte one never."
The collision is verified, both byte sizes are verified, and the same-source determination is
verified (both files carry NASA NTRS Document ID 20220004165). The *behaviour* was not re-run: the
pre-dedup corpus no longer exists in the working tree and reproducing it means restoring six files
under their former names. Everything A3 offers as evidence checks out; this one sentence is the
tool's own comment, not a measurement I could repeat.

### U2. B5's DOI coverage figure.

"Only 79 of 182 carry a DOI at all." A regex for a resolvable DOI (`10.\d{4,9}/`) anywhere in the
file, over the 176-file union, returns **91 with, 85 without**. The 79 was measured on a different
population (182) and, plainly, on a stricter definition — a confirmed DOI field rather than any DOI
string. The basis is not stated in the register, so the number cannot be reproduced or refuted.
Looked at: every `.md` in both trees.

### U3. The author-year cluster count.

The register presents 16 (Space Resources Engineer) against 17 (The Engineer) as a contested count,
which is honest. It is also unresolvable as written, because neither states the clustering rule. A
strict rule — leading alpha author token, optional single hyphenated surname, then a 19xx/20xx year
— returns **9** clusters over the 176-file union. **`sowers-2019` holding four is SUPPORTED**
(`sowers-2019-psr-ice-mining`, `-thermal-mining-ice`, `-thermal-mining-niac-report`,
`-thermal-mining-niac`), and that is the part B4's invariant actually rests on.

### U4. A4's four overlap percentages.

79.8 / 44.0 / 38.4 / 11.9 percent for gott-2024, schreiner-2016, romer-1990 and turyshev-2026. The
four files were rewritten at `d7889e1` and in `_intake/`, so the measured inputs are gone. What does
reproduce: the tool, its population (103 PDF-paired summaries with an `## Abstract`), its median
(0.0%), and its post-fix result (0 at threshold). Flagged, not deleted, per operating rule 4.

### U5. OQ8's "thirty-nine of the 152 summaries" use the attributed-quotation convention.

A grep for the marker forms the entry itself names — "as printed", "transcribed from", "author's own
abstract", "abridged, as printed" — returns **46** files in `lsei/literature/`. The 39 was measured
on some narrower rule that is not stated. Neither number is checkable without the rule.

### U6. The FA1–FA8 count as a claim about *what came over*.

`_intake/japanese-miracle/fa/` holds exactly 19 files, which is SUPPORTED. What is not checkable
from this repository is OQ6's claim that "the rest stays" — the New Space article, the model
versions, the old `cr_scratch`. `_intake/japanese-miracle/` also holds `JM-gameplan.md` and
`JM-accumulator.md`, which the gameplan's inventory does not mention in either list.

---

## SUPPORTED

Counted, run, or read against the primary artifact.

**Corpora.**
1. `_intake/japanese-miracle/lit/`: 119 `.md`, 112 `.pdf`, 3 `.txt`, 363 MB. All four exact.
2. `_intake/japanese-miracle/fa/`: 19 files, `FA1-mechanism-table.md` present.
3. `_intake/superseded-duplicates/`: 6 files, all six superseded members retained (D7).
4. `lsei/literature/`: 8 topic folders, and every file in it is `.md` (relevant to A6).
5. **Overlap 95, measured on the current trees.** `node tools/check_corpus_collisions.js
   lsei/literature _intake/japanese-miracle/lit` → "95 collision group(s) in 271 summaries."
6. **86 exact-name matches**, and **9 more that match only after normalizing case and separators**
   (86 + 9 = 95). Both exact.
7. **The union is 176, and it is now measured rather than arithmetic.** 152 + 119 − 95 = 176, and a
   direct normalized-key union of the two trees returns 176 keys, 57 LSEI-unique, 24 JM-unique. The
   PROVISIONAL marking on 176 can be lifted; 182 is dead.
8. **The 24 Japanese-Miracle-unique summaries are complete and every named file exists.** The
   computed unique set is exactly the 24 names in the Design notes code block, no additions, no
   omissions, no misspellings.

**Tools.**
9. `tools/check_corpus_collisions.js` does what the gameplan says: it mirrors
   `literature_search.js`'s tokenizer including the `t.length > 1` drop and the search's own
   stopword list, walks recursively, and exits 1 on a collision group.
10. It is tested in both directions, as the Progress log claims. Clean: `lsei/literature` → "152
    summaries, 0 collisions," exit 0; `_intake/japanese-miracle/lit` → "119 summaries, 0
    collisions," exit 0. Dirty: adding `_intake/superseded-duplicates/` back reproduces 5 of the 6
    original collision groups, exit 1.
11. E5's accepted limit is documented in the file, in the comment block above `STOPWORDS`.
12. `tools/audit_abstract_overlap.js` does what the gameplan says: `pdftotext` over the first three
    pages, 10-word shingles from the `## Abstract` section, reports the fraction found in the PDF.
13. Its stated results reproduce: **103 tested, median 0.0%, 0 at or above the 10% threshold.**

**Dedup, `cr_scratch/step0_dedup_decisions.md`.**
14. All six kept sizes and all six dropped sizes reproduce byte-exactly on disk. Five of six ratios
    reproduce (the sixth is C5, a mis-stated *band*, not a mis-stated ratio).
15. **The surviving Poston file is the smaller one.** `poston-2020-krusty-reactor-design.md` is
    17,740 bytes in `lsei/literature/power-and-thermal/`; the superseded member retained at
    `_intake/superseded-duplicates/poston-2020-krusty-reactor-design-CANONICAL-superseded.md` is
    19,230. `git -C lsei show --stat f788ea2` confirms the direction: the canonical file lost 279
    lines and the `-2` file was deleted.
16. Same-source determination: DOI or NTRS accession matches in every superseded file —
    `10.48550/arXiv.2408.05823` (azami), NTRS `20220004165` (csank),
    `10.1061/(ASCE)AS.1943-5525.0000236` (metzger 2013), NIAC grant `80NSSC20K1022` (metzger 2021),
    `10.1080/00295450.2020.1725382` (poston), `10.1016/j.icarus.2012.10.010` (speyerer).
17. **No filename among the six removed duplicates is referenced in `lsei/index.html`.** All six
    dropped basenames return 0 hits. One note, not a contradiction: `index.html` *does* carry the
    key `metzger-2021-aqua-factorem` eight times, which is the surviving member's name, so the app's
    citation still resolves. No other kept member is cited either.

**The app.**
18. `lsei/index.html` is 894,127 bytes.
19. 20 Claims, 66 sections, 86 slugs, 76 modeled nodes, 10 excluded — all five re-derived from the
    data island in `index.html` itself, not from the map. Excluded set enumerated:
    bound-oxygen-mare, habitat-water-terrain, oxygen-extraction-energy, helium-procurement-energy,
    iron-production-energy, grade-independent-demand, delivered-cargo-record,
    cadence-cryogenic-break, propellant-mass-leverage, mars-campaign-conditional.
20. C5's forcing case holds: `propellant-mass-leverage` is excluded and `net-value-identity` is not
    in the exclusion set.
21. The island publishes `KNOB_DATA` (`root.KNOB_DATA = KNOB_DATA`, plus `globalThis` and
    `module.exports`).
22. B2's basis: `literature_search.js` line 214 is `frac >= 0.45`, and line 128 says in the tool's
    own words "run against the shipped 156-file corpus rather than the original 57." Both halves of
    the "0.45 tuned on a 156-file corpus" claim check out at source.
23. Five vendored writing guides in `lsei/writing-guides/` (reporting-copy, signs_of_ai_writing,
    structure, style-reference, style; the sixth file is `SOURCE.md`, a provenance note).

**CR-Agents.**
24. Operational guide 750 lines. Twelve standing personas (A.12.1–A.12.12) plus The Recruiter
    (A.13). `method/tdd_method.md` present, `prompt0.md` present, `claude-docx-bundle/` present.

**Loose ends marked FIXED.**
25. **A1.** Deny-by-default under `literature/` verified over seven `git check-ignore` probes:
    `literature/x.pdf`, `x.PDF`, `x.txt`, `x.docx`, `sub/y.pdf` all ignored; `literature/x.md` and
    `literature/sub/y.md` not ignored. Both directions, as claimed.
26. **A2.** `git remote -v` in both working copies shows `origin … DISABLED (push)`, and
    `CLAUDE.md` line 33 carries the idempotent `git remote set-url --push origin DISABLED`
    assertion with its rationale at lines 39–41. Both halves of the row.
27. **A4/A5.** `lsei/README.md` line 26 now reads "No third-party PDF or page image is in this
    repository" — the "or extracted source text" clause is gone, committed at `d7889e1`. And "the
    three with LSEI copies are byte-identical across both corpora" is verified: schreiner-2016,
    romer-1990 and turyshev-2026 are all in the byte-identical set; gott-2024 is JM-unique, so it
    has no LSEI copy, which is why it is three and not four.
28. **E2.** The three-column mapping table exists at §7 of the integration draft, origin tags are
    retained in their own column on every row, and both GATE rows resolve as the gameplan says:
    GATE-1 dissolved, GATE-2 → 6.15.
29. **The dependency validator's four zeros.** I re-ran it. Over the 72 rows: **0 dangling, 0
    forward-or-self references, 0 cycles.** The claim is true.

**The origin-folder survey** (`OneDrive/PROJECTS/CC/CSA_LSEI_Workshops`) verifies in every part:
4.1 GB; `context/reference/lit/` holds 163 PDFs and 163 unique basenames;
`japanese miracle lunar economy lit/` 111; `scenario_undercarriage_sources/` 46 PDFs against 44
`.md`; `lit/` root 5; `fission_program_primaries/` 1; net-new 46 + 5 + 1 = 52;
`_QUARANTINED_prior_art/` 26 `.md` and **zero** PDFs. The Engineer's correction of the
orchestrator's note is sound and the quarantine warning is moot exactly as stated.

---

## Rulings on B6 and B7

### B6 — the register's exemplar pair is not contested. **The row is correct. Uphold it.**

Read on disk, in full, from `_intake/japanese-miracle/lit/`:

**Beason & Weinstein 1996** tests industrial-policy instruments across "13 Japanese mining and
manufacturing sectors over 1955-1990," against "the conventional targeting narrative (associated
with Johnson, 1982)," and "Finds targeting correlates negatively with both sectoral growth and scale
economies in every period, that no instrument shows a robust positive effect on productivity growth
across specifications." The gameplan's characterisation — thirteen sectors, finds against — is exact.

**Henderson 2008** is an Econlib encyclopedia entry "arguing … that the causal role of the Ministry
of International Trade and Industry (MITI) has been greatly exaggerated," whose Key findings section
is headed **The anti-MITI case**, and whose own citation note says it is "used here for the Denison
and Chung decomposition figures it reports, not as an original study." Both halves of the gameplan's
description are quoted correctly.

**The decisive evidence is in Henderson's own file.** Its Topic mapping section reads: "Also relevant
to the **MITI-skeptic thread alongside Beason 1996** and Kiyota 2013." The corpus already classifies
the two as co-belligerents. They are not two sides of anything. Returning Beason without Henderson
is returning one of two agreeing sources, and B1's worked example inherits the defect exactly as B6
says it does. Reclassifying as `false_pair` at ECON-1 is the right disposition.

### B7 — no primary pro-targeting source. **The absence is real. Uphold it, and correct one word.**

I searched for the absence four ways rather than one, because an absence claim is the easiest thing
to get wrong:

1. `find lsei/literature _intake -iname '*johnson*'` → nothing.
2. Full-text grep for `johnson` across both corpora → 18 LSEI files and 15 JM files, every one of
   them a citation *to* Johnson or an unrelated author named Johnson. No file is a summary of him.
3. Full-text grep for the exact title `MITI and the Japanese Miracle` → five hits:
   `henderson-2008-myth-of-miti` (both copies), `nakamura-1989-postwar-japanese-economy`,
   `_intake/japanese-miracle/fa/FA1-source-list.md`, and `_intake/japanese-miracle/JM-gameplan.md`.
   Every one is a reference, none is a summary.
4. I read the abstracts of the four plausible affirmative sources — `wade-2018`, `esri-2016`,
   `aoki-2009`, `nakamura-1989` — rather than trusting the two the row names.

**The ruling.** Johnson 1982 has no summary in either corpus. The affirmative industrial-policy
position survives only as reported speech inside its critics, and the direction of the bias is as
described: asked whether industrial policy worked, this corpus can answer no and sound well-sourced.
The characterisations of Wade ("Debate contribution closing a *Development and Change* Forum on
financialization") and ESRI ("the indicative role of successive national economic plans in
coordinating government policy and signaling direction") are both accurate to the abstracts.

**One correction, and it improves the row.** Johnson 1982 is not merely absent — it is *registered*.
`_intake/japanese-miracle/fa/FA1-source-list.md` entry 14 carries it with a slug already assigned,
`johnson-1982-miti-japanese-miracle`, a full citation, "**PDF route:** library or Internet Archive"
and "**Sub-Q:** 4. Also feeds FA4. **Read against Beason and Weinstein.**" The Japanese Miracle
project identified the same gap, named the same acquisition target, and wrote down the same pairing
B6 is looking for. B7's owner should be told the slug exists; the acquisition is a fetch against a
written specification rather than a fresh decision.

**One thing the row understates.** `wade-2018` is affirmative on the developmental state — its
abstract "argu[es] the latter better explains the catch-up decades" and "rebuts" the conversion
claim — it is simply silent on *sectoral targeting*. The row's "neither makes the targeting claim"
is right; "nearest affirmative source" undersells Wade, who is an affirmative source on the adjacent
question. That distinction is worth keeping because it is the one a retrieval layer will blur.

---

## Claims that are true today and will silently rot

Everything in this section verified. That is the problem with it. The gameplan records measurements
of two working copies that float on `main` and were **written to during this session**, and it
records them in the register's own past tense — "verified," "FIXED" — which reads as durable.

**Tier 1 — already rotting, or rots on the next upstream commit.**

| Claim | Where | Why it rots |
|---|---|---|
| LSEI at `c8274e6` | Design notes; Progress log `Setup` | **Already false.** Rotted inside the session that wrote it. Now `f788ea2`. |
| CR-Agents at `f0c976b` | Design notes; Progress log `Setup` | True today. Floats on `main`. One upstream commit and the operational guide's 750 lines, the twelve-persona roster and the docx bundle all go with it. |
| Operational guide "750 lines"; "twelve standing personas plus The Recruiter" | Design notes | Same working copy, same float. |
| `index.html` 894,127 bytes; 20/66/86/76/10; the data island publishing `KNOB_DATA` | Design notes; used throughout | Same. The app is explicitly "somebody else's live artifact." Every app figure in this gameplan is a snapshot with no expiry stamp. |
| `lsei/oracle/` file count and line count | header; Design notes | Same. |

**Tier 2 — depends on local edits that exist in exactly one place on one disk.**

The six dedup deletions and the four abstract rewrites are committed to the *local* LSEI working
copy at `f788ea2` and `d7889e1`, whose push URL this project deliberately disabled. **A fresh clone
of LSEI reinstates every duplicate and every transcribed abstract.** Every one of these is therefore
true only of this machine:

- `lsei/literature/` = 152 (and the 158 in the header, which is what a fresh clone would restore —
  C2 is a contradiction against *this* disk and would become correct against a clean one)
- overlap 95, LSEI-unique 57, JM-unique 24, **union 176**
- 87-of-95 byte-identical (and the 89 in D5)
- A3 **FIXED**, A4 **FIXED**, A5 **FIXED** — all three carry PENDING-PUSH, which is honest, but the
  register's own status legend defines FIXED as "done and verified" with no clause covering "done in
  a directory the `.gitignore` excludes from this repository"
- `check_corpus_collisions.js` returning 0 on `lsei/literature` — it returns 6 groups on a clean clone
- `audit_abstract_overlap.js` returning 0 at threshold
- the `lsei/README.md` licence sentence, which reverts with the clone
- both `git remote --push DISABLED` settings, which live in `.git/config` and do not survive a
  re-clone; `CLAUDE.md` re-asserts them, and that assertion is the only durable half

**Tier 3 — measurements of things outside version control entirely.**

The whole origin-folder survey — 4.1 GB, 163 PDFs, 111/46/5/1, 44 undercarriage summaries, 26
quarantined `.md` — describes a OneDrive folder that no repository tracks, that syncs, and that
belongs to a different project. It verified today. Nothing will ever tell this project when it stops.

**And one that is not rot but is worth saying plainly.** The Lunar Oracle repository **has no
commits at all** (`git log` → "your current branch 'main' does not have any commits yet"). The
directory map's entire "Pushed: yes" column, `cr_scratch/` "Committed on purpose (A.3.5)", and the
`.gitignore` fix verified at A1 are all currently unrealized. The tools, the decisions file and this
verification exist only as untracked files on one disk.

**The mechanism this argues for** is already half-specified in the gameplan and belongs to D4/ARCH-3:
the ref record that compares at bootstrap and reports drift. Extend it one step — every figure in
this document that came from a working copy should carry the ref it was measured against, the way
D4's own note says an answer must name the model it was computed against. A number without its ref
is a copy, and a copy drifts.
