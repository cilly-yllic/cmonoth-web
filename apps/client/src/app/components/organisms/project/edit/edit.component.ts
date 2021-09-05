import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core'
import { FormControl, Validators, FormGroup, Form } from '@angular/forms'
import { Subscription, of, forkJoin, Observable, combineLatest, Subject } from 'rxjs'
import { map, take, finalize, mergeMap, tap } from 'rxjs/operators'

import { ClientService } from '~services/db/client.service'
import { Project } from '~types/db/client/projects'
import { BehaviorSubjectClass } from '~utils/behavior-subject.class'
import { ProjectsService } from '~services/db/client/projects.service'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'
import { DEFAULT_COLOR } from '~atoms/color-picker/color-picker.component'
export { DEFAULT_COLOR } from '~atoms/color-picker/color-picker.component'

export type ColorChange = string
interface FormValue {
  name: Project['name']
  isOpen: Project['isOpen']
  color: Project['color']
  restriction?: Project['restriction']
  slackUrl?: Project['slackUrl']
}
interface Submit {
  projectId: Project['id']
  value: FormValue
}

@Component({
  selector: 'app-o-project-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent extends SubscriptionsDirective implements OnInit, OnChanges {
  sbj = new BehaviorSubjectClass<Project['id']>()

  @Input() projectId: Project['id'] = ''
  @Output() colorChanged: EventEmitter<ColorChange> = new EventEmitter()
  @Output() submitted: EventEmitter<unknown> = new EventEmitter()

  isOrg = false
  isOrg$ = this.clientSv.isOrg$.pipe(tap((isOrg) => this.isOrg = isOrg))
  project$ = this.sbj.observable.pipe(mergeMap((projectId) => this.projectsSv.getOne(projectId)))
  iconUrl$ = this.project$.pipe(map((project) => project?.iconPath))

  name: FormControl = new FormControl('', [Validators.required])
  isOpen: FormControl = new FormControl(false, [Validators.required])
  color: FormControl = new FormControl('')
  restriction: FormControl = new FormControl('', [Validators.required])
  slackUrl: FormControl = new FormControl('')
  form: FormGroup = new FormGroup({ name: this.name, isOpen: this.isOpen, color: this.color })
  _backup!: Project | {}
  updating = false

  submitSbj = new Subject<Submit>()

  constructor(private clientSv: ClientService, private projectsSv: ProjectsService) {
    super()
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.color.valueChanges.subscribe(
        (value) => {
          this.colorChanged.emit(value)
        }
      )
    )
    this.subscriptions.add(
      combineLatest([this.isOrg$, this.project$])
        .pipe(
          tap(([_, project]) => (this.backup = project || {})),
          tap(([isOrg, project]) => {
            this.name.patchValue(project?.name || '')
            this.isOpen.patchValue(project?.isOpen || false)
            this.color.patchValue(project?.color || DEFAULT_COLOR)

            if (isOrg) {
              this.restriction.patchValue(project?.restriction || '')
              this.slackUrl.patchValue(project?.slackUrl || '')
              if (!('restriction' in this.form.controls)) {
                this.form.addControl('restriction', this.restriction)
              }
              if (!('slackUrl' in this.form.controls)) {
                this.form.addControl('slackUrl', this.slackUrl)
              }
            }
          })
        )
        .subscribe(() => {
        })
    )
    this.subscriptions.add(
      this.submitSbj.asObservable()
        .pipe(
          mergeMap(({ projectId, value }) => this.projectsSv.put(projectId, value))
        )
        .subscribe(
          () => {
            this.updating = false
            this.submitted.next()
          },
          () => this.updating = false
        )
    )
  }

  set backup(backup: Project | {}) {
    this._backup = backup
  }
  get backup(): Project | {} {
    return this._backup
  }

  get backupForm(): FormValue {
    return {
      name: 'name' in this.backup ? this.backup.name || '' : '',
      isOpen: 'isOpen' in this.backup ? this.backup.isOpen || false : false,
      color: 'color' in this.backup ? this.backup.color || DEFAULT_COLOR : DEFAULT_COLOR,
      ...(
        this.isOrg
          ? {
            restriction: 'restriction' in this.backup ? this.backup.restriction || '' : '',
            slackUrl: 'slackUrl' in this.backup ? this.backup.slackUrl || '' : '',
          }
          : {}
      ),
    }
  }

  get colorDisabled(): boolean {
    return this.backupForm.color === this.color.value
  }
  get disabled(): boolean {
    return JSON.stringify(this.backupForm) === JSON.stringify(this.form.value)
  }

  ngOnChanges() {
    if (!this.projectId) {
      return
    }
    this.sbj.next(this.projectId)
  }

  onCancel(key: keyof Project): void {
    const value = (this.backup as Project)[key]
    if (key === 'color') {
      this.colorChanged.emit((value || DEFAULT_COLOR) as ColorChange)
    }
    this.form.patchValue({ [key]: value })
    // https://hooks.slack.com/services/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
  }

  onSave(e: Event) {
    e.stopPropagation()
    this.updating = true
    this.submitSbj.next({ projectId: this.projectId, value: this.form.value })
  }
}
