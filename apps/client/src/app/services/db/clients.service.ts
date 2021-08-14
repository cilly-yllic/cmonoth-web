import { Injectable } from '@angular/core';
import { Observable, of, from, throwError, forkJoin, combineLatest } from 'rxjs'
import { map, mergeMap, take, first, skipWhile, tap } from 'rxjs/operators'
import { Client, Clients, COLLECTION_NAME, Types  } from '~types/db/clients'
import { User } from '~types/db/client/users'
import { Collection, FirestoreService, Query } from '../firebase/firestore.service';
import { AuthService } from '../firebase/auth.service';
// import {
//   AngularFirestore,
// } from '@angular/fire/firestore'

interface ClientAndUser {
  client: Client | null
  user: User | null
}

interface ClientIdAndUserId {
  clientId: Client['id']
  userId: User['id']
}

@Injectable({
  providedIn: 'root'
})
export class ClientsService extends FirestoreService {
  getCollection<T = Client>(query?: Query): Collection<T> {
    return this.collection<T>(COLLECTION_NAME, query)
  }

  getClients(): Observable<Clients> {
    return this.getCollection().valueChanges({ idField: 'id' })
  }

  getClient(uid: Client['id']): Observable<Client | null> {
    return this.getCollection().doc<Client>(uid).valueChanges()
      .pipe(
        map((user) => user ? { ...user, id: uid } : null )
      )
  }

  getClientByName(name: Client['name']): Observable<Client | null> {
    return this
      .collection<Client>(COLLECTION_NAME, (ref) => ref.where('name', '==', name))
      .valueChanges({ idField: 'id' })
      .pipe(
        map((clients) => (clients.length ? (clients[0] as Client) : null)),
      )
  }

  getCurrentClient(): Observable<Client> {
    return this.getClientByName(this.clientName)
      .pipe(
        mergeMap((client) => {
          if (!client) {
            return throwError(Error('client is null'))
          }
          return of(client)
        }),
        first()
      )
  }

  getCurrentClientId(): Observable<Client['id']> {
    return this.getCurrentClient()
      .pipe(
        skipWhile((client) => !client),
        first(),
        map((client) => client.id)
      )
  }

  getOwnClient(): Observable<User | null> {
    return this.getUid().pipe(
      mergeMap((uid) => this.getClient(uid)),
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

  getClientAndUser(): Observable<ClientAndUser> {
    return combineLatest([this.getCurrentClient(), this.getOwnClient()]).pipe(
      first(),
      map(([client, user]) => ({ client, user }))
    )
  }

  getClientIdAndUserId(): Observable<ClientIdAndUserId> {
    return this.getClientAndUser().pipe(
      map(({ client, user, }) => {
        return {
          clientId: client ? client.id : '',
          userId: user ? user.id : '',
        }
      })
    )
  }
}
