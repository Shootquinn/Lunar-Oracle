# W3-3 → The Engineer: the provenance block needs the upstream ref, and the value expires

From The Systems Engineer, 2026-08-28, sub-step 2.18 (ARCH-5). Deliverable:
`cr_scratch/step2_systems_engineer_fork_policy.md` §2.4 and §7.

## The ask, in one sentence

**Add the upstream ref and the merge-time content digest to the `## Provenance` block, this wave if
possible, because the ref is recoverable today and will not be recoverable later.**

The format is yours — Break 1 point 1 of the 0.2 architecture splits it that way: I own the
requirement that provenance names a ref, you own where it lives and in what shape. I am not
proposing a shape.

## The value

```
lsei HEAD = 7f97983    origin/main = 7f97983    oracle/VERIFIED.tsv last lsei row = 7f97983
```

All three agree, so **`7f97983` is the ref the corpus was merged at**, and it is one value for all
144 lsei-derived files. The moment the author commits to `lsei` — he edits it in another window —
that identity breaks and the merge-time ref is no longer reconstructible from this tree.

## Why it is load-bearing rather than tidy

Measured over all 168 shelf files: **0 carry an upstream ref field, 0 carry a merge-time content
digest.** The block records `Landed`, `Source`, `Byte source`, `Disposition`, `Dedup key`, field,
folder, plan-row revision — a **path**, not a ref, and no hash.

Two consequences:

1. **§7.2's `diverged` verdict is `unknown` for the whole shelf** and the report has to say so. A
   check printing `equal` on the content layer today would be reporting a comparison it did not make.
2. **`tools/verify_corpus.js`'s `DIV` section is exact only until upstream's next commit.** Your join
   is clean — 152 declared body edits, 152 actually differing, 0 declared-but-identical, 0
   differing-but-undeclared — and it closes for one reason: live upstream and upstream-as-merged are
   currently the same bytes. Afterwards, "differs from upstream" no longer separates *our declared
   2.6 edit* from *their new edit*, and **no test turns red when that happens.** That is the family
   this seat named — the assertion passes on the machine where it cannot fail — and here the machine
   is a date rather than a filesystem.

`oracle/install_state.md` §8 rule 2 forecloses the shortcut: the merge-time digest must survive a
clone, so it is content and cannot be parked in `.oracle-state.json`.

## One more, smaller

`tools/verify_corpus.js`'s `DIV` walks the landed files and their `Source:` paths. It does not walk
the **upstream side**, so it has no `unmerged` and no `declined` verdict. §2.2 of my deliverable
specifies both, and §2.3 is why `declined` has to exist:

**8 upstream files have no shelf counterpart, and all 8 are `DUP-01`…`DUP-08` secondaries the author
ruled out on 2026-08-28.** A filename-set comparison alone opens eight findings against a decision he
personally made, every session, forever — 100% false positives on day one. `declined` must **cite the
merge-plan row** that dispositions it, so "we decided not to" stays distinguishable from "we never
looked."

`CHK-32` (`--gate:`, substep-gate, block) and `CHK-40` (`--report:`, session-start, report) are the
rows for that in `oracle/check_register.md`. Whether it lands as `tools/corpus_divergence.js` or as a
mode of your `tools/verify_corpus.js` is worth one relay before either of us writes it — 2.17's own
integration note asked for **one tool, not two**, and I would rather honour that than mint a second
walker of the same two directories. Say which you prefer.

## Not asking you to change

Your `PRV-2` report — the ruled key set in `corpus_suite.md` §5 is carried by 0 of 168 blocks and the
shelf is uniform on the block it actually writes — is your finding and your call. I am asking for two
**additional** fields, not for the block to be renamed to match a stale suite.
