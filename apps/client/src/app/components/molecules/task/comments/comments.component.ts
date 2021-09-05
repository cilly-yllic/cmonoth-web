import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core'
import { Observable, of, from, throwError, combineLatest } from 'rxjs'
import { mergeMap, switchMap, map, share, tap } from 'rxjs/operators'

import { CommentsService, EachQuery } from '~services/db/client/project/tree/task/comments.service'
import { Project } from '~types/db/client/projects'
import { Tree } from '~types/db/client/project/trees'
import { Task } from '~types/db/client/project/tree/tasks'
import { BehaviorSubjectClass } from '~utils/behavior-subject.class'

@Component({
  selector: 'app-m-task-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnChanges {
  @Input() projectId: Project['id'] = ''
  @Input() treeId: Tree['id'] = ''
  @Input() taskId: Task['id'] = ''

  sbj = new BehaviorSubjectClass<EachQuery>()
  comments$ = this.sbj.observable.pipe(mergeMap(({ projectId, treeId, taskId }) => this.commentsSv.get(projectId, treeId, taskId)))

  constructor(private commentsSv: CommentsService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.sbj.next({ projectId: this.projectId, treeId: this.treeId, taskId: this.taskId })
  }
}
