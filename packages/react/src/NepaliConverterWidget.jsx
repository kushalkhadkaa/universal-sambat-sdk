import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

/**
 * NepaliConverterWidget — React component
 * Renders the standalone BS↔AD converter widget.
 *
 * Usage:
 *   <NepaliConverterWidget options={{ theme: 'glassmorphism', lang: 'ne' }} />
 */
export const NepaliConverterWidget = forwardRef(function NepaliConverterWidget(
  {
    options   = {},
    className = '',
    style     = {},
    ...rest
  },
  ref
) {
  const containerRef  = useRef(null);
  const widgetRef     = useRef(null);

  useImperativeHandle(ref, () => ({
    destroy: () => widgetRef.current?.destroy(),
  }));

  useEffect(() => {
    const Ctor = window?.NepaliConverterWidget;
    if (!Ctor) {
      console.error('[NepaliConverterWidget] Core library not found.');
      return;
    }
    widgetRef.current = new Ctor(containerRef.current, options);
    return () => widgetRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={['ndp-react-converter', className].filter(Boolean).join(' ')}
      style={style}
      {...rest}
    />
  );
});

export default NepaliConverterWidget;
