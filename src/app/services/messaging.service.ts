import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  messages : Object[];
  currentRef : firebase.database.Reference;

  constructor() { 
    this.messages = [];
    this.currentRef = null;
  }

  public addChat(chatID : string, userID : string, text : string) {
    var newPostRef = firebase.database().ref('chatMessages/' + chatID).push();
    newPostRef.set({
        text : text,
        userID : userID,
        timeStamp : Date.now(),
        messageID : String(newPostRef.key)
    });
  }

  public getChats(chatID : string) {
    if (this.currentRef) {
      this.currentRef.off();
    }
    
    this.currentRef = firebase.database().ref('chatMessages/' + chatID);

    this.messages = [];

    this.currentRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        this.messages.push({
          text : childData.text,
          userID : childData.userID
        });
      });
    });

    this.currentRef.on('child_added', (data) => {
      this.messages.push({
        text : data.val().text,
        userID : data.val().userID
      })
    });

    return this.messages;
  }
}
