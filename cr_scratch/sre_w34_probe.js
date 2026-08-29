#!/usr/bin/env node
// SRE W3-4 probe: resolve every register M.leaf against literature/, report side arity.
const fs = require('fs'), path = require('path');
const ROOT = process.cwd();

function walk(d, out) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}
const files = walk(path.join(ROOT, 'literature'), []);
const byLeaf = new Map();
for (const f of files) {
  const leaf = path.basename(f);
  if (!byLeaf.has(leaf)) byLeaf.set(leaf, []);
  byLeaf.get(leaf).push(path.relative(ROOT, f).replace(/\\/g, '/'));
}
console.log('literature .md files: ' + files.length + ', distinct leaves: ' + byLeaf.size);
for (const [l, ps] of byLeaf) if (ps.length > 1) console.log('DUPLICATE LEAF: ' + l + ' -> ' + ps.join(' | '));

for (const reg of ['oracle/REGISTER.lunar.tsv', 'oracle/REGISTER.econ.tsv']) {
  const lines = fs.readFileSync(path.join(ROOT, reg), 'utf8').split(/\r?\n/);
  let H = null, A = [], M = [];
  lines.forEach((ln, i) => {
    if (!ln.trim() || ln.startsWith('#')) return;
    const f = ln.split('\t');
    if (f[0] === 'H') { if (!H) H = { f, line: i + 1 }; else console.log(reg + ' SECOND H at line ' + (i + 1)); }
    else if (f[0] === 'A') A.push({ f, line: i + 1 });
    else if (f[0] === 'M') M.push({ f, line: i + 1 });
    else console.log(reg + ' UNKNOWN ROW TYPE line ' + (i + 1) + ': ' + f[0]);
  });
  console.log('\n=== ' + reg + ' ===');
  console.log('H basis_root=' + H.f[1] + ' date=' + H.f[2] + ' ref=' + H.f[3] + ' declared A=' + H.f[4] + ' M=' + H.f[5]);
  console.log('parsed A=' + A.length + ' M=' + M.length);
  // arity
  for (const a of A) if (a.f.length !== 9) console.log('L3 ARITY A line ' + a.line + ' cols=' + a.f.length + ' id=' + a.f[1]);
  for (const m of M) if (m.f.length !== 5) console.log('L3 ARITY M line ' + m.line + ' cols=' + m.f.length + ' id=' + m.f[1]);
  // resolution
  let unres = 0;
  for (const m of M) {
    const leaf = m.f[3];
    if (!byLeaf.has(leaf)) { console.log('L4 UNRESOLVED line ' + m.line + ' ' + m.f[1] + ' ' + m.f[2] + ' ' + leaf); unres++; }
  }
  console.log('L4 unresolved: ' + unres + ' of ' + M.length);
  // side arity by class
  const sides = new Map(), cls = new Map();
  for (const a of A) cls.set(a.f[1], a.f[2]);
  for (const m of M) {
    if (!sides.has(m.f[1])) sides.set(m.f[1], new Set());
    sides.get(m.f[1]).add(m.f[2]);
  }
  for (const [id, c] of cls) {
    const s = sides.get(id) || new Set();
    const n = s.size;
    const ok = (c === 'one_sided') ? n === 1 : n >= 2;
    if (!ok) console.log('L5 SIDE ARITY ' + id + ' class=' + c + ' distinct sides=' + n + ' [' + [...s].join(',') + ']');
  }
  for (const [id] of sides) if (!cls.has(id)) console.log('B1 M row with no A row: ' + id);
  // rows per id
  const cnt = new Map();
  for (const m of M) cnt.set(m.f[1], (cnt.get(m.f[1]) || 0) + 1);
  for (const [id] of cls) if ((cnt.get(id) || 0) < 2) console.log('AT-LEAST-TWO-ROWS: ' + id + ' has ' + (cnt.get(id) || 0));
  // path-shaped leaves
  for (const m of M) if (m.f[3].includes('/')) console.log('PATH IN LEAF line ' + m.line + ': ' + m.f[3]);
}
