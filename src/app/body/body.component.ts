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

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.activeChatId = '1';
    this.userID = this.userService.getLoggedID();
    
  }

  changeChat(chatId: string) {
    this.activeChatId = chatId;
  }

}
