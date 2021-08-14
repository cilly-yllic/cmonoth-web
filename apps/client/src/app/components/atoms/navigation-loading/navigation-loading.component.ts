import { Component, OnDestroy } from '@angular/core'

import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router'

import { Subscription } from 'rxjs'

import { NavigationLoadingService } from './navigation-loading.service'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'

@Component({
  selector: 'app-a-navigation-loading',
  templateUrl: './navigation-loading.component.html',
  styleUrls: ['./navigation-loading.component.scss'],
})
export class NavigationLoadingComponent extends SubscriptionsDirective {
  loading = false

  constructor(private router: Router, private navigationLoadingService: NavigationLoadingService) {
    super()
    const subscription = router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
    this.subscriptions.add(subscription)
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true
    }
    if (event instanceof NavigationEnd) {
      this.loading = false
    }

    if (event instanceof NavigationCancel) {
      this.loading = false
    }
    if (event instanceof NavigationError) {
      this.loading = false
    }
  }

  get lock(): boolean {
    return this.navigationLoadingService.isLocked
  }
}
