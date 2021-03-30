import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadernosPage } from './cadernos.page';

const routes: Routes = [
  {
    path: '',
    component: CadernosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadernosPageRoutingModule {}
