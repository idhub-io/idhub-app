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
export type ActionsUnion =
  | typeof PassportsRequestAction
  | typeof PassportsSuccessAction
  | typeof PassportsErrorAction;

export const adapter: EntityAdapter<IPassportListItem> = createEntityAdapter<IPassportListItem>();

export const initialState: IPassportsState = adapter.getInitialState({
  isLoading: false,
  error: '',
});

export const PassportsReducer = createReducer(
  initialState,
  on(PassportsRequestAction, (state) => ({
    ...state,
    isLoading: true,
    error: '',
  })),
  on(PassportsSuccessAction, (state, { passports }) => ({
    ...state,
    ...adapter.setAll(passports, state),
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
