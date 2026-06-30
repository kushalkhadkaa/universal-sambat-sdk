# @universal-sambat-sdk/react

React components and hooks for [Universal Sambat SDK](https://kushalkhadkaa.github.io/universal-sambat-sdk/) — the open-source Bikram Sambat (BS) date SDK for Nepal.

## Install

```bash
npm install universal-sambat-sdk @universal-sambat-sdk/react
```

Load the core library CSS and JS in your HTML or entry point:

```html
<link rel="stylesheet" href="node_modules/universal-sambat-sdk/dist/nepali-datepicker.css">
<script src="node_modules/universal-sambat-sdk/dist/nepali-datepicker.js"></script>
```

Or in your React entry file:

```js
import 'universal-sambat-sdk/css';
// core JS must be loaded as a script tag — it attaches to window.NepaliDatePicker
```

---

## Components

### `<NepaliDatePicker>`

```jsx
import { NepaliDatePicker } from '@universal-sambat-sdk/react';

function BookingForm() {
  const [date, setDate] = useState('');

  return (
    <NepaliDatePicker
      value={date}
      onChange={(d) => setDate(d.formatted)}
      options={{
        theme: 'ocean-blue',
        lang: 'ne',
        showAdDate: true,
        exportAdInput: '#ad-hidden',
      }}
      placeholder="मिति छान्नुहोस्"
    />
  );
}
```

### `<NepaliDateRangePicker>`

```jsx
import { NepaliDateRangePicker } from '@universal-sambat-sdk/react';

function HotelBooking() {
  const [start, setStart] = useState(null);
  const [end,   setEnd]   = useState(null);

  return (
    <NepaliDateRangePicker
      onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
      options={{ theme: 'glassmorphism', presets: true }}
      placeholder="Check-in → Check-out"
    />
  );
}
```

### `<NepaliConverterWidget>`

```jsx
import { NepaliConverterWidget } from '@universal-sambat-sdk/react';

<NepaliConverterWidget options={{ theme: 'midnight', lang: 'ne' }} />
```

---

## Hooks

### `useNepaliDatePicker`

Headless hook — attach to any input element.

```jsx
import { useNepaliDatePicker } from '@universal-sambat-sdk/react';

function CustomInput() {
  const { inputRef, date, open, close, clear } = useNepaliDatePicker({
    theme: 'neon-cyberpunk',
    lang: 'en',
    onChange: (d) => console.log(d),
  });

  return (
    <div>
      <input ref={inputRef} placeholder="Select BS date" />
      <button onClick={open}>Open</button>
      <button onClick={clear}>Clear</button>
      {date && <p>Selected: {date.formatted}</p>}
    </div>
  );
}
```

### `useNepaliDateRange`

```jsx
import { useNepaliDateRange } from '@universal-sambat-sdk/react';

function FlightSearch() {
  const { inputRef, start, end, clear } = useNepaliDateRange({
    theme: 'corporate-blue',
    presets: true,
  });

  return (
    <div>
      <input ref={inputRef} placeholder="Departure → Return" readOnly />
      {start && end && <p>{start.formatted} → {end.formatted}</p>}
    </div>
  );
}
```

---

## Imperative API (via ref)

```jsx
const pickerRef = useRef(null);

<NepaliDatePicker ref={pickerRef} options={{ theme: 'classic-dark' }} />

// Elsewhere:
pickerRef.current.open();
pickerRef.current.setDate({ year: 2083, month: 3, day: 15 });
pickerRef.current.setTheme('nepali-red');
pickerRef.current.clear();
```

---

## TypeScript

Full TypeScript types are included. Import types from `universal-sambat-sdk`:

```typescript
import type { DateObject, DatePickerOptions } from 'universal-sambat-sdk';
import { NepaliDatePicker } from '@universal-sambat-sdk/react';
```

---

## Themes

22 built-in themes: `classic-light`, `classic-dark`, `ocean-blue`, `glassmorphism`, `midnight`, `neon-cyberpunk`, `corporate-blue`, `nepali-red`, and more.

---

## License

MIT © Kushal Khadka
