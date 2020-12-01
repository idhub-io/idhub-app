import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

import { ToolbarComponent } from './toolbar.component';
import { AccountPopover } from './account.popover';
import { PassportComponent } from './passport.component';
import { PassportClaimsComponent } from './claims.component';
import { SharedPassportItemComponent } from './shared-passport-item.component';

@NgModule({
  imports: [IonicModule, CommonModule, QRCodeModule],
  exports: [
    ToolbarComponent,
    PassportComponent,
    PassportClaimsComponent,
    SharedPassportItemComponent,
  ],
  declarations: [
    ToolbarComponent,
    AccountPopover,
    PassportComponent,
    PassportClaimsComponent,
    SharedPassportItemComponent,
  ],
  providers: [],
})
export class ComponentsModule {}
