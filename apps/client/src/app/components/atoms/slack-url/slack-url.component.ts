import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, forwardRef } from '@angular/core'
import { FormGroup, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar'
import { Subscription, Subject, Observable, of, from } from 'rxjs'
import {　finalize, debounceTime, tap, catchError, mergeMap　} from 'rxjs/operators'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'

import { getUrlFromControl } from '~utils/forms/url'
import { SlackUrlService } from '~services/firebase/functions/slack-url.service'

interface Test {
  url: string
  target: string
}

@Component({
  selector: 'app-a-slack-url',
  templateUrl: './slack-url.component.html',
  styleUrls: ['./slack-url.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlackUrlComponent),
      multi: true
    }
  ]
})
export class SlackUrlComponent extends SubscriptionsDirective implements OnInit, ControlValueAccessor {
  sbj = new Subject<Test>()
  control: FormControl = getUrlFromControl()
  backup = ''
  get url(): string {
    return this.control.value
  }
  @Input() target = ''

  onChange: any = () => { }
  onTouched: any = () => { }

  constructor(private snackBar: MatSnackBar, private sUSv: SlackUrlService) {
    super()
  }

  writeValue(value: any): void {
    this.control.patchValue(value)
    this.backup = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  private test(): Subscription {
    return this.sbj.asObservable()
      .pipe(
        mergeMap(({ url, target }) => this.sUSv.check(url, target))
      )
      .subscribe(
        () => {
          this.control.enable()
          this.control.setErrors(null)
        },
        (err) => {
          console.error(err)
          this.control.enable()
          this.control.setErrors({ ...this.control.errors, request: err })
          this.snackBar.open(err, 'CLOSE', {
            duration: 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
        }
      )
  }

  ngOnInit(): void {
    this.subscriptions.add(this.test())
    this.subscriptions.add(
      this.control.valueChanges.subscribe((url) => {
        console.log(this.control)
        if (url && this.isChanged) {
          this.control.setErrors({ ...this.control.errors, test: true })
        }
        if (!this.isChanged) {
          this.control.setErrors({ ...this.control.errors, test: false })
        }
        this.onChange(url)
        console.log(this.control.errors)
      })
    )
  }

  onChancel(e: Event): void {
    e.stopPropagation()
    this.control.setValue(this.backup)
    this.onChange(this.backup)
  }

  get isChanged(): boolean {
    return this.control.value !== this.backup
  }

  async onTest(e: Event) {
    e.stopPropagation()
    this.control.disable()
    this.sbj.next({ url: this.url, target: this.target })
  }
}
