import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { ButtonsComponent } from './buttons.component'

import { FilterService } from '~services/tasks/filter.service'
import { MenuService } from '~services/tasks/menu.service'

@NgModule({
  declarations: [ButtonsComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [ButtonsComponent],
  providers: [MenuService, FilterService],
})
export class ButtonsModule {}
