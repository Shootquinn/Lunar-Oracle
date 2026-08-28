# Step 2 — orchestrator baseline measurements

**Written at the Step 2 open, 2026-08-27, before any agent ran.** Not a deliverable. This file
exists so that the counts Step 2 emits have a known-answer test whose author is not the seat that
produces them. That remedy is The Manager's, from the Step 1 close: the dominant defect class this
project has produced is *a seat running an operation with an instrument it wrote and never tested*,
and the fix he proposed is mechanical rather than a rule someone must remember.

Every figure below carries its counting rule. Anything Step 2 reports that disagrees with a figure
here is a discrepancy to be resolved and recorded, not a number to be preferred. **The baseline is
not the authority on the corpus** — 2.1 (MERGE-2) is, and it measures identity rather than
filenames. The baseline is the authority on what the filenames said on the day the step opened.

## Populations

| Figure | Value | Counting rule, measured 2026-08-27 |
|---|---|---|
| `lsei/literature/` summaries | **152** | `find lsei/literature -type f -name '*.md'`, recursive, no exclusions. Distinct basenames also 152 |
| — by topic folder | 26 / 30 / 13 / 20 / 17 / 10 / 26 / 10 | `growth-and-industrial-theory`, `isru-processing`, `logistics-and-delivery`, `lunar-ice-and-geology`, `power-and-thermal`, `programme-primaries`, `space-economy-and-markets`, `space-law-and-governance`. Sums to 152 |
| `_intake/japanese-miracle/lit/` summaries | **119** | Same rule over that directory. Distinct basenames also 119 |
| `_intake/japanese-miracle/fa/` | **19** | Same rule. The FA shelf. Not corpus; ruled a separate shelf at 1.2 |
| `_intake/superseded-duplicates/` | **6** | Same rule. The A3 deletions, retained |
| `_intake/**` PDFs | **112** | `find _intake -type f -iname '*.pdf'` |
| `_intake/**` other | **3** `.txt` | The UN treaty texts, all three inside `lit/` |
| `literature/` (ours) | **1** | `NAMING.md` only. The merge has not run |

## The union, by filename

| Figure | Value | Counting rule |
|---|---|---|
| Exact-name overlap, `lsei/literature` ∩ `_intake/.../lit` | **86** | `comm -12` over sorted basename lists |
| Union, exact names | **185** | `sort -u` over the concatenation. 152 + 119 − 86 = 185 |
| Union, case-folded names | **184** | The same list lowercased. One pair collapses |
| `lsei`-only | **66** | `comm -23` |
| `_intake`-only | **33** | `comm -13` |

66 + 33 + 86 = 185. The partition closes.

**These replace nothing.** 2.1 (MERGE-2) emits the identity-based count and supersedes every
filename-based figure, per loose end B5. Recorded here so the two are comparable: the gameplan's
provisional figures are **95** overlapping (on the 158-file pre-dedup basis), **182** sources, and
**24** corpus-unique. This measurement returns **86**, **185** and **33** on the current basis. The
gaps are not errors in either direction until 2.1 states which rule it is counting under.

## A7 is a population of exactly one, and both members are the same file

The only pair of names differing solely by case, across the whole prospective union:

- `lsei/literature/space-economy-and-markets/gdp.md` — 6,787 bytes
- `_intake/japanese-miracle/lit/GDP.md` — 6,787 bytes

`md5sum` returns `07dc3e6d6ffe66b6651a60f4e74c3bb3` for both. Byte-identical.

Two consequences for 2.4 and 2.5. First, no content is at risk in this instance, so **a merge that
loses one of them loses nothing and reports success** — the defect is invisible in exactly the case
that exists. Second, the union size is platform-dependent: 185 files land on a case-sensitive
filesystem and 184 on this one. A corpus whose size depends on the developer's operating system
cannot carry a contractual count. `literature/NAMING.md` already rules on this at its case section
and names this pair by name; 2.4's assertion must fire on the general case rather than on this pair,
because a fixture that tests the one known instance is the instrument-that-was-never-tested pattern
again.

## The same-name disagreement set is five files

Of the 86 exact-name overlaps, **81 are byte-identical across the two corpora and 5 differ.**
Counting rule: `cmp -s` on each of the 86 pairs, 2026-08-27.

| Filename | `lsei` bytes | `_intake` bytes |
|---|---|---|
| `azami-2024-lunar-manufacturing-review.md` | 27,771 | 5,437 |
| `barro-2004-economic-growth-textbook.md` | 20,579 | 20,573 |
| `csank-2022-powering-the-moon.md` | 23,190 | 7,637 |
| `falcon-heavy-wikipedia.md` | 2,532 | 2,560 |
| `poston-2020-krusty-reactor-design.md` | 17,740 | 19,230 |

This is 2.2 (MERGE-3)'s same-name adjudication set in full, and it is five pairs rather than
eighty-six. The step's rule holds regardless: two summaries are never merged into one and neither is
deleted; where they disagree on a number, a `DUP-xx` register row is emitted instead of an
adjudication.

`barro-2004` differs by 6 bytes and `falcon-heavy` by 28. Neither is presumptively a content
disagreement, and neither is presumptively a line-ending artifact either — this repository has
already produced one whole-file CRLF diff from a text-mode write. Whoever adjudicates measures it.

## Finding: loose end A3 contradicts itself, and its unverifiable clause is re-openable

A3's Finding cell says the `csank-2022` retrieval claim "is the tool's own comment rather than a
measurement anyone could repeat — the pre-dedup corpus no longer exists in the working tree."

A3's own Status cell, four sentences later, says "Superseded members retained at
`_intake/superseded-duplicates/`."

Both are in the same row and they disagree. Measured on disk:

```
lsei/literature/power-and-thermal/csank-2022-powering-the-moon.md    23,190  243ccf186d99
_intake/japanese-miracle/lit/csank-2022-powering-the-moon.md          7,637  e4deb92abbc2
_intake/superseded-duplicates/csank-2022-powering-the-moon-2.md       7,637  e4deb92abbc2
```

Both members of the pair are present, and the superseded member is present twice, byte-identical
(`e4deb92abbc2`). Further, `_intake/superseded-duplicates/` holds exactly 6 files and
`lsei/literature/` holds exactly 152; **152 + 6 = 158, the pre-dedup basis.** The population A3 calls
gone is on disk in two directories.

**What this does and does not establish.** It establishes that the claim is testable, not that it is
true. Reconstructing the fixture needs the superseded members' original filenames, which two of the
six no longer carry — `csank-2022-powering-the-moon-2.md` and
`poston-2020-krusty-reactor-design-CANONICAL-superseded.md` were renamed at retention time. Checked
rather than assumed: `cr_scratch/step0_dedup_decisions.md` carries a table giving **both byte sizes
for every pair**, so each retained file pairs back to its counterpart by size without depending on
the filename that was rewritten. It also records that the kept member of one pair "is the former
`-2`, renamed to the canonical filename," which is where the two odd names came from. The pre-dedup
158 is therefore reconstructible, and the reconstruction has to be the full 158 rather than a
two-file fixture, because the ranker weights by IDF over the whole corpus and the outcome is a
property of the population.

One correction to the claim while the file is open. A3's unverified sentence attributes the
`csank-2022` outcome to the ranker preferring one summary. `step0_dedup_decisions.md` line 21 says
the collision was "resolved by directory-walk order." Those are different mechanisms, and an
order-dependent result is not a ranking result. Whoever re-runs this tests the mechanism the dedup
file names, not the one the tool's comment claimed.

Owner: The Engineer, at 2.2, which already consumes both `step0_dedup_decisions.md` and
`_intake/superseded-duplicates/`. **He is not obliged to re-open it** — A3 is marked FIXED on its
substantive half and the unverified sentence is one sentence about retrieval behaviour, not about
the merge. What is owed either way is that A3 stops saying two incompatible things. If the claim is
re-run, record the result; if it is not, the Finding cell's "no longer exists in the working tree"
clause is struck, because it is false and it is the reason the row was closed as unverifiable.

## What is in `_intake/` that is not corpus and that no sub-step names

`_intake/japanese-miracle/` holds `JM-gameplan.md` (158,635 bytes) and `JM-accumulator.md` (53,945
bytes) — the Japanese Miracle project's own method artifacts, not summaries.

The Fact-Checker flagged their absence from the gameplan's inventory at 0.5, and the gameplan
records that at its Design notes. What is still unaddressed is their **disposition**: sub-step 2.5
says `_intake/japanese-miracle/lit/` empties, which is `lit/` only, so these two files and the
19-file `fa/` shelf survive the merge in a directory that `.gitignore` excludes at line 26
(`/_intake/`, verified with `git check-ignore -v`). They are therefore untracked, unmerged, and
unnamed by any sub-step.

That may well be correct — they are the prior project's records rather than this one's, and the
design intent says the corpus moves here, not the method. But "this folder is the new Japanese
Miracle folder" is a lineage claim, and the lineage currently lives only in an ignored directory on
one machine. Raised as an open question for the author at the Step 2 gate rather than resolved here.
