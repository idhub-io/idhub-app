import { NewPassportModal } from './new-passport.modal';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { IPassportListItem, IProvider, IState } from '@models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectPassports,
} from '@store/selectors/passports.selectors';
import { first } from 'rxjs/operators';
import { PassportsRequestAction } from '@store/reducers/passports';

const passports: IPassportListItem[] = [
  {
    id: '9a29ee19-ce6b-4206-8394-70f703a65288',
    userId: '41bede2c-ed71-403f-a562-f360334b56c4',
    providerId: 'santander',
    exp: 1608734380,
    iat: 1606142380,
  },
  {
    id: '4996b341-df11-4327-898c-770a055ecec3',
    userId: '41bede2c-ed71-403f-a562-f360334b56c4',
    providerId: 'google',
    exp: 1608734399,
    iat: 1606142399,
  },
  {
    id: '8748b4a4-0ba7-4e52-ab3f-01b63ced744d',
    userId: '41bede2c-ed71-403f-a562-f360334b56c4',
    providerId: 'github',
    exp: 1608734406,
    iat: 1606142406,
  },
  {
    id: '020ae4cc-a698-4139-9f66-9628db52a2cc',
    userId: '41bede2c-ed71-403f-a562-f360334b56c4',
    providerId: 'gitlab',
    exp: 1608734413,
    iat: 1606142413,
  },
  {
    id: '4ce43c6e-eac1-4df3-b5a7-ca002b4bee50',
    userId: '41bede2c-ed71-403f-a562-f360334b56c4',
    providerId: 'linkedin',
    exp: 1608734422,
    iat: 1606142422,
  },
  {
    id: 'a6458aa7-83cc-44ab-b717-d3d47b3b6d63',
    userId: '41bede2c-ed71-403f-a562-f360334b56c4',
    providerId: 'awesome-company',
    exp: 1608734444,
    iat: 1606142444,
  },
  {
    id: '69d62e90-2466-4218-a128-a69f4a37966a',
    userId: '41bede2c-ed71-403f-a562-f360334b56c4',
    providerId: 'eventbrite',
    exp: 1608734457,
    iat: 1606142457,
  },
];

@Component({
  selector: 'wallet-page',
  template: `
    <ion-header [translucent]="true">
      <app-toolbar></app-toolbar>
      <ion-searchbar
        debounce="500"
        (ionChange)="filter($event.detail.value)"
      ></ion-searchbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-list lines="full">
        <ion-item-sliding
          *ngFor="let passport of passports$ | async"
          (ionSwipe)="deletePassport($event, passport)"
        >
          <ion-item>
            <ion-thumbnail slot="start">
              <img
                [src]="'assets/icons/providers/' + passport.providerId + '.svg'"
              />
              <!-- <ion-skeleton-text></ion-skeleton-text> -->
            </ion-thumbnail>
            <ion-label class="ion-text-wrap">
              <ion-text color="primary">
                <h2>{{ passport.providerId | titlecase }}</h2>
              </ion-text>
              <ion-text>
                <p>Created on: {{ passport.iat * 1000 | date }}</p>
              </ion-text>
              <ion-text color="secondary">
                <p>Valid until: {{ passport.exp * 1000 | date }}</p>
              </ion-text>
            </ion-label>
            <ion-chip slot="end" color="primary">
              <ion-icon name="albums-outline" color="dark"></ion-icon>
              <ion-label>9</ion-label>
            </ion-chip>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option
              color="danger"
              expandable
              (click)="deletePassport($event, passport)"
              ><ion-icon name="trash-outline"></ion-icon
            ></ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button (click)="createPassport()">
          <ion-icon name="add-outline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  `,
  styles: [
    `
      .wrapper {
        max-width: 600px;
        margin: 0 auto;
      }
      .passport {
        width: 150px;
      }
    `,
  ],
})
export class WalletPage implements OnInit {
  // passports: IPassportListItem[] = passports;
  public passports$: Observable<IPassportListItem[]> = this.store.pipe(
    select(selectPassports),
  );
  public isLoading$: Observable<boolean> = this.store.pipe(
    select(selectIsLoading),
  );
  public error$: Observable<string> = this.store.pipe(select(selectError));

  constructor(
    private router: Router,
    protected store: Store<IState>,
    private route: ActivatedRoute,
    public modalController: ModalController,
    public alertController: AlertController,
  ) {}

  ngOnInit() {
    this.passports$
      .pipe(first())
      .subscribe(
        (providers) =>
          providers.length <= 1 &&
          this.store.dispatch(PassportsRequestAction()),
      );
  }

  errorImg() {}

  filter(value: string) {
    console.log('eeee', value);
  }

  async deletePassport(e: Event, passport: IPassportListItem) {
    const alert = await this.alertController.create({
      header: 'Remove Passport',
      message: 'Removing a passport cannot be undone. Are you sure ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
          },
        },
      ],
    });

    await alert.present();
  }

  async createPassport() {
    const modal = await this.modalController.create({
      component: NewPassportModal,
    });
    return await modal.present();
  }
}
