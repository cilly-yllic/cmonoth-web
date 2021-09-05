import { Component, OnInit } from '@angular/core'
import { MenuService, Type } from '~services/tasks/menu.service'
import { FilterService } from '~services/tasks/filter.service'

@Component({
  selector: 'app-m-tasks-menu-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent {
  isFiltering$ = this.filterSv.filter$
  constructor(private menuSv: MenuService, private filterSv: FilterService) {}

  onOpen(type: Type) {
    this.menuSv.type = type
  }
  onClear() {
    this.filterSv.clear()
  }
}
