import { Component, OnInit, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '../services/messaging.service';
import { Router } from '@angular/router';


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
    private router: Router,
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
      let theMembers = [];
      if (!members) return; 
      for (let i = 0; i < members.length; i++) {
        theMembers.push({
          userName: await this.userService.getProperty(members[i], 'userName'),
          userId: members[i]
        });
      }
      this.members = theMembers;
    });
  }
  
  invitefriends()  {
    console.log("inviting friends now");
    //open up your list of friends
  }

  navigateToUser(userId: string) {
    this.router.navigate(['user/'+userId]);
  }
}
