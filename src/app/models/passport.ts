export type IPassportProviderId =
  | 'santander'
  | 'google'
  | 'github'
  | 'gitlab'
  | 'linkedin'
  | 'facebook'
  | 'eventbrite'
  | 'meetup'
  | 'microsoft'
  | 'awesome-company';

export interface IPassportListItem {
  id: string;
  userId: string;
  sub: string;
  subFriendlyName: string;
  providerId: IPassportProviderId;
  nbSharedPassports: number;
  exp: number;
  iat: number;
}
export interface ISharedPassportListItem {
  id: string;
  passportId: string;
  claims: string[];
  exp: number;
  iat: number;
}
export interface IPassport {
  id: string;
  providerToken?: string;
  claims: IPassportClaim[];
  providerId: IPassportProviderId;
  exp: number;
  iat: number;
}

export interface IPassportClaim {
  id: string;
  img?: string;
  value?: string;
  trustworthy?: boolean;
  certifyBy?: string;
  values?: Value[];
}

interface Value {
  id: string;
  value?: string;
  trustworthy?: boolean;
  certifyBy?: string;
  values?: Value[];
}
