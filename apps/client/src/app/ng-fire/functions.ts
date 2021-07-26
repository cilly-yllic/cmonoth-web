import { REGION } from '@angular/fire/functions'
import 'firebase/functions'

export const FUNCTIONS_PROVIDER = { provide: REGION, useValue: 'asia-northeast1' }
