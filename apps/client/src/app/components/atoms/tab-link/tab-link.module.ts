import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs'

import { ClientRoutingModule } from '~roots/client/client-routing.module'
import { TabLinkComponent } from './tab-link.component';



@NgModule({
  declarations: [
    TabLinkComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    ClientRoutingModule
  ],
  exports: [
    TabLinkComponent
  ]
})
export class TabLinkModule { }
