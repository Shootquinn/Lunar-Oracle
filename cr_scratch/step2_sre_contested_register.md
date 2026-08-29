# 2.16 — the contested-claims register, landed into the merged corpus

The Space Resources Engineer, W3-4, 2026-08-28. Write set: `oracle/REGISTER.lunar.tsv`,
`oracle/REGISTER.econ.tsv`, `literature/**` (in-file blocks only), this file.

**The register now resolves.** Both sidecars are bound to `literature`, all 121 member rows resolve,
83 summaries carry a generated `## Contested` block, and the REG group's eighteen assertions were
executed rather than read.

---

## 1. Counts, before and after, with the command

Read-digest of the corpus walked: `find literature -type f | sort | xargs sha256sum | sha256sum`
→ **`caae48db…`** at the time of the rebind. `node tools/check_registers.js` → **0 hard failures @
read-digest `7b68a609…` over 266 files**. **This tree moved under me while I worked** — other Wave 3
seats are writing `literature/**`, `oracle/check_register.md`, `tools/githooks/dispatch.js` and
`tools/verify_corpus.js` concurrently, so 159 of the 168 summaries show as modified and only 3 of the
lines in each of my 83 are mine. Figures below are quoted at the digest they were taken at and are
not reconciled across digests.

`node tools/ecr_verify.js oracle/REGISTER.<c>.tsv literature`

| | lunar before | lunar after | econ before | econ after |
|---|---|---|---|---|
| `basis_root` | `lsei/literature` | **`literature`** | `_intake/japanese-miracle/lit` | **`literature`** |
| `basis_ref` | `7f97983` (resolves only in `lsei`) | **`af7abec`** | `c42a217` (tracks 0 files under `_intake/`) | **`af7abec`** |
| `A` rows | 15 | 15 | 18 | 18 |
| `M` rows | 81 | **68** | 53 | 53 |
| distinct leaves | 59 | **53** | 30 | 30 |
| `L4` unresolved | **14** | **0** | 0 | 0 |
| `ecr_verify` FAILURES | **14** | **0** | 0 | 0 |
| rows naming `lsei/literature/` | 1 (`H`) | **0** | 0 | 0 |

Sides are unchanged in both files: lunar `LCC-01=3 02=2 03=3 04=3 05=1 06=2 07=4 08=4 09=3 10=2 11=2
12=3 13=2 14=1 15=2` before and after; econ likewise. **No axis lost a side.** The register file
digests are `5e011c45…` (lunar) and `39cb6e65…` (econ).

## 2. What the rebind actually was, and the premise it refuted

**My brief said to rebind rows "from `lsei/literature/` paths". There are no such paths.** Schema §6
already ruled that the member key is a bare leaf, never a path: `0 of 81` lunar and `0 of 53` econ
`M` rows contain a `/`. The only occurrence of the string `lsei/literature` in either file was the
lunar `H` row's `basis_root`. The rebind is **two header edits**, which is exactly what `REG-10`
predicted ("two edits, not 134") and it is the first time that prediction has been tested.

**The real work was elsewhere, and no one had measured it.** 14 lunar member rows addressed leaves
the merge did not land. All 14 are members of the eight `DUP-01…DUP-08` same-source pairs, where the
author's ruling of 2026-08-28 was that **one member lands** — the provenance block of every survivor
records it in terms ("The secondary, `sowers-2019-thermal-mining-ice.md`, did not land"). The rows
were authored at 1.9 against a corpus where both members existed.

Thirteen rows were **removed**. Each was removed only after checking that its surviving twin is
already a member *of the same axis, on the same side*, so no axis, side or distinct source is lost:

| axis · side | row removed | survivor already a member |
|---|---|---|
| LCC-01 A | `colaprete-2010-lcross-water.md` | `colaprete-2010-lcross-ejecta-water-detection.md` |
| LCC-04 A, LCC-06 A, LCC-12 A | `sowers-2019-thermal-mining-ice.md` | `sowers-2019-psr-ice-mining.md` |
| LCC-04 A, LCC-06 A, LCC-12 A | `sowers-2019-thermal-mining-niac.md` | `sowers-2019-thermal-mining-niac-report.md` |
| LCC-05 A, LCC-07 D, LCC-08 D, LCC-15 A | `sanders-2025-nasa-lunar-isru-progress-review.md` | `sanders-2025-nasa-isru-progress-review.md` |
| LCC-08 B | `schreiner-2016-molten-regolith-electrolysis-sizing.md` | `schreiner-2016-mre-sizing-model.md` |
| LCC-12 A | `kornuta-2019-commercial-lunar-propellant.md` | `kornuta-2019-commercial-lunar-propellant-architecture.md` |

One row was **rebound**, not removed, because its twin was *not* on the axis:
`LCC-10 A nasa-2025-moon-to-mars-architecture-add-revc.md` → **`nasa-moon-to-mars-doc.md`**. Had this
been folded into the removal set, LCC-10 side A would silently have lost the Moon-to-Mars ADD.

**Seven positions were folded, and this is the part that would have been quietly destructive.** In
six of the seven clusters the *claim-carrying* `position` sat on the row that had to go, and the
survivor's `position` was cluster bookkeeping — "named so the invariant cannot be satisfied by the
wrong member of the pair" — about a pair that no longer exists. Deleting the rows without folding
would have left `LCC-04` side A, `LCC-06` side A and `LCC-12` side A with **no position stating what
the side says**, which makes the `false_pair`/`two_sided` class unauditable (§3.3: "a `false_pair`
classification cannot be audited without it"). Each fold was checked against the surviving summary's
own text before it was written:

- `colaprete-…-ejecta` carries `5.6 plus or minus 2` ✓ — the LCROSS headline figure survives.
- `sowers-2019-psr-ice-mining` carries `500 kW`, `1,600 metric tons`, `4wt%` ✓.
- `schreiner-2016-mre-sizing-model` carries *"reasonably feedstock insensitive"* and the highland-vs-mare
  **33% mass / 60% power** difference ✓ — a stronger statement of the same claim, and it is now in the row.
- `nasa-moon-to-mars-doc` carries the Lunar Nuclear Fission System as a Rev C element addition with
  **no power rating, no mass allocation, no specific mass**; the only figure anywhere near it is the
  data-gaps catalog's *target* of "scalable multi-kWe generation" with the 2018 KRUSTY ground test as
  SOTA. The position now says that, because the previous wording would have read as a flat absence.
- **`kornuta-…-architecture`: the old position was wrong and the merge fixed it.** It read "450 metric
  tons of propellant from 2,450 metric tons of processed lunar water". The surviving (larger) summary
  states 2,450 MT/yr of water → **1,640 MT/yr of propellant**, with **450 MT** being the executive
  summary's near-term annual *demand*, and $2.4 bn/yr revenue. The row now carries the source's numbers.

## 3. `DUP-xx` rows: zero are mintable, and that is a consequence, not an omission

2.2 named eight pairs `DUP-01…DUP-08` and deferred the primary designation "to the `DUP-xx` register
row", the rule being *emit a row where the two summaries disagree on a number*. **A register axis
needs at least two sides that resolve into `literature/` (§5, `L5`, `REG-12`). After the author's
one-member ruling there is exactly one summary of each pair on disk, so a `DUP-xx` axis cannot have a
second side.** The same holds for D7's deferred union: `poston-2020` and `metzger-2021` each lost
their second summary at Step 0, and `find literature -name 'poston*' -o -name 'metzger*'` returns one
file per source. **Zero `DUP-xx` rows are minted and none can be until a dropped summary is restored.**
The disagreement did not go away — it was resolved by deletion, and the register is not the place
that records that. The provenance block of each survivor is.

## 4. `B6` and `B7`

**`B6` is bound and I did not have to touch it.** `beason-1996-targeting-japan` and
`henderson-2008-myth-of-miti` are `ECR-01 A` and `ECR-01 C`, and `ECR-01`'s class is **`false_pair`**.
That is the correct encoding of B6's own finding: the exemplar pair is not contested, its sides divide
by *what each source measures* rather than by what it concludes, and `false_pair` delivers both sides
with the §3.2 banned-word list forbidding the answer from calling it a disagreement. **B6's close is
The Manager's (economics prompt), at 1.10; I state the binding and route the close.**

**`B7` is bound, still open, and my brief's version of it is wrong in one particular.** The brief says
Wade reports **Lane 1997**; the register row and the gameplan both say **Lane 2017**, and the register
is right — `ECR-18 A wade-2018` reports Lane's input-output analysis of Korea's HCI drive, formal
period **1973 to 1979**. Confirmed: `ECR-01` is three-sided (`A`/`B`/`C`), `ECR-18` exists, class
`one_sided`, one member.

The precise state of the corpus, measured rather than characterised:

- **Johnson 1982 is not on disk**: `find literature -iname '*johnson*'` → **0**.
- **Five summaries cite it**: `beason-1996`, `beckley-2018`, `esteban-pretel-2009`, `henderson-2008`,
  `nakamura-1989` (`grep -rlio "johnson[, ]*1982\|MITI and the Japanese Miracle" literature/`). The
  corpus is not unaware of the affirmative position; it holds five sources that argue against it and
  none that states it.
- The affirmative position reaches this corpus at **three addresses, all reported speech**:
  `ECR-04 A dingman-1993` (the Johnson–Borden line, given as the reading Dingman argues against),
  `ECR-18 A wade-2018` (Lane 2017 on Korea, in Wade's own voice), and `ECR-13 C wade-2018` (directed
  credit central to the developmental-state model, Wade affirmative in his own voice).

**`ECR-18` stays at one member and that is correct, against a close condition in my brief that is
not.** The brief required "every axis has at least two sides" and "every id has at least two rows".
No REG row says either: `REG-12` requires ≥2 sides for `two_sided`/`false_pair` and **exactly one**
for `one_sided`, and `L5` makes a second side on a `one_sided` axis a failure. Adding a member to
reach an arbitrary floor is how B7 gets papered over. **The candidate I considered and rejected is
`murphy-1989-industrialization-big-push`**, which cites South Korea's coordinated industrial-investment
programmes as achieving industrialisation at lower explicit subsidy cost than piecemeal support. It is
a theoretical illustration, not a measurement, and binding it to `ECR-18` would make the axis look
two-deep while `ECR-18`'s own `axis_statement` — "the one measurement … reaches this corpus only
inside a source reporting it" — stayed true. It is named here so the next seat has the option rather
than the search. **B7 closes by acquiring Johnson 1982 or not at all; I cannot acquire.**

## 5. The in-file blocks

83 member leaves, 83 blocks, `grep -rl '^## Contested' literature/ | wc -l` → **83**. Grammar is §8
minimal: `## Contested`, then `- <axis_id> <side>` and nothing else. Generated by
`cr_scratch/sre_w34_blocks.js`, which strips and regenerates, so `REG-15` ("generated, never
hand-written") is enforced by re-running rather than by vigilance — `--check` reports
`already correct 83, would-rewrite 0`.

**Placement is deliberate: end of file, *after* the `## Provenance` block.** `MRG-4b` strips
`lastIndexOf('\n\n---\n\n## Provenance\n')` and compares the prefix to `byte_source`, so a block
appended after that marker is outside the byte-identity comparison. Placed anywhere else, 83
generated blocks would have read as 83 undeclared body edits and buried `MRG-4b`'s real ones.

Measured twice. Immediately after the write, `MRG-4b`'s failure message was character-identical to
its Wave-3-opening form — still `166 bodies identical to byte_source … 2 UNDECLARED`. At the close of
this sitting it reads `2 bodies identical … 166 UNDECLARED`, and **none of that is mine**: the sampled
edits are `+2/-0 lines e.g. "## Metadata"`, which is sub-step **2.6 (MERGE-6)** landing concurrently.
Checked directly rather than inferred — for each of the 83 files, take `MRG-4b`'s own
`stripProvenance()` and ask whether `## Contested` survives into the compared body:

```
blocks stripped by MRG-4b stripProvenance(): 79
blocks INSIDE the compared body: 0
no exact ## Provenance marker: 4  colozza-2010, leger-2025, schreiner-2016-mre-sizing-model, sibille-2012
```

Those four are the same 2.6 pass renaming their appended heading to `## Provenance (merge)` — absent
at `af7abec` — which makes them fail `MRG-4b` on the `PRV-1` branch before the body comparison runs,
so my block never reaches it there either. **Zero of the 166 undeclared edits is a `## Contested`
block.**

## 6. Running 2.15's assertions — the answer is that nobody had

`node oracle/tests/run_suite.js` → `REG 18 rows 0 pass 0 fail 18 unrun`, before my work and after it.
**2.15 wrote eighteen REG rows and `run_suite.js` binds none of them: `grep -n "REG-" oracle/tests/run_suite.js`
returns nothing.** This is the Wave 2 finding reproduced inside the group that guards the register:
a register that passes an unrun assertion is exactly the defect. `run_suite.js` is not in my write
set, so I executed the rows instead of binding them — `node cr_scratch/sre_w34_reg_assertions.js --mutate`:

```
REG group: 18 rows -- 11 PASS, 0 FAIL, 7 DEFERRED (subject not yet built), 0 unrun.
```

| | |
|---|---|
| `REG-2` L0 | PASS — 2 files, 1 `H` row each, each the first row |
| `REG-3` L1b | PASS — 2 files, 33 `A` rows, 33 distinct axis ids |
| `REG-5` L2 | PASS — parsed == declared: lunar 15/68, econ 18/53 |
| `REG-7` L4 | PASS — 121 member rows, 83 distinct leaves, **all resolve** |
| `REG-8` uniqueness | PASS — 168 `.md`, 168 distinct leaves; 0 member rows contain `/` |
| `REG-10` rebind | PASS — both `basis_root == literature`; neither file contains `lsei/literature/` or `_intake/`; 0 rows carry a path |
| **`REG-11`** | **PASS — was RED, owner The Engineer at 2.16.** Both files now name `af7abec`, which tracks **170** files under `literature/`. `c42a217` tracked **0** files under `_intake/`, which is what made the row red |
| `REG-12` L5 | PASS — lunar 13 contested / 2 `one_sided`, econ 13 / 5; every contested axis ≥2 sides, every `one_sided` exactly 1 |
| `REG-13` B4 | PASS — block set == `M`-row set **in both directions** across all 168 summaries |
| `REG-14` grammar | PASS — 83 blocks, every line matches `^- (LCC\|ECR)-\d\d [A-Z]$` |
| `REG-15` generated | PASS — regenerate-and-diff clean |
| `REG-1, 4, 9, 16, 17, 18` | **DEFERRED, subject not built.** The loader (3.8), the `axis-incomplete` refusal path (3.8), the retrieval excision in `corpusDocFrequency()`/`confirmInText()` (3.7) and the misclassification detector (3.8) do not exist. Asserting against them today would be a status cell, not a result |
| `REG-6` | DEFERRED — a census-reconciliation rule over deliverables, not an artifact assertion; discharged here by quoting the `H` row on every count |

**Three falsifiers were run on copies and all three fired**, so the passes are not vacuous:
delete an `M` row → `L2 member_count 68 != parsed 45`; splice a second `H` row →
`L0 row 41 is a second H row`; rename a leaf → `L4 leaf does not resolve: litvak-2024-RENAMED.md`.

`node oracle/tests/run_suite.js` → **405 rows, 22 pass, 4 fail, 379 unrun** at the close, against
**18 pass / 4 fail / 383 unrun** at the Wave 3 open and at my own baseline taken before any write.
The four gained passes are **not mine**: the REG line reads `18 rows 0 pass 0 fail 18 unrun` at both
digests, and a concurrent seat bound them elsewhere. **The four standing failures are unchanged and
no passing row was lost. No REG row moved from `unrun` to executing inside `run_suite.js`**, because
that file is The Software Engineer's; the executable form is `cr_scratch/sre_w34_reg_assertions.js`
and lifting it into the runner is one function per row.

## 7. Sub-step 2.9 (ECON-3), carried mid-sitting on the orchestrator's ruling

**Ruled `neither`: the Denison and Chung primary text is not acquired.** The ruling arrived while
this sub-step was open and lands in `ECR-08`, which is in my write set, so I carried it rather than
routing it back. **It spends no apparatus** — no new id, no new axis, no new test, and **no new row**.

The two full citations, the reason `neither` is *forced* rather than chosen (no open full text for
either artifact; catalogue records and paywalled reviews only; HathiTrust refuses automated access;
acquisition was never a live branch), and the statement of the hard block go into a **15-line `#`
comment block above the `ECR-08 A` row**. §3 admits `#` comments and every loader skips them —
`ecr_verify.js` filters `!l.startsWith('#')`, and `awk` over the file after the edit gives
`H=1 A=18 M=53 comments=15`, so `L2`'s self-declared size is untouched at `18/53`. A comment is the
only place in this schema where a ruling with a bibliography fits without becoming a row.

**The hard block was already encoded and I did not have to build it.** `ECR-08`'s `scope_token` reads
*"the reviewed period and the review the figure is routed through"*, and §3.2 makes any figure quoted
from the axis without that noun a failure. So "no Denison-Chung component figure without naming its
review and period" is live the moment the classifier reads the column. The `axis_statement` — which
is delivered to the user verbatim — now carries the ruling in the same sentence.

**All three leaves were already bound on side A**, per `ECR-06`/`ECR-07`'s precedent, so the
invariant already cannot be satisfied by the wrong review. What the three `position` fields lacked
was the arithmetic, and I put it in because "neither review's component list sums" is the claim the
whole row rests on and it was asserted nowhere it could be checked:

- **`may-1977`, 1953–1971, stated 8.77 %/yr.** Printed components 2.10 + 1.97 + 1.94 + 1.85 + 0.95 =
  **8.81**, which is 0.04 **over** the stated total, reported as read and not reconciled.
- **`simonis-1979`, 1961–1971, stated 9.56 pp/yr.** Seven transcribed components sum to **8.74**,
  roughly 0.8 short, and the review says in its own words that it does not reconcile the gap.
- **`henderson-2008`** — the row said *second* hand; the orchestrator's ruling says third, and 2.8's
  landed `provenance_depth` field says **`via_tertiary`** (a *Concise Encyclopedia of Economics*
  entry whose own note says it is used for the figures it reports and not as an original study). The
  row now says third hand and names the depth field, so the register and the summary agree.

**The two reviews disagree on the same decomposition at two periods and neither adds up — that is the
finding, and it is worth more than the missing monograph.** `node tools/ecr_verify.js
oracle/REGISTER.econ.tsv literature` → `axes 18 members 53, K1 0, K2 0, ALL PASS, FAILURES 0` after
the edit. `node tools/check_registers.js` → 0 hard failures @ read-digest `7166515320d31f4a` over 268
files.

## 8. Instruments

`cr_scratch/sre_w34_probe.js` (resolution and arity probe), `sre_w34_rebind.js` (the two header
edits, thirteen removals, one rebind, seven folds — re-runnable), `sre_w34_blocks.js` (block
generator, `--check` for the REG-15 diff), `sre_w34_reg_assertions.js` (`--mutate` for the
falsifiers), `sre_w34_ecr08.js` (the 2.9 ruling).

---

## Not mine

1. **`run_suite.js` binds no REG row; the group reports 18 unrun.** Sub-step 2.15 / `SLOT`.
   Owner: **The Software Engineer.** `cr_scratch/sre_w34_reg_assertions.js` is eleven executable rows
   and three falsifiers; it lifts in as one function per row and needs the `B[...]` harness, not a rewrite.
2. **Twelve landed summaries carry CRLF in the working copy against `.gitattributes`'
   `literature/** text eol=lf`**: `miwa-2002`, `nakamura-1989`, `wade-2018`, `barro-2004`,
   `otsu-2007`, `ishimatsu-2016`, `shewhart-1931`, `nasa-2025-fission-surface-power-directive`,
   `blount-2016`, `luxembourg-2017`, `us-congress-2015`, `von-der-dunk-2015`. All twelve are LF at
   `af7abec`; `git status` does not surface it and only `git diff` warns. Not mine — the blocks I
   wrote contain **0** CR characters, measured per file either side of the `## Contested` heading.
   Sub-step 2.5/2.6. Owner: **The Engineer.**
3. **`QUANTITIES.md` holds four ids my rebind moved, and `QUANTITIES.md` is not in my write set.**
   Owner: **The Designer** (counting rule) with the authoring seats. New values, with the command:
   `Q-LCC15-MEMBER-ROWS` 80 → **68**; `Q-LCC15-DISTINCT-LEAVES` 58 (the file) / 59 (the addendum, and
   `REG-6`'s own known answer) → **53**; `Q-LCC-MEMBER-REFS` 67 → **68**, `Q-LCC-MEMBER-UNRESOLVED`
   1 → **0** (`node tools/ecr_verify.js oracle/REGISTER.lunar.tsv literature`);
   `Q-REG-BLOCK-CARRIERS` 53 of 152, still marked `provisional`, is now measurable and is
   **83 of 168** (`grep -rl '^## Contested' literature/ | wc -l`). `Q-LCC15-SIDES` (37) and
   `Q-LCC15-SIDES-GT2` (7) are **unchanged** and I checked rather than assumed.
   `node tools/quantities.js --check` → **5 hard failures @ read-digest `21ceb87de34a8bfd` over 464
   files**, none of them mine; its `STALE M4 Q-LCC15-SIDES … rests on Q-LCC15-MEMBER-ROWS` line
   predates this sub-step and my edit does not clear it.
4. **`B6`'s loose-end row is The Manager's (economics prompt), 1.10.** The binding is correct as it
   stands (`ECR-01`, `false_pair`, sides A and C); the row's close is not mine to write.
5. **`literature/programme-primaries/nasa-moon-to-mars-doc.md` is not a conforming name** — no
   author, no year, and `-doc` is not a title. It is now a register member address, so a rename
   breaks `LCC-10 A` unless the leaf column is renormalised with it. Sub-step 2.6 / `NAMING.md`.
   Owner: **The Engineer.**
6. **Four member summaries have their appended provenance heading renamed to `## Provenance (merge)`**
   — `colozza-2010-solar-lunar-oxygen`, `leger-2025-energy-oxygen-moon`, `schreiner-2016-mre-sizing-model`,
   `sibille-2012-joule-heated-mre`. The heading is absent at `af7abec`, so it landed this sitting.
   `MRG-4b` matches the literal `\n\n---\n\n## Provenance\n` and reports these four as
   `no appended ## Provenance block -- PRV-1` rather than comparing their bodies at all. Sub-step 2.6.
   Owner: **The Engineer**, with **The Software Engineer** if the marker is to accept both forms.
7. **The LSIC newsletter level-3 candidate** (`lsic-2026-newsletter-august` / `lsic-newsletter-2026-june-final`,
   Vol 7 Issues 4 and 3) was routed to 2.16 by 2.2. **It is not a register matter**: both issues
   landed, they are two documents rather than a duplicate pair, and no axis names either. It needs a
   `dedup_key` fix so `MRG-9`/`MRG-10` stop counting it. Owner: **The Engineer.**

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
```
