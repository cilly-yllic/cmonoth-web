import { Component } from '@angular/core'
import { COMPANY_NAME } from '~configs'

@Component({
  selector: 'app-l-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
})
export class GuestComponent {
  companyName = COMPANY_NAME
  links: any = [
    { name: 'サービス', link: '/service' },
    { name: '価格', link: '/price' },
    { name: 'サインイン', link: '/auth/sign-in' },
  ]
}
