import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTabsModule } from '@angular/material/tabs'

import { SpinnerModule } from '~atoms/spinner/spinner.module'
import { TreesModule as ListModule } from '~molecules/trees/trees.module'
import { TreesComponent } from './trees.component'

@NgModule({
  declarations: [TreesComponent],
  imports: [CommonModule, MatTabsModule, SpinnerModule, ListModule],
  exports: [TreesComponent],
})
export class TreesModule {}
