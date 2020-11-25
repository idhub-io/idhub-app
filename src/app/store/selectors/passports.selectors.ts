import { IPassportsState, IState } from '@models';
import { createFeatureSelector } from '@ngrx/store';

import { adapter, NAMESPACE } from '../reducers/passports';

export const selectPassportsState = createFeatureSelector<
  IState,
  IPassportsState
>(NAMESPACE);

const { selectAll } = adapter.getSelectors(selectPassportsState);

export const selectPassports = selectAll;
export const selectIsLoading = (state: IState) => state[NAMESPACE].isLoading;
export const selectError = (state: IState) => state[NAMESPACE].error;
