import { Injectable } from '@angular/core';
import { Observable, of, from, throwError, forkJoin, combineLatest } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { Client, Clients, COLLECTION_NAME, Types  } from '~types/db/clients'
import { User } from '~types/db/client/users'
import { Collection, FirestoreService, Query } from '../firebase/firestore.service';
import { AuthService } from '../firebase/auth.service';
// import {
//   AngularFirestore,
// } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class ClientsService extends FirestoreService {
  getCollection<T = Client>(query?: Query): Collection<T> {
    return this.collection<T>(COLLECTION_NAME, query)
  }

  get(): Observable<Clients> {
    return this.getCollection().valueChanges({ idField: 'id' })
  }

  getOne(uid: Client['id']): Observable<Client | null> {
    return this.getCollection().doc<Client>(uid).valueChanges()
      .pipe(
        map((user) => user ? { ...user, id: uid } : null )
      )
  }

  getOneByName(name: Client['name']): Observable<Client | null> {
    return this
      .collection(COLLECTION_NAME, (ref) => ref.where('name', '==', name))
      .valueChanges({ idField: 'id' })
      .pipe(
        map((clients) => (clients.length ? (clients[0] as Client) : null))
      )
  }

  getOwn(): Observable<User | null> {
    return this.getUid().pipe(
      mergeMap((uid) => this.getOne(uid)),
      mergeMap((user) => {
        if (!user) {
          return of(null)
        }
        if (user.type !== Types.user) {
          return throwError(Error('not permission'))
        }
        return of(user as User)
      })
    )
  }
}
