import {
  Directive, ElementRef, Input, OnInit, OnDestroy,
  forwardRef, HostListener
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare const NepaliDatePicker: any;

/**
 * NepaliDatePickerDirective
 * Implements ControlValueAccessor — works with both reactive and template-driven forms.
 *
 * Usage:
 *   <input nepaliDatePicker [ndpOptions]="{ theme: 'ocean-blue', lang: 'ne' }" formControlName="date" />
 *
 *   <!-- Or template-driven: -->
 *   <input nepaliDatePicker [(ngModel)]="date" [ndpOptions]="{ theme: 'classic-light' }" />
 */
@Directive({
  selector: '[nepaliDatePicker]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NepaliDatePickerDirective),
      multi: true,
    },
  ],
})
export class NepaliDatePickerDirective implements ControlValueAccessor, OnInit, OnDestroy {
  @Input('ndpOptions') options: any = {};

  private pickerInstance: any;
  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private el: ElementRef<HTMLInputElement>) {}

  ngOnInit(): void {
    if (typeof NepaliDatePicker === 'undefined') {
      console.error('[NepaliDatePicker Angular] Core library not found.');
      return;
    }

    this.pickerInstance = new NepaliDatePicker(this.el.nativeElement, {
      ...this.options,
      onChange: (date: any) => {
        this.onChange(date?.formatted ?? null);
        this.onTouched();
        this.options.onChange?.(date);
      },
    });
  }

  ngOnDestroy(): void {
    this.pickerInstance?.destroy();
  }

  // ControlValueAccessor
  writeValue(value: string | null): void {
    if (!this.pickerInstance) return;
    if (value) this.pickerInstance.setDate(value);
    else       this.pickerInstance.clear();
  }

  registerOnChange(fn: any): void    { this.onChange  = fn; }
  registerOnTouched(fn: any): void   { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void {
    this.el.nativeElement.disabled = disabled;
  }

  @HostListener('blur')
  onBlur(): void { this.onTouched(); }
}
