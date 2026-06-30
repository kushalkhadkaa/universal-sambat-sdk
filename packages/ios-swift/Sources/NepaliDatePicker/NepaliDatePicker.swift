// NepaliDatePicker - Nepali (Bikram Sambat) calendar for iOS
// Version 1.0.0

import Foundation

public let NepaliDatePickerVersion = "1.0.0"

public extension BSDate {
    /// Returns a formatted string for this date.
    ///
    /// - Parameters:
    ///   - format: Format template. Supported tokens: `YYYY`, `MM`, `DD`, `MMMM`, `M`, `D`.
    ///   - lang:   `"ne"` for Devanagari month names, `"en"` for English.
    func formatted(format: String = "YYYY-MM-DD", lang: String = "ne") -> String {
        return BSCalendarEngine.format(self, format: format, lang: lang)
    }

    /// Converts this BS date to a Gregorian `Date` (UTC midnight).
    ///
    /// - Throws: `BSCalendarError` if the date is invalid.
    func toAD() throws -> Date {
        let result = try BSCalendarEngine.bsToAd(year: year, month: month, day: day)
        return result.date
    }

    /// Today's date in Bikram Sambat.
    static var today: BSDate {
        return BSCalendarEngine.today()
    }

    /// The number of days in this date's month.
    var daysInMonth: Int {
        return BSCalendarEngine.daysInMonth(year: year, month: month)
    }
}

public extension Date {
    /// Converts this Gregorian date to a Bikram Sambat `BSDate`.
    ///
    /// - Throws: `BSCalendarError.dateBeforeMinimum` if the date is before AD 1913-04-13.
    func toBSDate() throws -> BSDate {
        return try BSCalendarEngine.adToBs(self)
    }
}
