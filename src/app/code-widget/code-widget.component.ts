import { Component, OnInit, Inject } from '@angular/core';
import { CodeService } from '../services/code.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-code-widget',
  templateUrl: './code-widget.component.html',
  styleUrls: ['./code-widget.component.scss']
})
export class CodeWidgetComponent implements OnInit {
  sourceCode : string;
  language : string;
  submissionInput : string;

  constructor(public dialogRef: MatDialogRef<CodeWidgetComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private codeService : CodeService) {
                //dialogRef.disableClose = true;
              }

  ngOnInit(): void {
    this.dialogRef.beforeClosed().subscribe(result => {
      console.log("CLOSED");
      SEC.ready(() => {
        SECWidget.events.unsubscribe('beforeSendSubmission', this.beforeSubmit);
        SECWidget.events.unsubscribe('afterSendSubmission', this.submit);
      });
    });
  }

  ngAfterViewInit(): void {
    this.codeService.refreshCodes();
    SEC.ready(() => {
      var SECWidget = SEC.widget("submission-widget");
      SECWidget.events.subscribe('beforeSendSubmission', this.beforeSubmit);
      SECWidget.events.subscribe('afterSendSubmission', this.submit);
    });
  }

  public beforeSubmit = (data) => {
    this.sourceCode = data.submissionSource;
    this.language = data.submissionLanguage;
    this.submissionInput = data.submissionInput;

    return true;
  }
  public submit = (data) => {
    console.log(this.data.chatID);
    this.codeService.submitCode(this.data.chatID, 
                                this.sourceCode,
                                this.language,
                                this.submissionInput);
  }
}
