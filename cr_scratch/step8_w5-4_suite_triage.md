# Step 8, sub-step 8.5 — the test suite triage

**Seat W5-4, The Fact-Checker. 2026-08-29.**
**Write set, closed and honoured:** `oracle/tests/**`, `oracle/check_register.md` (rows made dead by
the deletions only), this file.

---

## 0. The ruling this sub-step executes

The suite held **455 rows**. **348 of them had no executable binding at all.** The runner had been
printing that fact in its own summary on every run since Wave 2 — `UNRUN IS NOT PASS`, followed by
the count — and no wave had acted on it. Shown this in plain language, the author ruled:

> *"probably shitcan this eh?"*

The default disposition of an unbound row is therefore **deletion**. A row did not have to justify
its removal; it had to justify being kept.

**Why this was the right call and not merely the ordered one.** This project has spent four waves
finding artifacts that are internally consistent, pass their own checks, and are not the thing they
claim to be — a container asserted present while its content was never read. A 455-row suite in which
348 rows assert nothing is the largest instance of that pattern in the repository, and the two
findings in §4 below show it was not a matter of degree: two whole sections were describing artifacts
that do not exist anywhere in the tree.

---

## 1. Commands, digests and baselines

Every count below carries the command that produced it. Figures at different digests are not
comparable and are not reconciled.

```
node oracle/tests/run_suite.js
node tools/check_registers.js
```

Read-digest at my open and after the last suite edit: **`91b7cfde9a9e6392` over 310 files**,
`check_registers` tool 2.19-1, flags none. The digest at the close is **`60c29b9529449b64` over 311
files** — one file more, and that file is this deliverable. Every suite figure in this document was
taken at `91b7cfde9a9e6392`; the close digest is recorded so a reader can see which change moved it
rather than reconciling two numbers. `check_registers` reports **0 hard failures** at both.

| Point | rows | pass | fail | unrun | of unrun: DEFERRED / VACUOUS / **no binding** |
|---|---|---|---|---|---|
| Wave-5 open (brief, `HEAD=cc1b8b8`) | 455 | 85 | 13 | 357 | 9 / 0 / **348** |
| After the router seat landed (brief) | 455 | 59 | 39 | 357 | 9 / 0 / **348** |
| **My baseline, taken at my start** | **455** | **59** | **39** | **357** | **9 / 0 / 348** |
| **After this sub-step** | **148** | **101** | **43** | **4** | **4 / 0 / 0** |

**My baseline equals the post-router figure exactly**, so nothing moved under me between the router
seat's landing and my first run. Two seats were live in `literature/`, `tools/` and the contracts
during this sitting; §6 attributes every moved number and names what is not mine.

**The number that matters is the last column: 348 → 0.** Every row in the suite is now executed.

---

## 2. The before census, by group

This is the record of what was removed and it is the most important table in this deliverable. It was
produced by extracting the binding key set from `run_suite.js` without executing it — literal
`B['ID'] =` assignments, the bulk-assigned `REG_DEFER` family, and the `RFX-01..33` loop — and
differencing it against the rows the runner's own parser finds. Its total reconciles to the runner's
printed `348 with no binding at all` **exactly**, which is what makes it a census and not an estimate.

| Group | rows | bound | **unbound** | What the group was for |
|---|---:|---:|---:|---|
| RV | 36 | 0 | **36** | Rule V: verdict by the multiset of origins present. Declared "**Generated.**" |
| RFX | 35 | 35 | 0 | Register fixtures, one per axis. Genuinely generated |
| LOG | 25 | 6 | **19** | The run log: enums, field presence, outcome precedence |
| REF | 20 | 0 | **20** | Refusals: the six reason codes and one fixture each |
| FIX | 19 | 0 | **19** | Level 1 fixture questions with expected verdicts |
| REG | 18 | 18 | 0 | Register integrity (11 real, 7 `DEFERRED`) |
| PRV | 17 | 1 | **16** | `## Provenance` block completeness |
| NAM | 16 | 3 | **13** | Namespaces, regexes, convention shape |
| PDF | 16 | 4 | **12** | Published-source containment |
| INV | 15 | 5 | **10** | Level 2 invariants over the assembled loop |
| ISR | 15 | 15 | 0 | The three named ISRU facts (13 real, 2 `DEFERRED`) |
| PTH | 14 | 4 | **10** | Path-length ceilings |
| FLD | 14 | 0 | **14** | The machine-readable field label, `FIELDS.tsv` / `INDEX.tsv` |
| FIL | 14 | 0 | **14** | The deliverable is a file; chat-block and haiku rules |
| CLM | 14 | 1 | **13** | Claim-bearing units and the `verify_report.js` post-condition |
| CRP | 13 | 2 | **11** | Corpus-level invariants |
| MRG | 13 | 9 | **4** | The merge plan table |
| RG | 13 | 0 | **13** | Rule G: grade by origin. Declared "**Generated.**" |
| VRD | 13 | 0 | **13** | The six verdicts and the wave selector |
| PUL | 12 | 0 | **12** | The PDF pull into `literature/_pdf/` |
| CNT | 12 | 1 | **11** | The counting rule over Step 2 deliverables |
| TRC | 12 | 0 | **12** | The trace-line grammar |
| DUP | 11 | 0 | **11** | Dedup key precedence |
| ORG | 11 | 0 | **11** | The origin field, computed from the locator |
| LIM | 11 | 0 | **11** | Limit lines |
| GRD | 10 | 1 | **9** | Trace grades and the six blacklisted words |
| NRM | 9 | 0 | **9** | `normalize()`, the seven steps |
| CON | 9 | 0 | **9** | Containment fixtures and the git hook |
| SLT | 9 | 2 | **7** | The four amendment slots |
| MUT | 6 | 0 | **6** | The falsifiability meta-suite |
| VER | 3 | 0 | **3** | The contract version field |
| **Total** | **455** | **107** | **348** | |

---

## 3. Disposition per group

Group-level where the whole group was uniformly prose; row-level where the group was mixed.

| Group | unbound | **bound** | **deleted** | kept unbound | Reasoning, one sentence |
|---|---:|---:|---:|---:|---|
| RV | 36 | 0 | **36** | 0 | Declared generated by `oracle/tests/gen_matrix.js`, **which has never existed**; the cells are a hand copy of the contract's own Rule V table and a copy of a contract cannot test the contract |
| RG | 13 | 0 | **13** | 0 | Same defect as RV, same generator, same disposition |
| FIX | 19 | 0 | **19** | 0 | Nineteen fixture questions nothing ran; the questions survive as executable work in `oracle/router/acceptance.js`, which puts 124 through the loop |
| REF | 20 | **1** | **19** | 0 | REF-1 binds to the closed reason-code set and **found a real drift**; REF-2..20 are one fixture per code over refusals no mechanism produces |
| LOG | 19 | **5** | **14** | 0 | Five bind to `verify_answers.js --prove`, which already proved them; seven were field-presence rows restating one closed schema and the rest are precedence pairs with no proof |
| PRV | 16 | 0 | **16** | 0 | **The schema they assert does not exist in any of the 169 landed files** — see §4.1 |
| FIL | 14 | **3** | **11** | 0 | Three bind to `verify_haiku.js --prove`; the other eleven assert over produced deliverables and over orchestrator behaviour, neither of which is a population |
| FLD | 14 | 0 | **14** | 0 | `FIELDS.tsv` and `INDEX.tsv` exist and are non-empty, but every row is a rule about how the field is *derived*, which is a statement about a merge that has already run |
| NAM | 13 | 0 | **13** | 0 | NAM-1/2/10 already bind the namespace over the real population; NAM-4's disjointness is what NAM-1 and NAM-2 jointly measure, and the rest are convention prose — including NAM-13, see §4.3 |
| CLM | 13 | **5** | **8** | 0 | Five bind to `verify_register.js --prove` and to a one-line absence check; the other eight are definitional restatements of §7 |
| VRD | 13 | **2** | **11** | 0 | VRD-1 and VRD-11 assert the closed verdict set against the router; the other eleven count personas on answers nothing produces |
| CRP | 11 | **3** | **8** | 0 | Three are measurable over the merged tree today, including the line-ending row kept under exception 3; five restate CRP-4/CRP-5, and three are merge-process rules |
| CNT | 11 | 0 | **11** | 0 | Rules about how *this project's own scratch deliverables* report counts — a house style, not an artifact assertion |
| ORG | 11 | 0 | **11** | 0 | Every row computes an origin from a locator on a produced answer; there are no produced answers |
| LIM | 11 | 0 | **11** | 0 | Same population as ORG. LIM-10 was `RED` with an owner and was still unbound, so it was an unrun row wearing a failure's clothes |
| DUP | 11 | 0 | **11** | 0 | Precedence rules for a merge that ran three waves ago; the decisions it made are recorded in the MRG plan table, nine rows of which are bound |
| TRC | 12 | 0 | **12** | 0 | The trace grammar over produced answers; the one part with a real control is already bound as GRD-9 and GRD-10 |
| PUL | 12 | 0 | **12** | 0 | `literature/_pdf/` **does not exist in this tree**; every row has an empty population and would report VACUOUS at best |
| PTH | 10 | **5** | **5** | 0 | Five ceilings are measurable over 169 real paths and **two of them are red** — see §4.2; the other five are prose about where the ceiling is asserted |
| INV | 10 | **2** | **8** | 0 | INV-12 and INV-13 are about the runner and the clone and bind cheaply; INV-1..5 and INV-10 assert over the live loop, and the router is mid-migration under another seat |
| GRD | 9 | **7** | **2** | 0 | Six blacklist words have one named decoy each in `verify_register.js`, and GRD-10 binds to the control; GRD-1/GRD-2 restate the closed set that GRD-9 already exercises |
| PDF | 12 | **3** | **9** | 0 | Three bind to `check_no_sources.js`, **closing the documented `PDF-4` open question** (§4.4); PDF-14's own cell says it "cannot be run as written" |
| CON | 9 | **3** | **6** | 0 | The `--ignore-probe` fixture makes CON-1/CON-3 runnable and CON-4 is a two-line git-config assertion; CON-5..9 invoke git hooks, which is a fixture running the event it asserts |
| NRM | 9 | 0 | **9** | 0 | The runner keeps a deliberately **local** `normalize()` so it does not import the thing it checks, so a binding here would test the copy and not the implementation — a check that cannot fail |
| SLT | 7 | **1** | **6** | 0 | SLT-5 was already being computed by `structural()` and printed, and was not being credited; SLT-3/4/6..9 are authoring-process rules |
| MUT | 6 | **2** | **4** | 0 | MUT-1 and MUT-6 were in the same state as SLT-5; MUT-2..5 are discharged by `namedProof`'s mutations-applied gate and by `fault_inject.js`, both of which run |
| MRG | 4 | 0 | **4** | 0 | Merge-process rules; the nine bound MRG rows are the ones with a table to read |
| VER | 3 | **3** | 0 | 0 | The whole group binds, and **VER-2 is red and correct** — see §4.5 |
| **Total** | **348** | **45** | **303** | **0** | |

### 3.1 The nine `DEFERRED` rows, re-verified

Exception 1 admits a `DEFERRED` row only where the blocker is **real**. A stale blocker means the row
is bindable now, so it must be bound or binned. Six of the nine named a sub-step that has since
closed, so all nine were re-measured rather than carried.

| Row | Stated blocker | Re-measured | Disposition |
|---|---|---|---|
| REG-1 | "the loader is Step 3 (3.8)" | **Stale.** Step 3 closed; `classify.js` exports `loadContext` | **Bound.** Asserts the sidecar loads as a *set*: 15 + 18 = 33 axes from two files. Passes |
| REG-4 | "needs the loader" | Stale, and its own cell says the sub-assertion is measured as REG-7 | **Deleted** — a duplicate of a bound, passing row |
| REG-6 | census reconciliation before use | **No blocker at all**; a process rule about writing deliverables | **Deleted** |
| REG-9 | "the refusal path is the Step 3 classifier" | **Stale.** `axis-incomplete` exists; and the case is already injected as I4d | **Deleted** — a duplicate of INV-9, which is bound and runs |
| REG-16 | "rebuilt at 3.7" | **Blocker real, reason stale.** `grep -n "excis\|Contested" oracle/retrieval/*.js oracle/router/*.js` → **0 lines**. The excision was never built | **Kept unbound, exception 1**, blocker rewritten to the measurement and given a close condition |
| REG-17 | "same subject as REG-16" | Same | **Kept unbound, exception 1**, same repair |
| REG-18 | "built at 3.8" | The block has **no consumer at all**, the detector included | **Deleted** |
| ISR-13 | "Owner: the sampling read at 7.4" | 7.4 closed. The limit is **permanent**: which of two sources is demonstrated is a judgement, not a token | **Kept unbound, exception 1**, restated as `H, PERMANENT` with no close condition |
| ISR-14 | "Owner: the sampling read at 7.4" | Same. Three facts named and three of them wrong is invisible to a membership test | **Kept unbound, exception 1**, same repair |

**Why the four repaired reason lines matter.** Read literally, "Owner: the sampling read at 7.4" on a
closed sub-step makes a permanent human gate look like forgotten work, and "rebuilt at 3.7" makes an
unbuilt layer look built. A deferral that outlives its blocker is a row nobody rechecks, which is the
same defect as a status cell nobody runs — one layer in.

### 3.2 The four argued failures, untouched

`PTH-13`, `MRG-4b`, `MRG-9`, `MRG-10` were argued at `af7abec` and are deliberately red. **They are
bound, they fail, and I did not touch them, their bindings, or their rows.** All four still fail with
the same messages. Exception 2, honoured by leaving them alone.

---

## 4. Findings

Five, and the first two are the reason this sub-step was worth a seat rather than a script.

### 4.1 PRV asserted an eight-key schema that exists in zero of 169 files

`§5 PRV` declared a `## Provenance` block keyed on `Origin corpus`, `Origin path`,
`Merge disposition`, `Reconciled against`, `Source identifier`, `Licence` and `Also`, and made sixteen
assertions about it. Measured over the corpus:

```
$ grep -rl 'Origin corpus'      literature/ | wc -l   →   0
$ grep -rl 'Merge disposition'  literature/ | wc -l   →   0
$ grep -rl 'Source identifier'  literature/ | wc -l   →   0
$ grep -rl '\*\*Licence'        literature/ | wc -l   →   0
$ grep -rl 'Byte source'        literature/ | wc -l   →   169
$ ls literature/*/*.md | wc -l                        →   169
```

All 169 files carry a **different** block: `Landed`, `Source`, `Upstream ref`, `Merge-time digest`,
`Byte source`, `Body edit`, `Disposition`, `Dedup key`, `Field`/`Folder`/`Also`, `Plan row rev`,
`Provenance depth`.

**PRV-1 — the one row of the seventeen that was bound — asserts only that a heading called
`## Provenance` exists, and it has passed for four waves.** Underneath it, sixteen rows described the
block's contents and described an artifact nobody built. That is a container assertion passing green
over content nobody checked: this project's own recurring defect, found in its own test suite, by its
own standard. All sixteen deleted; the finding is recorded in the suite header so a reader meets it
before the tests.

### 4.2 The path ceilings were never asserted, and two of them are red

`PTH-1/3/4/5/11` are now bound and measured over 169 real paths:

| Row | Ceiling | Measured | Verdict |
|---|---|---|---|
| PTH-1 | repo-relative ≤ 108, backslash-separated | longest **99** | **pass**, margin 9 |
| PTH-3 | leaf ≤ 64 | **70** — `ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update.md` | **FAIL**, 1 file |
| PTH-4 | folder ≤ 32 | **35** `organization-and-production-systems`, **33** `development-and-industrial-policy` | **FAIL**, 2 folders |
| PTH-5 | depth exactly 1 | 169 of 169 at `literature/<folder>/<leaf>` | **pass** |
| PTH-11 | worst case *with its margin* | 99 / 108, margin 9 | **pass** |

These three breaches are **not new**: `tools/verify_corpus.js` has been reporting
`PTH/A3 3 component ceiling breaches` and nothing in the suite was carrying it. The rows that were
supposed to are now bound, so the suite reports it too. **Two of my four new failures are this.**

### 4.3 NAM-13 asserts a convention the corpus does not follow, so it was deleted rather than bound

NAM-13 says a four-digit year token, where present, is the **second** segment. Measured: **11 of 169
leaves put it third**, all of them compound surnames — `esteban-pretel-2009-…`,
`rosenstein-rodan-1943-…`, `metzger-autry-2023-…`, `andrews-hanna-2025-…`. The corpus is right and the
row is wrong. Rule 7 forbids editing a test to make it pass, and binding it as written would have
manufactured eleven failures against a convention nobody adopted, so it was **deleted with the
measurement recorded here** rather than bound in an adjusted form.

### 4.4 PDF-4's documented "no binding" is closed

`run_suite.js` carried a comment explaining why PDF-4 had no binding: a first attempt probed
`git check-ignore` on a `.txt` and reported FAIL, but PDF-4 does not claim `.txt` is gitignored — it
claims the *containment check* covers it. `check_no_sources.js --ignore-probe` now **prints** its
blocked-but-not-ignored set, so the asymmetry can be asserted instead of argued. PDF-4 binds to that
printed line and passes.

### 4.5 Two closed sets are no longer closed, and both rows found it on their first run

- **REF-1 — FAIL, and it is the highest-value new failure.** `oracle/router/classify.js` declares
  **seven** reason codes; `oracle/answer_contract.md` §5 tables **six** and its prose still says
  *"closed set of six"*. The extra is **`transfer-unevaluable`**, ruled in at W4-2 in the router with
  no contract row. Every consumer that trusts the contract's arity is wrong by one. The binding reads
  the expected set **out of the contract's §5 table at test time** rather than holding its own copy —
  CLM-5's lesson applied to the row that needed it. **Owner: the seat that ruled the extra code in.
  Close: the contract's §5 table and its stated arity name every code the router can emit.**
- **VER-2 — FAIL, and it is the field working.** This suite pins contract version **2**; the contract
  reads **3** after The Writer's 8.4 landing. VER-2's own cell records that it did exactly this in
  Wave 2 and that "the red was the report". **I did not re-pin.** Re-pinning is a reconciliation pass
  — a read of what version 3 changed against what this suite asserts — and doing it as a
  one-character edit would be editing a test to pass. **Owner: the seat landing the version-3
  reconciliation. Close: re-read, then re-pin.**

---

## 5. What was bound, and what it rests on

**45 rows bound. No new mechanism was written.** Every binding is five to ten lines and rests on
something already on disk: a `--prove` mode a tool already had, a closed set a contract already
states, or a file property already true or already false. That was the test of whether a row was worth
keeping — **a row that needed a framework to bind was a row nobody was ever going to bind.**

| Rests on | Rows | Which |
|---|---:|---|
| `tools/verify_register.js --prove` | 11 | GRD-3..8 (one named decoy per blacklisted word), GRD-10 (the control, not a decoy), CLM-3, CLM-4, CLM-5, CLM-9 |
| `tools/verify_answers.js --prove` | 5 | LOG-3, LOG-7, LOG-19, LOG-22, LOG-23 |
| `tools/verify_haiku.js --prove` | 3 | FIL-10, FIL-11, FIL-12 |
| `tools/check_no_sources.js` | 5 | CON-1, CON-3, PDF-4, PDF-8, PDF-16 |
| The corpus, measured | 8 | PTH-1, PTH-3, PTH-4, PTH-5, PTH-11, CRP-1, CRP-7, CRP-11 |
| `oracle/answer_contract.md`, read at test time | 3 | VER-1, VER-2, VER-3 |
| `oracle/router/classify.js`, read only | 4 | VRD-1, VRD-11, REF-1, REG-1 |
| The runner and the clone, self-checked | 3 | INV-12, INV-13, CON-4 |
| One-line absence / git-config facts | 1 | CLM-14 |
| `structural()`, already computed and not credited | 3 | MUT-1, MUT-6, SLT-5 |

Three of these are worth naming individually.

**GRD-10 is bound to a control, not a decoy.** The hazard is that `recompute-verified` *contains*
`verified`, so a substring scan reds a legal answer. No decoy can show a false positive is absent;
only a control can, so GRD-10 binds to `CONTROL-APP` — a real produced answer carrying
`recompute-verified` that passes B3. Kept under **exception 3**: the container-versus-content family,
and a blacklist that trips on its own legal token is switched off within a week.

**CRP-11 is the line-ending family, kept under exception 3 and proved as a differential.** It takes a
real landed file, builds its CRLF twin in memory, and requires the merge's own normalizer to call them
**byte-different and content-identical**. A comparator that folds the two cannot show both. A CRLF
diff read as a content disagreement is a defect this repository has already produced once.

**MUT-1, MUT-6 and SLT-5 were already being computed.** `structural()` runs them on every run and
prints them as `[structural]` lines; the rows were reported UNRUN beside their own results. They are
bound to the same function, so there is one implementation and not two.

### 5.1 Two of my own bindings were wrong on first run, and both were binding bugs, not findings

Recorded because the alternative is a deliverable that reports only the runs that worked.

- **VRD-11** searched the tree for `APP_UNBUILDABLE` and **matched the string inside its own source**,
  reporting the checker as the defect. That is CHK-03 one layer in: a check whose only finding is
  itself. Fixed by excluding `oracle/tests/run_suite.js` and saying so in the pass message.
- **PDF-16** required a `findings=` count that `check_no_sources.js` does not print in its empty
  branch. The tool was right — it prints `SCANNED NOTHING ... nothing is asserted` — and my regex was
  reading one of two report branches. Fixed to read both. **The row passes and the tool was never
  wrong.**

---

## 6. Attribution of every moved number

| Figure | Open | Close | Moved by |
|---|---:|---:|---|
| rows | 455 | 148 | **me** — 307 deleted |
| no binding at all | 348 | **0** | **me** — 45 bound, 303 deleted |
| DEFERRED | 9 | 4 | **me** — 1 bound, 4 deleted, 4 kept and re-verified |
| pass | 59 | 101 | **me** — +42 from new bindings that pass |
| fail | 39 | 43 | **me** — +4: PTH-3, PTH-4 (real, already reported by `verify_corpus`), VER-2 and REF-1 (real drifts, §4.5) |
| RFX failures | 34 | 34 | **not me** — the router seat's `classifyQuestion()` retirement, unchanged |
| `PTH-13`, `MRG-4b`, `MRG-9`, `MRG-10` | fail | fail | **not me** — argued at `af7abec`, untouched |
| `INV-7` | fail | fail | **not me** — pre-existing, `fault_inject.js` decoy I4b |
| `check_registers` hard failures | 0 | 0 | unchanged |

**No row that was passing or failing at my baseline was deleted.** The deleted population was 303
rows with no binding plus 4 `DEFERRED` rows whose blockers had expired. **The `UNRUN IS NOT PASS`
machinery is intact** — all four guards are present and now asserted by INV-12, so if the no-binding
count ever climbs again the runner will still say so and a bound row will fail.

---

## 7. `oracle/check_register.md` — pointers made dead by the deletions

Four repairs, all inside the permitted scope of "rows made dead by your deletions".

1. **`CHK-19` removed.** It registered `oracle/tests/gen_matrix.js` at status `specified`, justified
   by *"1.11 RG-13 and RV-37"*. Both rows are deleted and **the file has never existed**. This is the
   register-layer half of the §4.1-shaped defect: a register row naming a generator, a suite section
   labelled "Generated.", and no generator. No other file references `CHK-19`.
2. **The `H` size declaration** updated `40 25 13 2` → `39 25 12 2` (total, live, specified,
   retiring), because CL-3 blocks on the H row's counts equalling the parsed counts. Re-verified:
   39 `C` rows, 25 `live`, 12 `specified`, 2 `retiring`. `check_registers` still reports 0 hard
   failures.
3. **`CHK-18`'s count corrected**, and the correction is the sub-step in one cell. It read *"the 211
   tests"* against a file that held 266, and both figures counted rows rather than bindings. It now
   names 91 + 57 = 148 rows, every one bound.
4. **`CHK-20`'s pointer repaired** from *"CLM-1 to CLM-12"*, eight of which are deleted, to the five
   CLM rows that survive and are bound.

Also repaired: a prose citation of the deleted `CON-6` in §5's dispatcher notes, repointed to the
reentrancy marker in `tools/githooks/dispatch.js` — the mechanism the row was naming.

Verified after the edits: **no pointer in `check_register.md` names a suite row that no longer
exists**, except inside the two repair notes that quote the old pointer as part of the record.

---

## 8. Close condition

**Met.** The suite is 148 rows and **every one of them is executed**. `UNRUN IS NOT PASS` now has
four rows to report instead of 357, and each of the four names a blocker that was measured this
sitting. The ratio of real to aspirational is 148:0, and the failure count went **up**, which is what
honesty looks like here.

```
apparatus: check rows +0/-1 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-307
```

---

## Not mine

- **`oracle/tests/fault_inject.js`** — in my write-set path, but it carries an OWED repair routed as
  item R-2 to the fault-injection seat in `cr_scratch/relay/w5-1_router_advises_routes.md`. Not
  touched. `INV-7` still fails against it and that failure is not mine.
- **`oracle/router/**`, `oracle/answer_contract.md`, `CLAUDE.md`, the registers, `literature/`,
  `tools/`** — read only, never written. Three other seats hold those and two were live.
- **The RFX migration.** 34 RFX rows fail with the router seat's self-describing
  `classifyQuestion() is RETIRED` message. Unchanged at my baseline and unchanged at my close.
- **`tools/checks.js` does not exist**, but `CHK-09` registers it at status `live`. That is a **CL-2
  violation** (`a specified row whose path exists must be moved to live`, and its converse in
  practice) and `node tools/checks.js --register` fails with `MODULE_NOT_FOUND`. Found while checking
  my own register edits. **Not mine to fix** — it is not a row made dead by my deletions. **Routed:
  owner is the seat holding `tools/`; the CL rules of `check_register.md` §4 are not being run by
  anything, because the tool that runs them is the missing file.**
- **`CHK-21` names `oracle/lib/verify_haiku.js`** while the tool this sub-step bound three rows to is
  `tools/verify_haiku.js`; `CHK-20` and `CHK-22` name `oracle/lib/` paths in the same way. Same owner,
  same routing. Not a row made dead by my deletions, so not edited.
- **The version-3 reconciliation** (VER-2) and **the seventh reason code** (REF-1) are findings, not
  repairs. Both are routed in §4.5 with an owner and a close condition. Neither is mine to land.
