import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowProductInfosPageRoutingModule } from './show-product-infos-routing.module';

import { ShowProductInfosPage } from './show-product-infos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowProductInfosPageRoutingModule
  ],
  declarations: [ShowProductInfosPage]
})
export class ShowProductInfosPageModule {}
