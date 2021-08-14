import { Component, Input, OnInit } from '@angular/core'
import { Observable, of, Subject } from 'rxjs'
import { map, mergeMap, tap } from 'rxjs/operators'
import { Project, Projects } from '~types/db/client/projects'
import { Trees, Tree } from '~types/db/client/project/trees'
import { RouterService } from '~services/router.service'
import { ProjectsService } from '~services/db/client/projects.service'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'
import { BehaviorSubjectClass } from '~utils/behavior-subject.class'
import { getTargetMap, MapType } from '~utils/converters/array'

@Component({
  selector: 'app-m-trees',
  templateUrl: './trees.component.html',
  styleUrls: ['./trees.component.scss'],
})
export class TreesComponent extends SubscriptionsDirective implements OnInit {
  subjectClass = new BehaviorSubjectClass<Project['id']>()
  navigateSbj = new Subject<string[]>()

  _projectId: Project['id'] = ''
  @Input()
  set projectId(projectId: Project['id']) {
    this._projectId = projectId
    this.subjectClass.next(projectId)
  }
  get projectId(): Project['id'] {
    return this._projectId
  }

  _trees: Trees = []
  @Input()
  set trees(trees: Trees) {
    this._trees = trees
  }
  get trees(): Trees {
    return this._trees
  }
  columns: string[] = ['icon', 'name', 'description'];
  projectIdMap$: Observable<MapType<Project>> = this.subjectClass.observable.pipe(
    mergeMap((projectId) => (!projectId ? this.psSv.get() : of([]))),
    map((projects) => getTargetMap<Project>(projects, 'id')),
  )

  constructor(private rSv: RouterService, private psSv: ProjectsService) {
    super()
  }

  ngOnInit(): void {
    this.subjectClass.next(this.projectId)
    this.subscriptions.add(
      this.navigateSbj.asObservable()
        .pipe(
          mergeMap((commands) => this.rSv.clientNavigate(commands))
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
}
