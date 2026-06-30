/**
 * @nepali-datepicker-studio/vue
 * Vue 3 components + Nuxt/Vue plugin for Nepali DatePicker Studio
 */

export { default as NepaliDatePicker }      from './NepaliDatePicker.vue';
export { default as NepaliDateRangePicker } from './NepaliDateRangePicker.vue';

/**
 * Vue plugin — app.use(NepaliDatePickerPlugin)
 * Registers <NepaliDatePicker> and <NepaliDateRangePicker> globally.
 */
import NepaliDatePicker      from './NepaliDatePicker.vue';
import NepaliDateRangePicker from './NepaliDateRangePicker.vue';

export const NepaliDatePickerPlugin = {
  install(app) {
    app.component('NepaliDatePicker',      NepaliDatePicker);
    app.component('NepaliDateRangePicker', NepaliDateRangePicker);
  },
};

export default NepaliDatePickerPlugin;
