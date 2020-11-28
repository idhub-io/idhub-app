import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PassportRoutingModule } from './passports-routing.module';
import { PassportsPage } from './passports.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NewPassportModal } from './new-passport.modal';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PassportRoutingModule,
  ],
  declarations: [PassportsPage, NewPassportModal],
})
export class PassportsPageModule {}
