import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { of, Subject } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { getEmailFromControl } from '~utils/forms/email'
import { AuthService } from '~services/firebase/auth.service'
import { CanSignUpService } from '~services/firebase/functions/can-sign-up.service'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'

@Component({
  selector: 'app-o-auth-send-email-link',
  templateUrl: './send-email-link.component.html',
  styleUrls: ['./send-email-link.component.scss'],
})
export class SendEmailLinkComponent extends SubscriptionsDirective implements OnInit {
  submitSbj = new Subject<{ email: string }>()
  email: FormControl = getEmailFromControl()

  form: FormGroup = new FormGroup({ email: this.email })

  sending = false
  succeeded = false

  isGuest$ = this.authSv.isGuest()

  constructor(private authSv: AuthService, private cSUSv: CanSignUpService) {
    super()
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.submitSbj.asObservable().pipe(
        mergeMap(({ email }) => this.cSUSv.run(email)),
        mergeMap((v) => (v ? this.authSv.sendSignInLinkToEmail(this.email.value) : of(null)))
      )
        .subscribe(
          () => {
            this.sending = false
            this.succeeded = true
          },
          () => {
            this.sending = false
          }
        )
    )
  }

  send(): void {
    this.sending = true
    this.succeeded = false
    this.submitSbj.next(this.form.value)
  }
}
