import { LogoutSuccessAction } from './user';
import { props, on, createReducer, createAction } from '@ngrx/store';
import { IProvider, IProvidersState } from '@models';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export const NAMESPACE = 'providers';

export const ProvidersRequestAction = createAction('PROVIDERS_REQUEST');
export const ProvidersSuccessAction = createAction(
  'PROVIDERS_SUCCESS',
  props<{ providers: IProvider[] }>(),
);
export const ProvidersErrorAction = createAction(
  'PROVIDERS_ERROR',
  props<{ error: string }>(),
);
export type ActionsUnion =
  | typeof ProvidersRequestAction
  | typeof ProvidersSuccessAction
  | typeof ProvidersErrorAction;

export const adapter: EntityAdapter<IProvider> = createEntityAdapter<IProvider>();

export const initialState: IProvidersState = adapter.getInitialState({
  isLoading: false,
  error: '',
});

export const ProvidersReducer = createReducer(
  initialState,
  on(ProvidersRequestAction, (state) => ({
    ...state,
    isLoading: true,
    error: '',
  })),
  on(ProvidersSuccessAction, (state, { providers }) => ({
    ...state,
    ...adapter.setAll(providers, state),
    isLoading: false,
    error: '',
  })),
  on(ProvidersErrorAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(LogoutSuccessAction, () => initialState),
);

export default ProvidersReducer;
