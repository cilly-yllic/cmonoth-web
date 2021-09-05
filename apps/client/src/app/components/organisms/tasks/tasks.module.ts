import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TasksComponent } from './tasks.component'

import { TreeStructureModule } from './tree-structure/tree-structure.module'

@NgModule({
  declarations: [TasksComponent],
  imports: [CommonModule, TreeStructureModule],
  exports: [TasksComponent],
})
export class TasksModule {}
