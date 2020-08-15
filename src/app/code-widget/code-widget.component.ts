import { Component, OnInit } from '@angular/core';
import { CodeService } from '../services/code.service';

@Component({
  selector: 'app-code-widget',
  templateUrl: './code-widget.component.html',
  styleUrls: ['./code-widget.component.scss']
})
export class CodeWidgetComponent implements OnInit {
  message : string;

  constructor(private codeService : CodeService) { }

  ngOnInit(): void {
    this.message = "DDD";
    
  }

  ngAfterViewInit(): void {
    this.codeService.refreshCodes();
    console.log("PO");
  }

  public submit(data) {
    this.message = "X";
    console.log("PO");
  }
}
