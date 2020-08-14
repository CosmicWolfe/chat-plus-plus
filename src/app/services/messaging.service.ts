import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  messages : Object[]
  
  constructor() { this.messages = [] }

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
    this.messages = [];
    firebase.database().ref('chatMessages/' + chatID).once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        this.messages.push({
          text : childData.text,
          userID : childData.userID
        });
      });
    });
    return this.messages;
  }
}
