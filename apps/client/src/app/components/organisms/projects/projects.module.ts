import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTabsModule } from '@angular/material/tabs'
import { ProjectsComponent } from './projects.component'

import { SpinnerModule } from '~atoms/spinner/spinner.module'
import { ProjectsModule as ListModule } from '~molecules/projects/projects.module'

@NgModule({
  declarations: [ProjectsComponent],
  imports: [CommonModule, MatTabsModule, SpinnerModule, ListModule],
  exports: [ProjectsComponent],
})
export class ProjectsModule {}
