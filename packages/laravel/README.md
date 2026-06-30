# Universal Sambat SDK — Laravel Package

Bikram Sambat (BS) date picker for Laravel with Blade components, custom validation rules, and pure PHP BS/AD conversion engine.

## Installation

```bash
composer require kushal-khadka/universal-sambat-sdk
```

Publish assets and config:

```bash
php artisan vendor:publish --tag=nepali-datepicker-assets
php artisan vendor:publish --tag=nepali-datepicker-config
```

Add to your layout's `<head>`:

```html
<link rel="stylesheet" href="{{ asset('vendor/nepali-datepicker/nepali-datepicker.css') }}">
```

And before `</body>` (or in `@stack('scripts')`):

```html
<script src="{{ asset('vendor/nepali-datepicker/nepali-datepicker.js') }}"></script>
@stack('scripts')
```

## Blade Components

### Single date picker

```blade
<x-nepali-datepicker
    name="booking_date"
    :value="old('booking_date')"
    theme="ocean-blue"
    lang="ne"
    required
/>
```

| Prop | Default | Description |
|------|---------|-------------|
| `name` | `nepali_date` | Form field name |
| `id` | auto | HTML element id |
| `value` | `''` | Pre-filled BS date (`YYYY-MM-DD`) |
| `theme` | `classic-light` | Any of 22 themes |
| `lang` | `ne` | `ne` or `en` |
| `mode` | `single` | `single`, `range`, `multiple` |
| `placeholder` | auto | Input placeholder |
| `show-ad-date` | `true` | Show AD equivalent below |
| `export-ad` | `null` | Hidden input name to store AD date |
| `required` | `false` | HTML required |
| `class` | `''` | Extra CSS classes on wrapper |

### Date range picker

```blade
<x-nepali-date-range
    name="travel_period"
    start-name="travel_start"
    end-name="travel_end"
    theme="aurora"
/>
```

### BS/AD Converter widget

```blade
<x-nepali-converter theme="ocean-blue" lang="ne" />
```

## Validation

```php
$request->validate([
    'booking_date' => ['required', 'bs_date'],
    'end_date'     => ['required', 'bs_date', 'bs_date_after:booking_date'],
]);
```

| Rule | Description |
|------|-------------|
| `bs_date` | Valid BS date in `YYYY-MM-DD` format |
| `bs_date_after:field` | BS date is chronologically after another field |

## PHP Engine

```php
use KushalKhadka\NepaliDatePicker\BsCalendarEngine;

$engine = app('nepali-datepicker');
// or: new BsCalendarEngine()

$ad = $engine->bsToAd(2081, 1, 15);
// ['year'=>2024,'month'=>4,'day'=>28,'iso'=>'2024-04-28','date'=>DateTime]

$bs = $engine->adToBs('2024-04-28');
// ['year'=>2081,'month'=>1,'day'=>15,'iso'=>'2081-01-15']

$engine->bs2ad('2081-01-15');   // '2024-04-28'
$engine->ad2bs('2024-04-28');   // '2081-01-15'
$engine->todayBs();             // current BS date
$engine->isValidBs(2081, 1, 15); // true
$engine->monthName(1, 'ne');    // 'बैशाख'
$engine->monthName(1, 'en');    // 'Baisakh'
```

## Requirements

- PHP 8.0+
- Laravel 9, 10, or 11

## License

MIT © Kushal Khadka
