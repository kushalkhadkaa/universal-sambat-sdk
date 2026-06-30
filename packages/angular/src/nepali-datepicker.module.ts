import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NepaliDatePickerDirective } from './nepali-datepicker.directive';

/**
 * NepaliDatePickerModule — for Angular apps not yet on standalone components
 *
 * Usage:
 *   @NgModule({ imports: [NepaliDatePickerModule] })
 *   export class AppModule {}
 */
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NepaliDatePickerDirective],
  exports: [NepaliDatePickerDirective],
})
export class NepaliDatePickerModule {}
