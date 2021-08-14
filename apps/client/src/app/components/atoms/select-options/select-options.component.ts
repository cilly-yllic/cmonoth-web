import { Component, OnInit, Input, forwardRef, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
// import { MatSe } from '@angular/material/select'
import { Observable, Subscription } from 'rxjs'
import { map, startWith, tap } from 'rxjs/operators'

@Component({
  selector: 'app-a-select-options',
  templateUrl: './select-options.component.html',
  styleUrls: ['./select-options.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectOptionsComponent),
      multi: true
    }
  ]
})
export class SelectOptionsComponent implements OnInit, ControlValueAccessor {

  _items: any[] = []
  @Input()
  set items(items: any[] | null) {
    this._items = !!items ? items : []
  }
  get items() {
    return this._items
  }
  @Input() key = ''
  @Input() placeholder = ''
  @Input() label = ''
  @Input() multiple = false

  // control: FormControl = new FormControl(null)
  value: any = null

  onChange: any = () => { }
  onTouched: any = () => { }

  constructor() { }

  ngOnInit(): void {
  }

  writeValue(value: any): void {
    // this.control.patchValue(value)
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

}
