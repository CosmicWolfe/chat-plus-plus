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
      firebase.database().ref('chatCodes/'+key+"/A").set({
        language : 41,
        sourceCode : "",
        submissionInput : ""
      });
      firebase.database().ref('chatCodes/'+key+"/B").set({
        language : 116,
        sourceCode : "",
        submissionInput : ""
      });
      firebase.database().ref('chatCodes/'+key+"/C").set({
        language : 10,
        sourceCode : "",
        submissionInput : ""
      });
    } else {
        var newChatRef = firebase.database().ref('chatDetails').push();
        let key = newChatRef.key;
        newChatRef.set({
          chatID : key,
          authorID : authorID,
          private : false,
          title : chatName
        })
        firebase.database().ref('chatMembers/'+key).set(memberIDs);
        memberIDs.forEach((id)=>{
          this.userService.addChatToUserChatList(id, key);
        });
        firebase.database().ref('chatCodes/'+key+"/A").set({
          language : 41,
          sourceCode : "",
          submissionInput : ""
        });
        firebase.database().ref('chatCodes/'+key+"/B").set({
          language : 116,
          sourceCode : "",
          submissionInput : ""
        });
        firebase.database().ref('chatCodes/'+key+"/C").set({
          language : 10,
          sourceCode : "",
          submissionInput : ""
        });
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
    this.currentRef.on('child_added', async (data) => {
      this.messages.push({
        text : data.val().text,
        userID : data.val().userID,
        userName : await this.userService.getProperty(data.val().userID, 'userName')
      })
    });

    return this.messages;
  }
}
