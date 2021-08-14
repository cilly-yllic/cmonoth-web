import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'
import { OpenComponent } from './open.component'

import { SpinnerModule } from '~atoms/spinner/spinner.module'
import { TreesService } from '~services/db/trees.service'

@NgModule({
  declarations: [OpenComponent],
  imports: [CommonModule, MatButtonModule, MatTooltipModule, SpinnerModule],
  exports: [OpenComponent],
  providers: [TreesService],
})
export class OpenModule {}
