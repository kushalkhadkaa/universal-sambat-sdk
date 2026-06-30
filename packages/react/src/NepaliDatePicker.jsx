import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

/**
 * NepaliDatePicker — React component
 * Wraps the vanilla NepaliDatePicker library.
 *
 * Usage:
 *   import { NepaliDatePicker } from '@nepali-datepicker-studio/react';
 *   <NepaliDatePicker value={date} onChange={setDate} options={{ theme: 'ocean-blue', lang: 'ne' }} />
 */
export const NepaliDatePicker = forwardRef(function NepaliDatePicker(
  {
    value      = '',
    onChange   = null,
    options    = {},
    placeholder = 'Select Nepali date',
    className  = '',
    style      = {},
    disabled   = false,
    ...rest
  },
  ref
) {
  const inputRef    = useRef(null);
  const pickerRef   = useRef(null);

  // Expose imperative API via ref
  useImperativeHandle(ref, () => ({
    open:     () => pickerRef.current?.open(),
    close:    () => pickerRef.current?.close(),
    clear:    () => pickerRef.current?.clear(),
    getDate:  () => pickerRef.current?.getDate(),
    setDate:  (d) => pickerRef.current?.setDate(d),
    getRange: () => pickerRef.current?.getRange(),
    setTheme: (t) => pickerRef.current?.setTheme(t),
    setLang:  (l) => pickerRef.current?.setLang(l),
    jumpTo:   (y, m) => pickerRef.current?.jumpTo(y, m),
    destroy:  () => pickerRef.current?.destroy(),
  }));

  useEffect(() => {
    const Ctor = window?.NepaliDatePicker;
    if (!Ctor) {
      console.error('[NepaliDatePicker] Core library not found. Include dist/nepali-datepicker.js.');
      return;
    }

    const mergedOptions = {
      ...options,
      onChange: (date) => {
        onChange?.(date);
        options.onChange?.(date);
      },
      onRangeChange: (start, end) => {
        options.onRangeChange?.(start, end);
      },
    };

    pickerRef.current = new Ctor(inputRef.current, mergedOptions);
    if (value) pickerRef.current.setDate(value);

    return () => pickerRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync controlled value
  useEffect(() => {
    if (!pickerRef.current) return;
    const current = pickerRef.current.getDate();
    const currentStr = current ? current.formatted ?? '' : '';
    if (value !== currentStr) {
      if (value) pickerRef.current.setDate(value);
      else pickerRef.current.clear();
    }
  }, [value]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      className={['ndp-react-input', className].filter(Boolean).join(' ')}
      style={style}
      disabled={disabled}
      readOnly={!options.autoMask}
      {...rest}
    />
  );
});

export default NepaliDatePicker;
