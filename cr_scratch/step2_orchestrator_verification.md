# Step 2 — orchestrator verification

**Every load-bearing empirical claim Step 2 makes, re-run by the orchestrator, with the command that
produced each verdict.** The Step 1 file of this name is the one a cold session was told to read
first, and it earned that by recording nine relay errors. This is its successor.

The rule this file exists to enforce: **the orchestrator does not relay a figure it has not run.**
Seven of Step 1's nine relay errors were the same defect — a seat running an operation with an
instrument it wrote and never tested — and four of them produced a wrong verdict that reached the
author.

Status of each entry is one of **CONFIRMED** (re-run, agrees), **CONFIRMED AND WORSE** (re-run,
agrees, and the re-run found more than the claim), **REFUTED**, or **NOT RE-RUN** (with the reason).

---

## Cycle A

### A1 — The Software Engineer, the corpus acceptance suite

| Claim | Verdict | Command and result |
|---|---|---|
| No repository-wide `*.pdf` rule; PDFs commit cleanly outside `literature/` | **CONFIRMED** | `grep -n pdf .gitignore` returns three lines, two of them comments and one the directory rule `/literature/_pdf/`. **There is no `*.pdf` pattern anywhere in the file.** `git check-ignore -q` over `x.pdf`, `docs/x.pdf`, `oracle/x.pdf`, `tools/x.pdf`, `cr_scratch/x.pdf`: all five COMMIT. PDFs are excluded under `literature/` only as a side effect of the deny-by-default `/literature/**` rule, not by any rule about PDFs |
| `literature/isru/x.pdf.bak` is ignored, so Part 5's containment table is stale in the safe direction | **CONFIRMED** | `git check-ignore -q literature/isru/x.pdf.bak` → ignored. A fixture written naively against Part 5 would sit inside `literature/` and pass on the deny-by-default rule rather than on the rule under test |
| Largest summary is 84,767 bytes, not 28 KB | **CONFIRMED** | `find … -printf '%s %p\n' \| sort -rn \| head`: `lsei/literature/programme-primaries/nasa-moon-to-mars-doc.md` at **84,767**. Next two are 63,040 and 45,216 |
| Smallest `_intake/` PDF is 81,677 bytes, not 180 KB | **CONFIRMED** | Same command over `-name '*.pdf'`, ascending: `luxembourg-2017-space-resources-law.pdf` at **81,677**. Next two are 84,793 and 88,313 |
| 29 of 112 PDFs are under the 500 KB threshold | **CONFIRMED, under both readings of KB** | `awk '$1<512000'` → **29 of 112**. `awk '$1<500000'` → **29 of 112**. The binary and SI readings do not separate here, which is worth recording because the same ambiguity does bite at 2.10 |
| The size gate cannot discriminate: the populations overlap | **CONFIRMED, and the overlap is measured** | Largest summary 84,767; smallest PDF 81,677. **The largest summary is bigger than the smallest PDF.** There is no threshold that separates the two populations, at any value. A size test is a backstop and not a gate, exactly as claimed |
| `literature/NAMING.md` is returned by `listCorpusFiles()` as a corpus file | **CONFIRMED** | `node -e "…listCorpusFiles('literature')"` → `[ 'NAMING.md' ]`. The naming contract is currently the entire retrievable corpus, and it is a citable literature source to the retrieval layer |

**All seven verified. Zero refuted.** Every quantitative claim A1 made reproduced to the byte.

**One claim NOT re-run, and why.** A1 reports his `--check` run went from 12 hard failures to 13, and
attributes the thirteenth to `COUNTING_RULE.md:4` quoting version 3 against a block value of 2 —
A4's in-flight edit, not his. Not re-run at this point because A4 was still writing and a
measurement taken mid-write measures nothing. Deferred to the Cycle A integration, after A4 lands.

**The finding inside that finding is a process finding and it is A1's, not mine.** The Manager's
Cycle rule makes write sets disjoint, which prevents two agents overwriting one file. It does **not**
make two concurrent *measurements* independent, because `tools/quantities.js` reads the whole
declared file set rather than the caller's write set. A1's run measured A4's half-written file and,
had he compared counts rather than reading the failure line, would have assigned the defect to
himself. **Disjoint write sets are not disjoint read sets**, and every instrument in this project
that walks a declared file set has this property. Routed to The Manager at the Cycle A integration.

### A3 — The Engineer, the taxonomy

| Claim | Verdict | Command and result |
|---|---|---|
| A `lit/*` glob instead of `lit/*.md` lands three UN treaty texts into the retrieval corpus | **CONFIRMED AND WORSE** | See below |
| Union is 176; `152 − 26 + 5 + 13 + 22 + 9 + 1 = 176` | **CONFIRMED, and it closes twice** | The stated arithmetic evaluates to **176**. Independently, `152 + 24` — the lsei corpus plus the normalized-unique intake files — also gives **176**. Two derivations from different inputs agreeing is the only evidence available that either is right |
| Folder sizes on the 152 basis: none over 31, none under 5 | **NOT RE-RUN** — depends on his placement of all 176 files, which is his deliverable and not independently reproducible without redoing it. His within-file assertions `INDEX-1` to `INDEX-5` are the check, and The Space Resources Engineer and The Manager review the halves at Cycle B | — |
| The B3 IDF measurement: `capital` errs 0.97/0.79 nats, `moon` 2.13, and `targeting` only 0.41/0.16 | **NOT RE-RUN at this point.** It requires field-scoped IDF over a corpus that does not exist yet, computed against his own field assignment. His probe is committed inside his file and runs as its `operation:` field specifies. Flagged for the Cycle B cross-verification, where a seat that did not write it runs it | — |

**The treaty finding, confirmed and enlarged.** `_intake/japanese-miracle/lit/` holds **234** entries:
119 `.md`, 112 `.pdf`, 3 `.txt`. So a `lit/*` glob sweeps **115 non-summary files**, not three — the
112 PDFs come with them, into a repository whose PDF containment is the gap A1 found open above.

And the three treaties are worse than orphans. Checked individually:

| Treaty | `.txt` in `_intake/lit/` | `.md` in `lsei/literature/` | `.md` in `_intake/lit/` |
|---|---|---|---|
| `un-1967-outer-space-treaty` | yes | yes | yes |
| `un-1972-liability-convention-space-objects` | yes | yes | yes |
| `un-1979-moon-agreement` | yes | yes | yes |

**Every one of the three already has a summary, in both corpora.** So the naive glob does not merely
land a raw primary source where a summary belongs — it lands the full treaty text **beside its own
summary, under a name differing only in extension**, into a retrieval layer that scores on filename
tokens. The two would be near-perfect tokenization twins, and the raw text would frequently outrank
the summary written to be retrieved.

His disposition — the treaties belong at `literature/_pdf/space-law-and-governance/` — is sound and
the reasoning is A4's own from loose end A1: an allow-list naming only `*.pdf` would have shipped
these `.txt` files, which is why the enforcement layer went deny-by-default in the first place. The
same three files have now caused a defect at 1.1 and nearly caused a second at 2.5.

---

## Standing corrections carried into Cycle B

1. **A7 is nine, not one.** Recorded in `step2_orchestrator_baseline.md` and injected into A1's spawn
   prompt, which The Manager wrote before the reconciliation landed. A1 wrote the suite to the
   corrected framing and added `CRP-7`, which runs both rules and asserts the normalized one catches
   a strict superset, so the narrowing cannot be reintroduced quietly.
2. **The merge glob is `*.md`, never `*`.** Owed to 2.5's assertion list via `SLOT-A`.
3. **Disjoint write sets are not disjoint read sets.** Owed to The Manager.
