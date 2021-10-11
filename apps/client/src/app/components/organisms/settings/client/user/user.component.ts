import { Component, OnInit, ViewChild } from '@angular/core'
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms'
import { Observable, Subscription, Subject, interval, timer, forkJoin, of } from 'rxjs'
import { map, mergeMap, tap, switchMap, debounceTime, distinctUntilChanged, filter, finalize, first } from 'rxjs/operators'
import { ImageControllerComponent } from '~atoms/image-controller/image-controller.component'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'
import { ClientService } from '~services/db/client.service'
import { ClientsService } from '~services/db/clients.service'

import { User } from '~types/db/client/users'
import { getUsernameFromControl, VALIDATE_KEYS } from '~utils/forms/username'

const getPhotoUrl = (path: string) => (path ? `${path}?t=${new Date().getTime()}` : '')

interface Form {
  name: User['name']
  displayName: User['displayName']
  selfIntroduction: User['selfIntroduction']
}

export const NO_CHANGE_ERROR = { no_changes: true }
export const noChange = (backup: Form): ValidatorFn => (group: AbstractControl): ValidationErrors | null =>
  JSON.stringify(group.value) === JSON.stringify(backup) ? NO_CHANGE_ERROR : null

interface Submit {
  name: User['name']
  displayName: User['displayName']
  selfIntroduction: User['selfIntroduction']
}

@Component({
  selector: 'app-o-settings-client-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends SubscriptionsDirective implements OnInit {
  @ViewChild(ImageControllerComponent) imageController!: ImageControllerComponent

  updateSubject: Subject<never> = new Subject<never>()
  _backup!: User

  name: FormControl = getUsernameFromControl()
  selectTime$!: Observable<string>
  displayName = new FormControl('', [Validators.required])
  selfIntroduction = new FormControl('')
  form: FormGroup = new FormGroup({
    name: this.name,
    displayName: this.displayName,
    selfIntroduction: this.selfIntroduction,
  })
  user$ = this.clientSv.client$ as Observable<User>
  photoUrl$ = this.user$.pipe(
    map((user) => user?.photoUrl)
  )
  submit = new Subject<Submit>()

  updated = false
  updating = false
  constructor(private clientSv: ClientService, private clientsSv: ClientsService) {
    super()
  }

  ngOnInit() {
    const subscription = this.user$
      .subscribe((user) => {
        this.name.patchValue(user.name || '')
        this.displayName.patchValue(user.displayName || '')
        this.selfIntroduction.patchValue(user.selfIntroduction || '')
        this.backup = this.form.value
      })

    this.subscriptions.add(subscription)
    this.__initUpdate()
  }

  set backup(backup: User) {
    this._backup = backup
    this.form.clearValidators()
    this.form.setValidators(noChange(backup))
  }

  get backup(): User {
    return this._backup
  }

  private get __formChanged(): boolean {
    return this.form.valid
  }

  get disabled(): boolean {
    return !this.__formChanged && !this.imageController?.changed
  }

  private __initUpdate(): void {
    this.subscriptions.add(
      this.submit.asObservable()
        .pipe(
          debounceTime(500),
          switchMap((form) => this.clientsSv.getCurrentClientId().pipe(map((clientId) => ({ clientId, form })))),
          mergeMap(({ clientId, form }) => this.imageController.upload(`/clients/${clientId}`, 'icon').pipe(map((path) => ({ clientId, form, photoUrl: getPhotoUrl(path) })))),
          mergeMap(({ clientId, form, photoUrl }) => this.clientsSv.putClient(
            clientId, {
              ...form,
              ...(this.imageController.changed ? { photoUrl } : {}),
            }
          )),
          tap(() => this.updated = false),
          mergeMap(() => timer(5000))
        )
        .subscribe()
    )
  }

  onUpdate(e: Event) {
    e.stopPropagation()
    this.updating = true
    this.submit.next(this.form.value)
  }
}
