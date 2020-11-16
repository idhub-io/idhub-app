import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface State {}

export const rootReducers: ActionReducerMap<State> = {};

export const middlewares: MetaReducer<State>[] = !environment.production
  ? []
  : [];
