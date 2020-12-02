import { IPassportClaim } from '@models/passport';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IPassport } from '@models';

@Component({
  selector: 'app-passport',
  template: `
    <ion-card>
      <div class="provider-header">
        <div class="title">
          <img src="assets/idhub.svg" width="40" />IDHub Passport
        </div>
        <span style="flex:1;"></span>
        <span class="provider-id">{{ passport.providerId }}</span>
      </div>
      <div
        class="banner-img"
        [ngClass]="{
          hasAvatar: getClaim('pictureUri') || getClaim('avatar_url')
        }"
      >
        <img
          src="assets/passports/providers/{{ passport.providerId }}.png"
          (error)="errorImg($event)"
        />
        <ion-avatar
          *ngIf="getClaim('pictureUri') || getClaim('avatar_url') as claim"
        >
          <img [src]="claim.value" />
        </ion-avatar>
      </div>
      <ion-card-content>
        <passport-claims
          *ngFor="let claimsItem of claimsGroup"
          [title]="claimsItem.title"
          [claims]="claimsItem.claims"
        ></passport-claims>
        <div class="ion-padding iontext-center" *ngIf="shareToken">
          <div class="share-button">
          <ion-button color="secondary" size="large"  ngxClipboard [cbContent]="getQrcodeString()">Copy share link</ion-button>
          </div>
          <qrcode
            [qrdata]="getQrcodeString()"
            [width]="256"
            [errorCorrectionLevel]="'M'"
          ></qrcode>
          
        </div>
      </ion-card-content>
    </ion-card>
  `,
  styles: [
    `
        .provider-id {
          text-transform: capitalize;
        }
      :host {
        display: block;
      }
      :host ::ng-deep .qrcode {
        text-align: center;
      }
      .share-button {
        width: 256px;
        margin: auto;
      }
      
      ion-card {
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
      }
      .provider-header {
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: center;
        padding: 1.5em 1em;
      }
      .provider-header .title {
        color: #457f5a;
        display: flex;
        align-items: center;
        font-size: 1.3em;
        font-weight: 500;
      }
      .banner-img {
        position: relative;
        margin-bottom: 0px;
      }
      .banner-img.hasAvatar {
        margin-bottom: 50px;
      }

      .banner-img ion-avatar {
        position: absolute;
        bottom: -50px;
        left: calc(50% - 50px);
        height: 100px;
        width: 100px;
        border: 2px solid white;
      }
      :host ::ng-deep ion-item {
        --padding-start: 0;
      }
      :host ::ng-deep ion-card-header {
        padding-left: 0;
        padding-right: 0;
      }
      :host ::ng-deep ion-thumbnail {
        width: 30px;
        height: 30px;
      }
      ion-card-content {
        padding: 0.9em;
      }
    `,
  ],
})
export class PassportComponent implements OnInit, OnChanges {
  @Input() passport: IPassport;
  @Input() shareToken: string;
  claimsGroup: { title: string; claims: IPassportClaim[] }[] = [];
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.passport && changes.passport.currentValue) {
      const passport = changes.passport.currentValue as IPassport;
      console.log({ passport });

      this.claimsGroup.push({
        title: 'Personnal Information',
        claims: passport.claims.filter((claim) =>
          [
            // santander
            'gender',
            'given_name',
            'nationality',
            'civil_status',
            'country_of_birth',
            'age',
            'birthdate',
            // linkedin
            'localizedLastName',
            'localizedFirstName',
            // gitlab
            'name',
            'nickname',
            // awesome-company
            'family_name',
            // github
            'login',
            'blog',
            'company',
            'login',
            'location',
            'username',
          ].includes(claim.id),
        ),
      });

      const hasContacts = passport.claims.filter((claim) =>
        ['phone_number', 'email'].includes(claim.id),
      ).length;

      if (hasContacts) {
        this.claimsGroup.push({
          title: 'Contact',
          claims: passport.claims.filter((claim) =>
            ['phone_number', 'email'].includes(claim.id),
          ),
        });
      }

      switch (passport.providerId) {
        case 'github':
          this.claimsGroup.push({
            title: 'Stats',
            claims: passport.claims.filter((claim) =>
              ['public_gists', 'followers', 'following'].includes(claim.id),
            ),
          });
          const orgs = passport.claims.find((claim) => claim.id === 'orgs');
          if (orgs) {
            this.claimsGroup.push({
              title: 'Organisations',
              claims: orgs.values.map((org) => {
                const name = org.values.find((value) => value.id === 'name');
                const img = org.values.find(
                  (value) => value.id === 'avatar_url',
                );
                return {
                  id: org.id,
                  value: name ? name.value : org.id,
                  img: img ? img.value : undefined,
                };
              }),
            });
          }
          break;
        case 'gitlab':
          break;
        case 'google':
          break;
        case 'santander': {
          const address = passport.claims.find(
            (claim) => claim.id === 'address',
          );
          if (address && address.values) {
            this.claimsGroup.push({
              title: 'Address',
              claims: address.values.filter(
                (claim) => !['formatted', 'region'].includes(claim.id),
              ),
            });
          }
          this.claimsGroup.push({
            title: 'IDs',
            claims: passport.claims.filter((claim) =>
              ['driving_license_id', 'passport_id'].includes(claim.id),
            ),
          });
          break;
        }
        case 'linkedin':
          break;

        default:
          break;
      }
    }
  }

  getQrcodeString() {
    return `${window.location.origin}/passport#token=${this.shareToken}`;
  }

  errorImg(event: Event) {
    (<HTMLImageElement>event.target).src =
      'assets/passports/providers/default.png';
  }

  getClaim(claimId) {
    return this.passport.claims.find((claim) => claim.id === claimId);
  }
}
