export interface Client{
    id:string;
    firstName:string;
    lastName:string;
    identityCardNumber:string;
    phoneNumber:string;
    email:string;
    password:string ;
    photoUrl:string;
}
export interface Produit{
    id: string;
    category:Category;
    image:string;
    name:string;
    prix:number;
    quantite:number;
}
export interface ServiceProvider{
    id:string;
    storeName:string;
    storeIdentifier:string;
    phoneNumber:string;
    email:string;
    password:string ;
    logoUrl:string;
}
export interface Category{
    id:string ;
    idServiceProvider:string ;
    image:string;
    name:string;
} 
export interface Rent{
    client:Client;
    product:Produit;
    quantite:number;
    rentDay:number;
    rentMonth:number;
    rentYear:number;
    serviceProvider:ServiceProvider;
}   