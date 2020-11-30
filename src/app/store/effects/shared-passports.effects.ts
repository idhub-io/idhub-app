import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, retry, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import {
  SharedPassportCreationRequestAction,
  SharedPassportCreationSuccessAction,
  SharedPassportDeletionRequestAction,
  SharedPassportDeletionSuccessAction,
  SharedPassportsErrorAction,
  SharedPassportsRequestAction,
  SharedPassportsSuccessAction,
} from '@store/reducers/shared-passports';
import { ApiService } from '@services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PassportsRequestAction } from '@store/reducers/passports';

@Injectable()
export class SharedPassportsEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  requestAll$: Observable<any> = this.actions$.pipe(
    ofType(SharedPassportsRequestAction),
    mergeMap(({ passportId }) =>
      this.apiService.getSharedPassports(passportId).pipe(
        retry(2),
        map((sharedPassports) =>
          SharedPassportsSuccessAction({
            passportId,
            sharedPassports,
          }),
        ),
        catchError((er: HttpErrorResponse) => {
          console.log(er);
          return of(SharedPassportsErrorAction({ error: er.message }));
        }),
      ),
    ),
  );

  @Effect()
  share$: Observable<any> = this.actions$.pipe(
    ofType(SharedPassportCreationRequestAction),
    mergeMap(({ passportId, claims, timeInMin }) =>
      this.apiService.sharePassport(passportId, claims, timeInMin).pipe(
        retry(2),
        switchMap((sharedPassport) => [
          SharedPassportCreationSuccessAction({
            passportId,
            sharedPassport,
          }),
          PassportsRequestAction(),
        ]),
        catchError((er: HttpErrorResponse) => {
          console.log(er);
          return of(SharedPassportsErrorAction({ error: er.message }));
        }),
      ),
    ),
  );

  @Effect()
  delete$: Observable<any> = this.actions$.pipe(
    ofType(SharedPassportDeletionRequestAction),
    mergeMap(({ passportId, sharedPassportId }) =>
      this.apiService.deleteSharedPassport(passportId, sharedPassportId).pipe(
        retry(2),
        map(() =>
          SharedPassportDeletionSuccessAction({
            passportId,
            sharedPassportId,
          }),
        ),
        catchError((er: HttpErrorResponse) => {
          console.log(er);
          return of(SharedPassportsErrorAction({ error: er.message }));
        }),
      ),
    ),
  );
}
