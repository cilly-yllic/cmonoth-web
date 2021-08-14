import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { DeleteComponent } from './delete.component'

import { AlternativeModule } from '~dialogs/alternative/alternative.module'
import { TreesService } from '~services/db/trees.service'

@NgModule({
  declarations: [DeleteComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule, AlternativeModule],
  exports: [DeleteComponent],
  providers: [TreesService],
})
export class DeleteModule {}
