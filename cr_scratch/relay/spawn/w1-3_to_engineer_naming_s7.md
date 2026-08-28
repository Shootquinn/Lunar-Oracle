# RELAY — W1-3 (The Systems Engineer) → The Engineer, `NAMING.md` §7

**Written before you adjudicate, per standing clause 8.** Sent 2026-08-28, Wave 1.
Your four §7 recommendations from the 2.12 identity run are **all four accepted and all four landed**.
Adjudicate the 39 no-identifier keys against the text below, not against the old §7.

## 1. The contract moved. Read it at the new path.

`literature/NAMING.md` is now **`oracle/NAMING.md`**. Author ruling PTH-9, executed this wave: the
retrieval walker returned the contract as a corpus file, which made the naming rules a citable
literature source. Measured: `check_corpus_collisions.js` said `1 summaries` before, `0 summaries`
after. **Moved, not renamed** — the leaf name is unchanged, so `grep NAMING.md` still finds it and
only the full-path spelling `literature/NAMING.md` is stale.

**`tools/merge_identity.js` line 22 carries the old path in a comment.** That file is yours, it is not
in my write set, and the comment is the address of the spec your `normalize()` implements. One-line
fix when you next open it.

## 2. What changed in §7

**The levels are now 1, 2A, 2B, 3.** Level 2B is new. **Nothing was renumbered**, and that is
deliberate: making the agency identifier "level 3" and pushing the weak key to 4 would leave every
existing sentence saying a pair "resolves at level 3" syntactically intact and semantically inverted,
claiming a confirmation where the author recorded a candidate. Level 1 and level 3 mean exactly what
they meant yesterday. Every statement you have written about "level 2" remains true of 2A.

```
1.   DOI                     not a mirror-minted DOI
2A.  publisher article URL   must carry a path
2B.  agency or grant number  NEW
3.   (identity, year, title)  weak; a match is a candidate
```

**(a) A level-2A URL must carry a path.** A bare host addresses a publisher, not a document. Your
instrument already did this and it removed 4 of 9 false collisions; it is now the contract rather
than an implementation detail that a later reimplementation could drop.

**(b) A mirror-minted DOI is not level 1.** `10.13140/` (ResearchGate) mints a DOI over somebody
else's uploaded copy. `colozza-2020` is the live instance and **its own citation block already says
the identifier is not publisher-registered** — the file knew and the precedence did not. Registrant
prefixes are a **list, not a rule**, and the list is `10.13140/` today. If your run finds another
minting prefix, that is a §7 amendment and it comes back to me.

**(c) An identifier held by more than one key is a candidate, not a confirmation.** Applies to 2A
**and** 2B. The test is not what the string looks like, it is **how many union keys hold it**. This is
the clause that catches `nasa.gov/moontomarsarchitecture` used as a programme landing page — your
one over-merge in six, `nasa-data-gaps-acr25`.

**(d) Level 2B: agency and grant numbers confirm.** `NASA/TP-20250010956`, `ESDMD-001`,
`NP-2026-04-6806-HQ`, NTRS accession `20220004165`, grant `80NSSC19K0964`. Printed in the artifact,
issued by the publishing or funding body, unique to the document. **Normalization: uppercased,
internal whitespace removed.** It sits *below* the publisher URL because a grant number can cover a
programme that emitted several artifacts — so it confirms **only when clause (c) holds**.
`sowers-2019`'s NIAC pair is now confirmable **by rule** rather than only by eye.

## 3. Two things to carry into the adjudication

1. **Precedence is still per-pair.** 2A and 2B are two ways of being at level 2, **not an ordering
   between them**. A pair carrying one of each is compared at **level 3**, as a candidate. Do not
   read 2A > 2B.
2. **Your "48 resolve at level 2" figure is now stale by construction**, and that is expected rather
   than a defect — 2B is designed to pull keys up out of the 39. Re-measure and re-state the basis;
   do not reconcile the new number against the old one, they are counts of different rules.

## 4. Owed back to me

Anything in the 39 that resolves at none of 1 / 2A / 2B / 3, or any second DOI-minting prefix.
Those are §7 amendments and §7 is mine.
