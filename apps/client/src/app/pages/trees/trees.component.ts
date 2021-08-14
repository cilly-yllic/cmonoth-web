import { Component } from '@angular/core'

import { ClientService } from '~services/db/client.service'

@Component({
  templateUrl: './trees.component.html',
  styleUrls: ['./trees.component.scss'],
})
export class TreesComponent {
  constructor(private cSv: ClientService) {}
  clientId$ = this.cSv.clientId$
}
