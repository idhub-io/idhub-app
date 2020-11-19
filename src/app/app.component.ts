import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store } from '@ngrx/store';
import { IState, IUser } from '@models';
import { LoginSuccessAction } from '@store/reducers/user';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://iam.idhub.openbanking4.dev/auth/realms/external',

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
  scope: 'openid wallet passport',
  useSilentRefresh: true,
  showDebugInformation: true,
};
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail',
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane',
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart',
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive',
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash',
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning',
    },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oauthService: OAuthService,
    private route: ActivatedRoute,
    private store: Store<IState>,
  ) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.events.subscribe((test) => console.log({ test }));
    this.initializeApp();
  }

  async initializeApp() {
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // console.log({ authCodeFlowConfig });
      // await this.oauthService.loadDiscoveryDocumentAndLogin();
      // await this.oauthService.initLoginFlow();
      // const token = this.oauthService.hasValidAccessToken();
      // console.log({ token });
      // await this.oauthService.loadDiscoveryDocumentAndLogin();
      try {
        const user = <IUser>await this.oauthService.loadUserProfile();
        // this.oauthService.setupAutomaticSilentRefresh();

        this.store.dispatch(LoginSuccessAction({ user }));
      } catch (error) {
        console.log({ error });
      }
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase(),
      );
    }
  }
}
