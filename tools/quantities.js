#!/usr/bin/env node
/*
 * tools/quantities.js - the checker and indexer for COUNTING_RULE.md.
 *
 * Authority: COUNTING_RULE.md (sub-step 1.12, The Designer). This script implements that
 * contract's section 7 mechanical clauses M1-M12 over the declared file set of its
 * section 8. It implements the contract AS WRITTEN at the 1.14 promotion. The ten defects
 * W2-1..W2-10 found in Wave 2 are NOT pre-applied: this script is the instrument that
 * measures them, and an instrument that silently corrects the specification it measures
 * cannot report on it. Where a Wave 2 amendment is available it sits behind an explicit
 * flag, named below.
 *
 * Check-register rows: CHK-14 (--check), CHK-15 (--lint), CHK-16 (--index), CHK-17 (--live),
 * all four written at 1.13 with status specified. They move to live under CL-2 the moment
 * this file exists; see AM-103. Shares one parse with --index so checker and indexer cannot disagree
 * (COUNTING_RULE.md section 7 M6, and CHK-16's note).
 *
 * Modes:
 *   --check   hard clauses. Exit 1 on any FAIL line. M1 M2 M3 M4 M10 M11 M12, plus
 *             M6 M7 when QUANTITIES.md exists.
 *   --lint    soft clauses. Always exit 0. M5 drift, M8, M9, and M13.
 *   --index   regenerate QUANTITIES.md on stdout, or in place with --write.
 *   --census  parse only; print the block and tag census. Exit 0.
 *
 * Flags:
 *   --live       actually run "class: live" operation commands for M5. Off by default:
 *                M5 executes strings out of markdown, which is not something a check
 *                should do without being asked.
 *   --w2-1       apply W2-1's proposed amendment: a Q-EG- id is an example and is skipped
 *                by M2/M3/M4, and a quantity fence nested inside a four-backtick fence is
 *                not a block. Off by default. Use it to measure what the amendment buys.
 *   --w2-3      apply W2-3's stronger M11: cwd: must be followed by "<n> characters".
 *   --exclude-superseded   drop cr_scratch blocks that sit inside a marker pair whose
 *                target oracle/MANIFEST.tsv records as promoted. This is the Manager's
 *                section 5.4 ruling on the section 8 declared file set.
 *   --files-only print the declared file set and exit.
 *
 * Output prefixes are fixed, and they are the counting rule for this tool's own report:
 *   FAIL   a hard failure. Determines --check's exit status. Count with grep -c "^FAIL ".
 *   LINT   a soft finding. Never affects exit status.
 *   STALE  an M4 staleness report. Never affects exit status (M4: "report for STALE").
 *   DRIFT  an M5 drift report. Never affects exit status.
 *   NOTE   an observation about the run itself.
 *   OK     a clause that passed.
 * Nothing else is printed at column 0, so a count of any prefix taken over the whole
 * unfiltered output is exact.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = process.env.QJS_ROOT ? path.resolve(process.env.QJS_ROOT) : process.cwd();
const argv = process.argv.slice(2);
const has = f => argv.indexOf(f) !== -1;

const OPT = {
  check: has('--check'),
  lint: has('--lint'),
  index: has('--index'),
  census: has('--census'),
  write: has('--write'),
  live: has('--live'),
  w2_1: has('--w2-1'),
  w2_3: has('--w2-3'),
  exclSup: has('--exclude-superseded'),
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
const isExample = id => OPT.w2_1 && /^Q-EG-/.test(id);

/* ---------------------------------------------------------------- load */
const out = [];
const say = (pre, msg) => out.push(pre + ' ' + msg);
let hardFail = 0;
const FAIL = m => { hardFail++; out.push('FAIL ' + m); };

const files = declaredFileSet();
if (OPT.filesOnly) { console.log(files.join('\n')); process.exit(0); }

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
    QUOTE_RE.lastIndex = 0;
    while ((m = QUOTE_RE.exec(l))) quoteSites.push({ file: f, line: k + 1, id: m[2], token: m[1] });
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
function m3() {
  let n = 0;
  const g = new Map();
  for (const q of quoteSites) {
    if (isExample(q.id)) continue;
    if (!byId.has(q.id)) continue;               /* that is M2's failure, not M3's */
    if (!NUMERAL.test(q.token)) {
      say('LINT', 'M3-unreadable ' + q.file + ':' + q.line + ' ' + q.id +
        ' token before the tag is "' + q.token + '", not a numeral (W2-8: no quoted-range form)');
      continue;
    }
    if (!g.has(q.id)) g.set(q.id, new Map());
    const key = normNum(q.token);
    if (!g.get(q.id).has(key)) g.get(q.id).set(key, []);
    g.get(q.id).get(key).push(q.file + ':' + q.line);
  }
  for (const pair of g) {
    const id = pair[0], vals = pair[1];
    const blockVal = normNum((byId.get(id)[0].fields.value || '').split(/\s/)[0]);
    if (vals.size > 1) {
      n++;
      const parts = [];
      for (const v of vals) parts.push(v[0] + '(' + v[1].join(';') + ')');
      FAIL('M3 ' + id + ' quoted with ' + vals.size + ' distinct numerals: ' + parts.join(' vs '));
    } else {
      const v = vals.keys().next().value;
      if (blockVal && v !== blockVal) {
        n++;
        FAIL('M3 ' + id + ' quoted as ' + v + ' at ' + vals.get(v).join(' , ') +
          ' but the block value is ' + blockVal);
      }
    }
  }
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
  for (const b of blocks) {
    const op = (b.fields.operation || '').trim();
    if (!/^(cmd|script):/.test(op)) continue;
    const cond = b.fields.conditions || '';
    if (cond.indexOf('cwd:') === -1) {
      n++;
      FAIL('M11 ' + b.file + ':' + b.startLine + ' ' + b.id + ' operation is "' +
        op.slice(0, 14) + '..." but conditions names no cwd:');
      continue;
    }
    if (OPT.w2_3) {
      const seg = cond.split('cwd:')[1].split(/\.\s|\.$/)[0];
      if (!/\d+\s*characters/.test(seg)) {
        n++;
        FAIL('M11 ' + b.file + ':' + b.startLine + ' ' + b.id +
          ' names a cwd with no character length: "cwd:' + seg.slice(0, 60) + '"');
      }
    }
  }
  if (!n) say('OK', 'M11 every cmd:/script: operation declares a cwd');
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
function m13() {
  let k = 0;
  for (const b of blocks) {
    if (!/^fixed\b/.test(String(b.fields.class || '').trim())) continue;
    const v = parseInt(String(b.fields.value || '').trim(), 10);
    if (!isFinite(v) || v < 0 || v > 20) continue;
    const noun = String(b.fields.unit || '').split(/[,;(]/)[0].trim().split(/\s+/).slice(0, 3).join(' ');
    if (!noun) continue;
    const nounRe = noun.split(/\s+/).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s+');
    let re;
    try { re = new RegExp('\\b(' + WORDS[v] + '|' + v + ')\\s+' + nounRe, 'gi'); } catch (e) { continue; }
    for (const fl of fileLines) {
      if (fl[0] === b.file) continue;
      for (let i = 0; i < fl[1].length; i++) {
        const l = fl[1][i];
        re.lastIndex = 0;
        let m;
        while ((m = re.exec(l))) {
          if (l.slice(m.index, m.index + 200).indexOf('[' + b.id + ']') !== -1) continue;
          k++;
          say('LINT', 'M13 ' + fl[0] + ':' + (i + 1) + ' bare "' + m[0] + '" for ' + b.id +
            ' in a second file (W2-2; not in the contract as written)');
        }
      }
    }
  }
  say('NOTE', 'M13 ' + k + ' bare-governed-numeral findings (W2-2\'s unmechanized lint)');
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
if (OPT.check) { m1(); m2(); m3(); m4(); m10(); m11(); m12(); m6m7(); }
if (OPT.lint) { m5(); m8(); m9(); m13(); }
say('NOTE', 'hard failures: ' + hardFail);
console.log(out.join('\n'));
process.exit(OPT.check && hardFail > 0 ? 1 : 0);
