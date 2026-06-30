'use strict';
const { bsToAd, isValidBs, BS2AD } = require('../engine');

/**
 * nepaliDateParser(fields)
 * Express middleware — parses named BS fields from req.body,
 * attaches req.bsDates (original) and req.adDates (converted ISO strings).
 *
 * Usage:
 *   app.post('/booking', nepaliDateParser(['check_in_bs', 'check_out_bs']), (req, res) => {
 *     console.log(req.adDates.check_in_bs); // "2026-06-29"
 *   });
 */
function nepaliDateParser(fields) {
  return function (req, res, next) {
    req.bsDates = {};
    req.adDates = {};
    const body = req.body || {};

    for (const field of fields) {
      const val = body[field];
      if (!val) continue;
      const [y, m, d] = String(val).split('-').map(Number);
      if (!isValidBs(y, m, d)) {
        return res.status(400).json({
          error: `Invalid BS date in field '${field}': "${val}". Expected YYYY-MM-DD.`,
        });
      }
      req.bsDates[field] = val;
      req.adDates[field] = bsToAd(y, m, d).iso;
    }
    next();
  };
}

/**
 * validateBsField(field)
 * Single-field middleware — returns 400 if the named body field is not a valid BS date.
 *
 * Usage:
 *   app.post('/form', validateBsField('date'), handler);
 */
function validateBsField(field) {
  return function (req, res, next) {
    const val = (req.body || {})[field];
    if (!val) return res.status(400).json({ error: `Field '${field}' is required.` });
    const [y, m, d] = String(val).split('-').map(Number);
    if (!isValidBs(y, m, d)) {
      return res.status(400).json({ error: `'${field}' must be a valid BS date (YYYY-MM-DD). Got: "${val}".` });
    }
    next();
  };
}

/**
 * autoConvertBsFields()
 * Scans req.body for any key ending in '_bs', converts it,
 * and attaches the AD version as key ending in '_ad'.
 *
 * Usage:
 *   app.use(autoConvertBsFields());
 *   // req.body = { booking_date_bs: "2083-03-15" }
 *   // → req.body.booking_date_ad = "2026-06-29"
 */
function autoConvertBsFields() {
  return function (req, _res, next) {
    const body = req.body || {};
    for (const key of Object.keys(body)) {
      if (key.endsWith('_bs')) {
        try {
          const adKey = key.replace(/_bs$/, '_ad');
          body[adKey] = BS2AD(body[key]);
        } catch { /* skip invalid */ }
      }
    }
    next();
  };
}

module.exports = { nepaliDateParser, validateBsField, autoConvertBsFields };
