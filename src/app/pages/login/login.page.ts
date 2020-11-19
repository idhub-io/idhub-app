import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// const authCodeFlowConfig: AuthConfig = {
//   issuer: 'https://iam.idhub.openbanking4.dev/auth/realms/external',

//   redirectUri: window.location.origin + '/login',
//   //  window.location.origin + '/exchange-code',
//   // The SPA's id. The SPA is registerd with this id at the auth-server
//   // clientId: 'server.code',
//   clientId: 'idhub-app',

//   // Just needed if your auth server demands a secret. In general, this
//   // is a sign that the auth server is not configured with SPAs in mind
//   // and it might not enforce further best practices vital for security
//   // such applications.
//   // dummyClientSecret: 'secret',
//   responseType: 'code',
//   scope: 'openid wallet passport',
//   useSilentRefresh: true,
//   showDebugInformation: true,
// };

@Component({
  selector: 'passport-page',
  template: `
    <ion-header [translucent]="true">
      <app-toolbar></app-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="wrapper">
        <ion-card>
          <ion-card-header>
            <ion-card-title
              >Share your passport as an electronique format.</ion-card-title
            >
          </ion-card-header>

          <ion-card-content>
            <p>
              Simple and secure, your epassport is accessible in the cloud,
              following you where ever you are. No need anymore to send your
              passport photocopy around, in the right format.
            </p>
            <p>
              the e-passport uses digital signing to allow you sharing your
              information in a secured way
            </p>
            <div class="ion-text-center">
              <img class="passport" src="assets/passport.svg" />
            </div>
            <div class="ion-text-center">
              <ion-button color="secondary" (click)="login()">Login</ion-button>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
})
export class LoginPage implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private oauthService: OAuthService,
  ) {}

  async ngOnInit() {
    console.log(this.route.snapshot.fragment);
    // this.oauthService.configure(authCodeFlowConfig);

    let hasToken = this.oauthService.hasValidAccessToken();
    console.log({ hasToken });
    // if (hasToken) {
    //   this.router.navigate(['passports']);
    // }
    // if (this.route.snapshot.queryParams)
    const code = this.route.snapshot.queryParams.code;
    console.log(code);
    if (code) {
      const result = await this.oauthService.loadDiscoveryDocumentAndTryLogin();
      if (result) {
        this.router.navigate(['passports']);
      }
      console.log({ result });
      // const hasToken = this.oauthService.hasValidAccessToken();
      // await this.router.navigate(['passports']);
    }
  }

  async login() {
    console.log('login');
    await this.oauthService.loadDiscoveryDocumentAndLogin();
    // this.oauthService.tryLoginCodeFlow();
  }
}
