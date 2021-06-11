import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowProductsByCategoryPageRoutingModule } from './show-products-by-category-routing.module';

import { ShowProductsByCategoryPage } from './show-products-by-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowProductsByCategoryPageRoutingModule
  ],
  declarations: [ShowProductsByCategoryPage]
})
export class ShowProductsByCategoryPageModule {}
