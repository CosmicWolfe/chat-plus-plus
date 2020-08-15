import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  messages : Object[];
  currentRef : firebase.database.Reference;

  constructor(private userService : UserService) { 
    this.messages = [];
    this.currentRef = null;
  }

  public addNewChat(authorID : string, memberIDs : string[], privateOtherUserId : string, chatName : string) {
    if (privateOtherUserId) {
      var newChatRef = firebase.database().ref('chatDetails').push();
      let key = newChatRef.key;
      newChatRef.set({
        chatID : key,
        authorID : authorID,
        private : true
      })
      firebase.database().ref('chatMembers/'+key).set([authorID, privateOtherUserId]);
      
      this.userService.addChatToUserChatList(authorID, key);
      this.userService.addChatToUserChatList(privateOtherUserId, key);
    } else {

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
      return Object.values(snapshot.val());
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
