import { Observable, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'

export enum Types {
  close,
  open,
}

export interface Interface {
  isOpen: boolean
}

export interface Group<T> {
  [Types.close]: T[]
  [Types.open]: T[]
}

export const getOpenCloseList = <T extends Interface = any>(observable: Observable<T[]>) =>
  observable.pipe(
    map((list) =>
      list.reduce(
        (acc, current) => {
          if (!current) {
            return acc
          }
          acc[current.isOpen ? Types.open : Types.close].push(current)
          return acc
        },
        { [Types.open]: [], [Types.close]: [] } as Group<T>
      )
    )
  )

export const TABS = {
  open: Types.open,
  close: Types.close,
}

export const defaultObservable = of({ [Types.open]: [], [Types.close]: [] })
