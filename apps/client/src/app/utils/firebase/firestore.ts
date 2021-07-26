import firebase from 'firebase/app'
import { AngularFirestoreCollectionGroup } from '@angular/fire/firestore'
import { Action, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/firestore/interfaces'
import { Observable } from 'rxjs'
import { switchMap, map, share, tap } from 'rxjs/operators'

export const getDocumentId = () => firebase.firestore.FieldPath.documentId()
export const getTimestamp = () => firebase.firestore.FieldValue.serverTimestamp()
export const getGeoPoint = (latitude: number, longitude: number) => new firebase.firestore.GeoPoint(latitude, longitude)
export const now = () => firebase.firestore.Timestamp.now()
export const fromDate = (date: Date) => firebase.firestore.Timestamp.fromDate(date)
export const addToArray = (...list: any[]) => firebase.firestore.FieldValue.arrayUnion(...list)
export const removeFromArray = (...list: any[]) => firebase.firestore.FieldValue.arrayRemove(...list)

export const simpleSnapshotChanges = <T>(action: Observable<DocumentChangeAction<T>[]>) =>
  action.pipe(
    map((snapshots) =>
      snapshots.map((snapshot) => ({
        id: snapshot.payload.doc.id,
        ...snapshot.payload.doc.data(),
      }))
    )
  )
