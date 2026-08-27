
# The counting rule

**Contract version: 2 [Q-COUNTING-RULE-VERSION].** Closes loose end E16. Version 1 was frozen at
sub-step 1.12 and promoted at 1.14. Version 2 is the R-4 amendment pass: it closes W2-1 through
W2-10, takes the two further amendments R-2 and R-3 filed against it while it was open, adopts The
Manager's §8 ruling, and moves the mechanized clause list into this file. §11 lists every change
with its amendment id.

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
- Dates, times, and version strings of external software. **The version integer of a document this
  project owns is governed** — it is a numeral this project asserts, and it is usually asserted in
  more than one file. See §11's ruling.
- A number quoted from an external source together with its citation. The citation is the rule; class
  `quoted`.
- Sub-step numbers, register row ids, and other addresses.
- A numeral appearing exactly once, in one file, that no other file states.

A governed numeral does not stop being governed because it is inconvenient. **If a number cannot be
ruled, it is not written as a number.** Write the prose — "most", "a majority" — or quote a source
with its citation. There is no marker meaning "unruled but permitted".

**A governed quantity with no id is invisible to every assertion in §9.** G1 makes it governed the
moment a second file states it; nothing in §9 can see it until a block exists. That gap is not a
tolerance, it is the largest hole in this contract, and M13 is the only clause that closes it. The
proof is the answer contract's version integer: stated in eleven files with three competing successor
values, invisible to the amendment register's collision check until an id was minted by hand at 1.14.

## 2. The quantity block

Born in the file of the agent that measures it, in the same edit that first states the number. Fenced
and tagged `quantity`. Twelve keys, all required, in this order. Six may take `none` or `n/a`. None
may be absent.

````
```quantity
id:            Q-EG-PAIR-IDENTICAL
class:         fixed
value:         87
unit:          overlapping filename pairs whose two files are byte-identical
population:    the 95 [Q-EG-OVERLAP-95] filename pairs appearing in both corpora under the
               normalization stated at Q-EG-OVERLAP-95
operation:     cmd: for each pair, normalize CRLF in both files, then compare with `cmp -s`
conditions:    cwd: repository root, 55 characters. No other environment fact affects it.
at:            2026-08-26; lsei f788ea2; cr-agents f0c976b
predicate:     87 of the 95 overlapping filename pairs are byte-identical after CRLF
               normalization; 8 differ.
derived-from:  Q-EG-OVERLAP-95
sampled:       n/a — this operation counts, it does not classify
superseded:    89 / 6 (The Engineer, part 4, 2026-08-26) — same operation, arithmetic error;
               corrected by The Fact-Checker at 0.5
```
````

**This example is an example.** Its ids are in the `Q-EG-` namespace defined below and no block of
that name exists or may exist. The real quantity it is drawn from is `Q-PAIR-IDENTICAL`, whose block
lives in `cr_scratch/step1_r4_designer_counting_rule_v2.md` together with its parent `Q-OVERLAP-95`.
Version 1 of this contract used the live ids here, and the result was that the specification of the
block form was itself a duplicate block, three dangling tags and a dangling parent — four of its own
check failures, inside the file that defines the checks.

### Field rules

**`id`** — `Q-` followed by uppercase letters, digits and hyphens. Assigned once. **Never renamed and
never reused.** A rename breaks every site that quotes it; a reuse silently rebinds them. An id is not
a markdown link target: writing `[Q-EG-X](...)` is a failure.

**The `Q-EG-` example namespace.** An id beginning `Q-EG-` is an example. It may not be minted as a
real block, and M2, M3, M4 and M12 skip it. Without this namespace there is no way to write *about* a
dangling tag, a duplicate id or a link-target violation without committing one — which is why version
1's own Wave 2 review minted four while reporting them.

**The nested-fence rule.** A `quantity` fence opened inside a four-backtick fence is a display, not a
block, and the checker does not parse it. This is what lets a specification show the form it
specifies without asserting it.

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
states both, and the two reconcile by arithmetic stated in the block. **How a range is *quoted* is §3
rule 9**; version 1 specified the value form and not the quotation form, and M3 could not read the one
value form the contract had gone out of its way to specify.

**`unit`** — the noun the number is a number *of*, specific enough that two readers build the same set.
"Lines" is not a unit. "Lines of JavaScript between the fences, fences excluded" is.

**`population`** — the set the value was drawn from, stated so that a successor can rebuild it. If the
population is itself a governed quantity, name it by id and list it under `derived-from`.

**`operation`** — exactly one of **four** forms. Prose is not an operation.

| Form | Written as | Requirement |
|---|---|---|
| command | `cmd: <shell>` | Runnable as written, from the `cwd` named in `conditions`. **Every argument that changes the value is part of the command**, and a pipeline that counts lines states its pattern and its anchoring. See §3 rule 11. |
| script | `script: <path> <args>` | The path is committed in this repository. |
| derived | `derived: <expression over ids>` | Arithmetic over other quantities. Every operand is an id, every id is listed in `derived-from`, and M4 evaluates the expression against the parents' values. |
| manual | `manual: <who>; <what they did>; <how many items inspected>` | The item count is a number, not "several". |

The `derived` form exists because version 1 admitted three forms, none of them arithmetic, while
`derived-from` presupposed arithmetic. The author of `Q-ROOT-ALLOWANCE` had a real operation —
`259 - 1 - 108` — and wrote it under `script:` because that was the nearest slot. **A closed set with
a missing member does not stop authors. It routes them into the wrong member, silently**, and four of
this contract's ten Wave 2 defects are that one sentence.

**`conditions`** — every environment fact that would change the value if it were different and that is
not already implied by `population` and `operation`. **For any `cmd:` or `script:` operation,
`conditions` always names the working directory and its character length, in the form
`cwd: <description>, <n> characters`.** That clause exists because of loose end E14: the clone that
failed failed on the length of its root, the row recorded the leaf, and a successor would have
shortened the filename and left the cause. `none` is permitted and is a claim.

**Where the length provably cannot affect the value, `conditions` writes
`cwd: <description>, length-independent: <reason>`.** The token is required and the prose is not
enough: a check whose pass condition is "the author wrote a sentence about it" is not a check, and
the next author phrases it differently. The live instance is `Q-REG-TSV-IGNORED`, whose operation is
`git check-ignore`, which matches a pattern against a repository-relative path and reads no file, so
no ceiling is reachable. Its author stated that plainly rather than inventing a number, which is the
right instinct and the reason M11 needed the escape rather than an exception.

**Inherited conditions** are written `inherits: Q-<id>`, optionally followed by what differs. The
inheriting block's conditions are the named block's, plus the difference; M11 follows the edge and
checks the parent. Prose of the form `as Q-X` or `same as above` is not an inheritance, M11 cannot
follow it, and two blocks in this project wrote exactly that and were read as having no `cwd` at all.

**`at`** — ISO date, then the short ref of every repository the measurement depended on, or `none`. A
measurement over `lsei/` that does not name an `lsei` ref is incomplete.

**`predicate`** — the full sentence the number licenses, containing the noun that must appear wherever
it is quoted. This is the field that separates what was measured from what it was called. A quotation
whose surrounding noun is not the predicate's noun is a violation of §3, whoever wrote it.

**`derived-from`** — the ids this value rests on, or `none`. **Every input to the value carries an id,
measured or chosen.** A chosen parameter is the input most likely to be revisited and the one the
staleness graph most needs to see: `Q-ROOT-ALLOWANCE` rested on a measured ceiling that had an id and
a chosen budget that had none, so a change to the budget would have marked nothing. Cited ids must
exist. The graph is acyclic.

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
87 [Q-EG-PAIR-IDENTICAL] of the 95 [Q-EG-OVERLAP-95] overlapping pairs are byte-identical.
```

1. **A bare governed numeral in a second file is not quotable.** M13 finds it; see §5 and §9.
2. **A `live` quantity is never quoted as a bare literal.** It is written
   `7f97983 (as of 2026-08-27; git -C lsei rev-parse --short HEAD) [Q-EG-LSEI-HEAD]`. A ref copied
   into prose is a snapshot of a moving value and it goes stale in one commit, which is what happened
   to four sites when `lsei` moved from `f788ea2` to `7f97983`.
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
8. **The tag is adjacent to the value and no markup intervenes.** Write `87 [Q-EG-X]`, and where the
   sentence wants emphasis, put the emphasis outside — `**87 [Q-EG-X]**`, never `**87** [Q-EG-X]`. The
   sweep in M3 reads the token immediately before the bracket; version 1 stated no adjacency rule and
   48 sites handed the sweep something that is not a value. M3 became tolerant of surrounding
   emphasis and backticks at version 2, and the rule is still stated, because a tolerant reader alone
   licenses the drift and a rule alone leaves the 48 sites unread.
9. **A range is quoted whole, endpoints and membership word together, immediately before the tag:**
   `357–686 inclusive [Q-EG-C4-FENCE-SPAN]`. M3 reads the whole range token and compares it to the
   block's `value` after normalizing the dash.
10. **A file declaring its own size is not quoting it.** `oracle/VERIFIED.tsv`'s row-count header, the
    loose-ends register's row count, and the H rows of `oracle/MANIFEST.tsv` and
    `oracle/AMENDMENTS.tsv` are the file describing itself, not a second site restating a value. The
    exemption is narrow: a header or trailer whose subject is the file it sits in, and nothing else.
    This is the clause 1.6 §3.5 asked for and version 1 did not carry.

11. **A failure count carries the command that produced it, including the pattern and its anchoring.**
    "The check reports N failures" is not a statement until N's command is written beside it. Two
    measurements at R-4, both reproduced: `tools/ecr_verify.js` indents its failures two spaces, so
    `grep -c '^FAIL'` over its output returns 0 against a real count of 143; and the same tool over
    the same file returns 143 or 361 failure lines depending only on which corpus root is passed as
    its second argument. A tool that emits a failure prefix states in its own header what column the
    prefix sits at and what command counts it. This clause is a requirement on tools this project
    writes, not only on prose about them.
12. **A number does not cross a boundary unless the seat relaying it ran the operation that produces
    it, and the relay carries the operation.** A boundary is: into a spawn prompt, into a message to
    the author, into a summary table, into the gameplan, into the accumulator. Where the number is
    derived from other numbers, the relay names them. This is The Manager's standing rule from the
    Step 1 close §4, and it is `operation:` and `derived-from:` pointed at the traffic *between*
    documents rather than at the traffic inside one. Two of the five boundaries — the gameplan and
    the accumulator — are files in §8's declared set, so M15 checks them; the other three are not
    files and are H7.

**An id written bare, outside brackets, is a mention, not a quotation.** `Q-OVERLAP-95` names the id;
`95 [Q-OVERLAP-95]` quotes its value. M2 and M3 read only the bracketed form. This is how a report
names a dangling id, a duplicate or a collision without committing one, and it is the form
`oracle/AMENDMENTS.tsv` already uses in its quantity-id column — the register invented it under
pressure and the contract did not have it.

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

**A correction whose sites lie in a document another persona has frozen is written with a `pending:`
entry.** The entry goes at the end of the `superseded` field, in the form:

```
pending: <target file> — <amendment id in oracle/AMENDMENTS.tsv>
```

Parts 1 and 2 happen in the block's own file; parts 3 and 4 run; part 1's edit *at the frozen target*
is owed, and the amendment register holds it. Without this form a block can say "this value is
superseded" and cannot say "and the edit that supersedes it is owed against a document I may not
touch" — so it either asserts a correction that has not happened, as `Q-CURRENCY-VERDICTS` does, or
the correction is not recorded at all. `pending:` is what the amendment register joins against, and a
`pending:` naming an amendment id that does not exist is an M4 failure.

## 5. What "not quotable" means

Four consequences. Each names who or what applies it, and the clause in §9 or §10 that implements it.

| Violation | Applied by | Effect |
|---|---|---|
| A quotation tag resolving to no block; two blocks sharing an id; a block missing a key; a `derived-from` naming a non-existent id or forming a cycle; a `pending:` naming no amendment row. | M1, M2, M4 — `tools/quantities.js --check`, exit 1 | **The check fails. The sub-step does not close.** |
| Two sites quoting one id with different numerals; a regenerated index differing from the committed one; a stated range whose arithmetic does not close. | M3, M6, M7, M10 — `tools/quantities.js --check`, exit 1 | **The check fails.** |
| A `live` value quoted as a bare literal; a bare governed numeral in a second file; a relative offset with no datum; an undated relative-time word; two blocks that look like one quantity under two ids. | M5, M8, M9, M13, M14 — `tools/quantities.js --lint`, exit 0 with findings | **Reported. Dispositioned by the persona who owns the sub-step.** These carry false positives and do not block on a script's judgment. |
| A `predicate` that does not license the sentence beside it; a `conditions: none` that is untrue; a `sampled` field describing a sample that did not happen; a number relayed across a boundary that is not a file. | H1–H8 — the reviewing persona, at the gate. | **The deliverable is rejected.** No script asserts these. |

Version 1's third row promised a lint on bare governed numerals and no clause implemented it. It stood
as a stated consequence with no mechanism and no owner, which is the shape of loose end E1's remedy
and is inert for the same reason. **The ruling at R-4 is to specify M13 rather than to delete the
row**, and the reason is the answer contract's version integer: deleting the row would have made a
governed integer with three competing successors permanently invisible to every check in this
contract.

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
The echo site registry does not carry it, and holds 27 rows nobody has counted. That declaration is
the file describing itself and is exempt under §3 rule 10.

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
repository and carry their refs in `at`. `_intake/` is not in the set either: the set is these five
globs and nothing else.

**A block may be moved between files in the declared set; its id does not change.** When a birth file
is superseded its blocks move rather than being rewritten. **A block may not be edited into a different
quantity:** a different population or a different operation is a different id.

**A promoted marker range is provenance, not a second site.** Promotion in this project is executed by
`sed` and is therefore a copy: the source range stays in `cr_scratch/` as the record of what was
frozen and reviewed, and the promoted file is the authority. **Every block and every quotation tag
inside a `cr_scratch/` marker range whose target `oracle/MANIFEST.tsv` records as `promoted` is
outside this declared file set.** The exclusion is computed from the manifest, unconditionally, on
every run. It is not an option.

This is The Manager's Step 1 close §5.4 ruling, written as a file-set clause rather than as a checker
flag, on two grounds. Measured at 1.14, promotion took hard failures from 23 to 33, and the eight new
ones were eight duplicate ids that two personas had predicted to the id. **A checker whose default run
reports eight failures the reader must know to discount is a checker that gets switched off** — the
same argument that keeps `lsei/` out of the set. And **a count that changes by nine depending on a
flag nobody carries with it is an unruled number under §3 rule 11**: "23" and "32" were both true
statements about one command on one tree, differing only by an argument. `tools/quantities.js
--include-superseded` restores the unexcluded parse for forensics, and a count taken under it says so.

The alternative — deleting the block from the `cr_scratch/` source at promotion, making promotion a
move on disk rather than a copy — is rejected. The source file is a reviewed deliverable and its
marker range is the record of what was reviewed; `oracle/MANIFEST.tsv`'s MF-3 join is keyed on that
range still existing. Promotion is a move *in the file set* executed as a copy *on disk*, and this
clause is what makes those two sentences consistent.

## 9. Mechanized clauses

Every clause here is asserted by `tools/quantities.js` over §8's declared file set. Nothing is listed
here unless the script's comparison can be named.

**This section was outside the deliverable in version 1.** It lived in
`cr_scratch/step1_12_designer_counting_rule.md` §7, while §5 of the promoted contract, eleven rows of
`oracle/AMENDMENTS.tsv` and the header of `tools/quantities.js` all referred to its clause numbers. A
reader of `COUNTING_RULE.md` could not resolve `M11`. That is loose end E16's own shape — a referent
named everywhere and resident nowhere the reader is sent — inside the contract written to close it,
and it is corrected by moving the table here.

| # | Clause | What the script does | Exit |
|---|---|---|---|
| M1 | Every quantity block is well-formed | Parse fenced blocks tagged `quantity`, excluding four-backtick displays; assert the key set equals the twelve declared keys exactly, and no value is empty. Set equality on strings. | 1 on failure |
| M2 | Every quotation tag resolves | Collect bracketed tags; collect `id` values from blocks; assert the tag set is a subset of the id set, and that ids are unique. `Q-EG-` ids are skipped. Catches parallel agents minting one id twice. | 1 |
| M3 | **The sweep check.** Every site quoting an id states its current value | Capture the token before each tag, strip surrounding emphasis and backticks, accept a whole range token; group by id; assert one distinct value per id, equal to the block's `value`. Where the block value is not numeric, compare as a string. A token that is still unreadable is reported `LINT M3-unreadable` and never silently skipped. | 1 |
| M4 | The derivation graph is sound and staleness is reported | `derived-from` ids exist; graph is acyclic; for each edge, assert the parent's `at` is not later than the child's. Evaluate any `derived:` operation against its parents' values. Assert every `pending:` names a row in `oracle/AMENDMENTS.tsv`. A later parent marks the child STALE. | 1 for missing, cyclic, failed arithmetic or unknown amendment id; report for STALE |
| M5 | `live` values are current | For each `class: live` block, run the `operation` command and compare stdout to `value`. Behind `--live`: M5 executes strings harvested out of markdown, which a check does not do unasked. | Report drift, not exit 1 |
| M6 | The index is not hand-edited | Regenerate `QUANTITIES.md` in memory and diff against the committed file. | 1 on any difference |
| M7 | The index declares its own size correctly | Parse the declared total and per-class counts from the header; compare against rows emitted. | 1 |
| M8 | No bare relative offsets | The spelled-out-or-digit alternation on lines above/below/before/after. **Not the digits-only form** — tested at 1.12 §6, the digits-only form misses the live instance. | 0 with findings |
| M9 | No undated relative-time words in closed register rows | Over register rows whose Status contains FIXED or CLOSED, find "yet", "currently", "still", "already". The scope is load-bearing: six hits scoped, thirteen unscoped. | 0 with findings |
| M10 | Range arithmetic closes | For a `value` that is a range with a membership word, compute the span; if the block or a derived block states a length, assert equality. | 1 |
| M11 | `cmd:`/`script:` operations declare a `cwd` and its length | Assert `conditions` contains `cwd:` followed, before the next sentence break, by a character count, or by the token `length-independent:`; or `inherits: Q-<id>`, in which case follow the edge and check the parent. | 1 |
| M12 | Ids are not markdown link targets | Assert no bracketed id is immediately followed by an opening parenthesis, outside the `Q-EG-` namespace. | 1 |
| M13 | **No bare governed numeral in a second file** | For each `fixed` block, key a spelled-out or digit numeral to the `unit` noun of the block; report any site outside the birth file that states it without the tag. This is §5's third row, which version 1 promised and did not implement. | 0 with findings |
| M14 | Two ids for one quantity | Report any two blocks whose `unit` strings are equal after case and whitespace normalization, or whose `population` strings are. A proxy, not a proof; the ruling is H8's. | 0 with findings |
| M15 | Relayed numerals carry their tag | §3 rule 12 over the two boundaries that are files: `accumulator.md` and `lunar-oracle-gameplan.md`. M13's comparison restricted to those two files, where relay traffic is dense and a false positive is cheap to disposition. | 0 with findings |

M3, M4 and M6 are the three that matter. M3 removes the failure mode behind all seven of the two-file
disagreements found at 1.0; M4 removes the class where a parent moves and its children do not; M6
removes the hand-maintained-index class structurally rather than by vigilance. If a review has to cut,
cut from the lints.

**M1 through M15 run over §8's declared file set and must not walk `lsei/` or `cr-agents/`.** Those
trees hold 152 and several hundred markdown files, none of them ours, and a checker that walks them
produces a wall of findings about somebody else's documents on its first run and is switched off on
its second.

**The tool's own failure prefix is `FAIL ` at column 0**, nothing else is printed at column 0 with
that prefix, and the header of `tools/quantities.js` says so. That is a requirement on the tool under
§3 rule 11, not a description of it.

## 10. Human clauses

| # | Clause | Why no script |
|---|---|---|
| H1 | `predicate` licenses the sentence it appears beside | Requires knowing what an operation establishes. |
| H2 | `population` is the set the reader will assume | Requires modelling a reader. |
| H3 | `conditions: none` is true | A script asserts presence, never completeness. |
| H4 | `sampled` describes a sample that happened | Unverifiable by construction. |
| H5 | The rule is the right rule | A wrong classifier computes a clean number. |
| H6 | Whether a Tier 3 numeral has become governed | Test G1 is mechanical *after* the second file exists; the person writing the second file decides in advance. |
| H7 | A number relayed into a spawn prompt, a message to the author, or a summary that is spoken rather than written | §3 rule 12's three non-file boundaries. All seven of Step 1's relay errors happened here and no script can reach them, because the artifact the number lands in is not a file in any declared set. The check is that the relaying seat ran the operation. |
| H8 | Whether two blocks M14 pairs are one quantity | Two measurements can share a unit and a population and still answer different questions. Only the owner of both can say. |

**H1 through H5 are the contract's honest surface.** They are what the reviewing persona checks at the
gate, and they are the reason §5 lists "the deliverable is rejected" as a consequence alongside the two
script exits. A contract whose only consequence is a script exit would be claiming that the things a
script cannot see do not happen.

**H7 is the largest of them and it is new at version 2.** It is the arm of the counting problem this
contract did not cover at version 1 and still cannot mechanize. Listing it as H rather than as M is
the point: a rule with no form is the defect this version exists to amend, and a rule given a form it
cannot have would be the same defect wearing a check number.

## 11. Version 2 — what changed

Each row was owed against a row of `oracle/AMENDMENTS.tsv`, and each is applied in this file.

| Amendment | Finding | Section changed |
|---|---|---|
| AM-81 | The worked example could not be lifted without failing four of its own checks | §2 — `Q-EG-` namespace, nested-fence rule, example rewritten |
| AM-82 | §5 promised a lint that nothing implemented | §5, §9 — M13 specified rather than the row deleted |
| AM-83 | M11 asserted the word `cwd:` and not the length the field rule demands | §2, §9 |
| AM-84 | `operation` had no form for arithmetic over other quantities | §2 — the `derived:` form |
| AM-85 | A chosen parameter with no id is invisible to the staleness graph | §2 — `derived-from` |
| AM-86 | No form for a correction owed against a frozen document | §4 — `pending:` |
| AM-87 | Two ids for one quantity, and nothing detects it | §9 M14, §10 H8 |
| AM-88 | No form for quoting a range, so M3 could not read one | §3 rules 8 and 9, §9 M3 |
| AM-89 | A file declaring its own size was reading as a quotation of it | §3 rule 10 |
| AM-102 | Promotion is a copy, so the declared file set held both sites | §8 |
| AM-123 | The mechanized clause list was not in the contract | §9, §10 |
| AM-124 | A failure count with no pattern is not a count | §3 rule 11, §9 |
| AM-125 | Arm 2 — numbers crossing a boundary between seats | §3 rule 12, §9 M15, §10 H7 |
| AM-126 | An id could not be named without being quoted | §3, the mention form |
| AM-127 | The contract's own version integer had no id | §1, and the block below |
| AM-109 (R-2) | A self-declared size row read as a quotation of the quantity it duplicates; and AM-1's honest kind | §3 rule 10; ruled in the register |
| AM-122 (R-3) | M11 over-applied where path length provably cannot affect the value | §2 `length-independent:`, §9 M11 |

AM-90 — the tenth instance the contract never scored itself against — is run at R-4 rather than
amended here; the result is in that report.

```quantity
id:            Q-COUNTING-RULE-VERSION
class:         fixed
value:         2
unit:          the version integer of this contract, COUNTING_RULE.md
population:    the version declaration at the head of this file, and every site that states which
               version of the counting rule it was written against
operation:     manual: The Designer at R-4; bumped from 1 on applying the seventeen amendments
               listed above; 1 item inspected
conditions:    none. The integer is a decision of this project, not a measurement.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     COUNTING_RULE.md is at contract version 2, which is version 1 plus the R-4
               amendment pass listed in section 11.
derived-from:  none
sampled:       n/a — this is a decision, not a classification
superseded:    1 (The Designer, sub-step 1.12, 2026-08-26) — the version frozen at 1.12 and
               promoted at 1.14, before W2-1 through W2-10 were amended
```

This block exists because §1 now says a version integer of a document this project owns is governed,
and a rule whose author exempts his own document is not a rule.
