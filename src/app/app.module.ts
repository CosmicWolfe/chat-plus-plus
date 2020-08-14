import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatsComponent } from './chats/chats.component';
import { InfoBarComponent } from './info-bar/info-bar.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { CodesListComponent } from './codes-list/codes-list.component';
import { CodeWidgetComponent } from './code-widget/code-widget.component';
import { MessagingComponent } from './messaging/messaging.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    LoginComponent,
    ProfileComponent,
    ChatsComponent,
    InfoBarComponent,
    InfoPageComponent,
    CodesListComponent,
    CodeWidgetComponent,
    MessagingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
