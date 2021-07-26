import { Injectable } from '@angular/core'
import { take, mergeMap, map } from 'rxjs/operators'
import { FunctionsService } from './functions.service'
import { ClientsService } from '~services/db/clients.service'

@Injectable({
  providedIn: 'root',
})
export class SlackUrlService {
  constructor(private functionsSv: FunctionsService, private clientsSv: ClientsService) {}

  check(url: string, target: string) {
    return this.clientsSv.getOwn().pipe(
      take(1),
      map((user) => user ? user.name : ''),
      mergeMap((username) => this.functionsSv.slack({ type: 'check', url, username, target }))
    )
  }
}
