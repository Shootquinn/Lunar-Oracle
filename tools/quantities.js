#!/usr/bin/env node
/*
 * tools/quantities.js - the checker and indexer for COUNTING_RULE.md.
 *
 * Authority: COUNTING_RULE.md, contract version 2 (sub-step 1.12, The Designer; amended at
 * R-4 of the Step 1 close). This script implements that contract's section 9 clauses M1-M15
 * over the declared file set of its section 8.
 *
 * Built at 1.14 against contract version 1, with the Wave 2 amendments behind flags so they
 * could be measured before they were ruled. R-4 ruled them in. The flags are now inverted:
 * the amended behaviour is the default and the escape hatch is named for what it restores.
 *
 * Check-register rows: CHK-14 (--check), CHK-15 (--lint), CHK-16 (--index), CHK-17 (--live).
 * Shares one parse with --index so checker and indexer cannot disagree (M6).
 *
 * Modes:
 *   --check   hard clauses. Exit 1 on any FAIL line. M1 M2 M3 M4 M10 M11 M12, plus
 *             M6 M7 when QUANTITIES.md exists.
 *   --lint    soft clauses. Always exit 0. M5 drift, M8, M9, M13, M14, M15.
 *   --index   regenerate QUANTITIES.md on stdout, or in place with --write.
 *   --census  parse only; print the block and tag census. Exit 0.
 *
 * Flags. The first three restore version-1 behaviour and exist to measure an amendment,
 * never to get a cleaner number: a count taken under any of them says so, per section 3
 * rule 11.
 *   --include-superseded   do NOT apply section 8's promotion clause. Restores the parse in
 *                which a promoted cr_scratch marker range is still a site. Measured at 1.14:
 *                this is worth nine hard failures, eight of them duplicate ids created by
 *                the promotion itself.
 *   --no-eg      do NOT treat Q-EG- as an example namespace, and parse quantity fences
 *                nested inside four-backtick displays as blocks. Version-1 behaviour.
 *   --no-cwd-length   M11 asserts only that the string "cwd:" appears, without the character
 *                count section 2 requires. Version-1 behaviour.
 *   --live       actually run "class: live" operation commands for M5. Off by default:
 *                M5 executes strings out of markdown, which is not something a check
 *                should do without being asked.
 *   --files-only print the declared file set and exit.
 *
 * Output prefixes are fixed, and they are the counting rule for this tool's own report
 * (COUNTING_RULE.md section 3 rule 11):
 *   FAIL   a hard failure. Determines --check's exit status. Count with grep -c "^FAIL ".
 *   LINT   a soft finding. Never affects exit status.
 *   STALE  an M4 staleness report. Never affects exit status.
 *   DRIFT  an M5 drift report. Never affects exit status.
 *   NOTE   an observation about the run itself.
 *   OK     a clause that passed.
 * Every prefix is printed at column 0 and nothing else is, so a count of any prefix taken
 * over the whole unfiltered output is exact. This is a requirement, not a description:
 * tools/ecr_verify.js indents its FAIL lines two spaces and grep -c '^FAIL' over its output
 * returns 0 against a real count of 143.
 */


'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/* Bumped whenever a clause's PATTERN or POPULATION changes, because a figure taken under
 * one version is not comparable with a figure taken under another and nothing else in the
 * output records which version ran. 2.19-1 is the first stamped version and carries the
 * M13 and M15 changes of AM-137/138/141. */
const TOOL_VERSION = '2.19-1';

const ROOT = process.env.QJS_ROOT ? path.resolve(process.env.QJS_ROOT) : process.cwd();
const argv = process.argv.slice(2);
const has = f => argv.indexOf(f) !== -1;
const argVal = f => { const i = argv.indexOf(f); return i === -1 ? null : argv[i + 1]; };

const OPT = {
  check: has('--check'),
  lint: has('--lint'),
  index: has('--index'),
  census: has('--census'),
  write: has('--write'),
  live: has('--live'),
  w2_1: !has('--no-eg'),
  w2_3: !has('--no-cwd-length'),
  exclSup: !has('--include-superseded'),
  filesOnly: has('--files-only')
};
if (!OPT.check && !OPT.lint && !OPT.index && !OPT.census && !OPT.filesOnly) OPT.check = true;

/* ---------------------------------------------------------------- file set */
/* COUNTING_RULE.md section 8, verbatim:
 *     *.md                     (repository root)
 *     cr_scratch/star-star/*.md
 *     tools/star-star/*.js
 *     oracle/star-star         when it exists
 *     literature/star-star/*.md  when it exists
 * It does not scan lsei/ or cr-agents/. _intake/ is not in the set either: section 8
 * names five globs and that is the whole set.
 */
function walk(dir, pred, out) {
  out = out || [];
  let ents;
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return out; }
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, pred, out);
    else if (pred(p)) out.push(p);
  }
  return out;
}
function rel(p) { return path.relative(ROOT, p).split(path.sep).join('/'); }

function declaredFileSet() {
  const files = [];
  for (const e of fs.readdirSync(ROOT, { withFileTypes: true })) {
    if (e.isFile() && /\.md$/.test(e.name)) files.push(path.join(ROOT, e.name));
  }
  walk(path.join(ROOT, 'cr_scratch'), p => /\.md$/.test(p), files);
  walk(path.join(ROOT, 'tools'), p => /\.js$/.test(p), files);
  walk(path.join(ROOT, 'oracle'), () => true, files);
  walk(path.join(ROOT, 'literature'), p => /\.md$/.test(p), files);
  const seen = Object.create(null);
  const outp = [];
  for (const f of files) { const r = rel(f); if (!seen[r]) { seen[r] = 1; outp.push(r); } }
  return outp.sort();
}

/* ---------------------------------------------------------------- read-digest
 * COUNTING_RULE.md section 3 rule 11 requires a failure count to carry its command. It did
 * not require the count to carry its MOMENT, and that is the hole this closes.
 *
 * Measured, not hypothetical: across Step 2 Cycle A the hard-failure count of this very
 * tool was reported as 12, then 13, then 14, then 12 again, by three seats and the
 * orchestrator. Every one was a correct measurement. Every one was of a different declared
 * file set, because the seats were writing into that set while measuring it -- disjoint
 * WRITE sets are not disjoint READ sets, since this tool walks the whole declared set and
 * not the caller's write set. Not one figure carried its moment and no two can be
 * reconciled from what is written.
 *
 * So: every run prints the count of files it read and a digest over (path, size, mtime) of
 * exactly that set. Two figures carrying different digests are NOT COMPARABLE, and
 * --compare <digest> makes the tool say so rather than a person.
 *
 * mtime is in the digest deliberately. A half-written file that is later completed to the
 * same byte length would otherwise digest identically, and the 12-13-14-12 sequence was
 * produced by exactly that: reading a colleague's file mid-write. */
function readDigest(relPaths) {
  const h = crypto.createHash('sha256');
  for (const r of relPaths.slice().sort()) {
    let st;
    try { st = fs.statSync(path.join(ROOT, r)); }
    catch (e) { h.update(r + ' MISSING\n'); continue; }
    h.update(r + ' ' + st.size + ' ' + st.mtimeMs + '\n');
  }
  return h.digest('hex').slice(0, 16);
}

/* ---------------------------------------------------------------- parsing */
const KEYS = ['id', 'class', 'value', 'unit', 'population', 'operation', 'conditions',
  'at', 'predicate', 'derived-from', 'sampled', 'superseded'];
const CLASSES = { fixed: 1, live: 1, provisional: 1, quoted: 1, superseded: 1 };

/* Read a file with line endings normalised for parsing only. Every offset this tool
 * reports is a 1-based line number in the file as it sits on disk; CRLF, LF and mixed
 * files all yield the same numbers because the split is on \n after \r removal. */
function readLines(p) {
  return fs.readFileSync(path.join(ROOT, p), 'utf8').replace(/\r\n?/g, '\n').split('\n');
}

function readBlock(file, lines, start, ticks) {
  let end = -1;
  for (let j = start + 1; j < lines.length; j++) {
    const c = /^(\s*)(`{3,})\s*$/.exec(lines[j]);
    if (c && c[2].length >= ticks) { end = j; break; }
  }
  if (end < 0) return null;
  const body = lines.slice(start + 1, end);
  const fields = Object.create(null);
  const order = [];
  let cur = null;
  for (const line of body) {
    const km = /^([a-z][a-z-]*):[ \t]?(.*)$/.exec(line);
    if (km) {
      cur = km[1];
      order.push(cur);
      fields[cur] = km[2];
    } else if (cur !== null) {
      fields[cur] += ' ' + line.trim();
    }
  }
  for (const k of Object.keys(fields)) fields[k] = fields[k].trim();
  return {
    file: file, startLine: start + 1, endLine: end, fields: fields, order: order,
    id: fields.id || null
  };
}

/* Find fenced blocks tagged quantity. Tracks fence length so a ```quantity opened inside
 * a four-backtick fence is still seen: the contract as written has no nesting rule, and
 * W2-1 proposes one. --w2-1 turns the proposal on. */
function parseBlocks(file, lines) {
  const blocks = [];
  let outerFence = null;
  let i = 0;
  while (i < lines.length) {
    const m = /^(\s*)(`{3,})(.*)$/.exec(lines[i]);
    if (!m) { i++; continue; }
    /* CommonMark: a fence openers info string contains no backtick. A line such as
     * ```` ```quantity ```` is an INLINE code span in prose, not a fence. Without this
     * guard the four-backtick rule opened a fence at that line and swallowed every block
     * after it -- measured at R-4: four blocks lost in one file. */
    if (m[3].indexOf(String.fromCharCode(96)) !== -1) { i++; continue; }
    const ticks = m[2].length;
    const info = m[3].trim();
    if (outerFence !== null) {
      if (ticks >= outerFence && info === '') { outerFence = null; i++; continue; }
      if (info === 'quantity' && !OPT.w2_1) {
        const b = readBlock(file, lines, i, ticks);
        if (b) { blocks.push(b); i = b.endLine + 1; continue; }
      }
      i++; continue;
    }
    if (ticks >= 4) { outerFence = ticks; i++; continue; }
    if (info === 'quantity') {
      const b = readBlock(file, lines, i, ticks);
      if (b) { blocks.push(b); i = b.endLine + 1; continue; }
    }
    i++;
  }
  return blocks;
}

/* ---------------------------------------------------------------- tags */
const TAG_RE = /\[(Q-[A-Z0-9][A-Z0-9-]*)\]/g;
const QUOTE_RE = /(\S+)[ \t]*\[(Q-[A-Z0-9][A-Z0-9-]*)\]/g;
const LINK_RE = /\[(Q-[A-Z0-9][A-Z0-9-]*)\]\(/g;
/* COUNTING_RULE.md section 3 rules 8 and 9, and section 9 M3: read the value that sits before
 * a tag, tolerating the emphasis and backticks authors actually wrote, and reading a whole
 * range token. Returns {kind, text}. kind: 'range' | 'num' | 'word' | 'none'. */
function readValueBefore(line, tagStart) {
  var s = line.slice(0, tagStart);
  s = s.replace(/[\s]+$/, '');
  /* strip trailing markdown that is not part of the value */
  s = s.replace(/[`*_)\]"']+$/, '');
  var m = /(\d[\d,._]*\s*[\u2013\u2014-]\s*\d[\d,._]*\s+(?:inclusive|exclusive))$/.exec(s);
  if (m) return { kind: 'range', text: m[1].replace(/\s+/g, ' ') };
  m = /(?:^|[^A-Za-z0-9])([~<>]?\d[\d,._]*%?)$/.exec(s);
  if (m) return { kind: 'num', text: m[1] };
  m = /([A-Za-z0-9][A-Za-z0-9._-]*)$/.exec(s);
  if (m) return { kind: 'word', text: m[1] };
  return { kind: 'none', text: (s.split(/\s+/).pop() || '') };
}

const isExample = id => OPT.w2_1 && /^Q-EG-/.test(id);

/* ---------------------------------------------------------------- load */
const out = [];
const say = (pre, msg) => out.push(pre + ' ' + msg);
let hardFail = 0;
const FAIL = m => { hardFail++; out.push('FAIL ' + m); };

const files = declaredFileSet();
if (OPT.filesOnly) { console.log(files.join('\n')); process.exit(0); }

/* The moment this run was taken. Printed before any clause runs, so the stamp exists even
 * if a clause throws. */
const READ_DIGEST = readDigest(files);
const FLAGSTR = argv.filter(a => /^--/.test(a) && a !== '--compare').sort().join(' ') || '(none)';
say('NOTE', 'tools/quantities.js version ' + TOOL_VERSION + ' flags ' + FLAGSTR);
say('NOTE', 'read-digest ' + READ_DIGEST + ' over ' + files.length +
  ' files (path,size,mtime); this digest is the moment, and a figure from this run is ' +
  'comparable only with a figure carrying the same digest');
{
  const prior = argVal('--compare');
  if (prior) {
    if (prior === READ_DIGEST) say('NOTE', 'COMPARABLE: --compare ' + prior + ' equals this run\'s read-digest');
    else say('NOTE', 'NOT COMPARABLE: --compare ' + prior + ' is a different declared file set from ' +
      READ_DIGEST + '. Two counts across these two digests are two correct measurements of ' +
      'two different moments and must not be reconciled, differenced, or quoted as one figure.');
  }
}

function markerRanges(lines) {
  const r = [];
  let open = null;
  for (let k = 0; k < lines.length; k++) {
    let m = /^<!--\s*BEGIN\s+(.+?)\s*-->\s*$/.exec(lines[k]);
    if (m) { open = { name: m[1], from: k + 1 }; continue; }
    m = /^<!--\s*END\s+(.+?)\s*-->\s*$/.exec(lines[k]);
    if (m && open) { r.push({ name: open.name, from: open.from, to: k + 1 }); open = null; }
  }
  return r;
}

const promotedMarkers = Object.create(null);
try {
  const mf = fs.readFileSync(path.join(ROOT, 'oracle/MANIFEST.tsv'), 'utf8').replace(/\r/g, '');
  for (const line of mf.split('\n')) {
    const f = line.split('\t');
    if (f[0] === 'D' && f[6] === 'promoted') promotedMarkers[f[3]] = 1;
  }
} catch (e) { /* no manifest yet */ }

const blocks = [];
const tagSites = [];
const quoteSites = [];
const linkSites = [];
const fileLines = [];

for (const f of files) {
  let lines;
  try { lines = readLines(f); } catch (e) { continue; }
  fileLines.push([f, lines]);
  const ranges = markerRanges(lines);
  const suppressed = (OPT.exclSup && f.indexOf('cr_scratch/') === 0)
    ? ranges.filter(r => promotedMarkers[r.name]) : [];
  const inSup = n => suppressed.some(r => n >= r.from && n <= r.to);

  for (const b of parseBlocks(f, lines)) {
    if (inSup(b.startLine)) continue;
    blocks.push(b);
  }
  for (let k = 0; k < lines.length; k++) {
    if (inSup(k + 1)) continue;
    const l = lines[k];
    let m;
    TAG_RE.lastIndex = 0;
    while ((m = TAG_RE.exec(l))) tagSites.push({ file: f, line: k + 1, id: m[1] });
    TAG_RE.lastIndex = 0;
    while ((m = TAG_RE.exec(l))) {
      var v = readValueBefore(l, m.index);
      quoteSites.push({ file: f, line: k + 1, id: m[1], token: v.text, kind: v.kind, text: l });
    }
    LINK_RE.lastIndex = 0;
    while ((m = LINK_RE.exec(l))) linkSites.push({ file: f, line: k + 1, id: m[1] });
  }
}

const byId = new Map();
for (const b of blocks) {
  if (!b.id) continue;
  if (!byId.has(b.id)) byId.set(b.id, []);
  byId.get(b.id).push(b);
}

const distinctBlockFiles = {};
for (const b of blocks) distinctBlockFiles[b.file] = 1;
const distinctTagIds = {};
for (const t of tagSites) distinctTagIds[t.id] = 1;

say('NOTE', 'declared file set: ' + files.length + ' files');
say('NOTE', 'quantity blocks parsed: ' + blocks.length + ' across ' +
  Object.keys(distinctBlockFiles).length + ' files');
say('NOTE', 'quotation tag sites: ' + tagSites.length + '; distinct ids referenced: ' +
  Object.keys(distinctTagIds).length);

/* ---------------------------------------------------------------- M1 */
function m1() {
  let n = 0;
  for (const b of blocks) {
    const got = Object.keys(b.fields);
    const missing = KEYS.filter(k => got.indexOf(k) === -1);
    const extra = got.filter(k => KEYS.indexOf(k) === -1);
    const empty = KEYS.filter(k => got.indexOf(k) !== -1 && b.fields[k] === '');
    if (missing.length || extra.length || empty.length) {
      n++;
      FAIL('M1 ' + b.file + ':' + b.startLine + ' ' + (b.id || '(no id)') +
        (missing.length ? ' missing=[' + missing + ']' : '') +
        (extra.length ? ' extra=[' + extra + ']' : '') +
        (empty.length ? ' empty=[' + empty + ']' : ''));
      continue;
    }
    const cls = (b.fields.class || '').split(/[\s;,]/)[0];
    if (!CLASSES[cls]) {
      n++;
      FAIL('M1 ' + b.file + ':' + b.startLine + ' ' + b.id +
        ' class not in the closed set of five: "' + b.fields.class + '"');
      continue;
    }
    if (b.order.filter(k => KEYS.indexOf(k) !== -1).join(',') !== KEYS.join(',')) {
      say('LINT', 'M1-order ' + b.file + ':' + b.startLine + ' ' + b.id +
        ' twelve keys present but not in the declared order');
    }
  }
  if (!n) say('OK', 'M1 every quantity block is well-formed');
  return n;
}

/* ---------------------------------------------------------------- M2 */
function m2() {
  let n = 0;
  let dup = 0;
  for (const pair of byId) {
    if (pair[1].length > 1) {
      n++; dup++;
      FAIL('M2 duplicate id ' + pair[0] + ' in ' +
        pair[1].map(b => b.file + ':' + b.startLine).join(' , '));
    }
  }
  const unresolved = new Map();
  for (const t of tagSites) {
    if (isExample(t.id)) continue;
    if (byId.has(t.id)) continue;
    if (!unresolved.has(t.id)) unresolved.set(t.id, []);
    unresolved.get(t.id).push(t.file + ':' + t.line);
  }
  let sites = 0;
  for (const pair of unresolved) {
    n++; sites += pair[1].length;
    FAIL('M2 unresolved tag ' + pair[0] + ' at ' + pair[1].length + ' site(s): ' + pair[1].join(' , '));
  }
  say('NOTE', 'M2 detail: ' + unresolved.size + ' unresolved ids over ' + sites +
    ' sites; ' + dup + ' duplicate ids');
  if (!n) say('OK', 'M2 every quotation tag resolves and ids are unique');
  return n;
}

/* ---------------------------------------------------------------- M3 */
const NUMERAL = /^[~<>]?\(?[0-9][0-9,._–—-]*%?\)?[.,;:)]?$/;
function normNum(s) { return String(s).replace(/[^0-9.–-]/g, '').replace(/[.,;:]+$/, ''); }
/* Canonical form of a value, for M3's comparison. COUNTING_RULE.md section 3 rules 8 and 9. */
function canon(s) {
  s = String(s == null ? '' : s).trim().toLowerCase()
        .replace(/[\u2013\u2014]/g, '-').replace(/\s+/g, ' ');
  var m = /^(\d[\d,._]*\s*-\s*\d[\d,._]*\s+(?:inclusive|exclusive))/.exec(s);
  if (m) return m[1].replace(/\s*-\s*/, '-').replace(/,/g, '');
  m = /^([~<>]?\d[\d,._]*%?)$/.exec(s);
  if (m) return m[1].replace(/,/g, '').replace(/%/g, '').replace(/[.]+$/, '');
  return s;
}
function isNumericCanon(c) { return /^[~<>]?\d/.test(c); }
function m3() {
  let n = 0, unreadable = 0, mismatch = 0;
  const g = new Map();
  for (const q of quoteSites) {
    if (isExample(q.id)) continue;
    if (!byId.has(q.id)) continue;               /* that is M2's failure, not M3's */
    const blk = byId.get(q.id)[0];
    const blockCanon = canon(blk.fields.value);
    if (String(blk.fields.class || '').split(/[s;,]/)[0] === 'live') {
      /* section 3 rule 2: a live quotation carries value, timestamp and command on the line. */
      const lit = String(blk.fields.value || '').split(/[s(;]/)[0];
      if (lit && String(q.text || '').indexOf(lit) === -1) {
        mismatch++;
        say('LINT', 'M3-live ' + q.file + ':' + q.line + ' ' + q.id +
          ' does not carry the current value "' + lit + '" on the line (section 3 rule 2)');
      }
      continue;
    }
    if (q.kind === 'range' || q.kind === 'num') {
      if (!g.has(q.id)) g.set(q.id, new Map());
      const key = canon(q.token);
      if (!g.get(q.id).has(key)) g.get(q.id).set(key, []);
      g.get(q.id).get(key).push(q.file + ':' + q.line);
      continue;
    }
    if (isNumericCanon(blockCanon)) {
      unreadable++;
      say('LINT', 'M3-unreadable ' + q.file + ':' + q.line + ' ' + q.id +
        ' the text before the tag is "' + q.token + '", not the value; section 3 rule 8');
      continue;
    }
    /* a governed observation or a ref: containment, and soft. H1 owns the rest. */
    if (q.kind === 'word' && blockCanon.indexOf(canon(q.token)) === -1) {
      mismatch++;
      say('LINT', 'M3-prose ' + q.file + ':' + q.line + ' ' + q.id +
        ' "' + q.token + '" does not appear in the block value; H1 rules on it');
    }
  }
  for (const pair of g) {
    const id = pair[0], vals = pair[1];
    const blockVal = canon(byId.get(id)[0].fields.value);
    if (vals.size > 1) {
      n++;
      const parts = [];
      for (const v of vals) parts.push(v[0] + '(' + v[1].join(';') + ')');
      FAIL('M3 ' + id + ' quoted with ' + vals.size + ' distinct values: ' + parts.join(' vs '));
    } else {
      const v = vals.keys().next().value;
      if (blockVal && v !== blockVal) {
        n++;
        FAIL('M3 ' + id + ' quoted as ' + v + ' at ' + vals.get(v).join(' , ') +
          ' but the block value is ' + blockVal);
      }
    }
  }
  say('NOTE', 'M3 detail: ' + unreadable + ' unreadable sites; ' + mismatch + ' prose mismatches');
  if (!n) say('OK', 'M3 every site quoting an id states its current value');
  return n;
}


/* ---------------------------------------------------------------- M4 */
function parseAt(s) { const m = /(\d{4}-\d{2}-\d{2})/.exec(s || ''); return m ? m[1] : null; }
function m4() {
  let n = 0;
  const edges = [];
  for (const b of blocks) {
    const df = (b.fields['derived-from'] || '').trim();
    if (!df || /^none\b/i.test(df) || /^n\/a\b/i.test(df)) continue;
    const parents = df.match(/Q-[A-Z0-9][A-Z0-9-]*/g) || [];
    if (!parents.length) {
      n++;
      FAIL('M4 ' + b.file + ':' + b.startLine + ' ' + b.id +
        ' derived-from is neither "none" nor a list of ids: "' + df + '"');
      continue;
    }
    for (const p of parents) {
      if (isExample(p)) continue;
      if (!byId.has(p)) {
        n++;
        FAIL('M4 dangling parent ' + p + ' of ' + b.id + ' (' + b.file + ':' + b.startLine + ')');
        continue;
      }
      edges.push([p, b.id]);
      const pa = parseAt(byId.get(p)[0].fields.at), ca = parseAt(b.fields.at);
      if (pa && ca && pa > ca) {
        say('STALE', 'M4 ' + b.id + ' (at ' + ca + ') rests on ' + p + ' (at ' + pa +
          '), which was corrected later');
      }
    }
  }
  const adj = new Map(), indeg = new Map();
  for (const e of edges) {
    if (!adj.has(e[0])) adj.set(e[0], []);
    adj.get(e[0]).push(e[1]);
    indeg.set(e[1], (indeg.get(e[1]) || 0) + 1);
    if (!indeg.has(e[0])) indeg.set(e[0], 0);
  }
  const q = [];
  for (const k of indeg.keys()) if (!indeg.get(k)) q.push(k);
  let seen = 0;
  while (q.length) {
    const v = q.shift(); seen++;
    for (const c of (adj.get(v) || [])) { indeg.set(c, indeg.get(c) - 1); if (!indeg.get(c)) q.push(c); }
  }
  if (seen !== indeg.size) {
    n++;
    FAIL('M4 the derivation graph has a cycle (' + (indeg.size - seen) +
      ' ids unreachable by topological order)');
  }
  if (!n) say('OK', 'M4 derivation graph sound: ' + edges.length + ' edges, acyclic');
  return n;
}

/* COUNTING_RULE.md section 4: a pending: entry names a row in oracle/AMENDMENTS.tsv. */
const amendmentIds = Object.create(null);
try {
  const am = fs.readFileSync(path.join(ROOT, 'oracle/AMENDMENTS.tsv'), 'utf8').replace(/\r/g, '');
  for (const line of am.split('\n')) {
    const f = line.split('\t');
    if (f[0] === 'A' && f[1]) amendmentIds[f[1].trim()] = 1;
  }
} catch (e) { /* no register yet */ }
function m4pending() {
  let n = 0;
  for (const b of blocks) {
    const sup = String(b.fields.superseded || '');
    const m = /pending:\s*([^\n]+)/.exec(sup);
    if (!m) continue;
    const ids = m[1].match(/AM-\d+/g) || [];
    if (!ids.length) {
      n++;
      FAIL('M4 ' + b.file + ':' + b.startLine + ' ' + b.id +
        ' pending: names no amendment id: "' + m[1].slice(0, 60) + '"');
      continue;
    }
    for (const a of ids) {
      if (!amendmentIds[a]) {
        n++;
        FAIL('M4 ' + b.file + ':' + b.startLine + ' ' + b.id +
          ' pending: names ' + a + ', which is not a row in oracle/AMENDMENTS.tsv');
      }
    }
  }
  return n;
}
/* COUNTING_RULE.md section 2: the derived: operation form. Integer arithmetic over ids. */
function m4derived() {
  let n = 0;
  for (const b of blocks) {
    const op = String(b.fields.operation || '').trim();
    if (!/^derived:/i.test(op)) continue;
    let expr = op.replace(/^derived:\s*/i, '').split(/[,;]|\bwhere\b/)[0].trim();
    const ids = expr.match(/Q-[A-Z0-9][A-Z0-9-]*/g) || [];
    if (!ids.length) {
      n++;
      FAIL('M4 ' + b.id + ' derived: operation names no ids: "' + expr.slice(0, 50) + '"');
      continue;
    }
    let ok = true;
    for (const id of ids) {
      if (!byId.has(id)) { ok = false; n++; FAIL('M4 ' + b.id + ' derived: names unknown id ' + id); continue; }
      const pv = canon(byId.get(id)[0].fields.value);
      if (!/^\d+$/.test(pv)) { ok = false; say('LINT', 'M4-derived ' + b.id + ' parent ' + id + ' has a non-integer value; arithmetic not evaluated'); continue; }
      expr = expr.split(id).join(pv);
    }
    if (!ok) continue;
    if (!/^[0-9+\-*/() ]+$/.test(expr)) {
      say('LINT', 'M4-derived ' + b.id + ' expression is not plain integer arithmetic: "' + expr.slice(0, 50) + '"');
      continue;
    }
    let got;
    try { got = Function('"use strict";return (' + expr + ');')(); } catch (e) { got = null; }
    const want = Number(canon(b.fields.value));
    if (got === null || !isFinite(got)) {
      n++; FAIL('M4 ' + b.id + ' derived: expression did not evaluate: "' + expr + '"');
    } else if (got !== want) {
      n++; FAIL('M4 ' + b.id + ' derived: ' + expr + ' = ' + got + ' but the block value is ' + want);
    } else {
      say('OK', 'M4 ' + b.id + ' derived: ' + expr + ' = ' + got + ', matches the block value');
    }
  }
  return n;
}

/* ---------------------------------------------------------------- M10 */
function m10() {
  let n = 0;
  for (const b of blocks) {
    const m = /(\d+)\s*[–—-]\s*(\d+)\s+(inclusive|exclusive)/.exec(b.fields.value || '');
    if (!m) continue;
    const lo = +m[1], hi = +m[2];
    const span = m[3] === 'inclusive' ? hi - lo + 1 : hi - lo - 1;
    const hay = (b.fields.value || '') + ' ' + (b.fields.predicate || '');
    const st = /(\d+)\s+(lines|characters|rows|items|files|entries)\b/.exec(hay);
    if (st && +st[1] !== span && +st[1] !== lo && +st[1] !== hi) {
      n++;
      FAIL('M10 ' + b.id + ' range ' + lo + '-' + hi + ' ' + m[3] + ' spans ' + span +
        ' but the block states ' + st[1] + ' ' + st[2]);
    }
  }
  if (!n) say('OK', 'M10 range arithmetic closes');
  return n;
}

/* ---------------------------------------------------------------- M11 */
function m11() {
  let n = 0;
  /* COUNTING_RULE.md section 2: conditions may read "inherits: Q-<id>". M11 follows the
   * edge and checks the parent, up to a small depth so a cycle cannot hang the check. */
  function resolveCond(b, depth) {
    const cond = b.fields.conditions || '';
    const m = /inherits:\s*(Q-[A-Z0-9][A-Z0-9-]*)/.exec(cond);
    if (!m) return { cond: cond, from: b.id };
    if (depth > 4) return { cond: cond, from: b.id, loop: true };
    if (!byId.has(m[1])) return { cond: cond, from: b.id, missing: m[1] };
    return resolveCond(byId.get(m[1])[0], depth + 1);
  }
  for (const b of blocks) {
    const op = (b.fields.operation || '').trim();
    if (!/^(cmd|script):/.test(op)) continue;
    const r = resolveCond(b, 0);
    if (r.missing) {
      n++;
      FAIL('M11 ' + b.file + ':' + b.startLine + ' ' + b.id +
        ' conditions inherits ' + r.missing + ', which is not a block');
      continue;
    }
    if (r.loop) {
      n++;
      FAIL('M11 ' + b.file + ':' + b.startLine + ' ' + b.id +
        ' conditions inheritance did not terminate within four hops');
      continue;
    }
    const cond = r.cond;
    const via = r.from === b.id ? '' : ' (inherited from ' + r.from + ')';
    if (cond.indexOf('cwd:') === -1) {
      n++;
      FAIL('M11 ' + b.file + ':' + b.startLine + ' ' + b.id + ' operation is "' +
        op.slice(0, 14) + '..." but conditions names no cwd:' + via);
      continue;
    }
    if (OPT.w2_3) {
      const seg = cond.split('cwd:')[1].split(/\.\s|\.$/)[0];
      if (!/\d+\s*characters/.test(seg) && seg.indexOf('length-independent:') === -1) {
        n++;
        FAIL('M11 ' + b.file + ':' + b.startLine + ' ' + b.id +
          ' names a cwd with no character length: "cwd:' + seg.slice(0, 60) + '"' + via);
      }
    }
  }
  if (!n) say('OK', 'M11 every cmd:/script: operation declares a cwd and its length');
  return n;
}

/* ---------------------------------------------------------------- M12 */
function m12() {
  let n = 0;
  for (const s of linkSites) {
    if (isExample(s.id)) continue;
    n++;
    FAIL('M12 ' + s.file + ':' + s.line + ' id ' + s.id + ' used as a markdown link target');
  }
  if (!n) say('OK', 'M12 ids are not markdown link targets');
  return n;
}

/* ---------------------------------------------------------------- index, M6, M7 */
function shortUnit(u) {
  const s = String(u || '').split(/[,;(]/)[0].trim();
  return s.length > 44 ? s.slice(0, 41) + '...' : s;
}
function supCount(s) {
  const v = String(s || '').trim();
  if (!v || /^none\b/i.test(v) || /^n\/a\b/i.test(v)) return 0;
  const m = v.match(/\(/g);
  return m ? m.length : 1;
}
function buildIndex() {
  const rows = [];
  for (const pair of byId) rows.push(pair[1][0]);
  rows.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  const byClass = {};
  for (const b of rows) {
    const c = String(b.fields.class || '?').split(/\s/)[0];
    byClass[c] = (byClass[c] || 0) + 1;
  }
  const L = [];
  L.push('<!-- GENERATED by tools/quantities.js --index. Never hand-edited: COUNTING_RULE.md section 7. -->');
  L.push('');
  L.push('# QUANTITIES');
  L.push('');
  L.push('**' + rows.length + ' blocks.** ' +
    Object.keys(byClass).sort().map(c => c + ' ' + byClass[c]).join('; ') + '.');
  L.push('');
  L.push('| id | value | unit | class | at | birth file | superseded |');
  L.push('|---|---|---|---|---|---|---|');
  for (const b of rows) {
    const val = String(b.fields.value || '').replace(/\|/g, '\\|');
    L.push('| ' + b.id + ' | ' + (val.length > 60 ? val.slice(0, 57) + '...' : val) +
      ' | ' + shortUnit(b.fields.unit).replace(/\|/g, '\\|') +
      ' | ' + String(b.fields.class || '').split(/\s/)[0] +
      ' | ' + (parseAt(b.fields.at) || '-') +
      ' | ' + b.file + ' | ' + supCount(b.fields.superseded) + ' |');
  }
  L.push('');
  return { text: L.join('\n') + '\n', rows: rows.length, byClass: byClass };
}
function m6m7() {
  let n = 0;
  const idx = buildIndex();
  const p = path.join(ROOT, 'QUANTITIES.md');
  if (!fs.existsSync(p)) {
    say('NOTE', 'M6/M7 not runnable: QUANTITIES.md does not exist. Run --index --write.');
    return 0;
  }
  const on = fs.readFileSync(p, 'utf8').replace(/\r\n?/g, '\n');
  if (on !== idx.text) { n++; FAIL('M6 QUANTITIES.md differs from the regenerated index (hand-edited or stale)'); }
  else say('OK', 'M6 the committed index equals the regenerated index');
  const dm = /\*\*(\d+) blocks\.\*\*/.exec(on);
  if (!dm) { n++; FAIL('M7 QUANTITIES.md declares no block count'); }
  else if (+dm[1] !== idx.rows) { n++; FAIL('M7 the index declares ' + dm[1] + ' blocks; ' + idx.rows + ' were emitted'); }
  else say('OK', 'M7 the index declares its own size correctly (' + idx.rows + ')');
  return n;
}

/* ---------------------------------------------------------------- lints */
const OFFSET_RE = /(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|[0-9]+) lines? (above|below|before|after)/gi;
function m8() {
  let k = 0;
  for (const fl of fileLines) {
    for (let i = 0; i < fl[1].length; i++) {
      OFFSET_RE.lastIndex = 0;
      let m;
      while ((m = OFFSET_RE.exec(fl[1][i]))) {
        k++;
        say('LINT', 'M8 ' + fl[0] + ':' + (i + 1) + ' bare relative offset "' + m[0] + '"');
      }
    }
  }
  say('NOTE', 'M8 ' + k + ' relative-offset findings');
}
function m9() {
  let k = 0;
  for (const fl of fileLines) {
    if (!/\.md$/.test(fl[0])) continue;
    for (let i = 0; i < fl[1].length; i++) {
      const l = fl[1][i];
      if (l.charAt(0) !== '|') continue;
      if (!/\b(FIXED|CLOSED)\b/.test(l)) continue;
      const re = /\b(yet|currently|still|already)\b/gi;
      let m;
      while ((m = re.exec(l))) {
        k++;
        say('LINT', 'M9 ' + fl[0] + ':' + (i + 1) + ' undated relative-time word "' + m[1] +
          '" in a closed register row');
      }
    }
  }
  say('NOTE', 'M9 ' + k + ' undated relative-time findings in closed register rows');
}
function m5() {
  const live = blocks.filter(b => /^live\b/.test(String(b.fields.class || '').trim()));
  if (!OPT.live) { say('NOTE', 'M5 ' + live.length + ' live blocks; not re-run (pass --live)'); return; }
  const execSync = require('child_process').execSync;
  for (const b of live) {
    const m = /^cmd:\s*([\s\S]+)$/.exec(String(b.fields.operation || ''));
    if (!m) { say('DRIFT', 'M5 ' + b.id + ' operation is not a cmd: form; cannot re-run'); continue; }
    let got;
    try {
      got = execSync(m[1], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    } catch (e) {
      say('DRIFT', 'M5 ' + b.id + ' operation failed to run: ' + String(e.message).split('\n')[0]);
      continue;
    }
    if (got !== String(b.fields.value || '').trim()) {
      say('DRIFT', 'M5 ' + b.id + ' value="' + b.fields.value + '" but the operation now returns "' + got + '"');
    } else {
      say('OK', 'M5 ' + b.id + ' current');
    }
  }
}
/* W2-2's missing lint, implemented rather than argued: a bare spelled-out or digit numeral
 * for a governed quantity, appearing in a file that is not its birth file, keyed on the
 * unit noun of each fixed block. Reported as M13 and marked as not being in the contract
 * as written. */
const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
  'eighteen', 'nineteen', 'twenty'];
/* AM-137 (contract, The Designer, applied at COUNTING_RULE.md section 9 M13) and AM-138
 * (this tool, mine). Three changes, and they are deliberately separable so that fixing the
 * tool does not read as reopening the ruling.
 *
 * AM-137, the POPULATION: literature/star-star/*.md leaves M13's scan, unconditionally, not
 * behind a flag. M13 returned 43 findings over the staged merged corpus and the precision
 * was 0 of 43. The cut is the CLAUSE and not the FILES: M8, M9, M14 and M15 each returned
 * zero over the same 176 files, so excluding the tree from LINT would remove four clauses
 * from a population that produces nothing from them. A corpus summary is our file holding
 * somebody else's prose; the apparatus we write into it is governed, the transcribed body
 * is not, because its numerals predate this project's quantities.
 *
 * AM-138 defect 1, the VALUE ADMISSION: parseInt("7.73") returns 7, so Q-REG-IDF-LOSS-FULL
 * -- a percentage with two decimal places -- entered an integer-keyed comparison at a value
 * it does not have, and every one of its 43 findings descends from that. Admit only a value
 * that is an INTEGER AS WRITTEN.
 *
 * AM-138 defect 2, the WORD BOUNDARY: \b sits between "." and "7", so \b(seven|7)\s+percent
 * matched the tail of any decimal ending in .7 -- "an average cost overrun of 44.7 percent"
 * was 36 of the 43. Refuse a numeral whose preceding character is a decimal point.
 *
 * The regression fixture is REG-M13-1 in oracle/tests/corpus_suite.md and it must produce
 * NOTHING: Q-REG-IDF-LOSS-FULL at value 7.73 against the line "an average cost overrun of
 * 44.7 percent". It is checked below, in this file, by --selftest. */
const M13_EXCLUDE = /^literature\/.*\.md$/;
function m13Sites(fileLines2, blocks2, sayFn) {
  let k = 0, scanned = 0, admitted = 0;
  for (const b of blocks2) {
    if (!/^fixed\b/.test(String(b.fields.class || '').trim())) continue;
    /* AM-138 defect 1: integer as written, not parseInt's prefix. */
    const raw = String(b.fields.value || '').trim();
    if (!/^-?\d+$/.test(raw)) continue;
    const v = parseInt(raw, 10);
    if (!isFinite(v) || v < 0 || v > 20) continue;
    const noun = String(b.fields.unit || '').split(/[,;(]/)[0].trim().split(/\s+/).slice(0, 3).join(' ');
    if (!noun) continue;
    admitted++;
    const nounRe = noun.split(/\s+/).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s+');
    let re;
    try { re = new RegExp('\\b(' + WORDS[v] + '|' + v + ')\\s+' + nounRe, 'gi'); } catch (e) { continue; }
    for (const fl of fileLines2) {
      if (fl[0] === b.file) continue;
      if (M13_EXCLUDE.test(fl[0])) continue;            /* AM-137 */
      for (let i = 0; i < fl[1].length; i++) {
        const l = fl[1][i];
        re.lastIndex = 0;
        let m;
        while ((m = re.exec(l))) {
          /* AM-138 defect 2: a numeral whose preceding character is a decimal point is the
           * tail of a decimal, not a governed numeral. Checked on the character before the
           * numeral itself, which is m.index because the numeral is the first group. */
          if (m.index > 0 && l.charAt(m.index - 1) === '.' && /^[0-9]/.test(m[0])) continue;
          if (l.slice(m.index, m.index + 200).indexOf('[' + b.id + ']') !== -1) continue;
          k++;
          if (sayFn) sayFn('LINT', 'M13 ' + fl[0] + ':' + (i + 1) + ' bare "' + m[0] + '" for ' + b.id +
            ' in a second file (W2-2; not in the contract as written)');
        }
      }
    }
  }
  for (const fl of fileLines2) if (!M13_EXCLUDE.test(fl[0])) scanned++;
  return { findings: k, scanned: scanned, admitted: admitted };
}
function m13() {
  const r = m13Sites(fileLines, blocks, say);
  const excluded = fileLines.length - r.scanned;
  say('NOTE', 'M13 ' + r.findings + ' bare-governed-numeral findings over ' + r.scanned +
    ' files, ' + excluded + ' excluded as literature/**/*.md per COUNTING_RULE.md section 9 M13; ' +
    r.admitted + ' blocks met the integer-as-written value trigger');
}


/* ---------------------------------------------------------------- M14 */
/* COUNTING_RULE.md section 9 M14 / section 10 H8: two ids for one quantity. A proxy on
 * unit and population equality, never a proof, and reported as LINT because only the
 * owner of both blocks can rule (H8). */
function m14() {
  const norm = s => String(s || '').toLowerCase().replace(/\s+/g, ' ').trim();
  const byUnit = new Map(), byPop = new Map();
  let k = 0;
  for (const b of blocks) {
    if (!b.id || isExample(b.id)) continue;
    const u = norm(b.fields.unit), p = norm(b.fields.population);
    if (u && u !== 'n/a') { if (!byUnit.has(u)) byUnit.set(u, []); byUnit.get(u).push(b); }
    if (p && p !== 'n/a' && p !== 'none') { if (!byPop.has(p)) byPop.set(p, []); byPop.get(p).push(b); }
  }
  for (const pair of byUnit) {
    if (pair[1].length < 2) continue;
    const ids = pair[1].map(b => b.id);
    if (new Set(ids).size < 2) continue;
    k++;
    say('LINT', 'M14 same unit under ' + new Set(ids).size + ' ids: ' + [...new Set(ids)].join(' , ') +
      ' — "' + pair[0].slice(0, 60) + '" (H8 rules)');
  }
  for (const pair of byPop) {
    if (pair[1].length < 2) continue;
    const ids = [...new Set(pair[1].map(b => b.id))];
    if (ids.length < 2) continue;
    k++;
    say('LINT', 'M14 same population under ' + ids.length + ' ids: ' + ids.join(' , ') + ' (H8 rules)');
  }
  say('NOTE', 'M14 ' + k + ' two-ids-one-quantity candidates');
}

/* ---------------------------------------------------------------- M15 */
/* COUNTING_RULE.md section 3 rule 12 and section 9 M15: the two boundaries that are files.
 * A relayed numeral in the accumulator or the gameplan carries its tag, or the seat that
 * wrote it did not run the operation. The other three boundaries are H7. */
/* AM-140 (contract) / AM-141 (this tool). The population was a two-element list in this
 * source -- const RELAY_FILES -- which is exactly the thing somebody must remember to
 * extend, and therefore the defect class arm 2a exists to remove. A LONGER HARD-CODED LIST
 * REPEATS IT AT A LARGER SIZE, so the remedy is not three more strings.
 *
 * COUNTING_RULE.md section 9 M15 at version 3: the population is COMPUTED FROM A PATH RULE
 * and is never enumerated here. The rule is accumulator.md, lunar-oracle-gameplan.md,
 * cr_scratch/relay/star-star/*.md, oracle/VERIFIED.tsv. VERIFIED.tsv is in because The
 * Manager's remedy names the verification record explicitly.
 *
 * Measured before it was specified, in a staged root: two relay files gives six findings;
 * the computed set scans seven and gives six; the computed set with the relayed number
 * minted as a block gives eight, and two of the new ones are live arm-2a relay errors in
 * Wave 1 spawn prompts. Under the two-file population they do not appear at all.
 *
 * The relay directory may not exist yet. That is not an error and it is not a pass either:
 * the census below reports the file count, so a population that quietly shrank to two is
 * visible in the output rather than inferable from it. The Manager's close item 19 test is
 * exactly that: if M15's file list at the Step 2 close is still two, arm 2a's remedy was
 * never applied. */
function m15Population(paths) {
  return paths.filter(p =>
    p === 'accumulator.md' ||
    p === 'lunar-oracle-gameplan.md' ||
    p === 'oracle/VERIFIED.tsv' ||
    /^cr_scratch\/relay\/.*\.md$/.test(p));
}
function m15() {
  let k = 0, scanned = 0;
  const pop = new Set(m15Population(fileLines.map(fl => fl[0])));
  for (const fl of fileLines) {
    if (!pop.has(fl[0])) continue;
    scanned++;
    for (const b of blocks) {
      const cls = String(b.fields.class || '').split(/[\s;,]/)[0];
      if (cls !== 'fixed' && cls !== 'live') continue;
      if (b.file === fl[0]) continue;
      const v = canon(b.fields.value);
      if (!/^\d+$/.test(v) || v.length < 2) continue;   /* single digits are noise */
      const noun = String(b.fields.unit || '').split(/[\s,;(]/).filter(Boolean)[0];
      if (!noun || noun.length < 4) continue;
      const re = new RegExp("\\b" + v + "\\b[^\\n]{0,40}?\\b" + noun.replace(/[^a-z0-9]/gi, ""), "i");
      for (let i = 0; i < fl[1].length; i++) {
        const l = fl[1][i];
        if (l.indexOf('[' + b.id + ']') !== -1) continue;
        if (!re.test(l)) continue;
        k++;
        say('LINT', 'M15 ' + fl[0] + ':' + (i + 1) + ' relays ' + v + ' ' + noun +
          ' without a tag; the id is ' + b.id + ' (section 3 rule 12)');
      }
    }
  }
  const declaredButUnread = m15Population(files).filter(p => !pop.has(p));
  say('NOTE', 'M15 ' + k + ' untagged relays across ' + scanned +
    ' relay files, computed from the section 9 M15 path rule and not enumerated in this source' +
    (declaredButUnread.length ? '; ' + declaredButUnread.length + ' population paths were not parsed as text: ' +
      declaredButUnread.join(' ') : ''));
  if (scanned <= 2) say('LINT', 'M15 population is ' + scanned + ' files. The Manager close item 19: ' +
    'if this is still two at the Step 2 close, cr_scratch/relay/ was never used and arm 2a\'s ' +
    'remedy was specified but not applied. The clause is correct and the practice is not.');
}

/* ---------------------------------------------------------------- run */
if (OPT.index) {
  const idx = buildIndex();
  if (OPT.write) {
    fs.writeFileSync(path.join(ROOT, 'QUANTITIES.md'), idx.text);
    console.error('wrote QUANTITIES.md: ' + idx.rows + ' blocks');
  } else {
    process.stdout.write(idx.text);
  }
  process.exit(0);
}
if (OPT.census) {
  console.log(out.join('\n'));
  for (const b of blocks) {
    console.log('BLOCK ' + b.file + ':' + b.startLine + ' ' + b.id + ' class=' +
      String(b.fields.class || '').split(/\s/)[0] + ' value=' + String(b.fields.value || '').slice(0, 40));
  }
  process.exit(0);
}
/* ---------------------------------------------------------------- --selftest
 * AM-138's regression fixture, run rather than described. A fixture that lives only in a
 * markdown table is a fixture nobody applies; MUT-2 of the corpus suite says a test whose
 * mutation has never been run is unrun, not green, and that applies to my own remedy.
 *
 * Three cases, all in memory, touching no file:
 *   S1  the AM-138 case itself: value 7.73 against "44.7 percent" -> must find NOTHING.
 *       It fails on BOTH defects independently, so S2 and S3 isolate them.
 *   S2  defect 1 alone: a non-integer value must never be admitted at its parseInt prefix.
 *   S3  defect 2 alone: an integer value 7 must not match the tail of "44.7 percent",
 *       but MUST still match a genuine bare "7 percent".
 * S3's second half is the one that matters: a fix that suppressed the false positive by
 * suppressing the clause would pass S1 and S2 and is caught only here. */
if (has('--selftest')) {
  const mk = (id, value, unit) => ({ id: id, file: 'FIXTURE.md', startLine: 1,
    fields: { id: id, class: 'fixed', value: value, unit: unit } });
  const line = t => [['OTHER.md', [t]]];
  const cases = [
    ['S1 AM-138 the filed case: 7.73 against "44.7 percent"',
      [mk('Q-REG-IDF-LOSS-FULL', '7.73', 'percent, mean IDF loss')],
      line('an average cost overrun of 44.7 percent'), 0],
    ['S2 defect 1 alone: a non-integer value is not admitted at its parseInt prefix',
      [mk('Q-X', '7.73', 'percent, mean IDF loss')],
      line('a clean bare 7 percent with no tag'), 0],
    ['S3a defect 2 alone: integer 7 does not match the tail of a decimal',
      [mk('Q-Y', '7', 'percent, mean IDF loss')],
      line('an average cost overrun of 44.7 percent'), 0],
    ['S3b the clause still fires: integer 7 matches a genuine bare "7 percent"',
      [mk('Q-Y', '7', 'percent, mean IDF loss')],
      line('the loss was 7 percent across the corpus'), 1],
    ['S4 AM-137: the same genuine hit inside literature/ is not scanned',
      [mk('Q-Y', '7', 'percent, mean IDF loss')],
      [['literature/isru-processing/x.md', ['the loss was 7 percent across the corpus']]], 0]
  ];
  let bad = 0;
  for (const c of cases) {
    const got = m13Sites(c[2], c[1], null).findings;
    if (got === c[3]) console.log('OK ' + c[0] + ' -> ' + got + ' finding(s), expected ' + c[3]);
    else { bad++; console.log('FAIL ' + c[0] + ' -> ' + got + ' finding(s), expected ' + c[3]); }
  }
  console.log('NOTE selftest ' + (cases.length - bad) + ' of ' + cases.length +
    ' cases pass, tool ' + TOOL_VERSION);
  process.exit(bad ? 1 : 0);
}

if (OPT.check) { m1(); m2(); m3(); m4(); m4pending(); m4derived(); m10(); m11(); m12(); m6m7(); }
if (OPT.lint) { m5(); m8(); m9(); m13(); m14(); m15(); }
/* The count carries its command AND its moment on the same line. Section 3 rule 11 required
 * the first; the 12-13-14-12 sequence is what the second exists to prevent. A figure lifted
 * off this line without the digest is not a figure, it is a number. */
say('NOTE', 'hard failures: ' + hardFail + ' @ read-digest ' + READ_DIGEST +
  ' over ' + files.length + ' files, tool ' + TOOL_VERSION + ', flags ' + FLAGSTR);
console.log(out.join('\n'));
process.exit(OPT.check && hardFail > 0 ? 1 : 0);
