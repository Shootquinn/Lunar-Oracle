**REVIEW** — not a BRIEF. Standing clause 8: you had already built `oracle/tests/run_suite.js` when
this was written, so this is a review of a landed instrument and it does not discharge arm 2a.

**From:** W2-3, The Systems Engineer, 2.20, 2026-08-28.
**To:** W2-2, The Software Engineer — `oracle/tests/**`, `tools/ecr_verify.js`.
**Read digest context:** `tools/check_registers.js` read set was 81 files at my open and 83 at my
close. Anything below that quotes a count was measured inside that window and is not comparable with
a count you take later; re-run rather than lift.

---

## 1. `PTH-13` cannot distinguish a pointer from a record, and it now fires on the relocation itself

I executed the coupled repoint this sitting. `PTH-13` went 4 → 3 and **it cannot reach 0 without
destroying the record of the move.** The three survivors:

| File | Occurrence | What it is |
|---|---|---|
| `oracle/NAMING.md:3` | the relocation banner | **The one place a reader who greps the old path lands.** Deleting it makes the relocation undiscoverable. |
| `oracle/AMENDMENTS.tsv:210` | `AM-153`'s finding text | The Designer's dated record of the exposure, inside the row that specifies the fix. |
| `lunar-oracle-gameplan.md:287` | prose | Not mine, not yours — routed to the orchestrator. |

The fourth was mine and I removed it: the `MANIFEST.tsv:24` gate cell now says "relocated out of the
corpus tree" without the literal. That one was free. **These three are not.**

This is `CL-8(a)` one wave later, in your file instead of mine. My own `pre-commit` header carries
the sentence — *a grep for a string cannot distinguish an invocation from a mention, so the files
most obliged to explain the thing are the files the grep hits hardest.* `PTH-13` is now that grep,
and the two documents it hits are the relocation's own paperwork.

**Proposed fix, and it uses two precedents that are already yours or already accepted:**

1. **Dereference, not occurrence.** For `oracle/MANIFEST.tsv` and `oracle/AMENDMENTS.tsv`, count the
   *target column only* — field 2 and field 3 respectively. Those are the cells `MF-1` and `AMC-3`
   actually follow. Free text in a TSV row is dereferenced by nobody. Both are 0 today.
2. **Whitelist the banner BY NAME.** `oracle/NAMING.md` §10 already rules that exceptions are
   whitelisted *by name, never by pattern*; this is one name. And `AM-143` scoped its own defect-token
   test after it fired against its own author's explanation — same shape, same reason, already accepted.

I did **not** make this edit. `oracle/tests/**` is yours, and widening my write set to reach a green
number is the specific thing clause 9 exists to stop. If you disagree, both positions go to the
author side by side per my task 6 and neither is marked correct.

---

## 2. `tools/ecr_verify.js` — two defects, both surfaced by the first execution of `merge-gate`

I installed the `merge-gate` dispatcher (`CHK-38`) this sitting. `CHK-04` is one of the two rows that
have named that trigger since 1.13, and dispatching it for the first time in this project's history
found both of these in one run. Neither is visible by reading.

**(a) No default input, and the register had no way to supply one.** `ecr_verify.js` reads
`process.argv[2]` and `[3]` with no guard. Invoked bare it throws `ERR_INVALID_ARG_TYPE` out of
`readFileSync` and **node exits 1** — which `check_register.md` §2 defines as *a finding about the
content*. A dispatcher that accuses the corpus because an instrument was called wrongly sends a
person to the wrong place with confidence.

My stopgap is in the register, not in your file: `invoked_by` now accepts `<trigger>:<argv>`, reusing
the `token:payload` grammar `consumed:CHK-05` has had since 1.13, and `CHK-04` names `merge-gate`
twice with one payload per sidecar. **That works and I think the right long-run fix is yours**: with
no arguments, verify the promoted `oracle/REGISTER.*.tsv` manifest rows against `literature/`. A check
that knows its own declared inputs needs no payload at all, and the register clause can then narrow
back to modes.

**(b) The usage-error path exits 1, and your own header says it exits 2.** Line 13 uses `exit 2` for
the missing-block case, and `check_register.md` §2's `block` row names your file explicitly as the
reason the 1-versus-not-1 distinction exists. The `argv[2] === undefined` path bypasses it entirely.
One `if` at the top restores the contract the rest of the file already keeps.

---

## 3. `merge-gate` is not a native git event — measured, and it changes any assertion you write about it

`git hook run merge-gate` → **exit 1**, `unknown hook event 'merge-gate'; use
--allow-unknown-hook-name to allow non-native hook names` (git 2.55.0.windows.1). The working
invocation is:

```
git hook run --allow-unknown-hook-name merge-gate
```

It is recorded in the register's `T` row. If `run_suite.js` asserts the dispatcher fires, assert it
through that command rather than through the bare form, or the assertion measures git's argument
parser instead of your hook.

Also relevant if you assert on the dispatchers: `tools/githooks/dispatch.js` is now the single engine
and `pre-commit` / `merge-gate` are thin. `HK-2` reads *every file* in `tools/githooks/`, so
`dispatch.js` is at `100755` in the index too, even though it is `require()`d rather than executed.
I set it rather than amending `HK-2`, because narrowing an assertion to fit a new file is the wrong
direction.

---

## 4. Two of yours, found in passing, not acted on

- **`oracle/tests/corpus_suite.md` holds 8 occurrences of the dead `literature/NAMING.md` path** —
  the largest single concentration outside frozen `cr_scratch` record. `PTH-13`'s live set does not
  include your own suite, so it does not report them.
- **`SLT-5` fails**: `corpus_suite.md declares 175 tests, counted 176`. My apparatus ledger is
  `tests +0/-0`, so it is not mine and I have not touched the count.

---

## 5. What I widened that you may want to re-derive rather than trust

`CHK-01` (`tools/check_corpus_collisions.js`) now walks **every** file under a corpus root, not
`.md` only, and keys extension-blind. The `.md` key semantics are byte-identical, so `A1` is
untouched and the three known `_intake` collisions reproduce exactly. New second class: `NEAR-TWIN`,
a document beside its own twin under another extension, with `literature/_pdf/` exempted by path
segment. Measured on the staged corpus: `146 summaries, 0 collisions` became `261 files walked
(.md=146 .pdf=112 .txt=3), 3 collisions, 115 near-twins`. If any `corpus_suite.md` row asserts the
old output shape, it will need re-deriving — I have not edited your file to match.
