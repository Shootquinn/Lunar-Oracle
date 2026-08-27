# Step 1 — The Manager, final close

**Project:** Lunar Oracle
**Date:** 2026-08-27
**Sub-step:** Step 1 final close (A.4 step 7, third and last pass)
**Author:** The Manager
**Duty:** rule whether Step 1 goes to the author; rule the eighth orchestrator relay error and what it
says about the remedy I ruled in at the re-close; state what the author decides at the gate; state what
Step 2 inherits and what I will test at its close.

I refused this step twice. Both gate items I set are discharged. This pass closes it.

Every number below was produced by a command I ran in this session, after both discharges landed and
with nothing else writing. Where a figure is somebody else's, I say whose and whether I re-ran it.

---

## 1. Verdict

**Step 1 closes. It goes to the author.**

Fifteen sub-steps, all fifteen delivered, seventeen artifacts promoted to their target paths, two
checkers running over them, one of them red at twelve held failures, every one of the twelve carrying
an amendment row, and a queue of sixty-four owed edits that is visible, addressed and counted.

**Not a conditional close, and nothing is deferred into Step 2 as a condition of it.** Three residual
defects surfaced during this ruling. I corrected all three inside this pass rather than route them,
and §2 says what they were, what they now read, and why correcting was the right act rather than a
third refusal. Two further defects were minted as amendment rows because they belong to seats who own
the files; they are queue, not gate, and §2 says why.

### The measurements, taken by me at the close

```
node tools/quantities.js --check       exit 1   FAIL lines 12   NOTE hard failures: 12
node tools/check_registers.js          exit 0   FAIL lines  0   NOTE hard failures: 0
node tools/quantities.js --lint        exit 0   NOTE M15 6 untagged relays across 2 relay files
oracle/MANIFEST.tsv    H row declares 20; 20 D rows; 18 distinct target paths; 17 promoted, 3 superseded
oracle/AMENDMENTS.tsv  H row declares 135 / 64; 135 A rows; 62 applied, 64 owed, 5 superseded, 4 declined
```

Failure lines are counted with `grep -cE '^ *FAIL '`, the tool's own failure prefix. Both registers
were checked against the size they declare about themselves rather than against a number I remembered.

### The twelve, attributed by reading the manifest

The count went **up**, from eleven to twelve, and the seat who caused it said so in his own §0 before
anyone asked. That is the most important single fact about C-1 and I am recording it as a result rather
than as an exception.

**Three of the twelve name a promoted authority.** I derived that by extracting the seventeen promoted
target paths from `oracle/MANIFEST.tsv` and matching each as a fixed string against the twelve failure
lines — not from a list, and not from a column guess:

| Count | Path | Disposition |
|---|---|---|
| 2 | `QUANTITIES.md` | Generated. `M6` asserts the committed index equals the regenerated index, and passes; the index is a faithful projection of a duplicated block set and self-corrects when the duplicates close. Symptom, not defect. |
| 1 | `oracle/bootstrap_contract.md` | **The authority carries the correct value.** `Q-DEGRADED-MODES` is 5 at `bootstrap_contract.md:525`; the stale 6 exists only as recitations of the old block text inside code spans, in two frozen review documents whose authors were arguing the old value was wrong. `AM-132`. |

The other nine are duplicate ids and value collisions in the 1.9 and 1.10 addenda, which re-mint
quantity blocks rather than editing in place. **All ten distinct quantity ids across the twelve lines
carry at least one row in `oracle/AMENDMENTS.tsv`**; I checked each by id.

### The twelfth failure is a result, not a regression

Landing `AM-19` made `Q-DEGRADED-MODES` fail `M3`, because `M3` has no reading for a **recitation of a
superseded value**. The Systems Engineer checked both escape routes rather than assuming them shut —
`COUNTING_RULE.md` §4's `pending:` form does not suppress `M3`, and check `AM-3` forbids an amendment
whose target is not a manifest row, which a `cr_scratch` review document is not. He then minted
`AM-132` against the counting rule and **declined to edit another persona's frozen argument to make a
number go down.**

That is the correct disposition and I am ruling it so explicitly, because the alternative is a project
where every checker is green and the greenness was bought by editing the evidence. Two of the eleven
pre-existing failures have the same shape, which is what makes this the rule's gap rather than his
edit's. **Twelve red with the reason named and owned is a better state than eleven red with a
correction quietly reverted.**

### C-1, verified rather than accepted

I read the promoted text. `oracle/bootstrap_contract.md` §2 now defines `ABORT` as *"The bootstrap
stopped before Phase 6"*, the contradicting second sentence is gone, the cause form
`ABORT (<phase>, <assertion-id>)` is specified at §2 and used at all four §3 `On failure` clauses;
`usable` is defined at §5 and closed; §5 reads *"Five, closed"* and `missing-recoverable` is a Phase 3
transient with every resolution path enumerated; `Q-DEGRADED-MODES` is 5 and `Q-BLOCKING-MODES` keeps
value 3 with its predicate and population corrected over 5, both carrying `superseded` entries; BC-4's
origin consumer is named. `oracle/install_state.md` rule 4 is qualified by parent nullability and a
second published fixture exercises it. `oracle/MANIFEST.tsv:19` names a checker that exists.

Ten rows moved to `applied`, each marked only after the promoted text was changed and read back. One
row, `AM-23`, stays `owed` **and its cell says which clause landed and which did not**, because three
of its remaining clauses move a quantity that must land in one edit with `AM-24`. That is the correct
handling of a partial discharge, and it is the exact opposite of the failure that created this gate item.

### C-2, discharged, and it was worse than I found

The gameplan's Step 1 table holds fifteen rows, 1.0 through 1.14, and its preamble says fifteen. The
preamble now names `oracle/MANIFEST.tsv` as the authority on the path-to-file join rather than the
table column. The progress entry states that everything is promoted. `grep -c "1\.14"` is nonzero.

Three residual cells were still wrong when I measured them. §2.

---

## 2. The three cells I corrected in this pass, and why I did not refuse a third time

A gate whose criteria grow at each close is not a gate. My two done-when tests were met. The right act
on finding three more defective cells in an index of record was therefore **not** a third refusal, and
here is the reasoning that decides it rather than a preference:

**Every refusal cycle adds two crossings of the boundary where this project's defects happen.** A
refusal is an obligation list relayed out and a claim of discharge relayed back. Nine of this step's
recorded errors live at exactly that crossing. Routing three verified one-line factual corrections
through it, in order to reduce the count of errors made at it, is a control action that increases the
variable it targets. So: **the seat that detects a defect in a cell whose correct value it has
measured, fixes that cell and records the measurement.**

This is not licence to edit anyone's work. The line is the one The Systems Engineer drew at C-1 §4 and
I am adopting it as the rule: **you correct a false measurement in a shared factual index; you do not
touch another persona's argument.** The gameplan progress log is the first kind. A frozen review
document is the second. He refused the second and was right to. I did the first.

| Cell | Was | Is | Measured by |
|---|---|---|---|
| Gameplan preamble — the sentence added at C-2 to stop remembered-list filters | "it holds **47 targets**" | "20 `D` rows over 18 distinct target paths, 17 of them `state:promoted`", with the command in the sentence and the `H` row's self-declared 20 cited | an `awk` over the `D` rows of `oracle/MANIFEST.tsv` |
| Gameplan progress entry | "**All fourteen** have deliverables in `cr_scratch/step1_*.md`" — three clauses after "Fifteen sub-steps", in the same cell | "All fifteen have a deliverable on disk: fourteen are persona deliverables under `cr_scratch/step1_*.md`, and 1.2's is `cr_scratch/step1_author_rulings.md`, the author's own ruling, the sub-step having no work by its own row" | `ls cr_scratch/step1_*.md`; the 1.2 row's own Deliverable cell |
| Gameplan progress entry title | `1.0-1.13` | `1.0-1.14` | The C-2 row's own text, which named this and whose done-when did not |

**47 was in the sentence about not writing numbers from memory.** It is not a census of that file by
any reading; it is the file's line count less one. It stood in the index of record from the moment C-2
was written until this close.

**The third cell is the R-2 failure, exactly, one level up.** The C-2 row's What column listed four
things and its done-when column tested three. The untested one is the one that did not land. I wrote
both columns. That is a defect in how I write gate rows and I own it: **a done-when that does not test
every clause of its own What is an invitation to discharge the tested part.** It is check 23 of §6.

### Two more, minted as rows rather than corrected, because they belong to their owners

- **`AM-134`, to The Designer, against `COUNTING_RULE.md` §9 `M15`.** My own corrected sentence
  produced `LINT M15 lunar-oracle-gameplan.md:258 relays 18 distinct ... the id is Q-ECON-REFS-ABBREV`.
  It is not that quantity: `M15` pairs a bare numeral with the word after it and never checks that word
  against the id's unit. The **detection** is right by rule 12 — an ungoverned numeral in a relay file —
  and the **attribution** is false. I did not reword my sentence to silence it; that is editing text to
  move a number, which is the thing this project keeps refusing. `M15` is the only mechanised part of
  common-cause arm 2, and a lint that names wrong ids is a lint that gets switched off.
- **`AM-135`, to The Systems Engineer, against `oracle/bootstrap_contract.md` §4.** The `On failure`
  cells for BC-1 and BC-2 read bare `ABORT` while §2 as amended requires the cause form and all four §3
  clauses carry it. Two of nineteen BC rows; the other seventeen do not name `ABORT`. I read every cell
  rather than sampling. Not blocking — a cell naming the outcome class is true — but it is the echo
  class this step gated on twice, and it belongs in the queue rather than in a paragraph.

`oracle/AMENDMENTS.tsv` is 135 rows and 64 owed after both; `node tools/check_registers.js` still exits
0 with zero failures, and `--check` is unchanged at twelve.

---

## 3. Relay error 8 — the ruling, and arm 2's remedy is mis-specified

### The instance

Error 7 was a filter over a file set written from three paths typed from memory. It was corrected, and
the rule *"a filter over a file set reads the manifest, not a remembered list"* was written into the
verification log **by the seat that had committed the error**. The very next measurement extracted the
manifest's targets **with a guessed column**, matched the single letters `H` and `D` — the type column
every row starts with — and reported seven spurious promoted-authority hits. Caught before it reached a
verdict, and only because the output was visibly absurd.

And then error 9, which I found at this close: the sentence written *into the gameplan as part of that
same repair* carries a fabricated count of the manifest's own contents.

### Common cause, and the freshness of the rule is what proves it

The test for special cause is whether anything distinguishes the instance. The candidate distinguishing
feature is *"the rule had just been written."* **That feature cuts the other way.** It removes the only
special cause anyone could plead — that the seat did not know the rule — and it removes it completely:
the seat had authored the rule, in the same document, minutes earlier. A rule known, freshly authored,
endorsed, and broken immediately is the strongest available evidence that **knowledge of the rule is
not the controlling variable.** Common cause, and I will not be offered a cleaner demonstration of it.

There is a second common-cause signature and it is decisive. **The seat obeyed the rule's letter.** It
did read the manifest. The rule specified the *input* and said nothing about the *instrument*, and the
instrument is where the error was. A remedy that a conforming act can defeat is not a remedy.

### The class was mis-split, and that is why the rule cannot work

Arm 2 has been carrying nine instances under one description — *a number crossing a boundary between
seats without the relaying seat running the operation that produces it.* **That description is true of
six of them and false of three.**

**Arm 2a — relay.** Errors 1 to 6. A seat repeated a number **somebody else produced** without running
the operation: "ten of nineteen" FA files, the lunar register passing, E10's two pushes, the helium-3
total, "thirteen amendments", "every file is CRLF". The remedy *run the operation yourself* is exactly
right here, because the seat ran no operation at all.

**Arm 2b — instrument.** Errors 7, 8 and 9, plus the four already logged as verdict-reading harness
errors: a `grep -v` that deleted the only real failure line; a block extracted with the wrong `END`
marker; a case-insensitive substring that matched "failures 0"; a zero-match `grep -c` exit that
silently truncated a chained sweep. **In every one of these the seat did run an operation.** It ran an
instrument it had just written, once, and used the first output as a result. The remedy for 2a does not
touch 2b, and telling somebody who ran the operation to run the operation is not advice.

**Seven of the nine, and every wrong verdict this step, are 2b.** Arm 2 has been carrying the label of
the smaller and better-understood half.

### Is arm 2's remedy mis-specified? Yes — by my own standard

My method is that **a rule a person must remember to follow is not a process fix.** Both standing rules
I wrote for arm 2 — the number rule, and rule 12's extension to obligation lists — require a person to
remember, at a moment of their own choosing, to do an extra thing. Error 8 is the controlled experiment
on that class of remedy, and the result is unambiguous: memory of the rule was maximal and the defect
recurred within one measurement.

**What the rules actually are: a definition of conformance and a measuring instrument, not a control.**
They earn their place. Before them these errors were invisible; now there are nine numbered instances
with mechanisms attached, which is why this ruling can be made at all. I am keeping both rules and
withdrawing the claim that either is a remedy. **Naming a defect class is measurement. The point is
that you cannot inspect quality in, and I have been inspecting.**

### The two remedies that are process changes — both cheap, both testable

**For 2a — put the boundary artifacts inside the mechanised population.** `M15` fires on untagged
relays and reaches two files, and all six relay errors happened at the three boundaries it cannot see:
spawn prompts, messages to the author, spoken summaries. The instinct has been to build a mechanism
that reaches out to them. **The cheaper change is to move them in.** A spawn prompt written to a file
under a declared path is in `M15`'s population by construction; a verdict sentence written into the
verification record before it is spoken is in it too. Nobody has to remember anything: the artifact
changes location and the existing tool covers it. That is the whole of the fix, and it costs a directory.

**For 2b — every register here already declares its own size, and that declaration is a known-answer
test nobody is using.** `oracle/MANIFEST.tsv`'s `H` row says 20. `oracle/AMENDMENTS.tsv`'s says 135 and
64. `QUANTITIES.md` declares its size and `M7` checks it. **An extraction from the manifest that returns
seven single letters is refuted in one line by the file it read**, and an extraction reporting 47 is
refuted by the same line. The `H` row exists for precisely this and was consulted in none of the three
errors.

So, as a property of the artifacts rather than a rule to remember: **an ad-hoc extraction from a
register is not used until it has been checked against the size that register declares about itself.**
And the reason people write ad-hoc extractions is that there is nothing else to write:
`tools/quantities.js` has `--files-only`; the manifest has no accessor at all. **Give the manifest one
accessor and the hand-typed filter has nothing to be typed instead of.** That is the structural half,
it is one small tool, and it is Step 2 work with an owner.

### The falsifier on my own ruling

**If Step 2 puts spawn prompts into a declared file set, gives the manifest an accessor, runs `M15`
over both, and errors of this family still occur at Step 1's rate**, then the channel was not the
mechanism, the defect is in the seat producing the number rather than in where it is written, and the
honest next move is the verifier-of-the-verifier this project has named three times and built once —
`oracle/VERIFIED.tsv`, which has five rows and no column for who ran which operation.

---

## 4. What the author must decide at the gate

**Only three of these are his.** The rest is the team reporting what it has already ruled. He can
overturn any of it, and he should be told which is which rather than handed nine questions.

### He decides

1. **Does Step 1 close and does Step 2 open?** Fifteen sub-steps delivered, seventeen artifacts
   promoted, two checkers, one red at twelve held and rowed failures. This is the only decision that
   cannot be made without him.
2. **Does he accept a body of law with sixty-four owed edits against it?** The alternative is a step
   that runs until the queue is empty, and the queue is not a backlog — it is the design working, and it
   will never be empty while the project is alive. What he is accepting is that an owed edit is **data**
   rather than a memory. If he wants a different threshold, this is the moment to set it.
3. **Does the twelve stay red into Step 2?** Nine of the twelve are the addenda's re-minted blocks; two
   are a generated index that self-corrects; one is `AM-132`, a real gap in the counting rule that makes
   every supersession of a quoted id permanently red. My ruling is that red-with-rows is the honest
   state and closing it is Step 2's. He can require green first. He should know that requiring green
   first, with `AM-132` open, can only be satisfied by editing two frozen review documents — which is
   the thing the team refused, and refused correctly.

### The team has already ruled; he is being told, and one cell overturns each

- `oracle/REGISTER.tsv` will never exist. The sidecar is a **set** of files, one `basis_root` each,
  joined at load (`AM-98`; The Systems Engineer, concurred independently from the schema side).
- `Q-CHECK-ROWS` moved `fixed` to `live`: a self-declared size row is a checksum, not a quotation
  (`AM-108`).
- The answer-contract version names a **state of the file**, not a count of changes (`AM-66`).
- `AM-1` is **a report and not a check** (`AM-109(b)`, The Designer ruling against his own spec).
- The `app_surface` tier ruling: yes, on measurement, with the boundary stated (The Engineer, 1.14).
- Promotion is by marked block and the promoted file is the authority (my §5.4 at the first close).
  `AM-111` records that twenty-two governed quantity blocks describing three promoted contracts still
  live only in `cr_scratch`, and moving them is Step 2's.

### He is not being asked to approve

- The merge of the two register namespaces. That is 2.16.
- Any loop code. None exists.
- The corpus. Step 2 builds it.
- Any figure in `QUANTITIES.md` as final. It is generated, and two of its values are stale by
  construction until the addenda duplicates close.
- Finished text. He is approving **a body of law and the machinery that enforces it, with its edit
  queue visible and counted.**

---

## 5. What Step 2 inherits — final

Step 2 is the merge: eighteen sub-steps, `literature/` is built, the corpus lands, and counts are
measured for the first time with their rules attached. It is this project's primary assignment. It
opens against the state below, which is the state at this close and not the state Step 1 planned for.

**The law.** Seventeen promoted artifacts at their target paths, listed in `oracle/MANIFEST.tsv` — 20
`D` rows, 18 distinct paths, 17 `promoted`, 3 `superseded`. The manifest answers *where is this
contract's review history* in one `grep`. `oracle/AMENDMENTS.tsv` holds **135 rows, 64 owed**, checked
by `AM-1` to `AM-5`.

**The tools.** `tools/` holds ten files. `quantities.js` and `check_registers.js` are new; the first
exits nonzero at twelve, the second clean. `ecr_verify.js` runs clean over both register halves
separately.

| Inherits | What, at the close |
|---|---|
| **2.1** | `literature/NAMING.md` promoted, 176/176 names passing. E14 rewritten: root length broke the clone, not the filename; the fix is a path budget split between root and repo-relative. The 14 FA renames plus one prefix and two case fixes land when `findings/` is created, and that sub-step must state where `findings/`'s naming authority lives. |
| **2.14** | `tools/quantities.js` exists, so 2.14's job is the **invocation point**, not the tool. `CHK-09` is split into `--register` and `--wiring`; `CL-8` added. `AM-57`'s `.gitattributes` lands **before** any hook: all ten tracked files under `tools/` are `100644` with `core.filemode=false` here, so a hook committed as-is is inert on a Linux clone and green on the author's machine. `CHK-29` is `report`, `session-start` only. |
| **2.15** | `ecr_verify.js` must **re-derive** its `require()` of the upstream tokenizer rather than lift it; `check_register_rows.js` hard-codes an absolute Windows path at line 3. `CHK-03` came off the gate at R-2. Two lunar axes name `check_register_rows.js` as their `operation:`; re-pointing them may move their values. |
| **2.16** | 33 axes across two `basis_root`s. **The merge is ruled and is not a concatenation.** Both halves run clean separately; their concatenation produces 143 failure lines, which is the ruling's evidence. `register_class` must not collapse. Two same-author near-duplicate pairs are unregistered and silent, and `B6` fires as a false positive the moment either gains a member; the 1.9 addendum carries the test. |
| **2.17** | `oracle/install_state.md` with `S1` **and** `S2` applied: parse gate and shape gate split with the branch interleaved, rule 4 qualified by parent nullability, and two published fixtures where the second is the interrupted-sequence case. `AM-133` is open against it — the `ST-` assertion namespace is used at §3 and §6.4 and enumerated nowhere. |
| **3.2** | `C1` live and verified by running the router. `valueModel` lives in the `VALUE-CORE` island at `lsei/index.html` 7797–8448 and `app_model.js` never opens it; `margin_prop` is not among `model()`'s 26 output keys. `FIX-9` and `FIX-10` are **RED on purpose**, both failing on one mechanism, their close conditions being their own runs. |
| **3.8b** | `oracle/lib/claim_bearing.js`, the single implementation of answer contract §7. |

**Owed to the record — all cheap, none optional, all now rows or corrected cells.**

- The twelve `--check` failures, every one carrying an amendment row. Nine are the addenda's re-mints;
  two are the generated index; one is `AM-132`.
- **`AM-132`** — `M3` has no reading for a recitation of a superseded value. Until it is ruled, every
  supersession of a quoted id is permanently red from the moment the correction lands. The Designer's.
- **`AM-133`** — the `ST-` namespace is used and never enumerated. The Systems Engineer's.
- **`AM-134`** — `M15` names wrong ids because it does not check the unit. The Designer's.
- **`AM-135`** — BC-1 and BC-2's `On failure` cells do not carry the `ABORT` cause form.
- **`AM-111` at its true scope: three files, twenty-two governed blocks**, all twenty-two ids named in
  the row. It rides `AM-102`.
- **`AM-23` is partially discharged and stays `owed`**; three of its clauses must land in one edit with
  `AM-24`. **`AM-22`/`AM-10`**: BC-5's command still depends on BC-4 inside a phase whose own text says
  its facts are unordered and decide nothing.
- **`CLAUDE.md`'s read sequence still does not name `cr_scratch/step1_orchestrator_verification.md`.**
  `grep -c` returns 0, measured at this close, and the gameplan tells the reader it is the first thing
  to read.
- **`COUNTING_RULE.md` and `QUANTITIES.md` sit at the repository root with no directory-map row.** The
  Systems Engineer owns the map.
- **The accumulator's own header states a seat-attributable file count that goes stale every time a
  file is written to `cr_scratch/`.** It says 23; the counting rule it states now yields **29**,
  measured at this close. That is the `M15` class inside the accumulator, and it is why the fix is a
  computed tag rather than a habit of updating.
- **The `AM-` namespace collision is not closed.** Checks `AM-1` to `AM-5` and rows `AM-01` to `AM-135`
  share one prefix. C-1 worked around it by writing "check `AM-n`" and zero-padding every row
  reference. A convention one seat follows is not a rename.
- The loose-ends register still violates its own closed status vocabulary.

**Standing rules this step earned**, kept as conformance definitions and not mistaken for controls: a
number does not cross a boundary unless the relaying seat ran the operation that produces it; a list of
obligations crossing a boundary carries its count, and the receiving seat states the count it received;
concurrency is declared, and a count taken while another seat holds a write is not a verdict; a promoted
file amended in place carries a `DIVERGED — DO NOT RE-LIFT` note above its `cr_scratch` source block;
and you correct a false measurement in a shared factual index, but never touch another persona's
argument to move a number.

---

## 6. What I will check at the Step 2 close — tests, not intentions

The first close's ten checks and the re-close's eight stand. These are what this close adds. Each is a
command or a comparison, not a hope.

19. **The boundary artifacts are in a declared file set.** `node tools/quantities.js --lint` reports a
    relay-file population that **includes the spawn prompts**. If `M15`'s file list at the Step 2 close
    is still the two files it was at Step 1's, arm 2a's remedy was never applied and the six relay
    errors have the defence they have now, which is none.
20. **The manifest has an accessor and the ad-hoc extraction stopped.** A tool prints the manifest's
    target paths, and no Step 2 deliverable contains a hand-written extraction over `MANIFEST.tsv`
    whose output was used without a size check.
21. **Every register census stated in a Step 2 deliverable was checked against that register's `H`
    row.** This is the known-answer test for arm 2b. A stated census that disagrees with the file's own
    self-declared size, anywhere, is arm 2b live.
22. **`M15` names the right id.** `AM-134` is ruled and the lint's attributions are correct on the
    Step 2 corpus. A lint that cries wolf on units gets switched off, and it is the only mechanism
    arm 2 has.
23. **Every gate row I write has a done-when that tests every clause of its own What.** I broke this at
    C-2 and the untested clause is the one that did not land. Checkable by reading my own rows.
24. **The `AM-` namespace is renamed**, not worked around. No sentence saying `AM-2` is green can be
    read as covering row `AM-02`.
25. **The twelve went to zero or were individually ruled, and no promoted authority acquired a new
    failure.** If Step 2 adds to the twelve, arm 1's closure was premature.
26. **`QUANTITIES.md` was regenerated at the close** and agrees with the ratified addenda —
    `Q-ECR-AXES` at 18, `Q-LCC15-DISTINCT-LEAVES` at 59, `Q-DEGRADED-MODES` at 5.
27. **Concurrency was declared before any wave ran**, and no failure count reported as a verdict was
    taken while another seat held a write on the same file.
28. **Every promoted authority's named checker exists**, tested by running the name. This is the
    `check_manifest.js` class, found once and swept by The Systems Engineer to four more names, three
    of which are correctly unbuilt check-register rows and one a false positive he named rather than
    counted.

### Falsifiers

**F1 — the channel fix.** *If Step 2 moves the boundary artifacts into a declared file set, gives the
manifest an accessor, runs `M15` over both, and errors of this family still occur at Step 1's rate*,
then the location of the number is not the mechanism, my §3 remedy is wrong, and the defect sits in the
seat producing the number. The next move is then the verifier-of-the-verifier: `oracle/VERIFIED.tsv`
gains a column naming who ran which operation before each figure reached the author.

**F2 — the known-answer test.** *If a Step 2 deliverable states a register census that disagrees with
that register's own `H` row*, then a self-declared size is not a usable known answer, and arm 2b needs
a tool rather than a property.

**F3 — my own correct-in-place ruling.** *If a seat in Step 2 edits a document it does not own, cites
my §2 as licence, and the edit changes an argument rather than a measured fact*, then the rule I wrote
in §2 is too wide, the distinction between a shared factual index and a persona's argument does not
survive contact, and the remedy is to name the specific files a finder may correct.

**F4 — arm 1.** *If Step 2's merge produces counts corrected after the fact rather than measured with
their rule attached*, the checker was necessary and not sufficient, and the missing half is the
invocation point rather than the tool.

**F5 — promote-then-amend.** *If a promoted authority and its `cr_scratch` source are both edited again
after `AM-111` lands*, the marked block was the wrong unit of promotion and whole files should have
moved.

**F6 — the close itself.** *If the author, reading the gameplan at the gate, finds a factual statement
about Step 1 that disagrees with the artifacts*, then three closes were not enough to make an index of
record true, and the index needs a checker rather than another reading.

---

## 7. The accumulator

Appended at this close: The Systems Engineer's C-1 entry — six rows plus four discharged with them,
each verified live before the cell moved and marked `applied` only after read-back; `AM-23` left `owed`
with the reason in its cell; the general form run rather than the reported instance, with the false
positive named rather than counted; and the refusal to edit another persona's frozen argument to make
`--check` go down, at the cost of raising his own count from eleven to twelve and reporting it himself
before anyone asked. The correction previously entered against him — a remit of seven executed as three
— stands beside it, because both are true of the same seat and the second is the answer to the first.

Also recorded: the orchestrator's eighth and ninth errors, written into
`cr_scratch/step1_orchestrator_verification.md` where the other seven live, with the arm 2a / arm 2b
split that §3 rules and the `H`-row known-answer test that would have caught all three.

---

*The Manager, Step 1 final close. Fifteen of fifteen delivered, seventeen promoted, twelve held
failures all rowed, sixty-four edits owed and visible. Two gate items discharged and verified; three
residual cells corrected in this pass rather than routed through the boundary where this project's
defects happen. Arm 1 closed. Arm 2 split, and its remedy re-specified as a change to where artifacts
live rather than a rule anyone must remember. Step 1 goes to the author.*
