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

    <ion-content fullscreen>
      <h2>Passport providers</h2>
      <p>Choose between one of our supported passport providers.</p>
      {{ providers$ | async | json }}
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [``],
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
  ) {}

  ngOnInit() {
    this.providers$
      .pipe(first())
      .subscribe(
        (providers) =>
          providers.length <= 1 &&
          this.store.dispatch(ProvidersRequestAction()),
      );
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
