import { Observable, BehaviorSubject, of } from 'rxjs'
import { switchMap, skipWhile } from 'rxjs/operators'

enum DEFAULT {
  default = ':----- initial value -----:',
}

export class BehaviorSubjectClass<T> {
  s: BehaviorSubject<T | DEFAULT.default>
  observable: Observable<T>

  constructor() {
    this.s = new BehaviorSubject<T | DEFAULT>(DEFAULT.default)
    this.observable = this.s.asObservable().pipe(
      skipWhile((v) => v === DEFAULT.default),
      switchMap((v) => of(v as T))
    )
  }

  public next(v: T): void {
    this.s.next(v)
  }

  get snapshot(): T | DEFAULT {
    return this.s.getValue()
  }
}
