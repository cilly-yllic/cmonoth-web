import { Component, Input } from '@angular/core'
import { Observable } from 'rxjs'
import { map, flatMap, tap } from 'rxjs/operators'
import { SimpleSubscriptionsDirective } from '~extends/components/simple-subscriptions.directive'

import { BehaviorSubjectClass } from '~utils/behavior-subject.class'
import { TreesService, Get } from '~services/db/trees.service'
import { Trees, Tree } from '~types/trees'
import { Project } from '~types/projects'

@Component({
  selector: 'app-m-tree-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.scss'],
})
export class OpenComponent extends SimpleSubscriptionsDirective {
  subjectClass = new BehaviorSubjectClass<Get>()

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

  updating = false
  tree$: Observable<Tree | null> = this.subjectClass.observable.pipe(
    flatMap(({ projectId, treeId }) => this.tsSv.getOne(projectId, treeId))
  )

  constructor(private tsSv: TreesService) {
    super()
  }

  next() {
    if (!this.projectId || !this.treeId) {
      return
    }
    this.subjectClass.next({ projectId: this.projectId, treeId: this.treeId })
  }

  onClick(isOpen: boolean): void {
    this.updating = true
    const subscription = this.tsSv
      .put(this.projectId, this.treeId, { isOpen })
      .pipe(tap((v) => console.log('onClick', v)))
      .subscribe(
        () => (this.updating = false),
        () => (this.updating = false)
      )
    this.subscriptions.add(subscription)
  }
}
