import { Injectable } from '@angular/core'
import { Observable, of, from, throwError, combineLatest } from 'rxjs'
import { mergeMap, switchMap, map, share, tap, take } from 'rxjs/operators'

import { Collection, FirestoreService, Query } from '~services/firebase/firestore.service'
import { ClientsService } from '~services/db/clients.service'
import {
  CreateProject,
  Project,
  Projects,
  AllowUpdateProject,
  UpdateProject,
  COLLECTION_NAME as PROJECT_COLLECTION_NAME
} from '~types/db/client/projects'
import {
  getTimestamp,
  now,
  snapshotChanges,
  IsFieldOption,
} from '~utils/firebase/firestore'
import { COLORS } from '~configs'
import { Client } from "~types/db/clients";
import { AllowUpdateTree, CreateTree, Tree, Trees, UpdateTree, COLLECTION_NAME as TREE_COLLECTION_NAME } from "~types/db/client/project/trees";
import {
  AllowUpdateTask,
  CreateTask,
  Task,
  Tasks,
  UpdateTask,
  Structure as TaskStructure,
  CreateOrUpdateStructure as CreateOrUpdateTaskStructure,
  COLLECTION_NAME
} from "~types/db/client/project/tree/tasks";
import { Structure } from "~types/db/client/project/tree/structures";

export interface EachQuery {
  projectId: Project['id']
  treeId: Tree['id']
  taskId: Task['id']
}

export interface ListQuery {
  projectId: Project['id']
  treeId: Tree['id']
}

export interface TasksAndStructure {
  tasks: Task[]
  structure: Structure
}

const SNAPSHOT_OPTION: IsFieldOption = { idField: 'id', skipCollectionName: COLLECTION_NAME }

@Injectable({
  providedIn: 'root'
})
export class TasksService extends ClientsService {

  getSubCollection<T = Task>(
    clientId: Client['id'], projectId: Project['id'], treeId: Tree['id'],
    query?: Query
  ): Collection<T> {
    return this.getCollection().doc(clientId)
      .collection(PROJECT_COLLECTION_NAME).doc(projectId)
      .collection(TREE_COLLECTION_NAME).doc(treeId)
      .collection<T>(COLLECTION_NAME, query)
  }

  // post(name: string, projectId: Project['id'], treeId: Tree['id'], taskId: Task['id']): Observable<Task> {
  //   return this.getClientIdAndUserId().pipe(
  //     mergeMap(({ clientId, userId }) => {
  //       if (!clientId) {
  //         return throwError(`clientId is ${typeof clientId}`)
  //       }
  //       if (!userId) {
  //         return throwError(`userId is ${typeof userId}`)
  //       }
  //       const data: CreateTask = {
  //         createdUserId: userId,
  //         name,
  //         description: '',
  //         deadline: null,
  //         progressStatus: '',
  //         isOpen: true,
  //         assignUsers: [],
  //         labels: [],
  //         createdAt: getTimestamp(),
  //       }
  //       const result: Task = { ...data, id: taskId, projectId, treeId, createdAt: now() }
  //       return from(this.getSubCollection<CreateTask>(clientId, projectId, treeId).doc(taskId).set(data)).pipe(
  //         map((res) => result)
  //       )
  //     })
  //   )
  // }

  post(name: string, projectId: Project['id'], treeId: Tree['id'], incrementNum: Task['incrementNum']): Observable<Task> {
    return this.getClientIdAndUserId().pipe(
      mergeMap(({ clientId, userId }) => {
        if (!clientId) {
          return throwError(`clientId is ${typeof clientId}`)
        }
        if (!userId) {
          return throwError(`userId is ${typeof userId}`)
        }
        const data: CreateTask = {
          createdUserId: userId,
          incrementNum,
          name,
          description: '',
          deadline: null,
          progressStatus: '',
          isOpen: true,
          assignUsers: [],
          labels: [],
          createdAt: getTimestamp(),
        }
        return from(this.getSubCollection<CreateTask>(clientId, projectId, treeId).add(data)).pipe(
          map((res) => ({ ...data, id: res.id, projectId, treeId, createdAt: now() }))
        )
      })
    )
  }

  postOrUpdateStructure(structure: Structure, projectId: Project['id'], treeId: Tree['id'], create: boolean = false): Observable<CreateOrUpdateTaskStructure> {
    return this.getClientIdAndUserId().pipe(
      mergeMap(({ clientId, userId }) => {
        if (!clientId) {
          return throwError(`clientId is ${typeof clientId}`)
        }
        if (!userId) {
          return throwError(`userId is ${typeof userId}`)
        }
        const data = {
          json: JSON.stringify(structure),
          ...(create ? { createdAt: getTimestamp() } : { updatedAt: getTimestamp() }),
        }
        return from(this.getSubCollection<CreateOrUpdateTaskStructure>(clientId, projectId, treeId).doc('structure').set(data, { merge: true })).pipe(
          map(() => data)
        )
      })
    )
  }

  get(projectId: Project['id'], treeId: Tree['id']): Observable<TasksAndStructure> {
    return this.getCurrentClientId().pipe(
      mergeMap((clientId) => {
        console.log('id', clientId)
        if (!clientId) {
          return throwError(`clientId is ${typeof clientId}`)
        }
        return this.getSubCollection<Task | TaskStructure>(clientId, projectId, treeId)
          .snapshotChanges()
          .pipe(snapshotChanges(SNAPSHOT_OPTION))
          .pipe(
            map((tasks) => {
              return tasks.reduce((acc: TasksAndStructure, current: Task | TaskStructure) => {
                if (current.id === 'structure' && 'json' in current) {
                  acc.structure = JSON.parse(current.json) as Structure
                } else {
                  acc.tasks.push({ ...current, projectId, treeId } as Task)
                }
                return acc
              }, { tasks: [], structure: [] })
            }),
          )
      })
    )
  }

  getOne<T = Task>(projectId: Project['id'], treeId: Tree['id'], taskId: Task['id']): Observable<T | null> {
    return this.getCurrentClientId().pipe(
      mergeMap((clientId) => {
        if (!clientId) {
          return throwError(`id is ${typeof clientId}`)
        }
        return this.getSubCollection<Tree>(clientId, projectId, treeId)
          .doc<T>(taskId)
          .valueChanges({ idField: 'id' })
          .pipe(
            map((v) => (v ? { ...v, clientId, projectId, treeId, id: taskId } : null))
          )
      })
    )
  }

  getOnesStructure(projectId: Project['id'], treeId: Tree['id']): Observable<Structure> {
    return this.getOne<TaskStructure>(projectId, treeId, 'structure').pipe(
      mergeMap((res) => {
        if (!res) {
          return throwError(`res is ${typeof res}`)
        }
        return of(JSON.parse(res.json) as Structure)
      })
    )
  }

  put(projectId: Project['id'], treeId: Tree['id'], taskId: Task['id'], param: AllowUpdateTask): Observable<UpdateTask> {
    return this.getCurrentClientId().pipe(
      mergeMap((clientId) => {
        if (!clientId) {
          return throwError(`clientId is ${typeof clientId}`)
        }
        const updates = {
          ...param,
          updatedAt: getTimestamp(),
        }
        return from(
          this.getSubCollection<UpdateTask>(clientId, projectId, treeId).doc<UpdateTask>(taskId)
            .update(updates)).pipe(map(() => ({ ...updates, id: taskId, treeId, projectId, updatedAt: now() })))
      })
    )
  }

  delete(projectId: Project['id'], treeId: Tree['id'], taskId: Task['id']) {
    return this.getCurrentClientId().pipe(
      mergeMap((clientId) => {
        if (!clientId) {
          return throwError(`clientId is ${typeof clientId}`)
        }
        return from(this.getSubCollection<Task>(clientId, projectId, treeId).doc(taskId).delete())
      })
    )
  }
}
