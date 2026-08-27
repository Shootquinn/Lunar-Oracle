# Sub-step 1.1 — The Enforcement Layer, Corrected; and the Map Rows It Lacks

**The Systems Engineer.** Step 1, sub-step 1.1. Written 2026-08-26.
Closes A1's second half (the standing fixture list); proposes the row that resolves D6; satisfies
E4's ordering precondition.
State at time of writing: repository at `27bdeb7`, 21 tracked paths; `cr-agents` at `f0c976b`;
`lsei` at `7f97983`. `literature/` does not exist yet.

---

## 0. What I found before I wrote anything

Three things changed the shape of this deliverable and they belong before it, because two mean I am
correcting less than the brief assumed and one means I am correcting something the brief did not know
was broken.

**Two of my eight breaks are already closed on disk.** Break 4 (deny-by-default under `literature/`)
and Break 5 (anchoring the working-copy patterns) were applied at Setup rev. 3 as safety work rather
than project work, which was the right call and is recorded at gameplan line 280. The current
`.gitignore` at lines 6–7 and 22–24 is already correct on both counts. My job on those two is to
preserve them and to comment them well enough that nobody re-flattens them, not to invent them.

**The stale `deps/` reference in `accumulator.md` is already gone.** I was asked to name the line and
give replacement text. There is no line to name. `accumulator.md` line 4 currently reads

> Created at 0.1 from `cr-agents/templates/accumulator.md`. …

with no `deps/` prefix, `grep -n "deps" accumulator.md` returns nothing, and `git show
HEAD:accumulator.md` confirms the committed copy is the same. The task item is discharged and there
is nothing for the orchestrator to apply. This is a stale task carried forward from my own 0.2 text
through the integration draft into The Manager's open, and it is the harmless kind of stale task —
it cost one `grep` to retire. **No edit to `accumulator.md` is owed.**

**`git check-ignore` does not answer the question the fixture list asks, unless it is used carefully.**
I nearly shipped a wrong fixture list. `git check-ignore -v` prints the last matching pattern
*including negations*, so a re-admitted file such as `literature/x.md` produces output —

```
.gitignore:24:!/literature/**/*.md	literature/x.md
```

— and a harness that tests "did it print anything" scores every allowed file as ignored. The verdict
lives in the **exit status**, not the output. Every row in §3 is written against `check-ignore -q`,
and §3.4 says why. That this trap exists is exactly why A1's second half was worth scheduling: the
Setup rev. 3 fix was verified by a human reading seven lines of `-v` output, and a human reading `-v`
correctly is not a standing assertion.

---

## 1. The corrected `.gitignore`, in full

Ready to write. The orchestrator applies it; I do not.

```gitignore
# See the directory map in lunar-oracle-gameplan.md. This file enforces it.
# If this file and that table ever disagree, the table is the statement of intent and this
# file is the bug. Do not resolve a disagreement by editing the table.
#
# Two properties every rule below is subordinate to:
#   1. ANCHORED. Every path rule begins with `/`, so it names one place in this repository
#      and cannot be re-matched at depth by a folder the merge taxonomy invents later.
#      The only deliberately unanchored rule is the litter rule at the bottom.
#   2. FAILS CLOSED under literature/. A file type nobody has thought of yet is excluded
#      until somebody deliberately admits it.

# --- Working copies of upstream repositories ------------------------------------------
# Cloned by the bootstrap in CLAUDE.md. Never committed, never vendored: the app in lsei/
# is an authority on the model, and a copy of an authority drifts away from it silently
# while continuing to answer questions. Anchored, so that a corpus taxonomy folder named
# literature/lsei/ is not swallowed by the rule that hides the working copy.
/cr-agents/
/lsei/

# --- Intake staging --------------------------------------------------------------------
# Material on its way into literature/. Not part of the repository, and not the corpus's
# permanent home: permanence attaches to the repository, not to this path. The merge is
# not complete until this directory is empty; the exit criterion is a map row, not a
# comment here. This rule is KEPT after _intake/ is deleted, so that a second corpus
# staged here later fails closed rather than shipping on the next `git add -A`.
/_intake/

# --- Stale bootstrap target -------------------------------------------------------------
# The working copies were flattened from deps/ to the repository root at Setup rev. 1 and
# nothing writes deps/ any more. Before the patterns above were anchored, `cr-agents/`
# matched at any depth and caught a resurrected deps/ by accident. Anchoring removed that
# accident, so the safety net is stated deliberately or it does not exist. This rule stops
# a stale bootstrap's 400 MB of somebody else's repository from being committed; it does
# not detect one. Detection is the bootstrap suite's, at 6.1.
/deps/

# ----------------------------------------------------------------------------------------
# literature/ is DENY BY DEFAULT. Only this project's own .md summaries ship.
#
# The corpus sits beside its source material on the author's disk: PDFs, and at least
# three .txt files carrying full treaty text. Those are published works this project does
# not own. An allow-list that named only *.pdf would have shipped the .txt files on merge
# day, and would have shipped *.PDF on any case-sensitive clone. Deny-by-default fails
# closed instead: a new source file type added six months from now is excluded until
# somebody deliberately admits it.
#
# The second line is not decoration. Without it git never descends into a subdirectory of
# literature/ and the third line never gets the chance to re-admit anything below the top
# level. Verified: removing it makes literature/<topic>/*.md invisible to `git status`.
# ----------------------------------------------------------------------------------------
/literature/**
!/literature/**/
!/literature/**/*.md

# --- The source-PDF store (resolves loose end D6) ----------------------------------------
# literature/_pdf/<taxonomy>/ holds source PDFs pulled from outside this repository, filed
# under the same taxonomy names as the summaries but not interleaved with them. Nothing
# here ships, ever, including .md: a summary written into the PDF store is a filing error,
# and re-admitting .md here would ship the filing error. This rule sits AFTER the two
# re-admissions above so that it wins over them; moving it above them silently reverses it.
/literature/_pdf/

# --- Machine-written install state -------------------------------------------------------
# One root-level file, written by the bootstrap, describing THIS install: schema version,
# the ref each working copy was last verified against, whether source PDFs are present
# here, the corpus provenance digest, and the first-run flag. Ignored because a committed
# first-run flag suppresses the opening sequence for every person who clones afterwards,
# which is the exact opposite of what "once" is supposed to mean.
#
# Named as a literal, not a pattern, and that is load-bearing. The rule that keeps this row
# honest is: anything that must survive a clone is not state, it is content, and it belongs
# in the gameplan or in the corpus. Loose end E12's tracked ref record is content. A
# convenience wildcard here — /*state*, /*.lock — would eventually swallow it, and the
# failure would present as "the ref we verified against is missing on a fresh clone."
/.oracle-state.json

# --- Machine-extracted derivatives of upstream content ------------------------------------
# Contingent on the 1.6 ruling on loose end C4. verify_report.js does not exist as a file in
# either working copy; its 328-line source is a fenced block inside
# lsei/report-generator-prompt.md, lines 357-686, and the upstream's own instruction is to
# write it out and run it. If the bootstrap extracts it, the extracted copy is
# derived-from-upstream, per-install, and regenerable: state, not content. It lands here and
# never ships. Writing it into tools/ instead would vendor a second authority into a
# repository whose entire map exists to prevent exactly that.
/.derived/

# --- Editor and OS litter ------------------------------------------------------------------
# Deliberately unanchored: litter appears at any depth and has no home directory.
*.tmp
```

### 1.1 Which of my eight breaks each change closes

| Break | What it was | Status after this file |
|---|---|---|
| **1.** `lsei/literature/` gains a source after our merge lands | The corpus is a fork of a moving upstream | **Not closed here, and cannot be.** A path rule cannot detect divergence. Goes to 1.5 (state record) and 1.6 (drift policy), as SE-3/SE-5. This file's only contribution is the ignored state row the drift check writes into. |
| **2.** `_intake/` gitignored in full while A2 calls the corpus permanent | Reading conflict in the map | **Closed as an enforcement matter** (`/_intake/`, kept after deletion) and **proposed as a map matter** in §2.4: permanence attaches to the repository, and the exit criterion becomes testable. |
| **3.** The PDFs have no row once `_intake/` empties | No home for source PDFs; two `literature/` trees with the same name | **Closed** by `/literature/_pdf/` plus the map row in §2.2. The second half — that a session cannot tell which of the two trees it is sitting in — is not closable here; it is a field in the state record, 1.5. |
| **4.** `.gitignore` only knew about PDFs | `.docx`, `.txt`, `.PDF` all shipped | **Already closed** at Setup rev. 3. Preserved and documented here. But see §4.1: it fails closed on file *types*, not on *content inside an admitted type*. |
| **5.** Working-copy patterns unanchored | `literature/lsei/` would be swallowed | **Already closed** at Setup rev. 3. Preserved. This file adds the consequence Setup rev. 3 did not draw: anchoring removed the accidental `deps/` catch, so `/deps/` is now stated deliberately. |
| **6.** No row for machine-generated state | The default for an unlisted path is committed-on-next-`git add` | **Closed** by `/.oracle-state.json` plus the map row in §2.1. The schema is 1.5's; the row is mine. |
| **7.** `cr_scratch/` is pushed and written by an unbounded process | 140 files last time | **Not closed; framed for the author** in §2.3. It has no `.gitignore` consequence under any option, which is why the ruling does not block this file. |
| **8.** No boundary drawn around `CSA_LSEI_Workshops` | A third de facto dependency on one machine | **Not closable by this layer,** and I want that stated rather than quietly omitted: `.gitignore` cannot reach a path outside the repository. Proposed as a non-row in §2.5; enforcement is a suite assertion at 6.1. |

**Three remain open after this file: 1, 7 and 8.** One (1) is correctly somebody else's step. One (7)
is correctly the author's ruling. One (8) is a statement the map can make and this layer cannot
enforce, and pretending otherwise would be worse than saying so.

---

## 2. Proposed directory map rows

I am proposing; the author rules. Where I have taken a position I say so. Where the choice is
genuinely his I have framed it rather than made it.

### 2.1 New row — the machine-written install state file

| Path | Pushed | What it is |
|---|---|---|
| `.oracle-state.json` | **no** | Machine-written record of **this install**: schema version, the ref each working copy was last verified against, whether source PDFs are present here, the corpus provenance digest, and the first-run flag with its timestamp and its bootstrap-completed boolean. Written by the bootstrap, read by the bootstrap, never edited by hand. |

*Rationale.* The default for an unlisted path is untracked-and-therefore-committed-on-the-next
`git add -A`, and for the first-run flag that default is actively harmful: the author's committed
flag suppresses the opening sequence for everyone who clones afterwards.

*The sentence that keeps the row honest, and it belongs in the map beside it:* **anything that must
survive a clone is not state, it is content, and it belongs in the gameplan or in the corpus.** That
is loose end E12 stated as a map rule rather than as a defect. It implies a tracked twin — the
verified-against ref is content — whose name and location are 1.5's to fix. I have deliberately
written the ignore rule as a literal filename so that whatever 1.5 names the tracked twin, this rule
cannot capture it by accident.

### 2.2 New row — the source-PDF store (resolves D6)

| Path | Pushed | What it is |
|---|---|---|
| `literature/_pdf/<taxonomy>/` | **no** | Source PDFs pulled from outside the repository, filed under the same taxonomy names as the summaries. Never ships. Present on the author's install, absent from a fresh clone — a fact the state record carries. |

*Rationale.* The Engineer's recommendation, which I endorse: a PDF store separate from the summaries
keeps the shipped tree and the local tree structurally identical apart from one directory, so "what
does a clone see" has a one-line answer instead of a per-file answer.

*One variance from D6's wording, mine to flag rather than to take.* The rule I have written excludes
`.md` inside `_pdf/` as well as `.pdf`. D6 asks only where PDFs land. My position is that a store
which admits summaries is not a store, it is a second corpus root, and a second corpus root splits
retrieval. **If the author wants `_pdf/` to hold a `README.md` explaining the store, the rule must
change,** and the change is to insert `!/literature/_pdf/README.md` immediately after it. I recommend
against: put that explanation in `literature/NAMING.md`, which ships.

*A detail worth having before ruling:* the leading underscore is doing work. It sorts `_pdf` above the
taxonomy folders and makes the store visually non-parallel to them, which is correct — it is not a
topic.

### 2.3 Ruling requested — `cr_scratch/`: grows, or archived per step?

**This is a proposal and I want the author to rule it.** It touches a FIXED map row (`cr_scratch/`
pushed on purpose, A.3.5) and its cost is borne by whoever writes prompts, not by me.

First, the fact that de-risks the decision: **the `.gitignore` in §1 is identical under every option.**
`cr_scratch/` is pushed under all of them, so the ruling does not block 1.1 and can be taken at the
Step 1 gate with no rework here.

- **(a) Grows unboundedly, flat.** Cheapest. Costs nothing until it costs a directory listing of
  seventy-odd files that a session scans on every recovery. The Japanese Miracle project reached 140.
- **(b) Archived per step**, moved to `cr_scratch/_archive/step<N>/` at each gate. Fixes the listing.
  Adds a per-gate action that can be forgotten, and a forgotten archive step is worse than a long
  directory because a half-archived tree is harder to read than either end state.
- **(c) My position: write into per-step subdirectories from the start.** `cr_scratch/step2/…` rather
  than `cr_scratch/step2_1_….md`. The step number is already in every filename; this moves it from
  the filename into the path, where the filesystem can act on it. There is no move to forget, because
  the path an agent is given already carries the step number.

  The cost is real and I will state it: Step 0's fifteen files and Step 1's prompts are written flat,
  and this sub-step's own output path is flat. Adopting (c) means one migration, best taken at the
  Step 1 gate, and every Step 2 prompt written against the new shape. Migrating mid-step would
  strand paths that live prompts already name.

*Recommendation: (c), adopted at the Step 1 gate, Step 0 and Step 1 migrated in one commit.* If the
author does not want the migration, (a) is honestly fine for a project of this length, and (b) is the
worst of the three.

### 2.4 Amended row — `_intake/`, with a testable exit criterion

The map says `_intake/` "empties as the merge lands." That is a description of a tendency. A criterion
is something a step can fail. Proposed replacement for the "What it is" cell:

> Staging. Material on its way into `literature/`. Not the corpus's permanent home: permanence
> attaches to the repository, not to this path. **The merge sub-step is not complete until all three
> hold:** (1) `find _intake -type f | wc -l` returns `0`; (2) every file that was under `_intake/`
> when the merge began is accounted for in the merge ledger as exactly one of *merged*,
> *superseded-duplicate*, or *PDF moved to `literature/_pdf/`*, a count that reconciles against the
> pre-merge inventory; (3) the directory is deleted. **The `.gitignore` rule is not deleted with it,**
> so that a second corpus staged here later fails closed instead of shipping.

Clause (2) is the one that matters. Clause (1) alone is satisfiable by `rm -rf`, and a merge that
passes its exit criterion by deleting its inputs is the exact failure the criterion exists to catch.

*Position, not decision:* whether the ledger is a file or a section of the merge sub-step's handoff is
The Engineer's call at 2.x. I own only the requirement that the reconciliation exists and is written
down, because a count nobody recorded is a count this project will regenerate differently next week —
The Manager's live position (3), and this is one more instance of it.

### 2.5 New non-row — everything outside this repository and its two working copies

Not a path row. One sentence, to sit under the map:

> **No path outside this repository and its two working copies is read at runtime.**
> `OneDrive/PROJECTS/CC/CSA_LSEI_Workshops` (4.1 GB, 163 PDFs) and the original Japanese Miracle
> project folder are *sources of material*, not dependencies. Each is read once, by a
> human-supervised pull step that copies what it takes into this repository, and never by the
> answering loop.

*Rationale.* Without it, the workshops folder becomes a third de facto dependency existing on exactly
one machine, and an Oracle that answers on the author's laptop and refuses everywhere else is a setup
rather than a system.

**The honest caveat, which belongs in the map next to the sentence:** `.gitignore` cannot enforce this.
A path outside the repository is outside the reach of every rule in §1. The enforcement is a suite
assertion — 6.1 already owns the shape of it (rename `lsei/`, assert the session refuses) and this
adds one case: with the workshops folder absent, assert that no step in the answering loop changes
behaviour. A statement of intent with a named enforcer elsewhere is a design. A statement of intent
with no enforcer anywhere is a wish.

---

## 3. The acceptance fixture list

### 3.1 The table

Every row is a path, the expected verdict, and the map row under test. **The verdict is the exit
status of `git check-ignore -q`, never the presence of `-v` output** — see §3.4.

| # | Path | Expected | Map row / rule under test |
|---|---|---|---|
| 1 | `literature/x.pdf` | ignored | corpus deny-by-default, the original case |
| 2 | `literature/x.PDF` | ignored | deny-by-default; the case variant an allow-list of `*.pdf` missed (A1) |
| 3 | `literature/x.txt` | ignored | deny-by-default; the three UN treaty texts, merge day |
| 4 | `literature/x.docx` | ignored | deny-by-default; the type nobody has thought of |
| 5 | `literature/x.md` | **not ignored** | the corpus ships — top level |
| 6 | `literature/sub/y.md` | **not ignored** | the corpus ships — nested; tests `!/literature/**/` |
| 7 | `literature/sub/y.pdf` | ignored | deny-by-default survives one level down |
| 8 | `literature/lsei/x.md` | **not ignored** | working-copy rules are anchored; a taxonomy folder colliding with a working-copy name still ships (Break 5) |
| 9 | `literature/NAMING.md` | **not ignored** | the file The Engineer lands at 1.7, which is what creates `literature/` |
| 10 | `literature/NAMING.MD` | ignored | **the one case-sensitivity divergence left.** See §3.3 |
| 11 | `literature/_pdf/lunar/x.pdf` | ignored | the PDF store (D6) |
| 12 | `literature/_pdf/lunar/x.md` | ignored | the PDF store admits nothing, `.md` included — §2.2's variance |
| 13 | `.oracle-state.json` | ignored | machine-written install state (Break 6) |
| 14 | `.derived/verify_report.js` | **allowed** | **Amended 2026-08-27 at the Step 1 close.** This row asserted `ignored` against the `/.derived/` rule, which was contingent on the C4 ruling. The author ruled the other way — `verify_report.js` is dropped, not extracted — so the rule was deleted at 1.4 and nothing writes that directory. The fixture was not swept with it, so this list, which is 1.1's own stated acceptance criterion, failed from the moment the rule was removed. Kept as a row rather than deleted: an unignored `.derived/` is now the asserted state, and a future rule that re-ignores it should fail here. |
| 15 | `cr-agents/README.md` | ignored | working copy |
| 16 | `lsei/index.html` | ignored | working copy; the authority that is never vendored |
| 17 | `deps/cr-agents/README.md` | ignored | the stale bootstrap target must not resurrect into a commit |
| 18 | `_intake/japanese-miracle/lit/x.md` | ignored | intake staging |
| 19 | `cr_scratch/step1_x.md` | **not ignored** | agent handoffs ship (A.3.5) — under every §2.3 option |
| 20 | `tools/foo.js` | **not ignored** | this project's own checks ship |
| 21 | `oracle/foo.js` | **not ignored** | this project's own tooling ships |
| 22 | `README.md` | **not ignored** | written in a later step; must not be caught by anything |
| 23 | `foo.tmp` | ignored | litter, unanchored by design |
| 24 | `literature/sub/z.tmp` | ignored | litter at depth; also confirms the litter rule sitting after the re-admissions does not weaken them |

All 24 rows were verified as passing against the §1 file, in a scratch repository at
`core.ignorecase=false`, twice: once by `check-ignore -q --no-index` with nothing on disk, and once
against a real populated tree read by `git status --porcelain -uall`.

### 3.2 The runner

Runnable as given, from the repository root. It needs no files on disk: `--no-index` evaluates paths
that do not exist, which is what lets row 9 be asserted before The Engineer creates `literature/` at
1.7, and row 17 be asserted against a directory that must never exist again.

```sh
#!/bin/sh
# tools/check_gitignore_map.sh — asserts the directory map against .gitignore.
# Exit 0 = the enforcement layer matches the map. Exit 1 = they disagree.
fail=0
assert() {  # assert <expected: ignored|allowed> <path>
  if git -c core.ignorecase=false check-ignore -q --no-index "$2"; then got=ignored; else got=allowed; fi
  if [ "$got" != "$1" ]; then printf 'FAIL  %-40s expected %-7s got %s\n' "$2" "$1" "$got"; fail=1
  else printf 'ok    %-40s %s\n' "$2" "$got"; fi
}

assert ignored literature/x.pdf
assert ignored literature/x.PDF
assert ignored literature/x.txt
assert ignored literature/x.docx
assert allowed literature/x.md
assert allowed literature/sub/y.md
assert ignored literature/sub/y.pdf
assert allowed literature/lsei/x.md
assert allowed literature/NAMING.md
assert ignored literature/NAMING.MD
assert ignored literature/_pdf/lunar/x.pdf
assert ignored literature/_pdf/lunar/x.md
assert ignored .oracle-state.json
assert allowed .derived/verify_report.js
assert ignored cr-agents/README.md
assert ignored lsei/index.html
assert ignored deps/cr-agents/README.md
assert ignored _intake/japanese-miracle/lit/x.md
assert allowed cr_scratch/step1_x.md
assert allowed tools/foo.js
assert allowed oracle/foo.js
assert allowed README.md
assert ignored foo.tmp
assert ignored literature/sub/z.tmp

exit $fail
```

This is the standing assertion A1 asks for. It belongs in `tools/`, which the map says ships, and it
is wired by the bootstrap via `core.hooksPath` — **not** as a `.git/hooks` file, because hooks are not
cloned (E1). The wiring is 1.4's and the installation is 2.14's. This sub-step owes the assertion, not
the trigger.

### 3.3 Case sensitivity: assert on a case-sensitive filesystem, and what breaks if you do not

The author's machine is Git for Windows with `core.ignorecase=true`. That setting makes the
enforcement layer's behaviour machine-dependent, which is the worst property an enforcement layer can
have, and it is why every row above is asserted at `core.ignorecase=false`.

I ran all 24 rows under both settings against the §1 file. **Exactly one diverges: row 10,
`literature/NAMING.MD`.**

| Setting | `literature/NAMING.MD` |
|---|---|
| `core.ignorecase=false` (Linux, CI) | ignored — the allow-rule `*.md` does not match `.MD` |
| `core.ignorecase=true` (this machine) | not ignored — it ships |

This is worth understanding rather than just recording, because deny-by-default **inverted the
direction of the case risk.** Under the old allow-list, case-insensitivity *hid a leak*: `x.PDF`
looked ignored on Windows and shipped on Linux. Under deny-by-default the case-sensitive rules are the
*re-admissions*, so the same divergence now produces a file that ships on the author's machine and
silently fails to ship from a Linux clone or from CI. **The failure direction is safe** — nothing leaks
— **and the failure is silent**, which is the part to plan for. A summary named `FOO.MD` would be
committed by the author, would appear present, and would be absent from the shipped corpus for every
reader. Retrieval would then be missing a source the author can see on his own disk, which is
precisely the class of bug this project is least able to notice.

Two consequences.

1. **The fixture must be *run* on a case-sensitive filesystem to be a real assertion.**
   `git -c core.ignorecase=false` changes pattern matching but not the filesystem; it is a faithful
   local approximation and it is not the thing itself. On Windows it cannot distinguish a repository
   containing `NAMING.md` from one containing `NAMING.MD`, because the filesystem cannot. The
   assertion is therefore *complete* only in Linux CI, and if it is never run there, row 10 is
   untested and the divergence above is live.
2. **The cheaper mitigation, recommended alongside rather than instead:** `tools/` already holds
   `check_corpus_collisions.js`, whose job is to fail when two summaries are indistinguishable to the
   retrieval layer. Extending it with "reject any corpus filename whose extension is not exactly
   `.md`" turns the case question into a corpus-hygiene failure at merge time rather than an invisible
   shipping difference at clone time. One line, in a check that already exists, and it does not depend
   on anyone remembering to run CI on Linux.

### 3.4 Two ways this fixture can lie, both closed

**`check-ignore -v` prints negation matches.** The verdict is the exit status. A harness that greps for
output scores every *allowed* file as ignored, and would have reported the §1 file as a catastrophe.
The runner in §3.2 uses `-q` and reads `$?`. Stated because the natural way to write this fixture by
hand — running `-v` over a list of paths and reading the output — is the wrong way, and it is how A1's
seven probes were originally read.

**`--no-index` tests the rules, not the traversal.** Git prunes ignored directories before it looks
inside them; `--no-index` matches a full path string with no pruning. For the §1 file the two agree on
all 24 rows, verified. But a `dir/`-style rule cannot be probed as a *bare directory path* under
`--no-index`, because git cannot know a non-existent path is a directory. Therefore **every fixture
row is a file path, never a bare directory path.** Rows 11, 12, 17 and 18 test the directory rules
through a file inside them, which is both what `--no-index` can answer and what actually matters.

The complete assertion is two halves: §3.2 tests the rules and runs anywhere with nothing on disk, and
one real-tree `git status --porcelain -uall` over a populated fixture tests the traversal. I ran both.
Only the pair is an enforcement test; either alone is a pattern test. The second half belongs in the
bootstrap suite at 6.1, where a real tree is being built anyway.

---

## 4. Findings this sub-step produced that nobody assigned

### 4.1 The enforcement layer has the same blind spot as this project's searches, and A1 is narrower than it reads

The orchestrator asked whether The Manager's common cause for C4 — *this project's searches look for
containers while its dependencies live as content* — bears on the enforcement layer.

It does, and it is the same defect in different clothes. **A `.gitignore` rule matches paths. It cannot
see a file that exists as content inside a tracked file.** `verify_report.js` was declared missing
because `find` looks for filenames and the file lives as a fenced block at
`lsei/report-generator-prompt.md:357-686`. The mirror case here is worse, because it sits inside the
one directory this file exists to protect:

> A UN treaty's full text pasted inside `literature/<topic>/un-1967-outer-space-treaty.md` is shipped
> by `!/literature/**/*.md`, and **no path rule in §1 can tell.**

So the honest reading of A1's FIXED status: **the layer fails closed on unknown file *types*, and it is
blind to unknown *content inside an admitted type*.** That is a real improvement over the allow-list
and it is not the whole of what A1's finding says. It matters right now because the three `.txt`
treaty files have `.md` summaries sitting beside them in `_intake/`, and the merge is about to move
those summaries into exactly the directory the path rules protect. If a summary reproduces its source,
deny-by-default ships it.

The closing mechanism is not a path rule and cannot be. It is a content check in `tools/`, wired by
`core.hooksPath` alongside §3.2's fixture: reject a summary carrying a run of source text over some
threshold, or the structural markers of a reproduced document. The scope question — what counts as
reproduction — is Open Question 8 and belongs to The Engineer at 2.x. **I own the statement that the
enforcement layer is half an enforcement layer until that check exists, and that the missing half is a
content check, not a better pattern.**

*Recommendation to The Manager:* pass this to 1.13 with the C4 reasoning as the same finding's third
instance. The first was a dependency search; the second was the model inside `index.html`; this is the
enforcement layer. Three instances is a system property, not three incidents.

### 4.2 The LSEI ref moved again, and that is the third time (E10)

`lsei` is at `7f97983`, not `f788ea2`. A8 is closed: two errors in `lsei/README.md` were fixed and
pushed. Every ref this document quotes is `7f97983`.

I flagged at 0.5 that the drift report cannot tell *the authority moved* from *we moved the authority*.
**This is now the third time this project has moved an upstream it also treats as an authority,** and
the count is the point. A distinction that has to be drawn three times inside one Step 0 is not an edge
case being defended against; it is the normal operating mode, and E10's fix — compare against
`origin/main` and name the direction — is load-bearing rather than tidy. It needs E6 (nothing fetches)
closed first. Both are 1.6's.

One consequence specific to this sub-step: `.gitignore` hides both working copies completely, so
nothing in the enforcement layer will ever notice an upstream move. That is correct — hiding them is
the whole point — but it means the drift report is the *only* thing that will notice, and a report
nobody is required to read is not a mechanism. 1.6 should say who reads it and what a session does
when it says "diverged."

### 4.3 What I am not confident about

The `/deps/` rule. I have argued it belongs, as a net for a class of accident that anchoring removed
the accidental protection against. The counter-argument is genuine and I want it on the record rather
than buried: **an ignored `deps/` is a silent `deps/`.** A stale bootstrap that recreates it produces
400 MB of somebody else's repository that never appears in `git status` and that nobody notices until
a disk fills. The rule prevents the wrong commit, and it also prevents the symptom.

My position is that prevention-of-commit is this layer's job and detection is 6.1's, and that splitting
them is correct rather than a dodge. But it has an expiry condition worth writing down: **once 6.1's
"place a `deps/`-style stale path and assert the bootstrap does not populate it" test exists and runs,
the `/deps/` rule can be deleted,** because at that point detection is guaranteed and the net is only
hiding things. If the author would rather have the noise now than the rule, deleting the `/deps/` line
is the only change, and row 17's expected verdict flips to *not ignored*.

---

## 5. What the orchestrator applies, and what it does not

**Apply:** the `.gitignore` in §1, in full, replacing the current 26-line file.

**Do not apply, pending the author's ruling at the Step 1 gate:** the map rows in §2. They are
proposals. The `.gitignore` in §1 is correct under every one of them except §2.2's `_pdf/README.md`
variance, which if ruled the other way is a one-line insertion named in §2.2.

**Do not apply, because there is nothing to apply:** the `accumulator.md` `deps/` correction. It has
already been made. See §0.

**Not owed by this sub-step, named here so they are not lost:** the `tools/check_gitignore_map.sh` file
itself (§3.2 is its content; 2.14 installs it), the `core.hooksPath` wiring (1.4), the state record's
schema (1.5), the drift policy (1.6), the content check of §4.1 (2.x, with Open Question 8), and the
case-sensitivity extension to `check_corpus_collisions.js` (§3.3, recommended to The Engineer).
