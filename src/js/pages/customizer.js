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

      // Select DOM Elements
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
              onChange: function(date) { console.log('Inline Datepicker Change:', date); },
              onRangeChange: function(start, end) { console.log('Inline Range Change:', start, end); }
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
              onChange: function(date) { console.log('Popup Datepicker Change:', date); },
              onRangeChange: function(start, end) { console.log('Popup Range Change:', start, end); }
            });
          }
        }

        // Apply custom color overrides
        updateColorOverrides();
        
        // Generate snippet
        generateCodeSnippet();
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