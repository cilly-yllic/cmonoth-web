import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon'
import { MatRippleModule } from '@angular/material/core'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatTooltipModule } from '@angular/material/tooltip'

import { ClientRoutingModule } from '~roots/client/client-routing.module'

import { OrgChangeModule } from '~molecules/org-change/org-change.module'
import { IconModule } from '~molecules/settings/icon/icon.module'
import { NavigationsComponent } from './navigations.component'

@NgModule({
  declarations: [NavigationsComponent],
  imports: [CommonModule, FlexLayoutModule, ClientRoutingModule, MatIconModule, MatRippleModule, MatListModule, MatButtonModule, MatDividerModule, MatTooltipModule, OrgChangeModule, IconModule],
  exports: [NavigationsComponent],
})
export class NavigationsModule {}
