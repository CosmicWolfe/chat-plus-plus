import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  codesRef : firebase.database.Reference;
  SecWidget : any[];
  SEC : any;

  constructor(private userService : UserService) { 
    this.codesRef = null;
    this.SecWidget = [null, null, null];
  }


  public submitCode(chatID : string,
                    index : string,
                    sourceCode : string,
                    language : number,
                    submissionInput : string) {
    var ref = firebase.database().ref('chatCodes/' + chatID + "/" + index);
    ref.set({
      sourceCode : sourceCode,
      language : language,
      submissionInput : submissionInput
    });
  }

  public getCode(chatID : string,
                 index : string) {
    return firebase.database().ref('chatCodes/' + chatID + "/" + index);
  }
}
