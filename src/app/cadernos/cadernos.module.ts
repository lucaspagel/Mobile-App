import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadernosPageRoutingModule } from './cadernos-routing.module';

import { CadernosPage } from './cadernos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadernosPageRoutingModule
  ],
  declarations: [CadernosPage]
})
export class CadernosPageModule {}
