import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Observable, from, throwError, of } from 'rxjs'
import { tap, map, mergeMap } from 'rxjs/operators'
import { RouterService } from '~services/router.service'
import { Auth } from '~types/auth'
import { NAVIGATES } from '~configs'
import { getUrl } from '~utils/location'
import firebase from 'firebase/app'

const getActionCodeSettings = (email: string) => ({
  url: getUrl(`/auth/sign-up/email/${encodeURIComponent(email)}`),
  handleCodeInApp: true,
})

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth, private rs: RouterService) {}

  getUser(): Observable<Auth | null> {
    return this.afa.user
  }
  isGuest(): Observable<boolean> {
    return this.afa.authState.pipe(map((user) => !user))
  }
  getUid(): Observable<Auth['uid']> {
    return this.getUser().pipe(
      mergeMap((user) => {
        if (!user?.uid) {
          return throwError(Error('You should sign in'))
        }
        return of(user?.uid)
      })
    )
  }

  // 登録の確認
  fetchSignInMethodsForEmail(email: string): Observable<any> {
    return from(this.afa.fetchSignInMethodsForEmail(email)).pipe(tap((providers) => console.log(providers)))
  }

  signInWithEmailAndPassword(email: string, password: string): Observable<any> {
    return from(this.afa.signInWithEmailAndPassword(email, password)).pipe(tap((providers) => console.log(providers)))
  }
  isSignedIn(): Observable<boolean> {
    return this.afa.authState.pipe(
      tap((user) => console.log('isSignedIn', user)),
      map((user) => !!user)
    )
  }

  sendSignInLinkToEmail(email: string): Observable<any> {
    return from<Promise<void>>(this.afa.sendSignInLinkToEmail(email, getActionCodeSettings(email)))
  }

  isSignInWithEmailLink(): void {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      return
    }
    window.location.href = getUrl('/')
  }

  signInWithEmailLink(email: string) {
    return from(this.afa.signInWithEmailLink(email, window.location.href))
  }
  signOut(): Observable<any> {
    return from(this.afa.signOut())
  }

  signOutAndRedirect(): void {
    this.afa.signOut().then(() => {
      console.log('signOut')
      this.rs.navigate([NAVIGATES.SIGN_IN])
    })
  }
}
