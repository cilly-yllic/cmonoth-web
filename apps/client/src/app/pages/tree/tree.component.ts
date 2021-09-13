import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { combineLatest, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ProjectsService } from '~services/db/client/projects.service'
import { TreesService } from '~services/db/client/project/trees.service'
import { MenuService } from '~services/tasks/menu.service'
import { RightToLeft as RightToLeftAnimation } from '~animations/slide-in-out'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'
import { getBreadcrumb, Breadcrumb } from '~atoms/breadcrumb'

@Component({
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  animations: [RightToLeftAnimation],
})
export class TreeComponent extends SubscriptionsDirective implements OnInit {
  projectId = this.route.snapshot.params.projectId
  treeId = this.route.snapshot.params.treeId
  project$ = this.projectsSv.getOne(this.projectId)
  tree$ = this.treesSv.getOne(this.projectId, this.treeId)

  breadcrumbs$: Observable<Breadcrumb[]> = combineLatest([this.project$, this.tree$]).pipe(
    map(([project, tree]) => getBreadcrumb('tree', project, tree))
  )

  width = 420
  menuType$ = this.menuSv.type$
  taskId$ = this.route.queryParams.pipe(map((params) => params?.id))

  constructor(private route: ActivatedRoute, private projectsSv: ProjectsService, private treesSv: TreesService, private menuSv: MenuService) {
    super()
  }

  ngOnInit(): void {
    const subscribe = this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.menuSv.type = 'task'
      } else {
        this.menuSv.type = ''
      }
    })
    this.subscriptions.add(subscribe)
  }

  onStopPropagation(e: Event) {
    e.stopPropagation()
  }
}
