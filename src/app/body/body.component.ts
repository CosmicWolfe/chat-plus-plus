import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  userID : string;
  activeChatId : string;
  chatIDs : string[]

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    // this.activeChatId = '1';
    this.userID = this.userService.getLoggedID();
    if(!this.userID){
      // this.router.navigate(['login']);
      // return;
    }
    this.userService.getChats(this.userID).then((x)=>this.chatIDs=x);
    
    this.activeChatId = this.chatIDs[0];
  }

  changeChat(chatId: string) {
    this.activeChatId = chatId;
  }

  hidden : boolean;
  async click() {
    await this.delay(10000);
    this.hidden = true;
  }


  public delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
