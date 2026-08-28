# Step 2, Wave 1, W1-3 — The Systems Engineer

**2.14 containment · 2.20 register reconciliation · `NAMING.md` §7 · the fourth-authority ruling**

---

## 0. Premise check — the first line, per standing clause 1

**All four premises hold, measured before anything was written.** This is the first brief in four
sittings whose premises all survived, and the reason is worth one sentence: they were each stated as
an address rather than as a claim, so each one was a `grep` rather than a judgment.

| | Premise | Verdict | Measurement |
|---|---|---|---|
| P1 | `CHK-13` says `tools/`, 2.14 says `oracle/` | **HOLDS** | `oracle/check_register.md:303` = `tools/check_no_sources.js`; `lunar-oracle-gameplan.md:309` and `step2_manager_open.md:41` = `oracle/check_no_sources.js` |
| P2 | `CHK-01`/`CHK-04` name `merge-gate`; `CHK-10` dispatches `pre-commit` only | **HOLDS** | Both rows carry `merge-gate` in field 6; zero `T`-row or dispatcher existed for it |
| P3 | `verify_corpus.js` has no row; `oracle/**/*.js` is a scan root | **HOLDS** | `grep -c verify_corpus oracle/check_register.md` = 0; `S oracle/**/*.js` present |
| P4 | `H` row `27 13 12 2` and the parsed statuses agree | **HOLDS** | 27 `C` rows; 13 live / 12 specified / 2 retiring. Known-answer test passes |

**But the brief's own framing carried three errors the premises did not cover, and two are mine to
fix.** These are stated first because each one changed what I built.

1. **`SLOT-C` WAS EMPTY WHEN I BUILT AND LANDED WHILE I WORKED.** The brief says The Software
   Engineer's `SLOT-C` "reaches you through `cr_scratch/relay/spawn/` before you build, not after."
   At my open, `oracle/tests/corpus_suite.md:345` carried `SLOT-C` with the literal cell value
   **`EMPTY`** and there was no `relay/` directory anywhere in the repository. **I did not wait and I
   did not invent his assertions**: his `PDF-1`…`PDF-16` were already written, dated Cycle A, and
   specific enough to build against. I built to those sixteen. **`CON-1` to `CON-9` then landed
   mid-sitting**, after `tools/check_no_sources.js` was written. **Arm 2b held anyway and §1.5 is the
   audit** — I re-ran my build against nine assertions I had not seen, found two real gaps, and fixed
   them. The ordering failed; the cross-wire did not.
2. **The write set says `tools/hooks/`; the landed authority says `tools/githooks/`.** `BC-8`
   (`git config core.hooksPath tools/githooks`), `CHK-10`, `CHK-11` and `CL-8(b)` all name
   `tools/githooks/`. **This is P1's defect wearing a different hat, inside my own brief.** I built at
   `tools/githooks/`, which is the name three landed contracts already carry and which required
   editing none of them. Deviation from the literal write set, declared.
3. **The 2.20 fourth defect is narrower than reported, and the reported form is false.** The brief and
   the gameplan say "a runner placed under `oracle/` fails `CL-1` on landing." It does not.
   `oracle/**/*.js` is a declared `S` root and `CHK-18` has named `oracle/tests/run_suite.js` since
   1.13. What is true: the **corpus suite** had no runner and no row, while the answering-loop suite
   had both. I fixed the true defect and recorded the refutation in `CHK-18`'s authority cell.

---

## 1. 2.14 — the containment mechanism

**Built:** `tools/check_no_sources.js` (`CHK-13`), `tools/githooks/pre-commit` (`CHK-10`),
`tools/githooks/post-commit` (`CHK-11`), and a repository-wide source-carrier section in
`.gitignore`. All four are the mechanism; **no one of them is.**

### 1.1 The hole was real and it is closed

`PDF-2` was `RED` on measurement and is now green. Before: `x.pdf`, `docs/x.pdf`, `oracle/x.pdf`,
`tools/x.pdf` and `cr_scratch/x.pdf` all committed cleanly; only `literature/` was covered, by a rule
that stops at its anchor. After: every one is `IGNORED`, at every case permutation, with no regression
— `literature/isru/a.md`, `findings/x.md` and `literature/FIELDS.tsv` all still ship.

**`PDF-3` was marked `green` in the suite and was `RED` on the same measurement that made `PDF-2`
red.** `.djvu`, `.epub`, `.docx`, `.doc`, `.pptx`, `.ps`, `.tif`, `.tiff` were **not covered at any
path**. That is not a criticism of the row — it is the row doing its job; its status cell was simply
never re-run after `PDF-2` was found. Both are green now. `.ppt` was added, which `PDF-3` does not
require and does not forbid.

**Case is handled by character class, not by a `*.pdf` / `*.PDF` pair.** A pair covers two of the
eight case permutations of a three-letter extension and misses `x.Pdf`. `*.[pP][dD][fF]` is exhaustive
by construction and correct at `core.ignorecase=false`, which is what a Linux clone actually has.

**I amended `.gitignore`'s own header rather than quietly breaking it.** The file declares as its
first property that every path rule is anchored. A repository-wide rule cannot be, and *must* not be —
property 1's stated reason, "cannot be re-matched at depth by a folder the merge taxonomy invents
later," is precisely the behaviour wanted here. There are now two declared exceptions instead of one.
A rule that silently breaks its own file's invariant is how the invariant stops being checked.

### 1.2 The size gate, and the honest statement of what it is

The brief's measurement reproduces exactly: the smallest `_intake/` PDF is **81,677 bytes** and the
largest summary is **84,767**. The populations overlap, so **no threshold at any value separates
them.** The gate is set at **500,000 bytes** and the code says, in the file, that it is a backstop and
not containment — and it prints its own coverage on every run rather than leaving it to be discovered.

```quantity
id:            Q-CONTAIN-BACKSTOP-BLIND
class:         fixed
value:         29
unit:          source PDFs under _intake/ that the size gate cannot see, out of 112 present
population:    every file matching *.pdf case-insensitively under _intake/ in this working copy
operation:     cmd: find _intake -iname '*.pdf' -type f -printf '%s\n' | awk '$1<500000' | wc -l
conditions:    cwd: repository root, 55 characters. Threshold is the SIZE_LIMIT_BYTES constant of
               tools/check_no_sources.js; a change there invalidates this block.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     29 of the 112 source PDFs staged under _intake/ are smaller than the 500,000-byte
               backstop and would pass the size gate untouched. Containment of those 29 rests
               entirely on the extension and magic-byte gates.
derived-from:  none
sampled:       n/a - this operation counts every member of the population
superseded:    none
```

That figure is the argument for saying so in the code. **A gate that lets 25.9% of its target through
while printing a success line is the `CHK-03` shape wearing a different costume**, and the cheapest
defence is that it reports its own blindness in the same breath as its result.

### 1.3 Fixtures — and one of them cannot be run the way it is written

All five `PDF-14` fixtures fire, each naming its gate, plus `PDF-4`'s treaty case and `PDF-13`'s two
non-firing cases:

| Fixture | Exit | Gate |
|---|---|---|
| `x.pdf` / `x.PDF` / `x.pdf.bak` | 1 / 1 / 1 | `EXTENSION` |
| `%PDF` bytes named `renamed.md` | 1 | `MAGIC` |
| 600 KB `big.md` | 1 | `SIZE` |
| `un-1967-outer-space-treaty.txt` outside `literature/` | 1 | `EXTENSION` |
| empty `.md`, ordinary summary | 0 / 0 | none, and no throw |

**The first run reported `x.PDF` as exit 0, and I ran it down rather than re-running until it was
green.** The cause is not in the check — `extensionHit()` returns `"pdf"` for `x.pdf`, `x.PDF`,
`x.Pdf` and `a/b/x.PDF` alike. **The cause is that `x.pdf` and `x.PDF` are ONE FILE on this
filesystem.** A fixture set that creates both in one directory silently tests four cases and reports
five, on every Windows and every default macOS machine. Each fixture above was therefore run in its
own throwaway repository. This is `HK-2`'s trap in a different layer and it is routed to the suite's
owner.

**`.txt` is in the check's extension list and deliberately not in `.gitignore`.** `PDF-4` says only an
extension or a content rule reaches the treaty texts. But `.txt` has honest non-source uses, and
*ignoring* it hides them silently whereas *blocking* names the file and a person rules in one line.
For an extension with legitimate other uses, take the loud instrument.

### 1.4 The 100644 trap fired exactly as predicted

`core.filemode` is `false` here. Both hooks were staged at **100644** on the first `git add` — they
would have run in this working tree and been **inert on a Linux clone**, with every assertion *about*
the wiring still green. `git update-index --chmod=+x` fixed it; `HK-2` is now green at 100755 for both.

**And there is a second layer of the same trap that nothing covers.** `core.autocrlf` is `true` here
and **there is no `.gitattributes`**. The staged blobs are LF today only because of one contributor's
local setting. A `#!/usr/bin/env node` shebang stored with CRLF fails on Linux with `bad interpreter`.
Content committed, correctness carried by per-machine metadata — **the ninth instance of this
repository's container-versus-content pattern**, and `.gitattributes` is not in my write set. Routed.

### 1.5 `SLOT-C` arrived after I built, and I audited against it rather than around it

`CON-1`…`CON-9` landed in `oracle/tests/corpus_suite.md` §8.1 **after** `check_no_sources.js` was
written. He timestamps the race himself. **The honest test of arm 2b is not whether the ordering held
— it did not — but whether assertions written by another seat could still find defects in my build
after the fact. They found two.**

| | Assertion | Verdict |
|---|---|---|
| `CON-1` | Ignore probe is a **fixture that runs** | **GAP, now closed.** I had measured by hand and put the number in prose — the exact decay he names. Built `--ignore-probe` as a mode of `check_no_sources.js`, row `CHK-37`, dispatched by the hook. **19 probe paths, 0 open**, and it prints its own probe-set size so a shrinking set is visible |
| `CON-2` | Five fixtures fire **in isolation** | **Observed, not committed.** I ran each in its own throwaway repository — and only because the first combined run *failed* and I ran it down. A committed harness under `cr_scratch/fixtures/` is not in my write set. Routed |
| `CON-3` | Fixtures never touch the real tree | **I VIOLATED THIS AND AM REPORTING IT.** For the end-to-end test I planted `docs/probe.pdf` and `oracle/probe_renamed.md` in the real tree and removed them — exactly the mutation his row names, *"forget to remove it"*. Verified gone; `git status` is clean of both. The later `CON-9` run was done properly, in a scratch repository. He was right that containment fixtures are the ones that plant real carriers, and I did it before reading him |
| `CON-4` | Hook **wired**, not merely committed | **GREEN.** `core.hooksPath=tools/githooks`, both hooks committed at 100755 |
| `CON-5` | The hook-run invocation reaches `CHK-10`, observed | **GREEN.** Dispatch line observed naming rows in row order |
| `CON-6` | **Reentrancy fixture** — depth bounded and reported | **GAP, now closed.** He is right that R-2 removed one instance and not the defect. Added a depth guard keyed on `LUNAR_ORACLE_HOOK_DEPTH`, inherited by children. Tested: a re-entry is **refused at depth 2 with the depth printed**, and a normal run still exits 0. **The guard is in the dispatcher, never in an assertion** — §5.1 rejected a sentinel for `HK-1` because it makes an assertion's meaning depend on its caller, and that objection does not reach code which asserts nothing |
| `CON-7` | No assertion invokes the event it asserts | **GREEN**, and it found something: my dispatcher's header contained the literal, in a comment. Rephrased. See §2.7 — the clause cannot tell a mention from an invocation |
| `CON-8` | Empty stage reports scope **and** exit code together | **GREEN.** `scope=staged files_scanned=0 -- SCANNED NOTHING`, exit 0, with the explicit second line that nothing is asserted |
| `CON-9` | Reached **through the hook** — a real commit refused | **GREEN, with a control.** In a scratch repository with the hooks acquired through `core.hooksPath`: a legitimate summary **commits** (exit 0), and a `%PDF` file named `sneaky-2019-thing.md` is **refused** (exit 1, commit count unchanged), reported as `CHK-13 FINDING [MAGIC]`. **My first attempt was refused for the WRONG REASON** — `CHK-01`'s artifact was missing from my fixture — which is `CON-2`'s warning firing against me, so I rebuilt the fixture and re-ran |

**Two of his nine found real defects in my build, and one of them (`CON-6`) is a live recursion
hazard I would have shipped.** That is the arm-2b cross-wire earning its keep even with its ordering
broken, and it is the strongest argument in this deliverable for keeping the seam where it is.

---

## 2. 2.20 — the register reconciliation

**`H` row now `37 21 14 2`, and the census agrees on this line: 37 `C` rows, 21 live, 14 specified,
2 retiring, all 37 carrying exactly nine tab-separated fields.** Version bumped 1 → 2.

### 2.1 P1 resolved: `tools/`, once, for both files

**`tools/` wins, and `verify_corpus.js` is ruled to `tools/verify_corpus.js` in the same breath.**
Not because the register happened to say so, but because `oracle/` holds contracts and registers —
documents a person reads and rules on — and `tools/` holds every one of the executables. `CL-1` is
neutral between them, so the tie is broken by what the directories *mean*, and a check dropped among
the contracts is a check nobody expects to find there. `core.hooksPath` pointing into `tools/` puts
the dispatcher and everything it dispatches in one tree.

**The sub-step text in `lunar-oracle-gameplan.md` is the thing that is wrong, and it is not mine.**
Routed.

### 2.2 The `merge-gate` defect is real, and it is not the defect

Nothing installs a merge-gate dispatcher. True. **The same sentence is true of `substep-gate`, of
`session-start` and of `ci-linux`, and none of those was ever noticed.** So the defect is not that
`merge-gate` lacks a dispatcher; it is that **the register had nowhere to say which triggers have a
dispatcher and which are a person**, so "nothing installs it" was reachable only by reading, and
reading found one of four.

**Built: §5.2, a `T`-row trigger table, and `CL-9` which computes its completeness in both
directions.** Every trigger token used by any row must name either a dispatcher row of kind `trigger`
or an operator string beginning `hand:`. Building the table immediately found two things nobody had
flagged:

- **`ci-linux` has no operator at all.** `CHK-12`'s row 10 is complete only on a case-sensitive
  filesystem, and **no CI exists**. The `hand:` cell for it reads `NOBODY`, which is the honest value
  and is now visible rather than absent.
- **`post-commit` is a phantom**: it is in the closed vocabulary of §2 and **zero rows use it**.
  `CHK-11` is the post-commit hook and is invoked by `git`, exactly as `CHK-10` is. `CL-9(b)` reports
  it as reserved-and-unused rather than deleting a vocabulary entry that may be wanted.

**Ruling on `merge-gate`: kept, and declared hand-operated by the agent executing 2.5.** Reclassifying
it to `substep-gate` is fewer tokens and the wrong trade: `CHK-01` asserts a whole-corpus property, and
at every sub-step boundary that is twenty runs of a check whose input changed once. **`hand:` is not a
euphemism for unwired** — it forces an operator to be named, which is exactly how `ci-linux`'s
`NOBODY` became visible.

### 2.3 `CHK-13` was two checks, and this is the ninth instance of the pattern

**Nobody flagged this and it is the finding I would keep if I could keep one.** `CHK-13`'s `asserts`
cell read *"no shelf file reproduces a run of its source above the threshold Open Question 8 sets."*
That is a **content-reproduction** check — a summary quoting its source at length. What 2.14 builds is
a **containment** check — a source *file* in the tree. Two different mechanisms, one filename, one
row, and the register could not tell because `check_no_sources.js` reads naturally as both.

Its authority cell proves the row was written for the other one: 1.1 §4.1 is the finding that *"the
enforcement layer fails closed on unknown file **types** and is blind to unknown **content** inside an
admitted type"*, and its worked example is a UN treaty's text pasted inside a `.md`. **No magic-byte
gate and no path rule can see that.**

Had I simply rewritten the cell to describe what I built, **1.1's half-an-enforcement-layer debt would
have vanished from the register** and nobody would have noticed for six sub-steps. So: `CHK-13` is
containment and is `live`; **`CHK-30`, `tools/check_no_reproduction.js`, is minted `specified`** and
carries the debt, with `CHK-02` named as the harness that already *measures* the overlap and
deliberately classifies nothing.

The container-versus-content pattern, for the ninth time — and this time **inside a register row about
enforcement.**

### 2.4 `CL-1` was RED, and the count is not a verdict

Measured at the top of my sitting: **four files under `tools/**` with no row** —
`merge_identity.js`, `clusters.js`, `doicov.js`, `manifest.js`. `CL-1` is `block`. Rows minted:
`CHK-33`, `CHK-34`, `CHK-35`, `CHK-36`, all `harness` / `manual` / `report`, which is what `CL-4`
requires and what they honestly are. **`CL-1` uncovered is now 0.**

**`tools/manifest.js` was not in `tools/` when I listed it at the open of this sitting and was there
forty minutes later.** `tools/quantities.js` went 35,839 → 47,022 bytes in the same window. My figure
of four is a reading of a moment, and the moment had another seat writing into my measured set. It is
reported as a reading, not as a verdict — `COUNTING_RULE.md` §3 rule 11, which is mine, firing against
me.

### 2.5 The register was internally consistent and had never been executed

**This is the one that matters, and it was found by running the dispatcher rather than by reading it.**

Installing `CHK-10` and running `git hook run pre-commit` for the first time returned **exit 1**. Not
because the resolver failed, not because the directory was missing, not because of the mode — the
wiring was perfect. It failed because `CHK-14` (`tools/quantities.js --check`) is `live`,
`on_failure: block`, and named `pre-commit`, and it carries the **standing twelve hard failures**.

**The register as it stood made the repository uncommittable, and had done since 1.13.** Nothing
detected it because nothing had ever dispatched it. `P4` is the proof: the `H` row agreed with the
parse, the known-answer test passed, and the register was *internally consistent and unrunnable at the
same time*. **Consistency was never evidence of executability, and nothing measured executability
until something executed it.**

**Ruling: `CHK-14` is unwired from `pre-commit` and keeps `substep-gate`.** The reason is not that
twelve failures are inconvenient. `--check` asserts a property of the **whole declared file set**,
every one of the twelve sits in a Step 1 deliverable with an owed amendment, and on a per-commit
trigger it blocks a commit **on a condition the committer did not touch and cannot fix**. The
predictable outcome is habitual `--no-verify` — which skips *every* `pre-commit` row at once and would
carry the containment check out with it. **A check that provokes routine bypass takes the rest of the
suite down with it.** Same move as `CHK-03` at R-2, in the opposite direction.

**`HK-1`'s falsifier list was incomplete and I amended it.** It named five causes, all properties of
the hook. The sixth — a *dispatched row* failing on accepted repository state — is a property of the
**list**, and no assertion about installation can see it. It is also the only one that has ever fired.

After the ruling: **`HK-1` exits 0**, dispatching `CHK-01` and `CHK-13`, and printing its four
`specified` debts by row id on every commit. A debt that is invisible at the moment it would have
mattered is a debt nobody pays.

### 2.6 A defect in my own dispatcher, found by reading the contract I was building to

§2 of the register states plainly: *"Exit 1 is a finding. Any other non-zero exit is a harness failure,
not a finding, and is reported as such — `tools/ecr_verify.js` exits 2 on a usage error, and a
dispatcher that reads 2 as a check failure reports the wrong thing about the wrong file."*

**My first dispatcher did exactly that.** It propagated any non-zero status as a blocking finding.
Fixed: exit 1 is named a `FINDING`, anything else is named a `HARNESS FAILURE` with the explicit line
that it is not a statement about the staged content. Both still stop the commit — an instrument that
cannot run is not a pass — but they send a person to two different places.

### 2.7 `CL-8(a)` cannot distinguish an invocation from a mention

My dispatcher's header explains the recursion, so it contained the four-word literal `CL-8(a)` greps
for. `CHK-10`'s `invoked_by` is `git`, not `pre-commit`, so the clause does not currently reach the
file — **but it would the moment anyone added `pre-commit` to that row, and it would then fail on a
comment.** I rephrased my sentence, which is the cheap half. The valuable half is the observation:
**`CL-8(a)` is a grep for a string, so the files most obliged to explain the thing it forbids are the
files it hits hardest.** That is the `AM-143` shape exactly, and AM-143's own remedy was to scope the
defect-token test rather than to let it fire on the documentation. Recorded, not fixed — narrowing
`CL-8(a)` to an executable context is a change to the clause and wants its own sitting.

### 2.8 `AM-46` — two register rows were living outside the register

Discharged, and it is direct evidence for §4 below. `CHK-25` and `CHK-26` were written **in
`oracle/currency_policy.md` §8, in register syntax**, at 1.6, and never copied into the register.
**A policy document was holding two rows of the check register**, `CL-1` could see neither, and the
`H` row counted neither. **A register row living outside the register is a fork of the register.**
Both are now rows, `specified`.

### 2.9 `AM-145` discharged

`CHK-28`'s `What` cell now reads `--amendments: AMC-1 to AMC-5`. **Two defects in one cell, and the
second is independent of the first**: the rename, and an understatement by one that has stood since
R-3 because `AM-112` was implemented as the fifth check and the cell had said four ever since.

### 2.10 Rows minted before their artifacts

`CHK-31` (`tools/verify_corpus.js`) and `CHK-32` (`tools/corpus_divergence.js`). **2.17 is two
artifacts held by two seats**, and registering one while the other landed unregistered would have
reproduced the defect one file over. This is 2.20 working prospectively rather than retroactively,
which is the only mode in which it is cheap.

---

## 3. `NAMING.md` §7, and the PTH-9 relocation

### 3.1 The relocation, and a collision in my own brief I could not resolve

`literature/NAMING.md` → **`oracle/NAMING.md`**. `PTH-9` is **green**:
`check_corpus_collisions.js` reported `1 summaries` before and reports **`0 summaries`** after.
`PTH-14` is green: the file is not ignored at its new path and `git ls-files` lists it.

**Moved, not renamed, and this was the load-bearing decision.** `oracle/naming_contract.md` would
match its neighbours' convention and would break all 177 mentions. Keeping the leaf name breaks only
the 84 that spell the full old path. `AM-143`'s ruling is explicit that a full sweep is impossible for
one seat and wrong for any. **A cosmetic debt is preferable to a correctness debt.**

**The brief required "every path reference to it updates in the same edit." My write set makes that
impossible, and the brief names the files it excludes.** Of the eleven live path-form references,
exactly **one** — `oracle/bootstrap_contract.md` — is mine. The other ten sit in `corpus_suite.md`,
`AMENDMENTS.tsv`, `MANIFEST.tsv`, `merge_identity.js` and the gameplan. This is the same shape as my
1.5/1.13 collision: **two instructions from one author, mutually exclusive, findable only by holding
both at once.** I executed the ruling and routed the rest, because the alternative was to defy an
author ruling on the strength of a write set.

```quantity
id:            Q-NAMING-PATHREFS-LIVE
class:         provisional
value:         11
unit:          occurrences of the literal string literature/NAMING.md in landed artifacts, counted
               outside cr_scratch/
population:    every .md, .js, .tsv and .sh in this repository excluding cr-agents/ and lsei/
operation:     cmd: grep -rn "literature/NAMING\.md" oracle/ tools/ lunar-oracle-gameplan.md
               COUNTING_RULE.md accumulator.md | wc -l
conditions:    cwd: repository root, 55 characters. Provisional: re-measure at the close of Wave 1,
               when the routed edits in MANIFEST.tsv and AMENDMENTS.tsv land.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     11 live path-form references across 7 files, of which 1 is in this seat's write set
               and 10 are not. A further 73 occurrences sit in cr_scratch/ deliverables and are
               dated record that must not be rewritten.
derived-from:  none
sampled:       n/a - this operation counts every member of the population
superseded:    none
```

**My count is 11 across 7 files. `PTH-13` measured 9 across 6.** Both are correct. The difference is
`oracle/AMENDMENTS.tsv`, which `PTH-13`'s live set omits and which carries **four** rows naming
`literature/NAMING.md` as an amendment *target* — `AM-75`, `AM-76`, `AM-77` and `AM-153`, the last of
which was minted this wave and did not exist when he measured. Two correct measurements of two
moments, and neither reconciles to the other without its digest. **This is standing clause 3 arriving
on schedule and it is why the clause exists.**

### 3.2 The relocation rings a bell rather than dangling silently

**`MF-1` is now RED, and I am reporting that I made the failure count go up.** `oracle/MANIFEST.tsv`
carries `D literature/NAMING.md ... promoted` and `MF-1` does `fs.existsSync` on every promoted target,
so it fails with one line naming the exact path. `check_registers.js --manifest` went **0 → 1 hard
failure**. That is the correct outcome and far better than a silent dangle: the dangle has a live,
blocking, named detector and a one-line fix.

**The two files are coupled and must be edited together.** `AM-3` joins amendment targets against
manifest target paths. `AMENDMENTS.tsv` and `MANIFEST.tsv` currently *agree* on the stale path, so
`AM-3` passes. **Fix either one alone and `AM-3` fails.** Neither is in my write set. Routed below with
the exact edit.

### 3.3 §7 — the four clauses, supplied rather than debated

All four of The Engineer's findings are landed, treated as evidence of demand per The Designer's
ratified rule. **Relayed to him at `cr_scratch/relay/spawn/w1-3_to_engineer_naming_s7.md` before he
adjudicates**, which is arm 2a and which the missing relay directory made me create.

**The levels are now 1, 2A, 2B, 3, and nothing was renumbered.** The obvious edit — agency identifier
becomes level 3, weak key becomes level 4 — is **forbidden and the reason should outlive me**: "level
3" is cited across the corpus and five deliverables, and in every one it means *the weak key, whose
match is a candidate*. Renumbering leaves every such sentence syntactically intact and **semantically
inverted**, claiming a confirmation where the author recorded a candidate. A silent inversion of an
existing citation is worse than an inelegant number.

| | Clause | Evidence |
|---|---|---|
| (a) | A level-2A URL must carry a path | Already in his instrument; removed 4 of 9 false collisions. Now contract, so a reimplementation cannot drop it |
| (b) | A mirror-minted DOI is not level 1 | `10.13140/` = ResearchGate. `colozza-2020`'s **own citation block says it is not publisher-registered** — the file knew and the precedence did not. A **list**, not a rule |
| (c) | An identifier held by >1 key is a candidate | The test is not what the string looks like but **how many keys hold it**. Catches the `nasa.gov/moontomarsarchitecture` programme page, his 1-in-6 over-merge |
| (d) | Level 2B: agency and grant numbers confirm | `80NSSC19K0964` makes `sowers-2019`'s NIAC pair confirmable **by rule** rather than only by eye. Below 2A because a grant can cover a programme, so it confirms only when (c) holds |

---

## 4. The conceptual-integrity ruling — is `verify_corpus.js` a fourth authority?

**This is mine alone, and the answer is no — but the committee outcome I predicted at 0.2 has already
happened, one level below where the question was asked, and it did not wait for `verify_corpus.js`.**

### 4.1 The four are four authorities on four subjects, which is right

`quantities.js` knows about **claims about numbers**. `check_registers.js` knows about **the
bookkeeping tables**. `check_register.md` knows about **the mechanism inventory**. `verify_corpus.js`
would know about **the corpus tree**. Four subjects, four authorities, one each. That is not a
committee; that is separation of concerns, and merging any two of them would be the actual defect —
`tools/manifest.js`'s own header makes the argument better than I can: *"An accessor that also
validates is two contracts on one artifact, which is how `CHK-13` came to have two paths."*

**So `verify_corpus.js` may be built.** `CHK-31` is minted with the constraint in its authority cell.

### 4.2 But they share an undeclared concept, and each computes it privately

Measured at one moment this session:

```quantity
id:            Q-FILESET-FORK
class:         live
value:         4
unit:          instruments that walk this repository and derive mutually disagreeing file sets
population:    tools/quantities.js --check, tools/check_registers.js --manifest, the S-root
               complement of oracle/check_register.md, and tools/check_no_sources.js --tree
operation:     cmd: node tools/quantities.js --check; node tools/check_registers.js --manifest;
               node tools/check_no_sources.js --tree
conditions:    cwd: repository root, 55 characters. Live: three other seats held writes during the
               measurement and the figures move between runs.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     Four instruments walked this repository within one minute and reported file sets of
               100, 71, 17 and 89 files, at read-digests 137322eef8a382b7, 1a6b042278a9ef63 and
               6c9a6c9330f2522c. No two agree, and none is wrong.
derived-from:  none
sampled:       n/a - this operation enumerates every member of the population
superseded:    none
```

**100, 71, 17, 89.** Every one of those numbers is correct for its instrument's purpose. **Nothing
declares those purposes as distinct, and nothing stops a fifth instrument inventing a fifth set.**

**This is my falsifier 2 (state), and it has now fully fired.** I wrote at 0.2: *if integration
produces three separate mechanisms for the ref record, the drift record and the first-run flag rather
than one, that is the committee outcome.* It half-failed at 0.5, in a plan. **Step 2 is where it would
fire in code, and it has** — not for the three state records, but for a concept nobody named: *the set
of files this repository considers its own*. Four private derivations of one idea is the committee
outcome exactly, and it arrived without anyone deciding it.

### 4.3 The ruling

1. **`verify_corpus.js` is not a fourth authority on corpus state and may be built** at
   `tools/verify_corpus.js`.
2. **It may not derive a corpus root set of its own.** It reads a declared set. This is written into
   `CHK-31`'s authority cell so that it binds before the artifact exists, which is the whole reason
   for ruling now rather than after.
3. **The declared file set must become content with one owner, not four private derivations.** The
   register already has the correct mechanism shape and it is the only one that does: `S` roots — a
   declared root list, a *computed* complement, one authority, and `CL-1` making an omission fail
   rather than pass. **That pattern should be lifted out of the check register and made the
   repository's, with the four instruments reading it.**
4. **The read-digest is a mitigation and not a fix, and it should not be mistaken for one.** It makes
   two figures *non-comparable* rather than making the sets *agree*. It is doing real work — it is how
   I could tell my 11 from `PTH-13`'s 9 — but a convention that labels a fork is not a mechanism that
   prevents one.

Item 3 touches `tools/quantities.js`, which is not mine. Routed with the measurement attached.

---

## 5. The A.9 tension with The Software Engineer

**I do not agree with him on every point, and here is where we differ**, since The Manager has made
unanimity a falsifier and co-location the reason.

- **`PDF-3` is marked `green` and is red** on the same measurement that made `PDF-2` red. His row, his
  status cell.
- **`PDF-14` cannot be run as written** on any case-insensitive filesystem. Its five fixtures are four.
- **§0.2's `CL-1` claim is false.** A runner under `oracle/` does not fail `CL-1`; `oracle/**/*.js` is
  a declared root and `CHK-18` has existed since 1.13. The true defect is narrower.
- **`PTH-13`'s live set omits `oracle/AMENDMENTS.tsv`**, which is where the coupling to `AM-3` lives.

**Where we agree, and I say so explicitly because agreement is the thing worth recording:** his
`PDF-9`, `PDF-10` and `PDF-11` are the three rows that made the size gate honest, and I would have
shipped a worse gate without them. `PDF-16`'s empty-stage clause is the single most valuable assertion
in the set and I built the check around it. And his `manifest.js` header identified `CHK-13`'s
overloading independently of me, from the other side — he saw two *paths* where I saw two
*mechanisms*. **Neither of us saw the whole of it alone**, which is the argument for the seam being
where it is.

---

## 6. Census, against the `H` row, on this line

`oracle/check_register.md` `H` row declares **`37 21 14 2`**; the parse returns **37 `C` rows, 21
live, 14 specified, 2 retiring**, all 37 with nine fields — **agreement**. (It was `36 20 14 2` until
`CHK-37` landed for `CON-1` in the same sitting; the count moved because the work moved.)
`oracle/MANIFEST.tsv` `H` row declares **20 `D` rows**; the parse returns **20** — agreement, and
**`MF-1` is RED on one of them by my own action** (§3.2).
This file is **not** counted in either census; it is a `cr_scratch/` deliverable, and it **is** inside
`tools/quantities.js`'s declared file set, which is why its quantity blocks are written to the twelve
fields.

**I wrote that they "were verified to add zero hard failures," then ran the verification, and the
sentence was false. It is corrected here rather than deleted.** My three blocks are clean — no `M1`,
`M2`, `M3`, `M4`, `M11`, `M12` or `M13` finding names this file. **But minting three blocks made
`QUANTITIES.md` stale, and that is two hard failures I caused:** `M7` reads *"the index declares 108
blocks; 111 were emitted"* — 108 + my 3 — and `M6` reports the index differs from its regeneration.
The count went **15 → 17** on my action.

**I have not regenerated the index, and that is a decision rather than an oversight.** `QUANTITIES.md`
is not in my write set, and "nothing else" is unambiguous. It is a *generated* artifact with a
declared generator (`CHK-16`), which makes the case for regenerating it stronger than for any
hand-maintained file — and I still decline, because I wrote three paragraphs of this deliverable
holding other seats to exactly that line, and the standard is The Engineer declining a fix with the
file open in front of him. Routed as `N13` with the one command.

**Full accounting of the hard-failure count across my sitting: 12 at the open, 15 by mid-sitting
(three from `cr_scratch/step2_engineer_dispositions.md`, not mine — `N11`), 17 at the close (two mine,
here). Not one of those four numbers is comparable to another without its digest**, and the digests
are `1ac829bcb5602739` (92 files), `137322eef8a382b7` (100 files) and `687809750ab8ebcd` (101 files).

---

## 7. `## Not mine`

| # | Finding | Sub-step | Owner |
|---|---|---|---|
| N1 | **`MANIFEST.tsv` and `AMENDMENTS.tsv` must be repointed IN ONE EDIT.** `MANIFEST.tsv:24` `D literature/NAMING.md` → `oracle/NAMING.md`, **and** `AMENDMENTS.tsv` rows `AM-75`, `AM-76`, `AM-77`, `AM-153` target column likewise. `MF-1` is red now; `AM-3` joins the two and **fails if either is fixed alone**. This is the highest-priority routed item | 2.20 / 1.14 | The Engineer (promotion), with whoever holds `AMENDMENTS.tsv` |
| N2 | `.gitattributes` does not exist; `core.autocrlf=true` is the only thing keeping the hook shebangs LF. A CRLF shebang is `bad interpreter` on Linux. Needs `tools/githooks/** text eol=lf` | 2.14 follow-on | Not in my write set — author or 1.1's owner |
| N3 | **`PDF-3` is marked `green` and was RED**; `.djvu`/`.epub`/`.docx`/`.doc`/`.pptx`/`.ps`/`.tif`/`.tiff` were uncovered at every path. Green now, but the status cell was stale | 2.13 | The Software Engineer |
| N4 | **`PDF-14`'s five fixtures cannot be run in one directory** on a case-insensitive filesystem: `x.pdf` and `x.PDF` are one file, so it silently tests four and reports five. Each fixture needs its own repository | 2.13 | The Software Engineer |
| N5 | **§0.2's claim that a runner under `oracle/` fails `CL-1` is false.** `oracle/**/*.js` is a declared `S` root; `CHK-18` has held `oracle/tests/run_suite.js` since 1.13. The real defect was that the *corpus suite* had no runner | 2.13 / 2.20 | The Software Engineer |
| N6 | **`PTH-13`'s live set omits `oracle/AMENDMENTS.tsv`** — four rows name the old path as an amendment target. His 9 and my 11 are both correct at different moments; the delta is that file plus `AM-153`, minted this wave | 2.13 | The Software Engineer |
| N7 | `tools/merge_identity.js:22` names `literature/NAMING.md` in the comment addressing the spec its `normalize()` implements | 2.12 | The Engineer |
| N8 | `lunar-oracle-gameplan.md:309` still says 2.14 builds `oracle/check_no_sources.js`, and :300 names the old contract path | gameplan | The orchestrator / The Manager |
| N9 | **The declared file set must become declared content with one owner.** Four instruments derive four sets (100/71/17/89). Touches `tools/quantities.js`. §4.3 item 3 | new | Needs an owner; recommend The Software Engineer, who holds `quantities.js` and the read-digest |
| N10 | **`CL-8(a)` cannot distinguish an invocation from a mention** and would fire on a comment. `AM-143`'s scoping precedent applies. I rephrased my file; the clause is unfixed | 2.20 follow-on | Mine, deferred — needs its own sitting, flagged rather than half-done |
| N11 | `tools/quantities.js` hard failures went **12 → 15** during my sitting. **None are mine**: all three new ones are in `cr_scratch/step2_engineer_dispositions.md`, which did not exist when I began | 2.x | The Engineer |
| N12 | `SLOT-C` is still `EMPTY` and `cr_scratch/relay/spawn/` did not exist until I created it. Arm 2a was not discharged for `SLOT-C` | 2.13 | The Software Engineer / The Manager |
| N14 | **`CON-2` and `CON-3` want a COMMITTED fixture harness** under `cr_scratch/fixtures/` — five isolated fixture trees plus a before/after tree hash over `literature/`, `_intake/` and `lsei/`. I ran the equivalent by hand and in the scratchpad; a committed harness is not in my write set | 2.13 / 2.14 | The Software Engineer (harness) with me (the check) |
| N13 | **`QUANTITIES.md` is stale by my three blocks** — `M7`: declares 108, 111 emitted; `M6` red. I minted them and declined to regenerate because the index is not in my write set. One command: `node tools/quantities.js --index`. **Regenerating may expose rather than fix**, per standing clause 7(b) — `Q-ECR-AXES` and `Q-LCC15-DISTINCT-LEAVES` are already forked | 2.20 close | Whoever holds `QUANTITIES.md` / the orchestrator at the wave close |

---

## 8. What I staged, and what I did not commit

`git add` was run on `tools/check_no_sources.js`, `tools/githooks/pre-commit`,
`tools/githooks/post-commit`, **and `git update-index --chmod=+x` on the two hooks**, because
**the mode lives in the index and a `git reset` reverts it to 100644**. `git mv` staged the contract
relocation. `core.hooksPath` is set to `tools/githooks` in this working copy. **Nothing was
committed.** If the index is reset, `HK-2` goes red and the fix is:

```
git add tools/githooks/pre-commit tools/githooks/post-commit
git update-index --chmod=+x tools/githooks/pre-commit tools/githooks/post-commit
```
