import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { SlackUrlComponent } from './slack-url.component'

@NgModule({
  declarations: [SlackUrlComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatSnackBarModule],
  exports: [SlackUrlComponent],
})
export class SlackUrlModule {}
