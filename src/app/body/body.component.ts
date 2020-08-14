import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  username : string;

  constructor() { }

  ngOnInit(): void {
    var firebaseConfig = {
      apiKey: "AIzaSyB7lbkpXJdGH4SDInVfBxWryJc6FXDXZ1E",
      authDomain: "chat-plus-plus.firebaseapp.com",
      databaseURL: "https://chat-plus-plus.firebaseio.com",
      projectId: "chat-plus-plus",
      storageBucket: "chat-plus-plus.appspot.com",
      messagingSenderId: "310062968887",
      appId: "1:310062968887:web:9c55051167e26b20d20fb2",
      measurementId: "G-P0R44136LE"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

}
