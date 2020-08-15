import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { MatIconModule } from '@angular/material/icon'
// import { MatDividerModule } from '@angular/material/divider';
// import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  chats = ['1', '2', '3'];
  @Output('changeChatEvent') changeChatEvent = new EventEmitter();

  constructor(private router : Router){}
  ngOnInit(): void {
  }

  handleChangeChat(chatId: string)  {
    this.changeChatEvent.emit(chatId);
  }
  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
}
