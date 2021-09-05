import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
// import { MatIconModule } from '@angular/material/icon'
// import { MatButtonModule } from '@angular/material/button'
import { TreeStructureComponent } from './tree-structure.component'

import { TasksService } from '~services/db/client/project/tree/tasks.service'
import { TaskCreateButtonModule } from '~atoms/task-create-button/task-create-button.module'
import { TasksModule } from '~molecules/tasks/tasks.module'
import { TaskRelationLinesModule } from '~molecules/task-relation-lines/task-relation-lines.module'
import { CreateModule } from '~molecules/task/create/create.module'

@NgModule({
  declarations: [TreeStructureComponent],
  imports: [CommonModule, TaskCreateButtonModule, TasksModule, TaskRelationLinesModule, CreateModule],
  exports: [TreeStructureComponent],
  providers: [TasksService],
})
export class TreeStructureModule {}
