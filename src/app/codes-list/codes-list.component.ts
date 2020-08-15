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
    this.codes = this.codeService.getCodes(this.chatID);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.codeService.refreshCodes();

    var SECWidget = this.codeService.SEC.widget("A");
    SECWidget.events.subscribe('beforeSendSubmission', this.submitA.bind(this));

    SECWidget = this.codeService.SEC.widget("B");
    SECWidget.events.subscribe('beforeSendSubmission', this.submitB.bind(this));
  }

  public expandToggle() {
    console.log("COL");
    this.expanded = !this.expanded;
  }

  public submitA = (data) => {
    this.chatID = "1";

    this.codeService.submitCode(this.chatID,
                                "A",
                                data.submissionSource,
                                data.submissionLanguage,
                                data.hasOwnProperty('submissionInput'));

    console.log("SUBMITTED");
    return true;
  }
  public submitB = (data) => {
    this.chatID = "1";

    this.codeService.submitCode(this.chatID,
                                "B",
                                data.submissionSource,
                                data.submissionLanguage,
                                data.hasOwnProperty('submissionInput'));

    console.log("SUBMITTED");
    return true;
  }
  public submitC = (data) => {
    this.chatID = "1";

    this.codeService.submitCode(this.chatID,
                                "C",
                                data.submissionSource,
                                data.submissionLanguage,
                                data.hasOwnProperty('submissionInput'));

    console.log("SUBMITTED");
    return true;
  }
  public submitD = (data) => {
    this.chatID = "1";

    this.codeService.submitCode(this.chatID,
                                "D",
                                data.submissionSource,
                                data.submissionLanguage,
                                data.hasOwnProperty('submissionInput'));

    console.log("SUBMITTED");
    return true;
  }

  public submitE (data : any) {
    this.chatID = "1";

    this.codeService.submitCode(this.chatID,
                                "E",
                                data.submissionSource,
                                data.submissionLanguage,
                                data.hasOwnProperty('submissionInput'));

      console.log("SUBMITTED");

    return true;
  }

  ngOnChanges(changes : SimpleChanges): void {
    if (changes.chatID) {
      this.codes = this.codeService.getCodes(this.chatID);
    }
  }
}
