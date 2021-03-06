// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const firebaseConfig = {
  apiKey: 'AIzaSyBwgeDpxoC4QmItME7BbieQBoASiB12pDg',
  authDomain: 'cmonoth-fire-dev.firebaseapp.com',
  databaseURL: 'https://cmonoth-fire-dev.firebaseio.com',
  projectId: 'cmonoth-fire-dev',
  storageBucket: 'dev-cmonoth',
  messagingSenderId: '370702326672',
  appId: '1:370702326672:web:9437bc14a18ef7b10ab115',
  measurementId: 'G-BWPBB165YS',
}

const ALGOLIA = {
  APP_ID: '87ZC9GSJBC',
  INDICES: {
    PROJECTS: 'yoshi-projects',
    TREES: 'yoshi-trees',
  }
}

export const environment = {
  envName: 'local',
  useEmulators: true,
  // useEmulators: false,
  debugAnalytics: true,
  production: false,
  firebaseConfig,
  DATABASE_VERSION: 1,
  ALGOLIA
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
