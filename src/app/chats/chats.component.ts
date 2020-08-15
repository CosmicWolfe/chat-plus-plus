import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { MatIconModule } from '@angular/material/icon'
// import { MatDividerModule } from '@angular/material/divider';
// import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddFriendComponent } from '../add-friend/add-friend.component';
import { UserService } from '../services/user.service';
import { MessagingService } from '../services/messaging.service';


@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  @Output('changeChatEvent') changeChatEvent = new EventEmitter();

  currentUserId : string;

  showingFriends = true;
  groupChats = [];
  friendChats = [];

  constructor(
    private router : Router,
    private dialog : MatDialog,
    private userService : UserService,
    private messagingService : MessagingService){}

  ngOnInit(): void {
    this.currentUserId = this.userService.getLoggedID();
    this.userService.getChats(this.currentUserId).then(async chats => {
      let groupChats = [];
      let friendChats = [];
      for (let chatId in chats) {
        let chat = await this.messagingService.getChatDetails(chatId);
        if (chat.privacy) {
          friendChats.push(chat);
        } else {
          groupChats.push(chat);
        }
      }
      this.friendChats = friendChats;
      this.groupChats = groupChats;
    })
  }

  handleChangeChat(chatId: string)  {
    this.changeChatEvent.emit(chatId);
  }

  changeFriendsView(isFriendsView) {
    this.showingFriends = isFriendsView;
    this.userService.getChats(this.currentUserId).then(async chats => {
      let groupChats = [];
      let friendChats = [];
      for (let chatId in chats) {
        let chat = await this.messagingService.getChatDetails(chatId);
        if (chat.privacy) {
          friendChats.push(chat);
        } else {
          groupChats.push(chat);
        }
      }
      this.friendChats = friendChats;
      this.groupChats = groupChats;
    })
  }

  addChat() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 235;
    dialogConfig.width = "400px";
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      currentUserId: this.currentUserId
    }
    let usersToExclude = [];
    if (this.showingFriends) {
      for (let i = 0; i < this.friendChats.length; i++) {
        usersToExclude.push(this.friendChats[i].privateOtherUserId);
      }
      dialogConfig.data.usersToExclude = usersToExclude;
      const dialogRef = this.dialog.open(AddFriendComponent, dialogConfig);
      const dialogSub = dialogRef.afterClosed().subscribe(res => {
        dialogSub.unsubscribe();
        if (res) {
          let uid = res.chosenUserId;
          this.messagingService.addNewChat(this.currentUserId, [], uid);
        }
      })
    } else {  
      for (let i = 0; i < this.friendChats.length; i++) {
        usersToExclude.push(this.friendChats[i].privateOtherUserId);
      }
      dialogConfig.data.usersToExclude = usersToExclude;
      //this.dialog.open(AddGroupComponent, dialogConfig);
    }
  }

  goToPage(pageName:string) : void {
    this.router.navigate(['user/'+firebase.auth().currentUser.uid]);
  }
}
