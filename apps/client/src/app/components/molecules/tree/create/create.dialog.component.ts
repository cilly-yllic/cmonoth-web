import { Component, Inject, OnInit, Input } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Observable, Subscription, of, Subject, combineLatest } from 'rxjs'
import { map, mergeMap, tap } from 'rxjs/operators'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog'

import { setConfig } from '~dialogs'
import { Project, Projects } from '~types/db/client/projects'
import { RouterService } from '~services/router.service'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'
import { ProjectsService } from '~services/db/client/projects.service'
import { TreesService } from '~services/db/client/project/trees.service'
import { TasksService } from '~services/db/client/project/tree/tasks.service'

interface Submit {
  name: Project['name']
  projectId: Project['id']
}

@Component({
  templateUrl: './create.dialog.component.html',
})
export class CreateDialogComponent extends SubscriptionsDirective implements OnInit {
  updating = false
  projectId: Project['id'] = ''
  projects$: Observable<Projects> = of([])

  submitSbj = new Subject<Submit>()
  project: FormControl = new FormControl({}, [Validators.required])
  name: FormControl = new FormControl('', [Validators.required])
  form: FormGroup = new FormGroup({ name: this.name })

  constructor(
    private dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private projectsSv: ProjectsService,
    private treesSv: TreesService,
    private tasksSv: TasksService
  ) {
    super()
  }

  private __setSubmit(): Subscription {
    return this.submitSbj.asObservable()
      .pipe(
        mergeMap(({ name, projectId }) => this.treesSv.post(name, projectId)),
        mergeMap((tree) => this.tasksSv.post(tree.name, tree.projectId, tree.id, '1')),
        mergeMap((task) =>
          this.tasksSv.postOrUpdateStructure([[{ id: task.id, children: [] }]], task.projectId, task.treeId, true).pipe(map(() => task))
        )
      )
      .subscribe(
        (res) => this.dialogRef.close(res),
        (e) => {
          this.updating = false
          console.error('error', e)
        },
        () => {
          this.form.reset()
          this.updating = false
        }
      )
  }

  ngOnInit(): void {
    if (this.data.projectId) {
      this.projectId = this.data.projectId
    }
    this.__setProjects()
    this.subscriptions.add(this.__setSubmit())
  }

  private __setProjects(): void {
    if (!!this.projectId) {
      return
    }
    this.form.addControl('project', this.project)
    this.projects$ = this.projectsSv.get().pipe(
      map((projects) => projects.filter((project) => project.isOpen)),
      tap((projects) => {
        this.project.patchValue(projects[0])
      })
    )
  }

  onSubmit(event: Event): void {
    event.stopPropagation()
    this.updating = true
    this.submitSbj.next({ ...this.form.value, ...(this.projectId ? { projectId: this.projectId } : {}) })
  }
}
