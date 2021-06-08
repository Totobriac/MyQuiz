import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolAnswerComponent } from './tool-answer.component';

describe('ToolAnswerComponent', () => {
  let component: ToolAnswerComponent;
  let fixture: ComponentFixture<ToolAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
