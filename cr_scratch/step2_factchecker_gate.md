# Step 2, Wave 1 — The Fact-Checker: the A.10 step 2 source-verification gate

**Write set:** this file only. I flag; I do not fix. Nothing below was deleted, corrected or moved.

---

## 0. Premise check — first line, standing clause 1

| # | Premise as stated in my brief | Verdict |
|---|---|---|
| **P1** | §13 lists exactly four entries and that is the whole list; two live (`PRV-13`, `PRV-15`), two on-fill | **HOLDS.** `oracle/tests/corpus_suite.md` L389–394: four table rows, `PRV-13`, `PRV-15`, `SLOT-B on fill`, `SLOT-A/B on fill`. `[gate]` appears in the suite body exactly twice, on PRV-13 and PRV-15 (L212, L214). |
| **P2** | `PRV-6` and `PRV-8` are filesystem claims, not source claims | **HOLDS for the rows; FAILS for PRV-8's rider.** Both pass criteria are path resolution. But PRV-8's mutation cell carries a factual assertion — "the 15 pre-existing blocks point at PDF paths that do not resolve" — and that is a measurement, not a path check. See F5. |
| **P3** | Both corpora are on disk and every source a flagged test cites is openable today | **FAILS.** 112 PDFs, all in `_intake/japanese-miracle/lit/`. `lsei/` holds **zero** PDFs and `literature/_pdf/` does not exist. Of the 271 corpus `.md` files, **only 30 have an openable paired source**. 82 of 112 PDFs have no DOI-bearing summary to check. The gate is runnable on a minority of the corpus, and that is a fact about today, not a defect in the suite. |

**Read-digest (standing clause 3).** Instrument walked `lsei/literature` + `_intake/japanese-miracle/lit`.
`md_read=271  pdf_read=112  files=383  sha256(path|size|mtime, sorted)=b540cef707ed8749`.
Every count below is from this walk unless it names another. **Census self-counting (clause 4):** this
file lives in `cr_scratch/` and is outside both scan roots; it is **not** counted in any figure here.

---

## 1. `PRV-13` — the DOI gate. **VERDICT: CONTRADICTED as written. The recorded DOIs are clean.**

**Sampling rule.** Not a sample — a **census of the whole testable population**, twice, at two scopes.
Scope A, the row's literal population: every file carrying a `## Provenance` block whose block also
carries a DOI-labelled line with a `10.x` value, and a paired PDF by filename stem. **23 rows, 12
distinct PDFs.** Scope B, the population PRV-13 will govern after the merge stamps blocks on
everything: the same rule with the DOI taken from the first DOI-labelled line anywhere in the first
4 KB. **53 rows, 30 distinct PDFs — every openable source in the repository.** Both censuses ran to
completion; no row was skipped for convenience. Comparison is `10.` onward, lowercased, resolver
prefix stripped, trailing punctuation stripped. Confirmation is `pdftotext` pages 1–4, and every
non-match was then re-run over the **whole** PDF before it was recorded.

### F1. Zero altered DOIs. Nothing is fabricated. **SUPPORTED, and stronger than the row claims.**
Scope B, 30 distinct sources: **14 MATCH, 16 NOT-PRINTED, 0 MISMATCH.** I looked for the failure this
row exists to catch — a single altered digit pointing at a different paper — and it is not there. The
14 matches are character-exact from `10.` onward. That is the finding the author should have.

### F2. The pass criterion is unsatisfiable for over half the corpus. **CONTRADICTED.**
PRV-13 reads "the `doi:` value equals the DOI printed in the source." **16 of 30 sources print no DOI
anywhere in the PDF** — confirmed by whole-file scan, not pages 1–4. Thirteen of the sixteen are
pre-DOI or DOI-free scans (`solow-1956`, `lewis-1954`, `rosenstein-rodan-1943`, `rebelo-1991`,
`romer-1990`, `murphy-1989`, `lucas-1988`, `jones-1995`, `aghion-1992`, `may-1977`, `dingman-1993`,
`caballero-2008`, `hausmann-2005`): **zero `10.` strings in the entire file.** Their recorded DOIs are
correct Crossref/JSTOR DOIs obtained away from the document. **PRV-13 as written goes RED on all
sixteen, and every one of the sixteen is right.** A test that fires on a correct value is a test that
gets switched off. The row needs a third outcome — *printed and matches* / *printed and differs* /
*not printed by the source*, the third routed to a named non-source authority — and it does not have one.

### F3. Three arXiv DOIs are constructed, not transcribed. **UNSUPPORTED — not contradicted.**
`azami-2024` `10.48550/arXiv.2408.05823`, `wilson-2018` `10.48550/arXiv.1802.09508`,
`crawford-2015` `10.48550/arXiv.1410.6865`. The PDFs print `arXiv:2408.05823v1` and `arXiv:1802.09508v1`
in the margin stamp; `crawford-2015` prints no identifier of its own at all (the `10.` hits in that file
are its own bibliography). The `10.48550/arXiv.` prefix is **added by the summarizer under a scheme**.
The scheme is real and the DOIs almost certainly resolve. But the value in the file is not the value in
the source, and I am not calling it CONTRADICTED because nothing shows it is wrong — it shows the
source does not say it. That is the distinction that caught the helium-3 relay error at Step 1 and I am
holding it here.

### F4. The corpus already has the discipline the suite lacks — and the suite does not read it.
`benaroya-1998` states in the file: *"DOI verified 2026-07-21 via ASCE Library (the DOI is not printed
in the 1998 PDF but resolves on ascelibrary.org and matches the deterministic ASCE scheme)."*
`aghion-1992`, `beason-1996`, `aoki-2009`, `barro-2004`, `christiano-1989` carry `DOI: unconfirmed …
not recorded here per no-inferred-DOI`. **The summarizers already distinguish transcribed from inferred
from withheld.** PRV-13 collapses all three into one binary and the eight-key block has no field to
carry the distinction. That is a schema gap, and it is 1.8's, not mine — see `## Not mine`.
Instrument note against myself: my Scope-B regex read `aghion-1992`'s hedge sentence as a recorded DOI.
It is a false positive of my instrument. Corrected here rather than quietly dropped.

### F5. Two more source-content facts, live on disk, that PRV-13's neighbours will meet.
(a) `castillo-rogez-2022` records `` `https://doi.org/10.3847/PSJ/ac34ee` `` — **with the resolver
prefix**, which PRV-13's own criterion forbids and PRV-12's `^doi:` regex would reject.
(b) `wilson-2018` records the arXiv DOI in `DOI:` and the **journal** DOI `10.1029/2018JE005589` in
`Publisher URL:` — two DOIs, one source, one block. DUP-2 precedence has no rule for which is level 1.

---

## 2. `PRV-15` — the licence-label gate. **VERDICT: CONTRADICTED, on the instrument.**

### F6. Both classes are empty. The row is vacuously green and cannot be gated as §13 asks.
§13 says "open a sampled set of both classes." **Neither class exists.** `Licence: own-summary` and
`Licence: contains-transcribed-source-text` appear in **zero** corpus files — the only occurrences
repository-wide are in `cr_scratch/` planning documents and in `corpus_suite.md` itself. No file under
`literature/` carries a `## Provenance` block; `literature/` holds exactly one file, `NAMING.md`.
So this is not a gate I can pass or fail on labels. What I can do — and did — is verify the
**measurement** the labels will be derived from, because if the measurement is wrong every label is.

### F7. The instrument PRV-15 names returns ZERO findings on the whole corpus. **CONTRADICTED.**
`node tools/audit_abstract_overlap.js _intake/japanese-miracle/lit 10` →
`tested 103, skipped 10 with no ## Abstract section, median 0.0%, AT OR ABOVE 10% VERBATIM: 0`.
**Cause, diagnosed, not guessed.** L38 of the tool: `md.match(/^##+\s*Abstract\s*$([\s\S]*?)…/mi)`.
The `$` after `Abstract` requires a bare heading. The corpus writes six heading forms:

```
109  ## Abstract
  5  ## Abstract (transcribed from title page)
  1  ## Abstract (transcribed)
  1  ## Abstract (transcribed from title page, paragraph [1])
  1  ## Abstract (transcribed / lightly de-hyphenated from page 1)
  1  ## Abstract (as transcribed / paraphrased from the paper)
```

**Eight of the nine annotated headings are exactly the files that light up**, and the regex skips
every one of them. The tool is blind by construction to the population it was written to find. Those
eight are the whole of its `skipped: 10`, with `falcon-heavy-wikipedia` (no abstract) and one more.
**PRV-15 makes this tool the authority on a fact it cannot observe.** Fix is one character — drop the
`$` — and it is not mine to make.

### F8. Re-run with the heading regex relaxed, and nothing else changed. The measurement is sound.
`section=Abstract tested=112 skipped_noSection=1 skipped_noPdf=6 median=0.0%` — **8 at or above 10%:**

```
100.0% [declared] prettyman-2006   40.9% [declared] andrews-hanna-2025
 95.6% [declared] levin-2025       39.4% [declared] hagerty-2011
 74.0% [declared] mcleod-2017      11.4% [declared] lawrence-2003
 54.1% [declared] castillo-rogez-2022             11.2% [declared] wilson-2018
```

**All eight reproduce The Engineer's Step 0 figures to the decimal place.** His shingle measurement is
confirmed by an independent re-run. Say that plainly: the instrument he described was right.

### F9. The four **undeclared** files of the Step 0 finding measure **0.0%** today. **CONTRADICTED.**
Step 0 Part 8 named `gott-2024` 79.8%, `schreiner-2016` 44.0%, `romer-1990` 38.4%,
`turyshev-2026` 11.9% as at-or-above-threshold and **not** self-labelled. Measured today, same tool,
same corpus, relaxed heading: **0.0%, 0.0%, 0.0%, 0.0%.** All four have plain `## Abstract` headings,
so no regex explains it. I opened `gott-2024`: its abstract is 153 shingles of the project's own prose,
no quotation marks, no ellipsis, and **no `(abridged, as printed on p.1)` note** — the exact marking
Part 8 describes it as carrying. Either the four were rewritten after Step 0, or Part 8's description
of `gott-2024` does not describe the file. There is no git history at this root to rule between them,
and **I will not guess.** What is certain: **the four figures are not reproducible against the corpus
as it stands, and the eight are exact.**

### F10. The threshold-crossing count is a moving number with no stated basis. **UNSUPPORTED.**
Five figures for one population are on record: **13** (Step 0 Part 8 finding), **12** (Part 8 census),
**4** (the Step 0.5 correction, and the accumulator's governing text), **0** (shipped tool today),
**8** (relaxed tool today). Each is a correct measurement of a different moment, instrument, section
or threshold, and **none is reconcilable from what is written.** PRV-15 says "the measured overlap"
and names no instrument version, no section (`## Abstract` vs `## Summary` — I ran both; `## Summary`
returns 0 of 16), no page depth (the tool reads pages 1–3), no corpus root, and no threshold in the
row itself. This is standing clause 6 unmet on the row that most needs it. **It is UNSUPPORTED, not
CONTRADICTED: no figure is shown false, and no figure carries the rule that would let anyone re-derive it.**

### F11. The classification, on today's measurement, is clean — and that is the Step 0 precedent held.
Zero undeclared files cross the threshold. Every crossing file declares transcription in its own
heading. **A shingle detector measures overlap, not passing-off**, and on this corpus the overlap that
exists is marked at the point of use. The Step 0 error was reporting thirteen where four were true;
the symmetric error available now is reporting eight as a licence problem when eight are disclosed
quotations. **I am not making it.** PRV-15's real risk is the opposite of the one it names: not a
high-overlap file mislabelled `own-summary`, but a file that declares transcription in a heading the
labelling instrument never reads, and therefore never gets labelled at all.

---

## 3. §13's own boundary — the line drawn by the person it exempts

Guidance about where to look is not neutral, so I read the other 146 rows against his rule rather than
his list. **His boundary is substantially right.** Four rows should have been flagged and were not.

| Row | Why it is a source claim | Verdict |
|---|---|---|
| **DUP-5** | "A `url:` value whose host is a DOI resolver is rejected and routed to level 1." Deciding this needs the recorded URL read against what the publisher actually serves. **Live on disk today: 14 `Publisher URL:` lines are `https://doi.org/…`** across 8 distinct sources (`leger-2025`, `andrews-hanna-2025`, `hagerty-2011`, `lawrence-2003`, `levin-2025`, `prettyman-2006`, `castillo-rogez-2022`, `wilson-2018`). DUP-5's mutation is not hypothetical; it is the current state. | **SHOULD HAVE BEEN FLAGGED** |
| **DUP-6** | "The URL is a publisher article URL; mirrors and search results are refused." Whether `arxiv.org/abs/…` or `pmc.ncbi.nlm.nih.gov/articles/PMC12507655/` is a mirror or the publisher is a judgement about the source, not about the string. `andrews-hanna-2025` records both. | **SHOULD HAVE BEEN FLAGGED** |
| **PDF-11** | "the pull is **224,042,382 bytes**." A byte count of files **not yet on disk**. Nothing in the repository can confirm or refute it — the defining shape of an unverifiable source claim. It is also the T4-adjacent figure my brief warns is unsettled. | **SHOULD HAVE BEEN FLAGGED** |
| **PRV-13's neighbour PRV-12** | `^(doi:\|url:\|authoryear:)` is pure form — correctly unflagged — **but** F4 shows the corpus carries at least three DOI epistemic states (transcribed / inferred-under-scheme / withheld) that the closed prefix set cannot express. Not a §13 miss; a schema gap that PRV-13's gate exposed. | not §13's — see `## Not mine` |

**Rows he did NOT flag that I checked and confirm need no gate** — every one resolved against disk, and
each was measured rather than accepted:

- **PDF-9**, "largest summary in the prospective union is 84,767 bytes" — **VERIFIED exactly.**
  `lsei/literature/programme-primaries/nasa-moon-to-mars-doc.md`, 84,767 bytes. Next is 63,040.
- **PDF-10**, "at 500 KB it admits 29 of the 112" — **VERIFIED.** 83 of 112 `_intake` PDFs exceed 500,000
  bytes; 112 − 83 = **29 admitted**. Same answer at 512,000, so the SI/binary ambiguity PDF-11 warns
  about does not bite here.
- **CRP-11**, "`barro-2004` differs by 6 bytes and `falcon-heavy` by 28" — **VERIFIED, and sharpened.**
  Raw deltas 6 and 28; **CRLF-normalized deltas are also 6 and 28**, so both are genuine content
  differences, not line-ending artefacts. CRP-11's own distinction survives its own examples.
- **PRV-8's rider**, "the 15 pre-existing blocks point at PDF paths that do not resolve" — **QUALIFIED,
  and the count is right for a reason the row does not state.** `_intake/japanese-miracle/lit` holds
  exactly **15** `## Provenance` blocks (13 more sit in `lsei/literature`, total 29 — the "15" is one
  tree, unstated). Of those 15, **14 carry a `Source file` line and all 14 name a PDF that is on disk**
  in that same directory; 1 carries no `Source file` line at all, which is PRV-2/PRV-3's problem, not
  PRV-8's. They fail PRV-8 only because PRV-8 resolves against `literature/_pdf/`, **which does not
  exist yet**. The rider reads as "these blocks are broken." Measured, the PDFs are all there and the
  destination is not. Do not carry the rider forward as evidence of a data defect.

---

## 4. Wave 3 look-ahead — what the 2.7 `stated_as_of` patch table will need from this wave

I am not building it now. Building it needs four things this wave can supply, and **three of the four
do not exist today**, which is the point of saying it now rather than in Wave 3:

1. **The file set.** Which landed files are programme-state snapshots. `nasa-moon-to-mars-doc`,
   `oecd-2023-space-economy-in-figures`, `nasa-2025`, `matthews-2026`, `turyshev-2026` are candidates I
   can see; the closed list is 2.3's taxonomy call, not mine, and I need it **named**, not inferred.
2. **An openable source for each.** This is the binding constraint and P3 already failed on it. A
   programme-state date can only come from the document. **`lsei/` has no PDFs**; if a snapshot's source
   is `not held`, I cannot supply a date and the row must ship as a stated gap, not a guess.
3. **A stated rule for which printed date wins** when a source prints several. `cannon-2020` prints
   received 15 Oct 2019 / revised 23 Mar 2020 / accepted 25 Mar 2020 / online 28 Mar 2020 / cover
   1 Sep 2020 — **five dates, one document.** Without a rule the table is my preference in a date's
   clothes, and that is the counting-rule defect one level over.
4. **The `## Provenance` blocks stamped and readable**, since the table is `file → stated_as_of → date
   the source prints` and the first column does not exist until W2 lands the tree.

---

## Not mine

| Finding | Sub-step | Owner |
|---|---|---|
| `tools/audit_abstract_overlap.js` L38 heading regex `^##+\s*Abstract\s*$` skips all 8 annotated headings; the tool returns 0 on a population of 8. One-character fix, not in my write set. | 2.12 / MERGE-8 | The Software Engineer |
| The eight-key block has no field for DOI provenance state (transcribed / inferred-under-scheme / withheld). The corpus already distinguishes all three in prose; the schema flattens them. | 1.8 schema, applied at 2.7 | The Systems Engineer |
| `PRV-13` needs a third outcome for "source prints no DOI" and a named non-source authority for it. 16 of 30 openable sources are in that state. | 2.4 assertions | The Software Engineer |
| DUP-5's mutation is live: 14 `Publisher URL:` values are DOI resolver URLs across 8 sources. Dedup will key level-2 on a level-1 identity. | 2.2 / dedup | The Software Engineer |
| The Step 0 Part 8 figures for `gott-2024`, `schreiner-2016`, `romer-1990`, `turyshev-2026` do not reproduce (0.0% each) and Part 8's description of `gott-2024`'s markup does not match the file. Needs the author's ruling on whether the four were rewritten. | escalation, 2.12 | The Manager → the author |
| **Write-set collision, flagged not resolved.** Standing clause 8 sends anything another agent acts on to `cr_scratch/relay/spawn/` **before** that agent runs. My constraint says "`cr_scratch/step2_factchecker_gate.md`. Nothing else." I obeyed the narrower rule and wrote no relay file. If The Software Engineer is to act on F7 or F9 in this wave, someone with the write set must relay it. | wave mechanics | The Manager |

---

## 5. Gate ruling

| Test | A.10 step 2 ruling |
|---|---|
| **PRV-13** | **DOES NOT CLEAR.** The claim it makes about the corpus is *true* — zero altered DOIs in a full census of 30 openable sources — but its **pass criterion is contradicted**: 16 of 30 sources print no DOI, so the row goes red on sixteen correct values. It is not the contract until the criterion admits a not-printed outcome. |
| **PRV-15** | **DOES NOT CLEAR.** Both label classes are empty, and the instrument the row names returns 0 findings on a population of 8 because of a regex it cannot see past. The underlying measurement, re-run independently, is **sound and reproduces to the decimal on all eight declared files**. It is not the contract until the instrument can observe what the row asserts. |
| **SLOT-A/B, SLOT-B (on fill)** | Correctly deferred to Wave 3. §4 above states what Wave 1 must supply for the 2.7 table, and three of the four things do not exist today. |

**One sentence for the close, and it is the A.9 tension stated from my side.** Every DOI in this corpus
is correctly cited; the failure I found is not a fabricated source but **two contracts asking sources
to say things sources do not say** — PRV-13 asking a 1956 QJE scan to print a DOI, and PRV-15 asking a
tool to classify headings it never reads. Internal agreement would not have found either. Only opening
the PDF did.
