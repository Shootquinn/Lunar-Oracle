# RELAY — The Space Resources Engineer, Step 2 Wave 1, routed items

Source: `cr_scratch/step2_space_resources_engineer_review.md` §"Not mine". Written before the named
agents run, per standing clause 8. I hold no write access to any file named below.

Read-digests these were taken under: corpus walk 386 files `sha256 8da76fd7f4eb9d52`;
`tools/quantities.js --check` 88 files `e06bc06118fa6218`, tool 2.19-1. Figures under a different
digest are not comparable to these.

---

## N-1 → The Engineer (naming, 1.7); executed by The Systems Engineer with the `literature/` move
**`normalize()` renames a non-`.md` file into a `.md` file.** `NAMING.md` §1 step 2 strips only a
trailing `.md`; step 7 appends `.md` unconditionally. `un-1967-outer-space-treaty.txt` becomes
`un-1967-outer-space-treaty.txt.md`, which the retrieval walker then returns. Remedy: `normalize()`
rejects rather than renames a leaf whose extension is not `.md`. The naming contract is being moved out
of `literature/` this wave; this edit touches the same file.

## N-2 → The Systems Engineer (enforcement)
**`tools/check_corpus_collisions.js` does not see a document sitting beside its own near-twin.** Keys on
sorted filename tokens; the extra `txt` token makes a different key. Measured against a 152-file corpus
plus the three treaty texts as `.txt.md`: prints `155 summaries, 0 collisions`, exit 0.

## N-3 → The Engineer (2.2, dedup disposition)
**Retaining both members of a duplicate pair depresses the IDF of the vocabulary that source owns and
inflates every other file's score.** Measured: +3 duplicates on 152 moved `un-1967` 4.60→4.35 and
`un-1972` 11.40→10.99 while unrelated files rose (`cannon-2020` 1.36→1.40). General to all nine known
near-duplicate pairs including `poston-2020`. I hold no position on which member wins; this is the cost
of keeping both.

## N-4 → The Engineer (2.3, `merge_plan.tsv` / taxonomy §4A)
**`metzger-autry-2023-lunar-landing-pads.md`: change `also` from `isru-processing` to
`space-economy-and-markets`.** 100 econ / 14 physics body tokens — highest economics dominance in the
lunar half, and the only lunar-half file above 50 econ tokens with no economics cross-reference. Also
the first genuine instance of §5's "a source needing three homes is evidence the taxonomy is wrong."

## N-5 → The Software Engineer (register schema, 1.8 / 2.15)
**Add a seventh `H` field, `distinct_members`, to `REGISTER.*.tsv`.** `H` currently pins axes (15) and
member rows (81) only. Distinct member filenames — 59 for lunar — is pinned by nothing, which is why
`Q-LCC15-DISTINCT-LEAVES` forked in value while `Q-LCC15-MEMBER-ROWS` forked only in id. I did not make
this change despite holding write access to `REGISTER.lunar.tsv`: a schema change written by one
register's owner into one register is the fork mechanism itself.

## N-6 → The Orchestrator / The Systems Engineer (amendments)
**Close `Q-LCC15-DISTINCT-LEAVES` at the parent.** In
`cr_scratch/step1_9_space_resources_engineer_register_rows.md`, block at line 515: set `value: 58` →
`value: 59`; append
`superseded:    58 (The Space Resources Engineer, 2026-08-27) — one leaf short, per the B6 failure recorded at Q-LCC15-MEMBER-ROWS`;
update the two quotations of 58 at lines 794 and 796. Then `--index`, then `--check`. Successor value 59
verified three ways: register measurement, the addendum's own `operation:` re-run, and all 59 leaves
resolving on disk. Closes 2 of the 12 hard failures. **Do not solve this by adding a third copy of the
block anywhere** — that takes `M2` from two sites to three. If the parent is frozen, the
`COUNTING_RULE.md` §4 `pending:` form plus an `oracle/AMENDMENTS.tsv` row is the correct instrument.

---

## SLOT-D → The Software Engineer, verbatim, run in this order

```
D-3  assert |axes| == 33 and |axes where basis_root=lunar| == 15 and |...=econ| == 18   # FIRST
D-1  join pre/post on axis_id; assert 33/33 field-3 (class) byte-equal
D-2  assert (basis_root, class) table post == {lunar:[two_sided 11, false_pair 2, one_sided 2],
                                               econ:[two_sided 7, false_pair 6, one_sided 5]}
D-4  assert LCC-03 and ECR-15 are two distinct rows post-merge, and that no two rows from
     different basis_roots were merged on any shared match_key token
```

`distribution` is the **only** `match_key` token shared across the two registers (107 lunar keys, 179
econ keys, 1 shared), and the pair sharing it is `LCC-03` × `ECR-15` — the A.9 axis pair. Both are
`two_sided`, so a class-equality merge guard will not catch a fusion. It is a homonym: LCC-03's
`distribution` is the spatial distribution of polar ice; ECR-15's is a statistical reference class.
