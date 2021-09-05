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
  createTaskSbj = new BehaviorSubjectClass<Condition>()

  createButtonPosition$: Observable<MiddlePoint | null> = this.hoveringLineSbj.observable.pipe(
    map((line) => (line ? getLineMiddlePoint(line) : null))
  )

  createTaskPosition$: Observable<CreateTaskAreaPosition> = this.createTaskSbj.observable.pipe(
    map(({ parent, child }) => getCreateTaskAreaPosition(parent, child)),
    tap((v) => console.log('v', v))
  )
  createTaskLine$ = this.createTaskPosition$.pipe(map((position) => getNewLine(position.parent, position)))

  constructor() {}

  hoverLine(line: Line | null) {
    this.hoveringLineSbj.next(line)
  }
  createTaskCondition(parent: TaskPosition, child?: TaskPosition | null) {
    this.createTaskSbj.next({ parent, child })
  }
}
