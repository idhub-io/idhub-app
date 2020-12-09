import { Injectable, Inject } from '@angular/core';
import {tap, finalize, first, map, flatMap} from 'rxjs/operators';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';
import { HttpLoaderService } from '@services/http-loader.service';
import {OAuthService} from "angular-oauth2-oidc";
import {from} from "rxjs";

@Injectable()
export class IdHubHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router, private httpLoader: HttpLoaderService, private oauthService: OAuthService) {}

  private prepareUrl(url) {
    return environment.apiUrl + '/' + url;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("ID Hub interceptor")

    const headers = req.headers.has('Content-Type')
      ? req.headers
      : new HttpHeaders({ 'Content-Type': 'application/json' });

    const origin = new URL(req.url).origin;
    console.log({
      origin,
      ssoUrl: environment.ssoUrl,
    });
    if (origin === environment.ssoUrl) return next.handle(req);

    let hasToken = this.oauthService.hasValidAccessToken();
    console.log("status of the access token: " + hasToken)

    if (!hasToken) {
      console.log("Access token expired, try to refresh the token first.")
      return from(this.oauthService.refreshToken())
          .pipe(first(), flatMap((res) => next.handle(req)) )
    }
    return next.handle(req);
  }
}
