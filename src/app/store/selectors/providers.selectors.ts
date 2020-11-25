import { IProvidersState, IState } from '@models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { adapter, NAMESPACE } from './../reducers/providers';

export const selectProvidersState = createFeatureSelector<
  IState,
  IProvidersState
>(NAMESPACE);

const { selectAll } = adapter.getSelectors(selectProvidersState);

export const selectProviders = selectAll;
export const selectIsLoading = (state: IState) => state[NAMESPACE].isLoading;
export const selectError = (state: IState) => state[NAMESPACE].error;
