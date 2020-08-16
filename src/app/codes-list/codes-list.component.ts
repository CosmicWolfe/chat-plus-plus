import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { CodeService } from '../services/code.service';
//import { CodeWidgetComponent } from '../code-widget/code-widget.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-codes-list',
  templateUrl: './codes-list.component.html',
  styleUrls: ['./codes-list.component.scss']
})
export class CodesListComponent implements OnInit {
  @Input("chatID") chatID : string;

  codes : Object[];
  expanded : boolean;

  constructor(public dialog: MatDialog, private codeService: CodeService) { }

  ngOnInit(): void {
  }

  SecWidget : any[];
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.codeService.refreshCodes();
    this.SecWidget = [null, null, null];
    
      this.SecWidget[0] = this.codeService.SEC.widget("A");
      this.SecWidget[0].events.subscribe('beforeSendSubmission', this.submitA.bind(this));
      this.SecWidget[1] = this.codeService.SEC.widget("B");
      this.SecWidget[1].events.subscribe('beforeSendSubmission', this.submitB.bind(this));
      this.SecWidget[2] = this.codeService.SEC.widget("C");
      this.SecWidget[2].events.subscribe('beforeSendSubmission', this.submitC.bind(this));
  }

  public expandToggle() {
    console.log("COL");
    this.expanded = !this.expanded;
  }

  public submitA = (data) => {
    console.log("SUBMITTED");
    this.codeService.submitCode(this.chatID,
                                "A",
                                data.submissionSource,
                                data.submissionLanguage,
                                data.submissionInput);
    console.log("SUBMITTED");
    return true;
  }
  public submitB = (data) => {
    this.codeService.submitCode(this.chatID,
                                "B",
                                data.submissionSource,
                                data.submissionLanguage,
                                data.submissionInput);

    console.log("SUBMITTED");
    return true;
  }
  public submitC = (data) => {
    this.codeService.submitCode(this.chatID,
                                "C",
                                data.submissionSource,
                                data.submissionLanguage,
                                data.submissionInput);

    console.log("SUBMITTED");
    return true;
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
