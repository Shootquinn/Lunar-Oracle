/* literature_search.js -- retrieval over the merged 169-file shelf. Sub-step 3.7.
 *
 * Reimplementation of lsei/oracle/lib/literature_search.js, which is READ-ONLY and stays that way.
 * The contract is unchanged and deliberately so: filename match, then full-text confirm, no semantic
 * layer. 169 legibly-named files is not a corpus that needs embeddings and nobody asked for one.
 * listCorpusFiles() and requireNonEmptyCorpus() are carried over verbatim, comments included; they
 * are the twelve most valuable lines in the prototype and neither the merge nor the rebuild touches
 * the problem they solve.
 *
 * TWO THINGS CHANGE, and both were diagnosed and measured before this file was written.
 *
 * (a) FIELD-SCOPED IDF. Loose end B3. The prototype builds ONE document-frequency table over every
 *     file under one root. IDF measures a token's rarity within a population; the merged corpus is a
 *     union of two populations with different vocabulary distributions, so a pooled table is wrong
 *     for both halves in opposite directions. MEASURED on this shelf, 169 files, 124 lunar /
 *     45 economics, Okapi-form IDF: the token `moon` carries a pooled weight of 0.80 where its
 *     economics-scoped weight is 2.91 -- an error of 2.11 nats, against 0.92 for `capital`, the row
 *     loose end B3 originally flagged. `moon` appears in 2 of 45 economics files and 74 of 124 lunar
 *     ones; pooled, those 74 make it look common in a half where it is rare. That is B3's real
 *     damage and it is more than twice the size of B3's own worst example.
 *
 *     WHAT THIS BUYS, ALSO MEASURED, AND IT IS SMALLER THAN THE WEIGHT ERROR SUGGESTS. Against the
 *     44-row labelled set, field-scoped and pooled score IDENTICALLY on pass/fail: 37/44, holdout
 *     13/16, both arms. Scoping changes the candidate ranking on 15 of 44 fixtures and the confirmed
 *     set on 8, and what it buys is PRECISION AT EQUAL RECALL: mean confirmed-set size falls from
 *     6.50 to 5.25 on cross-field questions and 3.45 to 3.16 overall. The gain is concentrated in
 *     cross-field retrieval, which is where B3 predicted it. It is real and it is not dramatic, and
 *     saying so is the point.
 *
 *     The fix, and it is three lines of substance: one df table per field, keyed by field; a file's
 *     tokens weighted by the table of the FILE'S OWN field; the field read from the committed maps
 *     via field_map.js, never inferred from a folder name or a review roster.
 *
 * (b) THE CONFIRMATION THRESHOLD. `frac >= 0.45` was hand-tuned against a single-field 156-file
 *     lunar corpus and carries no evidential standing at 169 across two fields. It is not a constant
 *     in this file. It is read from oracle/acceptance/labelled_questions.tsv's tuning split by
 *     tune_threshold.js and passed in, or taken from CONFIRM_THRESHOLD below, which is that
 *     measurement's result and carries the provenance of the run that produced it. When it drifts,
 *     the fixture set is what gets extended; the number is never re-tuned by feel.
 *
 * Three smaller repairs ride along, none of them a new idea:
 *   - NO SILENT TRUNCATION. The prototype slices to opts.limit and discards without saying so. The
 *     return carries `truncated` and `scoredCount` so a caller can see what it did not get. This is
 *     reporting only; no ranking changes.
 *   - `confirmedSet`, not just `best`. The prototype's one-winner return cannot express a contested
 *     pair. `confirmedSet` is every confirmed candidate in rank order. Which subset of it a verdict
 *     needs is the router's question and the register's, not this file's.
 *   - IDENTITY ANCHOR GATE, off by default and measured. The +3 author / +3 year bonus is the
 *     strongest signal a legible filename offers within one field and a collision generator across
 *     two. `opts.gateAnchor` requires the anchor to co-occur with real topic overlap. Default OFF
 *     because the fixture set could not tell the difference -- gate on and gate off score identically
 *     on all 44 rows -- not because it was rejected. Unproven, not disproven.
 *
 * What this file still does not do: it does not read the app, it does not decide a verdict, and it
 * does not resolve a match against an app citation register. citationForFile() is deliberately NOT
 * carried over -- it emitted the hard-coded string "the 57-file corpus" into answers, which is a
 * false number printed as fact, and it is the router's concern in any case.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { buildFieldMap } = require('./field_map.js');

/* The confirmation threshold, set by measurement at sub-step 3.7 against the tuning split of
   oracle/acceptance/labelled_questions.tsv. Re-derive with:
     node oracle/retrieval/tune_threshold.js
   Do not edit this by hand. Extend the fixture set and re-run. */
const CONFIRM_THRESHOLD = 0.28;

const STOPWORDS = new Set([
  'the','a','an','and','or','but','of','in','on','at','to','for','with','by','from','as','is',
  'are','was','were','be','been','being','it','its','this','that','these','those','what','which',
  'who','how','why','when','where','did','does','do','not','no','so','than','then','if','into',
  'about','across','over','under','out','up','down','per','via','vs','and/or','their','it\'s',
  'would','could','should','will','shall','can','may','might','also','only','one','two','three',
  // Project-generic words rather than topic words. Carried over from the prototype with its
  // reasoning intact: nearly every sub-claim asked of this Oracle mentions "the app" or "the model"
  // somewhere, so neither carries topical signal, and each would otherwise inflate every candidate
  // by roughly the same amount regardless of what the sub-claim is about.
  'app','apps','model','models','modeled','modelled','modeling','modelling','assumes','assumed',
]);

function tokenize(text) {
  const raw = String(text).toLowerCase().match(/[a-z0-9]+/g) || [];
  return raw.filter(t => t.length > 1 && !STOPWORDS.has(t));
}

/* ---- CARRIED OVER VERBATIM FROM THE PROTOTYPE, COMMENTS INCLUDED ----------------------------
 * listCorpusFiles walks literatureDir to any depth and returns every .md file as a path relative
 * to literatureDir, forward-slash-joined regardless of platform. It does not assume one level and
 * it does not hard-code the taxonomy's folder names: whether the corpus sits flat or nested into
 * topic folders, the same walk finds every file either way. The taxonomy is a published-side
 * decision that can change again; this file's only job is to find every .md file under the root it
 * is given, at whatever depth it lives. */
function listCorpusFiles(literatureDir) {
  const out = [];
  (function walk(dir, relPrefix) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      return; /* a missing or unreadable directory yields zero files here; the caller decides
                 whether zero files is itself an error (see requireNonEmptyCorpus below) */
    }
    for (const e of entries) {
      const rel = relPrefix ? relPrefix + '/' + e.name : e.name;
      if (e.isDirectory()) walk(path.join(dir, e.name), rel);
      else if (e.isFile() && e.name.endsWith('.md')) out.push(rel);
    }
  })(literatureDir, '');
  return out.sort();
}

/* The retrieval path must be able to say it saw no corpus at all, distinctly from a search that
 * saw a real, non-empty corpus and confirmed no match in it. A search against zero files is
 * indistinguishable, by return value alone, from a search that legitimately found nothing
 * relevant; that ambiguity is exactly what let a missing corpus resolve to a confident REFUSE
 * instead of a loud failure. This throws rather than returning an empty result. */
function requireNonEmptyCorpus(literatureDir, files) {
  if (files.length === 0) {
    throw new Error('EMPTY POPULATION: literature_search.js found zero .md files under ' +
      literatureDir + ' (searched recursively). A search against an empty corpus is ' +
      'indistinguishable from a search that found nothing relevant to the question; this throws ' +
      'rather than returning zero candidates so the router cannot silently classify a missing or ' +
      'mispointed corpus as a confident REFUSE.');
  }
}
/* ---- END VERBATIM CARRY-OVER ----------------------------------------------------------------- */

function baseName(filename) {
  const i = filename.lastIndexOf('/');
  return i === -1 ? filename : filename.slice(i + 1);
}

/* filenameTokens reads a candidate's own leaf name only, never a folder segment the recursive walk
   prepended. Folder names are a published-side grouping decision and are not part of the
   author-year-topic convention this scoring is built against. Note this is now doubly important:
   the folder name IS the field key, and scoring a file for containing its own field's name in its
   path would make every economics file match the word "economics". */
function filenameTokens(filename) {
  return tokenize(baseName(filename).replace(/\.md$/, '').replace(/-/g, ' '));
}

/* ================================================================= field-scoped document frequency
 *
 * One df table per field instead of one pooled table over the union. The pooled table is retained
 * alongside, under the key POOLED, for exactly one purpose: so the error this fix corrects can be
 * measured rather than asserted (see idfError() and --demo below). It is never used for scoring.
 */
const POOLED = '__pooled__';
const _dfCache = new Map();

function buildTables(literatureDir) {
  if (_dfCache.has(literatureDir)) return _dfCache.get(literatureDir);
  const files = listCorpusFiles(literatureDir);
  requireNonEmptyCorpus(literatureDir, files);
  const map = buildFieldMap(literatureDir, files);

  const tables = new Map(); // field -> { df: Map, n: int }
  for (const f of map.fields) tables.set(f, { df: new Map(), n: 0 });
  tables.set(POOLED, { df: new Map(), n: 0 });

  for (const rel of files) {
    const field = map.fieldOf.get(rel);
    const text = fs.readFileSync(path.join(literatureDir, rel), 'utf8').toLowerCase();
    const seen = new Set((text.match(/[a-z0-9]+/g) || []).filter(t => t.length > 1));
    for (const key of [field, POOLED]) {
      const tbl = tables.get(key);
      tbl.n += 1;
      for (const t of seen) tbl.df.set(t, (tbl.df.get(t) || 0) + 1);
    }
  }

  const result = { tables, fieldOf: map.fieldOf, fields: map.fields, counts: map.counts, files };
  _dfCache.set(literatureDir, result);
  return result;
}

/* Okapi-form IDF: ln(1 + (N - df + 0.5)/(df + 0.5)). This is the form the field partition was
   measured in at sub-step 2.3, so the 2.12-nat `moon` figure and the weights this file actually
   scores with are the same instrument rather than two instruments that happen to agree in sign.
   A token the population never uses (df = 0) takes that population's maximum weight, which is
   correct: a hit on a term absent from everything else is the strongest evidence a confirm offers. */
function idfFor(literatureDir, field, token) {
  const { tables } = buildTables(literatureDir);
  const tbl = tables.get(field);
  if (!tbl) throw new Error('UNKNOWN FIELD "' + field + '" requested from the IDF table. Fields ' +
    'are ' + [...tables.keys()].filter(k => k !== POOLED).join(', ') + '.');
  const d = tbl.df.get(token) || 0;
  return Math.log(1 + (tbl.n - d + 0.5) / (d + 0.5));
}

/* idfError(dir, token, field) -> the nats of error the pooled table commits on this token in this
   field. This is the instrument that makes (a) falsifiable instead of asserted. */
function idfError(literatureDir, token, field) {
  const pooled = idfFor(literatureDir, POOLED, token);
  const scoped = idfFor(literatureDir, field, token);
  const { tables } = buildTables(literatureDir);
  return {
    token, field,
    df: tables.get(field).df.get(token) || 0,
    n: tables.get(field).n,
    pooledDf: tables.get(POOLED).df.get(token) || 0,
    pooledN: tables.get(POOLED).n,
    pooled, scoped,
    error: Math.abs(pooled - scoped),
  };
}

/* Score one candidate against the question's tokens. Overlap is IDF-weighted -- found necessary at
   156 files rather than added for symmetry, when a question naming LCROSS scored a file sharing only
   the rare "lcross" BELOW an off-topic file sharing the corpus-ubiquitous "ice" and "regolith". The
   change here is which table the weights come from: the candidate's own field, not the union. */
function scoreFile(questionTokens, filename, literatureDir, opts) {
  opts = opts || {};
  const { fieldOf } = buildTables(literatureDir);
  /* opts.pooled is the counterfactual arm, and it exists only so that change (a) can be MEASURED
     against the fixture set rather than argued for. It forces every file onto the single pooled
     table -- the prototype's behaviour, loose end B3 intact. It is never an operating mode. */
  const field = opts.pooled ? POOLED : fieldOf.get(filename);
  const fSet = new Set(filenameTokens(filename));
  const qSet = new Set(questionTokens);

  const base = baseName(filename);
  const leadAuthor = base.split('-')[0];
  const yearMatch = /-(\d{4})-/.exec(base);
  const identity = new Set([leadAuthor]);
  if (yearMatch) identity.add(yearMatch[1]);

  let overlap = 0;
  const matchedTokens = [];
  let topicOverlapCount = 0;
  for (const t of qSet) {
    if (fSet.has(t)) {
      overlap += idfFor(literatureDir, field, t);
      matchedTokens.push(t);
      if (!identity.has(t)) topicOverlapCount += 1;
    }
  }

  /* The identity anchor. +3 each for a matching leading author token and a matching four-digit
     year. Within one field this is the strongest signal a legible filename offers. Across two it
     fires on identity tokens a cross-field question supplies by accident -- a question about
     "targeting" has a lunar reading and an industrial-policy reading. gateAnchor requires the
     anchor to co-occur with at least one non-identity topic token, or with an explicit field from
     the router's classifier. Default off; the fixture set is what decides, and it is reported. */
  let bonus = 0;
  const anchorFires = (leadAuthor && qSet.has(leadAuthor)) || (yearMatch && qSet.has(yearMatch[1]));
  const anchorAllowed = !opts.gateAnchor ||
    topicOverlapCount >= 1 ||
    (opts.field && opts.field === field);
  if (anchorAllowed) {
    if (leadAuthor && qSet.has(leadAuthor)) bonus += 3;
    if (yearMatch && qSet.has(yearMatch[1])) bonus += 3;
  }

  return {
    filename, field, overlap, bonus, score: overlap + bonus, matchedTokens,
    matchedIdentity: matchedTokens.filter(t => identity.has(t)),
    topicOverlapCount,
    anchorFired: anchorFires, anchorSuppressed: anchorFires && !anchorAllowed,
  };
}

/* Full-text confirm. After the filename match, read the body and require that an IDF-weighted share
   of the question's TOPIC tokens actually occur in it. The weights are the candidate's own field's.
 *
 * THE DENOMINATOR IS NOT THE PROTOTYPE'S, AND THIS IS A PREMISE CORRECTION, NOT A PREFERENCE. The
 * prototype excluded every token the filename match had already spent, so that "a file is not
 * confirmed purely by restating its own author and year." That reasoning is right about author and
 * year and wrong about topic words, and the difference is not cosmetic. Measured on this shelf:
 *
 *   query   "What is the breakeven condition for lunar propellant against launched propellant?"
 *   file    logistics-and-delivery/jones-2020-lunar-propellant-breakeven.md   score 4.36, RANK 1
 *   prototype denominator, after removing the matched topic tokens:  condition, against, launched
 *   frac 0.00  ->  GATED OUT at any threshold above zero, while a file scoring 0.00 confirmed.
 *
 * The residue left after a good filename match is, by construction, the question's LEAST topical
 * words. So the better a file matches, the more purely junk the evidence it is judged on becomes,
 * and the top-ranked file is punished for ranking top. That is an inverted incentive and it fires
 * hardest on exactly the questions the merge exists to enable, because a cross-field question
 * carries more connective tissue between its two halves.
 *
 * Part 7 read the same symptom -- both members of the MITI contested pair gated out by frac >= 0.45
 * -- and attributed it to "a two-field question spreads its tokens across two vocabularies and no
 * single summary can carry 45% of them." That story is plausible and the measurement above says it
 * is not the mechanism. Raising or lowering 0.45 could never have fixed it; the denominator was
 * wrong. Only the matched IDENTITY tokens (leading author, four-digit year) are excluded here, which
 * preserves the rule the prototype actually needed -- a file cannot confirm itself by restating its
 * own byline -- while judging the body on the question's real subject.
 *
 * Field scoping still cuts against the naive expectation and the threshold still has to move: a
 * cross-field question puts economics tokens into the denominator of a lunar file's confirm, where
 * they are rare and therefore heavy, and a lunar summary cannot carry them. */
function confirmInText(literatureDir, candidate, questionTokens, threshold) {
  const thr = threshold === undefined ? CONFIRM_THRESHOLD : threshold;
  const text = fs.readFileSync(path.join(literatureDir, candidate.filename), 'utf8').toLowerCase();
  const spent = new Set(candidate.matchedIdentity || []);
  const cField = candidate.field;
  const remaining = [...new Set(questionTokens)].filter(t => !spent.has(t) && t.length > 2);
  if (remaining.length === 0) {
    /* Nothing left to confirm beyond the filename itself (a bare "author year" query); require the
       filename match to be non-trivial. */
    const ok = candidate.score >= 3;
    return { confirmed: ok, hits: [], checked: [], frac: ok ? 1 : 0, threshold: thr };
  }
  const hits = remaining.filter(t => text.includes(t));
  const w = t => idfFor(literatureDir, cField, t);
  const weightTotal = remaining.reduce((s, t) => s + w(t), 0);
  const weightHit = hits.reduce((s, t) => s + w(t), 0);
  const frac = weightTotal > 0 ? weightHit / weightTotal : 0;
  return { confirmed: frac >= thr && hits.length >= 1, hits, checked: remaining, frac, threshold: thr };
}

/* searchLiterature(literatureDir, queryText, opts)
 *   -> { candidates, best, confirmedSet, questionTokens, scoredCount, returned, truncated, threshold }
 *
 * candidates  the top `limit` scored files, each carrying its own confirmed flag and field.
 * best        the top-ranked CONFIRMED candidate, or null. A filename match that fails full-text
 *             confirmation is never returned as best.
 * confirmedSet every confirmed candidate in rank order. One winner cannot express a contested pair;
 *             which members a verdict needs is the router's question, not this file's.
 * truncated   how many scoring files were dropped by `limit`. The prototype discarded silently.
 *
 * opts: { limit=5, threshold=CONFIRM_THRESHOLD, gateAnchor=false, field }
 */
function searchLiterature(literatureDir, queryText, opts) {
  opts = opts || {};
  const limit = opts.limit || 5;
  const thr = opts.threshold === undefined ? CONFIRM_THRESHOLD : opts.threshold;
  const questionTokens = tokenize(queryText);
  const files = listCorpusFiles(literatureDir);
  requireNonEmptyCorpus(literatureDir, files);

  const allScored = files
    .map(f => scoreFile(questionTokens, f, literatureDir, opts))
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score);

  const head = allScored.slice(0, Math.max(limit, 10));
  const candidates = head
    .map(c => Object.assign({}, c, confirmInText(literatureDir, c, questionTokens, thr)))
    /* A filename-score tie is broken by which body actually confirms more of the question's
       remaining topic tokens, since that is the signal full-text confirmation exists to add. */
    .sort((a, b) => (b.score - a.score) || ((b.frac || 0) - (a.frac || 0)) ||
                    (a.filename < b.filename ? -1 : 1))
    .slice(0, limit);

  const confirmedSet = candidates.filter(c => c.confirmed);
  return {
    candidates,
    best: confirmedSet[0] || null,
    confirmedSet,
    questionTokens,
    scoredCount: allScored.length,
    returned: candidates.length,
    truncated: Math.max(0, allScored.length - candidates.length),
    threshold: thr,
  };
}

/* --demo: the (a) claim, run rather than repeated. Prints the pooled-against-scoped error for
   `moon` -- the token whose error was measured -- plus the register's own three B3 terms and the
   worst offenders on today's 169-file shelf. */
function runDemo(literatureDir) {
  const dir = literatureDir || path.join(__dirname, '..', '..', 'literature');
  const { tables, counts, fields } = buildTables(dir);
  console.log('corpus: ' + tables.get(POOLED).n + ' files; ' +
    fields.map(f => f + ' ' + counts.get(f)).join(', '));
  console.log('');
  console.log('term          field      df/N       pooled  scoped   error(nats)');
  const rows = [];
  for (const t of ['moon', 'capital', 'policy', 'targeting', 'income', 'water', 'launch',
                   'productivity', 'regolith', 'growth']) {
    for (const f of fields) rows.push(idfError(dir, t, f));
  }
  for (const r of rows) {
    console.log('  ' + r.token.padEnd(12) + r.field.padEnd(11) +
      (r.df + '/' + r.n).padEnd(11) +
      r.pooled.toFixed(2).padStart(6) + r.scoped.toFixed(2).padStart(8) +
      r.error.toFixed(2).padStart(10));
  }
  console.log('');
  const moonEcon = idfError(dir, 'moon', 'economics');
  console.log('MOON, the measured row: pooled ' + moonEcon.pooled.toFixed(2) + ' against ' +
    'economics-scoped ' + moonEcon.scoped.toFixed(2) + ' = ' + moonEcon.error.toFixed(2) +
    ' nats. df ' + moonEcon.pooledDf + '/' + moonEcon.pooledN + ' pooled, ' +
    moonEcon.df + '/' + moonEcon.n + ' scoped.');

  // Worst errors on the shelf, any term with pooled df >= 4.
  const pooledTbl = tables.get(POOLED);
  const worst = [];
  for (const [t, d] of pooledTbl.df) {
    if (d < 4 || t.length < 3 || /^\d+$/.test(t)) continue;
    for (const f of fields) {
      const e = idfError(dir, t, f);
      if (e.df >= 1) worst.push(e);
    }
  }
  worst.sort((a, b) => b.error - a.error);
  console.log('');
  console.log('worst pooled-table errors on this shelf (pooled df >= 4, scoped df >= 1):');
  for (const r of worst.slice(0, 10)) {
    console.log('  ' + r.token.padEnd(16) + r.field.padEnd(11) + (r.df + '/' + r.n).padEnd(10) +
      'pooled ' + r.pooled.toFixed(2) + '  scoped ' + r.scoped.toFixed(2) +
      '  err ' + r.error.toFixed(2));
  }
}

if (require.main === module) {
  if (process.argv.indexOf('--demo') !== -1) {
    runDemo(process.argv[process.argv.indexOf('--demo') + 1]);
  } else if (process.argv.indexOf('--query') !== -1) {
    const q = process.argv[process.argv.indexOf('--query') + 1];
    const dir = path.join(__dirname, '..', '..', 'literature');
    const r = searchLiterature(dir, q, { limit: 8 });
    console.log('query: ' + q);
    console.log('threshold ' + r.threshold + '; ' + r.scoredCount + ' scored, ' + r.returned +
      ' returned, ' + r.truncated + ' truncated');
    for (const c of r.candidates) {
      console.log('  ' + (c.confirmed ? 'OK ' : '-- ') + c.filename.padEnd(62) +
        ' [' + c.field + '] score=' + c.score.toFixed(2) + ' frac=' + c.frac.toFixed(2));
    }
    console.log('best: ' + (r.best ? r.best.filename : 'NULL') +
      '   confirmedSet: ' + r.confirmedSet.length);
  } else {
    console.log('literature_search.js is a library. --demo [dir] for the field-scoped IDF ' +
      'evidence; --query "..." for a ranked search; run oracle/retrieval/prove.js to self-test.');
  }
}

module.exports = {
  tokenize, listCorpusFiles, requireNonEmptyCorpus, baseName, filenameTokens,
  buildTables, idfFor, idfError, scoreFile, confirmInText, searchLiterature, runDemo,
  CONFIRM_THRESHOLD, POOLED,
};
