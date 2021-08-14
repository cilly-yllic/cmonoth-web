import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Observable } from 'rxjs'
import { map, flatMap, tap } from 'rxjs/operators'
import { SimpleSubscriptionsDirective } from '~extends/components/simple-subscriptions.directive'

import { BehaviorSubjectClass } from '~utils/behavior-subject.class'
import { ProjectsService } from '~services/db/projects.service'
import { TreesService, Get } from '~services/db/trees.service'
import { Trees, Tree } from '~types/trees'
import { Project } from '~types/projects'
import { getFormControl, FormControl } from '~utils/forms/control'
import { isDarker } from '~utils/color'

@Component({
  selector: 'app-m-tree-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
})
export class NameComponent extends SimpleSubscriptionsDirective {
  subjectClass = new BehaviorSubjectClass<Get>()

  name: FormControl = getFormControl('', { required: true })
  form: FormGroup = new FormGroup({ name: this.name })

  isEditMode = false
  loading = false
  _projectId: Project['id'] = ''
  @Input()
  set projectId(projectId: Project['id']) {
    this._projectId = projectId
    this.next()
  }
  get projectId(): Project['id'] {
    return this._projectId
  }

  _treeId: Tree['id'] = ''
  @Input()
  set treeId(treeId: Tree['id']) {
    this._treeId = treeId
    this.next()
  }
  get treeId(): Tree['id'] {
    return this._treeId
  }

  isDark$: Observable<boolean> = this.subjectClass.observable.pipe(
    flatMap(({ projectId }) => this.psSv.getOne(projectId)),
    map((project) => (project ? isDarker(project.color) : false))
  )
  name$: Observable<Tree['name']> = this.subjectClass.observable.pipe(
    flatMap(({ projectId, treeId }) => this.tsSv.getOne(projectId, treeId)),
    map((tree) => tree?.name || ''),
    tap((name) => this.name.setValue(name))
  )

  constructor(private psSv: ProjectsService, private tsSv: TreesService) {
    super()
  }

  next() {
    if (!this.projectId || !this.treeId) {
      return
    }
    this.subjectClass.next({ projectId: this.projectId, treeId: this.treeId })
  }

  onSubmit(e: Event) {
    e.stopPropagation()
    this.loading = true
    const subscription = this.tsSv
      .put(this.projectId, this.treeId, { name: this.name.value })
      .pipe(tap((v) => console.log('onClick', v)))
      .subscribe(
        () => {
          this.loading = false
          this.isEditMode = false
        },
        () => (this.loading = false)
      )
    this.subscriptions.add(subscription)
  }
}
