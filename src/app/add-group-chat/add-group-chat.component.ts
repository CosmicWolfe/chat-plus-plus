import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-add-group-chat',
  templateUrl: './add-group-chat.component.html',
  styleUrls: ['./add-group-chat.component.scss']
})
export class AddGroupChatComponent implements OnInit {
  
  searchkey:string;
  group : string[];
  result : any;
  searchusers:string[];
  friends:string[];
  filtered_friends:string[];

  constructor( private userService: UserService) { }
  
  ngOnInit(): void {
    this.friends = ["1","2"];
    // this.friends = this.userService.getFriends();
    this.filtered_friends = this.friends;
    this.group = [];
  }

  async search(){
    
  }

  invite(user: string){
    if(this.group.includes(user))
      return;
    this.group.push(user);
    console.log(this.group);
  }
}

