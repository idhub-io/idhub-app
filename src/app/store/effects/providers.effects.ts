import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, retry } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import {
  ProvidersErrorAction,
  ProvidersRequestAction,
  ProvidersSuccessAction,
} from '@store/reducers/providers';
import { ApiService } from '@services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProvidersEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  requestAll$: Observable<any> = this.actions$.pipe(
    ofType(ProvidersRequestAction),
    mergeMap(() =>
      this.apiService.getProviders().pipe(
        retry(2),
        map((providers) =>
          ProvidersSuccessAction({
            providers,
          }),
        ),
        catchError((er: HttpErrorResponse) => {
          console.log(er);
          return of(ProvidersErrorAction({ error: er.message }));
        }),
      ),
    ),
  );
}
