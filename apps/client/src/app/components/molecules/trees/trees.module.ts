import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { TreesComponent } from './trees.component'

@NgModule({
  declarations: [TreesComponent],
  imports: [CommonModule, MatPaginatorModule, MatTableModule],
  exports: [TreesComponent],
})
export class TreesModule {}
