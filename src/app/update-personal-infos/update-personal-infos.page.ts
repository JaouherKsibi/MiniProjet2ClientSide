import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Client } from '../model/interfaces';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-personal-infos',
  templateUrl: './update-personal-infos.page.html',
  styleUrls: ['./update-personal-infos.page.scss'],
})
export class UpdatePersonalInfosPage implements OnInit {
  user1Id :any;
  user:Client;
  imurl:any;
  constructor(public alertController: AlertController,private db:AngularFirestore,private fire:AngularFireAuth,private router:Router ,private auth:AuthService , private storage1:AngularFireStorage , private menu: MenuController) {
    this.user=JSON.parse( localStorage.getItem('user') )as Client;
    this.user1Id=this.user.id;
   }

  ngOnInit() {
    this.user=JSON.parse( localStorage.getItem('user') )as Client;
    this.getImageUrl(this.user.photoUrl);
  }
  update(){
    //this.fire.auth.currentUser.updatePassword(this.user.password);
    //this.user1Id=this.fire.auth.currentUser.uid;
      this.db.doc("Clients/"+this.user1Id).update(this.user);
      this.logout();
      this.presentAlertConfirm1();
      
  }
  logout(){
    this.auth.logout();
  }
  async presentAlertConfirm1() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success !',
      message: "uou've just updated your acount !!!" ,
      buttons: [
        {
          text: 'ok',
          role: 'confirm',
          cssClass: 'secondary',
          handler: (blah) => {
            //this.db.doc("Clients/"+this.user1Id).update(this.user);
            //this.logout();
            this.router.navigateByUrl('/login');
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }
  getImageUrl(ref:string){
    firebase.storage().ref().child(ref).getDownloadURL().then((url)=>{this.imurl=url});
  }
}
