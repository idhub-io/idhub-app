import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'passports-page',
  template: `
    <ion-header [translucent]="true">
      <app-toolbar></app-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="wrapper">
        <ion-card>
          <ion-card-header>
            <ion-card-title
              >Share your passport as an electronique format.</ion-card-title
            >
          </ion-card-header>

          <ion-card-content>
            <p>
              Simple and secure, your epassport is accessible in the cloud,
              following you where ever you are. No need anymore to send your
              passport photocopy around, in the right format.
            </p>
            <p>
              the e-passport uses digital signing to allow you sharing your
              information in a secured way
            </p>
            <div class="ion-text-center">
              <img class="passport" src="assets/passport.svg" />
            </div>
            <div class="ion-text-center">
              <ion-button color="secondary"
                >Generate your digital passport</ion-button
              >
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .wrapper {
        max-width: 600px;
        margin: 0 auto;
      }
      .passport {
        width: 150px;
      }
    `,
  ],
})
export class PassportsPage implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.route.snapshot.fragment);
  }
}
