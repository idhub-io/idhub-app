import { EntityState } from '@ngrx/entity';
import { IProvider } from './provider';
import { ISharedPassportListItem, IPassportListItem } from './passport';

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
export interface ISharedPassportsState
  extends EntityState<ISharedPassportListItem> {
  passportIds: {
    [key: string]: string[];
  };
  isLoading: boolean;
  error: string;
}
export interface IState {
  user: IUserState;
  providers: IProvidersState;
  passports: IPassportsState;
  sharedPassports: ISharedPassportsState;
}
