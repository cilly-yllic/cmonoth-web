import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
// import { BreadcrumbsModule } from '~atoms/breadcrumbs/breadcrumbs.module'
import { TreesModule } from '~organisms/trees/trees.module'
import { EditModule } from '~organisms/project/edit/edit.module'
import { CreateModule } from '~molecules/tree/create/create.module'
import { ProjectComponent } from './project.component'

@NgModule({
  declarations: [ProjectComponent],
  // imports: [CommonModule, MatButtonModule, MatIconModule, BreadcrumbsModule, TreesModule, EditModule, CreateModule],
  imports: [CommonModule, MatButtonModule, MatIconModule, CreateModule, TreesModule, EditModule],
})
export class ProjectModule {}
