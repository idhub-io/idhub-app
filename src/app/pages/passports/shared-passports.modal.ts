import { ModalController, AlertController, IonRefresher } from '@ionic/angular';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
} from '@angular/core';
import { ISharedPassportListItem, IState, IPassportListItem } from '@models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectSharedPassports,
} from '@store/selectors/shared-passports.selectors';
import { first } from 'rxjs/operators';
import { ApiService } from '@services/api.service';
import {
  SharedPassportDeletionRequestAction,
  SharedPassportsRequestAction,
} from '@store/reducers/shared-passports';
import { Router } from '@angular/router';

@Component({
  selector: 'new-passport-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ passport.providerId | titlecase }} Passports</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()"
            ><ion-icon name="close-outline"></ion-icon
          ></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list lines="full">
        <shared-passport-item
          *ngFor="let sharedPassport of shared$ | async"
          [sharedPassport]="sharedPassport"
          [providerId]="passport.providerId"
          (click)="openSharedPassport(sharedPassport)"
        ></shared-passport-item>
        <ng-container *ngIf="sharedExpired$ | async as sharedExpired">
          <ion-item-divider *ngIf="sharedExpired.length">
            <ion-label> Expired </ion-label>
          </ion-item-divider>
          <shared-passport-item
            *ngFor="let sharedPassport of sharedExpired"
            [sharedPassport]="sharedPassport"
            [providerId]="passport.providerId"
            expired
            (click)="openSharedPassport(sharedPassport)"
          ></shared-passport-item>
        </ng-container>
      </ion-list>
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .providers ion-button {
        margin-bottom: 1em;
      }
      ion-thumbnail {
        --size: 30px;
      }
      .claims {
        margin-top: 0.3em;
      }
      ion-chip {
        height: 20px;
        font-size: 12px;
      }
    `,
  ],
})
export class SharedPassportsModal implements OnInit {
  @Input() passport: IPassportListItem;
  public shared$: Observable<ISharedPassportListItem[]> = this.store.pipe(
    select((state) =>
      selectSharedPassports(state, {
        passportId: this.passport.id,
        expired: false,
      }),
    ),
  );
  public sharedExpired$: Observable<
    ISharedPassportListItem[]
  > = this.store.pipe(
    select((state) =>
      selectSharedPassports(state, {
        passportId: this.passport.id,
        expired: true,
      }),
    ),
  );
  public isLoading$: Observable<boolean> = this.store.pipe(
    select(selectIsLoading),
  );
  public error$: Observable<string> = this.store.pipe(select(selectError));
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    protected store: Store<IState>,
    public alertController: AlertController,
    protected apiService: ApiService,
  ) {}

  ngOnInit() {
    // load them all when we open
    this.store.dispatch(
      SharedPassportsRequestAction({
        passportId: this.passport.id,
      }),
    );
  }

  doRefresh({ target }: { target: IonRefresher }) {
    this.store.dispatch(
      SharedPassportsRequestAction({
        passportId: this.passport.id,
      }),
    );
    const sub = this.isLoading$.subscribe((isLoading) => {
      if (isLoading === false) {
        sub.unsubscribe();
        target.complete();
      }
    });
  }

  openSharedPassport(sharedPassport: ISharedPassportListItem) {
    this.router.navigate(['/passports'], {
      fragment: `shared-passport-id=${sharedPassport.id}`,
    });
  }

  async deleteSharedPassport(sharedPassport: ISharedPassportListItem) {
    const alert = await this.alertController.create({
      header: 'Remove shared Passport',
      message: 'Remove a shared passport cannot be undone. Are you sure ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: async () => {
            this.store.dispatch(
              SharedPassportDeletionRequestAction({
                passportId: this.passport.id,
                sharedPassportId: sharedPassport.id,
              }),
            );
          },
        },
      ],
    });

    await alert.present();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
