import { EventEmitter } from '@angular/core'
import * as DynamicInterface from './dynamic.interface'

export class DynamicClass {
  constructor(
    public component: DynamicInterface.DynamicComponent,
    public data?: DynamicInterface.Data,
    public offset?: DynamicInterface.Offset,
    public selected?: EventEmitter<any>,
    public destroy?: EventEmitter<never>
  ) {}
}
