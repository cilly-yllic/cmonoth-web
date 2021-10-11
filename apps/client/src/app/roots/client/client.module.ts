import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DefaultModule } from '~layouts/default/default.module'

import { ClientRoutingModule } from './client-routing.module'
import { ClientComponent } from './client.component'

// pages
import { DashboardModule } from '~pages/dashboard/dashboard.module'
import { SettingsModule } from '~pages/settings/settings.module'
import { ProjectsModule } from '~pages/projects/projects.module'
import { ProjectModule } from '~pages/project/project.module'
import { TreesModule } from '~pages/trees/trees.module'
import { TreeModule } from '~pages/tree/tree.module'

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    DefaultModule,
    DashboardModule,
    SettingsModule,
    ProjectsModule,
    ProjectModule,
    TreesModule,
    TreeModule,
  ],
})
export class ClientModule {}
