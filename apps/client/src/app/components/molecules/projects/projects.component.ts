import { Component, Input, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { RouterService } from '~services/router.service'
import { Projects, Project } from '~types/db/client/projects'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'

@Component({
  selector: 'app-m-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent extends SubscriptionsDirective {
  @Input() projects: Projects = []
  columns: string[] = ['icon', 'name', 'description'];

  constructor(private rSv: RouterService) {
    super()
  }

  onSelect(projectId: Project['id']): void {
    this.subscriptions.add(this.rSv.clientNavigate(['projects', projectId]).subscribe())
  }
}
