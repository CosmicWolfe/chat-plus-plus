import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeWidgetComponent } from './code-widget.component';

describe('CodeWidgetComponent', () => {
  let component: CodeWidgetComponent;
  let fixture: ComponentFixture<CodeWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
