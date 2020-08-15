import { Component, OnInit, Input } from '@angular/core';
import { MessagingService } from '../services/messaging.service';
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

  constructor(private messagingService: MessagingService) { }

  ngOnInit(): void {
    this.codes = this.messagingService.getCodes(this.chatID);
  }

  public expandToggle() {
    this.expanded = !this.expanded;
  }

}
