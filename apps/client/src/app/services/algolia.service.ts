import { Injectable, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { PageEvent } from '@angular/material/paginator'
import { AngularFirestore } from '@angular/fire/firestore'
import algoliasearch from 'algoliasearch'
import { Observable, from, of, Subject, Subscription } from 'rxjs'
import { tap, mergeMap, map } from 'rxjs/operators'
import { environment } from '~env'
import { Response } from '~types/algolia'
import { Client } from '~types/db/clients'
import { getClientIdsKey, getClientsAlgoliaKey, setAlgoliaKey, KEYS, KeysValues } from '~utils/cookie'
import { ClientsService } from './db/clients.service'
import { FunctionsService } from '~services/firebase/functions/functions.service'
import { AuthService } from '~services/firebase/auth.service'

export const DEFAULT_PAGE_SIZE = 50

export const DEFAULT = {
  exhaustiveNbHits: false,
  hits: [],
  hitsPerPage: 0,
  nbHits: 0,
  nbPages: 0,
  page: 0,
  params: '',
  processingTimeMS: 0,
  query: '',
}

export const DEFAULT_PAGE: PageEvent = {
  pageIndex: 0,
  pageSize: DEFAULT_PAGE_SIZE,
  length: 0,
}

export const INDICES = environment.ALGOLIA.INDICES
type IndicesKeys = keyof typeof INDICES
type IndicesValues = typeof INDICES[IndicesKeys]

const getAlgoliaToken = (index: IndicesValues, clientIds: Client['id'][]): { key: string | null; refresh: boolean } => {
  switch (index) {
    case INDICES.PROJECTS:
    case INDICES.TREES:
      return getClientsAlgoliaKey(clientIds)
    default:
      return {
        key: null,
        refresh: false,
      }
  }
}

const search = (
  token: string,
  index: string,
  query: string,
  page: number,
  hitsPerPage: number = DEFAULT_PAGE_SIZE,
  filters?: string
): Observable<Response> => {
  return from(
    algoliasearch(environment.ALGOLIA.APP_ID, token)
      .initIndex(index)
      .search(query, { hitsPerPage, page, ...(filters ? { filters } : {}) })
  )
}

interface Refresh {
  suffix: string
  cookieKey: KeysValues
  objKey: string
  params: any
}

@Injectable({
  providedIn: 'root',
})
export class AlgoliaService extends ClientsService implements OnDestroy {
  subscriptions = new Subscription()
  refreshSbj: Subject<Refresh> = new Subject()

  constructor(router: Router, afs: AngularFirestore, private functionsSv: FunctionsService) {
    super(router, afs)
    this.subscriptions.add(
      this.refreshSbj
        .asObservable()
        .pipe(mergeMap(({ suffix, cookieKey, objKey, params }) => this.refresh(suffix, cookieKey, objKey, params)))
        .subscribe(() => console.log('refresh'))
    )
  }

  private refresh(suffix: string, cookieKey: KeysValues, objKey: string, params: any): Observable<string> {
    return this.functionsSv.generateApiKey(suffix, params).pipe(
      tap((k) => setAlgoliaKey(cookieKey, objKey, k)),
      map((v) => v.key)
    )
  }

  searchByCurrentClient(index: IndicesValues, query: string, page: number, hitsPerPage: number = DEFAULT_PAGE_SIZE, filters?: string): Observable<Response> {
    const suffix = 'clients'
    const cookieKey = KEYS.alClientKeys
    return this.getCurrentClientId()
      .pipe(
        mergeMap((clientId) => {
          const clientIds = [clientId]
          const params = { clientIds: [clientId] }
          const objKey = getClientIdsKey(clientIds)
          console.log('objKey', objKey)
          const { key, refresh } = getAlgoliaToken(index, clientIds)
          console.log('key, refresh', key, refresh)
          const getApiKey = key !== null ? of(key) : this.refresh(suffix, cookieKey, objKey, params)
          if (refresh) {
            this.refreshSbj.next({
              suffix,
              cookieKey,
              objKey,
              params
            })
          }
          return getApiKey.pipe(mergeMap((apiKey) => search(apiKey, index, query, page, hitsPerPage, filters)))
        })
      )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
