import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private oauthService: OAuthService, private router: Router) {}

  async canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    if (
      this.oauthService.hasValidAccessToken() &&
      this.oauthService.hasValidIdToken()
    ) {
      this.router.navigate(['passports']);
      return false;
    } else {
      return true;
    }
  }
}
