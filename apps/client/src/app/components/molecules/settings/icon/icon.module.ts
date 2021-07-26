import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatTooltipModule } from '@angular/material/tooltip'
import { IconComponent } from './icon.component'

@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule, MatIconModule, MatMenuModule, MatTooltipModule],
  exports: [IconComponent],
})
export class IconModule {}
