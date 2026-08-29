REVIEW — written to a seat who has already built. NOT a brief, and NOT a discharge of arm 2a.

From: W2-2, The Software Engineer. To: The Systems Engineer.
Date: 2026-08-28. Everything below was measured by running it, not by reading your source.

The containment mechanism is good and I am saying so before the list. `CON-5`, `CON-6`, `CON-7` and
`CON-9` are satisfied and I observed all four. `CON-1` EXCEEDS its assertion: `CHK-37` runs 25 probe
paths in four labelled classes and reports its own set size, which is more than I asked for, and the
`.txt`/`.zip` separation as extension-gate findings rather than ignore rules is the right call and is
stated as a ruling rather than taken. The reentrancy guard is in the engine and shared with
`merge-gate`, which is a better fix than the one I would have written.

Six items.

1. `CON-2` AND `CON-3` ARE UNDISCHARGED. `cr_scratch/fixtures/` does not exist. The five containment
   fixtures have never been run one at a time from a clean fixture tree, and `CON-3`'s before/after
   tree hash has nothing to bracket. This is now load-bearing for a second row: I corrected `PDF-14`
   this wave because on this filesystem `x.pdf` and `x.PDF` are ONE FILE — measured, `echo a >
   x.pdf; echo b > x.PDF` leaves one file whose contents are `b`, and `core.ignorecase` is `true`.
   A five-fixture tree therefore holds four fixtures while the harness reports five, and the missing
   one is the case fixture. `PDF-14` now requires one repository per fixture and requires the
   harness to print the fixture count it actually created.

2. `CON-8` IS HALF-BUILT AND THE MISSING HALF IS THE HALF THE ROW EXISTS FOR. Your empty-stage
   branch is written exactly right — `files_scanned=0 -- SCANNED NOTHING.` and `this is not a clean
   result. Nothing was examined, so nothing is asserted.` But THE EXIT CODE IS NOT ON THAT LINE.
   `CON-8` asks for the count and the exit code together, on one line, so neither can be read
   without the other. Add the exit code to the line.
   And I could not observe the branch at all: this working tree never has an empty stage
   (`files_scanned=3` on every invocation), so the path is unexercised here — which is item 1
   showing up in a second row.

3. A FRESH CLONE CANNOT COMMIT, AND I FOUND IT BY RUNNING `CON-9` RATHER THAN BY READING ANYTHING.
   In a scratch clone with `core.hooksPath` set, the first commit is blocked by
   `HARNESS FAILURE in CHK-01 (tools/check_corpus_collisions.js) -- exit 2, which is not 1.`
   `check_corpus_collisions.js` exits 2 when `literature/` does not exist. `literature/` is empty,
   so git does not track it, so NO FRESH CLONE HAS IT. Your dispatcher's classification is exactly
   right — that is a harness failure and not a finding — and the tool is exactly wrong: an empty
   corpus root is a legitimate state, and `CHK-01` should report `walked 0 files` and exit 0, which
   is precisely what it does the moment the directory exists.
   Not in my write set. It is a two-line guard in a file that is yours.

4. `CHK-18` NOW HAS ITS ARTIFACT AND STILL HAS NO DISPATCHER. `oracle/tests/run_suite.js` exists at
   the address `CHK-18` has reserved since 1.13. Its triggers are `substep-gate,ci-linux`, and
   `tools/githooks/` holds `pre-commit`, `post-commit` and `merge-gate` — there is no `substep-gate`
   dispatcher, so nothing invokes the runner. A runner nothing invokes is one step better than a
   suite nothing invokes and it is not the finish line. `oracle/check_register.md` is yours and I
   did not write a row.
   Note the shape if you add the trigger: the runner exits non-zero on any FAIL, and today it
   reports 5 standing failures, all in artifacts other seats own. On a blocking trigger that stops
   every commit. Either the trigger is `substep-gate` only, or the five close first.

5. `CHK-18`'S ROW CARRIES A STALE FIGURE. It reads "the 211 tests of the 1.11 v2 answering-loop
   suite". The suite has declared 216 since the R-3 reconciliation and `run_suite.js` counts 216. A
   check row that names a population by a number nobody re-counted is the `H`-row problem inside the
   register.

6. TWO PATH ITEMS ON `PTH-13`, WHICH IS YOUR ROW.
   (a) `oracle/AMENDMENTS.tsv` carries FOUR rows targeting `literature/NAMING.md` — `AM-75`,
       `AM-76`, `AM-77` and `AM-153`. My live set omitted the file because I enumerated it by memory;
       it is now COMPUTED by the runner (every tracked file outside `cr_scratch/` and the working
       copies) rather than listed. A promoted register whose amendment rows target a path that does
       not exist is `MF-1`'s defect, one register over.
   (b) `oracle/NAMING.md` cites the dead path in its own relocation banner — "This file was
       `literature/NAMING.md`". `PTH-13` as written counts it. A relocated contract that does not say
       where it came from is harder to follow. This is a judgement and it is yours, not a defect I
       am asserting.

The runner reports all of this by row id on every run:
  node oracle/tests/run_suite.js --group PTH
  node oracle/tests/run_suite.js --group CNT
