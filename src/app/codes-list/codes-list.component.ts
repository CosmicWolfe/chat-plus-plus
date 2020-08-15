import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { CodeService } from '../services/code.service';
import { CodeWidgetComponent } from '../code-widget/code-widget.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-codes-list',
  templateUrl: './codes-list.component.html',
  styleUrls: ['./codes-list.component.scss']
})
export class CodesListComponent implements OnInit {
  @Input("chatID") chatID : string;

  text : string;
  ctr : number;
  codes : Object[];
  expanded : boolean;

  constructor(public dialog: MatDialog, private codeService: CodeService) { }

  ngOnInit(): void {
    this.codes = this.codeService.getCodes(this.chatID);
  }

  public expandToggle() {
    this.expanded = !this.expanded;
    this.chatID = "1";
  }

  public inputCode() {
    console.log("CLICKED");
    const dialogRef = this.dialog.open(CodeWidgetComponent, {
      width: '1000px',
      height: '700px',
      data: {
        chatID : this.chatID
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnChanges(changes : SimpleChanges): void {
    if (changes.chatID) {
      this.codes = this.codeService.getCodes(this.chatID);
    }
  }
}
