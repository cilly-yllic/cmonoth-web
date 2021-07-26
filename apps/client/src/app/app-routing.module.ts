import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { isGuestPage } from '~utils/location'
import { ClientGuard } from '~roots/client/client.guard'

// const routes: Routes = [
//   {
//     path: '',
//     loadChildren: () => import('~roots/guest/guest.module').then((m) => m.GuestModule),
//   },
//   {
//     path: 'client/:client',
//     loadChildren: () => import('~roots/client/client.module').then((m) => m.ClientModule),
//     // canLoad: [ClientGuard],
//   },
// ]

const guest: Routes = [
  {
    path: '',
    loadChildren: () => import('~roots/guest/guest.module').then((m) => m.GuestModule),
  },
]

const client: Routes = [
  {
    path: ':client',
    loadChildren: () => import('~roots/client/client.module').then((m) => m.ClientModule),
    canLoad: [ClientGuard],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(isGuestPage ? guest : client)],
  // imports: [RouterModule.forRoot(guest)],
  exports: [RouterModule],
  // providers: [ClientGuard],
})
export class AppRoutingModule {}
