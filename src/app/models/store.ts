import { IPassportListItem } from '@models';
import { IProvider } from './provider';
import { EntityState } from '@ngrx/entity';

export interface IUserState {
  user: any;
}
export interface IProvidersState extends EntityState<IProvider> {
  isLoading: boolean;
  error: string;
}
export interface IPassportsState extends EntityState<IPassportListItem> {
  isLoading: boolean;
  error: string;
}

export interface IState {
  user: IUserState;
  providers: IProvidersState;
  passports: IPassportsState;
}
