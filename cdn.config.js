/**
 * CDN distribution configuration for Nepali DatePicker Studio
 *
 * This file documents the jsDelivr / unpkg CDN paths for each build artifact.
 * It is not executed — it serves as a reference for documentation and CI scripts.
 *
 * CDN base (jsDelivr):
 *   https://cdn.jsdelivr.net/npm/nepali-datepicker-studio@{version}/dist/
 *
 * CDN base (unpkg):
 *   https://unpkg.com/nepali-datepicker-studio@{version}/dist/
 */

module.exports = {
  version: '1.2.0',
  package: 'nepali-datepicker-studio',

  files: {
    // Full build (UMD — window.NepaliDatePicker global)
    umd:         'dist/nepali-datepicker.js',
    umdMin:      'dist/nepali-datepicker.min.js',

    // ES Module (tree-shakeable, import-based)
    esm:         'dist/nepali-datepicker.esm.js',
    esmMin:      'dist/nepali-datepicker.esm.min.js',

    // CommonJS (Node.js require())
    cjs:         'dist/nepali-datepicker.cjs.js',

    // Styles
    css:         'dist/nepali-datepicker.css',
    cssMin:      'dist/nepali-datepicker.min.css',

    // TypeScript declarations
    types:       'dist/nepali-datepicker.d.ts',
  },

  /**
   * jsDelivr CDN snippet for embedding in HTML (copy-paste ready):
   *
   * <!-- Latest stable via jsDelivr (recommended) -->
   * <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nepali-datepicker-studio@1.2.0/dist/nepali-datepicker.min.css">
   * <script src="https://cdn.jsdelivr.net/npm/nepali-datepicker-studio@1.2.0/dist/nepali-datepicker.min.js"></script>
   *
   * <!-- Pinned to latest minor (auto-updates patches) -->
   * <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nepali-datepicker-studio@~1.2/dist/nepali-datepicker.min.css">
   * <script src="https://cdn.jsdelivr.net/npm/nepali-datepicker-studio@~1.2/dist/nepali-datepicker.min.js"></script>
   *
   * Then:
   * <script>
   *   new NepaliDatePicker('#my-input', { theme: 'ocean-blue', lang: 'ne' });
   * </script>
   */

  /**
   * ES Module via CDN (no bundler needed, modern browsers):
   *
   * <script type="module">
   *   import { NepaliDatePicker } from 'https://cdn.jsdelivr.net/npm/nepali-datepicker-studio@1.2.0/dist/nepali-datepicker.esm.min.js';
   *   new NepaliDatePicker('#my-input', { theme: 'ocean-blue' });
   * </script>
   */

  integrityAlgorithm: 'sha384',  // for SRI hashes (computed at publish time)

  subresourceIntegrity: {
    // Populated by publish script after hashing the built files
    umdMin: null,
    cssMin: null,
  },
};
