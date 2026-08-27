
# The counting rule

**Contract version: 1.** Closes loose end E16.

This file governs numbers and measured observations that this project asserts. Every term below is
closed. A value outside a closed set is a failure, not a variant.

Two artifacts implement it: `QUANTITIES.md`, the generated index, and `tools/quantities.js`, the
checker. Neither is a git hook. Per loose end E1 a hook is not a mechanism, because hooks are not
cloned; the checker is a committed script, entered in the check register at sub-step 1.13 and wired
through `core.hooksPath` at 2.14.

## 1. What is governed

A statement is **governed** if either test holds. Both are decided by where the statement sits, not by
judging how important it is.

| # | Test | Example |
|---|---|---|
| G1 | A numeral this project asserts, stated in more than one file. | The corpus union. |
| G2 | A factual claim occupying the Finding or Evidence cell of a loose-ends register row, or any cell of `QUANTITIES.md`. Numeral or prose. | Loose end E14's clone failure. |

**Not governed. Named here so that nobody argues them one at a time:**

- Line and character numbers used as locators — unless the locator is itself the quantity being
  asserted, as in a stated source length.
- Dates, times, and version strings of external software.
- A number quoted from an external source together with its citation. The citation is the rule; class
  `quoted`.
- Sub-step numbers, register row ids, and other addresses.
- A numeral appearing exactly once, in one file, that no other file states.

A governed numeral does not stop being governed because it is inconvenient. **If a number cannot be
ruled, it is not written as a number.** Write the prose — "most", "a majority" — or quote a source
with its citation. There is no marker meaning "unruled but permitted".

## 2. The quantity block

Born in the file of the agent that measures it, in the same edit that first states the number. Fenced
and tagged `quantity`. Twelve keys, all required, in this order. Six may take `none` or `n/a`. None
may be absent.

````
```quantity
id:            Q-PAIR-IDENTICAL
class:         fixed
value:         87
unit:          overlapping filename pairs whose two files are byte-identical
population:    the 95 [Q-OVERLAP-95] filename pairs appearing in both corpora under the
               normalization stated at Q-OVERLAP-95
operation:     cmd: for each pair, normalize CRLF in both files, then compare with `cmp -s`
conditions:    cwd: repository root, 55 characters. No other environment fact affects it.
at:            2026-08-26; lsei f788ea2; cr-agents f0c976b
predicate:     87 of the 95 overlapping filename pairs are byte-identical after CRLF
               normalization; 8 differ.
derived-from:  Q-OVERLAP-95
sampled:       n/a — this operation counts, it does not classify
superseded:    89 / 6 (The Engineer, part 4, 2026-08-26) — same operation, arithmetic error;
               corrected by The Fact-Checker at 0.5
```
````

### Field rules

**`id`** — `Q-` followed by uppercase letters, digits and hyphens. Assigned once. **Never renamed and
never reused.** A rename breaks every site that quotes it; a reuse silently rebinds them. An id is not
a markdown link target: writing `[Q-X](...)` is a failure.

**`class`** — a closed set of five.

| Class | Meaning | Consequence |
|---|---|---|
| `fixed` | The value cannot change without a decision by this project. | Checked for agreement across every site that quotes it. |
| `live` | Read from a source that moves on its own: a git ref, a file count, an upstream state. | **Never quoted as a bare literal, in any file including its own.** Every statement carries the value, the timestamp, and the command. The checker re-runs the command and reports drift. |
| `provisional` | Measured, and scheduled for re-measurement at a named sub-step. | The sub-step is named in `conditions`. Quoting it without the word "provisional" or the sub-step is a failure. |
| `quoted` | Taken from an external source, not measured here. | `operation` is the citation. This project does not own the number and does not correct it. |
| `superseded` | Replaced by another id. | `value` is retained and the block names its successor. **Never deleted:** numerals outlive their corrections in derived documents, and a successor meeting the old figure must be able to resolve it to something. |

**`value`** — the number; or, for a governed observation, the claim in one sentence. A range is written
with endpoint membership explicit: `357–686 inclusive`. A value that is a range and also has a length
states both, and the two reconcile by arithmetic stated in the block.

**`unit`** — the noun the number is a number *of*, specific enough that two readers build the same set.
"Lines" is not a unit. "Lines of JavaScript between the fences, fences excluded" is.

**`population`** — the set the value was drawn from, stated so that a successor can rebuild it. If the
population is itself a governed quantity, name it by id and list it under `derived-from`.

**`operation`** — exactly one of three forms. Prose is not an operation.

| Form | Written as | Requirement |
|---|---|---|
| command | `cmd: <shell>` | Runnable as written, from the `cwd` named in `conditions`. |
| script | `script: <path> <args>` | The path is committed in this repository. |
| manual | `manual: <who>; <what they did>; <how many items inspected>` | The item count is a number, not "several". |

**`conditions`** — every environment fact that would change the value if it were different and that is
not already implied by `population` and `operation`. **For any `cmd:` or `script:` operation,
`conditions` always names the working directory and its character length.** That clause exists because
of loose end E14: the clone that failed failed on the length of its root, the row recorded the leaf,
and a successor would have shortened the filename and left the cause. `none` is permitted and is a
claim.

**`at`** — ISO date, then the short ref of every repository the measurement depended on, or `none`. A
measurement over `lsei/` that does not name an `lsei` ref is incomplete.

**`predicate`** — the full sentence the number licenses, containing the noun that must appear wherever
it is quoted. This is the field that separates what was measured from what it was called. A quotation
whose surrounding noun is not the predicate's noun is a violation of §3, whoever wrote it.

**`derived-from`** — the ids this value rests on, or `none`. Cited ids must exist. The graph is
acyclic.

**`sampled`** — required non-`n/a` whenever the operation **classifies**: matches, pairs, labels, or
assigns anything to a category. Written as `N inspected by hand, M found wrong, by <who>`. A counting
operation is verified by re-running it; a classifying operation is not, because a wrong rule computes
a clean number. `sampled: none` is legal and is a visible admission.

**`superseded`** — every prior value this id has held, each with its date, its author, and one clause
saying what was wrong. **Never pruned.** A block carrying many entries is a signal that the quantity
should be `live` rather than `fixed`, and that is the entry's second use.

## 3. Quotation

**A governed numeral stated outside its birth file is written `<value> [<id>]`.** The brackets are the
referent. Without them the numeral is a string that happens to match.

```
87 [Q-PAIR-IDENTICAL] of the 95 [Q-OVERLAP-95] overlapping pairs are byte-identical.
```

1. **A bare governed numeral in a second file is not quotable.** The checker fails; see §5.
2. **A `live` quantity is never quoted as a bare literal.** It is written
   `7f97983 (as of 2026-08-26; git -C lsei rev-parse --short HEAD) [Q-LSEI-HEAD]`. A ref copied into
   prose is a snapshot of a moving value and it goes stale in one commit, which is what happened to
   four sites when `lsei` moved from `f788ea2` to `7f97983`.
3. **A `provisional` quantity is quoted with the word "provisional", or with the sub-step that
   replaces it.**
4. **The noun beside a quotation is the noun in `predicate`.** If the sentence needs a different noun
   it needs a different quantity, or it needs no number.
5. **Prose written for a reader who is not this project** — the repository's opening paragraphs, a
   README — **may omit the tag only by omitting the numeral.** "The corpus" is permitted. "The
   176-file corpus" without a tag is not.
6. **A distance or offset is never stated relative to an unnamed datum.** "Twelve lines above the
   block" is not a location; `lines 349–350 of lsei/report-generator-prompt.md` is. This applies to
   spelled-out numbers as well as to digits.
7. **A relative-time word in a register cell carries its datum.** "yet", "still", "currently",
   "already", "now" state as of when, or are removed. A Finding cell recording what was true at
   discovery is written in the past tense.

## 4. Correction

A correction to a governed quantity is one edit with four parts, and it is not complete until all four
are done:

1. Edit `value` in the block. Do not edit `id`.
2. Move the old value into `superseded`, with date, author, and what was wrong.
3. Re-run `tools/quantities.js --index` to regenerate `QUANTITIES.md`.
4. Run `tools/quantities.js --check`. It enumerates every site quoting the id. Every site it lists is
   updated in this same edit, or the correction is not finished.

**Step 4 is the point of the naming scheme.** The sites are not remembered, they are computed. A
correction that reaches one site and not its echoes is the failure this contract exists to remove, and
it is removed by making the echo list a command rather than an act of recall.

**A correction to a quantity that others derive from marks those STALE.** The checker reports every id
whose `derived-from` names a block corrected after that id's own `at`. Stale is a report, not an
automatic correction: the derived value may be unaffected, and only its owner can say.

## 5. What "not quotable" means

Three consequences. Each names who or what applies it.

| Violation | Applied by | Effect |
|---|---|---|
| A quotation tag resolving to no block; two blocks sharing an id; a block missing a key; a `derived-from` naming a non-existent id or forming a cycle. | `tools/quantities.js --check`, exit 1 | **The check fails. The sub-step does not close.** |
| Two sites quoting one id with different numerals; a regenerated index differing from the committed one; a stated range whose arithmetic does not close. | `tools/quantities.js --check`, exit 1 | **The check fails.** |
| A `live` value quoted as a bare literal; a bare governed numeral in a second file; a relative offset with no datum. | `tools/quantities.js --lint`, exit 0 with findings | **Reported. Dispositioned by the persona who owns the sub-step.** These carry false positives and do not block on a script's judgment. |
| A `predicate` that does not license the sentence beside it; a `conditions: none` that is untrue; a `sampled` field describing a sample that did not happen. | The reviewing persona, at the gate. | **The deliverable is rejected.** No script asserts these. |

An unruled governed number in a deliverable is not annotated, softened, or marked. It is removed, or
it is ruled.

## 6. What is retrofitted, and what is not

Three tiers. The contract applies forward from the moment it lands and does not hold the project
hostage to its own backlog.

**Tier 1 — before the next correction lands.** The 27 rows of the echo site registry become quantity
blocks, and every value corrected during Step 0 or the Step 1 open becomes a block. These are by
definition the multi-site values: the registry exists because they are quoted in more than one place.
Most already carry a definition, so the work is filling `conditions`, `at`, `predicate` and
`derived-from`.

**Tier 2 — the touch rule. This is the clause that does the work.** *A governed quantity that is
edited, corrected, re-measured, or newly quoted after this contract lands is brought into form as part
of that edit.* Not before it and not scheduled after it. Every future correction becomes the retrofit
of exactly one number, at the moment somebody already has that number's context loaded — the only
moment the rule is cheap.

**Tier 3 — never.** Everything in §1's not-governed list. The two plan artifacts hold 261 occurrences
of a two-or-more-digit integer that is not a four-digit year; most are locators. A contract demanding
blocks for all 261 would be abandoned in a day, and a contract abandoned in a day catches nothing.

**The Tier 2 / Tier 3 boundary is not a judgment call at edit time.** If a second file wants to state a
Tier 3 numeral, that numeral has become governed by test G1, and it is ruled at that moment or it is
not written as a numeral.

## 7. `QUANTITIES.md`

Generated by `tools/quantities.js --index`. Never hand-edited: a hand edit is overwritten by the next
regeneration and detected by the next check.

It replaces §8 of `cr_scratch/step0_integration_draft.md`, which becomes a one-line pointer. Two
hand-maintained records of one value is the defect; leaving §8 in place beside the generated index
would reproduce it exactly.

**It declares its own size** — block count in total and per class, above the table — so that a row lost
to a bad splice is detectable by counting. The loose-ends register carries this device and it works.
The echo site registry does not carry it, and holds 27 rows nobody has counted.

Columns: id, value, short unit, class, `at`, birth file, superseded count. The full block is read at
the birth file, whose path the index carries. The index is an index.

## 8. The declared file set

`tools/quantities.js` scans, for both blocks and quotation tags:

```
*.md                         (repository root)
cr_scratch/**/*.md
tools/**/*.js
oracle/**                    when it exists
literature/**/*.md           when it exists
```

It does not scan `lsei/` or `cr-agents/`. Those are read-only working copies of upstream authorities
and this contract does not govern their contents. Quantities measured *over* them are born in this
repository and carry their refs in `at`.

**A block may be moved between files in the declared set; its id does not change.** When a birth file
is superseded its blocks move rather than being rewritten. **A block may not be edited into a different
quantity:** a different population or a different operation is a different id.

