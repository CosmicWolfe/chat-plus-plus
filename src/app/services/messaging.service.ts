import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  messages : Object[];
  codes : Object[];
  currentRef : firebase.database.Reference;
  codesRef : firebase.database.Reference;

  constructor() { 
    this.messages = [];
    this.codes = [];
    this.currentRef = null;
    this.codesRef = null;
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

  public getCodes(chatID : string) {
    if (this.codesRef) {
      this.codesRef.off();
    }
    
    this.codesRef = firebase.database().ref('chatCodes/' + chatID);

    this.codes = [];

    this.currentRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        this.codes.push({
          submissionID : childData.submissionID
        });
      });
    });

    this.currentRef.on('child_added', (data) => {
      this.codes.push({
        submissionID : data.val().submissionID
      });
    });

    return this.codes;
  }
}
