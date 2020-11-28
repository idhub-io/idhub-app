import { ModalController, AlertController } from '@ionic/angular';
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

    <ion-content fullscreen class="ion-padding">
      <ng-container *ngIf="shared$ | async as shared">
        <ion-list lines="full" *ngIf="shared.length">
          <ion-item-sliding
            *ngFor="let sharedPassport of shared"
            (ionSwipe)="deleteSharedPassport(sharedPassport)"
          >
            <ion-item (click)="openSharedPassport(sharedPassport)">
              <ion-thumbnail slot="start">
                <img
                  [src]="
                    'assets/icons/providers/' + passport.providerId + '.svg'
                  "
                />
              </ion-thumbnail>
              <ion-label class="ion-text-wrap">
                <ion-text color="primary">
                  <h2>{{ sharedPassport.providerId | titlecase }}</h2>
                </ion-text>
                <ion-text>
                  <p>Shared on: {{ sharedPassport.iat * 1000 | date }}</p>
                </ion-text>
                <ion-text color="secondary">
                  <p>Valid until: {{ sharedPassport.exp * 1000 | date }}</p>
                </ion-text>
                <div class="claims">
                  <ion-chip
                    color="secondary"
                    *ngFor="let claim of sharedPassport.claims"
                  >
                    <ion-label>{{ claim }}</ion-label>
                  </ion-chip>
                </div>
              </ion-label>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option
                color="danger"
                expandable
                (click)="deleteSharedPassport(sharedPassport)"
                ><ion-icon slot="start" name="trash-outline"></ion-icon>
                Remove</ion-item-option
              >
            </ion-item-options>
          </ion-item-sliding>
        </ion-list></ng-container
      >
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
    select((state) => selectSharedPassports(state, this.passport.id)),
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
    this.shared$.pipe(first()).subscribe(
      (shared) =>
        shared.length <= 1 &&
        this.store.dispatch(
          SharedPassportsRequestAction({
            passportId: this.passport.id,
          }),
        ),
    );
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
