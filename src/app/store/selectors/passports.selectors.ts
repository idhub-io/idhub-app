import { IPassportsState, IState } from '@models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { adapter, NAMESPACE } from '../reducers/passports';

export const selectPassportsState = createFeatureSelector<
  IState,
  IPassportsState
>(NAMESPACE);

const { selectAll } = adapter.getSelectors(selectPassportsState);

export const selectIsLoading = (state: IState) => state[NAMESPACE].isLoading;
export const selectError = (state: IState) => state[NAMESPACE].error;
export const selectFilter = (state: IState) => state[NAMESPACE].filter;

export const selectPassports = createSelector(
  selectAll,
  selectFilter,
  (all, filter) =>
    filter
      ? all.filter(
          (passport) =>
            passport.providerId.indexOf(filter) >= 0 ||
            passport.subFriendlyName.indexOf(filter) >= 0,
        )
      : all,
);
