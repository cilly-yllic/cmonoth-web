import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { Observable } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'

import { BehaviorSubjectClass } from '~utils/behavior-subject.class'
import { TasksService, ListQuery } from '~services/db/client/project/tree/tasks.service'
import { Project } from '~types/db/client/projects'
import { Tree } from '~types/db/client/project/trees'
import { Task, Structure } from '~types/db/client/project/tree/tasks'
import { get as getTasks, TaskPositions } from '~utils/tasks/tree-structure/tasks'
import { get as getFrame, Frame } from '~utils/tasks/tree-structure/frame'
import { getTargetMap } from '~utils/converters/array'
import { Line } from '~utils/tasks/tree-structure/lines'

@Component({
  selector: 'app-o-tasks-tree-structure',
  templateUrl: './tree-structure.component.html',
  styleUrls: ['./tree-structure.component.scss'],
})
export class TreeStructureComponent extends SubscriptionsDirective implements OnChanges {
  subjectClass = new BehaviorSubjectClass<ListQuery>()

  @Input() projectId: Project['id'] = ''
  @Input() treeId: Tree['id'] = ''

  tasksAndStructure$ = this.subjectClass.observable.pipe(mergeMap(({ projectId, treeId }) => this.tasksSv.get(projectId, treeId)))

  tasks$: Observable<TaskPositions> = this.tasksAndStructure$.pipe(map((v) => getTasks(getTargetMap<Task>(v.tasks, 'incrementNum'), v.structure)))

  frame$: Observable<Frame> = this.tasksAndStructure$.pipe(map((v) => getFrame(v.structure)))

  constructor(private tasksSv: TasksService) {
    super()
  }

  ngOnChanges({ projectId, treeId }: SimpleChanges): void {
    if (!projectId.currentValue || !treeId.currentValue) {
      return
    }
    this.subjectClass.next({ projectId: projectId.currentValue, treeId: treeId.currentValue })
  }

  onStopPropagation(e: Event): void {
    e.stopPropagation()
  }
}
