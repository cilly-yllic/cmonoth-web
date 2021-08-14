import { Component, Inject, OnInit, Input } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog'

import { setConfig } from '~dialogs'
import { Project, Projects } from '~types/db/client/projects'
import { RouterService } from '~services/router.service'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'
import { CreateDialogComponent } from './create.dialog.component'

@Component({
  selector: 'app-m-tree-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends SubscriptionsDirective {
  @Input() projectId: Project['id'] = ''

  constructor(private dialog: MatDialog, private routerSv: RouterService) {
    super()
  }

  showDialog(options?: MatDialogConfig): void {
    const dialogConfig = setConfig(options)
    dialogConfig.data.projectId = this.projectId
    const dialogRef = this.dialog.open(CreateDialogComponent, dialogConfig)
    const subscription = dialogRef.afterClosed().subscribe((res) => {
      if (res && res.id) {
        // this.subscriptions.add(this.rSv.clientNavigate(['trees', res.project_id, res.id]).subscribe())
        this.subscriptions.add(this.routerSv.clientNavigate(['trees', res.projectId, res.treeId]).subscribe())
      }
    })
    this.subscriptions.add(subscription)
  }
}
