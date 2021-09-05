import { Injectable } from '@angular/core'
import { Observable, of, from, throwError, combineLatest } from 'rxjs'
import { mergeMap, switchMap, map, share, tap, take } from 'rxjs/operators'

import { Collection, FirestoreService, Query } from '~services/firebase/firestore.service'
import { ClientsService } from '~services/db/clients.service'
import {
  AllowUpdateProject,
  COLLECTION_NAME as PROJECT_COLLECTION_NAME,
  CreateProject,
  Project,
  Projects, UpdateProject
} from '~types/db/client/projects'
import { CreateTree, Tree, Trees, AllowUpdateTree, UpdateTree, COLLECTION_NAME } from '~types/db/client/project/trees'
import { getTimestamp, now, snapshotChanges, IsFieldOption, getIncrement } from '~utils/firebase/firestore'
import { COLORS } from '~configs'
import { Client } from "~types/db/clients";

export interface EachQuery {
  projectId: Project['id']
  treeId: Tree['id']
}

const SNAPSHOT_OPTION: IsFieldOption = { idField: 'id', skipCollectionName: COLLECTION_NAME }

@Injectable({
  providedIn: 'root'
})
export class TreesService extends ClientsService {
  getSubCollection<T = Tree>(clientId: Client['id'], projectId: Project['id'], query?: Query): Collection<T> {
    return this.getCollection().doc(clientId)
      .collection(PROJECT_COLLECTION_NAME).doc(projectId)
      .collection<T>(COLLECTION_NAME, query)
  }

  post(name: string, projectId: Project['id']): Observable<Tree> {
    return this.getClientIdAndUserId().pipe(
      mergeMap(({ clientId, userId }) => {
        if (!clientId) {
          return throwError(`clientId is ${typeof clientId}`)
        }
        if (!userId) {
          return throwError(`userId is ${typeof userId}`)
        }
        const data: CreateTree = {
          createdUserId: userId,
          taskCount: 1,
          name,
          description: '',
          isOpen: true,
          updatedTaskAt: null,
          createdAt: getTimestamp(),
        }
        return from(this.getSubCollection<CreateTree>(clientId, projectId).add(data)).pipe(
          map((res) => ({ ...data, id: res.id, projectId, updatedTaskAt: null, createdAt: now() }))
        )
      })
    )
  }

  get(projectId: Project['id']): Observable<Trees> {
    return this.getCurrentClientId().pipe(
      mergeMap((id) => {
        console.log('id', id)
        if (!id) {
          return throwError(`id is ${typeof id}`)
        }
        return this.getSubCollection<Tree>(id, projectId)
          .snapshotChanges().pipe(snapshotChanges(SNAPSHOT_OPTION))
          .pipe(tap((res) => console.log('---', res)))
      })
    )
  }

  getOne(projectId: Project['id'], teeId: Tree['id']): Observable<Tree | null> {
    console.warn('getOne project', projectId)
    return this.getCurrentClientId().pipe(
      mergeMap((clientId) => {
        console.warn('getOne project clientId', clientId)
        if (!clientId) {
          return throwError(`id is ${typeof clientId}`)
        }
        return this.getSubCollection<Tree>(clientId, projectId)
          .doc<Tree>(teeId)
          .valueChanges()
          .pipe(
            tap((a) => console.log('----------', a)),
            map((v) => (v ? { ...v, clientId, projectId, id: teeId } : null))
          )
      })
    )
  }

  put(projectId: Project['id'], treeId: Tree['id'], param: AllowUpdateTree): Observable<UpdateTree> {
    return this.getCurrentClientId().pipe(
      mergeMap((clientId) => {
        if (!clientId) {
          return throwError(`clientId is ${typeof clientId}`)
        }
        const updates = {
          ...param,
          updatedAt: getTimestamp(),
        }
        return from(this.getSubCollection<UpdateTree>(clientId, projectId).doc(treeId).update(updates)).pipe(
          map(() =>  ({ ...updates, id: treeId, projectId, updatedAt: now() }))
        )
      })
    )
  }

  incrementTaskCount(projectId: Project['id'], treeId: Tree['id']): Observable<UpdateTree> {
    return this.put(projectId, treeId, { taskCount: getIncrement(1) })
  }

  delete(projectId: Project['id'], teeId: Tree['id']) {
    return this.getCurrentClientId().pipe(
      mergeMap((clientId) => {
        if (!clientId) {
          return throwError(`clientId is ${typeof clientId}`)
        }
        return from(this.getSubCollection(clientId, projectId).doc(teeId).delete())
      })
    )
  }
}
