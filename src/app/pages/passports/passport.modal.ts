import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { IPassport, IState } from '@models';
import { Store } from '@ngrx/store';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'new-passport-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()" size="large"
            ><ion-icon name="close-outline" color="light"></ion-icon
          ></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <app-passport
        class="ion-margin"
        *ngIf="passport"
        [passport]="passport"
      ></app-passport>
    </ion-content>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
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
