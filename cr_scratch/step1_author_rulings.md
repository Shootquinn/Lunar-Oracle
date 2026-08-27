# Author rulings during Step 1, 2026-08-26

Recorded here rather than in the gameplan because gameplan corrections are held until sub-step
1.12's counting-rule contract lands. Fold in at that point.

## Ruling 1. C4 / `verify_report.js`: drop the dependency.

**The three answering-loop mechanisms are rewritten without it.**

Not extracted at bootstrap, not vendored with a recorded sha. The file is real — its 328-line
source sits between fences at lines 357 and 686 of `lsei/report-generator-prompt.md` — and the
author ruled that being able to acquire it is not a reason to depend on it.

What this costs and what it buys, as The Software Engineer already established at 1.3: he made the
answer contract independent of `verify_report.js` before this ruling, restating the claim-bearing
definition in the contract's own words rather than by reference. So this option costs a
reimplementation and costs the contract nothing.

**Consequences.**
- Register row C4 closes at 1.6. The Systems Engineer no longer frames four options; he records the
  ruling and specifies what replaces the dependency.
- 1.6's charge shrinks back to the working-copy currency policy it was originally scoped as.
- The three mechanisms named in The Software Engineer's §8.4 need a replacement post-condition.
  That work is his, and it is not currently a sub-step. **Flag at the Step 1 close**: either it
  folds into 1.11's suite or it needs a row.
- The container-versus-content finding survives the ruling unchanged. It was never about this one
  file; it goes to 1.13 as scheduled.

## Ruling 2. The FA shelf renames: the 14, plus the prefix fix, plus the 2 case fixes.

**Corrected count.** The Engineer stated "ten of the nineteen"; the true figure is **14**. Counting
rule: files under `_intake/japanese-miracle/fa/` whose normalized name matches
`^fa[0-9]+-(deliverable|source-list)\.md$`, counted 2026-08-26 against the 19-file shelf as it
stands in `_intake/`. The orchestrator relayed the wrong number into the option the author ruled
on, and re-ran the count only after the ruling. **This is instance 10 of E16 and it is the freshest
one: a count stated without its rule, inside the deliverable that was fixing naming.** Hand it to
The Designer at 1.12 if his contract has not already closed.

**The partition, 19 files, counted by the rule above.**

| Class | Count | Disposition |
|---|---|---|
| Generic `fa<n>-deliverable` / `fa<n>-source-list` | 14 | **Renamed.** These are the retrieval failures. `fa6-deliverable.md` scores 0 against a paraphrase of its own title. |
| No `fa` prefix (`arithmetic-note.md`) | 1 | **Prefixed.** Without it retrieval cannot reach the file on the shelf at all; it currently matches the summary regex instead of the findings regex. |
| Descriptive but uppercase (`FA1-mechanism-table`, `FA2-verdict-table`) | 2 | **Case-normalized only.** Uppercase fails `R_F`, which 1.7 froze. Meaning unchanged. |
| Already correct (`fa7-data-center-ventures-industry-note`, `fa8-failed-space-forecasts-industry-note`) | 2 | **Untouched.** |

All 19 satisfy the frozen naming rule after this, and nothing is renamed that was not broken.

**Execution is not now.** The FA files live in `_intake/` and the `findings/` shelf does not exist.
The renames land when the shelf is created during the merge. Recorded here as the ruling that
governs it; the sub-step that applies it is in Step 2.
