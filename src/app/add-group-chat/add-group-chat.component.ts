import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-add-group-chat',
  templateUrl: './add-group-chat.component.html',
  styleUrls: ['./add-group-chat.component.scss']
})
export class AddGroupChatComponent implements OnInit {
  
  groupName:string;

  visible = true;
  selectable = true;
  removable = true;
  invCtrl = new FormControl();
  group:string[];
  friends:string[];
  filteredFriends: Observable<string[]>;

  @ViewChild('invInput') invInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor( private userService: UserService) { }
  
  ngOnInit(): void {
    this.friends = ["ab","cs","asd","wq","qe","paos","lads","qwe","asd","zxcxz","fads","rwe","vcxv","vzx","asdq","dasd"];
    // this.friends = this.userService.getFriends();
    this.group = [];
    this.filteredFriends = this.invCtrl.valueChanges.pipe(startWith(null),map((fruit: string | null) => fruit ? this._filter(fruit) : this.friends.slice()));
  }

  addGroup(){
    
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

