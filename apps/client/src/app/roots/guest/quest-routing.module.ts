import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { GuestComponent } from './guest.component'
import { LandingComponent } from '~pages/guest/landing/landing.component'
import { ActionComponent } from '~pages/guest/auth/action/action.component'
import { ActionGuard } from '~pages/guest/auth/action/action.guard'
import { SignInComponent } from '~pages/guest/auth/sign-in/sign-in.component'
import { SignInGuard } from '~pages/guest/auth/sign-in/sign-in.guard'
import { SignUpComponent } from '~pages/guest/auth/sign-up/sign-up.component'
import { SignUpGuard } from '~pages/guest/auth/sign-up/sign-up.guard'

const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        children: [
          { path: 'sign-in', component: SignInComponent, canActivate: [SignInGuard] },
          { path: 'sign-up', component: SignUpComponent, canActivate: [SignUpGuard] },
          { path: 'action', component: ActionComponent, canActivate: [ActionGuard], resolve: { data: ActionGuard } },
        ]
      },
      { path: '', component: LandingComponent },
      { path: '**', redirectTo: '/' },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRoutingModule {}
