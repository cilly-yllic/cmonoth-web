import { Component, ViewChild, AfterViewInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProjectsService } from '~services/db/client/projects.service'
import { EditComponent, DEFAULT_COLOR } from '~organisms/project/edit/edit.component'

@Component({
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  @ViewChild(EditComponent) component!: EditComponent
  isEdit = false

  isLockedDeactivate = false

  breadcrumbs = []

  color = ''
  defaultColor = DEFAULT_COLOR
  projectId = this.route.snapshot.params.projectId
  project$ = this.projectsSv.getOne(this.projectId)

  constructor(private route: ActivatedRoute, private projectsSv: ProjectsService) {}

  onChangeEditMode(): void {
    this.isEdit = !this.isEdit
    if (!this.isEdit) {
      this.color = ''
    }
  }
}
