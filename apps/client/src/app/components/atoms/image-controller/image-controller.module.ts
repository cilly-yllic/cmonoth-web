import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { ImageControllerComponent } from './image-controller.component'
import { UploaderModule } from '~atoms/uploader/uploader.module'

@NgModule({
  declarations: [ImageControllerComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, UploaderModule],
  exports: [ImageControllerComponent],
})
export class ImageControllerModule {}
