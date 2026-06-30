<?php

namespace KushalKhadka\NepaliDatePicker;

use Illuminate\View\Component;

/**
 * Blade component: <x-nepali-datepicker>
 *
 * Usage:
 *   <x-nepali-datepicker name="booking_date" :value="old('booking_date')" theme="ocean-blue" lang="ne" />
 */
class NepaliDatePickerBladeComponent extends Component
{
    public function __construct(
        public string  $name        = 'nepali_date',
        public string  $id          = '',
        public string  $value       = '',
        public string  $theme       = 'classic-light',
        public string  $lang        = 'ne',
        public string  $mode        = 'single',
        public string  $placeholder = '',
        public bool    $showAdDate  = true,
        public ?string $exportAd    = null,
        public bool    $required    = false,
        public string  $class       = '',
    ) {
        if (!$this->id) $this->id = 'ndp-' . uniqid();
        if (!$this->placeholder) $this->placeholder = $this->lang === 'ne' ? 'मिति छान्नुहोस्' : 'Select date';
    }

    public function render()
    {
        return view('ndp::components.nepali-datepicker');
    }
}
