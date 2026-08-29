# W3-1 — house format, currency, provenance depth. The Engineer.

**Sub-steps:** 2.6 (MERGE-6), 2.7 (LUNAR-8, apply), 2.8 (ECON-2, apply), plus three items routed to
me mid-task: the double-`## Provenance` repair (The Fact-Checker), the upstream ref and merge-time
digest (The Systems Engineer, 2.18/ARCH-5, made binding by the coordinator), and the CRLF
normalization (The Space Resources Engineer). **Date:** 2026-08-28.

**Write set used:** `literature/**`, this file, and `cr_scratch/relay/` (mine by construction).
Nothing else was written. Two relays are owed and written:
`relay/w3-1_engineer_to_w3-2_prov_marker.md` and `relay/w3-1_engineer_to_w3-3_divergence_tool.md`.

Instruments are in the session scratchpad, not the repository, because `tools/` is not in my write
set: `w3_1_house_format.js` (the transform and the stamps), `w3_1_verify_26.js` (the check below),
`w3_1_prov_rename.js`, `w3_1_upstream_ref.js`, `w3_1_eol.js` / `w3_1_eol_fix.js`,
`w3_1_reorder_clause.js`, `w3_1_fix_two.js`, `w3_1_digest.js`.

---

## 1. Scope, measured before and after

```
FILES=$(find literature -name '*.md' -type f)
grep -L '^## Metadata' $FILES | wc -l
grep -l '^## Comprehensive Technical Summary' $FILES | wc -l
grep -l '^## Provenance' $FILES | wc -l
node <scratchpad>/w3_1_house_format.js            # dry run
node <scratchpad>/w3_1_house_format.js --write    # apply
```

| | before | after |
|---|---|---|
| `.md` files under `literature/` | 168 | 168 |
| lacking `## Metadata` | 115 | **14** |
| carrying `## Comprehensive Technical Summary` | 51 | **0** |
| carrying at least one `## Provenance` | 168 | 168 |
| carrying **two** `## Provenance` headings | 14 | **0** |
| carrying `## Provenance (merge)` | 0 | **14** |
| carrying `- **Body edit (2.6):**` | 0 | **152** |
| carrying `- **Stated as of:**` | 0 | **23** |
| carrying `- **Provenance depth:**` | 0 | **70** |
| carrying `- **Upstream ref:**` | 0 | **168** (144 `lsei@7f97983`, 24 `none`) |
| carrying `- **Merge-time digest:**` | 0 | **168**, all distinct |
| carrying CR bytes, against `.gitattributes` line 49 | 12 (2 974 CR) | **0** |
| files changed | — | **168** |

**read-digest**, `sha256` over sorted `relpath\tsize\tmtimeMs`, 170 files under `literature/` — the
convention `merge_plan.tsv` declares. Four writes, four digests:

| after | project form | content form |
|---|---|---|
| — (before any write) | not recoverable | `1fbcad220113f67a` |
| §2 2.6 / 2.7 / 2.8 | `e2a03024a6290aea` | `458c05f7d6decbc1` |
| §3b heading rename | `0edcb861f2202dd4` | `d693106d6e035db0` |
| §4b ref + digest | `04c4fac4e747fde0` | `ae69ad743577b130` |
| §4c CRLF + declaration | **`d1602b8d7cc05d54`** | **`fd94c7dba893615f`** |

The project-form before-digest is unrecoverable — the pre-write copy's mtimes are the copy's. The
content form, `sha256` over sorted `relpath\tsize\tsha256(bytes)`, is reproducible from any copy and
is why a before-figure can be quoted here at all. 170 files at every point. Two figures at different
digests are not comparable; every figure in this file names the digest it was taken at, and the
final state is `d1602b8d7cc05d54`.

**The 115 is not the population 2.6 acts on.** Integration draft line 113 has three clauses, and the
third is *leave the `## Provenance`-form files alone*. Measuring the families rather than trusting
the count: **14 files carry no `## Citation` at all and carry their own body `## Provenance` section
instead** — they are that third family, and they are exactly the 14 files with two `## Provenance`
headings. 115 − 14 = **101 files got a `## Metadata` block**; the 14 were left alone and are the 14
still lacking one after. A pass that read "115 lacking" as "115 to insert" would have tried to
populate a `## Citation` paragraph that does not exist in any of them.

| family | files | 2.6 action |
|---|---|---|
| F1 `## Citation` + `## Metadata` | 53 | drop the CTS marker where present (51 of the 53 carried it) |
| F2 `## Citation`, no `## Metadata` | 101 | insert `## Metadata` |
| F3 no `## Citation`, own body `## Provenance` | 14 | none |

The two operations are disjoint: every one of the 51 CTS files already had `## Metadata`. Touched by
2.6 = 51 + 101 = **152**. 16 files were untouched by 2.6 (14 F3 + the 2 F1 files with no CTS marker).

## 2. What went into `## Metadata`

The dominant house form among the 53 that already had one is a single ` · `-separated line (the
other is a `| Field | Value |` table; both are in the corpus and neither is canonical). I emitted
the prose form, carrying **only fields extractable from that file's own `## Citation` block**:
`Authors`, `Year`, `DOI`, `Publisher URL`, `Retrieved`. A field not stated there is omitted, and
every block ends with the clause saying so. Two files — `gdp.md` and
`statistical-review-of-world-energy.md` — yielded no field at all (issuer-style citation, no APA
year paren, no labelled line) and carry only that clause. That is the extraction's floor, reported
rather than filled.

**One rule is load-bearing and worth stating because it changes output.** Where a citation block
names a candidate DOI *and declines to record it* — "unconfirmed in FA2 ledger (…10.2307/2951599 to
be verified on the publisher page). Not recorded here per no-unconfirmed-DOI rule" — the candidate
string is **not** promoted into a `DOI:` field. It is carried verbatim as prose. A first cut of the
extractor did promote it, on 9 files, which would have manufactured nine confirmed DOIs out of nine
explicit refusals to confirm one.

## 3. `MRG-4b`. The conflict, and what I did about it

`MRG-4b` asserts each landed body is byte-identical to its `byte_source` body. 2.6 changes 152
bodies by design. The two are in direct conflict and one of them has to give.

**I did not silence the test, and I did not stop.** I did three things.

**(a) Every touched file's `## Provenance` block carries an explicit amendment**, placed directly
under `- **Byte source:**` so a reader of the claim reads the amendment with it. It names the
operations, states what was added or removed, and says outright that the landed body is no longer
byte-identical to the `byte_source` copy.

**(b) I made the claim checkable rather than rhetorical, and then checked it.** The 2.6 transform is
a pure function of the source body. So the amendment is not "trust me": it is

```
landed_body === transform_2.6( byte_source_body )
node <scratchpad>/w3_1_verify_26.js
  landed rows checked : 168
  RECONSTRUCTED EXACT : 165
  declared-op mismatch: 0
  NOT RECONSTRUCTED   : 3
```

**165 of 168 landed bodies reconstruct byte-for-byte from their source under the declared
operations**, and the declared operation set matches the recomputed one on all 168. The 3 that do
not are the three edits that were already there before I opened the corpus: `azami` (the one
declared `MRG-4b` exception, +1 line, the canonical DOI) and `falcon-heavy-wikipedia` /
`rostami2018-figures` (the two undeclared Wave 2 citation repairs `MRG-4b` was already red on).

**(c) Those last two got a different declaration, because the general one would have been false.**
Their sources carry no `## Citation` block; the Wave 2 repair added it, and *that* is why 2.6's
`insert-metadata` fired on them at all. On the sources my pass is a no-op. So their blocks say the
edit does **not** restore byte-identity, name the undeclared edit sitting underneath, and route it
rather than claim it. An overstated declaration is worse than none.

**The op list is machine-readable and terminal**, so a checker does not have to parse the prose:
every `Body edit` line ends `… and no others — \`op\`, \`op\`.`, ops drawn from a closed set of three
(`drop-cts-marker`, `insert-metadata`, `normalize-eol-to-lf`). I broke that invariant myself when the
CRLF item arrived and I appended a clause *after* the list on 12 files; my own verifier caught it as
12 declared-op mismatches, and I moved the clause ahead of the list rather than teaching the parser
about the exception. A line that ends in no op list is deliberately making no reconstruction claim —
there are exactly two, and they are (c).

**What I did not do, and why. Said plainly: `MRG-4b` is standing red and I am not claiming
otherwise.** I did not amend it. It lives in `oracle/tests/run_suite.js` and
`oracle/tests/corpus_suite.md`, neither of which is in my write set, and rule 8 says a test believed
wrong is argued, not edited. It reports **166 undeclared**, and that number decomposes exactly:

| | files | why |
|---|---|---|
| declared by me, unrecognized by the row | **152** | the row has no mechanism for a declared transform |
| merge block renamed at §3b, so `PROV_MARK` misses it | **14** | one regex, relayed |
| genuinely undeclared | **2** | `falcon-heavy-wikipedia`, `rostami2018-figures`, Wave 2, not mine |

**166 undeclared is not a resolution and I am not offering it as one.** The resolution is the
predicate in (b), and it is routed to W3-2 in `cr_scratch/relay/w3-1_engineer_to_w3-2_prov_marker.md`
with both exact strings. `MRG-4b`'s exception mechanism is a hardcoded single-file special case
(`AZAMI`, `AZAMI_LINE`, terminal `exc.length === 1`); it cannot express a declared transform, and
`azami`'s own exception no longer registers either, because `azami` is a CTS file and its diff is now
+1/−1 where the special case demands +1/−0. **The instrument is saturated: the two real undeclared
edits are no longer distinguishable inside it.** That is `MRG-4b`'s own Mutation 3 hazard — "the two
real ones are lost in them" — arriving from the other direction. No passing row was lost, but the
instrument's discriminating power was, and that is the cost I am reporting rather than netting out.

**The one place the coordinator's placement convention does not transfer.** The Space Resources
Engineer put his `## Contested` blocks *after* the provenance marker so the existing parser excludes
them, and that is the right instinct — it is the same instinct that made me rename the machine-written
heading at §3b rather than the author's, and it is why the ref, digest, depth, currency and body-edit
fields all went **inside** the merge block where `stripProvenance` already excises them. It cannot
save 2.6. `## Metadata` is a house-format section of the summary, its 53 existing instances all sit in
the body against the `## Citation` block, and moving it behind `## Provenance` would hide it from the
reader and from retrieval to buy a green cell. 2.6 is a body change by construction; the honest move
is to declare it, not to relocate it out of the checker's view.

## 3b. The 14 double-`## Provenance` files, routed by The Fact-Checker

Fourteen files carried two `## Provenance` headings — the summary's own and the merge-appended one —
with nothing distinguishing them. It had already produced one wrong answer: a verification script
matched the **first** heading and reported five files as catastrophic content loss.

```
for f in $(find literature -name '*.md'); do n=$(grep -c '^## Provenance$' "$f"); [ "$n" -gt 1 ] && echo "$f"; done | wc -l
node <scratchpad>/w3_1_prov_rename.js --write
```

**Before 14, after 0.** The merge-appended heading is now `## Provenance (merge)` **in those 14 only**;
the author's is untouched, and the other 154 files are untouched.

**Why 14 and not a uniform 168, which was my first instinct.** `run_suite.js`'s `PRV-1` asserts
`/^## Provenance\s*$/m` over every file **and it passes**. A uniform rename turns it red on 154 files
— a passing row lost, which my close condition forbids. Renaming only the 14 leaves each of them
holding the author's bare `## Provenance`, so `PRV-1` stays green. Measured: it does.

The script refuses rather than guesses. It renames only a block that carries both `- **Landed:**` and
`- **Byte source:**`, only if exactly one heading changes, and only if the surviving bare heading is
the *first* one. Zero refusals over 14.

**The cost, stated.** Both `PROV_MARK` constants are single-form string literals, so the 14 fell out
of them. `tools/verify_corpus.js` went 2 hard failures → 8; its owner has since taught it both forms
and it is now at **1**, and it reports `PRV-1b the merge block is unambiguously identifiable in all
168 files` — the defect closed. `oracle/tests/run_suite.js` has not taken the change and is the last
consumer holding the single-form constant; the exact replacement regex is in the W3-2 relay.

## 4. Sub-step 2.7 applied — 23 of 25 rows

`cr_scratch/step2_factchecker_currency.tsv`, keyed on `merge_plan.tsv` column `key`. Each stamp
carries the value, the `date_authority`, and **the row's `basis` verbatim**. The basis is the
evidence; a stamp without it is a number with no authority behind it.

**Two rows did not land, and could not.** `nasa-2025-moon-to-mars-architecture-add-revc.md` and
`sanders-2025-nasa-lunar-isru-progress-review.md` are both `pair_primary=secondary` (`DUP-03`,
`DUP-05`) and the secondary does not land under the author's 2026-08-28 pick-one ruling. The
Fact-Checker's instruction that each pair "must be stamped identically" is satisfied by the
surviving primaries, which carry `2025-12-12` and `2025-05-19` — the values their rows name. Nothing
was dropped: 25 rows, 23 landed files, 2 rows with no file to stamp.

**The two findings that must not be flattened are carried as the table states them.**
`oecd-2023-space-economy-in-figures` is stamped **`2024-09`**, not 2023, with the row's own sentence
"OPENED, AND THE FILE'S OWN KEY IS STALE … The bytes on disk are the September 2024 revised version"
carried into the block. The key and title are untouched — they are the merge key.
`jones-superheavylift-final20260614` is stamped **`unknown` / `unknown`**, carrying "THE CLAIMED DATE
DOES NOT VERIFY … the only corroboration of 2026-06-14 anywhere on disk is the filename token
FINAL20260614". Its own filename still asserts a date its Provenance block now says is unsupported.

## 5. Sub-step 2.8 applied — 70 of 70 rows

`cr_scratch/step2_manager_depth.tsv`, same key. All 70 keys resolve to a landed file; zero missing.
Tally as stamped: **primary 54 / via_review 7 / via_tertiary 9, zero `n/a`** — matches the table.
`basis` carried verbatim, same reasoning as 2.7.

**Premise correction, small but it changes the scope.** My brief says the `basis` fields "lead with
`field=…` so you can scope by field" and calls these "the economics summaries". **26 of 70 lead with
`field=`, and all 26 read `field=lunar`.** The table is scoped by `merge_plan` column 11
`review_owner = manager-econ`, which is the *review* split (7/4 folders), not the *field* split
(8/3) — `space-economy-and-markets` is `field=lunar` and `review=manager-econ` deliberately, per
`step2_engineer_taxonomy.md` §2.4. I stamped all 70 as the table names them. 26 of the files now
carrying `provenance_depth` are lunar-field files, not economics ones, and a later step reading
"every economics summary has a depth" off this count will be reading the wrong partition.

## 5b. The upstream ref and the merge-time digest — 168 of 168, and the window

Routed by The Systems Engineer (2.18 / ARCH-5) and made binding by the coordinator, because the
value is knowable today and permanently unknowable once upstream commits. **I re-measured it rather
than taking it from the relay, and re-measured it again immediately before the write:**

```
git -C lsei rev-parse --short HEAD → 7f97983 ; @{u} → 7f97983 ; status --porcelain → 0 ; push URL → DISABLED
node <scratchpad>/w3_1_upstream_ref.js 7f97983 --write
```

Two fields, in the merge block directly under `- **Source:**`, where `stripProvenance` excises them:

- `- **Upstream ref:** \`lsei@7f97983\`` — **144 files**, every one whose `Source:` is under `lsei/`.
- `- **Upstream ref:** \`none\`` — **24 files** under `_intake/`, with the reason stated in the field:
  `_intake/` is not a git working copy, so no ref exists. **Stated rather than omitted, per E16** — an
  omitted field is invisible, a stated `none` is falsifiable.
- `- **Merge-time digest:** \`sha256:<64 hex>\`` — **168 files, 168 distinct digests**, over the bytes
  of that file's `Source:` copy. Full 64 hex deliberately: a truncated digest invites a collision
  argument in the one place this project cannot afford one.

144 + 24 = 168, agreeing with the Systems Engineer's count and `verify_corpus`'s. The script refused
to stamp any file whose block `- **Source:**` disagreed with `merge_plan.tsv`'s `source_path`, and had
**zero** to refuse. `bootstrap_contract.md` §7.2's `diverged` verdict was `unknown` for the whole
shelf for want of this digest; it is computable for all 168 as of this write.

## 5c. CRLF, routed by The Space Resources Engineer — 12 → 0

```
node <scratchpad>/w3_1_eol.js            # locate and attribute
node <scratchpad>/w3_1_eol_fix.js --write
```

**Before: 12 files, 2 974 CR bytes, all mixed-ending, against `.gitattributes` line 49
`literature/** text eol=lf`. After: 0 files, 0 CR bytes.**

**Attribution, because it matters who introduced them:** **0 of the 2 974 CR bytes were at or after
any `## Provenance` heading.** Every one was in a summary body, inherited from the `byte_source`
copy. The tree measured 12 mixed-ending files *before* my first write and 12 after — they pre-date
this wave and are not from my pass.

Normalizing them is itself a body byte change, so it is **declared**, as `normalize-eol-to-lf`,
appended to each file's existing `Body edit (2.6)` op list. All 12 already carried one; none needed a
fresh declaration. `MRG-4b` and `verify_corpus`'s `DIV` both report line-ending normalization
separately and never fold it into the content comparison, so no content claim moved — but an
undeclared byte change is precisely what this wave is red on, and I was not going to add twelve more.

## 6. Close conditions

Taken at `literature/` read-digest **`e1d74b1af658ad92`** (project form), 171 files — 169 `.md` plus
`INDEX.tsv` and `FIELDS.tsv`. **The shelf gained a 169th summary while I worked**; see the last bullet.

- **`node oracle/tests/run_suite.js`** — **405 rows, 33 pass, 4 fail, 368 unrun, exit 1.**
  **No passing row lost, at either of my two measurement points.** At the Wave 3 open the suite read
  18 / 4 / 383; after my 2.6/2.7/2.8 write it read 18 / 4 / 383, unchanged in every group tally; W3-2
  then wired `NAM-1`, `NAM-2`, `NAM-10`, `PRV-1` and it read 22 / 4 / 379; after my §3b rename it
  read 22 / 4 / 379, again unchanged; it now reads 33 / 4 / 368 as W3-2 continues wiring `REG`. **The
  pass count only ever rose, and it rose from another seat's work, never from mine. The fail count
  was 4 at every single reading** — `MRG-4b`, `MRG-9`, `MRG-10`, `PTH-13`, the four the standing
  block names as not mine to silence. `MRG-4b` is red and §3 says plainly why and what fixes it.
- **A `## Provenance` block on every touched file, with the byte-identity claim true or amended** —
  169/169 carry one. 152 carry an explicit amendment naming the operations; 12 of those 152 also
  declare `normalize-eol-to-lf`. The 16 files untouched by 2.6 carry an unchanged claim that is still
  true, and the 169th was written in house format and asserts no byte-identity claim at all.
- **`node tools/check_registers.js`** — `hard failures: 0 @ read-digest 52049384a5bdfcc1 over 275
  files, tool 2.19-1`. Zero, as at the Wave 3 open.
- **`node tools/quantities.js --check`** — `hard failures: 5 @ read-digest e68cc614d7d30c48 over 476
  files, tool 2.19-1, flags --check`. Three `M3` two-valued quantities (`Q-ECR-AXES`,
  `Q-LCC15-DISTINCT-LEAVES`, `Q-DEGRADED-MODES`), one `M11`, one `M6` (`QUANTITIES.md` stale). **None
  names a `literature/` path**; all five sit in `cr_scratch/` register files and `QUANTITIES.md`.
  Not mine, listed below.
- **`node tools/verify_corpus.js`** — `hard failures: 9 @ read-digest 0bc21b937f87d2c5 over 171 files,
  tool 2.17-1`. It read 2 when I opened, 8 after my §3b rename, **1** once its owner taught it both
  heading forms, and 9 now — **the eight it gained are all the 169th file, none is mine.** Its
  `PRV-1b` reports *the merge block is unambiguously identifiable in all 168 files*, which is The
  Fact-Checker's defect closed, and its `DIV` reports *0 landed bodies differ from upstream without a
  declaration* and *declaration join is exact: 152 declared, 152 actually differing, 0
  declared-but-identical, 0 differing-but-undeclared*. That is my §3 claim confirmed by an instrument
  I did not write.
- **Corpus integrity** — `INDEX.tsv` and `FIELDS.tsv` untouched by me. **0 CR bytes in the tree**,
  against 2 974 in 12 files before. Zero triple-blank-line runs introduced. The one file whose H1 is
  still followed immediately by a `##` (`lsic-newsletter-2026-june-final.md`) was already that way and
  carries no CTS marker; the other 38 in that state before the write were CTS files and the drop
  fixed them.
- **The 169th file needed nothing from me, and I changed nothing in it.**
  `literature/growth-theory/denison-1972-classification-of-sources-of-growth.md` landed from W3-6
  after my last write, closing 2.9 (ECON-3). Measured: `## Metadata` present and ahead of
  `## Abstract`, no CTS marker, one `## Provenance`, LF throughout, and an `- **Upstream ref:**
  \`none\`` field in the exact wording of §5b — the convention propagated without my touching it. Its
  own block declares `Body edit (2.6): not applicable`, correctly.

## 7. Not mine

- **`MRG-4b` has no general mechanism for a declared body edit, and `PROV_MARK` knows one heading
  form.** Sub-step 2.4 (MERGE-5t) / the `corpus_suite.md` row. Owner: The Software Engineer (suite),
  The Manager (the `MRG-4` ruling the row implements). **Both exact replacement strings are relayed
  in `cr_scratch/relay/w3-1_engineer_to_w3-2_prov_marker.md`.** This is now urgent rather than
  standing: the row went from 2 undeclared to 166, and it can no longer surface the 2.
- **The divergence tool: one tool, not two — answered.** The Systems Engineer asked, by relay,
  whether it lands as `tools/corpus_divergence.js` or as a mode of `tools/verify_corpus.js` before
  either of us wrote it. **Answered in `cr_scratch/relay/w3-1_engineer_to_w3-3_divergence_tool.md`: a
  mode of `verify_corpus.js`**, on 2.17's own consolidation ruling, on the fact that two tools cannot
  share a read-digest, and on the 100 / 71 / 17 / 89 precedent. Neither of us has built it. One
  consequence is his to take: `bootstrap_contract.md` §7.2 names `tools/corpus_divergence.js` as the
  dispatched binary and becomes `verify_corpus.js --mode divergence`. I did not touch his file. I
  also asked him to fix the `declined` citation columns before I implement against a guess.
- **Two undeclared Wave 2 body edits are still undeclared**, and one is a factual change:
  `falcon-heavy-wikipedia` had its maiden-flight date changed from 2026-02-06 to 2018-02-06 with no
  assertion authorising it, and `rostami2018-figures` had a `## Citation` block added. Sub-step 2.5.
  Owner: The Space Resources Engineer, who made them. They are named in those two files' Provenance
  blocks as a precondition of my edit, which is as far as I may go — declaring another seat's edit
  on their behalf would be writing their finding for them.
- **`falcon-heavy-wikipedia` carries an internally impossible chronology.** A maiden flight of
  2026-02-06 cannot precede a 2019 centre-core recovery. The Fact-Checker routed this at 2.7 and it
  is still open; the file now also carries `Retrieved: 2026-07-19` in its `## Metadata`, which is a
  retrieval date, not a publication date. Owner: The Space Resources Engineer / The Fact-Checker.
- **`jones-superheavylift-final20260614.md`'s filename asserts a date its own Provenance block now
  records as unsupported.** Sub-step 1.7 / 2.2 naming. Owner: whoever holds `oracle/NAMING.md`. The
  Fact-Checker's note that one 200-dpi render of the cover settles it stands unactioned.
- **`node tools/quantities.js --check` is red on 5 rows**, none in `literature/`: `Q-ECR-AXES` 17 vs
  18, `Q-LCC15-DISTINCT-LEAVES` 58 vs 59, `Q-DEGRADED-MODES` two-valued, one `M11` cwd row, and
  `QUANTITIES.md` stale against its regenerated index. Owners: The Manager (economics register), The
  Space Resources Engineer (lunar register), The Systems Engineer (degraded modes), The Designer
  (the index).
- **`tools/verify_corpus.js` `SRC-1` returns a wrong answer, and I checked it rather than repeating
  it.** It reports `1 of 169 Source: paths do not resolve:
  literature/growth-theory/denison-1972-...md -> _intake/japanese-miracle/lit/denison-1972-...pdf`.
  **The path resolves.** `test -f` → yes; `stat -c%s` → 447 354 bytes, exactly what the file's own
  block declares; `sha256sum` → `05143b57…a1f5`, matching the declared `Acquisition digest` character
  for character. The likely cause is that `SRC-1` resolves `.md` sources and this is the first
  `Source:` in the tree pointing at a `.pdf`. Owner: 2.17, whoever holds `verify_corpus.js` this wave.
- **The 169th file trips five more `verify_corpus` clauses, and four of them are it being new, not it
  being wrong.** `PRV-4` (`Byte source: none — …` outside the closed 5), `PRV-5` (`Disposition:
  WRITTEN` outside the closed 7), `FLD-10` (on disk, no `INDEX.tsv` row — the index still has 168),
  and four `KA` known-answer rows taken at `af7abec` (landed files, field economics, `_intake/`
  sources, dedup keys, each off by exactly one). A file that lands outside `merge_identity.js` needs
  either two new closed-set members or an explicit non-merge landing mode, and `INDEX.tsv` needs its
  row. Owners: The Manager (W3-6, who wrote it), and 2.17 / 2.3 for the closed sets and the index.
  Flagging, not fixing: `INDEX.tsv` is a generated artifact and the closed sets are contract text.
- **A concurrent Wave 3 seat is writing `## Contested` sections into `literature/**`.** 83 files
  carried one when I opened. I placed the 2.7/2.8 stamps at the end of the `## Provenance` *field
  list* rather than at end of file for exactly this reason, and verified their payload byte-identical
  across my write (`c04bc856ccf6d589ab33cf7ca4a63d08` before and after). The shelf moved under me
  three times during this task — 83 `## Contested` blocks, W3-2 wiring four then eleven more suite
  rows, and a 169th summary landing. Nothing was lost, but every count in this file names the digest
  it was taken at because of it, and two seats writing one tree with no interlock is a standing
  hazard rather than a finding.
- **`## Metadata` has no ratified schema.** Both a ` · ` prose line and a `| Field | Value |` table
  are in the corpus and 2.6 does not pick one. I emitted prose, the majority form. If retrieval is to
  parse this section, someone owns choosing one. Sub-step 3.7 (LOOP-4).

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
```
