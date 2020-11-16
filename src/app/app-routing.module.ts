import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'passports',
    pathMatch: 'full',
  },
  {
    path: 'passports',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/passports/passports.module').then(
        (m) => m.PassportsPageModule,
      ),
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
