<?php

namespace KushalKhadka\NepaliDatePicker;

use Illuminate\View\Component;

class NepaliConverterBladeComponent extends Component
{
    public function __construct(
        public string $id    = '',
        public string $theme = 'classic-light',
        public string $lang  = 'ne',
        public string $class = '',
    ) {
        if (!$this->id) $this->id = 'ndp-conv-' . uniqid();
    }

    public function render()
    {
        return view('ndp::components.nepali-converter-widget');
    }
}
