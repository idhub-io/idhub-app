import { Component, Input, OnInit } from '@angular/core';
import { ISharedPassportListItem } from '@models';

@Component({
  selector: 'shared-passport-item',
  template: `
    <ion-item [ngClass]="{ disabled: expired }">
      <ion-thumbnail slot="start">
        <img [src]="'assets/icons/providers/' + providerId + '.svg'" />
      </ion-thumbnail>
      <ion-label class="ion-text-wrap">
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
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class SharedPassportItemComponent implements OnInit {
  @Input() expired: boolean = false;
  @Input() providerId: string;
  @Input() sharedPassport: ISharedPassportListItem;
  constructor() {}

  ngOnInit() {}
}
