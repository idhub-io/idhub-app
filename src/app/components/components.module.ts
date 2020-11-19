import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

import { ToolbarComponent } from './toolbar.component';
import { AccountPopover } from './account.popover';

@NgModule({
  imports: [IonicModule, CommonModule],
  exports: [ToolbarComponent],
  declarations: [ToolbarComponent, AccountPopover],
  providers: [],
})
export class ComponentsModule {}
