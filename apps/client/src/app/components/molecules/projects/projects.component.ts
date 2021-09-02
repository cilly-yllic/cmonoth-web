import { Component, Input, OnDestroy, EventEmitter, Output, OnInit } from '@angular/core'
import { Subject, Subscription } from 'rxjs'
import { PageEvent } from '@angular/material/paginator'
import { RouterService } from '~services/router.service'
import { Projects, Project } from '~types/db/client/projects'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'
import { Response } from '~types/algolia'
import { DEFAULT } from '~services/algolia.service'
import {mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-m-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent extends SubscriptionsDirective implements OnInit {
  navigateSbj = new Subject<string[]>()
  @Output() page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>()
  @Input() projects: Response<Project> = DEFAULT
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

  onSelect(e: MouseEvent, projectId: Project['id']): void {
    e.stopPropagation()
    this.navigateSbj.next(['projects', projectId])
  }

  onPage(e: PageEvent): void {
    this.page.emit(e)
  }
}
