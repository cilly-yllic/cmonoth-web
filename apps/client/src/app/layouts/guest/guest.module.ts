import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatTabsModule } from '@angular/material/tabs'
import { GuestRoutingModule } from '~roots/guest/quest-routing.module'
// import { TranslateChildModule } from '~modules/translate/child.module'
import { GuestComponent } from './guest.component'

@NgModule({
  declarations: [GuestComponent],
  exports: [GuestComponent],
  // imports: [CommonModule, GuestRoutingModule, TranslateChildModule, MatGridListModule, MatTabsModule],
  imports: [CommonModule, GuestRoutingModule, MatTabsModule, MatToolbarModule, MatIconModule, MatButtonModule],
})
export class GuestModule {}
