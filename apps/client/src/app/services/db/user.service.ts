import { Injectable } from '@angular/core';
import { Observable, of, from, throwError, forkJoin, combineLatest } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { User } from '~types/db/client/users'
import { ClientsService } from './clients.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$ = this.clientsSv.getOwn()
  // user
  userName$: Observable<User['name']> = this.user$.pipe(map((user) => user?.name || ''))
  userId$: Observable<User['id']> = this.user$.pipe(map((user) => user?.id || ''))
  constructor(private clientsSv: ClientsService) {}

}
