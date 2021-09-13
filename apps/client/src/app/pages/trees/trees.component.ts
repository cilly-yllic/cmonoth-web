import { Component } from '@angular/core'
import { getBreadcrumb, Breadcrumb } from '~atoms/breadcrumb'

@Component({
  templateUrl: './trees.component.html',
  styleUrls: ['./trees.component.scss'],
})
export class TreesComponent {

  get breadcrumbs(): Breadcrumb[] {
    return getBreadcrumb('trees')
  }
}
