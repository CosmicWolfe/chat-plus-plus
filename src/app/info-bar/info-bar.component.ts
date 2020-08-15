import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InfoPageComponent } from '../info-page/info-page.component';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InfoPageComponent, {
      width: '1000px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout(): void {
    
    console.log("logging out");
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });
    this.router.navigate(['login']);
  }

}
