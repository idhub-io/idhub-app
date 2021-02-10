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
    await this.oauthService.loadDiscoveryDocument();
    if (
        this.oauthService.hasValidAccessToken() &&
        this.oauthService.hasValidIdToken()
    ) {
      console.log(" valid access token and id token")
      return true;
    } else {

      if (this.oauthService.getRefreshToken()) {
        console.log("Has a refresh the token")
        await this.oauthService.refreshToken();
        let hasToken = this.oauthService.hasValidAccessToken();
        console.log("OIDCGuard gard: " + hasToken)
        if (hasToken) {
          return true;
        }
      }
      console.debug("No refresh token, we return to the login page")
      await this.oauthService.loadDiscoveryDocumentAndLogin();
      return false;
    }
  }
}
