import { OnDestroy, Directive } from '@angular/core'
import { Subscription } from 'rxjs'

@Directive()
export class SubscriptionsDirective implements OnDestroy {
  public subscriptions = new Subscription()

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
