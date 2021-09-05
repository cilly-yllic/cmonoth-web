import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { NameComponent } from './name.component'

import { SpinnerModule } from '~atoms/spinner/spinner.module'

@NgModule({
  declarations: [NameComponent],
  imports: [CommonModule, ReactiveFormsModule, SpinnerModule],
  exports: [NameComponent],
})
export class NameModule {}
