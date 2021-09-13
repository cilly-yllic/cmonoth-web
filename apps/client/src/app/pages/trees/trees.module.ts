import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BreadcrumbModule } from '~atoms/breadcrumb/breadcrumb.module'
import { TreesModule as ListModule } from '~organisms/trees/trees.module'
import { CreateModule } from '~molecules/tree/create/create.module'
import { TreesComponent } from './trees.component'

@NgModule({
  declarations: [TreesComponent],
  imports: [CommonModule, BreadcrumbModule, ListModule, CreateModule],
})
export class TreesModule {}
