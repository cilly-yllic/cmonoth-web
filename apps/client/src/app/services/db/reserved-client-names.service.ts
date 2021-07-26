import { Injectable } from '@angular/core'
import { Observable, of, from, throwError, combineLatest } from 'rxjs'
import { mergeMap, switchMap, map, share, tap } from 'rxjs/operators'

import { FirestoreService } from '~services/firebase/firestore.service'
import { getTimestamp, now } from '~utils/firebase/firestore'
import { Client } from '~types/db/clients'
import { CreateReservedClientName, ReservedClientName, COLLECTION_NAME } from '~types/db/reserved-client-names'

@Injectable({
  providedIn: 'root',
})
export class ReservedClientNamesService extends FirestoreService {

  isExists(name: Client['name']): Observable<boolean> {
    return this.collection(COLLECTION_NAME)
      .doc(name)
      .get()
      .pipe(
        map((v) => v.exists)
      )
  }

  create(name: Client['name']): Observable<ReservedClientName> {
    return this.getUid().pipe(
      mergeMap((uid) => {
        const data: CreateReservedClientName = {
          uid,
          createdAt: getTimestamp(),
        }
        return from(this.collection<CreateReservedClientName>(COLLECTION_NAME).doc(name).set(data)).pipe(
          map(() => ({ ...data, name, createdAt: now() }))
        )
      })
    )
  }
}
