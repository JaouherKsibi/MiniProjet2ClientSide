import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
//import { Client } from '../Model/Client';


@Component({
  selector: 'app-sign-up-client',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public clientList:any={firstName:"",lastName:"",email:"",phoneNumber:"",password:"",identityCardNumber:""};
  @ViewChild("id_f") file_id:any;
  firstName:string;
  lastName:string;
  email:string;
  phoneNumber:string;
  password:string;
  passwordReenter:string;
  identityCardNumber:string;
  test:boolean=false;
  constructor(private route:Router,private firestore:AngularFirestore,private storage:AngularFireStorage,public alertController: AlertController , private fire:AngularFireAuth) {
   }
   signUp(){
     this.verif();
     if(this.test==false){
       this.firestore.collection("Clients").add({firstName:this.firstName,lastName:this.lastName,email:this.email,password:this.password,phoneNumber:this.phoneNumber,identityCardNumber:this.identityCardNumber})
     this.presentAlertOk();
      }
   }
   showAlertNotOk(){
    if(this.test==true){
      this.presentAlert();
    }
   }
   verif(){
     //var i=0;
    this.firestore.collection("Clients").snapshotChanges()
    .subscribe(elements => {

        elements.forEach(e => {
          this.clientList = e.payload.doc.data();
          if ({firstName:this.firstName ,lastName:this.lastName ,email : this.email , password : this.password , phoneNumber:this.phoneNumber , identityCardNumber:this.identityCardNumber}) {
            this.test = true;
            //console.log("yezzi bla la3b w zid compte jdid");
            this.route.navigateByUrl("/login");
            return;
            //this.presentAlert();
          }
      })
    })
  this.lien();   
  }
  lien(){
    if (this.test == true) {
      this.route.navigateByUrl("/login");
    } else {
      //this.route.navigateByUrl("/sign-up-client");
      console.log("errrrrrrrrrreeeer !!!!!! ")
    }
  }
  ajouter(){
    if(this.verifAllFieldsNotEmpty(this.firstName,this.lastName,this.email,this.phoneNumber,this.password,this.passwordReenter,this.identityCardNumber, this.file_id)==false){
      this.presentAlertEmptyFieldError();
      return ;
    }
    else{
      if(this.verifPasswords(this.password,this.passwordReenter)==false){
        this.presentAlertPasswordsDontMatch();
      }
      else{
        this.fire.auth.createUserWithEmailAndPassword(this.email, this.password).then ( data=> {
          data.user.sendEmailVerification();
              const files=this.file_id.nativeElement.files[0];
              const filePath='/Clients/'+`${Date.now()}_${files.name}`;
              this.storage.upload(filePath,files);
              this.presentAlertOk();
          return this.firestore.collection("Clients").doc(data.user.uid).set({firstName:this.firstName ,lastName:this.lastName ,email : this.email , password : this.password , phoneNumber:this.phoneNumber , identityCardNumber:this.identityCardNumber , imageUrl:filePath}) })       .catch( err=> { this.presentAlert()}) 
        
    //this.signUp();
        //this.showAlertNotOk();
        
        //console.log(this.test); */
        
        
      }
      
    }
     
  }
  verifPasswords(password1,password2){
    if (password1==password2) {
      return true;
    } else {
      return false;
    }
  }
  verifAllFieldsNotEmpty(firstName:string,
    lastName:string,
    email:string,
    phoneNumber:string,
    password:string,
    passwordReenter:string,
    identityCardNumber:string,file_id:any){
      if(firstName==null||lastName==null||email==null||phoneNumber==null||password==null||passwordReenter==null||identityCardNumber==null||file_id==null){
        return false;
      }
      else{
        return true;
      }
    }
      /******************************************les alertes************************************* */
      async presentAlertEmptyFieldError() {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Error',
          subHeader: 'Umpty Field',
          message: 'Please fill all fields .',
          buttons: [{
            text: 'ok',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.route.navigateByUrl("/sign-up");
            }
          }]
        });
    
        await alert.present();
    
      }

      async presentAlertPasswordsDontMatch() {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Error',
          subHeader: "passwords don't match ",
          message: 'Please verify the passwords  .',
          buttons: [{
            text: 'ok',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.route.navigateByUrl("/sign-up");
            }
          }]
        });
    
        await alert.present();
    
      }
      async presentAlert() {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Error',
          subHeader: "Other Errors",
          message: 'Please enter other informations   .',
          buttons: [{
            text: 'ok',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.route.navigateByUrl("/home");
            }
          }]
        });
    
        await alert.present();
    
      }
      async presentAlertOk() {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Success',
          message: "Congratulations!you've just joined us ! .",
          buttons: [{
            text: 'ok',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.route.navigateByUrl("/login");
            }
          }]
        });
    
        await alert.present();
    
      }
      /********************************fin alertes***************************************** */
      gotoLogin(){
        this.route.navigateByUrl("/login")
      }
  ngOnInit() {
  }

}
