import { Component, Input, OnInit } from '@angular/core';
import { IPassportClaim } from '@models/passport';

const translationMap = {
  birthdate: 'Birth Date',
  address: 'Adress',
  gender: 'Gender',
  given_name: 'Given Name',
  title: 'Title',
  passport_id: 'Passport ID',
  nationality: 'Nationality',
  driving_license_id: 'Driving License ID',
  civil_status: 'Civil status',
  country_of_birth: 'Country Of Birth',
  phone_number: 'Phone Number',
  email: 'Email',
  age: 'Age',
  // email_verified
  // picture
  name: 'Name',
  family_name: 'Family Name',
  login: 'Login',
  blog: 'Blog',
  company: 'Company',
  public_repos: 'Public Repos',
  public_gists: 'Public Gists',
  followers: 'Followers',
  avatar_url: 'Birth Date',
  // html_url
  following: 'Following',
  location: 'Location',
  // orgs
  // profile
  nickname: 'Nickname',
  localizedLastName: 'Last Name',
  localizedFirstName: 'First Name',
  // pictureUri
  street_address: 'Stree',
  country: 'Country',
  // formatted:
  locality: 'Locality',
  region: 'Region',
  postal_code: 'Postal Code',
};

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
