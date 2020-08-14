import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  messages : Object[]
  
  constructor() { this.messages = [] }

  public addChat(chatID : string, userID : string, text : string) {
    this.messages.push({
      text : text,
      userID : userID
    });
    /*
    console.log("PO");
    firebase.database().ref('chats/' + chatID).set({
      userID: userID,
      text: text
    });*/
  }

  public getChats(chatID : string) {
    return this.messages;
  }
}
