import { Component, Input } from '@angular/core'

import { TasksService } from '~services/db/client/project/tree/tasks.service'
import { UpdateDirective } from '../update.directive'

@Component({
  selector: 'app-m-task-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.scss'],
})
export class OpenComponent extends UpdateDirective {
  @Input() isOpen: boolean | null | undefined = false

  constructor(protected tasksSv: TasksService) {
    super()
  }

  onClick() {
    this.subscriptions.add(this.tasksSv.put(this.projectId, this.treeId, this.taskId, { isOpen: !this.isOpen }).subscribe())
  }
}
