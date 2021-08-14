import { Component } from '@angular/core'
import { MatTabChangeEvent } from '@angular/material/tabs'
import { Observable, of } from 'rxjs'
import { tap, map } from 'rxjs/operators'

import { ProjectsService } from '~services/db/client/projects.service'
import { Projects, Project } from '~types/db/client/projects'
import { getOpenCloseList, TABS } from '~utils/converters/observables/open-close-group'

@Component({
  selector: 'app-o-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  loading = true
  tabs = TABS
  isOpen = TABS.open
  projects$ = getOpenCloseList<Project>(this.projectsSv.get()).pipe(tap(() => (this.loading = false)))
  constructor(private projectsSv: ProjectsService) {}

  onSelectIsOpen(event: MatTabChangeEvent): void {
    this.isOpen = event.tab.content?.viewContainerRef.element.nativeElement.getAttribute('data-isOpen')
  }
}
