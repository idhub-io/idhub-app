import { Injectable, Inject } from '@angular/core';
import { tap, finalize } from 'rxjs/operators';
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

@Injectable()
export class IdHubHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router, private httpLoader: HttpLoaderService) {}

  private prepareUrl(url) {
    return environment.apiUrl + '/' + url;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const headers = req.headers.has('Content-Type')
      ? req.headers
      : new HttpHeaders({ 'Content-Type': 'application/json' });

    const origin = new URL(req.url).origin;
    console.log({
      origin,
      ssoUrl: environment.ssoUrl,
    });
    if (origin === environment.ssoUrl) return next.handle(req);

    // req = req.clone({
    //   url: this.prepareUrl(req.url),
    //   // headers,
    // });

    const { url, body, ...options } = req;
    const id = this.httpLoader.add();
    return next.handle(req).pipe(
      tap(
        () => {},
        (err: any) => {
          // if (err instanceof HttpErrorResponse) {
          //   if (err.status === 401) {
          //     this.router.navigate(['login']);
          //   }
          // }
          // return Observable.throw(err);
        },
      ),
      finalize(() => this.httpLoader.remove(id)),
    );
  }
}
