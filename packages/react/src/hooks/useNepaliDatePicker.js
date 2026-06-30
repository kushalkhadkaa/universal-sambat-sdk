import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useNepaliDatePicker — headless hook
 *
 * Usage:
 *   const { inputRef, date, open, close, clear, setDate } = useNepaliDatePicker({
 *     theme: 'ocean-blue',
 *     lang: 'ne',
 *     onChange: (d) => console.log(d),
 *   });
 *   return <input ref={inputRef} />;
 */
export function useNepaliDatePicker(options = {}) {
  const inputRef   = useRef(null);
  const pickerRef  = useRef(null);
  const [date, setDateState] = useState(null);
  const [isOpen, setIsOpen]  = useState(false);

  useEffect(() => {
    const Ctor = window?.NepaliDatePicker;
    if (!Ctor || !inputRef.current) return;

    pickerRef.current = new Ctor(inputRef.current, {
      ...options,
      onChange: (d) => {
        setDateState(d);
        options.onChange?.(d);
      },
      onOpen:  () => { setIsOpen(true);  options.onOpen?.();  },
      onClose: () => { setIsOpen(false); options.onClose?.(); },
    });

    return () => pickerRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const open    = useCallback(() => pickerRef.current?.open(),    []);
  const close   = useCallback(() => pickerRef.current?.close(),   []);
  const clear   = useCallback(() => { pickerRef.current?.clear(); setDateState(null); }, []);
  const setDate = useCallback((d) => { pickerRef.current?.setDate(d); }, []);
  const getDate = useCallback(() => pickerRef.current?.getDate(), []);

  return { inputRef, date, isOpen, open, close, clear, setDate, getDate };
}

export default useNepaliDatePicker;
