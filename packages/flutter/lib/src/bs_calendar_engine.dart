import 'bs_calendar_data.dart';

class BsDate {
  final int year;
  final int month;
  final int day;

  const BsDate({required this.year, required this.month, required this.day});

  BsDate copyWith({int? year, int? month, int? day}) =>
      BsDate(year: year ?? this.year, month: month ?? this.month, day: day ?? this.day);

  @override
  String toString() =>
      '$year-${month.toString().padLeft(2, '0')}-${day.toString().padLeft(2, '0')}';

  @override
  bool operator ==(Object other) =>
      other is BsDate && year == other.year && month == other.month && day == other.day;

  @override
  int get hashCode => Object.hash(year, month, day);

  bool operator <(BsDate other) {
    if (year != other.year) return year < other.year;
    if (month != other.month) return month < other.month;
    return day < other.day;
  }

  bool operator <=(BsDate other) => this == other || this < other;
  bool operator >(BsDate other) => !(this <= other);
  bool operator >=(BsDate other) => !(this < other);
}

class AdResult {
  final int year;
  final int month;
  final int day;
  final DateTime dateTime;

  const AdResult({
    required this.year,
    required this.month,
    required this.day,
    required this.dateTime,
  });
}

class BsCalendarEngine {
  BsCalendarEngine._();

  static BsDate today() => adToBs(DateTime.now());

  static AdResult bsToAd(int year, int month, int day) {
    if (!isValidBs(year, month, day)) {
      throw ArgumentError('Invalid BS date: $year-$month-$day');
    }
    int totalDays = 0;
    for (int y = 1970; y < year; y++) {
      final months = bsCalendarData[y]!;
      for (int m = 0; m < 12; m++) {
        totalDays += months[m];
      }
    }
    final months = bsCalendarData[year]!;
    for (int m = 0; m < month - 1; m++) {
      totalDays += months[m];
    }
    totalDays += day - 1;
    final adDate = baseAdDate.add(Duration(days: totalDays));
    return AdResult(
      year: adDate.year,
      month: adDate.month,
      day: adDate.day,
      dateTime: adDate,
    );
  }

  static BsDate adToBs(DateTime adDate) {
    final base = DateTime(baseAdDate.year, baseAdDate.month, baseAdDate.day);
    final normalized = DateTime(adDate.year, adDate.month, adDate.day);
    int remainingDays = normalized.difference(base).inDays;
    if (remainingDays < 0) {
      throw ArgumentError('Date before BS 1970 is not supported.');
    }

    int bsYear = 1970;
    while (bsYear <= 2090) {
      final yearData = bsCalendarData[bsYear];
      if (yearData == null) break;
      int daysInYear = yearData.fold(0, (a, b) => a + b);
      if (remainingDays < daysInYear) break;
      remainingDays -= daysInYear;
      bsYear++;
    }

    final monthData = bsCalendarData[bsYear]!;
    int bsMonth = 1;
    for (int m = 0; m < 12; m++) {
      if (remainingDays < monthData[m]) {
        bsMonth = m + 1;
        break;
      }
      remainingDays -= monthData[m];
    }

    return BsDate(year: bsYear, month: bsMonth, day: remainingDays + 1);
  }

  static String formatBs(BsDate date, {String format = 'YYYY-MM-DD', String lang = 'ne'}) {
    final monthNames = lang == 'ne' ? bsMonthNamesNe : bsMonthNamesEn;
    return format
        .replaceAll('YYYY', date.year.toString())
        .replaceAll('MMMM', monthNames[date.month - 1])
        .replaceAll('MM', date.month.toString().padLeft(2, '0'))
        .replaceAll('DD', date.day.toString().padLeft(2, '0'))
        .replaceAll('M', date.month.toString())
        .replaceAll('D', date.day.toString());
  }

  static bool isValidBs(int year, int month, int day) {
    if (month < 1 || month > 12) return false;
    if (day < 1) return false;
    final yearData = bsCalendarData[year];
    if (yearData == null) return false;
    return day <= yearData[month - 1];
  }

  static int daysDiff(BsDate a, BsDate b) {
    final adA = bsToAd(a.year, a.month, a.day);
    final adB = bsToAd(b.year, b.month, b.day);
    return adB.dateTime.difference(adA.dateTime).inDays.abs();
  }

  static int daysInMonth(int year, int month) {
    return bsCalendarData[year]?[month - 1] ?? 30;
  }

  static int firstDayOfWeek(int year, int month) {
    final adResult = bsToAd(year, month, 1);
    return adResult.dateTime.weekday % 7; // 0=Sun, 1=Mon, ..., 6=Sat
  }
}
