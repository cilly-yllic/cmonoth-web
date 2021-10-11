import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { ClientService } from '~services/db/client.service'

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  type$: Observable<string> = this.route.params.pipe(map((params) => params.type))

  constructor(private route: ActivatedRoute, private clientSv: ClientService) {}

  // path = `${this.cs.clientName}/settings`
  // links: any  = [
  //   { name: 'account', link: `${this.path}/account` },
  //   { name: 'emails', link: `${this.path}/emails` },
  //   { name: 'two_step_authentication', link: `${this.path}/twoStepAuthentication` },
  //   { name: 'sns_oauth', link: `${this.path}/snsOAuth` },
  //   // { name: 'payment_method', link: `${this.path}/paymentMethod` },
  //   { name: 'password', link: `${this.path}/password` },
  //   { name: 'files', link: `${this.path}/files` },
  // ];

  links$ = this.clientSv.clientName$.pipe(
    map((name) => `/${name}/settings`),
    map((path) => [
      { name: 'ユーザー情報', link: `${path}/account` },
      { name: 'メール', link: `${path}/emails` },
      { name: '二段階認証', link: `${path}/twoStepAuthentication` },
      { name: 'ソーシャル認証', link: `${path}/snsOAuth` },
      // { name: '支払い方法', link: `${this.path}/paymentMethod` },
      { name: 'パスワード', link: `${path}/password` },
      { name: '添付ファイル一覧', link: `${path}/files` },
    ])
  )
}
