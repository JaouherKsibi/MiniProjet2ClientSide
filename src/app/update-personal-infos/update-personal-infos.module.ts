import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePersonalInfosPageRoutingModule } from './update-personal-infos-routing.module';

import { UpdatePersonalInfosPage } from './update-personal-infos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePersonalInfosPageRoutingModule
  ],
  declarations: [UpdatePersonalInfosPage]
})
export class UpdatePersonalInfosPageModule {}
