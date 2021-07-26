import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { NavigateModule } from '~atoms/navigate/navigate.module'
import { SpinnerModule } from '~atoms/spinner/spinner.module'
import { InitPasswordAndUsernameComponent } from './init-password-and-username.component'

@NgModule({
  declarations: [InitPasswordAndUsernameComponent],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, NavigateModule, SpinnerModule],
  exports: [InitPasswordAndUsernameComponent],
})
export class InitPasswordAndUsernameModule {}
