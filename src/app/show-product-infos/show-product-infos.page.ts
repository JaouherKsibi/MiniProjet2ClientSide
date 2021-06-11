import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
//import { Storage } from '@ionic/storage-angular';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { MenuController, ToastController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-show-product-infos',
  templateUrl: './show-product-infos.page.html',
  styleUrls: ['./show-product-infos.page.scss'],
})
export class ShowProductInfosPage implements OnInit {
  product:any;
  product1:any;
  category:any;
  product2:any;
  serviceProvider:any;
  quantiteCommande:number;
  liste:any=[];
  listI:any=[];
  q:number;
  constructor(private toastController:ToastController,private route:ActivatedRoute,private fire:AngularFireAuth,private db:AngularFirestore, private router:Router , private auth:AuthService , private storage1:AngularFireStorage , private menu: MenuController) { 
    
    
  }
  /*
  getProductById(){
    this.db.collection("Product").snapshotChanges()
    .subscribe
    ( data=>{
      data.map(
        e=>{
          if(this.getted.prodId==e.payload.doc.id){
            console.log({
              id:e.payload.doc.id,
              name:e.payload.doc.data()['name'],
              prix:e.payload.doc.data()['prix'],
              image:this.storage1.ref(e.payload.doc.data()['image']).getDownloadURL()
            });
            this.liste=[];
              for (var i=0;i<e.payload.doc.data()['quantite']+1;i++) {
                this.liste.push(Number(i));
              }
              this.q=e.payload.doc.data()['quantite'];
              this.product={
                id:e.payload.doc.id,
                name:e.payload.doc.data()['name'],
                quantite:e.payload.doc.data()['quantite'],
                prix:e.payload.doc.data()['prix'],
                image:this.storage1.ref(e.payload.doc.data()['image']).getDownloadURL()
              }
          return{
            id:e.payload.doc.id,
            name:e.payload.doc.data()['name'],
            quantite:e.payload.doc.data()['quantite'],
            prix:e.payload.doc.data()['prix'],
            image:this.storage1.ref(e.payload.doc.data()['image']).getDownloadURL()
          }
        }}
      )
    })
  }
  getCategoryById(){
    this.db.collection("Category").snapshotChanges()
    .subscribe
    ( data=>{
      this.category=data.map(
        e=>{
          if(this.getted.categoryId==e.payload.doc.id){
            /*this.category={
              id:e.payload.doc.id,
              name:e.payload.doc.data()['name'],
              image:this.storage1.ref(e.payload.doc.data()['image']).getDownloadURL()
            }
          return{
            id:e.payload.doc.id,
            name:e.payload.doc.data()['name'],
            image:this.storage1.ref(e.payload.doc.data()['image']).getDownloadURL()
          }
        }}
      )
    })
  }
  getServiceProviderById(){
    this.db.collection("ServiceProvider").snapshotChanges()
    .subscribe
    ( data=>{
      this.serviceProvider=data.map(
        e=>{
          if(this.getted.SpId==e.payload.doc.id){
            this.serviceProvider={
              id:e.payload.doc.id,
              storeName:e.payload.doc.data()['storeName'],
              storeIdentifier:e.payload.doc.data()['storeIdentifier'],
              phoneNumber:e.payload.doc.data()['phoneNumber'],
              email:e.payload.doc.data()['email'],
              image:this.storage1.ref(e.payload.doc.data()['logoUrl']).getDownloadURL()
            }
            console.log({
              id:e.payload.doc.id,
              storeName:e.payload.doc.data()['storeName'],
              storeIdentifier:e.payload.doc.data()['storeIdentifier'],
              phoneNumber:e.payload.doc.data()['phoneNumber'],
              email:e.payload.doc.data()['email'],
              image:this.storage1.ref(e.payload.doc.data()['logoUrl']).getDownloadURL()
            });
            
          return{
            id:e.payload.doc.id,
            storeName:e.payload.doc.data()['storeName'],
            storeIdentifier:e.payload.doc.data()['storeIdentifier'],
            phoneNumber:e.payload.doc.data()['phoneNumber'],
            email:e.payload.doc.data()['email'],
            image:this.storage1.ref(e.payload.doc.data()['logoUrl']).getDownloadURL()
          }
        }}
      )
    })
  }*/
  rent(){
    var now = new Date();
    now.getFullYear();
    now.getMonth();
    now.getDate()
    console.log(this.q);
    console.log(this.quantiteCommande);

    
    
    this.db.doc("Product/"+this.product.id).update({quantite:this.product.quantite-this.quantiteCommande});
    this.db.collection("Rent").add({ /*quantiteDispo:product.quantite ,*/quantite:this.quantiteCommande,productId: this.product.id,productName:this.product.name,imageProduit:this.product.imageWbrh,prixUnitaire:this.product.prix,categoryName:this.product.categoryName,serviceProviderId:this.product.spId,storeName:this.product.spStoreName,storeEmail:this.product.spStoreName,storePhoneNumber:this.product.spPhoneNumber,spLogo:this.product.logoSpWbrh,clientId:this.fire.auth.currentUser.uid,rentDay:now.getDate(),rentYear:now.getFullYear(),rentMonth:now.getMonth()+1})
      .then( data => { 
        
        this.presentToast("Rent Successfuly");
        this.router.navigateByUrl("/accueil")
      })
      .catch( err => { 
        this.presentToast(err);
        console.log(err); });
  }
  async presentToast(message1) {
    const toast = await this.toastController.create({
      message: message1,
      duration: 5000
    });
    toast.present();
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      if(params&&params.special){
        this.product1=JSON.parse(params.special);
        console.log(this.product1);
      }
    });

    this.product={spIdentifier:this.product1.spIdentifier,id:this.product1.id,prix:this.product1.prix,name:this.product1.name, imageProduit:this.storage1.ref(this.product1.imageWbrh).getDownloadURL(),imageWbrh:this.product1.imageWbrh,idCategory:this.product1.idCategory,quantite:this.product1.quantite,categoryName:this.product1.categoryName,categoryImage:this.storage1.ref(this.product1.categoryImage).getDownloadURL(),categoryIm:this.product1.categoryImage,/*imageWbrh:this.storage1.ref(this.product1.imageWbrh).getDownloadURL(),*/spId:this.product1.spId,spStoreName:this.product1.spStoreName,spEmail:this.product1.spEmail,spPhoneNumber:this.product1.spPhoneNumber,spLogo:this.storage1.ref(this.product1.logoSpWbrh).getDownloadURL(),logoSpWbrh:this.product1.logoSpWbrh}
        console.log(this.product);
    for (var i=0;i<this.product.quantite+1;i++) {
      this.listI.push(Number(i));
    }
  }

}
