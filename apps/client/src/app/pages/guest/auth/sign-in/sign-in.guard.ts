import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable, of } from 'rxjs'
import { tap, map, mergeMap } from 'rxjs/operators'
import { AuthService } from '~services/firebase/auth.service'
import { ClientsService } from '~services/db/clients.service'
import { RouterService } from '~services/router.service'
import { NAVIGATES } from '~configs'
import { Auth } from '~types/auth'

@Injectable({
  providedIn: 'root'
})
export class SignInGuard implements CanActivate {
  constructor(private authSv: AuthService, private rSv: RouterService, private clientsSv: ClientsService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.check()
  }

  getClient(user: Auth): Observable<boolean> {
    return this.clientsSv.getClient(user.uid).pipe(
      map((client) => {
        if (!client) {
          return true
        }
        this.rSv.navigate([NAVIGATES.AFTER_SIGN_IN(client.name)])
        return false
      })
    )
  }

  check(): Observable<boolean> {
    return this.authSv.getUser().pipe(
      mergeMap((user) => {
        if (!user) {
          return of(true)
        }
        return this.getClient(user)
      })
    )
  }
}
