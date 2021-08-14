import { Component, OnInit, OnDestroy } from '@angular/core'
import { timer, Subscription } from 'rxjs'
import { NavigationLoadingService } from '~atoms/navigation-loading/navigation-loading.service'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'

@Component({
  templateUrl: './deactivate.component.html',
  styleUrls: ['./deactivate.component.scss'],
})
export class DeactivateComponent extends SubscriptionsDirective implements OnInit, OnDestroy {
  constructor(private navigationLoadingService: NavigationLoadingService) {
    super()
  }

  ngOnInit(): void {
    this.subscriptions.add(timer().subscribe(() => this.navigationLoadingService.lock()))
  }

  ngOnDestroy(): void {
    this.navigationLoadingService.unlock()
    this.subscriptions.unsubscribe()
  }
}
