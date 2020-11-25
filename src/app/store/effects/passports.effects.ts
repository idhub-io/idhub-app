import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, retry } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import {
  PassportsErrorAction,
  PassportsRequestAction,
  PassportsSuccessAction,
} from '@store/reducers/passports';
import { ApiService } from '@services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PassportsEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  requestAll$: Observable<any> = this.actions$.pipe(
    ofType(PassportsRequestAction),
    mergeMap(() =>
      this.apiService.getPassports().pipe(
        retry(2),
        map((passports) =>
          PassportsSuccessAction({
            passports,
          }),
        ),
        catchError((er: HttpErrorResponse) => {
          console.log(er);
          return of(PassportsErrorAction({ error: er.message }));
        }),
      ),
    ),
  );
}
