import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LottieModule } from 'ngx-lottie';

import { PassportRoutingModule } from './passports-routing.module';
import { PassportsPage } from './passports.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NewPassportModal } from './new-passport.modal';
import { PassportModal } from './passport.modal';
import { SharePassportModal } from './share.modal';
import { SharedPassportsModal } from './shared-passports.modal';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PassportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LottieModule,
  ],
  declarations: [
    PassportsPage,
    NewPassportModal,
    PassportModal,
    SharePassportModal,
    SharedPassportsModal,
  ],
})
export class PassportsPageModule {}
