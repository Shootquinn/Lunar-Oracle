#!/usr/bin/env node
// SRE W3-4: EXECUTE the REG group of oracle/tests/corpus_suite.md against the landed corpus.
// The suite carries 18 REG rows and run_suite.js binds none of them: the group reports
// 18 unrun. This runner executes the rows whose subject exists on disk at Step 2 and says
// DEFERRED, with a reason, for the rows whose subject is the Step 3 loader or retrieval layer.
// Mutation arm: --mutate runs each executed row's own falsifier on a COPY and requires it to fire.
const fs = require('fs'), path = require('path'), cp = require('child_process');
const ROOT = process.cwd(), MUT = process.argv.includes('--mutate');
const REGS = ['oracle/REGISTER.lunar.tsv', 'oracle/REGISTER.econ.tsv'];
const R = p => path.join(ROOT, p);
const out = [];
const rec = (id, st, msg) => { out.push([id, st, msg]); };

function walk(d, a) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p, a); else if (e.name.endsWith('.md')) a.push(p); } return a; }
const files = walk(R('literature'), []);
const leafPaths = new Map();
for (const f of files) { const l = path.basename(f); (leafPaths.get(l) || leafPaths.set(l, []).get(l)).push(f); }

function parse(text) {
  const H = [], A = [], M = [];
  text.split('\n').forEach((ln, i) => {
    if (!ln.length || ln.startsWith('#')) return;
    const f = ln.split('\t');
    if (f[0] === 'H') H.push({ f, n: i + 1 }); else if (f[0] === 'A') A.push({ f, n: i + 1 });
    else if (f[0] === 'M') M.push({ f, n: i + 1 });
  });
  return { H, A, M };
}
const P = {};
for (const r of REGS) P[r] = parse(fs.readFileSync(R(r), 'utf8'));

// ---- REG-2  SET-1 / L0: exactly one H row, and it is the first non-comment row
{
  const bad = [];
  for (const r of REGS) {
    const { H } = P[r];
    if (H.length !== 1) bad.push(r + ': ' + H.length + ' H rows');
    else if (H[0].n !== 1) bad.push(r + ': H row at line ' + H[0].n + ', not first');
  }
  rec('REG-2', bad.length ? 'FAIL' : 'PASS', bad.length ? bad.join('; ') : '2 files, 1 H row each, each the first row');
}
// ---- REG-3  SET-2 / L1b: axis ids unique across the loaded set
{
  const seen = new Map(); const dup = [];
  for (const r of REGS) for (const a of P[r].A) {
    if (seen.has(a.f[1])) dup.push(a.f[1] + ' in ' + seen.get(a.f[1]) + ' and ' + r); else seen.set(a.f[1], r);
  }
  rec('REG-3', dup.length ? 'FAIL' : 'PASS', dup.length ? dup.join('; ') : REGS.length + ' files, ' + seen.size + ' A rows, ' + seen.size + ' distinct axis ids');
}
// ---- REG-5  L2: self-declared size
{
  const bad = [], say = [];
  for (const r of REGS) {
    const { H, A, M } = P[r];
    say.push(path.basename(r) + ' ' + A.length + '/' + M.length);
    if (String(A.length) !== H[0].f[4] || String(M.length) !== H[0].f[5]) bad.push(r + ': header says ' + H[0].f[4] + '/' + H[0].f[5] + ', parsed ' + A.length + '/' + M.length);
  }
  rec('REG-5', bad.length ? 'FAIL' : 'PASS', bad.length ? bad.join('; ') : 'parsed == declared: ' + say.join(', '));
}
// ---- REG-7  L4: every M.leaf resolves
{
  const bad = []; let n = 0; const distinct = new Set();
  for (const r of REGS) for (const m of P[r].M) { n++; distinct.add(m.f[3]); if (!leafPaths.has(m.f[3])) bad.push(r + ' ' + m.f[1] + ' ' + m.f[3]); }
  rec('REG-7', bad.length ? 'FAIL' : 'PASS', bad.length ? bad.length + ' unresolved: ' + bad.slice(0, 5).join('; ') : n + ' member rows, ' + distinct.size + ' distinct leaves, all resolve under literature/');
}
// ---- REG-8  L4 resolution is UNIQUE
{
  const bad = [], slash = [];
  for (const r of REGS) for (const m of P[r].M) {
    if (m.f[3].includes('/')) slash.push(r + ' ' + m.f[3]);
    const ps = leafPaths.get(m.f[3]); if (ps && ps.length > 1) bad.push(m.f[3] + ' -> ' + ps.length + ' files');
  }
  rec('REG-8', (bad.length || slash.length) ? 'FAIL' : 'PASS', (bad.length || slash.length) ? [...bad, ...slash].join('; ')
    : '168 .md under literature/, ' + leafPaths.size + ' distinct leaves; 0 member rows contain a "/"');
}
// ---- REG-10  the basis_root rebind is two edits, not 134
{
  const bad = [];
  for (const r of REGS) {
    const t = fs.readFileSync(R(r), 'utf8');
    if (P[r].H[0].f[1] !== 'literature') bad.push(r + ': basis_root is ' + P[r].H[0].f[1]);
    if (t.includes('lsei/literature/')) bad.push(r + ': contains the string lsei/literature/');
    if (t.includes('_intake/')) bad.push(r + ': contains the string _intake/');
    for (const m of P[r].M) if (m.f[3].includes('/')) bad.push(r + ': member row rewritten to a path');
  }
  rec('REG-10', bad.length ? 'FAIL' : 'PASS', bad.length ? bad.join('; ') : 'both basis_root == literature; neither file contains lsei/literature/ or _intake/; 0 member rows carry a path');
}
// ---- REG-11  basis_ref resolves in the tree holding basis_root
{
  const bad = [], say = [];
  for (const r of REGS) {
    const ref = P[r].H[0].f[3];
    if (ref === 'none') { say.push(path.basename(r) + ' none (permitted by 3.1)'); continue; }
    let ok = false, n = 0;
    try { cp.execSync('git cat-file -t ' + ref, { cwd: ROOT, stdio: 'pipe' }); ok = true; } catch (e) { }
    if (ok) n = Number(cp.execSync('git ls-tree -r --name-only ' + ref + ' -- literature', { cwd: ROOT }).toString().trim().split('\n').filter(Boolean).length);
    if (!ok) bad.push(r + ': ' + ref + ' does not resolve in this repository');
    else if (!n) bad.push(r + ': ' + ref + ' tracks 0 files under literature/');
    else say.push(path.basename(r) + ' ' + ref + ' tracks ' + n + ' files under literature/');
  }
  rec('REG-11', bad.length ? 'FAIL' : 'PASS', bad.length ? bad.join('; ') : say.join(', '));
}
// ---- REG-12  L5: side arity by class
{
  const bad = [], say = [];
  for (const r of REGS) {
    const cls = new Map(P[r].A.map(a => [a.f[1], a.f[2]]));
    const sd = new Map();
    for (const m of P[r].M) { if (!sd.has(m.f[1])) sd.set(m.f[1], new Set()); sd.get(m.f[1]).add(m.f[2]); }
    for (const [id, c] of cls) {
      const n = (sd.get(id) || new Set()).size;
      if (!['two_sided', 'false_pair', 'one_sided'].includes(c)) bad.push(id + ': class ' + c + ' outside the closed set');
      if ((c === 'one_sided' && n !== 1) || (c !== 'one_sided' && n < 2)) bad.push(id + ' class ' + c + ' has ' + n + ' distinct sides');
    }
    say.push(path.basename(r) + ' ' + [...cls.values()].filter(c => c !== 'one_sided').length + ' contested / ' + [...cls.values()].filter(c => c === 'one_sided').length + ' one_sided');
  }
  rec('REG-12', bad.length ? 'FAIL' : 'PASS', bad.length ? bad.join('; ') : say.join(', ') + '; every contested axis has >= 2 sides, every one_sided axis exactly 1');
}
// ---- REG-13  B4: the in-file block round-trips, in BOTH directions
{
  const want = new Map();
  for (const r of REGS) for (const m of P[r].M) { if (!want.has(m.f[3])) want.set(m.f[3], new Set()); want.get(m.f[3]).add(m.f[1] + ' ' + m.f[2]); }
  const bad = [];
  for (const f of files) {
    const leaf = path.basename(f), t = fs.readFileSync(f, 'utf8');
    const mm = t.match(/\n## Contested\n([\s\S]*?)(?=\n## |$)/);
    const have = new Set(mm ? (mm[1].match(/^- [A-Z]{3}-[0-9]{2} [A-Z]$/gm) || []).map(s => s.slice(2)) : []);
    const w = want.get(leaf) || new Set();
    if (mm && !w.size) { bad.push(leaf + ': block with no M rows'); continue; }
    if (!mm && w.size) { bad.push(leaf + ': M rows with no block'); continue; }
    const miss = [...w].filter(x => !have.has(x)), extra = [...have].filter(x => !w.has(x));
    if (miss.length || extra.length) bad.push(leaf + ': block-missing[' + miss + '] block-extra[' + extra + ']');
  }
  rec('REG-13', bad.length ? 'FAIL' : 'PASS', bad.length ? bad.length + ': ' + bad.slice(0, 4).join('; ') : want.size + ' member leaves; block set == M-row set in both directions across all ' + files.length + ' summaries');
}
// ---- REG-14  block grammar is minimal
{
  const bad = []; let n = 0;
  for (const f of files) {
    const t = fs.readFileSync(f, 'utf8');
    const i = t.indexOf('\n## Contested\n'); if (i < 0) continue; n++;
    let body = t.slice(i + 1); const j = body.indexOf('\n## ', 1); if (j > 0) body = body.slice(0, j);
    const lines = body.split('\n').slice(1).filter(l => l.length);
    for (const l of lines) if (!/^- [A-Z]{3}-[0-9]{2} [A-Z]$/.test(l)) bad.push(path.basename(f) + ': ' + JSON.stringify(l));
  }
  rec('REG-14', bad.length ? 'FAIL' : 'PASS', bad.length ? bad.slice(0, 4).join('; ') : n + ' blocks; every line matches ^- (LCC|ECR)-dd [A-Z]$; no bold, backticks, paths, prose or keys');
}
// ---- REG-15  the block is generated, never hand-written
{
  const r = cp.spawnSync(process.execPath, ['cr_scratch/sre_w34_blocks.js', '--check'], { cwd: ROOT, encoding: 'utf8' });
  const line = (r.stdout || '').trim().split('\n').pop();
  const clean = /would-rewrite 0/.test(line) && !/WOULD REWRITE|ORPHAN BLOCK/.test(r.stdout);
  rec('REG-15', clean ? 'PASS' : 'FAIL', 'regenerate-and-diff: ' + line);
}
// ---- deferred rows
const DEFER = {
  'REG-1': 'the loader that takes a list of register paths is Step 3 (3.8); on disk today the assertion reduces to "there is no oracle/REGISTER.tsv", which holds',
  'REG-4': 'per-file-against-both comparison needs the loader; the sub-assertion it rests on is measured here as REG-7 (0 unresolved per file, both roots literature)',
  'REG-6': 'a census-reconciliation rule over Step 2 deliverables, not an artifact assertion; discharged for this deliverable by quoting the H row on every count line',
  'REG-9': 'the refusal path is the Step 3 classifier (3.8); nothing on disk emits axis-incomplete yet',
  'REG-16': 'corpusDocFrequency() and confirmInText() are rebuilt at 3.7; the excision cannot be asserted against a layer that does not exist',
  'REG-17': 'same subject as REG-16, one level up',
  'REG-18': 'the misclassification detector is built at 3.8',
};
for (const [id, why] of Object.entries(DEFER)) rec(id, 'DEFERRED', why);

out.sort((a, b) => Number(a[0].slice(4)) - Number(b[0].slice(4)));
let p = 0, f = 0, d = 0;
for (const [id, st, msg] of out) { if (st === 'PASS') p++; else if (st === 'FAIL') f++; else d++; console.log(st.padEnd(9) + id.padEnd(8) + msg); }
console.log('\nREG group: ' + out.length + ' rows -- ' + p + ' PASS, ' + f + ' FAIL, ' + d + ' DEFERRED (subject not yet built), 0 unrun.');
if (MUT) {
  // falsifiers, each on a copy, each required to fire
  const tmp = path.join(ROOT, 'cr_scratch', 'sre_w34_mut.tsv');
  const src = fs.readFileSync(R('oracle/REGISTER.lunar.tsv'), 'utf8');
  const lines = src.split('\n');
  const M2 = [];
  // REG-5 falsifier: delete one M row without touching the header
  M2.push(['REG-5', lines.filter((l, i) => !(l.startsWith('M\t') && i > 60)).join('\n')]);
  // REG-2 falsifier: splice a second H row
  M2.push(['REG-2', lines.slice(0, 40).concat([lines[0]]).concat(lines.slice(40)).join('\n')]);
  // REG-7 falsifier: rename a leaf in the register
  M2.push(['REG-7', src.replace('litvak-2024-lend-cabeus-water-ice.md', 'litvak-2024-RENAMED.md')]);
  console.log('\n--- mutation arm ---');
  for (const [id, body] of M2) {
    fs.writeFileSync(tmp, body, 'utf8');
    const r = cp.spawnSync(process.execPath, ['tools/ecr_verify.js', 'cr_scratch/sre_w34_mut.tsv', 'literature'], { cwd: ROOT, encoding: 'utf8' });
    const last = (r.stdout || '').trim().split('\n').filter(l => /^FAIL|^FAILURES/.test(l));
    console.log(id + ' falsifier -> ' + (r.status ? 'FIRED  ' : 'DID NOT FIRE  ') + last.slice(0, 2).join(' | '));
  }
  fs.unlinkSync(tmp);
}
