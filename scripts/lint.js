'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const requiredFiles = [
  'README.md',
  'CONTRIBUTING.md',
  'ECOSYSTEM.md',
  'LICENSE',
  'package.json',
  'package-lock.json',
  'dist/nepali-datepicker.js',
  'dist/nepali-datepicker.esm.js',
  'dist/nepali-datepicker.cjs.js',
  'dist/nepali-datepicker.css',
  'dist/nepali-datepicker.d.ts',
  'src/js/ndp-data.js',
  'src/js/ndp-utils.js',
  'src/js/ndp-core.js',
  'src/js/ndp-converter-widget.js',
  'robots.txt',
  'sitemap.xml',
  'llms.txt'
];

function walk(dir, matches) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(ROOT, fullPath);

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      walk(fullPath, matches);
      continue;
    }

    if (entry.name === '.DS_Store') matches.push(relPath);
  }
}

const errors = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(ROOT, file))) {
    errors.push(`Missing required release file: ${file}`);
  }
}

const dsStoreFiles = [];
walk(ROOT, dsStoreFiles);
for (const file of dsStoreFiles) {
  errors.push(`Remove macOS metadata file: ${file}`);
}

if (errors.length) {
  console.error('Repository lint failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Repository lint passed.');
