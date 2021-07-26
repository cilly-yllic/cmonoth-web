import { Component } from '@angular/core'
import { UserService } from '~services/db/user.service'

@Component({
  selector: 'app-o-navigations',
  templateUrl: './navigations.component.html',
  styleUrls: ['./navigations.component.scss'],
})
export class NavigationsComponent {
  user$ = this.userSv.user$
  constructor(private userSv: UserService) {}

  get isProject(): boolean {
    return false
  }

  get isTree(): boolean {
    return false
  }
}
