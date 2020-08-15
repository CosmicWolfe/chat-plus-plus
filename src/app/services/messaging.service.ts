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

  public addNewChat(authorID : string, memberIDs : string[], privateOtherUserId : string) {
    if (privateOtherUserId) {
      var newChatRef = firebase.database().ref('chatDetsils').push();
      let key = newChatRef.key;
      newChatRef.set({
        chatID : key,
        authorID : authorID
      })
      var chatMembersRef = firebase.database().ref('chatMembers/'+key)
      for (let i = 0; i < memberIDs.length; i++) {
        chatMembersRef.set({i: memberIDs[i]});
      }
    }
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

  public async getChatDetails(chatID : string) {
    const snapshot = await firebase.database().ref('chatDetails/' + chatID).once('value');
    return snapshot.val();
  }

  public async getChatMembers(chatID : string) {
    const snapshot = await firebase.database().ref('chatMembers/' + chatID).once('value');
    if (snapshot.val()) {
      return Object.keys(snapshot.val());
    }
    return [];
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
