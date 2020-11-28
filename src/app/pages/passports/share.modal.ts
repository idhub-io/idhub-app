import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import addDays from 'date-fns/addDays';
import differenceInMinutes from 'date-fns/differenceInMinutes';

import { IPassport, IState } from '@models';
import { ApiService } from '@services/api.service';
import { translationMap } from 'src/app/utils/claims';

@Component({
  selector: 'new-passport-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Share</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()" size="large"
            ><ion-icon name="close-outline"></ion-icon
          ></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <form *ngIf="passport" [formGroup]="formGroup">
        <ion-list formArrayName="claims">
          <ion-list-header> Claims to share </ion-list-header>
          <ion-item
            *ngFor="let claim of passport.claims; let i = index"
            [formGroupName]="i"
          >
            <ion-label>{{ translationMap[claim.id] || claim.id }}</ion-label>
            <ion-checkbox
              color="secondary"
              slot="end"
              formControlName="checked"
            ></ion-checkbox>
          </ion-item>
        </ion-list>
        <ion-list>
          <ion-list-header> Valid until </ion-list-header>
          <ion-item>
            <ion-label>Date</ion-label>
            <ion-datetime
              [min]="minDate"
              formControlName="date"
            ></ion-datetime> </ion-item
        ></ion-list>
      </form>
    </ion-content>
    <ion-footer>
      <ion-button (click)="sharePassport()" expand="block"
        >Share</ion-button
      ></ion-footer
    >
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
export class SharePassportModal implements OnInit {
  @Input() passportId: string;
  passport: IPassport;
  public translationMap = translationMap;
  formGroup = new FormGroup({
    claims: this.fb.array([]),
    date: new FormControl(addDays(new Date(), 1).toISOString()),
  });
  minDate: string = new Date().toISOString();

  constructor(
    private modalCtrl: ModalController,
    protected store: Store<IState>,
    protected apiService: ApiService,
    private fb: FormBuilder,
  ) {}

  async ngOnInit() {
    const { valid, passport } = await this.apiService
      .validatePassport(this.passportId)
      .toPromise();

    if (valid) {
      this.passport = passport;
      this.passport.claims.forEach((claim, index) =>
        (<FormArray>this.formGroup.get('claims')).insert(
          index,
          this.fb.group({
            id: claim.id,
            checked: true,
          }),
        ),
      );
    }
  }

  async sharePassport() {
    const { claims, date } = this.formGroup.value;
    const filteredClaims = claims
      .filter((claim) => claim.checked)
      .map((claim) => claim.id);

    await this.apiService
      .sharePassport(
        this.passportId,
        filteredClaims,
        differenceInMinutes(new Date(date), new Date()),
      )
      .toPromise();
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
