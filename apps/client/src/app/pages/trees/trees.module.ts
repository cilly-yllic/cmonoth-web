import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TreesModule as ListModule } from '~organisms/trees/trees.module'
import { CreateModule } from '~molecules/tree/create/create.module'
import { TreesComponent } from './trees.component'

@NgModule({
  declarations: [TreesComponent],
  imports: [CommonModule, ListModule, CreateModule],
})
export class TreesModule {}
