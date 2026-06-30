const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Load the compiled CommonJS calendar module bundle
const { AD2BS, BS2AD, ParseDate, ConvertToDateObject } = require('../../dist/nepali-datepicker.cjs.js');

app.use(express.json());

/**
 * API: Convert Gregorian AD to Bikram Sambat BS
 * GET /api/convert/ad-to-bs?date=2026-06-27
 */
app.get('/api/convert/ad-to-bs', (req, res) => {
  const adStr = req.query.date; // expects "YYYY-MM-DD"
  if (!adStr) {
    return res.status(400).json({ error: "Missing required query parameter 'date'" });
  }

  try {
    const bsStr = AD2BS(adStr);
    const parsed = ParseDate(bsStr);
    return res.json({
      inputAd: adStr,
      outputBs: bsStr,
      details: parsed
    });
  } catch (err) {
    return res.status(400).json({ error: "Failed to convert AD date. Ensure format is YYYY-MM-DD." });
  }
});

/**
 * API: Convert Bikram Sambat BS to Gregorian AD
 * GET /api/convert/bs-to-ad?date=2083-03-12
 */
app.get('/api/convert/bs-to-ad', (req, res) => {
  const bsStr = req.query.date; // expects "YYYY-MM-DD"
  if (!bsStr) {
    return res.status(400).json({ error: "Missing required query parameter 'date'" });
  }

  try {
    const adStr = BS2AD(bsStr);
    const dateObj = ConvertToDateObject(bsStr);
    return res.json({
      inputBs: bsStr,
      outputAd: adStr,
      timestamp: dateObj ? dateObj.getTime() : null,
      utcString: dateObj ? dateObj.toISOString() : null
    });
  } catch (err) {
    return res.status(400).json({ error: "Failed to convert BS date. Ensure format is YYYY-MM-DD." });
  }
});

// Serve the sandbox client in static contexts
app.use(express.static(path.join(__dirname, '../../')));

// Run Express instance if not loaded under unit test contexts
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Universal Sambat SDK Server running on http://localhost:${PORT}`);
  });
}

module.exports = app; // export for supertest contexts
