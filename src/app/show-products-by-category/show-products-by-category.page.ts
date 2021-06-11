import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
//import { Storage } from '@ionic/storage-angular';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-show-products-by-category',
  templateUrl: './show-products-by-category.page.html',
  styleUrls: ['./show-products-by-category.page.scss'],
})
export class ShowProductsByCategoryPage implements OnInit {

  user:any={id:"",firstName:"",lastName:"",email:"",password:"",phoneNumber:"",identityCardNumber:"",imageUrl:""};
  imurl:any;
  ahmed:any=[];
  listeProducts:any=[];
  listeCategories:any=[];
  category:any=[];
  listeServiceProvider:any=[];
  liste:any;
  quantiteCommande:number;
  listQ:any=[];
  constructor(public navCtrl: NavController,private route:ActivatedRoute,private toastController:ToastController,private fire:AngularFireAuth,private db:AngularFirestore, private router:Router ,private auth:AuthService , private storage1:AngularFireStorage , private menu: MenuController,) { 
    //window.location.reload();
    /*console.log("page par categorie");
    
    this.navCtrl.pop();
    this.category=[];
    this.route.queryParams.subscribe(params=>{
      if(params&&params.special){
        this.category=JSON.parse(params.special);

      }
    });
    console.log(this.category);
    */
    //this.getProductsByIDCategory();
    //this.getProducts();
    //this.user= this.getUser();
  }
  getImageUrl(ref:string){
    firebase.storage().ref().child(ref).getDownloadURL().then((url)=>{this.imurl= url});
  }
  /*getProductsByIDCategory(){
    this.route.queryParams.subscribe(params=>{
      if(params&&params.special){
        this.db.collection("Product",ref=>ref.where('idCategory','==',JSON.parse(params.special).id)).snapshotChanges().subscribe(e=>{
      console.log();
      
          this.ahmed=e.map(jaouher=>{
            var L=[]
            
            console.log(jaouher.payload.doc.data()["id"]);
            
this.db.collection("ServiceProvider").doc(jaouher.payload.doc.data()["id"]).get().subscribe(prod => {
  if (!prod.exists) {
    
    
  }
  L.push({name:prod.data()["storeName"],email:prod.data()["email"]})
})      
            console.log({
              id:jaouher.payload.doc.id,
              user:L
            });
            
            return{
              id:jaouher.payload.doc.id,
              user:L
            }
          })
        })
      }
    });
    

  }*/
  async getUser(){
    const name = await JSON.parse(localStorage.getItem('user'));
    this.user=name;
    this.getImageUrl(name.imageUrl);
    //console.log(name);
    return name;
  }
  getProducts1(){
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
  gotoShowProductDetails(product){
      
    let navigationExtras:NavigationExtras={
      queryParams:{
        special:JSON.stringify({spIdentifier:product.spIdentifier,id:product.id,name:product.name,prix:product.prix/*,imageProduit:product.imageWbrh*/,idCategory:product.idCategory,quantite:product.quantite,categoryName:product.categoryName,categoryImage:product.categoryImage,imageWbrh:product.imageWbrh,spId:product.spId,spStoreName:product.spStoreName,spEmail:product.spEmail,spPhoneNumber:product.spPhoneNumber,logoSpWbrh:product.logoSpWbrh})
      }
    }
    this.router.navigate(['/show-product-infos'],navigationExtras);
  }  
  getProducts(){
    this.liste=[]
    this.listeProducts=[]

        this.db.collection("Product").snapshotChanges()
      .subscribe
      ( data=>{
        this.liste=data.map(
          e=>{
           // if(this.category.id== e.payload.doc.data()['idCategory']){
              
            return{
              id:e.payload.doc.id,
              name:e.payload.doc.data()['name'],
              prix:e.payload.doc.data()['prix'],
              idCategory:e.payload.doc.data()['idCategory'],
              quantite:e.payload.doc.data()['quantite'],
              image:this.storage1.ref(e.payload.doc.data()['image']).getDownloadURL(),
              categoryName:this.category.name,
              spId:this.category.idServiceProvider
            }
            
            
         // }
        }
        )
       // if(this.liste!=null){
        this.liste.forEach(element => {
          /********************************************* */
          this.db.collection("ServiceProvider").snapshotChanges()
      .subscribe
      ( data=>{
        this.listeProducts=data.map(
          e=>{
            if(element.spId== e.payload.doc.id){
              
              this.listQ=[];
              for (var i=0;i<element.quantite+1;i++) {
                this.listQ.push(Number(i));
              }
              console.log({id:element.id,
                name:element.name,
                prix:element.prix,
                imageProduit:element.image,
                idCategory:element.idCategory,
                quantite:element.quantite,
                categoryName:element.categoryName,
                spId:this.category.idServiceProvider,
                spStoreName:e.payload.doc.data()['storeName'],
                spEmail:e.payload.doc.data()['email'],
                spPhoneNumber:e.payload.doc.data()['phoneNumber'],
                spLogo:this.storage1.ref(e.payload.doc.data()['logoUrl']).getDownloadURL()});
              
            return{
              id:element.id,
              name:element.name,
              prix:element.prix,
              imageProduit:element.image,
              idCategory:element.idCategory,
              quantite:element.quantite,
              categoryName:element.categoryName,
              spId:this.category.idServiceProvider,
              spStoreName:e.payload.doc.data()['storeName'],
              spEmail:e.payload.doc.data()['email'],
              spPhoneNumber:e.payload.doc.data()['phoneNumber'],
              spLogo:this.storage1.ref(e.payload.doc.data()['logoUrl']).getDownloadURL(),
              listI:this.listQ
            }
            
            
          }}
        );
        console.log('ahla bik');
        
        console.log(this.listeProducts);
        
      })



          /********************************************* */


          
        });//}
        //console.log(this.listeProducts);
        
      })
      
      
    }/*
    rent(product){
      var now = new Date();
      now.getFullYear();
      now.getMonth();
      now.getDate()
      console.log("on est le ",now.getFullYear(),now.getMonth()+1,now.getDate());
      console.log("client",this.fire.auth.currentUser.uid);
      console.log("sp",product.spId);
      console.log("prod",product.id);
      console.log(this.quantiteCommande);
      this.db.doc("Product/"+product.id).update({quantite:product.quantite-this.quantiteCommande});
      this.db.collection("Rent").add({ quantite:this.quantiteCommande,productId: product.id,serviceProviderId:product.spId,clientId:this.fire.auth.currentUser.uid,rentDay:now.getDate(),rentYear:now.getFullYear(),rentMonth:now.getMonth()+1})
        .then( data => { 
          
          this.presentToast("Rent Successfuly");
          this.router.navigateByUrl("/accueil")
        })
        .catch( err => { 
          this.presentToast(err);
          console.log(err); });
      
    }*/
    async presentToast(message1) {
      const toast = await this.toastController.create({
        message: message1,
        duration: 5000
      });
      toast.present();
    }/*
    gotoShowProductDetails(product){
      let navigationExtras:NavigationExtras={
        queryParams:{
          special:JSON.stringify(product)
        }
      }
      this.router.navigate(['/show-product-infos'],navigationExtras);
    }*/
  ngOnInit() {
    //window.location.reload();
    this.listeProducts=null;
    this.category=null;
    console.log("page par categorie");
    this.route.queryParams.subscribe(params=>{
      if(params&&params.special){
        this.category=JSON.parse(params.special);

      }
    });
    console.log('category');
    
    console.log(this.category);
    console.log('product');
    
    this.getProducts1();
  }

}
