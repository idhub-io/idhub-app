import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import {
  IProvider,
  IPassportListItem,
  IPassport,
  ISharedPassportListItem,
} from '@models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getProviders() {
    return this.http.get<IProvider[]>(
      environment.apiUrl + '/wallet/providers/',
    );
  }

  getPassports() {
    return this.http.get<IPassportListItem[]>(
      environment.apiUrl + '/wallet/passports/',
    );
  }

  validatePassport(passportId: string) {
    return this.http.get<{
      passport: IPassport;
      valid: boolean;
      token?: string;
      error: [];
      rules: [];
    }>(environment.apiUrl + `/wallet/passports/${passportId}/verify`);
  }

  createPassport(providerId: string) {
    return this.http.post<{ redirectUri: string }>(
      environment.apiUrl + '/wallet/passports/',
      {
        callback: window.location.origin + '/passports',
        providerId,
      },
    );
  }

  sharePassport(passportId: string, claims: string[], expirationDelta: number) {
    return this.http.post<ISharedPassportListItem>(
      environment.apiUrl + `/wallet/passports/${passportId}/shared/`,
      {
        claims,
        expirationDelta,
      },
    );
  }

  getSharedPassports(passportId: string) {
    return this.http.get<ISharedPassportListItem[]>(
      environment.apiUrl + `/wallet/passports/${passportId}/shared/`,
    );
  }

  getSharedPassport(passportId: string, sharedPassportId: string) {
    return this.http.get<ISharedPassportListItem>(
      environment.apiUrl +
        `/wallet/passports/${passportId}/shared/${sharedPassportId}`,
    );
  }

  getSharedPassportViaToken(token: string) {
    return this.http.post<{
      passport: IPassport;
      valid: boolean;
      token?: string;
      error: [];
      rules: [];
    }>(environment.apiUrl + `/checker/shared-passport/token`, token);
  }

  validateSharedPassport(passportId: string, sharedPassportId: string) {
    return this.http.get<{
      passport: IPassport;
      valid: boolean;
      token: string;
      error: [];
      rules: [];
    }>(
      environment.apiUrl +
        `/wallet/passports/${passportId}/shared/${sharedPassportId}/verify`,
    );
  }

  deleteSharedPassport(passportId: string, sharedPassportId: string) {
    return this.http.delete<void>(
      environment.apiUrl +
        `/wallet/passports/${passportId}/shared/${sharedPassportId}`,
    );
  }

  deletePassport(passportId: string) {
    return this.http.delete<void>(
      environment.apiUrl + '/wallet/passports/' + passportId,
    );
  }
}
