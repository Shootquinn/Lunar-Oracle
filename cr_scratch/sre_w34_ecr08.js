#!/usr/bin/env node
// SRE W3-4: carry the orchestrator's 2.9 (ECON-3) ruling into ECR-08.
// RULED `neither`. No new id, no new axis, no new test, no new row: a `#` comment block
// (schema section 3 admits them and every loader skips them), one axis_statement amendment
// and three position corrections. L2's counts are unaffected because comments are not rows.
const fs = require('fs');
const P = 'oracle/REGISTER.econ.tsv';
const COMMENT = [
  '# ECR-08 -- sub-step 2.9 (ECON-3) RULED `neither` by the orchestrator, 2026-08-28, mid-Wave-3.',
  '# The Denison and Chung primary text is NOT acquired, and this row is not to be re-opened by search.',
  '# Two artifacts exist and this axis had conflated them:',
  '#   Denison, Edward F., and William K. Chung. How Japan\'s Economy Grew So Fast: The Sources of',
  '#     Postwar Expansion. Washington, D.C.: The Brookings Institution, 1976. xvi + 267 pp. ISBN 081571808X.',
  '#   Denison, Edward F., and William K. Chung. "Economic Growth and Its Sources." In Hugh Patrick and',
  '#     Henry Rosovsky, eds., Asia\'s New Giant: How the Japanese Economy Works, pp. 63-151.',
  '#     Washington, D.C.: The Brookings Institution, 1976.',
  '# No open full text exists for either: catalogue records and paywalled reviews only, and HathiTrust',
  '# refuses automated access. Acquisition was never a live branch for this project, so `neither` is',
  '# forced rather than chosen. The reason is recorded here so a future session does not repeat the search.',
  '# The hard block is not "we lack the book". It is the scope_token on the A row below: no Denison and',
  '# Chung component figure may be printed without naming the review it was routed through and that',
  '# review\'s period. A bare "Denison and Chung found X" is refusable under answer_contract.md section 5,',
  '# because the three leaves disagree and neither review\'s component list adds up to its own total.',
];
const STATEMENT = 'This corpus reaches the Denison and Chung decomposition only through reviews of it, the primary text is ruled permanently unacquired at sub-step 2.9, the two reviews cover different periods, and neither review\'s component list sums to the total it states, so no component figure from this axis stands without the review and the period it was routed through.';
const POS = {
  'may-1977-how-japans-economy-grew-so-fast-review.md':
    'Reviews the Denison and Chung accounting for 1953 to 1971 at a stated 8.77 percent a year; the five components it prints, capital 2.10, advances in knowledge 1.97, economies of scale 1.94, labour 1.85 and improved resource allocation 0.95, sum to 8.81 rather than 8.77, and the review reports them as read without reconciling the gap. Provenance depth via_review.',
  'simonis-1979-denison-boltho-review.md':
    'Reviews a Denison and Chung accounting for 1961 to 1971 at a stated 9.56 percentage points a year, jointly with Boltho; the seven components it transcribes sum to 8.74, roughly 0.8 points short of that total, and the review states that it does not reconcile the gap. Provenance depth via_review.',
  'henderson-2008-myth-of-miti.md':
    'Reports the Denison and Chung factor shares at third hand, from a Concise Encyclopedia of Economics entry whose own note says it is used for the figures it reports and not as an original study. Provenance depth via_tertiary, assigned at sub-step 2.8.',
};

const lines = fs.readFileSync(P, 'utf8').split('\n');
const out = [];
let cmt = 0, stmt = 0, pos = 0;
for (const ln of lines) {
  const f = ln.split('\t');
  if (f[0] === 'A' && f[1] === 'ECR-08') {
    out.push(...COMMENT); cmt = COMMENT.length;
    f[5] = STATEMENT; stmt++;
    out.push(f.join('\t')); continue;
  }
  if (f[0] === 'M' && f[1] === 'ECR-08' && POS[f[3]]) { f[4] = POS[f[3]]; pos++; out.push(f.join('\t')); continue; }
  out.push(ln);
}
const A = out.filter(l => l.startsWith('A\t')).length, M = out.filter(l => l.startsWith('M\t')).length;
const final = out.map(l => l.startsWith('H\t') ? ['H', 'literature', '2026-08-28', 'af7abec', String(A), String(M)].join('\t') : l);
if (stmt !== 1 || pos !== 3) throw new Error('expected 1 statement and 3 positions, got ' + stmt + '/' + pos);
for (const l of final) if (l.startsWith('A\t') || l.startsWith('M\t')) {
  const n = l.split('\t').length, want = l[0] === 'A' ? 9 : 5;
  if (n !== want) throw new Error('arity broken: ' + l.slice(0, 40) + ' has ' + n);
}
fs.writeFileSync(P, final.join('\n'), 'utf8');
console.log(P + '  A=' + A + ' M=' + M + '  comment lines +' + cmt + '  axis_statement 1  positions ' + pos);
