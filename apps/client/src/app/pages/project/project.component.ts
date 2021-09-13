import { Component, ViewChild, AfterViewInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ProjectsService } from '~services/db/client/projects.service'
import { EditComponent, DEFAULT_COLOR } from '~organisms/project/edit/edit.component'
import { getBreadcrumb, Breadcrumb } from '~atoms/breadcrumb'

@Component({
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  @ViewChild(EditComponent) component!: EditComponent
  projectId = this.route.snapshot.params.projectId
  project$ = this.projectsSv.getOne(this.projectId)
  isEdit = false
  breadcrumbs$: Observable<Breadcrumb[]> = this.project$.pipe(
    map((project) => getBreadcrumb('project', project))
  )

  isLockedDeactivate = false

  color = ''
  defaultColor = DEFAULT_COLOR

  constructor(private route: ActivatedRoute, private projectsSv: ProjectsService) {}

  onChangeEditMode(): void {
    this.isEdit = !this.isEdit
    if (!this.isEdit) {
      this.color = ''
    }
  }
}
