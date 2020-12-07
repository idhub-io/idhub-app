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
            ><ion-icon name="close"></ion-icon
          ></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <app-passport
        class="ion-margin"
        *ngIf="passport"
        [passport]="passport"
        [shareToken]="shareToken"
        [sharedPassportId]="sharedPassportId"
        [passportId]="passportId"
        
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
  @Input() sharedPassportId: string;
  passport: IPassport;
  shareToken: string;

  constructor(
    private modalCtrl: ModalController,
    protected store: Store<IState>,
    protected apiService: ApiService,
  ) {}

  async ngOnInit() {
    const { valid, passport, token } = await (this.sharedPassportId
      ? this.apiService.validateSharedPassport(
          this.passportId,
          this.sharedPassportId,
        )
      : this.apiService.validatePassport(this.passportId)
    ).toPromise();

    if (valid) {
      this.passport = passport;
    }

    if (token) {
      this.shareToken = token;
    }
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
