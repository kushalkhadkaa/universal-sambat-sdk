#!/usr/bin/env node
/**
 * create-nepali-datepicker — scaffold a new project with BS date picker pre-wired
 *
 * Usage:
 *   npx create-nepali-datepicker my-app --framework react
 *   npx create-nepali-datepicker my-app --framework vue
 *   npx create-nepali-datepicker my-app --framework next
 *   npx create-nepali-datepicker my-app --framework svelte
 *   npx create-nepali-datepicker my-app --framework angular
 *   npx create-nepali-datepicker my-app --framework vanilla
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ── Tiny CLI parser (no deps) ─────────────────────────────────────

const args = process.argv.slice(2);
const projectName = args.find(a => !a.startsWith('--')) || 'my-nepali-app';
const fw = (args.find(a => a.startsWith('--framework='))?.split('=')[1])
        || (args[args.indexOf('--framework') + 1])
        || 'react';
const theme = (args.find(a => a.startsWith('--theme='))?.split('=')[1])
           || (args[args.indexOf('--theme') + 1])
           || 'classic-light';
const lang = (args.find(a => a.startsWith('--lang='))?.split('=')[1])
          || (args[args.indexOf('--lang') + 1])
          || 'ne';
const help = args.includes('--help') || args.includes('-h');
const version = args.includes('--version') || args.includes('-v');

if (version) { console.log('create-nepali-datepicker 1.2.0'); process.exit(0); }

if (help) {
  console.log(`
  create-nepali-datepicker <project-name> [options]

  Options:
    --framework  react | vue | next | svelte | angular | vanilla  (default: react)
    --theme      Any of 22 NDP themes                             (default: classic-light)
    --lang       ne | en                                          (default: ne)
    --version    Show version
    --help       Show this help

  Examples:
    npx create-nepali-datepicker my-app --framework react --theme ocean-blue
    npx create-nepali-datepicker booking-form --framework vue --lang en
  `);
  process.exit(0);
}

// ── Scaffold definitions ──────────────────────────────────────────

const SUPPORTED = ['react', 'vue', 'next', 'svelte', 'angular', 'vanilla'];

if (!SUPPORTED.includes(fw)) {
  console.error(`✗ Unknown framework "${fw}". Supported: ${SUPPORTED.join(', ')}`);
  process.exit(1);
}

const targetDir = path.resolve(process.cwd(), projectName);

if (fs.existsSync(targetDir)) {
  console.error(`✗ Directory "${projectName}" already exists.`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

// ── Generate files per framework ──────────────────────────────────

const scaffolds = {
  react: () => scaffoldReact(targetDir, projectName, theme, lang),
  vue:   () => scaffoldVue(targetDir, projectName, theme, lang),
  next:  () => scaffoldNext(targetDir, projectName, theme, lang),
  svelte:() => scaffoldSvelte(targetDir, projectName, theme, lang),
  angular:()=> scaffoldAngular(targetDir, projectName, theme, lang),
  vanilla:()=> scaffoldVanilla(targetDir, projectName, theme, lang),
};

console.log(`\n  Creating ${fw} project "${projectName}"…\n`);
scaffolds[fw]();

console.log(`
  ✓ Project created at ./${projectName}

  Next steps:
    cd ${projectName}
    npm install
    npm run dev

  Documentation: https://kushalkhadkaa.github.io/nepali-datepicker-studio/
`);

// ── Scaffold helpers ──────────────────────────────────────────────

function write(dir, filename, content) {
  fs.writeFileSync(path.join(dir, filename), content, 'utf8');
}

function scaffoldReact(dir, name, theme, lang) {
  fs.mkdirSync(path.join(dir, 'src'), { recursive: true });
  write(dir, 'package.json', JSON.stringify({
    name, version: '0.0.0', private: true,
    scripts: { dev: 'vite', build: 'vite build', preview: 'vite preview' },
    dependencies: { react: '^18.2.0', 'react-dom': '^18.2.0', '@nepali-datepicker-studio/react': '^1.2.0' },
    devDependencies: { '@vitejs/plugin-react': '^4.0.0', vite: '^5.0.0' },
  }, null, 2));
  write(dir, 'vite.config.js', `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nexport default defineConfig({ plugins: [react()] });\n`);
  write(dir, 'index.html', indexHtml(name, '/src/main.jsx'));
  write(dir, 'src/main.jsx', `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App.jsx';\nReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);\n`);
  write(dir, 'src/App.jsx', `import React, { useState } from 'react';
import { NepaliDatePicker } from '@nepali-datepicker-studio/react';
import '@nepali-datepicker-studio/react/dist/style.css';

export default function App() {
  const [date, setDate] = useState('');
  return (
    <div style={{ padding: 32 }}>
      <h1>Nepali DatePicker — React</h1>
      <NepaliDatePicker
        theme="${theme}"
        lang="${lang}"
        onChange={setDate}
        placeholder="${lang === 'ne' ? 'मिति छान्नुहोस्' : 'Select date'}"
      />
      {date && <p>Selected: {date}</p>}
    </div>
  );
}
`);
}

function scaffoldVue(dir, name, theme, lang) {
  fs.mkdirSync(path.join(dir, 'src'), { recursive: true });
  write(dir, 'package.json', JSON.stringify({
    name, version: '0.0.0', private: true,
    scripts: { dev: 'vite', build: 'vite build' },
    dependencies: { vue: '^3.4.0', '@nepali-datepicker-studio/vue': '^1.2.0' },
    devDependencies: { '@vitejs/plugin-vue': '^5.0.0', vite: '^5.0.0' },
  }, null, 2));
  write(dir, 'vite.config.js', `import { defineConfig } from 'vite';\nimport vue from '@vitejs/plugin-vue';\nexport default defineConfig({ plugins: [vue()] });\n`);
  write(dir, 'index.html', indexHtml(name, '/src/main.js'));
  write(dir, 'src/main.js', `import { createApp } from 'vue';\nimport App from './App.vue';\ncreateApp(App).mount('#app');\n`);
  write(dir, 'src/App.vue', `<template>
  <div style="padding:32px">
    <h1>Nepali DatePicker — Vue 3</h1>
    <NepaliDatePicker v-model="date" theme="${theme}" lang="${lang}" />
    <p v-if="date">Selected: {{ date }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { NepaliDatePicker } from '@nepali-datepicker-studio/vue';
import '@nepali-datepicker-studio/vue/dist/style.css';
const date = ref('');
</script>
`);
}

function scaffoldNext(dir, name, theme, lang) {
  fs.mkdirSync(path.join(dir, 'app'), { recursive: true });
  write(dir, 'package.json', JSON.stringify({
    name, version: '0.0.0', private: true,
    scripts: { dev: 'next dev', build: 'next build', start: 'next start' },
    dependencies: { next: '^14.0.0', react: '^18.2.0', 'react-dom': '^18.2.0', '@nepali-datepicker-studio/react': '^1.2.0' },
  }, null, 2));
  write(dir, 'next.config.js', `/** @type {import('next').NextConfig} */\nmodule.exports = {};\n`);
  write(dir, 'app/layout.jsx', `export const metadata = { title: '${name}' };\nexport default function RootLayout({ children }) { return <html><body>{children}</body></html>; }\n`);
  write(dir, 'app/page.jsx', `'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
const NepaliDatePicker = dynamic(() => import('@nepali-datepicker-studio/react').then(m => m.NepaliDatePicker), { ssr: false });

export default function Page() {
  const [date, setDate] = useState('');
  return (
    <main style={{ padding: 32 }}>
      <h1>Nepali DatePicker — Next.js</h1>
      <NepaliDatePicker theme="${theme}" lang="${lang}" onChange={setDate} />
      {date && <p>Selected: {date}</p>}
    </main>
  );
}
`);
}

function scaffoldSvelte(dir, name, theme, lang) {
  fs.mkdirSync(path.join(dir, 'src'), { recursive: true });
  write(dir, 'package.json', JSON.stringify({
    name, version: '0.0.0', private: true,
    scripts: { dev: 'vite', build: 'vite build' },
    dependencies: { '@nepali-datepicker-studio/svelte': '^1.2.0' },
    devDependencies: { svelte: '^5.0.0', '@sveltejs/vite-plugin-svelte': '^3.0.0', vite: '^5.0.0' },
  }, null, 2));
  write(dir, 'vite.config.js', `import { defineConfig } from 'vite';\nimport { svelte } from '@sveltejs/vite-plugin-svelte';\nexport default defineConfig({ plugins: [svelte()] });\n`);
  write(dir, 'index.html', indexHtml(name, '/src/main.js'));
  write(dir, 'src/main.js', `import App from './App.svelte';\nconst app = new App({ target: document.getElementById('app') });\nexport default app;\n`);
  write(dir, 'src/App.svelte', `<script>
  import { NepaliDatePicker } from '@nepali-datepicker-studio/svelte';
  let date = $state('');
</script>
<div style="padding:32px">
  <h1>Nepali DatePicker — Svelte 5</h1>
  <NepaliDatePicker bind:value={date} theme="${theme}" lang="${lang}" />
  {#if date}<p>Selected: {date}</p>{/if}
</div>
`);
}

function scaffoldAngular(dir, name, theme, lang) {
  write(dir, 'package.json', JSON.stringify({
    name, version: '0.0.0', private: true,
    scripts: { dev: 'ng serve', build: 'ng build' },
    dependencies: { '@angular/common': '^17.0.0', '@angular/core': '^17.0.0', '@angular/forms': '^17.0.0', '@angular/platform-browser': '^17.0.0', '@angular/platform-browser-dynamic': '^17.0.0', '@nepali-datepicker-studio/angular': '^1.2.0', rxjs: '^7.8.0', 'zone.js': '^0.14.0' },
    devDependencies: { '@angular/cli': '^17.0.0', '@angular/compiler-cli': '^17.0.0', typescript: '~5.2.0' },
  }, null, 2));
  fs.mkdirSync(path.join(dir, 'src/app'), { recursive: true });
  write(dir, 'src/main.ts', `import { bootstrapApplication } from '@angular/platform-browser';\nimport { AppComponent } from './app/app.component';\nbootstrapApplication(AppComponent).catch(console.error);\n`);
  write(dir, 'src/index.html', `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${name}</title></head><body><app-root></app-root></body></html>\n`);
  write(dir, 'src/app/app.component.ts', `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NepaliDatePickerDirective } from '@nepali-datepicker-studio/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NepaliDatePickerDirective],
  template: \`
    <div style="padding:32px">
      <h1>Nepali DatePicker — Angular</h1>
      <input nepaliDatePicker [(ngModel)]="date" [ndpOptions]="{theme:'${theme}',lang:'${lang}'}" placeholder="${lang === 'ne' ? 'मिति छान्नुहोस्' : 'Select date'}">
      <p *ngIf="date">Selected: {{ date }}</p>
    </div>
  \`,
})
export class AppComponent { date = ''; }
`);
}

function scaffoldVanilla(dir, name, theme, lang) {
  write(dir, 'package.json', JSON.stringify({
    name, version: '0.0.0', private: true,
    scripts: { dev: 'vite', build: 'vite build' },
    devDependencies: { vite: '^5.0.0' },
  }, null, 2));
  write(dir, 'index.html', `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${name}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nepali-datepicker-studio@latest/dist/nepali-datepicker.min.css">
</head>
<body style="font-family:system-ui;padding:32px">
  <h1>Nepali DatePicker — Vanilla JS</h1>
  <input id="ndp" type="text" placeholder="${lang === 'ne' ? 'मिति छान्नुहोस्' : 'Select date'}" readonly style="padding:8px;font-size:16px">
  <p id="out"></p>
  <script src="https://cdn.jsdelivr.net/npm/nepali-datepicker-studio@latest/dist/nepali-datepicker.min.js"><\/script>
  <script>
    new NepaliDatePicker('#ndp', {
      theme: '${theme}',
      lang:  '${lang}',
      onChange: function(date) {
        document.getElementById('out').textContent = 'Selected: ' + date.bs;
      },
    });
  <\/script>
</body>
</html>
`);
}

function indexHtml(name, entry) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>${name}</title></head>
<body>
  <div id="app"></div>
  <div id="root"></div>
  <script type="module" src="${entry}"></script>
</body>
</html>
`;
}
