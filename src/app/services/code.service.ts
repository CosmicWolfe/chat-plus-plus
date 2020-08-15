import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  codes : Object[];
  codesRef : firebase.database.Reference;

  constructor() { 
    this.codes = [];
    this.codesRef = null;
  }

  public getCodes(chatID : string) {
    if (this.codesRef) {
      this.codesRef.off();
    }
    
    this.codesRef = firebase.database().ref('chatCodes/' + chatID);
    
    this.codes = [];
    this.codesRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        
        this.codes.push({
          submissionID : childData.submissionID
        });
      });
    });

    this.codesRef.on('child_added', (data) => {
      this.codes.push({
        submissionID : data.val().submissionID
      });
    });

    return this.codes;
  }

  public refreshCodes() {
    let SEC = (window as any).SEC || ((window as any).SEC = []);
    var js, fjs = document.getElementsByTagName("script")[0];

    js = document.createElement("script");
    
    js.id = "sphere-engine-compilers-jssdk"; 

    let SEC_HTTPS = true;
    let SEC_BASE = "compilers.widgets.sphere-engine.com"; 
    js.src = (SEC_HTTPS ? "https" : "http") + "://" + SEC_BASE + "/static/sdk/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }
}
