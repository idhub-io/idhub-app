import { Component, Input, OnInit } from '@angular/core';
import { IPassportClaim } from '@models/passport';
import { translationMap } from '../utils/claims';

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
          [ngClass]="{ trustworthy: claim.trustworthy }"
        ></ion-icon>
        <ion-thumbnail *ngIf="claim.img">
          <img *ngIf="claim.img" [src]="claim.img"
        /></ion-thumbnail>
        <ion-label class="ion-text-wrap">
          <p>{{ translationMap[claim.id] }}</p>
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
      ion-icon {
        opacity: 0.5;
        margin-right: 1em;
      }
      ion-icon.trustworthy {
        opacity: 1;
        color: #457f5a;
      }
    `,
  ],
})
export class PassportClaimsComponent implements OnInit {
  @Input() title: string;
  @Input() claims: IPassportClaim[];
  public translationMap = translationMap;
  constructor() {}

  ngOnInit() {}
}
