import { Component, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Tree } from '~types/db/client/project/trees'
import { Project } from '~types/db/client/projects'

const DEFAULT = 'tree'
type Type = 'tree' | 'chart'

@Component({
  selector: 'app-o-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  @Input() projectId: Project['id'] = ''

  @Input() treeId: Tree['id'] = ''

  type$: Observable<Type> = this.route.queryParams.pipe(map((params) => params?.type || DEFAULT))

  constructor(private route: ActivatedRoute) {}
}
