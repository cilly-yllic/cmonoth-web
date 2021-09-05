import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Observable, Subject } from 'rxjs'
import { map, mergeMap, tap, debounceTime, switchMap } from 'rxjs/operators'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'

import { BehaviorSubjectClass } from '~utils/behavior-subject.class'
import { ProjectsService } from '~services/db/client/projects.service'
import { TreesService, EachQuery } from '~services/db/client/project/trees.service'
import { Trees, Tree } from '~types/db/client/project/trees'
import { Project } from '~types/db/client/projects'
import { isDarker } from '~utils/color'

interface Submit {
  projectId: Project['id']
  treeId: Tree['id']
  param: {
    name: Tree['name']
  }
}

@Component({
  selector: 'app-m-tree-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
})
export class NameComponent extends SubscriptionsDirective implements OnInit, OnChanges {
  subjectClass = new BehaviorSubjectClass<EachQuery>()
  submitSbj = new Subject<Submit>()

  name: FormControl = new FormControl('', [Validators.required])
  form: FormGroup = new FormGroup({ name: this.name })

  isEditMode = false
  loading = false
  @Input() projectId: Project['id'] = ''
  @Input() treeId: Tree['id'] = ''

  isDark$: Observable<boolean> = this.subjectClass.observable.pipe(
    mergeMap(({ projectId }) => this.projectsSv.getOne(projectId)),
    map((project) => (project ? isDarker(project.color) : false))
  )
  name$: Observable<Tree['name']> = this.subjectClass.observable.pipe(
    mergeMap(({ projectId, treeId }) => this.treesSv.getOne(projectId, treeId)),
    map((tree) => tree?.name || ''),
    tap((name) => this.name.setValue(name))
  )

  constructor(private projectsSv: ProjectsService, private treesSv: TreesService) {
    super()
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.submitSbj.asObservable()
        .pipe(
          debounceTime(300),
          switchMap(({ projectId, treeId, param }) => this.treesSv.put(projectId, treeId, param))
        )
        .subscribe(
          () => {
            this.loading = false
            this.isEditMode = false
          },
          () => (this.loading = false)
        )
    )
  }

  ngOnChanges({ projectId, treeId }: SimpleChanges): void {
    if (!projectId.currentValue || !treeId.currentValue) {
      return
    }
    this.subjectClass.next({ projectId: projectId.currentValue, treeId: treeId.currentValue })
  }

  onSubmit(e: Event) {
    e.stopPropagation()
    this.loading = true
    this.submitSbj.next({
      projectId: this.projectId,
      treeId: this.treeId,
      param: this.form.value
    })
  }
}
