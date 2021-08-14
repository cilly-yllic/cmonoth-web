import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { SpinnerModule } from '~atoms/spinner/spinner.module'
import { NavigateModule } from '~atoms/navigate/navigate.module'
import { SignInComponent } from './sign-in.component'

@NgModule({
  declarations: [SignInComponent],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, SpinnerModule, NavigateModule],
})
export class SignInModule {}
