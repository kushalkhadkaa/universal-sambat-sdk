<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

// Define inputs and events
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  options: {
    type: Object,
    default: () => ({})
  },
  placeholder: {
    type: String,
    default: 'Select Nepali Date'
  },
  className: {
    type: String,
    default: ''
  },
  style: {
    type: Object,
    default: () => ({})
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'change', 'range-change']);

const inputRef = ref(null);
let pickerInstance = null;

onMounted(() => {
  if (!window.NepaliDatePicker) {
    console.warn('NepaliDatePicker: Core library not found. Ensure dist/nepali-datepicker.js is loaded.');
    return;
  }

  // Merge configuration parameters and dynamic callbacks
  const mergedOptions = {
    ...props.options,
    onChange: (date) => {
      emit('update:modelValue', date ? date.formatted : '');
      emit('change', date);
      if (props.options.onChange) props.options.onChange(date);
    },
    onRangeChange: (start, end) => {
      emit('range-change', { start, end });
      if (props.options.onRangeChange) props.options.onRangeChange(start, end);
    }
  };

  if (inputRef.value) {
    pickerInstance = new window.NepaliDatePicker(inputRef.value, mergedOptions);
    if (props.modelValue) {
      pickerInstance.setDate(props.modelValue);
    }
  }
});

// Reactively watch for external value property adjustments
watch(() => props.modelValue, (newVal) => {
  if (pickerInstance && newVal) {
    const currentVal = pickerInstance.getDate();
    const currentValStr = currentVal ? currentVal.formatted : '';
    if (newVal !== currentValStr && newVal !== inputRef.value.value) {
      pickerInstance.setDate(newVal);
    }
  }
});

onUnmounted(() => {
  if (pickerInstance) {
    pickerInstance.destroy();
  }
});
</script>

<template>
  <input
    ref="inputRef"
    type="text"
    :placeholder="placeholder"
    :class="['nepali-datepicker-input', className]"
    :style="style"
    :disabled="disabled"
    :readonly="!options.autoMask"
  />
</template>
