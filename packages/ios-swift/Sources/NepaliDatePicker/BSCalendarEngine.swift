// BSCalendarEngine.swift — Pure Swift BS/AD conversion engine
// NepaliDatePicker Swift Package
// Base: BS 1970-01-01 = AD 1913-04-13

import Foundation

// MARK: - BSDate

/// A Bikram Sambat date value type.
public struct BSDate: Equatable, Hashable, Comparable, CustomStringConvertible {
    public let year: Int
    public let month: Int
    public let day: Int

    public init(year: Int, month: Int, day: Int) {
        self.year = year
        self.month = month
        self.day = day
    }

    /// ISO-style string: "YYYY-MM-DD"
    public var description: String {
        String(format: "%04d-%02d-%02d", year, month, day)
    }

    public static func < (lhs: BSDate, rhs: BSDate) -> Bool {
        if lhs.year != rhs.year { return lhs.year < rhs.year }
        if lhs.month != rhs.month { return lhs.month < rhs.month }
        return lhs.day < rhs.day
    }

    /// Returns a copy with optional field overrides.
    public func copyWith(year: Int? = nil, month: Int? = nil, day: Int? = nil) -> BSDate {
        BSDate(year: year ?? self.year, month: month ?? self.month, day: day ?? self.day)
    }
}

// MARK: - ADResult

/// Result of a BS → AD conversion.
public struct ADResult {
    public let year: Int
    public let month: Int
    public let day: Int
    /// The corresponding `Date` object at UTC midnight.
    public let date: Date

    public init(year: Int, month: Int, day: Int, date: Date) {
        self.year = year
        self.month = month
        self.day = day
        self.date = date
    }

    /// ISO-style string: "YYYY-MM-DD"
    public var description: String {
        String(format: "%04d-%02d-%02d", year, month, day)
    }
}

// MARK: - BSCalendarError

/// Errors thrown by `BSCalendarEngine`.
public enum BSCalendarError: Error, LocalizedError {
    case invalidDate(String)
    case dateOutOfRange
    case dateBeforeMinimum

    public var errorDescription: String? {
        switch self {
        case .invalidDate(let msg):
            return "Invalid BS date: \(msg)"
        case .dateOutOfRange:
            return "Date is outside the supported BS range (1970–2090)."
        case .dateBeforeMinimum:
            return "Date is before BS 1970 (AD 1913-04-13), which is the minimum supported date."
        }
    }
}

// MARK: - BSCalendarEngine

/// Pure-Swift engine for Bikram Sambat ↔ Gregorian calendar conversion.
public struct BSCalendarEngine {

    private init() {}

    // MARK: Public API

    /// Today's date in Bikram Sambat.
    public static func today() -> BSDate {
        try! adToBs(Date())
    }

    /// Converts a BS date to the corresponding AD `Date` (UTC midnight).
    ///
    /// - Parameters:
    ///   - year:  BS year (1970–2090)
    ///   - month: BS month (1–12)
    ///   - day:   BS day (1–days in that month)
    /// - Throws: `BSCalendarError` if the date is invalid or out of range.
    public static func bsToAd(year: Int, month: Int, day: Int) throws -> ADResult {
        guard isValid(year: year, month: month, day: day) else {
            throw BSCalendarError.invalidDate("\(year)-\(month)-\(day)")
        }

        var totalDays = 0
        for y in 1970..<year {
            guard let monthData = bsCalendarData[y] else {
                throw BSCalendarError.dateOutOfRange
            }
            totalDays += monthData.reduce(0, +)
        }
        guard let monthData = bsCalendarData[year] else {
            throw BSCalendarError.dateOutOfRange
        }
        for m in 0..<(month - 1) {
            totalDays += monthData[m]
        }
        totalDays += day - 1

        let adDate = Calendar(identifier: .gregorian).date(
            byAdding: .day, value: totalDays, to: baseAdDate
        )!
        let comps = Calendar(identifier: .gregorian).dateComponents(
            [.year, .month, .day], from: adDate
        )
        return ADResult(
            year: comps.year!,
            month: comps.month!,
            day: comps.day!,
            date: adDate
        )
    }

    /// Converts a Gregorian `Date` to a BS date.
    ///
    /// - Parameter date: Any `Date` value (time component is ignored).
    /// - Throws: `BSCalendarError` if the date is before BS 1970 or after BS 2090.
    public static func adToBs(_ date: Date) throws -> BSDate {
        let utcCalendar = Calendar(identifier: .gregorian)
        let baseComps = utcCalendar.dateComponents([.year, .month, .day], from: baseAdDate)
        let inputComps = utcCalendar.dateComponents([.year, .month, .day], from: date)

        // Normalise both to UTC midnight to avoid timezone drift
        let base = utcCalendar.date(from: baseComps)!
        let input = utcCalendar.date(from: inputComps)!

        let diff = utcCalendar.dateComponents([.day], from: base, to: input).day!
        guard diff >= 0 else {
            throw BSCalendarError.dateBeforeMinimum
        }

        var remaining = diff
        var bsYear = 1970
        while bsYear <= 2090 {
            guard let yearData = bsCalendarData[bsYear] else {
                throw BSCalendarError.dateOutOfRange
            }
            let daysInYear = yearData.reduce(0, +)
            if remaining < daysInYear { break }
            remaining -= daysInYear
            bsYear += 1
        }
        guard bsYear <= 2090, let monthData = bsCalendarData[bsYear] else {
            throw BSCalendarError.dateOutOfRange
        }

        var bsMonth = 1
        for m in 0..<12 {
            if remaining < monthData[m] {
                bsMonth = m + 1
                break
            }
            remaining -= monthData[m]
        }

        return BSDate(year: bsYear, month: bsMonth, day: remaining + 1)
    }

    /// Returns `true` if the given BS date exists in the lookup table.
    public static func isValid(year: Int, month: Int, day: Int) -> Bool {
        guard month >= 1, month <= 12, day >= 1 else { return false }
        guard let monthData = bsCalendarData[year] else { return false }
        return day <= monthData[month - 1]
    }

    /// Returns the absolute number of days between two BS dates.
    ///
    /// - Throws: `BSCalendarError` if either date is invalid.
    public static func daysDiff(_ a: BSDate, _ b: BSDate) throws -> Int {
        let adA = try bsToAd(year: a.year, month: a.month, day: a.day)
        let adB = try bsToAd(year: b.year, month: b.month, day: b.day)
        let diff = Calendar(identifier: .gregorian)
            .dateComponents([.day], from: adA.date, to: adB.date).day!
        return abs(diff)
    }

    /// Formats a `BSDate` using a simple template string.
    ///
    /// Supported tokens: `YYYY`, `MM`, `DD`, `MMMM`, `M`, `D`
    ///
    /// - Parameters:
    ///   - date:   The BS date to format.
    ///   - format: Template string (default `"YYYY-MM-DD"`).
    ///   - lang:   `"ne"` for Devanagari month names, `"en"` for English.
    public static func format(_ date: BSDate, format: String = "YYYY-MM-DD", lang: String = "ne") -> String {
        let monthNames = lang == "ne" ? bsMonthNamesNe : bsMonthNamesEn
        let mm = String(format: "%02d", date.month)
        let dd = String(format: "%02d", date.day)
        return format
            .replacingOccurrences(of: "YYYY", with: "\(date.year)")
            .replacingOccurrences(of: "MMMM", with: monthNames[date.month - 1])
            .replacingOccurrences(of: "MM", with: mm)
            .replacingOccurrences(of: "DD", with: dd)
            .replacingOccurrences(of: "M", with: "\(date.month)")
            .replacingOccurrences(of: "D", with: "\(date.day)")
    }

    /// Returns the number of days in the given BS month.
    ///
    /// Returns 30 as a safe fallback if the year is not in the lookup table.
    public static func daysInMonth(year: Int, month: Int) -> Int {
        bsCalendarData[year]?[month - 1] ?? 30
    }

    /// Returns the weekday (0 = Sunday … 6 = Saturday) of the 1st day of the given BS month.
    ///
    /// - Throws: `BSCalendarError` if the date is invalid.
    public static func firstDayOfWeek(year: Int, month: Int) throws -> Int {
        let ad = try bsToAd(year: year, month: month, day: 1)
        let weekday = Calendar(identifier: .gregorian).component(.weekday, from: ad.date)
        // weekday: 1=Sun, 2=Mon, ..., 7=Sat  →  0=Sun, 1=Mon, ..., 6=Sat
        return weekday - 1
    }
}
