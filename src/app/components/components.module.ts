import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

import { ToolbarComponent } from './toolbar.component';
import { AccountPopover } from './account.popover';
import { PassportComponent } from './passport.component';
import { PassportClaimsComponent } from './claims.component';

@NgModule({
  imports: [IonicModule, CommonModule],
  exports: [ToolbarComponent, PassportComponent, PassportClaimsComponent],
  declarations: [
    ToolbarComponent,
    AccountPopover,
    PassportComponent,
    PassportClaimsComponent,
  ],
  providers: [],
})
export class ComponentsModule {}
