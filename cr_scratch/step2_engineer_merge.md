# Step 2 Wave 2 — W2-1, The Engineer: 2.2 completed, the column split, the merge built and staged

Written 2026-08-28. Deliverable of the W2-1 sitting. `cwd: repository root, 55 characters`
(`C:\Users\Quinn Morley\onedrive\projects\cc\lunar oracle`).

---

## 1. Premise check

Four premises. **Two held, two are false, and one of the false ones changes what lands.**

### P1 — PARTLY FALSE. The section 7 text is there; the sufficiency claim is not.

`oracle/NAMING.md` section 7 carries, verified by reading lines 297–412:

| Asked for | Present | Where |
|---|---|---|
| level 2B inserted between 2 and 3, not renumbered | yes | §7 precedence block, `2B. agency or grant number` |
| clause (a) URL must carry a path | yes | `**(a) A level-2A URL must carry a path.**` |
| clause (b) `10.13140/` mirror DOI is not level 1 | yes | `**(b) A mirror-minted DOI is not a level-1 identifier.**` |
| clause (c) identifier held by >1 key is a candidate | yes | `**(c) An identifier held by more than one key is a candidate...**` |
| clause (d) 2B confirms only when (c) holds | yes | `**(d) Level 2B exists because agency identifiers confirm...**` |
| level 3 read from `## Citation` | yes | `Read from the file's ## Citation block.` |

All six. **The second half of P1 is false: those five things are not sufficient to disposition all 34
`HOLD-NOID` rows and the one `HOLD-FALSEMERGE` row.** They are sufficient for 33 of the 34 and for
the `HOLD-FALSEMERGE` row. They are not sufficient for `rostami2018-figures.md`, which carries **no
citation block of any kind** — no `## Citation`, no `## Provenance`, no `## Metadata`. §7 does not
disposition that row; it rules it a *landing failure*, which is a different act with a different
owner. Measured: `grep -c '^#\{2,3\} *\(Citation\|Provenance\|Metadata\)'` returns 0 on that file
and ≥1 on every other row in the table but one — see P4's finding below for the other one.

Sufficiency is also not free. Clause (c) as written ("an identifier held by **more than one** key is
a candidate") cannot be read literally, because under a literal reading **no level-2A or level-2B
identifier can ever confirm anything**: confirming a pair *requires* two keys to hold the same
string, so every confirmation would be self-refuting. §7's own worked example forces the other
reading — `sowers-2019`'s NIAC pair "is confirmable **only** this way ... grant `80NSSC19K0964`
printed in both members", a group of exactly two. **The reading I applied, and the one the numbers
below are computed under: a group of size 2 confirms; a group of size 3 or more drops to candidate
and goes to a person.** That is the only reading under which (c) and (d) are simultaneously
satisfiable. It is also exactly the case §7's narrative describes — "it over-merged once in six on
exactly that" — and the group it describes has three members. I did not amend §7; §7 is not mine.
I recorded the reading and routed the wording in `## Not mine`.

### P2 — HELD, and held exactly.

`cr_scratch/merge_plan.tsv` is unchanged since Wave 1. Not asserted from the mtime; re-derived:

```
node tools/merge_identity.js --plan lsei/literature _intake/japanese-miracle/lit \
     cr_scratch/step2_engineer_taxonomy.md _intake/superseded-duplicates /tmp/mp_regress.tsv
cmp /tmp/mp_regress.tsv cr_scratch/merge_plan.tsv    ->  no output, exit 0
```

**Byte-identical.** 176 rows, 17 columns, block 1 = 117, block 2 = 59, read-digest
`3cb8cc59509e77c39cd87fb45c2905c5ea9ca7d0754a640ebd62ccc8517a85c1` over 278 files — the *same*
digest the committed header records, which means the two source corpora have not moved a byte or an
mtime since Wave 1 either. The disposition tally reproduces:
`LIFT-IDENTICAL 65, LIFT 52, HOLD-NOID 34, HOLD-PAIR 16, LIFT-LSEI-SCRUB 5, LIFT-LSEI-STEP0 3,
HOLD-FALSEMERGE 1`.

The constraint's regression guard also passes, and I ran it **before** trusting any plan output as
instructed:

```
node tools/merge_identity.js lsei/literature _intake/japanese-miracle/lit /tmp/mi_regress.tsv
cmp /tmp/mi_regress.tsv cr_scratch/merge_identity.tsv   ->  DEFAULT MODE BYTE-IDENTICAL
```

### P3 — HELD.

`walk()` at `tools/merge_identity.js:33` filters `/\.md$/i` at the leaf, so the glob is structurally
`*.md` and a non-`.md` leaf cannot enter. Counted rather than reasoned:

| directory | files | `.md` | non-`.md` |
|---|---|---|---|
| `lsei/literature` | 152 | 152 | 0 |
| `_intake/japanese-miracle/lit` | 234 | 119 | **115** — 112 `.pdf`, 3 `.txt` |

The three `.txt` are `un-1967-outer-space-treaty.txt`, `un-1972-liability-convention-space-objects.txt`,
`un-1979-moon-agreement.txt`. All 115 excluded. 152 + 119 = 271 `.md` in, 176 union keys out, 95
keys held by both corpora (271 − 176 = 95, and `both-identical` 87 + `lsei-primary` 8 = 95 —
the two arithmetics agree).

### P4 — HALF FALSE, and this is the half that changes what lands.

`literature/` holds **0 files**: `find literature -type f | wc -l` = 0. That half holds.

**"Nothing in the repository writes to it but you" is false, and the writer is `tools/quantities.js`
reading rather than writing — which is worse, because it is invisible.** `declaredFileSet()` at
`tools/quantities.js:112` walks four roots, and one of them is `cr_scratch/` for `*.md`:

```js
walk(path.join(ROOT, 'cr_scratch'),  p => /\.md$/.test(p), files);
walk(path.join(ROOT, 'literature'),  p => /\.md$/.test(p), files);
```

`M13_EXCLUDE` at `tools/quantities.js:849` is `/^literature\/.*\.md$/`. **`cr_scratch/_stage/literature/**/*.md`
does not match it, because it is not `literature/` — it is `cr_scratch/`.** Staging 168 corpus
summaries where my brief tells me to stage them therefore drops 168 files into the declared file set
of the instrument every other seat in this wave is measuring against, un-excluded by `AM-137`,
mid-wave.

**I then measured the consequence, and half of what I predicted is false. I predicted it would move
every read-digest in the wave AND fire `M13` across the corpus. The first is true, the second is not,
and I am recording my own wrong prediction rather than the corrected one.**

| | before my stage | after my stage |
|---|---|---|
| declared file set | 110 → 121 files | **291 files** |
| read-digest | `4f017a7cfd297995` → `5c152309bbefb53a` | **`7a7c622c8de54c78`** |
| hard failures | 15 → 5 | **5, the same five** |
| `M13` findings inside the stage | n/a | **0**, measured with `--lint` |

`M13` findings from the staged corpus: **zero**. `M13` fires on a bare governed numeral, and 168
literature summaries contain none that collide with a governed id. `M13` also does not run under
`--check` at all — it is behind `--lint` (`tools/quantities.js:1066`), so the exposure clause 7 warned
about is latent here rather than live. **The `AM-137` gap is real and the harm I attributed to it is
not.** What *is* confirmed is the comparability break: the declared set moved 121 → 291 and the
digest with it, so no figure quoted before this stage landed is comparable to one quoted after it.
That is standing clause 3 operating exactly as written, and it is why the digests are on every number
in this file. Routed in `## Not mine` to the `AM-137` owner as a latent gap, not as damage.

---

## 2. The rulings, landed

**Ruling 1 — the column splits. Done. `merge_plan.tsv` is 18 columns, and it was 17.** State it so
nobody differences it.

- Column 6 is renamed `byte_source`. Closed set `sole-lsei` 57, `sole-intake` 24, `both-identical`
  87, `lsei-primary` 8, `intake-primary` 0. `intake-primary` is admitted with zero members for the
  stated reason: a closed set with a missing member routes an author into the wrong member silently.
- Column 7 is new: `pair_primary`. `primary` 8, `secondary` 8, `n/a` 160, `unadjudicated` 0.
- Both meanings are stated in one sentence each in the file header, plus three
  `# legend <column> = ...` lines a checker can read. That last is not decoration: `MRG-2` is RED
  *on the legend only* because "the set is declared in a comment, not in a legend a checker reads".
  The legend lines discharge that, and they cost no apparatus.

**`pair_primary` does NOT read `unadjudicated` on all 16, and Ruling 1 said it would.** The author
ruled afterwards that duplicate pairs are picked now, not deferred to 2.16. The later ruling is
author-sourced and it wins; Ruling 1's "that is 2.2's ratified contract, not a deferral" is
superseded on this point. `unadjudicated` stays in the closed set for the same reason
`intake-primary` does.

**The payoff: `MRG-4` goes green as The Software Engineer wrote it.** His row asserts "for every
contested pair, both members carry a value and exactly one of the two is primary". Measured on the
regenerated table: 8 pair groups, each with exactly one `primary` and one `secondary`. He refused to
rewrite the test to fit either answer and the test he refused to bend now passes unmodified.

**Ruling 2 — the three malformed blocks. Repaired.** `Q-PLAN-CHURN` `class: measured` →
`class: fixed`; both `Q-PLAN-BLOCK1-117` and `Q-PLAN-CHURN` `conditions:` now name
`cwd: repository root, 55 characters`. `node tools/quantities.js --check` → **5 hard failures @
read-digest `5c152309bbefb53a` over 121 files**, and **zero `M1` or `M11` naming any file of mine**.
Ten of the fifteen were the fork two other seats collapsed at the wave open, which is the collapse
landing and not mine; three were mine; the surviving five are `M3` ×3, `M11` on
`step1_8_software_engineer_register_schema.md`, and one `M6` I caused and cannot fix — see
`## Not mine`.

**Ruling 3 — `FIELDS.tsv` and `INDEX.tsv`. Both emitted into the stage.** `FIELDS.tsv` is two rows
of closed values, `field / label / review_owner / folders / files`: `lunar` over 8 folders with 124
files, `economics` over 3 folders with 44. `INDEX.tsv` is 168 rows and four columns,
`path / primary / also / field`, per the reconciliation with The Software Engineer in which
`FLD-11` corrected to four columns and my `INDEX-1`…`INDEX-5` were absorbed into the `FLD` group.

---

## 3. 2.2 completed — every `HOLD-NOID` and the `HOLD-FALSEMERGE` row dispositioned

**The variance is closed.** §7 now says level 3 is read from the `## Citation` block, so
`clusters.js` RULE E's filename derivation is no longer the rule. `l3cite()` reads the block;
`l3name()` survives only as the fallback for a file with no block to read, and it fires on exactly
**one** row (`metzger-autry-2023`, whose citation prints `(n.d.)`). `L3-PENDING` no longer appears
anywhere in the table.

**The 34 `HOLD-NOID` rows, by the level at which the amended §7 resolves them:**

| resolved at | rows | how |
|---|---|---|
| level 2A | **0** | none of the 34 has a publisher article URL; that is why they were `HOLD-NOID` |
| level 2B | **11** | agency or grant number, hand-read from the block, declared as data in `merge_identity.js` |
| level 3 | **20** | `(identity, year, first six title words)` from the `## Citation` block |
| level 3, filename fallback | **1** | `metzger-autry-2023` — block prints `(n.d.)`, no year to read |
| **none (`L0`)** | **2** | `nasa-clps-delivery-timeline` (undated infographic), `rostami2018-figures` (no block) |

11 + 20 + 1 + 2 = 34. The whole-table key census moves from `L1` 89 / `L2` 48 / `L3-PENDING` 34 /
`L0` 5 to **`L1` 89 / `L2A` 45 / `L2B` 13 / `L3` 27 / `L3-NAME` 1 / `L0` 1**.

**The 11 level-2B identifiers**, each quoted from the block it came from: `NASA/TM-2010-216219`
(colozza-2010), `NASA/TM-2007-215041` (kerslake-2007), `80NSSC20K1022` (metzger-2021, printed
`80NSSC 20K1022`, whitespace removed per §7), `ESRI-RESEARCH-NOTE-27`, `IMES-DP-2007-E-1`,
`MEMORIAL-A-674-2017`, `UNGA-RES-2222-XXI`, `UNGA-RES-2777-XXVI`, `UNGA-RES-34-68`, `PUB-L-114-90`,
`HBR-REPRINT-99509`. Two more 2B keys are carried by the ADD pair below, making 13 `L2B` rows.

**The `HOLD-FALSEMERGE` row is resolved, and clause (c) resolved it rather than a hand input.**
`nasa.gov/moontomarsarchitecture` is held by three union keys. Clause (c) disqualifies it as a key
for all three; each falls to the next level. The two Architecture Definition Document summaries both
print `NASA/TP-20250010956` and `ESDMD-001`, so they meet at **level 2B**, a group of two, a
confirmation — this is precisely the case clause (d) was written for. `nasa-data-gaps-acr25` prints
the ADD's report number only as the document it *excerpts from*, never its own, so it falls to its
own level-3 key and collides with nothing. **It lands.**

**I then tested whether the `FALSE_MERGE` hand input still does any work, by emptying it and
re-running.** Identical result: the same 8 pairs, the same tags, the same levels. The only
difference is the disposition *label* on that one row (`HOLD-FALSEMERGE` → `LIFT`). **The pair
suppression that hand input used to perform is now done by rule.** I kept the label rather than
deleting the constant, because deleting it takes `HOLD-FALSEMERGE` to zero members and breaks
`MRG-2`'s declared seven-value set while The Software Engineer is running the suite against my
stage. The deletion is routed, not taken.

**The six `dedup_key` collisions are resolved.** Five are `L1` DOI groups of two — genuine
same-source pairs, all now `DUP-01/02/04/06/07`. The sixth is the three-member `L2` landing-page
group, which dissolves as above into one confirmed `L2B` pair and one unrelated document. **The
L2-landing-page case was my own clause (c) arriving with data and it behaved as the clause predicted.**

**Three one-cell corrections, applied:**

1. `metzger-autry-2023-lunar-landing-pads` `also` → `isru-processing;space-economy-and-markets`.
   Recorded, as instructed, as **the first real instance of my own taxonomy §5 warning that "a source
   needing three homes is evidence the taxonomy is wrong"**. It is a landing-pad *cost* paper with a
   *construction-methods* trade study: logistics, ISRU and economics, and no two of those are the
   same shelf. One instance is not yet a refutation of an eleven-folder taxonomy, but it is the first
   datum against it and it should be counted rather than absorbed.
2. `kiyota-2013` — the recorded level-2A key `ier.hit-u.ac.jp/primced/e-index.html` is the PRIMCED
   research *project index page*, not this paper. Replaced with the document address from this
   corpus's own ledger, `_intake/japanese-miracle/fa/FA1-source-list.md` entry 10:
   `rieti.go.jp/en/publications/summary/13110004.html`. **This one is worth more than its cell** —
   see §7.
3. `tools/merge_identity.js:22` named the dead path `literature/NAMING.md`. Now `oracle/NAMING.md`.
   `grep -c 'literature/NAMING.md' tools/merge_identity.js` → 0.

---

## 4. A false merge my own instrument produced, and the run that produced it

**I am publishing the defect rather than only the corrected number, because the corrected number
alone would hide that the rule §7 states was load-bearing and I nearly did not implement it.**

My first working `--plan` run after adding `l3cite()` reported **9 same-source pairs, 18 `HOLD-PAIR`
members, 32 `HOLD-NOID`**. The ninth pair was:

```
DUP-03  primary    L3|lunar-surface-innovation-consortium|2026|lsic-newsletter-vol   lsic-2026-newsletter-august.md
DUP-03  secondary  L3|lunar-surface-innovation-consortium|2026|lsic-newsletter-vol   lsic-newsletter-2026-june-final.md
```

Those are the **August and June 2026 issues of one newsletter** — Vol 7 Issue 4 and Vol 7 Issue 3,
two different documents. §7's "first six words of the title" truncates
`LSIC newsletter (Vol. 7, Issue 4)` to `lsic-newsletter-vol`, *before the issue number*, so both
issues produce the same key. Under the pick-one rule the larger would have **deleted the smaller**,
and the loss would have been a whole newsletter issue with no record but a `rev` bump.

The cause was mine: I had let a level-3 group of two confirm a pair. §7 says in terms that it must
not — *"A level-3 match is a candidate duplicate, never a confirmed one. It is reported for a person
to resolve and the merge does not act on it."* I had read that clause, quoted it in §1 of this file,
and then written code that violated it. The guard is now explicit (`CONFIRMS = /^(L1|L2A|L2B)\|/`)
and the comment beside it records the false merge rather than the rule.

**Two things follow that are worth more than the fix.**

1. **The corpus supplies empirical support for §7's rule.** Level-3 citation-block grouping over 176
   keys produced **one true positive** (`sowers-2019` NIAC, which a person had already confirmed by
   hand at 2.12) and **one false positive** (the LSIC newsletters). A rule with a 50% false-positive
   rate on this corpus is exactly a rule that must never confirm automatically. §7 was right and I
   have the run that shows it.
2. **`LEVEL3_PAIRS` is therefore NOT redundant**, and I had expected to retire it. `sanders-2025` and
   `sowers-2019`-NIAC remain hand inputs because §7 forbids the instrument from making that call.
   The hand input that *did* become redundant is `FALSE_MERGE`, and for the opposite reason: clause
   (c) is a rule the instrument *can* apply.

The LSIC pair is now reported on stderr as an open level-3 candidate, both members land, and it is
routed to 2.16.

---

## 5. The eight duplicate pairs, picked

The author's rule, in order: a decision recorded in `step0_dedup_decisions.md` wins; else if the two
members are byte-identical take either; else take the larger file.

**Rule 1 reaches none of the eight, and that is measured rather than assumed.** Step 0's six
decisions were executed by *deleting* the loser from `lsei/literature/`, so not one of those six
survives as two union keys. `metzger-2021`, `csank-2022` and `poston-2020` are each a single key in
this table. **`poston-2020`'s `SIZE MUST NOT BREAK THIS TIE` marker is still in the data and it is
still doing its job** — that row is `LIFT-LSEI-STEP0`, dispositioned on a sha256 match against the
superseded set, and the size rule never touches it. The rule-1 lookup is live in the code with an
empty table, so the next recorded decision is honoured without an edit.

No pair is byte-identical, so rule 2 fires on none. **All eight are decided by rule 3.**

| pair | key | winner (bytes) | dropped (bytes) |
|---|---|---|---|
| `DUP-01` | `L1\|10.1126/science.1186986` | `colaprete-2010-lcross-ejecta-water-detection` 34,345 | `colaprete-2010-lcross-water` 14,997 |
| `DUP-02` | `L1\|10.1016/j.reach.2019.100026` | `kornuta-2019-commercial-lunar-propellant-architecture` 45,216 | `kornuta-2019-commercial-lunar-propellant` 22,842 |
| `DUP-03` | `L2B\|NASA/TP-20250010956` | `nasa-moon-to-mars-doc` 84,767 | `nasa-2025-moon-to-mars-architecture-add-revc` 6,602 |
| `DUP-04` | `L1\|10.1126/science.1187726` | `paige-2010-diviner-cold-trap-temperatures` 27,121 | `paige-2010-diviner-psr-cold-traps` 12,102 |
| `DUP-05` | level 3, hand-confirmed | `sanders-2025-nasa-isru-progress-review` 16,043 | `sanders-2025-nasa-lunar-isru-progress-review` 7,260 |
| `DUP-06` | `L1\|10.1016/j.asr.2016.01.006` | `schreiner-2016-mre-sizing-model` 9,943 | `schreiner-2016-molten-regolith-electrolysis-sizing` 7,589 |
| `DUP-07` | `L1\|10.1089/space.2019.0002` | `sowers-2019-psr-ice-mining` 29,270 | `sowers-2019-thermal-mining-ice` 20,287 |
| `DUP-08` | level 3, hand-confirmed | `sowers-2019-thermal-mining-niac-report` 20,696 | `sowers-2019-thermal-mining-niac` 6,539 |

All sixteen members are in the same folder as their twin, so no pair crosses a shelf and `MRG-9`
and `MRG-10` see the same population here.

**One pair that is NOT a pair, flagged by The Space Resources Engineer and confirmed here.**
`rostami2018.md` (19,130 bytes) and `rostami2018-figures.md` (12,601) are two summaries of one paper
— a full technical summary and a figures-and-tables companion — and they are **not** a duplicate
pair. The size rule must not fire on them, and it does not: `rostami2018.md` carries
`L1|10.1061/9780784481899.024` and the figures file lands with a level-3 key and **no DOI**, which
is deliberate. Writing the parent's DOI into the companion would make them a level-1 confirmed
duplicate, and the merge acts on level-1 confirmations. That would have destroyed all six figure
readings. The reason is written into the landed file's own citation block so a successor reading only
the file can see it.

**Churn rose to 21 / 59 = 35.59%, over the Manager's 15%, and I am reporting it at the number it
came out at.** Five rows are the Wave 1 partition corrections. Sixteen are the pair members, whose
*landing outcome* changed after first write: Wave 1 landed both and deferred; the author ruled one
lands. The `disposition` cell still reads `HOLD-PAIR` in both cases, so a `rev` bump keyed only on
the disposition string would have missed it entirely — **which is exactly the silent revision
`MRG-11` exists to catch**, and it is why I bumped on the outcome rather than on the string. I did
not narrow the definition to get under the threshold.

---

## 6. THE STAGE

```
node tools/merge_identity.js --stage cr_scratch/merge_plan.tsv cr_scratch/_stage
```

| | |
|---|---|
| **path** | `cr_scratch/_stage/literature/` |
| **`.md` files staged** | **168** |
| **non-`.md` staged** | **2** — `INDEX.tsv`, `FIELDS.tsv`. **PDFs 0, `.txt` 0.** |
| **read-digest** | `7bd2ad60e14ad26618885e6d4ada0c5c3ba73ecf2ecc3860da21e12393ccc14c` over **169 files read** (168 sources + `merge_plan.tsv`) |
| **plan digest** | `3cb8cc59509e77c39cd87fb45c2905c5ea9ca7d0754a640ebd62ccc8517a85c1` over 278 files |
| **promoted** | **NO.** `literature/` still holds 0 files. |

**The stage executes the committed table and nothing else.** `--stage` reads
`cr_scratch/merge_plan.tsv` rather than recomputing the plan, so "apply every disposition from the
table and nothing not in the table" is structural rather than a promise: a row absent from the table
cannot land, and a row present cannot be skipped.

**The reconciliation against 176, with its rule.** A row lands iff `pair_primary != 'secondary'`.

```
176 plan rows  −  8 pair secondaries  =  168 landed
```

168 is not a coincidence and it is the check that matters: it equals **`Q-MERGE-SOURCES-168`**, the
distinct-source count, derived independently at Cycle A as `176 − 8 = 168`. The merge lands one file
per distinct source. The eight not landed are named in §5, each with the rule that dropped it.

**Folder census of the stage** (11 folders, one level deep):

| folder | files | | folder | files |
|---|---|---|---|---|
| `development-and-industrial-policy` | 22 | | `power-and-thermal` | 17 |
| `growth-theory` | 13 | | `programme-primaries` | 8 |
| `isru-processing` | 28 | | `self-replication-and-automation` | 5 |
| `logistics-and-delivery` | 12 | | `space-economy-and-markets` | 26 |
| `lunar-ice-and-geology` | 18 | | `space-law-and-governance` | 10 |
| `organization-and-production-systems` | 9 | | **total** | **168** |

Field split of the staged tree: **124 lunar, 44 economics**. The plan says 132 / 44; all eight
dropped secondaries are lunar, and 132 − 8 = 124. The two arithmetics agree.

### 6.1 Every landed file carries a `## Provenance` block

Appended to all 168. It records the source path, the byte source, the disposition (labelled *a
landing mode, not a gate*), the dedup key, the field and folder, the plan `rev`, and — for the eight
pair primaries — the twin that did not land and the rule that picked. Where the identifier is absent
the block says so in words rather than omitting the field, per the ruling: *the absent identifier is
an open field, not an omission.*

### 6.2 Bytes changed, and the correction `MRG-4b` needs

**My brief says the azami repair must be "the ONLY row where the landed bytes differ from the source
bytes, because The Software Engineer is writing `MRG-4b` to assert exactly that". That assertion is
unsatisfiable as stated, and my own brief makes it so two sentences earlier** by instructing me to
"Emit a `## Provenance` block into every landed file". Every landed file therefore differs from its
source. `MRG-4b` must assert on the **body**, the landed text with the provenance block removed.

On that definition, the count is **3, not 1**, and the other two are routed work from a same-wave
peer that arrived after my brief was written:

| file | body edit | source |
|---|---|---|
| `azami-2024-lunar-manufacturing-review.md` | canonical `- **DOI:** 10.48550/arxiv.2408.05823` written into the citation block | the table's own `id_in_source=NO`; my brief |
| `rostami2018-figures.md` | `## Citation` block written at landing (the artifact carries none) | The Space Resources Engineer, W2-4 |
| `falcon-heavy-wikipedia.md` | `## Citation` block written at landing, **plus** a content fix `Maiden flight 2026-02-06` → `2018-02-06` | The Fact-Checker, confirmed by W2-4 |

The azami repair is exactly as instructed: the **lsei** bytes were lifted, the canonical DOI line
written in, and the intake copy **not** imported. The line sits immediately above `Publisher URL:`
inside the existing `## Citation` block; the source's own sentence "DOI: not printed in source
(preprint)" is left standing, because it is a true statement about the byte source, and the
provenance block explains the addition. The falcon-heavy date fix is not cosmetic: that file is the
corpus's launch-price anchor for the $1,520/kg figure `take-or-make-in-space.md` builds its breakeven
on, and it contradicted itself twice within two lines.

I have relayed this to The Software Engineer as a `REVIEW`. If he asserts whole-file equality
`MRG-4b` fails on 168 rows; if he asserts body equality it fails on 3 unless the three exceptions are
named. **Both are correct tests of different things and only one of them is the test he wants.**

---

## 7. The defect class behind the `kiyota-2013` cell — worth more than one cell

`kiyota-2013`'s key was `ier.hit-u.ac.jp/primced/e-index.html`, the PRIMCED research *project index
page*. It is not an address of the paper. **It passed both existing guards.** Clause (a) requires a
path and it has one. Clause (c) demotes a string held by 3+ keys and only one key holds this one. So
a string that addresses a research programme rather than a document sat in the table as a level-2A
confirmation, and nothing in §7 could see it.

**Scanning the other 47 level-2 keys by eye, this is a class and not an instance.** Also
programme-or-index pages rather than document addresses: `nasa.gov/architecture`
(`moon-base-architecture-users-guide`), `nasa.gov/content/commercial-lunar-payload-services-overview`
(`nasa-clps-procurement-vignette`), `energyinst.org/statistical-review`
(`statistical-review-of-world-energy`, a landing page for an annual serial, not an edition).

**None of them causes a false merge today**, because a false merge needs two keys to share a string
and each of these is held by one. They are latent: they become live the moment a second summary of
anything on the same programme page arrives, and this corpus is going to keep importing NASA
programme documents. I fixed the one cell I was routed and **took none of the other three** — they
are §7's and 2.16's, and taking them would be widening my write set to reach a number. Routed with
the evidence.

The general form, for whoever amends §7: **clause (a) tests the URL's shape and the defect is in its
referent.** A path is necessary and not sufficient. The distinguishing evidence is available and
cheap — in every one of these four cases the file's *own citation block* names the document-level
identifier (a DP number, a report number) while printing the programme page as its URL. A level-2A
key that loses to a level-2B key printed in the same block is the signal.

---

## 8. Nothing is dropped silently — the full account of the 176

| outcome | rows | |
|---|---|---|
| landed in the stage | **168** | one per distinct source |
| not landed: pair secondary | **8** | named in §5 with the winner, both byte counts, and the rule |
| **not landed for a metadata reason** | **0** | |
| **lost, unaccounted, or silently merged** | **0** | |

**No file is withheld from the corpus for a metadata reason.** The two files with no citation block
land with one written for them; the three files with no derivable identifier land with the field
recorded open; the false-merge row lands separately. `L0` in the final table is **1** row —
`nasa-clps-delivery-timeline`, an undated NASA infographic whose own citation prints `(n.d.)`. That
is a measured property of the source, not a gap in our record.

**§7 and the author ruling now contradict each other, and the ruling wins.** §7 says a file with no
citation block "does not land until it has one". The author ruled that no file is withheld for a
metadata reason. On these 176 the conflict is moot, because W2-4 wrote blocks for both files that
lacked one. It is live for the next arrival. Routed to the §7 owner — The Space Resources Engineer
found the same contradiction independently and routed it as his `N-5`; two seats reaching it
separately is the reason it should be closed rather than noted.

### Where I disagreed with an instruction, and what I did instead

Three, all reported rather than quietly resolved:

1. **Ruling 1 said all 16 pair members read `unadjudicated` this wave.** The author then ruled
   pick-one. I applied the later author-sourced ruling and kept `unadjudicated` in the closed set.
2. **The orchestrator's first `HOLD-PAIR` instruction said land both under a disambiguated name.** It
   was withdrawn and replaced by pick-one before I acted on it. Recorded because the withdrawn
   version was also unnecessary: the 16 members already carry 16 distinct filenames, so there was
   nothing to disambiguate, and §7 forbids a `-merged` suffix or a second name precisely because a
   name that encodes edit history breaks every citation to it.
3. **My brief told me not to adjudicate the four `L0` rows and to consume W2-4's outcome.** His
   outcome did not exist when I started and did when I finished; I consumed it. His five rows and my
   five rows are the same five, reached independently — **and the brief's population of four was
   wrong in the same way for both of us.** The omitted row is `falcon-heavy-wikipedia.md`, which is
   `L0` but was dispositioned `LIFT-LSEI-SCRUB` by an earlier branch and so never appeared in the
   `HOLD-NOID ∩ L0` set the brief was quoting. It is the only one of the five already set to land and
   one of only two files in the corpus with no citation block at all. **A row that lands silently
   with no citation block is worse than one that is held**, and neither brief had it.

---

## Not mine

| # | finding | sub-step | owner |
|---|---|---|---|
| 1 | **`M6` is RED and I caused it.** Repairing `Q-PLAN-CHURN`'s value (8.47 → 35.59) and class made `QUANTITIES.md` stale. I did not regenerate it: five seats are writing quantity blocks concurrently, and a whole-repo index regenerated mid-wave captures a torn read of their files, not just mine. The command is `node tools/quantities.js --index --write` — **not** `--index`, which writes nothing and exits 0 while `COUNTING_RULE.md` §4 part 3 names that version. Run it once, at wave close. | 2.19 | The Designer / whoever closes the wave |
| 2 | **`AM-137` excludes `/^literature\/.*\.md$/` and does not cover `cr_scratch/_stage/literature/`.** Latent, not live: measured 0 `M13` findings from 168 staged summaries, and `M13` does not run under `--check`. But the staged tree IS in `declaredFileSet()` and moved it 121 → 291 files, so every read-digest in this wave changed when I staged. | 2.19 / `AM-137` | The Systems Engineer |
| 3 | **§7 clause (c) cannot be read literally.** "Held by more than one key" makes every level-2A/2B confirmation self-refuting, since a confirmation needs two holders. §7's own `sowers-2019` example forces "a group of 2 confirms, 3+ is a candidate". I implemented that reading and did not amend §7. The wording should state the threshold. | 2.20 / §7 | The Space Resources Engineer |
| 4 | **§7 clause (a) tests the URL's shape; the defect is in its referent.** Three more programme-or-index pages sitting as level-2A keys, none causing a false merge today because each is held by one key: `nasa.gov/architecture` (`moon-base-architecture-users-guide`), `nasa.gov/content/commercial-lunar-payload-services-overview` (`nasa-clps-procurement-vignette`), `energyinst.org/statistical-review` (`statistical-review-of-world-energy`). I fixed only the `kiyota-2013` cell I was routed. Detection signal in §7 above. | 2.20 / 2.16 | The Space Resources Engineer |
| 5 | **§7 level 3's "first six words of the title" truncates before a serial's issue number** and produced a live false merge of the June and August 2026 LSIC newsletters (§4). The rule that level 3 never confirms is what contained the damage. Either widen the window or exclude serials. | 2.20 / §7 | The Space Resources Engineer |
| 6 | **The LSIC newsletter pair is an open level-3 candidate** sharing a `dedup_key` in the staged tree. Both land, correctly. Needs a person and a `DUP-xx` row, or a key fix. | 2.16 | The Manager |
| 7 | **`FALSE_MERGE` is now a dead hand input.** Verified by emptying it and re-running: identical 8 pairs, same tags, same levels; only the disposition label changes. Kept solely so `HOLD-FALSEMERGE` keeps its one member and `MRG-2`'s seven-value set survives the wave. Delete it and the `MRG-2` legend entry together, after the merge. | 2.16 | The Manager / The Software Engineer |
| 8 | **`metzger-autry-2023` needs three folders**, the first real instance of my own taxonomy §5 warning. Applied as a declared override in `merge_identity.js` because `step2_engineer_taxonomy.md` is not in my write set this wave; the taxonomy file's own `index-tsv` fence should carry it. One instance is not a refutation of the eleven-folder taxonomy; it is the first datum against it. | 2.3 / taxonomy | The Engineer, a later sitting |
| 9 | **`MRG-4b` cannot assert whole-file byte equality** — the provenance block changes all 168. Body scope, 3 named exceptions. Relayed as a `REVIEW`. | 2.4 | The Software Engineer |
| 10 | **A filter of the form `NF==17` now matches zero rows.** The table is 18 columns. W2-4's relay uses that filter and it will report success while reading nothing. Column indices after 5 shifted by one. | 2.4 / 2.2 | The Software Engineer, The Space Resources Engineer |
| 11 | **`Q-MERGE-SOURCES-168` is now confirmed by construction, not only by arithmetic.** The stage holds exactly 168 files, one per distinct source, `176 − 8`. The quantity was derived before anything landed; it is now measured. | 2.19 | The Designer |

## Relays written

- `cr_scratch/relay/w2-1_to_software_engineer_mrg4b_body_scope.md` — **REVIEW**, written mid-wave to a seat already building. Not a brief; does not discharge arm 2a.
- `cr_scratch/relay/w2-1_to_w2-8_promotion_brief.md` — **BRIEF** to a later spawn. Discharges arm 2a.

## Close conditions

| condition | status |
|---|---|
| every `HOLD-*` row dispositioned, or carrying a named reason and an owner | **MET.** 51 `HOLD-*` rows: 34 `HOLD-NOID` resolved (11 at 2B, 20 at level 3, 1 at the filename fallback, 2 at `L0` with the reason in the row), 16 `HOLD-PAIR` picked, 1 `HOLD-FALSEMERGE` resolved by clause (c). All 51 land except the 8 pair secondaries. |
| three quantity blocks repaired; zero `M1`/`M11` naming my files | **MET**, measured at two moments because staging changed the declared file set and the two figures are **not comparable** by standing clause 3. Immediately after the repair, before staging: **5 hard failures @ read-digest `5c152309bbefb53a` over 121 files**. At the close of my sitting, stage built and this file written: **5 hard failures @ read-digest `b986096eb0ccecee` over 293 files**. Same count, different set. At both moments `node tools/quantities.js --check 2>&1 \| grep '^FAIL' \| grep -c 'step2_engineer'` → **0**. A verifier re-running now will get a third digest, because five seats are still writing; the number to check is the zero, not the digest. |
| merge staged, with file count, build command and read-digest | **MET.** §6. 168 `.md` at `cr_scratch/_stage/literature/`, built by `node tools/merge_identity.js --stage cr_scratch/merge_plan.tsv cr_scratch/_stage`, read-digest `7bd2ad60e14ad26618885e6d4ada0c5c3ba73ecf2ecc3860da21e12393ccc14c` over 169 files. |
| do not promote | **HELD.** `literature/` holds 0 files. |

apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
