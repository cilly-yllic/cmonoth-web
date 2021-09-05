import { Component, Input } from '@angular/core'
import { RouterService } from '~services/router.service'

type Type = 'a' | 'button'

@Component({
  selector: 'app-a-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.scss'],
})
export class NavigateComponent {
  @Input() type: Type | undefined = undefined
  @Input() path = ''
  @Input() class = ''
  @Input() style = {}

  constructor(private routerSv: RouterService) {}

  onClick(event: Event): void {
    event.preventDefault()
    this.routerSv.navigate([this.path])
  }
}
