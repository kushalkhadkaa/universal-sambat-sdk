import * as React from 'react';
import type { DatePickerOptions, DateObject, DateRange, ConverterOptions } from 'universal-sambat-sdk';

// ─── Ref handles ──────────────────────────────────────────────────────────────

export interface NepaliDatePickerHandle {
  open():                       void;
  close():                      void;
  clear():                      void;
  getDate():                    DateObject | null;
  setDate(date: object | string): void;
  getRange():                   DateRange;
  setTheme(theme: string):      void;
  setLang(lang: 'ne' | 'en'): void;
  jumpTo(year: number, month: number): void;
  destroy():                    void;
}

export interface NepaliDateRangeHandle {
  open():     void;
  close():    void;
  clear():    void;
  getRange(): DateRange;
  destroy():  void;
}

export interface NepaliConverterHandle {
  destroy(): void;
}

// ─── Components ───────────────────────────────────────────────────────────────

export interface NepaliDatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?:       string;
  onChange?:    (date: DateObject | null) => void;
  options?:     DatePickerOptions;
  placeholder?: string;
  className?:   string;
  style?:       React.CSSProperties;
  disabled?:    boolean;
}

export interface NepaliDateRangePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startValue?:    string;
  endValue?:      string;
  onRangeChange?: (start: DateObject | null, end: DateObject | null) => void;
  onChange?:      (date: DateObject | null) => void;
  options?:       DatePickerOptions;
  placeholder?:   string;
  className?:     string;
  style?:         React.CSSProperties;
  disabled?:      boolean;
}

export interface NepaliConverterWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  options?:   ConverterOptions;
  className?: string;
  style?:     React.CSSProperties;
}

export const NepaliDatePicker:      React.ForwardRefExoticComponent<NepaliDatePickerProps      & React.RefAttributes<NepaliDatePickerHandle>>;
export const NepaliDateRangePicker: React.ForwardRefExoticComponent<NepaliDateRangePickerProps & React.RefAttributes<NepaliDateRangeHandle>>;
export const NepaliConverterWidget: React.ForwardRefExoticComponent<NepaliConverterWidgetProps & React.RefAttributes<NepaliConverterHandle>>;

// ─── Hooks ────────────────────────────────────────────────────────────────────

export interface UseNepaliDatePickerReturn {
  inputRef: React.RefObject<HTMLInputElement>;
  date:     DateObject | null;
  isOpen:   boolean;
  open():   void;
  close():  void;
  clear():  void;
  setDate(date: object | string): void;
  getDate(): DateObject | null;
}

export interface UseNepaliDateRangeReturn {
  inputRef:  React.RefObject<HTMLInputElement>;
  start:     DateObject | null;
  end:       DateObject | null;
  clear():   void;
  getRange(): DateRange;
}

export function useNepaliDatePicker(options?: DatePickerOptions): UseNepaliDatePickerReturn;
export function useNepaliDateRange(options?: DatePickerOptions):  UseNepaliDateRangeReturn;

export default NepaliDatePicker;
