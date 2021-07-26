import { CONFIG, DEBUG_MODE } from '@angular/fire/analytics'
import 'firebase/analytics'

export { ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics'
// export const FIREBASE_ANALYTICS_DEBUG_MODE = {
//   provide: DEBUG_MODE,
//   useValue: environment?.debug?.analytics,
// }

export function getFirebaseAnalyticsProvider(isDebug: boolean = false) {
  return {
    provide: DEBUG_MODE,
    useValue: isDebug,
  }
}

export const FIREBASE_ANALYTICS_CONFIG = {
  provide: CONFIG,
  useValue: {
    // send_page_view: false,
    // allow_ad_personalization_signals: false,
    // anonymize_ip: true
  },
}
