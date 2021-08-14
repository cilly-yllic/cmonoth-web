import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SpinnerModule } from '~atoms/spinner/spinner.module'

import { NavigationLoadingComponent } from './navigation-loading.component'
import { NavigationLoadingService } from './navigation-loading.service'

@NgModule({
  imports: [CommonModule, SpinnerModule],
  declarations: [NavigationLoadingComponent],
  exports: [NavigationLoadingComponent],
  providers: [NavigationLoadingService],
})
export class NavigationLoadingModule {}
