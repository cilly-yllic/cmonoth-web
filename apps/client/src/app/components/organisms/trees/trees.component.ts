import { Component, OnInit, Input } from '@angular/core'
import { MatTabChangeEvent } from '@angular/material/tabs'
import { PageEvent } from '@angular/material/paginator'
import { combineLatest, Observable, of, Subject } from 'rxjs'
import { tap, map, debounceTime, switchMap, startWith } from 'rxjs/operators'
import { TreesService } from '~services/db/client/project/trees.service'
import { Trees, Tree as _Tree } from '~types/db/client/project/trees'
import { Project } from '~types/db/client/projects'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'
import { BehaviorSubjectClass } from '~utils/behavior-subject.class'
import { AlgoliaService, DEFAULT_PAGE } from '~services/algolia.service'
import { TbsValues, TABS } from '~types/ng/tabs'
import { Response } from '~types/algolia'
import { environment } from '~env'

interface Tree extends _Tree {
  project: Project
}

const getFilter = (projectId: Project['id'], isOpen: TbsValues) => {
  let filter = ''
  if (projectId) {
    filter = `project.id:${projectId}`
  }
  return filter ? `${filter} AND isOpen:${isOpen === TABS.open}` : `isOpen:${isOpen === TABS.open}`
}

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
  // isOpen = TABS.open

  pageSbj = new Subject<PageEvent>()
  isOpenSbj = new Subject<TbsValues>()
  keywordSbj = new Subject<string>()
  trees$: Observable<Response<Tree>> = combineLatest([
    this.keywordSbj.asObservable().pipe(startWith('')),
    this.pageSbj.asObservable().pipe(startWith(DEFAULT_PAGE)),
    this.isOpenSbj.asObservable().pipe(startWith(TABS.open))
  ])
    .pipe(
      tap(() => (this.loading = true)),
      debounceTime(500),
      switchMap(
        ([keyword, pageEvent, isOpen]) =>
          this.algoliaSv.searchByCurrentClient(
            environment.ALGOLIA.INDICES.TREES,
            keyword, pageEvent.pageIndex, pageEvent.pageSize,
            getFilter(this.projectId, isOpen)
            // `projectId:${this.projectId} AND isOpen:${isOpen === TABS.open}`
          )
      ),
      tap((v) => (console.log('v', v))),
      tap(() => (this.loading = false))
    )

  constructor(private algoliaSv: AlgoliaService) {
    super()
  }

  ngOnInit(): void {
    this.subjectClass.next(this.projectId)
  }

  onSelectIsOpen(event: MatTabChangeEvent): void {
    console.log('onSelectIsOpen', event)
    const isOpen = event.tab.content?.viewContainerRef.element.nativeElement.getAttribute('data-isOpen')
    this.isOpenSbj.next(parseInt(isOpen, 10))
  }
}
