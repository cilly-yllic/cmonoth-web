import { Component, OnInit, Input, OnDestroy, HostListener, ElementRef, AfterViewInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatTabChangeEvent } from '@angular/material/tabs'
import { Subscription, Observable } from 'rxjs'
import { filter, map, tap } from 'rxjs/operators'

import { Project } from '~types/db/client/projects'
import { Tree } from '~types/db/client/project/trees'
import { Task } from '~types/db/client/project/tree/tasks'

import { CommentsService } from '~services/db/client/project/tree/task/comments.service'

@Component({
  selector: 'app-m-task-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() projectId: Project['id'] = ''
  @Input() treeId: Tree['id'] = ''
  @Input() taskId: Task['id'] = ''

  comment: FormControl = new FormControl('', [Validators.required])
  form: FormGroup = new FormGroup({ comment: this.comment })

  constructor(private commentsSv: CommentsService) {}

  ngOnInit(): void {}

  onEnter(e: Event) {
    e.stopPropagation()
  }

  onSubmit(): void {
    this.commentsSv.post(this.comment.value, this.projectId, this.treeId, this.taskId).subscribe((v) => console.log('submit', v))
  }
}
