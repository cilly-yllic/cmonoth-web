import { AngularFireModule as _AngularFireModule, FirebaseOptions } from '@angular/fire'
import firebase from 'firebase/app'
// import { environment } from '../environments/environment'

// firebase.initializeApp(environment.firebaseConfig)

// export const AngularFireModule = _AngularFireModule.initializeApp(environment.firebaseConfig)
export function getAngularFireModule(config: FirebaseOptions) {
  return _AngularFireModule.initializeApp(config)
}
export const initializeApp = (config: FirebaseOptions) => firebase.initializeApp(config)

import 'firebase/auth'

export { AngularFireAuthModule } from '@angular/fire/auth'

export * from './analytics'
export * from './auth'
export * from './firestore'
export * from './functions'
export * from './remote-config'
export * from './storage'
