import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  templateUrl: './alternative.component.html',
  styleUrls: ['./alternative.component.scss'],
})
export class AlternativeComponent implements OnInit {
  title = 'dialog'
  content = ''
  button = 'yes'

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit(): void {
    if (this.data.title) {
      this.title = this.data.title
    }
    if (this.data.content) {
      this.content = this.data.content
    }
    if (this.data.button) {
      this.button = this.data.button
    }
  }
}
