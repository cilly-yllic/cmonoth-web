import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'

import { SpinnerModule } from '~atoms/spinner/spinner.module'
import { SelectOptionsModule } from '~atoms/select-options/select-options.module'
import { CreateComponent } from './create.component'
import { CreateDialogComponent } from './create.dialog.component'

@NgModule({
  declarations: [CreateComponent, CreateDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    SpinnerModule,
    SelectOptionsModule,
  ],
  entryComponents: [CreateDialogComponent],
  exports: [CreateComponent],
})
export class CreateModule {}
