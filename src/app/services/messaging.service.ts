import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor() { }

  public addChat(chatID : number, userID : number, text : string) {
    console.log("PO");
    firebase.database().ref('chats/' + String(chatID)).set({
      userID: userID,
      text: text
    });
  }
}
