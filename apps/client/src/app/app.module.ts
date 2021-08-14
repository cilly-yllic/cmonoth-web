import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module'
import { ClientModule } from '~roots/client/client.module' // TODO コメントアウトでサイズの変更がされるかチェック
import { GuestModule } from '~roots/guest/guest.module' // TODO コメントアウトでサイズの変更がされるかチェック
import { environment } from '~env'
import { NavigationLoadingModule } from '~atoms/navigation-loading/navigation-loading.module'

// --- firebase
import {
  getAngularFireModule,
  getFirebaseFirestoreProvider,
  FUNCTIONS_PROVIDER,
  REMOTE_CONFIG_PROVIDER,
  ScreenTrackingService,
  UserTrackingService,
  getFirebaseAnalyticsProvider,
} from './ng-fire'
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
    ClientModule,
    GuestModule,
    NavigationLoadingModule,
  ],
  providers: [
    FUNCTIONS_PROVIDER,
    getFirebaseFirestoreProvider(environment?.debug?.emulator),
    getFirebaseAnalyticsProvider(environment?.debug?.analytics),
    ScreenTrackingService,
    UserTrackingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
