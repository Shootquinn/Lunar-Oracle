# Step 6 and 7 — The Writer, W4-7

**Seat:** The Writer. **Wave 4.** `HEAD = 99d3601`. Sub-steps 6.2, 6.3, 6.4, 6.8, 6.9, 6.12, 6.13,
7.5, 7.6.

Four documents in four stages each, of which stages 1 to 3 are mine and stage 4 is not. The outlines
are in this file so the discipline is checkable rather than claimed: every one of them was written
before its document and validated against a suite, and where the suite did not exist yet I say so and
name what I validated against instead.

## 0. Premise check

Six claims in the brief. I measured all six before writing a word. Five hold. One is wrong by a
denominator.

| # | Brief's claim | Measured | Verdict |
|---|---|---|---|
| P1 | `CLAUDE.md` is a provisional seed-time stub that says so in its own header | `CLAUDE.md` L3–L6 carries the `PROVISIONAL` block naming itself a session-recovery stub | **holds** |
| P2 | The working-copy policy in the stub is live and must survive | `.gitignore` L152 ignores `/.oracle-state.json`; both copies present; `git -C lsei remote -v` and `git -C cr-agents remote -v` show `DISABLED (push)`; contract §8 rules 1, 2, 6 | **holds** |
| P3 | `cr-agents/CLAUDE.md` is the precedent for a bootstrap file of this kind | Read in full: 20 lines, four numbered read-sequence entries, a first-session clause, two method documents with an active/inactive verdict each. It is the shape and not the content | **holds** |
| P4 | The OQ8 audit found one file needing a decision, not thirteen | `cr_scratch/step2_factchecker_oq8_audit.md` §6: "there is one file to decide about, not thirteen and not eight: `prettyman-2006`" at 100.0%, with `levin-2025` at 95.6% a step behind | **holds** |
| P5 | 56 of 169 summaries could not be measured | The audit measured **56 of 168**, at read-digest `899e0ddfb70ed83f`, over a corpus that held 168 files. The corpus holds **169** today at read-digest `2ce308c6a5640f8f`. Different populations at different digests | **wrong denominator** |
| P6 | `oracle/bootstrap_contract.md` is the specification and `CLAUDE.md` is the bug where they disagree | The contract's own preamble states exactly this | **holds** |

**P5, and what I did about it.** The audit's own §4 is explicit — *56 of 168* — and its §4 already
refuses to reconcile a similar mismatch, where accumulator row A6 states the population as 57 against
a measured 50. Writing "56 of 169" into the README would create a third figure for the same fact and
attribute it to an audit that never made that claim. The README states the audited figure with its
population and its date, and states separately that the corpus has since grown by one file, so a
reader can see that the unmeasured count is a floor rather than a current measurement.

```
Command: node -e "<walk literature/**/*.md, sha256 over sorted path/size/mtimeMs, first 16 hex>"
Result:  literature/**/*.md count 169  read-digest 2ce308c6a5640f8f
Folders: 11. 22+14+28+12+18+9+17+8+5+26+10 = 169.
```

## 1. Findings against the contracts

Stated rather than written around, per the close condition. Four. None is mine to fix and each names
its owner.

**F1. `BC-10`'s command cell omits `--prune`, and the currency policy requires it.**
`oracle/bootstrap_contract.md` §4 group 2 gives `git -C <copy> fetch --quiet origin`.
`oracle/currency_policy.md` §4 gives `git -C <copy> fetch --quiet --prune origin` and states the
measurement behind it: without prune, a branch deleted upstream keeps resolving from a stale tracking
ref, and the comparison returns a clean verdict against a branch that does not exist. The same section
requires a forced refspec, without which the policy's own `withdrawn` verdict is unreachable. I wrote
`CLAUDE.md` to the currency policy and asserted it at CMD-10, because a bootstrap that fetches without
prune produces a report the policy calls a fiction. **Owner: The Systems Engineer.** The fix is one
cell of BC-10 and a contract version bump under §10.

**F2. `oracle/install_state.md` §9 shows a three-column `oracle/VERIFIED.tsv` with a `# copies=2`
header. The file on disk has five columns, a `# rows=5` header, and three `lsei` rows.**
`oracle/currency_policy.md` §3 is the live specification and the file conforms to it: append-only,
one row per bump, `copy`/`ref`/`bumped_at`/`direction`/`note`, and the current verified ref for a copy
is the ref of the **last** row for that copy. §9's fenced example is a sketch taken before 1.6 ran and
it now teaches a reader the exact misreading currency policy §3 names as its falsifier — take the
first `lsei` row and you read `c8274e6` and report three of this project's own pushes as an upstream
move. `CLAUDE.md` states the last-row rule; CMD-13 asserts it. **Owner: The Systems Engineer**, whose
file it is. The fix is deleting the fence or replacing it with the live one.

**F3. The gameplan's directory map names `oracle/REGISTER.tsv`. The tree holds
`oracle/REGISTER.econ.tsv` and `oracle/REGISTER.lunar.tsv`.** The map's row is stale by one split.
The README's directory map is written against the tree as measured, not against the map, and says so.
**Owner: the map is the author's ruling and the gameplan is the orchestrator's file.** Not mine to
edit; flagged.

**F4. The contract's Phase 6 read sequence does not include `CLAUDE.md` itself, and the seed stub's
did.** The stub lists four documents beginning with itself; the contract lists three, beginning with
the method guide. These are not in conflict — the contract's sequence is what the bootstrap performs
*after* the session has already read `CLAUDE.md`, since reading it is how the session learned to
bootstrap at all. I wrote it the contract's way and said so in one clause, because a session that
finds its own file listed inside a sequence it is currently executing has a small puzzle to solve
before it can start. **No owner; this is a note, not a defect.**

## 2. Sub-step 6.2 — the `CLAUDE.md` document test suite

Landed at `oracle/tests/document_suites.md`, group `CMD`, twenty-four rows. It is a TDD deliverable
and is declared as such in the ledger.

**How it stays out of 6.1's way.** 6.1 asserts behaviour by construction: rename `lsei/` and assert
the session refuses a quantitative question, point `origin` at an unreachable URL and assert the
offline path reports rather than falls back. Every row of `CMD` is instead a read of one document. The
boundary I used is a single question — *could this row pass against a correct bootstrap and a wrong
`CLAUDE.md`?* If yes it is mine; if no it is 6.1's. CMD-8 is the clearest case: a bootstrap that
disables push every session passes 6.1 while a `CLAUDE.md` whose only `set-url` line sits inside the
clone branch teaches the next session to reintroduce E7.

**The four rows that exist because the document can lie in a way the behaviour cannot.** CMD-6, the
blocking set stated as three named modes rather than as "fully succeeded" — the contract records that
the earlier phrasing acquired its defect precisely by being a judgement. CMD-14, the drift verdict
sets **not** restated — a copy of a closed set is a set that drifts, and `CLAUDE.md` is the likeliest
place for the copy. CMD-18, no line of the opening sequence inlined — Phase 7 separates mechanism from
content and a document holding both is a second authority on the content. CMD-22, no corpus count —
the file every session reads first is where a stale number lives longest.

**One row is a human gate and is marked `H`.** CMD-24 asks whether a stranger can act on the document
in one reading. No `grep` reaches it, and marking it green would be a claim that the suite had looked.

## 3. Sub-step 6.3 — `CLAUDE.md`, the topic-sentence outline

**Validated against `CMD-1` through `CMD-24`.** The mapping is in §3.2 and every row lands in exactly
one section.

**Structure: LD, lead then development,** from `structure.md`'s four. Not OCAR, and the reason is the
reader. A session may stop reading at any line — it is compaction-recoverable, it may be resumed
mid-file, and it acts on what it has read so far. LD is the shape for a reader who may stop at any
point: everything essential in the first sentences, then the detail. OCAR would put the bootstrap's
justification before its commands, and a session that stopped early would have the reasoning and none
of the procedure.

**Register: formal, and chosen rather than defaulted.** `style.md` permits the formal register where
the job is to transmit information and stay offstage, and this is that document. The one exception is
§1's lead, which is framing and takes the middle register, because a session that does not understand
*what the Oracle is* will implement a search engine.

### 3.1 The outline, one topic sentence per section

Each line below is the section's opening sentence as it will be written, not a label for it.

**§0 — the lead, before any heading.**
> Lunar Oracle answers questions about lunar industrialisation from a merged literature corpus and
> from the Lunar Scenario Explorer, and the thing that answers them is this Claude session reading
> this repository under `oracle/answer_contract.md`.

*Second sentence:* You are the Orchestrator; the team is the Collaborative Reasoning method's, cloned
below. *Third:* This file implements bootstrap contract version 2, and where this file and that
contract disagree the contract is the statement and this file is the bug.

**§1 — Bootstrap: seven phases, every session.**
> Run all seven phases before answering anything, and run phases one through six every session
> whether or not a previous session already ran them.

*Development:* the idempotence claim in the contract's own falsifying terms; the sentence naming the
mistake the ordering exists to prevent — gating on the first-run flag, under which a working copy
deleted last Tuesday is never noticed again.

**§1.1 — Phase 1, Locate.**
> Find the repository root by searching upward from the working directory for
> `lunar-oracle-gameplan.md`, and abort if it is not there.

**§1.2 — Phase 2, Preflight.**
> Record four facts and act on none of them.

*Development:* the four, and which later phase consumes each. The one that ends the phase is `git`.

**§1.3 — Phase 3, Acquire.**
> Clone a working copy only if it is missing, into the repository root, and never into `deps/`.

*Development:* the allowance gate, and the three outcomes of a failed clone. This section contains no
`set-url` and no `fetch`, which is CMD-8's whole assertion.

**§1.4 — Phase 4, Verify.**
> Assert every one of these whether or not anything was cloned, because a successful clone is not
> evidence that the paths this project reads exist.

*Development:* four groups in order — configuration, currency, content, shelves — with the commands.
The content group's rule stated once: every assertion here looks for a marker inside a file, because a
path check passes against an empty file, a truncated download and an error page.

**§1.5 — Phase 5, Record and report.**
> Read `.oracle-state.json`, write the four facts it holds, and print the report in the contract's
> order.

*Development:* the three abnormal reads; the report's eight positions named, not reproduced; the rule
that a terse report does not become chattier when degraded, it adds lines.

**§1.6 — Phase 6, Read sequence.**
> Read three documents in this order, and name in the report any one of them that is not there.

**§1.7 — Phase 7, First run.**
> Play the opening sequence once per install, only when the first-run flag is unset and no blocking
> mode is in force, and take its text from `oracle/first_run_content.md`.

*Development:* the three blocking modes named; the status line as a separate plain line after the
sequence; the flag set only on completion; a second machine plays again and that is correct.

**§2 — Outcomes and modes.**
> A run ends as exactly one of `ABORT`, `DEGRADED` or `CLEAN`, and an `ABORT` names the phase and the
> assertion that produced it.

*Development:* what `ABORT` does and does not claim about a run that got as far as Phase 5. The five
modes as a set rather than a scalar. The three that block the first run.

**§3 — What this never does.**
> Seven things are prohibited outright, and each is prohibited because somebody will propose it as a
> convenience.

*Development:* the seven, compressed, each keeping its reason. The destructive-verb rule stated as a
sentence a session can check itself against.

**§4 — Method documents.**
> TDD is always active and LLM-PLM is not.

**§5 — When this file is wrong.**
> Correct this file rather than the contract, and say so in the sub-step that does it.

### 3.2 Validation: every `CMD` row against the section that carries it

| Row | Section | How the section satisfies it |
|---|---|---|
| CMD-1 | §0 | The lead's third sentence names the integer |
| CMD-2 | §0 | Same sentence; the decoy is a mutation of the contract, not of the outline |
| CMD-3 | §1.1–§1.7 | Seven subsections, in order, each headed by its contract name |
| CMD-4 | §2 | The three outcomes, and §2 enumerates nothing else in that position |
| CMD-5 | §2 | The topic sentence carries the `ABORT (<phase>, <assertion-id>)` requirement |
| CMD-6 | §1.7, §2 | The three blocking modes are named in §1.7's development and again in §2 |
| CMD-7 | §0, §5 | Stated at the lead and again as the closing section |
| CMD-8 | §1.3 | The section is written to contain no `set-url` and no `fetch` |
| CMD-9 | §1, §1.4 | §1's topic sentence carries "every session"; §1.4's repeats it in the falsifying form |
| CMD-10 | §1.4 | The currency group's command, written to `currency_policy.md` §4 |
| CMD-11 | §3 | The destructive-verb prohibition is one of the seven |
| CMD-12 | §3 | Vendoring is the first of the seven and keeps its reason |
| CMD-13 | §1.4 | The currency group names `oracle/VERIFIED.tsv` and the last-row rule |
| CMD-14 | §1.4 | Satisfied by omission: the section names the policy and enumerates neither verdict set |
| CMD-15 | §1.6 | The three entries in order |
| CMD-16 | §1.6 | The exception is on the `prompt0.md` line only |
| CMD-17 | §1.6 | The topic sentence carries it |
| CMD-18 | §1.7 | The section names the content file and quotes nothing from it |
| CMD-19 | §1.7 | In the development |
| CMD-20 | §1.7 | In the development |
| CMD-21 | §1.1–§1.4 | Every fenced block is labelled `bash`, and the shell is named once at §1 |
| CMD-22 | all | Satisfied by omission across the whole document; checked as a pass of its own |
| CMD-23 | all | Checked as a pass of its own after drafting |
| CMD-24 | all | The human gate; LD is the structure chosen to make it passable |

**Two rows are satisfied by omission and that is a weakness of this outline, not a strength.** CMD-14
and CMD-22 cannot be validated against an outline, because an outline cannot show the absence of a
sentence it never planned to write. Both were checked against the finished draft as a separate pass,
and the result is in §4.

## 4. Sub-step 6.4 — `CLAUDE.md`, written, and the checks I ran on it

Landed at `CLAUDE.md`, replacing the seed stub. Structure as outlined; nothing moved between §3.1 and
the draft except the merge of §1.5's report positions into one sentence, which the outline had as a
list and which reads better as a run.

**Checks run against the draft.** Commands and results, so the Editor at 6.5 starts from a measured
state rather than from my word for it.

```
grep -c $'\r' CLAUDE.md                         → 0        (LF only, standing rule 7)
grep -n '^```' CLAUDE.md                        → 7 blocks, every opening fence reads ```bash   (CMD-21)
awk '/^```/{f=!f;next} f' CLAUDE.md
  | grep -E 'git (reset|clean|checkout|pull|merge|rebase|push)'
                    → no match. **THIS LINE WAS WRONG AND IS CORRECTED AT §12.**
                      The command I ran is narrower than the condition CMD-11
                      states. Run as written, the row goes red. See §12
grep -niE "summar|source|folder|persona" CLAUDE.md
                                                → 5 hits, none a count             (CMD-22)
```

**CMD-23, and the one row whose criterion I wrote too narrowly.** Every path token in the draft was
resolved against the tree. Sixteen resolve. Six do not, and they fall into three kinds:

| Token | Why it does not resolve | Kind |
|---|---|---|
| `oracle/first_run_content.md` | written at 6.9, this sitting | resolves on landing |
| `README.md` | written at 6.13, this sitting; and the draft's use of it is hypothetical — *a `literature/` holding only a `README.md`* | resolves on landing |
| `prompt0.md` | a bare filename in a sentence about `cr-agents/prompt0.md`, which resolves two lines above | artifact of my grep, not of the document |
| `deps/` | named in a **prohibition**: clone to the root, never into `deps/` | reference, not instruction |
| `findings/` | the draft states in its own words that this shelf is permitted to be absent | reference, and the document marks it |
| `tools/corpus_divergence.js` | named by `oracle/bootstrap_contract.md` §7.2 as what the bootstrap dispatches. **It does not exist.** See F5 | contract names an unbuilt artifact |

**CMD-23's criterion admits three cases and needed a fourth: a path named in a prohibition or a
hypothetical.** I have not edited the row. A test believed wrong is argued, and this is the argument:
the row's purpose is to catch a document that tells a session to read or write something that is not
there, and a sentence saying *never clone into `deps/`* does neither. The correction is one clause and
it belongs to whoever runs the row, not to the person whose document it just failed. **Owner: The
Software Engineer at the suite wiring; relayed.**

**F5, found by running CMD-23.** `oracle/bootstrap_contract.md` §7.2 states that the bootstrap
dispatches `tools/corpus_divergence.js` and prints what comes back, and names two check-register rows
that consume it. `ls tools/` returns eighteen files and that is not one of them. The contract is
correct to specify it and `CLAUDE.md` is correct to name it; what is missing is the script. I wrote
the phase to dispatch it as specified rather than quietly dropping the line, because a `CLAUDE.md`
that omits the dispatch makes the gap invisible at exactly the moment somebody could close it.
**Owner: The Systems Engineer or The Software Engineer**, whichever the corpus-fork row belongs to.

## 5. Sub-step 6.8 — the first-run sequence, beat outline

**Validated against what 6.7 is specified to assert, because 6.7 has not landed.** The Software
Engineer writes it this wave and I am not waiting on a barrier. The three assertions are fixed in
`cr_scratch/step0_integration_draft.md` row 6.7 — the haiku contract holds with no linebreaks, the
sequence plays once and only after a fully successful bootstrap, and no team-register prose leaks into
it — and in `step0_software_engineer_loop.md` §4.2, which fixes `verify_haiku.js` at three assertions:
5-7-5 by a stated rule, zero newline characters, and no claim-bearing token. I validated against those
five. **If 6.7 lands an assertion outside them, this outline was validated against an incomplete
suite and the gap is mine to close, not The Editor's to absorb.**

### 5.1 The beats

Three, from the 0.4 register specification §3.1, under one hundred and twenty words, exactly one
haiku, under ten seconds to read.

1. **Who is speaking, demonstrated rather than announced.** The haiku comes first, so the user meets
   the convention instead of being told about it.
2. **What it will refuse, stated as a capability.** The hard beat.
3. **The invitation.** One line, then it stops and waits.

### 5.2 Beat by beat, with the sentence that carries each

**Beat 1.** The haiku, unchanged from 0.4 §3.4: *a cold room, a lamp, the papers already stacked; ask,
and I will read.* Sixty-nine rendered characters, which clears the eighty-column wrap that would make
a haiku look like a haiku with a linebreak in it. No numeral, no unit, no source, no grade word, no
hedge.

**Beat 2, first half — what the haiku is for.** *I answer in haiku, and a haiku cannot hold a number,
so mine will tell you how your question went and never what the answer is.* Then: the answer itself
arrives underneath, written flat by people who do not rhyme.

**Beat 2, second half — the two refusals.** *When the thing you asked about has not been measured, I
will say so and name what stands nearest to it. When it is outside what this project will speak to, I
will say that instead.* Then the load-bearing pair: *Both happen often. Neither is a malfunction.*

**Beat 3.** *Ask.*

### 5.3 Two changes to the 0.4 draft, and why each is a correction rather than a preference

**The joke was false, and the outline is where I noticed.** 0.4 §3.4 reads *a haiku cannot hold a
number, so the haiku will never tell you anything.* That contradicts §1.1 of the same document, which
establishes the haiku's entire job: **the haiku reports the disposition of the turn** — computed, read
out of the papers, contested, refused by right, refused for want of evidence — and §1.1 says in its
own words that this "is real information." A user told on first contact that the haiku never tells
them anything will not read it for disposition, and §1.4's mood rule, the image families, and the
whole apparatus that keeps a refusal from sounding like an answer are then apparatus nobody consults.
The repair keeps the joke and makes it true: the haiku tells you *how the question went*, never *what
the answer is*. Same length, same rhythm, and it teaches the reader to use the channel instead of to
ignore it.

**Beat 2 named one refusal family and there are two.** 0.4 §1.4 separates them deliberately and says
why: a declared boundary and a thin corpus mean opposite things to a user, and a single generic
refusal mood collapses them so that the user learns nothing from either. The 0.4 draft's beat 2
covers only the thin corpus. A user who meets the boundary refusal first has been told nothing about
it, and it reads as the malfunction beat 2 exists to prevent. The second sentence costs seventeen
words against a budget with room for them.

### 5.4 Validation against the five assertions

| Assertion | Where it is satisfied | How I checked |
|---|---|---|
| Zero newline characters in the haiku | Beat 1 is one line | byte count of the haiku line; no `\n` inside it |
| 5-7-5 | Beat 1 | `a-cold-room-a-lamp` 5, `the-pa-pers-al-rea-dy-stacked` 7, `ask-and-I-will-read` 5 |
| No claim-bearing token | Beat 1 | no numeral, no unit token, no coefficient name, no named source. The word `number` is the subject of beat 2's prose, not a quantity, and it is not in the haiku |
| Plays once, only after a fully successful bootstrap | not content | Phase 7's gate, `CLAUDE.md` §1 Phase 7 and 6.6. The content file states the dependency and specifies nothing about it |
| No team-register prose | throughout | first person, one image, no trace line, no grade word, no citation, no heading structure. The team's register has a trace convention and this has none, which is the structural difference rather than a tonal one |

**One assertion I cannot satisfy from the content side and say so rather than claiming it.** *Plays
once* is a property of the mechanism. The content file can be replayed safely — it says nothing like
*welcome back*, references no prior state, and is one turn and one emission — but nothing in the text
makes it play once. That is 6.6's, and the content file names the dependency instead of pretending to
carry it.

## 6. Sub-step 6.9 — the first-run sequence, written

Landed at `oracle/first_run_content.md`. The sequence itself is §1 of that file and is one hundred and
seven words; everything after §1 is the maintenance apparatus and is never emitted. The file says so
in a sentence written for a checker rather than for a reader, because a suite hunting team-register
prose inside the sequence will otherwise find §2 and be right to.

Measured after drafting:

```
haiku rendered length            → 69 characters, one line, no newline inside it
sequence word count              → 107   (budget: under 120)
grep -c $'\r'                    → 0
```

## 7. Sub-step 6.12 — `README.md`, the topic-sentence outline

**Validated against the four assertions 6.11 is specified to make**, relayed by the orchestrator while
this sitting was running: the suite asserts orientation claims rather than style; the dedication
covers this project's own summaries and **cannot** cover the sources they describe; the Scenario
Explorer's sentence *"No third-party PDF, page image or extracted source text is in this repository"*
is **not** copied, because it is not true of our corpus either; and the reader throughout is a
stranger who cloned the repository.

**Structure: LDR, and the reason is that this reader arrives with a question already formed.** She has
a directory on her disk and wants to know what it does and whether to keep it. OCAR would make her
read the project's motivation first. LD alone would drop her after the orientation, and the licence
and the corpus's honest state are the two things she most needs and would never reach. Lead,
development, resolution: what it is, what is in it, and what she may do with it.

**The hard constraint on this document is that a stranger cannot check anything.** Every claim in the
README is one she takes on trust or verifies by running something. So every count carries its date and
its rule, and every claim that a check enforces names the check.

### 7.1 The outline, one topic sentence per section

**§0 — the lead, before any heading.**
> Lunar Oracle answers questions about lunar industrialisation from a merged literature corpus and
> from a working model of lunar ISRU economics, and the thing that answers them is a Claude Code
> session reading this repository.

*Development:* there is nothing to install and nothing to run; the answer comes back as a haiku plus a
flat traced deliverable, or as a refusal that says why.

**§1 — Running it.**
> Clone this repository, open Claude Code in it, and let `CLAUDE.md` bootstrap the session.

*Development:* what must already be on the machine, and the two working copies the bootstrap clones
and never pushes to.

**§2 — What it answers, and what it refuses.**
> Every question is classified before anything is retrieved, and the classification decides which of
> six verdicts the answer carries.

*Development:* the app wins outright over a summary that happens to carry a number; a missing input is
a refusal rather than a fallback; a trace says which grade it is. This is the section that sets the
stranger's expectations, and understating it here is what makes a first refusal read as a fault.

**§3 — What is in this repository.**
> The tree a fresh clone gets is this, and the two largest directories are the corpus and the agent
> handoffs that produced it.

*Development:* the map as corrected at 1.1, including the three rows that map lacked — the
machine-written install state file, the source-PDF store that never ships, and the exit criterion on
`_intake/` — and the non-row: no path outside this repository and its two working copies is read at
runtime.

**§4 — The corpus.**
> `literature/` is this project's own summaries of published work, merged from two prior corpora and
> filed in eleven topic folders.

*Development:* what a summary is and what it is not; provenance; the count with its date, its rule and
its read-digest; and what a clone does **not** get.

**§5 — What the corpus audit found, stated before anybody asks.**
> One summary reproduces a published abstract in full and is awaiting a decision, and a third of the
> shelf has never been tested at all.

*Development:* the figures with their population and their date, and the reason the second sentence
exists — the audit is complete over the summaries whose sources are on disk and has never been
attempted on the rest.

**§6 — What this project set out to do.**
> Six objectives, of which the corpus merge is the one everything else waits on.

**§7 — Licence.**
> This project dedicates its own writing to the public domain and cannot dedicate the published work
> that writing describes.

*Development:* what the dedication covers; what it cannot reach and why; what is true of this tree
regarding third-party text, stated in our own words rather than borrowed; and the file that is still
owed.

### 7.2 Validation against the four assertions

| Assertion | Section | How it is satisfied |
|---|---|---|
| Orientation rather than style | §0–§4 | Every section answers a question a stranger with the directory on her disk actually has. No section is about the project's own care |
| The dedication covers our summaries | §7 | Named explicitly: the summaries, the contracts, the tools, the gameplan, the handoffs |
| It **cannot** cover the sources those summaries describe | §7 | Stated as an incapacity rather than a choice, with the mechanism — each summary identifies its source by citation and DOI, and the reader reaches the original through its publisher. Two of the sources our summaries describe carry `CC BY-NC-ND`, which is recorded in the summaries themselves and which nothing here could dedicate away |
| A5's sentence is not copied | §7 | It appears nowhere. §7 states instead what is true of this tree — zero PDFs, page images or source text are committed, verified by `git ls-files` — and then states the one place third-party text **is** present, which is the fact that made the borrowed sentence false in its original home |

### 7.3 A finding this outline produced: the licence file does not exist

There is no `LICENSE` in this repository, and no `NOTICE.md`. The Scenario Explorer's README opens by
naming the Unlicense "stated in full at `LICENSE`", and copying that shape here would put a claim in
the README that a `ls` refutes in one second — for a reader whose only means of checking anything is
to run `ls`. §7 states the dedication as the project's position and names the file as owed before the
public release gate at 6.15, which is where the irreversible act happens and where the gap has to be
closed. **Owner: the author; the file is his to sign.** Neither `LICENSE` nor `NOTICE.md` is in my
write set and I have created neither.

## 8. Sub-step 6.13 — `README.md`, written

Landed at `README.md`. Seven sections, in the outline's order.

Two claims in it were measured rather than assumed:

```
git remote -v                              → origin https://github.com/Shootquinn/Lunar-Oracle.git
                                             (the clone line names the real remote and its real case)
git ls-files | wc -l                       → 497 tracked files at HEAD 99d3601
git ls-files | grep -icE '\.(pdf|png|jpg|jpeg|gif|tif)$'
                                           → 0  (the licence section's "no PDF or page image is
                                              committed" claim, verified rather than asserted)
grep -n check_no_sources oracle/check_register.md
                                           → CHK-13, pre-commit, block, live
                                             (the "a committed check fails the commit" clause)
```

**Where the licence section departs from its precedent, and why that is the point.** `lsei/NOTICE.md`
carries one named exception to a public-domain dedication, because one vendored file is CC BY-SA and a
share-alike licence and a public-domain dedication cannot both govern the same file. This repository
vendors no such file — `grep -rl "CC BY-SA\|share-alike\|Creative Commons"` over the tree, excluding
both working copies, returns three summaries, and all three are recording the **source paper's** own
licence inside a citation block rather than carrying a licensed file. So the dedication here needs no
exception clause, and inventing one to match the precedent would be a notice about nothing.

What the sources do carry matters and is in §7: two of those three describe papers published under
`CC BY-NC-ND`. That is the concrete form of the assertion that our dedication **cannot** reach the
works our summaries describe. It is not a policy choice we could revisit.

## 9. Sub-step 7.5 — the sampling protocol, topic-sentence outline

**Validated against what 7.4 is specified to assert** — *what Level 3 cannot assert automatically, and
what a human read of a sampled answer is checking* — and against `oracle/answer_contract.md` §8, which
already fixes the two columns, the three denominators, and the rule that `FILLED` is never
machine-assignable. 7.4 had not landed when I wrote this.

**Structure: LDR.** The reader is the person who will run the sample, and the lead has to be the thing
they do rather than the reason it exists. Development is the four decisions the protocol makes — rate,
draw, what is being checked, how it is written down. Resolution is what the protocol never does, which
is where the failures live.

### 9.1 The outline

**§0 — lead.**
> A sampled human read is the only mechanism that reaches the three things the test suite cannot, and
> a sample without a stated rate and a stated denominator is a story rather than a measurement.

**§1 — What the suite cannot reach.**
> Three failures survive a fully green suite, and no amount of suite design reaches them.

**§2 — The rate.**
> Sample one run in five each week, never fewer than five and never more than forty.

**§3 — The draw.**
> Draw proportionally by verdict, then add one row for every verdict the week produced and the
> proportional draw missed, and keep the two sets apart in the report.

**§4 — What the reviewer is checking.**
> Open the deliverable, open every locator it names, and answer four questions in a fixed order.

**§5 — The three denominators.**
> Report the result as `F FILLED out of R reviewed, of N run`, and never as a count.

**§6 — Writing it down.**
> The `review` column is written by a person, one row at a time, and everything that does not fit in
> that column goes in the report rather than into the log.

**§7 — What this protocol never does.**
> Six prohibitions, each of which would turn the measurement back into a story.

### 9.2 Validation

| What 7.4 is specified to assert | Section | How |
|---|---|---|
| What Level 3 cannot assert automatically | §1 | The three, quoted from `step0_software_engineer_loop.md` §5.4 rather than paraphrased |
| What a human read is checking | §4 | Four questions in a fixed order, each with the artifact the reviewer opens to answer it |
| The rate | §2 | One in five, floor five, ceiling forty, each bound with the failure it prevents |
| The denominator | §5 | Three, all countable from the log's two columns per contract §8 |
| The annotation procedure | §6 | Seven steps, and the one row-level value a person may write |

### 9.3 F6 — the source document states `FILLED` backwards

`cr_scratch/step0_software_engineer_loop.md` §5.4 item 2 reads: *"Whether a refusal should have been
an answer. FILLED."* That is the opposite of what `FILLED` means everywhere else it is defined.

- `oracle/answer_contract.md` §8: *"`FILLED` — A person read it and the run **answered where it should
  have refused**."*
- `lsei/oracle/verify_answers.js` lines 16–19, the inherited prototype: *"a row is FILLED when a
  question that should have refused instead reached for an inference."*

The contract is version 2 and states in its own preamble that every mechanism, suite and check in this
project is written against it, and the prototype agrees with the contract. **I wrote the protocol to
the contract.** §5.4 is a Step 0 handoff and correcting it is not mine, but it is the document 7.4 and
7.6 were both told to read, and a suite written from it would define the annotation backwards.
**Owner: The Software Engineer**, whose file it is; relayed.

**The gap this exposes, which is larger than the typo.** Over-refusal — the system refusing where it
should have answered — has **no value in the `review` column at all**. That column is closed at three:
`unreviewed`, `confirmed`, `FILLED`. A reviewer who finds an over-refusal can only mark the row
`confirmed`, which is false, or leave it `unreviewed`, which is also false. Extending the column is a
row-schema change and therefore an answer-contract version bump, and it is not mine to take. The
protocol therefore records over-refusal in the sampling report as a named finding with the row's
timestamp, and §7 says in as many words that this is a workaround for a missing column rather than a
design. **Owner: The Software Engineer or whoever holds contract §8.**

## 10. Sub-step 7.6 — the sampling protocol, written

Landed at `oracle/sampling_protocol.md`. Eight sections, in the outline's order.

**The three decisions the outline left open, and the reasoning behind each number.**

**Rate: one in five, floor five, ceiling forty.** The ratio is the loop specification's own working
figure — forty sampled out of two hundred and ten run — and it is a rate one reviewer can sustain,
which is the only property that matters in a protocol enforced by somebody's Friday. The floor stops a
quiet week from producing a proportion that is really an anecdote: one in five of twelve runs is two
rows. The ceiling stops the protocol lying in the other direction, because a reviewer asked for eighty
careful reads gives a rubber stamp instead.

**The draw is stratified and the strata are reported separately.** `LITERATURE` dominates by volume
and `CONTESTED` is where the anti-synthesis rule can fail with nothing mechanical noticing, so a purely
proportional draw over a normal week can miss every `CONTESTED` row there was. The top-up fixes that
and creates a second problem immediately: a deliberately over-sampled class folded into the rate moves
it by an amount nobody can recover afterwards. **So the protocol reports two numbers.** The
proportional rows estimate a rate; the top-up rows are read for defects and counted.

**An unreviewable row is not replaced.** A drawn row whose deliverable file is gone reduces the
reviewed denominator and stays `unreviewed`. Replacing it biases the sample toward rows whose files
survived, and file survival is not independent of anything.

## 11. Close conditions

| Sub-step | Deliverable | Outlined first | Close |
|---|---|---|---|
| 6.2 | `oracle/tests/document_suites.md`, group `CMD`, 24 rows | n/a, it is the suite | **met** |
| 6.3 | §3 above, one topic sentence per section, mapped row by row | n/a | **met** |
| 6.4 | `CLAUDE.md` | §3 | **met**, with F1 to F5 stated rather than written around |
| 6.8 | §5 above, three beats, validated against five assertions | n/a | **met** |
| 6.9 | `oracle/first_run_content.md` | §5 | **met** |
| 6.12 | §7 above | n/a | **met** |
| 6.13 | `README.md`, licence statement included | §7 | **met** |
| 7.5 | §9 above | n/a | **met** |
| 7.6 | `oracle/sampling_protocol.md`, rate, denominator, annotation | §9 | **met** |

**Clause-by-clause conformance of `CLAUDE.md` to `oracle/bootstrap_contract.md`.** Every phase, every
terminal outcome, all five modes and all three blocking modes, the seven never-does rules, and the six
seams the orchestrator routed. Two clauses are implemented **against** the contract as written, and
both are stated in §1 rather than absorbed: F1, the fetch carries `--prune` because the currency
policy requires it and BC-10's cell does not; and F3, Phase 5 dispatches a script the contract names
and the tree does not hold.

**Regression check, after all four documents landed.**

```
node oracle/tests/run_suite.js      → 455 rows, 33 pass, 4 fail, 418 unrun, exit 0
                                      the 4 are the standing failures argued in af7abec, untouched
node tools/check_registers.js       → 0 hard failures @ f92acf6936b5417d
node tools/verify_corpus.js         → 39 OK, 1 FAIL (PTH/A3, standing), 1 VACUOUS, 6 REPORT
node tools/quantities.js --check    → 5 hard failures, unchanged; no site in any file I wrote
line endings, all six new files     → LF, zero CR
```

## Not mine

- **`LICENSE` and `NOTICE.md`.** Neither exists. `README.md` §7 states the dedication as the project's
  position and names the file as owed before the release gate at 6.15. The author signs it.
- **`tools/corpus_divergence.js`.** Named by `bootstrap_contract.md` §7.2 and by two check-register
  rows; not in `tools/`. `CLAUDE.md` Phase 5 dispatches it as specified.
- **BC-10's command cell**, `oracle/install_state.md` §9's stale fence, and the gameplan map's
  `oracle/REGISTER.tsv` row. Three other seats' files; all flagged in §1 and relayed.
- **`step0_software_engineer_loop.md` §5.4's inverted `FILLED`**, and the missing fourth `review`
  value that would let an over-refusal be recorded at all. The Software Engineer's; relayed.
- **`oracle/tests/run_suite.js`'s `SUITES` constant**, which does not name the third suite file. The
  Software Engineer's; relayed.
- **Stages 6.5, 6.10, 6.14 and 7.7.** The Editor, The Designer and The Systems Engineer. Relayed at
  `cr_scratch/relay/w4-7_to_editor_designer_systems_engineer.md` with what I want checked and what I
  already measured.
- **6.1, 6.6, 6.7, 6.11, 7.4.** Other seats, this wave. Where a suite of theirs had not landed I
  validated against the assertions their sub-step rows specify, and said so in the outline that did it.

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +24/-0
```

The 24 tests are the `CMD` group of `oracle/tests/document_suites.md`, the sub-step 6.2 TDD deliverable
written before `CLAUDE.md` existed. They are the exception the standing block names and are not freeze
spend. Two existing quantity tags are quoted in that file, `Q-BOOTSTRAP-PHASES` and
`Q-BLOCKING-MODES`; neither is new and `--check` reports no site in it.


## 12. W4-8 repair pass

Three defects, all in my own write set, all found by somebody testing my account instead of accepting
it. Recorded here because the wave's own rule is that a measurement nobody re-ran is a claim.

### 12.1 CMD-11 was wrong, and the way it was wrong pressured a safety control

The Editor re-ran my *destructive git verbs → none* line and it is false. `push` occurs twice in
`CLAUDE.md`'s fenced blocks, both times in BC-6 — the push-disable and the assertion that it took.

**Before:** *`reset`, `clean`, `checkout`, `pull`, `merge`, `rebase`, `push` appear in no command block
and in no instruction.*

**After:** no line matches the destructive-invocation pattern, which tests for the verb in git
**subcommand position**:

```
(^|[^[:alnum:]_-])git( +-C +[^ ]+)? +(reset|clean|checkout|pull|merge|rebase|push)([ ]|$)
```

**Why this is a repair and not a relaxation.** The old row's only green path was to stop disabling
push. A check row whose sole satisfying document is a broken one does not test a document, it applies
pressure to it — and the pressure here pointed at removing the control that stops this project writing
into somebody else's repository. That is the same shape as the defect the contract records at §5 about
`fully succeeded`: a criterion the correct artifact cannot satisfy.

**Proved in both directions, because a widened condition that no longer fails is not a repair.**
Twelve constructed destructive invocations — including `git reset --hard origin/main`,
`git -C "$d" push --force`, `cd lsei && git reset --hard`, `git clean -fdx` and `foo; git checkout -- .`
— match **12 of 12**. Seven lines from `CLAUDE.md`'s own push-disable, its `merge-base` call and its
prohibition list match **0 of 7**. The old pattern scored 2 of 7 on that safe set, both hits the
push-disable.

**The underlying error was mine and it is worth naming exactly.** The command in §4 above is
`grep -E 'git (reset|...)'`, which is narrower than the condition CMD-11 states. I ran a friendlier
test than the row I had written and reported the result as the row's. A green obtained by running
something other than the stated criterion is the failure mode `UNRUN IS NOT PASS` exists to prevent,
arriving from a direction the runner cannot see.

### 12.2 Phase 1's abort did not abort — confirmed, and strengthened

The Editor's diagnosis is correct. My Phase 1 block printed `ABORT (Phase 1, BC-1)` and then ran
`cd "$ROOT"` unconditionally: the prose said stop and the code continued.

The Editor's repair made `cd` conditional, which fixes the harmful action. It does not stop the run
and it exits 0, so a chained caller reads success. The contract's `ABORT` means the bootstrap stopped
before Phase 6, so the block now short-circuits explicitly:

```
[ -f "$ROOT/lunar-oracle-gameplan.md" ] || { echo "ABORT (Phase 1, BC-1): no repository root above $PWD"; exit 1; }
cd "$ROOT"
```

Executed both ways rather than reasoned about. From `/tmp/bc1fail/sub`, which holds no gameplan: prints
the ABORT line, `exit=1`, never reaches `cd` and never reaches the line standing in for Phase 2. From
`oracle/tests/`, a real subdirectory: walks upward, lands on the repository root, `exit=0`. BC-1's
actual assertion — a session in a subdirectory bootstraps the repository and not the subdirectory —
still holds.

### 12.3 The inverted conditional — confirmed correct

Mine read *"…clones nothing, changes no recorded ref, and reports the same mode set…; **if a second run
does any of those things**, the bootstrap is broken."* The antecedent list is the *correct* behaviours,
so as written it called a correctly idempotent bootstrap broken.

The Editor's replacement — *"a second run that clones, bumps a ref, or reports a different mode set is
broken and not merely stale"* — restates the three in their falsifying form and matches
`bootstrap_contract.md` §3's *What falsifies it* clause word for word in substance. Correct; adopted
unchanged.

### 12.4 One more, found while re-running the row count

CMD-21's cell carried `\|\|` inside a markdown table. Markdown renders the escape, but a table parser
splitting on `|` sees eight fields where every other row has six — and `run_suite.js`, which the relay
asks to be pointed at this file, is a markdown table parser. Reworded to carry no pipe. All 24 rows
now split to six fields.

### 12.5 State after the repair

```
CMD-11, new pattern, whole document        → no match (PASS)
CMD-11, new pattern, 12 decoys             → 12 of 12 caught
CMD-11, new pattern, 7 safe lines          → 0 of 7
CMD row count / suite counting rule        → 24 / 24, unchanged
table field integrity, all rows            → 6 fields, no exceptions
line endings                               → LF, zero CR
node oracle/tests/run_suite.js             → 455 rows, 33 pass, 4 fail, 418 unrun
                                             the 4 are the standing failures, untouched
node tools/check_registers.js              → 0 hard failures
node tools/verify_corpus.js                → 39 OK, 1 FAIL (PTH/A3, standing), 1 VACUOUS, 6 REPORT
node tools/quantities.js --check           → 6 hard failures, was 5. NOT MINE: M7 flipped when two
                                             quantity blocks landed elsewhere without QUANTITIES.md
                                             being regenerated (declares 111, 113 emitted). No
                                             failing site is in any file I wrote; my two tags,
                                             Q-BOOTSTRAP-PHASES and Q-BLOCKING-MODES, are quoted
                                             with their correct values and raise nothing
```

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
```

Repair only. CMD-11 and CMD-21 were rewritten in place; no row was added, removed, or moved to a
different status.
