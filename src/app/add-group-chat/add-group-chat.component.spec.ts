import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupChatComponent } from './add-group-chat.component';

describe('AddGroupChatComponent', () => {
  let component: AddGroupChatComponent;
  let fixture: ComponentFixture<AddGroupChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
