import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-group-chat',
  templateUrl: './add-group-chat.component.html',
  styleUrls: ['./add-group-chat.component.scss']
})
export class AddGroupChatComponent implements OnInit {
  
  searchkey:string;
  group:string[];
  result : any;
  searchusers:string[];


  constructor( private userService: UserService) { }
  
    ngOnInit(): void {
      
  }

  async search(){
    this.result = await this.userService.getUserNameSearch(this.searchkey,10);
    console.log(this.result);
    
  }
  invite(user: string){
    this.group.push(user);
  }
}
// TODO
// search form
// list of ppl
// add ppl
// create chat

