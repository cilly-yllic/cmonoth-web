import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { take, map } from 'rxjs/operators'
import { SignUpData } from './action.interface'

@Component({
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent {
  constructor(private route: ActivatedRoute) {}

  data$: Observable<SignUpData> = this.route.data.pipe(
    take(1),
    map(({ data }) => data)
  )
}
