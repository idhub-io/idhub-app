import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '@environments/environment';
import userReducer from './user';
import providersReducer, { NAMESPACE } from './providers';
import passportsReducer, { NAMESPACE as PassportNAMESPACE } from './passports';
import { IState } from '@models';

export const rootReducers: ActionReducerMap<IState> = {
  user: userReducer,
  [NAMESPACE]: providersReducer,
  [PassportNAMESPACE]: passportsReducer,
};

export const middlewares: MetaReducer<IState>[] = !environment.production
  ? []
  : [];
