import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { TaskComponent } from './task.component'

import { AssignModule } from '~molecules/task/assign/assign.module'
import { AssignUsersModule } from '~molecules/task/assign-users/assign-users.module'
import { CommentModule } from '~molecules/task/comment/comment.module'
import { CommentsModule } from '~molecules/task/comments/comments.module'
import { DeadlineModule } from '~molecules/task/deadline/deadline.module'
import { DescriptionModule } from '~molecules/task/description/description.module'
import { LabelsModule } from '~molecules/task/labels/labels.module'
import { LabelsSetModule } from '~molecules/task/labels-set/labels-set.module'
import { NameModule } from '~molecules/task/name/name.module'
import { OpenModule } from '~molecules/task/open/open.module'
import { ProgressModule } from '~molecules/task/progress/progress.module'
import { RelationChildrenModule } from '~molecules/task/relation-children/relation-children.module'
import { RelationParentsModule } from '~molecules/task/relation-parents/relation-parents.module'

@NgModule({
  declarations: [TaskComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    AssignModule,
    AssignUsersModule,
    CommentModule,
    CommentsModule,
    DeadlineModule,
    DescriptionModule,
    LabelsModule,
    LabelsSetModule,
    NameModule,
    OpenModule,
    ProgressModule,
    RelationChildrenModule,
    RelationParentsModule,
  ],
  exports: [TaskComponent],
})
export class TaskModule {}
