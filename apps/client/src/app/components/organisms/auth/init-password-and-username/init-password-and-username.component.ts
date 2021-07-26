import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { from, Subject, of, Subscription, combineLatest } from 'rxjs'
import { mergeMap, map, tap, filter, distinctUntilChanged, debounceTime, switchMap, take } from 'rxjs/operators'
import { getUsernameFromControl } from '~utils/forms/username'
import { getPasswordFromControl } from '~utils/forms/password'
import { AuthService } from '~services/firebase/auth.service'
import { RouterService } from '~services/router.service'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'
import { ReservedClientNamesService } from '~services/db/reserved-client-names.service'
import { UsernameService, Status } from '~services/forms/custom-validators/username.service'
import { InitPasswordAndUsernameService } from './init-password-and-username.service'

interface Submit {
  email: string
  username: string
  password: string
}

@Component({
  selector: 'app-o-auth-init-password-and-username',
  templateUrl: './init-password-and-username.component.html',
  styleUrls: ['./init-password-and-username.component.scss'],
})
export class InitPasswordAndUsernameComponent extends SubscriptionsDirective implements OnInit {
  @Input() email = ''

  usernameStatusSbj = new Subject<Status>()
  isChecking$ = this.usernameStatusSbj.asObservable().pipe(map((status) => status === 'checking'))
  slaveUsername: FormControl = getUsernameFromControl('')
  username: FormControl = getUsernameFromControl('', [this.usernameSv.setValidate(this.usernameStatusSbj)])
  password: FormControl = getPasswordFromControl()
  form: FormGroup = new FormGroup({ username: this.username, password: this.password })
  succeeded = false
  loading = false
  submitSbj = new Subject<Submit>()

  constructor(
    private authSv: AuthService,
    private initPasswordAndUsernameSv: InitPasswordAndUsernameService,
    private routerSv: RouterService,
    private reservedClientNamesSv: ReservedClientNamesService,
    private usernameSv: UsernameService
  ) {
    super()
  }

  ngOnInit() {
    this.subscriptions.add(this.__sync())
    this.subscriptions.add(this.__setSubmit())
    this.usernameStatusSbj.subscribe(
      (status) => {
        console.log('status', status)
      }
    )
  }

  private __sync(): Subscription {
    return this.slaveUsername.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
      )
      .subscribe(
        (username) => {
          console.log('--- username ---', username)
          this.username.patchValue(username)
        }
      )
  }

  private __setSubmit(): Subscription {
    return this.submitSbj
      .asObservable()
      .pipe(
        mergeMap(({ email, username, password }) => combineLatest([of({ email, username, password }), this.authSv.signInWithEmailLink(email)])),
        mergeMap(([{ email, username, password }, _]) => combineLatest([of({ email, username, password }), this.reservedClientNamesSv.create(username)])),
        mergeMap(([{ email, username, password }, _]) => combineLatest([of({ email, username, password }), this.initPasswordAndUsernameSv.updatePassword(password, username)]))
      )
      .pipe(
        mergeMap(([{ email, username, password }, _]) => combineLatest([of({ email, username, password }), this.authSv.signInWithEmailAndPassword(email, password)])),
        map(([{ email, username, password }, _]) => this.routerSv.navigate([username]))
      )
      .subscribe(
        () => {
          this.loading = false
          this.succeeded = true
        },
        (e) => {
          this.loading = false
          console.error(e)
          this.authSv.signOut() // WONDER: sign outしてなかったらという処理必要？
        }
      )
  }

  onSignUp(): void {
    this.loading = true
    this.submitSbj.next({ ...this.form.value, email: this.email })
  }
}
