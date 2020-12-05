import { LogoutSuccessAction } from './user';
import { props, on, createReducer, createAction } from '@ngrx/store';
import { ISharedPassportsState, ISharedPassportListItem } from '@models';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export const NAMESPACE = 'sharedPassports';

export const SharedPassportsRequestAction = createAction(
  'SHARED_PASSPORTS_REQUEST',
  props<{ passportId: string }>(),
);
export const SharedPassportsSuccessAction = createAction(
  'SHARED_PASSPORTS_SUCCESS',
  props<{ passportId: string; sharedPassports: ISharedPassportListItem[] }>(),
);
export const SharedPassportsErrorAction = createAction(
  'SHARED_PASSPORTS_ERROR',
  props<{ error: string }>(),
);

export const SharedPassportCreationRequestAction = createAction(
  'SHARED_PASSPORTS_CREATION_REQUEST',
  props<{
    passportId: string;
    claims: string[];
    timeInMin: number;
    onShared: (shared: ISharedPassportListItem) => void;
  }>(),
);
export const SharedPassportCreationSuccessAction = createAction(
  'SHARED_PASSPORTS_CREATION_SUCCESS',
  props<{ passportId: string; sharedPassport: ISharedPassportListItem }>(),
);

export const SharedPassportDeletionRequestAction = createAction(
  'SHARED_PASSPORTS_DELETION_REQUEST',
  props<{ passportId: string; sharedPassportId: string }>(),
);
export const SharedPassportDeletionSuccessAction = createAction(
  'SHARED_PASSPORTS_DELETION_SUCCESS',
  props<{ passportId: string; sharedPassportId: string }>(),
);
export type ActionsUnion =
  | typeof SharedPassportsRequestAction
  | typeof SharedPassportsSuccessAction
  | typeof SharedPassportsErrorAction
  | typeof SharedPassportDeletionRequestAction
  | typeof SharedPassportDeletionSuccessAction
  | typeof SharedPassportCreationRequestAction
  | typeof SharedPassportCreationSuccessAction;

export const adapter: EntityAdapter<ISharedPassportListItem> = createEntityAdapter<ISharedPassportListItem>();

export const initialState: ISharedPassportsState = adapter.getInitialState({
  passportIds: {},
  filter: '',
  isLoading: false,
  error: '',
});

const requestAction = (state) => ({
  ...state,
  isLoading: true,
  error: '',
});
export const SharedPassportsReducer = createReducer(
  initialState,
  on(SharedPassportsRequestAction, requestAction),
  on(SharedPassportDeletionRequestAction, requestAction),
  on(SharedPassportCreationRequestAction, requestAction),
  on(
    SharedPassportsSuccessAction,
    (state, { passportId, sharedPassports }) => ({
      ...state,
      entities: adapter.upsertMany(sharedPassports, state).entities,
      passportIds: {
        ...state.passportIds,
        [passportId]: adapter.setAll(sharedPassports, state).ids,
      },
      isLoading: false,
      error: '',
    }),
  ),
  // on(
  //   SharedPassportCreationSuccessAction,
  //   (state, { passportId, sharedPassport }) => ({
  //     ...state,
  //     entities: adapter.addOne(sharedPassport, state).entities,
  //     passportIds: {
  //       ...state.passportIds,
  //       [passportId]: [...state.passportIds[passportId], sharedPassport.id],
  //     },
  //     isLoading: false,
  //     error: '',
  //   }),
  // ),
  on(
    SharedPassportDeletionSuccessAction,
    (state, { passportId, sharedPassportId }) => ({
      ...state,
      entities: adapter.removeOne(sharedPassportId, state).entities,
      passportIds: {
        ...state.passportIds,
        [passportId]: state.passportIds[passportId].filter(
          (id) => id !== sharedPassportId,
        ),
      },
      ...adapter.removeOne(passportId, state),
      isLoading: false,
      error: '',
    }),
  ),
  on(SharedPassportsErrorAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(LogoutSuccessAction, () => initialState),
);

export default SharedPassportsReducer;
