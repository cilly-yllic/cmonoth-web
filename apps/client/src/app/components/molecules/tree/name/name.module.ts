import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { NameComponent } from './name.component'

import { TranslateChildModule } from '~modules/translate/child.module'

import { SpinnerModule } from '~atoms/spinner/spinner.module'
import { TreesService } from '~services/db/trees.service'

@NgModule({
  declarations: [NameComponent],
  imports: [CommonModule, ReactiveFormsModule, TranslateChildModule, SpinnerModule],
  exports: [NameComponent],
  providers: [TreesService],
})
export class NameModule {}
