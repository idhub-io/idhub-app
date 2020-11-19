import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { IState, IUser } from '@models';
import { select, Store } from '@ngrx/store';
import { selectUser } from '@store/selectors/user.selectors';
import { Observable } from 'rxjs';
import { AccountPopover } from './account.popover';

@Component({
  selector: 'app-toolbar',
  template: `
    <ion-toolbar>
      <ion-buttons slot="start">
        <img src="assets/idhub.svg" />
        <!-- <ion-menu-button></ion-menu-button> -->
      </ion-buttons>
      <ion-title>idhub</ion-title>
      <ion-buttons slot="end" *ngIf="user$ | async as user">
        <ion-button (click)="presentPopover($event)">
          {{ user.preferred_username }}
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  `,
  styles: [
    `
      img {
        width: 30px;
      }
    `,
  ],
})
export class ToolbarComponent implements OnInit {
  public user$: Observable<IUser> = this.store.pipe(select(selectUser));
  constructor(
    private popoverCtrl: PopoverController,
    private store: Store<IState>,
  ) {}

  ngOnInit() {}

  selectUser;
  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: AccountPopover,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
}
