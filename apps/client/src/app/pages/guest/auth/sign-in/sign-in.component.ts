import { Component, OnInit } from '@angular/core'
import { Subject, throwError } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { FormGroup, FormControl } from '@angular/forms'
import { AuthService } from '~services/firebase/auth.service'
import { ClientsService } from '~services/db/clients.service'
import { getEmailFromControl } from '~utils/forms/email'
import { getPasswordFromControl } from '~utils/forms/password'
import { jumpTo } from '~utils/location'
import { Auth } from '~types/auth'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent extends SubscriptionsDirective implements OnInit {
  submitSbj = new Subject<{ email: string; password: string }>()
  email: FormControl = getEmailFromControl()
  password: FormControl = getPasswordFromControl()

  form: FormGroup = new FormGroup({ email: this.email, password: this.password })

  errorMessage = ''
  signingIn = false
  requested = false

  constructor(private authSv: AuthService, private clientsSv: ClientsService) {
    super()
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.submitSbj.asObservable()
        .pipe(
          mergeMap(({ email, password }) => this.authSv.signInWithEmailAndPassword(email, password)),
          mergeMap(() => this.authSv.getUser()),
          mergeMap((u: Auth | null) => {
            if (!u) {
              return throwError(Error('user not found'))
            }
            return this.clientsSv.getClient(u.uid)
          })
        )
        .subscribe(
          (user) => {
            this.signingIn = false
            return jumpTo(user ? user.name : '/')
          },
          (e) => {
            return jumpTo('/')
          }
        )
    )
  }

  onSignIn(): void {
    this.signingIn = true
    this.submitSbj.next(this.form.value)
  }
}
