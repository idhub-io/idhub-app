import { OAuthService } from 'angular-oauth2-oidc';
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { IState } from '@models';
import { LogoutSuccessAction } from '@store/reducers/user';
@Component({
  template: `
    <ion-list lines="none">
      <ion-item>All Users</ion-item>
      <ion-item (click)="logout()">Logout</ion-item>
    </ion-list>
  `,
})
export class AccountPopover {
  constructor(
    private popoverCtrl: PopoverController,
    public params: NavParams,
    private oauthService: OAuthService,
    private store: Store<IState>,
    private router: Router,
  ) {}

  logout() {
    this.oauthService.logOut();
    this.store.dispatch(LogoutSuccessAction());
    this.router.navigate['/login'];
  }
}
