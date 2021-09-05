import { Component } from '@angular/core'

import { ClientService } from '~services/db/client.service'

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  clientName$ = this.clientSv.clientName$
  constructor(private clientSv: ClientService) {}
}
