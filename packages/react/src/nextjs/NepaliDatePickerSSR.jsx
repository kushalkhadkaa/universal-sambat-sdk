'use client'; // Next.js App Router — must be a Client Component

import dynamic from 'next/dynamic';

/**
 * NepaliDatePickerSSR — Next.js safe dynamic import wrapper
 * Prevents "window is not defined" errors during SSR.
 *
 * Usage (App Router):
 *   import NepaliDatePickerSSR from '@nepali-datepicker-studio/react/nextjs';
 *   <NepaliDatePickerSSR options={{ theme: 'ocean-blue' }} onChange={setDate} />
 *
 * Usage (Pages Router):
 *   Same import — works in both routers.
 */
const NepaliDatePickerSSR = dynamic(
  () => import('../NepaliDatePicker.jsx').then((m) => m.NepaliDatePicker),
  {
    ssr: false,
    loading: () => (
      <input
        type="text"
        placeholder="Loading datepicker…"
        disabled
        className="ndp-ssr-skeleton"
        style={{ opacity: 0.5, cursor: 'not-allowed' }}
      />
    ),
  }
);

export default NepaliDatePickerSSR;
