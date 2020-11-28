import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PassportRoutingModule } from './passport-routing.module';
import { PassportPage } from './passport.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PassportRoutingModule,
  ],
  declarations: [PassportPage],
})
export class PassportPageModule {}
