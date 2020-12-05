import { OAuthService } from 'angular-oauth2-oidc';
import { Component } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { IState } from '@models';
import { LogoutSuccessAction } from '@store/reducers/user';
@Component({
  template: `
    <ion-list lines="none">
      <ion-item (click)="popoverCtrl.dismiss()" [routerLink]="['/passports']"
        >Passports</ion-item
      >
      <ion-item (click)="logout()">Logout</ion-item>
    </ion-list>
  `,
})
export class AccountPopover {
  constructor(
    public popoverCtrl: PopoverController,
    public params: NavParams,
    private oauthService: OAuthService,
    private store: Store<IState>,
    private router: Router,
  ) {}

  async logout() {
    this.popoverCtrl.dismiss();
    this.oauthService.logOut();
    await this.router.navigate['/login'];
    this.store.dispatch(LogoutSuccessAction());
  }
}
