import { environment } from './../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store } from '@ngrx/store';
import { IState, IUser } from '@models';
import { LoginSuccessAction } from '@store/reducers/user';
import { PWAService } from '@services/pwa.service';

export const authCodeFlowConfig: AuthConfig = {
  issuer: environment.ssoUrl + '/auth/realms/external',

  redirectUri: window.location.origin + '/login',
  //  window.location.origin + '/exchange-code',
  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: 'idhub-app',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  // dummyClientSecret: 'secret',
  responseType: 'code',
  scope: 'openid wallet passport offline_access',
  useSilentRefresh: true,
  showDebugInformation: true,
  // oidc: false,
};
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oauthService: OAuthService,
    private route: ActivatedRoute,
    private store: Store<IState>,
    private pwa: PWAService,
    private router: Router,
  ) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.events.subscribe((test) => console.log({ test }));
    this.initializeApp();
  }

  async initializeApp() {
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.setupAutomaticSilentRefresh();

    await this.platform.ready();

    this.pwa.init();
    this.statusBar.styleDefault();
    this.splashScreen.hide();
    try {
      const token = this.oauthService.hasValidAccessToken();
      if (token) {
        const user = <IUser>await this.oauthService.loadUserProfile();
        console.log({ user });
        this.store.dispatch(LoginSuccessAction({ user }));
        // this.router.navigate(['passports']);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  ngOnInit() {}
}
