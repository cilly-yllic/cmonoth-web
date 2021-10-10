import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core'
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router'
import { Observable, Subject, throwError, of } from 'rxjs'
import { mergeMap, map, tap } from 'rxjs/operators'
import { Project } from '~types/db/client/projects'
import { Tree } from '~types/db/client/project/trees'
import { Task as ITask, Tasks } from '~types/db/client/project/tree/tasks'
import { Structure } from '~types/db/client/project/tree/structures'
import { TasksService, ListQuery, TasksAndStructure as ITasksAndStructure } from '~services/db/client/project/tree/tasks.service'
import { BehaviorSubjectClass } from '~utils/behavior-subject.class'
import { RouterService } from '~services/router.service'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'
import { UpdateDirective } from '../update.directive'

interface Task extends ITask {
  isParent: boolean
  isChild: boolean
}

type Weaken<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? any : T[P];
}

interface TasksAndStructure extends Weaken<ITasksAndStructure, 'tasks'> {
  tasks: Task[]
}

interface InputChange extends ListQuery {
  taskId: ITask['id']
}

interface ParentsChildren {
  parents: ITask[]
  children: ITask[]
}

interface Delete {
  projectId: Project['id']
  treeId: Tree['id']
  taskId: Task['id']
  taskNum: Task['incrementNum']
  structure: Structure
}

const findTask = (num: ITask['incrementNum'], tasks: ITask[]) => tasks.find((task) => task.incrementNum === num)
const findTasks = (nums: ITask['incrementNum'][], tasks: ITask[]): ITask[] => nums.map((num) => findTask(num, tasks)).filter((t) => !!t) as ITask[]

@Component({
  selector: 'app-m-task-relation-parents',
  templateUrl: './relation-parents.component.html',
  styleUrls: ['./relation-parents.component.scss'],
})
export class RelationParentsComponent extends UpdateDirective implements OnInit, OnChanges {
  sbj = new BehaviorSubjectClass<InputChange>()
  deleteSbj = new Subject<Delete>()

  tasksAndStructure$: Observable<TasksAndStructure> = this.sbj.observable.pipe(
    mergeMap(({ projectId, treeId, taskId }) => this.tasksSv.get(projectId, treeId).pipe(map(({ tasks, structure }) => ({ tasks, structure, taskId })))),
    mergeMap(({ tasks, structure, taskId }) => {
      console.log('tasks', tasks)
      console.log('structure', structure)
      const task = tasks.find((task) => task.id === taskId)
      if (!task) {
        return throwError(Error('cannot find task'))
      }
      console.log('task', task)
      const { parents, children } = structure.reduce((acc: ParentsChildren, columns) => {
        const columnsParentsAndChildren = columns.reduce((columnsAcc: ParentsChildren, cell) => {
          if (cell.num === task.incrementNum) {
            columnsAcc.children = columnsAcc.children.concat(findTasks(cell.children, tasks))
          } else if (cell.children.some((childNum) => childNum === task.incrementNum)) {
            const parent = findTask(cell.num, tasks)
            if (parent) {
              columnsAcc.parents.push(parent)
            }
          }
          return columnsAcc
        }, { parents: [], children: [] })
        return {
          parents: acc.parents.concat(columnsParentsAndChildren.parents),
          children: acc.children.concat(columnsParentsAndChildren.children),
        }
      }, { parents: [], children: [] })
      return of({
        tasks: tasks.map((t) => {
          return {
            ...t,
            isParent: parents.some((v) => v.id === t.id),
            isChild: children.some((v) => v.id === t.id),
          } as Task
        }),
        structure
      })
    }),
    tap(({ tasks }) => console.log(tasks))
  )

  constructor(private tasksSv: TasksService) {
    super()
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.deleteSbj.asObservable()
        .pipe(
          // TODO ここは削除でじゃなくて、relationの外しだけ
          // mergeMap(({ structure, projectId, treeId, taskId, taskNum }) => this.tasksSv.deleteAndUpdate(structure, projectId, treeId, taskId, taskNum))
        )
        .subscribe(
          () => {
            console.log('onDelete')
          }
        )
    )
  }
  ngOnChanges({ projectId, treeId, taskId }: SimpleChanges): void {
    if (!this.projectId || !this.treeId || !this.taskId) {
      return
    }
    this.sbj.next({ projectId: this.projectId, treeId: this.treeId, taskId: this.taskId })
  }

  onDelete(e: MouseEvent, id: Task['id'], taskNum: Task['incrementNum'], structure: Structure): void {
    e.stopPropagation()
    this.deleteSbj.next({ projectId: this.projectId, treeId: this.treeId, taskId: this.taskId, taskNum, structure })
  }
}
