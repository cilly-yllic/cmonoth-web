import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GuestModule as LayoutsGuestModule } from '~layouts/guest/guest.module'
import { GuestRoutingModule } from './quest-routing.module'
import { GuestComponent } from './guest.component'

import { LandingModule } from '~pages/guest/landing/landing.module'
import { ActionModule } from '~pages/guest/auth/action/action.module'
import { SignInModule } from '~pages/guest/auth/sign-in/sign-in.module'
import { SignUpModule } from '~pages/guest/auth/sign-up/sign-up.module'

@NgModule({
  declarations: [GuestComponent],
  imports: [CommonModule, GuestRoutingModule, LayoutsGuestModule, LandingModule, ActionModule, SignInModule, SignUpModule],
})
export class GuestModule {}
