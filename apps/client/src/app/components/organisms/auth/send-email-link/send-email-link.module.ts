import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { SpinnerModule } from '~atoms/spinner/spinner.module'
import { CanSignUpService } from '~services/firebase/functions/can-sign-up.service'

import { SendEmailLinkComponent } from './send-email-link.component'

@NgModule({
  declarations: [SendEmailLinkComponent],
  exports: [SendEmailLinkComponent],
  imports: [CommonModule, ReactiveFormsModule, SpinnerModule],
  providers: [CanSignUpService],
})
export class SendEmailLinkModule {}
