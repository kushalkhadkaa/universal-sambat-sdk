import 'package:flutter/material.dart';
import 'bs_calendar_engine.dart';
import 'bs_calendar_data.dart';

/// NepaliDateConverter — a bidirectional BS ↔ AD date converter widget.
///
/// Allows users to enter a date in BS or AD format and see the converted
/// equivalent. Supports bilingual labels (Nepali / English).
class NepaliDateConverter extends StatefulWidget {
  /// Language for labels and prompts: 'ne' (Nepali) or 'en' (English).
  final String lang;

  /// Accent color for the Convert button and action icons.
  final Color? accentColor;

  const NepaliDateConverter({
    super.key,
    this.lang = 'ne',
    this.accentColor,
  });

  @override
  State<NepaliDateConverter> createState() => _NepaliDateConverterState();
}

class _NepaliDateConverterState extends State<NepaliDateConverter> {
  final TextEditingController _bsController = TextEditingController();
  final TextEditingController _adController = TextEditingController();

  /// 'bs_to_ad' or 'ad_to_bs'
  String _mode = 'bs_to_ad';
  String _resultText = '';
  String _errorText = '';

  bool get _isNe => widget.lang == 'ne';
  Color get _accent => widget.accentColor ?? const Color(0xFF1565C0);

  @override
  void dispose() {
    _bsController.dispose();
    _adController.dispose();
    super.dispose();
  }

  void _convert() {
    setState(() {
      _resultText = '';
      _errorText = '';
    });

    if (_mode == 'bs_to_ad') {
      final raw = _bsController.text.trim();
      if (raw.isEmpty) {
        setState(() => _errorText = _isNe ? 'BS मिति खाली छ।' : 'BS date is empty.');
        return;
      }
      final parts = raw.split(RegExp(r'[-/.]'));
      if (parts.length != 3) {
        setState(() => _errorText = _isNe
            ? 'मान्य ढाँचा: YYYY-MM-DD (जस्तै: २०८०-०१-१५)'
            : 'Valid format: YYYY-MM-DD (e.g. 2080-01-15)');
        return;
      }
      final year = int.tryParse(parts[0]);
      final month = int.tryParse(parts[1]);
      final day = int.tryParse(parts[2]);
      if (year == null || month == null || day == null) {
        setState(() => _errorText = _isNe ? 'अंकहरू मात्र राख्नुहोस्।' : 'Use numeric digits only.');
        return;
      }
      if (!BsCalendarEngine.isValidBs(year, month, day)) {
        setState(() => _errorText = _isNe
            ? 'अमान्य BS मिति। सीमा: १९७०–२०९०।'
            : 'Invalid BS date. Supported range: 1970–2090.');
        return;
      }
      try {
        final ad = BsCalendarEngine.bsToAd(year, month, day);
        final adStr =
            '${ad.year}-${ad.month.toString().padLeft(2, '0')}-${ad.day.toString().padLeft(2, '0')}';
        setState(() {
          _adController.text = adStr;
          _resultText = _isNe
              ? 'BS $year-${month.toString().padLeft(2, '0')}-${day.toString().padLeft(2, '0')} → AD $adStr'
              : 'BS $year-${month.toString().padLeft(2, '0')}-${day.toString().padLeft(2, '0')} → AD $adStr';
        });
      } catch (e) {
        setState(() => _errorText = _isNe ? 'रूपान्तरण असफल।' : 'Conversion failed.');
      }
    } else {
      // ad_to_bs
      final raw = _adController.text.trim();
      if (raw.isEmpty) {
        setState(() => _errorText = _isNe ? 'AD मिति खाली छ।' : 'AD date is empty.');
        return;
      }
      final parts = raw.split(RegExp(r'[-/.]'));
      if (parts.length != 3) {
        setState(() => _errorText = _isNe
            ? 'मान्य ढाँचा: YYYY-MM-DD (जस्तै: 2023-04-29)'
            : 'Valid format: YYYY-MM-DD (e.g. 2023-04-29)');
        return;
      }
      final year = int.tryParse(parts[0]);
      final month = int.tryParse(parts[1]);
      final day = int.tryParse(parts[2]);
      if (year == null || month == null || day == null) {
        setState(() => _errorText = _isNe ? 'अंकहरू मात्र राख्नुहोस्।' : 'Use numeric digits only.');
        return;
      }
      if (month < 1 || month > 12 || day < 1 || day > 31) {
        setState(() => _errorText = _isNe ? 'अमान्य AD मिति।' : 'Invalid AD date.');
        return;
      }
      try {
        final adDate = DateTime(year, month, day);
        final bs = BsCalendarEngine.adToBs(adDate);
        final bsStr =
            '${bs.year}-${bs.month.toString().padLeft(2, '0')}-${bs.day.toString().padLeft(2, '0')}';
        final adStr = '$year-${month.toString().padLeft(2, '0')}-${day.toString().padLeft(2, '0')}';
        setState(() {
          _bsController.text = bsStr;
          _resultText = _isNe
              ? 'AD $adStr → BS $bsStr'
              : 'AD $adStr → BS $bsStr';
        });
      } catch (e) {
        setState(() => _errorText = _isNe
            ? 'रूपान्तरण असफल। मिति १९१३ भन्दा पहिले नराख्नुहोस्।'
            : 'Conversion failed. Date must be after 1913-04-13 AD.');
      }
    }
  }

  void _swap() {
    setState(() {
      _mode = _mode == 'bs_to_ad' ? 'ad_to_bs' : 'bs_to_ad';
      _resultText = '';
      _errorText = '';
    });
  }

  void _clear() {
    setState(() {
      _bsController.clear();
      _adController.clear();
      _resultText = '';
      _errorText = '';
    });
  }

  Widget _buildDirectionIndicator() {
    final String from = _mode == 'bs_to_ad'
        ? (_isNe ? 'BS → AD' : 'BS → AD')
        : (_isNe ? 'AD → BS' : 'AD → BS');
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: _accent.withOpacity(0.12),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        from,
        style: TextStyle(
          color: _accent,
          fontWeight: FontWeight.w600,
          fontSize: 13,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final titleText = _isNe ? 'मिति परिवर्तक' : 'Date Converter';
    final bsLabel = _isNe ? 'BS मिति (विक्रम सम्वत्)' : 'BS Date (Bikram Sambat)';
    final adLabel = _isNe ? 'AD मिति (ईस्वी सन्)' : 'AD Date (Gregorian)';
    final convertLabel = _isNe ? 'रूपान्तरण गर्नुहोस्' : 'Convert';
    final clearLabel = _isNe ? 'खाली गर्नुहोस्' : 'Clear';

    final bsHint = _mode == 'bs_to_ad' ? '२०८०-०१-१५' : '2080-01-15';
    final adHint = _mode == 'ad_to_bs' ? '2023-04-29' : '2023-04-29';

    final bool bsEditable = _mode == 'bs_to_ad';
    final bool adEditable = _mode == 'ad_to_bs';

    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Title row
            Row(
              children: [
                Icon(Icons.swap_horiz_rounded, color: _accent, size: 28),
                const SizedBox(width: 10),
                Text(
                  titleText,
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Direction badge
            Center(child: _buildDirectionIndicator()),
            const SizedBox(height: 16),

            // BS date field
            TextField(
              controller: _bsController,
              enabled: bsEditable,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                labelText: bsLabel,
                hintText: bsHint,
                prefixIcon: Icon(Icons.calendar_today, color: _accent),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                  borderSide: BorderSide(color: _accent, width: 2),
                ),
                filled: !bsEditable,
                fillColor: bsEditable ? null : Colors.grey.shade100,
              ),
            ),
            const SizedBox(height: 8),

            // Swap button in the middle
            Center(
              child: IconButton(
                icon: Icon(Icons.swap_vert, color: _accent, size: 28),
                tooltip: _isNe ? 'दिशा बदल्नुहोस्' : 'Swap direction',
                onPressed: _swap,
              ),
            ),
            const SizedBox(height: 8),

            // AD date field
            TextField(
              controller: _adController,
              enabled: adEditable,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                labelText: adLabel,
                hintText: adHint,
                prefixIcon: Icon(Icons.event, color: _accent),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                  borderSide: BorderSide(color: _accent, width: 2),
                ),
                filled: !adEditable,
                fillColor: adEditable ? null : Colors.grey.shade100,
              ),
            ),
            const SizedBox(height: 20),

            // Action buttons
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: _clear,
                    style: OutlinedButton.styleFrom(
                      foregroundColor: Colors.grey.shade600,
                      side: BorderSide(color: Colors.grey.shade400),
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                    child: Text(clearLabel),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  flex: 2,
                  child: ElevatedButton.icon(
                    onPressed: _convert,
                    icon: const Icon(Icons.compare_arrows),
                    label: Text(convertLabel),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: _accent,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Result display
            if (_resultText.isNotEmpty)
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.green.shade50,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: Colors.green.shade300),
                ),
                child: Row(
                  children: [
                    Icon(Icons.check_circle, color: Colors.green.shade600, size: 20),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Text(
                        _resultText,
                        style: TextStyle(
                          color: Colors.green.shade800,
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ],
                ),
              ),

            // Error display
            if (_errorText.isNotEmpty)
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.red.shade50,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: Colors.red.shade300),
                ),
                child: Row(
                  children: [
                    Icon(Icons.error_outline, color: Colors.red.shade600, size: 20),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Text(
                        _errorText,
                        style: TextStyle(
                          color: Colors.red.shade800,
                          fontSize: 14,
                        ),
                      ),
                    ),
                  ],
                ),
              ),

            // Supported range note
            const SizedBox(height: 12),
            Text(
              _isNe
                  ? 'समर्थित दायरा: BS १९७०–२०९० / AD 1913–2033'
                  : 'Supported range: BS 1970–2090 / AD 1913–2033',
              style: TextStyle(
                color: Colors.grey.shade500,
                fontSize: 11,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
