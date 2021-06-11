import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRentsPage } from './my-rents.page';

const routes: Routes = [
  {
    path: '',
    component: MyRentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRentsPageRoutingModule {}
