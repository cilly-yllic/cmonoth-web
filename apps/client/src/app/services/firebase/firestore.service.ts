import { OnDestroy, Injectable } from '@angular/core'
import { ActivatedRoute, Router, ParamMap } from '@angular/router'
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  QueryFn,
  AngularFirestoreCollectionGroup,
  QueryGroupFn,
  CollectionReference,
} from '@angular/fire/firestore'
import { environment } from '~env'
import { Observable, throwError, of } from 'rxjs';
import { User } from '~types/db/client/users';
import { AuthService } from '~services/firebase/auth.service'
import { RouterClientService } from '~services/router-client.service'


export type Collection<T> = AngularFirestoreCollection<T>
export type Query = QueryFn

@Injectable({
  providedIn: 'root',
})
export class FirestoreService extends RouterClientService {
  constructor(router: Router, private afs: AngularFirestore, private aSv?: AuthService) {
    super(router)
  }

  createId(): string {
    return this.afs.createId()
  }

  getUid(): Observable<User['id']> {
    if (!this.aSv) {
      return throwError(Error('auth service is empty'))
    }
    return this.aSv.getUid()
  }

  collection<T>(collectionName: string, query?: QueryFn): AngularFirestoreCollection<T> {
    return this.afs
      .collection<T>('versions')
      .doc(`${environment.DATABASE_VERSION}`)
      .collection(collectionName, query)
  }
}
