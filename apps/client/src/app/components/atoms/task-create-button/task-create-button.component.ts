import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { NewTaskService } from '~services/tasks/new-task.service'
import { Line, MiddlePoint, getLineMiddlePoint } from '~utils/tasks/tree-structure/lines'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'

@Component({
  selector: 'app-a-task-create-button',
  templateUrl: './task-create-button.component.html',
  styleUrls: ['./task-create-button.component.scss'],
})
export class TaskCreateButtonComponent extends SubscriptionsDirective implements OnInit {
  position: MiddlePoint | null = null
  hoveringPosition: MiddlePoint | null = null
  constructor(private newTaskSv: NewTaskService) {
    super()
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.newTaskSv.createButtonPosition$.subscribe((position) => {
        this.position = position
      })
    )
  }

  onClick(e: Event, position: MiddlePoint) {
    e.stopPropagation()
    this.newTaskSv.createTaskCondition(position.parentTask, position.childTask)
  }

  get current(): MiddlePoint | null {
    return this.position || this.hoveringPosition
  }

  onEnter(line: MiddlePoint) {
    this.hoveringPosition = line
  }

  onLeave() {
    this.hoveringPosition = null
  }
}
