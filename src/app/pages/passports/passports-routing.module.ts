import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassportsPage } from './passports.page';

const routes: Routes = [
  {
    path: '',
    component: PassportsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassportRoutingModule {}
