import { Injectable } from '@angular/core';
import { Category , Client , ServiceProvider , Produit , Rent } from "../model/Model";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { error } from '@angular/compiler/src/util';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user1:Client;
  //user:Client;
  constructor(private firestore:AngularFirestore,
    private fire:AngularFireAuth,
    private router: Router,
    private loadingController:LoadingController,
    private toastController:ToastController ,) {

    }
    async toast(message:string ,color:string){
      const toast = await this.toastController.create({
        message: message,
        position:'top',
        color:color,
        duration: 2000
      });
      toast.present();
    }
    async signIn1(email:string,password:string){
      if(this.isLoggedIn()==true){
        this.router.navigateByUrl('/accueil');
      }
      else if (this.isLoggedIn()==false){
        const loading=await this.loadingController.create({
          message:"Authentificating.....",
          spinner:'crescent',
          showBackdrop:true
        });
        loading.present();
        this.fire.auth.signInWithEmailAndPassword(email,password).then(async (data)=>{
          console.log('ahla bik ');
          
          if(!data.user.emailVerified){
            console.log('no verifie ');
            
            loading.dismiss();
            this.toast("please verify your email address ","warning");
            this.fire.auth.signOut();
          }else{
            console.log(' verifie ');
            loading.dismiss();
            this.firestore.collection<Client>("Clients").snapshotChanges()
                .subscribe(elements => {
                  elements.forEach(e => {

                    console.log('ok11');
                    //this.user1.setId(e.payload.doc.id);                   
                    this.user1 = new Client(e.payload.doc.data()['firstName'],e.payload.doc.data()['lastName'],e.payload.doc.data()['phoneNumber'],e.payload.doc.data()['email'],e.payload.doc.data()['password'],e.payload.doc.data()['identityCardNumber'],e.payload.doc.data()['imageUrl'],e.payload.doc.id);
                    if (this.user1.getEmail() == email) {
                      console.log(this.user1);
                      
                      console.log("mrigl11111");
                      localStorage.setItem('user',JSON.stringify(this.user1))
                      //this.user=this.user1;
                      console.log("ok1");
                     this.router.navigateByUrl("/accueil");
                     //this.router.navigate(['/home-page'])
                    }
                })
              }) 
          }
        }).catch(error=>{
          loading.dismiss();
          this.toast(error.message,"danger");
          //console.log(error.message);
          
        })
      }
    }
    isLoggedIn(){
      console.log('ok pk ');
      
      return localStorage.getItem('user')!=null;
    }
    logout(){
      this.fire.auth.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['login'])
    }
    async resetPassword(){
      const loading=await this.loadingController.create({
        message:"reseteing password.....",
        spinner:'crescent',
        showBackdrop:true
      });
      loading.present();
      this.getUser();
      console.log('kifech ');
      this.fire.auth.sendPasswordResetEmail(this.user1.getEmail()).then(()=>{
        loading.dismiss();
        this.toast("s'il vous plait de verifier votre email","success");
        this.logout();
      }).catch((error)=>{
        console.log(error.message );
      })

    }
    getUser(){
      //console.log(JSON.parse(localStorage.getItem('user')));
      let user=JSON.parse(localStorage.getItem('user'));
      this.user1= new Client(user.firstName,user.lastName,user.phoneNumber,user.email,user.password,user.identityCardNumber,user.photoUrl,user.id);
    }
}
