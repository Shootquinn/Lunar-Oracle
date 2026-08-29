# W4-8, The Editor: revision stages 6.5, 6.10, 6.14, 7.7

Seat: The Editor, carrying The Designer's lens for 6.5 and 6.14.
Read digest: `HEAD = 99d3601`, working tree at 2026-08-28.
Instrument: `cr-agents/supplements/signs_of_ai_writing.md`, read in full.
Standing prohibition applied: `cr_scratch/step0_editor_prohibition.md` §7-§9 (mine, from 0.4).

---

## 0. Premise checks, run before revising anything

Three claims in my brief were checkable. All three hold. One carries a correction.

**P1. `cr-agents/`, `lsei/` and `_intake/` are absent from a clone.** Holds.
`git ls-files | grep -c "^cr-agents/\|^lsei/\|^_intake/"` returns 0. `.gitignore` lines 87, 88, 96
carry `/cr-agents/`, `/lsei/`, `/_intake/` as anchored rules.

**P2. `lsei/NOTICE.md` is the licence precedent and the constraint is real.** Holds, verbatim:
"a share-alike licence and a public-domain dedication cannot both govern the same file."

**P3. The brief says the cloner tree is "the tree with `cr-agents/`, `lsei/` and `_intake/`
removed." Correct as far as it goes, and incomplete in the direction that matters.** The removal
list is right; what stays is the part a draft will get wrong. `cr_scratch/` is **tracked** — 198
files at HEAD including `_stage/` (170) and `relay/` (28). A cloner gets the whole scratch history.
Any draft that describes the tree as if scratch were private is describing a tree the reader does
not have.

### The cloner tree, measured at `99d3601`

`git ls-files` at HEAD, 497 files. Top level, exhaustive, eleven entries:

```
.gitattributes  .gitignore  accumulator.md  CLAUDE.md  COUNTING_RULE.md
cr_scratch/  literature/  lunar-oracle-gameplan.md  oracle/  QUANTITIES.md  tools/
```

- `literature/` — 171 files: 169 summaries in 11 topic folders, plus `INDEX.tsv` and `FIELDS.tsv`.
- `oracle/` — 13 files plus `tests/` (3: `answering_loop_suite.md`, `corpus_suite.md`, `run_suite.js`).
- `tools/` — 17 files plus `githooks/` (4).
- `cr_scratch/` — tracked, `_stage/` and `relay/` included.

**Absent from the cloner tree and therefore unciteable by any prose written for a cloner:**
`cr-agents/` (all of it, including `method/operational_guide.md`, `prompt0.md`, and
`supplements/signs_of_ai_writing.md`), `lsei/` (all of it, including `index.html`, `LICENSE`,
`NOTICE.md`), `_intake/` (all of it). Also absent: **`LICENSE`, `NOTICE.md`, and `README.md`.**
`git ls-files | grep -i "licen\|notice\|copying"` returns nothing.

**The licence finding, ahead of 6.14.** This repository tracks no licence text of any kind. The
`lsei` precedent README says "`LICENSE`: the Unlicense, verbatim" and "`NOTICE.md`: the one named
exception" — and both files exist there. Here they do not. A README licence section that states a
licence for this tree states it about a tree with no licence file in it. That is not a style
problem and I will not pass it as one.

---

## 1. Arrival log

| Doc | Sub-step | Status |
|---|---|---|
| `CLAUDE.md` | 6.5 | Stub only at the time of writing: 375 words, mtime 2026-08-27 20:42, the seed file that names itself PROVISIONAL. Not The Writer's stage-3 draft. |
| `oracle/first_run_content.md` | 6.10 | Absent |
| `README.md` | 6.14 | Absent |
| `oracle/sampling_protocol.md` | 7.7 | Absent |

Monitor armed on all four paths. Revisions appended below as each lands.

---

## 2. 6.5 — `CLAUDE.md`: the before-state, measured

The Writer's stage-3 draft has not landed. What follows is the audit of the file that occupies the
path today, because if 6.4 does not land then this stub is what a cloner reads, and because the
Designer lens returns a hard result against it that the replacement must not repeat.

**I did not edit it.** The stub says "Do not build on this file's shape," 6.4 is The Writer's, and
revising a document whose replacement is in flight is drafting under another name.

### Word count

375 words. No after-count: no revision made, for the reason above.

### `signs_of_ai_writing.md` — categories found, with examples

The density is low. This is not AI-average prose and I am not going to manufacture a finding.
Three categories register, all in the NOTE band.

| Category | Instances | Example |
|---|---|---|
| 3.2 Overuse of boldface (WP:AIBOLD) | 9 bold runs in 375 words | `**Acquire, only when missing.**` / `**Verify, every session, whether or not anything was cloned.**` — the runs are carrying section-heading load in a file that already has headings. |
| 3.3 Inline-header vertical lists (WP:AILIST) | 2 | `**TDD (`cr-agents/method/tdd_method.md`):** always active.` and the LLM-PLM line below it. |
| 8.3 Throat-clearing before the point | 1 | `Bootstrap is two separate phases, and conflating them is a defect this project has already made once.` The two fenced blocks that follow *are* the two phases. The sentence announces a structure the next twelve lines demonstrate. Its second clause is a fact and survives; the first is the throat-clearing. |

**Not found, checked for:** 1.1 significance inflation, 1.2 puffery, 1.3 superficial analysis, 2.1
AI vocabulary, 2.2 copula avoidance, 2.3 negative parallelism, 2.6 false ranges, 3.1 title case,
3.4 challenges-and-prospects, 5.1 vague attribution, 7.1–7.4 composites. **Em dashes: 0.** Against
the 4.1 diagnostic (human technical writing 0–2 per page; ChatGPT 5–10+) this file is at the human
floor.

### The Designer's lens: paths that do not exist in a cloned tree

**Five, in 375 words**, and the ordering makes it worse than the count.

| Line | Path cited | Present in a clone? |
|---|---|---|
| 13 | `cr-agents/method/operational_guide.md` | **No** |
| 14 | `cr-agents/prompt0.md` | **No** |
| 49 | `lsei/index.html` | **No** |
| 54 | `cr-agents/method/tdd_method.md` | **No** |
| 57 | `cr-agents/supplements/llm_plm_cad.md` | **No** |

The read sequence at lines 10–15 is the container-versus-content defect in its exact form. It
instructs the reader to read four documents in order; items 2 and 3 are files the reader does not
have. The section that would create them — "Working copies", lines 17–50 — sits **below** the
sequence that depends on them. A cloner obeying this file top to bottom fails at step 2 of 4 and
finds the remedy in a section they have not reached.

Two paths are correct and worth keeping as the shape of the fix: `CLAUDE.md` and
`lunar-oracle-gameplan.md` both exist at HEAD.

**The constraint the replacement inherits:** any `CLAUDE.md` that names a `cr-agents/` or `lsei/`
path before the acquire step has run is describing a tree the reader does not have. There is no
style fix for this. Either the bootstrap precedes the read sequence, or every path in the read
sequence is marked as one the bootstrap creates.

### The Systems Engineer's question — routed, not answered

Written **before** the draft existed, so that it could not be shaped to fit the draft:
`cr_scratch/relay/w4-8_editor_to_systems_engineer_65_conformance.md`.

The question: *does the prose of `CLAUDE.md` implement `oracle/bootstrap_contract.md`, or a
friendlier contract the suite does not test?* Six seams named for him from the contract —
Phase 6 membership, Phase 7's two-condition gate versus a judgement phrase, the status line's
position, the Phase 3/Phase 4 split (loose end E7), the `ABORT`/`DEGRADED`/`CLEAN` vocabulary, and
§8's closed list. **I have not judged any of them.** They are his.

The Writer's own F4 (`cr_scratch/step6_writer.md`) reaches seam 1 independently and rules it a note
rather than a defect: the contract's Phase 6 sequence is what runs *after* the session has read
`CLAUDE.md`. Her reading is sound and it is still his to confirm. Recorded, not adopted.

---

## 3. The instrument, calibrated

I wrote a scanner rather than eyeballing four documents four different ways, so that
*before* and *after* are the same measurement. It counts the mechanizable categories: 4.1 em
dashes, 3.2 boldface, 3.3 inline-header lists, 3.1 title case, 2.3 negative parallelism, 2.4
rule-of-three, 4.2 curly quotes, 4.3 emoji, 2.1 AI vocabulary, 2.2 copula substitutes, 5.1 weasel
attribution, 6.1 chat leakage, 5.3 cutoff hedges. Categories 1.1–1.3, 7.x and **all of 8** are hand
reads and stay hand reads; the deletion test in my 0.4 §7 cannot be a regex.

**Known-answer test, run before use, on two files nobody suspects:**

| File | Words | Em dashes | Bold | AI vocab | Weasel |
|---|---|---|---|---|---|
| `CLAUDE.md` (the stub) | 375 | 0 | 9 | 0 | 0 |
| `lsei/README.md` (the precedent) | 862 | 0 | 0 | `navigate`×2 | 0 |

Both are clean, and the scanner says so rather than manufacturing hits. That is the calibration:
**the house baseline is 0 em dashes per 500 words and near-zero AI vocabulary.** A draft above it is
a finding, not a style preference.

One false positive found and left in: the scanner flags `# Lunar Scenario Explorer` as title case
(3.1). It is a proper noun. Title case therefore stays a hand read on every heading it flags.

Scanner path: `<scratchpad>/editor_scan.js`. Not committed — it is my instrument, not a repository
tool, and the freeze is not a licence to add one.

---

## 4. 6.5 — `CLAUDE.md`, revised

**3269 words before, 3252 after. Net −17.** That number understates the pass and I am not going to
dress it up: I removed about 67 words and added about 28 back as two corrections. The corrections
were worth more than the words.

**The draft is good.** It is dense, it is falsifiable, and the ordering defect I recorded against the
stub in §2 is gone: Phase 3 acquires before Phase 6 reads, so no path is cited before the step that
creates it. Saying so is the finding; I am not going to invent a style complaint to balance it.

### Two corrections, which are why this pass mattered

**C1. An inverted conditional in the idempotence claim.** The draft read:

> Running the bootstrap twice in succession clones nothing the second time, changes no recorded ref,
> and reports the same mode set against an unchanged tree; **if a second run does any of those
> things, the bootstrap is broken** and not merely stale.

*Those things* are the correct behaviour. As written, the sentence says a correctly idempotent
bootstrap is broken. Rewritten to name the wrong behaviour: `a second run that clones, bumps a ref,
or reports a different mode set is broken and not merely stale.` This is the falsifier for the
document's own headline claim, and it was pointing the wrong way.

**C2. The Phase 1 abort did not abort.** The prose says *stop if it is not there*. The code said:

```
test -f "$ROOT/lunar-oracle-gameplan.md" || echo "ABORT (Phase 1, BC-1): ..."
cd "$ROOT"
```

The `cd` runs unconditionally, so on failure the session prints `ABORT` and then changes directory to
`/`. Prose and code contradicted each other, and a session obeying the code bootstraps the filesystem
root. Replaced with an `if`/`else` so the `cd` happens only on success. Minimal edit; I did not
restructure the block.

### The cuts

| Where | Category | Before → after |
|---|---|---|
| §1 lead, first-run-flag gating | 8.3 throat-clearing | 37 → 27 w. `The mistake this ordering exists to prevent is…` recast as the imperative `Do not gate the bootstrap on the first-run flag…`. A file a session acts on should instruct, not describe. |
| Phase 4 group 1, push-disable | **8.2 restated conclusion** | 40 → 23 w. The clearest cut in the document: Phase 3 already says *push-disable and fetch used to sit inside the clone branch, and a working copy that was present with push still enabled was therefore never reached.* Phase 4 said it again in a second voice 25 lines later. Kept the one new clause (`every install predating the fix`), kept the CMD-9 every-session wording, dropped the restatement. |
| Phase 5, direction | 8.4 meta-commentary | `…which is a finding in its own right and goes in the report as one` → `Report that.` 14 → 2 w. |
| Phase 7, status line | 8.2 + tautology | 26 → 13 w. `A status line read after the convention is established is a status line` is a tautology wearing the clothes of an insight. The reason that follows it survives; the chiasmus does not. |
| §5 closer | 8.1 self-narrating honesty | −12 w. `…and that failure is the field working rather than the field breaking.` Delete it and nothing false stands: the preceding clause already says the suite fails. |
| §2, origins | 3.2 boldface | Unbolded `Which origins are available follows from the assertions above` — a whole clause bolded mid-paragraph, where sentence position already carries it. No word change. |

### `signs_of_ai_writing.md` — every category with an instance, named

| Category | Instances | Example |
|---|---|---|
| **8.2 Restated conclusions** | 2 | The push-disable rationale, stated in Phase 3 and again in Phase 4. The status-line tautology. |
| **8.3 Throat-clearing before the point** | 1 | `The mistake this ordering exists to prevent is…` opening §1's second paragraph. |
| **8.1 Self-narrating honesty** | 1 | `…that failure is the field working rather than the field breaking.` |
| **8.4 Meta-commentary** | 1 | `…which is a finding in its own right and goes in the report as one.` |
| 3.2 Overuse of boldface | 27 runs, 4.1 per 500 w | Elevated. Most are structural (the seven numbered prohibitions, the four Phase 4 group labels, the three abnormal-read labels) and legitimate in a procedural file. One was decorative and is cut. 26 remain and I am leaving them: this is a document read under time pressure. |
| 2.4 Rule of three | 2 | `Do not write a sequence, do not paraphrase one, and do not quote a line of it anywhere else.` **Not padding** — the third item is CMD-18's actual assertion and the strongest of the three. Kept. |
| 2.3 Negative parallelism | 2 | `There is no server, no daemon and nothing to start.` **Kept.** It prevents a specific wrong action — looking for a process to start — and deleting it lets a false expectation stand. |

**4.1 em dashes: 9 before, 8 after — 1.2 per 500 words.** Against the reference's diagnostic (human
technical writing 0–2 per page, ChatGPT 5–10+) this is inside the human band and is **not a finding.**

**Checked and absent:** 1.1 significance inflation, 1.2 puffery, 1.3 superficial analysis, 2.2 copula
avoidance, 2.5 elegant variation (terminology is rigidly consistent — `working copy`, `mode`,
`origin` never rotate), 2.6 false ranges, 3.1 title case, 3.3 inline-header lists, 3.4
challenges-and-prospects, 4.2 curly quotes, 4.3 emoji, 5.1 vague attribution, 5.3 cutoff hedges, 6.1
chat leakage, 7.1–7.4 composites. The one scanner hit for 2.1 AI vocabulary (`tapestry`) is a **false
positive**: it is the literal marker string in `grep -q 'the back of the tapestry'`, not prose.

### The Designer's lens: every path token, checked against a cloned tree

Twenty-two distinct path tokens. **Twenty-one resolve or are correctly marked. One did not.**

| Token | Verdict |
|---|---|
| `cr-agents/method/operational_guide.md`, `cr-agents/prompt0.md`, `cr-agents/method/tdd_method.md`, `cr-agents/supplements/llm_plm_cad.md`, `lsei/`, `lsei/index.html`, `lsei/literature/` | Absent from a clone, **and correctly so**: every one is cited at or after Phase 4, and Phase 3 above it says the bootstrap clones them. This is CMD-23's second clause and the draft satisfies it. |
| `oracle/answer_contract.md`, `oracle/bootstrap_contract.md`, `oracle/currency_policy.md`, `oracle/install_state.md`, `oracle/NAMING.md`, `oracle/VERIFIED.tsv`, `lunar-oracle-gameplan.md`, `literature/` | Exist at HEAD. |
| `deps/` | Absent, and named only as a prohibition (`never into deps/`). Correct. |
| `findings/` | Absent, and the draft says so in its own words: *`findings/` is permitted to be absent.* Correct. |
| `literature/_pdf` | Absent, and BC-19 reports absence as a fact rather than a failure. Correct. |
| `.oracle-state.json` | Runtime-written, and the draft says it is machine-written and gitignored. Correct. |
| `oracle/first_run_content.md` | Did not exist when I checked; **landed during this pass** as 6.9's deliverable. Now resolves. |
| **`tools/corpus_divergence.js`** | **Did not resolve, and this was the finding.** |

**The one that failed.** §3 prohibition 7 said the bootstrap *dispatches `tools/corpus_divergence.js`*.
That file does not exist and is not scheduled to exist by any step that has run. `tools/` holds
seventeen `.js` files and none is it. It is `CHK-40` in `oracle/check_register.md`, status
`specified`, and whether it lands as its own file or as a mode of `tools/verify_corpus.js` is
**still open at 2.17** — `cr_scratch/relay/w3-1_engineer_to_w3-3_divergence_tool.md` is the seat
argument about exactly that.

The Writer is not at fault: `oracle/bootstrap_contract.md` §7.2 names the path and she implemented
the contract. But a cloner reads `CLAUDE.md` and is told the bootstrap runs a script that is not in
their tree, and CMD-23 goes red on it.

**I did not pick the remedy**, because picking it would settle 2.17 from the wrong seat. I marked the
state instead: the check is named by its register id, its status is stated as `specified` and not
built, the open question is named, and the consequence is stated — Phase 5 reports the fork verdict
as `unknown` until it lands. That is +25 words and it is the reason this document's net cut is small.

### Marker assertions, verified rather than assumed

The draft asserts five content markers inside upstream files. I ran all five rather than trusting
them, because a wrong marker fails `present-but-wrong` on every clean install:

```
BC-12  grep '^### A.12 Standing Roster' cr-agents/method/operational_guide.md   OK
BC-13  test -s cr-agents/prompt0.md                                             OK
BC-14  grep 'KNOB_DATA' lsei/index.html                                         OK
BC-15  grep 'the back of the tapestry' lsei/...-map.md                          OK
BC-16  test -d lsei/literature                                                  OK
BC-17  ls literature/*/*.md | grep -Ec '/[a-z0-9]+(-[a-z0-9]+)*\.md$'           169
BC-18  ls findings/*.md    | grep -Ec '/fa[0-8]-...'                            0, and permitted
BC-8   git ls-files -s tools/githooks/ | grep -qv '^100755'                     silent; all four are 100755
```

All five markers hold. The shelf count returns exactly the 169 summaries. BC-8 does not misfire.
**Nothing cut here** — these are the measured facts my brief tells me to protect, and they are right.

### One question routed to The Systems Engineer, not answered

`cr_scratch/relay/w4-8_editor_to_systems_engineer_65_conformance.md`, written before the draft
existed. Six seams named. **A second item to add to it**, found in the draft and outside my
competence:

> §3 prohibition 2 says *Never copy this repository's corpus into a working copy. The push-disable
> enforces this mechanically.* The draft is faithful to contract §8 rule 2, which says the same. But
> push-disable prevents *propagation upstream*; it does not prevent a local `cp` into
> `lsei/literature/`. If the contract's claim is loose, the prose inherits it. Contract question,
> not prose question.

---

## 5. 6.10 — first-run sequence content, revised

**1185 words before, 1121 after. Net −64.** Em dashes 4 → 2.

**The emitted sequence is untouched.** 107 words before and after; the haiku byte-identical. I
revised the apparatus around the text, never the text. That boundary is the document's own
(`The emitted bytes are exactly the contents of the one fenced block in §1`) and an editor who
rewrites the sequence while revising the file specifying it has done the thing the file forbids.

### The no-theater prohibition, which is mine from 0.4 — verdict

**§4 is compliant, and it is the part I was sent to be hardest on.** The rule on the record is that
whimsy in front of a system that is not working is the wrong thing and a degraded bootstrap leaves
the flag unset. §4 states both without being asked twice: *No haiku, and no first-person Oracle
voice*, and *The flag stays unset, so the introduction is still owed.* It also states the reason in a
form I would not improve — *a haiku about a broken clone is a joke at the expense of somebody whose
tooling just broke.* Nothing cut there.

**The charm is licensed, and only where it is licensed.** §1 charms; §4 suppresses §1 when the system
is broken. That is the correct shape and I am recording it as passing rather than hunting for a
complaint.

### The one BLOCKING cut

**Category 8.6, changelog leakage.** The draft closed §3 with:

> An earlier draft closed beat two with *and it is the part I am proudest of*. That is the Oracle
> narrating its own virtue, which is Category 8 in costume, and it is cut for that reason.

The Writer caught her own theater, which is right, and then recorded the catch in the specification,
which is not. §8.6's severity is BLOCKING and its fix is one line: *cut the qualifier, keep the new
number*. A record of a sentence that is no longer in the document is not a constraint on the document;
it is a revision note, and this project has `cr_scratch/step6_writer.md` for revision notes. **Cut, 33
words.** The paragraph it sat under loses nothing.

If the underlying rule deserves a seventh constraint in §2 — *the Oracle never narrates its own
virtue* — that is The Writer's to add, not mine. Flagged, not written.

### The other cuts

| Where | Category | Before → after |
|---|---|---|
| Lead, §0 | 8.4 meta-commentary | −24 w. `…and that separation is the reason the mechanism can be tested against a dirty working copy without anybody rewriting a word of the prose.` The rule is `Neither reaches into the other.` The praise of the rule is not the rule. |
| §2, haiku width | 2.4 false superlative + 4.1 | −11 w and one em dash. `that is the one thing the contract forbids outright` is not true — the contract forbids a great many things — and the claim was doing no work the reason already did. |
| §2, breadth | 8.2 restated conclusion + 4.1 | −9 w and one em dash. `— which is the whole reason beat two exists` forward-points at §3, which then says the same thing at length. |
| §3, first sentence | 8.3 throat-clearing | −6 w. `and the distinction is load-bearing` announces importance immediately before three sentences that demonstrate it. |

### Two measured claims, checked rather than trusted

This document makes two numeric claims about itself, in a file whose own §2 rule is that an
unverified number in the opening is the `182 sources` failure. So I measured both.

| Claim | Measured | Verdict |
|---|---|---|
| `One hundred and seven words` | 107 words in the fenced block | **Correct.** |
| `Sixty-nine rendered characters` | 69 stripped | **Correct as stated** — but see below. |

**The one imprecision, and I added words rather than cutting them.** The emitted bytes are the
fenced block with the fence lines removed, and the haiku line carries a two-space indent inside that
block. So it is 69 characters stripped and **71 as emitted**. Both clear eighty columns, so the
falsifier's verdict does not change and nothing is broken. But this file is precise about exactly
this measurement, and a number measured on a different string than the one that ships is the defect
class it was written to prevent. Now reads: `Sixty-nine rendered characters, seventy-one with the
block's indent, and both clear an eighty-column terminal.`

Syllables checked by hand: `a-cold-room-a-lamp` 5, `the-pa-pers-al-rea-dy-stacked` 7,
`ask-and-I-will-read` 5. Correct.

### One unrun falsifier, marked

§2's second constraint is falsified by *any token from `verify_haiku.js`'s claim-bearing list*.
`verify_haiku.js` does not exist: it is **5.1 (LOOP-8)'s deliverable**, in Step 5, which has not
started. A falsifier that names an unbuilt tool is UNRUN, and this project's standing rule 9 is that
UNRUN IS NOT PASS. I did not remove the falsifier — it is the right falsifier — I marked its state,
in one sentence, so nobody reads a specified check as a passing one.

### `signs_of_ai_writing.md` — categories with instances

| Category | Instances | Example |
|---|---|---|
| **8.6 Hedged qualifier stacking / changelog leakage** | 1, **BLOCKING** | The `An earlier draft closed beat two with…` paragraph. Cut. |
| **8.4 Meta-commentary about the argument** | 1 | The lead's closing clause praising the mechanism/content separation. Cut. |
| **8.3 Throat-clearing** | 1 | `and the distinction is load-bearing`. Cut. |
| **8.2 Restated conclusion** | 1 | `which is the whole reason beat two exists`. Cut. |
| 2.4 Rule of three | 2 | `Do not paraphrase it, do not shorten it for a session that seems to be in a hurry, and do not quote a line of it anywhere outside this file.` **Kept** — the third is the strongest and none is filler. |
| 3.2 Boldface | 11 runs, 4.9 per 500 w | The six §2 constraint labels and the two §4 rule labels. Structural. Kept. |

**Checked and absent:** 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.5, 2.6, 3.1, 3.3, 3.4, 3.5, 4.2, 4.3, 5.1,
5.2, 5.3, 6.1–6.4, 7.1–7.4. **Em dashes 2 after, 0.9 per 500 words — inside the human band.**

Notably absent and worth naming, because a first-run introduction is where they normally live: **no
puffery (1.2) and no capability inflation.** §2's fifth constraint forbids them by name and the
sequence obeys it — `Both happen often. Neither is a malfunction.` is the opposite of a feature
parade.

---

## 6. 6.14 — `README.md`, revised

**2000 words before, 1979 after. Net −21.** **Em dashes 13 → 0.** The Writer flagged this file as her
em-dash outlier at roughly four per page and she was right; that is where I started.

### The em dashes, all thirteen

Seven sites, all replaced with the mark that belonged there. Against the house baseline this was the
only real 4.1 finding in four documents: `lsei/README.md`, the precedent, carries **0 em dashes in 862
words**, and this file carried 3.3 per 500.

| Site | Was | Now |
|---|---|---|
| Lead, the four dispositions | `— computed, read out of the papers, contested, or refused —` | parentheses; the internal commas are why a dash felt necessary |
| Running it, the first-run clause | `and — on a first run that fully succeeded —` | commas, **and the clause itself rewritten; see below** |
| Working-copy bullets | `` `cr-agents/` — the Collaborative Reasoning method `` | colons, matching `lsei/README.md`'s own bullet form |
| Map, runtime-path rule | `read at runtime** — other folders` | sentence break |
| Corpus, the merge | `Two corpora came in — … — and the point` | colon plus a sentence break, which also splits a 55-word sentence |
| Objective 4 | `— the haiku on one side, flat prose on the other —` | parentheses |
| Licence, the CC clause | `— two are published under … —` | semicolon, **and the number corrected; see below** |

Zero is where they landed, not a target I forced: every one of the seven read at least as well with
the substitute, and I would have left any that did not.

### Two corrections in this file, and both matter more than the words

**C3. The README described a gate the system does not implement.** It said the bootstrap
*plays a short opening sequence once* **`on a first run that fully succeeded`**.

`oracle/bootstrap_contract.md` §5, in its own words: *Do not phrase the gate as "the bootstrap fully
succeeded" or any synonym: a gate phrased as a judgement cannot be tested, and that phrasing is how
the earlier version acquired its defect.* `CLAUDE.md` §2 repeats the prohibition. The README, the one
document a stranger reads first, reintroduced the exact phrasing both were corrected to remove — and
it is a friendlier gate than the real one, because `moved-on` and `dirty-or-diverged` do not block and
"fully succeeded" reads as though they would.

Now: `on a first run with no blocking condition in force`. Same length, testable, and true.

**C4. The licence section said two; the corpus holds four.** It read *two are published under Creative
Commons Attribution-NonCommercial-NoDerivatives*. Measured:

```
grep -ril "NonCommercial-NoDerivatives\|BY-NC-ND" literature/   →  4
  literature/isru-processing/just-2020-regolith-excavation-review.md      "Open access under CC BY-NC-ND 4.0"
  literature/isru-processing/leger-2025-energy-oxygen-moon.md             "printed as distributed under CC BY-NC-ND 4.0"
  literature/lunar-ice-and-geology/li-2018-surface-exposed-water-ice.md   "open access under Creative Commons Attribution-NonCommercial-NoDerivatives 4.0"
  literature/power-and-thermal/poston-2020-krusty-reactor-design.md       "Open access under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 license"
```

All four state the **source's own** licence, not a discussion of one. Corrected to four, and I added
one sentence the original lacked: **four is a floor, not a census** — it counts the summaries that
state a licence for their source, and most do not. Nine summaries name a Creative Commons licence at
all; the other 160 say nothing either way. A licence section that reports a grep as though it were a
survey is the `182 sources` failure with different nouns.

### The A5 sentence — the sharpest finding in the four documents

The orchestrator asked me to verify the README does not copy the Scenario Explorer's withdrawn
sentence. **It did.** The file read:

> No PDF, page image **or extracted source text** is committed in this repository: `git ls-files`
> returns none, `.gitignore` denies them, and a committed pre-commit check fails the commit that would
> add one. That is a claim about files.

The three cited mechanisms are `git ls-files` on extensions, `.gitignore`, and `CHK-13`
(`tools/check_no_sources.js`, trigger `pre-commit`, consequence `block`, status `live` — I checked the
register row and read the file). All three catch **carrier files**: an extension gate over every
dot-separated segment, a `%PDF`/`%!PS`/`AT&TFORM` magic-byte gate, a size backstop.

**None of them can see extracted source text pasted into a `.md`.** And this repository holds exactly
that: `prettyman-2006` reproduces a published AGU abstract at 100.0%, which the paragraph itself goes
on to say two sentences later. The sentence asserted something the same paragraph then refuted, and
the disclaimer after it was disclaiming a claim the sentence in front of it had just made.

This is loose end A5 and the precedent is documented rather than remembered. `lsei/README.md` carried
the identical wording and withdrew it:

```
git -C lsei show d7889e1 -- README.md
-  No third-party PDF, page image or extracted source text is in this repository.
+  No third-party PDF or page image is in this repository.
```

Narrowed to `No PDF and no page image is committed in this repository`, which is what the three
mechanisms actually establish, and the withdrawal is now cited by commit rather than by memory.

I also cut the word **deliberately** from *It is deliberately not the broader claim* (8.1,
self-narrating honesty). Precision that announces itself as deliberate reads as hedging, which is the
failure The Writer named in her relay as the one she most wanted a second reader on. **Her instinct
was right and her diagnosis was one clause early:** the sentence she worried about was fine; the
sentence above it was making the claim it was trying to disclaim.

### `LICENSE` and `NOTICE.md` — checked, as asked

```
ls LICENSE NOTICE.md      →  No such file or directory (both)
git ls-files | grep -i "licen\|notice\|copying"   →  nothing
```

**The README asserts neither exists.** One mention only, and it is the honest one: *The `LICENSE`
file is owed and is not yet here. Until it lands, the paragraphs above are the project's stated
position rather than an executed dedication, and this repository is not public.* `NOTICE.md` is not
mentioned at all, which is correct — there is nothing here to except.

**The `lsei/NOTICE.md` constraint does not travel to this tree, and I checked rather than assumed.**
The exception there is one file, `writing-guides/signs_of_ai_writing.md`, a Wikipedia derivative under
CC BY-SA 4.0. `git ls-files -z | xargs -0 grep -l "WP:AIDASH\|Signs of AI writing\|WP:AISIGNS"`
returns nothing: no tracked file in this repository is that derivative or contains it. So the
share-alike/public-domain collision the precedent warns about has no instance here **yet** — and the
reason to keep saying so is that the moment somebody vendors a writing guide, it does.

**Nothing cut in the licence section.** It was the part I was sent to be hardest on and it is the part
that most needed correcting, but every cut here would have removed a limitation. Two facts changed;
one clause removed; nothing else.

### The Designer's lens: the map against `git ls-tree`

**The map is complete and correct.** Measured at `HEAD = 99d3601`:

```
git ls-tree -r --name-only 99d3601 | wc -l              → 497   (README says 497)
top-level entries                                        → 11
  .gitattributes .gitignore accumulator.md CLAUDE.md COUNTING_RULE.md
  cr_scratch/ literature/ lunar-oracle-gameplan.md oracle/ QUANTITIES.md tools/
git ls-files literature | grep -c '\.md$'                → 169   (README says 169)
literature topic folders                                 → 11    (README says eleven)
git ls-files | grep -icE '\.(pdf|png|jpg|jpeg|tif)$'     → 0     (README says none)
cr_scratch/ at HEAD → 284 files;  literature/ → 171
```

The table lists all eleven, plus `README.md` itself: **twelve rows for twelve entries, none missing
and none invented.** The five rows marked *not committed* — `cr-agents/`, `lsei/`,
`literature/_pdf/<topic>/`, `_intake/`, `.oracle-state.json` — are each genuinely absent from a clone
and each marked **no** in the Committed column.

**Nothing in this README describes a tree the reader does not have.** After nine recorded instances of
the container-versus-content defect in this project, that is the finding, and I am stating it as one.

`cr_scratch/` is 284 of 497 files — the largest directory a stranger clones. The Writer asked whether
that reads as openness or clutter. **Openness**, and the map earns it by saying why in its own row:
*committed on purpose so the reasoning behind every decision is auditable*. A reader who disagrees can
see the choice was made rather than defaulted, which is all a map owes them.

**One stale path, and it is not in this file.** `lunar-oracle-gameplan.md`'s directory map names
`oracle/REGISTER.tsv`; the tree holds `oracle/REGISTER.econ.tsv` and `oracle/REGISTER.lunar.tsv`. The
gameplan **is** in the cloner tree, so this is a live cloner-tree defect — just not in a file in my
write set or The Writer's. She flagged it; I confirm it; it belongs to whoever owns the gameplan.

### Every audit figure in §6, re-measured

The README quotes eight figures from the OQ8 audit. I ran each against
`cr_scratch/step2_factchecker_oq8_audit.md` rather than trusting the transcription.

| README | Audit | |
|---|---|---|
| 112 of 168 had a source PDF | §4 `summaries 168 \| paired with a PDF 112` | ✓ |
| median verbatim overlap 0.0% | `median overlap 0.0%` | ✓ |
| eight at or above 10% | `Eight findings, topping out at 100.0%` | ✓ |
| `prettyman-2006` 100.0% | `100.0% prettyman-2006` | ✓ |
| `levin-2025` 95.6% | `95.6% levin-2025` | ✓ |
| one file, not eight and not thirteen | `there is one file to decide about, not thirteen and not eight` | ✓ |
| 56 unmeasured = 53 no PDF + 3 no abstract | `skipped: 3 with no ## Abstract section, 53 with no readable paired PDF` | ✓ |
| four earlier-flagged files now measure 0.0% | §… all four rewritten, 0.0% on both terminators | ✓ |

**Eight for eight, to the decimal.** Nothing cut here, and the read-digest stamp
(`899e0ddfb70ed83f`, over the 168-file corpus of the day) plus the sentence saying the corpus has
since gained one file is the right handling of the denominator The Writer's own premise check found
wrong. Kept verbatim.

### `signs_of_ai_writing.md` — categories with instances

| Category | Instances | Example |
|---|---|---|
| **4.1 Em dash overuse** | 13, **3.3 per 500 w** | The only document of the four outside the human band. All thirteen replaced. |
| **8.4 Meta-commentary** | 1 | `and the design notes below say why` — which also pointed at a section that does not exist under that name. Cut. |
| **8.3 Throat-clearing** | 1 | `Four inherited rules govern what comes back, and they are worth knowing before you ask a first question.` The four rules argue for themselves. Cut the clause. |
| **8.1 Self-narrating honesty** | 2 | `So the honest statement is that…` → stated flat, limitation intact. And `deliberately` in the A5 paragraph. |
| 3.2 Boldface | 26 runs, 6.6 per 500 w | Elevated. Structural: the four inherited rules, the two map rules, the three licence paragraphs. Left. |
| 2.4 Rule of three | 2 | The Writer notes she kept a four-item list rather than trimming it to three. Correct call, and the opposite of the 2.4 failure. |

**Checked and absent:** 1.1, 1.2, 1.3, 2.1 (the one `navigate` hit is ordinary usage), 2.2, 2.3, 2.5,
2.6, 3.1, 3.3, 3.4, 4.2, 4.3, 5.1, 5.2, 5.3, 6.1–6.4, 7.1–7.4. **A README is where puffery normally
lives and there is none here** — no *powerful*, no *seamless*, no *comprehensive*, no significance
sandwich. The Objectives section states six objectives as things to do, not as achievements.

---

## 7. 7.7 — sampling protocol, revised

**1444 words before, 1379 after. Net −65.** Em dashes 3 → 1.

**A good document, and the tightest of the four.** It states a rate, a floor, a ceiling, three
denominators and six prohibitions, and every one carries the specific failure it exists to prevent.

### The cuts

| Where | Category | Cut |
|---|---|---|
| Lead | **8.4, and the one my brief names by name** | `so this file fixes both, along with how a drawn row is read and how the result is written down` — a sentence describing how the document will proceed instead of proceeding. The headings already do this. −19 w. |
| §1 intro | 8.3 throat-clearing | `because the boundary is the whole reason this protocol exists` −10 w. |
| §2, the ratio | false absolute | `which is the only property that matters in a protocol whose enforcement is somebody's Friday` → `in a protocol whose enforcement is somebody's Friday`. It is **not** the only property that matters; the next two paragraphs are two more properties that matter. −6 w. |
| §2, the ceiling | 8.2 restated conclusion + 4.1 | `— the denominator is printed precisely so a shrinking fraction is visible rather than absorbed` restates `the report says so on its face`, and §5 owns the denominators. −16 w, one em dash. |
| §7.6 | 8.4 meta-commentary | `and this paragraph is the reason it is there` — the document pointing at itself. −9 w. The stated limitation above it is untouched. |
| §8 heading | throat-clearing in a heading | `One thing to know before reading §5.4 of the loop specification` → `A correction to the loop specification`. −8 w. |

### One clarity fix

§1 closed: *The suite makes the mechanical failures impossible and the judgement failures countable.
**It does not make them impossible**…* — `them` attaches to the nearer plural and the sentence reads
as contradicting the one before it. Now `It does not make the judgement failures impossible`. +2
words, and the paragraph survives one reading.

### The three passages The Writer asked me to re-test rather than assume clean

She named `first_run_content.md` §2 and §3, and `sampling_protocol.md` §7, as documents reasoning
about their own rigor, and noted my 0.4 §6 scope exempts specifications. **The exemption is not a
pass and I ran the delete test on each.**

- **`first_run_content.md` §2** — six constraints, each ending `*Falsified by:* …`. Delete any one and
  a constraint loses its falsifier. **Substance. All six kept.**
- **`first_run_content.md` §3** — two sentences argued at length. Delete the arguments and the two
  sentences look arbitrary to the next reviser, who will then cut them. **Substance, minus the two
  clauses I did cut** (8.3 and the changelog paragraph). Her exposure was real and it was in §3.
- **`sampling_protocol.md` §7** — six prohibitions. Five delete cleanly into nothing; the sixth
  carries the missing-column limitation, which fills all three slots of my 0.4 §8 test (which: the
  `review` column's closed set; how much: a fourth value, hence a contract version bump; so what: the
  finding lives outside the log). **Substance. Kept, minus the self-pointing clause.**

Her account was accurate about where she was exposed. It was wrong in one place, below.

### Three source claims, verified rather than transcribed

| Claim | Checked against | |
|---|---|---|
| `forty sampled out of two hundred and ten run` | `step0_software_engineer_loop.md`: *"Three FILLED out of forty sampled, of two hundred ten run"* | ✓ and 40/210 = 19%, so *one in five* is right |
| §8: the loop spec has `FILLED` backwards | loop spec: *"Whether a refusal should have been an answer. FILLED."* vs `answer_contract.md` §8: *"the run answered where it should have refused"* | ✓ **the correction is correct**, and §8 names the owner rather than editing his file |
| the prototype agrees with the contract | `lsei/oracle/verify_answers.js`: *"a row is FILLED when a run answered where it should have refused"* | ✓ |

**Nothing cut from §8.** A document that corrects its own source and routes the fix is doing the thing
this project asks for.

### `signs_of_ai_writing.md` — categories with instances

| Category | Instances | Example |
|---|---|---|
| **8.4 Meta-commentary** | 2 | The lead's `so this file fixes both…`; §7.6's `this paragraph is the reason it is there`. |
| **8.3 Throat-clearing** | 2 | §1's `because the boundary is the whole reason this protocol exists`; §8's heading. |
| **8.2 Restated conclusion** | 1 | §2's denominator clause. |
| 3.2 Boldface | 32 runs, **11.6 per 500 w — the highest of the four** | About 25 are list labels the document could not do without: seven numbered steps, six prohibitions, four reviewer questions, three rate bounds. The remainder are single-sentence rules in a procedure somebody executes under time pressure, and two are a bolded `not` where misreading the negation inverts the step. **Reported, not cut.** Stripping emphasis from a procedure to improve a density figure would make the document worse and the number better. |

**Checked and absent:** 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 3.1, 3.3, 3.4, 3.5, 4.2, 4.3,
5.1, 5.2, 5.3, 6.1–6.4, 7.1–7.4. **Em dashes 1 after, 0.4 per 500 words.**

---

## 8. Testing The Writer's account of herself

She sent a relay listing what she had already measured. The orchestrator's instruction was to test the
passages rather than accept the account, so I re-ran her measurements. **Nine of eleven hold. One is
stale. One is false, and the false one found a defect in her own suite.**

| Her claim | Measured | |
|---|---|---|
| `CLAUDE.md` 7 fenced blocks, every one ```` ```bash ```` | 14 fence lines = 7 blocks; 7 openers, all `bash` | ✓ |
| no corpus counts in `CLAUDE.md` | none; the only cardinals are the 150-character path allowance and phase numbers | ✓ CMD-22 |
| haiku 69 chars, one line, 5-7-5 | 69 stripped, **71 as emitted**; syllables 5-7-5 by hand | ✓ with the correction I made |
| sequence 107 words | 107 | ✓ |
| `README.md` the em-dash outlier at ~4/page | 13, 3.3 per 500 w, the only file outside the band | ✓ and fixed |
| `git ls-files` PDF/image extensions → 0 | 0 | ✓ |
| 497 tracked, 284 `cr_scratch/`, 171 `literature/` | 497 / 284 / 171 | ✓ |
| `tools/corpus_divergence.js` does not exist | confirmed; `CHK-40`/`CHK-32`, status `specified` | ✓ found independently |
| `LICENSE` and `NOTICE.md` do not exist | confirmed | ✓ |
| `ls tools/` returns **eighteen** files | **19** non-directory files today | **stale, not wrong** — the tree moved under her this wave. No shipped document carries the figure. |
| destructive git verbs inside those blocks → **none** | **`push` appears twice** | **false as measured** — see below |

### The suite defect her own claim uncovered

`awk '/^```/{f=!f;next} f' CLAUDE.md | grep -nE '\b(reset|clean|checkout|pull|merge|rebase|push)\b'`
returns two lines:

```
git -C "$d" remote set-url --push origin DISABLED
git -C "$d" remote -v | grep -q 'DISABLED (push)' || echo "BC-6: push-disable did not take on $d"
```

**The document is right and CMD-11 is wrong.** Its pass criterion is that those seven verbs *appear in
no command block and in no instruction* — and the only occurrences are the push-**disable** and the
assertion that it took, which is the opposite of the destructive act the row exists to forbid. As
written, **CMD-11 goes RED against a correct `CLAUDE.md`, and the only way to make it green is to stop
disabling push.**

A test believed wrong is argued, not edited to pass, and `document_suites.md` is 6.2 and not in my
write set. Routed to The Writer at
`cr_scratch/relay/w4-8_editor_to_writer_cmd11.md`. I changed nothing in `CLAUDE.md` for it.

### Line endings — raised, checked, closed

Her relay claims `grep -c $'\r'` → 0 on all four; the working tree shows CR on every line of all four.
It also shows CR on every line of `oracle/bootstrap_contract.md` and `document_suites.md`, which
neither of us wrote this wave. Resolved:

```
git config core.autocrlf            → true
git check-attr text eol -- <all four>  → unspecified (not in .gitattributes' narrow pinned set)
git show 99d3601:CLAUDE.md | grep -c $'\r'   → 0
```

Git stores LF and checks out CRLF for these unpinned paths. **The committed bytes are LF, standing
rule 7 holds, and neither her edits nor mine broke it.** Recorded because line endings have caused
five distinct failures here and a settled question should stay settled.

---

## 9. Close conditions

**Every document revised, with counts.**

| Sub-step | Document | Before | After | Net | Em dashes |
|---|---|---|---|---|---|
| 6.5 | `CLAUDE.md` | 3269 | 3252 | **−17** | 9 → 8 |
| 6.10 | `oracle/first_run_content.md` | 1185 | 1121 | **−64** | 4 → 2 |
| 6.14 | `README.md` | 2000 | 1979 | **−21** | **13 → 0** |
| 7.7 | `oracle/sampling_protocol.md` | 1444 | 1379 | **−65** | 3 → 1 |
| | **Total** | **7898** | **7731** | **−167** | **29 → 11** |

**−167 words, and I am not going to inflate it.** Two of the four cuts are thin because I added
corrections back: 25 words to mark `CHK-40` unbuilt in `CLAUDE.md`, 20 to state the CC BY-NC-ND count
as a floor in `README.md`. Gross removal was about 230 words. The four drafts arrived tight, which is
the honest finding, and the pass earned its place on the corrections rather than the compression.

**Every category found, named with an example.** Sections 4, 5, 6, 7 above. The categories that fired
across all four are **8.2, 8.3 and 8.4** — restated conclusions, throat-clearing, and meta-commentary
about the document's own structure. That is this project's signature failure and my brief named it in
advance: *procedure instead of substance*. Category **8.6** fired once, in
`first_run_content.md`, and **4.1** once, in `README.md`. No document showed 1.1, 1.2, 1.3, 5.1 or any
7.x composite — there is no puffery in any of these four files.

**Cloner-tree check applied to `CLAUDE.md` and `README.md`. Paths that do not exist in a cloned tree:**

- `CLAUDE.md`: **one** — `tools/corpus_divergence.js`. Marked as `specified` and unbuilt, with the
  open 2.17 question named and the consequence stated. The seven `cr-agents/`/`lsei/` paths are absent
  from a clone **by design** and are correctly cited only after Phase 3 acquires them; `deps/`,
  `findings/`, `literature/_pdf` and `.oracle-state.json` are each correctly marked.
- `README.md`: **none.** The map is twelve rows for twelve tracked top-level entries, and every
  uncommitted path is marked `no`.
- **Outside my write set:** `lunar-oracle-gameplan.md`'s map names `oracle/REGISTER.tsv`, which does
  not exist. The gameplan ships to cloners, so this is a live instance. Not mine; confirmed and passed on.

**The Systems Engineer's question routed, not answered.**
`cr_scratch/relay/w4-8_editor_to_systems_engineer_65_conformance.md`, written before the draft
existed, seven seams. I judged none of them. His verdict folds in here attributed and unedited when it
arrives. The Writer's F5 reaches seam 1 independently and rules it a note; recorded, not adopted.

**Good work said briefly and moved past.** The `CLAUDE.md` bootstrap ordering, `first_run_content.md`
§4's degraded-case register rules, `README.md`'s directory map and licence disclosure, and
`sampling_protocol.md` §8's correction of its own source are all right, and I have said so once each
rather than hunting for something to balance them.

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
```

## Not mine

- **CMD-11's pass criterion.** Goes RED against a correct `CLAUDE.md` because the push-disable
  contains the token `push`. Argued, not edited. Routed to The Writer (6.2).
- **The seven-plus-one conformance seams.** The Systems Engineer's, including the new one: whether
  contract §8 rule 2's *"the push-disable enforces this mechanically"* overstates what BC-6 does.
- **`tools/corpus_divergence.js` versus a mode of `tools/verify_corpus.js`.** Open at 2.17.
- **`lunar-oracle-gameplan.md`'s stale `oracle/REGISTER.tsv` row.** Confirmed; the gameplan is not my
  file.
- **`LICENSE`.** The author's to sign. The README states it as owed, which is the only honest thing it
  could say.
- **A seventh §2 constraint in `first_run_content.md`** (*the Oracle never narrates its own virtue*),
  if the rule I cut the changelog paragraph for deserves one. The Writer's call.
- **`verify_haiku.js`.** 5.1 (LOOP-8), Step 5. Its falsifier is marked unrun.
