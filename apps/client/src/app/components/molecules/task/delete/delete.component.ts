import { Component, OnInit, Input } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { map, mergeMap, first } from 'rxjs/operators'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { Project } from '~types/db/client/projects'
import { Tree } from '~types/db/client/project/trees'
import { Task } from '~types/db/client/project/tree/tasks'

import { AlternativeComponent, setConfig } from '~dialogs'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'
import { TasksService } from '~services/db/client/project/tree/tasks.service'

@Component({
  selector: 'app-m-task-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent extends SubscriptionsDirective {
  @Input() task: Task | null = null

  constructor(private dialog: MatDialog, private tasksSv: TasksService) {
    super()
  }

  showDialog(e: Event, options?: MatDialogConfig): void {
    e.stopPropagation()
    const subscription = this.dialog
      .open(AlternativeComponent, setConfig(options))
      .afterClosed()
      .subscribe((submitted) => {
        if (submitted) {
          this.__onDelete()
        }
      })
    this.subscriptions.add(subscription)
  }

  private __onDelete(): void {
    if (!this.task?.projectId || !this.task?.treeId || !this.task?.id) {
      return
    }
    const projectId = this.task?.projectId as Project['id']
    const treeId = this.task?.treeId as Tree['id']
    const taskId = this.task?.id as Task['id']
    const taskNum = this.task?.incrementNum as Task['incrementNum']
    console.log('__onDelete', this.task)
    this.tasksSv
      .getOnesStructure(projectId, treeId)
      .pipe(
        first(),
        mergeMap((structure) => this.tasksSv.deleteAndUpdate(structure, projectId, treeId, taskId, taskNum))
      )
      .subscribe()
  }
}
