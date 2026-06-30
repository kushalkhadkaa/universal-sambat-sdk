const assert = require('assert');

// Import compiled CommonJS target bundle
const { AD2BS, BS2AD, ParseDate, ConvertToDateObject, Get2DigitNo, ConvertToUnicode, ConvertToNumber } = require('../dist/nepali-datepicker.cjs.js');

console.log("Starting DatePicker Utility Test Suite...\n");

try {
  // Test 1: Two-digit padding conversions
  assert.strictEqual(Get2DigitNo(5), "05");
  assert.strictEqual(Get2DigitNo(12), "12");
  assert.strictEqual(Get2DigitNo("9"), "09");
  console.log("✓ Test 1: Get2DigitNo - Passed");

  // Test 2: Unicode number conversions
  assert.strictEqual(ConvertToUnicode(2083), "२०८३");
  assert.strictEqual(ConvertToUnicode("03-15"), "०३-१५");
  assert.strictEqual(ConvertToNumber("२०८३"), 2083);
  assert.strictEqual(ConvertToNumber("०३-१५"), "03-15");
  console.log("✓ Test 2: Unicode Conversion - Passed");

  // Test 3: Standard AD to BS date calculation bounds
  assert.strictEqual(AD2BS("2026-06-22"), "2083-03-08");
  assert.strictEqual(AD2BS("2026-06-29"), "2083-03-15");
  console.log("✓ Test 3: AD to BS Conversion - Passed");

  // Test 4: Standard BS to AD date calculation bounds
  assert.strictEqual(BS2AD("2083-03-08"), "2026-06-22");
  assert.strictEqual(BS2AD("2083-03-15"), "2026-06-29");
  console.log("✓ Test 4: BS to AD Conversion - Passed");

  // Test 5: Date object parsing
  const parsed = ParseDate("2083-03-15");
  assert.strictEqual(parsed.year, 2083);
  assert.strictEqual(parsed.month, 3);
  assert.strictEqual(parsed.day, 15);
  console.log("✓ Test 5: ParseDate - Passed");

  // Test 6: Gregorian date conversion mappings
  const dateObj = ConvertToDateObject("2083-03-15"); // corresponds to 2026-06-29
  assert.ok(dateObj instanceof Date);
  assert.strictEqual(dateObj.getFullYear(), 2026);
  assert.strictEqual(dateObj.getMonth(), 5); // 0-indexed (June is 5)
  assert.strictEqual(dateObj.getDate(), 29);
  console.log("✓ Test 6: ConvertToDateObject - Passed");

  console.log("\nAll core calendar library utility test runs passed successfully!");
  process.exit(0);
} catch (error) {
  console.error("\nFAIL: Test suite encountered a assertions discrepancy:", error.message);
  process.exit(1);
}
