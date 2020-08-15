import { Component, OnInit, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '../services/messaging.service';


@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {
  chatID;

  chatDetails;
  members : any[];

  tags = ['c++','python','html','angular','java','succ','thicc','thighs'];
  constructor(
    private userService: UserService,
    private messagingService: MessagingService,
    public dialogRef: MatDialogRef<InfoPageComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.chatID = data.chatID;
    }

  ngOnInit(): void {
    this.messagingService.getChatDetails(this.chatID).then(result => {
      this.chatDetails = result;
    })
    this.userService.getMembers(this.chatID).then(async members => {
      if (!members) return; 
      for (let i = 0; i < members.length; i++) {
        this.members.push(await this.userService.getProperty(members[i], 'userName'));
      }
    });
  }
  
  invitefriends()  {
    console.log("inviting friends now");
    //open up your list of friends
  }

}
