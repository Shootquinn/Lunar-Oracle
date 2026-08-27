# Sub-step 1.12 — The Designer: the counting-rule contract

**Project:** Lunar Oracle
**Date:** 2026-08-26
**Sub-step:** 1.12. Closes loose end E16.
**Reviewed for mechanizability by:** The Software Engineer. §7 is written for him and is the only
section he needs.
**Deliverable:** everything between `<!-- BEGIN COUNTING_RULE.md -->` and
`<!-- END COUNTING_RULE.md -->` in §5, liftable verbatim to `COUNTING_RULE.md` at the repository
root:

```
sed -n '/^<!-- BEGIN COUNTING_RULE.md -->$/,/^<!-- END COUNTING_RULE.md -->$/p' \
  cr_scratch/step1_12_designer_counting_rule.md | sed '1d;$d' > COUNTING_RULE.md
```

**Status:** this file does not modify the gameplan, the integration draft, or the register. It
specifies the form the held corrections should be applied in, and §8 says which of them are blocked
on it and which are not.

---

## 1. The diagnosis. E16 names the symptom; the missing referent is the cause.

E16 says this project generates counts faster than it records the rules that produced them. That is
true and it is the second half of the failure. My 1.0 cold read found the first half independently:
**every blocking failure in this artifact is a correction that reached one site and not its echoes.**
The two files disagree about the current state of the project in seven places, and each of the seven
is one number, one ref, or one status corrected in one place while its copies stood. (Counting rule,
since this file is subject to its own contract: the seven are the disagreements enumerated in the 1.0
verdict, not the eight items in its blocking-failure list, which includes absences as well as
disagreements.)

Those are not two problems. A number written into this project is a numeral and nothing else. `87` in
the gameplan and `87` in the echo registry are two independent strings that happen to agree. Nothing
connects them, so nothing can sweep them. The echo registry was built to connect them and cannot: it
is a hand-maintained parallel copy, which is why it read `89 / 6` after the prose had been corrected
to `87 / 8`. A second hand-kept copy of a value is a second thing to forget.

So the rule the contract states is not only "record how you counted." It is:

> **A quantity this project asserts has a name. Every site that states it states the name. A
> correction edits the definition, and the sites are found by searching for the name.**

A counting rule attached to a numeral with no name is a rule that cannot be swept, and an unsweepable
rule produces exactly the nine instances below: correct at birth, wrong three edits later, and wrong
in a place nobody thought to look.

The design term for it is that the numerals in this project are signifiers with no referent. `87`
signifies a quantity and points at nothing, so the reader supplies the referent from context and two
readers supply two different ones. That is instance 5 exactly: `328`, `330`, `357` and `686` are all
correct, and all point at different objects the document never separates.

**Consequence for the shape of the contract.** Half of it governs the moment of measurement (§3, the
fields) and half governs the moment of quotation (§4, the name). The second half is the load-bearing
half. A project that recorded perfect rules and went on quoting bare numerals would reproduce
instances 1, 3 and 7 unchanged.

---

## 2. Scope ruling: does this govern measurements, or only counts?

I was told to argue this rather than assume it. Instance 9 is the forcing case. Register row E14
records "Windows long paths break a fresh clone," names a file that fails to check out, and omits the
condition that produced it. The file checks out fine. I verified it independently of both The
Engineer and The Manager:

```
$ python -c "import os; print(len(os.path.abspath('lsei/literature/power-and-thermal/ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update.md')))"
160
$ git -C lsei config --get core.longpaths
(no output, exit 1 — unset)
$ python -c "import os; print(len(os.path.abspath('.')))"
55
```

160 absolute characters against The Engineer's bisected ceiling of 259, `core.longpaths` unset, file
present on disk. E14 is not false — the clone did fail — but what failed was a clone whose *root* was
long, and the root is the variable the row does not record. A successor reading E14 shortens the
filename and leaves the cause standing.

**The case against extending.** E16 says counts. A contract over "measurements" governs nearly every
empirical sentence this project writes, and a contract that governs everything is applied to nothing.
The mechanism also differs in kind: a numeral can be linted by regex and a prose observation cannot.
Extending the word without extending the enforcement buys a broader claim and no broader coverage.

**The case for extending.** The field decomposition does not change. A count is a measurement whose
operation happens to be `wc -l`. Run E14 through the fields in §3 and the one that is missing is
`conditions:` — the same field instance 3 needed (a count measured against a 158-file basis that had
already become 152) and the same field instance 7 needed (the ref moved). The field is in the
contract for the counts regardless. Excluding observations means writing the field, watching it catch
three count defects, and then declining to apply it to the one instance that named it.

**Ruling. Extend, and bound the extension by location rather than by kind.** The contract governs:

1. **any numeral this project asserts that is stated in more than one file**, and
2. **any factual claim occupying a row of the loose-ends register or of the quantity index**, numeral
   or not.

Both tests are decided by looking at where the statement sits, which is why they are usable at edit
time. E14 is governed by (2). A sentence in an agent's own reasoning that no register row rests on is
governed by neither and stays free.

**The cost of the extension is not symmetric, and saying so is part of the ruling.** A governed
numeral gets the full apparatus: the name, the sweep check, the arithmetic checks, the staleness
graph. A governed observation gets the required fields and the human checks in §7, and none of the
numeral lints. The extension is real and it is weaker, and a contract that did not say so would be
claiming enforcement it does not have.

---

## 3. What a counting rule consists of. The Manager's five, tested and corrected.

The five proposed were: what was counted, over what population, by what operation, under what
conditions, at what time or ref. I ran all nine instances against them. **Four survive intact, one
gains a form constraint, and three are missing.**

| Proposed field | Verdict after the nine |
|---|---|
| what was counted | Keep, as `unit`. The noun the number is a number *of*. Instance 5 turns entirely on it: lines-of-source against lines-of-span against fence-line-numbers. |
| over what population | Keep, as `population`. Instances 3 and 5 are population failures. It is the field most often assumed and least often written. |
| by what operation | Keep, as `operation`, **with a form constraint**. Instance 4 stated an operation in prose — "pair by directory adjacency" — that was never executed. Prose is not an operation. §5 closes the set to three forms. |
| under what conditions | Keep, as `conditions`, **and require it even when it is empty**. Instance 9 is this field's absence, and an absent field is invisible while a field reading `none` is a claim somebody can falsify. |
| at what time or ref | Keep, as `at`. Instance 7 is this field. It carries a date and the short ref of every repository the measurement touched. |
| — | **Missing: `predicate`.** The sentence the number licenses. Instance 2 satisfies all five proposed fields and still produces "13 contaminated abstracts": the measurement was overlap, the word was contamination, and no field held the claim so that the two could be compared. |
| — | **Missing: `derived-from`.** The ids this value rests on. Instance 3 is a derived quantity whose basis moved. Without the edge, staleness is something a human happens to notice; with it, staleness is a graph traversal. |
| — | **Missing: `class`.** Instance 7's git ref is not the same kind of object as instance 5's line count. One is read from a source that moves on its own and the other is fixed forever. A contract that treats them alike either over-polices the fixed ones or under-polices the live ones. |

One further field is conditional rather than universal: **`sampled`**, required only where the
operation classifies rather than counts. Instance 4's rule, once implemented, ran and produced a
number and matched a UN treaty summary to a Deming quality-control paper. A counting operation is
verified by re-running it. A classifying operation is not, because a wrong rule computes a clean
number. It is verified by opening the output, which is The Engineer's own method at 0.2 and the only
thing that caught instance 4.

**Design decision: every field is required, and six of them may take a literal `none` or `n/a`.** An
omitted field is invisible; a field forced to read `none` is a decision a reviewer can disagree with.
E14's whole defect is an omission nobody could see, and the cheapest structural fix available is to
make the omission occupy a line.

---

## 4. Where quantities are born, and what travels with them.

**They are not born in the echo registry.** E16 says this and it is right. §8 of the integration draft
holds 27 rows and a "what exactly is counted" column, and it was still reading `89 / 6` after the
correction, because it is a second copy of numbers whose first copy lives elsewhere. Two hand-kept
copies of a value is the failure, not the cure.

**They are born in the file of the agent that measured them, in the same edit that first states the
number.** Three reasons, and one of them is about how this project actually runs:

- The measuring agent has the command in its buffer at that moment and at no later moment. Every rule
  this project failed to write was a rule that was cheap for ten seconds and expensive afterwards.
- Multiple agents run in parallel here. A shared append-target is a merge-conflict generator; an
  agent's own output file is not.
- A birth record in the file that produced it is auditable against the reasoning that produced it. A
  registry row is not.

**The index is generated, never hand-written.** `QUANTITIES.md` at the repository root is produced by
scanning the declared file set for quantity blocks. It replaces §8 of the integration draft. This is
what structurally kills instance 1: the index cannot disagree with the prose about a value, because
the index does not hold values — it holds a rendering of the blocks that hold them, and a check
regenerates it and diffs.

**What travels from the moment of measurement is the name, not the number.** Every restatement outside
the birth file is written `87 [Q-PAIR-IDENTICAL]`. The numeral is there for the reader; the name is
there so that a machine can enumerate every site, and so that a correction is a search rather than an
act of recall.

---

## 5. THE DELIVERABLE

Everything between the markers lifts to `COUNTING_RULE.md` unedited.

<!-- BEGIN COUNTING_RULE.md -->

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

<!-- END COUNTING_RULE.md -->

---

## 6. The nine instances, tested against the contract as written

The instruction was to state for each whether the contract would have prevented it, and to say so
plainly where it would not rather than adjust the instance. **Six prevented, three partial. No
instance was adjusted.**

### Instance 1 — `89 / 6` corrected to `87 / 8`, registry left stale. **PREVENTED.**

Two mechanisms, either of which is sufficient. Under §3 both sites write `[Q-PAIR-IDENTICAL]`, so the
correction's step 4 enumerates them; a site left stale is two numerals under one id and
`--check` exits 1. Under §7 the registry does not hold the value at all — it is regenerated from the
block — so the class of defect where a parallel copy drifts does not exist. The second mechanism is
the structural one and it is why §7 forbids hand-editing the index.

### Instance 2 — "13 contaminated abstracts", corrected to 4. **PARTIAL. Not prevented.**

This is the instance the Manager's five fields miss and mine only half-catch. The measurement was
sound: a shingle detector over paired summaries returned its number. The defect is that the number was
restated under a noun the operation never established. A shingle detector measures overlap, not
passing-off, and no field of any contract makes a script able to tell the two apart.

What the contract does: `predicate` forces the measuring agent to write the licensed sentence —
"summaries reproducing verbatim text from their source's printed abstract at or above 10% 10-gram
overlap" — and §3 rule 4 makes "13 [Q-ABSTRACT-OVERLAP] contaminated abstracts" a violation that a
reviewer reading the block can see in one glance. That is **visibility, not prevention**. The
violation is legible; nothing stops it being written.

What would prevent it: nothing that is a document. The two things that reduce it are already in this
project and neither is mine — The Editor's deletion test applied to the noun rather than the sentence,
and The Engineer's discipline of opening the file. I record it as residue in §9 rather than claim it.

### Instance 3 — corpus union `182` corrected to `176`. **PREVENTED.**

`Q-UNION` carries `derived-from: Q-LIT-COUNT, Q-INTAKE-COUNT, Q-OVERLAP-95`. The dedup that took the
literature count from 158 to 152 is a correction to `Q-LIT-COUNT` with a later `at` than `Q-UNION`'s.
`--check` reports `Q-UNION` STALE, along with `Q-SE-UNIQUE` and every other figure on that basis, and
it reports them as a set rather than one at a time. The arithmetic note now in the integration draft —
"any document quoting a corpus count must also quote its basis" — is this rule stated once in prose
for one family of numbers; the contract makes it a property of every derived quantity.

### Instance 4 — "143 of 158 pair by directory adjacency". **PARTIAL.**

The contract catches the half that was an assertion and misses the half that was a wrong rule.

Caught: §2's `operation` field admits three forms and prose is not one of them, so "by directory
adjacency" cannot be recorded as written. It becomes a command or a script, which means it is run, and
running it is what produced the Deming/UN-treaty match. `sampled` is required non-`n/a` because
pairing is classification, so the block either records an inspection or records `sampled: none` where
a reviewer will see it.

Not caught: a classification rule can run cleanly and mean nothing. Adjacency computes a perfectly
good number over a population where adjacency is a symptom of the real rule rather than the rule. No
script asserts that a rule is the right rule, and `sampled: 20 inspected, 0 wrong` is a sentence
anybody can type without inspecting anything. **The residue is that the contract can force the
question and cannot verify the answer.**

### Instance 5 — C4's `328` / `330` / `357–686` in one sentence. **PREVENTED.**

Three quantities, three ids, and §2's `value` rule requires endpoint membership on a range. The
sentence becomes: the fenced block is `357–686 inclusive [Q-C4-FENCE-SPAN]`, 330 lines; the source
inside it is `328 [Q-C4-SOURCE-LEN]` lines, `358–685 inclusive`, with
`derived-from: Q-C4-FENCE-SPAN`. `--check` recomputes `686 − 357 + 1 = 330` and asserts the stated
length matches. The three numbers stop competing for one referent, which is the actual defect: all
three were true and the reader had no way to know of what.

### Instance 6 — "Twelve lines above the block". **PREVENTED.**

§3 rule 6 makes a bare offset inadmissible and the lint finds them. Tested against the current tree,
and the test corrected the lint: a digits-only regex finds one occurrence in the repository and misses
the live one, because the defect is spelled out.

```
$ grep -rnoE '[0-9]+ lines? (above|below|before|after)' --include=*.md .
./cr_scratch/step1_0_designer_coldread.md:477:343 lines before

$ grep -rnoiE '(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|[0-9]+) lines? (above|below|before|after)' --include=*.md .
./cr_scratch/step1_0_designer_coldread.md:477:343 lines before
./cr_scratch/step1_0_designer_coldread.md:693:Twelve lines above
./cr_scratch/step1_0_designer_coldread.md:694:seven lines above
./cr_scratch/step1_0_designer_coldread.md:695:Two lines above
./cr_scratch/step1_orchestrator_verification.md:52:Twelve lines above
./lunar-oracle-gameplan.md:664:Twelve lines above
```

The second form fires on the live instance at `lunar-oracle-gameplan.md:664`. It also fires on three
lines of my own 1.0 file, which is correct: two of those are the corrected forms and one, "343 lines
before", is the same defect in my own prose. The lint does not exempt its author. The Software
Engineer takes the second regex, not the first.

### Instance 7 — the `lsei` ref moved and four sites went stale in one commit. **PREVENTED.**

`class: live` is in the contract for this instance. A git ref is read from a source that moves without
this project's involvement, so §3 rule 2 forbids quoting it as a bare literal anywhere, and
`--check` re-runs `git -C lsei rev-parse --short HEAD` and compares. The four sites are found because
they all carry `[Q-LSEI-HEAD]`; the drift is found because the command is in the block rather than in
somebody's memory of how the number was obtained. This is also the instance that most clearly shows
why the contract needs both halves: perfect rules on a bare literal would still have gone stale.

### Instance 8 — row A8's Finding denies its own Status. **PARTIAL, and it is not a counting failure.**

I am not going to claim this one whole. The row's Finding cell says "neither is fixed anywhere yet"
while its Status says CLOSED and pushed. That is a row-coherence defect, and it belongs to test W-D-12
of my 1.0 suite — no row's Finding cell asserts a state its Status cell denies — where it already sits
and where it should stay.

The half the contract does own is the word "yet". A relative-time word with no datum is the temporal
form of instance 6's "twelve lines above": a measurement stated against an origin the reader has to
guess. §3 rule 7 covers it, and it lints. Scoped to Finding cells of rows whose Status is a closed
state, it returns six hits across the 44-row register — reviewable, and it includes A8's:

```
$ awk 'NR>=624 && NR<=700' lunar-oracle-gameplan.md \
    | grep -E '\*\*(FIXED|CLOSED)|CLOSED,' | grep -onE '\b(yet|currently|still|already)\b'
5:already
6:yet
10:still
10:still
11:still
11:already
```

Unscoped over the same range it returns thirteen, which is why the scope is in the rule. **Verdict:
the lint would have raised A8 for review. It would not have decided it, and the contract does not
claim the row-coherence half.**

### Instance 9 — E14 recorded without its conditions. **PREVENTED, with the caveat named.**

The `conditions` field is required, cannot be omitted, and for a `cmd:` operation must name the
working directory and its character length. E14's block cannot be written without recording that the
failing clone was made into a root of ~147 characters, at which point the row reads "a clone into a
root of that length fails" rather than "this filename is too long", and the two fixes it needs — a
root-length ceiling and `core.longpaths` — are both visible.

**The caveat, and it is the one the whole extension in §2 rests on.** A script can assert that
`conditions` is present and non-empty. No script can assert that it is complete or true. Had the
observer written `conditions: cwd: repository root` when the clone was in fact made elsewhere, every
mechanical check passes and E14 is wrong in the same way. What the contract converts is an invisible
omission into a visible claim, and a visible claim is falsifiable by the next person who reads it —
which is exactly how The Engineer falsified it at 1.7. That is a real gain and it is smaller than
prevention, and §9 records it as residue.

### Scorecard

| # | Instance | Verdict | Mechanism |
|---|---|---|---|
| 1 | 89/6 → 87/8 | **PREVENTED** | Generated index; sweep check M3 |
| 2 | "13 contaminated" → 4 | **PARTIAL** | `predicate` makes it visible; nothing blocks it |
| 3 | union 182 → 176 | **PREVENTED** | `derived-from` staleness graph, M4 |
| 4 | 143 by adjacency | **PARTIAL** | Operation must be executable; sampling forced, not verified |
| 5 | 328 / 330 / 357–686 | **PREVENTED** | Endpoint membership; range arithmetic, M10 |
| 6 | "twelve lines above" | **PREVENTED** | Datum rule; lint M8, with the corrected regex |
| 7 | `lsei` ref stale | **PREVENTED** | `class: live`, M5 |
| 8 | A8 Finding vs Status | **PARTIAL** | Owns the datum half only; row coherence stays with W-D-12 |
| 9 | E14 conditions | **PREVENTED** | Forced `conditions`, with `cwd` mandatory for commands |

---

## 7. For The Software Engineer: what mechanizes and what does not

Every clause below is either **M** (a script asserts it, and the command or property is named) or
**H** (a human decides). Nothing is listed as M unless I can name what the script compares.

### Mechanical

| # | Clause | What the script does | Exit |
|---|---|---|---|
| M1 | Every quantity block is well-formed | Parse fenced blocks tagged `quantity`; assert the key set equals the twelve declared keys exactly, and no value is empty. Set equality on strings. | 1 on failure |
| M2 | Every quotation tag resolves | Collect tags matching `\[Q-[A-Z0-9-]+\]` over the declared file set; collect `id` values from blocks; assert the tag set is a subset of the id set, and that ids are unique. Catches parallel agents minting one id twice. | 1 |
| M3 | **The sweep check.** Every site quoting an id states its current value | Capture `(\S+)\s*\[(Q-[A-Z0-9-]+)\]`; group by id; assert one distinct numeral per id, equal to the block's `value`. | 1 |
| M4 | The derivation graph is sound and staleness is reported | `derived-from` ids exist; graph is acyclic (topological sort); for each edge, assert the parent's `at` is not later than the child's. A later parent marks the child STALE. | 1 for missing/cyclic; report for STALE |
| M5 | `live` values are current | For each `class: live` block, run the `operation` command, compare stdout to `value`. | Report drift, not exit 1 — the value may legitimately have moved and only its owner rules on that |
| M6 | The index is not hand-edited | Regenerate `QUANTITIES.md` in memory and `diff` against the committed file. | 1 on any difference |
| M7 | The index declares its own size correctly | Parse the declared total and per-class counts from the header; compare against rows emitted. | 1 |
| M8 | No bare relative offsets | `grep -rnoiE '(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|[0-9]+) lines? (above|below|before|after)'`. **Use this regex, not the digits-only form** — tested in §6, the digits-only form misses the live instance. | 0 with findings |
| M9 | No undated relative-time words in closed register rows | Over register rows whose Status contains `FIXED` or `CLOSED`, `grep -onE '\b(yet\|currently\|still\|already)\b'` in the Finding cell. Six hits on the current register, thirteen if unscoped; the scope is load-bearing. | 0 with findings |
| M10 | Range arithmetic closes | For a `value` matching `(\d+)[–-](\d+) (inclusive\|exclusive)`, compute the span; if the block or a derived block states a length, assert equality. | 1 |
| M11 | `cmd:`/`script:` operations declare a `cwd` | Assert `conditions` contains `cwd:` when `operation` begins `cmd:` or `script:`. | 1 |
| M12 | Ids are not markdown link targets | Assert no `\[Q-[A-Z0-9-]+\]\(` occurrence. | 1 |

M3, M4 and M6 are the three that matter. M3 removes the failure mode behind all seven of the
two-file disagreements found at 1.0; M4 removes instance 3's class; M6 removes instance 1's class
structurally rather than by vigilance. If the review has to cut, cut from the lints.

**One implementation note that is not optional.** M1 through M12 run over the declared file set in §8
of the contract and must not walk `lsei/` or `cr-agents/`. Those trees hold 152 and several hundred
markdown files respectively, none of them ours, and a checker that walks them will produce a wall of
findings about somebody else's documents on its first run and be switched off on its second.

### Human

| # | Clause | Why no script |
|---|---|---|
| H1 | `predicate` licenses the sentence it appears beside | Requires knowing what an operation establishes. Instance 2. |
| H2 | `population` is the set the reader will assume | Requires modelling a reader. Instance 5's deeper half. |
| H3 | `conditions: none` is true | A script asserts presence, never completeness. Instance 9, and the limit on §2's extension to observations. |
| H4 | `sampled` describes a sample that happened | Unverifiable by construction. Instance 4. |
| H5 | The rule is the right rule | A wrong classifier computes a clean number. Instance 4. |
| H6 | Whether a Tier 3 numeral has become governed | Test G1 is mechanical *after* the second file exists; the person writing the second file decides in advance. |

**H1 through H5 are the contract's honest surface.** They are what the reviewing persona checks at the
gate, and they are the reason §5 lists "the deliverable is rejected" as a consequence alongside the
two script exits. A contract whose only consequence is a script exit would be claiming that the four
things a script cannot see do not happen.

---

## 8. What this unblocks, and what it holds

The Manager is holding corrections for this contract. **He should not hold them any longer, and the
contract is written so that he does not have to.**

**Not blocked. Apply now, each as one edit with a block.** The corrections from my 1.0 run — F-1
through F-22 — are Tier 2 by the touch rule: each touches a number, and each brings that one number
into form as part of its own edit. Concretely, the corrections that mint a block are F-2 (the sub-step
total), F-13 (the abstract count), F-14 (the DOI figure), F-15 (the `lsei` ref, as `class: live`) and
the C4 line-count fix. The rest touch no governed numeral and proceed unchanged. **No correction waits
for `tools/quantities.js` to exist**; the block is a text form and the checker verifies later what the
form already recorded.

**Blocked until the checker exists.** Nothing. The checker's absence means M1–M12 do not run yet, which
is a gap in verification, not a gap in the record.

**Owed, and by whom.**

- **The Software Engineer**, at his 1.12 review: whether M1–M12 are the right twelve, and whether the
  single-script two-mode shape (`--check` / `--index` / `--lint`) is right against this project's
  existing two-script convention in `tools/`.
- **Sub-step 1.13, the check register.** `tools/quantities.js` is a committed check that something must
  invoke; that is E8's exact complaint and 1.13's exact subject. It enters the register with: what it
  asserts (M1–M12), what invokes it (the sub-step gate), when it fires (before any sub-step closes
  that edited a governed quantity), what a failure does (the sub-step does not close), what its
  authority is (this contract).
- **Sub-step 2.14**, which installs `core.hooksPath` and adds this checker to what runs there.
- **Sub-step 1.7, The Engineer.** His path-length budget's root allowance is a governed quantity and
  should be born as a block; see §9's second new instance for why it matters more than it looks.
- **The Manager.** Whether `COUNTING_RULE.md` and `QUANTITIES.md` sit at the repository root. I have
  specified the role and named a default; the placement is his.

---

## 9. Residue, and two new instances found while writing this

### What the contract does not catch

1. **A number correctly measured and wrongly named.** Instance 2. `predicate` makes the mismatch
   legible to a reader who opens the block; nothing blocks the writing of it. What would catch it is a
   reviewer applying The Editor's deletion test to the noun rather than to the sentence: delete the
   noun, and ask whether the operation's own word would have carried the claim. That is a review
   practice, not a contract clause, and I am not going to smuggle it in as one.
2. **A classification rule that runs cleanly and means nothing.** Instance 4. `sampled` forces the
   question and cannot verify the answer. What would catch it: the sample being a committed artifact —
   the N inspected items listed by name in the block, so that a successor can re-inspect three of them.
   I considered requiring that and rejected it: a block carrying twenty file paths is a block nobody
   writes. The compromise is that `sampled` names the inspector, which makes it attributable.
3. **A `conditions` field that is present, plausible, and wrong.** Instance 9. The extension of §2 from
   counts to observations buys visibility and not verification, and §2 says so at the point of ruling
   rather than here.
4. **Row-level coherence.** Instance 8's Finding-versus-Status contradiction. It belongs to W-D-12 and
   stays there. A counting contract that claimed it would be claiming a test somebody else already
   wrote.
5. **A quantity nobody thought to name.** The contract governs numerals that get stated. It has nothing
   to say about a number that should have been measured and was not, which is a different loose end
   and not this one.

### Two live instances of E16, found while testing the contract

**New instance A. The accumulator and the register disagree about the register's size.**
`accumulator.md:103` records that the loose ends register "declares 42 rows across five lettered
tables". `lunar-oracle-gameplan.md:619` declares 44 — "A 8, B 7, C 5, D 7, E 17" — and holds exactly
that. I raised this in my 1.0 file and it is still live. It is the cleanest instance available of what
1.12 is for: the count moved and the record of it did not, and the stale copy is in the file this team
reads to remember what it decided. Under the contract, `Q-REGISTER-ROWS` is `class: live` — its
operation is a row count over a file this project edits weekly — and M5 would have reported the drift
the day it happened. **Fix: `accumulator.md:103`, 42 to 44.**

**New instance B, and it is the more interesting one. Two sessions have measured "the scratchpad root"
and got 147 and 158.** The Manager's brief to me states the failing clone's root is ~147 characters.
The Engineer at 1.7 writes "this session's own scratchpad root is 158 characters" and builds his
150-character root allowance against the number. My own session's scratchpad root measures 147:

```
$ python -c "print(len(r'C:\Users\QUINNM~1\AppData\Local\Temp\claude\C--Users-Quinn-Morley-onedrive-projects-cc-lunar-oracle\2057f7d9-da16-457b-9142-0e16ec635b80\scratchpad'))"
147
```

**Both may be correct.** The difference is eleven characters and there are at least two populations
that would produce it — the 8.3 short form `QUINNM~1` against the long form `Quinn Morley`, and a
subdirectory below the scratchpad root against the root itself. Neither statement names which, so
neither can be reconciled with the other, and this is instance 5 again in a different unit: two true
numbers, one name, no rule separating them.

It is not cosmetic. The Engineer's budget allows 150 characters of root and closes on the measured
259-character ceiling exactly. Against a root of 147 it holds with three characters of slack. Against
158 it is already eight characters over before a single filename is written, and the ceiling that his
arithmetic proves is closed would be open. **A path-length budget tuned against the wrong measurement
of its own binding variable is the same defect as a corpus figure measured against the wrong basis,
which is instance 3.** Under the contract, `Q-SCRATCH-ROOT-LEN` is `class: live` with `conditions`
naming the path form, and the two numbers become two ids or one reconciled one.

I am not ruling that The Engineer is wrong. I am recording that neither number can be checked against
the other as written, and handing it to 1.7 with the arithmetic that makes it worth checking.

---

## 10. Summary of what 1.12 asserts

- E16's cause is not only unrecorded rules. It is that this project's numerals have no referent, so a
  correction cannot be swept and the echo registry — the instrument built to prevent this — is a
  second hand-kept copy of the values it is meant to police.
- The contract therefore has two halves: twelve required fields at the moment of measurement, and a
  mandatory name at every moment of quotation. The second half is load-bearing.
- Scope extends from counts to measured observations, bounded by location (register rows and the
  index) rather than by kind, and the extension is weaker than the numeral half by exactly the amount
  §2 states.
- Quantities are born in the measuring agent's own file. The index is generated and never hand-edited.
  §8 of the integration draft becomes a pointer.
- "Not quotable" has four graded consequences: two script exits, one script report, and one gate
  rejection by a persona, because four of the contract's clauses cannot be seen by a script.
- Retrofit is three tiers, and the touch rule is what makes it real: you cannot correct a number
  without ruling it.
- Correction history is kept in the block, never pruned, and its length is itself a signal.
- Against the nine instances: six prevented, three partial. The three are named, the reason each
  resists is stated, and I have not adjusted an instance to improve the score.
