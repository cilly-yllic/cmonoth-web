import { Component } from '@angular/core'
import { getBreadcrumb, Breadcrumb } from '~atoms/breadcrumb'

@Component({
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  breadcrumbs: Breadcrumb[] = getBreadcrumb('projects')
}
