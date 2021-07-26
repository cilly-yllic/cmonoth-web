import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-a-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  @Input() spinning = false
  @Input() diameter: number | undefined = undefined
}
