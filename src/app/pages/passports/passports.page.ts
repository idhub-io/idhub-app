import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ModalController,
  AlertController,
  ActionSheetController,
  IonRefresher,
} from '@ionic/angular';
import { IPassportListItem, IPassport, IState } from '@models';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectPassports,
} from '@store/selectors/passports.selectors';
import { first } from 'rxjs/operators';
import {
  PassportDeletionRequestAction,
  PassportsFilterAction,
  PassportsRequestAction,
} from '@store/reducers/passports';
import { ApiService } from '@services/api.service';
import { PassportModal } from './passport.modal';
import { SharePassportModal } from './share.modal';
import { SharedPassportsModal } from './shared-passports.modal';
import { NewPassportModal } from './new-passport.modal';

@Component({
  selector: 'passports-page',
  template: `
    <ion-header [translucent]="true">
      <app-toolbar></app-toolbar>
      <ion-searchbar
        debounce="500"
        (ionChange)="filter($event.detail.value)"
      ></ion-searchbar>
    </ion-header>
    <ion-content>
      <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ng-container *ngIf="passports$ | async as passports">
        <ion-list lines="full" *ngIf="passports.length">
          <ion-item-sliding
            *ngFor="let passport of passports"
            (ionSwipe)="deletePassport(passport)"
          >
            <ion-item (click)="presentActionSheet(passport)">
              <ion-thumbnail slot="start">
                <img
                  [src]="
                    'assets/icons/providers/' + passport.providerId + '.svg'
                  "
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
              <ion-chip
                *ngIf="passport.nbSharedPassports"
                slot="end"
                color="primary"
              >
                <ion-icon name="albums-outline" color="dark"></ion-icon>
                <ion-label>{{ passport.nbSharedPassports }}</ion-label>
              </ion-chip>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option
                color="danger"
                expandable
                (click)="deletePassport(passport)"
                ><ion-icon slot="start" name="trash-outline"></ion-icon>
                Remove</ion-item-option
              >
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>
        <ion-card *ngIf="!passports.length">
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
          </ion-card-content>
        </ion-card>
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-button
            *ngIf="!passports.length"
            color="primary"
            class="first-time"
            (click)="createPassport()"
            >Generate your digital passport
            <ion-icon slot="end" name="add-outline"></ion-icon
          ></ion-button>
          <ion-fab-button *ngIf="passports.length" (click)="createPassport()">
            <ion-icon name="add-outline"></ion-icon>
          </ion-fab-button> </ion-fab
      ></ng-container>
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
      ion-button.first-time {
        --border-radius: 30px;
      }
    `,
  ],
})
export class PassportsPage implements OnInit, OnDestroy {
  // passports: IPassportListItem[] = passports;
  public passports$: Observable<IPassportListItem[]> = this.store.pipe(
    select(selectPassports),
  );
  public isLoading$: Observable<boolean> = this.store.pipe(
    select(selectIsLoading),
  );
  public error$: Observable<string> = this.store.pipe(select(selectError));
  private routeSubscription: Subscription;

  constructor(
    private router: Router,
    protected store: Store<IState>,
    private route: ActivatedRoute,
    public modalController: ModalController,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    protected apiService: ApiService,
    protected el: ElementRef,
  ) {}

  ngOnInit() {
    this.passports$
      .pipe(first())
      .subscribe(
        (providers) =>
          providers.length <= 1 &&
          this.store.dispatch(PassportsRequestAction()),
      );

    this.routeSubscription = this.route.fragment.subscribe((fragment) => {
      const search = new URLSearchParams(fragment);
      const passportId = search.get('passport-id');
      if (passportId) {
        this.openPassport(passportId);
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  doRefresh({ target }: { target: IonRefresher }) {
    this.store.dispatch(PassportsRequestAction());
    const sub = this.isLoading$.subscribe((isLoading) => {
      if (isLoading === false) {
        sub.unsubscribe();
        target.complete();
      }
    });
  }

  errorImg() {}

  filter(value: string) {
    this.store.dispatch(PassportsFilterAction({ filter: value }));
  }

  async deletePassport(passport: IPassportListItem) {
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
          handler: async () => {
            this.store.dispatch(
              PassportDeletionRequestAction({
                passportId: passport.id,
              }),
            );
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

  async sharePassport(passportId: string) {
    const modal = await this.modalController.create({
      component: SharePassportModal,
      componentProps: {
        passportId,
      },
      presentingElement: this.el.nativeElement,
    });
    return await modal.present();
  }

  async getSharedPassports(passport: IPassportListItem) {
    const modal = await this.modalController.create({
      component: SharedPassportsModal,
      componentProps: {
        passport,
      },
      presentingElement: this.el.nativeElement,
    });
    return await modal.present();
  }

  async openPassport(passportId: string) {
    const modal = await this.modalController.create({
      component: PassportModal,
      cssClass: 'transparent-modal',
      swipeToClose: true,
      componentProps: {
        passportId,
      },
      presentingElement: this.el.nativeElement,
    });
    await modal.present();
    await modal.onWillDismiss();
    this.router.navigate(['/passports']);
  }

  async presentActionSheet(passport: IPassportListItem) {
    const buttons = [
      {
        text: 'Open',
        icon: 'mail-open',
        handler: () => {
          console.log('Share clicked');
          this.router.navigate(['/passports'], {
            fragment: `passport-id=${passport.id}`,
          });
        },
      },
      {
        text: 'Share Passport',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
          this.sharePassport(passport.id);
        },
      },
    ];
    if (passport.nbSharedPassports > 0) {
      buttons.push({
        text: `My Shared Passports (${passport.nbSharedPassports})`,
        icon: 'albums-outline',
        handler: () => {
          this.getSharedPassports(passport);
        },
      });
    }
    const actionSheet = await this.actionSheetController.create({
      header: `Passport ${passport.providerId}`,
      buttons: [
        ...buttons,
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deletePassport(passport);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }
}
