import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {UserService} from '../services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Button } from 'protractor';
import {Router} from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editing:boolean;
  uid:string;
  Name:string;
  email:string;
  NewEmail = new FormControl('', [Validators.required, Validators.email]);
  NewName = new FormControl('', [Validators.required]);
  user:string;
  match:boolean;

  constructor(private route: ActivatedRoute, private userService: UserService,private router : Router) { }

  save(New:string, typee:string){
    this.userService.setProperty(this.uid,typee,New)
    console.log("changes are made");
  }

  async init(){
    this.uid = this.userService.getLoggedID()
    this.Name = await this.userService.getProperty(this.uid, "userName")
    this.email = await this.userService.getProperty(this.uid, "email")

  }

  check(){
    this.user = this.route.snapshot.paramMap.get("userId");
    console.log(this.user);
    console.log(this.uid);
    if(this.user != this.uid){
      this.match = false;
    }
    else{
      this.match = true;
    }
  }
  goHome(){
    this.router.navigate(['..']);
    console.log("going home baby");
  }

  ngOnInit(): void {
    this.init();
    this.check();

  }

}
