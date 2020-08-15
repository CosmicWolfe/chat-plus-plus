import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { Subscription, fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { KeyCodes } from '../app.constants';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {
  @ViewChild('searchInputRef') searchInputSingleRef: ElementRef;

  currentUserId : string;
  usersToExclude : string[];
  dialogText : string;
  chosenUser : any;

  autocompleteOptions;

  searchInputKeyUpSub: Subscription;

  constructor(
      public dialogRef: MatDialogRef<AddFriendComponent>,
      @Inject(MAT_DIALOG_DATA) data,
      private userService : UserService
  ) {
    this.currentUserId = data.currentUserId;
    this.usersToExclude = data.usersToExclude;
    this.dialogText = data.dialogText;
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.searchInputKeyUpSub = fromEvent(this.searchInputSingleRef.nativeElement, 'keyup').pipe(
      map((event: any) => {
        const eventArray = [event.keyCode, event.target.value];
        return eventArray;
      })
      ,debounceTime(250)
      ).subscribe((eventArray: any) => {
        this.searchUsers(eventArray[1], eventArray[0]);
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.searchInputKeyUpSub) {
      this.searchInputKeyUpSub.unsubscribe();
    }
  }

  searchUsers(searchString : string, keyPress : number) {
    if (keyPress == KeyCodes.KEY_LEFT || keyPress == KeyCodes.KEY_UP || keyPress == KeyCodes.KEY_RIGHT || keyPress == KeyCodes.KEY_DOWN) return;
    this.userService.getUserNameSearch(searchString, this.usersToExclude.length + 5).then((res : Object) => {
      let autocompleteOptions = [];
      for (let uid in res) {
        if (autocompleteOptions.length > 5) break;
        if (this.usersToExclude.includes(uid)) break;
        autocompleteOptions.push(res[uid]);
      }
      this.autocompleteOptions = autocompleteOptions;
    })
  }

  public onUserSelected(user: any) {
    this.chosenUser = user;
  }

  public onConfirm() {
    this.dialogRef.close({
      chosenUserId: this.chosenUser.userID
    });
  }

  public clearChosenUser() {
    this.chosenUser = null;
  }
}
