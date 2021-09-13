import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { ProjectsComponent } from './projects.component'

import { BreadcrumbModule } from '~atoms/breadcrumb/breadcrumb.module'
import { ProjectsModule as ListModule } from '~organisms/projects/projects.module'
import { CreateModule } from '~molecules/project/create/create.module'

@NgModule({
  declarations: [ProjectsComponent],
  imports: [CommonModule, MatIconModule, BreadcrumbModule, ListModule, CreateModule],
})
export class ProjectsModule {}
