import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Observable, Subscription, Subject, combineLatest, of, throwError } from 'rxjs'
import { map, mergeMap, take, debounceTime, switchMap, first } from 'rxjs/operators'

import { CreateTaskAreaPosition, TaskPositions } from '~utils/tasks/tree-structure/tasks'
import { addMiddle } from '~utils/tasks/tree-structure/structure'
import { NewTaskService } from '~services/tasks/new-task.service'
import { TreesService } from '~services/db/client/project/trees.service'
import { TasksService } from '~services/db/client/project/tree/tasks.service'
import { Project } from '~types/db/client/projects'
import { Tree } from '~types/db/client/project/trees'
import { Task } from '~types/db/client/project/tree/tasks'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'
import { getSort } from '~utils/converters/array'

interface Submit {
  projectId: Project['id']
  treeId: Tree['id']
  params: {
    name: Task['name']
  }
  position: CreateTaskAreaPosition
}

@Component({
  selector: 'app-m-task-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends SubscriptionsDirective implements OnInit {
  submitSbj = new Subject<Submit>()
  @Input() projectId: Project['id'] = ''
  @Input() treeId: Tree['id'] = ''

  name: FormControl = new FormControl('', [Validators.required])
  form: FormGroup = new FormGroup({ name: this.name })

  position$ = this.newTaskSv.createTaskPosition$

  constructor(private treesSv: TreesService, private tasksSv: TasksService, private newTaskSv: NewTaskService) {
    super()
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.submitSbj.asObservable()
        .pipe(
          debounceTime(300),
          switchMap(({ projectId, treeId, params, position }) => combineLatest([
            this.treesSv.getOne(projectId, treeId),
            this.tasksSv.getOnesStructure(projectId, treeId),
            of(params),
            of(position)
          ])),
          first(),
          mergeMap(([tree, structure, { name }, position]) => {
            if (!tree) {
              return throwError(Error('tree is null'))
            }
            const incrementNum = tree.taskCount + 1
            return combineLatest([
              of({ incrementNum, structure, position }),
              this.treesSv.incrementTaskCount(tree.projectId, tree.id),
              this.tasksSv.post(name, tree.projectId, tree.id, incrementNum),

            ])
          }),
          map(([{ incrementNum, structure, position }]) => addMiddle(structure, position.parent.incrementNum, incrementNum, position.child?.incrementNum)),
          mergeMap((structure) => this.tasksSv.postOrUpdateStructure(structure, this.projectId, this.treeId))
        )
        .subscribe()
    )
  }

  onStopPropagation(e: Event) {
    e.stopPropagation()
  }

  onSubmit(e: Event, position: CreateTaskAreaPosition) {
    e.stopPropagation()
    this.submitSbj.next({ projectId: this.projectId, treeId: this.treeId, params: this.form.value, position })
    // const subscription = this.tasksSv
    //   .get(this.projectId, this.treeId)
    //   .pipe(
    //     take(1),
    //     mergeMap(({ tasks, structure }) => {
    //       const newTaskId = `${parseInt(getSort<Task>(tasks, 'id', 'DESC')[0].id, 10) + 1}`
    //       return this.tasksSv.post(this.name.value, this.projectId, this.treeId).pipe(map(() => ({ newTaskId, structure })))
    //     }),
    //     map(({ newTaskId, structure }) => addMiddle(structure, task.parent.id, newTaskId, task.child?.id)),
    //     mergeMap((structure) => this.tasksSv.postOrUpdateStructure(structure, this.projectId, this.treeId))
    //   )
    //   .subscribe()
    // this.subscriptions.add(subscription)
  }
}
