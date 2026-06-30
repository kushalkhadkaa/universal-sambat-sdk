# @nepali-datepicker-studio/node

Server-side Bikram Sambat (BS) ↔ Gregorian (AD) conversion for Node.js. Works with Express, Fastify, Next.js API routes, and plain Node.js scripts. Zero dependencies.

## Install
```bash
npm install @nepali-datepicker-studio/node
```

## Plain Node.js
```js
const { BS2AD, AD2BS, bsToAd, adToBs, todayBs, isValidBs } = require('@nepali-datepicker-studio/node');

console.log(BS2AD('2083-03-15'));       // "2026-06-29"
console.log(AD2BS('2026-06-29'));       // "2083-03-15"
console.log(todayBs());                 // { year: 2083, month: 3, day: 14, iso: '2083-03-14', weekday: 5 }
console.log(isValidBs(2083, 3, 15));   // true
console.log(bsToAd(2083, 3, 15));      // { year: 2026, month: 6, day: 29, iso: '2026-06-29', date: Date }
```

## Express Middleware
```js
const express = require('express');
const { nepaliDateParser, validateBsField, autoConvertBsFields } = require('@nepali-datepicker-studio/node');

const app = express();
app.use(express.json());

// Parse specific fields
app.post('/booking', nepaliDateParser(['check_in_bs', 'check_out_bs']), (req, res) => {
  res.json({ adDates: req.adDates, bsDates: req.bsDates });
  // req.adDates = { check_in_bs: '2026-06-29', check_out_bs: '2026-07-05' }
});

// Validate a single field
app.post('/reservation', validateBsField('date'), (req, res) => {
  res.json({ received: req.body.date });
});

// Auto-convert all _bs fields to _ad
app.use(autoConvertBsFields());
// req.body = { booking_date_bs: '2083-03-15' } → adds booking_date_ad: '2026-06-29'
```

## Fastify Plugin
```js
const fastify = require('fastify')();
fastify.register(require('@nepali-datepicker-studio/node').fastifyPlugin, { autoConvert: true });

fastify.post('/booking', async (req) => {
  return { ad: fastify.BS2AD(req.body.date) };
});
```

## Zod Schema
```js
const { z } = require('zod');
const { bsDateString, bsDateRange, adFromBs } = require('@nepali-datepicker-studio/node').zod;

const BookingSchema = z.object({
  checkIn:  adFromBs(),      // validates BS, transforms to AD ISO string
  checkOut: bsDateString(),  // validates BS, keeps as BS string
  nights:   z.number().int().positive(),
});

const range = z.object({ dates: bsDateRange() });
```

## Next.js API Route
```js
// pages/api/bs-to-ad.js
const { BS2AD } = require('@nepali-datepicker-studio/node');
export default function handler(req, res) {
  const { date } = req.body;
  res.json({ ad: BS2AD(date) });
}
```

## License
MIT © Kushal Khadka
