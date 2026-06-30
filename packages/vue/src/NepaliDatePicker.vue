<script setup>
/**
 * NepaliDatePicker.vue — Vue 3 Composition API
 * @nepali-datepicker-studio/vue
 *
 * Usage:
 *   <NepaliDatePicker v-model="date" :options="{ theme: 'ocean-blue', lang: 'ne' }" />
 */
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  modelValue:  { type: String,  default: '' },
  options:     { type: Object,  default: () => ({}) },
  placeholder: { type: String,  default: 'Select Nepali date' },
  disabled:    { type: Boolean, default: false },
  class:       { type: String,  default: '' },
});

const emit = defineEmits(['update:modelValue', 'change', 'range-change', 'open', 'close']);

const inputRef  = ref(null);
let   picker    = null;

onMounted(() => {
  if (!window.NepaliDatePicker) {
    console.error('[NepaliDatePicker Vue] Core library not found.');
    return;
  }

  picker = new window.NepaliDatePicker(inputRef.value, {
    ...props.options,
    onChange: (date) => {
      emit('update:modelValue', date?.formatted ?? '');
      emit('change', date);
      props.options.onChange?.(date);
    },
    onRangeChange: (start, end) => {
      emit('range-change', { start, end });
      props.options.onRangeChange?.(start, end);
    },
    onOpen:  () => emit('open'),
    onClose: () => emit('close'),
  });

  if (props.modelValue) picker.setDate(props.modelValue);
});

onUnmounted(() => picker?.destroy());

// Sync v-model changes from parent
watch(() => props.modelValue, (val) => {
  if (!picker) return;
  const current = picker.getDate();
  const currentStr = current?.formatted ?? '';
  if (val !== currentStr) {
    if (val) picker.setDate(val);
    else     picker.clear();
  }
});
</script>

<template>
  <input
    ref="inputRef"
    type="text"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="['ndp-vue-input', $props.class]"
    :readonly="!options.autoMask"
  />
</template>
