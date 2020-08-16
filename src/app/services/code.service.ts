import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  codesRef : firebase.database.Reference;

  constructor() { 
    this.codesRef = null;
  }

  public submitCode(chatID : string,
                    index : string,
                    sourceCode : string,
                    language : string,
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
                   console.log('chatCodes/' + chatID + "/" + index);
    return firebase.database().ref('chatCodes/' + chatID + "/" + index);
  }

  SEC : any;

  public refreshCodes() {
    this.SEC = (window as any).SEC || ((window as any).SEC = []);
    var js, fjs = document.getElementsByTagName("script")[0];

    js = document.createElement("script");
    
    js.id = "sphere-engine-compilers-jssdk"; 

    let SEC_HTTPS = true;
    let SEC_BASE = "compilers.widgets.sphere-engine.com"; 
    js.src = (SEC_HTTPS ? "https" : "http") + "://" + SEC_BASE + "/static/sdk/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }

  public ready(e : any) : boolean {
    return "loading"!=document.readyState&&"interactive"!=document.readyState?e():window.addEventListener("load",e);
  }
}
