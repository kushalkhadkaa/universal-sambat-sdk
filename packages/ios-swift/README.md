# NepaliDatePicker (iOS Swift)

A production-quality Swift package for the **Nepali Bikram Sambat (BS)** calendar system. Provides a full calendar engine, a UIKit date picker view, and a SwiftUI bridge — all with bilingual Nepali/English support and four built-in themes.

---

## Requirements

| Requirement | Minimum |
|------------|---------|
| iOS | 14.0+ |
| macOS | 11.0+ |
| Swift | 5.9+ |
| Xcode | 15.0+ |

---

## Installation (Swift Package Manager)

### In Xcode

1. Open your project in Xcode.
2. Go to **File → Add Package Dependencies…**
3. Enter the repository URL:
   ```
   https://github.com/your-org/nepali-datepicker-ios
   ```
4. Select **Up to Next Major Version** starting from `1.0.0`.
5. Add `NepaliDatePicker` to your app target.

### In `Package.swift`

```swift
dependencies: [
    .package(url: "https://github.com/your-org/nepali-datepicker-ios", from: "1.0.0")
],
targets: [
    .target(
        name: "YourApp",
        dependencies: ["NepaliDatePicker"]
    )
]
```

---

## UIKit Usage

### Basic Setup

```swift
import UIKit
import NepaliDatePicker

class ViewController: UIViewController, NepaliDatePickerDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()

        let picker = NepaliDatePickerView(theme: .defaultTheme, lang: "ne")
        picker.delegate = self
        picker.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(picker)

        NSLayoutConstraint.activate([
            picker.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            picker.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            picker.widthAnchor.constraint(equalToConstant: 340),
            picker.heightAnchor.constraint(equalToConstant: 360),
        ])
    }

    func datePicker(_ picker: NepaliDatePickerView, didSelect date: BSDate) {
        print("Selected: \(date)")                    // "2080-01-15"
        print("Formatted: \(date.formatted(lang: "ne"))") // "२०८०-०१-१५"
        if let ad = try? date.toAD() {
            print("AD: \(ad)")
        }
    }
}
```

### Configuring Constraints

```swift
let picker = NepaliDatePickerView(theme: .nepali, lang: "en")

// Restrict selectable range
picker.firstDate = BSDate(year: 2075, month: 1, day: 1)
picker.lastDate  = BSDate(year: 2085, month: 12, day: 30)

// Pre-select a date
picker.selectedDate = BSDate(year: 2080, month: 6, day: 15)
```

---

## SwiftUI Usage

### Inline Picker

```swift
import SwiftUI
import NepaliDatePicker

struct ContentView: View {
    @State private var selectedDate: BSDate? = .today

    var body: some View {
        VStack {
            NepaliDatePickerRepresentable(
                selection: $selectedDate,
                theme: .defaultTheme,
                lang: "ne"
            )
            .frame(height: 340)
            .padding()

            if let date = selectedDate {
                Text("Selected: \(date.description)")
                    .font(.title2)
            }
        }
    }
}
```

### Sheet Modifier

```swift
struct ContentView: View {
    @State private var showPicker = false
    @State private var selectedDate: BSDate? = nil

    var body: some View {
        Button("Pick a Nepali Date") {
            showPicker = true
        }
        .nepaliDatePicker(
            isPresented: $showPicker,
            selection: $selectedDate,
            firstDate: BSDate(year: 2070, month: 1, day: 1),
            lastDate: BSDate(year: 2090, month: 12, day: 30),
            theme: .green,
            lang: "en"
        )
    }
}
```

---

## `BSCalendarEngine` API Reference

| Method | Signature | Description |
|--------|-----------|-------------|
| `today` | `static func today() -> BSDate` | Today in BS |
| `bsToAd` | `static func bsToAd(year:month:day:) throws -> ADResult` | BS → AD conversion |
| `adToBs` | `static func adToBs(_ date: Date) throws -> BSDate` | AD → BS conversion |
| `isValid` | `static func isValid(year:month:day:) -> Bool` | Validate a BS date |
| `daysInMonth` | `static func daysInMonth(year:month:) -> Int` | Days in a BS month |
| `firstDayOfWeek` | `static func firstDayOfWeek(year:month:) throws -> Int` | Weekday of 1st (0=Sun) |
| `daysDiff` | `static func daysDiff(_:_:) throws -> Int` | Absolute day difference |
| `format` | `static func format(_:format:lang:) -> String` | Format BS date |

### `BSDate` Convenience Extensions

```swift
// Formatting
let str = date.formatted(format: "YYYY MMMM DD", lang: "ne")

// Conversion
let adDate: Date = try date.toAD()

// Today
let today: BSDate = .today

// Days in month
let days: Int = date.daysInMonth
```

### `Date` Extension

```swift
let bsDate = try Date().toBSDate()
```

---

## Theme Options

| Theme Case | Primary | Background | Best For |
|-----------|---------|------------|----------|
| `.defaultTheme` | Blue `#1565C0` | White | Standard iOS apps |
| `.dark` | Light Blue `#90CAF9` | Dark `#121212` | Dark mode |
| `.nepali` | Red `#D32F2F` | Warm white | Nepali-branded apps |
| `.green` | Green `#2E7D32` | Light green | Nature / finance apps |

---

## Supported Date Range

| Calendar | From | To |
|---------|------|----|
| BS | 1970 Baisakh 1 | 2090 Chaitra 30 |
| AD | 1913 April 13 | ~2033 |

---

## Error Handling

```swift
do {
    let ad = try BSCalendarEngine.bsToAd(year: 2080, month: 1, day: 1)
    print("AD: \(ad.year)-\(ad.month)-\(ad.day)")
} catch BSCalendarError.invalidDate(let msg) {
    print("Invalid: \(msg)")
} catch BSCalendarError.dateOutOfRange {
    print("Out of supported range (1970–2090)")
} catch BSCalendarError.dateBeforeMinimum {
    print("Date is before AD 1913-04-13")
}
```

---

## License

MIT License

Copyright (c) 2024 NepaliDatePicker Contributors

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
