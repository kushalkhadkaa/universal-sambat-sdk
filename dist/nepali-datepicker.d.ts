/**
 * Universal Sambat SDK — TypeScript Declarations
 * https://kushalkhadkaa.github.io/universal-sambat-sdk/
 */

// ─── Core date objects ────────────────────────────────────────────────────────

export interface BsDate {
  year: number;
  month: number;
  day: number;
}

export interface DateObject extends BsDate {
  hour?: number;
  minute?: number;
  formatted?: string;
  adDate?: Date;
  adFormatted?: string;
  dayOfWeek?: number;
  isHoliday?: boolean;
  isWeekend?: boolean;
}

export interface DateRange {
  start: DateObject | null;
  end:   DateObject | null;
}

export interface AdDate {
  year:  number;
  month: number;
  day:   number;
  date:  Date;
}

// ─── Picker options ───────────────────────────────────────────────────────────

export type Lang   = 'ne' | 'en';
export type Mode   = 'single' | 'range' | 'multiple';
export type Theme  =
  | 'classic-light' | 'classic-dark' | 'nepali-red' | 'ocean-blue'
  | 'forest-green'  | 'sunset-orange'| 'royal-purple'| 'midnight'
  | 'glassmorphism' | 'neumorphism'  | 'gradient-aurora' | 'minimal-mono'
  | 'pastel-soft'   | 'corporate-blue' | 'earthy-terracotta' | 'neon-cyberpunk'
  | 'material-design' | 'retro-paper' | 'high-contrast' | 'festive-dashain'
  | 'mountain-mist' | 'tropical-teal'
  | (string & {}); // allow custom theme names

export type Position = 'auto' | 'bottom' | 'top';
export type TimeFormat = 'HH:MM' | 'hh:MM' | 'HH:MM:SS' | 'hh:MM:SS am/pm';

export interface DatePickerOptions {
  // ── Visual ──────────────────────────────────────────────
  theme?:              Theme;
  lang?:               Lang;
  position?:           Position;
  animate?:            boolean;
  mobileFriendly?:     boolean;
  highlightWeekends?:  boolean;

  // ── Mode ────────────────────────────────────────────────
  mode?:               Mode;
  inline?:             boolean;

  // ── Format ──────────────────────────────────────────────
  format?:             string;
  dateFormat?:         string;  // compatibility alias for `format`
  unicodeDates?:       boolean | null;
  weekStart?:          0 | 1;   // 0 = Sunday, 1 = Monday

  // ── Display toggles ─────────────────────────────────────
  showAdDate?:         boolean;
  showTodayBtn?:       boolean;
  showClearBtn?:       boolean;
  showHolidays?:       boolean;
  showTithi?:          boolean;
  showFiscalYear?:     boolean;
  showDuration?:       boolean;
  keyboardHelp?:       boolean;
  quickNav?:           boolean;

  // ── Date constraints ────────────────────────────────────
  minDate?:            BsDate | string | null;
  maxDate?:            BsDate | string | null;
  disabledDates?:      (BsDate | string)[];
  disabledDaysOfWeek?: number[];
  disableHolidays?:    boolean;
  futureOnly?:         boolean;
  pastOnly?:           boolean;

  // ── Time picker ─────────────────────────────────────────
  enableTime?:         boolean;
  timeFormat?:         TimeFormat;

  // ── Range presets ────────────────────────────────────────
  presets?:            boolean;

  // ── Behavior ────────────────────────────────────────────
  closeOnSelect?:      boolean;
  autoMask?:           boolean;
  autoValidate?:       boolean;
  placeholder?:        string;

  // ── Export / integration ─────────────────────────────────
  exportAdInput?:      string | null;

  // ── Callbacks ────────────────────────────────────────────
  onChange?:       (date: DateObject | DateObject[] | null)      => void;
  onRangeChange?:  (start: DateObject | null, end: DateObject | null) => void;
  onMonthChange?:  (year: number, month: number)                 => void;
  onOpen?:         ()                                            => void;
  onClose?:        ()                                            => void;
  onToday?:        ()                                            => void;
  onClear?:        ()                                            => void;
  renderDay?:      (day: DateObject, cell: HTMLElement)          => void;

  // ── Compatibility aliases ────────────────────────────────
  onSelect?:       (date: DateObject | null) => void;
  range?:          boolean;
  multiple?:       boolean;
  language?:       Lang;
}

// ─── Main class ───────────────────────────────────────────────────────────────

export class NepaliDatePicker {
  constructor(element: string | HTMLElement, options?: DatePickerOptions);

  // Instance methods
  getDate():                        DateObject | null;
  setDate(date: BsDate | string):   void;
  getDates():                       DateObject[];
  getRange():                       DateRange;
  clear():                          void;
  open():                           void;
  close():                          void;
  toggle():                         void;
  setMinDate(date: BsDate | string): void;
  setMaxDate(date: BsDate | string): void;
  setTheme(themeName: Theme):       void;
  setLang(lang: Lang):              void;
  jumpTo(year: number, month: number): void;
  destroy():                        void;

  // Static methods
  static today():                                         DateObject;
  static bsToAd(year: number, month: number, day: number): AdDate;
  static adToBs(date: Date | string):                     DateObject;
  static readonly version: string;
}

// ─── Converter widget ─────────────────────────────────────────────────────────

export interface ConverterOptions {
  theme?:          Theme;
  lang?:           Lang;
  defaultMode?:    'bs-to-ad' | 'ad-to-bs' | 'age-diff';
  showDaysDiff?:   boolean;
  showAge?:        boolean;
  onConvert?:      (result: ConvertResult) => void;
}

export interface ConvertResult {
  mode:      'bs-to-ad' | 'ad-to-bs';
  input:     string;
  output:    string;
  bsDate?:   DateObject;
  adDate?:   AdDate;
  daysDiff?: number;
}

export class NepaliConverterWidget {
  constructor(element: string | HTMLElement, options?: ConverterOptions);
  destroy(): void;
}

// ─── Utility functions ────────────────────────────────────────────────────────

/** Convert AD date string (YYYY-MM-DD) to BS string */
export function AD2BS(dateStr: string): string;

/** Convert BS date string (YYYY-MM-DD) to AD string */
export function BS2AD(dateStr: string): string;

/** Zero-pad number to 2 digits */
export function Get2DigitNo(num: number | string): string;

/** Convert ASCII digits to Nepali Devanagari digits */
export function ConvertToUnicode(num: number | string): string;

/** Convert Nepali Devanagari digits to ASCII digits */
export function ConvertToNumber(unicodeStr: string): number | string;

/** Convert number to Nepali words (e.g. 1 → "एक") */
export function NumberToWords(num: number): string;

/** Convert number to Nepali words in Devanagari */
export function NumberToWordsUnicode(num: number): string;

/** Parse a BS date string into a DateObject */
export function ParseDate(dateStr: string): DateObject | null;

/** Convert a BS date string to a JavaScript Date (via AD) */
export function ConvertToDateObject(dateStr: string): Date | null;

// ─── Default export ───────────────────────────────────────────────────────────

export default NepaliDatePicker;
