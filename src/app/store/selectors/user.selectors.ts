import { IUserState } from './../../models/store';
import { IState } from '@models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserState = createFeatureSelector<IState, IUserState>(
  'user',
);

export const selectUser = createSelector(
  selectUserState,
  (state: IUserState) => {
    console.log({ state });
    return state.user;
  },
);
