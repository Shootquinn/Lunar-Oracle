# Step 1.7 addendum — the root figure, pinned

**The Engineer. 2026-08-26. Corrects one number in `cr_scratch/step1_7_engineer_naming.md` §8 and
its consequences. Nothing else in that file changes.**

---

## 1. Where 158 came from

The coordinator's guess is right, and it is worse than a typo.

I measured `path.resolve("dst")` with the shell's cwd set to `$SCRATCHPAD/gt` — two probe
subdirectories I had created myself, inside my git bisection harness. Reproduced:

```
process.cwd()   from $SCRATCHPAD/gt   154   ...\scratchpad\gt
resolve("dst")                        158   ...\scratchpad\gt\dst
```

158 = the scratchpad plus `\gt\dst`, 7 characters of my own test scaffolding. I then wrote it into
the spec as "this session's own scratchpad root."

Two things were folded into one number, and both matter:

- **The extra 7 characters** are directories that existed only inside my probe and were deleted.
- **The path form.** `process.cwd()` returns the **long-name** form (`Quinn Morley`). The path I
  reached the scratchpad through in the shell is the **8.3 short** form (`QUINNM~1`). Node resolves
  the same directory to a different length depending on which form it was handed:

```
scratchpad, resolved from the 8.3 short form   147
scratchpad, as returned by process.cwd()       151     (long-name form; 158 - 7)
```

So all three figures on record — my 158, the Manager's ~147, The Designer's 147 — are the same
directory. 147 is the 8.3 form, 151 is the long-name form, 158 is the long-name form plus my
scaffolding. Nobody was wrong about the directory. Everybody was silent about the rule.

**The same shell-mangling produced two more bad numbers during this correction.** A `node -e` string
containing a doubled backslash inside bash single quotes loses its backslashes, so
`literature\power-and-thermal\...` measured 97 instead of 99 and the scratchpad measured 140 instead
of 151. Every length in this addendum was measured from a script *file*, never from `node -e`.
Recording this because it is the mechanism that put the wrong number in a frozen spec, and it will
do it again to a successor.

---

## 2. The figure, pinned

```quantity
id:            Q-SCRATCHPAD-ROOT
class:         live
value:         151
unit:          characters in the absolute path of this session's agent scratchpad directory
population:    one directory: the scratchpad named in this session's system prompt
operation:     script: scratchpad/pin.js — prints the length of path.resolve of the cwd, with cwd
               set to the scratchpad itself, so the OS returns the long-name form
conditions:    cwd: the scratchpad directory, 151 characters in long-name form and 147 in 8.3
               short form. Windows 11 26200, 8.3 name creation enabled on C:. The path embeds a
               per-session UUID and a slug of the project directory, so it is session-specific.
               Measured from a script file, not from a node -e argument: bash strips backslashes
               from a single-quoted -e argument and understates any Windows path by its separator
               count.
at:            2026-08-26; lsei 7f97983; cr-agents f0c976b
predicate:     the absolute path of this session's agent scratchpad directory, in long-name form,
               is 151 characters. In 8.3 short form the same directory is 147.
derived-from:  none
sampled:       n/a — this operation measures a length; the path form is fixed by the operation
               rather than chosen at measurement time, which is the defect being corrected
superseded:    158 (The Engineer, 1.7, 2026-08-26) — measured scratchpad\gt\dst, two probe
               subdirectories of my own bisection harness, and recorded as the scratchpad root;
               the path form was also unstated
```

```quantity
id:            Q-ROOT-ALLOWANCE
class:         fixed
value:         150
unit:          characters of repository-root absolute path allowed by NAMING.md §8, assertion A4
population:    n/a — a budget, not a measurement
operation:     script: 259 - 1 - 108, where 259 is the measured git-for-Windows ceiling and 108 is
               the repo-relative ceiling chosen from the corpus (folder 32 + leaf 64 + 2 separators
               + "literature")
conditions:    cwd: repository root, 55 characters. Asserted against the **long-name** absolute
               form of the repository root, never the 8.3 short form: the long-name form is the
               longer of the two and is what the OS hands to any tool that does not deliberately
               shorten. Independent of core.longpaths.
at:            2026-08-26; lsei 7f97983; cr-agents f0c976b
predicate:     a repository root longer than 150 characters in long-name form fails assertion A4
               and the bootstrap stops before cloning.
derived-from:  Q-PATH-CEILING-259, Q-PATH-BUDGET-108
sampled:       n/a — this operation subtracts, it does not classify
superseded:    none
```

`Q-PATH-CEILING-259` is the bisection in §8 of the original file (259 pass, 260 fail, git
2.55.0.windows.1, `core.longpaths` unset at all three scopes, OS `LongPathsEnabled` 0). It is
unchanged and is not in question. If it does not yet have a block, it needs one; it is quoted in
two files.

---

## 3. The budget, restated

**It does not move. What changes is the claim it makes about itself.**

The original file presented the budget as though the root allowance were arithmetic on a typical
case. It is not, and stating it that way is what let a mis-measured root sit under it unnoticed.
The derivation runs in the opposite direction:

1. **259** is measured. It is the only measured number in the budget.
2. **108** is chosen, from the corpus: folder ≤ 32 covers the longest surviving taxonomy folder
   (31), leaf ≤ 64 covers all 176 names but one, and `10 + 1 + 32 + 1 + 64 = 108`.
3. **150 is the remainder.** `259 − 1 − 108`. It is not derived from any observed root, and no
   observed root was ever evidence for it.

Observed roots are evidence about whether 108 is *affordable*, not about where 150 came from. On
that question, corrected:

| Root | Long-name form | Abs. path of the `lsei` ieee file | vs. 259 | vs. A4 (150) |
|---|---|---|---|---|
| project repository root | 55 | 160 | passes, 99 spare | passes |
| scratchpad, 8.3 short form | 147 | 252 | passes, 7 spare | passes |
| scratchpad, long-name form | 151 | 256 | passes, 3 spare | **fails by 1** |

A4 rejects the long-name scratchpad root by one character. **That is correct behaviour and it is
the budget working, not a false positive:** a checkout at that root is 3 characters from a real
clone failure, and A4 is meant to fire before the failure, not with it. A budget that defends the
worst case is what this is, and the original file should have said so instead of appearing to
describe a typical one.

**A4 governs the repository root** — the directory `literature/` and `findings/` land under. The
scratchpad is never a corpus root, so the row above is a bound on how long tool-generated roots get
on this machine, not a live A4 failure.

The machine-independent half is untouched: repo-relative ≤ 108, folder ≤ 32, leaf ≤ 64, depth
exactly 1. Nothing about the root affects those, and the one name they break is still the ieee file.

---

## 4. What I withdraw

The original §8 says of the 158 figure: *"That is the environment E14 was observed in, and it is
consistent to the character."* **Withdrawn.** It rested entirely on 158.

The corrected arithmetic, measured from a script file:

```
ieee leaf                                      70
literature\power-and-thermal\<leaf>            99
lsei\literature\power-and-thermal\<leaf>      104

a clone destination D fails when |D| >= 160
the bootstrap clones to <repo>\lsei, so it fails when the repo root >= 155
```

**No root I can observe reaches 155.** The long-name scratchpad at 151 passes with 3 characters to
spare. So I cannot name the environment E14 was observed in, and I should not have claimed to.

What survives, and it is the part that mattered: **the leaf name alone cannot be the cause.** The
bisection puts the wall at 259/260, and I re-cloned `lsei` at this repository's own root with
`core.longpaths=false` and the supposedly fatal file checked out at 168 characters. E14's row
records the leaf; the leaf is innocent; the root is the binding variable and the threshold is 155.
The specific root that produced the observation is unidentified, and 4 characters of margin on the
longest root I can find is not a comfortable place to leave it.

**E14 should not be closed on my §8 alone.** It is a governed observation under the counting rule's
G2, and its Finding cell still says the filename was too long. The mechanism is established; the
instance is not reproduced. Recommend the row is corrected to name the root threshold, and left
open pending either a reproduction or an explicit decision that the mechanism is enough.

---

## 5. The FA count, corrected

My §5 and §6 say "ten of the nineteen" carry generic names. **The true figure is 14.** Counted:
files matching `^fa[0-9]+-(deliverable|source-list)\.md$` after case normalization, over the
19-file shelf at `_intake/japanese-miracle/fa/`, 2026-08-26 — 6 `-deliverable` (FA3 through FA8)
and 8 `-source-list` (FA1 through FA8).

I stated ten without counting it. The measurement was available and I did not run it, which is the
one thing I am not supposed to do; the coordinator relaying it uncounted is a second failure of the
same kind, not a substitute for the first. The author's ruling is unaffected — 14 generic names,
plus a prefix for `arithmetic-note.md`, plus case normalization on `FA1-mechanism-table` and
`FA2-verdict-table`, with the two already-correct files untouched, is exactly the rename table in
§5 of the original file. The table was right. The sentence describing it was wrong.

---

*The Engineer, sub-step 1.7, addendum.*
