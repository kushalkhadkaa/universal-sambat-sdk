# Nepali DatePicker Studio — 15-Phase Cross-Platform Expansion Plan

> Read this first every session. It is the single source of truth for what's built and what's next.
> Last updated: 2026-06-27

---

## Phase Overview

| # | Phase | Target Stack | Status |
|---|-------|-------------|--------|
| 1 | Build System & Package Foundation | Node.js build scripts, monorepo scaffold | ✅ COMPLETE |
| 2 | React Package | React 16–19, TypeScript, hooks, npm | ✅ COMPLETE |
| 3 | Next.js / SSR | Next.js App Router + Pages Router | ✅ COMPLETE |
| 4 | Vue 3 / Nuxt | Vue 3 Composition API, Nuxt 3 plugin | ✅ COMPLETE |
| 5 | Angular | ControlValueAccessor, Angular 17/18, ng-packagr | ✅ COMPLETE |
| 6 | Svelte / SvelteKit | Svelte 5 runes, SvelteKit form actions | ✅ COMPLETE |
| 7 | Web Components | `<nepali-datepicker>` custom element, Shadow DOM | ✅ COMPLETE |
| 8 | Node.js / Express / Fastify | Server-side BS↔AD, middleware, Zod schema | ✅ COMPLETE |
| 9 | React Native | iOS + Android, WebView bridge, bottom sheet | ✅ COMPLETE |
| 10 | Flutter | Dart BS↔AD engine, Material 3, Cupertino | ✅ COMPLETE |
| 11 | iOS Swift | SPM library, UIKit + SwiftUI, Combine | ✅ COMPLETE |
| 12 | Android Kotlin | Compose + XML, Gradle library, Maven Central | ✅ COMPLETE |
| 13 | WordPress + Laravel | Plugin + shortcodes + Blade component | ✅ COMPLETE |
| 14 | Python / Django / Flask / FastAPI | pip package, DRF field, Flask macros, FastAPI router | ✅ COMPLETE |
| 15 | Ecosystem (CDN, CLI, Docs) | npx create-nepali-datepicker CLI, cdn.config.js, build-types | ✅ COMPLETE |

---

## Phase 1 — Completed (2026-06-27)

### What was built
- `package.json` — upgraded with `exports` map, `files`, `sideEffects`, `engines`, peer dep metadata
- `scripts/build.js` — produces UMD + ESM + CJS with license banner and version injection
- `dist/nepali-datepicker.d.ts` — complete TypeScript declarations (all options, all callbacks, all utility functions)
- `packages/` — monorepo scaffold created for all 14 downstream packages:
  - `packages/react/`         → Phase 2
  - `packages/vue/`           → Phase 4
  - `packages/angular/`       → Phase 5
  - `packages/svelte/`        → Phase 6
  - `packages/web-components/`→ Phase 7
  - `packages/node/`          → Phase 8
  - `packages/react-native/`  → Phase 9
  - `packages/flutter/`       → Phase 10
  - `packages/ios-swift/`     → Phase 11
  - `packages/android-kotlin/`→ Phase 12
  - `packages/wordpress/`     → Phase 13
  - `packages/laravel/`       → Phase 13
  - `packages/python/`        → Phase 14
  - `packages/cli/`           → Phase 15

---

## Phase 2 — React Package

### Goal
Publish `@nepali-datepicker-studio/react` as a proper npm package.

### Deliverables
- `NepaliDatePicker` component (wraps vanilla library, full options passthrough)
- `NepaliDateRangePicker` component (range mode pre-configured)
- `NepaliConverterWidget` component (BS↔AD converter widget)
- `useNepaliDatePicker(options)` hook — headless, returns `{ date, setDate, open, close, clear }`
- `useNepaliDateRange(options)` hook — returns `{ start, end, setRange, clear }`
- Full TypeScript declarations for all components and hooks
- `index.jsx` that exports everything named + default

### Files to create
- `packages/react/src/NepaliDatePicker.jsx`
- `packages/react/src/NepaliDateRangePicker.jsx`
- `packages/react/src/NepaliConverterWidget.jsx`
- `packages/react/src/hooks/useNepaliDatePicker.js`
- `packages/react/src/hooks/useNepaliDateRange.js`
- `packages/react/src/index.jsx`
- `packages/react/src/index.d.ts`
- `packages/react/README.md`

---

## Phase 3 — Next.js / SSR

### Deliverables
- `NepaliDatePickerSSR` — dynamic import wrapper, no `window` on server
- `pages/api/bs-to-ad.js` and `pages/api/ad-to-bs.js` example API routes
- App Router example: `app/form/page.tsx`
- Vercel `vercel.json` config

---

## Phase 4 — Vue 3 / Nuxt

### Deliverables
- `NepaliDatePicker.vue` — Composition API, `v-model` support, full options
- `NepaliDateRangePicker.vue` — v-model with start/end
- `NepaliDatePickerPlugin.js` — install() for `app.use()`
- Nuxt 3 plugin auto-import
- `packages/vue/src/index.js`
- `packages/vue/README.md`

---

## Phase 5 — Angular

### Deliverables
- `NepaliDatePickerDirective` — implements `ControlValueAccessor`, `[formControl]` compatible
- `NepaliDatePickerComponent` — standalone Angular 17 component
- `NepaliDatePickerModule` — NgModule for legacy Angular
- Full reactive forms and template-driven forms support
- `packages/angular/src/index.ts`
- `packages/angular/README.md`

---

## Phase 6 — Svelte / SvelteKit

### Deliverables
- `NepaliDatePicker.svelte` — Svelte 5 runes (`$state`, `$effect`), `bind:value`
- `NepaliDateRangePicker.svelte`
- `index.js` — named exports
- SvelteKit load function example for server-side date conversion
- `packages/svelte/README.md`

---

## Phase 7 — Web Components

### Deliverables
- `<nepali-datepicker>` custom element — Shadow DOM, observed attributes
- `<nepali-date-range>` custom element
- `<nepali-converter>` custom element
- Works in React, Vue, Angular, Svelte, plain HTML with zero framework deps
- CDN single-file build
- `packages/web-components/src/index.js`
- `packages/web-components/README.md`

---

## Phase 8 — Node.js / Express / Fastify

### Deliverables
- Pure Node.js BS↔AD conversion (no DOM, no window)
- `express-nepali-date` middleware — parses BS body fields, attaches `.adDate`
- Fastify plugin with schema validation
- Zod schema: `z.string().bsDate()` validator
- Jest test suite
- `packages/node/src/index.js`
- `packages/node/src/middleware/express.js`
- `packages/node/src/middleware/fastify.js`
- `packages/node/src/zod.js`
- `packages/node/README.md`

---

## Phase 9 — React Native

### Deliverables
- `NepaliDatePicker` RN component with WebView bridge
- Offline-bundled HTML (base64 or asset file)
- Bottom sheet modal (iOS-native feel)
- `onDateChange(date)` callback
- Full TypeScript support
- `packages/react-native/src/index.jsx`
- `packages/react-native/src/NepaliDatePickerModal.jsx`
- `packages/react-native/src/bridge.html` (bundled picker HTML)
- `packages/react-native/README.md`

---

## Phase 10 — Flutter

### Deliverables
- Pure Dart `BsCalendarEngine` — BS↔AD without any JS
- `NepaliDatePicker` widget — `showNepaliDatePicker()` API
- Material 3 and Cupertino themes
- `NepaliDateRangePicker` widget
- pub.dev `pubspec.yaml` ready
- `packages/flutter/lib/nepali_datepicker_studio.dart`
- `packages/flutter/lib/src/engine.dart` (pure Dart BS/AD)
- `packages/flutter/lib/src/picker_widget.dart`
- `packages/flutter/README.md`

---

## Phase 11 — iOS Swift

### Deliverables
- Swift Package Manager (SPM) library
- Pure Swift `BSCalendarEngine` struct
- `NepaliDatePickerView` (UIKit)
- `NepaliDatePicker` (SwiftUI View)
- `showNepaliDatePicker()` — sheet presenter
- Combine `datePublisher` for reactive binding
- iOS 15+ support, macOS 12+ support
- `packages/ios-swift/Sources/NepaliDatePicker/BSCalendarEngine.swift`
- `packages/ios-swift/Sources/NepaliDatePicker/NepaliDatePickerView.swift`
- `packages/ios-swift/Sources/NepaliDatePicker/NepaliDatePicker+SwiftUI.swift`
- `packages/ios-swift/README.md`

---

## Phase 12 — Android Kotlin

### Deliverables
- Gradle library module
- Pure Kotlin `BsCalendarEngine` object
- `NepaliDatePickerDialog` (XML View)
- `NepaliDatePicker` Composable (Jetpack Compose)
- `StateFlow<BsDate>` for reactive binding
- Maven Central publish config
- `packages/android-kotlin/src/main/kotlin/.../BsCalendarEngine.kt`
- `packages/android-kotlin/src/main/kotlin/.../NepaliDatePickerDialog.kt`
- `packages/android-kotlin/src/main/kotlin/.../NepaliDatePickerComposable.kt`
- `packages/android-kotlin/README.md`

---

## Phase 13 — WordPress + Laravel

### WordPress
- Plugin file: `nepali-datepicker-studio.php`
- Shortcode: `[nepali_datepicker id="booking_date" theme="ocean-blue"]`
- Gutenberg block (block.json + edit.js)
- WooCommerce checkout field override
- `packages/wordpress/src/`

### Laravel
- Composer package: `kushalkhadka/nepali-datepicker-studio`
- Blade component: `<x-nepali-datepicker name="date" :value="old('date')" />`
- Form macro: `Form::nepaliDate('date')`
- Validation rule: `'date' => ['required', 'bs_date']`
- `packages/laravel/src/`

---

## Phase 14 — Python / Django / Ruby

### Python pip package
- `BS2AD(date_str)` and `AD2BS(date_str)` pure Python functions
- Django template tag: `{% nepali_datepicker "booking_date" %}`
- Django REST Framework serializer field: `BsDateField`
- Flask Jinja2 macro
- FastAPI Pydantic validator

### Ruby gem
- `nepali_datepicker_studio` gem
- Rails helper: `nepali_datepicker_tag(:date)`
- ActiveRecord validator: `validates :date, bs_date: true`

---

## Phase 15 — Ecosystem

### Deliverables
- npm publish all packages under `@nepali-datepicker-studio/*`
- jsDelivr + unpkg CDN URLs
- `npx create-nepali-datepicker` CLI — scaffold by stack (react/vue/angular/etc)
- VS Code extension: hover tooltip showing BS↔AD for dates in source files
- CodeSandbox + StackBlitz live templates for each stack
- Full docs site upgrade with cross-platform tabs
- GitHub Actions CI for all packages

---

## Directory Structure (after all phases)

```
packages/
├── react/           @nepali-datepicker-studio/react
├── vue/             @nepali-datepicker-studio/vue
├── angular/         @nepali-datepicker-studio/angular
├── svelte/          @nepali-datepicker-studio/svelte
├── web-components/  @nepali-datepicker-studio/web-components
├── node/            @nepali-datepicker-studio/node
├── react-native/    @nepali-datepicker-studio/react-native
├── flutter/         nepali_datepicker_studio (pub.dev)
├── ios-swift/       NepaliDatePicker (SPM)
├── android-kotlin/  dev.kushalkhadka:nepali-datepicker-studio
├── wordpress/       WP plugin
├── laravel/         kushalkhadka/nepali-datepicker-studio
├── python/          nepali-datepicker-studio (PyPI)
└── cli/             create-nepali-datepicker (npx)
```
