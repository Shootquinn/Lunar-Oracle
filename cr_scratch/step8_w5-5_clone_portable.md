# Step 8, W5-5 (The Systems Engineer) — clone-portable source declarations

**Seat:** W5-5, The Systems Engineer.
**Refs:** author's tree `HEAD = e7afeb9` (parent `60be792`). Clones taken from `60be792` for the
before figures and from `e7afeb9` for the after.
**Write set, closed and honoured:** `tools/verify_corpus.js`, `tools/source_roots.local.example`
(new, tracked), the `Source:` lines in `literature/**`, `.gitignore` (**not touched — measured
unnecessary**), this file.

---

## 1. The defect, restated from a measurement rather than from the brief

The brief was correct and I confirmed it by cloning rather than by reading. At `60be792`:

```
$ cd "C:/Users/Quinn Morley/onedrive/projects/cc"
$ git clone "C:/Users/Quinn Morley/OneDrive/PROJECTS/CC/lunar oracle" oracletest_before
$ cd oracletest_before && git clone .../lsei lsei && git clone .../cr-agents cr-agents
$ node tools/verify_corpus.js
FAIL    SRC-1 25 of 169 Source: paths do not resolve: literature/development-and-industrial-policy/
        aoki-2009-government-tfp-growth.md -> _intake/japanese-miracle/lit/aoki-2009-government-tfp-growth.md ; ...
verdicts: 37 OK, 2 FAIL, 1 VACUOUS, 7 REPORT
```

Against the author's tree at the same commit: `39 OK, 1 FAIL, 1 VACUOUS, 6 REPORT`. Diffing the two
verdict lists by check id gives exactly two rows, and **both** are the same defect:

```
$ diff <(grep -oE "^(OK|FAIL|VACUOUS|REPORT) +[A-Za-z0-9/_-]+" author.txt) \
       <(grep -oE "^(OK|FAIL|VACUOUS|REPORT) +[A-Za-z0-9/_-]+" clone.txt)
20c20
< OK      SRC-1        --->   FAIL    SRC-1
33c33
< OK      DIV          --->   REPORT  DIV
```

The brief named the first. **The second was not in the brief and is the same bug wearing a different
word.** `DIV` also resolved `Source:` with `fs.existsSync(R(src))`, and on a miss it filed the file
under `withdrawn` — a verdict `oracle/bootstrap_contract.md` defines as *"a provenance `Source` cell
naming an upstream path that no longer resolves"*, i.e. **an event upstream**. Nothing upstream had
happened. The clone simply did not hold the tree. Two different facts arriving in one cell is the
defect; the count of 25 is only its symptom.

### What the 25 actually are

Not PDFs. `Source:` names **the upstream `.md` the bytes were lifted from**, and the 25 name
`_intake/japanese-miracle/lit/<file>` — 24 `.md` and one `.pdf`
(`denison-1972-classification-of-sources-of-growth.pdf`, the one original composition on the shelf,
written straight from an acquired PDF). `_intake/` is gitignored under RG-9 by design. The other 144
name `lsei/literature/...` and resolve in a clone only because the CLAUDE.md bootstrap clones `lsei/`.

**Which is a second, larger hole nobody had hit yet:** a clone that bootstrapped **offline** has no
`lsei/`, and the old check would have reported **144 broken sources**, every one a false accusation.
The fix below covers that case too and case 6 of the self-test asserts it.

---

## 2. The mechanism

> **The identity of a source travels in the repository; the location of it does not.**

### 2.1 The declaration

A `Source:` cell is one of two kinds and **the kind is visible in the text**:

| form | example | resolved against |
|---|---|---|
| in-repository path | `` `lsei/literature/x/y.md` `` | the repository root |
| external source identity | `` `japanese-miracle:lit/y.md` `` | the roots bound to alias `japanese-miracle` |

The alias is repository **content** — the same string in every clone. The root it maps to is machine
**state** and lives in `tools/source_roots.local`, gitignored, never travelling.

The 25 were rewritten mechanically, `_intake/japanese-miracle/<rel>` → `japanese-miracle:<rel>`. No
other line in any summary was touched:

```
- **Source:** `_intake/japanese-miracle/lit/christiano-1989-japan-saving-rate.md`     BEFORE
- **Source:** `japanese-miracle:lit/christiano-1989-japan-saving-rate.md`             AFTER
```

The alias grammar is `[a-z][a-z0-9-]*[a-z0-9]` — **at least two characters, and that floor is
load-bearing, not cosmetic**: a one-character alias would make `c:/x` parse as alias `c` with path
`/x` on the one platform where that string is an ordinary absolute path. The remainder must not
begin with a separator.

### 2.2 Where the roots come from

`tools/source_roots.local` already existed (W5-3, for `tools/audit_abstract_overlap.js`) as a list of
bare absolute paths with `#` comments. **I extended it without changing a byte of what that reader
sees**, because `audit_abstract_overlap.js` is not in my write set and a format needing it edited is
a format that cannot land:

```
# as: japanese-miracle
C:\Users\Quinn Morley\OneDrive\PROJECTS\CC\Japanese Miracle Lit Review
```

`# as: <alias>` binds the **next** path line. A blank line cancels a pending directive, so a dangling
one at the foot of a section cannot capture an unrelated root further down. To the old reader these
are comments and the path lines are unchanged; measured below.

Also supported, for a machine that cannot keep a file: `LUNAR_ORACLE_SOURCE_ROOTS="alias=/path;..."`.
A **bare** path in that variable is left alone rather than guessed at, because the neighbouring tool
already reads bare entries from it for its own purpose.

### 2.3 Two rules that are about correctness, not convenience

**An alias may be declared more than once; roots are tried in order, first hit wins.** And
`_intake/<alias>/` is prepended implicitly whenever the working copy has it.

That is not a shortcut. **Measured:** of the 116 files present in both `_intake/japanese-miracle/lit/`
and the author's outside `Japanese Miracle Lit Review` tree, **4 differ in content** — the outside
copies have been edited since the merge (`gott-2024-card-gas-analysis-subsystem.md`,
`romer-1990-endogenous-technological-change.md`, `schreiner-2016-mre-sizing-model.md`,
`turyshev-2026-orbital-data-centers.md`). `_intake/` is the tree the merge actually lifted from. An
alias that resolved to the outside copy first would hand `DIV` a different upstream than the one that
landed and report body drift that never happened. **Order is the mechanism; the comment saying so is
in the code.**

### 2.4 Optional trees, so an in-repository path gets the third state too

`lsei/` and `cr-agents/` are bootstrap-acquired and absent when it ran offline; `_intake/` and
`literature/_pdf/` are gitignored and never travel. Closed list, in the source. A path whose **tree**
is absent is `unresolvable here`. A path whose tree is **present** and which still does not resolve
is **broken** — otherwise the rule would be a blanket amnesty for anything under `lsei/`.

---

## 3. The three states, and the command that distinguishes them

```
node tools/verify_corpus.js --sources
```

| state | meaning | verdict |
|---|---|---|
| `RESOLVED` | this machine can open the file | counted in `SRC-1` |
| `UNRESOLVABLE-HERE` | this machine has not been told where that tree is | **`REPORT SRC-3`, never `FAIL`** |
| `BROKEN` | the root **is** configured and the file is not inside it | **`FAIL SRC-1`** |

`SRC-1`'s own verdict:

- **any broken** → `FAIL`, naming the file, the identifier, and the roots that were searched.
- **none broken and none resolved** → **`VACUOUS`, never `OK`**. "Zero broken over zero resolvable"
  is the vacuous pass this project has found five times, and it is exactly the failure mode a naive
  fix to this bug produces. Case 2 of the self-test asserts it by name.
- otherwise → `OK`, with all three counts on the line:
  `[resolved N | unresolvable here N | broken N] of N declarations`.

`SRC-3` prints **only when the middle state is non-zero**, so a machine holding every source is not
told about a mechanism it is not using — and it carries the repair inline (`copy
tools/source_roots.local.example …`) rather than in a document the reader may never open.

`DIV` resolves through **the same resolver**, so the two checks cannot come to disagree about what
"resolves" means, and a clone now reports `DIV not comparable here` instead of `DIV withdrawn`.

### Self-test: seven new cases, `--selftest` 19 → 26, all pass

The two wrong ways to fix this bug both pass a green-only self-test, so each is asserted by name:

```
PASS  an unconfigured external identity REPORTS and does not fail                      OK/REPORT
PASS  nothing resolvable is VACUOUS, never OK -- 0 broken over 0 checked is not a pass VACUOUS/REPORT
PASS  a configured root resolves the same declarations                                 OK/none
PASS  a configured root that lacks the file is BROKEN and turns SRC-1 red              FAIL/none
PASS  a declared root that does not exist here is unresolvable-here, not broken        OK/REPORT
PASS  a path under an absent bootstrap working copy is unresolvable-here, not broken   OK/REPORT
PASS  the same path with lsei/ PRESENT and the file missing is BROKEN                  FAIL/none

SELF-TEST: PASS  (26/26 cases)
```

The pre-existing plant `a dangling Source: path turns SRC red` still passes: the mechanism did not
buy the middle state by weakening the failing one.

---

## 4. Verified by cloning, twice, at `e7afeb9`

Both clones are disposable and **nothing under them was modified to make a test pass**. The only
file written inside a clone is `tools/source_roots.local`, which is the machine configuration under
test and is gitignored.

### Clone A — fresh, **no** `source_roots.local`. The state a new reader arrives in.

```
$ cd "C:/Users/Quinn Morley/onedrive/projects/cc"
$ git clone "C:/Users/Quinn Morley/OneDrive/PROJECTS/CC/lunar oracle" oracletest
$ cd oracletest && git clone .../lsei lsei && git clone .../cr-agents cr-agents
HEAD=e7afeb9   source_roots.local: ABSENT   _intake: ABSENT   example: PRESENT   literature .md: 169

$ node tools/verify_corpus.js            # read-digest 3a381de0543752ee over 171 files
verdicts: 39 OK, 1 FAIL, 1 VACUOUS, 8 REPORT
FAIL    PTH/A3 3 component ceiling breaches: ... leaf 70 > 64 ...          <- PRE-EXISTING, NOT MINE
OK      SRC-1 144 of 169 Source: declarations resolve on this machine and 0 are broken.
        [resolved 144 | unresolvable here 25 | broken 0] of 169 declarations (japanese-miracle 25, lsei 144)
REPORT  SRC-3 25 of 169 Source: declarations are UNRESOLVABLE ON THIS MACHINE. This is a fact about
        the machine and NOT a corpus defect -- it is the normal state of a fresh clone ... Reasons:
        25x alias "japanese-miracle" has no root here: no _intake/japanese-miracle/ in this working
        copy and no "# as: japanese-miracle" in tools/source_roots.local, which is itself absent. To
        resolve them, copy tools/source_roots.local.example to tools/source_roots.local ...
REPORT  DIV not comparable here: 25 landed file(s) name a source tree this machine does not hold ...
        NOT a withdrawal and NOT drift -- see SRC-3 for how to configure the roots
OK      DIV withdrawn: 0 of 131 landed files name a vanished upstream path

$ node tools/verify_corpus.js --sources | grep '^NOTE    --sources'
NOTE    --sources RESOLVED: 144
NOTE    --sources UNRESOLVABLE-HERE: 25
NOTE    --sources BROKEN: 0
```

**The clone's `FAIL` count is now identical to the author's tree, and the failure is the same
pre-existing `PTH/A3`.** The 25 are reported, named, explained, and given a repair — and they do not
fail the run.

### Clone B — a second fresh clone, **configured**. Two sub-cases, and the first is the interesting one.

```
$ git clone "C:/.../lunar oracle" oracletest_cfg && cd oracletest_cfg && git clone .../lsei lsei
```

**B1, one root — the author's outside tree only.** This is the honest test of the third state on real
data, not on a fixture:

```
$ printf '%s\n' '# as: japanese-miracle' 'C:\Users\...\Japanese Miracle Lit Review' > tools/source_roots.local
$ node tools/verify_corpus.js --sources | grep -E '^NOTE    --sources|^  BROKEN'
  BROKEN             literature/growth-theory/denison-1972-classification-of-sources-of-growth.md
                     -> japanese-miracle:lit/denison-1972-classification-of-sources-of-growth.pdf
                     [alias "japanese-miracle" resolves to C:\Users\...\Japanese Miracle Lit Review
                      and "lit/denison-1972-classification-of-sources-of-growth.pdf" is under none of them]
NOTE    --sources RESOLVED: 168
NOTE    --sources UNRESOLVABLE-HERE: 0
NOTE    --sources BROKEN: 1
$ node tools/verify_corpus.js | grep '^FAIL.*SRC'
FAIL    SRC-1 1 of 169 Source: declarations are BROKEN ...
```

**This is correct and it is the point.** That PDF exists in the author's `_intake/` and nowhere else;
a machine configured with only the outside tree genuinely cannot open it. One file, named, with the
root that was searched. The middle state was not used to make a real gap disappear.

**B2, the lift tree first and the outside tree as fallback** — the configuration the author's machine
uses, and the one that survives `_intake/` being emptied:

```
$ printf '%s\n' '# as: japanese-miracle' 'C:\...\lunar oracle\_intake\japanese-miracle' \
                '' '# as: japanese-miracle' 'C:\...\Japanese Miracle Lit Review' > tools/source_roots.local
$ node tools/verify_corpus.js            # read-digest 67d056def3f37a06 over 171 files
verdicts: 39 OK, 1 FAIL, 1 VACUOUS, 6 REPORT
OK      SRC-1 169 of 169 Source: declarations resolve on this machine and 0 are broken.
        [resolved 169 | unresolvable here 0 | broken 0] of 169 declarations (japanese-miracle 25, lsei 144)
OK      DIV UNDECLARED divergence: 0 of 155 landed bodies differ from upstream without a declaration
NOTE    DIV census: 155 compared, 1 identical to upstream, 154 differ under a declared 2.6 body edit,
        0 differ undeclared
NOTE    --sources RESOLVED: 169 / UNRESOLVABLE-HERE: 0 / BROKEN: 0
```

**A configured clone now reproduces the author's tree exactly**: `39 OK, 1 FAIL, 1 VACUOUS, 6 REPORT`,
same `SRC-1`, same `DIV` census of 155 compared and 0 undeclared.

---

## 5. Gates, before and after, in both trees

Author's tree, `60be792` → `e7afeb9`, read-digest `4a06d3a6da002f72` → `98f8c4b11aeffb3c` (the digest
moved because 25 summaries changed; the figures either side are therefore reported at their own
digests and not reconciled):

| gate | before | after |
|---|---|---|
| `verify_corpus` | 39 OK / 1 FAIL / 1 VACUOUS / 6 REPORT | **39 / 1 / 1 / 6 — identical** |
| `verify_corpus --selftest` | 19/19 PASS | **26/26 PASS** |
| `check_registers` | 0 hard failures | 0 hard failures |
| `run_suite` | 148 rows, 43 hard failures | 148 rows, 101 pass, **43 hard failures**, 4 unrun |
| `acceptance.js` | exit 0 | exit 0 |
| `verify_haiku --prove` | 54/54 | 54/54 |
| `audit_abstract_overlap` | — | 215 PDFs, 160 tested, roots `literature, _intake, ../Japanese Miracle Lit Review, ../CSA_LSEI_Workshops` — **unchanged**, the `# as:` lines are invisible to it |

A full `diff` of the author's `verify_corpus` output before and after is **four lines**: the two
read-digest stamps, the `SRC-1` text, and the `§KA` label. **No verdict changed in the author's tree.**

Clone, `60be792` → `e7afeb9`:

| gate | before (clone) | after (clone A, unconfigured) | after (clone B2, configured) |
|---|---|---|---|
| `verify_corpus` | 37 / **2** / 1 / 7 | 39 / **1** / 1 / 8 | 39 / **1** / 1 / 6 |
| `verify_corpus --selftest` | 19/19 | 26/26 | — |
| `check_registers` | 0 | 0 | — |
| `run_suite` | 44 hard failures | **44** | — |
| `acceptance.js` | exit 0 | exit 0 | — |
| `verify_haiku --prove` | 54/54 | 54/54 | — |

The clone's remaining `FAIL` is `PTH/A3`, which the author's tree has too. The clone's 44th `run_suite`
failure is `CON-4` — *"core.hooksPath is 'unset', not tools/githooks"* — because I did not run the
bootstrap's Phase 4 in the clone. **Not mine, and not touched.** The four `af7abec` failures were not
silenced; nothing in `oracle/tests/**` was opened.

`.gitignore` needed **no** edit, measured rather than assumed:

```
$ git check-ignore -v tools/source_roots.local tools/source_roots.local.example
.gitignore:176:/tools/source_roots.local        tools/source_roots.local
(exit 0 — the .example is not matched, because line 176 is a LITERAL and not a wildcard)
```

That literal was written deliberately at 8.9b and it is why the `.example` can sit beside the `.local`
without a new rule. Had it been `/tools/source_roots*`, this fix would have needed one.

---

## 6. What the declaration now carries, in one sentence

An identifier — `<alias>:<path under that alias's root>` — that is the same string in every clone,
plus a machine-local, gitignored map from alias to location. **No PDF entered version control, no
`.gitignore` rule was relaxed, `_intake/` and `literature/_pdf/` are still excluded, and the author's
outside roots were only ever read.**

## 7. The pattern, named

This is the container-versus-content defect **one level out**, and it is the fifth time this project
has met it. The declaration was present, well formed, and passed its own syntax check. It was not the
thing it claimed to be. `SRC-1` checked that a *string* named an existing path — a property of the
machine — and printed the result as a property of the *corpus*.

The general form: **a check whose population is defined by what the running machine happens to hold
will report the machine's shape as the artifact's quality.** The repair is not a better path; it is
splitting the verdict so the machine-dependent part cannot be written into the same cell as the
artifact-dependent part. That is why there are three states and not two, and why the middle one is
printed even when it is the whole population.

---

## Not mine

1. **`PTH/A3`** — 3 component ceiling breaches, present in both trees before and after. Untouched.
2. **`CON-4`** in the clone — `core.hooksPath` unset, because the clone was not bootstrapped through
   CLAUDE.md Phase 4. A property of my test procedure, not of the repository.
3. **The four `af7abec` `run_suite` failures.** Not opened, not silenced. `oracle/tests/**` was never
   written to.
4. **STALE PROSE I CAUSED, ROUTED RATHER THAN FIXED.** 25 summaries carry, on the line *after* the one
   I edited, the clause:
   > `- **Upstream ref:** \`none\` — the \`Source:\` path is under \`_intake/\`, which is not a git working copy, so no ref exists.`

   The **conclusion is still true** (neither root bound to `japanese-miracle` is a git working copy,
   so no ref exists) but the **premise now misdescribes the cell**: `Source:` no longer reads
   `_intake/`. My write set is *the `Source:` lines*, and the `Upstream ref:` line is a different key
   owned by the provenance seat, so I did not touch it. Suggested replacement, verbatim, one
   `sed` away for whoever owns it:
   `the \`Source:\` identity resolves under a root that is not a git working copy, so no ref exists`.
   Measured: `grep -rlc "the \`Source:\` path is under \`_intake/\`" literature/ --include=*.md` = 25.
5. **No suite row was minted for the three-state contract.** `oracle/tests/**` is outside my write
   set. The contract is currently asserted only by `--selftest` cases 1–7, which is executable and
   re-runnable but is not on the suite's ledger. **Owner: the test-contract seat. Close condition:**
   a `corpus_suite.md` row binding `node tools/verify_corpus.js --selftest` and naming the three
   states, so that a future edit collapsing two of them fails a suite row and not only a self-test.
6. **`_intake/` is slated to be emptied** ("the merge is not complete until this directory is empty").
   When it is, `denison-1972-...pdf` has no copy anywhere outside the author's repository — B1 above
   measured exactly that state and it correctly reads `BROKEN`. That is a real, pre-existing
   acquisition gap that my change **surfaced** rather than created; before it, the file resolved only
   because `_intake/` happened to still be there. **Owner: whoever owns the `_intake/` exit criterion.**
7. **`tools/source_roots.local`** is untracked machine state, not repository content. I added two
   comment lines to the author's copy to bind the alias; the path lines are byte-identical and
   `audit_abstract_overlap.js` reports the same roots and the same population as before.

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +7/-0
```
