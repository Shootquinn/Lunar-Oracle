/* oracle/router/excluded_nodes.js -- the app's ten excluded nodes as first-class retrieval objects.
 *
 * Sub-step 3.10. Before this file the ten excluded nodes were reachable only as a bag-of-words hit
 * against EXCLUSIONS[key].does at answer time, with nothing behind the hit: no title, no parent, no
 * corpus route, no adjacency, and no refusal record. They are now objects the router retrieves,
 * each carrying its own refusal record built from the app's own exclusion prose.
 *
 * REGENERATED FROM THE APP AT BUILD TIME, NEVER TRANSCRIBED. Every field below is read out of
 * lsei/index.html's DATA-ISLAND on the call that builds it:
 *
 *   does, reason        KNOB_DATA.EXCLUSIONS[slug]          the app's own words, verbatim
 *   title, parent, state KNOB_DATA.SLUGS[slug]              the app's own identity table
 *   status, ruled       KNOB_DATA.SECTIONS[slug]            the app's own ruling record
 *   parent_title        KNOB_DATA.SLUGS[parent].title
 *
 * lsei/lunar-scenario-explorer-map.md carries the same ten rows in a markdown table, and that table
 * is what a transcription would copy. It is not used here, and the reason is on the record: the map
 * is a GENERATED file that the project has already measured as out of date with the app it
 * describes -- oracle/question_classes.json records the map disagreeing with the artifact on md5,
 * byte count, pin and the References total, and rules that the artifact wins. A refusal quoting a
 * stale map would be the Oracle telling a user what the app used to say.
 *
 * WHAT IS AUTHORED RATHER THAN DERIVED, and it is one field. The adjacency pairs and the register
 * axes per node come from oracle/question_classes.json, sub-step 3.3, The Space Resources
 * Engineer's deliverable. They cannot be derived: which modeled node a user will mistake for an
 * excluded one is a fact about users. Every authored pair is nonetheless VALIDATED against the
 * app's own tree before it is used (tools/exclusions_match.js adjacencyRelation), so an authored
 * claim the app contradicts fails the build.
 *
 * THE CORPUS/THIN SPLIT IS DERIVED. A node's primaries are the member leaves of the register axes
 * it declares, resolved against literature/INDEX.tsv. Resolving at least one makes the node
 * EXCLUDED-THEN-CORPUS; resolving none makes it EXCLUDED-THEN-THIN. The assignment written into
 * question_classes.json is treated as a PREDICTION and compared against the derivation. At the
 * digest this landed against, all ten agree, which makes the authored table a known-answer test for
 * the derivation rather than its source.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const X = require('../../tools/exclusions_match.js');
const { nodeTree } = require('./app_surface.js');

/* --- inputs ------------------------------------------------------------------------------------ */

function readIndexLeaves(indexPath) {
  const lines = fs.readFileSync(indexPath, 'utf8').split('\n').filter(Boolean);
  const byLeaf = new Map();
  for (const line of lines.slice(1)) {
    const cols = line.split('\t');
    if (cols.length < 4) continue;
    const p = cols[0];
    byLeaf.set(path.posix.basename(p), { path: p, field: cols[3].trim() });
  }
  if (byLeaf.size === 0) {
    throw new Error('oracle/router/excluded_nodes: ' + indexPath + ' yielded no rows -- refusing ' +
      'rather than reporting every node thin, which is what an empty index silently produces.');
  }
  return byLeaf;
}

/* Axis id -> member leaves, read off the register sidecars' own M rows. */
function readAxisMembers(registerPaths) {
  const members = new Map();
  for (const rp of registerPaths) {
    if (!fs.existsSync(rp)) continue;
    for (const line of fs.readFileSync(rp, 'utf8').split('\n')) {
      const cols = line.split('\t');
      if (cols[0] !== 'M') continue;
      const [, axisId, side, leaf] = cols;
      if (!members.has(axisId)) members.set(axisId, []);
      members.get(axisId).push({ leaf: leaf, side });
    }
  }
  return members;
}

/* --- the build --------------------------------------------------------------------------------- */

function buildExcludedNodes(surface, opts) {
  opts = opts || {};
  const indexPath = opts.indexPath || 'literature/INDEX.tsv';
  const registerPaths = opts.registerPaths || ['oracle/REGISTER.lunar.tsv', 'oracle/REGISTER.econ.tsv'];
  const qcPath = opts.questionClassesPath || 'oracle/question_classes.json';

  const tree = nodeTree(surface);
  const leaves = readIndexLeaves(indexPath);
  const axisMembers = readAxisMembers(registerPaths);

  const qc = fs.existsSync(qcPath) ? JSON.parse(fs.readFileSync(qcPath, 'utf8')) : null;
  const eo = (qc && qc.exclusion_outcomes) || { assignments: [], adjacency_pairs: [] };
  const assignmentBySlug = new Map((eo.assignments || []).map(a => [a.slug, a]));
  const pairByExcluded = new Map((eo.adjacency_pairs || []).map(p => [p.excluded, p]));

  const findings = [];
  const nodes = [];

  /* The population is the app's, not the assignment table's. A node the app excludes and
     question_classes.json omits still becomes an object here, carrying its own refusal, and the
     omission is reported. The reverse -- an assignment for a slug the app does not exclude -- is a
     finding too. Neither file is allowed to define the population by being the one that was read. */
  const appExcluded = Object.keys(surface.EXCLUSIONS).sort();
  const stateExcluded = Object.keys(surface.SECTIONS)
    .filter(k => surface.SECTIONS[k] && surface.SECTIONS[k].state === 'excluded').sort();
  if (appExcluded.join(',') !== stateExcluded.join(',')) {
    findings.push('the app\'s EXCLUSIONS keys and its sections carrying state "excluded" are not ' +
      'the same set: EXCLUSIONS ' + appExcluded.length + ', state:excluded ' + stateExcluded.length);
  }
  for (const slug of assignmentBySlug.keys()) {
    if (!surface.EXCLUSIONS[slug]) findings.push('question_classes.json assigns an outcome to "' + slug + '", which the app does not exclude');
  }

  for (const slug of appExcluded) {
    const entry = surface.EXCLUSIONS[slug];
    const node = tree[slug] || {};
    const section = surface.SECTIONS[slug] || {};
    const assign = assignmentBySlug.get(slug) || {};
    if (!assignmentBySlug.has(slug)) findings.push('the app excludes "' + slug + '" and question_classes.json carries no assignment for it');

    /* Primaries: every member leaf of every register axis this node declares, resolved on disk. */
    const primaries = [];
    for (const axisId of (assign.register_axes || [])) {
      const ms = axisMembers.get(axisId);
      if (!ms) { findings.push('"' + slug + '" declares axis ' + axisId + ', which no register file carries'); continue; }
      for (const m of ms) {
        const hit = leaves.get(m.leaf);
        primaries.push({ axis: axisId, side: m.side, stem: m.leaf, leaf: hit ? hit.path : null, field: hit ? hit.field : null });
        if (!hit) findings.push('axis ' + axisId + ' member "' + m.leaf + '" does not resolve in ' + indexPath);
      }
    }

    /* Adjacency: authored, then validated against the app's own tree. */
    let adjacency = null;
    const pair = pairByExcluded.get(slug);
    if (pair) {
      const rel = X.adjacencyRelation(tree, pair.excluded, pair.modeled);
      if (!rel.ok) {
        findings.push('adjacency pair ' + pair.excluded + ' -> ' + pair.modeled + ' fails validation against the app: ' + rel.why);
      } else {
        adjacency = {
          adjacent_slug: pair.modeled,
          adjacent_title: tree[pair.modeled].title,
          relation: rel.relation,
          distinction: pair.distinction,
        };
      }
    }
    if (assign.adjacent_to && !pair) findings.push('"' + slug + '" is assigned adjacent_to "' + assign.adjacent_to + '" with no matching row in adjacency_pairs');

    const record = {
      slug,
      title: node.title || null,
      parent: node.parent || null,
      parent_title: node.parent_title || null,
      state: node.state || null,
      status: section.status || null,
      ruled: section.ruled || null,
      does: entry.does,          /* verbatim, from the app */
      reason: entry.reason,      /* verbatim, from the app */
      register_axes: assign.register_axes || [],
      /* Authored by the domain seat where present; the app has no such field, and the app's own
         boundary prose demonstrably does not carry the user's vocabulary. See tools/exclusions_match.js. */
      match_keys: assign.match_keys || [],
      thin_patches: assign.thin_patches || [],
      question_class: assign.class || null,
      primaries,
      adjacency,
      outcome: null,
      declared_outcome: assign.outcome || null,
      verdict: null,
      reason_code: null,
      refusal: null,
    };

    record.outcome = X.outcomeFor(record);
    const v = X.verdictForOutcome(record.outcome, record);
    record.verdict = v.verdict;
    record.reason_code = v.reason_code;
    record.refusal = refusalRecord(record, v, indexPath, surface.appHash);

    if (record.declared_outcome && record.declared_outcome !== record.outcome) {
      findings.push('"' + slug + '": question_classes.json declares ' + record.declared_outcome +
        ' and the derivation from the corpus returns ' + record.outcome +
        ' (' + primaries.filter(p => p.leaf).length + ' of ' + primaries.length + ' primaries resolve)');
    }

    nodes.push(record);
  }

  return {
    generated_by: 'oracle/router/build.js',
    app_path: surface.appPath,
    app_md5: surface.appHash,
    index_path: indexPath,
    question_classes_path: qcPath,
    node_count: nodes.length,
    outcome_counts: X.EXCLUSION_OUTCOMES.reduce((acc, o) => {
      acc[o] = nodes.filter(n => n.outcome === o).length; return acc;
    }, {}),
    findings,
    nodes,
  };
}

/* The refusal record. Answer contract section 5: "A refusal names three nouns: the absent object,
   the region searched, and the nearest present object." The three nouns are fields here rather than
   a sentence, so the prose seat renders them and the router does not own wording it cannot check.
   Every string that quotes the app is the app's own bytes. */
function refusalRecord(record, v, indexPath, appMd5) {
  const nearest = record.adjacency
    ? {
        kind: 'app-node',
        slug: record.adjacency.adjacent_slug,
        title: record.adjacency.adjacent_title,
        relation: record.adjacency.relation,
        distinction: record.adjacency.distinction,
        warning: 'The app computes this and it is NOT the answer to the question asked. An answer ' +
                 'that prints its number without the distinction above is read as answering the ' +
                 'excluded question.',
      }
    : record.primaries.filter(p => p.leaf).length
      ? { kind: 'shelf', leaves: record.primaries.filter(p => p.leaf).map(p => p.leaf), axes: record.register_axes }
      : { kind: 'app-parent', slug: record.parent, title: record.parent_title };

  return {
    absent_object: {
      slug: record.slug,
      title: record.title,
      app_says: record.does,        /* verbatim */
      app_reason: record.reason,    /* verbatim */
      ruled: record.ruled,
    },
    region_searched: {
      app: 'the app\'s own node tree at md5 ' + appMd5,
      shelf: indexPath,
      axes: record.register_axes,
      thin_patches: record.thin_patches,
    },
    nearest_present_object: nearest,
    reason_code: v.reason_code,
    outcome: record.outcome,
    why: v.why,
  };
}

function loadExcludedNodes(jsonPath) {
  const gen = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  if (!Array.isArray(gen.nodes) || gen.nodes.length !== gen.node_count) {
    throw new Error('oracle/router/excluded_nodes: ' + jsonPath + ' declares node_count ' +
      gen.node_count + ' and carries ' + (gen.nodes || []).length +
      ' -- the file declares its own size so a bad splice is detectable by counting.');
  }
  return gen;
}

module.exports = { buildExcludedNodes, loadExcludedNodes, readIndexLeaves, readAxisMembers };
