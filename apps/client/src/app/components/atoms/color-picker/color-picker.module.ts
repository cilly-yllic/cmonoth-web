import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'

import { ColorPickerModule as NgxColorPickerModule } from 'ngx-color-picker'
import { ColorPickerComponent } from './color-picker.component'

@NgModule({
  declarations: [ColorPickerComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, NgxColorPickerModule],
  exports: [ColorPickerComponent],
})
export class ColorPickerModule {}
