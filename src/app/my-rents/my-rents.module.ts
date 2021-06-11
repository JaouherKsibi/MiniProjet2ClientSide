import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyRentsPageRoutingModule } from './my-rents-routing.module';

import { MyRentsPage } from './my-rents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRentsPageRoutingModule
  ],
  declarations: [MyRentsPage]
})
export class MyRentsPageModule {}
