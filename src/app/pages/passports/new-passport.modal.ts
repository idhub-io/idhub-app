import { ModalController } from '@ionic/angular';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { IProvider, IState } from '@models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectProviders,
} from '@store/selectors/providers.selectors';
import { first } from 'rxjs/operators';
import { ProvidersRequestAction } from '@store/reducers/providers';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'new-passport-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Create a new Passport</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()"
            ><ion-icon name="close-outline"></ion-icon
          ></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>Passport providers</h2>
      <p>Choose between one of our supported passport providers.</p>
      <div class="providers">
        <ion-button
          expand="block"
          color="light"
          *ngFor="let provider of providers$ | async"
          (click)="createPassport(provider.id)"
        >
          <ion-thumbnail slot="start">
            <img
              [src]="'assets/icons/providers/' + this.prefersDark + '/' + provider.id + '.svg'"
            /> </ion-thumbnail
          ><span style="flex:1;"></span
          >{{ provider.id | titlecase }}</ion-button
        >
      </div>
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class NewPassportModal implements OnInit {
  public providers$: Observable<IProvider[]> = this.store.pipe(
    select(selectProviders),
  );
  public isLoading$: Observable<boolean> = this.store.pipe(
    select(selectIsLoading),
  );
  public error$: Observable<string> = this.store.pipe(select(selectError));
  constructor(
    private modalCtrl: ModalController,
    protected store: Store<IState>,
    protected apiService: ApiService,
  ) {}

  private prefersDark;

  ngOnInit() {
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark":"light";

    this.providers$
      .pipe(first())
      .subscribe(
        (providers) =>
          providers.length <= 1 &&
          this.store.dispatch(ProvidersRequestAction()),
      );
  }

  async createPassport(providerId: string) {
    const { redirectUri } = await this.apiService
      .createPassport(providerId)
      .toPromise();
    window.location.href = redirectUri;
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
