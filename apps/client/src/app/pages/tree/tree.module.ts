import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TreeComponent } from './tree.component'

// import { BreadcrumbsModule } from '~atoms/breadcrumbs/breadcrumbs.module'
import { AreaMoverModule } from '~atoms/area-mover/area-mover.module'
import { NameModule } from '~molecules/tree/name/name.module'
import { DeleteModule } from '~molecules/tree/delete/delete.module'
import { OpenModule } from '~molecules/tree/open/open.module'
import { ButtonsModule } from '~molecules/tasks-menu/buttons/buttons.module'
import { GroupModule } from '~molecules/tasks-menu/group/group.module'
import { FilteringModule } from '~molecules/tasks-menu/filtering/filtering.module'
import { TasksModule } from '~organisms/tasks/tasks.module'
import { TaskModule } from '~organisms/task/task.module'

@NgModule({
  declarations: [TreeComponent],
  imports: [
    CommonModule,

    // BreadcrumbsModule,
    AreaMoverModule,
    NameModule,
    DeleteModule,
    OpenModule,
    ButtonsModule,
    GroupModule,
    FilteringModule,
    TasksModule,
    TaskModule,
  ]
})
export class TreeModule {}
