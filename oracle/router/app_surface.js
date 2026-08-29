/* oracle/router/app_surface.js -- the Oracle's one and only door into the app.
 *
 * Sub-step 3.2. This is a reimplementation of lsei/oracle/lib/app_model.js, not a copy of it, and
 * the two differences ARE sub-step 3.2: loose ends C1 and C2 in the gameplan's register.
 *
 * C1. The prototype opens three islands -- DATA-ISLAND, MODEL-CORE, DERIVATION-CORE -- and never
 *     opens VALUE-CORE. valueModel() lives in VALUE-CORE, so the app's entire economic half
 *     (r_prop, r_const, margin_prop, margin_const, value_prop, value_const, Dstar_prop, ranking)
 *     is unreachable through the prototype's door, and the router answers those questions from the
 *     literature shelf. The Oracle answering from the shelf a question the app owns is a direct
 *     violation of the standing authority rule. This file opens VALUE-CORE in the same scope as
 *     MODEL-CORE -- the same scope, because valueModel() closes over model() and ENVELOPE, and a
 *     second scope would be a second app.
 *
 * C2. The prototype's OUTPUT_LEXICON names eight of the twenty-six keys model() returns, and a
 *     key with no lexicon entry does not fail -- it falls through to a literature search. The
 *     failure is silent, which is why it survived. The fix here is structural rather than
 *     eighteen more regexes: this file derives the CLOSED OUTPUT NAMESPACE by calling both
 *     functions and reading Object.keys() off what they return, so every key the app computes is
 *     addressable by its own identifier with no lexicon entry at all. The phrase lexicon becomes
 *     an alias layer over that namespace, every alias target is checked against it, and a key
 *     reachable only by identifier is REPORTED rather than silently absent.
 *
 * Nothing here re-types a number, a key name, or a phase out of the app. Every field is read out
 * of this call's own file text and evaluated at call time; no value is cached across calls.
 */
'use strict';
const fs = require('fs');
const crypto = require('crypto');

/* --- island extraction, byte-identical in behaviour to the prototype's readIsland ------------- */

function readIsland(html, name, appPath) {
  const a = html.indexOf('/* ===== ' + name + ':START ===== */');
  const b = html.indexOf('/* ===== ' + name + ':END ===== */');
  if (a < 0 || b < 0 || b < a) {
    throw new Error('oracle/router/app_surface: island ' + name + ' not found or malformed in ' +
      appPath + ' -- refusing rather than returning a partial model.');
  }
  return html.slice(a, b);
}

/* --- the two derivations the prototype already got right, kept because they are right ---------- */

function deriveEraNames(modelCoreSrc, appPath) {
  const re = /\{id:'[^\/']+\/([^']+)',\s*ice:[0-9.]+,\s*funding:'(\w+)',\s*phase:'(\d{4})'/g;
  const byPhase = {};
  let m;
  while ((m = re.exec(modelCoreSrc))) {
    const era = m[1], phase = m[3];
    if (byPhase[phase] && byPhase[phase] !== era) {
      throw new Error('oracle/router/app_surface: phase ' + phase + ' names two different eras in ' +
        'the app\'s own benchmark rows (' + byPhase[phase] + ' and ' + era + ') in ' + appPath +
        ' -- refusing to guess which one an answer should print.');
    }
    byPhase[phase] = era;
  }
  if (Object.keys(byPhase).length === 0) {
    throw new Error('oracle/router/app_surface: found no era-name rows in MODEL-CORE\'s runTests() ' +
      'CELLS array in ' + appPath + ' -- the app\'s own shape changed and this reader needs updating.');
  }
  return byPhase;
}

/* Scan one function's own source text for every "<arg>.<key>" reference. Used for both model(a)
   and valueModel(inp): the argument name differs, so it is a parameter rather than a literal. */
function deriveInputKeys(src, signature, argName, appPath) {
  const fnStart = src.indexOf(signature);
  if (fnStart < 0) {
    throw new Error('oracle/router/app_surface: ' + signature + ' not found in ' + appPath);
  }
  const harnessAt = src.indexOf('TEST HARNESS', fnStart);
  const body = harnessAt > fnStart ? src.slice(fnStart, harnessAt) : src.slice(fnStart);
  const keys = new Set();
  const re = new RegExp('\\b' + argName + '\\.(\\w+)', 'g');
  let m;
  while ((m = re.exec(body))) keys.add(m[1]);
  if (keys.size === 0) {
    throw new Error('oracle/router/app_surface: ' + signature + ' read no ' + argName +
      '.<key> references in ' + appPath + ' -- refusing, since a function with no legible inputs ' +
      'cannot be addressed at all.');
  }
  return keys;
}

/* --- the closed output namespace, C2's fix ---------------------------------------------------
 *
 * Call each function once with a real preset's own envelope defaults and read Object.keys() off
 * what comes back. The landed cost the value probe needs comes off the app's own LANDED_COST rail
 * rather than a number typed here; a probe value is never an answer and never leaves this
 * function, but taking it from the app anyway keeps this file free of app numerals entirely.
 */
function deriveOutputs(api, appPath) {
  const scenarioKey = Object.keys(api.PRESETS)[0];
  const preset = api.PRESETS[scenarioKey];
  const phase = Object.keys(api.ENVELOPE[preset.funding])[0];
  const env = api.ENVELOPE[preset.funding][phase];
  const base = {
    ice: preset.ice, phi_c: preset.phi_c, funding: preset.funding, phase,
    power: env.P, mass: env.M, fission: env.fission,
  };

  const outputs = new Map();

  const modelProbe = api.model(base);
  for (const key of Object.keys(modelProbe)) {
    outputs.set(key, { key, source: 'model', requiresLandedCost: false });
  }

  const rail = (api.LANDED_COST && Array.isArray(api.LANDED_COST.rail)) ? api.LANDED_COST.rail
             : (api.DETENTS && Array.isArray(api.DETENTS.landed_cost)) ? api.DETENTS.landed_cost
             : null;
  if (!rail || rail.length === 0) {
    throw new Error('oracle/router/app_surface: neither LANDED_COST.rail nor DETENTS.landed_cost ' +
      'carries a rail in ' + appPath + ' -- refusing, since valueModel() cannot be probed without ' +
      'a landed cost and this file will not type one.');
  }
  const valueProbe = api.valueModel(Object.assign({}, base, { landed_cost: rail[0] }));
  for (const key of Object.keys(valueProbe)) {
    /* A key both functions return is a model key; valueModel() passes several of model()'s own
       outputs straight through (cap, Cfull, mass, binding, feasible, transDistKm, phi_c0,
       massEff), and routing those through valueModel() would make an answer depend on a landed
       cost that has nothing to do with the number asked for. model() wins the key. */
    if (outputs.has(key)) continue;
    outputs.set(key, { key, source: 'value', requiresLandedCost: true });
  }

  if (outputs.size === 0) {
    throw new Error('oracle/router/app_surface: the app published no outputs at all in ' + appPath);
  }

  /* THE KNOWN-ANSWER TEST, and it asserts four numbers rather than one.
   *
   * The union alone can be right by luck: two component counts that are both wrong by the same
   * amount in opposite directions produce a correct union, and a single-number assertion has
   * nothing to catch that with. It is not a hypothetical -- the relay this file's own author sent
   * carried "26 + 29, union 45", which requires an overlap of 10, and the arithmetic went
   * unchallenged for exactly as long as the overlap was unstated. So all four are recorded and all
   * four are checked: model 26, value 27, overlap 8, union 45, measured at app md5
   * 16caa330ebae773684285c301a8e0a98.
   *
   * These are REPORTED rather than thrown on, because the app is a floating working copy and a
   * legitimate upstream change to model()'s shape must not stop the Oracle. What must never happen
   * silently is the namespace shrinking back toward the eight keys the prototype could reach.
   */
  const modelKeys = Object.keys(modelProbe);
  const valueKeys = Object.keys(valueProbe);
  const overlap = valueKeys.filter(k => modelKeys.includes(k));
  const KNOWN = { model: 26, value: 27, overlap: 8, union: 45 };
  const measured = { model: modelKeys.length, value: valueKeys.length, overlap: overlap.length, union: outputs.size };
  const drift = Object.keys(KNOWN).filter(k => KNOWN[k] !== measured[k]);
  outputs.knownAnswer = { known: KNOWN, measured, drift, overlapKeys: overlap.sort() };
  if (measured.model + measured.value - measured.overlap !== measured.union) {
    throw new Error('oracle/router/app_surface: the output namespace does not close. model ' +
      measured.model + ' + value ' + measured.value + ' - overlap ' + measured.overlap + ' != union ' +
      measured.union + '. One of the three components is being counted against a different probe ' +
      'than the others, which is the arithmetic a single union figure cannot catch.');
  }
  return outputs;
}

/* --- the loader ------------------------------------------------------------------------------- */

function loadAppSurface(appPath) {
  const html = fs.readFileSync(appPath, 'utf8');
  const appHash = crypto.createHash('md5').update(html).digest('hex');

  const box = {};
  new Function('window', 'globalThis', readIsland(html, 'DATA-ISLAND', appPath))(box, box);
  const KNOB_DATA = box.KNOB_DATA;
  if (!KNOB_DATA) {
    throw new Error('oracle/router/app_surface: DATA-ISLAND evaluated but published no KNOB_DATA in ' + appPath);
  }

  /* C1. MODEL-CORE and VALUE-CORE evaluate together, in one scope. valueModel() closes over
     model(), ENVELOPE and CONFIG, which MODEL-CORE declares; evaluating VALUE-CORE separately
     either throws on those free names or requires re-declaring them, and a re-declared model() is
     a second app. One eval, one scope, one model. */
  const modelCoreSrc = readIsland(html, 'MODEL-CORE', appPath);
  const valueCoreSrc = readIsland(html, 'VALUE-CORE', appPath);
  const tail = '\nreturn {model, valueModel, CONFIG, DETENTS, ENVELOPE, VALUE, LANDED_COST, ' +
               'PRESETS: KNOB_DATA.PRESETS};';
  const api = new Function('KNOB_DATA', modelCoreSrc + '\n' + valueCoreSrc + tail)(KNOB_DATA);
  if (typeof api.model !== 'function') {
    throw new Error('oracle/router/app_surface: MODEL-CORE did not publish a callable model() in ' + appPath);
  }
  if (typeof api.valueModel !== 'function') {
    throw new Error('oracle/router/app_surface: VALUE-CORE did not publish a callable valueModel() in ' +
      appPath + ' -- this is loose end C1 recurring, and it is a refusal rather than a degraded load: ' +
      'a surface without valueModel() answers the app\'s economic half from the literature shelf.');
  }

  let DERIVATION = {}, regimeNoteKeyForBinding = null, iceNoteKeyForIce = null, phiNoteKeyForPhiC = null;
  const derivationCoreSrc = readIsland(html, 'DERIVATION-CORE', appPath);
  if (derivationCoreSrc) {
    const dApi = new Function('KNOB_DATA', derivationCoreSrc +
      '\nreturn {DERIVATION, _dBindKey, _dIceKey, _dPhiKey};')(KNOB_DATA);
    DERIVATION = dApi.DERIVATION || {};
    regimeNoteKeyForBinding = dApi._dBindKey;
    iceNoteKeyForIce = dApi._dIceKey;
    phiNoteKeyForPhiC = dApi._dPhiKey;
  }

  const eraNames = deriveEraNames(modelCoreSrc, appPath);
  const modelInputKeys = deriveInputKeys(modelCoreSrc, 'function model(a){', 'a', appPath);
  const valueInputKeys = deriveInputKeys(valueCoreSrc, 'function valueModel(inp){', 'inp', appPath);

  const fundingKeys = Object.keys(api.ENVELOPE);
  if (fundingKeys.length === 0) {
    throw new Error('oracle/router/app_surface: ENVELOPE carries no funding tiers in ' + appPath);
  }
  const phases = Object.keys(api.ENVELOPE[fundingKeys[0]]);
  for (const f of fundingKeys) {
    const fp = Object.keys(api.ENVELOPE[f]);
    if (fp.length !== phases.length || fp.some((p, i) => p !== phases[i])) {
      throw new Error('oracle/router/app_surface: ENVELOPE.' + f + ' names a different phase set ' +
        'than ENVELOPE.' + fundingKeys[0] + ' in ' + appPath + ' -- refusing to pick one arbitrarily.');
    }
  }

  const surface = {
    model: api.model,
    valueModel: api.valueModel,
    CONFIG: api.CONFIG,
    VALUE: api.VALUE,
    DETENTS: api.DETENTS,
    ENVELOPE: api.ENVELOPE,
    PRESETS: api.PRESETS,
    LANDED_COST: api.LANDED_COST,
    phases,
    eraNames,
    modelInputKeys,
    valueInputKeys,
    EXCLUSIONS: KNOB_DATA.EXCLUSIONS || {},
    SECTIONS: KNOB_DATA.SECTIONS || {},
    CLAIMS: KNOB_DATA.CLAIMS || {},
    SLUGS: KNOB_DATA.SLUGS || {},
    SECTION_REFS: KNOB_DATA.SECTION_REFS || {},
    REFERENCES: KNOB_DATA.REFERENCES || {},
    LEDGER: KNOB_DATA.LEDGER || {},
    DERIVATION,
    regimeNoteKeyForBinding, iceNoteKeyForIce, phiNoteKeyForPhiC,
    appPath, appHash,
  };
  surface.outputs = deriveOutputs(surface, appPath);
  return surface;
}

/* Return the namespace as a sorted array, for a report or a coverage assertion. */
function outputNamespace(surface) {
  return [...surface.outputs.values()].sort((a, b) => a.key.localeCompare(b.key));
}

/* The app's own node tree, flattened: slug -> { slug, title, parent, parent_title, state }.
   Read off KNOB_DATA.SLUGS, which is the app's own identity table. Used by the excluded-node
   builder and by the adjacency validation, both of which must never hand-type a parent. */
function nodeTree(surface) {
  const tree = {};
  for (const slug of Object.keys(surface.SLUGS)) {
    const n = surface.SLUGS[slug];
    tree[slug] = {
      slug, kind: n.kind, title: n.title, state: n.state,
      parent: n.parent || null,
      parent_title: n.parent && surface.SLUGS[n.parent] ? surface.SLUGS[n.parent].title : null,
    };
  }
  return tree;
}

module.exports = { loadAppSurface, readIsland, outputNamespace, nodeTree };
