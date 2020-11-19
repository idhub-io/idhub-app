import { Component, Input, OnInit } from '@angular/core';
import { IPassportClaim } from '@models/passport';

@Component({
  selector: 'passport-claims',
  template: `
    <ion-card-header>
      <ion-card-title>{{ title }}</ion-card-title>
    </ion-card-header>
    <div class="claims">
      <ion-item lines="none" *ngFor="let claim of claims">
        <ion-icon
          *ngIf="!claim.img"
          name="shield-checkmark-outline"
          slot="start"
        ></ion-icon>
        <ion-thumbnail *ngIf="claim.img">
          <img *ngIf="claim.img" [src]="claim.img"
        /></ion-thumbnail>
        <ion-label>
          <p>{{ claim.id }}</p>
          <h3>{{ claim.value }}</h3>
        </ion-label>
      </ion-item>
    </div>
  `,
  styles: [
    `
      .claims {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      .claims > ion-item {
        display: flex;
        flex-basis: 50%;
      }
      ion-thumbnail {
        margin-right: 32px;
      }
    `,
  ],
})
export class PassportClaimsComponent implements OnInit {
  @Input() title: string;
  @Input() claims: IPassportClaim[];
  constructor() {}

  ngOnInit() {}
}
