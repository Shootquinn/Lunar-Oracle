# W4-7 (The Writer) → The Editor (6.5, 6.10, 6.14, 7.7), The Designer (6.5, 6.14), The Systems Engineer (6.5, 6.6)

Four documents landed. Stages 1 to 3 are done; stage 4 is yours. Below is what I want checked, what I
already measured so you do not repeat it, and five findings against the contracts that are not mine to
fix.

**Landed:** `CLAUDE.md` (6.4), `oracle/first_run_content.md` (6.9), `README.md` (6.13),
`oracle/sampling_protocol.md` (7.6). Suite at `oracle/tests/document_suites.md` (6.2). Outlines and
working in `cr_scratch/step6_writer.md`.

## To The Systems Engineer, 6.5 — the conformance question, and five findings

Your 6.5 question is stated in advance and narrow: does the prose implement the contract, or a
friendlier contract the suite does not test? The six seams the orchestrator routed are all present and
each is at a named line:

| Seam | Where |
|---|---|
| Phase 6's read sequence, three entries in order | `CLAUDE.md` §1 Phase 6 |
| Phase 7's two-condition gate | Phase 7, *"only when both conditions hold"* |
| The status line's position, never folded in | Phase 7, *"the sequence first, then the status line"* |
| Push-disable in Phase 4, not Phase 3 | Phase 3's closing paragraph states the exclusion; Phase 4 group 1 performs it |
| `ABORT` / `DEGRADED` / `CLEAN` | §2's opening sentence |
| §8's seven-item never-does list | §3, seven numbered, plus three from the mode table |

**F1. BC-10's command cell omits `--prune`.** `oracle/currency_policy.md` §4 requires it and states the
measurement: without prune a branch deleted upstream keeps resolving from a stale tracking ref and the
comparison returns a clean verdict against a branch that does not exist. §4 also requires a forced
refspec, without which the policy's own `withdrawn` verdict is unreachable. I wrote `CLAUDE.md` to the
currency policy and asserted it at CMD-10. **The fix is one cell of BC-10 plus a §10 version bump**,
and until it lands `CLAUDE.md` and `bootstrap_contract.md` disagree with `CLAUDE.md` in the right.

**F2. `oracle/install_state.md` §9's fenced `oracle/VERIFIED.tsv` example is stale.** It shows three
columns and a `# copies=2` header. The live file has five columns, `# rows=5`, and three `lsei` rows,
per `currency_policy.md` §3. Worse than stale: §9's example teaches the exact misreading §3 names as
its falsifier — take the first `lsei` row and you read `c8274e6` and report three of this project's own
pushes as an upstream move. `CLAUDE.md` states the last-row rule and CMD-13 asserts it.

**F3. `tools/corpus_divergence.js` does not exist.** `bootstrap_contract.md` §7.2 states that the
bootstrap dispatches it and prints what comes back, and names `CHK-40` and `CHK-32` as the two rows
that consume it. `ls tools/` returns eighteen files and that is not one of them. I wrote Phase 5 to
dispatch it as specified rather than dropping the line, because a `CLAUDE.md` that omits the dispatch
makes the gap invisible at the moment somebody could close it.

**F4. `LICENSE` and `NOTICE.md` do not exist.** The Scenario Explorer's README opens by naming the
Unlicense "stated in full at `LICENSE`". Copying that shape would put a claim in our README that an
`ls` refutes, for a reader whose only means of checking anything is to run `ls`. `README.md` §7 states
the dedication as the project's position and names the file as owed before the release gate at 6.15.
The file is the author's to sign; neither is in my write set and I created neither.

**F5, a note rather than a defect.** The contract's Phase 6 sequence has three entries and does not
include `CLAUDE.md` itself; the seed stub's had four and began with itself. I wrote it the contract's
way with a one-clause explanation, because a session finding its own file inside a sequence it is
currently executing has a puzzle to solve before it can start.

## To The Systems Engineer, 6.6 — the boundary I did not cross

`oracle/first_run_content.md` specifies **no** part of the gate. It states the dependency and stops.
The two things I want checked against your mechanism:

- The file's emitted bytes are *exactly the contents of the one fenced block in §1, fence lines
  removed*. Everything after §1 is maintenance apparatus in the team's register and is never shown.
  If your mechanism reads the file rather than that block, the register check will find team prose in
  the sequence and will be right to.
- §4 of that file states two **register** rules for the degraded case — no haiku, no first-person
  Oracle voice; state the consequence for answering and not only the fact of the failure — and
  deliberately restates neither the report format nor the mode set. Those are yours.

## To The Editor, 6.5 / 6.10 / 6.14 / 7.7

I wrote against `signs_of_ai_writing.md`, so the useful thing is where I think the risk actually is
rather than a claim that there is none.

- **Category 8, the one I am most exposed on.** `oracle/first_run_content.md` §2 and §3, and
  `oracle/sampling_protocol.md` §7, are documents reasoning about their own rigor. The Editor's own
  §6 scope exempts specifications and the Oracle's register, so I believe they are in bounds — but the
  exemption is a reason to check them, not a reason to skip them. Apply the delete test: if cutting a
  sentence lets a false claim stand it is a caveat, and if it only loses word count it is theater.
- **Em dashes, counted.** `CLAUDE.md` 8 over 327 lines, `first_run_content.md` 2 over 108,
  `sampling_protocol.md` 3 over 150, `document_suites.md` 5 over 94. All comfortably inside the
  reference's 0–2 per page. **`README.md` is the outlier at 13 over 181 lines**, which is roughly four
  per page and is where I would look first.
- **Rule of three.** `README.md` §2 has a four-item list that I deliberately did not trim to three,
  and `CLAUDE.md` §3 has seven prohibitions because the contract has seven.
- **The one sentence in `README.md` I most want a second reader on** is in §7: *"That is a claim about
  files. It is deliberately not the broader claim that no third-party text is present anywhere in the
  corpus."* It is doing something delicate — refusing a borrowed sentence and saying why — and if it
  reads as hedging rather than as precision it has failed.

## To The Designer, 6.5 / 6.14 — the tree a cloner sees

`README.md` §3's map was written against `git ls-files`, not against the gameplan's map, and the two
disagree in one row: **the map names `oracle/REGISTER.tsv` and the tree holds
`oracle/REGISTER.econ.tsv` and `oracle/REGISTER.lunar.tsv`.** The map is the author's ruling and the
gameplan is not my file, so I flagged it rather than editing it. Measured at `HEAD = 99d3601`: 497
tracked files, of which 284 are under `cr_scratch/` and 171 under `literature/`.

`cr_scratch/` being the largest directory in the tree a stranger clones is a design decision the
README states plainly rather than hides. It is worth your eye on whether that reads as openness or as
clutter, because it is the first thing a `ls` shows.

## Measured, so you do not repeat it

```
grep -c $'\r' on all four new files          → 0
CLAUDE.md fenced blocks                       → 7, every one labelled ```bash
destructive git verbs inside those blocks     → none
counts of summaries/sources/personas in CLAUDE.md → none
git ls-files | grep -icE '\.(pdf|png|jpg|...)$'   → 0
first-run haiku                               → 69 rendered chars, one line, 5-7-5
first-run sequence                            → 107 words (budget: under 120)
node tools/quantities.js --check              → 5 hard failures, unchanged; no new site
```
