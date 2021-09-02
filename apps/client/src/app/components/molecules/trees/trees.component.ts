import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core'
import { Observable, of, Subject } from 'rxjs'
import { map, mergeMap, tap } from 'rxjs/operators'
import { PageEvent } from '@angular/material/paginator'
import { Project, Projects } from '~types/db/client/projects'
import { Trees, Tree as _Tree } from '~types/db/client/project/trees'
import { RouterService } from '~services/router.service'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'
import { Response } from '~types/algolia'
import { DEFAULT } from '~services/algolia.service'

interface Tree extends _Tree {
  project: Project
}

@Component({
  selector: 'app-m-trees',
  templateUrl: './trees.component.html',
  styleUrls: ['./trees.component.scss'],
})
export class TreesComponent extends SubscriptionsDirective implements OnInit {
  navigateSbj = new Subject<string[]>()
  @Output() page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>()
  @Input() trees: Response<Tree> = DEFAULT

  columns: string[] = ['icon', 'name', 'description'];

  constructor(private routerSv: RouterService) {
    super()
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.navigateSbj.asObservable()
        .pipe(
          mergeMap((commands) => this.routerSv.clientNavigate(commands))
        )
        .subscribe()
    )
  }

  onSelectProject(e: MouseEvent, projectId: Project['id']): void {
    e.stopPropagation()
    this.navigateSbj.next(['projects', projectId])
  }

  onSelectTree(e: MouseEvent, projectId: Project['id'], treeId: Tree['id']): void {
    e.stopPropagation()
    this.navigateSbj.next(['trees', projectId, treeId])
  }

  onPage(e: PageEvent): void {
    this.page.emit(e)
  }
}
