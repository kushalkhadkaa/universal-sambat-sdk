<?php

namespace KushalKhadka\NepaliDatePicker;

use Illuminate\View\Component;

class NepaliDateRangeBladeComponent extends Component
{
    public function __construct(
        public string  $name        = 'nepali_date_range',
        public string  $id          = '',
        public string  $theme       = 'classic-light',
        public string  $lang        = 'ne',
        public string  $placeholder = '',
        public ?string $startName   = null,
        public ?string $endName     = null,
        public bool    $required    = false,
        public string  $class       = '',
    ) {
        if (!$this->id) $this->id = 'ndp-range-' . uniqid();
        if (!$this->placeholder) $this->placeholder = $this->lang === 'ne' ? 'मिति दायरा छान्नुहोस्' : 'Select date range';
    }

    public function render()
    {
        return view('ndp::components.nepali-date-range');
    }
}
