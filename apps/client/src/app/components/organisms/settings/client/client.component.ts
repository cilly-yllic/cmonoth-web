import { Component, ViewChild, AfterContentInit, OnDestroy } from '@angular/core'
import { of, Observable } from 'rxjs'
import { map, flatMap, tap, take } from 'rxjs/operators'
import { ClientService } from '~services/db/client.service'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'
import { UserComponent } from '~organisms/settings/client/user/user.component'
import { OrgComponent } from '~organisms/settings/client/org/org.component'
import { getComponent, DynamicClass, DynamicComponent } from '~atoms/dynamic'

@Component({
  selector: 'app-o-settings-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent extends SubscriptionsDirective {
  @ViewChild(DynamicComponent) dynamicComponent!: DynamicComponent

  component$: Observable<DynamicClass | null> = this.clientSv.clientType$.pipe(
    map((type) => {
      switch (type) {
        case 'user':
          return getComponent({ component: UserComponent })
        case 'org':
          return getComponent({ component: OrgComponent })
        default:
          return null
      }
    })
  )

  constructor(private clientSv: ClientService) {
    super()
  }
}
