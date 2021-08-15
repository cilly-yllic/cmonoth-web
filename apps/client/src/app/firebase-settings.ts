import firebase from 'firebase/app'
import { isDevMode } from '@angular/core';
import { AngularFireModule as _AngularFireModule, FirebaseOptions } from '@angular/fire'
import { CONFIG as ANALYTICS_CONFIG, DEBUG_MODE as ANALYTICS_DEBUG_MODE } from '@angular/fire/analytics'
import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/auth'
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore'
import { REGION as FUNCTIONS_REGION, USE_EMULATOR as USE_FUNCTIONS_EMULATOR, ORIGIN as FUNCTIONS_ORIGIN, NEW_ORIGIN_BEHAVIOR as FUNCTIONS_NEW_ORIGIN_BEHAVIOR } from '@angular/fire/functions'
import { SETTINGS as REMOTE_CONFIGS_SETTINGS } from '@angular/fire/remote-config'
import { environment } from '~env'

// ------------------------------------- configs -------------------------------------
const PORTS = {
  AUTH: 9099,
  FIRESTORE: 8080,
  FUNCTIONS: 5001,
  STORAGE: 9199,
}

const USE_VALUES = {
  AUTH: [ 'localhost', PORTS.AUTH ],
  FIRESTORE: [ 'localhost', PORTS.FIRESTORE ],
  FUNCTIONS: [ 'localhost', PORTS.FUNCTIONS ],
}

export function getAngularFireModule(config: FirebaseOptions) {
  return _AngularFireModule.initializeApp(config)
}


const app = firebase.initializeApp(environment.firebaseConfig)

// ------------------------------------- emulator -------------------------------------
if (environment.useEmulators) {
  app.auth().useEmulator(`http://localhost:${PORTS.AUTH}`)
  app.firestore().useEmulator('localhost', PORTS.FIRESTORE)
  app.functions().useEmulator('localhost', PORTS.FUNCTIONS)
  app.storage().useEmulator('localhost', PORTS.STORAGE)
}

// ------------------------------------- Providers -------------------------------------
import 'firebase/analytics'
export { ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics'
export const ANALYTICS_DEBUG_MODE_PROVIDER = { provide: ANALYTICS_DEBUG_MODE, useValue: environment.debugAnalytics || false }
export const ANALYTICS_CONFIG_PROVIDER = {
  provide: ANALYTICS_CONFIG,
  useValue: {
    // send_page_view: false,
    // allow_ad_personalization_signals: false,
    // anonymize_ip: true
  },
}

import 'firebase/auth'
export const AUTH_PROVIDER = {
  provide: USE_AUTH_EMULATOR,
  useValue: environment.useEmulators ? USE_VALUES.AUTH : undefined,
}

import 'firebase/firestore'
export const FIRESTORE_PROVIDER = {
  provide: USE_FIRESTORE_EMULATOR,
  useValue: environment.useEmulators ? USE_VALUES.FIRESTORE : undefined,
}

import 'firebase/functions'
export const FUNCTIONS_PROVIDER = {
  provide: USE_FUNCTIONS_EMULATOR,
  useValue: environment.useEmulators ? USE_VALUES.FUNCTIONS : undefined,
}
export const FUNCTIONS_REGION_PROVIDER = { provide: FUNCTIONS_REGION, useValue: 'asia-northeast1' }
export const FUNCTIONS_NEW_ORIGIN_BEHAVIOR_PROVIDER = { provide: FUNCTIONS_NEW_ORIGIN_BEHAVIOR, useValue: true }
export const FUNCTIONS_ORIGIN_PROVIDER = { provide: FUNCTIONS_ORIGIN, useFactory: () => isDevMode() ? undefined : location.origin }

import 'firebase/remote-config'
export const REMOTE_CONFIG_SETTING_PROVIDER = { provide: REMOTE_CONFIGS_SETTINGS, useValue: { minimumFetchIntervalMillis: 10_000 } }

import 'firebase/storage'
