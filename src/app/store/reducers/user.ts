import { props, on, createReducer, createAction } from '@ngrx/store';
import { IState, IUser, IUserState } from '@models';

export const LoginRequestAction = createAction('LOGIN_REQUEST');
export const LoginSuccessAction = createAction(
  'LOGIN_SUCCESS',
  props<{ user: IUser[] }>(),
);
export type ActionsUnion =
  | typeof LoginRequestAction
  | typeof LoginSuccessAction;

export const initialState: IUserState = {
  user: null,
};

export const LoginReducer = createReducer(
  initialState,
  on(LoginSuccessAction, (state, { user }) => ({
    ...state,
    user,
  })),
  // on(logoutAction, () => initialState),
);

export default LoginReducer;
