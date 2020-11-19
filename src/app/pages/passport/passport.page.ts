import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPassport } from '@models';

const passports: IPassport[] = [
  {
    id: '3c034257-2d4b-4f86-a09d-c2826f71955d',
    providerToken:
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im9wX2tleV8xIn0.eyJzdWIiOiI4YzZlMDIyMWI3ZWEzYjRiY2E3ZGRiZGYzZjVmYjg4OWZhYzY5Y2RmMWUyNGQ4MmJkYTIyOTc2ZDEyOGM5MzlmIiwidHhuIjoiWm4tV1RCQXhkRjVKNDlxV3htY1NvIiwiYmlydGhkYXRlIjoiMjIvMDUvMTk4NSIsImFkZHJlc3MiOnsiZm9ybWF0dGVkIjoiMTkgS2FjZXkgRm9yZXN0LCBSZWRkaW5nLCBRWkJBRDksIFVuaXRlZCBLaW5nZG9tIiwic3RyZWV0X2FkZHJlc3MiOiIxOSBLYWNleSBGb3Jlc3QiLCJsb2NhbGl0eSI6IlJlZGRpbmciLCJyZWdpb24iOiIiLCJwb3N0YWxfY29kZSI6IlFaQkFEOSIsImNvdW50cnkiOiJVbml0ZWQgS2luZ2RvbSJ9LCJnZW5kZXIiOiJGZW1hbGUiLCJnaXZlbl9uYW1lIjoiWW9zdCIsInRpdGxlIjoiTXJzIiwicGFzc3BvcnRfaWQiOiJTUThSTjVMWDEiLCJuYXRpb25hbGl0eSI6IkdCIiwiZHJpdmluZ19saWNlbnNlX2lkIjoiSElMVDEzMTEyMzEzMTIwNiIsImNpdmlsX3N0YXR1cyI6Im1hcnJpZWQiLCJjb3VudHJ5X29mX2JpcnRoIjoiR0IiLCJwaG9uZV9udW1iZXIiOiIrNDQ0Mjc0NDQ0NDQiLCJlbWFpbCI6InQxQHRlc3QuY29tIiwiYWdlIjozNSwibm9uY2UiOiI3NDUyNTg4Yi02ZWE0LTQzMWUtYTZiYy0wYjVhN2JjMTk2MDQiLCJhdF9oYXNoIjoib1BRQzRFR0YzbHVGWnpVaVBZUXd2QSIsImF1ZCI6IjdpM2xtNjBNanVvb1hPRERiN0hyaiIsImV4cCI6MTYwNTc4NzY5NSwiaWF0IjoxNjA1Nzg3MDk1LCJpc3MiOiJodHRwczovL29wLmlhbWlkLmlvIn0.wHaKtKk8hqCtD_bcaJfWNGodW011jH7izNU8BGtKd65FPGKV5dx159eue4-HLgq1A4AAFgstMPxTsPsftmU_2n6zDfXt2CYL-Kfm5w2G7FiLEbWo538W-QUq-NFZ6vMHSDzde7bbHNlfXMaZKkRIQSqrK-J4LV5q3Y5lWU1A3_x2VAumiYixNdtDL9n_VpAgsxYH0ybHzOWUyWQWJ_Ie1cr76S-ujgT8Qq48pdI6eR0Moh7mj0O9YsVuGHMRTYR6j7LmPY74TfXl4Z5_lLsp1MCUw0jqlXT8z_uZWEjH1ubLkMBMrNWDC2U-Wc2O_IGnumQBjKqT8qyKeaD8JQbGkw',
    claims: [
      {
        id: 'birthdate',
        value: '22/05/1985',
        trustworthy: true,
        certifyBy: 'santander',
      },
      {
        id: 'address',
        values: [
          {
            id: 'street_address',
            value: '19 Kacey Forest',
            trustworthy: true,
            certifyBy: 'santander',
          },
          {
            id: 'country',
            value: 'United Kingdom',
            trustworthy: true,
            certifyBy: 'santander',
          },
          {
            id: 'formatted',
            value: '19 Kacey Forest, Redding, QZBAD9, United Kingdom',
            trustworthy: true,
            certifyBy: 'santander',
          },
          {
            id: 'locality',
            value: 'Redding',
            trustworthy: true,
            certifyBy: 'santander',
          },
          {
            id: 'region',
            value: '',
            trustworthy: true,
            certifyBy: 'santander',
          },
          {
            id: 'postal_code',
            value: 'QZBAD9',
            trustworthy: true,
            certifyBy: 'santander',
          },
        ],
        certifyBy: 'santander',
      },
      {
        id: 'gender',
        value: 'Female',
        trustworthy: true,
        certifyBy: 'santander',
      },
      {
        id: 'given_name',
        value: 'Yost',
        trustworthy: true,
        certifyBy: 'santander',
      },
      {
        id: 'title',
        value: 'Mrs',
        trustworthy: true,
        certifyBy: 'santander',
      },
      {
        id: 'passport_id',
        value: 'SQ8RN5LX1',
        trustworthy: true,
        certifyBy: 'santander',
      },
      {
        id: 'nationality',
        value: 'GB',
        trustworthy: true,
        certifyBy: 'santander',
      },
      {
        id: 'driving_license_id',
        value: 'HILT131123131206',
        trustworthy: true,
        certifyBy: 'santander',
      },
      {
        id: 'civil_status',
        value: 'married',
        trustworthy: true,
        certifyBy: 'santander',
      },
      {
        id: 'country_of_birth',
        value: 'GB',
        trustworthy: true,
        certifyBy: 'santander',
      },
      {
        id: 'phone_number',
        value: '+44427444444',
        trustworthy: true,
        certifyBy: 'santander',
      },
      {
        id: 'email',
        value: 't1@test.com',
        trustworthy: true,
        certifyBy: 'santander',
      },
      {
        id: 'age',
        value: '35',
        trustworthy: true,
        certifyBy: 'santander',
      },
    ],
    providerId: 'santander',
    exp: 1608379095,
    iat: 1605787,
  },
  {
    id: '0631d52f-8ef3-4226-b9f6-fcbe278d4a53',
    providerToken:
      'eyJhbGciOiJSUzI1NiIsImtpZCI6ImRlZGMwMTJkMDdmNTJhZWRmZDVmOTc3ODRlMWJjYmUyM2MxOTcyNGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMTg3ODg5NzU3MTQtYTRlMTRiN2wxNTdvaDhtajJpY2g3MGthYnY1bXQ4bjQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMTg3ODg5NzU3MTQtYTRlMTRiN2wxNTdvaDhtajJpY2g3MGthYnY1bXQ4bjQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTAyMzAxMjYyODAyNjU0MDk5MzMiLCJlbWFpbCI6InF1ZW50aW5jYXN0ZWw4NkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImZsVHhSTXpQZnFpODdwT2JhOU9HelEiLCJuYW1lIjoicXVlbnRpbiBDYXN0ZWwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2g2bEF2SW5teUdxSmpTR0VzcWpqUlRSV1pUSkZMMmptSXdsSktobFE9czk2LWMiLCJnaXZlbl9uYW1lIjoicXVlbnRpbiIsImZhbWlseV9uYW1lIjoiQ2FzdGVsIiwibG9jYWxlIjoiZW4tR0IiLCJpYXQiOjE2MDU3ODc1MTQsImV4cCI6MTYwNTc5MTExNH0.S8e78wnyhHkpBadKX5fm5CNFRTPARKe2lL2U0kItu8RYKEsMt6Un8UhOvyC1LteouTtEUXWF1F94G_1Uo2A2bjM8mHZjcj5kYRDhusWltgiapAyn9jBjWsqpnbnL9Xlv--aER5V1NQZnowhRs-h5VgiJ9_DgdZ3iNugm9OABuHaYKLMQ5VjartZnzIuNVMedPs69leviJK5bgl3aY0hRsZdPCV5IKEvA5Wc73UWBERL2LsjfOlSHxuZyj53es7h8a82UlVpVSCMvdfeqX2yczhI6BlYfd2LPUhUJq_b7jyItsFHZ8ljoc1FR96oi-i-k07dru5QFgJAaDS-GjklRtw',
    claims: [
      {
        id: 'email_verified',
        value: 'true',
        certifyBy: 'google',
      },
      {
        id: 'given_name',
        value: 'quentin',
        certifyBy: 'google',
      },
      {
        id: 'picture',
        value:
          'https://lh3.googleusercontent.com/a-/AOh14Gh6lAvInmyGqJjSGEsqjjRTRWZTJFL2jmIwlJKhlQ=s96-c',
        certifyBy: 'google',
      },
      {
        id: 'name',
        value: 'quentin Castel',
        certifyBy: 'google',
      },
      {
        id: 'family_name',
        value: 'Castel',
        certifyBy: 'google',
      },
      {
        id: 'email',
        value: 'quentincastel86@gmail.com',
        trustworthy: true,
        certifyBy: 'google',
      },
    ],
    providerId: 'google',
    exp: 1608379514,
    iat: 1605787,
  },
  {
    id: '151574d2-fc96-4979-b683-a2607a6adfa4',
    claims: [
      {
        id: 'login',
        value: 'qcastel',
        trustworthy: true,
        certifyBy: 'github',
      },
      {
        id: 'blog',
        value: 'quentin-castel.fr',
        trustworthy: false,
        certifyBy: 'github',
      },
      {
        id: 'company',
        value: 'Yapily',
        trustworthy: true,
        certifyBy: 'github',
      },
      {
        id: 'public_repos',
        value: '41',
        trustworthy: true,
        certifyBy: 'github',
      },
      {
        id: 'email',
        value: 'github@quentin.web-castel.com',
        trustworthy: true,
        certifyBy: 'github',
      },
      {
        id: 'public_gists',
        value: '0',
        trustworthy: true,
        certifyBy: 'github',
      },
      {
        id: 'followers',
        value: '9',
        trustworthy: true,
        certifyBy: 'github',
      },
      {
        id: 'avatar_url',
        value: 'https://avatars1.githubusercontent.com/u/3748231?v=4',
        trustworthy: false,
        certifyBy: 'github',
      },
      {
        id: 'html_url',
        value: 'https://github.com/qcastel',
        trustworthy: false,
        certifyBy: 'github',
      },
      {
        id: 'following',
        value: '4',
        trustworthy: true,
        certifyBy: 'github',
      },
      {
        id: 'name',
        value: 'Quentin Castel',
        trustworthy: false,
        certifyBy: 'github',
      },
      {
        id: 'location',
        value: 'United Kingdom',
        trustworthy: false,
        certifyBy: 'github',
      },
      {
        id: 'orgs',
        values: [
          {
            id: 'openbankingspace',
            values: [
              {
                id: 'created_at',
                value: '2018-07-24T09:18:44Z',
                trustworthy: true,
                certifyBy: 'github',
              },
              {
                id: 'login',
                value: 'openbankingspace',
                trustworthy: true,
                certifyBy: 'github',
              },
              {
                id: 'updated_at',
                value: '2019-06-26T21:35:09Z',
                trustworthy: true,
                certifyBy: 'github',
              },
              {
                id: 'is_verified',
                value: 'false',
                trustworthy: true,
                certifyBy: 'github',
              },
              {
                id: 'avatar_url',
                value: 'https://avatars0.githubusercontent.com/u/41620251?v=4',
                trustworthy: true,
                certifyBy: 'github',
              },
              {
                id: 'html_url',
                value: 'https://github.com/openbankingspace',
                trustworthy: true,
                certifyBy: 'github',
              },
              {
                id: 'name',
                value: 'Open Banking Space',
                trustworthy: true,
                certifyBy: 'github',
              },
            ],
          },
          {
            id: 'idhub-io',
            values: [
              {
                id: 'created_at',
                value: '2020-11-10T22:55:10Z',
                trustworthy: true,
                certifyBy: 'github',
              },
              {
                id: 'login',
                value: 'idhub-io',
                trustworthy: true,
                certifyBy: 'github',
              },
              {
                id: 'blog',
                value: 'idhub.io',
                trustworthy: true,
                certifyBy: 'github',
              },
              {
                id: 'updated_at',
                value: '2020-11-15T23:06:11Z',
                trustworthy: true,
                certifyBy: 'github',
              },
              {
                id: 'is_verified',
                value: 'false',
                trustworthy: true,
                certifyBy: 'github',
              },
              {
                id: 'avatar_url',
                value: 'https://avatars1.githubusercontent.com/u/74273698?v=4',
                trustworthy: true,
                certifyBy: 'github',
              },
              {
                id: 'html_url',
                value: 'https://github.com/idhub-io',
                trustworthy: true,
                certifyBy: 'github',
              },
              {
                id: 'name',
                value: 'idhub',
                trustworthy: true,
                certifyBy: 'github',
              },
            ],
          },
        ],
      },
    ],
    providerId: 'github',
    exp: 1608379549,
    iat: 1605787,
  },
  {
    id: 'e75f1c9f-a58a-40ee-9939-50e779f6fb20',
    claims: [
      {
        id: 'profile',
        value: 'https://gitlab.com/quentincastel',
        certifyBy: 'gitlab',
      },
      {
        id: 'name',
        value: 'quentin castel',
        certifyBy: 'gitlab',
      },
      {
        id: 'nickname',
        value: 'quentincastel',
        certifyBy: 'gitlab',
      },
      {
        id: 'picture',
        value:
          'https://assets.gitlab-static.net/uploads/-/system/user/avatar/5311761/avatar.png',
        certifyBy: 'gitlab',
      },
    ],
    providerId: 'gitlab',
    exp: 1608379573,
    iat: 1605787,
  },
  {
    id: 'ce8fd175-d8db-480e-906d-7d3fba1e6844',
    claims: [
      {
        id: 'localizedLastName',
        value: 'Castel',
        certifyBy: 'linkedin',
      },
      {
        id: 'localizedFirstName',
        value: 'Quentin',
        certifyBy: 'linkedin',
      },
      {
        id: 'pictureUri',
        value:
          'https://media-exp1.licdn.com/dms/image/C4D03AQFvTaGCvuR2Kw/profile-displayphoto-shrink_800_800/0?e=1611187200&v=beta&t=jE91Cu9IKJHBI3ayn7mdl-p6_AAQMpVI-4TR80CmVww',
        certifyBy: 'linkedin',
      },
    ],
    providerId: 'linkedin',
    exp: 1608379601,
    iat: 1605787,
  },
  {
    id: '19a2e734-e9fd-4f94-b553-f7ace50c6a4a',
    providerToken:
      'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJSYnF4bXU4YkMyVW9Vc3VWbHZva1J3QkxQZGJScEticmwwOVRtNU5sNkRJIn0.eyJleHAiOjE2MDU3ODgxMTEsImlhdCI6MTYwNTc4NzgxMSwiYXV0aF90aW1lIjoxNjA1Nzg3NjY2LCJqdGkiOiI5YzEyNzg5ZS02YmQ1LTRkY2ItYWMxZS1mYzU0ZWVjYjA4NjgiLCJpc3MiOiJodHRwczovL2lhbS5hd2Vzb21lLWNvbXBhbnkuaWRodWIub3BlbmJhbmtpbmc0LmRldi9hdXRoL3JlYWxtcy9hd2Vzb21lLWNvbXBhbnkiLCJhdWQiOiJpZGh1YiIsInN1YiI6IjQ3MmY3M2ZjLTZmNmItNGU3ZS04ZWNhLWY2MmRiMDc1MWJlNyIsInR5cCI6IklEIiwiYXpwIjoiaWRodWIiLCJzZXNzaW9uX3N0YXRlIjoiMmFjZjcxOGItMWM3OS00NmRlLWI3NjgtZWQ2NzRhODc2YWM5IiwiYXRfaGFzaCI6ImxSZzZXSE5pZ2JJc3QyNlFsNWp6NXciLCJhY3IiOiIwIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiQWxpY2UgQ3J5cHRhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWxpY2VAYXdlc29tZS1jb21wYW55LmNvbSIsImdpdmVuX25hbWUiOiJBbGljZSIsImZhbWlseV9uYW1lIjoiQ3J5cHRhIiwiZW1haWwiOiJhbGljZUBhd2Vzb21lLWNvbXBhbnkuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vaWJiLmNvLzduRDU1alEifQ.VVvx_FXEtoObjcPzgZDmRHMFJiH-QdLsS8nGUsFYep1_CKT_XOZA01BSKFgPHFf9RF6DfTymOv7SE7FYluUkLZze6722J9uEMYnJ-9BDsWtf6C-jioSaOUf-rZuImoL10xFkkgkp7XiklLwyggImQ1vTNK0-9-St_gJ_umGyFe04yASA04dFt03_XfUk6kY6QoUc1oQoy1Fv242uRS76yStaIggiky1YTtsxJTivzs6sxYPtNECpbNC7JqL3udLqSIGkeZ3yNM-OdkRCmEOR8yv1Arnri7KzcZKJBDF_r_vwpqEBEVViguhWVdktZ35jxlEjHYuOJNrvWyXHJVZsGQ',
    claims: [
      {
        id: 'given_name',
        value: 'Alice',
        trustworthy: true,
        certifyBy: 'awesome-company',
      },
      {
        id: 'picture',
        value: 'https://ibb.co/7nD55jQ',
        trustworthy: true,
        certifyBy: 'awesome-company',
      },
      {
        id: 'family_name',
        value: 'Crypta',
        trustworthy: true,
        certifyBy: 'awesome-company',
      },
      {
        id: 'email',
        value: 'alice@awesome-company.com',
        trustworthy: true,
        certifyBy: 'awesome-company',
      },
    ],
    providerId: 'awesome-company',
    exp: 1608379811,
    iat: 1605787,
  },
];

@Component({
  selector: 'passport-page',
  template: `
    <ion-header [translucent]="true">
      <app-toolbar></app-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <app-passport
        *ngFor="let passport of passports"
        [passport]="passport"
      ></app-passport>
    </ion-content>
  `,
})
export class PassportPage implements OnInit {
  passports = passports;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.route.snapshot.fragment);
  }
}
