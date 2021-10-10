import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core'
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router'
import { Observable, Subject } from 'rxjs'
import { mergeMap, map } from 'rxjs/operators'
import { Project } from '~types/db/client/projects'
import { Tree } from '~types/db/client/project/trees'
import { Task } from '~types/db/client/project/tree/tasks'
import { TasksService, EachQuery } from '~services/db/client/project/tree/tasks.service'
import { BehaviorSubjectClass } from '~utils/behavior-subject.class'
import { RouterService } from '~services/router.service'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'

interface Query {
  type?: string
}

interface Close {
  commands: any[]
  extra: NavigationExtras
}

@Component({
  selector: 'app-o-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent extends SubscriptionsDirective implements OnInit, OnChanges {
  sbj = new BehaviorSubjectClass<EachQuery>()
  closeSbj = new Subject<Close>()
  @Input() projectId: Project['id'] = ''
  @Input() treeId: Tree['id'] = ''
  @Input() taskId: Task['id'] = ''

  task$: Observable<Task | null> = this.sbj.observable.pipe(
    mergeMap(({ projectId, treeId, taskId }) => this.tasksSv.getOne(projectId, treeId, taskId))
  )

  id$ = this.task$.pipe(map((task) => task?.id))
  name$ = this.task$.pipe(map((task) => task?.name))
  isOpen$ = this.task$.pipe(map((task) => task?.isOpen))
  progressStatus$ = this.task$.pipe(map((task) => task?.progressStatus))
  description$ = this.task$.pipe(map((task) => task?.description))
  deadline$ = this.task$.pipe(map((task) => task?.deadline))

  constructor(private route: ActivatedRoute, private routerSv: RouterService, private tasksSv: TasksService) {
    super()
  }

  ngOnInit() {
    this.subscriptions.add(
      this.closeSbj.asObservable()
        .pipe(
          mergeMap(({ commands, extra }) => this.routerSv.clientNavigate(commands, extra))
        )
        .subscribe()
    )
  }

  ngOnChanges({ projectId, treeId, taskId }: SimpleChanges): void {
    console.log('ngOnChanges')
    console.log(projectId, treeId, taskId)
    if (!this.projectId || !this.treeId || !this.taskId) {
      return
    }
    this.sbj.next({ projectId: this.projectId, treeId: this.treeId, taskId: this.taskId })
  }

  private __getNavigationQueryParams(queryParams: Query = {}): NavigationExtras {
    const type = this.route.snapshot.queryParams.type
    if (type) {
      queryParams.type = type
    }
    return { queryParams }
  }

  onClose() {
    this.closeSbj.next({ commands: ['trees', this.projectId, this.treeId], extra: this.__getNavigationQueryParams() })
  }
}
