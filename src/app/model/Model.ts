export class Client{
    private id:string;
    private firstName:string;
    private lastName:string;
    private identityCardNumber:string;
    private phoneNumber:string;
    private email:string;
    private password:string ;
    private photoUrl:string;
    constructor(firstName?:string,lastName?:string,phoneNumber?:string,email?:string,password?:string,identityCardNumber?:string,photoUrl?:string,id?:string){
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.phoneNumber=phoneNumber;
        this.email=email;
        this.password=password;
        this.identityCardNumber=identityCardNumber;
        this.photoUrl=photoUrl;
    }
    public getId():string{
        return this.id;
    }
    public getFirstName():string{
        return this.firstName;
    }
    public getLastName():string{
        return this.lastName;
    }
    public getIdentityCardNumber():string{
        return this.identityCardNumber;
    }
    public getPhoneNumber():string{
        return this.phoneNumber;
    }
    public getEmail():string{
        return this.email;
    }
    public getPassword():string{
        return this.password;
    }
    public getPhotoUrl(){
        return this.photoUrl;
    }
    public setId(id:string){
        this.id=id;
    }
    public setFirstName(firstName:string){
        this.firstName=firstName;
    }
    public setLastName(lastName:string){
        this.lastName=lastName;
    }
    public setIdentityCardNumber(identityCardNumber){
        this.identityCardNumber=identityCardNumber;
    }
    public setPhoneNumber(phoneNumber:string){
        this.phoneNumber=phoneNumber;
    }
    public setEmail(email:string){
        this.email=email;
    }
    public setPhotoUrl(photoUrl:string){
        this.photoUrl=photoUrl;
    }
} 
export class Produit{
    private id: string;
    private category:Category;
    private image:string;
    private name:string;
    private prix:number;
    private quantite:number;
    constructor(category:Category,name:string,prix:number,quantite:number,image:string,id?:string){
        this.id=id;
        this.category=category
        this.image=image;
        this.prix=prix;
        this.name=name;
        this.quantite=quantite;
    }
    getId():string{
        return this.id;
    }
    getCategory():Category{
        return this.category;
    }
    getImage():string{
        return this.image;
    }
    getPrix():number{
        return this.prix;
    }
    getName():string{
        return this.name;
    }
    getQuantite():number{
        return this.quantite;
    }
    setId(id:string){
        this.id=id;
    }
    setCategory(category:Category){
        this.category=category;
    }
    setImage(image:string){
        this.image=image;
    }
    setPrix(prix:number){
        this.prix=prix;
    }
    setName(name:string){
        this.name=name;
    }
    setQuantite(quantite:number){
        this.quantite=quantite;
    }
}
export class ServiceProvider{
    private id:string;
    private storeName:string;
    private storeIdentifier:string;
    private phoneNumber:string;
    private email:string;
    private password:string ;
    private logoUrl:string;
    constructor(storeName?:string,storeIdentifier?:string,phoneNumber?:string,email?:string,password?:string,logoUrl?:string,id?:string){
        this.id=id;
        this.storeName=storeName;
        this.phoneNumber=phoneNumber;
        this.email=email;
        this.password=password;
        this.storeIdentifier=storeIdentifier;
        this.logoUrl=logoUrl;
    }
    getId():string{
        return this.id;
    }
    getStoreName():string{
        return this.storeName;
    }
    getStoreIdentifier():string{
        return this.storeIdentifier;
    }
    getPhoneNumber():string{
        return this.phoneNumber;
    }
    getEmail():string{
        return this.email;
    }
    getPassword():string{
        return this.password;
    }
    getLogoUrl(){
        return this.logoUrl;
    }
    setId(id:string){
        this.id=id;
    }
    setStoreName(storeName:string){
        this.storeName=storeName;
    }
    setStoreIdentifier(storeIdentifier){
        this.storeIdentifier=storeIdentifier;
    }
    setPhoneNumber(phoneNumber:string){
        this.phoneNumber=phoneNumber;
    }
    setEmail(email:string){
        this.email=email;
    }
    setLogoUrl(logoUrl:string){
        this.logoUrl=logoUrl;
    }
}
export class Category{
    private id:string ;
    private idServiceProvider:string ;
    private image:string;
    private name:string;
    constructor(idServiceProvider?:string,name?:string,id?:string,image?:string){
        this.id=id;
        this.idServiceProvider=idServiceProvider;
        this.image=image;
        this.name=name;
    }
    public getId(){
        return this.id;
    }
    public getIdServiceProvider(){
        return this.idServiceProvider;
    }
    public getName(){
        return this.name;
    }
    public getImage(){
        return this.image;
    }
    public setId(id:string){
        this.id=id;
    }
    public setIdServiceProvider(idServiceProvider:string){
        this.idServiceProvider=idServiceProvider;
    }
    public setImage(image:string){
        this.image=image;
    }
    public setName(name:string){
        this.name=name;
    }
}
export class Rent{
    private client:Client;
    private product:Produit;
    private quantite:number;
    private rentDay:number;
    private rentMonth:number;
    private rentYear:number;
    private serviceProvider:ServiceProvider;
    constructor(client?:Client,product?:Produit,quantite?:number,rentDay?:number,rentMonth?:number,rentYear?:number,serviceProvider?:ServiceProvider){
        this.client=client;
        this.product=product;
        this.quantite=quantite;
        this.rentDay=rentDay;
        this.rentMonth=rentMonth;
        this.rentYear=rentYear;
        this.serviceProvider=serviceProvider;
    }
    getProduct():Produit{
        return this.product;
    }
    getClient():Client{
        return this.client;
    }
    getQuantite():number{
        return this.quantite;
    }
    getRendDay():number{
        return this.rentDay;
    }
    getRentMonth():number{
        return this.rentMonth;
    }
    getRentYear():number{
        return this.rentYear;
    }
    getServiceProvider():ServiceProvider{
        return this.serviceProvider;
    }
    setClient(client:Client){
        this.client=client;
    }
    setServiceProvider(serviceProvider:ServiceProvider){
        this.serviceProvider=serviceProvider;
    }
    setProduct(product:Produit){
        this.product=product;
    }
    setRentDay(rentDay:number){
        this.rentDay=rentDay;
    }
    setRentMonth(rentMonth:number){
        this.rentMonth=rentMonth;
    }
    setRentYear(rentYear:number){
        this.rentYear=rentYear;
    }
}