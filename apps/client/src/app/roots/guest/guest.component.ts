import { Component } from '@angular/core'
import {} from '~services/db/clients.service'
import {} from '~services/db/client.service'

@Component({
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
})
export class GuestComponent {
  constructor() {
    console.log(window.location)
  }
}
