import { LogoutSuccessAction } from './user';
import { props, on, createReducer, createAction } from '@ngrx/store';
import { IPassportsState, IPassportListItem } from '@models';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export const NAMESPACE = 'passports';

export const PassportsRequestAction = createAction('PASSPORTS_REQUEST');
export const PassportsSuccessAction = createAction(
  'PASSPORTS_SUCCESS',
  props<{ passports: IPassportListItem[] }>(),
);
export const PassportsErrorAction = createAction(
  'PASSPORTS_ERROR',
  props<{ error: string }>(),
);

export const PassportDeletionRequestAction = createAction(
  'PASSPORTS_DELETION_REQUEST',
  props<{ passportId: string }>(),
);
export const PassportDeletionSuccessAction = createAction(
  'PASSPORTS_DELETION_SUCCESS',
  props<{ passportId: string }>(),
);
export type ActionsUnion =
  | typeof PassportsRequestAction
  | typeof PassportsSuccessAction
  | typeof PassportsErrorAction;

export const adapter: EntityAdapter<IPassportListItem> = createEntityAdapter<IPassportListItem>();

export const initialState: IPassportsState = adapter.getInitialState({
  isLoading: false,
  error: '',
});

const requestAction = (state) => ({
  ...state,
  isLoading: true,
  error: '',
});
export const PassportsReducer = createReducer(
  initialState,
  on(PassportsRequestAction, requestAction),
  on(PassportDeletionRequestAction, requestAction),
  on(PassportsSuccessAction, (state, { passports }) => ({
    ...state,
    ...adapter.setAll(passports, state),
    isLoading: false,
    error: '',
  })),
  on(PassportDeletionSuccessAction, (state, { passportId }) => ({
    ...state,
    ...adapter.removeOne(passportId, state),
    isLoading: false,
    error: '',
  })),
  on(PassportsErrorAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(LogoutSuccessAction, () => initialState),
);

export default PassportsReducer;
