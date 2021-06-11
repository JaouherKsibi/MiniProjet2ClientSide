import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//importation des bibliotheques firebase 
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth'

//importation de environments 
import { environment } from "../environments/environment";
import { AuthService } from './services/auth.service';
import { GestionBaseDeDonneesService } from './services/gestion-base-de-donnees.service';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule , AngularFireModule.initializeApp(environment.firebaseConfig) , AngularFireStorageModule , AngularFirestoreModule , AngularFireAuthModule ],
  providers: [GestionBaseDeDonneesService , AuthService , { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
