import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavigationsModule } from '~organisms/navigations/navigations.module'
import { DefaultComponent } from './default.component'

@NgModule({
  declarations: [DefaultComponent],
  imports: [CommonModule, NavigationsModule],
  exports: [DefaultComponent],
})
export class DefaultModule {}
