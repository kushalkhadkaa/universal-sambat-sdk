# Cross-Platform Integration Guide (All Stacks)

This guide documents the implementation strategy to integrate **Universal Sambat SDK** across major web, mobile, and backend technologies: **React, Node.js, Angular, Vue, Svelte, iOS (Swift), Android (Kotlin), React Native, and Flutter**.

---

## 1. Web Frameworks (Frontend)

### React / Next.js
Use the pre-built React component wrapper that hooks into the vanilla module.
* **Component**: `src/react/NepaliDatePicker.jsx`
* **Implementation**:
```jsx
import React, { useState } from 'react';
import { NepaliDatePicker } from '@universal-sambat-sdk/react';
import 'universal-sambat-sdk/css';

export default function BookingForm() {
  const [date, setDate] = useState('');
  return (
    <NepaliDatePicker
      options={{ theme: 'ocean-blue', lang: 'ne', closeOnSelect: true }}
      value={date}
      onChange={(selected) => setDate(selected.formatted)}
    />
  );
}
```

---

### Angular (v14+)
Create an Angular directive that links the native calendar to an input element.
```typescript
import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
declare const NepaliDatePicker: any;

@Directive({
  selector: '[nepaliDatePicker]'
})
export class NepaliDatePickerDirective implements OnInit, OnDestroy {
  @Input() options: any = {};
  private pickerInstance: any;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (typeof NepaliDatePicker !== 'undefined') {
      this.pickerInstance = new NepaliDatePicker(this.el.nativeElement, this.options);
    }
  }

  ngOnDestroy() {
    if (this.pickerInstance) {
      this.pickerInstance.destroy();
    }
  }
}
```
* **Usage**:
```html
<input type="text" nepaliDatePicker [options]="{ theme: 'classic-dark', lang: 'ne' }" placeholder="मिति छान्नुहोस्">
```

---

### Vue 3
Wrap inside a Vue 3 component using the Composition API `onMounted` and `onUnmounted` hooks:
```html
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import 'universal-sambat-sdk/css';

const props = defineProps({
  modelValue: String,
  options: Object
});
const emit = defineEmits(['update:modelValue']);
const inputRef = ref(null);
let picker = null;

onMounted(() => {
  if (window.NepaliDatePicker) {
    picker = new window.NepaliDatePicker(inputRef.value, {
      ...props.options,
      onChange: (date) => emit('update:modelValue', date.formatted)
    });
    if (props.modelValue) picker.setDate(props.modelValue);
  }
});

onUnmounted(() => {
  if (picker) picker.destroy();
});
</script>

<template>
  <input ref="inputRef" type="text" :value="modelValue" placeholder="Select Nepali Date">
</template>
```

---

## 2. Mobile Platforms (Capacitor, Cordova, WebView & Native)

### Hybrid Mobile (React Native)
For React Native applications, use the `react-native-webview` module to load a local, high-performance HTML/JS datepicker page.
```jsx
import React from 'react';
import { WebView } from 'react-native-webview';

export default function MobileDatePicker() {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/universal-sambat-sdk/dist/nepali-datepicker.css">
        <script src="https://cdn.jsdelivr.net/npm/universal-sambat-sdk/dist/nepali-datepicker.js"></script>
      </head>
      <body style="margin: 0; background: transparent;">
        <div id="picker-container"></div>
        <script>
          new NepaliDatePicker('#picker-container', {
            inline: true,
            theme: 'glassmorphism',
            onChange: function(date) {
              window.ReactNativeWebView.postMessage(JSON.stringify(date));
            }
          });
        </script>
      </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlContent }}
      onMessage={(event) => {
        const selectedDate = JSON.parse(event.nativeEvent.data);
        console.log("Selected Mobile Date: ", selectedDate);
      }}
      style={{ flex: 1 }}
    />
  );
}
```

---

### Flutter
Use the `webview_flutter` plugin to load and communicate with the web picker.
```dart
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class NepaliDatePickerWidget extends StatefulWidget {
  @override
  _NepaliDatePickerWidgetState createState() => _NepaliDatePickerWidgetState();
}

class _NepaliDatePickerWidgetState extends State<NepaliDatePickerWidget> {
  late final WebViewController _controller;

  @override
  void initState() {
    super.initState();
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..addJavaScriptChannel(
        'FlutterDatePicker',
        onMessageReceived: (JavaScriptMessage message) {
          final dateData = jsonDecode(message.message);
          print("Selected Date in Flutter: ${dateData['formatted']}");
        },
      )
      ..loadHtmlString('''
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/universal-sambat-sdk/dist/nepali-datepicker.css">
            <script src="https://cdn.jsdelivr.net/npm/universal-sambat-sdk/dist/nepali-datepicker.js"></script>
          </head>
          <body>
            <div id="datepicker"></div>
            <script>
              new NepaliDatePicker('#datepicker', {
                inline: true,
                onChange: (date) => FlutterDatePicker.postMessage(JSON.stringify(date))
              });
            </script>
          </body>
        </html>
      ''');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: WebViewWidget(controller: _controller),
    );
  }
}
```

---

## 3. Server-Side Stack (Node.js & APIs)

Use the utility helper engines in backend Node.js apps to perform date calculations or conversions dynamically (e.g. converting a submitted BS reservation date to Gregorian AD in an Express controller).

### Express.js Controller Example
```javascript
const express = require('express');
const router = express.Router();
// Import the core utility conversion functions
const { AD2BS, BS2AD } = require('universal-sambat-sdk');

router.post('/api/reservations', (req, res) => {
  const { bsDate, time } = req.body; // e.g. "2083-03-15", "10:30 AM"

  try {
    // 1. Convert to AD date to save standard date object in database
    const adDateString = BS2AD(bsDate); // "2026-06-29"
    const adDateObj = new Date(adDateString + 'T' + time);

    res.status(200).json({
      success: true,
      message: "Reservation logged successfully.",
      savedUtc: adDateObj.toISOString(),
      nepaliBs: bsDate
    });
  } catch (error) {
    res.status(400).json({ success: false, error: "Invalid Bikram Sambat Date format." });
  }
});

module.exports = router;
```
