import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Client } from "../model/Model";
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string;
  password:string ;
  //clients:Observable<Client>;
  client:Client;
  constructor(private router:Router , private auth:AuthService, private toastController:ToastController) { }
  onClick1(){
    this.router.navigateByUrl("sign-up");
  }
  onClick2(){
    if(this.email && this.password){
      //this.auth.signOut();
      this.auth.signIn1(this.email,this.password);
    }
    else{
      this.toast("Please enter your email and password !","warning")
    }

  }
  async toast(message:string,color:string) {
    const toast = await this.toastController.create({
      message: message,
      position:'top',
      color:color,
      duration: 2000
    });
    toast.present();
  }
  ngOnInit() {
  }

}
