import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { CodeService } from '../services/code.service';
//import { CodeWidgetComponent } from '../code-widget/code-widget.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UserService } from '../services/user.service';

declare var SEC : any;

@Component({
  selector: 'app-codes-list',
  templateUrl: './codes-list.component.html',
  styleUrls: ['./codes-list.component.scss']
})
export class CodesListComponent implements OnInit {
  @Input("chatID") chatID : string;

  codes : Object[];
  expanded : boolean;

  constructor(public dialog: MatDialog, 
              private codeService: CodeService,
              private userService : UserService) { }

  ngOnInit(): void {
  }

  SecWidget : any[];
  
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.SecWidget = [null, null, null];

    if (this.userService.getLoggedID()) {
      SEC.ready = (e : any) : any => {
        console.log("Checking if page is ready...");
        let pageReady = "loading"!=document.readyState && "interactive"!=document.readyState;
        if (pageReady) {
          console.log("Page is ready");
        } else {
          console.log("Page is not ready")
        }
        return pageReady ? e() : window.addEventListener("load", e);
      }

      SEC.ready(async () => {
        console.log("Loading widgets...");
        this.SecWidget[0] = SEC.widget("A");
        this.SecWidget[1] = SEC.widget("B");
        this.SecWidget[2] = SEC.widget("C");
        this.SecWidget[0].events.subscribe('beforeSendSubmission', this.submitA);
        this.SecWidget[1].events.subscribe('beforeSendSubmission', this.submitB);
        this.SecWidget[2].events.subscribe('beforeSendSubmission', this.submitC);
      });
    }
  }

  public submitA = (data : any) => {
    this.codeService.submitCode(this.chatID,
                                "A",
                                data.submissionSource,
                                data.submissionLanguage,
                                data.submissionInput);
    console.log("Submitted Code (A)");
    return true;
  }
  public submitB = (data : any) => {
    this.codeService.submitCode(this.chatID,
                                "B",
                                data.submissionSource,
                                data.submissionLanguage,
                                data.submissionInput);
    console.log("Submitted Code (B)");
    return true;
  }
  public submitC = (data : any) => {
    this.codeService.submitCode(this.chatID,
                                "C",
                                data.submissionSource,
                                data.submissionLanguage,
                                data.submissionInput);
    console.log("Submitted Code (C)");
    return true;
  }

  public expandToggle() {
    this.expanded = !this.expanded;
  }

  async ngOnChanges(changes : SimpleChanges) {
    if (changes.chatID && this.chatID) {
      let widgets = ["A", "B", "C"];
      let ctr = 0;
      for (let index of widgets) {
        var code = this.codeService.getCode(this.chatID, index);

        let sourceCode : string;
        let compiler : number;
        let submissionInput : string;
        let snapshot = await code.child('sourceCode').once('value');
        sourceCode = snapshot.val();
        snapshot = await code.child('language').once('value');
        compiler = snapshot.val();
        snapshot = await code.child('submissionInput').once('value');
        submissionInput = snapshot.val();
        this.SecWidget[ctr].loadSourceCode(compiler,
                                            sourceCode,
                                            submissionInput);
          ctr++;
      }
    }
  }
}
