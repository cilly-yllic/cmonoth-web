import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { CreateComponent } from './create.component'

@NgModule({
  declarations: [CreateComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CreateComponent],
})
export class CreateModule {}
