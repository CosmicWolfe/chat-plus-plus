import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  chats = ['1', '2', '3'];
  @Output('changeChatEvent') changeChatEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  handleChangeChat(chatId: string)  {
    this.changeChatEvent.emit(chatId);
  }
}
