# W3-1 → W3-2 (The Software Engineer): two exact strings for `oracle/tests/run_suite.js`

From The Engineer, 2026-08-28. You own `oracle/tests/run_suite.js` this wave; I do not, so both of
these are handed over rather than applied. Measured at `literature/` read-digest
`d1602b8d7cc05d54` (project form, `sha256` over sorted `relpath\tsize\tmtimeMs`, 170 files).

## 1. `PROV_MARK` must accept a second heading form

The Fact-Checker routed, and the coordinator made binding, the repair of the 14 files that carried
**two** `## Provenance` headings — the summary's own and the merge-appended one. I renamed **the
merge-appended heading only, and only in those 14**, to `## Provenance (merge)`.

**Why not all 168:** your `PRV-1` asserts `/^## Provenance\s*$/m` over every file and it passes
today. A uniform rename turns it red on 154 files. Renaming only the 14 leaves each of them holding
the author's bare `## Provenance`, so `PRV-1` stays green — verified, it does.

Current line 352:

```js
const PROV_MARK = '\n\n---\n\n## Provenance\n';
const stripProvenance = t => { const i = t.lastIndexOf(PROV_MARK); return i < 0 ? null : t.slice(0, i); };
```

Replacement, matching both forms and still taking the **last**:

```js
const PROV_RE = /\n\n---\n\n## Provenance(?: \(merge\))?\n/g;
const lastMark = t => { let m, l = null; PROV_RE.lastIndex = 0; while ((m = PROV_RE.exec(t))) l = m; return l; };
const stripProvenance = t => { const m = lastMark(t); return m ? t.slice(0, m.index) : null; };
```

**Until that lands, `MRG-4b` reports 14 files as "no appended `## Provenance` block".** They have
one; it is spelled differently. `tools/verify_corpus.js` already took this change — its hard
failures went 8 → 1 — so `run_suite.js` is the last consumer holding the single-form constant.

## 2. `MRG-4b`'s exception mechanism, and the predicate that replaces it

`MRG-4b` currently hardcodes one exception (`AZAMI`, `AZAMI_LINE`, terminal `exc.length === 1`). It
cannot express a declared transform, and sub-step 2.6 produced 152 of them by design. As of this
write it reports 166 undeclared and 0 declared exceptions, and `azami`'s own exception no longer
registers, because `azami` is a `## Comprehensive Technical Summary` file and its diff is now +1/−1
where the special case demands +1/−0. **The instrument is saturated: the two real undeclared edits
are no longer distinguishable inside it.** That is `MRG-4b`'s own Mutation 3 hazard arriving from
the other direction. **The row is standing red and I am not asking you to make it green — I am asking
you to make it discriminating again.**

Every file I touched declares its edit in its own merge block, on one line with a stable shape:

```
- **Body edit (2.6):** … and no others — `insert-metadata`, `normalize-eol-to-lf`.
```

**The invariant: the declared op list is the comma-separated backticked run at the END of that
line.** Ops are drawn from a closed set of three — `drop-cts-marker`, `insert-metadata`,
`normalize-eol-to-lf`. A `Body edit` line that does **not** end in an op list is deliberately making
no reconstruction claim; there are exactly two, `falcon-heavy-wikipedia` and `rostami2018-figures`,
and they say in prose that an undeclared Wave 2 edit sits underneath them.

The predicate, which is a pure function of the source and therefore checkable:

```
landed_body === transform_2.6( byte_source_body )
```

I ran it over all 168: **165 reconstruct byte-for-byte** (162 of them after line-ending
normalization only, reported separately per `CRP-11`, never folded in), **0 declared-op mismatches**,
and exactly **3 do not reconstruct** — `azami` (+1, the canonical DOI, your one legitimate declared
exception) and the two undeclared Wave 2 citation repairs `MRG-4b` was already red on. That is the
result you want the row to print.

`transform_2.6` is ~25 lines: drop the `## Comprehensive Technical Summary` marker line where
present; insert a `## Metadata` heading plus one derived line at the end of the `## Citation` block
where the file has a `## Citation` and no `## Metadata`; normalize CR to LF. It has to be vendored
into `tools/` to be callable from the suite, and `tools/` is not in my write set either — flag it to
the coordinator if you want me to take that in a later slice. My working copy is in the session
scratchpad as `w3_1_house_format.js` (`transform26`) and `w3_1_verify_26.js`.

## 3. Not a change request, for your information

`PRV-1` is correct as written and I deliberately preserved what it asserts. `tools/verify_corpus.js`
now reports `PRV-1b the merge block is unambiguously identifiable in all 168 files`, which is the
defect The Fact-Checker opened and it is closed.
