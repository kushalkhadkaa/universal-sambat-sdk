<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  options:     { type: Object,  default: () => ({}) },
  placeholder: { type: String,  default: 'Select date range' },
  disabled:    { type: Boolean, default: false },
});

const emit = defineEmits(['range-change', 'open', 'close']);

const inputRef = ref(null);
let   picker   = null;

onMounted(() => {
  if (!window.NepaliDatePicker) return;
  picker = new window.NepaliDatePicker(inputRef.value, {
    presets: true,
    ...props.options,
    mode: 'range',
    onRangeChange: (start, end) => {
      emit('range-change', { start, end });
      props.options.onRangeChange?.(start, end);
    },
    onOpen:  () => emit('open'),
    onClose: () => emit('close'),
  });
});

onUnmounted(() => picker?.destroy());
</script>

<template>
  <input
    ref="inputRef"
    type="text"
    :placeholder="placeholder"
    :disabled="disabled"
    class="ndp-vue-range-input"
    readonly
  />
</template>
