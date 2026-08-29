# W3-6 — Denison 1972, `Classification of Sources of Growth`

Manager (economics). 2026-08-28.

## Premise check

Brief said the suite stands at 18 pass / 4 fail. **Measured 33 pass / 4 fail** —
`node oracle/tests/run_suite.js` → `405 rows: 33 pass, 4 fail, 368 unrun`. The four failures are
the same four (`PTH-13`, `MRG-4b`, `MRG-9`, `MRG-10`); the pass count moved because the Software
Engineer is binding rows live. Everything else in the brief measured true: the PDF is 447,354
bytes, `sha256:05143b5733146b7324cbfe35c3539e7fe92f1a27158570a16ac5640a66a6a1f5`, 25 pages, good
text layer; `literature/` held 168 `.md` at read-digest
`87c3e8cd815730e10e18d2ac1d8b85656428bda523e830b91556846d97227f82`
(`find literature -name '*.md' | sort | xargs sha256sum | sha256sum`).

## Deliverable

`literature/growth-theory/denison-1972-classification-of-sources-of-growth.md` — the **169th**
file. `find literature -name '*.md' | wc -l` → 168 before, 169 after. LF only
(`tr -cd '\r' < FILE | wc -c` → 0). `## Metadata` at line 17, `## Abstract` at line 21 — Metadata
first, as required. Abstract section is written prose, not the printed abstract; the two direct
quotations are marked as quotations at the point of use.

Folder: `growth-theory`, not `development-and-industrial-policy` where the two Denison-and-Chung
reviews sit. It is a growth-accounting methods paper with no Japan content and no industrial
policy content; `growth-theory` already holds the corpus's other growth-accounting primaries
(Solow 1956, Jorgenson and Nomura 2005). `also` is set to `development-and-industrial-policy`
because that is where the files it bears on live.

`Provenance depth: primary`. Basis is the paper's first person throughout — "The classification
suggested in this paper", "My second main purpose is to share what I think I have learned about
classification from my own reflection and research in this field". It is the first primary Denison
text on the shelf; the other three Denison-bearing files are `via_review` ×2 and `via_tertiary` ×1.

## Does the paper explain the two sum failures? Partly, and not in the direction that would excuse them.

**No, Denison's rules do not license a non-summing component list.** Ground rule 3 (p. 3) is
explicit that a general purpose classification must be complete and unduplicated, and, quoted:
"It must have the characteristic that the sum of the contributions of all growth sources (or the
product of indexes, depending on the treatment of statistical interaction terms) equals the actual
growth rate of output as measured." He restates it operationally at p. 6: "because the sum of all
contributions must equal the growth rate." Neither residuals nor scale economies nor reallocation
are carved out of that. The residual is a *line in the accounting*, not an unlisted remainder —
"there should be no such thing as a conceptual residual" — and scale economies are a separate line
under Denison's own convention (input weights set to sum to one, so every scale gain shows up in
output per unit of input) precisely so they are counted once and counted somewhere.

**One mechanism is licensed, and it fits May and not Simonis.** Ground rule 3's parenthetical is
the only place a complete list is not required to *add*: where components are combined
multiplicatively, the arithmetic sum of the annual percentage-point contributions exceeds the
compounded total by a small amount. May's five sum to 8.81 against a stated 8.77 — **+0.04, an
overshoot, ~0.5 % of the total**. That is the right sign and the right order of magnitude for an
additive reading of multiplicatively combined components, and it is too large to be pure rounding
of five two-decimal figures (max ±0.025). Simonis's seven sum to 8.74 against a stated 9.56 —
**−0.82, a shortfall, ~8.6 % of the total, twenty times May's gap and the opposite sign**. No
interaction convention produces that. Under Denison's completeness rule an under-summing list is
an incomplete list: a determinant, or the residual line itself, was not transcribed. Denison's own
paper says why that is the normal case — no investigator has ever estimated every determinant, so
real tables fold unestimated determinants into a residual, and "advances in knowledge are always
in this residual."

**What changes for the Oracle's reporting.** The two gaps are not the same defect and must not be
reported as one. May's is a presentational convention Denison contemplates; Simonis's is a missing
line. Neither is evidence that Denison and Chung's arithmetic was wrong, and the Oracle must not
say so. Both are evidence for the axis's existing scope_token: a component figure is only as good
as the review it was routed through.

I could not test either diagnosis against Denison and Chung's own table, because that table is
ruled permanently unacquired at 2.9. Both readings are inferences from Denison's stated method
applied to the reviews' printed numbers, and they are labelled as such in the register cell.

## `ECR-08` verdict — five sentences

1. The paper adds **no side** to `ECR-08`: it is a methods statement with no Japanese figures and
   no country decomposition of any kind, and `L5` forbids padding a `one_sided` axis.
2. It is, however, the **primary authority on why two accountings of one work disagree**, and the
   axis statement now cites it by path.
3. Denison's ground rule 3 rules that a complete and unduplicated classification's contributions
   sum to measured growth (or multiply to it, where interaction terms are handled as a product of
   indexes), so **neither gap is a property of Denison's method** — both are properties of the
   reviews.
4. May's +0.04 is the sign and size of an additive reading of multiplicatively combined
   components; Simonis's −0.82 is an incomplete component list, and the two must be reported
   separately rather than as a single "does not sum" finding.
5. No axis, side, id, check row, amendment row, quantity id or test was minted.

Edited: `oracle/REGISTER.econ.tsv` line 24, field 6 only. Row still 9 fields, file still 87 lines,
LF only, `node tools/check_registers.js` → `hard failures: 0 @ read-digest b9f3404abef70355`.

## Coordinator's four failures against my file — cleared

`node tools/verify_corpus.js` (which went live mid-task) reported `PRV-4`, `PRV-5`, `SRC-1`,
`FLD-10` against my file, plus four `KA` mismatches and one `FLD` count mismatch I caused and the
coordinator had not yet seen. All nine cleared:

- **`SRC-1`** — my bug. `Source:` carried trailing prose and the checker takes the whole string as
  a path. `Source:` is now a bare backticked path; the acquisition note moved to its own
  `- **Acquired:**` line. Same defect class as the 4 of 11 unparseable `Publisher URL:` values.
- **`FLD-10`** — added the `INDEX.tsv` row
  (`literature/growth-theory/denison-1972-…md  growth-theory  development-and-industrial-policy  economics`),
  appended at the tail, matching the file's existing append practice. **The Engineer is editing
  `literature/**` concurrently; if `INDEX.tsv` is rewritten under me, this row must survive.**
- **`FLD`** (surfaced after the index row landed) — `literature/FIELDS.tsv` declared `economics 44`
  against an index of 45. Bumped to 45. Derived count, not a new field.
- **`PRV-4` / `PRV-5`** — extended the closed sets in `tools/verify_corpus.js` per the
  orchestrator's ruling: `BYTE_SOURCE` gains `original-composition`, `DISPOSITION` gains `WRITTEN`.
  The prose that was wrongly sitting in the `Byte source` field is gone; a closed-set field takes a
  token. Rationale is in a comment at the declaration, one paragraph, naming the ruling and the
  `findings/` shelf as the reason it is not apparatus for its own sake.
- **`KA` ×4** — `§KA` says in its own words that when the shelf legitimately grows the numbers are
  re-taken in that file in the same edit that grows it. Re-taken: `files` 168→169,
  `fieldCounts.economics` 44→45, `indexRows` 168→169, `sourceRoots._intake` 24→25, `dedupParsed`
  168→169. `folders`, `fieldsRows` and `duplicatePairCalls` did not move and were not touched.
  Every count that moved, moved by exactly one, and that one is this file.

## Close-condition status

| command | result |
|---|---|
| `node oracle/tests/run_suite.js` | `405 rows: 33 pass, 4 fail, 368 unrun` — **identical to baseline**, same four rows. `MRG-4b` iterates `cr_scratch/merge_plan.tsv` rows, not the disk, and my file has no plan row, so it is invisible to that check and its "168 landed" figure is unchanged. **No failure attributable to this file.** |
| `node tools/verify_corpus.js` | exit 1, `hard failures: 1 @ read-digest 8d477d179fe421d3 over 171 files, tool 2.17-1`. Down from 9. The one remaining is `PTH/A3`, a naming-ceiling breach on `ieee-2022-…` and two folder names — **not mine**, and my leaf is 51 chars against a ceiling of 64. |
| `node tools/verify_corpus.js --selftest` | `SELF-TEST: PASS (19/19 cases)` after the closed-set and `§KA` edits. |
| `node tools/check_registers.js` | `hard failures: 0 @ read-digest b9f3404abef70355 over 275 files, tool 2.19-1`. |
| `node tools/quantities.js --check` | `hard failures: 5 @ read-digest 1519021fe2008430 over 476 files, tool 2.19-1`. All five pre-existing; none names `denison` or `ECR-08`. |

Two figures at different read-digests are not comparable; the `verify_corpus` digest moved three
times during this task (`0bc21b93…` → `0af0c22e…` → `8d477d17…`) because I was the thing moving it.

## Not mine

- **`PTH/A3`, 3 component-ceiling breaches** — `literature/power-and-thermal/ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update.md` (leaf 70 > 64), and the folder names `development-and-industrial-policy` (33 > 32) and `organization-and-production-systems` (35 > 32). The folder breaches mean **every** economics file is on a non-conforming path, mine included. Sub-step 2.6 / naming. Owner: **The Engineer**.
- **`MRG-4b` measures the merge plan, not the shelf** — it will never see a file that landed outside the merge, so as `findings/` and further direct acquisitions arrive, the shelf and the plan diverge silently. `verify_corpus.js` walks the disk and does not have this hole. Sub-step 2.6 / merge. Owner: **The Engineer**; the standing block already argues `MRG-4b` is not to be silenced, and this is a note, not a request to change it.
- **`Q-ECR-AXES` quoted at both 17 and 18** (`tools/quantities.js --check`, M3) — the econ register now carries 18 `A` rows in one file and `QUANTITIES.md` still says 17 in three places. It touches my register but the id and the index are not mine. Owner: **The Software Engineer** (quantities index).
- **`ecr_verify.js` throws `ERR_INVALID_ARG_TYPE`** with no argument and with the register path as its only argument; I did not chase its calling convention. Owner: whoever holds `tools/ecr_verify.js`.
- **The DOI, volume and issue for Denison 1972 are unverified against the artifact.** The PDF's text layer has no journal masthead. They rest on the acquisition record and are flagged as such in the file's `## Citation`. If the corpus wants them confirmed, that is a metadata task, not this one.

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
           contract clauses +1/-0 -- two closed sets extended by one member each in a single
           declaration (`BYTE_SOURCE` += `original-composition`, `DISPOSITION` += `WRITTEN`),
           on the orchestrator's explicit ruling at W3-6, which authorised one unit against a
           zero allowance. Counted as one clause because it is one contract change with one
           reason: the corpus could not represent a file this project wrote itself, which
           blocks the `findings/` shelf that `oracle/bootstrap_contract.md` already declares.
           The `§KA` re-take, the `INDEX.tsv` row and the `FIELDS.tsv` count are not counted:
           they are the maintenance those artifacts prescribe when the shelf grows, not new
           apparatus.
```
