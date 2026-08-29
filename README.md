# Lunar Oracle

Lunar Oracle answers questions about lunar industrialisation from a merged literature corpus and from
a working model of lunar ISRU economics. The thing that answers them is a Claude Code session reading
this repository, so there is nothing to install and nothing to run: you clone the repository, open
Claude Code in it, and ask.

An answer comes back in two parts. A haiku says how the question went (computed, read out of the
papers, contested, or refused), and the answer itself arrives underneath it or as a file, written
flat, with a trace on every claim. A question the corpus cannot support is refused, and the refusal
says which of six reasons applies. Refusals are ordinary here rather than exceptional.

## Running it

```bash
git clone https://github.com/Shootquinn/Lunar-Oracle.git
cd Lunar-Oracle
claude
```

`CLAUDE.md` takes over from there. It locates the repository root, clones two working copies, verifies
them, reports what it found, reads the method and the gameplan, and, on a first run with no blocking
condition in force, plays a short opening sequence once.

You need `git`, Claude Code, and Node.js. Node is not optional in the way it looks: the model lives in
a working copy of the Lunar Scenario Explorer, its command-line tools are plain Node scripts, and
without Node no question that resolves against the model can be answered at all. The bootstrap
reports that at startup rather than letting you discover it when you ask.

The two working copies are cloned into the repository root and are never committed here.

- `cr-agents/`: the Collaborative Reasoning method, which is how a question becomes a team of
  personas rather than a single guess.
- `lsei/`: the Lunar Scenario Explorer. `lsei/index.html` is the authority on the model.

Push is disabled on both, every session, whether or not the bootstrap cloned anything. They are
read-only working copies of repositories this project borrows, and neither is ever copied into this
tree: a copy would be a second authority, and a second authority drifts.

## What it answers, and what it refuses

Every question is classified before anything is retrieved, and the classification decides which of six
verdicts the answer carries: computed from the model, drawn as a figure from the model, answered from
the literature, answered from both, reported as contested, or refused. Two sources are never searched
and then reconciled after the fact.

Four inherited rules govern what comes back.

**The model is the authority.** A question the model can compute is computed, never answered from a
summary that happens to carry a number.

**A missing input is a refusal, not a fallback.** With the model absent, a quantitative question is
refused rather than answered more softly from the shelf. The failure this prevents is invisible: an
answer sourced from a summary looks exactly like an answer computed from the model.

**A trace says which grade it is.** A recomputed scalar is recompute-grade. A citation that resolves
to a real file is resolution-only, and resolution-only never claims that the file supports the
sentence beside it. There are three grades and no fourth, and words like *verified*, *confirmed* and
*proven* are failures rather than warnings.

**Where the corpus argues with itself, it says so and does not arbitrate.** A contested claim comes
back with every side, each argued by a persona briefed on that side alone, and no adjudication.

## What is in this repository

The map below is what a fresh clone gets. Measured 2026-08-28 at `HEAD = 99d3601`: 497 tracked files.

| Path | Committed | What it is |
|---|---|---|
| `CLAUDE.md` | yes | The bootstrap. What a Claude Code session reads first. |
| `README.md` | yes | This file. |
| `lunar-oracle-gameplan.md` | yes | The operating plan: steps, sub-steps, loose ends, open questions. The authority on where the project stands. |
| `literature/` | yes | The merged corpus. This project's own summaries, `.md` only, filed in eleven topic folders, with `INDEX.tsv` and `FIELDS.tsv` beside them. |
| `oracle/` | yes | The contracts a session executes, the registers it reads, and the test suites over both. |
| `tools/` | yes | Checks that enforce this project's rules, plus the committed git hooks that fire them. |
| `cr_scratch/` | yes | Agent handoffs, committed on purpose so the reasoning behind every decision is auditable. |
| `accumulator.md`, `QUANTITIES.md`, `COUNTING_RULE.md` | yes | Contribution history, the quantity index, and the rule every count in this project is measured under. |
| `.gitignore`, `.gitattributes` | yes | This map, enforced, and the line-ending policy. |
| `cr-agents/`, `lsei/` | **no** | Working copies, cloned at bootstrap. Never committed, never pushed to, never vendored. |
| `literature/_pdf/<topic>/` | **no** | Source PDFs on the author's disk, filed under the same topic names as the summaries. Never ships. |
| `_intake/` | **no** | Staging for material on its way into `literature/`. It is not the corpus's home; permanence attaches to the repository. |
| `.oracle-state.json` | **no** | Machine-written, per-install: the refs each working copy was verified against, the corpus digest, whether source PDFs are on this machine, and the first-run flag. Safe to delete; every field but the flag is re-observed on the next run. |

Two rules explain why the map looks like this. **Anything that must survive a clone is not state, it
is content**, and it belongs in the corpus, in `oracle/`, or in the gameplan. And **no path outside
this repository and its two working copies is read at runtime.** Other folders on the author's
machine are sources of material, read once by a human-supervised step, never by the answering loop.
An Oracle that answers on one laptop and refuses everywhere else is a setup rather than a system.

## The corpus

`literature/` holds **169 summaries in eleven topic folders**, measured 2026-08-28 over
`literature/**/*.md` at read-digest `2ce308c6a5640f8f`. The folders run from `growth-theory` and
`development-and-industrial-policy` through `isru-processing`, `lunar-ice-and-geology`,
`power-and-thermal` and `space-law-and-governance`, which is the shape the merge produced: an
economics corpus and a lunar-engineering corpus filed as one shelf rather than as two shelves sharing
a parent.

**A summary is this project's own prose about a published source.** It carries a citation block
identifying the work by author, title, venue and DOI, and a provenance block recording which prior
corpus it came from, what disposition the merge gave it, and which plan row landed it. It is not a
copy of the source, and it is not a substitute for reading the source. The citation is there so that
you can reach the original through its publisher.

The merge is what the rest of the system waits on. Two corpora came in: the Lunar Scenario Explorer's
shelf, and a review of the Japanese economic miracle whose subject is how an industrial base gets
built at all. The point of putting them in one place is that a question about lunar
industrialisation is an economics question with a hostile environment attached. Sources appearing in
both were resolved to one summary rather than doubled, and `INDEX.tsv` and `FIELDS.tsv` beside the
folders are what the retrieval layer reads.

**A clone does not get the source PDFs.** They live on the author's machine under `literature/_pdf/`
and never ship. That directory's absence is one of the facts the bootstrap records at startup, because
the author's `literature/` and a fresh clone's `literature/` are permanently different trees with the
same name, and a session that cannot tell which one it is in will offer you a source you do not have.

## What the corpus audit found

An audit ran on 2026-08-28 against every summary whose source PDF was on disk, comparing the summary's
abstract section to the text of the source. The figures below are that audit's, at its own read-digest
`899e0ddfb70ed83f`, over the 168-file corpus that existed on the day. The corpus has since gained one
file, so the unmeasured count below is a floor rather than a current measurement.

**112 of 168 summaries had a source PDF to test against. The median verbatim overlap was 0.0%.**
Eight came back at or above 10%, and one of those needs a decision rather than a note:
`prettyman-2006` reproduces a published abstract at **100.0%**, with `levin-2025` at 95.6% a step
behind it. Seven of the eight are marked at the point of use and are short enough or licensed such
that the marking carries them. **One file, not eight and not thirteen.** An earlier finding that named
four further files as carrying undeclared source markup was closed on evidence: all four had been
rewritten as original prose a week before, and all four now measure 0.0%.

**56 of the 168 could not be measured at all.** Fifty-three have no local PDF and three have no
abstract section to compare. Fifty of the fifty-six came from the Scenario Explorer's shelf, and they
are disproportionately the long technical summaries, which have more room for transcription rather
than less. The step that pulls those source PDFs has not run. The audit is therefore complete over
the summaries whose sources are on disk and has never been attempted on the rest, and nobody should
read the eight-file finding as a finding about the whole shelf.

## What this project set out to do

Six objectives. The gameplan is the authority on where each one stands; this is what each one is.

1. **Integrate the two corpora into one**, deduplicated, with provenance preserved and a taxonomy a
   retrieval mechanism can navigate. Everything else waits on this.
2. **Stand up the repository** with a bootstrap specified well enough to work on a clean machine
   holding nothing but Claude Code and git.
3. **Define the answering loop**: a question enters, a team runs against the model and the corpus, and
   a traced deliverable comes out.
4. **Specify the register split** (the haiku on one side, flat prose on the other) and the mechanism
   that stops either from leaking into the other.
5. **Specify the first-run experience**: bootstrap, then the opening sequence, once.
6. **Produce a gameplan** that becomes the operating contract for the rest of the work.

## Licence

**This project dedicates its own writing to the public domain**, following the Unlicense, as the Lunar
Scenario Explorer does. The dedication covers the summaries in `literature/`, the contracts and
registers under `oracle/`, the checks in `tools/`, the gameplan, and the agent handoffs in
`cr_scratch/`.

**The Unlicense rather than CC0, and the reason is practical rather than legal.** Author ruling,
2026-08-28: *"You can't use CC0 on GitHub, you have to use the Unlicense — I mean, you can, but this
way we can just pick a default."* GitHub's own licence picker surfaces the Unlicense and does not
surface CC0, so choosing it is choosing the option the host will recognise and display without anyone
hand-rolling a `LICENSE` file. The two say substantially the same thing about this project's own
writing; one of them is on the menu.

**The dedication cannot cover the published works those summaries describe, and does not try to.**
Each summary is this project's own account of a work it does not own; the source is identified by
citation and DOI so that a reader reaches the original through its publisher. Several of those sources
carry restrictive terms of their own, recorded in the summaries that describe them; four are published
under Creative Commons Attribution-NonCommercial-NoDerivatives 4.0, and nothing done here could
dedicate those terms away. Four is a floor, not a census: it counts the summaries that state a licence
for their source, and most do not.

**What is true of this tree, stated in our own words.** No PDF and no page image is committed in this
repository: `git ls-files` returns none, `.gitignore` denies them, and a committed pre-commit check
fails the commit that would add one. That is a claim about carrier files, and it is not the broader
claim that no third-party text is present anywhere in the corpus. The audit above found one summary
reproducing a published abstract in full, so the broader claim would be one this project had already
measured to be false. The Scenario Explorer's README carried the broader sentence about its own corpus
and withdrew it at `d7889e1` for this reason.

**The `LICENSE` file is owed and is not yet here.** Until it lands, the paragraphs above are the
project's stated position rather than an executed dedication, and this repository is not public.

