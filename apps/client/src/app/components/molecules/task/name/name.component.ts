import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Task } from '~types/db/client/project/tree/tasks'

import { UpdateDirective } from '../update.directive'
import { TasksService } from '~services/db/client/project/tree/tasks.service'

@Component({
  selector: 'app-m-task-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
})
export class NameComponent extends UpdateDirective {
  _name: FormControl = new FormControl('', [Validators.required])
  form: FormGroup = new FormGroup({ name: this._name })
  backup = ''
  @Input() set name(_name: Task['name'] | null | undefined) {
    const name = _name || ''
    this._name.setValue(name)
    this.backup = name
  }

  editMode = false
  updating = false

  constructor(private tasksSv: TasksService) {
    super()
  }

  onCancel(): void {
    this.editMode = false
    this._name.setValue(this.backup)
  }

  changeName(e: Event): void {
    e.stopPropagation()
    this.editMode = false
    this.updating = true
    const subscription = this.tasksSv.put(this.projectId, this.treeId, this.taskId, { name: this._name.value }).subscribe(
      () => (this.updating = false),
      () => (this.updating = false)
    )
    this.subscriptions.add(subscription)
  }
}
