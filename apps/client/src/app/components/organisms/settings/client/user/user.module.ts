import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { UserComponent } from './user.component'

import { SpinnerModule } from '~atoms/spinner/spinner.module'
// import { SelectOptionModule } from '~atoms/select-option/select-option.module'
import { ImageControllerModule } from '~atoms/image-controller/image-controller.module'
// import { DeleteModule } from '~molecules/settings/client/delete/delete.module'

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    SpinnerModule,
    // SelectOptionModule,
    ImageControllerModule,
    // DeleteModule,
  ],
  exports: [UserComponent],
})
export class UserModule {}
