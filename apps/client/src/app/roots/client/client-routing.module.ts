import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ClientComponent } from './client.component'
import { DashboardComponent } from '~pages/dashboard/dashboard.component'
// import { SettingsComponent } from '~pages/settings/settings.component'
import { ProjectsComponent } from '~pages/projects/projects.component'
// import { ProjectsService } from '~services/db/projects.service'
import { ProjectGuard } from '~pages/project/project.guard'
import { ProjectComponent } from '~pages/project/project.component'
import { TreesComponent } from '~pages/trees/trees.component'
// import { TreeComponent } from '~pages/tree/tree.component'
// import { TreesService } from '~services/db/trees.service'
// import { TreeGuard } from '~pages/tree/tree.guard'

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
    //   {
    //     path: 'settings',
    //     children: [
    //       {
    //         path: ':type',
    //         children: [
    //           { path: ':token', component: SettingsComponent },
    //           { path: '', component: SettingsComponent },
    //         ],
    //       },
    //       { path: '**', redirectTo: './email' },
    //     ],
    //   },
      { path: 'projects', pathMatch: 'full', component: ProjectsComponent },
      { path: 'projects/:projectId', component: ProjectComponent, canActivate: [ProjectGuard] },
      { path: 'trees', component: TreesComponent },
    //   { path: 'trees/:projectId/:treeId', component: TreeComponent, canActivate: [TreeGuard] },
      { path: '**', component: DashboardComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // providers: [ProjectsService, ProjectGuard, TreesService, TreeGuard],
})
export class ClientRoutingModule {}
