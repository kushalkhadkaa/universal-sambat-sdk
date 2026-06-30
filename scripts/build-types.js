#!/usr/bin/env node
/**
 * build-types.js — copy and re-export TypeScript declarations for all packages
 *
 * Run: node scripts/build-types.js
 * Or:  npm run build:types  (from root)
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const PACKAGES = [
  'react', 'vue', 'angular', 'svelte',
  'web-components', 'node', 'react-native',
];

function ensure(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyIfExists(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`  copied ${path.relative(ROOT, src)} → ${path.relative(ROOT, dest)}`);
  }
}

console.log('\n▸ Syncing TypeScript declarations…\n');

// Ensure dist exists
ensure(DIST);

// Copy core declarations
copyIfExists(
  path.join(ROOT, 'dist', 'nepali-datepicker.d.ts'),
  path.join(DIST, 'nepali-datepicker.d.ts'),
);

// Copy per-package declarations
for (const pkg of PACKAGES) {
  const pkgDir = path.join(ROOT, 'packages', pkg);
  const srcDts = path.join(pkgDir, 'src', 'index.d.ts');
  const outDts = path.join(pkgDir, 'dist', 'index.d.ts');
  ensure(path.join(pkgDir, 'dist'));
  copyIfExists(srcDts, outDts);
}

console.log('\n✓ TypeScript declarations synced.\n');
