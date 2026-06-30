import React, { useRef } from 'react';
import {
  Modal, View, Text, TouchableOpacity, StyleSheet,
  Dimensions, TouchableWithoutFeedback, Platform,
} from 'react-native';
import { NepaliDatePicker } from './NepaliDatePicker';

const { height: SCREEN_H } = Dimensions.get('window');
const PANEL_H = 420;

/**
 * NepaliDatePickerModal — bottom-sheet modal variant
 *
 * Usage:
 *   <NepaliDatePickerModal
 *     visible={show}
 *     onClose={() => setShow(false)}
 *     onChange={(date) => setDate(date.formatted)}
 *     theme="ocean-blue"
 *     lang="ne"
 *   />
 */
export function NepaliDatePickerModal({
  visible       = false,
  onClose       = null,
  onChange      = null,
  onRangeChange = null,
  theme         = 'classic-dark',
  lang          = 'ne',
  mode          = 'single',
  options       = {},
  title         = '',
}) {
  const pickerRef = useRef(null);

  const handleChange = (date) => {
    onChange?.(date);
    if (mode === 'single') onClose?.();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.sheet}>
        {/* Handle bar */}
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title || (lang === 'ne' ? 'मिति छान्नुहोस्' : 'Select Date')}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Picker */}
        <NepaliDatePicker
          ref={pickerRef}
          theme={theme}
          lang={lang}
          mode={mode}
          onChange={handleChange}
          onRangeChange={onRangeChange}
          options={options}
          style={styles.picker}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: PANEL_H,
    backgroundColor: '#0f172a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    overflow: 'hidden',
  },
  handle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: '#475569',
    alignSelf: 'center', marginTop: 10, marginBottom: 4,
  },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 8,
  },
  headerTitle: { color: '#f8fafc', fontSize: 16, fontWeight: '600' },
  closeBtn:     { padding: 4 },
  closeBtnText: { color: '#94a3b8', fontSize: 18, fontWeight: '500' },
  picker:       { flex: 1 },
});

export default NepaliDatePickerModal;
