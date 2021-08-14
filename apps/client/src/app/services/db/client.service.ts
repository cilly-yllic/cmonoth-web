import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable, of, from, throwError } from 'rxjs'
import { switchMap, map, share, tap, take } from 'rxjs/operators'
import { User } from '~types/db/client/users'
import { Types, Type, Client } from '~types/db/clients'
import { Organization } from '~types/db/client/organizations'
import { routingHead, isGuestPage } from '~utils/location'
import { ClientsService } from './clients.service'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  client$: Observable<Organization | User | null> = isGuestPage
    ? of(null)
    : this.clientsSv.getClientByName(routingHead) as Observable<Organization | User | null>

  isOrg$: Observable<boolean> = this.client$.pipe(map((client) => client?.type === Types.organization))
  isUser$: Observable<boolean> = this.client$.pipe(map((client) => client?.type === Types.user))

  clientType$: Observable<Type | undefined> = this.client$.pipe(map((client) => client?.type))
  clientId$: Observable<Client['id']> = this.client$.pipe(map((client) => client?.id || ''))
  clientName$: Observable<Client['name']> = this.client$.pipe(map((client) => client?.name || ''))

  constructor(private clientsSv: ClientsService) { }
}
