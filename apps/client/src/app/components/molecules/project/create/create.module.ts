import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { InputModule } from '~dialogs'

import { CreateComponent } from './create.component'

@NgModule({
  declarations: [CreateComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule, InputModule],
  exports: [CreateComponent],
})
export class CreateModule {}
