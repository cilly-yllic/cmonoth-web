import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table'
import { TreesComponent } from './trees.component'

@NgModule({
  declarations: [TreesComponent],
  imports: [CommonModule, MatTableModule],
  exports: [TreesComponent],
})
export class TreesModule {}
