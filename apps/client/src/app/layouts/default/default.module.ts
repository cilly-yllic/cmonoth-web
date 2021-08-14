import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatSidenavModule } from '@angular/material/sidenav'
import { NavigationsModule } from '~organisms/navigations/navigations.module'
import { DefaultComponent } from './default.component'

@NgModule({
  declarations: [DefaultComponent],
  imports: [CommonModule, MatSidenavModule, NavigationsModule],
  exports: [DefaultComponent],
})
export class DefaultModule {}
