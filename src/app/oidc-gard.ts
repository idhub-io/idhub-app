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

  async canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("OIDCGuard gard")

    let hasToken = this.oauthService.hasValidAccessToken();
    console.log("OIDCGuard gard: " + hasToken)

    if (!hasToken) {
      console.log("Refresh the token")
      await this.oauthService.refreshToken();
      hasToken = this.oauthService.hasValidAccessToken();
      console.log("OIDCGuard gard: " + hasToken)
      if (hasToken) return true;
    } else {
      return true;
    }
    console.debug("No token, we return to the login page")
    await this.router.navigate(['login']);
    return false;
  }
}
