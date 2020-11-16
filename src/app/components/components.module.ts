import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [IonicModule],
  exports: [ToolbarComponent],
  declarations: [ToolbarComponent],
  providers: [],
})
export class ComponentsModule {}
