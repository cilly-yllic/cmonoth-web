import firebase from 'firebase/app'
import { AngularFirestoreCollectionGroup } from '@angular/fire/firestore'
import { Action, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/firestore/interfaces'
import { Observable } from 'rxjs'
import { switchMap, map, share, tap } from 'rxjs/operators'
import { Client } from '~types/db/clients'
import { Project } from '~types/db/client/projects'
import { Tree } from '~types/db/client/project/trees'
import { Task } from '~types/db/client/project/tree/tasks'

export const getDocumentId = () => firebase.firestore.FieldPath.documentId()
export const getTimestamp = () => firebase.firestore.FieldValue.serverTimestamp()
export const getGeoPoint = (latitude: number, longitude: number) => new firebase.firestore.GeoPoint(latitude, longitude)
export const now = () => firebase.firestore.Timestamp.now()
export const fromDate = (date: Date) => firebase.firestore.Timestamp.fromDate(date)
export const addToArray = (...list: any[]) => firebase.firestore.FieldValue.arrayUnion(...list)
export const removeFromArray = (...list: any[]) => firebase.firestore.FieldValue.arrayRemove(...list)

type CollectionName = 'clients' | 'projects' | 'trees' | 'tasks'

const DOCUMENT_MAPS = [
  { COLLECTION_NAME: 'clients', KEY_NAME: 'clientId' },
  { COLLECTION_NAME: 'projects', KEY_NAME: 'projectId' },
  { COLLECTION_NAME: 'trees', KEY_NAME: 'treeId' },
  { COLLECTION_NAME: 'tasks', KEY_NAME: 'taskId' },
]
interface Obj {
  clientId?: Client['id']
  projectId?: Project['id']
  treeId?: Tree['id']
  taskId?: Task['id']
}

export interface IsFieldOption {
  idField?: string
  skipCollectionName?: CollectionName
}


const getData = <T>(snapshot: DocumentChangeAction<T>, collectionName?: CollectionName): Obj => {
  const paths = snapshot.payload.doc.ref.path.split('/')
  return DOCUMENT_MAPS.reduce((acc: Obj, DOCUMENT) => {
    if (!!collectionName && DOCUMENT.COLLECTION_NAME === collectionName) {
      return acc
    }
    const index = paths.findIndex((path) => path === DOCUMENT.COLLECTION_NAME)
    if (index < 0 || index >= paths.length - 1) {
      return acc
    }
    acc[DOCUMENT.KEY_NAME as keyof Obj] = paths[index + 1]
    return acc
  }, {})
}

export const snapshotChanges = ({ idField, skipCollectionName }: IsFieldOption) =>
  <T>(action: Observable<DocumentChangeAction<T>[]>) => action.pipe(
    map((snapshots) => snapshots.map((snapshot) => ({
        [idField || 'id']: snapshot.payload.doc.id,
        ...getData(snapshot, skipCollectionName),
        ...snapshot.payload.doc.data(),
      }))
    ))
