import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from '~services/firebase/auth.service'

@Injectable()
export class SignUpGuard implements CanActivate {
  constructor(private authSv: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('next', next)
    console.log('state', state)
    return this.check()
  }

  check(): Observable<boolean> {
    return this.authSv.isGuest()
  }
}
