import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userDetailsRef : firebase.database.Reference;

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
    
    this.userDetailsRef = firebase.database().ref().child("userDetails");
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

  public async getUser(uid: string) {
    var val;
    await this.userDetailsRef.child(uid).once('value',(dataSnapshot)=> {
      val = dataSnapshot.val();
    });
    return val;
  }

  public async getProperty(uid:string, type:string){
    var val : string;
    await this.userDetailsRef.child(uid+"/"+type).once('value',(dataSnapshot)=> {
      val = dataSnapshot.val();
    });
    return val;
  }

  public async setProperty(uid:string, type:string, val:string){
    await firebase.database().ref().child("userDetails/"+uid+'/'+type).set(val);
  }

  public async getMembers(chatid:string){
    var members : string[];
    await firebase.database().ref().child("chatMembers/"+chatid).once('value',(data)=>{
      members = Object.keys(data.val());
    });
    return members;
  }

  public async getChats(uid:string){
    var chats : string[];
    await firebase.database().ref().child("userDetails/"+uid+'/chatList').once('value',(data)=>{
      chats = Object.keys(data.val());
    });
    return chats;
  }

  public async getUserNameSearch(searchString: string, numResults: number) {
    const autoCorrectedSearchString = searchString.toLocaleLowerCase();
    const snapshot = await this.userDetailsRef.orderByChild('userName').startAt(autoCorrectedSearchString).endAt(autoCorrectedSearchString + "\u{f8ff}").limitToFirst(numResults).once('value');
    return snapshot.val();
  }

  public async getFirstNameSearch(searchString: string, numResults: number) {
    const autoCorrectedSearchString = searchString.toLocaleLowerCase();
    const snapshot = await this.userDetailsRef.orderByChild('firstName').startAt(autoCorrectedSearchString).endAt(autoCorrectedSearchString + "\u{f8ff}").limitToFirst(numResults).once('value');
    return snapshot.val();
  }
}
