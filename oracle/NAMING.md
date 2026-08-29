# NAMING.md — the filename and source-identifier contract

> **RELOCATED at 2.20, 2026-08-28, by author ruling (PTH-9).** This file was `literature/NAMING.md`
> and is now `oracle/NAMING.md`, beside the other contracts. It did not move for tidiness. The
> retrieval walker returns every `.md` under the corpus root, so while it sat there it WAS a
> retrievable literature source: after the merge it would have been one document among 176, the only
> one whose content is rules rather than findings, and a question about naming or provenance could
> resolve to it and be traced as if it were evidence. Measured before the move:
> `check_corpus_collisions.js` reported `1 summaries` and the one was this file. After: `0 summaries`.
> **It was moved and not renamed**, deliberately — the leaf name is cited in 177 places and only the
> 84 that spell the full old path break, which is the difference between a routable debt and an
> impossible sweep. Do not move it back, and do not "fix" the name to match its neighbours.

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
  0. PRECONDITION (2.20). If the leaf's final extension is not ".md" (case-insensitive),
     REJECT. Return no value. normalize() is not defined on such a name and MUST NOT
     rename one. A leaf with no dot at all is also a rejection: the corpus has no
     extensionless members and an inferred extension is a rename by another route.
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

**Step 0 is a PRECONDITION and not an eighth step, and the numbering is deliberate.** `NRM-1` in
`oracle/tests/corpus_suite.md` and the header of `tools/merge_identity.js` both assert *the seven
steps, in order*. Renumbering would leave both sentences syntactically intact and semantically
about a different function — the same reason §7 inserted level 2B between 2 and 3 instead of
renumbering. Step 0 either returns nothing or hands seven untouched steps a name they already
accept.

**Why it is a rejection and not a rename, added at 2.20.** Step 2 removes exactly one trailing
`.md` and step 7 appends `.md` unconditionally, so before this precondition
`un-1967-outer-space-treaty.txt` normalized to `un-1967-outer-space-treaty.txt.md`. **`normalize()`
was a renamer that turned a published treaty text into something with the extension of a summary
this project wrote.** Nothing lands wrong today — the merge glob is `*.md`, so no non-`.md` leaf
ever reaches the function — and that is precisely the hazard rather than the mitigation: *the
safety is in the caller and the defect is in the contract.* Every future caller inherits the
renamer, and the one that inherits it will be the one whose glob is wider, because a wider glob is
the natural next change. A property of the naming contract is not fixed by a property of one
caller's glob.

The rejection is loud by construction: it returns no value, so a caller that ignores it fails on
the next line rather than proceeding with a plausible wrong name. §2's ruling stands unchanged and
this is an instance of it — **the merge records; it does not rename.** A name that needs a decision
is a decision, and it goes to a person.

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

   **This is not the landing gate §7.1 strikes, and the distinction is not a hair.** §7.1 governs
   *metadata about a document* — an identifier, a citation block, a duplicate adjudication — and
   rules that none of it may keep a file off the shelf. This clause governs *the address the file
   lands at*, and a file with no valid address has nowhere to land. The remedy is the same either
   way and it is never exclusion: **fix the name, then merge.** The all-or-nothing exit is what
   makes that an ordering rather than a withholding — it fails the whole run so the names get
   fixed, instead of shipping 175 files and quietly dropping one. **A merge must report every
   failing name in one pass**, not exit on the first, or "fix the name, then merge" becomes a
   loop somebody runs until they give up.
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
1.   DOI                     the printed DOI, lowercased, "10." onward, no resolver prefix.
                             NOT a mirror-minted DOI -- see clause (b)
2A.  publisher article URL   scheme and "www." stripped, query string and fragment removed.
                             MUST CARRY A PATH -- see clause (a)
2B.  agency or grant number  an identifier printed in the artifact and issued by the body that
                             published or funded it: NASA/TP-20250010956, ESDMD-001,
                             NP-2026-04-6806-HQ, NTRS accession 20220004165, NASA grant
                             80NSSC19K0964. Uppercased, internal whitespace removed -- clause (d)
3.   (identity, year, title) normalized lead-author or issuer surname; four-digit year;
                             first six words of the title, lowercased, stopwords removed
```

**WHY 2A AND 2B RATHER THAN A RENUMBERING.** Level 2B is new at 2.20 and it is inserted *between*
the old levels 2 and 3, which is where The Engineer's 2.12 identity run found the hole. The obvious
edit is to make the agency identifier level 3 and push the weak key to level 4. **That edit is
forbidden here, and the reason is worth stating because it will be proposed again.** "Level 3" is
cited across this corpus and across five Step 1 and Step 2 deliverables, and in every one of those
citations it means *the weak key, whose match is a candidate*. Renumbering would leave every one of
those sentences syntactically intact and semantically inverted: a document saying a pair "resolves at
level 3" would, after the edit, be claiming a confirmation where it had recorded a candidate. **A
silent inversion of an existing citation is a worse defect than an inelegant number**, and it is the
same reasoning by which `AM-143` declined the 143-site check rename. Level 1 and level 3 are
untouched. Every sentence written about "level 2" before today remains true of 2A.

**The four clauses, and where they came from.** All four are The Engineer's, produced by the 2.12
identity run over the 176-name union and routed to this section because §7 is not his to amend. They
are supplied rather than debated: he was already writing in the empty slot, and an invention is
evidence of demand.

**(a) A level-2A URL must carry a path.** A bare host is not an address of a document; it is an
address of a publisher. `merge_identity.js` already rejects a site root, and doing so removed **4 of
9** false identifier collisions in its first run. The clause belongs beside "not a PDF-hosting
mirror" because it fails for the same reason: neither string identifies the publication.

**(b) A mirror-minted DOI is not a level-1 identifier.** ResearchGate's `10.13140/` prefix mints a
DOI over somebody else's uploaded copy, so the string has the shape of a level-1 key and none of its
authority. One live instance in this corpus, `colozza-2020`, whose **own citation block says the
identifier is not publisher-registered** — the file knew, and the precedence did not. A mirror-minted
DOI is refused at level 1 for exactly the reason a PDF-hosting mirror is refused at level 2A, and the
resolver-URL clause already established the general form: **a string that looks like a higher key but
was minted by someone other than the publisher hides the key that is genuinely absent.** Registrant
prefixes are a list, not a rule, and the list is `10.13140/` today.

**(c) An identifier held by more than one key is a candidate, not a confirmation.** This is the rule
level 3 already carries, lifted to where it turns out also to be needed. The instrument cannot
distinguish `nasa.gov/moontomarsarchitecture` used as an article address from the same string used as
a **programme landing page**, and it over-merged once in six on exactly that: `nasa-data-gaps-acr25`
prints the programme page and is a different document, a four-page white paper. So the test is not
what the string looks like, it is **how many documents hold it**: any level-2A or level-2B identifier
held by more than one union key drops to candidate and goes to a person. A confirmation is a claim
that two files are one document, and no automatic rule may make that claim from a shared address.

**(d) Level 2B exists because agency identifiers confirm, and there was nowhere to put them.** A
report or grant number is printed in the artifact, is issued by the publishing or funding body, and
is unique to the document — every property that makes a DOI a confirmation, minus the registrar.
Placing it below the publisher URL is deliberate: a URL addresses one document at one publisher,
while a grant number can cover a programme that emitted several artifacts, so it confirms **only when
clause (c) holds**. Two of the eight same-source pairs in the 2.12 run were confirmed by such a
number and both had to be hand-adjudicated because the precedence had no slot for them.
`sowers-2019`'s NIAC pair is confirmable **only** this way: no DOI, no publisher URL, a level-3 match
that is explicitly a candidate, and grant `80NSSC19K0964` printed in both members. Under the old
precedence that pair was unresolvable by rule and resolvable by eye, which is the definition of a
missing level.

**What this does not change.** Precedence is still per-pair, not per-file: two files are compared at
the highest level where **both** carry a key, and 2A and 2B are two ways of being at level 2 rather
than an ordering between them — a pair carrying one of each is compared at level 3. Clause (c)
applies to both. A level-3 match remains a candidate and the merge still does not act on it.

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
- **No citation block at all.** Not a dedup failure and — **as corrected at 2.20 — not a landing
  failure either.** This clause used to read *"the file does not land until it has one."* **That is
  now wrong and it is struck.** See §7.1 immediately below, which replaces it: the file lands under
  its filename-derived key and the identifier is recorded as `none`.

**Precedence is per-pair, not per-file.** Two files are compared at the highest level where **both**
carry a key. A file with a DOI and a file without are compared at level 3, and that comparison is a
candidate, not a confirmation.

---

## 7.1 Nothing is withheld from the shelf for a metadata reason

**AUTHOR RULING, 2026-08-28, and it OUTRANKS every clause in §7 above.** The corpus was handed to
this project in two folders. It goes on the shelf.

> **Disposition governs HOW a file lands. It never governs WHETHER it lands.**

A missing DOI, a missing citation block, an unresolved identifier, an unadjudicated duplicate
candidate — each is **a fact recorded about a file, not grounds to keep it off the shelf.** The
precedence in §7 is a *dedup key ladder*, and a ladder is for grouping files that landed. It was
never a gate and one clause had quietly made it one.

**The identifier requirement is a RECORDED-FIELD requirement.** Every landed file carries an
identifier field. Where no key resolves at any level, that field is written **`none`**, explicitly,
and the file lands under its filename-derived key. This is the project's own standing rule arriving
in the naming contract: **an omitted field is invisible and `none` is falsifiable.** A shelf of 176
files of which some record `none` is countable, greppable and correctable. A shelf of 150 files with
26 withheld somewhere else is none of those things, and nothing in this repository would have
reported the 26.

### Duplicate resolution: pick, do not hold

Every duplicate group resolves, and the resolution is a **pick**, in this order:

1. **A recorded prior decision wins.** If the merge table already carries a disposition for the
   pair — a hold, a false-merge finding, a ruling that the two are distinct documents — that
   decision stands and nothing here overrides it. **This is the clause that protects the weak key:**
   a level-3 match found to be two genuinely different documents (`barnett-2025`, `ehricke-1981`,
   `nasa-2025`) is *not a duplicate group*, and **both members land.**
2. **Byte-identical: take either.** There is nothing to choose. Measured in the staged corpus:
   `azami-2024-lunar-manufacturing-review` and `csank-2022-powering-the-moon` are both exact
   byte-for-byte pairs at 5,437 and 7,637 bytes.
3. **Otherwise take the larger file.** `metzger-2013-bootstrapping-space-industry` is 24,076 bytes
   against 5,269 — and **the retrieval layer resolved to the 5,269-byte member every time**, which
   is the defect `CHK-01` was built for. The rule is deliberately blunt because the alternative is a
   held pair, and a held pair is a file that did not land.

The loser is **recorded, not deleted**: it stays outside the namespace in
`_intake/superseded-duplicates/`, exactly as the deferred-merge paragraph below already provides.
Recording which member was dropped is what makes the pick reversible.

**No check row was added for this clause, deliberately.** It is a correction of a contract against a
ruling, and `CHK-01` already fails on the outcome this rule exists to prevent — two files that are
one file to the retrieval layer. A second instrument asserting the same property from the other end
would be a second authority on what a duplicate is.

---

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
+  96   folder + separator + leaf     exactly one folder level; no second level
-----
  259   the measured limit
```

**Two numbers are asserted, and only two:**

- **Repo-relative path ceiling: 108 characters.** `10 + 1 + 96 + 1`, equivalently
  `len("literature") + 1 + len(folder) + 1 + len(leaf)`. Machine-independent. Asserted in CI on
  every run, on every machine, by `PTH-1` and by `verify_corpus.js` `PTH/A3`.
- **Root allowance: 150 characters.** Machine-dependent. Asserted once, at bootstrap, on the
  machine that will do the work.

Depth is asserted separately (`PTH-5`) because the 108 arithmetic assumes exactly one folder level
and is wrong without it.

### The 32 / 64 split was an allocation, and it is retired

**Until 2026-08-29 this section split the 96 into a 32-character folder ceiling and a 64-character
leaf ceiling, and both were asserted.** They are struck. The reasoning is a measurement and it is
recorded here rather than in a checker, because a ceiling that lives only in a checker is a number
nobody can argue with.

Given the depth assertion, a repo-relative path is `12 + len(folder) + len(leaf)`, so
**`relpath <= 108` IS `len(folder) + len(leaf) <= 96`, exactly.** `32 + 64` is one partition of that
96 among many. A partition implies the sum; the sum does not imply the partition. The two component
ceilings were therefore a strictly tighter restatement of a check that already runs — and the corpus
is the demonstration that the extra tightness rejects names the real constraint accepts:

```
folder                                 len   longest leaf beneath it   relpath   margin   leaf budget
power-and-thermal                       17   70                        99        9        79
organization-and-production-systems     35   51                        98        10       61
development-and-industrial-policy       33   54                        99        9        63
```

**Three breaches of the split, zero breaches of the budget.** Every one of the eleven folders affords
a leaf of at least 61 characters; the longest leaf anywhere in the corpus is 70 and the longest under
a folder that broke the old 32 is 54.

**Why the split was not simply raised.** Any replacement pair is as arbitrary as `32 + 64` and would
be chosen to fit today's corpus, which is the definition of a ceiling that measures nothing. The
number a future author actually needs is not a constant at all: it is **`108 - 12 - len(folder)`**,
the leaf budget of the folder the file is landing in, and `PTH-11` now computes and reports it.
**The tool reports; the constraint asserts.**

**Why the names were not renamed.** Measured before deciding: renaming the two folders and the one
long leaf touches **498 occurrences across roughly 120 files** — `INDEX.tsv`, `FIELDS.tsv`, the
`**Folder:**` footer of every summary in and cross-referencing them, `oracle/acceptance/labelled_questions.tsv`,
`oracle/mechanism_table.md`, `oracle/question_classes.json`, `tools/merge_identity.js` — of which
**71 files are `cr_scratch/` deliverables that this project forbids rewriting**, on the same ground
`PTH-13` states: they are the record of what was believed when they were written. The rename could
therefore not be completed; it could only be left half done, converting a cosmetic breach into
hundreds of dangling references. **A rename that breaks the record to satisfy an allocation nothing
measures is a bad trade, and the trade was priced before it was refused.**

`findings/` is flat and shorter, so it sits inside the same budget with room to spare: `8 + 1 + leaf`
against the 108 ceiling, which affords a 99-character leaf. The longest FA name is 49.

**What the merge still refuses.** A name whose landed repo-relative path would exceed 108, and a
landing at any depth other than one folder. Those are the two assertions; there is no third.

**What a name exceeding the ceiling does.** Same as §2: it does not land. The merge exits non-zero
naming the file and its measured length; CI exits 1. It is not truncated automatically — a
truncation is a rename, and a rename is a decision.

**What a root exceeding its allowance does.** The bootstrap fails loudly, before cloning, with the
measured root length and the budget. It does not warn and continue. A root of 155 characters or
more is what actually produced loose end E14, and a warning at that point is a warning nobody reads
until the checkout is already half-written.

**Cost against the real corpus, measured 2026-08-29 over the 169 landed summaries.** The longest
repo-relative path is **99 of 108, margin 9**, and two files sit at it:

```
99   literature/power-and-thermal/ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update.md
99   literature/development-and-industrial-policy/hoshi-1991-corporate-structure-liquidity-investment.md
98   literature/organization-and-production-systems/shewhart-1939-statistical-method-quality-control.md
```

The first is the name from loose end E14. **It does not break the budget and it never did**: E14 was
a root of 155 characters or more against the 150-character allowance, which is `A4`'s job, not a leaf
ceiling's. The earlier text here proposed landing it as
`ieee-2022-superheavy-tcs-architecture-challenges.md` (51). That rename is **not executed**: the file
is cited in 32 places across 23 files, 18 of them `cr_scratch/` deliverables that must not be
rewritten, and the name costs the budget nothing at 99 of 108.

**Why the two halves are not independent.** The folder half and the leaf half draw on one budget.
Every character spent on a deeper or longer taxonomy is a character unavailable to a semantic
filename, and the merge pushes both up at once. **This is exactly why the budget is asserted on the
sum and not on the halves** — the halves trade against each other and a fixed split forbids the
trade. A second taxonomy level would cost a separator plus the new segment against a **measured**
margin of 9. **Depth is pinned at exactly one level by this arithmetic, not by preference**, and it
is asserted directly by `PTH-5` rather than inferred from a folder ceiling.

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
      literature/: depth == 2 (one folder, one leaf); findings/: depth == 1
    exit 1 naming the file, its measured length, and the ceiling it broke

    REPORTED alongside, never asserted: the longest leaf, and the tightest per-folder leaf
    budget 108 - 12 - len(folder). These are what a reader needs before naming a new file.

    THE LEAF <= 64 AND FOLDER <= 32 CLAUSES ARE RETIRED (2026-08-29). Given the depth clause,
    relpath == 12 + len(folder) + len(leaf), so the composite clause IS len(folder) +
    len(leaf) <= 96 and 64/32 was one arbitrary partition of it. See sec.8. Do not
    reintroduce them: a partition is strictly stronger than the sum it partitions, and this
    one rejected three names the budget accepts with 9 characters to spare.

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
the same on every machine and in CI. It is one clause and a depth clause, not four: two of the
original four were a partition of the other two and are retired above. A4 is the only machine-dependent check and it is the only one
that has to run before a clone rather than after.

