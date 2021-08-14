import { Component, Inject, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'

@Component({
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends SubscriptionsDirective implements OnInit {
  title = 'dialog'
  label = 'dialog'
  inputString = ''
  placeholder = 'dialog'
  service: any
  method = ''
  button = 'yes'
  res: any
  updating = false

  constructor(private router: Router, private dialogRef: MatDialogRef<InputComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
    super()
  }

  ngOnInit(): void {
    if (this.data.title) {
      this.title = this.data.title
    }
    if (this.data.label) {
      this.label = this.data.label
    }
    if (this.data.button) {
      this.button = this.data.button
    }
    if (this.data.placeholder) {
      this.placeholder = this.data.placeholder
    }
    if (this.data.service) {
      this.service = this.data.service
    }
    if (this.data.method) {
      this.method = this.data.method
    }
  }

  onSubmit(): void {
    this.__submit()
  }

  private __submit(): void {
    this.updating = true
    const subscription = this.service[this.method](this.inputString).subscribe(
      (res: any) => {
        this.updating = false
        this.res = res
      },
      () => {},
      () => {
        this.inputString = ''
        this.res.isSucceed = true
        this.dialogRef.close(this.res)
      }
    )
    this.subscriptions.add(subscription)
  }
}
