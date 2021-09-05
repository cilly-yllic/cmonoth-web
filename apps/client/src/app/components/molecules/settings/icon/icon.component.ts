import { Component, OnDestroy } from '@angular/core'
import { map, mergeMap } from 'rxjs/operators'

import { RouterService } from '~services/router.service'
import { AuthService } from '~services/firebase/auth.service'
import { ClientService } from '~services/db/client.service'
import { UserService } from '~services/db/user.service'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'

import { NAVIGATES } from '~configs'

@Component({
  selector: 'app-m-settings-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent extends SubscriptionsDirective {
  user$ = this.userSv.user$
  path$ = this.user$.pipe(
    map((user) => user?.photoUrl || 'assets/images/avatar_no.png'),
    map((path) => `url(${path})`)
  )
  constructor(private routerSv: RouterService, private authSv: AuthService, private clientSv: ClientService, private userSv: UserService) {
    super()
  }

  onSignOut(): void {
    this.authSv.promiseSignOut()
      .then(
        () => {
          this.routerSv.navigate([NAVIGATES.SIGN_IN])
        }
      )
  }

  onNavigate(path: string): void {
    this.subscriptions.add(this.clientSv.clientName$.subscribe((name) => this.routerSv.navigate([`/${name}/${path}`])))
  }
}
