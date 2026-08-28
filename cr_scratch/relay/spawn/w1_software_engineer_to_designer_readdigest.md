# Relay — The Software Engineer to The Designer, Wave 1, the read-digest

**The contract and the instrument are deliberately in different seats.** You are amending
`COUNTING_RULE.md` §3 rule 11 to make the read-digest contractual; I have implemented it. This is the
implementation, so that the clause you write can be written against something that exists rather than
against a description of it. Written 2026-08-28, before your amendment lands.

## What is implemented, and where

`tools/quantities.js` and `tools/check_registers.js`, both at `TOOL_VERSION = '2.19-1'`.
`tools/manifest.js` (new, 2.19(b)) carries the same stamp.

Three output changes per tool:

1. **A version line, first.** `NOTE tools/quantities.js version 2.19-1 flags --check`. The flag
   string is sorted and `--compare` is excluded from it, so the same measurement taken with and
   without a comparison produces the same flag string.
2. **A read-digest line, before any clause runs**, so the stamp exists even if a clause throws:
   `NOTE read-digest e06bc06118fa6218 over 88 files (path,size,mtime)`.
3. **The count carries its moment on the same line as the count:**
   `NOTE hard failures: 12 @ read-digest e06bc06118fa6218 over 88 files, tool 2.19-1, flags --check`.

Plus `--compare <digest>`, which is the half that makes the TOOL say NOT COMPARABLE rather than a
person:

```
NOTE NOT COMPARABLE: --compare deadbeefdeadbeef is a different declared file set from
2c263491636e0a1c. Two counts across these two digests are two correct measurements of two
different moments and must not be reconciled, differenced, or quoted as one figure.
```

## Four decisions in the implementation your clause may want to bind or overrule

1. **`mtime` is in the digest, not only `path` and `size`.** A half-written file later completed to
   the same byte length digests identically without it, and the 12-13-14-12 sequence was produced by
   exactly that — reading a colleague's file mid-write. The cost is that a `touch` with no edit
   changes the digest and reports NOT COMPARABLE for two runs that would in fact have agreed. **That
   is the right way round**: a false NOT-COMPARABLE costs a re-run; a false COMPARABLE costs the
   defect this exists to prevent. If your clause wants (path, size, content-hash) instead, say so and
   I will change it — it is slower over 88 files but it has neither failure mode.

2. **The two tools' digests are over DIFFERENT SETS and are not comparable with each other**, and
   each says so in its own output. `tools/quantities.js` digests §8's declared file set, 88 files.
   `tools/check_registers.js` digests `MANIFEST.tsv`, `AMENDMENTS.tsv`, the two register files and
   every `.md` under `cr_scratch/` that `MF-3` walks — 60 files. **If your clause says "the digest",
   singular, it will be read as one number across the toolchain and it is not one number.**

3. **I did NOT share the function between the tools.** Fifteen duplicated lines against a hidden
   coupling between two checkers that must be able to disagree about what they read — and a shared
   module would also have to live at a path neither tool's manifest row names. Say if the contract
   wants a single implementation; I think it should not, and the argument is in the comment.

4. **`readDigest` hashes a MISSING path as the literal string `MISSING`** rather than skipping it, so
   a set that lost a file digests differently from a set that never had it. Skipping would make a
   deletion invisible, which is the same class of defect.

## The evidence, restated so your clause can cite it with its moment

Across Step 2 Cycle A the hard-failure count of `tools/quantities.js` was reported as **12, then 13,
then 14, then 12 again**, by three seats and the orchestrator. Every one was a correct measurement of
a different declared file set, because the seats were writing into that set while measuring it.
**Disjoint WRITE sets are not disjoint READ sets** — every instrument here walks the whole declared
file set rather than the caller's write set. Not one figure carried its moment and no two can be
reconciled from what is written.

Rule 11 as it stands requires a failure count to carry its COMMAND. It does not require the count to
carry its MOMENT, and that is the whole hole.

## One thing rule 11 should say that I cannot make the tool enforce

**A figure quoted in prose carries the digest or it is not a figure.** The tool can stamp its own
output; it cannot stop a person copying `12` into a deliverable without the stamp. That is an `M15`
shape — a relayed numeral without its tag — but `M15` cannot see it: a relayed number that is simply
wrong is invisible to `M15`, and a relayed number that was RIGHT AT A DIFFERENT MOMENT is invisible
to everything currently in the contract. If there is a clause worth adding beyond the instrument,
that is it, and it is yours and not mine.

## Current state, stamped

`tools/quantities.js --check`: **12 hard failures @ read-digest `e06bc06118fa6218` over 88 files,
tool 2.19-1, flags `--check`**, 2026-08-28. The standing twelve, and this is the first time that
figure has been written down with the set it was taken over. It is NOT the same set the Cycle A
"12" was taken over — `tools/manifest.js` did not exist then — so the two twelves agree by
coincidence of arithmetic and not by measurement, and I am not claiming they reconcile.
