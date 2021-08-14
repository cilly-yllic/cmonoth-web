import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'

import { DeactivateComponent } from './deactivate.component'

@NgModule({
  declarations: [DeactivateComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  entryComponents: [DeactivateComponent],
})
export class DeactivateModule {}
