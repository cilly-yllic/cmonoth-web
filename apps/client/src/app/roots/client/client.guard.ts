import { Injectable } from '@angular/core'
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable, of } from 'rxjs'
import { take, mergeMap, map } from 'rxjs/operators'
import { AuthService } from '~services/firebase/auth.service'
import { ClientsService } from '~services/db/clients.service'
import { CollaboratorsService } from '~services/db/client/collaborators.service'

@Injectable({
  providedIn: 'root',
})
export class ClientGuard implements CanLoad {
  constructor(private authSv: AuthService, private clientsSv: ClientsService, private collaboratorsSv: CollaboratorsService) {}

  checkUser(clientName: string, uid: string): Observable<boolean> {
    return this.clientsSv.getOne(uid).pipe(
      take(1),
      mergeMap((user) => {
        if (!user) {
          return of(false)
        }
        if (user.name === clientName) {
          return of(true)
        } else {
          return this.collaboratorsSv.isUserCollaboratorByOrgName(clientName, uid).pipe(take(1))
        }
      })
    )
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    if (!segments.length) {
      return false
    }
    const clientName = segments[0].path
    return this.authSv.getUser().pipe(
      take(1),
      mergeMap((user) => {
        if (!user) {
          return of(false)
        }
        return this.checkUser(clientName, user.uid)
      })
    )
  }
}
