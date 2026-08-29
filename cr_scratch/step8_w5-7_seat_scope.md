# Sub-step 8.7 — The Fact-Checker reports; the Manager rules

**Seat W5-7, The Writer.** Landed as `oracle/answer_contract.md` **§11**, contract version 3 → 4.

## Where it went, and why there

**`oracle/answer_contract.md`, appended as §11.** Four reasons, in order of weight.

1. **It is §10's own rule, one level up.** §10 already rules *"the tool reports; the session rules"* —
   the router advises, the composing session decides, and a session deferring to a score it can see is
   wrong has reintroduced the classifier this wave removed. §11 is the identical asymmetry with a seat
   in the tool's place: the Fact-Checker advises, the Manager decides. Putting it anywhere else splits
   one rule across two files.
2. **It reuses §10's instrument and mints none.** §10 already requires
   `Evidence pass: took <ids>. Set aside <ids>: <one reason per id>.` A Manager declining a finding
   writes it on that line. No new procedure, which matters for a rule whose whole subject is
   over-processing.
3. **A separate `oracle/seat_scope.md` buys nothing.** It would need a pointer from the contract to
   bind at all, and that pointer is itself a rule change that mints version 4 anyway — so the separate
   file costs a second file, a second place to drift, and the same version bump, for no gain.
   `lunar-oracle-gameplan.md` was never a candidate: it is a plan for *building* this thing, and a
   rule living only there governs nothing at answer time.
4. **`cr-agents/` was not merely off-limits, it was futile.** It is re-cloned on every fresh bootstrap
   (Phase 3), so a rule written there is destroyed by the next clone and reaches no cloner. §11 states
   the layering explicitly: cr-agents supplies the method unmodified, our operating rules over it live
   under `oracle/`, and where they differ ours governs *this* Oracle.

§9's growth rule was followed rather than worked around: **a section appended is not a section
renumbered**, so §11 sits at the end and nothing before it moved.

## The rule, five lines

1. The Fact-Checker's findings go to the Manager and **stop there**; they are not self-executing.
2. The Manager decides **for the good of the writing, not to satisfy her** — a correct finding that
   would worsen the deliverable is declined, and declining it is the job.
3. Her scope is **claims of fact in the test plan being attributed and checkable**; an unattributed
   claim binds, a missing PDF is not a finding at all.
4. **Once a claim is attributed and checkable her job on it is done** — continued objection past that
   point is not new information.
5. She works from summaries, which *generates* provenance worry; that is her position, not a defect in
   the corpus — and she still catches real defects, so this is routing and scope, **never removal**.

## Premise checks

- **The environment banner says this is not a git repo. It is** — `git rev-parse` returns `585ffe2`.
  Nothing in my work depended on it, but the banner is wrong and the next seat should not trust it.
- **VER-2 was already red before I touched anything** (suite pinned 2, contract read 3, owner named as
  the version-3 reconciliation seat). It is still red, now reading 4, with its owner text
  auto-generated from the contract. **I added no failure**; I moved an existing one's number. Closing
  it is the reconciliation seat's, not mine.
- The standing block's suite figures (455 rows / 85 pass / 13 fail) are stale against today's tree.
  The brief's own baseline — 148 rows / 43 failures — is the live one and is what I measured against.
  Figures at different digests are not comparable and I did not reconcile them.

## Not mine

- **An `AMENDMENTS.tsv` row for the version-4 bump is owed** and I did not write it: `AMENDMENTS.tsv`
  is outside my write set. Precedent is `AM-66` for the version-2 bump. Owner: whoever holds the
  amendment register this sitting.
- **VER-2's re-pin** in `oracle/tests/answering_loop_suite.md`. Pre-existing, owned elsewhere.
- `oracle/deliverable_shape.md` states it was written against version 3 and its worked example prints
  `contract version: 3`. Both are historically correct as written; whether the example is refreshed is
  that file's owner's call, not mine.
- The four `af7abec` failures. `tools/**`, `release_gate.md`, `check_register.md`,
  `bootstrap_contract.md`, `lunar-oracle-gameplan.md` — W5-6's.

## Ledger

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
```

| Gate | Baseline | After | Verdict |
|---|---|---|---|
| `node oracle/tests/run_suite.js` | 148 rows, 101 pass, **43 fail**, 4 unrun | 148 rows, 101 pass, **43 fail**, 4 unrun | unchanged |
| `node tools/check_registers.js` | **0** hard failures | **0** hard failures, read-digest `4edceb9994019666` over 312 files | unchanged |

**Files written:** `oracle/answer_contract.md` (+68 lines: §11, the version-4 header paragraph, the
§9 register entry), `cr_scratch/step8_w5-7_seat_scope.md`. LF throughout, verified `\r` count 0.
Nothing written to `cr-agents/` or `lsei/`.
