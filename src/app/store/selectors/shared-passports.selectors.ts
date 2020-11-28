import { ISharedPassportsState, IState } from '@models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

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
  (state: IState, passpordId: string) =>
    state[NAMESPACE].passportIds[passpordId],
  (entities, ids) => (ids ? ids.map((id: string) => entities[id]) : []),
);
