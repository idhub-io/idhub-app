import { ModalController } from '@ionic/angular';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
} from '@angular/core';
import { IPassport, IProvider, IState } from '@models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectProviders,
} from '@store/selectors/providers.selectors';
import { first } from 'rxjs/operators';
import { ProvidersRequestAction } from '@store/reducers/providers';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'new-passport-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ passport.providerId | titlecase }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()"
            ><ion-icon name="close-outline"></ion-icon
          ></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <app-passport *ngIf="passport" [passport]="passport"></app-passport>
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
    `,
  ],
})
export class PassportModal implements OnInit {
  @Input() passportId: string;
  passport: IPassport;

  constructor(
    private modalCtrl: ModalController,
    protected store: Store<IState>,
    protected apiService: ApiService,
  ) {}

  async ngOnInit() {
    const { valid, passport } = await this.apiService
      .validatePassport(this.passportId)
      .toPromise();

    if (valid) {
      this.passport = passport;
    }
  }

  async createPassport(providerId: string) {
    const { redirectUri } = await this.apiService
      .createPassport(providerId)
      .toPromise();
    window.location.href = redirectUri;
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
