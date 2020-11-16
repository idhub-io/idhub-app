import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <ion-toolbar>
      <ion-buttons slot="start">
        <img src="assets/idhub.svg" />
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-title>idhub</ion-title>
    </ion-toolbar>
  `,
  styles: [
    `
      img {
        width: 30px;
      }
    `,
  ],
})
export class ToolbarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
