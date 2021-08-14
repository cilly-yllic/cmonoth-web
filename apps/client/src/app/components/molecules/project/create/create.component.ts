import { Component } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'

import { ProjectsService } from '~services/db/client/projects.service'

import { InputComponent, setConfig } from '~dialogs'

@Component({
  selector: 'app-m-project-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  constructor(private dialog: MatDialog, private pSv: ProjectsService) {}

  showDialog(options?: MatDialogConfig) {
    const dialogConfig = setConfig(options)
    dialogConfig.data.service = this.pSv
    dialogConfig.data.method = 'post'
    this.dialog.open(InputComponent, dialogConfig)
  }
}
