import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-codes-list',
  templateUrl: './codes-list.component.html',
  styleUrls: ['./codes-list.component.scss']
})
export class CodesListComponent implements OnInit {
  expanded : boolean;

  constructor() { }

  ngOnInit(): void {
  }

  public expandToggle() {
    this.expanded = !this.expanded;
  }

}
