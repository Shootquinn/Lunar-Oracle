# 2.20 — The merge-gate dispatcher, the coupled repoint, and the merge's preconditions

**W2-3, The Systems Engineer. Wave 2, 2026-08-28.**

## 0. Premise check

Standing clause 1. Measured before anything was built.

| # | Premise as briefed | Verdict | Measurement |
|---|---|---|---|
| P1 | `MF-1` is red on exactly one row, and exactly four `AMENDMENTS.tsv` rows name the dead path | **HOLDS** | `MANIFEST.tsv:24` was the only `MF-1` failure. `grep -c literature/NAMING.md oracle/AMENDMENTS.tsv` = 4 in the target column: `AM-75`, `AM-76`, `AM-77`, `AM-153`. A fifth hit exists in `AM-92`'s *finding text* and is not a target cell. |
| P2 | `git hook run merge-gate` does nothing today, and `CHK-01`/`CHK-04` are the only rows naming it | **REFUTED on the first half, and the refutation changed the design** | It does not do nothing. It exits **1**: `unknown hook event 'merge-gate'; use --allow-unknown-hook-name to allow non-native hook names` (git 2.55.0.windows.1). `merge-gate` is not a native git event, so **a file at `tools/githooks/merge-gate` is not reachable by `git hook run merge-gate` at all.** The working invocation carries the flag, and it is now recorded in the register's `T` row rather than in a deliverable. Second half holds: two rows, `CHK-01` and `CHK-04`. |
| P3 | `.gitattributes` does not exist anywhere in the repository | **HOLDS** | `find . -name .gitattributes` outside `.git/`, `cr-agents/`, `lsei/` returned nothing. |
| P4 | `xls`, `xlsx` and `zip` commit cleanly at **every path** while `docx`/`pptx` do not | **REFUTED — the exposure is narrower than briefed and the boundary is different** | 76-cell `git check-ignore` matrix. `xls xlsx zip rar 7z csv txt` commit **only outside `/literature/**`, `/findings/**` and `/_intake/`** — i.e. at the repository root and under `oracle/`, `tools/`, `cr_scratch/`. Under `literature/` at any depth they are already ignored by the deny-by-default block. So the hole is real but it is *the rest of the tree*, not the corpus, which is the opposite of where a reader of P4 would look. |

**Two further refutations, both against figures I was handed to work from.**

- The brief's live state 7(b) says `check_registers.js` reports 1 hard failure **at exit 0**. It exits **1**. Verified: `node tools/check_registers.js >/dev/null 2>&1; echo $?` → `1`. A register that reports a hard failure and exits 0 would be the worse defect; it does not have it, and the brief does.
- 7(b)'s read-digest `dc72ed90c39cf720` over **72** files did not reproduce. My wave-open run: `bbaa4be015d4edd0` over **81** files. Same instrument, same minute of the day, nine more files. **Not comparable by standing clause 3, and I am not reconciling them.** Six concurrent seats are writing; a digest quoted from another seat's sitting is a digest of another repository.

**Census self-counting (standing clause 4).** Every digest below is over `check_registers.js`'s own read set, which is **81 files at my open and 92 at my close**. **My deliverable is in it** — `cr_scratch/**` is inside that walk — so the file you are reading moved the digest every time I appended to it, and eleven files entered the set during one sitting, most of them not mine. `literature/` held 0 files at my open and 0 at my close; the merge had not landed while I worked.

---

## 1. The coupled repoint — done, in one edit, and it is green

**Close condition: `node tools/check_registers.js` reports ZERO FAIL. Met.**

```
NOTE MANIFEST.tsv: 23 D rows
OK   MANIFEST declares its own size correctly (23)
OK   MF-1 every promoted row has a file at target-path (20 rows)
OK   AMENDMENTS declares its own size correctly (153 total, 71 owed)
OK   AMC-3 every amendment target is a row in oracle/MANIFEST.tsv
NOTE hard failures: 0 @ read-digest 5bddd7c54db8f91d over 92 files, tool 2.19-1
exit 0
```

Before: `1 hard failure @ bbaa4be015d4edd0 over 81 files`, exit 1.

**The read set went 81 → 92 during my sitting and my own two files are two of the eleven.** Standing
clause 3: the two digests above are not comparable and I am not treating them as a before/after of
one measurement. What *is* comparable is the verdict — `MF-1` red then, `MF-1` green now, on a row I
edited and re-read.

**One script wrote both files and neither was written unless both edits verified**, because `AM-3`
couples them: the manifest alone leaves four amendments naming a target with no manifest row and
`AMC-3` fails; the amendments alone leave `MF-1` red. `AMC-3` was green before this edit **only
because both halves were wrong together**, which is the shape worth naming — a join is not evidence
of correctness when both sides of it point at the same absent thing.

What changed:

- `MANIFEST.tsv` row 24 → `oracle/NAMING.md`, with the relocation and its reason in the gate cell.
- Four `AMENDMENTS.tsv` target cells → `oracle/NAMING.md`: `AM-75`, `AM-76`, `AM-77`, `AM-153`.
- Three `MANIFEST.tsv` rows added: `tools/check_registers.js`, `tools/manifest.js`,
  `oracle/tests/corpus_suite.md`. `H` row 20 → 23.
- `AM-141` `owed` → `applied`, and `AM-153` `owed` → `applied`. `H` row owed 73 → 71.

### 1.1 The three added rows are the fix for `AM-129` at its source, not around it

`AM-129` says a correction to a document that was never promoted has nowhere to be recorded, because
`AMC-3` requires an amendment target to be a manifest row. Its third and fourth live instances —
`AM-144` and `AM-150` — **both worked around it by filing against a different target and saying so in
the finding text.** `AM-144` is a correction to `tools/check_registers.js` filed against
`oracle/check_register.md`; `AM-150` is a correction to a frozen `cr_scratch` deliverable filed
against `QUANTITIES.md`. Two rows now point at files they are not about, and a future reader
following the target column lands in the wrong place twice.

Adding the manifest rows removes the cause for two of the four instances. It does not close
`AM-129`, and I have not marked it closed: the residual is a correction owed at a **`cr_scratch`
deliverable**, which is not promotable by construction, and that is The Designer's ruling to make.

### 1.2 `AM-141` was verified, not accepted on report

Flipping another seat's state cell on someone else's say-so is the thing this project keeps
catching. The row carries its own acceptance test and I ran it:

```
node tools/quantities.js --lint
  → NOTE M15 35 untagged relays across 16 relay files, computed from the section 9 M15
    path rule and not enumerated in this source
```

`k = 16 > 2`, which is the test `AM-140` specified. `grep -c RELAY_FILES tools/quantities.js` = **1**,
and that one occurrence is inside the comment explaining why the constant was removed. Implemented
and running. `AM-138` and `AM-144` remain `owed` and I did not touch them.

### 1.3 `AM-153` discharged: the thirty-one dead citations, partitioned

`AM-153` asks for the count and the discriminator, not a sweep. Measured over every file outside
`.git/`, `cr-agents/`, `lsei/`:

**47 files hold the string `literature/NAMING`, 157 occurrences**, measured at my close, **excluding
my own two files** (this deliverable and my relay), which both hold it and would otherwise be
counting the measurement into its own result. The briefed figure of thirty-one is a count of the
*declared file set*; this is the whole tree and includes eight Wave 2 spawn briefs written after that
count was taken — standing clause 4 operating on somebody else's number.

The discriminator is the one `AM-143` used — a dated boundary — plus one thing `AM-143` did not need:
**a mention is not a pointer.** Partition at close:

| Class | Files | Disposition |
|---|---|---|
| **Live pointers I own** | `oracle/MANIFEST.tsv` target cell, `oracle/AMENDMENTS.tsv` ×4 target cells | **Repointed. Zero remain.** |
| **Live pointers I do not own** | `oracle/tests/corpus_suite.md` (8), `oracle/tests/run_suite.js` (2), `lunar-oracle-gameplan.md` (1), `accumulator.md` (1) | Routed in `## Not mine`. Four files, twelve occurrences. |
| **Irreducible record** | `oracle/NAMING.md:3` (the relocation banner), `oracle/AMENDMENTS.tsv:210` (`AM-153`'s own finding text) | Correct as written. **These are the only two places a reader who greps the old path lands anywhere useful.** |
| **Frozen record** | 41 files under `cr_scratch/` | Stay frozen. A dated report describing a location that did not exist on its date is the defect `AM-143` permanently declined. |

**Measured moving under me, mid-wave:** `tools/merge_identity.js:22` held a live pointer at my open
and holds `oracle/NAMING.md` at my close — The Engineer fixed it while I was working. I did not, and
the row above reflects the close rather than the open. Conversely `oracle/tests/run_suite.js` did not
exist at my open. **A census of a live tree is a photograph, and standing clause 4 is why both ends
are stated.**

**A relocation that leaves live pointers behind is a relocation nothing in this project detects, and
twelve of them are outside my write set.** That is the finding, and it is why the routing below is
not a formality.

### 1.4 `PTH-13` and I disagree, and the disagreement is on the record unsmoothed

The Software Engineer's `PTH-13` greps a live file set for the literal `literature/NAMING.md` and
fails on any occurrence. My repoint took it 4 → 3. **It cannot reach 0 without destroying the
relocation's own paperwork**: the two survivors in my files are the `NAMING.md` banner and `AM-153`'s
finding text, and the third is not mine.

This is `CL-8(a)` one wave later, in his file instead of mine, and my own `pre-commit` header carries
the sentence: *a grep for a string cannot distinguish an invocation from a mention, so the files most
obliged to explain the thing are the files the grep hits hardest.* My proposed fix — count the
dereferenced TSV target columns rather than occurrences, and whitelist the banner **by name**, which
is `NAMING.md` §10's own convention and `AM-143`'s own precedent — is in
`cr_scratch/relay/w2-3_to_w2-2_review_dispatcher_and_pth13.md`. **I did not make the edit.**
`oracle/tests/**` is his, and widening my write set to reach a green number is the specific thing
clause 9 exists to stop. Per task 6 both positions stand side by side and neither is marked correct.

---

## 2. The `merge-gate` dispatcher — installed, and RED on first execution

**Close condition: `git hook run merge-gate` dispatches `CHK-01` and `CHK-04`. Met, with a
correction to the command.**

```
git hook run --allow-unknown-hook-name merge-gate
  CHK-38 merge-gate dispatcher: dispatching CHK-01 tools/check_corpus_collisions.js
  CHK-38 merge-gate dispatcher: dispatching CHK-04 tools/ecr_verify.js oracle/REGISTER.lunar.tsv literature
  CHK-38 merge-gate dispatcher: BLOCKED by CHK-04 -- exit 1, a FINDING. on_failure=block
  CHK-38 merge-gate dispatcher: dispatched 2 of 3 jobs naming merge-gate
exit 1
```

Three files: `tools/githooks/merge-gate` (`CHK-38`), `tools/githooks/dispatch.js` (the engine), and
`tools/githooks/pre-commit` thinned onto it. `pre-commit` is regression-clean at 3 of 7 dispatched,
exit 0, unchanged from before I touched it.

### 2.1 `merge-gate` is not a git event, and the brief's P2 said the wrong thing about it

Not "does nothing" — **exit 1, `unknown hook event 'merge-gate'`.** A file at
`tools/githooks/merge-gate` is unreachable by `git hook run merge-gate`. The flag is not optional and
it is now in the register's `T` row, because **a dispatcher reachable only by a flag nobody wrote
down is a dispatcher nobody runs** — which is the same failure as no dispatcher at all, one layer up,
and it is the failure this whole sub-step was opened on.

### 2.2 The 1.13 ruling was not overturned; two different things were being conflated

At 1.13 I ruled `merge-gate` **kept and hand-operated**. The 2.20 brief reads "nothing installs a
dispatcher" as "the trigger is unwired". **Those are different failures with different fixes.** *Who
pulls the trigger* is unchanged — still the agent executing 2.5. *What the trigger does* did not
exist. An operator with no mechanism and a mechanism with no operator are both broken; this trigger
was the first, and the `T` row said so honestly. `invoked_by` on `CHK-38` is `manual`, not `git`, and
that is the same statement in the register's own vocabulary.

### 2.3 One engine, not two dispatchers

`dispatch.js` holds the membership test, the status rule, the argv rule and the exit classification.
**Two copies of one rule about one file is the second-authority defect, and it drifts silently
because each copy stays green against itself.** This is deliberately the opposite of my `check_registers.js`
ruling, where fifteen duplicated lines beat a hidden coupling: there the duplicated thing was a parse
of *two different files* that merely looked alike. Here it would be one rule about one file.

### 2.4 The reentrancy guard had to be generalised by this edit, not a later one

`CON-6` bounds a recursion `git hook run` does not bound; git sets no marker a hook can test. The
2.14 guard was one env marker in `pre-commit`. **A per-trigger marker bounds `pre-commit` inside
`pre-commit` and leaves `pre-commit → merge-gate → pre-commit` unbounded** — and I was the one adding
the second trigger, so the hole would have been mine. One marker, all triggers, plus a chain string.
Proved rather than asserted:

```
LUNAR_ORACLE_HOOK_DEPTH=1 LUNAR_ORACLE_HOOK_CHAIN=pre-commit node tools/githooks/merge-gate
  CHK-38 merge-gate dispatcher: REENTRANCY REFUSED at depth 2. Chain: pre-commit -> merge-gate
exit 1
```

The chain is printed rather than swallowed: **a guard that hides a recursion removes the symptom and
leaves the row that caused it looking fine forever.**

### 2.5 THE FINDING OF THIS SITTING, and it was found by running

`CHK-04` takes **two positional arguments** and the register had no way to say so. Dispatched bare,
`ecr_verify.js` throws an uncaught `TypeError` out of `readFileSync` and **node exits 1** — which
`check_register.md` §2 defines as *a finding about the content*. **A dispatcher that accuses the
corpus because an instrument was called wrongly is worse than one that does not run: it sends a
person to the wrong place with confidence.** Two blocking rows had named this trigger since 1.13 and
nobody could have seen this by reading either of them.

The argv had to come from somewhere and there were three candidates. Two are rejected **in writing**,
in the register, so the rejection is checkable rather than remembered:

- a tenth register column — a schema change to a promoted contract, during a freeze, for one row;
- **a table inside the dispatcher keyed on row id** — the exact second-authority defect the shared
  engine exists to prevent, and it is the convenient answer, which is why it is named;
- the cell that already says how the row is reached. **Taken.**

`invoked_by` now reads `<trigger>:<argv>`, which is not new grammar — `consumed:CHK-05` has been in
that column since 1.13. A row may name one trigger twice with two payloads, which is how `CHK-04`
covers both sidecars without becoming two rows. The long-run fix is `ecr_verify.js` knowing its own
declared inputs, and that file is not mine; it is relayed.

### 2.6 Merge-gate is red today, and I did not soften it

First execution, both sidecars: **359 failures — 134 `L4 leaf does not resolve`, 225 `B3/K2 key
occurs in no member`.**

- The **134** are the corpus not being merged yet. They clear when 2.5 lands.
- The **225 do not.** They are register content, owed under `AM-78`/`AM-79`/`AM-80` (lunar) and
  `AM-93`…`AM-97` (econ), belonging to two other seats in this wave.

**A blocking row that is red because the content is bad is the row doing its job.** The correct
response is to discharge the amendments, not to widen the gate. I considered a `--waive` flag and
did not add it: **a gate with a bypass is a gate nobody runs in gate mode**, and it would have been
apparatus added during a freeze to make my own instrument look green. If 2.5 must proceed against a
red merge-gate, that is a ruling for The Manager or the author, taken knowingly, and it is now
visible enough to take.

---

## 3. `.gitattributes`, and the `.gitignore` residual

**Close condition: `pre-commit` exits 0 clean and non-zero on a planted `.pdf`. Met.**

```
git hook run pre-commit                       -> exit 0, 3 of 7 dispatched
git add -f planted-source.pdf; git hook run pre-commit
  CHK-13 FINDING [EXTENSION] planted-source.pdf -- .pdf is a published-source carrier
  CHK-10 BLOCKED by CHK-13 -- exit 1, a FINDING. on_failure=block
                                              -> exit 1
```

### 3.1 `.gitattributes` — the third member of one family, and naming the family is the point

```
tools/githooks/** text eol=lf
*.js  text eol=lf
*.sh  text eol=lf
```

`git check-attr eol` returns `lf` on both dispatchers. `eol=lf` is stated in addition to `text`
deliberately: `text` alone normalises the **index** and converts back on checkout per the local
setting, which is the exact dependence being removed.

- **E1** — hooks are not cloned, so a hook in `.git/hooks/` is a mechanism for one machine.
- **HK-2** — a hook committed at 100644 is executable here and inert on a clone, because
  `core.filemode` is false here.
- **this** — a hook committed with CRLF is executable here and inert on a clone, because
  `core.autocrlf` is true here.

**In all three the content is committed and the trigger is metadata, and in all three the assertion
that the mechanism exists passes on the machine where it cannot fail.** The remedy is the same shape
every time: *put the property in the tree, not in the config* — which is `E12`'s content-versus-state
distinction arriving from a different direction. Recorded in `bootstrap_contract.md`, whose Phase 3
paragraph named this as an item "this sub-step does not own"; 2.20 owns it and it is now closed
there, with the diagnosis left standing and only the last clause made history.

**Narrow on purpose.** No `* text=auto`. A normalization pass over 108 tracked files during the merge
wave is a diff nobody can review sitting on top of the diff that matters. Verified before committing
to it: **zero tracked `.js` or `.sh` has CRLF in the worktree today**, so the rule is a no-op now and
a guarantee later.

### 3.2 The residual, and P4 was wrong about where the hole is

Added to `.gitignore` **and** to `CHK-13`'s `CARRIER_EXT`: `xls xlsx rtf odt ods odp`. The briefed
argument is right — **`.xlsx` and `.docx` are the same container format**, and a boundary that admits
one and excludes the other is arbitrary rather than principled. But the hole is at the repository
root and under `oracle/`, `tools/`, `cr_scratch/`; under `/literature/**` these were already ignored
by deny-by-default. **The exposed tree is the working tree, not the corpus** — which is where a merge
staging step actually writes, and the opposite of where P4 points a reader.

**What I did NOT ignore, and it is the considered half.** `zip rar 7z tar gz tgz` are in `CHK-13`'s
extension gate and **not** in `.gitignore`, on the `.txt` precedent already standing in that file:
*ignoring an extension with honest non-source uses hides the legitimate case silently; blocking it
names the file and a person rules on it in one line.* `CHK-13` blocks on `pre-commit`, so an archive
cannot be committed either way — the difference is entirely whether the person finds out. Two things
make archives worse than an ordinary admitted type: **an archive defeats both other gates at once**
(the magic gate sees a zip signature, not `%PDF`, and every extension inside is hidden from the name
gate), and 2.11 pulls ~224 MB in Wave 3 whose natural shape is one zip.

The probe now prints the boundary on every run — `CHK-37 blocked-but-not-ignored, by ruling: .txt
.zip .rar .7z .tar .gz .tgz` — because the asymmetry used to be one extension and is now seven, and
an asymmetry you must derive by differencing two lists is one that gets tidied away. Probe set 19 to
25 paths, 0 open.

---

## 4. `normalize()` rejects rather than renames

`oracle/NAMING.md` section 1 gains **step 0, a precondition, not an eighth step.** If the leaf's
final extension is not `.md`, `normalize()` **returns no value.** A leaf with no dot is also a
rejection — an inferred extension is a rename by another route.

**The numbering is the load-bearing part and it is the same argument as section 7's level 2B.**
`NRM-1` in `corpus_suite.md` and the header of `tools/merge_identity.js` both assert *the seven
steps, in order*. Renumbering leaves both sentences syntactically intact and semantically about a
different function. Step 0 either returns nothing or hands seven untouched steps a name they already
accept.

Why a rejection: step 2 strips exactly one trailing `.md` and step 7 appends `.md` unconditionally,
so `un-1967-outer-space-treaty.txt` normalized to `un-1967-outer-space-treaty.txt.md`.
**`normalize()` was a renamer that turned a published treaty text into something carrying the
extension of a summary this project wrote.** Nothing lands wrong today because the merge glob is
`*.md` — **and that is the hazard, not the mitigation: the safety is in the caller and the defect is
in the contract.** The caller that inherits the renamer will be the one whose glob is wider, because
a wider glob is the natural next change. A property of the naming contract is not fixed by a property
of one caller's glob. It returns no value rather than a flag, so a caller that ignores it fails on
the next line instead of proceeding with a plausible wrong name.

---

## 5. `CHK-01` can now see a document beside its own near-twin

`tools/check_corpus_collisions.js` walked `.md` **only**. The three UN treaty full texts and 112
source PDFs sitting in the same directories as their own summaries were not a different key — **they
were never walked.** Measured against the staged corpus:

| | before | after |
|---|---|---|
| `node tools/check_corpus_collisions.js _intake` | `146 summaries, 3 collisions`, exit 1 | `walked 261 files -- .md=146 .pdf=112 .txt=3`; **3 collisions, 115 near-twins**, exit 1 |

**The three known collisions reproduce byte-identically**, because stripping *one trailing extension*
and stripping `.md` are the same operation on a `.md` leaf. `A1`'s meaning is untouched; only the
walk changed.

Two classes, reported separately because they send a person to two different places: **COLLISION**
(members share an extension — one file to the retrieval layer; rename or delete) and **NEAR-TWIN**
(members differ — usually published source material, frequently also a `CHK-13` finding).

**One exception, named rather than inferred.** `.gitignore` declares `/literature/_pdf/` as the store
where source PDFs are filed *under the same taxonomy names as the summaries*. A pair separated by
that boundary is the sanctioned convention and reports as a NOTE. It is a **path-segment** test
against one declared literal, not a heuristic: **if the store ever moves, the line fails to fire and
the count goes up**, which is the direction an exception should fail in. Fixtures, run:

```
shelf/isru/x.md + shelf/_pdf/isru/x.pdf   ->  1 stored group, 0 findings, exit 0
shelf/isru/y.md + shelf/isru/y.txt        ->  1 near-twin,                exit 1
literature/ (empty)                       ->  walked 0 files -- (empty),  exit 0
```

The walk **prints its own composition on every run**. The defect this file carried for four sub-steps
was not a wrong answer, it was a scope nobody could see from the output: `146 summaries, 0
collisions` and `146 summaries out of 261 files, 0 collisions` are the same verdict and only one is
checkable. Same discipline as `CHK-37` printing its probe set.

`CHK-01`'s `asserts` cell was widened to match. **No new row** — a row whose cell describes a
narrower assertion than its artifact makes is the `CHK-13` container-versus-content pattern, and I
have now found that one nine times.

---

## 6. `oracle/NAMING.md` section 7 corrected against the author ruling

Delivered mid-sitting by the orchestrator and it outranks the brief. Section 7 said a file with no
citation block **"does not land until it has one."** Struck, and replaced by **section 7.1:
disposition governs HOW a file lands, never WHETHER it lands.**

- The identifier requirement is now a **recorded-field** requirement: where no key resolves at any
  level the field is written **`none`**, explicitly, and the file lands under its filename-derived
  key. This is the project's own rule arriving in the naming contract — **an omitted field is
  invisible and `none` is falsifiable.** A shelf of 176 files of which some record `none` is
  countable, greppable and correctable. A shelf of 150 with 26 withheld elsewhere is none of those,
  **and nothing in this repository would have reported the 26.**
- **Duplicate resolution is a pick, not a hold:** a recorded prior decision wins; else byte-identical
  means take either; else take the larger file. Clause 1 is what protects the weak key — a level-3
  match already adjudicated as two distinct documents is not a duplicate group and **both members
  land**. The loser is *recorded, not deleted*, in `_intake/superseded-duplicates/`, which is what
  makes the pick reversible. Measured instances: `azami-2024` and `csank-2022` are exact byte pairs;
  `metzger-2013` is 24,076 against 5,269 and **retrieval resolved to the 5,269-byte member every
  time**, which is the defect `CHK-01` exists for.
- **No check row added, deliberately.** It is a contract corrected against a ruling, and `CHK-01`
  already fails on the outcome the rule prevents. A second instrument asserting the same property
  from the other end is a second authority on what a duplicate is.

I also reconciled **section 2** rather than leaving it to contradict 7.1 silently. Section 2 refuses
a name that fails its namespace regex; that is not metadata about a document, it is *the address the
file lands at*, and the remedy is never exclusion — **fix the name, then merge.** The all-or-nothing
exit is what makes that an ordering rather than a withholding: it fails the whole run so the names
get fixed, instead of shipping 175 files and quietly dropping one. I added one requirement with it:
**a merge must report every failing name in one pass**, or "fix the name, then merge" becomes a loop
somebody runs until they give up.

---

## 7. What I declined to do, and why each refusal cost something

Recorded because a freeze is only real if the undershoot is visible.

- **No `--waive` flag on `merge-gate`,** although it would have made my own new instrument green on
  the day I shipped it. A gate with a bypass is a gate nobody runs in gate mode.
- **No fourth `HK` row** for line endings. `.gitattributes` is in the tree and `git check-attr eol`
  answers the question; a fourth row is a second place to look for one property.
- **No check row for section 7.1.** `CHK-01` already fails on the outcome the rule prevents.
- **No tenth register column** for `CHK-04`'s argv, and **no argv table inside the dispatcher.** The
  second is the convenient answer and it is the second-authority defect the shared engine exists to
  prevent, so it is named in the register rather than merely avoided.
- **No edit to `PTH-13`, `SLT-5`, `corpus_suite.md`, `run_suite.js`, `ecr_verify.js`,
  `merge_identity.js`, `lunar-oracle-gameplan.md`, `accumulator.md` or `QUANTITIES.md`,** all of
  which I found something in. Routed instead.

Allowance was **+2 check rows**; I took **+1**. `merge-gate` needed a row because a dispatcher with
no row is not a mechanism (section 7 landing rule). Nothing else did.

---

## Not mine

| # | Finding | Sub-step | Owner |
|---|---|---|---|
| N1 | **`oracle/tests/corpus_suite.md` holds 8 occurrences of the dead `literature/NAMING.md` path** — the largest concentration outside frozen `cr_scratch` record, and `PTH-13`'s own live set does not include it, so it does not report them | 2.20 / suite | **The Software Engineer (W2-2)** |
| N2 | **`PTH-13` cannot distinguish a pointer from a record.** It is at 3 and cannot reach 0 without destroying the relocation banner and `AM-153`'s finding text. Proposed fix in the relay: count the dereferenced TSV target columns, whitelist the banner **by name** per `NAMING.md` section 10 and `AM-143`'s own precedent | 2.20 | **The Software Engineer (W2-2)** |
| N3 | **`tools/ecr_verify.js` has no default input.** Bare, it throws `ERR_INVALID_ARG_TYPE` and **exits 1**, which a dispatcher must read as a finding about the content. Long-run fix: with no arguments, verify the promoted `oracle/REGISTER.*.tsv` manifest rows against `literature/`. My register payload is a stopgap | 2.20 | **The Software Engineer (W2-2)** |
| N4 | **`tools/ecr_verify.js`'s usage-error path exits 1, and its own header says 2.** Line 13 uses `exit 2`; the `argv[2] === undefined` path bypasses it. `check_register.md` section 2 names this file explicitly as the reason the 1-versus-not-1 distinction exists | 2.20 | **The Software Engineer (W2-2)** |
| N5 | **`SLT-5` fails: `corpus_suite.md declares 175 tests, counted 176`** | 2.20 / suite | **The Software Engineer (W2-2)** |
| N6 | **`CHK-04`'s 225 `B3/K2 key occurs in no member` failures block `merge-gate` and will NOT clear when the corpus lands.** 74 in `REGISTER.lunar.tsv`, 151 in `REGISTER.econ.tsv`. These are the owed rows `AM-78`/`AM-79`/`AM-80` and `AM-93`…`AM-97` | 2.5 precondition | **The Space Resources Engineer** (lunar) and **The Manager, Economics** (econ) |
| N7 | **`AM-144`'s note is now stale in its author's favour.** It says *"`tools/check_registers.js` HAS NO MANIFEST ROW … so a correction to it has nowhere to be recorded"* and files itself against `oracle/check_register.md` for that reason. The manifest row now exists. **The row's target should move to the file it is about.** I did not move it: it is his row and the note is his argument | 2.20 | **The Software Engineer (W2-2)** |
| N8 | **`lunar-oracle-gameplan.md:287` and `accumulator.md:498` each carry one live citation of the dead path** | 2.20 | **Orchestrator** |
| N9 | **`AM-129`'s residual is not closed and I did not mark it closed.** Two of its four live instances lose their cause with the three new manifest rows; the residual is a correction owed at a `cr_scratch` deliverable, which is not promotable by construction | AM-129 | **The Designer** |
| N10 | **`Q-TOOLS-MODE-644` is `class: live` at value 10; the command returns 15 today** (`git ls-files -s tools/` is 19 files, 15 at 100644, 4 at 100755). A live value moving is expected and is `CHK-17`'s report, not a defect — recorded so the next reader does not quote 10 as a literal. `QUANTITIES.md` is not in my write set and I did not regenerate | 1.13 block / index | **Orchestrator at the boundary** |
| N11 | **`CHK-12` (`tools/check_gitignore_map.sh`, `specified`) asserts the 24 rows of the 1.1 directory map agree with `.gitignore`. I added six lines to `.gitignore`.** The map has no rows for `xls/xlsx/rtf/odt/ods/odp` or for the blocked-but-not-ignored archive set. When `CHK-12` is built, the map is what it will disagree with | 1.1 map / CHK-12 | **Orchestrator** (the map lives in the gameplan) |
| N12 | **The `merge-gate` invocation requires `--allow-unknown-hook-name` and any assertion written against the bare form measures git's argument parser rather than the hook** | 2.5 | **The agent executing 2.5**, and **W2-2** if `run_suite.js` asserts it |

Relay written: `cr_scratch/relay/w2-3_to_w2-2_review_dispatcher_and_pth13.md` — **a REVIEW, not a
BRIEF.** The Software Engineer had already built `run_suite.js` when it was written, so it does not
discharge arm 2a and it does not claim to.

---

## Verdict

Four close conditions, all met, all executed rather than reasoned about:

1. `node tools/check_registers.js` → **0 FAIL, exit 0** (was 1 FAIL, exit 1).
2. `git hook run --allow-unknown-hook-name merge-gate` → **dispatches `CHK-01` and `CHK-04`**, and is
   **red** on 359 real failures in two register sidecars, 225 of which are somebody's owed work.
3. `git hook run pre-commit` → **exit 0** clean, **exit 1** on a planted `.pdf`.
4. `AM-153`, `AM-141` and `AM-57` discharged; `AM-138` and `AM-144` left `owed` and untouched.

**The one thing to carry out of this sitting**: two blocking rows had named `merge-gate` since 1.13,
and the first time anything dispatched them, one of them turned out to be uninvocable in a way that
would have reported an instrument defect as an accusation against the corpus. **Nobody could have
seen that by reading the row, the tool, or the register.** It is the same lesson as Wave 1's check
register that passed its own known-answer test and had never been run, and this is the second time
this project has learned it from the same direction. Running what we have still beats adding to it.

apparatus: check rows +1/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
