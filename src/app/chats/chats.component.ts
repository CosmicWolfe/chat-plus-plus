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
import { AddGroupChatComponent } from '../add-group-chat/add-group-chat.component';


@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  @Output('changeChatEvent') changeChatEvent = new EventEmitter();

  currentUserId : string;
  currentUserName : string;

  showingFriends = true;
  groupChats = [];
  friendChats = [];

  chatListRef;

  constructor(
    private router : Router,
    private dialog : MatDialog,
    private userService : UserService,
    private messagingService : MessagingService){}

  ngOnInit(): void {
    this.currentUserId = this.userService.getLoggedID();
    this.userService.getProperty(this.currentUserId, 'userName').then(uName => {
      this.currentUserName = uName;
    })

    this.chatListRef = this.userService.getChatListRef(this.currentUserId);
    this.chatListRef.on('child_added', async (data) => {
      let chat = await this.messagingService.getChatDetails(data.val());
      if (!chat) return;
      if (chat.private) {
        let otherUserId;
        let members = await this.messagingService.getChatMembers(chat.chatID);
        for (let i = 0; i < members.length; i++) {
          if (members[i] != this.currentUserId) {
            otherUserId = members[i];
            break;
          }
        }
        chat.name = await this.userService.getProperty(otherUserId, 'userName');
        this.friendChats.push(chat);
      } else {
        this.groupChats.push(chat);
      }
    })
  }

  handleChangeChat(chat)  {
    this.changeChatEvent.emit(chat.chatID);
  }

  changeFriendsView(isFriendsView) {
    this.showingFriends = isFriendsView;
  }

  async addChat() {
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
        let members = await this.messagingService.getChatMembers(this.friendChats[i].chatID);
        let otherUserId;
        for (let j = 0; j < members.length; j++) {
          if (members[j] != this.currentUserId) {
            otherUserId = members[j];
            break;
          }
        }
        usersToExclude.push(otherUserId);
      }
      dialogConfig.data.usersToExclude = usersToExclude;
      const dialogRef = this.dialog.open(AddFriendComponent, dialogConfig);
      const dialogSub = dialogRef.afterClosed().subscribe(res => {
        dialogSub.unsubscribe();
        if (res) {
          let uid = res.chosenUserId;
          this.messagingService.addNewChat(this.currentUserId, [], uid, res.chatName);
        }
      })
    } else {  
      for (let i = 0; i < this.friendChats.length; i++) {
        let members = await this.messagingService.getChatMembers(this.friendChats[i].chatID);
        let otherUserId;
        for (let j = 0; j < members.length; j++) {
          if (members[j] != this.currentUserId) {
            otherUserId = members[j];
            break;
          }
        }
        usersToExclude.push(otherUserId);
      }
      dialogConfig.data.usersToExclude = usersToExclude;
      this.dialog.open(AddGroupChatComponent, dialogConfig);
    }
  }

  goToUserPage() : void {
    this.router.navigate(['user/'+this.currentUserId]);
  }
}
