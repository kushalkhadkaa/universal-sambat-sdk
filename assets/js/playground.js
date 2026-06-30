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

      // Playground Code Generator Logic
      const playgroundDrawer = document.getElementById('playground-code-drawer');
      const playgroundName = document.getElementById('playground-feature-name');
      const playgroundSnippet = document.getElementById('playground-code-snippet');
      const btnCopyPlayground = document.getElementById('btn-copy-playground-code');

      function updatePlaygroundCode(featureTitle, htmlMarkup, configCode) {
        if (!playgroundDrawer) return;
        playgroundDrawer.classList.remove('hidden');
        playgroundName.innerText = featureTitle;
        
        const codeText = `<!-- 1. Include library CSS & JS -->\n` +
          `<link rel="stylesheet" href="dist/nepali-datepicker.css">\n` +
          `<script src="dist/nepali-datepicker.js"><\/script>\n\n` +
          `<!-- 2. Target Bootstrap Input HTML -->\n` +
          `${htmlMarkup}\n\n` +
          `<!-- 3. Initialize script -->\n` +
          `<script>\n` +
          `  new NepaliDatePicker('#nepali-date-input', ${configCode});\n` +
          `<\/script>`;
          
        playgroundSnippet.innerText = codeText;
      }

      if (btnCopyPlayground) {
        btnCopyPlayground.addEventListener('click', () => {
          const text = playgroundSnippet.innerText;
          navigator.clipboard.writeText(text).then(() => {
            const orig = btnCopyPlayground.innerText;
            btnCopyPlayground.innerText = 'Copied!';
            btnCopyPlayground.style.background = 'var(--success)';
            setTimeout(() => {
              btnCopyPlayground.innerText = orig;
              btnCopyPlayground.style.background = 'var(--accent)';
            }, 2000);
          });
        });
      }

      // 1. Dynamic Date Display in Hero Banner
      if (window.NDPUtils) {
        const todayBs = window.NDPUtils.getTodayBs();
        const formattedBs = window.NDPUtils.formatBsDate(todayBs.year, todayBs.month, todayBs.day, 'ne', 'long');
        const todayAd = new Date();
        const formattedAd = todayAd.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        document.getElementById('hero-today-date').innerText = formattedBs + ' (' + formattedAd + ')';
      }

      // 2. Hero Interactive Inline Picker
      if (window.NepaliDatePicker) {
        new NepaliDatePicker('#hero-inline-picker', {
          theme: 'glassmorphism',
          inline: true,
          showAdDate: true,
          showTithi: true
        });
      }

      // 3. Mode Demos Init
      // 3.1 Single Picker (Popup)
      const singleInput = document.getElementById('single-picker-input');
      const singleOutput = document.getElementById('single-picker-output');
      if (singleInput && window.NepaliDatePicker) {
        new NepaliDatePicker(singleInput, {
          theme: 'classic-light',
          lang: 'ne',
          showAdDate: true,
          onChange: function(date) {
            singleOutput.innerHTML = '<strong>Selected Date details:</strong><br>' + JSON.stringify(date, null, 2);
          }
        });
      }

      // 3.2 Date Range Picker (Standard)
      const rangeInput = document.getElementById('range-picker-input');
      const rangeOutput = document.getElementById('range-picker-output');
      if (rangeInput && window.NepaliDatePicker) {
        new NepaliDatePicker(rangeInput, {
          mode: 'range',
          theme: 'ocean-blue',
          lang: 'en',
          onRangeChange: function(start, end) {
            rangeOutput.innerHTML = '<strong>Selected Range:</strong><br>' + 
              (start ? 'Start: ' + JSON.stringify(start) : 'Start: null') + '<br>' +
              (end ? 'End: ' + JSON.stringify(end) : 'End: null');
          }
        });
      }

      // 3.3 Multiple Dates Selection Picker
      const multiInput = document.getElementById('multi-picker-input');
      const multiOutput = document.getElementById('multi-picker-output');
      if (multiInput && window.NepaliDatePicker) {
        new NepaliDatePicker(multiInput, {
          mode: 'multiple',
          theme: 'royal-purple',
          lang: 'en',
          onChange: function(dates) {
            multiOutput.innerHTML = '<strong>Selected Dates Array:</strong><br>' + JSON.stringify(dates, null, 2);
          }
        });
      }

      // 3.4 Static Inline Picker (Midnight)
      const inlineOutput = document.getElementById('inline-picker-output');
      if (window.NepaliDatePicker) {
        new NepaliDatePicker('#inline-picker-container', {
          inline: true,
          theme: 'midnight',
          lang: 'ne',
          onChange: function(date) {
            inlineOutput.innerText = 'Selected: ' + date.formatted;
          }
        });
      }

      //  20 Developer Features Demos 

      // Advanced Demo 1: Range Picker with Presets
      const rangePresetsInput = document.getElementById('range-presets-input');
      const rangePresetsOutput = document.getElementById('range-presets-output');
      if (rangePresetsInput && window.NepaliDatePicker) {
        new NepaliDatePicker(rangePresetsInput, {
          mode: 'range',
          theme: 'gradient-aurora',
          lang: 'ne',
          presets: true,
          showDuration: true,
          showFiscalYear: true,
          onRangeChange: function(start, end) {
            rangePresetsOutput.innerHTML = '<strong>Presets Range selected:</strong><br>' + 
              (start ? 'Start: ' + start.year + '-' + start.month + '-' + start.day : 'null') + '  ' +
              (end ? end.year + '-' + end.month + '-' + end.day : 'Select end date...');
            triggerDemo1Code();
          }
        });
        function triggerDemo1Code() {
          updatePlaygroundCode(
            "Range Presets & Duration Sidebar",
            `<div class="mb-3">\n  <label for="nepali-date-input" class="form-label">Select Date Range</label>\n  <input type="text" class="form-control" id="nepali-date-input" placeholder="Select Date Range">\n</div>`,
            `{\n    mode: 'range',\n    theme: 'gradient-aurora',\n    lang: 'ne',\n    presets: true,\n    showDuration: true,\n    showFiscalYear: true,\n    onRangeChange: function(start, end) {\n      console.log('Start:', start, 'End:', end);\n    }\n  }`
          );
        }
        rangePresetsInput.addEventListener('focus', triggerDemo1Code);
        rangePresetsInput.addEventListener('click', triggerDemo1Code);
      }

      // Advanced Demo 2: Date & Time Picker
      const timeInput = document.getElementById('time-picker-input');
      const timeOutput = document.getElementById('time-picker-output');
      if (timeInput && window.NepaliDatePicker) {
        new NepaliDatePicker(timeInput, {
          theme: 'sunset-orange',
          lang: 'en',
          enableTime: true,
          onChange: function(date) {
            timeOutput.innerHTML = '<strong>Date & Time details:</strong><br>' + JSON.stringify(date, null, 2);
            triggerDemo2Code();
          }
        });
        function triggerDemo2Code() {
          updatePlaygroundCode(
            "BS Date & Time Picker",
            `<div class="mb-3">\n  <label for="nepali-date-input" class="form-label">Select Date & Time</label>\n  <input type="text" class="form-control" id="nepali-date-input" placeholder="Select Date & Time">\n</div>`,
            `{\n    theme: 'sunset-orange',\n    lang: 'en',\n    enableTime: true,\n    onChange: function(date) {\n      console.log('Selected Date & Time details:', date);\n    }\n  }`
          );
        }
        timeInput.addEventListener('focus', triggerDemo2Code);
        timeInput.addEventListener('click', triggerDemo2Code);
      }

      // Advanced Demo 3: Forced Unicode digits
      const unicodeInput = document.getElementById('unicode-picker-input');
      let unicodePickerInstance = null;
      if (unicodeInput && window.NepaliDatePicker) {
        function initUnicodePicker(forceUnicode) {
          if (unicodePickerInstance) unicodePickerInstance.destroy();
          unicodePickerInstance = new NepaliDatePicker(unicodeInput, {
            theme: 'forest-green',
            lang: 'en',
            unicodeDates: forceUnicode,
          });
          triggerDemo3Code(forceUnicode);
        }
        function triggerDemo3Code(forceUnicode) {
          updatePlaygroundCode(
            "Forced Unicode / Devanagari Digits",
            `<div class="mb-3">\n  <label for="nepali-date-input" class="form-label">Unicode Date Input</label>\n  <input type="text" class="form-control" id="nepali-date-input" placeholder="Forced digits input">\n</div>`,
            `{\n    theme: 'forest-green',\n    lang: 'en',\n    unicodeDates: ${forceUnicode}\n  }`
          );
        }
        document.querySelectorAll('input[name="unicode-toggle"]').forEach(radio => {
          radio.addEventListener('change', (e) => {
            initUnicodePicker(e.target.value === 'true');
          });
        });
        unicodeInput.addEventListener('focus', () => {
          const isForced = document.querySelector('input[name="unicode-toggle"]:checked').value === 'true';
          triggerDemo3Code(isForced);
        });
        unicodeInput.addEventListener('click', () => {
          const isForced = document.querySelector('input[name="unicode-toggle"]:checked').value === 'true';
          triggerDemo3Code(isForced);
        });
        initUnicodePicker(true);
      }

      // Advanced Demo 4: Auto-Masking & bounds validation
      const maskInput = document.getElementById('mask-picker-input');
      const maskOutput = document.getElementById('mask-picker-output');
      if (maskInput && window.NepaliDatePicker) {
        new NepaliDatePicker(maskInput, {
          theme: 'neon-cyberpunk',
          lang: 'en',
          autoMask: true,
          autoValidate: true,
          minDate: { year: 2080, month: 1, day: 1 },
          maxDate: { year: 2085, month: 12, day: 30 },
          onChange: function(date) {
            maskOutput.innerHTML = '<strong>Typed Valid Date:</strong> ' + date.formatted;
            triggerDemo4Code();
          }
        });
        function triggerDemo4Code() {
          updatePlaygroundCode(
            "Input Auto-Masking & Bounds Validation",
            `<div class="mb-3">\n  <label for="nepali-date-input" class="form-label">Type Date (YYYYMMDD)</label>\n  <input type="text" class="form-control" id="nepali-date-input" placeholder="Type date (e.g. 20830315)">\n</div>`,
            `{\n    theme: 'neon-cyberpunk',\n    lang: 'en',\n    autoMask: true,\n    autoValidate: true,\n    minDate: { year: 2080, month: 1, day: 1 },\n    maxDate: { year: 2085, month: 12, day: 30 }\n  }`
          );
        }
        maskInput.addEventListener('focus', triggerDemo4Code);
        maskInput.addEventListener('click', triggerDemo4Code);
      }

      // Advanced Demo 5: Hidden input AD synchronizer exporter
      const exportInput = document.getElementById('export-picker-input');
      const exportTarget = document.getElementById('export-target-ad');
      if (exportInput && window.NepaliDatePicker) {
        new NepaliDatePicker(exportInput, {
          theme: 'corporate-blue',
          lang: 'ne',
          exportAdInput: '#export-target-ad',
          onChange: function() {
            triggerDemo5Code();
          }
        });
        function triggerDemo5Code() {
          updatePlaygroundCode(
            "Hidden AD Input Synchronizer",
            `<div class="mb-3">\n  <label for="nepali-date-input" class="form-label">Select Nepali Date</label>\n  <input type="text" class="form-control" id="nepali-date-input" placeholder="Select Nepali Date">\n</div>\n<input type="hidden" id="export-target-ad" name="ad_date">`,
            `{\n    theme: 'corporate-blue',\n    lang: 'ne',\n    exportAdInput: '#export-target-ad'\n  }`
          );
        }
        exportInput.addEventListener('focus', triggerDemo5Code);
        exportInput.addEventListener('click', triggerDemo5Code);
      }

      // Advanced Demo 6: Custom Day Cell Renderer
      if (window.NepaliDatePicker) {
        new NepaliDatePicker('#custom-renderer-calendar-container', {
          inline: true,
          theme: 'retro-paper',
          lang: 'ne',
          renderDay: function(day, cell) {
            if (day.day % 10 === 5) {
              cell.style.backgroundColor = 'rgba(99, 102, 241, 0.12)';
              cell.style.borderColor = 'rgba(99, 102, 241, 0.4)';
              const icon = document.createElement('span');
              icon.innerText = ' ';
              icon.style.fontSize = '8px';
              cell.appendChild(icon);
            }
          }
        });
        const customRendererContainer = document.getElementById('custom-renderer-calendar-container');
        function triggerDemo6Code() {
          updatePlaygroundCode(
            "Custom Day Renderer Calendar",
            `<div id="inline-datepicker-container"></div>`,
            `{\n    inline: true,\n    theme: 'retro-paper',\n    lang: 'ne',\n    renderDay: function(day, cell) {\n      if (day.day % 10 === 5) {\n        cell.style.backgroundColor = 'rgba(99, 102, 241, 0.12)';\n        cell.style.borderColor = 'rgba(99, 102, 241, 0.4)';\n        const icon = document.createElement('span');\n        icon.innerText = ' ';\n        cell.appendChild(icon);\n      }\n    }\n  }`
          );
        }
        if (customRendererContainer) {
          customRendererContainer.addEventListener('click', triggerDemo6Code);
        }
      }

      // Advanced Demo 7: Range Date & Time Picker
      const rangeDateTimeInput = document.getElementById('range-datetime-input');
      const rangeDateTimeOutput = document.getElementById('range-datetime-output');
      if (rangeDateTimeInput && window.NepaliDatePicker) {
        new NepaliDatePicker(rangeDateTimeInput, {
          mode: 'range',
          theme: 'royal-purple',
          lang: 'ne',
          enableTime: true,
          presets: true,
          showDuration: true,
          onRangeChange: function(start, end) {
            if (start && end) {
              const startStr = `${start.year}-${start.month}-${start.day}`;
              const endStr = `${end.year}-${end.month}-${end.day}`;
              rangeDateTimeOutput.innerHTML = `<strong>Selected Range:</strong><br>Start: ${startStr} | End: ${endStr}`;
            } else if (start) {
              const startStr = `${start.year}-${start.month}-${start.day}`;
              rangeDateTimeOutput.innerHTML = `<strong>Selected Range:</strong><br>Start: ${startStr} | End: Selecting...`;
            } else {
              rangeDateTimeOutput.innerHTML = `Range: null`;
            }
            triggerDemo7Code();
          }
        });
        function triggerDemo7Code() {
          updatePlaygroundCode(
            "Bidirectional Range Date-Time Picker",
            `<div class="mb-3">\n  <label for="nepali-date-input" class="form-label">Select Start & End Date-Time</label>\n  <input type="text" class="form-control" id="nepali-date-input" placeholder="Select Start & End Date-Time">\n</div>`,
            `{\n    mode: 'range',\n    theme: 'royal-purple',\n    lang: 'ne',\n    enableTime: true,\n    presets: true,\n    showDuration: true,\n    onRangeChange: function(start, end) {\n      console.log('Range Date-Time Selected:', start, end);\n    }\n  }`
          );
        }
        rangeDateTimeInput.addEventListener('focus', triggerDemo7Code);
        rangeDateTimeInput.addEventListener('click', triggerDemo7Code);
      }

      // Advanced Demo 8: Future Only / Past Only Selection
      const futurePastInput = document.getElementById('future-past-input');
      let futurePastInstance = null;
      if (futurePastInput && window.NepaliDatePicker) {
        function initFuturePastPicker(modeVal) {
          if (futurePastInstance) futurePastInstance.destroy();
          futurePastInstance = new NepaliDatePicker(futurePastInput, {
            theme: 'sunset-orange',
            lang: 'en',
            futureOnly: modeVal === 'future',
            pastOnly: modeVal === 'past'
          });
          triggerDemo8Code(modeVal);
        }
        function triggerDemo8Code(modeVal) {
          updatePlaygroundCode(
            "Future-Only / Past-Only Selection Limits",
            `<div class="mb-3">\n  <label for="nepali-date-input" class="form-label">Select Date (Constrained)</label>\n  <input type="text" class="form-control" id="nepali-date-input" placeholder="Select constrained date">\n</div>`,
            `{\n    theme: 'sunset-orange',\n    lang: 'en',\n    futureOnly: ${modeVal === 'future'},\n    pastOnly: ${modeVal === 'past'}\n  }`
          );
        }
        document.querySelectorAll('input[name="future-past-toggle"]').forEach(radio => {
          radio.addEventListener('change', (e) => {
            initFuturePastPicker(e.target.value);
          });
        });
        futurePastInput.addEventListener('focus', () => {
          const modeVal = document.querySelector('input[name="future-past-toggle"]:checked').value;
          triggerDemo8Code(modeVal);
        });
        futurePastInput.addEventListener('click', () => {
          const modeVal = document.querySelector('input[name="future-past-toggle"]:checked').value;
          triggerDemo8Code(modeVal);
        });
        initFuturePastPicker('future');
      }

      // Advanced Demo 9: Weekend / Weekday Disabler
      const weekdayDisablerInput = document.getElementById('weekday-disabler-input');
      const disableSatCb = document.getElementById('disable-saturday');
      const disableSunCb = document.getElementById('disable-sunday');
      let weekdayDisablerInstance = null;
      if (weekdayDisablerInput && window.NepaliDatePicker) {
        function initWeekdayDisablerPicker() {
          if (weekdayDisablerInstance) weekdayDisablerInstance.destroy();
          const disabledDays = [];
          if (disableSunCb && disableSunCb.checked) disabledDays.push(0);
          if (disableSatCb && disableSatCb.checked) disabledDays.push(6);
          weekdayDisablerInstance = new NepaliDatePicker(weekdayDisablerInput, {
            theme: 'forest-green',
            lang: 'ne',
            disabledDaysOfWeek: disabledDays
          });
          triggerDemo9Code(disabledDays);
        }
        function triggerDemo9Code(disabledDays) {
          updatePlaygroundCode(
            "Weekend & Custom Weekdays Disabler",
            `<div class="mb-3">\n  <label for="nepali-date-input" class="form-label">Select Date (Weekdays Only)</label>\n  <input type="text" class="form-control" id="nepali-date-input" placeholder="Saturdays / Sundays blocked">\n</div>`,
            `{\n    theme: 'forest-green',\n    lang: 'ne',\n    disabledDaysOfWeek: [${disabledDays.join(', ')}]\n  }`
          );
        }
        if (disableSatCb) disableSatCb.addEventListener('change', initWeekdayDisablerPicker);
        if (disableSunCb) disableSunCb.addEventListener('change', initWeekdayDisablerPicker);
        weekdayDisablerInput.addEventListener('focus', () => {
          const disabledDays = [];
          if (disableSunCb && disableSunCb.checked) disabledDays.push(0);
          if (disableSatCb && disableSatCb.checked) disabledDays.push(6);
          triggerDemo9Code(disabledDays);
        });
        weekdayDisablerInput.addEventListener('click', () => {
          const disabledDays = [];
          if (disableSunCb && disableSunCb.checked) disabledDays.push(0);
          if (disableSatCb && disableSatCb.checked) disabledDays.push(6);
          triggerDemo9Code(disabledDays);
        });
        initWeekdayDisablerPicker();
      }

      // Advanced Demo 10: Large Inline Multiple Date Selector
      const largeInlineOutput = document.getElementById('large-inline-output');
      if (window.NepaliDatePicker) {
        new NepaliDatePicker('#large-inline-container', {
          mode: 'multiple',
          theme: 'gradient-aurora',
          lang: 'ne',
          inline: true,
          showAdDate: true,
          onChange: function(dates) {
            if (dates && dates.length > 0) {
              const formatted = dates.map(d => `${d.year}-${d.month}-${d.day}`).join(', ');
              largeInlineOutput.innerHTML = `<strong>Selected Dates (${dates.length}):</strong><br>${formatted}`;
            } else {
              largeInlineOutput.innerHTML = 'Selected Dates: None';
            }
            triggerDemo10Code();
          }
        });
        const largeInlineContainer = document.getElementById('large-inline-container');
        function triggerDemo10Code() {
          updatePlaygroundCode(
            "Large Inline Multiple Date Selector",
            `<div id="inline-datepicker-container" class="ndp-large-inline"></div>`,
            `{\n    inline: true,\n    mode: 'multiple',\n    theme: 'gradient-aurora',\n    lang: 'ne',\n    showAdDate: true,\n    onChange: function(dates) {\n      console.log('Selected dates:', dates);\n    }\n  }`
          );
        }
        if (largeInlineContainer) {
          largeInlineContainer.addEventListener('click', triggerDemo10Code);
        }
      }

      // Advanced Demo 11: Booking & Availability Picker
      const bookingInput = document.getElementById('booking-picker-input');
      const bookingCard = document.getElementById('booking-details-card');
      const slotsContainer = document.getElementById('booking-slots-container');
      const bookedDateLbl = document.getElementById('booked-date-lbl');
      const slotsGrid = document.getElementById('booking-slots-grid');
      const btnGcal = document.getElementById('btn-gcal-export');
      const btnIcs = document.getElementById('btn-ics-export');

      // Mock Booking Database
      const bookingDb = {
        "2083-03-01": { status: "full", slots: 0, times: [] },
        "2083-03-04": { status: "full", slots: 0, times: [] },
        "2083-03-05": { status: "limited", slots: 1, times: ["10:30 AM"] },
        "2083-03-10": { status: "available", slots: 5, times: ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "04:30 PM"] },
        "2083-03-12": { status: "limited", slots: 2, times: ["11:30 AM", "02:00 PM"] },
        "2083-03-15": { status: "full", slots: 0, times: [] },
        "2083-03-16": { status: "available", slots: 4, times: ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"] },
        "2083-03-18": { status: "limited", slots: 1, times: ["03:30 PM"] },
        "2083-03-20": { status: "full", slots: 0, times: [] },
        "2083-03-22": { status: "available", slots: 6, times: ["09:30 AM", "11:00 AM", "01:30 PM", "03:00 PM", "04:00 PM", "05:00 PM"] },
        "2083-03-25": { status: "available", slots: 3, times: ["10:00 AM", "01:00 PM", "03:00 PM"] }
      };

      let selectedBookingDate = null;
      let selectedBookingTime = null;

      if (bookingInput && window.NepaliDatePicker) {
        new NepaliDatePicker(bookingInput, {
          theme: 'classic-light',
          lang: 'ne',
          minDate: { year: 2083, month: 3, day: 1 },
          maxDate: { year: 2083, month: 3, day: 32 },
          showAdDate: true,
          renderDay: function(dayObj, cell) {
            const dateStr = `${dayObj.year}-${String(dayObj.month).padStart(2, '0')}-${String(dayObj.day).padStart(2, '0')}`;
            const booking = bookingDb[dateStr];
            if (booking) {
              if (booking.status === 'full') {
                cell.classList.add('ndp-booked-full');
                cell.classList.add('ndp-disabled');
                cell.setAttribute('aria-disabled', 'true');
              } else if (booking.status === 'limited') {
                cell.classList.add('ndp-booked-limited');
                cell.setAttribute('data-tooltip', `${booking.slots} slot(s) left`);
              } else if (booking.status === 'available') {
                cell.classList.add('ndp-booked-available');
                cell.setAttribute('data-tooltip', 'Available');
              }
            } else {
              cell.classList.add('ndp-booked-available');
              cell.setAttribute('data-tooltip', 'Available');
            }
          },
          onChange: function(date) {
            if (!date) {
              slotsContainer.classList.add('ndp-hidden');
              bookingCard.querySelector('h4').textContent = 'Select a date to view available booking slots.';
              selectedBookingDate = null;
              selectedBookingTime = null;
              return;
            }
            selectedBookingDate = date;
            const dateStr = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
            
            let booking = bookingDb[dateStr];
            if (!booking) {
              booking = { status: "available", slots: 4, times: ["10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM"] };
            }

            bookingCard.querySelector('h4').textContent = ' Date Selected';
            bookedDateLbl.textContent = `${date.year}-${date.month}-${date.day}`;
            slotsGrid.innerHTML = '';
            
            if (booking.times.length === 0) {
              slotsGrid.innerHTML = '<span style="color: #ef4444; font-size: 0.85rem;">No available slots. Fully Booked!</span>';
              slotsContainer.classList.remove('ndp-hidden');
              return;
            }

            booking.times.forEach(t => {
              const btn = document.createElement('button');
              btn.type = 'button';
              btn.className = 'ndp-preset-btn';
              btn.style.textAlign = 'center';
              btn.textContent = t;
              btn.addEventListener('click', () => {
                slotsGrid.querySelectorAll('button').forEach(b => b.style.background = '');
                btn.style.background = 'rgba(99, 102, 241, 0.12)';
                selectedBookingTime = t;
              });
              slotsGrid.appendChild(btn);
            });

            slotsContainer.classList.remove('ndp-hidden');
            triggerDemo11Code();
          }
        });

        function triggerDemo11Code() {
          updatePlaygroundCode(
            "Premium Booking & Availability Calendar",
            `<div class="mb-3">\n  <label for="nepali-date-input" class="form-label">Select Appointment Date</label>\n  <input type="text" class="form-control" id="nepali-date-input" placeholder="Click to choose a date...">\n</div>`,
            `{\n    theme: 'classic-light',\n    lang: 'ne',\n    minDate: { year: 2083, month: 3, day: 1 },\n    maxDate: { year: 2083, month: 3, day: 32 },\n    showAdDate: true,\n    renderDay: function(dayObj, cell) {\n      const dateStr = dayObj.year + '-' + String(dayObj.month).padStart(2, '0') + '-' + String(dayObj.day).padStart(2, '0');\n      const booking = bookingDb[dateStr]; // Query custom DB\n      if (booking) {\n        if (booking.status === 'full') {\n          cell.classList.add('ndp-booked-full', 'ndp-disabled');\n          cell.setAttribute('aria-disabled', 'true');\n        } else if (booking.status === 'limited') {\n          cell.classList.add('ndp-booked-limited');\n        } else if (booking.status === 'available') {\n          cell.classList.add('ndp-booked-available');\n        }\n      }\n    }\n  }`
          );
        }
        bookingInput.addEventListener('focus', triggerDemo11Code);
        bookingInput.addEventListener('click', triggerDemo11Code);

        // Google Calendar Exporter
        btnGcal.addEventListener('click', () => {
          if (!selectedBookingDate || !selectedBookingTime) {
            alert('Please select a date and an available time slot first.');
            return;
          }
          const bsStr = `${selectedBookingDate.year}-${selectedBookingDate.month}-${selectedBookingDate.day}`;
          const adInfo = window.NDPUtils.bsToAd(selectedBookingDate.year, selectedBookingDate.month, selectedBookingDate.day);
          
          const timeParts = selectedBookingTime.split(' ');
          const hm = timeParts[0].split(':');
          let hour = parseInt(hm[0]);
          const minute = hm[1];
          if (timeParts[1] === 'PM' && hour < 12) hour += 12;
          if (timeParts[1] === 'AM' && hour === 12) hour = 0;

          const startDt = new Date(adInfo.date);
          startDt.setHours(hour, parseInt(minute), 0);
          const endDt = new Date(startDt);
          endDt.setHours(startDt.getHours() + 1);

          const formatUtc = (dt) => dt.toISOString().replace(/-|:|\.\d\d\d/g, "");

          const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Appointment+Booking&dates=${formatUtc(startDt)}/${formatUtc(endDt)}&details=Nepali+BS+Date:+${bsStr}+at+${selectedBookingTime}`;
          window.open(url, '_blank');
        });

        // ICS Exporter
        btnIcs.addEventListener('click', () => {
          if (!selectedBookingDate || !selectedBookingTime) {
            alert('Please select a date and an available time slot first.');
            return;
          }
          const bsStr = `${selectedBookingDate.year}-${selectedBookingDate.month}-${selectedBookingDate.day}`;
          const adInfo = window.NDPUtils.bsToAd(selectedBookingDate.year, selectedBookingDate.month, selectedBookingDate.day);
          
          const timeParts = selectedBookingTime.split(' ');
          const hm = timeParts[0].split(':');
          let hour = parseInt(hm[0]);
          const minute = hm[1];
          if (timeParts[1] === 'PM' && hour < 12) hour += 12;
          if (timeParts[1] === 'AM' && hour === 12) hour = 0;

          const startDt = new Date(adInfo.date);
          startDt.setHours(hour, parseInt(minute), 0);
          const endDt = new Date(startDt);
          endDt.setHours(startDt.getHours() + 1);

          const formatUtc = (dt) => dt.toISOString().replace(/-|:|\.\d\d\d/g, "");

          const icsContent = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "BEGIN:VEVENT",
            `DTSTART:${formatUtc(startDt)}`,
            `DTEND:${formatUtc(endDt)}`,
            "SUMMARY:Appointment Booking",
            `DESCRIPTION:Nepali Date: ${bsStr} at ${selectedBookingTime}`,
            "END:VEVENT",
            "END:VCALENDAR"
          ].join("\r\n");

          const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `booking-${bsStr}.ics`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      }

      // 4. Standalone Converter Widget Init
      if (window.NepaliConverterWidget) {
        new NepaliConverterWidget('#converter-widget-container', {
          theme: 'festive-dashain',
          lang: 'ne',
          defaultMode: 'bs-to-ad',
          showDaysDiff: true,
          onConvert: function(result) {
            console.log('Conversion result:', result);
          }
        });
      }

      // 5. Theme Gallery Card Auto-Initializers & Code Drawer
      const themeCodeDrawer = document.getElementById('theme-code-drawer');
      const themeCodeName = document.getElementById('theme-code-name');
      const themeCodeSnippet = document.getElementById('theme-code-snippet');
      const btnCopyThemeCode = document.getElementById('btn-copy-theme-code');

      document.querySelectorAll('.theme-card').forEach(card => {
        const themeName = card.getAttribute('data-theme');
        const inputField = card.querySelector('.theme-demo-input');
        
        // Init picker for this card
        if (inputField && window.NepaliDatePicker) {
          new NepaliDatePicker(inputField, {
            theme: themeName,
            lang: (themeName === 'high-contrast' || themeName === 'minimal-mono') ? 'en' : 'ne',
            showAdDate: true,
            closeOnSelect: true
          });
        }

        // Click card to open code generator drawer
        card.addEventListener('click', (e) => {
          if (e.target.tagName === 'INPUT') return;
          
          document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active-theme'));
          card.classList.add('active-theme');
          
          themeCodeDrawer.classList.remove('hidden');
          themeCodeName.innerText = themeName;
          
          const codeText = `<!-- 1. Include theme styles -->\n` +
            `<link rel="stylesheet" href="dist/nepali-datepicker.css">\n\n` +
            `<!-- 2. Target input field -->\n` +
            `<input type="text" id="datepicker-${themeName}">\n\n` +
            `<!-- 3. Initialize script -->\n` +
            `<script src="dist/nepali-datepicker.js"><\/script>\n` +
            `<script>\n` +
            `  new NepaliDatePicker('#datepicker-${themeName}', {\n` +
            `    theme: '${themeName}',\n` +
            `    lang: '${(themeName === 'high-contrast' || themeName === 'minimal-mono') ? 'en' : 'ne'}',\n` +
            `    showAdDate: true,\n` +
            `    showTithi: true,\n` +
            `    onChange: function(date) {\n` +
            `      console.log('Selected date:', date);\n` +
            `    }\n` +
            `  });\n` +
            `<\/script>`;
            
          themeCodeSnippet.innerText = codeText;
          themeCodeDrawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      });

      // Copy theme configuration code helper
      if (btnCopyThemeCode) {
        btnCopyThemeCode.addEventListener('click', () => {
          const text = themeCodeSnippet.innerText;
          navigator.clipboard.writeText(text).then(() => {
            const orig = btnCopyThemeCode.innerText;
            btnCopyThemeCode.innerText = 'Copied!';
            btnCopyThemeCode.style.background = 'var(--success)';
            setTimeout(() => {
              btnCopyThemeCode.innerText = orig;
              btnCopyThemeCode.style.background = 'var(--accent)';
            }, 2000);
          });
        });
      }

      // =========================================================================
      // Strict API Demonstration Presets Initialization
      // =========================================================================
      if (window.NepaliDatePicker) {
        // 1. Date Formats (8 Formats)
        new NepaliDatePicker('#fmt-ymd-picker', { theme: 'classic-light', lang: 'en', dateFormat: 'YYYY-MM-DD' });
        new NepaliDatePicker('#fmt-ysmsd-picker', { theme: 'classic-light', lang: 'en', dateFormat: 'YYYY/MM/DD' });
        new NepaliDatePicker('#fmt-ydmd-picker', { theme: 'classic-light', lang: 'en', dateFormat: 'YYYY.MM.DD' });
        new NepaliDatePicker('#fmt-dmy-picker', { theme: 'classic-light', lang: 'en', dateFormat: 'DD-MM-YYYY' });
        new NepaliDatePicker('#fmt-dsmsy-picker', { theme: 'classic-light', lang: 'en', dateFormat: 'DD/MM/YYYY' });
        new NepaliDatePicker('#fmt-ddmdy-picker', { theme: 'classic-light', lang: 'en', dateFormat: 'DD.MM.YYYY' });
        new NepaliDatePicker('#fmt-mdy-picker', { theme: 'classic-light', lang: 'en', dateFormat: 'MM-DD-YYYY' });
        new NepaliDatePicker('#fmt-msdsy-picker', { theme: 'classic-light', lang: 'en', dateFormat: 'MM/DD/YYYY' });
        new NepaliDatePicker('#fmt-ad-long-picker', { theme: 'classic-light', lang: 'en', dateFormat: 'DD MMMM YYYY' });

        // 2. Min Max Boundaries select limits
        new NepaliDatePicker('#min-date-strict-picker', { theme: 'classic-light', lang: 'en', minDate: { year: 2083, month: 3, day: 3 } });
        new NepaliDatePicker('#max-date-strict-picker', { theme: 'classic-light', lang: 'en', maxDate: { year: 2083, month: 3, day: 13 } });
        new NepaliDatePicker('#min-max-strict-picker', {
          theme: 'classic-light',
          lang: 'en',
          minDate: { year: 2083, month: 3, day: 3 },
          maxDate: { year: 2083, month: 3, day: 13 }
        });

        // 3. Dynamic Selection Callbacks & Animations
        new NepaliDatePicker('#callback-strict-picker', {
          theme: 'classic-light',
          lang: 'en',
          onChange: function(date) {
            alert('Selected date details: ' + JSON.stringify(date));
          }
        });
        new NepaliDatePicker('#anim-slide-strict-picker', { theme: 'classic-light', lang: 'en', animation: 'slide' });
        new NepaliDatePicker('#anim-fade-strict-picker', { theme: 'classic-light', lang: 'en', animation: 'fade' });

        // 4. Advanced Selection Disablers
        new NepaliDatePicker('#disable-today-strict-picker', { theme: 'classic-light', lang: 'en', disableToday: true });
        new NepaliDatePicker('#disable-date-strict-picker', { theme: 'classic-light', lang: 'en', disableDates: ['2083-3-9'] });
        new NepaliDatePicker('#disable-array-strict-picker', { theme: 'classic-light', lang: 'en', disableDates: ['2083-3-1', '2083-3-15', '2083-3-28'] });
        new NepaliDatePicker('#disable-before-strict-picker', { theme: 'classic-light', lang: 'en', disableDaysBefore: 5 });
        new NepaliDatePicker('#disable-after-strict-picker', { theme: 'classic-light', lang: 'en', disableDaysAfter: 5 });
        new NepaliDatePicker('#disable-both-strict-picker', { theme: 'classic-light', lang: 'en', disableDaysBefore: 5, disableDaysAfter: 5 });
      }

      // =========================================================================
      // Dynamic Booking & Reservation Template Initialization (Styles 1-7)
      // Mappings and config specs for Hotel, Hospital, Flight, Event, and Restaurant
      // =========================================================================
      const serviceConfigs = {
        hotel: {
          titleStart: "🏨 Check-in Details",
          lblStart: "Check in date & time*",
          titleEnd: "🏨 Checkout Details",
          lblEnd: "Checkout date & time*",
          alertMsg: "Checkout date & time cannot be prior to Check-in date & time."
        },
        hospital: {
          titleStart: "🏥 Admission Details",
          lblStart: "Admission date & time*",
          titleEnd: "🏥 Discharge Details",
          lblEnd: "Discharge date & time*",
          alertMsg: "Discharge date & time cannot be prior to Admission date & time."
        },
        flight: {
          titleStart: "✈️ Departure Details",
          lblStart: "Departure date & time*",
          titleEnd: "✈️ Return Details",
          lblEnd: "Return date & time*",
          alertMsg: "Return date & time cannot be prior to Departure date & time."
        },
        event: {
          titleStart: "🎟 Event Starts",
          lblStart: "Event start date & time*",
          titleEnd: "🎟 Event Ends",
          lblEnd: "Event end date & time*",
          alertMsg: "Event end date & time cannot be prior to Event start date & time."
        },
        restaurant: {
          titleStart: "🍽 Reservation Details",
          lblStart: "Reservation date & time*",
          titleEnd: "",
          lblEnd: "",
          alertMsg: ""
        }
      };

      const formatMapping = {
        1: 'Day Month Year Time 12 hour',
        2: 'Month Day Year Time 12 hour',
        3: 'mm-dd-yyyy Time 12 hour',
        4: 'dd-mm-yyyy Time 12 hour',
        5: 'yyyy-dd-mm Time 12 hour',
        6: 'yyyy-mm-dd Time 12 hour',
        7: 'yyyy-mm-dd Time 24 hour'
      };

      for (let i = 1; i <= 7; i++) {
        const fmt = formatMapping[i];
        const startEl = document.getElementById(`booking-start-style${i}`);
        const endEl = document.getElementById(`booking-end-style${i}`);
        const catSelect = document.getElementById(`booking-cat-style${i}`);
        const alertEl = document.getElementById(`booking-alert-style${i}`);
        const alertTextEl = document.getElementById(`booking-alert-text-style${i}`);

        const titleStartEl = document.getElementById(`booking-start-title-style${i}`);
        const lblStartEl = document.getElementById(`booking-start-lbl-style${i}`);
        const containerEndEl = document.getElementById(`booking-end-container-style${i}`);
        const titleEndEl = document.getElementById(`booking-end-title-style${i}`);
        const lblEndEl = document.getElementById(`booking-end-lbl-style${i}`);

        let startPicker = null;
        let endPicker = null;

        if (startEl && endEl) {
          // Perform sequential date-time validity checks
          const validateDates = () => {
            if (!startPicker || !endPicker) return;
            const startVal = startPicker.getDate();
            const endVal = endPicker.getDate();

            if (startVal && endVal) {
              const startObj = { year: startVal.year, month: startVal.month, day: startVal.day };
              const endObj = { year: endVal.year, month: endVal.month, day: endVal.day };
              
              // 1. Compare Year-Month-Day coordinates
              const comp = window.NDPUtils.compareBsDates(endObj, startObj);

              if (comp < 0) {
                if (alertEl) alertEl.style.display = "flex";
                if (alertTextEl) alertTextEl.innerText = serviceConfigs[catSelect.value].alertMsg;
                endPicker.clear();
              } else if (comp === 0 && startPicker._opts.enableTime && endPicker._opts.enableTime) {
                // 2. Dates are identical: compare hours & minutes since midnight
                const startMins = (startVal.hour || 0) * 60 + (startVal.minute || 0);
                const endMins = (endVal.hour || 0) * 60 + (endVal.minute || 0);
                if (endMins < startMins) {
                  if (alertEl) alertEl.style.display = "flex";
                  if (alertTextEl) alertTextEl.innerText = serviceConfigs[catSelect.value].alertMsg;
                  endPicker.clear();
                } else {
                  if (alertEl) alertEl.style.display = "none";
                }
              } else {
                if (alertEl) alertEl.style.display = "none";
              }
            } else {
              if (alertEl) alertEl.style.display = "none";
            }
          };

          startPicker = new NepaliDatePicker(startEl, {
            theme: 'classic-light',
            lang: 'en',
            enableTime: true,
            dateFormat: fmt,
            onChange: function(date) {
              if (date && endPicker) {
                endPicker.setMinDate({ year: date.year, month: date.month, day: date.day });
              }
              validateDates();
            }
          });

          endPicker = new NepaliDatePicker(endEl, {
            theme: 'classic-light',
            lang: 'en',
            enableTime: true,
            dateFormat: fmt,
            onChange: function(date) {
              validateDates();
            }
          });

          if (catSelect) {
            catSelect.addEventListener('change', function() {
              const cat = catSelect.value;
              const conf = serviceConfigs[cat];

              if (titleStartEl) titleStartEl.innerHTML = conf.titleStart;
              if (lblStartEl) lblStartEl.innerHTML = conf.lblStart;

              if (cat === 'restaurant') {
                if (containerEndEl) containerEndEl.style.display = 'none';
                if (alertEl) alertEl.style.display = "none";
                if (endPicker) endPicker.clear();
              } else {
                if (containerEndEl) containerEndEl.style.display = 'block';
                if (titleEndEl) titleEndEl.innerHTML = conf.titleEnd;
                if (lblEndEl) lblEndEl.innerHTML = conf.lblEnd;
                validateDates();
              }
            });
          }
        }
      }

      // Static Conversion & Helper Functions Live Calculations
      if (window.NDPUtils) {
        const digIn = document.getElementById('helper-digit-in');
        const digOut = document.getElementById('helper-digit-out');
        const updateDigits = () => {
          if (window.Get2DigitNo && digIn) {
            digOut.innerText = window.Get2DigitNo(digIn.value);
          }
        };
        if (digIn) {
          digIn.addEventListener('input', updateDigits);
          updateDigits();
        }

        const uniIn = document.getElementById('helper-unicode-in');
        const uniOut = document.getElementById('helper-unicode-out');
        const numOut = document.getElementById('helper-number-out');
        const updateUnicodeHelpers = () => {
          if (uniIn && window.ConvertToUnicode && window.ConvertToNumber) {
            const unicodeStr = window.ConvertToUnicode(uniIn.value);
            if (uniOut) uniOut.innerText = unicodeStr;
            if (numOut) numOut.innerText = window.ConvertToNumber(unicodeStr);
          }
        };
        if (uniIn) {
          uniIn.addEventListener('input', updateUnicodeHelpers);
          updateUnicodeHelpers();
        }

        const wordsIn = document.getElementById('helper-words-in');
        const wordsEnOut = document.getElementById('helper-words-en-out');
        const wordsNpOut = document.getElementById('helper-words-np-out');
        const updateWords = () => {
          if (wordsIn && window.NumberToWords && window.NumberToWordsUnicode) {
            if (wordsEnOut) wordsEnOut.innerText = window.NumberToWords(+wordsIn.value);
            if (wordsNpOut) wordsNpOut.innerText = window.NumberToWordsUnicode(+wordsIn.value);
          }
        };
        if (wordsIn) {
          wordsIn.addEventListener('input', updateWords);
          updateWords();
        }

        const dateIn = document.getElementById('helper-date-in');
        const ad2bsOut = document.getElementById('helper-ad2bs-out');
        const bs2adOut = document.getElementById('helper-bs2ad-out');
        const updateDateConverterHelpers = () => {
          if (dateIn && window.AD2BS && window.BS2AD) {
            if (ad2bsOut) ad2bsOut.innerText = window.AD2BS(dateIn.value);
            try {
              if (bs2adOut) bs2adOut.innerText = window.BS2AD(ad2bsOut.innerText || '2083-03-11');
            } catch (e) {
              if (bs2adOut) bs2adOut.innerText = 'Error';
            }
          }
        };
        if (dateIn) {
          dateIn.addEventListener('input', updateDateConverterHelpers);
          updateDateConverterHelpers();
        }

        const parseIn = document.getElementById('helper-parse-in');
        const parseOut = document.getElementById('helper-parse-out');
        const dateObjOut = document.getElementById('helper-dateobj-out');
        const updateParserHelpers = () => {
          if (parseIn && window.ParseDate && window.ConvertToDateObject) {
            const parsedObj = window.ParseDate(parseIn.value);
            if (parseOut) parseOut.innerText = JSON.stringify(parsedObj);
            const dateObj = window.ConvertToDateObject(parseIn.value);
            if (dateObjOut) dateObjOut.innerText = dateObj ? dateObj.toDateString() : 'null';
          }
        };
        if (parseIn) {
          parseIn.addEventListener('input', updateParserHelpers);
          updateParserHelpers();
        }

        if (window.AD) {
          const adCurrDate = document.getElementById('ad-curr-date');
          const adMonths = document.getElementById('ad-months');
          if (adCurrDate) adCurrDate.innerText = window.AD.GetCurrentDate().toDateString();
          if (adMonths) adMonths.innerText = window.AD.GetMonths().slice(0, 3).join(', ') + '...';
        }
        if (window.BS) {
          const bsCurr = window.BS.GetCurrentDate();
          const bsCurrDate = document.getElementById('bs-curr-date');
          const bsMonthsUni = document.getElementById('bs-months-uni');
          const bsDiff = document.getElementById('bs-diff');
          if (bsCurrDate) bsCurrDate.innerText = `${bsCurr.year}-${bsCurr.month}-${bsCurr.day}`;
          if (bsMonthsUni) bsMonthsUni.innerText = window.BS.GetMonthsInUnicode().slice(0, 3).join(', ') + '...';
          if (bsDiff) bsDiff.innerText = window.BS.DatesDiff({ year: 2083, month: 3, day: 1 }, { year: 2083, month: 3, day: 11 }) + ' days';
        }
      }
    });

    // Code snippet helper
    function copyCode(btn) {
      const codeText = document.getElementById('code-snippet-setup').innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        btn.style.borderColor = 'var(--success)';
        btn.style.color = 'var(--success)';
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          btn.style.color = 'var(--text-secondary)';
        }, 2000);
      });
    }