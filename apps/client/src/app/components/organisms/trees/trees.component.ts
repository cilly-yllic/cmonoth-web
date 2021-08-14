import { Component, OnInit, Input } from '@angular/core'
import { MatTabChangeEvent } from '@angular/material/tabs'
import { Observable, of } from 'rxjs'
import { tap, map, mergeMap } from 'rxjs/operators'
import { TreesService } from '~services/db/client/project/trees.service'
import { Trees, Tree } from '~types/db/client/project/trees'
import { Project } from '~types/db/client/projects'
import { getOpenCloseList, Group, TABS } from '~utils/converters/observables/open-close-group'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'
import { BehaviorSubjectClass } from '~utils/behavior-subject.class'

@Component({
  selector: 'app-o-trees',
  templateUrl: './trees.component.html',
  styleUrls: ['./trees.component.scss'],
})
export class TreesComponent extends SubscriptionsDirective implements OnInit {
  subjectClass = new BehaviorSubjectClass<Project['id']>()
  _projectId: Project['id'] = ''

  @Input()
  set projectId(projectId: Project['id']) {
    this._projectId = projectId
    this.subjectClass.next(projectId)
  }
  get projectId(): Project['id'] {
    return this._projectId
  }
  loading = true
  tabs = TABS
  isOpen = TABS.open

  trees$: Observable<Group<Tree>> = this.subjectClass.observable.pipe(
    map((v) => (v ? this.treesSv.get(v) : this.treesSv.get('vw1aCNTjZQJ8sN4du0hr'))), // TODO
    // map((v) => (v ? this.treesSv.get(v) : of([]))),
    mergeMap((observable) => getOpenCloseList<Tree>(observable)),
    tap(() => (this.loading = false))
  )

  constructor(private treesSv: TreesService) {
    super()
  }

  ngOnInit(): void {
    this.subjectClass.next(this.projectId)
  }

  onSelectIsOpen(event: MatTabChangeEvent): void {
    console.log('onSelectIsOpen', event)
    this.isOpen = event.tab.content?.viewContainerRef.element.nativeElement.getAttribute('data-isOpen')
  }
}
