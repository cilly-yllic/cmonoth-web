import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RelationParentsComponent } from './relation-parents.component'

import { MatButtonModule } from '@angular/material/button'
import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'

@NgModule({
  declarations: [RelationParentsComponent],
  imports: [
    CommonModule,

    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [RelationParentsComponent],
})
export class RelationParentsModule {}
