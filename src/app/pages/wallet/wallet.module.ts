import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PassportRoutingModule } from './wallet-routing.module';
import { WalletPage } from './wallet.page';
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
  declarations: [WalletPage, NewPassportModal],
})
export class WalletPageModule {}
