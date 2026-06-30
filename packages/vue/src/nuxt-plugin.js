/**
 * Nuxt 3 plugin — auto-registers components and composables
 *
 * Copy to: plugins/nepali-datepicker.client.js
 * (The `.client` suffix ensures it runs only on the browser — not during SSR)
 */
import { defineNuxtPlugin } from '#app';
import NepaliDatePicker      from './NepaliDatePicker.vue';
import NepaliDateRangePicker from './NepaliDateRangePicker.vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('NepaliDatePicker',      NepaliDatePicker);
  nuxtApp.vueApp.component('NepaliDateRangePicker', NepaliDateRangePicker);
});
