<?php

namespace KushalKhadka\NepaliDatePicker;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Blade;

class NepaliDatePickerServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton('nepali-datepicker', fn() => new BsCalendarEngine());
    }

    public function boot(): void
    {
        // Publish assets
        $this->publishes([
            __DIR__ . '/../dist/nepali-datepicker.css' => public_path('vendor/nepali-datepicker/nepali-datepicker.css'),
            __DIR__ . '/../dist/nepali-datepicker.js'  => public_path('vendor/nepali-datepicker/nepali-datepicker.js'),
        ], 'nepali-datepicker-assets');

        // Publish config
        $this->publishes([
            __DIR__ . '/../config/nepali-datepicker.php' => config_path('nepali-datepicker.php'),
        ], 'nepali-datepicker-config');

        // Load views (Blade components)
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'ndp');

        // Register Blade components
        Blade::component('ndp::components.nepali-datepicker',       'nepali-datepicker');
        Blade::component('ndp::components.nepali-date-range',       'nepali-date-range');
        Blade::component('ndp::components.nepali-converter-widget', 'nepali-converter');

        // Register custom validation rule: bs_date
        Validator::extend('bs_date', function ($attribute, $value) {
            if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $value)) return false;
            [$y, $m, $d] = array_map('intval', explode('-', $value));
            return app('nepali-datepicker')->isValidBs($y, $m, $d);
        }, 'The :attribute must be a valid Bikram Sambat date (YYYY-MM-DD).');

        // Register custom validation rule: bs_date_after / bs_date_before
        Validator::extend('bs_date_after', function ($attribute, $value, $parameters) {
            $ref = $parameters[0] ?? null;
            if (!$ref) return true;
            return strcmp($value, $ref) > 0;
        }, 'The :attribute must be after :other.');
    }
}
