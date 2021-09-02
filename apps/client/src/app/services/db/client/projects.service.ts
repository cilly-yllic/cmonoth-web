import { Injectable } from '@angular/core'
import { Observable, of, from, throwError, combineLatest } from 'rxjs'
import { mergeMap, switchMap, map, share, tap, take } from 'rxjs/operators'

import { Collection, FirestoreService, Query } from '~services/firebase/firestore.service'
import { ClientsService } from '~services/db/clients.service'
import { CreateProject, Project, Projects, AllowUpdateProject, UpdateProject, COLLECTION_NAME } from '~types/db/client/projects'
import { getTimestamp, IsFieldOption, now, snapshotChanges } from '~utils/firebase/firestore'
import { COLORS } from '~configs'
import { Client } from "~types/db/clients";

const SNAPSHOT_OPTION: IsFieldOption = { idField: 'id', skipCollectionName: COLLECTION_NAME }

@Injectable({
  providedIn: 'root',
})
export class ProjectsService extends ClientsService {

  getSubCollection<T = Project>(clientId: Client['id'], query?: Query): Collection<T> {
    return this.getCollection().doc(clientId).collection<T>(COLLECTION_NAME, query)
  }

  post(name: string): Observable<Project> {
    return this.getClientIdAndUserId().pipe(
      mergeMap(({ clientId, userId }) => {
        if (!clientId) {
          return throwError(`clientId is ${typeof clientId}`)
        }
        if (!userId) {
          return throwError(`userId is ${typeof userId}`)
        }
        const data: CreateProject = {
          createdUserId: userId,
          name,
          color: COLORS.DEFAULTS.PROJECT,
          iconPath: '',
          description: '',
          isOpen: true,
          slackUrl: '',
          restriction: '',
          updatedTaskAt: null,
          createdAt: getTimestamp(),
        }
        return from(this.getSubCollection<CreateProject>(clientId).add(data)).pipe(
          map((res) => ({ ...data, id: res.id, updatedTaskAt: null, createdAt: now() }))
        )
      })
    )
  }

  get(): Observable<Projects> {
    return this.getCurrentClientId().pipe(
      mergeMap((id) => {
        if (!id) {
          return throwError(`id is ${typeof id}`)
        }
        return this.getSubCollection<Project>(id)
          .snapshotChanges().pipe(snapshotChanges(SNAPSHOT_OPTION))
      })
    )
  }

  getOne(id: Project['id']): Observable<Project | null> {
    return this.getCurrentClientId().pipe(
      mergeMap((clientId) => {
        if (!clientId) {
          return throwError(`id is ${typeof clientId}`)
        }
        return this.getSubCollection<Project>(clientId)
          .doc<Project>(id)
          .valueChanges()
          .pipe(
            tap((a) => console.log('----------', a)),
            map((v) => (v ? { ...v, id } : null))
          )
      })
    )
  }

  put(projectId: Project['id'], param: AllowUpdateProject): Observable<UpdateProject> {
    return this.getCurrentClientId().pipe(
      mergeMap((clientId) => {
        if (!clientId) {
          return throwError(`clientId is ${typeof clientId}`)
        }
        const updates = {
          ...param,
          updatedAt: getTimestamp(),
        }
        return from(this.getSubCollection<UpdateProject>(clientId).doc(projectId).update(updates)).pipe(map(() => updates))
      })
    )
  }
}
