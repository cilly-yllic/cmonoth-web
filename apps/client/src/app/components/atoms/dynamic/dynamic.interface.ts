import { Type } from '@angular/core'

export type Data = any
export interface Offset {
  width?: number
  height?: number
  top?: number
  left?: number
}
export type DynamicComponent = Type<any>
export interface Component {
  data: Data
  offset: Offset
}
