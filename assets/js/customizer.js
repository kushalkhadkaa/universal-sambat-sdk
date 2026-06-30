// =========================================================================
// Customizer Dashboard JS Core
// Manages real-time CSS variables injector hooks, datepicker option changes,
// code generators, and reactive configuration presets state synchronization.
// =========================================================================
document.addEventListener('DOMContentLoaded', function() {
      // Theme switcher click listener
      const themeSwitcher = document.getElementById('theme-switcher-btn');
      if (themeSwitcher) {
        themeSwitcher.addEventListener('click', function() {
          document.documentElement.classList.toggle('light-theme');
          const currentTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
          localStorage.setItem('ndp-theme', currentTheme);
        });
      }

      let pickerInstance = null;

      // Select DOM Elements for Configuration Controller Mapping
      const themeSelect = document.getElementById('opt-theme');
      const colorPicker = document.getElementById('opt-color');
      const colorHexInput = document.getElementById('opt-color-hex');
      const langSelect = document.getElementById('opt-lang');
      const formatSelect = document.getElementById('opt-format');
      const modeSelect = document.getElementById('opt-mode');
      const unicodeSelect = document.getElementById('opt-unicode');
      const disabledDaysSelect = document.getElementById('opt-disabled-days');
      
      const inlineToggle = document.getElementById('opt-inline');
      const adDateToggle = document.getElementById('opt-ad-date');
      const holidaysToggle = { checked: false };
      const timeToggle = document.getElementById('opt-time');
      const presetsToggle = document.getElementById('opt-presets');
      const tithiToggle = document.getElementById('opt-tithi');
      const fyToggle = document.getElementById('opt-fy');
      const todayBtnToggle = document.getElementById('opt-today-btn');
      const clearBtnToggle = document.getElementById('opt-clear-btn');
      const futureOnlyToggle = document.getElementById('opt-future-only');
      const pastOnlyToggle = document.getElementById('opt-past-only');
      const disableHolidaysToggle = { checked: false };
      
      const previewAnchor = document.getElementById('preview-anchor');
      const codeSnippetOutput = document.getElementById('code-snippet-output');
      const btnCopyCode = document.getElementById('btn-copy-code');
      const dynamicThemeOverrides = document.getElementById('dynamic-theme-overrides');
      const devModeSelect = document.getElementById('opt-dev-mode');
      const presetSelect = document.getElementById('opt-preset');
      const snippetOutput = document.getElementById('snippet-output');
      const selectedBsOutput = document.getElementById('selected-bs-output');
      const selectedAdOutput = document.getElementById('selected-ad-output');
      const selectedFormattedOutput = document.getElementById('selected-formatted-output');
      const selectedModeOutput = document.getElementById('selected-mode-output');
      const selectedJsonOutput = document.getElementById('selected-json-output');
      let activeSnippet = 'full';
      let generatedSnippets = {};
      let applyingPreset = false;

      const presetConfigs = {
        basic: { mode: 'single', lang: 'ne', format: 'YYYY-MM-DD', inline: false, time: false, presets: false, futureOnly: false, pastOnly: false },
        range: { mode: 'range', lang: 'ne', format: 'YYYY-MM-DD', inline: false, time: false, presets: true, futureOnly: false, pastOnly: false },
        hotel: { mode: 'range', lang: 'en', format: 'YYYY-MM-DD', inline: false, time: true, presets: false, futureOnly: true, pastOnly: false },
        restaurant: { mode: 'single', lang: 'en', format: 'YYYY-MM-DD', inline: false, time: true, presets: false, futureOnly: true, pastOnly: false },
        flight: { mode: 'range', lang: 'en', format: 'YYYY-MM-DD', inline: false, time: true, presets: false, futureOnly: true, pastOnly: false },
        hospital: { mode: 'range', lang: 'en', format: 'YYYY-MM-DD', inline: false, time: true, presets: false, futureOnly: false, pastOnly: false },
        event: { mode: 'range', lang: 'en', format: 'YYYY-MM-DD', inline: false, time: true, presets: false, futureOnly: true, pastOnly: false },
        dob: { mode: 'single', lang: 'ne', format: 'YYYY-MM-DD', inline: false, time: false, presets: false, futureOnly: false, pastOnly: true },
        'future-booking': { mode: 'single', lang: 'ne', format: 'YYYY-MM-DD', inline: false, time: false, presets: false, futureOnly: true, pastOnly: false },
        'inline-dashboard': { mode: 'multiple', lang: 'ne', format: 'YYYY-MM-DD', inline: true, time: false, presets: false, futureOnly: false, pastOnly: false },
        converter: { mode: 'single', lang: 'ne', format: 'YYYY-MM-DD', inline: false, time: false, presets: false, futureOnly: false, pastOnly: false }
      };

      function htmlEscape(value) {
        return String(value).replace(/[&<>"']/g, function(ch) {
          return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
        });
      }

      function buildOptionsObject() {
        let disabledDaysOfWeek = [];
        if (disabledDaysSelect.value === 'saturday') disabledDaysOfWeek = [6];
        else if (disabledDaysSelect.value === 'sunday') disabledDaysOfWeek = [0];
        else if (disabledDaysSelect.value === 'both') disabledDaysOfWeek = [0, 6];

        return {
          theme: themeSelect.value,
          lang: langSelect.value,
          mode: modeSelect.value,
          format: formatSelect.value,
          inline: inlineToggle.checked,
          showAdDate: adDateToggle.checked,
          showTodayBtn: todayBtnToggle.checked,
          showClearBtn: clearBtnToggle.checked,
          unicodeDates: unicodeSelect.value === 'null' ? null : unicodeSelect.value === 'true',
          enableTime: timeToggle.checked,
          presets: presetsToggle.checked,
          showTithi: tithiToggle.checked,
          showFiscalYear: fyToggle.checked,
          futureOnly: futureOnlyToggle.checked,
          pastOnly: pastOnlyToggle.checked,
          disabledDaysOfWeek: disabledDaysOfWeek,
          exportAdInput: inlineToggle.checked ? null : '#nepali-date-ad'
        };
      }

      function optionsToCode(options, indent) {
        const pad = indent || '  ';
        const lines = [
          `${pad}theme: '${options.theme}',`,
          `${pad}lang: '${options.lang}',`,
          `${pad}mode: '${options.mode}',`,
          `${pad}format: '${options.format}',`,
          `${pad}inline: ${options.inline},`,
          `${pad}showAdDate: ${options.showAdDate},`
        ];
        if (options.unicodeDates !== null) lines.push(`${pad}unicodeDates: ${options.unicodeDates},`);
        if (options.enableTime) lines.push(`${pad}enableTime: true,`);
        if (options.presets) lines.push(`${pad}presets: true,`);
        if (options.showTithi) lines.push(`${pad}showTithi: true,`);
        if (options.showFiscalYear) lines.push(`${pad}showFiscalYear: true,`);
        if (options.futureOnly) lines.push(`${pad}futureOnly: true,`);
        if (options.pastOnly) lines.push(`${pad}pastOnly: true,`);
        if (options.disabledDaysOfWeek.length) lines.push(`${pad}disabledDaysOfWeek: [${options.disabledDaysOfWeek.join(', ')}],`);
        if (options.exportAdInput) lines.push(`${pad}exportAdInput: '${options.exportAdInput}',`);
        lines.push(`${pad}showTodayBtn: ${options.showTodayBtn},`);
        lines.push(`${pad}showClearBtn: ${options.showClearBtn},`);
        if (devModeSelect.value === 'advanced') {
          lines.push(`${pad}onOpen: function() { console.log('Nepali picker opened'); },`);
          lines.push(`${pad}onClose: function() { console.log('Nepali picker closed'); },`);
        }
        if (options.mode === 'range') {
          lines.push(`${pad}onRangeChange: function(range) {`);
          lines.push(`${pad}  console.log('Selected range:', range);`);
          lines.push(`${pad}}`);
        } else {
          lines.push(`${pad}onChange: function(date) {`);
          lines.push(`${pad}  console.log('Selected date:', date);`);
          lines.push(`${pad}}`);
        }
        return lines.join('\n');
      }

      function getTargetMarkup() {
        const inline = inlineToggle.checked;
        if (inline) return `<div id="nepali-date"></div>`;
        return `<input type="text" id="nepali-date" placeholder="Select Nepali date">\n<input type="hidden" id="nepali-date-ad" name="nepali_date_ad">`;
      }

      function updateSelectedOutput(payload) {
        selectedModeOutput.innerText = modeSelect.value;
        if (!payload) {
          selectedBsOutput.innerText = 'Select a date';
          selectedAdOutput.innerText = '-';
          selectedFormattedOutput.innerText = '-';
          selectedJsonOutput.innerText = '{\n  "message": "Select a date in the preview to inspect output."\n}';
          return;
        }

        let date = payload;
        if (payload.start || payload.end) date = payload.end || payload.start;
        const bs = date && date.year ? `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}` : '-';
        let ad = '-';
        try {
          if (date && date.year && window.NDPUtils) {
            const adObj = window.NDPUtils.bsToAd(date.year, date.month, date.day);
            ad = `${adObj.year}-${String(adObj.month).padStart(2, '0')}-${String(adObj.day).padStart(2, '0')}`;
          }
        } catch (e) {}
        const data = {
          mode: modeSelect.value,
          bs: bs,
          ad: ad,
          formatted: date && date.formatted ? date.formatted : bs,
          raw: payload
        };
        selectedBsOutput.innerText = bs;
        selectedAdOutput.innerText = ad;
        selectedFormattedOutput.innerText = data.formatted || '-';
        selectedJsonOutput.innerText = JSON.stringify(data, null, 2);
      }

      function setSnippet(type) {
        activeSnippet = type;
        document.querySelectorAll('[data-snippet-tab]').forEach(function(btn) {
          btn.classList.toggle('active', btn.getAttribute('data-snippet-tab') === type);
        });
        snippetOutput.innerText = generatedSnippets[type] || '';
      }

      function copyText(text, button) {
        navigator.clipboard.writeText(text || '').then(function() {
          const original = button.innerText;
          button.innerText = 'Copied!';
          button.style.background = 'var(--success)';
          setTimeout(function() {
            button.innerText = original;
            button.style.background = '';
          }, 1600);
        });
      }

      function generateIntegrationSnippets() {
        const options = buildOptionsObject();
        const target = options.inline ? '#nepali-date' : '#nepali-date';
        const html = getTargetMarkup();
        const js = `const picker = new NepaliDatePicker('${target}', {\n${optionsToCode(options)}\n});`;
        const full = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nepali DatePicker Example</title>
  <link rel="stylesheet" href="dist/nepali-datepicker.css">
</head>
<body>
  ${html.replace(/\n/g, '\n  ')}

  <script src="dist/nepali-datepicker.js"><\\/script>
  <script>
    ${js.replace(/\n/g, '\n    ')}
  <\\/script>
</body>
</html>`;
        const react = `import { useEffect, useRef } from 'react';
import './dist/nepali-datepicker.css';

export default function NepaliDateInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    const picker = new window.NepaliDatePicker(inputRef.current, {
${optionsToCode(options, '      ')}
    });
    return () => picker.destroy();
  }, []);

  return <input ref={inputRef} type="text" placeholder="Select Nepali date" />;
}`;
        const laravel = `<input type="text" id="nepali-date" name="nepali_date" value="{{ old('nepali_date') }}">
<input type="hidden" id="nepali-date-ad" name="nepali_date_ad" value="{{ old('nepali_date_ad') }}">

@push('scripts')
<script>
${js}
<\\/script>
@endpush`;
        const django = `<input type="text" id="nepali-date" name="nepali_date" value="{{ form.nepali_date.value|default:'' }}">
<input type="hidden" id="nepali-date-ad" name="nepali_date_ad">

<script>
${js}
<\\/script>`;
        const php = `<form method="post">
  ${html.replace(/\n/g, '\n  ')}
  <button type="submit">Save</button>
</form>

<script>
${js}
<\\/script>`;
        const wordpress = `function enqueue_nepali_datepicker_assets() {
  wp_enqueue_style('nepali-datepicker', get_template_directory_uri() . '/dist/nepali-datepicker.css');
  wp_enqueue_script('nepali-datepicker', get_template_directory_uri() . '/dist/nepali-datepicker.js', array(), '1.2.0', true);
}
add_action('wp_enqueue_scripts', 'enqueue_nepali_datepicker_assets');

// In your template:
${html}
<script>
${js}
<\\/script>`;
        const backend = `Backend recommendation:

1. Show BS date to users in #nepali-date.
2. Store AD date from #nepali-date-ad in your database.
3. Validate the submitted AD date on the server.
4. Keep the BS string if you need audit/display history.

Example submitted fields:
nepali_date=2083-03-12
nepali_date_ad=2026-06-26`;

        generatedSnippets = { full, html, js, react, laravel, django, php, wordpress, backend };
        setSnippet(activeSnippet);
      }

      function applyPreset() {
        const preset = presetConfigs[presetSelect.value] || presetConfigs.basic;
        applyingPreset = true;
        modeSelect.value = preset.mode;
        langSelect.value = preset.lang;
        formatSelect.value = preset.format;
        inlineToggle.checked = preset.inline;
        timeToggle.checked = preset.time;
        presetsToggle.checked = preset.presets;
        futureOnlyToggle.checked = preset.futureOnly;
        pastOnlyToggle.checked = preset.pastOnly;
        applyingPreset = false;
        reinitializePicker();
      }

      // Helper: converts Hex color to rgba string
      function hexToRgba(hex, alpha) {
        if (hex.length === 4) {
          hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        }
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }

      // 1. Color Override Sync and Apply
      function updateColorOverrides() {
        const primaryColor = colorPicker.value;
        colorHexInput.value = primaryColor.toUpperCase();
        
        const selectedTheme = themeSelect.value;
        const hoverColor = hexToRgba(primaryColor, 0.09);
        const todayColor = hexToRgba(primaryColor, 0.08);
        const rangeColor = hexToRgba(primaryColor, 0.12);

        // Inject overrides for the selected theme
        dynamicThemeOverrides.innerHTML = `
          .ndp-theme-${selectedTheme} {
            --ndp-primary: ${primaryColor} !important;
            --ndp-selected-bg: ${primaryColor} !important;
            --ndp-header-bg: ${primaryColor} !important;
            --ndp-hover-bg: ${hoverColor} !important;
            --ndp-today-bg: ${todayColor} !important;
            --ndp-range-bg: ${rangeColor} !important;
          }
          /* Apply general accent if header is overridden by gradients */
          .ndp-theme-${selectedTheme} .ndp-header {
            background: ${primaryColor} !important;
          }
          .ndp-theme-${selectedTheme} .ndp-selected,
          .ndp-theme-${selectedTheme} .ndp-range-start,
          .ndp-theme-${selectedTheme} .ndp-range-end {
            background-color: ${primaryColor} !important;
            color: #ffffff !important;
          }
        `;
      }

      // Synchronize text hex input with color picker
      colorPicker.addEventListener('input', function() {
        updateColorOverrides();
        generateCodeSnippet();
      });

      colorHexInput.addEventListener('change', function() {
        let val = colorHexInput.value.trim();
        if (!val.startsWith('#')) val = '#' + val;
        if (/^#[0-9A-F]{6}$/i.test(val) || /^#[0-9A-F]{3}$/i.test(val)) {
          colorPicker.value = val;
          updateColorOverrides();
          generateCodeSnippet();
        }
      });

      // 2. Initialize DatePicker Instance dynamically based on sidebar state
      function reinitializePicker() {
        // Sync states first (Mutual Exclusion)
        if (futureOnlyToggle.checked) {
          pastOnlyToggle.checked = false;
          pastOnlyToggle.disabled = true;
          pastOnlyToggle.closest('.toggle-row').classList.add('disabled-row');
        } else {
          pastOnlyToggle.disabled = false;
          pastOnlyToggle.closest('.toggle-row').classList.remove('disabled-row');
        }

        if (pastOnlyToggle.checked) {
          futureOnlyToggle.checked = false;
          futureOnlyToggle.disabled = true;
          futureOnlyToggle.closest('.toggle-row').classList.add('disabled-row');
        } else {
          futureOnlyToggle.disabled = false;
          futureOnlyToggle.closest('.toggle-row').classList.remove('disabled-row');
        }

        if (modeSelect.value !== 'range') {
          presetsToggle.checked = false;
          presetsToggle.disabled = true;
          presetsToggle.closest('.toggle-row').classList.add('disabled-row');
        } else {
          presetsToggle.disabled = false;
          presetsToggle.closest('.toggle-row').classList.remove('disabled-row');
        }

        // Destroy existing instance
        if (pickerInstance) {
          try {
            pickerInstance.destroy();
          } catch(e) { console.error('Error destroying instance', e); }
          pickerInstance = null;
        }

        // Clean out anchor element
        previewAnchor.innerHTML = '';
        updateSelectedOutput(null);

        const theme = themeSelect.value;
        const lang = langSelect.value;
        const format = formatSelect.value;
        const mode = modeSelect.value;
        const inline = inlineToggle.checked;
        const showAdDate = adDateToggle.checked;
        const showHolidays = holidaysToggle.checked;
        const showTodayBtn = todayBtnToggle.checked;
        const showClearBtn = clearBtnToggle.checked;

        // Custom features values
        const unicodeVal = unicodeSelect.value === 'null' ? null : (unicodeSelect.value === 'true');
        const enableTime = timeToggle.checked;
        const presets = presetsToggle.checked;
        const showTithi = tithiToggle.checked;
        const showFiscalYear = fyToggle.checked;
        const disabledDaysVal = disabledDaysSelect.value;
        const futureOnly = futureOnlyToggle.checked;
        const pastOnly = pastOnlyToggle.checked;
        const disableHolidays = disableHolidaysToggle.checked;

        let disabledDaysOfWeek = [];
        if (disabledDaysVal === 'saturday') disabledDaysOfWeek = [6];
        else if (disabledDaysVal === 'sunday') disabledDaysOfWeek = [0];
        else if (disabledDaysVal === 'both') disabledDaysOfWeek = [0, 6];

        // Build target element
        if (inline) {
          // Inline mode needs a direct target div
          const pickerDiv = document.createElement('div');
          pickerDiv.id = 'customizer-target-picker';
          previewAnchor.appendChild(pickerDiv);

          if (window.NepaliDatePicker) {
            pickerInstance = new NepaliDatePicker('#customizer-target-picker', {
              theme: theme,
              lang: lang,
              mode: mode,
              format: format,
              inline: true,
              showAdDate: showAdDate,
              showHolidays: showHolidays,
              showTodayBtn: showTodayBtn,
              showClearBtn: showClearBtn,
              unicodeDates: unicodeVal,
              enableTime: enableTime,
              presets: presets,
              showTithi: showTithi,
              showFiscalYear: showFiscalYear,
              futureOnly: futureOnly,
              pastOnly: pastOnly,
              disableHolidays: disableHolidays,
              disabledDaysOfWeek: disabledDaysOfWeek,
              onChange: function(date) {
                console.log('Inline Datepicker Change:', date);
                updateSelectedOutput(date);
              },
              onRangeChange: function(range) {
                console.log('Inline Range Change:', range);
                updateSelectedOutput(range);
              }
            });
          }
        } else {
          // Popup mode needs input wrapper
          const label = document.createElement('label');
          label.className = 'preview-input-label';
          label.innerText = (lang === 'ne') ? 'मिति छान्नुहोस्' : 'Select Date';
          
          const input = document.createElement('input');
          input.type = 'text';
          input.className = 'preview-input-box';
          input.id = 'customizer-target-input';
          input.placeholder = (lang === 'ne') ? 'क्लिक गर्नुहोस्...' : 'Click here...';

          previewAnchor.appendChild(label);
          previewAnchor.appendChild(input);

          if (window.NepaliDatePicker) {
            pickerInstance = new NepaliDatePicker('#customizer-target-input', {
              theme: theme,
              lang: lang,
              mode: mode,
              format: format,
              inline: false,
              showAdDate: showAdDate,
              showHolidays: showHolidays,
              showTodayBtn: showTodayBtn,
              showClearBtn: showClearBtn,
              unicodeDates: unicodeVal,
              enableTime: enableTime,
              presets: presets,
              showTithi: showTithi,
              showFiscalYear: showFiscalYear,
              futureOnly: futureOnly,
              pastOnly: pastOnly,
              disableHolidays: disableHolidays,
              disabledDaysOfWeek: disabledDaysOfWeek,
              onChange: function(date) {
                console.log('Popup Datepicker Change:', date);
                updateSelectedOutput(date);
              },
              onRangeChange: function(range) {
                console.log('Popup Range Change:', range);
                updateSelectedOutput(range);
              }
            });
          }
        }

        // Apply custom color overrides
        updateColorOverrides();
        
        // Generate snippet
        generateCodeSnippet();
        generateIntegrationSnippets();
      }

      // 3. Generate initialization JS snippet
      function generateCodeSnippet() {
        const theme = themeSelect.value;
        const lang = langSelect.value;
        const format = formatSelect.value;
        const mode = modeSelect.value;
        const inline = inlineToggle.checked;
        const showAdDate = adDateToggle.checked;
        const showHolidays = holidaysToggle.checked;
        const showTodayBtn = todayBtnToggle.checked;
        const showClearBtn = clearBtnToggle.checked;
        const customColor = colorPicker.value;

        const unicodeVal = unicodeSelect.value;
        const enableTime = timeToggle.checked;
        const presets = presetsToggle.checked;
        const showTithi = tithiToggle.checked;
        const showFiscalYear = fyToggle.checked;
        const disabledDaysVal = disabledDaysSelect.value;
        const futureOnly = futureOnlyToggle.checked;
        const pastOnly = pastOnlyToggle.checked;
        const disableHolidays = disableHolidaysToggle.checked;

        let code = '';
        
        if (customColor.toUpperCase() !== '#6366F1') {
          code += `/* Custom Dynamic Accent Color Override (Paste in CSS stylesheet) */\n`;
          code += `.ndp-theme-${theme} {\n`;
          code += `  --ndp-primary: ${customColor};\n`;
          code += `  --ndp-selected-bg: ${customColor};\n`;
          code += `  --ndp-header-bg: ${customColor};\n`;
          code += `  --ndp-hover-bg: ${hexToRgba(customColor, 0.09)};\n`;
          code += `  --ndp-today-bg: ${hexToRgba(customColor, 0.08)};\n`;
          code += `  --ndp-range-bg: ${hexToRgba(customColor, 0.12)};\n`;
          code += `}\n\n`;
        }

        code += `/* DatePicker Initialization code */\n`;
        if (inline) {
          code += `new NepaliDatePicker('#datepicker-container', {\n`;
        } else {
          code += `new NepaliDatePicker('#datepicker-input', {\n`;
        }
        code += `  theme: '${theme}',\n`;
        code += `  lang: '${lang}',\n`;
        code += `  mode: '${mode}',\n`;
        code += `  format: '${format}',\n`;
        code += `  inline: ${inline},\n`;
        code += `  showAdDate: ${showAdDate},\n`;
        if (unicodeVal !== 'null') {
          code += `  unicodeDates: ${unicodeVal},\n`;
        }
        if (enableTime) {
          code += `  enableTime: true,\n`;
        }
        if (presets) {
          code += `  presets: true,\n`;
        }
        if (showTithi) {
          code += `  showTithi: true,\n`;
        }
        if (showFiscalYear) {
          code += `  showFiscalYear: true,\n`;
        }
        if (futureOnly) {
          code += `  futureOnly: true,\n`;
        }
        if (pastOnly) {
          code += `  pastOnly: true,\n`;
        }
        if (disableHolidays) {
          code += `  disableHolidays: true,\n`;
        }
        if (disabledDaysVal !== 'none') {
          let daysArrStr = '[]';
          if (disabledDaysVal === 'saturday') daysArrStr = '[6]';
          else if (disabledDaysVal === 'sunday') daysArrStr = '[0]';
          else if (disabledDaysVal === 'both') daysArrStr = '[0, 6]';
          code += `  disabledDaysOfWeek: ${daysArrStr},\n`;
        }
        code += `  showTodayBtn: ${showTodayBtn},\n`;
        code += `  showClearBtn: ${showClearBtn},\n`;
        
        if (mode === 'range') {
          code += `  onRangeChange: function(start, end) {\n`;
          code += `    console.log('Selected range start:', start, 'end:', end);\n`;
          code += `  }\n`;
        } else {
          code += `  onChange: function(date) {\n`;
          code += `    console.log('Selected date object:', date);\n`;
          code += `  }\n`;
        }
        code += `});`;

        codeSnippetOutput.innerText = code;
        generateIntegrationSnippets();
      }

      // 4. Bind Control Listeners
      themeSelect.addEventListener('change', reinitializePicker);
      langSelect.addEventListener('change', reinitializePicker);
      formatSelect.addEventListener('change', reinitializePicker);
      modeSelect.addEventListener('change', reinitializePicker);
      unicodeSelect.addEventListener('change', reinitializePicker);
      disabledDaysSelect.addEventListener('change', reinitializePicker);
      inlineToggle.addEventListener('change', reinitializePicker);
      adDateToggle.addEventListener('change', reinitializePicker);
      timeToggle.addEventListener('change', reinitializePicker);
      presetsToggle.addEventListener('change', reinitializePicker);
      tithiToggle.addEventListener('change', reinitializePicker);
      fyToggle.addEventListener('change', reinitializePicker);
      todayBtnToggle.addEventListener('change', reinitializePicker);
      clearBtnToggle.addEventListener('change', reinitializePicker);
      futureOnlyToggle.addEventListener('change', reinitializePicker);
      pastOnlyToggle.addEventListener('change', reinitializePicker);
      devModeSelect.addEventListener('change', function() {
        generateCodeSnippet();
        generateIntegrationSnippets();
      });
      presetSelect.addEventListener('change', applyPreset);

      document.querySelectorAll('[data-snippet-tab]').forEach(function(btn) {
        btn.addEventListener('click', function() {
          setSnippet(btn.getAttribute('data-snippet-tab'));
        });
      });

      document.querySelectorAll('[data-copy-snippet]').forEach(function(btn) {
        btn.addEventListener('click', function() {
          const key = btn.getAttribute('data-copy-snippet');
          copyText(generatedSnippets[key], btn);
        });
      });

      document.querySelectorAll('[data-copy-target]').forEach(function(btn) {
        btn.addEventListener('click', function() {
          const target = document.getElementById(btn.getAttribute('data-copy-target'));
          copyText(target ? target.innerText : '', btn);
        });
      });

      document.querySelectorAll('[data-download-snippet]').forEach(function(btn) {
        btn.addEventListener('click', function() {
          const key = btn.getAttribute('data-download-snippet');
          const blob = new Blob([generatedSnippets[key] || ''], { type: 'text/html;charset=utf-8' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'nepali-datepicker-example.html';
          link.click();
          URL.revokeObjectURL(link.href);
        });
      });

      // 5. Setup Copy Snippet Button
      btnCopyCode.addEventListener('click', function() {
        const text = codeSnippetOutput.innerText;
        navigator.clipboard.writeText(text).then(() => {
          const originalText = btnCopyCode.innerText;
          btnCopyCode.innerText = 'Copied!';
          btnCopyCode.style.background = 'var(--success)';
          setTimeout(() => {
            btnCopyCode.innerText = originalText;
            btnCopyCode.style.background = 'var(--accent)';
          }, 2000);
        });
      });

      // 6. Trigger first load
      reinitializePicker();
    });