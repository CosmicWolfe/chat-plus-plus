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
                    language : number,
                    submissionInput : string) {
        console.log('chatCodes/' + chatID + "/" + index);
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

  public async refreshCodes(SecWidget : any[]) {
    this.SEC = (window as any).SEC || ((window as any).SEC = []);
    var js, fjs = document.getElementsByTagName("script")[0];

    js = document.createElement("script");
    
    js.id = "sphere-engine-compilers-jssdk"; 

    let SEC_HTTPS = true;
    let SEC_BASE = "compilers.widgets.sphere-engine.com"; 
    js.src = (SEC_HTTPS ? "https" : "http") + "://" + SEC_BASE + "/static/sdk/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);

    SecWidget[0] = this.SEC.widget("A");
    SecWidget[0].events.subscribe('beforeSendSubmission', this.submitA.bind(this));
    SecWidget[1] = this.SEC.widget("B");
    SecWidget[1].events.subscribe('beforeSendSubmission', this.submitB);
    SecWidget[2] = this.SEC.widget("C");
    SecWidget[2].events.subscribe('beforeSendSubmission', this.submitC);

      let widgets = ["A", "B", "C"];
      let ctr = 0;
      for (let index of widgets) {
        var code = this.getCode("X", index);

        let sourceCode : string;
        let compiler : number;
        let submissionInput : string;
        let snapshot = await code.child('sourceCode').once('value');
        sourceCode = snapshot.val();
        snapshot = await code.child('language').once('value');
        compiler = snapshot.val();
        snapshot = await code.child('submissionInput').once('value');
        submissionInput = snapshot.val();
        SecWidget[ctr].loadSourceCode(compiler,
          sourceCode,
          submissionInput);
          ctr++;
      }
  }

  public submitA (data : any) {
    this.submitCode("X",
                                "A",
                                data.submissionSource,
                                data.submissionLanguage,
                                data.submissionInput);
    console.log("SUBMITTED");
    return true;
  }
  public submitB = (data) => {
    this.submitCode("X",
                                "B",
                                data.submissionSource,
                                data.submissionLanguage,
                                data.submissionInput);

    console.log("SUBMITTED");
    return true;
  }
  public submitC = (data) => {
    this.submitCode("X",
                                "C",
                                data.submissionSource,
                                data.submissionLanguage,
                                data.submissionInput);

    console.log("SUBMITTED");
    return true;
  }

  public ready(e : any) : boolean {
    return "loading"!=document.readyState&&"interactive"!=document.readyState?e():window.addEventListener("load",e);
  }
}
