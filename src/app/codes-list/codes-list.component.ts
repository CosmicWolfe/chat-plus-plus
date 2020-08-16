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
    this.SecWidget = [null, null, null];
    this.codeService.refreshCodes(this.SecWidget);
    

      
  }

  public expandToggle() {
    console.log("COL");
    this.expanded = !this.expanded;
  }

  


  async ngOnChanges(changes : SimpleChanges) {
    if (changes.chatID && this.chatID) {
      
    }
  }
}
