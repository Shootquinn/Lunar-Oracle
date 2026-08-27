# Step 1.7 — The Engineer: the naming and source-identifier contract

**Persona:** The Engineer. **Sub-step:** 1.7, Step 1. **Date:** 2026-08-26.
**Scope discipline:** nothing moved. `literature/` does not exist and this spawn did not create it.
Two throwaway git repositories and one probe directory were built in the session scratchpad to
measure the Windows path limit and were deleted. One clone of the `lsei/` working copy was made
into `_probe_clone/` inside the repository to reproduce E14, and was removed in the same command.

**Deliverable:** the `NAMING.md` text is at the bottom of this file, between the two
`BEGIN NAMING.md` / `END NAMING.md` markers. It is liftable verbatim to `literature/NAMING.md`
once sub-step 1.1's corrected `.gitignore` lands (ordering constraint E4). Extract with:

```
sed -n '/^<!-- BEGIN NAMING.md -->$/,/^<!-- END NAMING.md -->$/p' \
    cr_scratch/step1_7_engineer_naming.md | sed '1d;$d' > literature/NAMING.md
```

---

## Measurement basis, stated once

Every count below was measured on 2026-08-26 against **the 152-file `lsei/literature/` working copy**
(the 158-file upstream corpus with the six deletions from `cr_scratch/step0_dedup_decisions.md`
applied locally) **plus the 119-file `_intake/japanese-miracle/lit/`**. Under the normalization rule
in §1 of the spec that union is **176 names**. Where I quote a figure on the older 158-file basis I
say so inline. All of these are provisional until sub-step 2.1 re-measures.

---

## What I ran, and what it found

### 1. The normalization rule, executed against all 185 distinct raw leaf names

Nine names change. 176 do not. Every one of the nine that changes is one of the nine the Step 0.2
inventory already identified, with no substitutions:

```
473486main_iss_atcs_overview.md                    -> 473486main-iss-atcs-overview.md
BEA_depreciation_rates.md                          -> bea-depreciation-rates.md
GDP.md                                             -> gdp.md
IEEE 2022 Paper SH TCS Architecture and Technical Challenges Update.md
                                                   -> ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update.md
ISNPS_Tech_Report_103.md                           -> isnps-tech-report-103.md
ISNPS_Tech_Report_97.md                            -> isnps-tech-report-97.md
Jones_SuperHeavyLift_FINAL20260614.md              -> jones-superheavylift-final20260614.md
Statistical Review of World Energy.md              -> statistical-review-of-world-energy.md
Take or Make in space.md                           -> take-or-make-in-space.md
```

Those same nine are exactly the nine that fail `^[a-z0-9]+(-[a-z0-9]+)*\.md$` before
normalization. **After normalization, zero of 176 fail it.** The regex and the normalizer are
therefore consistent: the normalizer's output is a fixed point of the regex on every real name in
the corpus. No name in the corpus needs a hand exception.

No filename in either corpus, or in the FA shelf, contains a character outside
`[A-Za-z0-9_. -]`, contains an internal dot, or uses an uppercase `.MD`. The normalizer does not
need a transliteration branch and I did not write one.

### 2. The year bonus does not fire where the year is last. One live case.

`scoreFile()` reads the year with `/-(\d{4})-/`, which requires hyphens on **both** sides.
Measured across the 176:

```
year bonus fires                     157
year token present, bonus does NOT     1     nasa-lunar-power-strategy-2025
no four-digit year token at all       18
```

`nasa-lunar-power-strategy-2025.md` loses +3 it should earn. Renaming it
`nasa-2025-lunar-power-strategy.md` makes the bonus fire; verified directly. This is why the
convention in the spec pins the year to the **second** segment rather than saying "include a year."
"Include a year" would have passed this file.

The 18 with no year at all are real and are not defects — they are datasets, wikis, agency
documents and one undated preprint. The spec has a branch for them.

### 3. One author anchor in the corpus is dead and no filename can revive it.

```
may-1977-how-japans-economy-grew-so-fast-review.md
```

`may` is in `literature_search.js`'s own `STOPWORDS`. `filenameTokens()` drops it, and — the part
that matters — `tokenize(question)` drops it too, so `qSet.has('may')` is false no matter what the
question says. `scoreFile()` computes `leadAuthor = baseName(filename).split('-')[0]` = `"may"` and
the `+3` can never fire.

**This is not fixable in the filename.** Renaming the author falsifies the citation. I am recording
it as a known dead anchor with the retrieval layer named as owner, not papering over it with a
rename. It is one file of 176.

### 4. A numeric suffix is invisible; a word is not. Re-measured with the shipped scorer.

```
question: "What does Csank 2022 say about the brief summary of AC versus DC lunar microgrid transmission?"

  csank-2022-powering-the-moon.md          tokens [csank,2022,powering,moon]        score 8
  csank-2022-powering-the-moon-2.md        tokens [csank,2022,powering,moon]        score 8
  csank-2022-powering-the-moon-brief.md    tokens [csank,2022,powering,moon,brief]  score 9
```

The `-2` file and the un-suffixed file are the same file to the retrieval layer. `-brief` is not.
The union currently holds **zero** files ending in `-<digit>`, because the six were resolved at
Step 0; the rule exists so a fresh clone cannot reintroduce them.

The rule needs one more clause than "use a word," and I found it by running the tokenizer rather
than reasoning about it:

```
filenameTokens("one-two-three.md")  ->  []
filenameTokens("fa-1-table.md")     ->  ["fa","table"]
filenameTokens("x-2.md")            ->  []
```

`one`, `two` and `three` are stopwords. A disambiguator of `-one` / `-two` is exactly as invisible
as `-1` / `-2`. The spec therefore states the test as *the tokenizer's output must differ*, which
is a property a checker can evaluate, rather than "use a word", which is a property it cannot.

### 5. The path-length ceiling. I bisected it rather than quoting MAX_PATH.

Built a git repository with files at controlled absolute path lengths, committed with
`core.longpaths=true`, and cloned it with `core.longpaths=false`:

```
abs path length 256   checked out OK
abs path length 257   checked out OK
abs path length 258   checked out OK
abs path length 259   checked out OK
abs path length 260   error: unable to create file ...: Filename too long
abs path length 261   error: unable to create file ...: Filename too long
abs path length 262   error: unable to create file ...: Filename too long
```

git 2.55.0.windows.1; `core.longpaths` unset at system, global and repo scope; OS
`LongPathsEnabled` = 0. **The hard limit is 259 characters of absolute path.** Node's `fs` is not
subject to it — it writes past 300 without complaint, because libuv prefixes `\\?\`. That is why
this defect can be created by one tool and only discovered by another.

**E14's diagnosis in the register is incomplete, and correcting it changes the fix.** I reproduced
the clone at this repository's own root and it succeeded:

```
git -c core.longpaths=false clone lsei _probe_clone     ->  exit 0
_probe_clone/literature/power-and-thermal/ieee-...-update.md   CHECKED OUT OK, abs len 168
```

168 is nowhere near 259. The leaf name is not what failed. The binding variable is the **root**.
The failing relative path is `lsei\literature\power-and-thermal\ieee-...-update.md`, 104
characters, so the clone fails when the root is 155 characters or longer. Roots that long exist on
this machine and are produced by the tooling itself — this session's own scratchpad root is 158
characters. That is the environment E14 was observed in, and it is consistent to the character.

The consequence is not cosmetic. If the ceiling were written as "keep filenames short," it would be
unfalsifiable and it would not have caught this. Written as an absolute-path budget with a declared
root allowance, both halves are assertable: the repo-relative half in CI on any machine, the root
half once at bootstrap on the machine that will do the work.

Chosen budget, and it closes exactly on the measured limit:

```
  150   root allowance                      (this repo's root is 55; 95 characters of slack)
+   1   separator
+  10   "literature"
+   1   separator
+  32   taxonomy folder, one level          (longest survivor: self-replication-and-automation, 31)
+   1   separator
+  64   leaf filename including ".md"       (longest survivor today: 59)
-----
  259   = the measured limit, exactly
```

Cost against real names: **one file of 176 exceeds the 64-character leaf ceiling**, and it is the
file named in E14.

```
70  ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update.md
59  hague-working-group-2019-building-blocks-space-resources.md
56  kornuta-2019-commercial-lunar-propellant-architecture.md
```

Two of the eleven taxonomy folders I proposed at 0.2 exceed the 32-character folder ceiling and I
am shortening them rather than raising the ceiling: `organization-and-production-systems` (35) and
`development-and-industrial-policy` (33). See §8 of the spec.

### 6. The second namespace. Measured, not asserted.

The FA shelf is 19 files. Normalized, 18 of 19 already carry a `fa<n>-` prefix; the exception is
`arithmetic-note.md`, which spans all eight and takes `fa0-`.

Disjointness, run against every real name:

```
  176 summary names   match R_S: 176/176      match R_F: 0/176
   19 FA names        match R_F:  18/19       match R_S: 1/19  (arithmetic-note.md)
  cross-shelf tokenizer collisions: 0
```

The nearest miss in the whole corpus is `falcon-heavy-wikipedia.md`. It begins with the letters
`fa` and is not a collision, because the reserved prefix is `fa` **followed by a digit and a
hyphen**, and because its leading hyphen-segment is `falcon`. There is no near-miss closer than
that, and I looked at all 176.

`fa1` survives the tokenizer (three characters, not a stopword) and lands as `leadAuthor`, so a
question naming FA1 earns the +3 anchor on the FA shelf and nothing on the summary shelf:

```
question: "What does FA1 say about the mechanism table and tacit knowledge transfer?"
  fa1-mechanism-table.md                  overlap 3  bonus 3  score 6
  deming-1967-japan-quality-control.md    overlap 0  bonus 0  score 0
```

The prefix must be glued, `fa1-`, never `fa-1-`: `filenameTokens("fa-1-table.md")` is
`["fa","table"]`, the digit dropped by the same `t.length > 1` filter that eats `-2`.

**The FA shelf's current names are bad names and the ruling has to say so.** Ten of the nineteen are
`fa<n>-deliverable.md` or `fa<n>-source-list.md`. Measured:

```
question: "What is the doubling-time verdict for self-replicating lunar capital?"
  fa6-deliverable.md                                 overlap 0  bonus 0  score 0
  fa6-self-replicating-capital-doubling-verdict.md   overlap 5  bonus 0  score 5

question: "Does the FA3 verdict on transferring Deming quality method to a machine workforce hold?"
  fa3-deliverable.md                                 overlap 1  bonus 3  score 4
  fa3-quality-method-machine-workforce-verdict.md    overlap 6  bonus 3  score 9
```

`fa6-deliverable.md` scores **zero** against a question that is a paraphrase of its own title,
because nobody asks a question containing the word "deliverable." The author's ruling 3 requires
that retrieval *reach* the second shelf. Under the current names it reaches the shelf only when the
question already knows the FA number, which is the same as requiring a person to remember it — the
exact failure ruling 3 names. So the FA convention in the spec is `fa<n>-<subject>-<kind>`, and the
number is the namespace tag rather than the name. Rename table in §5 of the spec; all 19 proposed
names match `R_F`, none collides with any other, the longest is 49 characters, and the minimum
token count is 3.

### 7. Field label: filename, path, or file. Measured, and the answer is not the filename.

The Software Engineer's §8.2 needs a machine-readable field label per file for field-scoped IDF.
I tested putting it in the filename:

```
question: "How much lunar regolith must be processed for a tonne of oxygen?"

  sargeant-2020-hydrogen-reduction-ilmenite-static.md         lead="sargeant"  score 0
  lunar-sargeant-2020-hydrogen-reduction-ilmenite-static.md   lead="lunar"     score 4
  beason-1996-targeting-japan.md                              lead="beason"    score 0
  lunar-beason-1996-targeting-japan.md                        lead="lunar"     score 4
```

A field tag in the leading position becomes `leadAuthor` and fires the +3 identity bonus for every
file in the field on any question that happens to say the field word. A **mis-filed Japanese
industrial-policy paper** scores 4 on a pure ISRU question — the same score as a correctly tagged
ISRU paper, and higher than the genuinely relevant untagged one. That converts the strongest signal
a filename offers into a constant, which is worse than not having it.

It also costs leaf budget the E14 arithmetic cannot spare. Ruling is in §9 of the spec: the label
lives in the path, as a committed folder-to-field map.

---

## The two rulings I was asked for

**Does the eleven-folder taxonomy constrain the filename rule, or is it independent?**

It constrains it, and the constraint is arithmetic rather than aesthetic. Retrieval is genuinely
indifferent — `filenameTokens()` reads the leaf only, and identical queries against the flat probe
and the foldered corpus returned identical rankings at 0.2. But the path-length ceiling is a single
budget that the folder half and the leaf half both draw on: every character spent on a folder name
is a character unavailable to a filename. That is why the spec fixes the folder ceiling (32) and
the leaf ceiling (64) as two numbers that sum, with the depth pinned at exactly one level, and why
two of my own eleven folder names are shortened rather than the ceiling raised. A taxonomy decision
and a naming decision that share one budget are not independent, whatever retrieval thinks.

The field label lives in **the path**, not the filename and not the file. Three reasons, in order of
weight. (a) A field tag in the filename corrupts the identity bonus, measured above. (b)
`listCorpusFiles()` already returns the folder segment as part of the relative path at zero
additional cost, and `filenameTokens()` already strips it before scoring — so the path segment is
the one place in this codebase that is machine-readable and deliberately unscored, which is exactly
the property a field label needs. (c) A file has exactly one path, so a path-borne label cannot
drift from the file, whereas a front-matter field can be edited into disagreement with the folder
it sits in and nothing would notice. The label itself is a committed folder-to-field map, because
eleven folders are not two fields and the mapping is data that will change when the taxonomy does.

**Do the two adjudicated duplicate pairs (D7) need a naming rule of their own?**

No. The dedup-key precedence covers them, and I checked both against it. Poston 2020 resolves on
its printed DOI, `10.1080/00295450.2020.1725382`, at the top of the precedence. Metzger 2021 has no
DOI and no publisher article URL, falls to `(identity, year, title)`, and the two members collide
there — correctly, because they are the same source. Identification is solved; the precedence
needed no extension.

What the precedence does not cover, and what I am ruling on rather than leaving open: the deferred
merge will eventually produce a **third** artifact, the union of both members, and that artifact
needs a name. It takes the **canonical name** — the name the surviving member holds today — and the
superseded member stays where it is, outside the namespace, in `_intake/superseded-duplicates/`.
There is no `-merged` suffix and no second name. **Nothing in the filename records that a file is a
union of two summaries**, and that is deliberate: a name that encodes edit history changes when the
history changes, and every citation to the old name breaks silently. The merge is recorded in the
file's own `## Provenance` block. The name is an address, not a changelog.

---

## What I am handing to other people

- **The Software Engineer.** `may-1977-...` has a permanently dead author anchor because `may` is
  in his own `STOPWORDS` list, and the failure is on the question side, so no filename fixes it.
  The narrow fix is to exempt the leading segment from the stopword filter in `filenameTokens()`
  and to test `qSet` against the raw leading segment. One file today; it is a class, not a case.
  Also: `/-(\d{4})-/` silently declines to fire on a trailing year. The naming rule now prevents
  that, but the regex is still the fragile half.
- **Sub-step 1.4.** `core.longpaths=true` is still needed and is still yours. The ceiling in this
  spec does not depend on it — that is the point of stating a budget rather than a git setting —
  but the two together are what make a clone of the upstream corpus survive on a deep root. Add the
  root-budget assertion described in §8 to the bootstrap; it is four lines and it fails loudly on
  the machine where it matters instead of quietly on the machine where it does not.
- **Sub-step 2.3.** The five assertions in §11 of the spec are what you run when the taxonomy lands.
  `tools/check_corpus_collisions.js` already implements the tokenizer-collision assertion and exits
  0 on each shelf today; the other four are new and are additions to that file, not a new tool.
- **The Manager.** The FA shelf rename in §5 is nineteen files and it is a real change to somebody
  else's finished work. It is justified by the measurement in §6 above, not by tidiness, but it is
  a call the author may want to see before 2.x executes it.

---
---

<!-- BEGIN NAMING.md -->
# NAMING.md — the filename and source-identifier contract

**Status:** frozen at Step 1, sub-step 1.7. **Basis:** measured 2026-08-26 against the 152-file
`lsei/literature/` working copy plus the 119-file `_intake/japanese-miracle/lit/`, a 176-name union
under §1, plus the 19-file FA shelf. Counts here are provisional until sub-step 2.1 re-measures;
any count quoted elsewhere in this project must quote its basis.

**Enforced by:** `tools/check_corpus_collisions.js`, §11. Not by convention. A convention is a
preference, and this repository builds its corpus from working copies it does not control, so a
fresh clone reinstates every violation a person ever fixed by hand.

This file governs **two namespaces**. They are two rules, not one rule with an exception.

| | Namespace S | Namespace F |
|---|---|---|
| Directory | `literature/<folder>/` | `findings/` |
| Holds | one summary of one source | an FA deliverable of this project |
| Warrant | every claim traces to one source | adjudicates across sources; carries arithmetic present in none of them |
| Depth | exactly one folder level | flat |
| Leaf form | `<identity>-<year>-<topic>.md` | `fa<n>-<subject>-<kind>.md` |
| Regex | `R_S`, §2 | `R_F`, §2 |

---

## 1. Normalization

Every filename entering either namespace is passed through `normalize()` first. It is the same
function for both namespaces; the namespaces differ in what they accept afterward, not in how they
are normalized.

```
normalize(name):
  1. s <- the leaf name only; discard any directory prefix
  2. if s ends with ".md" (case-insensitive), remove exactly that one trailing occurrence
  3. s <- lowercase(s)
  4. s <- replace each maximal run of one-or-more [_ ] (underscore or space) with a single "-"
  5. s <- replace each maximal run of two-or-more "-" with a single "-"
  6. s <- remove any leading or trailing "-"
  7. return s + ".md"
```

Nothing else. No stemming, no token reordering, no year extraction, no transliteration. It is
reversible enough to audit by eye and short enough to state in seven lines, which is the property a
merge key needs.

Steps 4 and 5 are separate on purpose. Step 4 turns `_ _` into `--`; step 5 collapses it. Merging
them into one character class would also collapse hyphens the author wrote deliberately. There is
no such case in the corpus today. There will be.

Step 2 precedes step 3 so that a `.MD` extension is stripped rather than lowercased into the name.

**Worked examples — names that change:**

```
IEEE 2022 Paper SH TCS Architecture and Technical Challenges Update.md
  -> ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update.md

ISNPS_Tech_Report_97.md   ->  isnps-tech-report-97.md
GDP.md                    ->  gdp.md
Take or Make in space.md  ->  take-or-make-in-space.md
```

**Worked examples — names that do not change:**

```
beason-1996-targeting-japan.md   ->  beason-1996-targeting-japan.md
473486main-iss-atcs-overview.md  ->  473486main-iss-atcs-overview.md
fa2-verdict-table.md             ->  fa2-verdict-table.md
```

**Measured:** of the 185 distinct raw leaf names across the two source corpora, 9 change and 176
do not. `normalize()` is idempotent: `normalize(normalize(x)) == normalize(x)` for all 185.

**Case is not a formality on this project.** `GDP.md` and `gdp.md` are one path on a
case-insensitive filesystem. A merge that copies both without normalizing first loses one file
silently on Windows and keeps both on Linux. This was observed, not predicted.

---

## 2. The regexes, and what a failing name does

```
R_S  (namespace S, summaries)   ^(?!fa[0-8]-)[a-z0-9]+(-[a-z0-9]+)*\.md$
R_F  (namespace F, findings)    ^fa[0-8]-[a-z0-9]+(-[a-z0-9]+)*\.md$
```

`R_S` and `R_F` are disjoint by construction: `R_F` requires the leading segment to be exactly one
of `fa0`…`fa8`, and `R_S` forbids it. No string matches both. No string in either shelf needs to.

**What a failing name does.** It does not land. Concretely, in order:

1. **At merge time (Step 2).** The merge step calls `normalize()` and then tests the result. A name
   failing its namespace's regex is not copied; the merge exits non-zero naming the file, and no
   partial corpus is left behind. The merge records; it does not rename. A name that needs a
   decision is a decision, and it goes to a person.
2. **In CI, on every run.** `tools/check_corpus_collisions.js` walks both shelves and exits 1 on
   any file failing its own namespace's regex, or matching the other namespace's. §11.
3. **Never at query time.** `literature_search.js` does not validate filenames and must not be
   made to. A corpus that reaches the retrieval layer has already been checked; adding a second,
   softer check there would let a bad name exist in a state where one component tolerates it.

**Measured:** all 176 summary names pass `R_S` after normalization and none matches `R_F`. Before
normalization, 9 fail. On the FA shelf, 18 of 19 pass `R_F`; the exception is `arithmetic-note.md`,
renamed under §5.

---

## 3. Namespace S: the author-year-topic convention

```
<identity>-<year>-<topic>.md
```

- **`<identity>`** — the lead author's surname, lowercased and ASCII-folded, no initials. A
  hyphenated or particled surname keeps its parts: `von-der-dunk`, `rosenstein-rodan`,
  `andrews-hanna`. Where a work has no personal author, `<identity>` is the issuing body:
  `nasa`, `ieee`, `un`, `us-congress`, `bea`, `imf`.
- **`<year>`** — the four-digit year of the version summarized, as the **second** hyphen segment.
  Position is part of the rule, not a style note: `scoreFile()` reads the year with `/-(\d{4})-/`,
  which requires a hyphen on both sides. `nasa-lunar-power-strategy-2025.md` carries a year and
  earns no year bonus. `nasa-2025-lunar-power-strategy.md` earns it. Both are legible to a person;
  only one is legible to the scorer.
- **`<topic>`** — one to six words, hyphenated, drawn from the source's own title or subject. Not a
  sentence, not the full title.

**No-year branch.** Where a source genuinely has no year — a live dataset, a wiki page, an undated
preprint, an accession-numbered agency document — the name is `<identity>-<topic>.md` with no year
segment. It is not filled with a guess, and it is not filled with a retrieval date, because a
retrieval date in a filename changes when someone re-fetches and every citation to the old name
breaks. 18 of the 176 are in this branch today (`gdp`, `statistical-review-of-world-energy`,
`falcon-heavy-wikipedia`, `isnps-tech-report-97`, `473486main-iss-atcs-overview` and 13 others).
The year, where it exists at all, is recorded in the file's `## Citation` block regardless.

**The leading segment must survive the tokenizer.** `scoreFile()` computes
`leadAuthor = baseName(filename).split('-')[0]` and tests it against the question's token set, which
has already had stopwords removed. A leading segment that is a stopword or a single character can
never match, so its +3 identity anchor is permanently dead. Assert with `tokenize(<identity>)` of
length exactly 1.

**One known violation, carried deliberately.** `may-1977-how-japans-economy-grew-so-fast-review.md`.
`may` is a stopword in `literature_search.js`. The anchor is dead and **no filename can revive it**,
because the token is dropped on the question side. Renaming a real author to satisfy a tokenizer
falsifies a citation, so the file lands as it is, the checker whitelists this one name, and the fix
is owned by the retrieval layer (exempt the leading segment from the stopword filter). One file of
176. It is recorded here so it is not rediscovered as a bug.

---

## 4. Semantic disambiguation

**A numeric suffix is not disambiguation.** `literature_search.js` drops tokens of one character
(`t.length > 1`). Measured with the shipped scorer:

```
csank-2022-powering-the-moon.md        -> [csank,2022,powering,moon]        score 8
csank-2022-powering-the-moon-2.md      -> [csank,2022,powering,moon]        score 8
csank-2022-powering-the-moon-brief.md  -> [csank,2022,powering,moon,brief]  score 9
```

The first two are **one file** to the retrieval layer. Their scores tie, their `frac` ties, and
`best` falls to `listCorpusFiles()`'s sort order, which is alphabetical, which puts `-2` first.
That is not a tiebreak; it is a coin that always lands the same way. In the Scenario Explorer it
meant the 7,637-byte summary was cited every time and the 23,190-byte summary never.

**The rule.** Two files that describe different things must produce **different token sets** under
`filenameTokens()`. That is the test, and it is stated as the tokenizer's output rather than as
"use a word" because "use a word" does not catch this:

```
filenameTokens("one-two-three.md")  ->  []
filenameTokens("x-2.md")            ->  []
```

`one`, `two` and `three` are stopwords. `-one` / `-two` is exactly as invisible as `-1` / `-2`.

**Valid disambiguators** are content words that a reader and the tokenizer both see, drawn from what
actually differs between the two documents: `-phase-i` / `-phase-ii`, `-icarus` / `-grl`,
`-brief` / `-comprehensive`, `-sizing` / `-flowsheet`. Verify by running the checker, not by
looking at the name.

**Measured:** the union holds zero names ending in `-<digit>` today. The rule exists so a fresh
clone of an upstream corpus cannot reintroduce what Step 0 removed by hand.

---

## 5. Namespace F: the findings shelf

**Directory: `findings/`, a sibling of `literature/`, flat.**

Sibling rather than child, and this is load-bearing. `listCorpusFiles(root)` walks recursively and
returns every `.md` file under whatever root it is handed. If the FA deliverables sat inside
`literature/`, a search of the summary shelf would return them with no folder-level way to exclude
them — which is precisely the failure the author's two-shelf ruling exists to prevent: an answer
returning one of this project's own past verdicts as though it were a finding in a paper. Two
directories means two roots, and the caller chooses which shelf it is searching.

**Filename: `fa<n>-<subject>-<kind>.md`**, where `<n>` is `0`–`8`.

- **`fa<n>-`** is the namespace tag. Glued, never `fa-<n>-`: `filenameTokens("fa-1-table.md")` is
  `["fa","table"]` — the digit is eaten by the same length filter that eats `-2`. `fa1` is three
  characters and not a stopword, so it survives, and it lands as `leadAuthor`, so a question naming
  FA1 earns the +3 identity anchor on this shelf and nothing on the other.
- **`fa0-`** is the cross-cutting slot, for material spanning all eight.
- **`<subject>`** is mandatory and carries real topic words. **The number is the namespace tag, not
  the name.** A name of the form `fa<n>-deliverable.md` is rejected: `deliverable`, `source`,
  `list`, `table`, `note` and `sheet` are this project's own vocabulary, not any user's, and a name
  built only from them is unreachable. Measured:

```
question: "What is the doubling-time verdict for self-replicating lunar capital?"
  fa6-deliverable.md                                score 0
  fa6-self-replicating-capital-doubling-verdict.md  score 5
```

  `fa6-deliverable.md` scores zero against a paraphrase of its own title. A retrieval layer that
  reaches this shelf only when the question already knows the FA number is a retrieval layer that
  requires a person to remember the shelf exists.

- **`<kind>`** is the trailing segment and is one of: `verdict`, `table`, `ledger`, `sheet`,
  `source-list`, `note`. Closed list; extend it here, in this file, not in a filename.

**Minimum three tokens under `filenameTokens()`**, of which at least two are outside the `<kind>`
vocabulary.

**The rename, on landing.** 19 files.

| Current | Lands as |
|---|---|
| `arithmetic-note.md` | `fa0-definition-and-doubling-arithmetic.md` |
| `FA1-mechanism-table.md` | `fa1-miracle-mechanism-transportability-table.md` |
| `FA1-source-list.md` | `fa1-japanese-miracle-source-list.md` |
| `FA2-verdict-table.md` | `fa2-growth-model-doubling-verdict-table.md` |
| `FA2-source-list.md` | `fa2-growth-theory-catch-up-source-list.md` |
| `FA3-deliverable.md` | `fa3-quality-method-machine-workforce-verdict.md` |
| `FA3-source-list.md` | `fa3-management-deming-source-list.md` |
| `FA4-deliverable.md` | `fa4-property-rights-bankability-gate-verdict.md` |
| `FA4-source-list.md` | `fa4-institutions-capital-formation-source-list.md` |
| `FA5-deliverable.md` | `fa5-lunar-physical-economy-parameter-sheet.md` |
| `FA5-source-list.md` | `fa5-physical-economy-moon-source-list.md` |
| `FA6-deliverable.md` | `fa6-self-replicating-capital-doubling-verdict.md` |
| `FA6-source-list.md` | `fa6-automation-self-replication-source-list.md` |
| `FA7-deliverable.md` | `fa7-lunar-demand-value-capture-verdict.md` |
| `FA7-source-list.md` | `fa7-demand-value-capture-source-list.md` |
| `fa7-data-center-ventures-industry-note.md` | unchanged |
| `FA8-deliverable.md` | `fa8-disconfirmation-ledger.md` |
| `FA8-source-list.md` | `fa8-red-team-source-list.md` |
| `fa8-failed-space-forecasts-industry-note.md` | unchanged |

Verified: all 19 match `R_F`, none matches `R_S`, no two produce the same token set, longest is 49
characters, minimum token count is 3.

---

## 6. What tells the two shelves apart, mechanically

Three levers, in the order a machine should reach for them. All three are checkable; none of them
is "a human can see it."

1. **The root.** The caller passes `literature/` or `findings/` to `listCorpusFiles()`. Cheapest,
   and it is the one that governs normal operation.
2. **The leading hyphen-segment of the leaf.** `baseName(f).split('-')[0]` is one of `fa0`…`fa8`
   for namespace F and never for namespace S. This survives a re-rooting, a flattening, a copy into
   a scratch directory, and a walk that is accidentally handed the repository root — every case
   where lever 1 has already failed. It is the lever that matters, because it is the one that still
   works when someone makes a mistake.
3. **The regex pair.** `R_S` and `R_F` are disjoint, so classification of any leaf name is total
   and unambiguous: exactly one matches, or the name is invalid.

**The folder segment is not a lever.** `filenameTokens()` reads `baseName()` only and never sees a
folder. A design that depends on the retrieval layer noticing a directory name is a design that
depends on code that does not exist.

**Measured, against every real name in both shelves:** 176 of 176 summary names match `R_S` and
none matches `R_F`; 18 of 19 FA names match `R_F` (the 19th is renamed in §5) and none of the
renamed 19 matches `R_S`; zero cross-shelf token collisions. The nearest miss in the corpus is
`falcon-heavy-wikipedia.md`, which begins `fa` and is not a collision because the reserved prefix
requires a digit and a hyphen after `fa`, and because its leading segment is `falcon`.

**The trace grade travels with the shelf.** An answer citing `literature/` is citing a source. An
answer citing `findings/` is citing a prior conclusion of this project, including arithmetic present
in no paper. The answering loop states which, and it determines which from lever 1 or lever 2 —
never from the content of the file.

---

## 7. Dedup key precedence

The filename is **never** the dedup key. It is not a unique address for a source: two summaries of
one paper are two filenames, and the corpus has no mechanism that notices.

```
1.  DOI                      the printed DOI, lowercased, "10." onward, no resolver prefix
2.  publisher article URL    scheme and "www." stripped, query string and fragment removed
3.  (identity, year, title)  normalized lead-author or issuer surname; four-digit year;
                             first six words of the title, lowercased, stopwords removed
```

Read from the file's `## Citation` block. `## Citation` is the dominant header across both corpora;
where a file carries `## Provenance` or `## Metadata` instead, read that. The DOI field appears in
four inherited spellings (`DOI:`, `- DOI:`, `- **DOI:`, `**DOI:`); the reader tolerates all four,
and every **landed** file writes exactly one canonical form, `- **DOI:** 10.xxxx/yyyy`.

**When the highest key is absent — the common case, not the exception.** On the 158-file basis, 79
of the 182-name union carried a DOI at all. Roughly half the corpus falls past level 1 on the first
try. That is normal for a corpus holding agency reports, preprints, datasets, statutes and wiki
pages, and the precedence is built for it:

- **No DOI.** Fall to the article URL. Not a PDF-hosting mirror, not a search-result link, not a
  DOI resolver URL — a resolver URL is level 1 wearing a hat, and recording it at level 2 hides a
  DOI that was there all along.
- **No DOI and no article URL.** Fall to `(identity, year, title)`. This key is **weaker and is
  labelled weak**: it cannot distinguish two genuinely distinct documents by the same author in the
  same year. Grouping by `(lead-author, year)` on the same 158-file basis found 17 groups with more
  than one member and 20 surplus files; most are true duplicates and some — barnett-2025,
  ehricke-1981, nasa-2025 — are not. **A level-3 match is a candidate duplicate, never a confirmed
  one.** It is reported for a
  person to resolve and the merge does not act on it.
- **No citation block at all.** Not a dedup failure, a landing failure. The file does not land until
  it has one.

**Precedence is per-pair, not per-file.** Two files are compared at the highest level where **both**
carry a key. A file with a DOI and a file without are compared at level 3, and that comparison is a
candidate, not a confirmation.

**The two deferred merges.** Poston 2020 resolves at level 1 on `10.1080/00295450.2020.1725382`.
Metzger 2021 has no DOI and no publisher URL — both members are preprints — and resolves at level 3,
where the two members collide correctly. The precedence covers both and needs no extension for them.

When a deferred merge is eventually executed, the union artifact takes the **canonical name**, the
name the surviving member holds today. There is no `-merged` suffix and no second name. The
superseded member stays outside the namespace in `_intake/superseded-duplicates/`. **Nothing in a
filename records that a file is a union of two summaries**, deliberately: a name that encodes edit
history changes when the history changes, and every citation to the old name breaks silently. The
merge is recorded in the file's `## Provenance` block. A name is an address, not a changelog.

---

## 8. Path-length ceiling

**Absolute path ceiling: 259 characters.** Measured, not quoted. git for Windows 2.55.0 without
`core.longpaths` creates a working-tree file at an absolute path of 259 characters and fails at 260
with `unable to create file <path>: Filename too long`. Bisected one character at a time:

```
256 OK   257 OK   258 OK   259 OK   260 FAIL   261 FAIL   262 FAIL
```

**This ceiling does not depend on `core.longpaths`, and that is the point.** Setting
`core.longpaths=true` in the bootstrap (sub-step 1.4) is the other half of the fix and it is still
required. But a ceiling that only holds when a git config is set is not a ceiling: the config is
per-clone, it is not inherited by a clone made outside the bootstrap, and it does not apply to
PowerShell, to a zip extraction, or to any other tool a successor reaches for. Node's `fs` writes
past 300 characters without complaint because libuv prefixes `\\?\`, which is why this defect can be
created by one tool and only discovered by another.

**The budget, which closes exactly on the measured limit:**

```
  150   root allowance          absolute path of the repository root
+   1   separator
+  10   "literature"
+   1   separator
+  32   taxonomy folder         exactly one level; no second level
+   1   separator
+  64   leaf filename           including ".md"
-----
  259   the measured limit
```

Two derived numbers, and they are what get asserted:

- **Repo-relative path ceiling: 108 characters.** `10 + 1 + 32 + 1 + 64`. Machine-independent.
  Asserted in CI on every run, on every machine.
- **Root allowance: 150 characters.** Machine-dependent. Asserted once, at bootstrap, on the
  machine that will do the work.

`findings/` is flat and shorter, so it sits inside the same budget with room to spare: `8 + 1 + 64`
= 73 against the 108 ceiling. It uses the same 64-character leaf ceiling, for one number rather
than two.

**What a name exceeding the ceiling does.** Same as §2: it does not land. The merge exits non-zero
naming the file and its measured length; CI exits 1. It is not truncated automatically — a
truncation is a rename, and a rename is a decision.

**What a root exceeding its allowance does.** The bootstrap fails loudly, before cloning, with the
measured root length and the budget. It does not warn and continue. A root of 155 characters or
more is what actually produced loose end E14, and a warning at that point is a warning nobody reads
until the checkout is already half-written.

**Cost against the real corpus.** One name of 176 exceeds the 64-character leaf ceiling:

```
70   ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update.md
       lands as: ieee-2022-superheavy-tcs-architecture-challenges.md   (51)
59   hague-working-group-2019-building-blocks-space-resources.md       (passes)
56   kornuta-2019-commercial-lunar-propellant-architecture.md          (passes)
```

That is the same file named in loose end E14, which is the check on the arithmetic: the ceiling
breaks exactly the name that broke the clone, and nothing else.

**Cost against the taxonomy.** Two of the eleven folders exceed the 32-character folder ceiling and
are shortened rather than the ceiling raised:

```
organization-and-production-systems  (35)  ->  production-systems   (18)
development-and-industrial-policy    (33)  ->  industrial-policy    (17)
```

Longest surviving folder is `self-replication-and-automation` at 31. Worst-case repo-relative path
under the landed taxonomy is `10 + 1 + 31 + 1 + 64` = 107, one under the ceiling.

**Why the two halves are not independent.** The folder half and the leaf half draw on one budget.
Every character spent on a deeper or longer taxonomy is a character unavailable to a semantic
filename, and the merge pushes both up at once. A second taxonomy level would cost up to 33 more
characters and there is not 33 to spend. **Depth is pinned at exactly one level by this arithmetic,
not by preference.**

---

## 9. The field label

Retrieval requires a machine-readable field label per file, for field-scoped IDF: a pooled
document-frequency table over a union of two fields that do not share a vocabulary produces a
weight wrong for both.

**The label lives in the path.** Specifically, in a committed map `literature/FIELDS.tsv` with two
columns, `folder` and `field`, one row per taxonomy folder, closed and exhaustive. The retrieval
layer derives a file's field from the first segment of the relative path `listCorpusFiles()`
already returns.

**Not in the filename.** Measured:

```
question: "How much lunar regolith must be processed for a tonne of oxygen?"

  sargeant-2020-hydrogen-reduction-ilmenite-static.md         lead="sargeant"   score 0
  lunar-sargeant-2020-hydrogen-reduction-ilmenite-static.md   lead="lunar"      score 4
  beason-1996-targeting-japan.md                              lead="beason"     score 0
  lunar-beason-1996-targeting-japan.md                        lead="lunar"      score 4
```

A field tag in the leading position becomes `leadAuthor` and fires the +3 identity bonus for every
file in the field, on any question that happens to use the field word. A mis-filed Japanese
industrial-policy paper scores the same as a correctly tagged ISRU paper and higher than a
genuinely relevant untagged one. That converts the strongest signal a filename offers into a
constant. It also spends leaf budget §8 does not have.

**Not in the file.** A front-matter field can be edited into disagreement with the folder it sits
in and nothing notices. A file has exactly one path, so a path-borne label cannot drift.

**Why the path works.** `filenameTokens()` reads `baseName()` only and never sees a folder segment,
by design and with a comment saying so. The folder segment is therefore the one place in this
codebase that is machine-readable and deliberately unscored — exactly the property a field label
needs. The label costs nothing at query time and nothing in leaf budget.

**Eleven folders are not two fields**, which is why the map is data rather than a rule. The
taxonomy will change again; the field partition may not change with it.

---

## 10. Exceptions carried, with owners

Every exception is named here with an owner and a reason. An exception that lives only in a
checker's whitelist is a defect nobody remembers deciding.

| Name | Exception | Owner | Reason it is not fixed by a rename |
|---|---|---|---|
| `may-1977-how-japans-economy-grew-so-fast-review.md` | leading segment is a stopword; the +3 identity anchor is permanently dead | retrieval layer | the token is dropped on the **question** side; no filename can restore it, and renaming the author falsifies the citation |
| `473486main-iss-atcs-overview.md` | leading segment is an accession number, not an identity | none; accepted | it is the document's actual identifier and it tokenizes intact |
| the 18 no-year names | no `<year>` segment | none; accepted | §3 no-year branch; a guessed or fetch-dated year is worse than none |

---

## 11. Assertions

These are the checks. `tools/check_corpus_collisions.js` implements A1 today and exits 0 on each
shelf. A2 through A5 are additions to that file, not a new tool.

```
A1  TOKENIZER DISTINCTNESS
    for each shelf independently:
      no two files produce the same sorted filenameTokens() output
    exit 1 naming both files and the shared token set

A2  NAMESPACE CONFORMANCE AND DISJOINTNESS
    for each f in literature/**/*.md :  R_S.test(leaf(f)) && !R_F.test(leaf(f))
    for each f in findings/*.md      :  R_F.test(leaf(f)) && !R_S.test(leaf(f))
    exit 1 naming the file and which test it failed

A3  PATH-LENGTH CEILING            (machine-independent; runs in CI)
    for each corpus file f:
      relpath(f).replace(/\//g,'\\').length <= 108
      leaf(f).length                        <= 64
      literature/: depth == 2 (one folder, one leaf); findings/: depth == 1
      folder segment length                 <= 32
    exit 1 naming the file, its measured length, and the ceiling it broke

A4  ROOT BUDGET                    (machine-dependent; runs once, at bootstrap, before cloning)
    abspath(repoRoot).length <= 150
    fail loudly with the measured length and the budget; do not warn and continue
    -- 150 + 1 + 108 = 259, the measured git-for-Windows limit

A5  CONVENTION SHAPE
    namespace S:  tokenize(leaf.split('-')[0]).length == 1     (identity survives the tokenizer)
                  where a four-digit year token is present, /-(\d{4})-/ matches
                  exceptions in §10 are whitelisted BY NAME, never by pattern
    namespace F:  filenameTokens(leaf).length >= 3
                  at least 2 tokens outside {deliverable, source, list, table, note, sheet,
                                             verdict, ledger, fa0..fa8}
    exit 1 naming the file and the clause
```

A3's ceiling is asserted on the **repo-relative** path with backslash separators, so the number is
the same on every machine and in CI. A4 is the only machine-dependent check and it is the only one
that has to run before a clone rather than after.

<!-- END NAMING.md -->

---

*The Engineer, sub-step 1.7, Step 1.*
