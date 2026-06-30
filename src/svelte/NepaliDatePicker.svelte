<script>
  import { onMount, onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  // Expose component props
  export let value = '';
  export let options = {};
  export let placeholder = 'Select Nepali Date';
  export let className = '';
  export let style = {};
  export let disabled = false;

  let inputEl;
  let pickerInstance = null;

  onMount(() => {
    if (!window.NepaliDatePicker) {
      console.warn('NepaliDatePicker: Core library not found. Ensure dist/nepali-datepicker.js is loaded.');
      return;
    }

    // Merge options and bind custom callback events
    const mergedOptions = {
      ...options,
      onChange: (date) => {
        value = date ? date.formatted : '';
        dispatch('change', date);
        if (options.onChange) options.onChange(date);
      },
      onRangeChange: (start, end) => {
        dispatch('rangeChange', { start, end });
        if (options.onRangeChange) options.options.onRangeChange(start, end);
      }
    };

    if (inputEl) {
      pickerInstance = new window.NepaliDatePicker(inputEl, mergedOptions);
      if (value) {
        pickerInstance.setDate(value);
      }
    }
  });

  // Watch value updates reactively in Svelte
  $: if (pickerInstance && value) {
    const currentVal = pickerInstance.getDate();
    const currentValStr = currentVal ? currentVal.formatted : '';
    if (value !== currentValStr && value !== inputEl.value) {
      pickerInstance.setDate(value);
    }
  }

  onDestroy(() => {
    if (pickerInstance) {
      pickerInstance.destroy();
    }
  });
</script>

<input
  bind:this={inputEl}
  type="text"
  {placeholder}
  class="nepali-datepicker-input {className}"
  style={Object.entries(style).map(([k, v]) => `${k}:${v}`).join(';')}
  {disabled}
  readonly={!options.autoMask}
  {...$$restProps}
/>
