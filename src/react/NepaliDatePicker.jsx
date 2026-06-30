import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * React Wrapper Component for Nepali DatePicker Studio
 * Allows seamless integration into React/Vite/Next.js frameworks.
 */
export const NepaliDatePicker = ({
  options = {},
  value = '',
  onChange = () => {},
  placeholder = 'Select Nepali Date',
  className = '',
  style = {},
  disabled = false,
  ...props
}) => {
  const inputRef = useRef(null);
  const pickerInstance = useRef(null);

  useEffect(() => {
    // Check if the underlying vanilla script is loaded globally
    if (!window.NepaliDatePicker) {
      console.warn('NepaliDatePicker: Core library not found. Ensure dist/nepali-datepicker.js is included in your application.');
      return;
    }

    // Merge options and bind custom component callback
    const mergedOptions = {
      ...options,
      onChange: (date) => {
        onChange(date);
        if (options.onChange) options.onChange(date);
      }
    };

    if (inputRef.current) {
      // Instantiate native datepicker
      pickerInstance.current = new window.NepaliDatePicker(inputRef.current, mergedOptions);
      
      if (value) {
        pickerInstance.current.setDate(value);
      }
    }

    // Cleanup instance on component unmount
    return () => {
      if (pickerInstance.current) {
        pickerInstance.current.destroy();
      }
    };
  }, []);

  // Sync datepicker value updates reactively
  useEffect(() => {
    if (pickerInstance.current && value) {
      const currentVal = pickerInstance.current.getDate();
      const currentValStr = currentVal ? currentVal.formatted : '';
      if (value !== currentValStr && value !== inputRef.current.value) {
        pickerInstance.current.setDate(value);
      }
    }
  }, [value]);

  return (
    <input
      type="text"
      ref={inputRef}
      placeholder={placeholder}
      className={`nepali-datepicker-input ${className}`}
      style={style}
      disabled={disabled}
      readOnly={!options.autoMask}
      {...props}
    />
  );
};

NepaliDatePicker.propTypes = {
  options: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool
};

export default NepaliDatePicker;
