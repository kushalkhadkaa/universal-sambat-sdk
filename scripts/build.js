/**
 * Universal Sambat SDK — Build Script
 * Produces: UMD (browser), ESM, CJS
 * Run: node scripts/build.js
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT    = path.join(__dirname, '..');
const SRC_JS  = path.join(ROOT, 'src/js');
const DIST    = path.join(ROOT, 'dist');

const pkg     = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'));
const VERSION = pkg.version;
const YEAR    = new Date().getFullYear();

if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });

// ── Source files (order matters — dependencies first) ─────────────────────────
const SOURCE_FILES = [
  'ndp-data.js',
  'ndp-utils.js',
  'ndp-core.js',
  'ndp-converter-widget.js',
];

// ── Read & concatenate raw source ─────────────────────────────────────────────
let rawSrc = '';
SOURCE_FILES.forEach(f => {
  const filePath = path.join(SRC_JS, f);
  if (!fs.existsSync(filePath)) {
    console.warn(`  [WARN] Source not found: ${filePath}`);
    return;
  }
  rawSrc += `\n/* ─── ${f} ─── */\n` + fs.readFileSync(filePath, 'utf-8') + '\n';
});

// ── License / version banner ──────────────────────────────────────────────────
const BANNER = `/*!
 * Universal Sambat SDK v${VERSION}
 * https://kushalkhadkaa.github.io/universal-sambat-sdk/
 * (c) ${YEAR} Kushal Khadka
 * Released under the MIT License
 */`;

// ── Exported symbol names ─────────────────────────────────────────────────────
const EXPORTS = [
  'NepaliDatePicker',
  'NepaliConverterWidget',
  'AD2BS',
  'BS2AD',
  'Get2DigitNo',
  'ConvertToUnicode',
  'ConvertToNumber',
  'NumberToWords',
  'NumberToWordsUnicode',
  'ParseDate',
  'ConvertToDateObject',
];

// ── 1. UMD / Browser (IIFE + global assignment) ───────────────────────────────
const umdContent = `${BANNER}
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    var lib = factory();
    ${EXPORTS.map(n => `root.${n} = lib.${n};`).join('\n    ')}
  }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var window = typeof globalThis !== 'undefined' ? globalThis
             : (typeof window !== 'undefined' ? window : {});
  var document = (typeof window !== 'undefined' && window.document) ? window.document : {
    createElement: function() { return { style: {}, appendChild: function(){}, setAttribute: function(){} }; },
    addEventListener: function() {},
    querySelector: function() { return null; },
    querySelectorAll: function() { return []; }
  };

${rawSrc}

  return {
    ${EXPORTS.map(n => `${n}: window.${n}`).join(',\n    ')}
  };
}));
`;

// ── 2. ESM (import / export) ───────────────────────────────────────────────────
const esmContent = `${BANNER}

var _ndp_window = typeof globalThis !== 'undefined' ? globalThis
  : (typeof window !== 'undefined' ? window : {});
var _ndp_document = (typeof _ndp_window !== 'undefined' && _ndp_window.document) ? _ndp_window.document : {
  createElement: () => ({ style: {}, appendChild: () => {}, setAttribute: () => {} }),
  addEventListener: () => {},
  querySelector: () => null,
  querySelectorAll: () => []
};
var window = _ndp_window;
var document = _ndp_document;

${rawSrc}

const ${EXPORTS.join(', ')} = ${EXPORTS.map(n => `window.${n}`).join(', ')};
export { ${EXPORTS.join(', ')} };
export default window.NepaliDatePicker;
`;

// ── 3. CJS (require / module.exports) ─────────────────────────────────────────
const cjsContent = `${BANNER}
'use strict';

var window = typeof globalThis !== 'undefined' ? globalThis
           : (typeof window !== 'undefined' ? window : global || {});
var document = (typeof window !== 'undefined' && window.document) ? window.document : {
  createElement: function() { return { style: {}, appendChild: function(){}, setAttribute: function(){} }; },
  addEventListener: function() {},
  querySelector: function() { return null; },
  querySelectorAll: function() { return []; }
};

${rawSrc}

module.exports = {
  ${EXPORTS.map(n => `${n}: window.${n}`).join(',\n  ')}
};
`;

// ── Write outputs ─────────────────────────────────────────────────────────────
const outputs = [
  { file: 'nepali-datepicker.js',      content: umdContent,  label: 'UMD' },
  { file: 'nepali-datepicker.esm.js',  content: esmContent,  label: 'ESM' },
  { file: 'nepali-datepicker.cjs.js',  content: cjsContent,  label: 'CJS' },
];

outputs.forEach(({ file, content, label }) => {
  fs.writeFileSync(path.join(DIST, file), content);
  const kb = (Buffer.byteLength(content) / 1024).toFixed(1);
  console.log(`  ✓  dist/${file}  (${label}, ${kb} KB)`);
});

// ── Inject version constant into UMD dist ─────────────────────────────────────
console.log(`\nUniversal Sambat SDK v${VERSION} built successfully.\n`);
