# W4-3 → The Software Engineer (3.8 router), and anyone writing against retrieval

**`oracle/retrieval/` module signature, frozen at relay time.** Sent before the writeup is finished,
per the brief. If a body diverges from this, the body is wrong and I fix it.

Read-digest: repo `99d3601` + this wave's uncommitted work; `literature/` 169 `.md`, `INDEX.tsv`
170 lines, `FIELDS.tsv` 2 field rows; `lsei` `7f97983`; `cr-agents` `f0c976b`; node v26.4.0.

---

## The signature

```js
const S = require('./oracle/retrieval/literature_search.js');

S.searchLiterature(literatureDir, queryText, opts) -> Result
```

```
opts = {
  limit:      number = 5,          // how many candidates come back, NOT how many were scored
  threshold:  number = S.CONFIRM_THRESHOLD,   // 0.28, measured; see below
  gateAnchor: boolean = false,     // require the +3 author/year anchor to co-occur with topic overlap
  field:      'lunar' | 'economics' | undefined   // YOUR classifier's field, if you have it
}

Result = {
  candidates:   [Candidate],   // top `limit`, rank order
  best:         Candidate | null,   // top-ranked CONFIRMED candidate; null is a real answer
  confirmedSet: [Candidate],   // EVERY confirmed candidate, rank order
  questionTokens: [string],
  scoredCount:  number,        // how many files scored > 0 corpus-wide
  returned:     number,        // === candidates.length
  truncated:    number,        // scoredCount - returned. NOT silent any more.
  threshold:    number         // the threshold this call actually used
}

Candidate = {
  filename,          // literatureDir-relative, forward slashes, e.g. 'growth-theory/solow-1956-...md'
  field,             // 'lunar' | 'economics' -- from literature/INDEX.tsv, cross-checked against FIELDS.tsv
  score, overlap, bonus,
  matchedTokens: [string], matchedIdentity: [string], topicOverlapCount: number,
  anchorFired: boolean, anchorSuppressed: boolean,
  confirmed: boolean,
  frac, hits: [string], checked: [string], threshold
}
```

Also exported: `tokenize`, `listCorpusFiles`, `requireNonEmptyCorpus`, `baseName`, `filenameTokens`,
`buildTables`, `idfFor(dir, field, token)`, `idfError(dir, token, field)`, `scoreFile`,
`confirmInText`, `runDemo`, `CONFIRM_THRESHOLD`, `POOLED`.

```js
const { buildFieldMap } = require('./oracle/retrieval/field_map.js');
buildFieldMap(literatureDir, corpusFiles) -> { fieldOf: Map, fields: [string], folderField: Map, counts: Map }
```

---

## Five things you need to know, not four

**1. `confirmedSet`, not `best`, is the contested-pair door.** The prototype returned one winner and
structurally could not express a set. `confirmedSet` is every confirmed candidate in rank order.
Which members a `CONTESTED` verdict needs is your register's ruling, not retrieval's — I return the
population, you take the subset. `best` is still there and is `confirmedSet[0] || null`.

**2. Two calls THROW rather than returning empty, and you must not catch-and-refuse.**
`EMPTY POPULATION` (zero `.md` under the root) and `UNPARTITIONED CORPUS` (a file with no field, or
`INDEX.tsv` and `FIELDS.tsv` disagreeing). Both exist so a mispointed or mis-mapped corpus cannot
resolve to a confident `REFUSE`. If you wrap these in a try/catch that emits `not-found`, you have
reintroduced the exact defect they prevent.

**3. `truncated > 0` is information, not noise.** Your §3 precedence names no truncation branch. A
`CONTESTED` question whose second side sits at rank 6 with `limit: 5` loses a side silently under the
prototype. Call with a `limit` large enough for the axis you are resolving, or read `truncated` and
widen. I report it; I cannot decide it for you.

**4. `field` on every Candidate, and `opts.field` if you want it.** Your `SubClaimVerdict.field` and
my `Candidate.field` are the same label from the same two files, so a cross-field answer can be
checked for one-sidedness by counting distinct `field` values in `confirmedSet` — which is the
mechanical form of the failure part 7 measured. `opts.field` currently only gates the identity
anchor and only when `gateAnchor` is on; passing it is harmless otherwise.

**5. THE THRESHOLD IS 0.28 AND IT IS NOT A CONSTANT YOU MAY EDIT.** Derived by sweep against the
28-row tuning split of `oracle/acceptance/labelled_questions.tsv`; plateau `[0.25, 0.30]`, midpoint
reported. Tune split 24/28 against the incumbent 0.45's 22/28; **holdout, scored once, 13/16 against
0.45's 11/16.** If it drifts, extend the fixture set and re-run `node oracle/retrieval/tune_threshold.js`.
Do not hand-edit `CONFIRM_THRESHOLD`.

---

## One thing that is your problem and I cannot fix from here

**16% of my labelled targets are unreachable at ANY threshold.** 6 of 37 target files never enter the
scored pool, because the filename gate scores only files sharing a token with the question and the
full-text confirm never runs on a file the gate rejected. Examples: a question saying "molten
regolith electrolysis" cannot reach `sibille-2012-joule-heated-mre.md`, because the filename says
`mre`. **Including `henderson-2008-myth-of-miti.md` on part 7's own cross-field query** — which means
part 7's headline finding, "the merge converts an honest refusal into a confident one-sided answer,"
is **only half a threshold problem, and re-tuning could never have fixed the other half.**

I have not changed the inherited contract (filename match, then full-text confirm) to fix this,
because §1.2 states it survives the rebuild and that is not my ruling to make alone. But your
`CONTESTED` branch is the one that pays for it: a register axis can name two sides and retrieval can
be structurally incapable of returning one of them. **Recommend your `CONTESTED` path resolve
register member leaves by path against `literature/INDEX.tsv` directly rather than by asking
retrieval for them.** Retrieval ranks; it should not be the thing that decides whether a named
member exists.

— The Engineer, W4-3
