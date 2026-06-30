import { Directive, ElementRef, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

// Make TS aware of the global picker constructor
declare const NepaliDatePicker: any;

@Directive({
  selector: '[nepaliDatePicker]',
  standalone: true
})
export class NepaliDatePickerDirective implements OnInit, OnChanges, OnDestroy {
  @Input() options: any = {};
  @Input() value: string = '';
  
  @Output() dateChange = new EventEmitter<any>();
  @Output() rangeChange = new EventEmitter<any>();
  
  private pickerInstance: any;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  ngOnInit() {
    if (typeof NepaliDatePicker === 'undefined') {
      console.warn('NepaliDatePicker core library is not loaded. Ensure dist/nepali-datepicker.js is included.');
      return;
    }

    // Merge options and bind event triggers to Angular Outputs
    const mergedOptions = {
      ...this.options,
      onChange: (date: any) => {
        this.dateChange.emit(date);
        if (this.options.onChange) this.options.onChange(date);
      },
      onRangeChange: (start: any, end: any) => {
        this.rangeChange.emit({ start, end });
        if (this.options.onRangeChange) this.options.onRangeChange(start, end);
      }
    };

    // Instantiate picker
    this.pickerInstance = new NepaliDatePicker(this.el.nativeElement, mergedOptions);
    
    if (this.value) {
      this.pickerInstance.setDate(this.value);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.pickerInstance && changes['value'] && !changes['value'].firstChange) {
      const currentVal = changes['value'].currentValue;
      if (currentVal !== this.el.nativeElement.value) {
        this.pickerInstance.setDate(currentVal);
      }
    }
  }

  ngOnDestroy() {
    if (this.pickerInstance) {
      this.pickerInstance.destroy();
    }
  }
}
