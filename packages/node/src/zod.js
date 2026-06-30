'use strict';
const { isValidBs, BS2AD } = require('./engine');

/**
 * Zod schema helpers for Nepali DatePicker Studio
 * Requires zod >= 3.0.0 as a peer dependency.
 *
 * Usage:
 *   const { bsDateString, bsDateRange, adFromBs } = require('@nepali-datepicker-studio/node/zod');
 *   const schema = z.object({ checkIn: bsDateString(), nights: z.number() });
 */

function requireZod() {
  try { return require('zod'); }
  catch {
    throw new Error(
      '[@nepali-datepicker-studio/node] zod is required for schema helpers.\n' +
      'Install it: npm install zod'
    );
  }
}

/** z.string() that validates a BS date string "YYYY-MM-DD" */
function bsDateString(message) {
  const { z } = requireZod();
  return z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, message || 'Must be a date string YYYY-MM-DD')
    .refine((val) => {
      const [y, m, d] = val.split('-').map(Number);
      return isValidBs(y, m, d);
    }, { message: message || 'Invalid Bikram Sambat date' });
}

/** Object with start/end bsDateString fields */
function bsDateRange() {
  const { z } = requireZod();
  return z
    .object({ start: bsDateString(), end: bsDateString() })
    .refine((val) => val.start <= val.end, { message: 'start must be before end' });
}

/** Transform a BS date string to AD ISO string */
function adFromBs(message) {
  return bsDateString(message).transform((val) => BS2AD(val));
}

module.exports = { bsDateString, bsDateRange, adFromBs };
