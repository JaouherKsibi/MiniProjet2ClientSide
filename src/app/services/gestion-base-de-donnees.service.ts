import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Category, Client, Produit, Rent, ServiceProvider } from '../model/interfaces';
@Injectable({
  providedIn: 'root'
})
export class GestionBaseDeDonneesService {
  private dbPathCategory = '/Category';
  private dbPathClients = '/Clients';
  private dbPathProduct = '/Product';
  private dbPathRent = '/Rent';
  private dbPathServiceProvider = '/ServiceProvider';
  categoriesRef: AngularFirestoreCollection<Category>;
  clientsRef: AngularFirestoreCollection<Client>;
  productRef: AngularFirestoreCollection<Produit>;
  rentRef: AngularFirestoreCollection<Rent>;
  serviceProviderRef: AngularFirestoreCollection<ServiceProvider>;
  
  constructor(private db: AngularFirestore) {
    this.categoriesRef = db.collection(this.dbPathCategory);
    this.clientsRef=db.collection(this.dbPathClients);
    this.productRef=db.collection(this.dbPathProduct);
    this.rentRef=db.collection(this.dbPathRent);
    this.serviceProviderRef=db.collection(this.dbPathServiceProvider);
   }
   getAllCategories(): AngularFirestoreCollection<Category> {
    return this.categoriesRef;
  }
  getAllClients(): AngularFirestoreCollection<Client> {
    return this.clientsRef;
  }
  getAllProducts(): AngularFirestoreCollection<Produit> {
    return this.productRef;
  }
  getAllRents(): AngularFirestoreCollection<Rent> {
    return this.rentRef;
  }
  getAllServiceProviders(): AngularFirestoreCollection<ServiceProvider> {
    return this.serviceProviderRef;
  }
  getCategoryById(id:string):AngularFirestoreCollection<Category>{
    return this.db.collection(this.dbPathCategory,ref=>ref.where('id','==',id));
  }
  getServiceProviderById(id:string){
    return this.db.collection(this.dbPathServiceProvider,ref=>ref.where('id','==',id));
  }
  getRentsByIdClient(id:string):AngularFirestoreCollection<Rent>{
    return this.db.collection(this.dbPathServiceProvider,ref=>ref.where('clientId','==',id));
  }
  getProductById(id:string):AngularFirestoreCollection<Produit>{
    return this.db.collection(this.dbPathProduct,ref=>ref.where('id','==',id));
  }
}
