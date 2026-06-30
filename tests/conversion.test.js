const assert = require('assert');

const {
  AD2BS,
  BS2AD,
  NepaliDatePicker
} = require('../dist/nepali-datepicker.cjs.js');

console.log('Starting BS/AD Conversion Test Suite...\n');

try {
  assert.strictEqual(AD2BS('1913-04-13'), '1970-01-01');
  assert.strictEqual(BS2AD('1970-01-01'), '1913-04-13');
  console.log('✓ Test 1: Base epoch mapping - Passed');

  assert.strictEqual(AD2BS('2026-06-22'), '2083-03-08');
  assert.strictEqual(AD2BS('2026-06-29'), '2083-03-15');
  assert.strictEqual(BS2AD('2083-03-08'), '2026-06-22');
  assert.strictEqual(BS2AD('2083-03-15'), '2026-06-29');
  console.log('✓ Test 2: Known modern mappings - Passed');

  const ad = NepaliDatePicker.bsToAd(2083, 3, 15);
  assert.strictEqual(ad.year, 2026);
  assert.strictEqual(ad.month, 6);
  assert.strictEqual(ad.day, 29);

  const bs = NepaliDatePicker.adToBs('2026-06-29');
  assert.strictEqual(bs.year, 2083);
  assert.strictEqual(bs.month, 3);
  assert.strictEqual(bs.day, 15);
  console.log('✓ Test 3: Static helper mappings - Passed');

  assert.throws(() => NepaliDatePicker.bsToAd(2083, 3, 33), RangeError);
  assert.throws(() => NepaliDatePicker.adToBs('1913-04-12'), RangeError);
  console.log('✓ Test 4: Out-of-range validation - Passed');

  console.log('\nAll conversion test runs passed successfully!');
  process.exit(0);
} catch (error) {
  console.error('\nFAIL: Conversion test suite encountered a discrepancy:', error.message);
  process.exit(1);
}
