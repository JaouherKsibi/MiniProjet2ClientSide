import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowProductInfosPage } from './show-product-infos.page';

const routes: Routes = [
  {
    path: '',
    component: ShowProductInfosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowProductInfosPageRoutingModule {}
