import { Component, OnInit, Input, OnDestroy, HostListener, ElementRef, AfterViewInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatTabChangeEvent } from '@angular/material/tabs'
import { Subscription, Observable, Subject } from 'rxjs'
import { filter, map, tap, mergeMap } from 'rxjs/operators'

import { Project } from '~types/db/client/projects'
import { Tree } from '~types/db/client/project/trees'
import { Task } from '~types/db/client/project/tree/tasks'
import { Comment } from '~types/db/client/project/tree/task/comments'

import { CommentsService } from '~services/db/client/project/tree/task/comments.service'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'

interface Submit {
  projectId: Project['id']
  treeId: Tree['id']
  taskId: Task['id']
  text: Comment['text']
}

@Component({
  selector: 'app-m-task-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent extends SubscriptionsDirective implements OnInit {
  @Input() projectId: Project['id'] = ''
  @Input() treeId: Tree['id'] = ''
  @Input() taskId: Task['id'] = ''

  submitSbj = new Subject<Submit>()
  comment: FormControl = new FormControl('', [Validators.required])
  form: FormGroup = new FormGroup({ comment: this.comment })

  constructor(private commentsSv: CommentsService) {
    super()
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.submitSbj.asObservable()
        .pipe(
          mergeMap(({ projectId, treeId, taskId, text }) => this.commentsSv.post(text, projectId, treeId, taskId))
        )
        .subscribe()
    )
  }

  onEnter(e: Event) {
    e.stopPropagation()
  }

  onSubmit(): void {
    this.submitSbj.next({ text: this.comment.value, projectId: this.projectId, treeId: this.treeId, taskId: this.taskId })
    // this.commentsSv.post(this.comment.value, this.projectId, this.treeId, this.taskId).subscribe((v) => console.log('submit', v))
  }
}
