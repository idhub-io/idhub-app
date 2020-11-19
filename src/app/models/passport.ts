export type IPassportProviderId =
  | 'santander'
  | 'google'
  | 'github'
  | 'gitlab'
  | 'linkedin'
  | 'awesome-company';

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
