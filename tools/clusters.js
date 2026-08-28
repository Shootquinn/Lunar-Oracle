#!/usr/bin/env node
// clusters.js -- Step 2.1 companion. Author-year clustering under two stated rules, and the
// level-3 fallback grouping over the rows merge_identity.tsv left without an identifier.
// Usage: node clusters.js <merge_identity.tsv>
const fs = require('fs');
const TSV = process.argv[2];
if (!TSV) { console.error('usage: node clusters.js <merge_identity.tsv>'); process.exit(2); }
// ---- read-digest. This instrument walks exactly one declared input; two figures carrying
// different digests are not comparable and must not be reconciled. ----
{
  const st = fs.statSync(TSV);
  const stamp = TSV.split(require('path').sep).join('/') + String.fromCharCode(9) + st.size
    + String.fromCharCode(9) + st.mtimeMs;
  console.log('# clusters.js input  ' + TSV);
  console.log('# files read         1');
  console.log('# read-digest        sha256 over sorted path/size/mtimeMs = '
    + require('crypto').createHash('sha256').update(Buffer.from(stamp, 'utf8')).digest('hex'));
}
const rows = fs.readFileSync(TSV, 'utf8').trim().split(/\r?\n/).slice(1)
  .map(l => { const c = l.split('\t'); return { file: c[0], corpus: c[1], id: c[2], kind: c[3], conf: c[4] }; });

// RULE A -- STRICT. Leading author token, optional single hyphenated surname, then a 19xx/20xx
// year. Anchored at the start of the name. This is the rule the Step 2 brief describes.
const RULE_A = /^([a-z]+(?:-[a-z]+)?)-((?:19|20)\d{2})-/;
// RULE B -- PERMISSIVE, and the rule actually used below. Take every hyphen-separated token before
// the FIRST 19xx/20xx year token anywhere in the name, and use that whole prefix as the identity.
// It admits multi-token issuers (us-congress-2015, hague-working-group-2019), year-last names
// (lsic-newsletter-2026-june-final), and names where the year is not in position 2.
function ruleB(name) {
  const base = name.replace(/\.md$/, '');
  const toks = base.split('-');
  const i = toks.findIndex(t => /^(19|20)\d{2}$/.test(t));
  if (i <= 0) return null;
  return { author: toks.slice(0, i).join('-'), year: toks[i] };
}

function report(label, keyOf) {
  const g = {};
  let unkeyed = 0;
  for (const r of rows) { const k = keyOf(r.file); if (!k) { unkeyed++; continue; } (g[k] = g[k] || []).push(r.file); }
  const multi = Object.entries(g).filter(([, v]) => v.length > 1).sort();
  const surplus = multi.reduce((a, [, v]) => a + v.length - 1, 0);
  console.log('\n== ' + label);
  console.log('   keyed rows ' + (rows.length - unkeyed) + ' of ' + rows.length + '; unkeyed ' + unkeyed);
  console.log('   distinct author-year keys ' + Object.keys(g).length);
  console.log('   keys with more than one member: ' + multi.length + '; surplus files ' + surplus);
  for (const [k, v] of multi) console.log('   ' + k + '  (' + v.length + ')  ' + v.join(' | '));
}

// RULE C -- LEAD TOKEN ONLY. The first hyphen-token, plus the first 19xx/20xx token anywhere in
// the name. This is the rule that reproduces the figure 16 on the pre-dedup 182-name union: it
// groups lsic-2026-newsletter-august with lsic-newsletter-2026-june-final, and the three
// nasa/2025 files together, where every other rule keeps them apart.
function ruleC(name) {
  const t = name.replace(/\.md$/, '').split('-');
  const i = t.findIndex(x => /^(19|20)\d{2}$/.test(x));
  return i > 0 ? t[0] + '-' + t[i] : null;
}
// RULE D -- POSITIONAL. First token, and the second token only if it is a year.
function ruleD(name) {
  const t = name.replace(/\.md$/, '').split('-');
  return (t.length > 2 && /^(19|20)\d{2}$/.test(t[1])) ? t[0] + '-' + t[1] : null;
}
// RULE E -- PREFIX BEFORE YEAR, year found anywhere, prefix never empty.
function ruleE(name) {
  const t = name.replace(/\.md$/, '').split('-');
  const i = t.findIndex(x => /^(19|20)\d{2}$/.test(x));
  return i >= 0 ? t.slice(0, Math.max(i, 1)).join('-') + '-' + t[i] : null;
}

report('RULE A (strict): /^([a-z]+(-[a-z]+)?)-((19|20)\\d{2})-/',
  n => { const m = n.match(RULE_A); return m ? m[1] + '-' + m[2] : null; });
report('RULE B (permissive): all tokens before the first 19xx/20xx token',
  n => { const b = ruleB(n); return b ? b.author + '-' + b.year : null; });
report('RULE C (lead token only): first token + first 19xx/20xx token anywhere', ruleC);
report('RULE D (positional): first token + second token only if it is a year', ruleD);
report('RULE E (prefix before year, year anywhere)', ruleE);

// sowers-2019, verified independently of any count
console.log('\n== sowers-2019 membership, by literal prefix match');
const sow = rows.filter(r => /^sowers-2019-/.test(r.file));
for (const r of sow) console.log('   ' + r.file + '\t' + (r.id || '(none)') + '\t' + r.kind);
console.log('   members: ' + sow.length);

// level-3 fallback over the rows with no identifier
console.log('\n== level-3 grouping over rows with identifier_kind=none');
const none = rows.filter(r => r.kind === 'none');
const g3 = {};
for (const r of none) {
  const b = ruleB(r.file);
  const k = b ? b.author + '|' + b.year : 'NOYEAR|' + r.file.replace(/\.md$/, '');
  (g3[k] = g3[k] || []).push(r.file);
}
const m3 = Object.entries(g3).filter(([, v]) => v.length > 1);
console.log('   rows ' + none.length + '; distinct level-3 author-year keys ' + Object.keys(g3).length);
for (const [k, v] of m3) console.log('   CANDIDATE ' + k + '  ' + v.join(' | '));
console.log('   candidate groups ' + m3.length + '; surplus ' + m3.reduce((a, [, v]) => a + v.length - 1, 0));
console.log('# clusters.js rows read ' + rows.length);
