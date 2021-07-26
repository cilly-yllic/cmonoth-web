import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatTabsModule } from '@angular/material/tabs'
import { GuestRoutingModule } from '~roots/guest/quest-routing.module'
// import { TranslateChildModule } from '~modules/translate/child.module'
import { GuestComponent } from './guest.component'

@NgModule({
  declarations: [GuestComponent],
  exports: [GuestComponent],
  // imports: [CommonModule, GuestRoutingModule, TranslateChildModule, MatGridListModule, MatTabsModule],
  imports: [CommonModule, GuestRoutingModule, MatGridListModule, MatTabsModule],
})
export class GuestModule {}
