import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '@environments/environment';
import userReducer from './user';
import { IState } from '@models';

export const rootReducers: ActionReducerMap<IState> = {
  user: userReducer,
};

export const middlewares: MetaReducer<IState>[] = !environment.production
  ? []
  : [];
