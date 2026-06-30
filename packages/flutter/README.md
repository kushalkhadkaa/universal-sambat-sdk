# universal_sambat_sdk

A production-quality Flutter package for the **Nepali Bikram Sambat (BS)** calendar system. Includes a full calendar engine, a beautiful Material date picker, date range picker, and a bidirectional BS ↔ AD converter — all with bilingual Nepali/English support and four built-in themes.

---

## Features

- Full BS ↔ AD conversion engine covering **BS 1970–2090** (AD 1913–2033)
- `NepaliDatePicker` widget — single-date selection with month/year navigation
- `NepaliDateRangePicker` widget — visual range selection with highlighted span
- `NepaliDateConverter` widget — text-field-based bidirectional converter
- `showNepaliDatePicker()` — dialog helper for inline use
- **4 built-in themes**: default (blue), dark, nepali (red), green
- **Bilingual**: Nepali (Devanagari) and English labels via `lang` parameter
- Zero external dependencies — pure Flutter + Dart

---

## Installation

Add to your `pubspec.yaml`:

```yaml
dependencies:
  universal_sambat_sdk: ^1.0.0
```

Then run:

```sh
flutter pub get
```

Import in your Dart file:

```dart
import 'package:universal_sambat_sdk/universal_sambat_sdk.dart';
```

---

## Quick Start

```dart
import 'package:flutter/material.dart';
import 'package:universal_sambat_sdk/universal_sambat_sdk.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: ElevatedButton(
            onPressed: () async {
              final date = await showNepaliDatePicker(
                context,
                initialDate: BsCalendarEngine.today(),
                lang: 'ne',
              );
              if (date != null) print('Selected: $date');
            },
            child: const Text('Pick a Nepali Date'),
          ),
        ),
      ),
    );
  }
}
```

---

## `showNepaliDatePicker`

Displays a dialog with the date picker and returns the selected `BsDate?`.

```dart
final BsDate? picked = await showNepaliDatePicker(
  context,
  initialDate: BsDate(year: 2080, month: 1, day: 1),
  firstDate: BsDate(year: 2070, month: 1, day: 1),
  lastDate: BsDate(year: 2090, month: 12, day: 30),
  themeName: 'nepali', // 'default' | 'dark' | 'nepali' | 'green'
  lang: 'en',          // 'ne' | 'en'
);
```

**Parameters**

| Parameter    | Type       | Default     | Description                              |
|-------------|------------|-------------|------------------------------------------|
| `context`   | `BuildContext` | required | Flutter build context                  |
| `initialDate` | `BsDate?` | today      | Date to show initially                   |
| `firstDate` | `BsDate?`  | `null`      | Earliest selectable date                 |
| `lastDate`  | `BsDate?`  | `null`      | Latest selectable date                   |
| `themeName` | `String`   | `'default'` | Theme: `'default'`, `'dark'`, `'nepali'`, `'green'` |
| `lang`      | `String`   | `'ne'`      | Language: `'ne'` or `'en'`              |

---

## `NepaliDatePicker` Widget

Embed the picker directly inside any widget tree.

```dart
NepaliDatePicker(
  initialDate: BsCalendarEngine.today(),
  firstDate: BsDate(year: 2070, month: 1, day: 1),
  lastDate: BsDate(year: 2090, month: 12, day: 30),
  lang: 'ne',
  onDateSelected: (BsDate date) {
    print('Selected: ${date.year}-${date.month}-${date.day}');
  },
)
```

**Constructor Parameters**

| Parameter        | Type                     | Default           | Description                   |
|-----------------|--------------------------|-------------------|-------------------------------|
| `initialDate`   | `BsDate?`                | today             | Pre-selected date             |
| `firstDate`     | `BsDate?`                | `null`            | Minimum allowed date          |
| `lastDate`      | `BsDate?`                | `null`            | Maximum allowed date          |
| `theme`         | `_NepaliPickerTheme`     | `defaultTheme`    | Color theme object            |
| `lang`          | `String`                 | `'ne'`            | `'ne'` or `'en'`             |
| `onDateSelected`| `ValueChanged<BsDate>`   | required          | Callback with selected date   |

---

## `NepaliDateRangePicker` Widget

Let users select a start and end date with visual range highlighting.

```dart
NepaliDateRangePicker(
  initialStartDate: BsDate(year: 2080, month: 1, day: 1),
  initialEndDate: BsDate(year: 2080, month: 1, day: 15),
  firstDate: BsDate(year: 2070, month: 1, day: 1),
  lastDate: BsDate(year: 2090, month: 12, day: 30),
  lang: 'ne',
  onRangeSelected: (BsDate start, BsDate end) {
    print('Range: $start → $end');
  },
)
```

**Constructor Parameters**

| Parameter           | Type                                        | Default        | Description              |
|--------------------|---------------------------------------------|----------------|--------------------------|
| `initialStartDate` | `BsDate?`                                   | `null`         | Pre-set range start      |
| `initialEndDate`   | `BsDate?`                                   | `null`         | Pre-set range end        |
| `firstDate`        | `BsDate?`                                   | `null`         | Minimum allowed date     |
| `lastDate`         | `BsDate?`                                   | `null`         | Maximum allowed date     |
| `theme`            | `_NepaliPickerTheme`                        | `defaultTheme` | Color theme object       |
| `lang`             | `String`                                    | `'ne'`         | `'ne'` or `'en'`        |
| `onRangeSelected`  | `void Function(BsDate start, BsDate end)` | required       | Callback with range      |

---

## `NepaliDateConverter` Widget

A self-contained card widget for BS ↔ AD text conversion.

```dart
NepaliDateConverter(
  lang: 'ne',
  accentColor: Colors.indigo,
)
```

- Enter a BS date (e.g. `2080-01-15`) and press **रूपान्तरण गर्नुहोस्** to get the AD equivalent.
- Tap the swap button to reverse direction (AD → BS).
- Shows success in green and validation errors in red.

**Constructor Parameters**

| Parameter     | Type     | Default         | Description                     |
|--------------|----------|-----------------|---------------------------------|
| `lang`       | `String` | `'ne'`          | Language: `'ne'` or `'en'`     |
| `accentColor`| `Color?` | `Color(0xFF1565C0)` | Button and icon accent color |

---

## `BsCalendarEngine` API Reference

| Method | Signature | Description |
|--------|-----------|-------------|
| `today` | `static BsDate today()` | Returns today's date in BS |
| `bsToAd` | `static AdResult bsToAd(int year, int month, int day)` | Converts BS → AD |
| `adToBs` | `static BsDate adToBs(DateTime adDate)` | Converts AD → BS |
| `isValidBs` | `static bool isValidBs(int year, int month, int day)` | Validates a BS date |
| `daysInMonth` | `static int daysInMonth(int year, int month)` | Days in a BS month |
| `firstDayOfWeek` | `static int firstDayOfWeek(int year, int month)` | Weekday of 1st (0=Sun) |
| `daysDiff` | `static int daysDiff(BsDate a, BsDate b)` | Absolute day difference |
| `formatBs` | `static String formatBs(BsDate date, {String format, String lang})` | Format BS date |

### `BsDate` class

```dart
const BsDate({required int year, required int month, required int day});
BsDate copyWith({int? year, int? month, int? day});
// Operators: ==, <, <=, >, >=
// toString() → 'YYYY-MM-DD'
```

---

## Themes

| Theme Name | Primary Color | Background | Use Case |
|-----------|---------------|------------|----------|
| `default` | Blue `#1565C0` | White | Standard Material UI |
| `dark` | Light Blue `#90CAF9` | Dark `#121212` | Dark mode apps |
| `nepali` | Red `#D32F2F` | Warm white | Nepali-themed apps |
| `green` | Green `#2E7D32` | Light green | Nature / eco apps |

Pass the theme name as a string to `showNepaliDatePicker`:

```dart
showNepaliDatePicker(context, themeName: 'dark');
```

---

## Supported Date Range

| Calendar | From | To |
|---------|------|----|
| BS | 1970 Baisakh 1 | 2090 Chaitra 30 |
| AD | 1913 April 13 | ~2033 |

---

## License

MIT License

Copyright (c) 2024 Universal Sambat SDK Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
