import { Component, Input } from '@angular/core'

import { DynamicClass } from './dynamic.class'

@Component({
  selector: 'app-a-dynamics',
  templateUrl: './dynamics.component.html',
})
export class DynamicsComponent {
  @Input() components: DynamicClass[] = []
}
