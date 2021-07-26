import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LandingComponent } from './landing.component'

import { SendEmailLinkModule } from '~organisms/auth/send-email-link/send-email-link.module'

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, SendEmailLinkModule],
})
export class LandingModule {}
