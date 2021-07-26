import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { SpinnerModule } from '~atoms/spinner/spinner.module'
import { NavigateModule } from '~atoms/navigate/navigate.module'
import { SignInComponent } from './sign-in.component'

@NgModule({
  declarations: [SignInComponent],
  imports: [CommonModule, ReactiveFormsModule, SpinnerModule, NavigateModule],
})
export class SignInModule {}
