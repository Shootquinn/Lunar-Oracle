# Wave 5 standing block — the router stops deciding

**THE AUTHOR'S RULING, 2026-08-28, verbatim, and it outranks everything below.**

> *"Have Claude think about stuff instead of trying to use algebra to run a fucking AI. Let it use
> your little tool to help inform itself but don't have it be how it chooses a verdict."*

And on weight: *"I actually want the result of that tool to be a very low weight to Claude."*

And on models: *"We can't always assume everyone has Opus or can afford to use it, and Sonnet is
quite capable except for image analysis."*

## What this wave undoes

Wave 4 built a scoring machine that **decides**. `K = 2.431`. A govern threshold calibrated to a band
7% wide. Match-key mass arithmetic. An axis threshold. A thin threshold. Two full seat-sittings went
into tuning numbers whose only job is to pick one of six verdicts.

The project said on day one that the Oracle **is a Claude session reading this repository under
`oracle/answer_contract.md`**, and that the contract is the program. That inverted into a classifier
without anybody ruling it should, and the orchestrator held a scope contract over the drift for a
whole wave without noticing the architecture had changed underneath it.

**The proof that the algebra was wrong is sitting in the acceptance set.** SRQ-12 asks *"how much
energy does it take to produce a kilogram of oxygen on the Moon?"* and fails to reach `LCC-07`, an
axis about oxygen production energy, because the key reads `kwh` and the question reads "kilowatt
hours". SRQ-8 fails the same way on `polar` against "pole". **No reader misses either. Only a scorer
does.** These are not defects to fix with synonyms. They are the defect.

## What stays, and is not yours to revisit

The six verdicts stay closed: `APP` `FIGURE` `LITERATURE` `BOTH` `CONTESTED` `REFUSE`. The
anti-synthesis rule stays. One persona per side, minimum two, **no cap**, stays. Classification
before retrieval stays, and no second retrieval repairs a first. The haiku-plus-path rule of
`answer_contract.md` §6 stays and is enforced by `tools/verify_haiku.js`.

The registers, the corpus, the exclusions and the thin patches all stay — as **evidence a session
reads**, which is what they always were.

## The two rules that define this wave

1. **The tool reports, the session rules.** No artifact you write may return a verdict. Return
   findings, the scores behind them, and **what each score is worth**.
2. **Low weight, stated inline.** The author asked for the tool's result to carry *very low weight*.
   So the report states its own known failure modes **in the report**, where a session reading it is
   told where it is unreliable at the moment it reads it — not in a document it may never open. The
   `kwh` and `polar` misses are the worked examples and they go in the artifact.

## Models

**Inherit the session.** Opened in Sonnet, everything is Sonnet. **Specify every seat so the work is
correct at Sonnet** — this repository is meant to be cloned by someone who is not the author, and a
tier the reader may not have is a barrier, not a floor. Opus is the floor **only where an image is
involved**: a PDF page image, a figure, a scanned table, a plot read for its values. A seat that hits
an image escalates on its own.

The corollary that matters for your artifacts: **where correctness currently depends on how carefully
someone reads, write the procedure down instead.** "Open the cited file, search for the claim's own
words, quote what is there" is reproducible. "Read carefully" is not.

## State at the wave open, `HEAD = cc1b8b8`

- Steps 0–7 complete. **43 of 43 sub-steps.** Acceptance **11/14**.
- `node oracle/tests/run_suite.js` → **455 rows, 85 pass, 13 fail, 357 unrun** — of which **348 carry
  no executable binding at all.** The test contract is a quarter honest and says so.
- `node oracle/router/acceptance.js` → 124 questions, one verdict each, closed set. Verdicts
  `{APP:2, FIGURE:1, BOTH:2, CONTESTED:44, LITERATURE:57, REFUSE:18}`.
- `check_registers` 0 hard failures. `verify_corpus` 39 OK / 1 FAIL / 1 VACUOUS / 6 REPORT.
- `literature/` holds **169** summaries. LF is now pinned for `oracle/**`, `tools/**`, `cr_scratch/**`
  and `*.md`.

## Rules that still bind

1. **Premise check first.** Every wave so far, most seats have refuted a premise in their own brief,
   including several the orchestrator wrote. This wave the orchestrator relayed a threshold band
   measured against 5 controls when the real band, at 49 controls, did not overlap it — adopting it
   would have destroyed two correct answers. **Assume your brief is wrong until you have run
   something.**
2. **Every count carries its command and read-digest.** Figures at different digests are not
   comparable and you say so rather than reconciling them.
3. **`## Not mine`** is required, even if it says `none`.
4. **Stay in your write set.** Route by relay to `cr_scratch/relay/`; never edit another seat's file.
5. **`lsei/` and `cr-agents/` are READ-ONLY.** Never write, never push.
6. **LF only. Heredocs fail in this shell** — use the Write tool.
7. **A test believed wrong is argued, not edited to pass.** `UNRUN IS NOT PASS`; `VACUOUS IS NOT PASS`.
8. **Namespace scratch files** with your seat id.

**Report back in chat SHORT.** Pointer, close-condition status per sub-step, ledger. Detail goes in
the deliverable.

```
apparatus: check rows +N/-N | amendment rows +N/-N | quantity ids +N/-N | tests +N/-N
```
