import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { 
    var firebaseConfig = {
      apiKey: "AIzaSyB7lbkpXJdGH4SDInVfBxWryJc6FXDXZ1E",
      authDomain: "chat-plus-plus.firebaseapp.com",
      databaseURL: "https://chat-plus-plus.firebaseio.com",
      projectId: "chat-plus-plus",
      storageBucket: "chat-plus-plus.appspot.com",
      messagingSenderId: "310062968887",
      appId: "1:310062968887:web:9c55051167e26b20d20fb2",
      measurementId: "G-P0R44136LE"
    };
    // Initialize Firebase
    if (firebase.apps.length === 0){
      firebase.initializeApp(firebaseConfig);
    }
    
  }

  public isLoggedIn(){
    return firebase.auth().currentUser!=null;
  }

  public getLoggedID(){
    if(!this.isLoggedIn()){
      console.log("not logged in");
      return null;
    }
    return firebase.auth().currentUser.uid;
  }

  public async getProperty(uid:string, type:string){
    var val : string;
    await firebase.database().ref().child("userDetails/"+uid+"/"+type).once('value',(dataSnapshot)=> {
      val = dataSnapshot.val();
    });
    return val;
  }

  public async setProperty(uid:string, type:string, val:string){
    await firebase.database().ref().child("userDetails/"+uid+"/"+type).set({type:val});
  }

}
