import { Component } from '@angular/core'
import { MatTabChangeEvent } from '@angular/material/tabs'
import { PageEvent } from '@angular/material/paginator'
import { combineLatest, Observable, of, Subject } from 'rxjs'
import { tap, map, debounceTime, switchMap, startWith } from 'rxjs/operators'

import { ProjectsService } from '~services/db/client/projects.service'
import { AlgoliaService, DEFAULT_PAGE } from '~services/algolia.service'
import { Projects, Project } from '~types/db/client/projects'
import { TbsValues, TABS } from '~types/ng/tabs'
import { Response } from '~types/algolia'
import { environment } from '~env'

@Component({
  selector: 'app-o-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  loading = true
  tabs = TABS
  // isOpen = TABS.open

  pageSbj = new Subject<PageEvent>()
  isOpenSbj = new Subject<TbsValues>()
  keywordSbj = new Subject<string>()
  projects$: Observable<Response<Project>> = combineLatest([
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
            environment.ALGOLIA.INDICES.PROJECTS,
            keyword, pageEvent.pageIndex, pageEvent.pageSize,
            `isOpen:${isOpen === TABS.open}`
          )
      ),
      tap((v) => (console.log('v', v))),
      tap(() => (this.loading = false))
    )

  constructor(private algoliaSv: AlgoliaService) {}

  onSelectIsOpen(event: MatTabChangeEvent): void {
    const isOpen = event.tab.content?.viewContainerRef.element.nativeElement.getAttribute('data-isOpen')
    this.isOpenSbj.next(parseInt(isOpen, 10))
  }
}
