# Step 2 — The Manager's rewave

**Written 2026-08-28, replacing §§3–7 of `cr_scratch/step2_manager_open.md`.** The author read the
six-cycle plan and rejected its shape. He is right, and the evidence that he is right is in my own
Cycle A, which I will not restate as a defence.

---

## 0. What I concede, and the one part of the ask I am pushing back on

**Conceded, without reservation.** Six cycles was not six cycles of work. It was three cycles of work
and three cycles of *waiting for the previous cycle's output* — which is the assembly line he named.
Cycle B existed to hand the Engineer's dispositions to the seat that writes assertions against them;
Cycle F existed to reconcile a register that a Cycle D deliverable was already building against. Both
are handoff latency wearing a cycle's clothes. And my own §3.4 put the arm-2b split I invented on the
one pairing that most needs it — 2.4's assertions and 2.5's execution, in one seat, which the suite's
own `SLT-7` flags in writing as "arm 2b by construction." The author's structure fixes a defect my
structure created. Take that as the finding.

**Where I push back, and it is one sentence.** "A lot of the work plays off other work" is true of
the *findings* and false of the *writes*. Every one of Cycle A's five crossings was produced by a seat
**reading** material outside its lane; not one required a seat to **write** outside its lane. So the
waves collapse the conversation, not the write lock. Any structure that reads "same wave" as "same
file" reproduces the R-2/R-3/R-4 incident, where three concurrent agents over shared files observed
each other mid-flight and one invented `DIVERGED — DO NOT RE-LIFT` markers unprompted to contain it.
I will hold that line and I will hold nothing else.

---

## 1. The restructure — three waves, and why three

Not six cycles. **Three working waves plus the method's own Wave 2 review (A.4 step 5), which was
always going to run and which I am no longer counting as a cycle because it is not one.**

**Why three, and this is the load-bearing sentence of this document.** The wave boundaries are not
where the schedule runs out. They are **the two points at which the corpus becomes harder to un-do.**

- Before W2, nothing has been written into `literature/` and every decision is a row in a table.
- W2 writes the tree. After it, the taxonomy placement, the primary/secondary calls and the
  `## Provenance` blocks are on disk, and R7 says re-running the merge overwrites hand-made decisions
  with whatever the script computes from filenames that day.
- W3 annotates on top of the tree. After it, six passes of hand-assigned fields sit over the merge,
  and a merge defect found at that point costs all six.

Two irreversibility points, three waves. That is arithmetic, not preference. **The gate between W2 and
W3 is not a scheduling gate — it is the window in which the merge is still cheap to re-run,** and it
is the only reason W2 and W3 are not one wave with the Engineer holding `literature/` throughout.
Collapse that boundary and a merge defect is discovered under six annotation passes.

Six cycles → three waves. The Engineer's serial work is **not** shortened by this and I will not
pretend otherwise (see §5). What is shortened is the number of times five other seats wait on him.

---

### Wave 1 — "Merge day is safe"

**The problem this wave owns:** on the day a byte moves into `literature/`, every decision the merge
executes is already a committed row, every unsafe thing the merge could land is already blocked by a
mechanism that exists, and every check that is supposed to fire at the merge has a dispatcher that
invokes it. **Nothing in this wave writes into `literature/`.**

| Seat | What they do | Discharges | Declared write set |
|---|---|---|---|
| **The Engineer** | The **merge disposition table** — one committed TSV, one row per union file, carrying disposition, primary/secondary, target folder, field label, `## Also`. Lifts his three Cycle A instruments out of a fenced block into `tools/` (his own variance **D8**) | **2.2**, **2.3** (landing) | `cr_scratch/merge_plan.tsv`, `tools/merge_identity.js`, `tools/clusters.js`, `tools/doicov.js`, `cr_scratch/step2_engineer_dispositions.md` |
| **The Software Engineer** | Fills **`SLOT-A`** and **`SLOT-C`**; the manifest accessor and the read-digest (§4); discharges The Designer's four owed rows **`AM-137`**, **`AM-138`**, **`AM-141`**, **`AM-144`** and the tool version header | **2.4**, **2.13**, **2.19(b)** | `oracle/tests/corpus_suite.md`, `tools/quantities.js`, `tools/check_registers.js`, `tools/manifest.js`, `cr_scratch/step2_software_engineer_slots.md` |
| **The Systems Engineer** | The containment mechanism **and** the register rows that name it, in one head; the `merge-gate` dispatcher; **`AM-145`**; the four `NAMING.md` §7 precedence clauses The Engineer recommended and does not own | **2.14**, **2.20** | `tools/check_no_sources.js`, `tools/hooks/`, `.gitignore`, `oracle/check_register.md`, `oracle/bootstrap_contract.md`, `literature/NAMING.md` |
| **The Space Resources Engineer** | Reviews the seven lunar folders **of the table**, not of a proposal; routes the three UN `.txt` files; supersedes the forked `Q-LCC15-*` block | 2.3 review | `cr_scratch/step2_space_resources_engineer_review.md`, `REGISTER.lunar.tsv` |
| **The Manager** (economics prompt) | Reviews the four economics folders of the table; supersedes `Q-ECR-AXES`; the Denison recommendation | 2.3 review, **2.9** | `cr_scratch/step2_manager_econ.md`, `REGISTER.econ.tsv` |
| **The Fact-Checker** | The **A.10 step 2 gate** on `PRV-13`, `PRV-15` — the four flagged tests | suite → contract | `cr_scratch/step2_factchecker_gate.md` |
| **The Designer** | The `COUNTING_RULE.md` §3 rule 11 amendment that makes the read-digest a contract (§4) | 2.19(c) tail | `COUNTING_RULE.md`, `oracle/AMENDMENTS.tsv` |

**Author rulings W1 needs at its open, and they are cheap:** `PTH-9` — `literature/NAMING.md` is
itself returned by `listCorpusFiles()` as a retrievable literature source and fails `NAMING.md`'s own
A3; three ways out, all costed by the Software Engineer, none chosen because it is not his to choose.
Plus the two reassignments in §5. Asking for these at the wave open costs a sentence; discovering
them at the merge costs the merge.

**The Fact-Checker moving from the review wave to here is a defect correction, not a convenience.**
A.10 step 2 says the gate clears *before the reviewed suite becomes the contract.* My plan had her
running in Wave 2 — after the suite had been the contract for the entire step. That is the gate firing
after the thing it gates, and I wrote it.

### Wave 2 — "The tree lands, and it is checked while it is still cheap to re-run"

**The problem this wave owns:** execute the merge from data, and prove it before anything writes on
top of it. **The Engineer is the exclusive writer of the corpus tree. That does not change.**

What does change: **he merges into `cr_scratch/_stage/literature/`, not into `literature/`.** The
Software Engineer runs the suite and `SLOT-A` against the staged tree — a tree nobody is writing —
and only on his stated count, command and exit code does the Engineer promote it to `literature/` in
one move. Three things fall out of that and none of them are free elsewhere: a failed merge never
touches the real tree; the verifier reads a frozen tree, which is the read-set problem solved rather
than managed; and the merge stays reversible for exactly as long as it takes to check it.

| Seat | Discharges | Declared write set |
|---|---|---|
| The Engineer | **2.5**, **2.6** | `cr_scratch/_stage/**`, then `literature/**` on promotion |
| The Software Engineer | verifies 2.5 against the staged tree; fills **`SLOT-B`** | `oracle/tests/corpus_suite.md`, `cr_scratch/step2_software_engineer_merge_verdict.md` |
| The Systems Engineer | **2.17** divergence half, against the interface the Engineer publishes at wave open; **2.18** | `oracle/lib/corpus_divergence.js`, `cr_scratch/step2_systems_engineer_fork_policy.md` |
| The Designer | relay check at both wave boundaries; echo-site replacements | `COUNTING_RULE.md`, `cr_scratch/step2_designer_echo.md` |

### Wave 3 — "The corpus says what it is"

**The problem this wave owns:** every field a downstream consumer parses is populated and true.

| Seat | Discharges | Declared write set |
|---|---|---|
| The Engineer, serially, sole writer of summary bodies | **2.7**, **2.8**, **2.11**, **2.12**, **2.16**, **2.17** corpus half | `literature/**`, `literature/_pdf/**`, `oracle/verify_corpus.js`, `oracle/REGISTER.*.tsv` |
| The Fact-Checker | authors the **2.7 patch table** (file → `stated_as_of` → the date the source prints) | `cr_scratch/step2_factchecker_currency.tsv` |
| The Manager (econ) | authors the **2.8 patch table** (`provenance_depth` values) | `cr_scratch/step2_manager_depth.tsv` |
| The Software Engineer | fills **`SLOT-D`**; the CHK-03/CHK-05 consolidation he has never withdrawn | `oracle/tests/corpus_suite.md` |
| The Space Resources Engineer | `register_class` preservation across 2.16's rebinding (R13) | `cr_scratch/step2_space_resources_engineer_class.md` |

**The patch-table device is the answer to R14** and it is the only one I have. 2.7 and 2.8 are two
seats' *judgement* applied to files only one seat may *write*. Splitting the thinking from the writing
splits the work without splitting the write lock. It is the disposition table applied to annotation,
and it is the same shape twice, which is a point in its favour rather than against it.

---

## 2. Where the synergy actually is — named pairs, with the round trip each kills

1. **The Engineer (2.2) × the two taxonomy reviewers (2.3), W1, on one table.** Today the reviewers
   rule on folder boundaries not knowing which files are contested duplicates, and the Engineer
   adjudicates duplicates not knowing where the survivor lands. Cycle A proved they are the same
   question: `poston-2020` is a *content* adjudication whose loser is byte-identical to a queued
   re-import, and its folder decides whether the A7 collision fires at all. **Two-cycle round trip
   today (my Cycle B, then C). One table, one wave, now.**

2. **The Software Engineer (`SLOT-A`) × the Engineer (dispositions), W1.** The assertions are
   parameterized on the disposition table. In my plan the table lands in B and the assertions are
   written in C — a full cycle of latency, and written by the seat that then executes them. In the
   same wave, **a disposition with no assertion is a visible hole in a column**, and the arm-2b split
   is free rather than bolted on.

3. **The Systems Engineer (2.20) × the containment mechanism (2.14), one head, W1.** `CHK-13` names
   `tools/check_no_sources.js`; 2.14 says `oracle/check_no_sources.js`; `CL-1` makes either choice
   blocking until the register agrees. My plan built the script in Cycle D against a register
   reconciled in Cycle F. **That is building the instrument against a guess and fixing it two cycles
   later.** One seat, and the row and the file land together.

4. **Containment (2.13/2.14) pulled *before* the merge rather than after it.** The integration draft
   makes 2.13/2.14 depend on 2.5, and the only clause that genuinely does is "accepts the real corpus
   unchanged." Everything else is buildable now. There is **no repository-wide `*.pdf` rule today** —
   re-verified: `git check-ignore` says `x.pdf`, `docs/x.pdf`, `oracle/x.pdf`, `tools/x.pdf` and
   `cr_scratch/x.pdf` all commit — and 2.11 pulls 224,042,382 bytes of PDF. Building containment after
   the pull is installing the seatbelt after the drive.

5. **The Fact-Checker (W1 gate) × the Software Engineer (suite).** §13's four flagged tests are
   `UNVERIFIED` and the suite is *not the contract on them* until she runs. Everything W1 and W2 do is
   gated on that suite. She goes first.

6. **The Fact-Checker (2.7 patch table) × the Engineer (2.7 write), W3.** Her question is whether the
   stamp came from the source or from an mtime. Asked after he stamps, every wrong answer is a rework
   pass over `## Provenance` blocks — the one file set that admits a single writer. Asked as a patch
   table before he applies, it costs nothing.

7. **The Systems Engineer (`NAMING.md` §7) × the Engineer (2.2), W1.** The Engineer's identity run
   produced four precedence findings and could not act on any of them because §7 is not his: a level-2
   URL needs a path; a mirror-minted `10.13140/` DOI is not level 1; a landing page shared by two
   documents is a candidate and not a confirmation; **and the precedence has no level between 2 and 3
   for an agency report or grant number** — two of his eight same-source pairs were confirmed by one
   and had to be hand-adjudicated, and `sowers-2019`'s NIAC pair is confirmable *only* that way.
   Those four clauses are the rule 2.2 adjudicates the 39 no-identifier keys under. Under my plan the
   rule change and the adjudication that needs it were in different cycles, which means 2.2
   adjudicates under a rule everyone already knows is wrong.

8. **The Software Engineer (suite `FLD` group) × the Engineer (`INDEX-1`…`INDEX-5`), W1.** Two
   independent assertion sets over the same two artifacts — `literature/FIELDS.tsv` and `INDEX.tsv` —
   written in the same cycle by two seats who did not read each other, and **not yet reconciled**.
   `FLD-1` and `FLD-10` are RED because the files do not exist; `INDEX-5` is deferred to 2.4. That is
   two contracts on one artifact, which is how `CHK-13` got two paths. They reconcile in W1, in the
   wave where both are still cheap to change.

---

## 3. How quality goes UP

**M1 — the arm-2b split becomes structural, not remedial.** Assign **every** assertion sub-step to the
suite's author and **every** gated operation to a different seat: `SLOT-A`/2.5, `SLOT-B`/2.11,
`SLOT-C`/2.14, `SLOT-D`/2.16.

The suite's own slot table shows how bad the position is today, and it is worse than I wrote at the
open. `SLOT-A` is owned by The Engineer, who executes 2.5. **`SLOT-B` is also owned by The Engineer,
who executes 2.11** — a second arm 2b I did not name. `SLOT-C` is owned by The Software Engineer, who
under the ratified table also builds 2.14 — a third. **Three of the four assertion slots are written
by the seat that runs the operation they gate.** `SLT-7` already says so in writing about `SLOT-A`,
and the suite's author wrote it about a pairing I had assigned.

Under M1: `SLOT-A`, `SLOT-B` and `SLOT-D` go to The Software Engineer, who owns no merge output and no
pull; `SLOT-C` stays with him and **2.14's build moves to The Systems Engineer**, who is already
holding the bootstrap half and the register row that names the file. Arm 2b then cannot occur on the
four gated operations rather than being cross-checked after the fact. This reassigns 2.4, 2.10 and
2.14 against the ratified §2 table; **all three need the author's nod.**

**M2 — the cross-boundary finding becomes an output with a name.** Every wave deliverable carries a
required `## Not mine` section: findings this seat produced that belong to another sub-step, with the
number and the owner. Cycle A produced five of these by luck. An omitted section is invisible; an
empty one is falsifiable — which is the counting rule's own argument (`none` beats omission) applied
to findings instead of to numbers. The orchestrator routes them at the wave boundary and the routing
is a close item.

**M3 — the read-digest.** §4.

**M4 — the premise check, made the first line of every deliverable.** The Designer measured the
premise in his own brief and found it half wrong: the corpus is dense in `M13` and produces **zero**
`M8` findings over 176 files, because `M8` requires the literal string "N lines above." Ruling from
the unmeasured premise would have pulled four clauses out of a population that produces nothing.
Every wave brief now states its premises as numbered measurable claims, and the seat's first
deliverable line is the check. That cost him one command and it caught a four-clause error.

**M5 — three standing clauses in every wave brief, all three his, all three measured rather than
argued.** (a) A census must state whether its own file is counted — the declared file set went 75 → 76
→ 77 and goes to 253 post-merge, so a census is stale the moment it is written into a file inside the
set. (b) A quantity block's `unit` text before its first comma must not be a bare common noun: `M13`'s
exposure is a floor at 43 and Step 2 is the step that raises it, because Step 2 mints corpus-population
blocks whose natural nouns are `files`, `summaries`, `sources` and `folders`. One probe block reading
`unit: years, the span…` added five findings on its own. (c) A spawn prompt goes to
`cr_scratch/relay/spawn/` **before the agent runs** — a prompt written afterwards is a transcript and
does not discharge arm 2a. These are cheap, they are properties of what a seat writes rather than
things a seat must remember about the process, and I am putting them in the brief rather than in a
document an agent may not open.

---

## 4. The read-set problem, solved

Disjoint write sets are not disjoint read sets. `tools/quantities.js` and `check_registers.js` walk
the whole declared file set, so a measurement taken while another seat writes is not a measurement.
The Software Engineer's `--check` run measured The Designer's half-written file and gained a failure
that was not his; **he caught it by reading the failure line rather than by comparing counts, and if
he had compared counts he would have assigned the defect to himself.** That was luck.

**Chosen: the instrument stamps what it read. Digest, not window. And the remedy is not mine — it is
his.** In the same deliverable he filed a finding against `COUNTING_RULE.md` §3 rule 11: *the rule
requires a failure count to carry its command but not its moment.* That is the whole defect in one
line, written by the seat it happened to, and it says what to amend. I am adopting it verbatim as the
mechanism rather than inventing a Manager's version of it.

Every instrument that walks the declared file set prints, with its result, a **read manifest digest** —
the count of files read plus a hash over `(path, size, mtime)` for each. Two runs that disagree on the
digest are **not comparable**, and the tool says so. The orchestrator records the digest beside every
hard-failure count at every wave boundary.

**Why this and not measurement windows.** A window is a rule someone must remember to be inside, and
my own standing position is that a rule a person must remember to apply is not a process fix. The
digest is a property of the instrument: a mid-write measurement stops being *undetectable* and becomes
*self-refuting*. It also works for the case a window cannot cover — two measurements taken in different
sessions, where nobody knew a window was needed. Windows still exist as a courtesy at wave boundaries;
they are the backstop, not the mechanism. The digest is ~20 lines in a tool the Software Engineer
already owns (2.19(b), W1), which is why it is affordable.

**Two seats, one mechanism, and that is deliberate.** The Designer amends `COUNTING_RULE.md` §3 rule 11
to require the moment as well as the command; The Software Engineer implements the digest in
`tools/quantities.js` and `tools/check_registers.js`. The contract and the instrument are not the same
seat, which is the same rule this whole document is built on.

**Live evidence that it is needed.** The Software Engineer's ledger reports the post-A4 hard-failure
count as **13**; The Designer's reports **14**. Neither is wrong. They were taken at different moments
against a file set that moved from 76 to 82 entries mid-wave as five Wave 1 deliverables landed. Two
seats produced two figures nobody can reconcile from what is written, and reconciling them by argument
is exactly what the counting rule exists to prevent.

**And the staged merge is the same idea in the large.** W2's verifier reads a tree nobody is writing.

---

## 5. What I am NOT collapsing, and the two risks the author must rule on

**Not collapsed: the merge is single-writer.** 2.5 rewrites a whole tree and its failure mode is
silent. **What it costs:** in W2, four other seats work in `oracle/`, `tools/` and `cr_scratch/` and
none of them touch the corpus. Nothing is idle; nothing else is in the tree.

**Not collapsed: the `## Provenance` chain.** 2.7, 2.8, 2.11 and 2.16 all edit the same blocks in the
same files. One seat, serially, in W3. The patch tables split the judgement; they do not split the
write.

**Not collapsed: assertions precede the operation they gate.** The barrier goes; the ordering does
not. `SLT-7` still requires every `SLOT-A` assertion observed red against a broken fixture, dated,
before 2.5 runs — and now the seat that observes it is not the seat that runs the merge.

**Not collapsed: R14 is not fixed.** Rewaving does not shorten the Engineer's serial path. He still
holds 2.2, 2.3, 2.5, 2.6, 2.7, 2.8, 2.11, 2.12, 2.16 and half of 2.17. The patch tables move two
seats' judgement off him; the writing stays.

**Risk 1, for the author — the reassignments.** M1 moves 2.4 and 2.14 off their ratified owners.
Upside: arm 2b, which produced seven of Step 1's nine relay errors and every wrong verdict, becomes
structurally impossible on four gated operations. Downside: two owners in the §2 table he ratified
change, and the Systems Engineer takes on a build he did not scope. **His call. I recommend taking it.**

**Risk 2, for the author — the one place I am accepting real exposure.** In W1 the Software Engineer
writes `SLOT-A` against a disposition table that is still being written. A table row that changes
after the assertion is written produces an assertion that is right about a row that no longer exists.
My old structure prevented this with a cycle boundary and paid a full cycle for it. **Mitigation:** the
table is append-only within the wave, every changed row bumps a revision column, and the Software
Engineer's `## Not mine` section lists every row he asserted against by revision. That is a detection
mechanism, not a prevention mechanism, and I am calling it that rather than dressing it up. If the
author would rather pay the cycle, say so and W1 splits at that one seam.

---

## 5b. Three rulings Cycle A routed to me by name, ruled here rather than carried

**The six unowned quantity ids.** `Q-MAX-SUMMARY-BYTES`, `Q-MIN-INTAKE-PDF-BYTES`, `Q-PDF-UNDER-500K`,
`Q-QCHECK-FAILURES-BASE`, `Q-CORPUS-SUITE-TESTS`, `Q-PDF-IGNORE-OPEN` — measured by the Software
Engineer, checked against the 64 ids in `QUANTITIES.md`, no collision, and left unminted because
minting them would stale the index and gain a hard failure his own `CNT-8` forbids. **Assigned:
2.19(b), The Software Engineer, W1**, minted in the same edit as the index regeneration so the two
land together and `M6`/`M7` never separate. That is the whole reason they were left unowned, and it
dissolves once one seat holds both.

**The 143-site `AM-` rewrite.** The Designer declined it deliberately and routed the decision to me.
**Ruled: declined, permanently.** 107 of the 143 sites are frozen Step 1 deliverables belonging to four
other seats, and rewriting them would make the record say something it did not say on the day it was
written. The dated boundary of 2026-08-28 plus the mechanical discriminator is the mechanism; `D4` is
the falsifier and it is his, and if it fires the expensive rewrite comes back to the author with a
price attached rather than being taken quietly now.

**`QUANTITIES.md` regeneration is a wave-boundary action, not a seat's.** He handed back `M6` and `M7`
rather than regenerating an index while two seats held writes, which was right. **Ruled: the
orchestrator regenerates at every wave boundary, with the read-digest recorded**, and no seat does it
mid-wave. Note what regeneration exposed: the index of record now asserts `Q-ECR-AXES` = 17 against a
register whose own `H` row declares 18, and `Q-LCC15-DISTINCT-LEAVES` = 58 against 59. **An addendum
that re-declares an id rather than superseding it does not update the index, it forks it, and the fork
resolves silently in favour of the stale copy.** Both owners spawn in W1 and both fix it there. Two
amendments settle three of the twelve standing failures, which makes it the cheapest close in the step.

---

## 6. The productive tensions — where each fires

Co-location is the risk. Two seats in one wave who read each other's work can converge, and A.9
forbids resolving these. **The guard is uniform: paired seats never co-author a file, and each wave
brief names the pair's disagreement as a required output.** A pair that reports agreement on every
point reports *that*, in writing, and it is a falsifier (§7 H3).

- **Software Engineer × Systems Engineer.** Fires in **W1** on 2.14/2.20: does the containment
  mechanism earn its keep against does the check register hang together — and they now hold opposite
  halves of the same object, which is the sharpest form this tension has taken in the project. Fires
  again in **W2/W3** on 2.17: is `verify_corpus.js` a fourth authority on corpus state beside
  `quantities.js`, `check_registers.js` and the check register itself. Separate files, both positions
  to the author, never a joint deliverable.
- **The Manager (econ) × The Space Resources Engineer.** Fires in **W1** on the taxonomy folder
  boundary, on the same table, which is where it should have fired all along. Fires again in **W3** on
  R13: `register_class` (`two_sided` / `false_pair` / `one_sided`) carries the disagreement **in the
  data**, `ECR-15` and `ECR-16` state both positions and mark neither correct, and 2.16's rebinding can
  flatten it without anyone noticing. `SLOT-D` asserts class preservation. His to check at the close.
- **The Fact-Checker × The Designer.** Fires at the close. He asks whether every echo site agrees; she
  asks whether any of them corresponds to a source.

---

## 7. The close, and the falsifiers on this restructure

Close items 29–37 of my open stand unchanged. Three added:

38. **Every wave deliverable carries a `## Not mine` section**, empty or filled, and every filled
    entry has a recorded disposition at the wave boundary.
39. **Every measurement in the record carries the read-digest of the tree it read**, and no two
    compared figures carry different digests.
40. **No assertion sub-step and the operation it gates share a seat.** Four pairs, checkable by
    reading the assignment table. Three of the four violate this today.
41. **`M15` reports `k > 2` relay files and the four `SLOT` rows read `FILLED (n)` or
    `DECLINED (reason, owner)`, never `EMPTY`.** That is close item 19 discharged and `SLT-2` held.
42. **`tools/check_registers.js` prints `OK AMC-2`.** Close item 24 is not dischargeable until it
    does, and I am not accepting "renamed, pending the tool" — which is the same conditional-close
    language I refused twice at Step 1.

**H1 — the routing.** *If a wave boundary is crossed with an unrouted `## Not mine` entry*, the
section is theatre; the routing becomes an orchestrator checklist item with a name, not a seat's
good intention.

**H2 — the collapse.** *If W3 contains writes into `literature/` that are corrections to the merge
rather than annotations on top of it*, the W2 verification gate did not do its job and the merge and
the annotation pass needed a third irreversibility point between them. Measurable: classify every W3
write as annotation or correction.

**H3 — the tension.** *If the Software Engineer and the Systems Engineer report no disagreement in
W1*, co-location smothered the tension and the pair goes back to sequential review, whatever it costs.

**H4 — staging.** *If the staged tree is promoted with no defect having been caught in staging*,
staging bought nothing and next time the merge runs in place with the verifier reading a stashable
tree. I expect this one to survive; I am stating it so it can fire.

**H5 — the whole restructure.** *If three waves produce more elapsed time or more rework than six
cycles would have*, the author's premise was wrong and mine was right — and I will say so with the
numbers, because the point of writing this down is that it can come out either way.

---

*The Manager. Six cycles to three waves, and the boundaries sit at the two points where the corpus
stops being cheap to un-do rather than where the schedule runs out. The arm-2b split that my own plan
inverted is now structural on four gated operations. Cycle A's five crossings become a named section
rather than a stroke of luck. The read-set problem is answered by an instrument that stamps what it
read, because a rule someone must remember is not a process fix. Two risks routed to the author, both
named, neither absorbed. Nothing quietly dropped: the merge is still single-writer, the Provenance
chain is still one seat, and R14 is still not fixed.*
