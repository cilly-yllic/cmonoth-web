import { SETTINGS } from '@angular/fire/remote-config'
import 'firebase/remote-config'

export const REMOTE_CONFIG_PROVIDER = { provide: SETTINGS, useValue: { minimumFetchIntervalMillis: 10_000 } }
