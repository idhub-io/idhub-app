import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';

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

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot(rootEffects),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(rootReducers, { metaReducers: middlewares }),
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://api.idhub.openbanking4.dev'],
        sendAccessToken: true,
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
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
