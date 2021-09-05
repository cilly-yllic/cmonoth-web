import { Component, OnInit, Input } from '@angular/core'
import { Observable, of, timer } from 'rxjs'
import { tap, map } from 'rxjs/operators'
import { BehaviorSubjectClass } from '~utils/behavior-subject.class'
import { get, Line } from '~utils/tasks/tree-structure/lines'
import { getTargetMap } from '~utils/converters/array'
import { TaskPositions, TaskPosition } from '~utils/tasks/tree-structure/tasks'
import { get as getFrame, Frame } from '~utils/tasks/tree-structure/frame'
import { TASKS } from '~configs'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'
import { NewTaskService } from '~services/tasks/new-task.service'

@Component({
  selector: 'app-m-task-relation-lines',
  templateUrl: './task-relation-lines.component.html',
  styleUrls: ['./task-relation-lines.component.scss'],
})
export class TaskRelationLinesComponent extends SubscriptionsDirective {
  @Input()
  set tasks(tasks: TaskPositions) {
    this.subjectClass.next(tasks)
  }
  @Input() frame: Frame | null = null
  subjectClass = new BehaviorSubjectClass<TaskPositions>()
  lines$: Observable<Line[]> = this.subjectClass.observable.pipe(
    map((tasks) => {
      const lines: Line[] = []
      const numMap = getTargetMap<TaskPosition>(tasks, 'incrementNum')
      tasks.forEach((task) => {
        task.children.forEach((num) => {
          if (numMap.has(num)) {
            lines.push(get(task, numMap.get(num) as TaskPosition))
          }
        })
      })
      return lines
    })
  )

  hoveringLine: Line | null = null
  createTaskLine$ = this.newTaskSv.createTaskLine$

  constructor(private newTaskSv: NewTaskService) {
    super()
  }

  onRelatedLineEnter(line: Line) {
    this.hoveringLine = line
    line.stroke = TASKS.TREE_STRUCTURE.STROKES.HOVERING
    this.newTaskSv.hoverLine(line)
  }

  onRelatedLineLeave(line: Line) {
    this.hoveringLine = null
    timer(1000).subscribe(() => {
      if (this.hoveringLine === line) {
        return
      }
      line.stroke = TASKS.TREE_STRUCTURE.STROKES.DEFAULT
      this.newTaskSv.hoverLine(null)
    })
  }
}
