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
            <ion-card-title class="ion-text-center ion-margin-bottom">
              Welcome to ID Hub
            </ion-card-title
            >
            <ion-card-subtitle class="ion-text-center">
              Create your digital identity and share it from your phone wallet.
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
    console.log("Go the passports page");
    let hasValidToken = this.oauthService.hasValidIdToken();
    if (hasValidToken) {
      console.log("Valid session, go to passport page");
      this.router.navigate(['passports']);
    } else {
      console.log("No valid session, time to login")
    }
  }

  async login() {
    console.log('login');
    await this.oauthService.loadDiscoveryDocumentAndLogin();
    // this.oauthService.tryLoginCodeFlow();
    console.log("Go the passports page");
    this.router.navigate(['passports']);
  }
}
