# Step 2 Wave 2, W2-5. The Manager (economics prompt): the econ fork collapsed, and the 2.8 patch table

**Premise check, first line as clause 1 requires. P1 HELD, P2 HELD EXACTLY, P3 HELD WITH ONE
CORRECTION.** P1: at my open, `node tools/quantities.js --check` named my two files on exactly six
lines — five `M2` duplicate ids (`Q-ECR-AXES`, `Q-ECR-MEMBER-ROWS`, `Q-ECR-KEYS-SHIPPED`,
`Q-ECR-SIDES-GT2`, `Q-ECR-PROBE-SEPARATION`) and one `M3` two-valued quotation on `Q-ECR-AXES`, and
no other `FAIL` line named either file; three `LINT` lines did, none of them hard. P2: column 11
cuts 70 rows to `manager-econ`, 44 `field_label=economics` and 26 `space-economy-and-markets`, all
26 `field=lunar` — exact. P3: 70 of 70 files exist and are readable at column 3, but **69 carry
`## Citation` and one carries `## Provenance` instead** — `castillo-rogez-2022-ceres-habitability.md`.
P3 said "or", so it holds; I state the split because a patch tool written to find `## Citation`
would silently miss one file, and one silent miss in seventy is the shape this project keeps
finding. **I refuted nothing this time, which after Wave 1's six-of-seven is worth stating plainly
rather than dressing up.**

---

## 1. The fork is collapsed. Six failure lines cleared, which is `6` [Q-ECR-FORK-DELTA] as measured prospectively in Wave 1

Executed as briefed: the five corrected blocks moved out of the addendum and over the parent's
blocks of the same id, carrying their `value`, `population`, `operation`, `conditions`, `predicate`
and their `superseded:` entries verbatim; the addendum's five re-declarations deleted; the quoting
prose updated in the same edit. `--index` not run.

**The counts, each with its read-digest and its command. The command is the same every time:**

```
cd "C:/Users/Quinn Morley/onedrive/projects/cc/lunar oracle"   # 55 characters
node tools/quantities.js --check
```

| moment | hard failures | read-digest | files |
|---|---|---|---|
| my open, before any edit | 15 | `980220e52dc19cd7` | 110 |
| immediately after my edit | 11 | `7c8bbf69fcd9a618` | 114 |
| at my close, deliverable not yet written | 8 | `0fe4ff63050cffd1` | 118 |
| final, with this file and the depth table in the set | 5 | `336562c5584d878c` | 122 |

**No one of these four is comparable to any other and none is comparable to the `15 @
5b27609c1744300e over 101 files` my brief quoted.** Four different digests over four different file
sets. The wave-open figure is not reproducible at all: the set moved from 101 files to 122 during
my sitting, which is the merge arriving. **The last row counts this file and `cr_scratch/step2_manager_depth.tsv` in its own population** (clause 4), and neither adds a failure or a lint line. Its digest was taken from the run that produced the row and every further keystroke in this file moves it, which is clause 3 working rather than a defect in it. Eleven lines cleared between my open and that final read and one arrived. **Five of the eleven are
mine** — the five `M2` duplicate ids. Six are other seats' repairs landing while I worked: the
lunar half of the same fork at three, one `M1` and two `M11`. The one that arrived is `M6`, the
index staleness my own edit creates and the boundary regeneration removes. Read the failure lines,
not the count, exactly as the brief said. `tools/check_registers.js` now reports
**0 hard failures @ read-digest `81e44371e66a1230` over 87 files** — a different instrument over a
different set, and the tool says so itself in its own output.

**My isolated contribution, measured where nothing else moves.** I staged the declared file set to
a scratch tree with my edit applied and nothing else, because a delta read off a repository three
other seats are writing is not a delta. Staged: **11 @ `e08479b5a3120ce3` over 115 files**; after
the index write, **9 @ `89a44287daba5423` over 115 files**. Six lines named my two files before the
edit and **zero name them after it**, which is the `6` I put in `Q-ECR-FORK-DELTA` in Wave 1 before
touching anything. The prospective figure held.

**Two failures are still firing against my files at this moment and both are the index's.**
`FAIL M6 QUANTITIES.md differs from the regenerated index` and `FAIL M3 Q-ECR-AXES quoted with 2
distinct values: 17(QUANTITIES.md:39;42;43) vs 18(...)`. They clear on the boundary regeneration.
I did not run it, I verified it works, and I found that **the command is not the one the counting
rule gives**.

### The finding: `COUNTING_RULE.md` §4 part 3 gives a command that does nothing, and exits 0

§4 part 3 says "Re-run `tools/quantities.js --index` to regenerate `QUANTITIES.md`." Bare `--index`
prints the index to **stdout** and leaves the file alone; the in-place write is `--index --write`
(`tools/quantities.js:21`, and the only `writeFileSync` of `QUANTITIES.md` is at `:989`). I ran the
literal instruction in the staged tree: 11 before, **11 after, unchanged, exit 0**. With `--write`:
9. So the boundary step as written would report success, change nothing, and leave the correction
permanently red — which is the exact failure §4 exists to remove, sitting inside §4's own
instruction. Relay written: `cr_scratch/relay/w2-5_manager_econ_index_write.md`, a BRIEF, because
the regeneration has not run yet.

### A sixth defect, in my own addendum, found by applying the collapse to it

The addendum's §5 opened "Four values change. Three do not change." **Five change** —
`Q-ECR-AXES` 17→18, `Q-ECR-MEMBER-ROWS` 52→53, `Q-ECR-KEYS-SHIPPED` 176→185, `Q-ECR-SIDES-GT2` 4→5,
`Q-ECR-PROBE-SEPARATION` 17→18 — and **four do not**, the fourth being `Q-ECR-KEYS-TESTED`, which
the paragraph never mentioned. Corrected in place, in my own file, in the same edit. It is the same
shape as the third defect I found at the A.10 re-scope: the sentence counting the corrections was
itself uncounted.

One residue I am not fixing and am naming instead: `Q-ECR-KEYS-DEAD`'s `operation:` still names the
parent file while its 185 was measured on the addendum's `ECR2.tsv` extraction. Its `predicate:` now
says so in words. Rewriting the `operation:` would be me declaring a run I did not make.

### `AM-93` through `AM-97`: four dischargeable now, one after the regeneration. Routed, not taken.

All five are `owed`, all five name `quantity blocks` and one `Q-ECR-*` id each, and all five defects
are gone from the tree. **`AM-94`, `AM-95`, `AM-96`, `AM-97` are dischargeable now** — their text is
"Duplicate id across step1_10 and its addendum" and no duplicate id remains. **`AM-93` is
dischargeable only after `--index --write` lands**, because its text names two things: the duplicate
id, which is gone, and "the two disagree: 17 against 18", which is the `M3` still firing out of
`QUANTITIES.md`. Marking it applied now would put an `applied` row over a live failure.
`oracle/AMENDMENTS.tsv` is The Systems Engineer's; the H row's owed count moves 72→68 now and 68→67
after the regeneration. I have not touched the file.

---

## 2. The 2.8 patch table: `cr_scratch/step2_manager_depth.tsv`, 70 rows, no blanks

Keyed on `key`, column 2 of `merge_plan.tsv`, as instructed. Every row carries a value from the
closed set and a `basis`; **zero rows are `n/a`**, so the reason-for-`n/a` rule never had to bite.
Tally **primary 54 | via_review 7 | via_tertiary 9**. Read-digest over the 70 files read =
`6164c8dcdd6ea459`, `merge_plan.tsv` at `9f98ff60509c9d43`. Validated: keys are an exact bijection
with the 70 plan rows, no value outside the closed set.

**The rule is in the file's header so a reviewer can argue with the rule instead of with 70 rows.**
The hard cases are papers with no new data, and the test that decides them is *does the document
produce its own numbers*: `ehricke-1974` says "no new empirical data are collected" and is `primary`
because the order-of-magnitude estimates are his; `downing-2005` says "presents no new data, drawing
instead on ... cited prior work" and is `via_review` because the content is other people's. Where a
file states its own type I quoted it — `ryan-2000` opens "Review article", `simonis-1979` says "not
an original research article", `vanderploeg-2011` says "Survey of the theory and evidence",
`nakamura-1989` says "no new data collected".

**The gameplan's minimum is met and now measured rather than asserted.** `may-1977` and
`simonis-1979` are `via_review`, `henderson-2008` is `via_tertiary`. Ten corpus files mention
Denison; only six mention Chung; and of those, `aoki-2009` cites Denison and Chung in a bibliographic
list, `jorgenson-2005` calls its own work "the substitute for" their decomposition, and `otsu-2007`
names it as "targeted elsewhere in FA1". **None of the three reports the decomposition.** So the
gameplan's claim holds: those three files are the corpus's only route to it, and all three are now
marked not primary. That is the whole factual basis of 2.9, which is with the author.

**Two judgement calls I am flagging rather than hiding**, both with what would settle them in the
`basis` cell: `bea-depreciation-rates` (`via_tertiary` — the rates are BEA's published schedule but
were estimated by Hulten and Wykoff, and the question is whether 2.8 grades a number's publisher or
its measurement; this file is the corpus's only route to delta) and `gao-2011` (`via_tertiary` on
its compiled supply figures, which is what it is read for here). The pair that shows the column
doing work is `bea-depreciation-rates` `via_tertiary` against `highfill-2024` `primary` — same
publisher, opposite depth, because one publishes its own estimates and the other publishes someone
else's.

Three rows carry a `CAUTION for retrieval` in the basis where the file's depth is not uniform:
`kawagoe-1999` (its own tabulation, but the productivity finding is reported speech),
`mckeown-2024` (its own derivation over surveyed proxies) and `shishko-2019` — which already carries
the caveat in its own text, and is the model for what the others should look like.

---

## 3. The 26 `space-economy-and-markets` rows are mine, and they are filled

`provenance_depth` follows the **reviewer**, not the field label, because it is a judgement about
sourcing rather than about subject matter, and I am the reviewer who has the files open. All 26 are
filled. Because 2.8's own text says "every economics summary" and those rows are `field=lunar`, each
of the 26 `basis` cells leads with `field=lunar;` so The Engineer can apply the economics 44 alone
if the scope is read off the field — filled either way, and no second pass needed to find out.

---

## Not mine

| finding | sub-step | owner |
|---|---|---|
| `COUNTING_RULE.md` §4 part 3 should read `--index --write`. Bare `--index` writes nothing and exits 0, so a correction can look finished and be permanently red. One word. Measured, not inferred: 11 → 11 → 9 in a staged tree. | the counting rule, §4 | The Designer |
| `AM-93`–`AM-97` are dischargeable, four now and `AM-93` after the regeneration. Reason and ordering above. | 1.14 / the amendment queue | The Systems Engineer |
| **The scratchpad is shared across seats and is not namespaced.** I wrote `scratchpad/collapse.js`; between my write and my `node` call another seat overwrote that exact path with his own collapse script, and my run executed *his* file against *his* target files. It threw before writing, so nothing was damaged, and I verified my two files byte-identical to their backups before continuing. **Two seats collapsing two halves of one defect chose the same obvious filename.** Working files belong under a per-seat subdirectory. | Step 2 working practice | the orchestrator |
| `Q-ECR-KEYS-DEAD`'s `operation:` names the parent file while its 185 was measured on the addendum's `ECR2.tsv`. Left as found; its `predicate:` now says where the figure came from. Fixing it means declaring a run. | 2.16 | The Manager (econ), at 2.16 |
| One of the 70 summaries carries `## Provenance` where the other 69 carry `## Citation`. A patch tool matching only `## Citation` misses `castillo-rogez-2022-ceres-habitability.md` silently. | 2.8 write pass | The Engineer |
| `ECR-12`'s unregistered third side, `imf-1963-appraisal-japan-double-income`. Accepted, lands 2.16, not added here. Its depth row is written and reads `primary`. | 2.16 | The Manager (econ) |

## What I did not do

I did not run `--index`. I did not touch `oracle/AMENDMENTS.tsv`, `QUANTITIES.md`,
`oracle/REGISTER.econ.tsv` or `cr_scratch/merge_plan.tsv`. I did not resolve the A.9 tension. I did
not add `ECR-12`'s third side. I minted no quantity block for any figure in this file: every count
above carries its read-digest and the command that produced it, inline, which is what the brief
asked for and what my allowance permits.

apparatus: check rows +0/-0 | amendment rows +0/-0, five discharging | quantity ids +0/-0, five values corrected in place and five duplicate re-declarations deleted, none minted, none retired | tests +0/-0
