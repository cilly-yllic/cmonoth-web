import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UploaderComponent } from './uploader.component'
import { FileService } from '~services/file.service'

@NgModule({
  declarations: [UploaderComponent],
  imports: [CommonModule],
  exports: [UploaderComponent],
  providers: [FileService],
})
export class UploaderModule {}
