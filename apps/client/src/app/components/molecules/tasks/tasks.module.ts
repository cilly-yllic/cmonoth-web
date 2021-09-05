import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
// import { MatIconModule } from '@angular/material/mini';
import { TasksComponent } from './tasks.component'
import { DeleteModule } from '~molecules/task/delete/delete.module'

@NgModule({
  declarations: [TasksComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, DeleteModule],
  exports: [TasksComponent]
})
export class TasksModule {}
