import 'package:flutter/material.dart';
import 'bs_calendar_data.dart';
import 'bs_calendar_engine.dart';

// ---------------------------------------------------------------------------
// Theme
// ---------------------------------------------------------------------------

class _NepaliPickerTheme {
  final Color primaryColor;
  final Color backgroundColor;
  final Color surfaceColor;
  final Color onPrimaryColor;
  final Color textColor;
  final Color subtleTextColor;
  final Color todayColor;
  final Color rangeColor;

  const _NepaliPickerTheme({
    required this.primaryColor,
    required this.backgroundColor,
    required this.surfaceColor,
    required this.onPrimaryColor,
    required this.textColor,
    required this.subtleTextColor,
    required this.todayColor,
    required this.rangeColor,
  });

  static const _NepaliPickerTheme defaultTheme = _NepaliPickerTheme(
    primaryColor: Color(0xFF1565C0),
    backgroundColor: Color(0xFFFFFFFF),
    surfaceColor: Color(0xFFF5F5F5),
    onPrimaryColor: Color(0xFFFFFFFF),
    textColor: Color(0xFF212121),
    subtleTextColor: Color(0xFF9E9E9E),
    todayColor: Color(0xFF42A5F5),
    rangeColor: Color(0xFFBBDEFB),
  );

  static const _NepaliPickerTheme darkTheme = _NepaliPickerTheme(
    primaryColor: Color(0xFF90CAF9),
    backgroundColor: Color(0xFF121212),
    surfaceColor: Color(0xFF1E1E1E),
    onPrimaryColor: Color(0xFF000000),
    textColor: Color(0xFFEEEEEE),
    subtleTextColor: Color(0xFF757575),
    todayColor: Color(0xFF64B5F6),
    rangeColor: Color(0xFF1A3A5C),
  );

  static const _NepaliPickerTheme nepaliTheme = _NepaliPickerTheme(
    primaryColor: Color(0xFFD32F2F),
    backgroundColor: Color(0xFFFFF8F8),
    surfaceColor: Color(0xFFFFEBEE),
    onPrimaryColor: Color(0xFFFFFFFF),
    textColor: Color(0xFF1A1A1A),
    subtleTextColor: Color(0xFFBDBDBD),
    todayColor: Color(0xFFEF5350),
    rangeColor: Color(0xFFFFCDD2),
  );

  static const _NepaliPickerTheme greenTheme = _NepaliPickerTheme(
    primaryColor: Color(0xFF2E7D32),
    backgroundColor: Color(0xFFF1F8E9),
    surfaceColor: Color(0xFFDCEDC8),
    onPrimaryColor: Color(0xFFFFFFFF),
    textColor: Color(0xFF1B1B1B),
    subtleTextColor: Color(0xFFAED581),
    todayColor: Color(0xFF66BB6A),
    rangeColor: Color(0xFFC8E6C9),
  );
}

// ---------------------------------------------------------------------------
// Show helper
// ---------------------------------------------------------------------------

Future<BsDate?> showNepaliDatePicker(
  BuildContext context, {
  BsDate? initialDate,
  BsDate? firstDate,
  BsDate? lastDate,
  String themeName = 'default',
  String lang = 'ne',
}) async {
  final _NepaliPickerTheme theme;
  switch (themeName) {
    case 'dark':
      theme = _NepaliPickerTheme.darkTheme;
      break;
    case 'nepali':
      theme = _NepaliPickerTheme.nepaliTheme;
      break;
    case 'green':
      theme = _NepaliPickerTheme.greenTheme;
      break;
    default:
      theme = _NepaliPickerTheme.defaultTheme;
  }

  return showDialog<BsDate>(
    context: context,
    barrierDismissible: true,
    builder: (ctx) => Dialog(
      backgroundColor: theme.backgroundColor,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: NepaliDatePicker(
          initialDate: initialDate,
          firstDate: firstDate,
          lastDate: lastDate,
          theme: theme,
          lang: lang,
          onDateSelected: (date) => Navigator.of(ctx).pop(date),
        ),
      ),
    ),
  );
}

// ---------------------------------------------------------------------------
// NepaliDatePicker — single date
// ---------------------------------------------------------------------------

class NepaliDatePicker extends StatefulWidget {
  final BsDate? initialDate;
  final BsDate? firstDate;
  final BsDate? lastDate;
  final _NepaliPickerTheme theme;
  final String lang;
  final ValueChanged<BsDate> onDateSelected;

  const NepaliDatePicker({
    super.key,
    this.initialDate,
    this.firstDate,
    this.lastDate,
    this.theme = _NepaliPickerTheme.defaultTheme,
    this.lang = 'ne',
    required this.onDateSelected,
  });

  @override
  State<NepaliDatePicker> createState() => _NepaliDatePickerState();
}

class _NepaliDatePickerState extends State<NepaliDatePicker> {
  late int displayYear;
  late int displayMonth;
  BsDate? selectedDate;

  @override
  void initState() {
    super.initState();
    final initial = widget.initialDate ?? BsCalendarEngine.today();
    displayYear = initial.year;
    displayMonth = initial.month;
    selectedDate = widget.initialDate;
  }

  List<String> get _weekdays =>
      widget.lang == 'ne' ? weekdaysNe : weekdaysEn;

  List<String> get _monthNames =>
      widget.lang == 'ne' ? bsMonthNamesNe : bsMonthNamesEn;

  bool _isDisabled(BsDate date) {
    if (widget.firstDate != null && date < widget.firstDate!) return true;
    if (widget.lastDate != null && date > widget.lastDate!) return true;
    return false;
  }

  void _prevMonth() {
    setState(() {
      if (displayMonth == 1) {
        displayMonth = 12;
        displayYear--;
      } else {
        displayMonth--;
      }
    });
  }

  void _nextMonth() {
    setState(() {
      if (displayMonth == 12) {
        displayMonth = 1;
        displayYear++;
      } else {
        displayMonth++;
      }
    });
  }

  Future<void> _showYearMonthPicker() async {
    final theme = widget.theme;
    int tempYear = displayYear;
    int tempMonth = displayMonth;

    final FixedExtentScrollController yearCtrl =
        FixedExtentScrollController(initialItem: displayYear - 1970);
    final FixedExtentScrollController monthCtrl =
        FixedExtentScrollController(initialItem: displayMonth - 1);

    await showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: theme.backgroundColor,
        title: Text(
          widget.lang == 'ne' ? 'वर्ष र महिना' : 'Year & Month',
          style: TextStyle(color: theme.textColor),
        ),
        content: SizedBox(
          height: 200,
          child: Row(
            children: [
              // Year picker
              Expanded(
                child: ListWheelScrollView.useDelegate(
                  controller: yearCtrl,
                  itemExtent: 40,
                  physics: const FixedExtentScrollPhysics(),
                  onSelectedItemChanged: (i) => tempYear = 1970 + i,
                  childDelegate: ListWheelChildBuilderDelegate(
                    childCount: 2090 - 1970 + 1,
                    builder: (ctx, i) {
                      final y = 1970 + i;
                      return Center(
                        child: Text(
                          '$y',
                          style: TextStyle(
                            color: theme.textColor,
                            fontSize: 16,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ),
              // Month picker
              Expanded(
                child: ListWheelScrollView.useDelegate(
                  controller: monthCtrl,
                  itemExtent: 40,
                  physics: const FixedExtentScrollPhysics(),
                  onSelectedItemChanged: (i) => tempMonth = i + 1,
                  childDelegate: ListWheelChildBuilderDelegate(
                    childCount: 12,
                    builder: (ctx, i) => Center(
                      child: Text(
                        _monthNames[i],
                        style: TextStyle(color: theme.textColor, fontSize: 14),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: Text(widget.lang == 'ne' ? 'रद्द' : 'Cancel',
                style: TextStyle(color: theme.subtleTextColor)),
          ),
          TextButton(
            onPressed: () {
              setState(() {
                displayYear = tempYear;
                displayMonth = tempMonth;
              });
              Navigator.pop(ctx);
            },
            child: Text(widget.lang == 'ne' ? 'ठीक छ' : 'OK',
                style: TextStyle(color: theme.primaryColor)),
          ),
        ],
      ),
    );
    yearCtrl.dispose();
    monthCtrl.dispose();
  }

  Widget _buildHeader() {
    final theme = widget.theme;
    final label = '${_monthNames[displayMonth - 1]} $displayYear';
    return Row(
      children: [
        IconButton(
          icon: Icon(Icons.chevron_left, color: theme.textColor),
          onPressed: _prevMonth,
        ),
        Expanded(
          child: GestureDetector(
            onTap: _showYearMonthPicker,
            child: Center(
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    label,
                    style: TextStyle(
                      color: theme.textColor,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(width: 4),
                  Icon(Icons.arrow_drop_down, color: theme.primaryColor, size: 20),
                ],
              ),
            ),
          ),
        ),
        IconButton(
          icon: Icon(Icons.chevron_right, color: theme.textColor),
          onPressed: _nextMonth,
        ),
      ],
    );
  }

  Widget _buildWeekdayRow() {
    final theme = widget.theme;
    return Row(
      children: _weekdays.map((d) {
        return Expanded(
          child: Center(
            child: Text(
              d,
              style: TextStyle(
                color: theme.subtleTextColor,
                fontSize: 12,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildDayCell(
    int day,
    bool isCurrentMonth,
    bool isSelected,
    bool isToday,
    bool isDisabled,
  ) {
    final theme = widget.theme;

    Color bg = Colors.transparent;
    Color textColor = isCurrentMonth ? theme.textColor : theme.subtleTextColor;

    if (isSelected) {
      bg = theme.primaryColor;
      textColor = theme.onPrimaryColor;
    } else if (isToday) {
      bg = theme.todayColor.withOpacity(0.2);
      textColor = theme.todayColor;
    }

    if (isDisabled) {
      textColor = theme.subtleTextColor.withOpacity(0.4);
    }

    return GestureDetector(
      onTap: (isCurrentMonth && !isDisabled)
          ? () {
              final date = BsDate(year: displayYear, month: displayMonth, day: day);
              setState(() => selectedDate = date);
              widget.onDateSelected(date);
            }
          : null,
      child: Container(
        margin: const EdgeInsets.all(2),
        decoration: BoxDecoration(
          color: bg,
          shape: BoxShape.circle,
          border: isToday && !isSelected
              ? Border.all(color: theme.todayColor, width: 1.5)
              : null,
        ),
        child: Center(
          child: isCurrentMonth
              ? Text(
                  '$day',
                  style: TextStyle(
                    color: textColor,
                    fontSize: 13,
                    fontWeight: isSelected || isToday ? FontWeight.bold : FontWeight.normal,
                  ),
                )
              : const SizedBox.shrink(),
        ),
      ),
    );
  }

  Widget _buildCalendarGrid() {
    final theme = widget.theme;
    final firstWeekday = BsCalendarEngine.firstDayOfWeek(displayYear, displayMonth);
    final daysInMonth = BsCalendarEngine.daysInMonth(displayYear, displayMonth);
    final today = BsCalendarEngine.today();

    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: 42,
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 7,
        childAspectRatio: 1,
      ),
      itemBuilder: (context, index) {
        final dayNumber = index - firstWeekday + 1;
        if (dayNumber < 1 || dayNumber > daysInMonth) {
          return Container(color: theme.backgroundColor);
        }
        final date = BsDate(year: displayYear, month: displayMonth, day: dayNumber);
        final isSelected = selectedDate == date;
        final isToday =
            today.year == displayYear && today.month == displayMonth && today.day == dayNumber;
        final isDisabled = _isDisabled(date);

        return _buildDayCell(dayNumber, true, isSelected, isToday, isDisabled);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = widget.theme;
    return Container(
      width: 320,
      decoration: BoxDecoration(
        color: theme.backgroundColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildHeader(),
          const SizedBox(height: 4),
          _buildWeekdayRow(),
          const SizedBox(height: 4),
          _buildCalendarGrid(),
          const SizedBox(height: 8),
        ],
      ),
    );
  }
}

// ---------------------------------------------------------------------------
// NepaliDateRangePicker — range selection
// ---------------------------------------------------------------------------

class NepaliDateRangePicker extends StatefulWidget {
  final BsDate? firstDate;
  final BsDate? lastDate;
  final BsDate? initialStartDate;
  final BsDate? initialEndDate;
  final _NepaliPickerTheme theme;
  final String lang;
  final void Function(BsDate start, BsDate end) onRangeSelected;

  const NepaliDateRangePicker({
    super.key,
    this.firstDate,
    this.lastDate,
    this.initialStartDate,
    this.initialEndDate,
    this.theme = _NepaliPickerTheme.defaultTheme,
    this.lang = 'ne',
    required this.onRangeSelected,
  });

  @override
  State<NepaliDateRangePicker> createState() => _NepaliDateRangePickerState();
}

class _NepaliDateRangePickerState extends State<NepaliDateRangePicker> {
  late int displayYear;
  late int displayMonth;
  BsDate? rangeStart;
  BsDate? rangeEnd;

  @override
  void initState() {
    super.initState();
    final initial = widget.initialStartDate ?? BsCalendarEngine.today();
    displayYear = initial.year;
    displayMonth = initial.month;
    rangeStart = widget.initialStartDate;
    rangeEnd = widget.initialEndDate;
  }

  List<String> get _weekdays =>
      widget.lang == 'ne' ? weekdaysNe : weekdaysEn;

  List<String> get _monthNames =>
      widget.lang == 'ne' ? bsMonthNamesNe : bsMonthNamesEn;

  void _prevMonth() {
    setState(() {
      if (displayMonth == 1) {
        displayMonth = 12;
        displayYear--;
      } else {
        displayMonth--;
      }
    });
  }

  void _nextMonth() {
    setState(() {
      if (displayMonth == 12) {
        displayMonth = 1;
        displayYear++;
      } else {
        displayMonth++;
      }
    });
  }

  bool _isDisabled(BsDate date) {
    if (widget.firstDate != null && date < widget.firstDate!) return true;
    if (widget.lastDate != null && date > widget.lastDate!) return true;
    return false;
  }

  bool _inRange(BsDate date) {
    if (rangeStart == null || rangeEnd == null) return false;
    return date > rangeStart! && date < rangeEnd!;
  }

  void _onDayTap(BsDate date) {
    setState(() {
      if (rangeStart == null || (rangeStart != null && rangeEnd != null)) {
        rangeStart = date;
        rangeEnd = null;
      } else if (date < rangeStart!) {
        rangeEnd = rangeStart;
        rangeStart = date;
      } else {
        rangeEnd = date;
        widget.onRangeSelected(rangeStart!, rangeEnd!);
      }
    });
  }

  Widget _buildHeader() {
    final theme = widget.theme;
    final label = '${_monthNames[displayMonth - 1]} $displayYear';
    return Row(
      children: [
        IconButton(
          icon: Icon(Icons.chevron_left, color: theme.textColor),
          onPressed: _prevMonth,
        ),
        Expanded(
          child: Center(
            child: Text(
              label,
              style: TextStyle(
                color: theme.textColor,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
        IconButton(
          icon: Icon(Icons.chevron_right, color: theme.textColor),
          onPressed: _nextMonth,
        ),
      ],
    );
  }

  Widget _buildWeekdayRow() {
    final theme = widget.theme;
    return Row(
      children: _weekdays.map((d) {
        return Expanded(
          child: Center(
            child: Text(
              d,
              style: TextStyle(
                color: theme.subtleTextColor,
                fontSize: 12,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildCalendarGrid() {
    final theme = widget.theme;
    final firstWeekday = BsCalendarEngine.firstDayOfWeek(displayYear, displayMonth);
    final daysInMonth = BsCalendarEngine.daysInMonth(displayYear, displayMonth);
    final today = BsCalendarEngine.today();

    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: 42,
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 7,
        childAspectRatio: 1,
      ),
      itemBuilder: (context, index) {
        final dayNumber = index - firstWeekday + 1;
        if (dayNumber < 1 || dayNumber > daysInMonth) {
          return Container(color: theme.backgroundColor);
        }

        final date = BsDate(year: displayYear, month: displayMonth, day: dayNumber);
        final isStart = rangeStart == date;
        final isEnd = rangeEnd == date;
        final isInRange = _inRange(date);
        final isToday =
            today.year == displayYear && today.month == displayMonth && today.day == dayNumber;
        final isDisabled = _isDisabled(date);

        Color bg = Colors.transparent;
        Color textColor = theme.textColor;
        BorderRadius? radius;

        if (isStart || isEnd) {
          bg = theme.primaryColor;
          textColor = theme.onPrimaryColor;
        } else if (isInRange) {
          bg = theme.rangeColor;
          textColor = theme.textColor;
        } else if (isToday) {
          bg = theme.todayColor.withOpacity(0.2);
          textColor = theme.todayColor;
        }

        if (isDisabled) {
          textColor = theme.subtleTextColor.withOpacity(0.4);
        }

        if (isStart && rangeEnd != null) {
          radius = const BorderRadius.horizontal(left: Radius.circular(20));
        } else if (isEnd) {
          radius = const BorderRadius.horizontal(right: Radius.circular(20));
        }

        return GestureDetector(
          onTap: isDisabled ? null : () => _onDayTap(date),
          child: Container(
            margin: isInRange ? EdgeInsets.zero : const EdgeInsets.all(2),
            decoration: isInRange
                ? BoxDecoration(color: bg)
                : BoxDecoration(
                    color: bg,
                    borderRadius: radius ?? BorderRadius.circular(20),
                    border: isToday && !isStart && !isEnd
                        ? Border.all(color: theme.todayColor, width: 1.5)
                        : null,
                  ),
            child: Center(
              child: Text(
                '$dayNumber',
                style: TextStyle(
                  color: textColor,
                  fontSize: 13,
                  fontWeight: isStart || isEnd ? FontWeight.bold : FontWeight.normal,
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = widget.theme;
    final label = widget.lang == 'ne' ? 'मिति दायरा चयन गर्नुहोस्' : 'Select Date Range';
    final startLabel = rangeStart != null
        ? rangeStart.toString()
        : (widget.lang == 'ne' ? 'सुरु मिति' : 'Start date');
    final endLabel = rangeEnd != null
        ? rangeEnd.toString()
        : (widget.lang == 'ne' ? 'अन्त्य मिति' : 'End date');

    return Container(
      width: 340,
      decoration: BoxDecoration(
        color: theme.backgroundColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: TextStyle(
                    color: theme.subtleTextColor,
                    fontSize: 12,
                  ),
                ),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(
                          color: theme.surfaceColor,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          startLabel,
                          style: TextStyle(color: theme.textColor, fontSize: 13),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 8),
                      child: Icon(Icons.arrow_forward, size: 16, color: theme.subtleTextColor),
                    ),
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(
                          color: theme.surfaceColor,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          endLabel,
                          style: TextStyle(color: theme.textColor, fontSize: 13),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),
          _buildHeader(),
          _buildWeekdayRow(),
          const SizedBox(height: 4),
          _buildCalendarGrid(),
          const SizedBox(height: 12),
        ],
      ),
    );
  }
}
