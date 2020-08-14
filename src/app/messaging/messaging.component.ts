import { Component, OnInit, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MessagingService } from '../services/messaging.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {
  @Input("username") username : string;

  text : string;
  ctr : number;
  constructor(private messagingService: MessagingService) { }

  ngOnInit(): void {
    this.ctr = 0;
  }

  public submitText() {
    console.log("O");
    this.ctr++;
    this.messagingService.addChat(this.ctr, 1, "PO" + String(this.ctr));
  }

}
