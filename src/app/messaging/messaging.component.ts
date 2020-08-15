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
  @Input("userID") userID : string;
  @Input("chatID") chatID : string;

  text : string;
  ctr : number;
  messages : Object[];
  newMessage : string;
  constructor(private messagingService: MessagingService) { }

  ngOnInit(): void {
    this.messages = this.messagingService.getChats(this.chatID);
    this.ctr = 0;
  }

  public sendMessage() {
    if (this.newMessage) {
      this.ctr = (this.ctr % 2) + 1;
      this.messagingService.addChat(this.chatID, String(this.ctr), this.newMessage)
      console.log(this.newMessage);

      this.newMessage = "";
    }
  }
}
