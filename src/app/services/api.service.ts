import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { IProvider, IPassportListItem } from '@models';

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

  createPassport(providerId: string) {
    return this.http.post<{ redirectUri: string }>(
      environment.apiUrl + '/wallet/passports/',
      {
        callback: window.location.origin + '/passports',
        providerId,
      },
    );
  }

  deletePassport(passportId: string) {
    return this.http.delete<void>(
      environment.apiUrl + '/wallet/passports/' + passportId,
    );
  }
}
