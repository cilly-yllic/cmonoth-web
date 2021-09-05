import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { Observable, Subject, of, combineLatest } from 'rxjs'
import { debounceTime, map, mergeMap, switchMap, tap } from 'rxjs/operators'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'

import { BehaviorSubjectClass } from '~utils/behavior-subject.class'
import { TreesService, EachQuery } from '~services/db/client/project/trees.service'
import { RouterService } from '~services/router.service'
import { Project } from '~types/db/client/projects'
import { Trees, Tree } from '~types/db/client/project/trees'

import { AlternativeComponent, setConfig } from '~dialogs'

interface Submit {
  projectId: Project['id']
  treeId: Tree['id']
}

@Component({
  selector: 'app-m-tree-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent extends SubscriptionsDirective implements OnInit, OnChanges {
  subjectClass = new BehaviorSubjectClass<EachQuery>()
  submitSbj = new Subject<Submit>()

  @Input() projectId: Project['id'] = ''
  @Input() treeId: Tree['id'] = ''

  updating = false
  tree$: Observable<Tree | null> = this.subjectClass.observable.pipe(
    mergeMap(({ projectId, treeId }) => this.treesSv.getOne(projectId, treeId))
  )

  constructor(private dialog: MatDialog, private treesSv: TreesService, private routerSv: RouterService) {
    super()
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.submitSbj.asObservable()
        .pipe(
          debounceTime(300),
          switchMap(({ projectId, treeId }) => combineLatest([of(projectId), this.treesSv.delete(projectId, treeId)])),
          mergeMap(([projectId, _]) => this.routerSv.clientNavigate(['projects', projectId]))
        )
        .subscribe(
          () => (this.updating = false),
          () => (this.updating = false)
        )
    )
  }

  ngOnChanges({ projectId, treeId }: SimpleChanges): void {
    if (!projectId.currentValue || !treeId.currentValue) {
      return
    }
    this.subjectClass.next({ projectId: projectId.currentValue, treeId: treeId.currentValue })
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
    this.updating = true
    this.submitSbj.next({
      projectId: this.projectId,
      treeId: this.treeId,
    })
  }
}
