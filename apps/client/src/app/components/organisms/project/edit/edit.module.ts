import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { EditComponent } from './edit.component'

import { SpinnerModule } from '~atoms/spinner/spinner.module'
import { ImageControllerModule } from '~atoms/image-controller/image-controller.module'
import { ColorPickerModule } from '~atoms/color-picker/color-picker.module'
import { SlackUrlModule } from '~atoms/slack-url/slack-url.module'
import { AssignModule } from '~molecules/project/assign/assign.module'
import { CreateModule } from '~molecules/project/create/create.module'
import { DeleteModule } from '~molecules/project/delete/delete.module'

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatRadioModule,
    SpinnerModule,
    ImageControllerModule,
    ColorPickerModule,
    SlackUrlModule,
    AssignModule,
    CreateModule,
    DeleteModule,
  ],
  exports: [EditComponent],
})
export class EditModule {}
