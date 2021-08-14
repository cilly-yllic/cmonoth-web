import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core'
import { FormGroup, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

// export const DEFAULT_COLOR = '#ffffff'
export const DEFAULT_COLOR = '#54555f'

@Component({
  selector: 'app-a-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true
    }
  ]
})
export class ColorPickerComponent implements ControlValueAccessor {
  _color = ''
  set color(color: string) {
    this._color = color || DEFAULT_COLOR
  }

  get color(): string {
    return this._color
  }

  presets = ['#fff', '#000', '#2889e9', '#e920e9', '#fff500', 'rgb(236,64,64)']

  onChange: any = () => { }
  onTouched: any = () => { }

  constructor() {}

  writeValue(color: any): void {
    this.color = color
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  // get color(): string {
  //   return this.control.value;
  // }
  // set color(value: string) {
  //   this.control.patchValue(value);
  // }
}
