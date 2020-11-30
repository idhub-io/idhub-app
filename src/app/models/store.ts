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
  filter: string;
  isLoading: boolean;
  error: string;
}
export interface ISharedPassportsState
  extends EntityState<ISharedPassportListItem> {
  filter: string;
  isLoading: boolean;
  error: string;
  passportIds: {
    [key: string]: string[];
  };
}
export interface IState {
  user: IUserState;
  providers: IProvidersState;
  passports: IPassportsState;
  sharedPassports: ISharedPassportsState;
}
