import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DeadlineComponent } from './deadline.component'

@NgModule({
  declarations: [DeadlineComponent],
  imports: [CommonModule],
  exports: [DeadlineComponent],
})
export class DeadlineModule {}
