import { Component, Input } from '@angular/core'
import { Breadcrumb } from './breadcrumb.interface'
import { RouterClientService } from '~services/router-client.service'

@Component({
  selector: 'app-a-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  client = this.routerClientService.clientName
  @Input() breadcrumbs: Breadcrumb[] = []

  constructor(private routerClientService: RouterClientService) {
  }

}
