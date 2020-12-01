import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'passport-page',
  template: `
    <ion-header [translucent]="true">
      <app-toolbar></app-toolbar>
    </ion-header>

    <ion-content>
      <div class="wrapper">
        <ion-card>
          <ion-card-header>
            <ion-card-title class="ion-text-center ion-margin-bottom"
              >Welcome to IdHub</ion-card-title
            >
            <ion-card-subtitle class="ion-text-center"
              >We simplify the creation and sharing of your e-passports
            </ion-card-subtitle>
          </ion-card-header>
          <ng-lottie
            [style]="loginAnimStyle"
            [options]="loginAnimOptions"
          ></ng-lottie>

          <ion-card-content>
            <div class="ion-text-center">
              <ion-button color="secondary" size="large" (click)="login()"
                >Login</ion-button
              >
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
})
export class LoginPage implements OnInit {
  loginAnimOptions: AnimationOptions = {
    path: '/assets/animations/login.json',
  };
  loginAnimStyle: Partial<CSSStyleDeclaration> = {
    maxWidth: '250px',
    width: '100%',
    margin: '0 auto',
    display: 'block',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private oauthService: OAuthService,
  ) {}

  async ngOnInit() {
    console.log(this.route.snapshot.fragment);
    // this.oauthService.configure(authCodeFlowConfig);

    let hasToken = this.oauthService.hasValidIdToken();
    console.log({ hasToken });
    // if (hasToken) {
    //   this.router.navigate(['passports']);
    // }
    // if (this.route.snapshot.queryParams)
    const code = this.route.snapshot.queryParams.code;
    if (code) {
      console.log("We got a code");
      await this.oauthService.loadDiscoveryDocumentAndTryLogin();
      // const hasToken = this.oauthService.hasValidAccessToken();
      // await this.router.navigate(['passports']);
    } else {
      console.log("We dont have a code");
    }
    this.router.navigate(['passports']);

  }

  async login() {
    console.log('login');
    await this.oauthService.loadDiscoveryDocumentAndLogin();
    // this.oauthService.tryLoginCodeFlow();
  }
}
