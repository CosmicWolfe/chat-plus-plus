import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'


import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators, PatternValidator } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hide = true;

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

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user.uid);
        // User is signed in.
        console.log(user.email);
        //user.updateEmail("a"+email);
      } else {
        // No user is signed in.
        console.log("logged out");
      }
    });
  }

  login(): void {
    console.log("called login");
    if(this.email.invalid || this.password.invalid)return;

    firebase.auth().signInWithEmailAndPassword(this.email.value, this.password.value).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
    
    if(!firebase.auth().currentUser){
      //failed to sign in
    }
  }

  passwordErrorMessage(){
    if(this.password.hasError('required')){
      return "You must enter a password";
    }
    
    if(this.password.hasError('minlength')){
      return "You password must be at least 6 characters";
    }

    return "Invalid password";
  }
}
