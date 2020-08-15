import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { UserService } from '../services/user.service';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';
import { MessagingService } from '../services/messaging.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-group-chat',
  templateUrl: './add-group-chat.component.html',
  styleUrls: ['./add-group-chat.component.scss']
})
export class AddGroupChatComponent implements OnInit {
  
  authorID:string;
  groupName:string;

  visible = true;
  selectable = true;
  removable = true;
  invCtrl = new FormControl();
  group:string[];
  friendsID:string[];
  friends:string[];
  filteredFriends: Observable<string[]>;


  @ViewChild('invInput') invInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor( public dialogRef: MatDialogRef<AddGroupChatComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private userService: UserService, 
    private messagingService : MessagingService) {
      this.group = [];
      this.friendsID = data.usersToExclude;
      this.friends = [];
      
      
      console.log('group',this.friends);
     }
  
  ngOnInit(): void {
    // this.friends = ["a","b","c","d","e"];
    this.authorID = this.userService.getLoggedID();
    this.init();
    this.filteredFriends = this.invCtrl.valueChanges.pipe(startWith(null),map((friend: string | null) => friend ? this._filter(friend) : this.friends.slice()));
  }

  async init(){
    for(let i in this.friendsID){
      var id = this.friendsID[i];
      var username = await this.userService.getProperty(id,"userName");
      this.friends.push(username);
    }
  }

  async addGroup(){
    if(this.groupName=="")return;

    var ids = [this.authorID];
    
    for(let i in this.group){
      var username = this.group[i];
      var x = await this.userService.getUserNameSearch(username,1);
      console.log(username,x);
      if(x)
        ids.push(Object.keys(x)[0]);
    }
    console.log(ids);
    console.log(this.groupName);
    this.messagingService.addNewChat(this.authorID,ids,"",this.groupName);
    // console.log(this.group);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    console.log(this.group);
    if(!this.friends.includes(value.trim()) || this.group.includes(value.trim()))
      return;
    // Add our fruit
    if ((value || '').trim()) {
      this.group.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.invCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.group.indexOf(fruit);

    if (index >= 0) {
      this.group.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(this.group.includes(event.option.viewValue))
      return;

    this.group.push(event.option.viewValue);
    this.invInput.nativeElement.value = '';
    this.invCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.friends.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}

