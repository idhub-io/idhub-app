import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login-gard';
import { OIDCGuard } from './oidc-gard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [OIDCGuard],
    children: [
      {
        path: 'passports',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/passports/passports.module').then(
            (m) => m.PassportsPageModule,
          ),
      },
    ],
  },
  {
    path: 'login',
    pathMatch: 'full',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'passport',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/passport/passport.module').then(
        (m) => m.PassportPageModule,
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
