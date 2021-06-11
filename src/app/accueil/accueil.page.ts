import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client,Category, Rent } from '../model/interfaces';
//import {  } from '../model/Model';
import { AuthService } from '../services/auth.service';
import { GestionBaseDeDonneesService } from '../services/gestion-base-de-donnees.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  user:Client;
  cat:Observable<Category[]>; 
  listeProducts:any;
  listeCategories:any;
  listeServiceProvider:any;
  liste:any;
  listQ:any=[];
  quantiteCommande:number;
  constructor(private toastController:ToastController,private fire:AngularFireAuth,
    private db:AngularFirestore, private router:Router , private storage1: AngularFireStorage,private bddService:GestionBaseDeDonneesService , private auth:AuthService) {
    this.user=JSON.parse( localStorage.getItem('user') )as Client;
     console.log(this.user);
     //this.cat=this.getAllCategories();
   }

  ngOnInit() {
    
    this.getProducts();
  }
  /*getAllCategories(): Observable<Category[]> {
    return this.bddService.getCategoryById('iuOlLbLSpAy8QWLKzIjc').snapshotChanges()
    .pipe(
    map(res => {
      return res.map(element => {
        console.log({
          idServiceProvider:element.payload.doc.data()['idServiceProvider'],
        id:element.payload.doc.data()['id'],
        name:element.payload.doc.data()['name'],
        image:element.payload.doc.data()['image']
      } as Category);
        
    return  {
      idServiceProvider:element.payload.doc.data()['idServiceProvider'],
    id:element.payload.doc.data()['id'],
    name:element.payload.doc.data()['name'],
    image:element.payload.doc.data()['image']
  } as Category
    
    });
    }));
    }*/
    getProducts(){
      // window.location.reload();
      this.db.collection("Category").snapshotChanges()
      .subscribe
      ( data=>{
        this.listeCategories=data.map(
          e=>{
            //console.log(this.fire.auth.currentUser.uid);
            
            
           // console.log(e.payload.doc.data()['idServiceProvider']);
            //console.log(this.fire.auth.currentUser.uid==e.payload.doc.data()['idServiceProvider']);
            return{
              id:e.payload.doc.id,
              name:e.payload.doc.data()['name'],
              categoryImage:e.payload.doc.data()['image'],
              idServiceProvider:e.payload.doc.data()['idServiceProvider'],
            }
            
          
        
        }
        );
        
        //console.log(this.listeCategories.size);
        
        this.listeCategories.forEach(category => {
          this.db.collection("Product").snapshotChanges()
        .subscribe
        ( data=>{
          this.liste=data.map(
            e=>{
              if(category.id== e.payload.doc.data()['idCategory']){
                
                
              return{
                id:e.payload.doc.id,
                name:e.payload.doc.data()['name'],
                prix:e.payload.doc.data()['prix'],
                idCategory:e.payload.doc.data()['idCategory'],
                quantite:e.payload.doc.data()['quantite'],
                image:this.storage1.ref(e.payload.doc.data()['image']).getDownloadURL(),
                imageWbrh:e.payload.doc.data()['image'],
                categoryName:category.name,
                categoryImage:category.categoryImage,
                idServiceProvider:category.idServiceProvider
              }
              
              
            }
          }
          )
         // console.log(this.liste);
          
          this.liste.forEach(element => {
            if(element!=null){
            console.log(element);
            
            /********************************************* */
            this.db.collection("ServiceProvider").snapshotChanges()
        .subscribe
        ( data=>{
          this.listeProducts=data.map(
            e=>{
              //console.log(element.spId);
              
              if(element.idServiceProvider== e.payload.doc.id){
                console.log(element.quantite);
                
                this.listQ=[];
                for (var i=0;i<element.quantite+1;i++) {
                  this.listQ.push(Number(i));
                }
                console.log("idServiceProvider");
                console.log(element.spId);
              return{
                id:element.id,
                name:element.name,
                prix:element.prix,
                imageProduit:element.image,
                idCategory:element.idCategory,
                quantite:element.quantite,
                categoryName:element.categoryName,
                categoryImage:element.categoryImage,
                //spId:category.idServiceProvider,
                imageWbrh:element.imageWbrh,
                spId:element.idServiceProvider,
                spStoreName:e.payload.doc.data()['storeName'],
                spEmail:e.payload.doc.data()['email'],
                spPhoneNumber:e.payload.doc.data()['phoneNumber'],
                spIdentifier:e.payload.doc.data()['storeIdentifier'],
                spLogo:this.storage1.ref(e.payload.doc.data()['logoUrl']).getDownloadURL(),
                logoSpWbrh:e.payload.doc.data()['logoUrl'],
                listI:this.listQ
              }
              
              
            }}
          )
        })
  
  
  
            /********************************************* */
  
            
            
          }});
          //console.log(this.listeProducts);
          
        })
        });
        
      })
    }
    rent(product){
      var now = new Date();
      now.getFullYear();
      now.getMonth();
      now.getDate()
      //console.log("on est le ",now.getFullYear(),now.getMonth()+1,now.getDate());
      //console.log("client",this.fire.auth.currentUser.uid);
      //console.log("sp",product.spId);
      //console.log("prod",product.id);
      //console.log(this.quantiteCommande);
      console.log('ahla w sahla');
      
      console.log(product);
      console.log("quantite commande ");
      console.log(this.quantiteCommande);
      
      
      this.db.doc("Product/"+product.id).update({quantite:product.quantite-this.quantiteCommande});
      this.db.collection("Rent").add({ /*quantiteDispo:product.quantite ,*/quantite:this.quantiteCommande,productId: product.id,productName:product.name,imageProduit:product.imageWbrh,prixUnitaire:product.prix,categoryName:product.categoryName,serviceProviderId:product.spId,storeName:product.spStoreName,storeEmail:product.spStoreName,storePhoneNumber:product.spPhoneNumber,spLogo:product.logoSpWbrh,clientId:this.fire.auth.currentUser.uid,rentDay:now.getDate(),rentYear:now.getFullYear(),rentMonth:now.getMonth()+1})
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
    gotoShowProductDetails(product){
      
      let navigationExtras:NavigationExtras={
        queryParams:{
          special:JSON.stringify({spIdentifier:product.spIdentifier,id:product.id,name:product.name,prix:product.prix/*,imageProduit:product.imageWbrh*/,idCategory:product.idCategory,quantite:product.quantite,categoryName:product.categoryName,categoryImage:product.categoryImage,imageWbrh:product.imageWbrh,spId:product.spId,spStoreName:product.spStoreName,spEmail:product.spEmail,spPhoneNumber:product.spPhoneNumber,logoSpWbrh:product.logoSpWbrh})
        }
      }
      this.router.navigate(['/show-product-infos'],navigationExtras);
    }  
  }
