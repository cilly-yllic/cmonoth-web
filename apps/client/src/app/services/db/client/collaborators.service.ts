import { Injectable } from '@angular/core'
import { Observable, of, from, throwError, combineLatest } from 'rxjs'
import { mergeMap, switchMap, map, share, tap } from 'rxjs/operators'

import { AngularFirestore } from '@angular/fire/firestore'
import { AuthService } from '~services/firebase/auth.service'

import { FirestoreService } from '~services/firebase/firestore.service'
import { ClientsService } from '~services/db/clients.service'
import { getTimestamp, now } from '~utils/firebase/firestore'
import { Client } from '~types/db/clients'
import { COLLECTION_NAME as CLIENTS_COLLECTION_NAME, Types } from '~types/db/clients'
import { COLLECTION_NAME, Collaborator } from '~types/db/client/collaborators'

@Injectable({
  providedIn: 'root'
})
export class CollaboratorsService extends FirestoreService {
  constructor(af: AngularFirestore, authSv: AuthService, private ClientsSv: ClientsService) {
    super(af, authSv);
  }
  // --- org ---
  isUserCollaborator(clientId: string, userId: string): Observable<boolean> {
    console.log('isUserJoined', clientId, userId)
    return this
      .collection(CLIENTS_COLLECTION_NAME)
      .doc(clientId)
      .collection<Collaborator>(COLLECTION_NAME)
      .doc(userId)
      .valueChanges()
      .pipe(map((user) => !!user && user.status === 'accepted'))
  }
  isUserCollaboratorByOrgName(clientNameDestination: string, userId: string): Observable<boolean> {
    return this.ClientsSv.getOneByName(clientNameDestination).pipe(
      mergeMap((client) => {
        if (!client) {
          return of(false)
        }
        return this.isUserCollaborator(client.id, userId)
      })
    )
  }
}
