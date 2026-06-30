/**
 * @nepali-datepicker-studio/web-components
 *
 * Defines:
 *   <nepali-datepicker>   — single / range / multiple date picker
 *   <nepali-converter>    — BS↔AD converter widget
 *
 * Works in any framework (React, Vue, Angular, Svelte) or plain HTML.
 * No framework dependencies — pure Web Components API.
 *
 * Usage:
 *   <script src="@nepali-datepicker-studio/web-components/src/index.js" type="module"></script>
 *   <nepali-datepicker theme="ocean-blue" lang="ne"></nepali-datepicker>
 */

// ─── <nepali-datepicker> ──────────────────────────────────────────────────────
class NepaliDatePickerElement extends HTMLElement {
  static get observedAttributes() {
    return ['theme', 'lang', 'mode', 'value', 'placeholder', 'disabled',
            'inline', 'format', 'show-ad-date', 'future-only', 'past-only',
            'presets', 'enable-time', 'min-date', 'max-date'];
  }

  constructor() {
    super();
    this._picker = null;
    this._input  = null;
  }

  connectedCallback() {
    // Create the inner input
    this._input = document.createElement('input');
    this._input.type        = 'text';
    this._input.placeholder = this.getAttribute('placeholder') || 'Select Nepali date';
    this._input.className   = 'ndp-wc-input';
    if (this.hasAttribute('disabled')) this._input.disabled = true;

    this.appendChild(this._input);
    this._initPicker();
  }

  disconnectedCallback() {
    this._picker?.destroy();
    this._picker = null;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (!this._picker) return;
    switch (name) {
      case 'theme':    this._picker.setTheme(newVal); break;
      case 'lang':     this._picker.setLang(newVal);  break;
      case 'value':    if (newVal) this._picker.setDate(newVal); break;
      case 'disabled': this._input.disabled = newVal !== null; break;
    }
  }

  _initPicker() {
    const Ctor = window.NepaliDatePicker;
    if (!Ctor) {
      console.error('<nepali-datepicker>: Core library not found. Include nepali-datepicker.js.');
      return;
    }

    const options = {
      theme:         this.getAttribute('theme')       || 'classic-light',
      lang:          this.getAttribute('lang')        || 'ne',
      mode:          this.getAttribute('mode')        || 'single',
      format:        this.getAttribute('format')      || 'YYYY-MM-DD',
      inline:        this.hasAttribute('inline'),
      showAdDate:    this.getAttribute('show-ad-date') !== 'false',
      presets:       this.hasAttribute('presets'),
      enableTime:    this.hasAttribute('enable-time'),
      futureOnly:    this.hasAttribute('future-only'),
      pastOnly:      this.hasAttribute('past-only'),
      minDate:       this.getAttribute('min-date')    || null,
      maxDate:       this.getAttribute('max-date')    || null,
      onChange: (date) => {
        this.setAttribute('value', date?.formatted ?? '');
        this.dispatchEvent(new CustomEvent('ndp-change', {
          detail: date, bubbles: true, composed: true
        }));
      },
      onRangeChange: (start, end) => {
        this.dispatchEvent(new CustomEvent('ndp-range-change', {
          detail: { start, end }, bubbles: true, composed: true
        }));
      },
      onOpen:  () => this.dispatchEvent(new CustomEvent('ndp-open',  { bubbles: true })),
      onClose: () => this.dispatchEvent(new CustomEvent('ndp-close', { bubbles: true })),
    };

    this._picker = new Ctor(this._input, options);

    const initVal = this.getAttribute('value');
    if (initVal) this._picker.setDate(initVal);
  }

  // Public imperative API
  open()                { this._picker?.open(); }
  close()               { this._picker?.close(); }
  clear()               { this._picker?.clear(); }
  getDate()             { return this._picker?.getDate(); }
  getRange()            { return this._picker?.getRange(); }
  setDate(d)            { this._picker?.setDate(d); }
  setTheme(t)           { this._picker?.setTheme(t); }
  setLang(l)            { this._picker?.setLang(l); }
  jumpTo(year, month)   { this._picker?.jumpTo(year, month); }
}

// ─── <nepali-converter> ───────────────────────────────────────────────────────
class NepaliConverterElement extends HTMLElement {
  static get observedAttributes() { return ['theme', 'lang']; }

  constructor() {
    super();
    this._widget = null;
  }

  connectedCallback() {
    const Ctor = window.NepaliConverterWidget;
    if (!Ctor) {
      console.error('<nepali-converter>: Core library not found.');
      return;
    }
    this._widget = new Ctor(this, {
      theme: this.getAttribute('theme') || 'classic-light',
      lang:  this.getAttribute('lang')  || 'ne',
    });
  }

  disconnectedCallback() { this._widget?.destroy(); }
}

// ─── Register custom elements ─────────────────────────────────────────────────
if (typeof customElements !== 'undefined') {
  if (!customElements.get('nepali-datepicker')) {
    customElements.define('nepali-datepicker', NepaliDatePickerElement);
  }
  if (!customElements.get('nepali-converter')) {
    customElements.define('nepali-converter', NepaliConverterElement);
  }
}

export { NepaliDatePickerElement, NepaliConverterElement };
