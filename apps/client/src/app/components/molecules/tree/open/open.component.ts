import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { map, mergeMap, tap, switchMap, debounceTime } from 'rxjs/operators'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'

import { BehaviorSubjectClass } from '~utils/behavior-subject.class'
import { TreesService, EachQuery } from '~services/db/client/project/trees.service'
import { Project } from '~types/db/client/projects'
import { Trees, Tree } from '~types/db/client/project/trees'

interface Submit {
  projectId: Project['id']
  treeId: Tree['id']
  isOpen: Tree['isOpen']
}

@Component({
  selector: 'app-m-tree-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.scss'],
})
export class OpenComponent extends SubscriptionsDirective implements OnInit, OnChanges {
  subjectClass = new BehaviorSubjectClass<EachQuery>()
  submitSbj = new Subject<Submit>()

  @Input() projectId: Project['id'] = ''
  @Input() treeId: Tree['id'] = ''

  updating = false
  tree$: Observable<Tree | null> = this.subjectClass.observable.pipe(
    debounceTime(300),
    switchMap(({ projectId, treeId }) => this.treesSv.getOne(projectId, treeId)),
  )

  constructor(private treesSv: TreesService) {
    super()
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.submitSbj.asObservable()
        .pipe(
          debounceTime(300),
          switchMap(({ projectId, treeId, isOpen }) => this.treesSv.put(projectId, treeId, { isOpen }))
        )
        .subscribe(
          () => (this.updating = false),
          () => (this.updating = false)
        )
    )
  }

  ngOnChanges({ projectId, treeId }: SimpleChanges): void {
    if (!projectId.currentValue || !treeId.currentValue) {
      return
    }
    this.subjectClass.next({ projectId: projectId.currentValue, treeId: treeId.currentValue })
  }

  onClick(isOpen: boolean): void {
    this.updating = true
    this.submitSbj.next({
      projectId: this.projectId,
      treeId: this.treeId,
      isOpen
    })
  }
}
