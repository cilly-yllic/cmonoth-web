import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { NameComponent } from './name.component'

import { SpinnerModule } from '~atoms/spinner/spinner.module'

@NgModule({
  declarations: [NameComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatInputModule, SpinnerModule],
  exports: [NameComponent],
})
export class NameModule {}
