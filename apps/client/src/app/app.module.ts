import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module'
import { ClientModule } from '~roots/client/client.module' // TODO ビルド時にコメントアウト
import { GuestModule } from '~roots/guest/guest.module' // TODO ビルド時にコメントアウト
import { environment } from '~env'
import { NavigationLoadingModule } from '~atoms/navigation-loading/navigation-loading.module'

// --- firebase
import {
  getAngularFireModule,
  AUTH_PROVIDER,
  FIRESTORE_PROVIDER,
  FUNCTIONS_REGION_PROVIDER,
  FUNCTIONS_PROVIDER,
  FUNCTIONS_ORIGIN_PROVIDER,
  FUNCTIONS_NEW_ORIGIN_BEHAVIOR_PROVIDER,
  REMOTE_CONFIG_SETTING_PROVIDER,
  ScreenTrackingService,
  UserTrackingService,
  ANALYTICS_DEBUG_MODE_PROVIDER,
} from './firebase-settings'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AngularFireFunctionsModule } from '@angular/fire/functions'
import { AngularFireRemoteConfigModule } from '@angular/fire/remote-config'
import { AngularFireAnalyticsModule } from '@angular/fire/analytics'
// --- firebase

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, BrowserAnimationsModule,

    getAngularFireModule(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    AngularFireRemoteConfigModule,
    AngularFireAnalyticsModule,

    AppRoutingModule,
    ClientModule, // TODO ビルド時にコメントアウト
    GuestModule, // TODO ビルド時にコメントアウト
    NavigationLoadingModule,
  ],
  providers: [
    AUTH_PROVIDER,
    FUNCTIONS_REGION_PROVIDER,
    FUNCTIONS_PROVIDER,
    FUNCTIONS_ORIGIN_PROVIDER,
    FUNCTIONS_NEW_ORIGIN_BEHAVIOR_PROVIDER,
    FIRESTORE_PROVIDER,
    REMOTE_CONFIG_SETTING_PROVIDER,
    ANALYTICS_DEBUG_MODE_PROVIDER,
    ScreenTrackingService,
    UserTrackingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
