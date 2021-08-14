import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { ClientService } from '~services/db/client.service'
import { Client } from '~types/db/clients'

@Component({
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  name$: Observable<Client['id']> = this.clientSv.clientId$
  constructor(private clientSv: ClientService) {}

  ngOnInit(): void {}
}
