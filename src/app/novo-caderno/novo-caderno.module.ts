import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovoCadernoPageRoutingModule } from './novo-caderno-routing.module';

import { NovoCadernoPage } from './novo-caderno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovoCadernoPageRoutingModule
  ],
  declarations: [NovoCadernoPage]
})
export class NovoCadernoPageModule {}
