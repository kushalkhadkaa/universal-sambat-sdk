import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

/**
 * NepaliDateRangePicker — React component (range mode pre-configured)
 *
 * Usage:
 *   <NepaliDateRangePicker
 *     startValue={start}
 *     endValue={end}
 *     onRangeChange={(start, end) => { setStart(start); setEnd(end); }}
 *     options={{ theme: 'ocean-blue', presets: true }}
 *   />
 */
export const NepaliDateRangePicker = forwardRef(function NepaliDateRangePicker(
  {
    startValue = '',
    endValue   = '',
    onRangeChange = null,
    onChange      = null,
    options       = {},
    placeholder   = 'Select date range',
    className     = '',
    style         = {},
    disabled      = false,
    ...rest
  },
  ref
) {
  const inputRef  = useRef(null);
  const pickerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open:     () => pickerRef.current?.open(),
    close:    () => pickerRef.current?.close(),
    clear:    () => pickerRef.current?.clear(),
    getRange: () => pickerRef.current?.getRange(),
    destroy:  () => pickerRef.current?.destroy(),
  }));

  useEffect(() => {
    const Ctor = window?.NepaliDatePicker;
    if (!Ctor) {
      console.error('[NepaliDateRangePicker] Core library not found.');
      return;
    }

    const mergedOptions = {
      presets: true,
      ...options,
      mode: 'range',
      onRangeChange: (start, end) => {
        onRangeChange?.(start, end);
        options.onRangeChange?.(start, end);
      },
      onChange: (date) => {
        onChange?.(date);
        options.onChange?.(date);
      },
    };

    pickerRef.current = new Ctor(inputRef.current, mergedOptions);

    return () => pickerRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      className={['ndp-react-range-input', className].filter(Boolean).join(' ')}
      style={style}
      disabled={disabled}
      readOnly
      {...rest}
    />
  );
});

export default NepaliDateRangePicker;
