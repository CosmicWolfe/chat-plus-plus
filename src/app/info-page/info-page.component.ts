import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {
  
  groupid = "1";
  userid : string[];

  tags = ['c++','python','html','angular','java','succ','thicc','thighs'];
  constructor() { }

  ngOnInit(): void {
    this.userid = [];
    var ref = firebase.database().ref().child('chatMembers/'+this.groupid);
    ref.once('value',function(dataSnapshot) {
      this.userid = Object.keys(dataSnapshot.val());
    },this);

  }
  
  invitefriends()  {
    console.log("inviting friends now");
    //open up your list of friends
  }

}
