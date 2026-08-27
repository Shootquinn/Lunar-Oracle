# R-4 — The Designer: the counting rule at version 2

**Project:** Lunar Oracle
**Date:** 2026-08-27
**Item:** R-4 of The Manager's Step 1 close. Amend the counting-rule contract for W2-1 to W2-10.
**Author:** The Designer
**Amended in place:** `COUNTING_RULE.md`, the promoted file. Version 1 → version 2.

Every number in this file was produced by a command I ran in this session, and every command is
written beside its number. Where a figure I published at Wave 2 does not reproduce, the re-run is
reported and my own figure is named as the thing that moved.

---

## 0. Verdict

| | |
|---|---|
| **`COUNTING_RULE.md`** | **Version 2.** 245 lines → 494. Seventeen amendments applied, each against its `oracle/AMENDMENTS.tsv` row: the ten Wave 2 items, five this pass produced, and the two R-2 and R-3 filed against it while it was open. Six of the seventeen are forms that did not exist, four of which authors had already invented for themselves in the wrong slot. |
| **The mechanized clause list** | **Moved into the contract as §9 and §10.** It was in a scratch file while §5, eleven amendment rows and the checker's header all cited its clause numbers. A reader of `COUNTING_RULE.md` could not resolve `M11`. That is E16's own shape inside the contract written to close E16. |
| **`tools/quantities.js`** | Amended to match. Three flags inverted to defaults, four new clauses, one defect in the W2-1 amendment found by running it. |
| **Hard failures** | **32 → 11**, `node tools/quantities.js --check`, `grep -c '^FAIL '` over the whole unfiltered output. Twenty-one closed: nineteen by these amendments, one by another author mid-pass, one by regenerating the index. **Every one of the eleven that remain belongs to another seat and carries an amendment row.** |
| **`--exclude-superseded`** | **Ruled: not a flag.** It is a clause of §8's declared file set, applied unconditionally. The escape hatch is inverted and renamed `--include-superseded`. §3 below. |
| **Arm 2** | **Ruled in, with a form.** §3 rule 12, M15, H7. M15 fires on **5** untagged relays today, so the arm has a mechanism and a measured population for the first time. |
| **The version integer** | **A contract defect, not a usage defect**, and the ruling settles W2-2 in favour of specifying M13. §5 below. |
| **My "fifteen target paths"** | **Thirteen.** The Engineer is right and the correction is mine to make. §7. |

**Three things I found by running the amendments that nobody had named, including me.** §6.

---

## 1. What I amended, and what it cost

Seventeen changes, listed in `COUNTING_RULE.md` §11 with their amendment ids. The ten Wave 2 items
first, then five this pass produced, then the two that R-2 and R-3 filed against this contract while
it was open — which is the amendment register working exactly as specified.

| Amendment | Was | Is |
|---|---|---|
| AM-81 (W2-1) | The worked example used live ids and could not be lifted without four of its own check failures | `Q-EG-` example namespace, nested-fence rule, example rewritten, real blocks moved here |
| AM-82 (W2-2) | §5 promised a lint nothing implemented | M13 specified in §9. **The row is kept, not deleted** — see §5 |
| AM-83 (W2-3) | M11 asserted the string `cwd:` and not the length §2 demands | `cwd: <description>, <n> characters`, checked |
| AM-84 (W2-4) | Three `operation` forms, none of them arithmetic, while `derived-from` presupposed it | A fourth form, `derived: <expression over ids>`, evaluated by M4 |
| AM-85 (W2-5) | A chosen parameter could have no id | Every input carries an id, measured or chosen |
| AM-86 (W2-6) | No form for a correction owed against a frozen document | `pending: <target> — <AM-id>` in `superseded`, checked by M4 against the register |
| AM-87 (W2-7) | Two ids for one quantity, undetectable | M14 as a proxy on `unit` and `population`; H8 rules. **Ruled human, with a machine hint** |
| AM-88 (W2-8) | No quoted-range form, so M3 read the word "inclusive" | §3 rules 8 and 9, and a tolerant reader in M3 |
| AM-89 (W2-9) | A file's own size header read as a quotation | §3 rule 10, narrow: a header or trailer whose subject is its own file |
| AM-90 (W2-10) | Scored against nine instances; a tenth existed | Run below, §8 |
| AM-102 | Promotion is a copy, so both sites were in the file set | §8, unconditional, not a flag |
| AM-123 | M1–M12 were not in the contract | §9 and §10 |
| AM-124 | A failure count with no pattern is not a count | §3 rule 11 |
| AM-125 | Arm 2 | §3 rule 12, M15, H7 |
| AM-126 | An id could not be named without being quoted | The mention form, §3 |
| AM-127 | The contract's own version integer had no id | §1, and `Q-COUNTING-RULE-VERSION` |
| AM-109 (R-2) | A TSV register's own H row was reading as a quotation; and AM-1's honest kind | §3 rule 10; AM-1 ruled a report, not a check |
| AM-122 (R-3) | M11 over-applies where path length provably cannot affect the value | §2 and §9 — the `length-independent:` token |

**The one sentence under four of the ten.** `operation` had no arithmetic form, `conditions` had no
inheritance form, `value` had no quoted-range form, and `superseded` had no pending form. In all four
cases the author had the thing to say, found no slot for it, and used the nearest slot. **A closed set
with a missing member does not stop authors. It routes them into the wrong member, silently**, and
silently is the part that matters: `259 - 1 - 108` sitting under `script:` looks like a filled field.

---

## 2. The blocks the contract's example was standing in for

W2-1's fix takes the worked example into the `Q-EG-` namespace. That leaves the real quantities it was
drawn from without a home, and two of them never had a block at all. §8 of the contract permits a
block to move between files in the declared set; The Engineer set the precedent at 1.14 by minting
`Q-PATH-BUDGET-108` and `Q-PATH-CEILING-259` in his own file. These are minted in mine, and **I ran
every operation below in this session rather than copying a value forward.**

```quantity
id:            Q-OVERLAP-95
class:         fixed
value:         95
unit:          filename pairs whose normalized basenames appear in both corpora
population:    the 152 .md files under lsei/literature and the 119 .md files under
               _intake/japanese-miracle/lit, normalized by: lowercase; each run of "_" or
               space to a single "-"; collapse repeated "-"; strip ".md". Nothing else.
operation:     cmd: node -e over both trees, building a normalized-basename map for each and
               intersecting the key sets; the same rule stated at
               cr_scratch/step0_engineer_corpus_merge.md Part 1
conditions:    cwd: repository root, 55 characters. The lsei corpus is a working copy and the
               figure is only meaningful against the ref named in "at".
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     95 filename pairs appear in both corpora under the stated normalization; 57 files
               are lsei-only and 24 are japanese-miracle-only, and the union is 176.
derived-from:  none
sampled:       n/a -- this operation intersects two key sets, it does not classify
superseded:    none. The 95 has not moved since 0.2; its siblings have, and that is the finding
               recorded in section 6 of this file.
```

```quantity
id:            Q-PAIR-IDENTICAL
class:         fixed
value:         87
unit:          overlapping filename pairs whose two files are byte-identical after CRLF
               normalization
population:    the 95 [Q-OVERLAP-95] filename pairs appearing in both corpora under the
               normalization stated at Q-OVERLAP-95
operation:     cmd: node -e reading both members of each pair, stripping "\r", and comparing
               the two strings
conditions:    inherits: Q-OVERLAP-95
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     87 of the 95 overlapping filename pairs are byte-identical after CRLF
               normalization; 8 differ.
derived-from:  Q-OVERLAP-95
sampled:       n/a -- this operation counts, it does not classify
superseded:    89 / 6 (The Engineer, part 4, 2026-08-26) -- same operation, arithmetic error;
               corrected by The Fact-Checker at 0.5. Re-run at R-4 against lsei 7f97983 and it
               still returns 87 / 8; the eight are barro-2004, bea-depreciation-rates,
               azami-2024, falcon-heavy-wikipedia, 473486main-iss-atcs-overview, csank-2022,
               ieee-2022-paper-sh-tcs and poston-2020.
```

```quantity
id:            Q-LSEI-HEAD
class:         live
value:         7f97983
unit:          the short commit ref at the head of the lsei working copy's checked-out branch
population:    the single ref HEAD resolves to in the lsei/ working copy
operation:     cmd: git -C lsei rev-parse --short HEAD
conditions:    cwd: repository root, 55 characters. The push URL is disabled per CLAUDE.md, so
               this ref moves only by fetch, never by anything this project does.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     the lsei working copy is at 7f97983, "README: correct the literature layout and
               the oracle tool count", as of 2026-08-27.
derived-from:  none
sampled:       n/a -- this operation reads one ref
superseded:    f788ea2 (2026-08-26) -- not an error; the class is live and the value moved
               upstream, which is the whole reason the class exists. Four sites went stale in
               one commit when it did, and that is instance 7.
```

```quantity
id:            Q-C4-FENCE-SPAN
class:         fixed
value:         357-686 inclusive
unit:          line numbers of lsei/report-generator-prompt.md spanned by the fenced javascript
               block, both fence lines included
population:    the single fenced block in lsei/report-generator-prompt.md opened by a line
               reading "```javascript" and closed by the next bare fence
operation:     cmd: grep -n '^```' lsei/report-generator-prompt.md
conditions:    inherits: Q-LSEI-HEAD -- the span is a property of the upstream file and moves
               with the ref.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     the verify_report.js source is a fenced javascript block spanning lines 357-686
               inclusive of lsei/report-generator-prompt.md, 330 lines with both fences.
derived-from:  none
sampled:       n/a -- this operation reads two line numbers
superseded:    none. Q-C4-SOURCE-LINES is the 328 lines between the fences and should carry
               derived-from: Q-C4-FENCE-SPAN with operation "derived: Q-C4-FENCE-SPAN span - 2";
               that edit is owed against 1.6 and is AM-128.
```

**`Q-ABSTRACT-OVERLAP` is deliberately not minted here.** The 13-corrected-to-4 count is The
Fact-Checker's, the inputs were rewritten at `d7889e1` and in `_intake/`, and loose end A4 records
that the percentages are no longer reproducible. Minting a block would mean writing an `operation`
I did not run for a `population` that no longer exists — which is precisely the thing this contract
forbids. The one live tag in `cr_scratch/step1_12_designer_counting_rule.md` was illustrative prose,
not an assertion, and has moved to `Q-EG-ABSTRACT-OVERLAP`. The real number is A4's and stays there.

---

## 3. The ruling on `--exclude-superseded`: not a flag, and not a move either

The Manager asked whether the flag is the right shape or whether the contract should make promotion a
move. **Neither. It is a clause of the declared file set**, and it is now written that way in §8.

**Against the flag, on two grounds, both measured.**

First, the default is wrong. Without the exclusion, `--check` reports eight duplicate ids that exist
only because a `sed` copied a block from a reviewed deliverable into its promoted target. A reader who
must know to discount eight of the failures is a reader who stops reading the output. That is the same
argument §9 already makes for keeping `lsei/` out of the file set, and it applies with more force here
because these failures name real ids and look exactly like real defects.

Second, and this is the one that decides it: **the flag makes the count depend on an argument that is
not carried with the count.** Measured on one tree in one minute:

```
node tools/quantities.js --check                        FAIL count 32
node tools/quantities.js --check --exclude-superseded    FAIL count 23
```

Both are true statements about one command over one repository. They differ by nine and the difference
is an argument. Under §3 rule 11 — which this pass added — a failure count that does not carry its
command is not a count, and a switch that silently changes it by nine is exactly the trap the rule
names. **A checker should not have a flag that makes its own verdict better.** The escape hatch is
therefore inverted and renamed: `--include-superseded` restores the old parse, and it is named for what
it restores rather than for what it removes, so a number taken under it is visibly a number taken under
a flag.

**Against making promotion a move on disk.** Deleting the block from the `cr_scratch/` source at
promotion destroys the record of what was frozen and reviewed, and `oracle/MANIFEST.tsv`'s MF-3 join is
keyed on that marker range still existing. It would also trip The Manager's own Falsifier 1 from the
other side.

**The resolution is that promotion is a move *in the file set* and a copy *on disk*.** §8 already said
"a block may be moved between files in the declared set; its id does not change." Promotion is such a
move; it is executed by `sed` for good operational reasons; and the clause added at §8 is what makes
those two sentences consistent instead of contradictory. The source range is provenance. The promoted
file is the authority. There is one site, and it is where the manifest says it is.

---

## 4. Arm 2: it belongs in the contract, and here is its form

The Manager's standing rule is that a number does not cross a boundary unless the seat relaying it ran
the operation, and the relay carries the operation. He asked whether that belongs in my contract, and
noted that a rule with no form is the defect I am amending for.

**It belongs, and I have given it three parts rather than one, because the five boundaries he named are
not the same kind of thing.**

| Boundary | Kind | Where it lands in version 2 |
|---|---|---|
| into the gameplan | a file in §8's declared set | **M15**, mechanical |
| into the accumulator | a file in §8's declared set | **M15**, mechanical |
| into a spawn prompt | not a file | **H7** |
| into a message to the author | not a file | **H7** |
| into a summary table | a file if it is written down, otherwise not | M15 where written, H7 otherwise |

The rule itself is §3 rule 12. It is not new machinery: it is `operation:` and `derived-from:` pointed
at the traffic between documents instead of the traffic inside one, which is what The Manager said it
was.

**M15 fires today, which is the part that matters.** A clause that has never produced a finding is
indistinguishable from a clause nobody implemented, and that is precisely W2-2's defect. Measured:

```
node tools/quantities.js --lint    NOTE M15 5 untagged relays across 2 relay files
  accumulator.md:529             relays 340 candidate  untagged; the id is Q-ECR-KEYS-TESTED
  accumulator.md:417             relays 107 distinct   untagged; the id is Q-LCC15-KEYS
  lunar-oracle-gameplan.md:728   relays 259 characters untagged; the id is Q-PATH-CEILING-259
  lunar-oracle-gameplan.md:308   relays 328 lines      untagged; the id is Q-C4-SOURCE-LINES
  lunar-oracle-gameplan.md:696   relays 328 lines      untagged; the id is Q-C4-SOURCE-LINES
```

**Its false-negative class, stated so nobody mistakes a small number for a clean file.** M15 requires
the block's `unit` noun within forty characters of the value. `accumulator.md:57` writes "a 328-line
source block" — singular, hyphenated — and M15 does not see it, though I did by hand. The five are a
floor, not a census. I have not widened the pattern, because a relay lint that fires on every
two-digit integer in the gameplan will be switched off in a week and the contract has already been
burned once by a clause nobody could run.

**What I did not do, and why.** I did not make M15 a hard failure. The gameplan and the accumulator are
narrative documents written under time pressure by every seat in the project; making a `--check`
failure of an untagged numeral there would stop the step for a defect that is real but not blocking.
It is a lint, dispositioned by the seat that owns the sub-step, which is what §5's third row already
says about this whole class.

**H7 is honest about the rest.** Three of the five boundaries are not files and no script will ever
reach them. All seven of Step 1's orchestrator relay errors happened there. Listing that as H rather
than inventing an M number for it is the whole point of §10 existing.

---

## 5. The version integer: a contract defect, and it settles W2-2

**Ruling: contract defect.** Not a usage defect, and the distinction is worth stating precisely
because the easy answer is the wrong one.

The easy answer is that G1 already governs it — a numeral this project asserts, stated in eleven files
— so the author who wrote it without a block broke a rule that existed. That is true and it is not the
finding. **The finding is that nothing in the contract could ever have told him.** Every clause in §9
keys on an id: M2 resolves tags to blocks, M3 groups quotations by id, M4 walks `derived-from` edges,
M14 compares blocks. A governed quantity with no block is not merely unchecked, it is **structurally
invisible** — there is no assertion in the contract whose failure mode is "this number should have had
an id." `oracle/AMENDMENTS.tsv`'s AM-1 collision check inherits the same blindness, which is why two
amendments to one integer from two authors, with two different arithmetic results, sat in the register
without colliding until The Engineer minted an id by hand at 1.14 and the check fired immediately.

**One clause was supposed to close that hole and it was never written.** §5's third row makes a bare
governed numeral in a second file a lint finding. Version 1 stated the consequence, named no
mechanism, and named no owner — the exact shape of loose end E1's remedy, inert for the same reason.

**So W2-2's open question answers itself.** I offered two dispositions at Wave 2: specify M13, or
delete the row from §5. **Deleting the row would have made the version integer permanently invisible**
— and with it every other governed number nobody thought to give an id. M13 is specified, it is in §9,
and it is the only clause in the contract whose job is to find quantities that do not exist yet.

**What M13 costs, measured rather than estimated.** `node tools/quantities.js --lint` reports **13**
bare-governed-numeral findings today across the declared file set. Thirteen is a dispositionable
number. That is the whole argument for keeping the row: the population is small enough that the lint
will be read.

**And I applied the ruling to myself.** `COUNTING_RULE.md` now carries `Q-COUNTING-RULE-VERSION`, and
§1 says explicitly that a version integer of a document this project owns is governed — the general
clause, not a special case for the answer contract. A rule whose author exempts his own document is
not a rule. `Q-ANSWER-CONTRACT-VERSION`'s three-way collision stays where it is, in AM-66 / AM-73 /
AM-74; it is not mine to rule and this pass does not touch it.

---

## 6. Three things the amendments turned up on first contact, and one trap found while verifying

### 6.1 The W2-1 amendment, as I wrote it, silently deleted four blocks

The nested-fence rule says a `quantity` fence inside a four-backtick fence is a display, not a block.
Implemented literally, it treats any line beginning with four backticks as a fence opener. There is
such a line in `cr_scratch/step1_6_systems_engineer_currency_policy.md:810`, and it is not a fence — it
is an **inline code span in a sentence**, four backticks used to quote a three-backtick string in
prose. The parser opened a fence there and never closed it, and **every quantity block after that line
in that file stopped existing**: `Q-C4-SOURCE-LINES`, `Q-LSEI-PUSHED-COMMITS`, `Q-VERIFIED-ROWS`,
`Q-CURRENCY-VERDICTS`. Four blocks, silently, with the checker reporting cleanly on the ones that
survived.

It surfaced only because the four dropped blocks left dangling tags behind, and the tags happened to
sit outside the promoted marker range. **If those tags had been inside the range, the amendment would
have deleted four governed quantities and reported nothing.**

The fix is one line and it is CommonMark's own rule: a fence opener's info string contains no backtick.
It is in the tool, and §2's nested-fence clause is worded to match. **The lesson is not about
backticks.** It is that an amendment written as one sentence in a contract has an implementation with
a failure mode the sentence does not describe, and the only way to find that is to run it. This one
was found in the first ten minutes because it was run; W2-2's missing lint went unfound for two days
because it was not.

**A third failure-counting trap, found in my own final verification sweep.** `grep -c` exits 1 when
it matches nothing, so a chain of the form `check-A && grep -c FAIL && check-B` stops silently at the
first clean check and never runs `check-B`. It happened while I was verifying the two registers, and
the missing result was indistinguishable from a passing one. §3 rule 11 cannot reach a shell idiom.
The pattern is nonetheless the same as the indented `FAIL` and the unstated corpus root: **a count of
failures is only as trustworthy as the behaviour of the pipeline at zero**, and none of the three
traps is visible in the number it produces.

### 6.2 The corpus figures reproduce; the census around them does not

I re-ran the two measurements the contract's worked example was built on, because minting a block for
a number I had not measured is the thing the contract forbids.

```
cwd: repository root, 55 characters; lsei 7f97983; 2026-08-27
node -e  <normalize basenames of lsei/literature and _intake/japanese-miracle/lit, intersect>
  both 95   lsei-only 57   jm-only 24   union 176
  IDENTICAL 87   DIFFERENT 8
```

**95, 87 and 8 reproduce exactly**, twenty-four hours and one upstream commit later. So does the corpus
union, 176. `Q-OVERLAP-95` and `Q-PAIR-IDENTICAL` are now real blocks, in this file, with those
commands in them.

**What does not reproduce is the LSEI side of the same census.** `cr_scratch/step0_engineer_corpus_merge.md`
Part 1 records 95 / 63 / 24 / 182 under this normalization. Today the same rule gives 95 / **57** / 24
/ **176**. The cause is visible in one command: `git -C lsei log --oneline` shows `f788ea2` is
*"Remove six duplicate summaries the retrieval layer could not tell apart"*. Sixty-three minus six is
fifty-seven, and 182 minus six is 176. **The overlap and the identity count were stable across that
commit and the LSEI-only count and the union were not, and no block existed for any of the four**, so
nothing marked anything stale.

This is not a new error — the gameplan already carries `152 + 119 - 95 = 176, not 182` with both bases
retained, which is correct practice. It is a demonstration that `at:` earns its place: a measurement
over a working copy that does not name a ref is not a measurement, and three of these four numbers
lived for two days without one.

### 6.3 A parallel seat closed W2-14 while I was measuring it

At the start of this pass, M11 reported two failures on `Q-REG-FLIPS-MIN` and `Q-REG-FLIPS-ID`, whose
`conditions` read `as Q-REG-FLIPS-FULL` — W2-14's instance, and the reason I asked for an inheritance
form. Partway through, both blocks changed under me: they now write the conditions out in full, with a
note citing "W2-4/AM-81" and saying the counting rule has no inheritance form.

Two things follow. **The form now exists** — `inherits: Q-<id>`, §2, with M11 following the edge — so
the next author does not have to copy three lines to satisfy a check. And **the file set moved while I
was measuring it**, which is why every count in this file carries its command and its timestamp rather
than a claim to be current. That is §3 rule 11 applied to my own report.

---

## 7. My own two corrections, reported as defects because that is the rule

### 7.1 "Fifteen target paths" is thirteen. The Engineer is right.

`cr_scratch/step1_wave2_designer_review.md` §2.1 opens "Fifteen target paths were specified" and then
prints its evidence, a list of **thirteen** `ABSENT` entries. One of the thirteen —
`NAMING.md / literature/NAMING.md` — names two candidate paths for one artifact, so the list supports
thirteen entries and at most fourteen paths, and supports fifteen under no reading. The Engineer
counted the markers independently and got thirteen BEGIN/END pairs; his census and my list agree, and
my headline does not agree with either.

**The mechanism, named precisely.** I did not count the list I had written. I carried a figure into the
sentence above it. That is arm 2 inside a single document: a number crossing from a table to a
heading without the operation being re-run, in the report that names arm 2 as the project's open
problem. It is not caught by M13 or M15 — the numeral is spelled out and the file is not a relay file
— and I am not proposing a clause for it, because the clause that covers it is §3 rule 12 and the
enforcement is H7. This is what H7 looks like when it fails.

The correction is recorded as AM-129. I have not rewritten the Wave 2 file's §2.1 heading, because the
Manager's close already quotes the figure and a silent edit would leave his file quoting a sentence
that no longer exists; the register row is the correction and it points at both.

### 7.2 "20 sites in 8 files" does not reproduce under the counting rule I published with it

W2-2 stated the live population of the missing bare-numeral lint as 20 sites in 8 files, and — to its
credit — published the counting rule beside it. So I ran that rule again.

```
cwd: repository root, 55 characters; 2026-08-27, after the R-4 edits
grep -niE '(seven|six) (phases|degraded modes)' cr_scratch/*.md *.md | grep -v step1_wave2_designer_review
  16 sites across 9 files
```

**Sixteen, not twenty. Nine files, not eight.** Both numbers moved, in opposite directions, in the
four hours between the Wave 2 run and this one, and files were written by four seats in between.

I am reporting this as a defect rather than as weather. The figure was correct when taken and it is a
`live` quantity wearing `fixed` clothes: a count of occurrences across a tree that other agents are
writing to, stated as a flat number. Under version 2 it would be `class: live` with the command in the
block and drift reported rather than asserted. **The instrument caught its own author twice in one
pass — once on a count he did not run, once on a count he ran and did not class correctly.** That is
the strongest evidence I can offer that the contract's design is sound and the weakest possible
statement about anyone's discipline, which is the correct shape for a common-cause finding.

The 20 is not restated anywhere downstream. AM-129 holds both of section 7's corrections, and section 10 says why it cannot hold either of them properly.

---

## 8. Instance 10, run against the contract, as AM-90 requires

The contract scored itself against nine instances of E16. `cr_scratch/step1_author_rulings.md`,
written three minutes earlier, records a tenth with the explicit instruction to hand it over.

**The instance.** The Engineer stated "ten of the nineteen" FA files needed renaming. The true figure
is 14. The orchestrator relayed the wrong number into the option the author ruled on, and re-ran the
count only after the ruling.

**Re-run at R-4, so that the verdict rests on a measurement and not on the ruling's own text:**

```
cwd: repository root, 55 characters; 2026-08-27
ls _intake/japanese-miracle/fa/*.md | wc -l                                      19
ls _intake/japanese-miracle/fa/ | tr A-Z a-z |
  grep -cE '^fa[0-9]+-(deliverable|source-list)\.md$'                            14
```

19 and 14 reproduce exactly.

**Verdict against contract version 2: PARTIAL, and it is the same verdict as instances 2, 4 and 8 for
the same reason.** Taking it clause by clause:

| Clause | Would it have fired? |
|---|---|
| G1 | Yes. The figure was stated in the ruling and in the deliverable, so it is governed. |
| §2 `operation` | Yes, and this is where the defect actually was. The regex above is the operation; version 1 required it in the block; "ten of the nineteen" carried no operation. |
| §2 `population` | Yes. "The 19-file shelf as it stands in `_intake/`" is the population, and the two counts differ by which files are in it. |
| M3 | **No.** Nothing quoted an id, because no block existed. |
| M13 | **Only after a block exists.** M13 keys on the `unit` noun of a `fixed` block; with no block there is no key. |
| §3 rule 12 / H7 | **Yes, and this is the only clause that reaches it.** The number crossed from an agent's output into an author ruling without the relaying seat running the operation. |

**So instance 10 is not an arm-1 instance at all.** It is arm 2, and it is the tenth instance because
it is the one that was still happening while the contract about the other nine was being written.
Version 1 would have marked it as a missing block after the fact. Version 2 names it before the fact,
at §3 rule 12, and cannot mechanize it, and says so at H7. **Scored honestly: PREVENTED by nothing,
DETECTED by §2 at review, NAMED by rule 12.** The scorecard in
`cr_scratch/step1_12_designer_counting_rule.md` §6 stands at nine and is not amended; instance 10 is
recorded here and in AM-90, which moves to `applied`.

---

## 9. The run

Every figure below is `grep -c` over the whole unfiltered output of the named command, run from the
repository root, 55 characters, on 2026-08-27, at `lsei 7f97983` / `cr-agents f0c976b`. The tool prints
every prefix at column 0 and its header says so, which is §3 rule 11 applied to itself.

```
node tools/quantities.js --check      EXIT=1
  grep -c '^FAIL '                    11
  71 files in the declared set; 72 blocks across 13 files; 130 tag sites; 49 ids referenced
  OK M1  OK M4 (25 edges, acyclic)  OK M10  OK M12  OK M6  OK M7 (64 blocks)

node tools/quantities.js --lint       EXIT=0
  grep -c '^LINT '                    62
  M5 6 live blocks, not re-run   M8 24   M9 18   M13 13   M14 2   M15 5
  M3 detail: 35 unreadable sites, 4 prose mismatches
```

**32 → 11. Twenty-one closed, nineteen of them by these amendments, and every one of those nineteen
was a defect in my own contract or in a file the contract made me responsible for.**

| Clause | Wave 2, 09:15 | 1.14, post-promotion | R-4 now | Whose |
|---|---|---|---|---|
| M1 | 1 | 1 | **0** | closed at 1.14's promotion and by the fence fix |
| M2 unresolved | 9 sites / 6 ids | 6 ids | **0** | mine: `Q-EG-` namespace, four real blocks minted, one mention |
| M2 duplicate | 3 | 16 | **8** | 5 economics (AM-93–97), 3 lunar (AM-78–80). **Not mine.** |
| M3 | 1 | 2 | **2** | the same two addendum collisions, 17 vs 18 and 58 vs 59. **Not mine.** |
| M4 | 2 | 2 | **0** | mine: both parents minted, here and at 1.14 |
| M11 | 2 | 2 | **1** | one closed by its own author mid-pass; `Q-REG-TSV-IGNORED` remains, 1.8's |
| M12 | 1 | 2 | **0** | mine |
| M6/M7 | n/a | 1 | **0** | index regenerated |
| **Total** | **16** | **23 → 32** | **11** | **every remaining failure belongs to another seat and carries a row** |

The 23-to-32 step is the promotion, and it is not a regression: the eight blocks it duplicated were
predicted to the id by two personas before it ran. §8's new clause returns them.

**What the tolerant M3 reader bought, isolated.** Same tree, same file set, same amendments, strict
reader against tolerant reader:

```
strict:   56 M3-unreadable sites
tolerant: 35 M3-unreadable sites
```

**Twenty-one sites recovered, and every one of them was markup** — `` `19 ``, `**87`, `` `150 ``,
`**`19 `. The remaining 35 are not a tolerance problem: every one has a noun before the tag and no
numeral anywhere near it (`sides`, `filename`, `nothing`, `unanswerable`, `rows=<n>`). Those are
genuine §3 rule 8 violations and they need 35 author edits, not a cleverer regex. That is why version 2 states the adjacency rule as well as
relaxing the reader: relaxing alone would have licensed the drift, and stating alone would have left
ten sites unread forever.

---

## 10. What is owed, and to whom

**Nothing in this pass blocks.** The eleven live failures each have an owner and a row.

| Owner | Failures | Rows |
|---|---|---|
| 1.10 / the economics register | 5 duplicate ids + 1 M3 collision (17 vs 18) | AM-93 to AM-97 |
| 1.9 / the lunar register | 3 duplicate ids + 1 M3 collision (58 vs 59) | AM-78 to AM-80 |
| 1.8 / the register schema | 1 M11: `Q-REG-TSV-IGNORED` names a scratch root whose length was never recorded. Under AM-122's ruling this is no longer an omission, it is a one-token edit | AM-130 |

**New rows this pass files against other seats.**

- **AM-128**, 1.6: `Q-C4-SOURCE-LINES` should read `operation: derived: Q-C4-FENCE-SPAN span - 2` with
  `derived-from: Q-C4-FENCE-SPAN`. The parent now exists and M4 will evaluate the arithmetic. This is
  the first real use of the `derived:` form and it closes instance 5's last loose thread.
- **AM-130**, 1.8: `Q-REG-TSV-IGNORED`'s `cwd:` gains the `length-independent:` token in front of the
  reason its author had already written out. This is R-3's AM-122 and the finding is right: M11
  over-applied to an operation where path length provably cannot affect the value. I required a token
  rather than accepting the prose, because a check whose pass condition is that somebody wrote a
  sentence about it is not a check — and the token costs one line at the moment the author already
  has the reason in hand.
- **AM-131**, 1.8: `Q-REG-FLIPS-MIN` and `Q-REG-FLIPS-ID` write `population: as Q-REG-FLIPS-FULL` and
  `derived-from: none`. Under §2's amended `derived-from` rule a population that is a governed
  quantity is named by id and listed. Their conditions are now correct and their populations are not,
  and no clause sees it: **M4 walks edges that exist and cannot see an edge that was never declared.**
  A real limit of the graph, stated rather than papered over.

**Two things I could not do.**

`Q-ABSTRACT-OVERLAP` has no block and gets none from me; §2 of this file says why. And I have not
touched `Q-ANSWER-CONTRACT-VERSION`'s three-way collision: the ruling between AM-66, AM-73 and AM-74 is
The Software Engineer's and The Systems Engineer's, and version 2 only gives the amendment register a
clause to hang it on.

**For The Manager's Step 2 close.** His check 4 reads *"the sixteen live counting failures are zero,
and the number was produced by running the checker rather than by reading a table."* The number is 11
and the checker produced it; the sixteen became 32 through promotion and 11 through this pass, and
every step of that is a command in this file. His Falsifier 3 — that Step 2 lands both fixes and the
relay-error count is not zero — is now testable, because M15 gives arm 2 a counter for the first time
and its reading today is 5.

**One thing I am watching.** M15's five findings and M13's thirteen are both small enough to read. If
either passes about thirty, the lint stops being read and the clause joins §5's third row in the
category of stated consequences nobody applies. That is the failure mode of every lint in this contract
and it is not currently measured by anything.
---

## 11. What changed in `tools/quantities.js`, and where the falsifiers stand

The contract is a specification and the checker is its implementation. Amending one without the other
would have produced exactly the defect this pass exists to remove — a stated rule with no mechanism —
so the tool moved with the contract, and the run in §9 is the amended tool against the amended
contract.

| Change | Why |
|---|---|
| Three flags inverted to defaults: `--include-superseded`, `--no-eg`, `--no-cwd-length` | The amendments are ruled, so they are the behaviour. Each escape hatch is now named for what it restores, so a count taken under one is visibly taken under a flag |
| The inline-code-span guard on fence detection | §6.1. Without it the W2-1 amendment silently deleted four blocks |
| M3: tolerant token reader, whole-range tokens, string comparison for non-numeric values, and a `live` branch that checks the value is on the line | AM-88 and §3 rule 2. Isolated at 56 → 35 unreadable sites |
| M4: `pending:` resolved against `oracle/AMENDMENTS.tsv`; `derived:` expressions evaluated | AM-86 and AM-84. Both are hard failures, because both are arithmetic a script can do |
| M11: follows `inherits: Q-<id>`, requires the character count, accepts `length-independent:` | AM-83, AM-122, and §2's inheritance form |
| M13, M14, M15 added to `--lint` | AM-82, AM-87, AM-125 |
| M15's own message rewritten to use the mention form | Caught by M3 on my own report: the tool was writing the id inside brackets after the word "without", which is the quotation form used for a value it is not quoting. A checker that violates the contract it checks is the first thing a reader will find |

**Where The Manager's Falsifier 1 stands.** He ruled promote-then-amend, and said the ruling is
falsified if a promoted file and its `cr_scratch/` source block are both edited. I edited
`COUNTING_RULE.md`, the promoted file, and I edited three lines of
`cr_scratch/step1_12_designer_counting_rule.md` — **all three outside the marker pair, which runs
177 to 423**; the edited lines are 435, 450 and 487, all in §6, which was never part of the
deliverable. The block inside the markers is untouched, byte for byte. **The falsifier is not tripped,
and the ruling held under the first real amendment pass against a promoted file**, which is the test
it was written for.

**One thing happened to this pass that belongs in the record.** The working tree was committed by
another seat while I was measuring it, and two files I depend on changed under me mid-run:
`oracle/AMENDMENTS.tsv` went from 106 rows to 122 as R-2 and R-3 filed against it, and 1.8's two
`Q-REG-FLIPS` blocks were corrected by their own author between one run of the checker and the next.
Nothing was lost and my ids were re-filed at AM-123 rather than colliding. It is recorded because it
is the reason every number in this file carries its command and its timestamp instead of a claim to be
current, and because **the first thing I did on finding the register had moved was re-read it rather
than re-file over it** — which is §3 rule 12 applied to a register instead of to a number.
