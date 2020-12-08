import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LottieModule } from 'ngx-lottie';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { rootReducers, middlewares } from '@store/reducers';
import { rootEffects } from '@store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  ServiceWorkerModule,
  SwRegistrationOptions,
} from '@angular/service-worker';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { IdHubHttpInterceptor } from './http.interceptor';

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
    {
       provide: HTTP_INTERCEPTORS,
       useClass: IdHubHttpInterceptor,
       multi: true,
     },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
