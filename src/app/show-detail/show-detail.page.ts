import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { Client } from '../model/interfaces';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.page.html',
  styleUrls: ['./show-detail.page.scss'],
})
export class ShowDetailPage implements OnInit {
  user:any;
  user1:Client;
  imurl:any;
  constructor(private db:AngularFirestore,private storage:AngularFireStorage) { 
    this.user1=JSON.parse( localStorage.getItem('user') )as Client;
    console.log(this.user1);
    
    //this.getImageUrl(this.user.photoUrl);
  }
   getImageUrl(ref:string){
    firebase.storage().ref().child(ref).getDownloadURL().then((url)=>{this.imurl=url});
  }
  getUser(){
     }
  ngOnInit() {
    this.user=JSON.parse( localStorage.getItem('user') )as Client;
    this.getImageUrl(this.user.photoUrl);
  
  }

}
