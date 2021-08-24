import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category, Client, Produit } from '../model/interfaces';
import { AuthService } from '../services/auth.service';
import { GestionBaseDeDonneesService } from '../services/gestion-base-de-donnees.service';

@Component({
  selector: 'app-my-rents',
  templateUrl: './my-rents.page.html',
  styleUrls: ['./my-rents.page.scss'],
})
export class MyRentsPage implements OnInit {
  produitById?: Observable<[Produit]>;
  user:Client;
  rents:any=[];
  rents1:any=[];
  rents2:any=[];
  listeProducts:any=[];
  listeProducts1:any=[];
  qt:number;
  constructor(private alertController:AlertController , private bddService: GestionBaseDeDonneesService ,private toastController:ToastController,private fire:AngularFireAuth,private db:AngularFirestore, private router:Router ,private auth:AuthService , private storage1:AngularFireStorage , private menu: MenuController) { 
    
  }
  getRents1(){
    this.db.collection("Rent").snapshotChanges()
    .subscribe
    ( data=>{
      this.rents=data.map(
        e=>{
          if(this.fire.auth.currentUser.uid==e.payload.doc.data()['clientId']){
          return{
            id:e.payload.doc.id,
              clientId:e.payload.doc.data()['clientId'],
              imagePrduit:this.storage1.ref(e.payload.doc.data()['imageProduit']).getDownloadURL(),
              spLogo:this.storage1.ref(e.payload.doc.data()['spLogo']).getDownloadURL(),
              storeEmail:e.payload.doc.data()['storeEmail'],
              storeName:e.payload.doc.data()['storeName'],
              storePhoneNumber:e.payload.doc.data()['storePhoneNumber'],
              productId:e.payload.doc.data()['productId'],
              productName:e.payload.doc.data()['productName'],
              categoryName:e.payload.doc.data()['categoryName'],
              quantite:e.payload.doc.data()['quantite'],
              rentDay:e.payload.doc.data()['rentDay'],
              rentMonth:e.payload.doc.data()['rentMonth'],
              rentYear:e.payload.doc.data()['rentYear'],
              serviceProviderId:e.payload.doc.data()['serviceProviderId'],
              prixUnitaire:e.payload.doc.data()['prixUnitaire']
            }
        }}
      );

      this.rents.forEach(produits => {
        this.db.collection("Product").snapshotChanges()
    .subscribe
    ( data=>{
      this.rents1=data.map(
        e=>{
          if(produits.productId==e.payload.doc.id){
          return{
            id:produits.id,
                    clientId:produits.clientId,
                    imagePrduit:produits.imageProduit,
                    spLogo:produits.spLogo,
                    storeEmail:produits.storeEmail ,
                    storeName:produits.storeName ,
                    storePhoneNumber:produits.storePhoneNumber ,
                    productId:produits.productId ,
                    productName:produits.productName ,
                    categoryName:produits.categoryName,
                    quantite:produits.quantite,
                    rentDay:produits.rentDay,
                    rentMonth:produits.rentMonth,
                    rentYear:produits.rentYear,
                    serviceProviderId:produits.serviceProviderId,
                    prixUnitaire:produits.prixUnitaire,
                    quantiteDispo:e.payload.doc.data()['quantite']
            }
        }}
      );})})})
      
  }
  getRents(){
    this.user=JSON.parse( localStorage.getItem('user'))as Client;
    this.db.collection('Rent'/*,ref=>ref.where('clientId','==',this.user.id)*/).snapshotChanges().subscribe(
      data=>{
        this.rents=data.map(
          e=>{
            console.log('rent w brh ');
            
            console.log({
              id:e.payload.doc.id,
              clientId:e.payload.doc.data()['clientId'],
              imagePrduit:this.storage1.ref(e.payload.doc.data()['imageProduit']).getDownloadURL(),
              spLogo:this.storage1.ref(e.payload.doc.data()['spLogo']).getDownloadURL(),
              storeEmail:e.payload.doc.data()['storeEmail'],
              storeName:e.payload.doc.data()['storeName'],
              storePhoneNumber:e.payload.doc.data()['storePhoneNumber'],
              productId:e.payload.doc.data()['productId'],
              productName:e.payload.doc.data()['productName'],
              categoryName:e.payload.doc.data()['categoryName'],
              quantite:e.payload.doc.data()['quantite'],
              rentDay:e.payload.doc.data()['rentDay'],
              rentMonth:e.payload.doc.data()['rentMonth'],
              rentYear:e.payload.doc.data()['rentYear'],
              serviceProviderId:e.payload.doc.data()['serviceProviderId'],
              prixUnitaire:e.payload.doc.data()['prixUnitaire']
              });
            
            if(this.fire.auth.currentUser.uid==e.payload.doc.data()['clientId']){
            return{
              id:e.payload.doc.id,
              clientId:e.payload.doc.data()['clientId'],
              imageP:this.storage1.ref(e.payload.doc.data()['imageProduit']).getDownloadURL(),
              spLogo:this.storage1.ref(e.payload.doc.data()['spLogo']).getDownloadURL(),
              storeEmail:e.payload.doc.data()['storeEmail'],
              storeName:e.payload.doc.data()['storeName'],
              storePhoneNumber:e.payload.doc.data()['storePhoneNumber'],
              productId:e.payload.doc.data()['productId'],
              productName:e.payload.doc.data()['productName'],
              categoryName:e.payload.doc.data()['categoryName'],
              quantite:e.payload.doc.data()['quantite'],
              rentDay:e.payload.doc.data()['rentDay'],
              rentMonth:e.payload.doc.data()['rentMonth'],
              rentYear:e.payload.doc.data()['rentYear'],
              serviceProviderId:e.payload.doc.data()['serviceProviderId'],
              prixUnitaire:e.payload.doc.data()['prixUnitaire']
              }
          }}
        );
        this.rents.forEach(produits => {
          this.db.collection('Product').snapshotChanges().subscribe(
            data=>{
              this.rents=data.map(
                e=>{
                  console.log('product ml rent');
                  
                  console.log(produits.productId);
                  console.log('product ml produit');
                  console.log(e.payload.doc.id);
                  
                  
                  if(produits.productId==e.payload.doc.id){
                    console.log('ok');
                    console.log(e.payload.doc.data()['quantite']);
                    this.rents1.push({
                      id:produits.id,
                    clientId:produits.clientId,
                    imagePrduit:produits.imageP,
                    spLogo:produits.spLogo,
                    storeEmail:produits.storeEmail ,
                    storeName:produits.storeName ,
                    storePhoneNumber:produits.storePhoneNumber ,
                    productId:produits.productId ,
                    productName:produits.productName ,
                    categoryName:produits.categoryName,
                    quantite:produits.quantite,
                    rentDay:produits.rentDay,
                    rentMonth:produits.rentMonth,
                    rentYear:produits.rentYear,
                    serviceProviderId:produits.serviceProviderId,
                    prixUnitaire:produits.prixUnitaire,
                    quantiteDispo:e.payload.doc.data()['quantite']
  
                    })
                    
                    return{
                    id:produits.id,
                  clientId:produits.clientId,
                  imagePrduit:produits.imageProduit,
                  spLogo:produits.spLogo,
                  storeEmail:produits.storeEmail ,
                  storeName:produits.storeName ,
                  storePhoneNumber:produits.storePhoneNumber ,
                  productId:produits.productId ,
                  productName:produits.productName ,
                  categoryName:produits.categoryName,
                  quantite:produits.quantite,
                  rentDay:produits.rentDay,
                  rentMonth:produits.rentMonth,
                  rentYear:produits.rentYear,
                  serviceProviderId:produits.serviceProviderId,
                  prixUnitaire:produits.prixUnitaire,
                  quantiteDispo:e.payload.doc.data()['quantite']

                  }

                }})
            }
          )
          
        });
        
        //,ref=>ref.where('id','==',element.productId)

        /*
        console.log('ok');
        
        console.log(this.rents);
        
        this.rents.forEach(element => {
          this.db.collection('Product').snapshotChanges().subscribe(
            data=>{
              this.rents1=data.map(e=>{
                console.log("bel produit");
                
                console.log({
                  id:element.id,
                  clientId:element.clientId,
                  imagePrduit:element.imageProduit,
                  spLogo:element.spLogo,
                  storeEmail:element.storeEmail ,
                  storeName:element.storeName ,
                  storePhoneNumber:element.storePhoneNumber ,
                  productId:element.productId ,
                  productName:element.productName ,
                  categoryName:element.categoryName,
                  quantite:element.quantite,
                  rentDay:element.rentDay,
                  rentMonth:element.rentMonth,
                  rentYear:element.rentYear,
                  serviceProviderId:element.serviceProviderId,
                  prixUnitaire:element.prixUnitaire,
                  quantiteDispo:e.payload.doc.data()['quantite']
                });
                if(element.productId==e.payload.doc.id){
                  /******************* */
                  /*this.rents1.push({
                    id:element.id,
                    clientId:element.clientId,
                    imagePrduit:element.imagePrduit,
                    spLogo:element.spLogo,
                    storeEmail:element.storeEmail ,
                    storeName:element.storeName ,
                    storePhoneNumber:element.storePhoneNumber ,
                    productId:element.productId ,
                    productName:element.productName ,
                    categoryName:element.categoryName,
                    quantite:element.quantite,
                    rentDay:element.rentDay,
                    rentMonth:element.rentMonth,
                    rentYear:element.rentYear,
                    serviceProviderId:element.serviceProviderId,
                    prixUnitaire:element.prixUnitaire,
                    quantiteDispo:e.payload.doc.data()['quantite']
                  })*/
                  /****************** *//*
                return{
                  id:element.id,
                  clientId:element.clientId,
                  imagePrduit:element.imagePrduit,
                  spLogo:element.spLogo,
                  storeEmail:element.storeEmail ,
                  storeName:element.storeName ,
                  storePhoneNumber:element.storePhoneNumber ,
                  productId:element.productId ,
                  productName:element.productName ,
                  categoryName:element.categoryName,
                  quantite:element.quantite,
                  rentDay:element.rentDay,
                  rentMonth:element.rentMonth,
                  rentYear:element.rentYear,
                  serviceProviderId:element.serviceProviderId,
                  prixUnitaire:element.prixUnitaire,
                  quantiteDispo:e.payload.doc.data()['quantite']
                }}
              })
            }

          )
          console.log('ok12');
          
          console.log(this.rents1);
          
          
        });*/
      })
}
  ngOnInit() {
    this.getRents();
  }
  return1(product){
        let qtite2:number=Number(product.quantite)

               let qtite1:number=Number(product.quantiteDispo);
              let qtite3:number=qtite1+qtite2
             console.log(qtite1);
             console.log(qtite2);
             console.log(qtite3);
              this.db.doc("Product/"+product.productId).update({quantite:qtite3});
              console.log('id',product.id);
              var now = new Date();
              let nbYear=now.getFullYear()-product.rentYear;
              
              let nbMonth=now.getMonth()+1-product.rentMonth;
              let nbDay=now.getDate()-product.rentDay;
              let nbRentDays=nbYear*365+nbDay+30*nbMonth;
              let montant =nbRentDays*product.prixUnitaire;
              this.db.doc("Rent/" + product.id).delete();
              let message="you should pay "+montant;
              this.presentAlertConfirm1(message);
              //window.location.reload();
              
              
  }
  async presentAlertConfirm1(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success !',
      message: message,
      buttons: [
        {
          text: 'ok',
          role: 'confirm',
          cssClass: 'secondary',
          handler: (blah) => {
            //this.db.doc("Clients/"+this.user1Id).update(this.user);
            //this.logout();
            window.location.reload()
            this.router.navigateByUrl('/home');
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }
}
