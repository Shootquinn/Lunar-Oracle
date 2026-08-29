# Step 8, W5-11 — The Systems Engineer: the reparse-point walk

**Seat:** W5-11, The Systems Engineer.
**Trees:** author tree `C:\Users\Quinn Morley\onedrive\projects\cc\lunar oracle`, `HEAD` moved from
`131f513` to **`0d2944a`** during this sitting (another seat committed; see §8). Fresh clone
`cc/oracletest`, synced from `131f513` to `0d2944a` so the before/after would isolate this seat's
change rather than mix it with `0d2944a`'s 43→3 repair.
**Node:** `v26.4.0`. **Platform:** Windows 11 26200, NTFS, OneDrive Files-On-Demand active.

---

## 0. THE PREMISE IN THE BRIEF IS HALF RIGHT, AND THE HALF THAT IS WRONG MATTERS

The brief opens: *"`Dirent.isFile()` returns `false` for a OneDrive Files-On-Demand placeholder."*

**I could not reproduce that, and I tried on a genuinely dehydrated file.** Measured:

```
attrib +U -P  on literature/isru-processing/*.md in cc/oracletest, then waited for OneDrive
  attrib          ->  A   O   U      (ARCHIVE, OFFLINE, UNPINNED)
  Get-Item .Attributes -> 5248544 = 0x501020
                       = 0x400000 RECALL_ON_DATA_ACCESS | 0x100000 UNPINNED
                       | 0x1000   OFFLINE               | 0x20     ARCHIVE
                       ...and NOT 0x400 FILE_ATTRIBUTE_REPARSE_POINT
  fsutil reparsepoint query -> Reparse Tag Value : 0x9000401a   (IO_REPARSE_TAG_CLOUD_*)

Node, over the 28 dehydrated files, WITHOUT reading any of them:
  TOTAL 28 entries: Dirent.isFile=28  Dirent.isSym=0
                    lstat.isFile=28   lstat.isSym=0   stat.isFile=28
```

The file is a reparse point — `fsutil` says so — but **the directory entry does not carry the
reparse-point attribute bit**, so `readdirSync(withFileTypes)` classifies it as a plain file. Cloud
tags are not name surrogates and libuv resolves them correctly. And to close the door on the
W4-5 story too: a **hardlink to a dehydrated file** measures `Dirent.isFile=true, nlink=2`.

**Then I ran the actual walker over the actual dehydrated tree**, which is the measurement that
settles it:

```
cd cc/oracletest  (28 of 169 summaries genuinely dehydrated at this moment)
node -e "require('./oracle/retrieval/literature_search.js').listCorpusFiles('literature').length"
  ->  169     of which isru-processing/: 28
```

**The pre-repair walker found every dehydrated file.** So the trigger named in the brief, on this
machine with this Node, does not fire.

### And the defect is real anyway, which is the point

W5-8 did not misread a flag. W5-8 watched **every RFX row fail with `EMPTY POPULATION` against 169
readable files** — a behavioural observation, not a transcription. Some OneDrive placeholder class
*does* present the reparse bit in the directory entry (the full-placeholder / `RECALL_ON_OPEN` class
is the candidate); I could not put a file into that class on demand and I am not going to claim I
did. What I *can* do is reproduce the **signature** — `Dirent` says link, the filesystem says file
or directory — from a reparse point that needs no administrator, and show it destroying a walk:

```
mklink /J junc <a 28-file folder>            (a real NTFS junction, real reparse point)
  Dirent:  isFile=false  isDirectory=false  isSymbolicLink=TRUE
  lstat:   isDirectory=FALSE isSymbolicLink=true      <-- lstat is wrong too
  stat:    isDirectory=TRUE

pre-repair walk over that directory  ->   2 files
fswalk over the same directory       ->  30 files
```

**28 files vanished with no error, no exception and nothing in the output distinguishable from a
directory that really holds two files.** That is the family, live, today, on the author's machine.

**So the correction to the brief is narrow and the conclusion is unchanged:** the trigger is *any
reparse point*, not *dehydration specifically*; dehydration is one member of that class and on this
Node it happens to be a benign one. The fix is the same fix, the blast radius is larger than one
walker, and the seventh member of the family is `reparse point`, not `OneDrive`.

---

## 1. EVERY WALKER FOUND, AND ITS DISPOSITION

Swept `tools/**` and `oracle/**` for `withFileTypes`, `isFile()`, `isDirectory()`,
`isSymbolicLink()`, `readdirSync` and `Dirent`. Nineteen sites in fifteen files.

| # | Site | Pre-repair leaf test | Broken by | Disposition |
|---|---|---|---|---|
| 1 | `oracle/retrieval/literature_search.js:108` `listCorpusFiles` | `e.isFile() && .md` | **file OR dir** reparse point | **THE DEFECT.** → `FSW.listRel` |
| 2 | `tools/manifest.js` `isRealFile` | `lstatSync().isFile()` | file reparse point (`lstat` does not follow) | → `FSW.isRealFile` |
| 3 | `tools/manifest.js` `isRealDir` | `lstat \|\| stat` | nothing — the `stat` arm saved it | → `FSW.isRealDir` (unified) |
| 4 | `tools/manifest.js:129` root scan | `isRealFile` | as #2 | → `FSW.kindOf` |
| 5 | `tools/quantities.js` `isRealFile` | `lstatSync().isFile()` | as #2 | → `FSW.isRealFile` |
| 6 | `tools/quantities.js` `isRealDir` / `:143` | as #3 / #4 | as #3 / #2 | → `FSW` |
| 7 | `tools/verify_corpus.js:234` `walk` | `e.isDirectory()` else file | **dir** reparse point | → `FSW.walk` |
| 8 | `tools/verify_corpus.js:512` field folders | `.filter(e => e.isDirectory())` | **dir** reparse point — *positive* filter, DROPS a whole field | → `FSW.listDirs` |
| 9 | `tools/check_registers.js:83` | `e.isDirectory()` | dir | → `FSW.walk` |
| 10 | `tools/check_corpus_collisions.js:111` | `e.isDirectory()` | dir | → `FSW.walk` + `skipDir` |
| 11 | `tools/audit_abstract_overlap.js:185` | `e.isDirectory()` | dir | → `FSW.walk` + `skipDir` |
| 12 | `tools/transfer_gate.js:132` | `e.isDirectory()` | dir | → `FSW.walk` + `skipDir` |
| 13 | `tools/merge_identity.js:37` | `e.isDirectory()` | dir | → `FSW.walk` |
| 14 | `tools/merge_identity.js:839` stage report | `e.isDirectory()` | dir | → `FSW.walk` |
| 15 | `tools/doicov.js:8` | `e.isDirectory()` | dir | → `FSW.walk` |
| 16 | `tools/ecr_probes.js:8` | `e.isDirectory()` | dir | → `FSW.listRel` + vacuity exit |
| 17 | `tools/ecr_verify.js:78` | `e.isDirectory()` | dir | → `FSW.listRel` + `L4 VACUOUS` |
| 18 | `tools/check_register_rows.js:8` | `e.isDirectory()` | dir | → `FSW.listRel` + `requireNonEmpty` |
| 19 | `oracle/tests/isru_three_facts.js:215` | `e.isDirectory()` | dir | → `FSW.walk` + vacuity line |
| 20 | `oracle/tests/run_suite.js:144` `walk` | `e.isDirectory()` | dir | → local `entryKind` mirror (see §4) |
| 21 | `oracle/tests/run_suite.js` `shelf()` | `e.isFile()` / `e.isDirectory()` | both | rebuilt, three arms (see §4) |

**Not broken, left alone, and each one checked rather than assumed:**

- `tools/check_no_sources.js:268` — `fs.statSync(abs).isFile()`. Already the correct instrument.
- `tools/merge_identity.js:282`, `tools/verify_corpus.js:1187`, `oracle/tests/run_suite.js:221`,
  `oracle/tests/fault_inject.js:185–186` — single-level `readdirSync(dir)` returning **names**,
  with any type question answered by `statSync`. No `Dirent` type bit is consulted.

### The W4-5 repairs did NOT cover this, and that is the answer to the brief's direct question

`tools/manifest.js` and `tools/quantities.js` were repaired at W4-5 by replacing `Dirent.isFile()`
with **`fs.lstatSync(p).isFile()`**. `lstat` is *defined* not to follow a link. It is therefore the
one instrument guaranteed to keep getting a link-vs-file question wrong, and it worked at W4-5 only
because a hardlink is not a reparse point at all. Measured above: on a junction, `lstat` reports
`isDirectory()=false, isSymbolicLink()=true`. `isRealDir` survived only through its `|| statSync`
second arm; **`isRealFile` had no second arm and was still broken.** Both are corrected.

---

## 2. THE SHARED HELPER — `tools/fswalk.js`

One file, one rule, `TOOL_VERSION 1.0-1`. Six copies of a rule is six places for it to drift and
this repository has that pattern already.

```js
function kindOf(dirent, fullPath) {
  if (dirent) {
    if (dirent.isDirectory()) return 'dir';
    if (dirent.isFile())      return 'file';
    /* link / socket / unknown: on Windows a placeholder, a junction and a symlink all look the
       same from here, and only one of the three is genuinely not a file. Resolve it. */
  }
  let st; try { st = fs.statSync(fullPath); } catch (e) { return 'other'; }
  return st.isDirectory() ? 'dir' : st.isFile() ? 'file' : 'other';
}
```

`stat`, **not** `lstat`. Exports: `kindOf`, `isRealFile`, `isRealDir`, `walk`, `listDirs`,
`listRel`, `requireNonEmpty`, `emptyPopulationMessage`, `vacuityDiagnosis`, `withDehydratedTree`,
`selftest`.

Three properties worth naming:

1. **Zero cost on a normal tree.** The `Dirent` answer is taken whenever it is a plain file or a
   plain directory, which on a tree with no reparse points is every entry. No extra syscall.
2. **Cycle safety.** Resolving reparse points with `stat` turns a junction pointing at an ancestor
   into a real cycle rather than a leaf. `walk()` carries a `Set` of descended realpaths. Without
   it this would be the first walker in the repository that could hang.
3. **`other` is dropped, deliberately.** A socket or an entry that vanished between `readdir` and
   `stat` is neither a file nor a directory and is collected by neither branch.

### It changes no tool's measurement — proved, not asserted

Reconstructed all three pre-repair walk shapes inline and diffed them against the repaired walk,
**set-wise and order-wise**, over `oracle/`, `tools/`, `cr_scratch/`, `literature/`, `answers/`,
`_intake/`:

```
SAME plain oracle 52 | md 24 | lstat 52       SAME plain literature 171 | md 169 | lstat 171
SAME plain tools 29  | md 0  | lstat 29       SAME plain answers 1 | md 1 | lstat 1
SAME plain cr_scratch 354 | md 314 | lstat 354  SAME plain _intake 262 | md 146 | lstat 262
NO DIVERGENCE: every repaired walk returns the pre-repair list, in order
```

---

## 3. HOW I PRODUCED A DEHYDRATED FILE — AND WHAT THE PROOF ESTABLISHES

Reading a placeholder hydrates it, so a naive test destroys its own subject. Three instruments were
used and they establish different things. Saying which is which is the whole of this section.

### (a) A genuinely dehydrated file — `attrib +U -P`, then wait for OneDrive

**Method:** `attrib +U -P` on a real corpus folder in `cc/oracletest`, polled until the `O`
(OFFLINE) attribute appeared, then probed with `readdirSync`/`lstat`/`stat` **without reading any
file** (none of those three hydrates). Restored afterwards with `attrib -U +P /S`.

**Establishes:** what an actual OneDrive dehydrated file looks like to Node on this machine:
`0x501020`, reparse tag `0x9000401a`, and `Dirent.isFile() === true`. **It refutes the brief's
literal premise.** It does not establish that no OneDrive placeholder class trips `readdirSync` —
it establishes that *this* class does not.

### (b) A real reparse point — a directory junction (`mklink /J`, no administrator needed)

**Method:** built a `literature/` whose eleven taxonomy folders are junctions to the real ones,
with the two `.tsv` files copied in, and pointed the retrieval layer at it.

```
== literature/ with 11 taxonomy folders as DIRECTORY JUNCTIONS ==
PRE-REPAIR  listCorpusFiles :   0
POST-REPAIR listCorpusFiles : 169
PRE-REPAIR  searchLiterature: THREW EMPTY POPULATION: literature_search.js found zero .md files...
POST-REPAIR searchLiterature: scored 9, best=logistics-and-delivery/take-or-make-in-space.md
```

**Establishes:** the defect and the repair against a **real** NTFS reparse point, non-synthetically,
end to end through `searchLiterature`. A corpus of 169 readable files reads as zero before, and 169
after. It does not establish that the reparse point in question is a OneDrive placeholder; it is a
junction. What it shows is that the walker's correctness turns on the **signature**, and that the
repair absorbs it whatever produced it.

**A symlink to a *file* would have been the closer analogue and I could not make one:**
`New-Item -ItemType SymbolicLink` returns *"Administrator privilege required"* on this machine.
Recorded as a limit, not worked around.

### (c) A synthesised `Dirent` — the permanent, portable test

**Method:** `withDehydratedTree(fn)` replaces `fs.readdirSync` for the duration of `fn` with one
that returns `Dirent`-shaped objects reporting `isFile()=false` and `isSymbolicLink()=true` for
**every entry, directories included**, over files that are really present and really readable —
the exact triple W5-8 measured.

**Establishes:** that the walker is correct against the signature a placeholder presents to it,
which is the whole of what a walker consumes and therefore the whole of what it can be wrong about.
**It does not establish that a real placeholder presents exactly that signature** — that is a
platform fact, not a code fact, and §0 is where it is measured. If Windows ever reports a
placeholder some third way, this test will not notice and the measurement is what must be redone.
That sentence is in the source, not only here.

Directories are dehydrated too, on purpose: a test that only lied about files would pass on the
fifteen walkers that were still broken for folders.

---

## 4. MAKING IT DETECTABLE, AND MAKING W5-8's GUARD FIRE

### The finding: the guard could not fire, and the reason was ordering, not the walk

W5-8 added `shelfVacuous()` to `rfxGuard` and recorded honestly that it never fired. It never fired
for a second reason nobody had looked for: **it ran fourth, behind `loop()`** — and `loop()` calls
`classify.loadContext()`, which reaches the shelf itself. A corpus the retrieval layer cannot see
therefore never reached the shelf probe at all. Measured, by moving `literature/` aside in the
fresh clone with the *old* ordering, all 35 rows said, verbatim:

```
UNRUN RFX-01  DEFERRED: the assembled loop is not loadable: the shelf at ...\oracletest\literature.
              Owner: the router seat (3.8/3.9)
```

The verdict `UNRUN` was right. **The diagnosis and the owner were both wrong** — a corpus problem
handed to the router seat with the corpus named in passing. `rfxGuard` now probes the shelf
**first**: it is the cheapest check, it has no dependencies, and it is the only one of the four that
can name itself as the cause. A genuine router fault still reaches the `DEFER`, because a router
fault leaves the shelf walkable and the probe silent.

### It fires. Twice, both measured.

**Fire 1 — the repaired guard, absent corpus.** `cc/oracletest`, `literature/` moved aside:

```
UNRUN RFX-01  VACUOUS: the retrieval layer can read 0 .md file(s) under literature/, of which
  statSync() can see 0 and the pre-W5-11 Dirent rule could see 0. Every RFX row reaches the shelf
  through oracle/retrieval/literature_search.js, so the population is empty and the fixture has no
  subject -- it is UNRUN, not thirty-five identical reds, and it is emphatically not a pass.
  statSync() cannot see any either, so the shelf is genuinely absent or the root is mispointed.
  Close: literature/ holds its 169 summaries and byWalk equals byStat

146 rows: 48 pass, 23 fail, 75 unrun.  of those 75: 4 DEFERRED, 71 VACUOUS, 0 with no binding.
```

**Fire 2 — W5-8's own guard, on a real reparse point, for its real cause.** `cc/oracletest` with the
`0d2944a` `run_suite.js` restored, the repaired `literature_search.js`, and the junctioned corpus of
§3(b):

```
UNRUN RFX-01  VACUOUS: the retrieval layer can read 0 of the 0 .md file(s) present under
  literature/. readdirSync(withFileTypes) reports them as SYMBOLIC LINKS -- OneDrive
  Files-On-Demand reparse points -- so literature_search.js's walk ... sees an empty corpus and
  throws EMPTY POPULATION. ... Owner: the retrieval seat ...
```

Note `0 of the 0`: **W5-8's `byStat` arm recursed on `e.isDirectory()` too**, so it was blinded by
the same junctions it was supposed to diagnose and reported the corpus as absent rather than as
unreadable. The rebuilt probe walks its ground-truth arm with `entryKind`, so it can now tell
"missing" from "present and invisible" — which is the entire distinction the guard exists to draw.

### `shelf()` now carries three arms, on purpose

`byWalk` mirrors the repaired rule. `byDirent` mirrors the **pre-repair** rule and is kept as a
**diagnostic**: when the two disagree, the report can tell a reader on a strange machine that the
directory entries are lying and the repair is absorbing it — a fact they cannot otherwise get.
`byStat` is ground truth. Kept **local**, not imported, per the runner's own standing rule that it
must not import the thing it checks.

### No corpus walker can now return a silent zero

- `literature_search.js` — throws `EMPTY POPULATION`, message now carries the diagnosis and
  `attrib -U +P /S literature\*.md`.
- `run_suite.js` RFX / NAM / PTH / PRV — `VACUOUS`, counted `UNRUN`, never pass.
- `verify_corpus.js` — every check owns its own vacuity; `1 VACUOUS` standing, unchanged.
- `isru_three_facts.js` `unitCoverage` — over zero files every unit token is "dead", so it already
  **failed**; it failed with the wrong story ("37 tokens occur nowhere" sends a reader after 37 bad
  tokens instead of one missing corpus). `vacuous` now leads the message. **No pass/fail changes.**
- `ecr_probes.js` — was a raw `TypeError` stack on a bad root; now `EMPTY POPULATION`, exit 2.
- `ecr_verify.js` — `L4 VACUOUS` rather than reporting every register member unresolved.
- `check_register_rows.js` — `requireNonEmpty`.

---

## 5. THE KNOWN-ANSWER TEST

`node tools/fswalk.js` (also `require`d and asserted by `quantities.js` M16). Five clauses:

```
OK KA-1 fswalk finds 169 .md files under literature/ on the tree as it stands
OK KA-2 the same 169 files, byte-identical set, over a tree whose every Dirent reports
        isFile()=false isSymbolicLink()=true
OK KA-3 the pre-repair `e.isFile()` walk finds 0 of 169 on the same synthetic tree --
        the defect is reproduced, so KA-2 has a subject
OK KA-4 an empty population throws EMPTY POPULATION rather than returning zero quietly
OK KA-5 subtrees survive: 169 of 169 files are below the root and were reached through
        directories whose Dirent reported them as links
NOTE tools/fswalk.js 1.0-1 selftest: all clauses OK
```

**KA-3 is the clause that keeps the other four honest.** It runs the *pre-repair* rule against the
same synthetic tree and requires it to return **zero**. If the synthesis ever stops reproducing the
failure, KA-2 becomes vacuous — and a vacuous green is exactly what this family is made of. KA-3
fails loudly at that moment instead.

`169` is `KNOWN_CORPUS_COUNT` and a walker returning anything else fails: zero is the dehydration
defect, any other wrong number is a shelf change and is **argued, not edited to pass**.

`quantities.js` M16 now runs the selftest as part of its own assertion, so the shared walk cannot
break silently underneath a file-set check that would otherwise still go green:

```
OK M16 file scan is reparse-point-safe: 5 root documents, 169 under literature/, 23 under tools/,
       564 declared in total (tools/fswalk.js: Dirent first, stat on fallback -- NOT lstat, which
       does not follow a link and was the W4-5 repair's one wrong instrument), and fswalk's own
       known-answer test is green including its synthetic dehydrated tree
```

---

## 6. BEFORE AND AFTER, BOTH TREES

Every count carries its command. Figures at different digests are not comparable.

### Author tree

| Command | Before (`131f513` + working tree) | After (`0d2944a` + W5-11) |
|---|---|---|
| `node oracle/tests/run_suite.js` | **146 rows, 139 pass, 3 fail, 4 unrun**; 4 DEFERRED, 0 VACUOUS | **146 rows, 139 pass, 3 fail, 4 unrun**; 4 DEFERRED, 0 VACUOUS |
| `node tools/verify_corpus.js` | **41 OK / 0 FAIL / 1 VACUOUS / 5 REPORT**, 0 hard, digest `98f8c4b11aeffb3c` / 171 files | **41 OK / 0 FAIL / 1 VACUOUS / 5 REPORT**, 0 hard, digest `98f8c4b11aeffb3c` / 171 files |
| `node tools/check_registers.js` | 0 hard, digest `6595f6ab8f6a5660` / 316 files | 0 hard, digest `2e7ae710c06ff060` / **318** files |
| `node tools/quantities.js` | 2 hard (M3, M11), digest `2c74689c91037d59` / 565 | 2 hard (**same two**), digest `838f7482590c63f9` / 564 |
| `node tools/fswalk.js` | did not exist | 5/5 OK |

The three `run_suite` failures are `MRG-4b`, `MRG-9`, `MRG-10`. **Not mine, not touched, not
silenced.** The `check_registers` file count moves +2 and the digest with it: `tools/fswalk.js` is
one, and commit `0d2944a` landed the other while I was working. The `quantities` count is measured
against `131f513`'s own `quantities.js`, restored to a temp path and run, so the two failures are
demonstrated identical rather than assumed.

### Fresh clone `cc/oracletest`

| Command | At `131f513` | At `0d2944a` (before W5-11) | At `0d2944a` + W5-11 |
|---|---|---|---|
| `run_suite` | 148 rows, 100 pass, **44 fail**, 4 unrun | 146 rows, 138 pass, **4 fail**, 4 unrun | 146 rows, **138 pass, 4 fail, 4 unrun** |
| `verify_corpus` | 40 OK / 1 FAIL / 1 VACUOUS / 5 REPORT, digest `ef49e5d7198c347a` | 41 OK / 0 FAIL / 1 VACUOUS / 5 REPORT | **41 OK / 0 FAIL / 1 VACUOUS / 5 REPORT**, digest `ef49e5d7198c347a` |
| `check_registers` | 0 hard, digest `9b8a91c355a17219` / 314 | 0 hard, digest `fdfc5402ab8ff3c4` / 318 | **0 hard**, digest `fdfc5402ab8ff3c4` / 318 |
| `fswalk` | — | — | **5/5 OK** |

The clone's fourth failure is `CON-4` — *`core.hooksPath` is "unset", not tools/githooks* — a
bootstrap fact about a fresh clone, not a corpus fact and not mine. The `131f513` column is the
brief's stated starting point and is carried so the two commits' effects stay separable; the
43→3 repair in `0d2944a` is another seat's and is not claimed here.

### The measurement that actually exercises the repair

Both suites, in the fresh clone, over the **junctioned** corpus of §3(b):

| | pre-repair code | with W5-11 |
|---|---|---|
| `run_suite` | 56 pass, 15 fail, **75 unrun (71 VACUOUS)** | **113 pass**, 17 fail, **16 unrun (12 VACUOUS)** |
| `verify_corpus` | — | **41 OK / 0 FAIL / 1 VACUOUS / 5 REPORT, 0 hard** — fully green over a corpus reached entirely through reparse points |

---

## 7. WHAT IS STILL BROKEN, AND IT IS NOT IN MY WRITE SET

The residual 17 failures and 12 `VACUOUS` above are **one walker, and it is upstream and read-only.**

`oracle/tests/isru_three_facts.js` and `oracle/tests/fault_inject.js` both drive the producer
`lsei/oracle/answer_question.js --lit=literature`, which retrieves through
**`lsei/oracle/lib/literature_search.js`'s `listCorpusFiles` — the original `e.isFile()` walk**.
Over the junctioned corpus that producer sees zero files, so every `GRD`/`CLM` decoy fails to apply
(`9 mutations written, 1 applied`) and every `ISR` row reports `no proof ... matches`.

This is `bootstrap_suite.md`'s own note — *"`lsei/oracle/lib/literature_search.js`'s
`listCorpusFiles` carries the same guard. Upstream and read-only; the finding is for the `oracle/`
reimplementation, not for a patch to `lsei/`"* — coming true in a measurement rather than in prose.

**Routed, not fixed.** `lsei/` is READ-ONLY under standing rule 5. Owner: whoever owns the upstream
relationship. Close condition, an observation not a date: with `literature/`'s taxonomy folders
reached through junctions, `node oracle/tests/isru_three_facts.js --prove` reports `18 of 18` and
`fault_inject`'s decoys all apply. The one-line change upstream is the same one made here.

---

## 8. TWO THINGS THAT HAPPENED TO ME RATHER THAN BY ME

1. **`HEAD` moved under this seat**, `131f513` → `0d2944a`, mid-sitting.
2. **That commit swept `tools/fswalk.js` into itself.** The file was untracked when another seat ran
   `git add -A`. It is committed under a message about MRG failures. Not my commit and not my
   message; recorded so the history is legible rather than tidy.

---

## 9. Not mine

- **`MRG-4b`, `MRG-9`, `MRG-10`** — the three standing `run_suite` failures. W5-10 is live in those
  rows. Not touched, not silenced, unchanged in both trees before and after.
- **`CON-4`** in the fresh clone — `core.hooksPath` unset. A bootstrap fact.
- **`lsei/oracle/lib/literature_search.js`** — the last unrepaired walker. READ-ONLY. §7.
- **`quantities` M3 / M11** — content failures in `cr_scratch/` documents, present identically at
  `131f513` and demonstrated so.
- **The `1 VACUOUS` in `verify_corpus`** — standing before and after; not a corpus-walk vacuity.
- **The full-placeholder OneDrive class** — I could not produce one on demand and did not claim to.
  §0 and §3(a) say exactly what was and was not measured.

---

```
apparatus: check rows +5/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +7/-0
```

`+5` = `KA-1`…`KA-5` in `tools/fswalk.js`. `tests +7` = those five, plus M16's fswalk-selftest
clause in `quantities.js`, plus the `unitCoverage` vacuity clause in `isru_three_facts.js`. No suite
`.md` row was added, edited or removed; no register row was touched.

**Files written:** `tools/fswalk.js` (new); `oracle/retrieval/literature_search.js`,
`oracle/tests/isru_three_facts.js`, `oracle/tests/run_suite.js`, `tools/audit_abstract_overlap.js`,
`tools/check_corpus_collisions.js`, `tools/check_register_rows.js`, `tools/check_registers.js`,
`tools/doicov.js`, `tools/ecr_probes.js`, `tools/ecr_verify.js`, `tools/manifest.js`,
`tools/merge_identity.js`, `tools/quantities.js`, `tools/transfer_gate.js`,
`tools/verify_corpus.js`; this deliverable. LF throughout.
