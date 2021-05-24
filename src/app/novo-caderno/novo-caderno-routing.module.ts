import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovoCadernoPage } from './novo-caderno.page';

const routes: Routes = [
  {
    path: '',
    component: NovoCadernoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovoCadernoPageRoutingModule {}
