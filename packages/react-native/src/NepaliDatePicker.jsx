import React, { useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const BRIDGE_HTML = require('./bridge.html');

/**
 * NepaliDatePicker — React Native component
 * @universal-sambat-sdk/react-native
 *
 * Usage:
 *   <NepaliDatePicker
 *     theme="ocean-blue"
 *     lang="ne"
 *     mode="single"
 *     onChange={(date) => console.log(date.formatted)}
 *     style={{ height: 360 }}
 *   />
 */
const NepaliDatePicker = forwardRef(function NepaliDatePicker(props, ref) {
  const {
    theme         = 'classic-dark',
    lang          = 'ne',
    mode          = 'single',
    onChange      = null,
    onRangeChange = null,
    onMonthChange = null,
    options       = {},
    style,
    ...rest
  } = props;

  const webviewRef = useRef(null);

  // Send a command to the bridge HTML
  const sendCmd = useCallback((cmd) => {
    if (!webviewRef.current) return;
    webviewRef.current.injectJavaScript(
      `(function(){window.dispatchEvent(new MessageEvent('message',{data:JSON.stringify(${JSON.stringify(cmd)})}));})();true;`
    );
  }, []);

  useImperativeHandle(ref, () => ({
    setTheme:   (t)    => sendCmd({ cmd: 'setTheme', theme: t }),
    setLang:    (l)    => sendCmd({ cmd: 'setLang',  lang:  l }),
    setDate:    (d)    => sendCmd({ cmd: 'setDate',  date:  d }),
    clear:      ()     => sendCmd({ cmd: 'clear' }),
    jumpTo:     (y, m) => sendCmd({ cmd: 'jumpTo', year: y, month: m }),
    setOptions: (o)    => sendCmd({ cmd: 'setOptions', options: o }),
  }));

  const handleMessage = useCallback((event) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      switch (msg.type) {
        case 'date-change':  onChange?.(msg.date);               break;
        case 'range-change': onRangeChange?.(msg.start, msg.end); break;
        case 'month-change': onMonthChange?.(msg.year, msg.month); break;
      }
    } catch { /* ignore */ }
  }, [onChange, onRangeChange, onMonthChange]);

  // Initial config injected into the page
  const injectedJS = `
    (function(){
      var cfg = ${JSON.stringify({ cmd: 'setOptions', options: { theme, lang, mode, ...options } })};
      window.dispatchEvent(new MessageEvent('message', { data: JSON.stringify(cfg) }));
    })(); true;
  `;

  return (
    <View style={[styles.container, style]} {...rest}>
      <WebView
        ref={webviewRef}
        source={BRIDGE_HTML}
        onMessage={handleMessage}
        injectedJavaScriptBeforeContentLoaded={injectedJS}
        scrollEnabled={false}
        bounces={false}
        overScrollMode="never"
        javaScriptEnabled
        originWhitelist={['*']}
        style={styles.webview}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: { width: '100%', height: 380 },
  webview:   { flex: 1, backgroundColor: 'transparent' },
});

export default NepaliDatePicker;
export { NepaliDatePicker };
