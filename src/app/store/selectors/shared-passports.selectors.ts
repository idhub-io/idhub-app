import { ISharedPassportsState, IState } from '@models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import isFuture from 'date-fns/isFuture';

import { adapter, NAMESPACE } from '../reducers/shared-passports';

export const selectSharedPassportsState = createFeatureSelector<
  IState,
  ISharedPassportsState
>(NAMESPACE);

const { selectAll, selectEntities } = adapter.getSelectors(
  selectSharedPassportsState,
);

export const selectIsLoading = (state: IState) => state[NAMESPACE].isLoading;
export const selectError = (state: IState) => state[NAMESPACE].error;

export const selectSharedPassports = createSelector(
  selectEntities,
  (
    state: IState,
    { passportId, expired }: { passportId: string; expired: boolean },
  ) => state[NAMESPACE].passportIds[passportId],
  (
    state: IState,
    { passportId, expired }: { passportId: string; expired: boolean },
  ) => expired,
  (entities, ids, expired = false) =>
    ids
      ? ids
          .map((id: string) => entities[id])
          .filter(({ exp }) => isFuture(new Date(exp * 1000)))
      : [],
);
