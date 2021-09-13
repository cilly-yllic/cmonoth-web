import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';

import { ClientRoutingModule } from '~roots/client/client-routing.module'



@NgModule({
  declarations: [
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ],
  exports: [
    BreadcrumbComponent
  ]
})
export class BreadcrumbModule { }
