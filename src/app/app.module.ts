import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { LottieModule } from 'ngx-lottie';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { rootReducers, middlewares } from '@store/reducers';
import { rootEffects } from '@store/effects';
import {
  ServiceWorkerModule,
  SwRegistrationOptions,
} from '@angular/service-worker';

console.log({ environment });

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    EffectsModule.forRoot(rootEffects),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(rootReducers, { metaReducers: middlewares }),
    // always inport devtools before StoreModule ^
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://api.idhub.io'],
        sendAccessToken: true,
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: SwRegistrationOptions,
      useFactory: (platform: Platform) => ({
        enabled: !platform.is('hybrid') && environment.production,
      }),
      deps: [Platform],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
