import { SETTINGS } from '@angular/fire/firestore'
// import { environment } from '../environments/environment'
import 'firebase/firestore'

export { AngularFirestoreModule } from '@angular/fire/firestore'
const FIRESTORE_TEST_VALUE = { host: 'localhost:8080', ssl: false }
// export const FIRESTORE_PROVIDER = { provide: SETTINGS, useValue: !environment?.debug?.emulator ? undefined : FIRESTORE_TEST_VALUE }
export function getFirebaseFirestoreProvider(isDebug: boolean = false) {
  return {
    provide: SETTINGS,
    useValue: !isDebug ? undefined : FIRESTORE_TEST_VALUE,
  }
}
