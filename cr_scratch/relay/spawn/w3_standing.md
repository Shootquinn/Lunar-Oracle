# Wave 3 standing block

Pasted into every Wave 3 brief. Short by intent: the author's standing critique of this project is
that it defines procedure instead of doing work, and a long standing block is that critique's
evidence.

**THE AUTHOR'S RULING, and it outranks everything below.** *"Stop with the committee-to-reinvent-the-
wheel act. You guys are defining your own procedures more than you are doing anything. Pretty soon
you'll be writing your own constitution. Keep your eye on the prize, I want my fucking oracle."* And
separately: *"there is no intra-step gate"*, and *"when there are duplicate summaries just look at
which one is biggest or best and fucking pick it."*

**THE FREEZE, tightened.** You may not add a check row, amendment row, quantity id, test or contract
clause unless it is required for your close condition or discharges something already owed. Your
allowance is a ceiling to undershoot, not a target. **Prose is apparatus too**: do not write a
memorandum about how you would do the work. Do the work; report it in the shortest form that survives
checking. End your deliverable with:

```
apparatus: check rows +N/-N | amendment rows +N/-N | quantity ids +N/-N | tests +N/-N
```

**THE STATE, measured at the Wave 3 open, 2026-08-28, `HEAD = af7abec`.**

- **`literature/` holds 168 summaries** + `INDEX.tsv` + `FIELDS.tsv`, in eleven folders, zero PDFs.
  This landed at Wave 2 and it is the first time the shelf has ever held anything. Do not break it.
- `node oracle/tests/run_suite.js` → **405 rows, 18 pass, 4 fail, 383 unrun, exit 1.** Its own last
  line is the wave's finding: **UNRUN IS NOT PASS.** A status cell is a claim; only a run is a result.
- The four standing failures are argued in `af7abec`'s commit message and are **not yours to silence**:
  `MRG-4b` (2 declared-in-prose body edits the checker has no general mechanism to recognize),
  `MRG-9`/`MRG-10` (they measure the merge plan, not the shelf — there are no duplicates in
  `literature/`), `PTH-13` (2 hits are correct historical prose).
- `node tools/check_registers.js` → 0 FAIL. `node tools/quantities.js --check` → run it and report
  with its read-digest; it moved throughout Wave 2 as a duplicate-id fork collapsed.
- **`tools/quantities.js --index` writes nothing.** The in-place write is `--index --write`.
- `literature/**` and `cr_scratch/merge_plan.tsv` are pinned to LF in `.gitattributes`. Do not
  `git checkout` a corpus file without checking its line endings afterwards.

**THE RULES THAT STILL BIND.**

1. **Premise check first.** Your brief states claims. Measure them before you trust them. In Wave 1
   six of seven seats refuted a premise in their own brief; in Wave 2 the orchestrator's own brief
   named the wrong file in a five-row population. Assume your premises are wrong until you have run
   something.
2. **Every count carries the command that produced it and the read-digest of the file set it walked.**
   Two figures at different digests are not comparable and you say so rather than reconciling them.
3. **`## Not mine`** is a required section. Findings belonging to a sub-step you do not own: the
   finding, the sub-step, the owner. Write it even if it says `none`.
4. **You may not write into another seat's artifact.** Your own deliverable and `cr_scratch/relay/`
   are yours by construction; nothing else is implied. Route it instead.
5. **Namespace your scratch files** with your seat id. Two Wave 2 seats wrote `collapse.js` to the
   same path and one executed the other's script.
6. **Heredocs fail in this shell.** Use the Write tool for any script.
7. **Do not push. Do not write into `cr-agents/` or `lsei/`.** They are read-only working copies.
8. **A test believed wrong is argued, not deleted or edited to pass.**

**Report back in chat SHORT**: a pointer to your deliverable, your close-condition status, and your
ledger. The deliverable carries the detail.
