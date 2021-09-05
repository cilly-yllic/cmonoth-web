import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { TaskCreateButtonComponent } from './task-create-button.component'

@NgModule({
  declarations: [TaskCreateButtonComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [TaskCreateButtonComponent],
})
export class TaskCreateButtonModule {}
