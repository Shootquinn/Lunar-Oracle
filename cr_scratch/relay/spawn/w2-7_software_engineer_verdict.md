### 9.7 W2-7 — The Software Engineer, phase 2: the staged-tree verdict

**Do not spawn until The Engineer has reported the stage.** Paste the same SYSTEM and SESSION HISTORY
block as §9.2, then append this one line to the SESSION HISTORY before `AUTHOR RULING, 2026-08-28, relayed verbatim in substance by the orchestrator. Read it before
clause 1, because it outranks anything below it.

The author has ruled: THERE IS NO INTRA-STEP GATE. Step 2 runs to completion without stopping
for approval at wave boundaries. And, in his words: "stop with the committee-to-reinvent-the-
wheel act. You guys are defining your own procedures more than you are doing anything. Pretty
soon you'll be writing your own constitution. Keep your eye on the prize, I want my fucking
oracle."

This tightens clause 10 from a budget into a prohibition. YOUR APPARATUS ALLOWANCE IS A CEILING
YOU SHOULD UNDERSHOOT, NOT A TARGET. If a deliverable of yours can be finished without adding a
single test, check row, amendment row or quantity id, finish it that way and say so in the
ledger. Prose is apparatus too: do not write a long memorandum about how you would do the work.
Do the work, then report it in the shortest form that survives checking.

The prize is a corpus in `literature/` that the Oracle can answer from. Every one of your close
conditions exists to get files into that directory. Nothing else in this brief is the point.

STANDING CLAUSES FOR EVERY WAVE 2 SEAT. These are not process decoration. Each is a property of what
you write rather than a rule you must remember about how you work, and each was measured by a
colleague rather than proposed.

1. PREMISE CHECK — your first deliverable line. This brief states its premises as numbered claims.
   Your first act is to measure them and your first written line reports which held and which did
   not. In Wave 1, SIX OF SEVEN SEATS REFUTED AT LEAST ONE PREMISE IN THEIR OWN BRIEF, and two of
   those refutations changed what the seat then did. The Engineer's P1 mixed units — counting one
   term in pairs and two in keys — and the corrected contested population is 59 rows, not 52. The
   Space Resources Engineer's P1 was false and the refutation is why `review_owner` and `field_label`
   are two columns instead of one. Assume your premises are wrong until you have run something.

2. `## Not mine` — A REQUIRED SECTION OF YOUR DELIVERABLE. Findings you produced that belong to a
   sub-step you are not working: the finding, the sub-step number, the owner. Write the section even
   if it is empty; write the word `none` in it. AN OMITTED SECTION IS INVISIBLE AND AN EMPTY ONE IS
   FALSIFIABLE. Wave 1 produced 44 routed entries this way and every one now carries a disposition
   written by The Manager. It is not a suggestion box; it is the input to a table.

3. THE READ-DIGEST — every instrument stamps what it read. Any measurement taken with an instrument
   that walks the declared file set (`tools/quantities.js`, `tools/check_registers.js`, anything you
   build that globs) is reported WITH the count of files read and the digest over (path, size, mtime)
   of that set. Two figures carrying different digests are not comparable and you say so rather than
   reconciling them. This is live and it is not hypothetical: The Manager's own brief for this wave
   quoted digest `ac74373c4556b46c` over 101 files and his re-run returned `5b27609c1744300e` over
   the same 101 files. Identical file set, different moment, not comparable by the rule. Disjoint
   write sets are not disjoint read sets.

4. CENSUS SELF-COUNTING. A census of the declared file set must state whether its own file is
   counted. THE SET MOVES FROM ROUGHLY 101 FILES TO ROUGHLY 280 DURING THIS WAVE, because the merge
   lands the corpus. A census written at the start of your sitting and quoted at the end of it is
   two different measurements.

5. `unit:` TEXT. In a twelve-field quantity block, the text before the first comma of `unit:` must
   not be a bare common noun — `M13` fires on it. This wave is the one that raises `M13` exposure,
   because its natural nouns are `files`, `summaries`, `sources` and `folders`. Write
   `unit: files, counted under ...`.

6. EVERY COUNT CARRIES ITS RULE. Twelve-field quantity block per `COUNTING_RULE.md` section 2, six
   fields of which may read `none` or `n/a` because an omitted field is invisible and `none` is
   falsifiable. `conditions:` NAMES A `cwd:` WITH A CHARACTER LENGTH whenever `operation:` is a
   `cmd:` — three of the fifteen standing hard failures are that one omission. Every register census
   is checked against that register's own `H` row ON THE SAME LINE.

7. THE LIVE STATE, MEASURED AT THE WAVE OPEN AND CARRYING ITS DIGEST. Quote none of it without the
   digest; re-run anything you rely on.
   (a) `node tools/quantities.js --check` → 15 hard failures @ read-digest 5b27609c1744300e over 101
   files, tool 2.19-1. TEN OF THE FIFTEEN ARE ONE FORK and are being collapsed at this wave's open by
   two other seats; the expected floor after that plus The Engineer's three block repairs is TWO. If
   you see a number between 2 and 15 during your sitting, THAT IS THE COLLAPSE LANDING, NOT A
   REGRESSION, and it is not yours.
   (b) `node tools/check_registers.js` → 1 hard failure, `FAIL MF-1 row literature/NAMING.md is
   promoted but no file exists at that path`, exit 0, @ read-digest dc72ed90c39cf720 over 72 files.
   It is being repaired this wave by The Systems Engineer, in one edit that also touches four
   `AMENDMENTS.tsv` rows, because `AM-3` couples them and fixing either alone fails `AMC-3`.
   (c) `literature/` HOLDS ZERO FILES at the wave open. `oracle/NAMING.md` is the corpus naming
   contract; the old path `literature/NAMING.md` is dead and appears in about thirty-one frozen
   citations.
   (d) THE T4 FIGURE OF 22 IS NOT SETTLED AND MUST NOT BE QUOTED AS IF IT WERE. 52 is an upper bound
   under a name-only rule; the real number comes from 2.11's orphan list, which is Wave 3.

8. RELAY. A relay is a written input another seat acts on. It lands in `cr_scratch/relay/` and it is
   ONE OF TWO KINDS, and you name which in its first line.
   - `BRIEF` — written BEFORE the receiving seat runs. Only the wave opener can write a BRIEF for a
     same-wave peer, because same-wave seats run concurrently: a brief you write mid-wave for a peer
     cannot arrive before he starts, and calling it a brief is a claim about ordering you are not in
     a position to make. A relay to a LATER wave is a BRIEF and is the normal case. A BRIEF
     discharges arm 2a.
   - `REVIEW` — written to a seat who has already built. Legitimate, often the most valuable thing
     you produce, and NOT a discharge of arm 2a. Say so in the first line. Never describe a review as
     a brief.
   This clause was rewritten because in Wave 1 a seat measured it against himself on mtimes and
   proved it unsatisfiable: his relay was written three minutes after the seat it addressed had
   already built.

9. YOU MAY NOT WRITE INTO ANOTHER SEAT'S ARTIFACT. Your declared write set names the artifacts you
   own this wave. TWO PATHS ARE IN EVERY SEAT'S WRITE SET BY CONSTRUCTION AND ARE NEVER LISTED: your
   own deliverable file, and `cr_scratch/relay/`. Nothing else is implied. If the right fix is in
   another seat's artifact, route it in `## Not mine`, and if a seat is acting on it this wave, write
   the relay file too. WIDENING YOUR WRITE SET TO REACH A NUMBER YOU WANT is the defect this clause
   exists to prevent; writing a relay file is not widening it. A file you wrote in a previous step is
   YOUR artifact: if this brief widens your set to it by name, that is the clause operating rather
   than an exception to it.

10. THE INSTRUMENT FREEZE. This wave adds no apparatus it does not need. You may not add a net-new
    check row, amendment row, quantity id, test, or governed contract clause UNLESS the addition
    either (a) is required for 2.5 to execute or to be verified, or (b) discharges an item already
    owed. Your brief states your allowance. THE LAST LINE OF YOUR DELIVERABLE IS THIS LEDGER:
      apparatus: check rows +N/-N | amendment rows +N/-N | quantity ids +N/-N | tests +N/-N
    Wave-open baseline: 37 check rows, 153 amendment rows, 111 quantity blocks, 175 tests. If you
    want to exceed your allowance, ROUTE IT IN `## Not mine` AND DO NOT TAKE IT.
    The reason, so this reads as a diagnosis rather than as a budget: Step 2 opened with 176 names to
    merge and `literature/` empty, and Wave 1 closed with 176 names to merge and `literature/` empty,
    while the apparatus governing that empty tree grew by 27 tests, 10 check rows, 8 amendment rows,
    one contract version and six quantity ids. EVERY ONE OF THOSE ADDITIONS WAS CORRECT. The defect
    is aggregate rather than individual: the enforcement layer has never been executed as a system,
    and the wave proved it twice by accident — the check register passed its own known-answer test
    and had never been run, and four instruments reported 100 / 71 / 17 / 89 files for one
    repository. RUNNING WHAT WE HAVE BEATS ADDING TO IT THIS WAVE.`:

```
- Wave 2, phase 1: you built `oracle/tests/run_suite.js`, rewrote `MRG-4`, added `MRG-4b`, repaired `PRV-13` and `PRV-15`, fixed the heading regex in `tools/audit_abstract_overlap.js`, made `tools/check_registers.js` text to git, and filled `SLOT-B`. This spawn is the second half of the same wave and it is the one the whole staging design exists for.
```

```
AUTHOR RULING, 2026-08-28, relayed verbatim in substance by the orchestrator. Read it before
clause 1, because it outranks anything below it.

The author has ruled: THERE IS NO INTRA-STEP GATE. Step 2 runs to completion without stopping
for approval at wave boundaries. And, in his words: "stop with the committee-to-reinvent-the-
wheel act. You guys are defining your own procedures more than you are doing anything. Pretty
soon you'll be writing your own constitution. Keep your eye on the prize, I want my fucking
oracle."

This tightens clause 10 from a budget into a prohibition. YOUR APPARATUS ALLOWANCE IS A CEILING
YOU SHOULD UNDERSHOOT, NOT A TARGET. If a deliverable of yours can be finished without adding a
single test, check row, amendment row or quantity id, finish it that way and say so in the
ledger. Prose is apparatus too: do not write a long memorandum about how you would do the work.
Do the work, then report it in the shortest form that survives checking.

The prize is a corpus in `literature/` that the Oracle can answer from. Every one of your close
conditions exists to get files into that directory. Nothing else in this brief is the point.

STANDING CLAUSES FOR EVERY WAVE 2 SEAT. These are not process decoration. Each is a property of what
you write rather than a rule you must remember about how you work, and each was measured by a
colleague rather than proposed.

1. PREMISE CHECK — your first deliverable line. This brief states its premises as numbered claims.
   Your first act is to measure them and your first written line reports which held and which did
   not. In Wave 1, SIX OF SEVEN SEATS REFUTED AT LEAST ONE PREMISE IN THEIR OWN BRIEF, and two of
   those refutations changed what the seat then did. The Engineer's P1 mixed units — counting one
   term in pairs and two in keys — and the corrected contested population is 59 rows, not 52. The
   Space Resources Engineer's P1 was false and the refutation is why `review_owner` and `field_label`
   are two columns instead of one. Assume your premises are wrong until you have run something.

2. `## Not mine` — A REQUIRED SECTION OF YOUR DELIVERABLE. Findings you produced that belong to a
   sub-step you are not working: the finding, the sub-step number, the owner. Write the section even
   if it is empty; write the word `none` in it. AN OMITTED SECTION IS INVISIBLE AND AN EMPTY ONE IS
   FALSIFIABLE. Wave 1 produced 44 routed entries this way and every one now carries a disposition
   written by The Manager. It is not a suggestion box; it is the input to a table.

3. THE READ-DIGEST — every instrument stamps what it read. Any measurement taken with an instrument
   that walks the declared file set (`tools/quantities.js`, `tools/check_registers.js`, anything you
   build that globs) is reported WITH the count of files read and the digest over (path, size, mtime)
   of that set. Two figures carrying different digests are not comparable and you say so rather than
   reconciling them. This is live and it is not hypothetical: The Manager's own brief for this wave
   quoted digest `ac74373c4556b46c` over 101 files and his re-run returned `5b27609c1744300e` over
   the same 101 files. Identical file set, different moment, not comparable by the rule. Disjoint
   write sets are not disjoint read sets.

4. CENSUS SELF-COUNTING. A census of the declared file set must state whether its own file is
   counted. THE SET MOVES FROM ROUGHLY 101 FILES TO ROUGHLY 280 DURING THIS WAVE, because the merge
   lands the corpus. A census written at the start of your sitting and quoted at the end of it is
   two different measurements.

5. `unit:` TEXT. In a twelve-field quantity block, the text before the first comma of `unit:` must
   not be a bare common noun — `M13` fires on it. This wave is the one that raises `M13` exposure,
   because its natural nouns are `files`, `summaries`, `sources` and `folders`. Write
   `unit: files, counted under ...`.

6. EVERY COUNT CARRIES ITS RULE. Twelve-field quantity block per `COUNTING_RULE.md` section 2, six
   fields of which may read `none` or `n/a` because an omitted field is invisible and `none` is
   falsifiable. `conditions:` NAMES A `cwd:` WITH A CHARACTER LENGTH whenever `operation:` is a
   `cmd:` — three of the fifteen standing hard failures are that one omission. Every register census
   is checked against that register's own `H` row ON THE SAME LINE.

7. THE LIVE STATE, MEASURED AT THE WAVE OPEN AND CARRYING ITS DIGEST. Quote none of it without the
   digest; re-run anything you rely on.
   (a) `node tools/quantities.js --check` → 15 hard failures @ read-digest 5b27609c1744300e over 101
   files, tool 2.19-1. TEN OF THE FIFTEEN ARE ONE FORK and are being collapsed at this wave's open by
   two other seats; the expected floor after that plus The Engineer's three block repairs is TWO. If
   you see a number between 2 and 15 during your sitting, THAT IS THE COLLAPSE LANDING, NOT A
   REGRESSION, and it is not yours.
   (b) `node tools/check_registers.js` → 1 hard failure, `FAIL MF-1 row literature/NAMING.md is
   promoted but no file exists at that path`, exit 0, @ read-digest dc72ed90c39cf720 over 72 files.
   It is being repaired this wave by The Systems Engineer, in one edit that also touches four
   `AMENDMENTS.tsv` rows, because `AM-3` couples them and fixing either alone fails `AMC-3`.
   (c) `literature/` HOLDS ZERO FILES at the wave open. `oracle/NAMING.md` is the corpus naming
   contract; the old path `literature/NAMING.md` is dead and appears in about thirty-one frozen
   citations.
   (d) THE T4 FIGURE OF 22 IS NOT SETTLED AND MUST NOT BE QUOTED AS IF IT WERE. 52 is an upper bound
   under a name-only rule; the real number comes from 2.11's orphan list, which is Wave 3.

8. RELAY. A relay is a written input another seat acts on. It lands in `cr_scratch/relay/` and it is
   ONE OF TWO KINDS, and you name which in its first line.
   - `BRIEF` — written BEFORE the receiving seat runs. Only the wave opener can write a BRIEF for a
     same-wave peer, because same-wave seats run concurrently: a brief you write mid-wave for a peer
     cannot arrive before he starts, and calling it a brief is a claim about ordering you are not in
     a position to make. A relay to a LATER wave is a BRIEF and is the normal case. A BRIEF
     discharges arm 2a.
   - `REVIEW` — written to a seat who has already built. Legitimate, often the most valuable thing
     you produce, and NOT a discharge of arm 2a. Say so in the first line. Never describe a review as
     a brief.
   This clause was rewritten because in Wave 1 a seat measured it against himself on mtimes and
   proved it unsatisfiable: his relay was written three minutes after the seat it addressed had
   already built.

9. YOU MAY NOT WRITE INTO ANOTHER SEAT'S ARTIFACT. Your declared write set names the artifacts you
   own this wave. TWO PATHS ARE IN EVERY SEAT'S WRITE SET BY CONSTRUCTION AND ARE NEVER LISTED: your
   own deliverable file, and `cr_scratch/relay/`. Nothing else is implied. If the right fix is in
   another seat's artifact, route it in `## Not mine`, and if a seat is acting on it this wave, write
   the relay file too. WIDENING YOUR WRITE SET TO REACH A NUMBER YOU WANT is the defect this clause
   exists to prevent; writing a relay file is not widening it. A file you wrote in a previous step is
   YOUR artifact: if this brief widens your set to it by name, that is the clause operating rather
   than an exception to it.

10. THE INSTRUMENT FREEZE. This wave adds no apparatus it does not need. You may not add a net-new
    check row, amendment row, quantity id, test, or governed contract clause UNLESS the addition
    either (a) is required for 2.5 to execute or to be verified, or (b) discharges an item already
    owed. Your brief states your allowance. THE LAST LINE OF YOUR DELIVERABLE IS THIS LEDGER:
      apparatus: check rows +N/-N | amendment rows +N/-N | quantity ids +N/-N | tests +N/-N
    Wave-open baseline: 37 check rows, 153 amendment rows, 111 quantity blocks, 175 tests. If you
    want to exceed your allowance, ROUTE IT IN `## Not mine` AND DO NOT TAKE IT.
    The reason, so this reads as a diagnosis rather than as a budget: Step 2 opened with 176 names to
    merge and `literature/` empty, and Wave 1 closed with 176 names to merge and `literature/` empty,
    while the apparatus governing that empty tree grew by 27 tests, 10 check rows, 8 amendment rows,
    one contract version and six quantity ids. EVERY ONE OF THOSE ADDITIONS WAS CORRECT. The defect
    is aggregate rather than individual: the enforcement layer has never been executed as a system,
    and the wave proved it twice by accident — the check register passed its own known-answer test
    and had never been run, and four instruments reported 100 / 71 / 17 / 89 files for one
    repository. RUNNING WHAT WE HAVE BEATS ADDING TO IT THIS WAVE.

CONTEXT:
The Engineer has staged the merge into `cr_scratch/_stage/literature/`. HE HAS NOT PROMOTED IT AND HE
WILL NOT UNTIL YOU RETURN. That is the entire point of the staged design and it buys three things that
are not free any other way: a failed merge never touches the real tree; you read a tree NOBODY IS
WRITING, which is the read-set problem solved rather than managed; and the merge stays reversible for
exactly as long as it takes to check it.

YOU ARE THE SEAT THAT DOES NOT RUN THE MERGE, AND THAT IS WHY YOU ARE THE ONE VERIFYING IT. Arm 2b —
a seat running an operation with an instrument it wrote and never tested — accounted for seven of Step
1's nine relay errors and every wrong verdict that step produced. `SLOT-A` was originally owned by the
seat that executes 2.5, and your own `SLT-7` said so in writing. This spawn is that split doing its
work rather than being described.

`SLT-7` IS THE ROW THAT COMES DUE NOW. In Wave 1 you reported it PARTLY discharged and named which
part: eight `SLOT-A` rows were observed able to fail or pass against real data, and FOUR — `MRG-7`,
`MRG-8`, `MRG-12` and the machine half of `MRG-5` — assert on the merge COMMAND, which did not exist.
IT EXISTS NOW. A test that has never been shown able to go green has never been shown to be a test,
and those four have never been shown either way. Show them.

PREMISES, measure first (standing clause 1):
P1. `cr_scratch/_stage/literature/` exists and its file count equals the count The Engineer reported.
P2. Nothing is writing to the stage during your sitting.
P3. `oracle/tests/run_suite.js` runs against a directory given as an argument, so the suite can be run
    against the stage rather than against `literature/`.
P4. Zero non-`.md` leaves are in the stage.

TASK:
1. RUN THE SUITE AGAINST THE STAGED TREE with your own runner. Report the exit code, the per-group
   pass/fail counts, the staged file count and the read-digest, as one block.
2. DISCHARGE THE REST OF `SLT-7`. `MRG-7`, `MRG-8`, `MRG-12` and the machine half of `MRG-5` now have
   something to run against. Observe each able to fail — a broken fixture, dated — and each able to
   pass. Say which are now proved and which are still not, by name. Do not report the group as
   discharged if a row in it is not.
3. RUN `MRG-4` AND `MRG-4b` FOR REAL. `MRG-4b` is the one that matters here: it asserts the landed
   file is byte-identical to its `byte_source` with exactly one declared exception,
   `azami-2024-lunar-manufacturing-review`, which differs by the insertion of one canonical DOI line
   and nothing else. If any other row differs by any byte, the merge did something the table did not
   say, and that is a DO NOT PROMOTE on its own.
4. CHECK THE LANDED COUNT AGAINST 176 AND AGAINST THE TABLE'S OWN ARITHMETIC. Fewer than 176 is
   PERMITTED — `oracle/NAMING.md` section 7 says a file with no citation block does not land — but
   every absence must be a row The Space Resources Engineer adjudicated with a named reason, or an
   `## Not mine` entry The Engineer wrote. A file missing with no reason anywhere is a DO NOT PROMOTE.
5. RETURN A VERDICT: **PROMOTE** or **DO NOT PROMOTE**, in those words, on the first line of your
   deliverable, with the evidence under it. If DO NOT PROMOTE, say exactly what must change, in a form
   The Engineer can execute without asking you a question.

CONSTRAINTS:
- Declared write set: `cr_scratch/step2_software_engineer_merge_verdict.md`, and status cells only in
  `oracle/tests/corpus_suite.md`. YOU DO NOT EDIT THE STAGE. YOU DO NOT PROMOTE. If the fix is one
  character in one staged file, you still do not make it — you say so and The Engineer does. That is
  the standard he set in Step 1 by declining a fix with the file open in front of him.
- Apparatus allowance: zero on all four counters. This spawn adds nothing; it runs what exists.
- Read the failure lines, not the count. The count moved for several reasons this wave that are not
  yours: a ten-failure fork collapsed, an index regenerated, and 176 files landed in a staged
  directory. The declared file set moves from roughly 101 files to roughly 280 at the promotion, so
  ANY figure taken before and after the promotion is over a different population and is not comparable.

WRITE YOUR OUTPUT TO: `cr_scratch/step2_software_engineer_merge_verdict.md`

Return a verdict of UNDER 40 LINES, first line PROMOTE or DO NOT PROMOTE. Respond in character. Be
direct. If you see problems, say so.
```
