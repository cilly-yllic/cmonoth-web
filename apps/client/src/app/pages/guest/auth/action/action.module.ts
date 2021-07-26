import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InitPasswordAndUsernameModule } from '~organisms/auth/init-password-and-username/init-password-and-username.module'
import { ActionComponent } from './action.component'

@NgModule({
  declarations: [ActionComponent],
  imports: [CommonModule, InitPasswordAndUsernameModule],
})
export class ActionModule {}
