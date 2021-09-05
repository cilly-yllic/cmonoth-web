import { Injectable } from '@angular/core'
import { BehaviorSubjectClass } from '~utils/behavior-subject.class'

export type Type = '' | 'task' | 'filter'

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  typeSbj = new BehaviorSubjectClass<Type>()

  type$ = this.typeSbj.observable
  constructor() {}

  set type(type: Type) {
    this.typeSbj.next(type)
  }

  close() {
    this.type = ''
  }
}
