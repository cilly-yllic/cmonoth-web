import { Input, Directive } from '@angular/core'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'
import { Project } from '~types/db/client/projects'
import { Tree } from '~types/db/client/project/trees'
import { Task } from '~types/db/client/project/tree/tasks'

@Directive()
export class UpdateDirective extends SubscriptionsDirective {
  @Input() projectId: Project['id'] = ''
  @Input() treeId: Tree['id'] = ''
  @Input() taskId: Task['id'] = ''
}
