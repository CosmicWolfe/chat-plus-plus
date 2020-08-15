import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  fname : string;
  lname : string;
  username : string;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hide = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    if(this.password.invalid || this.email.invalid)
      return;

    console.log("submitted");
    firebase.auth().createUserWithEmailAndPassword(this.email.value, this.password.value).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    }).then(()=>{
      var user = firebase.auth().currentUser;
      var newUserRef = firebase.database().ref().child("userDetails/"+user.uid);
      newUserRef.set({
        userID : user.uid,
        email : this.email.value,
        userName : this.username,
        firstName : this.fname,
        lastName : this.lname,
      });
      this.router.navigate(["login"]);
    });
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
