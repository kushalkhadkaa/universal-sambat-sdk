<script>
  /**
   * NepaliDatePicker.svelte — Svelte 5 (runes)
   * @universal-sambat-sdk/svelte
   *
   * Usage:
   *   <NepaliDatePicker bind:value={date} options={{ theme: 'ocean-blue', lang: 'ne' }} />
   */
  import { onMount, onDestroy } from 'svelte';

  let {
    value       = $bindable(''),
    options     = {},
    placeholder = 'Select Nepali date',
    disabled    = false,
    class: klass = '',
    onchange    = null,
    ...rest
  } = $props();

  let inputEl = $state(null);
  let picker  = $state(null);

  onMount(() => {
    if (typeof window === 'undefined' || !window.NepaliDatePicker) {
      console.error('[NepaliDatePicker Svelte] Core library not found.');
      return;
    }

    picker = new window.NepaliDatePicker(inputEl, {
      ...options,
      onChange(date) {
        value = date?.formatted ?? '';
        onchange?.(date);
        options.onChange?.(date);
      },
    });

    if (value) picker.setDate(value);
  });

  onDestroy(() => picker?.destroy());

  // Sync reactive value changes
  $effect(() => {
    if (!picker) return;
    const current = picker.getDate();
    const currentStr = current?.formatted ?? '';
    if (value !== currentStr) {
      if (value) picker.setDate(value);
      else       picker.clear();
    }
  });
</script>

<input
  bind:this={inputEl}
  type="text"
  {placeholder}
  {disabled}
  class="ndp-svelte-input {klass}"
  readonly={!options.autoMask}
  {...rest}
/>
