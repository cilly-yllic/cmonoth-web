import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'

import { ClientRoutingModule } from '~roots/client/client-routing.module'

import { OrgChangeModule } from '~molecules/org-change/org-change.module'
import { IconModule } from '~molecules/settings/icon/icon.module'
import { NavigationsComponent } from './navigations.component'

@NgModule({
  declarations: [NavigationsComponent],
  imports: [CommonModule, ClientRoutingModule, MatIconModule, MatTooltipModule, OrgChangeModule, IconModule],
  exports: [NavigationsComponent],
})
export class NavigationsModule {}
