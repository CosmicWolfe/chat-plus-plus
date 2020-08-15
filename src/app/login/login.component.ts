import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators, PatternValidator } from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hide = true;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  login(): void {
    console.log("called login");
    if(this.email.invalid || this.password.invalid)return;

    firebase.auth().signInWithEmailAndPassword(this.email.value, this.password.value)
    .then(() => {
      if(!firebase.auth().currentUser){
        //failed to sign in
        return;
      }
      this.router.navigate(['..']);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    }).then(()=>{
      this.router.navigate(['..']);
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
