import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SendEmailLinkModule } from '~organisms/auth/send-email-link/send-email-link.module'
import { SignUpComponent } from './sign-up.component'

@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, SendEmailLinkModule],
})
export class SignUpModule {}
