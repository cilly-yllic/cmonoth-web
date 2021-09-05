import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatDialogModule } from '@angular/material/dialog'

import { AlternativeModule } from '~dialogs'
import { DeleteComponent } from './delete.component'

@NgModule({
  declarations: [DeleteComponent],
  imports: [CommonModule, MatDialogModule, AlternativeModule],
  exports: [DeleteComponent],
})
export class DeleteModule {}
