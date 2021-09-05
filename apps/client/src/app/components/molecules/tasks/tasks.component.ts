import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router'
import { TaskPositions, TaskPosition } from '~utils/tasks/tree-structure/tasks'
import { NewTaskService } from '~services/tasks/new-task.service'
import { RouterService } from '~services/router.service'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'

interface Query {
  type?: string
  id?: string
}

@Component({
  selector: 'app-m-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent extends SubscriptionsDirective {
  @Input() tasks: TaskPositions = []

  constructor(private route: ActivatedRoute, private routerSv: RouterService, private newTaskSv: NewTaskService) {
    super()
  }

  checkTaskStyle(id: TaskPosition['id']) {
    return 'div_border'
  }

  private __getNavigationQueryParams(queryParams: Query = {}): NavigationExtras {
    const type = this.route.snapshot.queryParams.type
    if (type) {
      queryParams.type = type
    }
    return { queryParams }
  }

  onSelectTask(e: Event, task: TaskPosition) {
    this.subscriptions.add(
      this.routerSv.clientNavigate(['trees', task.projectId, task.treeId], this.__getNavigationQueryParams({ id: task.id })).subscribe()
    )
  }

  onTaskMouseEnter(id: TaskPosition['id']) {}

  onTaskMouseLeave() {}

  onCreateChild(e: Event, task: TaskPosition) {
    e.stopPropagation()
    this.newTaskSv.createTaskCondition(task)
  }
}
