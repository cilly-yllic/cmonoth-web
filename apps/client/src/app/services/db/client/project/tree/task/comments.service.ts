import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, DocumentReference } from '@angular/fire/firestore'
import { Observable, of, from, throwError, combineLatest } from 'rxjs'
import { mergeMap, switchMap, map, share, tap } from 'rxjs/operators'

import { ClientsService } from '~services/db/clients.service'
import { Collection, FirestoreService, Query } from '~services/firebase/firestore.service'
import { Types, Type, Client } from '~types/db/clients'
import { COLLECTION_NAME as PROJECT_COLLECTION_NAME, Project } from '~types/db/client/projects'
import { COLLECTION_NAME as TREE_COLLECTION_NAME, Tree } from '~types/db/client/project/trees'
import { Task, COLLECTION_NAME as TASK_COLLECTION_NAME } from '~types/db/client/project/tree/tasks'
import { Comment, Comments, CreateComment, Type as CommentType, COLLECTION_NAME } from '~types/db/client/project/tree/task/comments'
import { getTimestamp } from '~utils/firebase/firestore'

export interface EachQuery {
  projectId: Project['id']
  treeId: Tree['id']
  taskId: Task['id']
}

@Injectable({
  providedIn: 'root',
})
export class CommentsService extends ClientsService {

  getSubCollection<T = Comment>(
    clientId: Client['id'], projectId: Project['id'], treeId: Tree['id'], taskId: Task['id'],
    query?: Query
  ): Collection<T> {
    return this.getCollection().doc(clientId)
      .collection(PROJECT_COLLECTION_NAME).doc(projectId)
      .collection(TREE_COLLECTION_NAME).doc(treeId)
      .collection(TASK_COLLECTION_NAME).doc(taskId)
      .collection<T>(COLLECTION_NAME, query)
  }

  post(text: string, projectId: Project['id'], treeId: Tree['id'], taskId: Task['id']): Observable<DocumentReference> {
    return this.getClientIdAndUserId().pipe(
      mergeMap(({ clientId, userId }) => {
        if (!clientId) {
          return throwError(`clientId is ${typeof clientId}`)
        }
        if (!userId) {
          return throwError(`userId is ${typeof userId}`)
        }
        const data: CreateComment = {
          postedUserId: userId,
          type: 'comment',
          text,
          createdAt: getTimestamp(),
        }
        return from(this.getSubCollection<CreateComment>(clientId, projectId, treeId, taskId).add(data))
      })
    )
  }

  get(projectId: Project['id'], treeId: Tree['id'], taskId: Task['id']): Observable<Comments> {
    return this.getCurrentClientId().pipe(
      mergeMap((clientId) => {
        if (!clientId) {
          return throwError(`clientId is ${typeof clientId}`)
        }
        // console.log('documentPath(id)', documentPath(id, projectId))
        return this.getSubCollection<Comment>(clientId, projectId, treeId, taskId).valueChanges({ idField: 'id' })
      })
    )
  }
}
