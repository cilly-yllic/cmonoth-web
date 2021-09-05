import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { CommentsComponent } from './comments.component'

@NgModule({
  declarations: [CommentsComponent],
  imports: [CommonModule, MatIconModule],
  exports: [CommentsComponent],
})
export class CommentsModule {}
