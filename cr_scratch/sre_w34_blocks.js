#!/usr/bin/env node
// SRE W3-4, sub-step 2.16: generate the in-file `## Contested` block into every member summary.
// Grammar is schema section 8: the literal heading, then `- <axis_id> <side>` and nothing else.
// Idempotent: an existing block is removed and regenerated, so REG-15 (generated, never
// hand-written) is enforced by re-running rather than by vigilance.
// Placement is END OF FILE, after the `## Provenance` block. That is deliberate:
// MRG-4b's stripProvenance() takes lastIndexOf('\n\n---\n\n## Provenance\n') and keeps the
// prefix, so anything appended after the provenance marker is outside the byte-identity
// comparison and the generated block cannot read as an undeclared body edit.
const fs = require('fs'), path = require('path');
const CHECK = process.argv.includes('--check');
const ROOT = process.cwd();
const PROV_MARK = '\n\n---\n\n## Provenance\n';

function walk(d, out) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}
const files = walk(path.join(ROOT, 'literature'), []);
const byLeaf = new Map();
for (const f of files) byLeaf.set(path.basename(f), f);

// membership: leaf -> sorted unique "AXIS SIDE"
const want = new Map();
for (const reg of ['oracle/REGISTER.lunar.tsv', 'oracle/REGISTER.econ.tsv']) {
  for (const ln of fs.readFileSync(path.join(ROOT, reg), 'utf8').split('\n')) {
    if (!ln.startsWith('M\t')) continue;
    const f = ln.split('\t');
    if (!want.has(f[3])) want.set(f[3], new Set());
    want.get(f[3]).add(f[1] + ' ' + f[2]);
  }
}

const STRIP = /\n*\n## Contested\n(?:- [A-Z]{3}-[0-9]{2} [A-Z]\n?)*\s*$/;
let wrote = 0, already = 0, missing = 0, noProv = 0, mismatch = 0;

for (const [leaf, memberships] of [...want].sort()) {
  const p = byLeaf.get(leaf);
  if (!p) { console.log('MISSING LEAF ' + leaf); missing++; continue; }
  let t = fs.readFileSync(p, 'utf8');
  if (!t.includes(PROV_MARK)) { console.log('NO PROVENANCE MARKER ' + leaf); noProv++; }
  const base = t.replace(STRIP, '');
  const block = '\n\n## Contested\n' + [...memberships].sort().map(m => '- ' + m).join('\n') + '\n';
  const next = base.replace(/\s*$/, '') + block;
  if (next === t) { already++; continue; }
  if (CHECK) { console.log('WOULD REWRITE ' + leaf); mismatch++; continue; }
  fs.writeFileSync(p, next, 'utf8');
  wrote++;
}

// files that carry a block but are not members
for (const f of files) {
  const leaf = path.basename(f);
  if (want.has(leaf)) continue;
  const t = fs.readFileSync(f, 'utf8');
  if (/\n## Contested\n/.test(t)) {
    console.log('ORPHAN BLOCK ' + leaf);
    if (!CHECK) { fs.writeFileSync(f, t.replace(STRIP, '').replace(/\s*$/, '') + '\n', 'utf8'); }
  }
}

console.log((CHECK ? 'CHECK: ' : '') + 'member leaves ' + want.size + '  written ' + wrote +
  '  already correct ' + already + '  would-rewrite ' + mismatch +
  '  unresolved ' + missing + '  no-provenance-marker ' + noProv);
