# Step 2 — The Manager's open

**Written 2026-08-27, before any Wave 1 agent ran.** Every empirical statement below was re-measured
this session with the command that produced it, or is cited to
`cr_scratch/step2_orchestrator_baseline.md`, which was written by a seat that is not the seat that
will produce Step 2's counts. That is not politeness. It is the arm 2b remedy from my own Step 1
final close, and it is the only reason any figure in this file can be trusted before an agent runs.

---

## 1. Scope

Step 2 is the primary assignment. Objective 1. Eighteen sub-steps, 2.1 through 2.18, and **all
eighteen are done before this step closes.** I am not accepting a conditional close with deferrals
and the orchestrator will not offer me one.

**What this step delivers, in my own words, against the integration draft's closing statement.**
Today `literature/` holds one file — `NAMING.md` — and the merge has not run. At the Step 2 gate,
`literature/` is *the corpus*: every union file present, each carrying a `## Provenance` block, a
machine-readable field label and a taxonomy placement; zero PDFs tracked; the Scenario Explorer
source PDFs landed under `literature/_pdf/<taxonomy>/`; the contested-claims register landed in the
single encoding 1.8 ratified; the Open Question 8 contamination audit reported to the author and not
acted on; the PDF containment mechanism installed as a committed script plus bootstrap wiring; and
`oracle/verify_corpus.js` reporting corpus state including upstream divergence. At that gate the
author approves that the merged corpus **is now the corpus**. Everything downstream — retrieval, the
answering loop, the transfer gate — binds to it, and after that binding the merge is irreversible in
practice whatever the filesystem says.

**No sub-step is unnecessary. I am not proposing to remove any.** I considered 2.6 (half a step by
The Engineer's own measurement) and 2.9 (a recommendation plus an author ruling). Both carry work
nothing else carries. If a later reader wants either struck, that needs the author's approval and it
is not mine to fold quietly into a neighbour.

**Two sub-steps added at this open, and each needs the author's approval to stand.** Precedent: the
Step 1 open added 1.0, 1.12 and 1.13 to give register rows the addresses they lacked, and the Step 1
close added 1.14. These are the same shape — obligations with an owner and no address.

| # | Added sub-step | Why it has no address today | Owner |
|---|---|---|---|
| **2.19** | **The arm-2 process changes.** (a) Move the boundary artifacts into the declared file set: spawn prompts and verdict sentences are written to files under a declared path, so `M15` covers them by construction rather than by anyone reaching out to them. (b) Give `oracle/MANIFEST.tsv` an accessor, so a hand-typed filter has nothing to be typed instead of. (c) Rename the `AM-` namespace so checks `AM-1`..`AM-5` and rows `AM-01`..`AM-135` stop sharing a prefix. | My Step 1 final close named all three as Step 2 work with an owner. None of the eighteen carries them, and **F1 of my own close presumes Step 2 does (a) and (b)** — a falsifier whose antecedent nothing schedules cannot fire. Close items 19, 20, 24. | The Software Engineer (the tool half of a, and b); The Designer (the contract half of a, and c) |
| **2.20** | **Check-register reconciliation for the three new instruments.** `oracle/check_register.md` `CHK-13` names `tools/check_no_sources.js`; sub-step 2.14 says `oracle/check_no_sources.js`. `oracle/verify_corpus.js` (2.17) has **no row at all**, and `oracle/**/*.js` is a declared scan root, so building it there fails `CL-1` on the day it lands. Two blocking rows, `CHK-01` and `CHK-04`, name the trigger `merge-gate`, and **nothing installs a merge-gate dispatcher** — `CHK-10` dispatches `pre-commit` only. 2.5 is the merge. | Measured this session against the landed register: 27 `C` rows; the `H` row declares `27 13 12 2`; parsed statuses are 13 live / 12 specified / 2 retiring. **The known-answer test passes**, and the three defects above sit inside a register that is internally consistent, which is why reading it is not enough to find them. Nothing in the eighteen touches them. | The Systems Engineer |

**Conditional-close language I will not accept at the Step 2 close.** "Landed, pending the audit."
"Complete except the hand queue." "Assertions written; execution deferred." Each of those was
available at Step 1 and I refused twice. Both refusals were correct.

---

## 2. The TDD precondition — it binds, and here is the suite

**Ruling: the precondition fires.** A.4's text says "user-facing deliverable," and Step 2 produces a
corpus, a taxonomy and tooling rather than prose. That is the argument for exemption and I reject it,
on the corrected rule I recorded at the Step 1 close after my own falsifier fired:

> **A specification whose form other agents must write against is reader-facing, and the precondition
> fires on it.**

Step 2 is dense with exactly that shape. The `## Provenance` block form is written into every merged
file and every downstream consumer parses it. The field label is a form 2.3 imposes on every file and
3.7's retrieval binds to. The in-file `## Contested` block is a form 2.16 generates into every member
file. Those are not code and they are not prose; they are forms other agents write against. The Step 1
evidence is decisive: a closed set with a missing member does not stop authors, it routes them into
the wrong member silently, and four of the counting-rule contract's ten defects were exactly that.

**A per-step defect checklist is not a test suite (A.10 step 1), and neither are four assertion
sub-steps.** 2.4, 2.10, 2.13 and 2.15 are each an assertions-first sub-step and I am keeping all
four. But they are not the suite, for two reasons. First, they land *inside* the step, gated on
2.2/2.3 and on 2.5, so three of the four cannot exist before Wave 1 opens. Second, and this is the one
that matters: **2.4's assertions are written by The Engineer and 2.5's merge is executed by The
Engineer.** That is arm 2b by construction — a seat running an operation with an instrument it wrote
and never tested — and arm 2b accounted for seven of Step 1's nine relay errors and every wrong
verdict the step produced.

**What the suite is.** `oracle/tests/corpus_suite.md`, the Step 2 corpus acceptance suite, authored by
The Software Engineer, who owns no merge output in this step. It asserts properties of the *target
state* rather than the outputs of 2.1–2.3, which is what makes it writable before they run:

- Naming conformance against `literature/NAMING.md` §§1–3 and §11 — both namespaces, the path-length
  ceiling of §8, the dedup key precedence of §7.
- The field label, against **`literature/NAMING.md` §9**. Not against The Engineer's Part 2, which
  specifies no field label at all — only the `- **Also:**` line and `INDEX.tsv`. An agent executing
  Part 2 faithfully satisfies 2.3 in appearance and not in fact, and B3's pooled-IDF break dies there
  if nobody says so out loud.
- `## Provenance` completeness: the eight-key minimum from The Engineer's Part 5, every key present,
  `- **Source file:**` either resolving on disk or reading `not held`.
- Zero `.pdf` tracked anywhere in the repository; the three containment gates — extension, size,
  `%PDF` magic bytes.
- Register integrity against `oracle/register_schema.md`: the sidecar is a **set** of files with one
  `basis_root` each, joined at load; every `A` row's members resolve; the in-file block round-trips
  against the sidecar.
- Corpus-level invariants: no two summaries under a corpus root tokenize to the same key set
  (`CHK-01`); case-insensitive filename collision asserted **generally** rather than on the one known
  pair.
- The counting-rule invariants: every count this step emits carries a quantity block, and
  `node tools/quantities.js --check` acquires no new hard failure against a promoted authority.

**Sizing.** A.10 step 7 scales by complexity. This is the project's largest step by artifact count and
the one every later step binds to. Target **120 to 160 tests**, weighted toward the merge and
provenance halves. A suite of 40 comes back; a suite of 300 gets cut. His simplicity gate applies to
his own suite and he has used it on his own text before.

**Where the four assertion sub-steps go.** Each becomes a **named amendment slot in the suite**,
declared by id at authoring time and filled when its inputs exist, under A.10 step 5. A slot that
never fills is then visible as an empty slot rather than as an absence. 2.4, 2.10, 2.13 and 2.15 keep
their numbers and their assigned owners; what changes is that their output amends one contract instead
of standing as four assertion lists nothing reconciles.

**The A.10 step 2 source-verification gate.** Most of the suite's tests cite landed on-disk contracts
— `NAMING.md`, `register_schema.md`, `check_register.md`, `COUNTING_RULE.md`, `.gitignore` — and their
author verifies those himself at write time. The tests that cite a *corpus source's content* are
2.7's (`stated_as_of` on programme-state snapshots) and 2.12's (verbatim-overlap classification), and
those are precisely the ones The Software Engineer cannot verify against his own suite. **The
Fact-Checker runs the A.10 step 2 gate on that subset, in Wave 2**, as she did on the 1.11 suite at
Step 1 for the same reason. Scoped gate, not ceremony: it fires on the tests that make a claim about
what a source says.

**What opens before what.** The suite is reviewed and becomes the contract **before anything writes
into `literature/`** — that is, before 2.4 and 2.5. It does not gate 2.1 (a measurement), 2.3 (a
proposal explicitly reviewed before anything moves), or 2.19 (process plumbing). Those three plus the
suite are Cycle A and they run together. **Nothing writes into `literature/` until the suite is the
contract.**

**Reviewer of the suite.** The Software Engineer cannot review his own. **The Systems Engineer**
reviews it for architectural coverage — A.10 step 5 names him for exactly this. Their A.9 tension is
live and is not resolved: he asks whether it hangs together, The Software Engineer asks whether it
earns its keep. If they disagree, present both, side by side.

**No topic-sentence outline.** A.4's second precondition artifact is a paragraph-level outline
validated against the suite, and it has no analogue for a corpus and a set of tools. **I rule it not
applicable to Step 2**, and I am recording the ruling rather than passing over it, because a
precondition silently dropped is the shape of every defect this project has caught.

---
