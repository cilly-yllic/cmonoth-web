import { Injectable } from '@angular/core'
import { Observable, of, timer } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { BehaviorSubjectClass } from '~utils/behavior-subject.class'
import { Line, MiddlePoint, getLineMiddlePoint, get as getLine, getNewLine } from '~utils/tasks/tree-structure/lines'
import { TaskPosition, getCreateTaskAreaPosition, CreateTaskAreaPosition } from '~utils/tasks/tree-structure/tasks'

interface Condition {
  parent: TaskPosition
  child?: TaskPosition | null
}

@Injectable({
  providedIn: 'root',
})
export class NewTaskService {
  hoveringLineSbj = new BehaviorSubjectClass<Line | null>()
  createTaskSbj = new BehaviorSubjectClass<Condition | null>()

  createButtonPosition$: Observable<MiddlePoint | null> = this.hoveringLineSbj.observable.pipe(
    map((line) => (line ? getLineMiddlePoint(line) : null))
  )

  createTaskPosition$: Observable<CreateTaskAreaPosition | null> = this.createTaskSbj.observable.pipe(
    map((condition) => condition ? getCreateTaskAreaPosition(condition.parent, condition.child) : null),
    tap((v) => console.log('v', v))
  )
  createTaskLine$ = this.createTaskPosition$.pipe(map((position) => position ? getNewLine(position.parent, position) : null))

  constructor() {}

  hoverLine(line: Line | null) {
    this.hoveringLineSbj.next(line)
  }
  createTaskCondition(parent: TaskPosition, child?: TaskPosition | null) {
    this.createTaskSbj.next({ parent, child })
  }
  complete() {
    this.createTaskSbj.next(null)
  }
}
