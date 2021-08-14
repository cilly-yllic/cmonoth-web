import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map, flatMap, tap } from 'rxjs/operators'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { SimpleSubscriptionsDirective } from '~extends/components/simple-subscriptions.directive'

import { BehaviorSubjectClass } from '~utils/behavior-subject.class'
import { TreesService, Get } from '~services/db/trees.service'
import { RouterService } from '~core/router.service'
import { Trees, Tree } from '~types/trees'
import { Project } from '~types/projects'

import { setConfig } from '~utils/dialog'

import { AlternativeComponent } from '~dialogs/alternative/alternative.component'

@Component({
  selector: 'app-m-tree-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent extends SimpleSubscriptionsDirective {
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

  tree$: Observable<Tree | null> = this.subjectClass.observable.pipe(
    flatMap(({ projectId, treeId }) => this.tsSv.getOne(projectId, treeId))
  )

  constructor(private dialog: MatDialog, private tsSv: TreesService, private rSv: RouterService) {
    super()
  }

  next() {
    if (!this.projectId || !this.treeId) {
      return
    }
    this.subjectClass.next({ projectId: this.projectId, treeId: this.treeId })
  }

  showDialog(options?: MatDialogConfig): void {
    const dialogConfig = setConfig(options)
    const dialogRef = this.dialog.open(AlternativeComponent, dialogConfig)
    const subscription = dialogRef.afterClosed().subscribe((submitted) => {
      if (submitted) {
        this.__onDeleteProject()
      }
    })
    this.subscriptions.add(subscription)
  }

  private __onDeleteProject(): void {
    const subscription = this.tsSv
      .delete(this.projectId, this.treeId)
      .pipe(flatMap(() => this.rSv.clientNavigate(['projects', this.projectId])))
      .subscribe()
    this.subscriptions.add(subscription)
  }
}
