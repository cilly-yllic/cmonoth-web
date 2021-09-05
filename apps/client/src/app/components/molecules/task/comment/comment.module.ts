import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs'
import { CommentComponent } from './comment.component'

import { UploaderModule } from '~atoms/uploader/uploader.module'


@NgModule({
  declarations: [CommentComponent],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatTabsModule, UploaderModule],
  exports: [CommentComponent],
})
export class CommentModule {}
