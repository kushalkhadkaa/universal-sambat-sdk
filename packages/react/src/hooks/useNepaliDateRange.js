import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useNepaliDateRange — headless hook for range selection
 *
 * Usage:
 *   const { inputRef, start, end, clear } = useNepaliDateRange({
 *     theme: 'midnight',
 *     presets: true,
 *   });
 *   return <input ref={inputRef} />;
 */
export function useNepaliDateRange(options = {}) {
  const inputRef  = useRef(null);
  const pickerRef = useRef(null);
  const [start, setStart] = useState(null);
  const [end,   setEnd]   = useState(null);

  useEffect(() => {
    const Ctor = window?.NepaliDatePicker;
    if (!Ctor || !inputRef.current) return;

    pickerRef.current = new Ctor(inputRef.current, {
      presets: true,
      ...options,
      mode: 'range',
      onRangeChange: (s, e) => {
        setStart(s);
        setEnd(e);
        options.onRangeChange?.(s, e);
      },
    });

    return () => pickerRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clear    = useCallback(() => { pickerRef.current?.clear(); setStart(null); setEnd(null); }, []);
  const getRange = useCallback(() => pickerRef.current?.getRange(), []);

  return { inputRef, start, end, clear, getRange };
}

export default useNepaliDateRange;
