#!/usr/bin/env node
// merge_identity.js -- Step 2.1 (MERGE-2) source-identity extractor. The Engineer, 2026-08-28.
// Usage: node merge_identity.js <lseiLitDir> <intakeLitDir> [outTsv]
// Emits TSV: file, corpus, identifier, identifier_kind, confidence
// Reports its own inputs on stderr before it emits anything.

const fs = require('fs');
const path = require('path');

// Two modes. Default: the source-identity table (Step 2.1), byte-for-byte as first run.
// --plan: the Wave-1 disposition table cr_scratch/merge_plan.tsv (Step 2, Wave 1).
const PLAN  = process.argv[2] === '--plan';
const A_DIR = PLAN ? process.argv[3] : process.argv[2];
const B_DIR = PLAN ? process.argv[4] : process.argv[3];
const OUT   = PLAN ? null : (process.argv[4] || null);
if (!A_DIR || !B_DIR) {
  console.error('usage: node merge_identity.js <lseiLitDir> <intakeLitDir> [outTsv]');
  console.error('   or: node merge_identity.js --plan <lseiLitDir> <intakeLitDir> <taxonomyMd> <supersededDir> <outTsv>');
  process.exit(2);
}

// ---- normalize(), literature/NAMING.md section 1, verbatim, 7 steps ----
function normalize(name) {
  let s = path.basename(name);                 // 1 leaf only
  s = s.replace(/\.md$/i, '');                 // 2 strip exactly one trailing .md
  s = s.toLowerCase();                         // 3
  s = s.replace(/[_ ]+/g, '-');                // 4 runs of _ or space -> one -
  s = s.replace(/-{2,}/g, '-');                // 5 runs of 2+ - -> one -
  s = s.replace(/^-+|-+$/g, '');               // 6 trim leading/trailing -
  return s + '.md';                            // 7
}

function walk(dir) {
  const out = [];
  (function rec(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) rec(p);
      else if (/\.md$/i.test(e.name)) out.push(p);
    }
  })(dir);
  return out.sort();
}

// ---- citation block extraction ----
// Header precedence: Citation, then Provenance, then Metadata. NAMING.md section 7:
// "Read from the file's ## Citation block ... where a file carries ## Provenance or ## Metadata
//  instead, read that."
// Block runs from the header line to the next line matching ^#{1,3}\s or a lone ^---$.
const HDR = /^(#{2,3})\s*(Citation|Provenance|Metadata)\s*$/i;
function citationBlock(text) {
  const lines = text.split(/\r?\n/);
  const found = {};
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(HDR);
    if (!m) continue;
    const kind = m[2].toLowerCase();
    if (found[kind] !== undefined) continue;   // first occurrence only
    const body = [];
    for (let j = i + 1; j < lines.length; j++) {
      if (/^#{1,3}\s/.test(lines[j])) break;
      if (/^-{3,}\s*$/.test(lines[j])) break;
      body.push(lines[j]);
    }
    found[kind] = body.join('\n');
  }
  for (const k of ['citation', 'provenance', 'metadata']) {
    if (found[k] !== undefined && found[k].trim() !== '') return { block: found[k], header: k };
  }
  return { block: null, header: null };
}

// ---- identifier parse ----
// LABELLED LINES FIRST. Both corpora write the source's own identifier on a labelled line
// ("DOI:", "- **DOI:**", "Publisher URL:"), and write OTHER documents' identifiers in prose --
// a preprint's arXiv DOI, a working-paper DOI, a cited companion report's URL, a template
// placeholder. Taking the first token found anywhere in the block picks those up. So: search the
// labelled lines first, and fall back to the whole block only when no labelled line carries one.
const DOI_LABEL = /^[\s>*|-]*\**\s*doi\b[^:]{0,20}:/i;
const URL_LABEL = /^[\s>*|-]*\**\s*(publisher\s*url|publisher|url|source\s*url|available\s*at|link)\b[^:]{0,20}:/i;

// Level 1: DOI. 10.NNNN/suffix, resolver prefix stripped, percent-decoded, lowercased.
const DOI_RE = /\b10\.\d{4,9}\/[^\s"'`<>\]}|]+/g;
// Registrant prefixes that mint a DOI over somebody else's uploaded copy. NAMING.md section 7
// rejects a PDF-hosting mirror at level 2 for the reason that it does not identify the publication;
// a mirror-minted DOI is the same object at level 1. 10.13140 is ResearchGate. Live instance:
// colozza-2020, whose own citation block says the ResearchGate DOI "is not a publisher-registered
// identifier and is not used as a locator here" -- the file was right and the first run of this
// tool was wrong.
const MIRROR_DOI = /^10\.13140\//;
function cleanDoi(raw) {
  let s = raw.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '');
  try { s = decodeURIComponent(s); } catch (e) { /* leave as written */ }
  s = s.toLowerCase();
  s = s.replace(/[.,;:*]+$/, '');
  while (s.endsWith(')') && (s.split('(').length - 1) < (s.split(')').length - 1)) s = s.slice(0, -1);
  // a suffix that ends mid-token on an unclosed "(" is a truncation, not a DOI
  if ((s.split('(').length - 1) > (s.split(')').length - 1)) return '';
  // suffix of 1-2 characters is a truncated match or a template placeholder, not a DOI.
  // Live instance: "10.2514/6.<paper-number>" in downing-2005 truncates at "<" to "10.2514/6".
  if (!/^10\.\d{4,9}\/.{3,}/.test(s)) return '';
  if (MIRROR_DOI.test(s)) return '';
  return s;
}
// Level 2: publisher article URL. Scheme and www. stripped, query and fragment removed.
// Excluded: DOI resolvers (level 1 wearing a hat, NAMING.md section 7) and search-result links.
const URL_RE = /https?:\/\/[^\s"'`<>)\]}|,]+/g;
const RESOLVER = /^(dx\.)?doi\.org\//i;
const SEARCH = /(^|\.)google\.[a-z.]+\/(search|scholar)|^scholar\.google\.|[?&]q=/i;
function cleanUrl(raw) {
  let s = raw.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
  s = s.split('#')[0].split('?')[0];
  s = s.replace(/[.,;:*]+$/, '').replace(/\/+$/, '');
  return s.toLowerCase();
}

function scan(lines, labelRe, tokenRe, clean) {
  const labelled = [], anywhere = [];
  for (const ln of lines) {
    const hits = (ln.match(tokenRe) || []).map(clean).filter(Boolean);
    if (!hits.length) continue;
    (labelRe.test(ln) ? labelled : anywhere).push(...hits);
  }
  return { labelled: [...new Set(labelled)], anywhere: [...new Set(anywhere)] };
}

function identify(block) {
  if (block === null) return { id: '', kind: 'none', conf: 'none', note: 'no-citation-block' };
  const lines = block.split('\n');

  // ---- level 1 ----
  const d = scan(lines, DOI_LABEL, DOI_RE, cleanDoi);
  if (d.labelled.length) {
    return { id: d.labelled[0], kind: 'doi', conf: d.labelled.length === 1 ? 'high' : 'medium',
             note: d.labelled.length === 1 ? '' : 'multiple-labelled-dois:' + d.labelled.length };
  }
  if (d.anywhere.length) {
    // unlabelled: the DOI is in the citation prose. Sound when there is exactly one; a block
    // holding several unlabelled DOIs is citing other documents and needs a person.
    return { id: d.anywhere[0], kind: 'doi', conf: d.anywhere.length === 1 ? 'medium' : 'low',
             note: d.anywhere.length === 1 ? 'doi-unlabelled' : 'unlabelled-dois:' + d.anywhere.length };
  }

  // ---- level 2 ----
  // A publisher ARTICLE url. A bare host with no path segment addresses a site, not a document,
  // so it is rejected rather than recorded -- NAMING.md section 7 rejects mirrors and
  // search-result links for the same reason, that they do not name the document.
  const isArticle = u => u.includes('/') && u.split('/').slice(1).some(seg => seg.length);
  const u = scan(lines, URL_LABEL, URL_RE, cleanUrl);
  const keep = a => a.filter(x => !RESOLVER.test(x) && !SEARCH.test(x));
  const uLab = keep(u.labelled), uAny = keep(u.anywhere);
  const artLab = uLab.filter(isArticle), artAny = uAny.filter(isArticle);
  if (artLab.length) {
    return { id: artLab[0], kind: 'url', conf: artLab.length === 1 ? 'medium' : 'low',
             note: artLab.length === 1 ? '' : 'multiple-labelled-urls:' + artLab.length };
  }
  if (artAny.length) {
    return { id: artAny[0], kind: 'url', conf: 'low',
             note: artAny.length === 1 ? 'url-unlabelled' : 'unlabelled-urls:' + artAny.length };
  }
  if (uLab.length || uAny.length) {
    return { id: '', kind: 'none', conf: 'none',
             note: 'host-only-url:' + [...new Set([...uLab, ...uAny])].join(',') };
  }
  return { id: '', kind: 'none', conf: 'none', note: 'block-present-no-identifier' };
}


// ============================================================================
// PLAN MODE -- Step 2 Wave 1. Emits cr_scratch/merge_plan.tsv, the committed
// disposition table the Wave 2 merge executes from. One row per union key.
//   node merge_identity.js --plan <lseiLit> <intakeLit> <taxonomyMd> <supersededDir> <outTsv>
// Reuses normalize(), walk(), citationBlock() and identify() above, unchanged, so the
// plan and the identity table cannot disagree about what a key or an identifier is.
// ============================================================================
if (PLAN) {
  const crypto = require('crypto');
  const TAXO = process.argv[5], SUPDIR = process.argv[6], POUT = process.argv[7];
  if (!TAXO || !SUPDIR || !POUT) {
    console.error('usage: node merge_identity.js --plan <lseiLit> <intakeLit> <taxonomyMd> <supersededDir> <outTsv>');
    process.exit(2);
  }

  // ---- read-digest: every file this run opens, stamped (path, size, mtimeMs) ----
  const READ = [];
  function slurp(p) { const st = fs.statSync(p); READ.push(p.replace(/\\/g, '/') + '\t' + st.size + '\t' + st.mtimeMs); return fs.readFileSync(p, 'utf8'); }
  function slurpBin(p) { const st = fs.statSync(p); READ.push(p.replace(/\\/g, '/') + '\t' + st.size + '\t' + st.mtimeMs); return fs.readFileSync(p); }
  const sha = b => crypto.createHash('sha256').update(b).digest('hex');

  // ---- HAND-ADJUDICATED INPUTS. Declared as data so they are auditable, never inferred. ----
  // Step 2.1 section 2: the level-2 URL group nasa.gov/moontomarsarchitecture holds three keys and
  // is two sources. This key is the third member and is NOT a duplicate of the other two.
  const FALSE_MERGE = new Set(['nasa-data-gaps-acr25-wp-data-gaps-v3.md']);
  // Step 2.1 section 2: two pairs confirmed at level 3 by hand (venue+date+grant number), because
  // NAMING.md section 7 has no level between 2 and 3 for an agency report or grant number.
  const LEVEL3_PAIRS = [
    ['sanders-2025-nasa-isru-progress-review.md', 'sanders-2025-nasa-lunar-isru-progress-review.md',
      'Luxembourg Space Resources Week 2025-05-19, Sanders and Kleinhenz'],
    ['sowers-2019-thermal-mining-niac.md', 'sowers-2019-thermal-mining-niac-report.md',
      'NIAC Phase I final report, grant 80NSSC19K0964'],
  ];
  // Rows whose disposition or block the brief premises P1/P2 placed differently at first write.
  // rev 2, reason leads the basis. See "The premise check" in step2_engineer_dispositions.md.
  const REV2 = new Map([
    ['473486main-iss-atcs-overview.md', 'rev2: P1/P2 placed this uncontested; the exact-name rule sees no twin, the normalized-key twin exists and differs'],
    ['bea-depreciation-rates.md', 'rev2: P1/P2 placed this uncontested; the exact-name rule sees no twin, the normalized-key twin exists and differs'],
    ['ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update.md', 'rev2: P1/P2 placed this uncontested; the exact-name rule sees no twin, the normalized-key twin exists and differs'],
    ['barro-2004-economic-growth-textbook.md', 'rev2: P2 called this genuinely new; measured a de-referencing descendant and lsei wins'],
    ['falcon-heavy-wikipedia.md', 'rev2: P2 called this genuinely new; measured a de-referencing descendant and lsei wins'],
  ]);

  // ---- taxonomy: the index-tsv fenced block of step2_engineer_taxonomy.md ----
  const taxoText = slurp(TAXO);
  const fence = taxoText.match(/[`]{3}index-tsv\r?\n([\s\S]*?)\r?\n[`]{3}/);
  if (!fence) { console.error('FATAL: no index-tsv fence in ' + TAXO); process.exit(3); }
  const taxo = new Map();
  const tlines = fence[1].split(/\r?\n/).filter(l => l.length);
  const thdr = tlines.shift().split('\t');
  if (thdr.join(',') !== 'path,primary,also,field') { console.error('FATAL: taxonomy header ' + thdr.join(',')); process.exit(3); }
  for (const l of tlines) {
    const c = l.split('\t');
    taxo.set(c[0].split('/').pop(), { folder: c[1], also: c[2] || '', field: c[3] });
  }

  // ---- superseded-duplicates: the six files Step 0 dropped, by content hash ----
  const supByHash = new Map();
  for (const f of fs.readdirSync(SUPDIR).sort()) supByHash.set(sha(slurpBin(path.join(SUPDIR, f))), f);

  // ---- corpora ----
  const aF = walk(A_DIR), bF = walk(B_DIR);
  const aM = new Map(), bM = new Map();
  for (const f of aF) aM.set(normalize(f), f);
  for (const f of bF) bM.set(normalize(f), f);
  const keys = [...new Set([...aM.keys(), ...bM.keys()])].sort();

  // ---- per-key identity, bytes, pair detection ----
  const RANK = { doi: 2, url: 1, none: 0 };
  const rec = new Map();
  for (const k of keys) {
    const ap = aM.get(k), bp = bM.get(k);
    const aBuf = ap ? slurpBin(ap) : null, bBuf = bp ? slurpBin(bp) : null;
    const aTxt = aBuf ? aBuf.toString('utf8') : null, bTxt = bBuf ? bBuf.toString('utf8') : null;
    const rA = aTxt !== null ? identify(citationBlock(aTxt).block) : null;
    const rB = bTxt !== null ? identify(citationBlock(bTxt).block) : null;
    let r, from;
    if (rA && rB) { if (RANK[rB.kind] > RANK[rA.kind]) { r = rB; from = 'intake'; } else { r = rA; from = 'lsei'; } }
    else if (rA) { r = rA; from = 'lsei'; } else { r = rB; from = 'intake'; }
    rec.set(k, {
      k, ap, bp, aTxt, bTxt,
      aH: aBuf ? sha(aBuf) : null, bH: bBuf ? sha(bBuf) : null,
      corpus: ap && bp ? 'both' : ap ? 'lsei' : 'intake',
      id: r.id, kind: r.kind, from
    });
  }

  // same-source pairs: identifier groups of size > 1, minus the false merge, plus the level-3 pairs
  const groups = new Map();
  for (const r of rec.values()) if (r.kind !== 'none') {
    const g = r.kind + '|' + r.id; if (!groups.has(g)) groups.set(g, []); groups.get(g).push(r.k);
  }
  const pairs = [];
  for (const [g, mem] of groups) {
    const m = mem.filter(k => !FALSE_MERGE.has(k));
    if (m.length > 1) pairs.push({ level: g.startsWith('doi|') ? 1 : 2, id: g.split('|').slice(1).join('|'), members: m.sort() });
  }
  for (const [x, y, ev] of LEVEL3_PAIRS) pairs.push({ level: 3, id: ev, members: [x, y].sort() });
  pairs.sort((p, q) => p.members[0] < q.members[0] ? -1 : 1);
  const pairOf = new Map();
  pairs.forEach((p, i) => { p.tag = 'DUP-' + String(i + 1).padStart(2, '0'); for (const m of p.members) pairOf.set(m, p); });

  // ---- level-3 dedup key, filename-derived. VARIANCE, declared: NAMING.md section 7 derives
  // level 3 from the citation block (identity, year, first six title words). This derives identity
  // and year from the normalized filename, which is clusters.js RULE E. It is the rule that found
  // both level-3 pairs above. The section 7 amendment this wave decides which stands.
  function l3(k) {
    const t = k.replace(/\.md$/, '').split('-');
    const i = t.findIndex(x => /^(19|20)\d{2}$/.test(x));
    if (i < 1) return null;
    return t.slice(0, i).join('-') + '|' + t[i] + '|' + t.slice(i + 1, i + 7).join('-');
  }

  // ---- review routing. NOT the field partition, and the two disagree deliberately.
  // step2_engineer_taxonomy.md section 2.4: the FIELD split is 8 lunar / 3 economics, decided by
  // between-field cosine; the REVIEW split is 7 / 4, decided by who can judge a placement.
  // space-economy-and-markets is field=lunar and review=manager-econ. Conflating them is the same
  // class of error as conflating the folder with the field. This column exists so each reviewer can
  // cut their own half of the table without reading the other's.
  const REVIEW_ECON = new Set(['growth-theory', 'development-and-industrial-policy',
    'organization-and-production-systems', 'space-economy-and-markets']);

  const HDRS = ['block', 'key', 'source_path', 'target_path', 'disposition', 'primary_secondary',
    'pair_id', 'pair_role', 'target_folder', 'field_label', 'review_owner', 'also', 'dedup_key',
    'identifier', 'id_in_source', 'rev', 'basis'];
  const out = [];
  const tally = {};
  for (const k of keys) {
    const r = rec.get(k);
    const tx = taxo.get(k);
    if (!tx) { console.error('FATAL: no taxonomy row for ' + k); process.exit(4); }

    let disp, ps, basis, block;
    const differs = r.corpus === 'both' && r.aH !== r.bH;
    if (r.corpus === 'lsei') ps = 'sole-lsei';
    else if (r.corpus === 'intake') ps = 'sole-intake';
    else if (!differs) ps = 'both-identical';
    else ps = 'lsei-primary';

    if (differs && supByHash.has(r.bH)) {
      disp = 'LIFT-LSEI-STEP0';
      basis = 'intake copy is byte-identical (sha256) to _intake/superseded-duplicates/' + supByHash.get(r.bH)
        + ', the copy Step 0 adjudicated and dropped; step0_dedup_decisions.md. This is a resolved conflict re-arriving, not a new one. SIZE MUST NOT BREAK THIS TIE.';
    } else if (differs) {
      const aL = new Set(r.aTxt.split(/\r?\n/)), bL = new Set(r.bTxt.split(/\r?\n/));
      const bOnly = [...bL].filter(x => !aL.has(x)), aOnly = [...aL].filter(x => !bL.has(x));
      const refs = bOnly.filter(x => /cr_scratch\//.test(x)).length;
      disp = 'LIFT-LSEI-SCRUB';
      basis = 'both copies differ; ' + aOnly.length + ' lines only in lsei, ' + bOnly.length + ' only in intake, of which '
        + refs + ' cite cr_scratch/ paths absent from this repository. The lsei copy is the de-referenced descendant; importing the intake copy reintroduces dangling references.';
    } else if (pairOf.has(k)) {
      const p = pairOf.get(k);
      disp = 'HOLD-PAIR';
      basis = 'same-source pair ' + p.tag + ' at NAMING.md section 7 level ' + p.level + ' on [' + p.id
        + ']; both members land under their own names, neither is deleted and neither is merged. Numeric disagreements go to a ' + p.tag + ' register row. Primary designation inside the pair is deferred to that row.';
    } else if (FALSE_MERGE.has(k)) {
      disp = 'HOLD-FALSEMERGE';
      basis = 'shares the level-2 URL nasa.gov/moontomarsarchitecture with two other keys and is a different document, a four-page ACR25 white paper. A program landing page is not an article URL; the NAMING.md section 7 amendment owns the fix.';
    } else if (r.kind === 'none') {
      disp = 'HOLD-NOID';
      basis = 'no identifier at NAMING.md section 7 level 1 or level 2; ' + (l3(k) ? 'a level-3 key is derivable but only from the filename (variance, see header)' : 'no level-3 key is derivable, no year token in the name')
        + '. Adjudication is blocked on the section 7 amendment this wave.';
    } else {
      disp = 'LIFT';
      basis = 'identifier confirmed at level ' + (r.kind === 'doi' ? 1 : 2) + '.';
    }
    if (disp === 'LIFT') {
      if (r.corpus === 'both') { disp = 'LIFT-IDENTICAL'; basis = 'both corpora hold this key and the bytes are equal (sha256); ' + basis + ' Nothing to adjudicate.'; }
      else basis = r.corpus + '-only key, ' + basis;
    }

    block = /HOLD|SCRUB|STEP0/.test(disp) ? 2 : 1;

    const p = pairOf.get(k);
    const dk = r.kind === 'doi' ? 'L1|' + r.id : r.kind === 'url' ? 'L2|' + r.id
      : (l3(k) ? 'L3-PENDING|' + l3(k) : 'L0|none');
    const rev = REV2.has(k) ? 2 : 1;
    if (rev === 2) basis = REV2.get(k) + '. ' + basis;

    // The byte source and the identifier source are not always the same copy: identify() takes the
    // identifier from whichever copy resolves higher, and the bytes always come from lsei where both
    // hold the key. Where they part, the LANDED file will not contain the identifier this row
    // records, and the merge owes a citation repair. Measured, not assumed.
    const srcPath = (r.ap || r.bp);
    const idInSrc = !r.id ? 'n/a'
      : (r.corpus === 'both' ? r.aTxt : (r.aTxt || r.bTxt)).toLowerCase().includes(r.id.toLowerCase()) ? 'yes' : 'NO';
    if (idInSrc === 'NO') {
      const other = r.corpus === 'both' ? (r.bTxt || '') : '';
      basis += ' CITATION REPAIR OWED: the identifier above is absent from the byte source and present only in the '
        + (other.toLowerCase().includes(r.id.toLowerCase()) ? 'intake' : 'other') + ' copy, which this disposition does not import.'
        + ' Wave 2 lifts the bytes and writes the canonical DOI line into the landed file. Do not drop the identifier and do not import the other copy.';
    }
    const targetPath = 'literature/' + tx.folder + '/' + k;
    if (targetPath.length > 120) console.error('# LONG TARGET (' + targetPath.length + ') ' + targetPath);

    out.push([block, k, srcPath.split(path.sep).join('/'),
      targetPath, disp, ps,
      p ? p.tag : '', p ? 'dup-member' : '', tx.folder, tx.field,
      REVIEW_ECON.has(tx.folder) ? 'manager-econ' : 'space-resources',
      tx.also, dk, r.id || '', idInSrc, rev, basis].join('\t'));
    tally[disp] = (tally[disp] || 0) + 1;
  }

  out.sort((x, y) => { const a = x.split('\t'), b = y.split('\t'); return a[0] !== b[0] ? a[0] - b[0] : (a[1] < b[1] ? -1 : 1); });
  const digest = sha(Buffer.from(READ.slice().sort().join('\n'), 'utf8'));
  const b2 = out.filter(l => l[0] === '2');
  const churn = b2.filter(l => l.split('\t')[HDRS.indexOf('rev')] === '2').length;
  const repairs = out.filter(l => l.split('\t')[HDRS.indexOf('id_in_source')] === 'NO');
  const maxPath = Math.max(...out.map(l => l.split('\t')[3].length));
  const hdr = [
    '# merge_plan.tsv -- Step 2 Wave 1. The Engineer. The disposition table the Wave 2 merge executes from.',
    '# One row per union key. Block 1 first (uncontested, stable by construction), then Block 2 (contested).',
    '# Generated: node tools/merge_identity.js --plan lsei/literature _intake/japanese-miracle/lit \\',
    '#              cr_scratch/step2_engineer_taxonomy.md _intake/superseded-duplicates cr_scratch/merge_plan.tsv',
    '# THE MERGE GLOB IS *.md, NEVER *. lit/ holds 115 non-.md siblings and a bare * sweeps them into retrieval.',
    '# primary_secondary names WHICH CORPUS COPY SUPPLIES THE BYTES. Not a folder role, not a pair role.',
    '#   sole-lsei | sole-intake | both-identical | lsei-primary',
    '# review_owner routes the two reviewers and is NOT the field partition. The FIELD split is 8 lunar /',
    '#   3 economics, decided by between-field cosine; the REVIEW split is 7 / 4, decided by who can judge',
    '#   a placement. space-economy-and-markets is field=lunar and review=manager-econ, deliberately; see',
    '#   step2_engineer_taxonomy.md section 2.4. Each reviewer cuts their own half on column 11 alone.',
    '# pair_role is the same-source-pair role: dup-member, or empty. Primary designation inside a pair is',
    '#   deferred to the DUP-xx register row. This table never adjudicates a pair.',
    '# dedup_key levels: L1 DOI, L2 article URL, L3-PENDING filename-derived (VARIANCE: NAMING.md section 7',
    '#   derives level 3 from the citation block, not the filename; the section 7 amendment decides which stands),',
    '#   L0 no key derivable.',
    '# rev is append-only. A row whose disposition, primary_secondary or target_folder changes after first',
    '#   write bumps rev and the reason leads its basis.',
    '# read-digest sha256 over sorted path\\tsize\\tmtimeMs = ' + digest,
    '# files read = ' + READ.length,
    '# inputs = ' + [A_DIR, B_DIR, TAXO, SUPDIR].join('  '),
    '# rows = ' + out.length + '  block1 = ' + out.filter(l => l[0] === '1').length + '  block2 = ' + b2.length,
    '# disposition tally = ' + JSON.stringify(tally),
    '# churn = block2 rows with rev>1 / block2 rows = ' + churn + ' / ' + b2.length + ' = ' + (100 * churn / b2.length).toFixed(2) + '%',
    '# id_in_source=NO (citation repair owed at Wave 2) = ' + repairs.length
      + (repairs.length ? ': ' + repairs.map(l => l.split('\t')[1]).join(' ') : ''),
    '# longest target_path = ' + maxPath + ' chars, repo-relative; NAMING.md section 8 ceiling is 259 ABSOLUTE',
  ];
  fs.writeFileSync(POUT, hdr.join('\n') + '\n' + HDRS.join('\t') + '\n' + out.join('\n') + '\n');

  console.error('# PLAN inputs       ' + [A_DIR, B_DIR, TAXO, SUPDIR].join('  '));
  console.error('# files read        ' + READ.length);
  console.error('# read-digest       ' + digest);
  console.error('# union keys        ' + keys.length);
  console.error('# block 1           ' + out.filter(l => l[0] === '1').length);
  console.error('# block 2           ' + b2.length);
  console.error('# dispositions      ' + JSON.stringify(tally));
  console.error('# same-source pairs ' + pairs.length + '  ' + pairs.map(p => p.tag + ':L' + p.level).join(' '));
  console.error('# churn             ' + churn + ' / ' + b2.length + ' = ' + (100 * churn / b2.length).toFixed(2) + '%');
  process.exit(0);
}

// ---- run ----
const CRYPTO = require('crypto');
const RD = [];
const TAB = String.fromCharCode(9);
function stamp(p) { const st = fs.statSync(p); RD.push(p.split(path.sep).join('/') + TAB + st.size + TAB + st.mtimeMs); return p; }
const aFiles = walk(A_DIR), bFiles = walk(B_DIR);
const aMap = new Map(), bMap = new Map();
for (const f of aFiles) { const k = normalize(f); if (aMap.has(k)) console.error('COLLISION A ' + k); aMap.set(k, f); }
for (const f of bFiles) { const k = normalize(f); if (bMap.has(k)) console.error('COLLISION B ' + k); bMap.set(k, f); }
const keys = [...new Set([...aMap.keys(), ...bMap.keys()])].sort();

console.error('# merge_identity.js inputs');
console.error('# A ' + A_DIR + '  files ' + aFiles.length + '  distinct keys ' + aMap.size);
console.error('# B ' + B_DIR + '  files ' + bFiles.length + '  distinct keys ' + bMap.size);
console.error('# union keys ' + keys.length + '  both ' + keys.filter(k => aMap.has(k) && bMap.has(k)).length
  + '  A-only ' + keys.filter(k => aMap.has(k) && !bMap.has(k)).length
  + '  B-only ' + keys.filter(k => !aMap.has(k) && bMap.has(k)).length);

const rows = [['file', 'corpus', 'identifier', 'identifier_kind', 'confidence'].join('\t')];
const recs = [];
for (const k of keys) {
  const inA = aMap.has(k), inB = bMap.has(k);
  const corpus = inA && inB ? 'both' : inA ? 'lsei' : 'intake';
  // Where both corpora hold the key, the identifier is taken from whichever copy resolves at the
  // higher precedence level (NAMING.md section 7: DOI, then article URL, then nothing). Taking
  // the lsei copy by convention loses identifiers: the _intake copy of azami-2024 prints the
  // arXiv DOI and the lsei copy says "DOI: not printed in source".
  const RANK = { doi: 2, url: 1, none: 0 };
  const rA = inA ? identify(citationBlock(fs.readFileSync(stamp(aMap.get(k)), 'utf8')).block) : null;
  const rB = inB ? identify(citationBlock(fs.readFileSync(stamp(bMap.get(k)), 'utf8')).block) : null;
  let r, from;
  if (rA && rB) { if (RANK[rB.kind] > RANK[rA.kind]) { r = rB; from = 'intake'; } else { r = rA; from = 'lsei'; } }
  else if (rA) { r = rA; from = 'lsei'; } else { r = rB; from = 'intake'; }
  let conf = r.conf, note = r.note;
  if (rA && rB && rA.id !== rB.id) {
    note = (note ? note + ';' : '') + 'copies-disagree(from:' + from + ')';
    if (conf === 'high') conf = 'medium';
  }
  const confField = note ? conf + ':' + note : conf;
  rows.push([k, corpus, r.id, r.kind, confField].join('\t'));
  recs.push({ key: k, corpus, id: r.id, kind: r.kind, conf: confField });
}
if (OUT) fs.writeFileSync(OUT, rows.join('\n') + '\n');
else process.stdout.write(rows.join('\n') + '\n');

// ---- summary to stderr ----
const byKind = {}; for (const r of recs) byKind[r.kind] = (byKind[r.kind] || 0) + 1;
console.error('# identifier_kind ' + JSON.stringify(byKind));
const withId = recs.filter(r => r.kind !== 'none');
const distinct = new Set(withId.map(r => r.kind + '|' + r.id));
console.error('# rows ' + recs.length + '  with identifier ' + withId.length + '  distinct identifiers ' + distinct.size);
const dupGroups = {};
for (const r of withId) { const kk = r.kind + '|' + r.id; (dupGroups[kk] = dupGroups[kk] || []).push(r.key); }
const shared = Object.entries(dupGroups).filter(([, v]) => v.length > 1);
console.error('# identifiers held by more than one union key: ' + shared.length
  + '  surplus rows ' + shared.reduce((a, [, v]) => a + v.length - 1, 0));
for (const [kk, v] of shared) console.error('#   ' + kk + '  ->  ' + v.join(' | '));
const noId = recs.filter(r => r.kind === 'none');
console.error('# NO IDENTIFIER (' + noId.length + ') -- flagged for 2.2 (MERGE-3):');
for (const r of noId) console.error('#   ' + r.key + '  [' + r.corpus + ']  ' + r.conf);
console.error('# files read ' + RD.length + '  read-digest sha256 over sorted path/size/mtimeMs = '
  + CRYPTO.createHash('sha256').update(Buffer.from(RD.slice().sort().join(String.fromCharCode(10)), 'utf8')).digest('hex'));
