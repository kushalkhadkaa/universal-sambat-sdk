import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

/**
 * React Native Bridge Component for Nepali DatePicker Studio
 * Embeds mobile-webview.html inside a native WebView container
 * to allow direct date picking on Android and iOS devices.
 */
export const NepaliDatePicker = ({
  theme = 'glassmorphism',
  lang = 'ne',
  mode = 'single',
  light = false,
  onChange = () => {},
  onRangeChange = () => {},
  style = {},
  // Optional custom webview source URL override
  webviewSource = 'https://cdn.jsdelivr.net/npm/nepali-datepicker-studio/dist/mobile-webview.html'
}) => {
  
  // Format query params dynamically
  const url = `${webviewSource}?theme=${theme}&lang=${lang}&mode=${mode}&light=${light}`;

  const handleMessage = (event) => {
    try {
      const payload = JSON.parse(event.nativeEvent.data);
      if (payload.event === 'change') {
        onChange(payload.data);
      } else if (payload.event === 'rangeChange') {
        onRangeChange(payload.data.start, payload.data.end);
      }
    } catch (error) {
      console.warn('NepaliDatePicker: Failed to parse WebView message payload', error);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <WebView
        source={{ uri: url }}
        onMessage={handleMessage}
        scrollEnabled={false}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowUniversalAccessFromFileURLs={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 380,
    width: '100%',
    backgroundColor: 'transparent'
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});

export default NepaliDatePicker;
