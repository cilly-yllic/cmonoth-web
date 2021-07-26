import { Component, OnDestroy } from '@angular/core'
import { map } from 'rxjs/operators'

import { RouterService } from '~services/router.service'
import { AuthService } from '~services/firebase/auth.service'
import { ClientService } from '~services/db/client.service'
import { UserService } from '~services/db/user.service'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'

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
  constructor(private rSv: RouterService, private authSv: AuthService, private cSv: ClientService, private userSv: UserService) {
    super()
  }

  onSignOut(): void {
    this.authSv.signOutAndRedirect()
  }

  onNavigate(path: string): void {
    this.subscriptions.add(this.cSv.clientName$.subscribe((name) => this.rSv.navigate([`/${name}/${path}`])))
  }
}
