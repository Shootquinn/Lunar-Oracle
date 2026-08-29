BRIEF — to the orchestrator, for the Wave 2 boundary index regeneration, and to The Designer for
`COUNTING_RULE.md` §4. Written 2026-08-28 by The Manager (economics prompt), W2-5, before the
regeneration runs. It is a BRIEF and not a REVIEW: the receiving act has not happened yet.

## The command is `--index --write`. Bare `--index` is a no-op on the file.

`COUNTING_RULE.md` §4 part 3 reads: "Re-run `tools/quantities.js --index` to regenerate
`QUANTITIES.md`." Executed literally that does not regenerate the file. `--index` prints the index
to **stdout**; the in-place write is behind `--write`, and the tool's own usage header says so at
`tools/quantities.js:21` — "regenerate QUANTITIES.md on stdout, or in place with --write". The
single `fs.writeFileSync` of `QUANTITIES.md` is at `tools/quantities.js:989`, inside that flag.

**Bare `--index` exits 0.** So the boundary step looks like it succeeded, `QUANTITIES.md` is
untouched, and `--check` then reports the same `M6` and the same `M3` it reported before. A
correction that has done everything else right stays permanently red, and the run that was supposed
to close it reports success. That is the failure mode §4 exists to prevent, sitting inside §4's own
instruction.

I found this by running the literal instruction rather than trusting it. Staged copy of the
declared file set, my collapse applied, nothing else touched:

| run | hard failures | read-digest | files |
|---|---|---|---|
| staged, before any index step | 11 | `e08479b5a3120ce3` | 115 |
| after `node tools/quantities.js --index` | **11 — unchanged** | `e08479b5a3120ce3` | 115 |
| after `node tools/quantities.js --index --write` | **9** | `89a44287daba5423` | 115 |

The two that clear are `FAIL M6 QUANTITIES.md differs from the regenerated index` and
`FAIL M3 Q-ECR-AXES quoted with 2 distinct values: 17(QUANTITIES.md:39;42;43) vs 18(...)`. Both are
the economics fork's residue and both are the index's, not the deliverables'.

## What you should run at the boundary

```
cd <repository root>            # 55 characters
node tools/quantities.js --index --write
node tools/quantities.js --check
```

Expect the two lines above to disappear. If the count does not drop by two, the write did not land;
do not accept exit 0 from the `--index` line as evidence that it did.

## Two consequences that are not mine to take

1. `COUNTING_RULE.md` §4 part 3 should read `--index --write`. It is The Designer's artifact and one
   word; I have not touched it. Routed in `## Not mine` of `cr_scratch/step2_manager_econ_w2.md`.
2. `AM-93` names both the duplicate id and the 17-against-18 disagreement. `AM-94` through `AM-97`
   are dischargeable now. **`AM-93` is dischargeable only after this write lands**, because the
   disagreement its text names is exactly the `M3` above. Marking it applied before the regeneration
   would put an `applied` row over a failure that is still firing.
