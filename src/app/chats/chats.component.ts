import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { MatIconModule } from '@angular/material/icon'
// import { MatDividerModule } from '@angular/material/divider';
// import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddGroupChatComponent } from '../add-group-chat/add-group-chat.component';



@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  // chats = ['1', '2', '3'];
  chats = ["SPECIALID"];
  userID : string;

  @Output('changeChatEvent') changeChatEvent = new EventEmitter();

  constructor(public dialog: MatDialog, private router : Router, private userService : UserService){}
  ngOnInit(): void {
    this.userID = this.userService.getLoggedID();

    this.userService.getChats(this.userID).then((x)=>{
      this.chats.concat(x);
    });
  }

  handleChangeChat(chatId: string)  {
    if(chatId=="SPECIALID"){
      const dialogRef = this.dialog.open(AddGroupChatComponent, {
        width: '1000px',
        data: null
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });

      return;
    }
    this.changeChatEvent.emit(chatId);
  }
  goToPage(pageName:string):void{
    this.router.navigate(['user/'+firebase.auth().currentUser.uid]);
  }
}
