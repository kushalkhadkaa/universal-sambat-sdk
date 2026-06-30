/**
 * Next.js API Route — BS to AD conversion
 * Copy to: pages/api/bs-to-ad.js  (Pages Router)
 *          OR app/api/bs-to-ad/route.js (App Router — see below)
 *
 * Pages Router usage:
 *   POST /api/bs-to-ad  { "date": "2083-03-15" }
 *   → { "ad": "2026-06-29", "bs": "2083-03-15" }
 */

// ── Embedded conversion engine (no DOM needed) ─────────────────────────────
// BS reference epoch: 1970-01-01 BS = 1913-04-13 AD
const BS_EPOCH_AD = new Date(1913, 3, 13); // month is 0-indexed

// Minimal BS calendar data (1970–2090) — month lengths per year
// Full data embedded from ndp-data.js at build time in production.
// For the API route, import from the CJS build:
const { BS2AD, AD2BS } = require('universal-sambat-sdk');

// ── Pages Router handler ───────────────────────────────────────────────────
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { date } = req.body;
  if (!date || typeof date !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid `date` field. Expected: "YYYY-MM-DD" (BS).' });
  }

  try {
    const adDate = BS2AD(date);
    return res.status(200).json({ bs: date, ad: adDate });
  } catch (err) {
    return res.status(422).json({ error: err.message || 'Conversion failed.' });
  }
}

/**
 * App Router — export this instead:
 *
 * import { NextResponse } from 'next/server';
 * const { BS2AD } = require('universal-sambat-sdk');
 *
 * export async function POST(request) {
 *   const { date } = await request.json();
 *   try {
 *     const ad = BS2AD(date);
 *     return NextResponse.json({ bs: date, ad });
 *   } catch (e) {
 *     return NextResponse.json({ error: e.message }, { status: 422 });
 *   }
 * }
 */
