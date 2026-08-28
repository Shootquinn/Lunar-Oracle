# Step 2 — the corpus acceptance suite: authoring ledger

**Deliverable:** `oracle/tests/corpus_suite.md`, 148 tests, written before 2.1, 2.2 and 2.3 ran.
**Declared write set, honoured:** this file and `oracle/tests/corpus_suite.md`. Nothing else was
written. Two things I would have fixed with the file open in front of me are routed in §6 instead,
because they are not mine.

**Spawn A1, Cycle A.** `tdd_method.md` Prompt 1 applied to a corpus and a set of tools. A.4's second
precondition artifact — the topic-sentence outline — was ruled not applicable to Step 2 by The
Manager at the open, and I concur: an outline is a claim about paragraph order and a corpus has none.

---

## 1. What the suite is, and the one property that makes it writable now

It asserts the **target state**, not the outputs of 2.1 to 2.3. That is not a stylistic choice; it is
the only thing that lets a suite exist before the measurements it would otherwise transcribe. A suite
written against 2.1's numbers would be 2.1 in a second file, and 2.1's author is the seat that
executes 2.5 — arm 2b with an extra step.

**148 tests**, and the file declares its own size with the counting rule that produces it: rows in the
twelve tables whose first cell matches `^[A-Z]{3}-[0-9]+$`. I ran that rule over the file. It caught a
defect in my own draft on the first run — the §13 gate table's first column matched the pattern and
double-counted PRV-13 and PRV-15, giving 150 against a declared 148. Fixed by bolding those two
cells. That is the `H`-row known-answer remedy working on a document rather than on a register, and it
is the reason the counting rule is stated rather than the count merely asserted.

Group sizes, verified against the file: NRM 9, NAM 16, PTH 11, FLD 12, PRV 17, DUP 11, CRP 13,
PDF 16, REG 18, CNT 11, SLT 8, MUT 6.

**Seven RED, each with an owner and a close condition**: NAM-7, PTH-9, FLD-1, FLD-10, FLD-12, PDF-2,
REG-11. None of them is red because the world is not ready. Each is red because something specific is
wrong or absent, and each names the observation that closes it. A red assertion with a named owner and
a named close condition is a finding; one written to match today is a defect made permanent.

**Two [gate] tests**, PRV-13 and PRV-15, plus two more that attach when SLOT-A and SLOT-B fill. §5.

---

## 2. The six findings, and how each was obtained

**Every one of these came from running something.** Both of my Step 1 reviews found their blocking
defects by running rather than by reading, and that is the property I brought to this step. The
commands are in the suite's own text where they are load-bearing; the reasoning is here.

### 2.1 The A7 collision class is nine, and the corrected assertion is normalized-key

The orchestrator's correction supersedes The Manager's open on this point and I have written the suite
to the correction. Under a case-only rule A7 is one pair, `gdp.md`/`GDP.md`, byte-identical, so a
merge that loses one loses nothing and reports success — **the defect is invisible in exactly the case
that exists.** Under `normalize()` as `NAMING.md` §1 defines it the class has nine members, and the
other eight differ by *separator* rather than by case. They coexist on every filesystem. A
case-insensitive check catches none of them.

I did not take that on the baseline's word alone, because a suite that inherits a figure is a suite
that transmits an error. I checked the mechanism: `normalize()` step 4 collapses runs of underscore
or space to a single hyphen, which is precisely the transform that makes `BEA_depreciation_rates.md`
and `bea-depreciation-rates.md` one key and two files. A case fold does not touch a separator. The
conclusion follows from the function, not from the count, which is why it holds whatever 2.1 measures.

**Written at two scopes**, as instructed: CRP-4 within a target directory, CRP-5 across the whole
target tree. They are different tests because they fail differently. Within a directory on a
case-insensitive filesystem the collision is a silent overwrite; across the tree it is two files
coexisting under one key with nothing reporting it. A single tree-wide test would pass the first case
on Linux and fail it on Windows, which is CRP-9's whole subject.

**CRP-7 is the test I am most attached to.** It runs both the case-folded check and the normalized
check over the merged tree and asserts the normalized one catches a strict superset. On the union the
two differ by exactly eight. It exists so that the substitution back to the weaker rule cannot be made
quietly — the sub-step's own wording is what would invite it, and a test is a cheaper defence than a
paragraph nobody re-reads.

**CRP-6 turns the baseline's zero-intra-corpus-collision measurement into a post-condition.** 152→152
and 119→119 means the merge is the only place a collision can be created. That converts a pleasant
fact into an assertion with a stated failure mode.

### 2.2 There is no repository-wide `*.pdf` rule (PDF-2, RED)

Run in the authoring session:

```
git check-ignore -q <path> for seven probe paths
  docs/x.pdf                   NOT ignored
  oracle/x.pdf                 NOT ignored
  x.pdf                        NOT ignored
  tools/x.pdf                  NOT ignored
  literature/x.pdf             IGNORED
  literature/isru/x.pdf.bak    IGNORED
  _intake/x.pdf                IGNORED
```

`grep -n pdf .gitignore` returns three lines, all comments or the `/literature/_pdf/` rule. The
Engineer's Part 5 hole 1 — "a PDF anywhere but `literature/` or `_intake/` commits cleanly" — is
**still open** and the suite says so with the measurement rather than with a reference to Part 5. The
requirement (d) I was given asks for "zero `.pdf` tracked anywhere in the repository": PDF-1 asserts
the tracked count, which is zero today, and PDF-2 asserts the *rule*, which is not repository-wide.
Both are needed. A tracked count of zero today is compatible with a rule that lets the next one in.

### 2.3 Part 5's containment table is out of date, in the safe direction (PDF-6)

The same run shows `literature/isru/x.pdf.bak` **is** ignored, because 1.1 rewrote `/literature/**` to
deny-by-default. Part 5's table says it is not; that table was measured against the pre-1.1 file.

This changes where the extension gate must be tested. Written naively against Part 5, the fixture
would be `literature/x.pdf.bak` — which is ignored today, so the test would pass on a rule that is not
the one under test, and the open hole outside `literature/` would go unasserted. **PDF-6 tests the
extension gate at `docs/`, `tools/` and the repository root**, where it is actually open. This is the
1.4-review lesson in a new costume: guidance about where to look is not neutral, and here the
guidance was a stale measurement in a landed specification.

### 2.4 The 500 KB size gate's justification is wrong on both halves, and the gate admits 26% of its target (PDF-9 to PDF-11)

Part 5 justifies the threshold: "the largest summary is 28 KB and the smallest PDF in the tree is
180 KB." Measured this session over the prospective union and `_intake/`:

- largest summary: `lsei/literature/programme-primaries/nasa-moon-to-mars-doc.md`, **84,767 bytes**
- smallest PDF under `_intake/`: `luxembourg-2017-space-resources-law.pdf`, **81,677 bytes**
- PDFs under 500 KB in `_intake/`: **29 of 112**

The two populations **overlap**: the largest summary is larger than the smallest PDF. The separation
the threshold rested on does not exist, and the margin over the true largest summary is 6×, not the
18× the 28 KB figure implies.

The consequence is not "raise the threshold." It is that **the size gate is a backstop against an
unknown carrier type, not a containment gate**, and a passing size test must never be read as
containment. A gate that lets 26% of its own target population through while reporting success is the
CHK-03 shape in a different costume — not a check that cannot fail, but a check whose passing means
much less than its name suggests. PDF-10 requires the check to print its own coverage.

**PDF-11 is the 2.10 unit trap one level down.** The baseline caught 2.10 asserting "250 MB" against a
measured 224,042,382 bytes, which is 224.0 MB SI and 213.7 MiB — a 10 MB gap between two readings of
one number. The 500 KB threshold has the identical defect and nobody had said so. PDF-11 asserts the
constant is an integer number of bytes with its unit named, on both thresholds.

### 2.5 `literature/NAMING.md` fails `NAMING.md`'s own A3 (PTH-9, RED)

A3 requires, for `literature/`, `depth == 2` — one folder, one leaf. `NAMING.md` sits at depth 1.
And `listCorpusFiles()` walks to any depth and takes every `.md`, verified at the source in
`lsei/oracle/lib/literature_search.js`, so after the merge the naming contract is a **retrievable
literature source** that the answering loop can cite as one. Measured:
`node tools/check_corpus_collisions.js` reports `1 summaries, 0 collisions` today, and the one summary
is `NAMING.md`.

It normalizes to `naming.md` and matches `R_S`, so nothing in the regex layer objects. The only clause
it violates is the depth clause, which the landed checker does not implement.

**This is a decision for a person and I did not make it.** Three ways out — relocate the contract out
of the corpus root, grant it a §10 by-name exception, or root retrieval below it — and they have
different costs for `FIELDS.tsv` (a top-level file with no folder derives no field, FLD-4). PTH-9 is
red with the author named as owner and the ruling as the close condition.

### 2.6 The suite is wired to a trigger that does not exist (§0.2 of the suite)

`oracle/check_register.md`'s scan roots are `tools/**` and `oracle/**/*.js`. `oracle/tests/` is
outside both. This file is `.md` so it needs no `C` row — but **any runner built for it does**, and a
runner landing under `oracle/` fails `CL-1` on the day it lands. That is 2.20's defect class exactly,
and `oracle/verify_corpus.js` is already on that list; the runner belongs beside it.

Worse, and this one is load-bearing for the whole suite: **CHK-01 and CHK-04 name the trigger
`merge-gate`, and CHK-10 dispatches `pre-commit` only.** No merge-gate dispatcher exists. The corpus
invariants in §7 and the register assertions in §9 are the two groups that matter most at the merge,
and they are wired to nothing. Routed to 2.20 as a fifth item.

I said of CHK-18 that a 211-test suite nothing invokes is a 211-line document. It applies to mine, and
§14 of the suite says so in the suite's own voice rather than in a scratch file the gate might not
open.

---

## 3. Coverage against the assignment, item by item

| Required | Where | Notes |
|---|---|---|
| (a) Naming, §§1–3, 7, 8, 11; both namespaces; path ceiling; dedup precedence | NRM 9, NAM 16, PTH 11, DUP 11 = **47** | Both namespaces asserted separately and for disjointness (NAM-4). A1 asserted **per shelf** (NAM-9) because running it over the union reports legitimate cross-shelf pairs as defects. Dedup precedence asserted per-pair (DUP-3), which is the clause most likely to be implemented per-file |
| (b) The field label, §9, with Part 2's silence stated | FLD 12 | The suite states it in the group's opening paragraph, not in a footnote: **Part 2 carries no field label**, its machine-readable outputs are `- **Also:**` and `INDEX.tsv`, and a file satisfying Part 2 in full can fail every test in this group. FLD-8 and FLD-9 exist specifically to stop `Also:` being pressed into service as the field |
| (c) `## Provenance`, eight-key minimum, `Source file` resolving or `not held` | PRV 17 | PRV-2 compares **parsed key sets**, not substrings — a substring search for "Licence" passes on the word in prose. PRV-9 asserts `not held` is exact, because a tolerant reader licenses the next variant |
| (d) Zero `.pdf` tracked; three containment gates | PDF 16 | Split into the tracked count (PDF-1, green) and the rule (PDF-2, RED). Extension tested where it is open (PDF-6); size tested as a backstop with stated coverage (PDF-9 to PDF-11); magic bytes tested on a renamed real PDF and asserted to read bytes rather than decode text (PDF-12, PDF-13) |
| (e) Register: set of files, one `basis_root` each, joined at load; `A`-row members resolve; block round-trips | REG 18 | REG-8 adds **uniqueness** to resolution, which the sub-step's wording does not carry. Member rows are bare filenames — 0 of 81 lunar and 0 of 53 econ contain a `/` — so resolution is a recursive walk that after the merge spans eleven folders and 185 files. "Resolves" without "uniquely" passes while a bare name resolves to the wrong file |
| (f) Corpus invariants; collision asserted generally | CRP 13 | Normalized-key, two scopes, per the correction. CRP-7 asserts the weaker rule is insufficient so the substitution cannot be made quietly |
| (g) Counting rule: twelve fields; no new hard failure | CNT 11 | CNT-8 compares the failure set **by id**, not by count (CNT-9). Two changes that cancel leave a count unmoved while the corpus acquires a defect |
| 1. Four named amendment slots | SLT 8 + §11.1 | Below |
| 2. Every assertion provable-able to fail | Every row + MUT 6 | Below |
| 3. The A7 correction | §0.1 finding 1, CRP-4 to CRP-7 | Above |
| 4. The A.10 step 2 gate list | §13 of the suite | Below |

---

## 4. The four slots, and what each may not weaken

Declared by id in §11.1 of the suite with owner, opening condition, permitted additions, prohibited
weakenings and a fill state. All four read **EMPTY** today, which is the point: an unfilled slot and
an absence must not look alike.

| Slot | Sub-step | The prohibition that matters most |
|---|---|---|
| SLOT-A | 2.4 merge assertions | CRP-4 and CRP-5 may not be narrowed to a case-insensitive rule |
| SLOT-B | 2.10 PDF-pull assertions | PDF-11's byte-and-unit clause may not relax to a bare "MB"; T3/T4 may not acquire a further automatic tier |
| SLOT-C | 2.13 containment assertions | PDF-2 may not be closed by scoping the rule back to `literature/`; no assertion may invoke the event it asserts |
| SLOT-D | 2.15 register assertions | REG-8's uniqueness clause may not drop back to "resolves" |

Three prohibitions above are written against a specific, foreseeable, *cheap* wrong move — narrowing
a collision rule to the case it was first described by, closing a containment finding by shrinking its
scope, and dropping a uniqueness qualifier that costs a line to keep. Each of those would leave the
suite green and the corpus wrong.

**SLOT-C's third prohibition is the CHK-09 lesson.** I watched CHK-09 recurse without bound because I
ran it: CHK-10 ran CHK-09, CHK-09 ran `git hook run pre-commit`, and that re-entered CHK-10. `git hook
run` has no reentrancy guard and sets no environment marker, so nothing in git breaks the cycle. 2.14
is the sub-step that installs CHK-10 and its text does not mention this. An assertion suite that
installs the hook and then invokes `git hook run` to prove it fires **reproduces the cycle**, and
SLOT-C is where that would be written. It is prohibited in the slot rather than mentioned in a review.

The same source gives PDF-16 its clause: `git hook run` invokes the hook with **nothing staged**, so a
containment check that reads the staged set and finds it empty must exit 0 *and say it scanned
nothing*. A check that prints "no source files found" on an empty stage reports a pass on every
`git hook run`, which is the assertion asserting its own dispatch.

**SLT-7 and SLT-8 are the arm-2b remedy written as tests rather than as a rule.** SLT-7: 2.4's
assertions are proved able to fail, against a deliberately broken fixture, **before 2.5 runs**, with
the observation recorded and dated. SLT-8: the proving seat is not the writing seat, asserted on the
recorded owner pair. A rule a person must remember to apply is not a process fix; a row in a table
that a diff can check is closer to one.

**Live position, restated and not withdrawn.** 2.15 is the wrong date for the CHK-03/CHK-05
consolidation. A check that cannot fail sitting on a gate is the defect still running, not a debt, and
the R-2 unwiring of `CHK-03` from `substep-gate` to `manual` treated the symptom. SLOT-D is where the
consolidation lands under the current plan; I have written the slot to it and recorded the
disagreement rather than relitigating it inside a deliverable.

---

## 5. The A.10 step 2 source-verification gate — four entries

Listed separately in §13 of the suite. The Manager expected the list to be short and to contain 2.7's
`stated_as_of` tests and 2.12's verbatim-overlap tests. It does, and it contains two more.

1. **PRV-13** — a `doi:` in a `## Provenance` block is the DOI the source prints. One altered digit
   still parses, still looks right, and points at a different paper. This one is mine to add: it was
   not on the expected list, and it is a claim about what a source says by any reading of the rule.
2. **PRV-15** — a `contains-transcribed-source-text` label agrees with the measured overlap, in both
   directions. `audit_abstract_overlap.js` measures overlap and classifies nothing; the classification
   is a person's and the label is what ships. This is 2.12's test, arriving early because the licence
   key is in the eight-key minimum.
3. **SLOT-B on fill** — 2.7's `stated_as_of` tests.
4. **SLOT-A/B on fill** — 2.12's verbatim-overlap classification tests.

**The list is short because the suite was written to make it short.** Wherever a property could be
asserted against a landed on-disk contract instead of against a source's content, it was. PRV-6 and
PRV-8 look like source claims and are not: they assert a path resolves, which is a fact about the
filesystem and one I verified myself.

**Until The Fact-Checker runs the gate, PRV-13 and PRV-15 are UNVERIFIED and the suite is not the
contract on them.** That is stated in the suite in its own voice. I cannot run this gate against my
own suite and I have not pretended otherwise.

---

## 6. Two things I did not do, and why

**I minted no quantity blocks.** Six figures in this deliverable are new measurements:
the largest summary in the prospective union, the smallest `_intake/` PDF, the count of `_intake/`
PDFs under 500 KB, the `quantities.js --check` hard-failure baseline, the suite's own test count, and
the count of probe paths where the PDF ignore rule is open. Under G1 each becomes governed the moment
a second file states it.

I have therefore **stated each numeral in exactly one file** — the suite — and referred to them here
without restating the digits where I could. Minting ids would put six new blocks in the declared file
set, which stales `QUANTITIES.md`, which fails M6, which is a **new** hard failure — the exact thing
CNT-8 forbids. Regenerating `QUANTITIES.md` is outside my declared write set.

**Proposed ids, so the next toucher has the work half done:** `Q-MAX-SUMMARY-BYTES`,
`Q-MIN-INTAKE-PDF-BYTES`, `Q-PDF-UNDER-500K`, `Q-QCHECK-FAILURES-BASE`, `Q-CORPUS-SUITE-TESTS`,
`Q-PDF-IGNORE-OPEN`. Checked against the 64 ids in `QUANTITIES.md`: none collides. Owner: whoever The
Manager assigns; the natural home is 2.19(b), which is already touching the manifest accessor, or the
2.13 spawn, which re-measures the PDF figures anyway. **This is a real gap and not a formality** —
`COUNTING_RULE.md` §1 calls a governed quantity with no id the largest hole in the contract, and I am
leaving six of them one restatement away from being governed.

**I did not fix `.gitignore`.** PDF-2 is red on a defect I measured, the fix is one line, and
`.gitignore` is not in my write set. It is SLOT-C's, at 2.13/2.14. I declined a fix with the file open
in front of me at R-3 for the same reason and it was the right call then.

---

## 7. Known-answer baselines this suite is set against

Recorded so a successor can re-run rather than trust. All measured in the authoring session unless
attributed to the baseline file.

| Figure | Where it binds |
|---|---|
| `node tools/quantities.js --check` exits 1; `NOTE hard failures: 12`; `grep -c '^FAIL '` returns 12 — the two agree | CNT-7, CNT-8. The failure set is 3 × M3 (`Q-ECR-AXES`, `Q-LCC15-DISTINCT-LEAVES`, `Q-DEGRADED-MODES`) and M11 on `Q-REG-TSV-IGNORED`, among others. CNT-8 compares by id |
| `node tools/check_corpus_collisions.js` exits 0, `1 summaries, 0 collisions` | PTH-9, NAM-7. The one summary is `NAMING.md` |
| `node tools/check_registers.js --registers` exits 0; 2 files, 33 `A` rows, 33 distinct axis ids | REG-3 |
| `git ls-files '*.pdf' '*.PDF'` returns 0 | PDF-1 |
| Repository root is 55 characters | PTH-7, CNT-4. Well inside the 150 allowance |
| `literature/FIELDS.tsv` and `literature/INDEX.tsv` do not exist | FLD-1, FLD-10, both RED |
| Register `H` rows: lunar `15 81`, econ `18 53`; 59 and 30 distinct member names, all resolving uniquely today | REG-5, REG-7, REG-8 |
| Baseline file: 152/119 summaries; 86 exact overlaps; union 185 raw, 176 normalized; nine normalization collisions; zero intra-corpus | NRM-6, CRP-5 to CRP-9 |
| Baseline file: 52 PDFs, 224,042,382 bytes | PDF-11, SLOT-B |

---

## 7.1 CNT-8 applied to my own deliverable, and what it caught

I ran my own acceptance criterion against my own output, before and after writing it.

**Before:** `node tools/quantities.js --check` exits 1, `NOTE hard failures: 12`.
**After:** exits 1, `NOTE hard failures: 13`. One new failure:

```
FAIL M3 Q-COUNTING-RULE-VERSION quoted as 3 at COUNTING_RULE.md:4 but the block value is 2
```

**It is not mine.** Neither of my two files carries a single bracketed quotation tag — verified by
`grep -oE '\[Q-[A-Z0-9-]+\]'` over both, which returns nothing. The failure is at
`COUNTING_RULE.md:4`. `ls` timestamps: my suite written at 02:19, `COUNTING_RULE.md` modified at
02:21. That is **spawn A4 in flight** — The Designer, 2.19(c), whose declared write set includes
`COUNTING_RULE.md`. He has bumped the contract header to version 3 and the `Q-COUNTING-RULE-VERSION`
block at line 567 still reads `value: 2`.

**My deliverable acquired zero new hard failures**, which is what CNT-8 asked and what it answers.

Three things follow and they are worth more than the arithmetic.

1. **The version field did exactly what it is for**, a third time. I ruled at R-3 that the version
   names a state of the file rather than counting amendments, and the answer contract's version field
   caught that suite disagreeing with its contract twice. Here it caught a contract disagreeing with
   *itself* within two minutes of the edit. Owner: The Designer, in the same edit as the bump. It is
   one line and it is not mine.
2. **This is why CNT-8 compares by id and not by count** (CNT-9). A count comparison would have said
   "12 became 13, something broke, and the something is the thing that just landed" — and the thing
   that just landed was me. Comparing the failure *set* named the file, the line and the id, and the
   id belongs to a file I did not touch. A count would have mis-assigned a defect to the wrong seat,
   which is a relay error of exactly the kind that produced seven of Step 1's nine.
3. **It is also a live demonstration of the hard-constraint-1 hazard.** A4 and A1 ran concurrently
   with disjoint write sets, correctly, and I still observed A4's mid-flight state — because the
   *checker* reads the whole declared file set, not my write set. Disjoint write sets do not make
   concurrent measurements independent. Any failure count taken during a parallel cycle must name the
   cycle, and CNT-7's requirement that a failure count carries its command is the half of that which
   is mechanized; the other half is that it carries its moment. **Recorded as a finding against
   `COUNTING_RULE.md` §3 rule 11**, which requires the command and does not yet require the moment.

---

## 8. Falsifiers on this deliverable

**F1.** If the mutation harness, once built, finds any test whose named mutation does not turn that
test red — MUT-4's condition — then that row's mutation is wrong and the row is not a test yet. I have
reasoned every mutation and run none of them, because the corpus they mutate does not exist. **The
column is a specification of a proof, not the proof.** MUT-2 exists to make the difference visible
rather than to let it pass as done.

**F2.** If 2.1's identity-based measurement returns a collision class that is not a superset of the
nine, then `normalize()` is not the merge key the merge actually uses and CRP-4 to CRP-7 are written
against the wrong function. The suite would need re-aiming, not relaxing.

**F3.** If the author rules that `NAMING.md` stays at `literature/NAMING.md` with a by-name exception,
then FLD-4 needs a carve-out for a file with no folder, and PTH-9 closes as a §10 exception rather
than as a relocation. I have not pre-written that carve-out, because a suite that anticipates every
ruling anticipates the wrong ones.

**F4.** If The Systems Engineer's architectural review finds that 148 tests over a corpus is padding,
the cut I would take first is DUP, from 11 to about 6 — the precedence rules are stated once in
`NAMING.md` §7 and tested once here, and the marginal tests are the URL-normalization trio. I would
not cut MUT, CRP or the RED rows. Stating the cut in advance is cheaper than defending the whole.

**F5.** If a reader finds a test in this suite whose failure would not require anyone to change
anything, that test is ceremony and it should be deleted rather than carried. I applied that gate to
my own draft twice and it removed about twenty rows — most of them restatements of `NAMING.md` §§4–6
that the tokenizer tests in NAM already cover.
