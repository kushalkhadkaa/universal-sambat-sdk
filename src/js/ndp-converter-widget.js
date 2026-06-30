/**
 * Universal Sambat SDK — ndp-converter-widget.js
 * Standalone AD ↔ BS date converter widget component.
 */
(function (global) {
  'use strict';

  const U = global.NDPUtils;
  const D = global.NDPData;

  function NepaliConverterWidget(container, options) {
    if (typeof container === 'string') container = document.querySelector(container);
    if (!container) throw new Error('NepaliConverterWidget: container not found.');

    this._container = container;
    this._opts = Object.assign({
      theme: 'classic-light',
      lang: 'ne',
      defaultMode: 'bs-to-ad',
      showDaysDiff: true,
      showWeekday: true,
      onConvert: null
    }, options || {});

    this._mode = this._opts.defaultMode;
    this._result = null;
    this._init();
  }

  NepaliConverterWidget.prototype._init = function () {
    this._container.className = `ndp-converter ndp-theme-${this._opts.theme}`;
    this._build();
    this._bind();
    this._switchMode(this._mode);
    this._convert();
  };

  NepaliConverterWidget.prototype._build = function () {
    const o = this._opts;
    this._container.innerHTML = `
      <div class="ndp-conv-header">
        <h3 class="ndp-conv-title">मिति रूपान्तरण र गणना</h3>
        <div class="ndp-conv-toggle" role="group">
          <button class="ndp-conv-tab active" data-mode="bs-to-ad" type="button">
            <span class="ndp-conv-tab-icon">🇳🇵</span> वि.सं. → ई.सं.
          </button>
          <button class="ndp-conv-tab" data-mode="ad-to-bs" type="button">
            <span class="ndp-conv-tab-icon">📅</span> ई.सं. → वि.सं.
          </button>
          <button class="ndp-conv-tab" data-mode="date-diff" type="button">
            <span class="ndp-conv-tab-icon">⏳</span> उमेर / मिति अन्तर
          </button>
        </div>
      </div>
      <div class="ndp-conv-body">
        <!-- 1. Single Date Converter Inputs -->
        <div class="ndp-conv-inputs-group" id="conv-inputs-single">
          <div class="ndp-conv-inputs">
            <div class="ndp-conv-field">
              <label class="ndp-conv-label" id="conv-year-lbl">वर्ष</label>
              <input class="ndp-conv-input" id="conv-year" type="number" min="1970" max="2100" placeholder="२०८३" />
            </div>
            <div class="ndp-conv-field">
              <label class="ndp-conv-label" id="conv-month-lbl">महिना</label>
              <select class="ndp-conv-select" id="conv-month"></select>
            </div>
            <div class="ndp-conv-field">
              <label class="ndp-conv-label" id="conv-day-lbl">गते / दिन</label>
              <select class="ndp-conv-select" id="conv-day"></select>
            </div>
          </div>
        </div>

        <!-- 2. Date Difference / Age Inputs -->
        <div class="ndp-conv-inputs-group ndp-hidden" id="conv-inputs-diff">
          <div class="ndp-conv-diff-row-label" style="font-size: 10px; font-weight: 600; color: var(--ndp-muted, #888); margin-bottom: 4px; text-transform: uppercase;">सुरु मिति / जन्म मिति (वि.सं.)</div>
          <div class="ndp-conv-inputs" style="margin-bottom: 12px;">
            <div class="ndp-conv-field">
              <input class="ndp-conv-input" id="conv-diff-start-year" type="number" min="1970" max="2100" placeholder="वर्ष" />
            </div>
            <div class="ndp-conv-field">
              <select class="ndp-conv-select" id="conv-diff-start-month"></select>
            </div>
            <div class="ndp-conv-field">
              <select class="ndp-conv-select" id="conv-diff-start-day"></select>
            </div>
          </div>

          <div class="ndp-conv-diff-row-label" style="font-size: 10px; font-weight: 600; color: var(--ndp-muted, #888); margin-bottom: 4px; text-transform: uppercase;">अन्तिम मिति / आज (वि.सं.)</div>
          <div class="ndp-conv-inputs">
            <div class="ndp-conv-field">
              <input class="ndp-conv-input" id="conv-diff-end-year" type="number" min="1970" max="2100" placeholder="वर्ष" />
            </div>
            <div class="ndp-conv-field">
              <select class="ndp-conv-select" id="conv-diff-end-month"></select>
            </div>
            <div class="ndp-conv-field">
              <select class="ndp-conv-select" id="conv-diff-end-day"></select>
            </div>
          </div>
        </div>

        <!-- Calculate Trigger Button -->
        <button class="ndp-conv-btn" id="conv-convert-btn" type="button">
          <span>⇄</span> रूपान्तरण / गणना गर्नुहोस्
        </button>

        <!-- Dynamic Results Containers -->
        <div class="ndp-conv-result ndp-conv-placeholder" id="conv-result">
          <div class="ndp-conv-placeholder-icon">🗓</div>
          <p id="conv-placeholder-text">माथिको मिति छान्नुहोस् र रूपान्तरण गर्नुहोस्।</p>
        </div>

        <!-- Single Conversion Result Card -->
        <div class="ndp-conv-result-card ndp-hidden" id="conv-result-card">
          <div class="ndp-conv-arrow-row">
            <div class="ndp-conv-from">
              <div class="ndp-conv-from-label" id="conv-from-label">वि.सं.</div>
              <div class="ndp-conv-date-wrapper">
                <span class="ndp-conv-from-date" id="conv-from-date"></span>
                <button class="ndp-conv-copy-btn" id="conv-copy-from" title="Copy Date" type="button">📋</button>
              </div>
            </div>
            <div class="ndp-conv-arrow">→</div>
            <div class="ndp-conv-to">
              <div class="ndp-conv-to-label" id="conv-to-label">ई.सं.</div>
              <div class="ndp-conv-date-wrapper">
                <span class="ndp-conv-to-date" id="conv-to-date"></span>
                <button class="ndp-conv-copy-btn" id="conv-copy-to" title="Copy Date" type="button">📋</button>
              </div>
            </div>
          </div>
          <div class="ndp-conv-meta">
            <span class="ndp-conv-meta-item" id="conv-weekday"></span>
            <span class="ndp-conv-meta-item" id="conv-days-diff"></span>
          </div>
        </div>

        <!-- Age / Date Difference Result Card -->
        <div class="ndp-conv-result-card ndp-hidden" id="conv-diff-card" style="padding: 16px;">
          <div style="text-align: center; margin-bottom: 12px; border-bottom: 1px solid var(--ndp-border, rgba(0,0,0,0.08)); padding-bottom: 10px;">
            <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--ndp-muted, #999); letter-spacing: 0.05em; margin-bottom: 4px;">उमेर र समय अन्तराल</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: var(--ndp-primary, #c0392b);" id="conv-diff-primary-val">0 वर्ष, 0 महिना, 0 दिन</div>
          </div>
          <div class="ndp-conv-meta" style="justify-content: center; gap: 8px;">
            <span class="ndp-conv-meta-item" id="conv-diff-total-days" style="font-weight: 600; font-size: 11px;"></span>
            <span class="ndp-conv-meta-item" id="conv-diff-status" style="font-weight: 600; font-size: 11px;"></span>
          </div>
        </div>

        <!-- Error Card -->
        <div class="ndp-conv-error ndp-hidden" id="conv-error">
          <span class="ndp-conv-error-icon">⚠</span>
          <span id="conv-error-msg"></span>
        </div>
      </div>
    `;
  };

  NepaliConverterWidget.prototype._bind = function () {
    const c = this._container;
    c.querySelectorAll('.ndp-conv-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this._switchMode(tab.dataset.mode);
        this._convert();
      });
    });

    c.querySelector('#conv-convert-btn').addEventListener('click', () => this._convert());

    // Single inputs listeners
    c.querySelector('#conv-year').addEventListener('keydown', (e) => { if (e.key === 'Enter') this._convert(); });
    c.querySelector('#conv-year').addEventListener('input', () => { this._refreshDays(); this._convert(); });
    c.querySelector('#conv-month').addEventListener('change', () => { this._refreshDays(); this._convert(); });
    c.querySelector('#conv-day').addEventListener('change', () => { this._convert(); });

    // Diff start inputs listeners
    c.querySelector('#conv-diff-start-year').addEventListener('keydown', (e) => { if (e.key === 'Enter') this._convert(); });
    c.querySelector('#conv-diff-start-year').addEventListener('input', () => { this._refreshDiffDays('start'); this._convert(); });
    c.querySelector('#conv-diff-start-month').addEventListener('change', () => { this._refreshDiffDays('start'); this._convert(); });
    c.querySelector('#conv-diff-start-day').addEventListener('change', () => { this._convert(); });

    // Diff end inputs listeners
    c.querySelector('#conv-diff-end-year').addEventListener('keydown', (e) => { if (e.key === 'Enter') this._convert(); });
    c.querySelector('#conv-diff-end-year').addEventListener('input', () => { this._refreshDiffDays('end'); this._convert(); });
    c.querySelector('#conv-diff-end-month').addEventListener('change', () => { this._refreshDiffDays('end'); this._convert(); });
    c.querySelector('#conv-diff-end-day').addEventListener('change', () => { this._convert(); });

    // Copies
    c.querySelector('#conv-copy-from').addEventListener('click', () => {
      const text = c.querySelector('#conv-from-date').textContent;
      this._copyText(text, c.querySelector('#conv-copy-from'));
    });
    c.querySelector('#conv-copy-to').addEventListener('click', () => {
      const text = c.querySelector('#conv-to-date').textContent;
      this._copyText(text, c.querySelector('#conv-copy-to'));
    });
  };

  NepaliConverterWidget.prototype._switchMode = function (mode) {
    this._mode = mode;
    const c = this._container;
    const today = U.getTodayBs();
    const adToday = new Date();

    c.querySelectorAll('.ndp-conv-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === mode);
    });

    this._hideResult();

    if (mode === 'date-diff') {
      c.querySelector('#conv-inputs-single').classList.add('ndp-hidden');
      c.querySelector('#conv-inputs-diff').classList.remove('ndp-hidden');
      c.querySelector('#conv-placeholder-text').textContent = 'मितिहरू छान्नुहोस् र अन्तर गणना गर्नुहोस्।';

      // Start Date (Defaults to Baisakh 1, 2040)
      const startYearInput = c.querySelector('#conv-diff-start-year');
      startYearInput.value = 2040;
      this._fillMonthOptionsForElement(c.querySelector('#conv-diff-start-month'), 'bs-to-ad', 1);
      this._fillDayOptionsForElement(c.querySelector('#conv-diff-start-day'), 'bs-to-ad', 2040, 1, 1);

      // End Date (Defaults to today)
      const endYearInput = c.querySelector('#conv-diff-end-year');
      endYearInput.value = today.year;
      this._fillMonthOptionsForElement(c.querySelector('#conv-diff-end-month'), 'bs-to-ad', today.month);
      this._fillDayOptionsForElement(c.querySelector('#conv-diff-end-day'), 'bs-to-ad', today.year, today.month, today.day);

    } else {
      c.querySelector('#conv-inputs-single').classList.remove('ndp-hidden');
      c.querySelector('#conv-inputs-diff').classList.add('ndp-hidden');
      c.querySelector('#conv-placeholder-text').textContent = 'माथिको मिति छान्नुहोस् र रूपान्तरण गर्नुहोस्।';

      if (mode === 'bs-to-ad') {
        c.querySelector('#conv-year-lbl').textContent = 'वर्ष (वि.सं.)';
        c.querySelector('#conv-month-lbl').textContent = 'महिना';
        c.querySelector('#conv-day-lbl').textContent = 'गते';
        const yearInput = c.querySelector('#conv-year');
        yearInput.min = D.meta.minBsYear;
        yearInput.max = D.meta.maxBsYear;
        yearInput.value = today.year;
        yearInput.placeholder = U.toNepali(today.year);
        this._fillMonthOptionsForElement(c.querySelector('#conv-month'), mode, today.month);
        this._fillDayOptionsForElement(c.querySelector('#conv-day'), mode, today.year, today.month, today.day);
      } else {
        c.querySelector('#conv-year-lbl').textContent = 'Year (AD)';
        c.querySelector('#conv-month-lbl').textContent = 'Month (AD)';
        c.querySelector('#conv-day-lbl').textContent = 'Day (AD)';
        const yearInput = c.querySelector('#conv-year');
        yearInput.min = 1900;
        yearInput.max = 2100;
        yearInput.value = adToday.getFullYear();
        yearInput.placeholder = adToday.getFullYear();
        this._fillMonthOptionsForElement(c.querySelector('#conv-month'), mode, adToday.getMonth() + 1);
        this._fillDayOptionsForElement(c.querySelector('#conv-day'), mode, adToday.getFullYear(), adToday.getMonth() + 1, adToday.getDate());
      }
    }
  };

  NepaliConverterWidget.prototype._fillMonthOptionsForElement = function (selectEl, mode, selectedMonth) {
    if (!selectEl) return;
    selectEl.innerHTML = '';
    const months = mode === 'bs-to-ad' ? D.nepaliMonths : D.englishMonthsEn;
    months.forEach((name, i) => {
      const opt = document.createElement('option');
      opt.value = i + 1;
      opt.textContent = name;
      if (i + 1 === selectedMonth) opt.selected = true;
      selectEl.appendChild(opt);
    });
  };

  NepaliConverterWidget.prototype._fillDayOptionsForElement = function (selectEl, mode, year, month, selectedDay) {
    if (!selectEl) return;
    selectEl.innerHTML = '';
    let totalDays;
    if (mode === 'bs-to-ad') {
      totalDays = U.getDaysInMonth(+year, +month) || 30;
    } else {
      totalDays = new Date(+year, +month, 0).getDate();
    }
    for (let d = 1; d <= totalDays; d++) {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = mode === 'bs-to-ad' ? U.toNepali(d) : d;
      if (d === +selectedDay) opt.selected = true;
      selectEl.appendChild(opt);
    }
  };

  NepaliConverterWidget.prototype._refreshDays = function () {
    const c = this._container;
    const year = +c.querySelector('#conv-year').value;
    const month = +c.querySelector('#conv-month').value;
    const currentDay = +c.querySelector('#conv-day').value || 1;
    this._fillDayOptionsForElement(c.querySelector('#conv-day'), this._mode, year, month, currentDay);
  };

  NepaliConverterWidget.prototype._refreshDiffDays = function (prefix) {
    const c = this._container;
    const year = +c.querySelector(`#conv-diff-${prefix}-year`).value;
    const month = +c.querySelector(`#conv-diff-${prefix}-month`).value;
    const currentDay = +c.querySelector(`#conv-diff-${prefix}-day`).value || 1;
    this._fillDayOptionsForElement(c.querySelector(`#conv-diff-${prefix}-day`), 'bs-to-ad', year, month, currentDay);
  };

  NepaliConverterWidget.prototype._convert = function () {
    const c = this._container;
    this._hideResult();

    if (this._mode === 'date-diff') {
      const sy = +c.querySelector('#conv-diff-start-year').value;
      const sm = +c.querySelector('#conv-diff-start-month').value;
      const sd = +c.querySelector('#conv-diff-start-day').value;

      const ey = +c.querySelector('#conv-diff-end-year').value;
      const em = +c.querySelector('#conv-diff-end-month').value;
      const ed = +c.querySelector('#conv-diff-end-day').value;

      if (!U.isValidBsDate(sy, sm, sd) || !U.isValidBsDate(ey, em, ed)) {
        this._showError('कृपया मान्य वि.सं. सुरु र अन्तिम मितिहरू छान्नुहोस्।');
        return;
      }

      try {
        const startBs = { year: sy, month: sm, day: sd };
        const endBs = { year: ey, month: em, day: ed };

        // Calculate differences
        const totalDays = global.BS.DatesDiff(startBs, endBs);
        const diffObj = this._calcBsDiffDetailed(startBs, endBs);

        c.querySelector('#conv-result').classList.add('ndp-hidden');
        c.querySelector('#conv-diff-card').classList.remove('ndp-hidden');
        c.querySelector('#conv-error').classList.add('ndp-hidden');

        // Formatted String (e.g. ४२ वर्ष, ५ महिना, १२ दिन)
        const yrStr = diffObj.years > 0 ? `${U.toNepali(diffObj.years)} वर्ष ` : '';
        const moStr = diffObj.months > 0 ? `${U.toNepali(diffObj.months)} महिना ` : '';
        const dyStr = `${U.toNepali(diffObj.days)} दिन`;
        
        c.querySelector('#conv-diff-primary-val').textContent = (yrStr + moStr + dyStr).trim() || '० दिन';
        c.querySelector('#conv-diff-total-days').textContent = `⏱ कुल: ${U.toNepali(Math.abs(totalDays))} दिन`;
        
        let statusText = '';
        if (totalDays === 0) statusText = '• दुवै समान मिति हुन्';
        else if (totalDays > 0) statusText = '• भविष्यको अवधि';
        else statusText = '• ऐतिहासिक अवधि (उमेर)';
        c.querySelector('#conv-diff-status').textContent = statusText;

        this._result = { startBs, endBs, totalDays, detail: diffObj };
        if (this._opts.onConvert) this._opts.onConvert(this._result);
      } catch (err) {
        this._showError('मिति गणना गर्दा समस्या देखा पर्यो।');
      }

    } else {
      const year = +c.querySelector('#conv-year').value;
      const month = +c.querySelector('#conv-month').value;
      const day = +c.querySelector('#conv-day').value;

      try {
        if (this._mode === 'bs-to-ad') {
          if (!U.isValidBsDate(year, month, day)) {
            this._showError('कृपया मान्य वि.सं. मिति छान्नुहोस्।');
            return;
          }
          const ad = U.bsToAd(year, month, day);
          const bsStr = U.formatBsDate(year, month, day, 'ne', 'long');
          const adStr = U.formatAdDate(ad.date, 'en');
          const weekday = U.getWeekdayName(ad.weekday, 'ne');
          const diff = U.daysDiffFromToday(ad.date);
          this._showResult('वि.सं.', bsStr, 'ई.सं.', adStr, weekday, diff);
          this._result = { bsDate: { year, month, day }, adDate: ad };
          if (this._opts.onConvert) this._opts.onConvert(this._result);

        } else {
          if (!U.isValidAdDate(year, month, day)) {
            this._showError('यो ई.सं. मिति मान्य छैन।');
            return;
          }
          const adDate = new Date(year, month - 1, day);
          const bs = U.adToBs(adDate);
          const bsStr = U.formatBsDate(bs.year, bs.month, bs.day, 'ne', 'long');
          const adStr = U.formatAdDate(adDate, 'en');
          const weekday = U.getWeekdayName(adDate.getDay(), 'ne');
          const diff = U.daysDiffFromToday(adDate);
          this._showResult('ई.सं.', adStr, 'वि.सं.', bsStr, weekday, diff);
          this._result = { bsDate: bs, adDate: { year, month, day, date: adDate } };
          if (this._opts.onConvert) this._opts.onConvert(this._result);
        }
      } catch (e) {
        this._showError('यो मिति समर्थित दायराभन्दा बाहिर छ।');
      }
    }
  };

  NepaliConverterWidget.prototype._calcBsDiffDetailed = function (d1, d2) {
    let cmp = U.compareBsDates(d1, d2);
    let start = cmp <= 0 ? d1 : d2;
    let end = cmp <= 0 ? d2 : d1;

    let years = end.year - start.year;
    let months = end.month - start.month;
    let days = end.day - start.day;

    if (days < 0) {
      let prevMonth = end.month - 1;
      let prevYear = end.year;
      if (prevMonth < 1) {
        prevMonth = 12;
        prevYear--;
      }
      const daysInPrevMonth = U.getDaysInMonth(prevYear, prevMonth) || 30;
      days += daysInPrevMonth;
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    return { years, months, days, isNegative: cmp > 0 };
  };

  NepaliConverterWidget.prototype._showResult = function (fromLabel, fromDate, toLabel, toDate, weekday, diff) {
    const c = this._container;
    c.querySelector('#conv-result').classList.add('ndp-hidden');
    c.querySelector('#conv-result-card').classList.remove('ndp-hidden');
    c.querySelector('#conv-diff-card').classList.add('ndp-hidden');
    c.querySelector('#conv-error').classList.add('ndp-hidden');
    c.querySelector('#conv-from-label').textContent = fromLabel;
    c.querySelector('#conv-from-date').textContent = fromDate;
    c.querySelector('#conv-to-label').textContent = toLabel;
    c.querySelector('#conv-to-date').textContent = toDate;
    c.querySelector('#conv-weekday').textContent = '📅 ' + weekday;
    let diffText = '';
    if (diff === 0) diffText = '• आज';
    else if (diff === 1) diffText = '• भोलि';
    else if (diff === -1) diffText = '• हिजो';
    else if (diff > 0) diffText = `• ${U.toNepali(diff)} दिन पछि`;
    else diffText = `• ${U.toNepali(Math.abs(diff))} दिन अगाडि`;
    c.querySelector('#conv-days-diff').textContent = diffText;
  };

  NepaliConverterWidget.prototype._showError = function (msg) {
    const c = this._container;
    c.querySelector('#conv-result').classList.add('ndp-hidden');
    c.querySelector('#conv-result-card').classList.add('ndp-hidden');
    c.querySelector('#conv-diff-card').classList.add('ndp-hidden');
    c.querySelector('#conv-error').classList.remove('ndp-hidden');
    c.querySelector('#conv-error-msg').textContent = msg;
  };

  NepaliConverterWidget.prototype._hideResult = function () {
    const c = this._container;
    c.querySelector('#conv-result').classList.remove('ndp-hidden');
    c.querySelector('#conv-result-card').classList.add('ndp-hidden');
    c.querySelector('#conv-diff-card').classList.add('ndp-hidden');
    c.querySelector('#conv-error').classList.add('ndp-hidden');
  };

  NepaliConverterWidget.prototype._copyText = function (text, btn) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      const originalText = btn.textContent;
      btn.textContent = '✓';
      btn.style.color = 'var(--ndp-success, #2ecc71)';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.color = '';
      }, 2000);
    });
  };

  NepaliConverterWidget.prototype.setTheme = function (theme) {
    const classes = Array.from(this._container.classList);
    classes.forEach(cls => { if (cls.startsWith('ndp-theme-')) this._container.classList.remove(cls); });
    this._container.classList.add('ndp-theme-' + theme);
    this._opts.theme = theme;
  };

  NepaliConverterWidget.prototype.getResult = function () { return this._result; };

  global.NepaliConverterWidget = NepaliConverterWidget;

}(typeof window !== 'undefined' ? window : this));
