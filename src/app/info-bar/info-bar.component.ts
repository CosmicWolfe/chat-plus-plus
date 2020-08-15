import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { InfoPageComponent } from '../info-page/info-page.component';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { MessagingService } from '../services/messaging.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent implements OnInit {
  @Input('chatID') chatID : string;

  currentUserId;

  chatName : string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private messagingService: MessagingService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.currentUserId = this.userService.getLoggedID();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes.chatID) {
      if (this.chatID) {
        this.updateChatName();
      }
    }
  }

  async updateChatName() {
    let chatDetails = await this.messagingService.getChatDetails(this.chatID);
    if (chatDetails.private) {
      let members = await this.messagingService.getChatMembers(this.chatID);
      let otherUserId;
      for (let j = 0; j < members.length; j++) {
        if (members[j] != this.currentUserId) {
          otherUserId = members[j];
          break;
        }
      }
      this.chatName = await this.userService.getProperty(otherUserId, 'userName');
    } else {
      this.chatName = chatDetails.title;
    }
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 235;
    dialogConfig.width = "400px";
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      chatID : this.chatID
    }
    this.dialog.open(InfoPageComponent, dialogConfig);
  }

  logout(): void {
    
    console.log("logging out");
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });
    this.router.navigate(['login']);
  }

}
