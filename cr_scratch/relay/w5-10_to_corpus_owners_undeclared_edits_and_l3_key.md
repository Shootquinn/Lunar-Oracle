# W5-10 → the corpus owners and the owner of `NAMING.md` §7

Two routings out of `cr_scratch/step8_w5-10_argued.md`. Both are work in `literature/**` and
`oracle/NAMING.md`, which are outside my write set. Neither is a request to change a test.

---

## 1. 44 undeclared body edits in `literature/`, in four classes

`MRG-4b` now reads the declaration form the corpus has used since 2.6 — a `- **Body edit (…):**`
line in the file's own provenance block ending *"…and no others — `op`."* — and **consumes** each
named operation from the diff rather than believing the line. 154 of 169 files carry one. What
survives the consumers is a residual, and a non-empty residual is an undeclared edit.

167 findings became 44. **The 44 are real.** Per class, with the close condition:

| class | n | owner | what is owed |
|---|---|---|---|
| `undeclared-source-file-line` | **31** | the author of sub-step 8.9 / W5-3 | The 8.9 `Source file:` line was written into 31 bodies with no `Body edit` line naming it. **`lsic-2026-newsletter-august` declared the identical edit as `declare-source-file` and is clean.** That is the form the other 31 owe — one clause each. |
| `licence-and-copyright-pass` | **8** | the author of Step 8 part 2 | `Licence:` and `- **Publisher / copyright line (as printed):**` blocks added with **no `Body edit` line at all**: `andrews-hanna-2025-spa-magma-ocean`, `castillo-rogez-2022-ceres-habitability`, `hagerty-2011-spa-basalt-pond-thorium`, `lawrence-2003-small-area-thorium`, `levin-2025-lunar-crustal-kreep-distribution`, `mcleod-2017-extraterrestrial-ree`, `prettyman-2006-lunar-elemental-composition`, `wilson-2018-lp-thorium-reconstruction`. The operation is not yet in the closed set — see the note below. |
| `other` | **3** | the Space Resources Engineer / the 2.6 author | `azami-2024-lunar-manufacturing-review`: the DOI repair is described in a `- **Note:** CITATION REPAIR` line and is **not named in its `Body edit` operation clause**. This file used to be a hardcoded exception in the checker; **that hardcode is retired** and azami is now measured like everything else. `luchsinger-2021-lcross-water-modeling`: +2/−1 — a `Source file:` line **and a removed summary line**, which is a content deletion nobody declared. `nasa-2025-fission-surface-power-directive`: +10/−0. |
| `self-declared-residual` | **2** | the Space Resources Engineer | `falcon-heavy-wikipedia` and `rostami2018-figures`. Their own provenance already says the body *"does NOT restore"* and routes the Wave 2 citation repair to its author. The file and the checker agree; the work is still owed. **Look at `falcon-heavy` first:** it carries a factual edit to a corpus body — `- Maiden flight 2026-02-06` — that no assertion authorised. |

**The closed operation set is `{insert-metadata, drop-cts-marker, declare-source-file,
normalize-eol-to-lf}`.** A token outside it is red as `OUTSIDE THE CLOSED SET`, deliberately: a
declaration nobody defined is not a declaration. **Adding a token is a change to `MRG-4b`'s condition
cell and must be argued in `oracle/tests/corpus_suite.md` §7.1, not assumed by writing it into a
file.** The 8 copyright-pass files will need exactly that argument.

A declared operation that did not happen is also red (`DECLARED-BUT-ABSENT`), so a `Body edit` line
cannot be used to wave an edit through. Both behaviours are proved by mutation; see §2 of the
deliverable.

**Close for the row:** `MRG-4b` reports `0 undeclared`.

---

## 2. `NAMING.md` §7 — the level-3 key is too coarse for a serial

`MRG-9` and `MRG-10` are re-grounded from `cr_scratch/merge_plan.tsv` onto the shelf, and both now
report **exactly one collision across 169 files**:

```
L3|lunar-surface-innovation-consortium|2026|lsic-newsletter-vol
  => literature/programme-primaries/lsic-2026-newsletter-august.md
     literature/programme-primaries/lsic-newsletter-2026-june-final.md
```

This is the pair `verify_corpus.js` files as a level-3 duplicate group under `REPORT`
(`KA baseline level3DuplicateGroupsUncalled: declared 1, measured 1`). **Here is the adjudication it
was waiting for: they are not duplicates.** August is *Vol. 7, Issue 4*; June is *Vol. 7, Issue 3*.

**The defect is the key.** The L3 slug truncates at `lsic-newsletter-vol` and drops the issue number,
so two distinct issues published in one year are indistinguishable to anything keyed on `dedup_key`.

Either §7's L3 rule carries the issue, or the two files' `- **Dedup key:**` lines are made distinct.
**Close:** both rows report 0.

**What was considered and refused, so nobody re-proposes it as a shortcut.** §7 says a level-3 match
is *"a candidate duplicate, never a confirmed"* one, so demoting L3 collisions from failure to report
would take both rows green today — the only surviving collision is L3. Refused. The harm these rows
name is that two documents become indistinguishable to a `dedup_key` consumer, and this pair is the
proof: the key conflates two documents that are *definitely* different. Demoting it is loosening a
condition until the object passes.

---

## 3. Observation, no owner claimed

`MRG-4b` cannot verify 24 rows in a fresh clone: their `byte_source` is under `_intake/`, which is
not distributed. They are counted as **`UNVERIFIABLE`**, separately from `UNDECLARED` and still red —
folding them together accuses somebody of an edit they did not make, and dropping them is a vacuous
pass. Author tree **0**, fresh clone **24**. A clone therefore cannot take this row green. Same class
of problem as W5-5's clone-portable `Source:` work.
