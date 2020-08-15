import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {

  userid = ['jason','jamie','hansen','michael','jason','jamie','hansen','michael','jason','jamie','hansen','michael','jason','jamie','hansen','michael'];
  tags = ['c++','python','html','angular','java','succ','thicc','thighs'];
  constructor() { }

  ngOnInit(): void {
  }

  invitefriends()  {
    console.log("inviting friends now");
    //open up your list of friends
  }

}
