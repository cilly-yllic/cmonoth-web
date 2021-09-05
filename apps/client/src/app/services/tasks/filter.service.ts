import { Injectable } from '@angular/core'
import { BehaviorSubjectClass } from '~utils/behavior-subject.class'

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filterSbj = new BehaviorSubjectClass()

  filter$ = this.filterSbj.observable
  constructor() {}
  clear() {}
}
