import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponent } from './dynamic.component';
import { DynamicsComponent } from './dynamics.component';

import { DynamicDirective } from './dynamic.directive'

@NgModule({
  declarations: [DynamicComponent, DynamicsComponent, DynamicDirective],
  imports: [CommonModule],
  exports: [DynamicComponent, DynamicsComponent]
})
export class DynamicModule { }
