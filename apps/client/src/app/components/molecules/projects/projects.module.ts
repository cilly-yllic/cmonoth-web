import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { ProjectsComponent } from './projects.component'

@NgModule({
  declarations: [ProjectsComponent],
  imports: [CommonModule, MatPaginatorModule, MatTableModule],
  exports: [ProjectsComponent],
})
export class ProjectsModule {}
