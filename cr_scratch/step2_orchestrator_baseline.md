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

## The Engineer's Part 2 folder counts reconcile with this baseline, exactly

His Step 0 taxonomy table gives `isru-processing` 32, `power-and-thermal` 20 and
`growth-and-industrial-theory` 27. This baseline measures 30, 17 and 26. Every other folder agrees
to the file. The gap is 2, 3 and 1 — six files.

Those six are the A3 deletions, and they distribute exactly that way. Measured by locating each
retained superseded file's surviving twin:

| Superseded file | Folder of its surviving twin |
|---|---|
| `azami-2024-lunar-manufacturing-review` | `isru-processing` |
| `metzger-2021-aqua-factorem` | `isru-processing` |
| `csank-2022-powering-the-moon` | `power-and-thermal` |
| `poston-2020-krusty-reactor-design` | `power-and-thermal` |
| `speyerer-2013-persistently-illuminated-regions` | `power-and-thermal` |
| `metzger-2013-bootstrapping-space-industry` | `growth-and-industrial-theory` |

32 − 2 = 30, 20 − 3 = 17, 27 − 1 = 26, all other folders unchanged, and the six sum without
residue. **Both measurements are correct and neither needs amending**: his table is the 158-file
pre-dedup basis and this one is the 152-file post-dedup basis. Recorded because the two will sit
side by side in Step 2 and the discrepancy is the kind this project has twice mistaken for an error.

It also confirms A3's "corpus 158 to 152" independently, from the folder distribution rather than
from A3's own count.

## A gap between The Engineer's Part 2 and what 2.3 requires of it

Part 2 rules that folder segments are never scored by the ranker — he ran identical queries against
a flat probe corpus and the foldered LSEI corpus and got identical ranks — and concludes the
taxonomy "is therefore a decision about human navigation only, and it should be made on that basis
without pretending it buys retrieval quality." That is right, and it is not in tension with B3.

But Part 2's machine-readable output is `- **Also:**`, the second-membership line, plus
`literature/INDEX.tsv`. **It specifies no field label.** Sub-step 2.3 requires one: "A
machine-readable field label per file is a hard requirement of this step, not a preference — B3's
pooled-IDF break cannot be fixed without it."

These are different fields doing different jobs. The folder is navigation, `Also:` is
cross-reference, and the field label is what lets 3.7 scope the IDF table to one of two vocabulary
distributions. An agent executing Part 2 faithfully ships no field label and satisfies the sub-step
in appearance only. Named here so the Wave 1 prompt carries it.

Verified at source rather than taken from B3: `corpusDocFrequency(literatureDir)` in
`lsei/oracle/lib/literature_search.js` builds one document-frequency table over the whole corpus
directory with no field scoping, and `idf()` reads that single table. B2's two anchors verify as
written as well — line 214 is `frac >= 0.45`, and the comment above line 128 says in the tool's own
words "run against the shipped 156-file corpus rather than the original 57."

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

## The 2.11 PDF pull: the source tree is reachable and the population is exactly 52

Verified before the sub-step opens, because 2.10 and 2.11 both assume a tree nobody has looked at
this session. `~/onedrive/projects/cc/CSA_LSEI_Workshops/context/reference/lit/` is present and
holds **163** PDFs. Distribution, counted 2026-08-27 by `find -type f -iname '*.pdf'` per
first-level subdirectory:

| Subdirectory | PDFs |
|---|---|
| `japanese miracle lunar economy lit` | 111 |
| `scenario_undercarriage_sources` | 46 |
| `fission_program_primaries` | 1 |
| loose at the top level | 5 |
| `_extracted` | 0 |
| `_QUARANTINED_prior_art` | 0 |

111 + 46 + 1 + 5 = 163.

**The quarantine exclusion is a no-op here, and that was checked rather than assumed.** Excluding
`_QUARANTINED_prior_art` leaves the count at 163, which is the shape of a filter that silently did
nothing — the failure that produced a wrong verdict in Step 1. Checked directly: the directory holds
**26 files, all `.md` summaries, zero PDFs.** The populations are genuinely disjoint. The rule that
The Engineer stays out of that tree still stands for its 26 summaries; it just removes no PDFs.

**The pull population is 52 and The Engineer's Part 9 estimate was exact.** Excluding the Japanese
Miracle directory, whose PDFs are already landed, leaves 46 + 1 + 5 = **52** PDFs — the figure Part 9
predicted for net-new.

**The Japanese Miracle PDF move is already complete.** All 111 source PDFs are present in
`_intake/japanese-miracle/lit/`, which holds 112. The one extra is
`gott-2024-card-gas-analysis-subsystem.pdf`, present in `_intake/` and absent from the source tree —
consistent with loose end A4, which records that the `gott-2024` fix lives only in `_intake/`. Zero
PDFs are in the source tree and missing from `_intake/`.

### A unit trap in 2.10's threshold

2.10 asserts the pull lands at "**250 MB**" or under, and Part 9 estimates "**224 MB**." Measured,
the 52 PDFs total **224,042,382 bytes**.

That is 224.0 MB in SI megabytes and **213.7 MiB** in mebibytes. Part 9's 224 is SI and matches to
four significant figures. The assertion passes under either reading, so nothing is at risk this
time — but a contractual threshold whose unit is unstated is exactly what `COUNTING_RULE.md` exists
to prevent, and the gap between the two readings here is 10 MB. **2.10 should assert bytes**, with
the SI or binary reading named, rather than a bare "MB". Raised as a fix to the assertion, not to
the estimate: the estimate was right.

## 2.14 inherits an owed defect from Step 1, and it is not the one the sub-step names

2.14 says the containment mechanism is "installed via `core.hooksPath` by the bootstrap." Read
against Step 1's measurements, **that is still correct and was not superseded.** What Step 1
overturned was the *assertion*, not the mechanism. Recorded so nobody re-litigates it:

- Setting `core.hooksPath` to a directory that does not exist exits 0 and reads back correctly, and
  a commit then succeeds with no hook firing. Asserting the config is set proves nothing.
- `test -d` on the target is inert too: an existing but empty directory also passes and also fires
  nothing.
- The assertion Step 1 landed instead is `git hook run pre-commit`, which exercises resolution,
  directory existence, filename and executability in one call. Verified present in this
  environment: git 2.55.0.windows.1 carries `git hook run`.

Current preconditions, measured: `tools/githooks` does not exist, and `core.hooksPath` is unset on
this repository (`git config --get` exits 1). Both correct — 2.14 creates the first and sets the
second, and BC-8 is *supposed* to fail until it does.

**The owed item.** `oracle/check_register.md` records that `CHK-10` as specified is a self-invoking
loop: `CHK-10` ran `CHK-09`, `CHK-09` ran `git hook run pre-commit`, and that re-entered `CHK-10`.
The register notes that `git hook run` has **no reentrancy guard and sets no environment marker**,
so nothing in git breaks the cycle — the only thing that stopped it was the reviewer's own counter.
The gameplan's Step 1 row carries this as "one specifies a self-invoking loop, owed."

**2.14 is the sub-step that installs `CHK-10`.** It therefore inherits the defect, and the sub-step
text does not mention it. Whoever writes 2.13's assertions needs the loop in scope, because an
assertion suite that installs the hook and then invokes `git hook run` to prove it fires is the
shape that reproduces the cycle.

One further constraint from the same file, easy to miss and cheap to honour: `git hook run` invokes
the hook **with nothing staged**. Every hook wired this way must be correct on an empty stage, which
is a real design constraint on `oracle/check_no_sources.js` — a containment check that reads the
staged set and finds it empty must exit 0 rather than treating emptiness as a pass it did not earn.

## 2.16 is not a path rebind, and the registers already answer two open failures

2.16 says to "rebind LUNAR-2's and ECON-1's rows from `lsei/literature/` paths to `literature/`
paths." Measured against the promoted files, **there are no paths to rebind.** Neither register
contains the string `lsei/literature/` at all.

Both files declare their base directory once, in the `H` row:

```
REGISTER.lunar.tsv   H  lsei/literature              2026-08-27  7f97983  15  81
REGISTER.econ.tsv    H  _intake/japanese-miracle/lit 2026-08-27  c42a217  18  53
```

Every member row carries a **bare filename**. Counted: 0 of 81 lunar `M` rows and 0 of 53 econ `M`
rows contain a `/`. Resolution is base-plus-search, not a stored path.

Two consequences, pulling in opposite directions, and 2.16 needs both.

**The base rebind is two edits, not 134.** Change one field in each `H` row.

**The filenames are the fragile part, and 2.2 is what breaks them.** 2.2 assigns semantic filenames
to same-source pairs. Every such rename silently invalidates any member row naming the old file, and
because the lunar base is already foldered while every member row is bare, resolution today is a
*recursive walk* — the register finds `colaprete-2010-lcross-water.md` under `lunar-ice-and-geology/`
without being told the folder. After the merge that walk spans eleven folders and 185 files instead
of eight and 152, and the A7 pair is a live ambiguity on any filesystem that keeps both members.
This is B4's failure mode reached by a second route: not a ranker returning the wrong cluster member,
but a bare name resolving to the wrong file outright. 2.15's assertion that "every register path
resolves" must therefore also assert that it resolves **uniquely**.

Measured now, as the pre-merge known-answer test:

| Register | `M` rows | distinct names | resolve | missing | ambiguous |
|---|---|---|---|---|---|
| `REGISTER.lunar.tsv` | 81 | 59 | 59 | 0 | 0 |
| `REGISTER.econ.tsv` | 53 | 30 | 30 | 0 | 0 |

Counting rule: distinct values of field 4 over rows whose field 1 is `M`, 2026-08-27; resolved for
lunar by `find lsei/literature -type f -name <n>` and counted ambiguous at more than one hit, and for
econ by `test -f _intake/japanese-miracle/lit/<n>` since that base is flat. Both registers resolve
completely and unambiguously today. **That is the number 2.15 has to still be able to produce after
the merge**, and it is the cheapest test in this step.

### Two of the twelve open counting-rule failures are decidable from the registers themselves

This is The Manager's own remedy from the Step 1 close — every register declares its own size in an
`H` row, so use it as a known-answer test — applied rather than described.

- **`Q-ECR-AXES`, 17 against 18.** `QUANTITIES.md` and `step1_10_manager_economics_register.md` say
  17; the addendum says 18. The promoted register holds **18 `A` rows**, and its own `H` row declares
  **18**. The file and its self-declaration agree. 18 is right, and 17 is the pre-ECR-18 figure.
- **`Q-LCC15-DISTINCT-LEAVES`, 58 against 59.** `QUANTITIES.md` and the 1.9 file say 58; the
  addendum says 59. Distinct member filenames across the 15 lunar axes in the promoted register:
  **59**. The addendum is right.

In both cases the stale value is in `QUANTITIES.md` and the current value is in the addendum, which
is the expected direction — the addenda are what moved the numbers.

**Not amended here.** These are governed quantities and `oracle/AMENDMENTS.tsv` is the process for
changing them; an orchestrator editing a governed quantity directly is the arm-2b pattern wearing a
different hat. Recorded, with the measurement and its rule, and routed to whoever The Manager assigns
the amendment to. The point of running it now is that it demonstrates the remedy works: two figures
that had been contested across four files were settled in one command against the artifact itself.

## The economics half of the corpus has no upstream, and 2.17 and 2.18 both assume one

The two registers' `H` rows each carry a ref. They are not the same kind of thing.

`REGISTER.lunar.tsv` names **`7f97983`**. It resolves in the `lsei` working copy, it is the commit
"README: correct the literature layout and the oracle tool count," and the files the register
describes are tracked in it. That is a correct upstream provenance ref.

`REGISTER.econ.tsv` names **`c42a217`**. Measured:

- It does **not** resolve in `lsei` or in `cr-agents` (`fatal: Not a valid object name`).
- It resolves in **this** repository, as the commit "Step 1.11 reconciled to contract v2, and two
  holes the reconciliation found," dated 2026-08-26. That is a Lunar Oracle working commit about the
  answering-loop suite, unrelated to the corpus.
- It tracks **zero** files under `_intake/` — `git ls-tree -r --name-only c42a217 | grep -c '^_intake/'`
  returns 0, and `git ls-files _intake` returns 0 at HEAD, because `.gitignore` excludes the
  directory at line 26.

So the econ register's provenance names a commit, of a repository that does not contain the files
the register describes, chosen because it was HEAD when the register was written. It is not an
upstream ref. It is a timestamp with a hash on it.

**The gap is deeper than the field.** Following the chain back: `_intake/` is not its own repository
(`git -C _intake rev-parse --git-dir` returns Lunar Oracle's own `.git`), and the tree the Japanese
Miracle corpus came from — `CSA_LSEI_Workshops/context/reference/lit/` — is not a git repository at
all. **There is no versioned authority for the economics half of the corpus anywhere in the chain.**

This is not a defect in the register. It is a structural asymmetry that the plan has not named: the
lunar half of the merged corpus has a cloned, ref-pinned, push-disabled upstream that a divergence
check can interrogate, and the economics half has a directory on one machine.

Two sub-steps are written as though both halves behave like the lunar half:

- **2.17 (MERGE-11)** builds the upstream divergence check as "the comparison of upstream filename
  set and content hashes against the provenance digest held in ARCH-3's state record." On the
  economics half there is no upstream filename set to compare against.
- **2.18 (ARCH-5)** is "the rule that provenance names an upstream ref." Half the corpus cannot
  satisfy that rule as written.

**This is not a reason to stop.** The honest resolutions are all cheap, and choosing between them is
The Systems Engineer's call at 2.18 with the author ruling if it changes what ships: pin the
economics provenance to a content digest rather than a ref, since a hash over the file set is
exactly as falsifiable and needs no upstream; or declare the economics half **terminally landed** —
this repository *is* its authority, which is what "this folder is the new Japanese Miracle folder"
already says — and have the divergence check report `no-upstream` as a first-class state rather than
a failure. What must not happen is 2.18 landing a policy that half the corpus silently violates,
which is how a rule becomes a preference.

Flagged for the Wave 2 conceptual-integrity review as well as for 2.18. This is precisely the "one
thing or three projects wearing a trenchcoat" question The Systems Engineer was held to at 0.5,
reappearing at the layer where it has teeth.

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
