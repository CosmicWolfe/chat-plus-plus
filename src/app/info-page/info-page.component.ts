import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {
  
  groupid = "1";
  userid : string[];

  tags = ['c++','python','html','angular','java','succ','thicc','thighs'];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getMembers(this.groupid).then((members)=>{
      this.userid = members;
    });
  }
  
  invitefriends()  {
    console.log("inviting friends now");
    //open up your list of friends
  }

}
