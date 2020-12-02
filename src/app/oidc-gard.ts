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
export class OIDCGuard implements CanActivate {
  constructor(private oauthService: OAuthService, private router: Router) {}

  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let hasToken = this.oauthService.hasValidAccessToken();
    if (hasToken) return true;
    console.debug("No token, we return to the login page")
    this.router.navigate(['login']);
    return false;
  }
}
