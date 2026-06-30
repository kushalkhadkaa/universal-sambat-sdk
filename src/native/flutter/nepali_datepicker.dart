import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

/// Callback signatures for date selection events
typedef OnDateChanged = void Function(Map<String, dynamic> date);
typedef OnRangeChanged = void Function(Map<String, dynamic> start, Map<String, dynamic> end);

/// Flutter Widget Bridge for Nepali DatePicker Studio
/// Embeds inline BS date picking natively on iOS and Android.
class NepaliDatePickerWidget extends StatefulWidget {
  final String theme;
  final String lang;
  final String mode;
  final bool light;
  final OnDateChanged? onChange;
  final OnRangeChanged? onRangeChange;
  final String webviewSource;

  const NepaliDatePickerWidget({
    Key? key,
    this.theme = 'glassmorphism',
    this.lang = 'ne',
    this.mode = 'single',
    this.light = false,
    this.onChange,
    this.onRangeChange,
    this.webviewSource = 'https://cdn.jsdelivr.net/npm/nepali-datepicker-studio/dist/mobile-webview.html',
  }) : super(key: key);

  @override
  _NepaliDatePickerWidgetState createState() => _NepaliDatePickerWidgetState();
}

class _NepaliDatePickerWidgetState extends State<NepaliDatePickerWidget> {
  late final WebViewController _controller;

  @override
  void initState() {
    super.initState();
    
    // Parse values dynamically into query string parameters
    final String url = '${widget.webviewSource}'
        '?theme=${widget.theme}'
        '&lang=${widget.lang}'
        '&mode=${widget.mode}'
        '&light=${widget.light}';

    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(Colors.transparent)
      ..addJavaScriptChannel(
        'FlutterDatePicker',
        onMessageReceived: (JavaScriptMessage message) {
          try {
            final payload = jsonDecode(message.message);
            if (payload['event'] == 'change' && widget.onChange != null) {
              widget.onChange!(payload['data']);
            } else if (payload['event'] == 'rangeChange' && widget.onRangeChange != null) {
              widget.onRangeChange!(
                payload['data']['start'] ?? {},
                payload['data']['end'] ?? {},
              );
            }
          } catch (e) {
            debugPrint('NepaliDatePicker: Failed to parse native payload: $e');
          }
        },
      )
      ..loadRequest(Uri.parse(url));
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 380.0,
      width: double.infinity,
      child: WebViewWidget(controller: _controller),
    );
  }
}
