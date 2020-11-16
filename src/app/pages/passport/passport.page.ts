import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'passport-page',
  template: `
    <ion-header [translucent]="true">
      <app-toolbar></app-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true"> passport </ion-content>
  `,
})
export class PassportPage implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.route.snapshot.fragment);
  }
}
