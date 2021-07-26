import { Injectable } from '@angular/core'
import { Route } from '@angular/router'
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router'
import { Observable } from 'rxjs'
import firebase from 'firebase/app'
import { QueryParams, SignUpData } from './action.interface'
import { CanSignUpService } from '~services/firebase/functions/can-sign-up.service'

const getModeAndData = (queryParams: QueryParams): SignUpData | undefined => {
  const mode = queryParams.mode
  switch (mode) {
    case 'signIn':
    default:
      const email = decodeURIComponent(queryParams.continueUrl.replace(/.+\/email\/(.+)/, '$1'))
      return email && mode ? ({ mode, email } as SignUpData) : undefined
  }
}

@Injectable({
  providedIn: 'root'
})
// export class ActionGuard implements CanActivate, CanActivateChild {
export class ActionGuard implements CanActivate, Resolve<Observable<any> | Promise<any> | any> {
  constructor(private cSUSv: CanSignUpService) {}

  // TODO ログイン情報も確認
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.check(state.root.queryParams as QueryParams)
  }

  // canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.canActivate(next, state)
  // }

  // canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
  //   const url = `/${route.path}`
  //   return this.check(url)
  // }

  check(queryParams: QueryParams): Observable<boolean> | Promise<boolean> | boolean {
    const data = getModeAndData(queryParams)
    if (typeof data === 'undefined') {
      return false
    }
    if (data.mode === 'signIn' && firebase.auth().isSignInWithEmailLink(window.location.href)) {
      return this.cSUSv.run(data.email)
    }
    return false
  }

  resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return getModeAndData(next.root.queryParams as QueryParams)
  }
}
