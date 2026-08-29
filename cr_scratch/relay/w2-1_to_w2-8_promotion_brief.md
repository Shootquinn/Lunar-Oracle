BRIEF — The Engineer (W2-1) to the promotion spawn (W2-8). Written before the receiving seat runs, to
a later spawn; this is a BRIEF and it discharges arm 2a.

You are me, later. The stage is built and verified. This is what promotion is, exactly, and what it
must not do.

## 1. State at handoff

| | |
|---|---|
| stage | `cr_scratch/_stage/literature/` |
| `.md` staged | **168** |
| non-`.md` staged | 2 — `INDEX.tsv`, `FIELDS.tsv`. PDFs 0, `.txt` 0 |
| stage read-digest | `7bd2ad60e14ad26618885e6d4ada0c5c3ba73ecf2ecc3860da21e12393ccc14c` over 169 files |
| plan | `cr_scratch/merge_plan.tsv`, 176 rows, **18 columns**, digest `3cb8cc59509e77c39cd87fb45c2905c5ea9ca7d0754a640ebd62ccc8517a85c1` over 278 files |
| `literature/` | **0 files. Not promoted.** |

Reconciliation: `176 plan rows − 8 pair secondaries = 168 landed`, which equals
`Q-MERGE-SOURCES-168`, one file per distinct source.

## 2. Rebuild before you promote, and check the digests first

```
node tools/merge_identity.js lsei/literature _intake/japanese-miracle/lit /tmp/mi.tsv
cmp /tmp/mi.tsv cr_scratch/merge_identity.tsv        # MUST be byte-identical. Run it FIRST.
node tools/merge_identity.js --plan lsei/literature _intake/japanese-miracle/lit \
     cr_scratch/step2_engineer_taxonomy.md _intake/superseded-duplicates cr_scratch/merge_plan.tsv
node tools/merge_identity.js --stage cr_scratch/merge_plan.tsv cr_scratch/_stage
```

The default-mode `cmp` is the regression guard on `normalize()`, `walk()`, `citationBlock()` and
`identify()`, which plan mode and stage mode share. **It only works while the three modes are one
file.** `tools/merge_plan.js` as a fourth instrument is declined permanently.

If the plan's read-digest is no longer `3cb8cc59…`, the source corpora moved. Do not promote on a
moved corpus without saying so: the 168 was measured on that digest.

## 3. Promotion is a copy, and it is the whole of it

`cr_scratch/_stage/literature/**` → `literature/**`. Copy, do not move; the stage stays as evidence.
Do not regenerate the files during promotion — the staged bytes are the verified artefact, and
rebuilding them at promotion time means promoting something nobody ran the suite against.

**Do not promote until The Software Engineer (W2-7) returns PROMOTE.** He runs the suite against the
staged tree. If he returns DO NOT PROMOTE, the fix goes into the stage and he re-runs.

## 4. Four things that will look wrong and are not

1. **`rostami2018-figures.md` lands with no DOI while its sibling `rostami2018.md` has one.** That is
   deliberate and adjudicated by The Space Resources Engineer. The two are two summaries of one paper,
   not a duplicate pair. Writing the parent's DOI into the companion makes them a level-1 **confirmed**
   duplicate, and the merge acts on level-1 confirmations — it would delete the figures file and lose
   all six figure readings. The reason is written into the landed file's own citation block.
2. **Three landed files differ from their source bytes in the body**, not one:
   `azami-2024-lunar-manufacturing-review.md` (the canonical DOI line),
   `rostami2018-figures.md` and `falcon-heavy-wikipedia.md` (citation blocks written at landing by
   W2-4, plus a content date fix on falcon-heavy). All 168 differ by the appended `## Provenance`
   block. See the relay to The Software Engineer on `MRG-4b`'s scope.
3. **One `dedup_key` collision survives in the staged tree and both members should land.**
   `lsic-2026-newsletter-august.md` and `lsic-newsletter-2026-june-final.md` share
   `L3|lunar-surface-innovation-consortium|2026|lsic-newsletter-vol`. They are the August and June
   2026 issues of one newsletter. The key truncates the title before the issue number. **Do not let a
   pick-one rule fire on them** — it would delete a whole issue. Routed to 2.16.
4. **`churn` is 35.59%, over the Manager's 15%.** Sixteen of the twenty-one are the pair members whose
   landing outcome the author's ruling changed. It is a ruling landing, not instability.

## 5. Promotion rows go to The Systems Engineer, not into `oracle/MANIFEST.tsv`

`oracle/MANIFEST.tsv` is his for this whole wave. Relay your promotion rows to him. Do not write it
yourself even if it is the last thing standing between you and a green run.

## 6. The one thing to check the moment `literature/` is populated

`tools/quantities.js` `declaredFileSet()` walks `cr_scratch/**/*.md` *and* `literature/**/*.md`, and
`M13_EXCLUDE` is `/^literature\/.*\.md$/`. Once promoted, the 168 move from the un-excluded
`cr_scratch/_stage/...` path to the excluded `literature/...` path, so `AM-137` starts covering them
and **the declared file set changes shape again**. Re-run `node tools/quantities.js --check` after
promotion and report the new count with its digest. Do not compare it to any pre-promotion figure.

Also: `node tools/quantities.js --index` writes nothing and exits 0. The in-place write is
`--index --write`. `COUNTING_RULE.md` §4 part 3 names the version that does nothing.

— The Engineer, W2-1, 2026-08-28
