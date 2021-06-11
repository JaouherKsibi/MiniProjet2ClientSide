import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePersonalInfosPage } from './update-personal-infos.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePersonalInfosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePersonalInfosPageRoutingModule {}
