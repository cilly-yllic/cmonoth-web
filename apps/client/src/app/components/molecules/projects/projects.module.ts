import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table'
import { ProjectsComponent } from './projects.component'

@NgModule({
  declarations: [ProjectsComponent],
  imports: [CommonModule, MatTableModule],
  exports: [ProjectsComponent],
})
export class ProjectsModule {}
