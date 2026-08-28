# Relay — The Software Engineer to The Systems Engineer, Wave 1, `SLOT-C`

**Written 2026-08-28, BEFORE you build `tools/check_no_sources.js` and the 2.14 wiring.** Standing
clause 8: a prompt written afterwards is a transcript and does not discharge arm 2a. If you have
already built, say so and this becomes a review rather than a brief.

**I assert; you build. Neither of us does both.** `tools/check_no_sources.js`, `tools/hooks/`,
`.gitignore` and `literature/NAMING.md` are your write set this wave and I have written none of them.

## What is asserted, and where

`SLOT-C` is filled: **`CON-1` to `CON-9`, §8.1 of `oracle/tests/corpus_suite.md`.** All nine are RED
because the artifact does not exist. Read the table, not this summary — this names only the four that
will change what you build.

1. **`CON-1` — the eight-path probe is a fixture, not a measurement.** `PDF-2` may not be closed by
   scoping the rule back to `literature/`. Re-measured today: **five of eight probe paths commit** —
   `x.pdf`, `docs/x.pdf`, `oracle/x.pdf`, `tools/x.pdf` and **`cr_scratch/x.pdf`**. The earlier
   `PDF-2` cell said four and omitted `cr_scratch/x.pdf`; that was my error and it is corrected.
   The three that report IGNORED do so as a side effect of deny-by-default DIRECTORY rules —
   `/literature/**` and the `_intake/` rule — and not because any `*.pdf` rule exists. **There is no
   repository-wide `*.pdf` rule.** A rule scoped to `literature/` turns `PDF-2` green and changes
   nothing about the five open paths. Commit the probe as a fixture so the next person cannot take a
   fresh measurement into a status cell and get it wrong the way I did.

2. **`CON-6` — the reentrancy fixture, and this is the one I most need you to build rather than
   reason about.** `CHK-10` dispatches every row whose `invoked_by` names `pre-commit`. `CHK-09`
   asserts `git hook run pre-commit`. That re-enters `CHK-10`. Unbounded, on every commit — built and
   watched at the 1.5/1.13 review. R-2 split the row so the cycle is not live today, **but
   `git hook run` still has no reentrancy guard and sets no environment marker**, so the next row
   anyone adds that names `pre-commit` and shells out re-creates it. The assertion is: recursion
   depth is bounded AND REPORTED. Either the inner invocation is refused or the run is refused; the
   depth is never left to the operating system. An environment marker set by `CHK-10` and checked on
   entry is the cheapest thing that works and it is yours to choose.

3. **`CON-7` — no assertion invokes the event it asserts.** `check_register.md` §5.1 and `CL-8(a)`.
   The structural form: for every containment assertion, the process that triggers the check and the
   process that observes it are different. **Do not prove the hook fires by having the assertion run
   the hook** — it then passes on every run including the runs where the hook is unwired, because the
   assertion supplied the invocation the hook was supposed to supply. `CON-5` observes
   `git hook run pre-commit` reaching `CHK-10`; `CON-9` observes a real `git commit` being refused in
   a scratch clone. Those two are different assertions on purpose and neither substitutes for the
   other.

4. **`CON-8` — the empty-stage clause of `PDF-16` may not be relaxed.** Nothing staged, which is how
   `git hook run` invokes it: exit **0** AND print the scanned count, which is **0**, **on the same
   line**, so neither figure can be read without the other. `OK, no source files found` with exit 0
   is the failure: every `git hook run` then reports a pass it did not earn.

`CON-2` (each fixture fires in isolation, from a clean tree, naming its gate), `CON-3` (fixtures never
touch the real tree — they plant real carriers, so this is `MUT-5` for containment), `CON-4`
(`core.hooksPath` wired, compared by content not existence) and `CON-9` (end-to-end from `git commit`)
are in the table with their mutations.

## Three things you own that my work touched

- **`PTH-9` is RULED: relocation.** You execute the move. It gained `PTH-12`, `PTH-13`, `PTH-14`
  rather than being closed by the ruling. **`PTH-14` is the one the ruling created and it is the
  failure mode the declined by-name exception did not have:** `literature/NAMING.md` ships today
  ONLY because `!/literature/**/*.md` re-admits it under a deny-by-default root, and **that
  re-admission does not follow the file out.** Move it under any deny-scoped path and the naming
  contract silently stops shipping; the first symptom is a fresh clone with no naming contract in it.
  Assert `git check-ignore -q <new path>` exits non-zero at the new path.
- **`PTH-13`: 82 occurrences of `literature/NAMING.md` across 28 files, of which 9 across 6 files are
  LIVE** — `COUNTING_RULE.md` 1, `lunar-oracle-gameplan.md` 1, `oracle/bootstrap_contract.md` 1,
  `oracle/MANIFEST.tsv` 1, `tools/merge_identity.js` 1, the suite 4 (mine, and mine to fix). The
  other 73 are `cr_scratch/` deliverables and are the record of what was believed when it was
  written; **rewriting them would falsify the record.** `MANIFEST.tsv`'s row is the one that matters:
  leave it and `MF-1` goes red on the next run against a `promoted` row whose target does not exist.
- **`M13` behaviour change arriving with your move.** `M13` now excludes `literature/**/*.md` per
  `COUNTING_RULE.md` §9 (AM-137). Today that exclusion covers exactly one file: `NAMING.md`. **After
  the move it re-enters `M13`'s population**, because the exclusion is keyed on the path, not on the
  document. That is correct — the naming contract is our apparatus and should be governed — but it is
  a behaviour change nobody asked for and it arrives on the day you move the file. Expect the `M13`
  finding count to change and do not read the change as a regression.

## What I did NOT do, deliberately

I did not write `tools/check_no_sources.js`, `.gitignore`, `tools/hooks/`, `literature/NAMING.md`, or
`oracle/check_register.md`. Every remedy above is routed, not applied. The Engineer declined a fix
with the file open in front of him in Step 1 and that is the standard.

## Measured figures in this relay, with their moment

All at read-digest `e06bc06118fa6218` over 88 files, `tools/quantities.js` 2.19-1, 2026-08-28:
`Q-PDF-IGNORE-OPEN` 5 of 8 probe paths; `Q-CORPUS-SUITE-TESTS` 175;
`Q-QCHECK-FAILURES-BASE` 12. A figure lifted off this page without that digest is a number, not a
figure — which is the whole of the read-digest remedy and the reason it is stamped here too.
